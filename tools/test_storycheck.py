import copy
import json
from pathlib import Path
import tempfile
import unittest
from storycheck import audit, evaluate, load, ModelError


def base():
    return {'format': 'storycheck/1',
            'source': {'kind': 'synthetic', 'repository': '', 'commit': None},
            'entry': 'start',
            'variables': {'flag': {'type': 'bool', 'initial': False},
                          'points': {'type': 'int', 'min': 0, 'max': 2, 'initial': 0},
                          'route': {'type': 'enum', 'values': ['none', 'a'], 'initial': 'none'}},
            'endings': ['a', 'b'],
            'nodes': [
                {'id': 'start', 'text': 'A synthetic test, not repository content.', 'choices': [
                    {'id': 'accept', 'label': 'Accept', 'target': 'endA',
                     'effects': [{'var': 'flag', 'op': 'set', 'value': True}]},
                    {'id': 'decline', 'label': 'Decline', 'target': 'endB'}]},
                {'id': 'endA', 'text': 'Accepted.', 'ending': 'a', 'choices': [],
                 'requires': {'var': 'flag', 'op': 'eq', 'value': True}},
                {'id': 'endB', 'text': 'Declined.', 'ending': 'b', 'choices': []}]}

class StorycheckTests(unittest.TestCase):
    def test_valid_model(self):
        r = audit(base())
        self.assertEqual(r['status'], 'PASS')
        self.assertEqual(r['production_release_status'], 'NOT_ASSESSED')
        self.assertTrue(r['complete'])
        self.assertEqual(r['coverage']['choices_seen'], 2)

    def test_witness(self):
        r = audit(base())
        self.assertEqual(r['ending_witnesses']['a']['steps'], ['start/accept'])
        self.assertEqual(r['ending_witnesses']['b']['steps'], ['start/decline'])

    def test_effect_does_not_mutate_source(self):
        m = base(); old = copy.deepcopy(m)
        audit(m)
        self.assertEqual(m, old)

    def test_domain_overflow(self):
        m = base(); m['nodes'][0]['choices'][0]['effects'].append({'var': 'points', 'op': 'add', 'value': 3})
        self.assertIn('DOMAIN', [e['code'] for e in audit(m)['errors']])

    def test_domain_underflow(self):
        m = base(); m['nodes'][0]['choices'][0]['effects'].append({'var': 'points', 'op': 'add', 'value': -1})
        self.assertIn('DOMAIN', [e['code'] for e in audit(m)['errors']])

    def test_node_requirement(self):
        m = base(); m['nodes'][0]['choices'][0]['effects'] = []
        self.assertIn('NODE_REQUIREMENT', [e['code'] for e in audit(m)['errors']])

    def test_invariant(self):
        m = base(); m['invariants'] = [{'id': 'forbid_flag', 'must': {'var': 'flag', 'op': 'eq', 'value': False}}]
        self.assertIn('INVARIANT', [e['code'] for e in audit(m)['errors']])

    def test_conditional_invariant(self):
        m = base(); m['invariants'] = [{'id': 'inactive', 'when': False, 'must': False}]
        self.assertEqual(audit(m)['status'], 'PASS')

    def test_deadlock(self):
        m = base()
        for c in m['nodes'][0]['choices']: c['when'] = False
        self.assertIn('DEADLOCK', [e['code'] for e in audit(m)['errors']])

    def test_unreachable_guard(self):
        m = base(); m['nodes'][0]['choices'][0]['when'] = {'var': 'points', 'op': 'ge', 'value': 2}
        codes = [e['code'] for e in audit(m)['errors']]
        self.assertIn('UNREACHABLE_CHOICE', codes); self.assertIn('UNREACHABLE_ENDING', codes)

    def test_cycle_with_exit(self):
        m = base(); m['nodes'][0]['choices'].append({'id': 'wait', 'label': 'Wait', 'target': 'start'})
        self.assertEqual(audit(m)['status'], 'PASS')

    def test_closed_cycle(self):
        m = base(); m['nodes'].append({'id': 'trap', 'text': 'Trap.', 'choices': [{'id': 'loop', 'label': 'Loop', 'target': 'trap'}]})
        m['nodes'][0]['choices'].append({'id': 'trap', 'label': 'Enter trap', 'target': 'trap'})
        self.assertIn('NO_TERMINAL_PATH', [e['code'] for e in audit(m)['errors']])

    def test_same_node_different_state_exploration(self):
        m = base(); m['nodes'][0]['choices'][0]['when'] = {'var': 'points', 'op': 'eq', 'value': 2}
        m['nodes'][0]['choices'].append({'id': 'train', 'label': 'Train', 'target': 'start',
                                        'when': {'var': 'points', 'op': 'lt', 'value': 2},
                                        'effects': [{'var': 'points', 'op': 'add', 'value': 1}]})
        r = audit(m)
        self.assertEqual(r['status'], 'PASS')
        self.assertEqual(r['ending_witnesses']['a']['steps'], ['start/train', 'start/train', 'start/accept'])

    def test_state_cap_is_not_pass(self):
        r = audit(base(), max_states=1)
        self.assertEqual(r['status'], 'INCOMPLETE'); self.assertFalse(r['complete'])
        self.assertFalse(any(e['code'].startswith('UNREACHABLE') for e in r['errors']))

    def test_edge_cap_is_not_pass(self):
        r = audit(base(), max_edges=1)
        self.assertEqual(r['status'], 'INCOMPLETE')

    def test_equivalent_future_warning(self):
        m = base(); duplicate = copy.deepcopy(m['nodes'][0]['choices'][1]); duplicate.update(id='again', label='Decline politely')
        m['nodes'][0]['choices'].append(duplicate)
        self.assertIn('SAME_MODELED_FUTURE', [w['code'] for w in audit(m)['warnings']])

    def test_expressive_choice_not_future_warning(self):
        m = base(); m['nodes'][0]['choices'][1]['kind'] = 'expressive'
        duplicate = copy.deepcopy(m['nodes'][0]['choices'][1]); duplicate.update(id='again', label='Decline politely')
        m['nodes'][0]['choices'].append(duplicate)
        self.assertNotIn('SAME_MODELED_FUTURE', [w['code'] for w in audit(m)['warnings']])

    def test_empty_state_supported(self):
        m = base(); m['variables'] = {}; m['nodes'][0]['choices'][0].pop('effects'); m['nodes'][1].pop('requires')
        self.assertEqual(audit(m)['status'], 'PASS')

    def test_initial_terminal_supported(self):
        m = base(); m['nodes'] = [m['nodes'][2]]; m['entry'] = 'endB'; m['endings'] = ['b']
        self.assertEqual(audit(m)['status'], 'PASS')

    def test_nested_conditions(self):
        m = base(); m['nodes'][0]['choices'][0]['when'] = {'all': [True, {'any': [False, {'not': False}]}]}
        self.assertEqual(audit(m)['status'], 'PASS')

    def test_json_duplicate_key_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'input.json'; p.write_text('{"x":1,"x":2}', encoding='utf-8')
            with self.assertRaises(ModelError): load(p)

    def test_json_nan_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'input.json'; p.write_text('{"x":NaN}', encoding='utf-8')
            with self.assertRaises(ModelError): load(p)

    def test_deep_condition_rejected(self):
        m = base(); cond = True
        for _ in range(60): cond = {'not': cond}
        m['nodes'][0]['requires'] = cond
        self.assertEqual(audit(m)['status'], 'FAIL')

    def test_repository_provenance(self):
        m = base(); m['source'] = {'kind': 'repository_export', 'repository': 'example/only', 'commit': 'a' * 40}
        self.assertEqual(audit(m)['status'], 'PASS')

# Every mutation is an independent unittest, not merely a subtest count.
MUTATIONS = {
    'format': lambda m: m.update(format='other'),
    'top_unknown': lambda m: m.update(exec='bad'),
    'missing_entry': lambda m: m.pop('entry'),
    'entry_missing_target': lambda m: m.update(entry='missing'),
    'nodes_empty': lambda m: m.update(nodes=[]),
    'nodes_not_list': lambda m: m.update(nodes={}),
    'duplicate_node': lambda m: m['nodes'].append(copy.deepcopy(m['nodes'][0])),
    'node_text_empty': lambda m: m['nodes'][0].update(text=''),
    'node_unknown_field': lambda m: m['nodes'][0].update(onEnter='bad'),
    'choices_not_list': lambda m: m['nodes'][0].update(choices={}),
    'duplicate_choice': lambda m: m['nodes'][0]['choices'].append(copy.deepcopy(m['nodes'][0]['choices'][0])),
    'choice_empty_label': lambda m: m['nodes'][0]['choices'][0].update(label=' '),
    'choice_unknown_target': lambda m: m['nodes'][0]['choices'][0].update(target='missing'),
    'choice_unknown_key': lambda m: m['nodes'][0]['choices'][0].update(goto='endB'),
    'choice_invalid_kind': lambda m: m['nodes'][0]['choices'][0].update(kind='unknown'),
    'condition_string': lambda m: m['nodes'][0]['choices'][0].update(when='flag == true'),
    'condition_unknown_var': lambda m: m['nodes'][0]['choices'][0].update(when={'var': 'missing', 'op': 'eq', 'value': True}),
    'condition_unknown_operator': lambda m: m['nodes'][0]['choices'][0].update(when={'var': 'flag', 'op': 'eval', 'value': True}),
    'condition_bool_as_integer': lambda m: m['nodes'][0]['choices'][0].update(when={'var': 'points', 'op': 'eq', 'value': True}),
    'condition_ordered_bool': lambda m: m['nodes'][0]['choices'][0].update(when={'var': 'flag', 'op': 'gt', 'value': True}),
    'condition_empty_all': lambda m: m['nodes'][0]['choices'][0].update(when={'all': []}),
    'condition_mixed_keys': lambda m: m['nodes'][0]['choices'][0].update(when={'all': [True], 'any': [True]}),
    'effect_unknown_variable': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'missing','op':'set','value':True}]),
    'effect_unknown_operator': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'flag','op':'script','value':True}]),
    'effect_add_boolean': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'flag','op':'add','value':1}]),
    'effect_set_wrong_type': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'flag','op':'set','value':1}]),
    'effect_enum_unknown': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'route','op':'set','value':'missing'}]),
    'effect_add_float': lambda m: m['nodes'][0]['choices'][0].update(effects=[{'var':'points','op':'add','value':0.5}]),
    'ending_unknown': lambda m: m['nodes'][1].update(ending='missing'),
    'ending_has_choices': lambda m: m['nodes'][1].update(choices=[{'id':'again','label':'Again','target':'start'}]),
    'endings_duplicate': lambda m: m['endings'].append('a'),
    'endings_empty': lambda m: m.update(endings=[]),
    'variable_unknown_type': lambda m: m['variables']['flag'].update(type='float'),
    'variable_invalid_initial': lambda m: m['variables']['points'].update(initial=3),
    'variable_inverted_bounds': lambda m: m['variables']['points'].update(min=4),
    'variable_bool_bound': lambda m: m['variables']['points'].update(min=False),
    'variable_duplicate_enum': lambda m: m['variables']['route'].update(values=['a','a']),
    'variable_empty_enum': lambda m: m['variables']['route'].update(values=[]),
    'source_invalid_kind': lambda m: m['source'].update(kind='unknown'),
    'source_commit_missing': lambda m: m['source'].update(kind='repository_export',repository='example/repo'),
    'invariant_invalid': lambda m: m.update(invariants=[{'id':'x','must':{'var':'missing','op':'eq','value':True}}]),
    'invariant_duplicate': lambda m: m.update(invariants=[{'id':'x','must':True},{'id':'x','must':True}]),
}
for name, mutate in MUTATIONS.items():
    def test(self, mutation=mutate):
        m = base(); mutation(m)
        r = audit(m)
        self.assertEqual(r['status'], 'FAIL')
        self.assertEqual(r['errors'][0]['code'], 'SCHEMA')
    setattr(StorycheckTests, 'test_schema_' + name, test)

for op, expected in [('eq', False), ('ne', True), ('lt', True), ('le', True), ('gt', False), ('ge', False)]:
    def test(self, operator=op, value=expected):
        self.assertEqual(evaluate({'var':'p', 'op':operator, 'value':2}, {'p':1}), value)
    setattr(StorycheckTests, 'test_comparison_' + op, test)

if __name__ == '__main__':
    unittest.main(verbosity=2)
