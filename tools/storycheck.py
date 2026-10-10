#!/usr/bin/env python3
"""Finite-state checker for the documented storycheck/1 export contract.

Checks only the supplied normalized model, never a game repository or browser.
Python 3.10+, standard library only. Does not eval/exec story expressions.
"""
from __future__ import annotations
import argparse
from collections import defaultdict, deque
import hashlib
import json
from pathlib import Path
import re
import sys
from typing import Any

class ModelError(ValueError):
    pass

def require(ok: bool, message: str) -> None:
    if not ok:
        raise ModelError(message)

def obj(value: Any, allowed: set[str], required: set[str], where: str) -> dict:
    require(type(value) is dict, f'{where}: expected object')
    require(not (set(value) - allowed), f'{where}: unsupported keys {sorted(set(value) - allowed)}')
    require(required <= set(value), f'{where}: missing keys {sorted(required - set(value))}')
    return value

def text(value: Any, where: str) -> None:
    require(type(value) is str and bool(value.strip()), f'{where}: expected nonempty string')

def valid_value(value: Any, spec: dict) -> bool:
    if spec['type'] == 'bool':
        return type(value) is bool
    if spec['type'] == 'int':
        return type(value) is int and spec['min'] <= value <= spec['max']
    return type(value) is str and value in spec['values']

def check_condition(cond: Any, variables: dict, where: str, depth: int = 0) -> None:
    require(depth < 48, f'{where}: condition nesting exceeds 47 levels')
    if type(cond) is bool:
        return
    require(type(cond) is dict, f'{where}: expected condition object or boolean')
    if len(cond) == 1 and ('all' in cond or 'any' in cond):
        op = next(iter(cond))
        require(type(cond[op]) is list and len(cond[op]) > 0, f'{where}: {op} must be nonempty list')
        for i, child in enumerate(cond[op]):
            check_condition(child, variables, f'{where}.{op}[{i}]', depth + 1)
        return
    if set(cond) == {'not'}:
        check_condition(cond['not'], variables, where + '.not', depth + 1)
        return
    obj(cond, {'var', 'op', 'value'}, {'var', 'op', 'value'}, where)
    text(cond['var'], where + '.var')
    require(cond['var'] in variables, f'{where}: unknown variable {cond["var"]}')
    spec = variables[cond['var']]
    require(cond['op'] in ('eq', 'ne', 'lt', 'le', 'gt', 'ge'), f'{where}: unsupported comparison')
    if cond['op'] in ('lt', 'le', 'gt', 'ge'):
        require(spec['type'] == 'int', f'{where}: ordered comparison requires int variable')
    require(valid_value(cond['value'], spec), f'{where}: comparison value has wrong type or domain')

def evaluate(cond: Any, state: dict) -> bool:
    if type(cond) is bool:
        return cond
    if 'all' in cond:
        return all(evaluate(c, state) for c in cond['all'])
    if 'any' in cond:
        return any(evaluate(c, state) for c in cond['any'])
    if 'not' in cond:
        return not evaluate(cond['not'], state)
    a, b, op = state[cond['var']], cond['value'], cond['op']
    if op == 'eq': return a == b
    if op == 'ne': return a != b
    if op == 'lt': return a < b
    if op == 'le': return a <= b
    if op == 'gt': return a > b
    if op == 'ge': return a >= b
    raise ModelError('unsupported operator after validation')

def validate(model: Any) -> dict[str, dict]:
    fields = {'format', 'source', 'entry', 'variables', 'endings', 'nodes', 'invariants'}
    obj(model, fields, fields - {'invariants'}, 'model')
    require(model['format'] == 'storycheck/1', 'model: unsupported format')
    source = obj(model['source'], {'kind', 'repository', 'commit'}, {'kind', 'repository', 'commit'}, 'source')
    require(source['kind'] in ('synthetic', 'repository_export'), 'source: unsupported kind')
    require(type(source['repository']) is str, 'source.repository: expected string')
    if source['kind'] == 'repository_export':
        text(source['repository'], 'source.repository')
        require(type(source['commit']) is str and bool(re.fullmatch(r'(?:[0-9a-fA-F]{40}|[0-9a-fA-F]{64})', source['commit'])), 'source.commit: full commit hash required')
    else:
        require(source['commit'] is None, 'synthetic source must have null commit')
    variables = model['variables']
    require(type(variables) is dict, 'variables: expected object')
    for name, spec in variables.items():
        text(name, 'variable name')
        require(type(spec) is dict, f'variable {name}: expected object')
        kind = spec.get('type')
        require(kind in ('bool', 'int', 'enum'), f'variable {name}: unsupported type')
        fields = {'type', 'initial'} | ({'min', 'max'} if kind == 'int' else {'values'} if kind == 'enum' else set())
        obj(spec, fields, fields, f'variable {name}')
        if kind == 'int':
            require(type(spec['min']) is int and type(spec['max']) is int and spec['min'] <= spec['max'], f'variable {name}: invalid bounds')
        if kind == 'enum':
            vals = spec['values']
            require(type(vals) is list and len(vals) > 0 and all(type(v) is str and v.strip() for v in vals), f'variable {name}: invalid enum')
            require(len(vals) == len(set(vals)), f'variable {name}: duplicate enum values')
        require(valid_value(spec['initial'], spec), f'variable {name}: invalid initial value')
    require(type(model['endings']) is list and len(model['endings']) > 0, 'endings: expected nonempty list')
    for e in model['endings']: text(e, 'ending id')
    require(len(set(model['endings'])) == len(model['endings']), 'endings: duplicate id')
    require(type(model['nodes']) is list and len(model['nodes']) > 0, 'nodes: expected nonempty list')
    nodes = {}
    for n in model['nodes']:
        obj(n, {'id', 'text', 'choices', 'ending', 'requires'}, {'id', 'text', 'choices'}, 'node')
        text(n['id'], 'node.id'); text(n['text'], f'node {n["id"]}.text')
        require(n['id'] not in nodes, f'node: duplicate id {n["id"]}')
        nodes[n['id']] = n
    text(model['entry'], 'entry')
    require(model['entry'] in nodes, 'entry: target not found')
    for nid, n in nodes.items():
        check_condition(n.get('requires', True), variables, f'{nid}.requires')
        require(type(n['choices']) is list, f'{nid}.choices: expected list')
        if 'ending' in n:
            require(type(n['ending']) is str and n['ending'] in model['endings'], f'{nid}: unknown ending')
            require(not n['choices'], f'{nid}: ending must have no choices')
        ids = set()
        for c in n['choices']:
            where = f'{nid}.choice'
            obj(c, {'id', 'label', 'target', 'when', 'effects', 'response', 'kind'}, {'id', 'label', 'target'}, where)
            text(c['id'], where + '.id'); text(c['label'], where + '.label'); text(c['target'], where + '.target')
            require(c['id'] not in ids, f'{nid}: duplicate choice id {c["id"]}')
            ids.add(c['id'])
            require(c['target'] in nodes, f'{nid}/{c["id"]}: target not found')
            require(c.get('kind', 'substantive') in ('substantive', 'expressive', 'continue'), f'{where}: invalid kind')
            if 'response' in c: text(c['response'], where + '.response')
            check_condition(c.get('when', True), variables, where + '.when')
            require(type(c.get('effects', [])) is list, where + '.effects: expected list')
            for eff in c.get('effects', []):
                obj(eff, {'var', 'op', 'value'}, {'var', 'op', 'value'}, where + '.effect')
                text(eff['var'], where + '.effect.var')
                require(eff['var'] in variables, f'{where}: unknown effect variable')
                spec = variables[eff['var']]
                require(eff['op'] in ('set', 'add'), f'{where}: unsupported effect')
                if eff['op'] == 'set':
                    require(valid_value(eff['value'], spec), f'{where}: invalid set value')
                else:
                    require(spec['type'] == 'int' and type(eff['value']) is int, f'{where}: add requires integer variable and value')
    require(type(model.get('invariants', [])) is list, 'invariants: expected list')
    inv_ids = set()
    for inv in model.get('invariants', []):
        obj(inv, {'id', 'when', 'must'}, {'id', 'must'}, 'invariant')
        text(inv['id'], 'invariant.id')
        require(inv['id'] not in inv_ids, 'duplicate invariant id')
        inv_ids.add(inv['id'])
        check_condition(inv.get('when', True), variables, 'invariant.when')
        check_condition(inv['must'], variables, 'invariant.must')
    return nodes

def apply_effects(choice: dict, state: dict, variables: dict) -> dict:
    result = state.copy()
    for eff in choice.get('effects', []):
        name = eff['var']
        value = eff['value'] if eff['op'] == 'set' else result[name] + eff['value']
        require(valid_value(value, variables[name]), f'{name}: effect leaves declared domain ({value!r})')
        result[name] = value
    return result

def audit(model: Any, max_states: int = 50000, max_edges: int = 500000) -> dict:
    report = {'scope': 'normalized_export_only', 'production_release_status': 'NOT_ASSESSED',
              'status': 'FAIL', 'complete': False, 'errors': [], 'warnings': [],
              'states_explored': 0, 'transitions_explored': 0, 'ending_witnesses': {}}
    try:
        require(type(max_states) is int and max_states > 0, 'max_states must be positive integer')
        require(type(max_edges) is int and max_edges > 0, 'max_edges must be positive integer')
        nodes = validate(model)
    except (ModelError, TypeError, RecursionError, ValueError) as exc:
        report['errors'].append({'code': 'SCHEMA', 'detail': str(exc)})
        return report
    report['source'] = model['source']
    report['input_sha256'] = hashlib.sha256(json.dumps(model, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    variables = model['variables']
    names = sorted(variables)
    def key(nid: str, state: dict) -> tuple:
        return (nid, tuple(state[name] for name in names))
    first_state = {name: spec['initial'] for name, spec in variables.items()}
    first_key = key(model['entry'], first_state)
    queue = deque([(model['entry'], first_state, first_key)])
    parents = {first_key: None}
    reverse = defaultdict(set)
    seen_nodes, seen_choices, terminal_states = set(), set(), set()
    completed_keys = set()
    unique_issues = set()
    capped = False
    def trace(k: tuple, extra: str | None = None) -> list[str]:
        steps = []
        while parents[k] is not None:
            previous, choice = parents[k]
            steps.append(f'{previous[0]}/{choice}')
            k = previous
        steps.reverse()
        if extra is not None: steps.append(extra)
        return steps
    def issue(level: str, code: str, nid: str, detail: str, k: tuple | None = None, extra: str | None = None) -> None:
        sig = (level, code, nid, detail)
        if sig in unique_issues: return
        unique_issues.add(sig)
        item = {'code': code, 'node': nid, 'detail': detail}
        if k is not None: item['witness'] = trace(k, extra)
        report[level].append(item)
    while queue:
        nid, state, k = queue.popleft()
        completed_keys.add(k); seen_nodes.add(nid)
        n = nodes[nid]
        if not evaluate(n.get('requires', True), state):
            issue('errors', 'NODE_REQUIREMENT', nid, 'Entered node without its declared prerequisite', k)
        for inv in model.get('invariants', []):
            if evaluate(inv.get('when', True), state) and not evaluate(inv['must'], state):
                issue('errors', 'INVARIANT', nid, inv['id'], k)
        if 'ending' in n:
            terminal_states.add(k)
            report['ending_witnesses'].setdefault(n['ending'], {'steps': trace(k), 'node': nid, 'state': state})
            continue
        available = [c for c in n['choices'] if evaluate(c.get('when', True), state)]
        if not available:
            issue('errors', 'DEADLOCK', nid, 'Nonterminal state has no enabled choices', k)
        outcome_groups = defaultdict(list)
        for c in available:
            if report['transitions_explored'] >= max_edges:
                capped = True
                queue.clear()
                break
            report['transitions_explored'] += 1
            seen_choices.add((nid, c['id']))
            try:
                after = apply_effects(c, state, variables)
            except ModelError as exc:
                issue('errors', 'DOMAIN', nid, f'{c["id"]}: {exc}', k, f'{nid}/{c["id"]}')
                continue
            nk = key(c['target'], after)
            if c.get('kind', 'substantive') == 'substantive':
                outcome_groups[nk].append(c['id'])
            if nk not in parents:
                if len(parents) >= max_states:
                    capped = True
                    continue
                parents[nk] = (k, c['id'])
                queue.append((c['target'], after, nk))
            reverse[nk].add(k)
        for same in outcome_groups.values():
            if len(same) > 1:
                issue('warnings', 'SAME_MODELED_FUTURE', nid,
                      'These substantive choices have identical target/state: ' + ', '.join(same), k)
    report['states_explored'] = len(completed_keys)
    report['states_discovered'] = len(parents)
    report['complete'] = not capped
    declared_choices = {(nid, c['id']) for nid, n in nodes.items() for c in n['choices']}
    report['coverage'] = {'nodes_seen': len(seen_nodes), 'nodes_total': len(nodes),
                          'choices_seen': len(seen_choices), 'choices_total': len(declared_choices),
                          'endings_seen': len(report['ending_witnesses']), 'endings_total': len(model['endings'])}
    if capped:
        issue('warnings', 'LIMIT', '', 'State or transition cap reached; absence/reachability is not proven')
    else:
        for nid in sorted(set(nodes) - seen_nodes):
            issue('errors', 'UNREACHABLE_NODE', nid, 'Not reachable in the finite export model')
        for nid, cid in sorted(declared_choices - seen_choices):
            issue('errors', 'UNREACHABLE_CHOICE', nid, cid)
        for ending in sorted(set(model['endings']) - set(report['ending_witnesses'])):
            issue('errors', 'UNREACHABLE_ENDING', '', ending)
        can_finish = set(terminal_states)
        backward = deque(terminal_states)
        while backward:
            target = backward.popleft()
            for parent in reverse.get(target, ()):
                if parent not in can_finish:
                    can_finish.add(parent); backward.append(parent)
        for k in sorted(completed_keys - can_finish, key=repr):
            issue('errors', 'NO_TERMINAL_PATH', k[0], 'At least one reachable state cannot reach any ending', k)
    report['status'] = 'FAIL' if report['errors'] else 'INCOMPLETE' if capped else 'PASS'
    return report

def unique_object(pairs: list[tuple]) -> dict:
    result = {}
    for k, v in pairs:
        if k in result: raise ModelError(f'duplicate JSON key: {k}')
        result[k] = v
    return result

def load(path: Path) -> Any:
    def no_constant(value: str) -> None:
        raise ModelError('non-finite JSON constant: ' + value)
    return json.loads(path.read_text(encoding='utf-8-sig'), object_pairs_hook=unique_object, parse_constant=no_constant)

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('model', type=Path)
    parser.add_argument('--out', type=Path)
    parser.add_argument('--max-states', type=int, default=50000)
    parser.add_argument('--max-edges', type=int, default=500000)
    args = parser.parse_args()
    try:
        result = audit(load(args.model), args.max_states, args.max_edges)
    except (OSError, UnicodeError, ValueError, RecursionError) as exc:
        print(f'Input error: {exc}', file=sys.stderr)
        return 3
    output = json.dumps(result, ensure_ascii=False, indent=2)
    if args.out:
        try:
            args.out.parent.mkdir(parents=True, exist_ok=True)
            args.out.write_text(output + '\n', encoding='utf-8')
        except OSError as exc:
            print(f'Output error: {exc}', file=sys.stderr)
            return 3
    print(output)
    return {'PASS': 0, 'FAIL': 1, 'INCOMPLETE': 2}[result['status']]

if __name__ == '__main__':
    raise SystemExit(main())
