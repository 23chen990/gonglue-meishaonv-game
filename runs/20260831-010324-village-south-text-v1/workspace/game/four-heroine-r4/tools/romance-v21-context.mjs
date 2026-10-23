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
export function v21FinaleLabel(flags,id,otherwise){
 const count=Object.keys(V21_NAMES).filter(c=>flags['active_'+c]===true).length;
 const none={
  together:'约几位熟人坐下来聊',
  private:'单独找当事人谈谈',
  separate:'先不回复那几条消息',
  work:'演出结束后再回消息',
  none:'不再发新的邀约'
 };
 const one={
  together:'约她见面，当面聊聊',
  private:'给她发消息，单独聊',
  separate:'暂时不回她的消息',
  work:'先忙完这场演出',
  none:'告诉她不想继续约会'
 };
 const many={
  together:'约她们出来坐坐',
  private:'分别找她们聊聊',
  separate:'暂时不回消息',
  work:'先忙完这场演出',
  none:'逐一结束这几段约会'
 };
 return count===0?(none[id]||otherwise):count===1?(one[id]||otherwise):(many[id]||otherwise);
}
export function v21FinaleReply(flags,id,otherwise){
 const count=Object.keys(V21_NAMES).filter(c=>flags['active_'+c]===true).length;
 const none={
  together:'我约他们见了面。话聊到一半，大家都安静了下来。',
  private:'人群散了，我终于有空和她单独谈一谈。',
  none:'写好的邀约删掉了。屏幕恢复了安静。',
  work:'我收好话筒，点开那几条还没回的消息。',
  separate:'我把手机放回口袋，没回那几条消息。'
 };
 const one={
  together:'见面后，我把准备了很久的话说了。她没有马上回答。',
  private:'我和她坐下来。她先问了我一个问题。',
  none:'我说不想继续约会。她看了一会儿消息，没再打字。',
  work:'演出散场，我找到她。她还在原来的位置等着。',
  separate:'手机亮了一次，我没点开她的消息。'
 };
 return count===0?(none[id]||otherwise):count===1?(one[id]||otherwise):otherwise;
}
