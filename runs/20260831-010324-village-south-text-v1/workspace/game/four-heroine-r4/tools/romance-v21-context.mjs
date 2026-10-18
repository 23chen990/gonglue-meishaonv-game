/** V21 display-only relationship truth. Canonical flags/commands are never
 * modified. These helpers are pure and imported directly by Node QA; the
 * build embeds them (without export keywords) into the standalone player.
 */
export const V21_NAMES=Object.freeze({t:'唐映雪',s:'沈清辞',l:'林见月',g:'顾晚棠'});
export function v21PriorRelationship(flags,scene){
 if(!/^[tslg]03$/.test(scene))return null;
 const others=Object.keys(V21_NAMES).filter(c=>c!==scene[0]&&
   flags['active_'+c]===true&&['exclusive','open'].includes(flags['scope_'+c]))
  .map(c=>({code:c,name:V21_NAMES[c],scope:flags['scope_'+c]}));
 return others.find(x=>x.scope==='exclusive')||others[0]||null;
}
export function v21ChoiceRisk(flags,scene,id,otherwise){
 if(id!=='open'&&id!=='exclusive')return otherwise;
 const prior=v21PriorRelationship(flags,scene);
 if(!prior)return otherwise;
 if(prior.scope==='exclusive')return '你已答应只和'+prior.name+'交往';
 return id==='exclusive'?'你还在和'+prior.name+'约会，先讲清楚':
  '你还在和'+prior.name+'约会，不能隐瞒';
}
export function v21FinaleLabel(flags,id,otherwise){
 const count=Object.keys(V21_NAMES).filter(c=>flags['active_'+c]===true).length;
 const none={
  together:'把曾经的邀约与误会说清楚',
  private:'单独找当事人把旧话说完',
  separate:'先不解释过去，接受误会留下',
  work:'今晚先谈作品，散场再回私信',
  none:'不再许下自己不准备兑现的约'
 };
 const one={
  together:'和她当面商量接下来怎么走',
  private:'只和她私下把关系讲清楚',
  separate:'先拖着不谈，接受关系变冷',
  work:'今天先谈作品，散场后找她',
  none:'不想继续，就亲口告诉她'
 };
 return count===0?(none[id]||otherwise):count===1?(one[id]||otherwise):otherwise;
}
export function v21FinaleReply(flags,id,otherwise){
 const count=Object.keys(V21_NAMES).filter(c=>flags['active_'+c]===true).length;
 const none={
  together:'我把没说清的邀约一一解释了。没有恋人，也不需要硬编一个团圆。',
  private:'我只找当事人说，不把私事拿到台上当表演。',
  none:'不想继续的约定，我没有再留“改天一定”的话。',
  work:'今晚我把工作讲完，私人消息就由我自己认真回复。'
 };
 const one={
  together:'我当面把约会的边界说清楚，接下来怎么走，也要听她的回答。',
  private:'我们单独谈了这段关系，不再让群消息替我开口。',
  none:'我亲口说了不打算继续。她没有立刻回复，我也没催。',
  work:'工作说完，我去找她。公事不能代替私下的回答。'
 };
 return count===0?(none[id]||otherwise):count===1?(one[id]||otherwise):otherwise;
}
