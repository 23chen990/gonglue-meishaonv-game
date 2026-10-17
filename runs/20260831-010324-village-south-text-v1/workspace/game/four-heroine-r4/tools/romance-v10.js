/* V10: consequences have to be true in the canonical engine.
 * Every visible aftermath is keyed to a real engine action and guarded by the
 * flag it actually wrote. UI micro-actions never grant story progress/affinity.
 * Canonical JSON/engine/replay logic are not rewritten by this director.
 */
const V10_VERSION=1;
const V10_AFTER=Object.freeze({
 'ENTRY_CLUES/obey':{
  flag:['canon_signed_blame',true],voice:'程放',shot:'console',
  text:'行，这就算你认了。回头查下来可别反悔。'},
 'ENTRY_CLUES/refuse':{
  flag:['source_declined_handover',true],voice:'程放',shot:'console',
  text:'不签是吧？明天早会你自己跟领导说。'},
 'ENTRY_CLUES/witness':{
  flag:['source_original_timeline',true],voice:'阿衡',shot:'console',
  text:'你把时间记着。我在那儿，他真没碰控台。'},
 'ENTRY_MEMORY/camera':{
  flag:['source_pre_switch_timestamp',true],voice:'林见月',shot:'lin',
  text:'都拍到了。原片我给你备份一份，放心。'},
 'ENTRY_MEMORY/email':{
  flag:['source_programme_approval_note',true],voice:'顾晚棠',shot:'gu',
  text:'审批邮件在这儿。程放，删前奏是谁的主意？'},
 'COLD/t':{
  flag:['opening_method','performer_cue'],voice:'唐映雪',shot:'singerBond',
  text:'刚才你在侧幕打手势的吧？散场别走。'},
 'COLD/s':{
  flag:['opening_method','producer_switch'],voice:'沈清辞',shot:'shen',
  text:'盘是你找的，阿衡帮忙切的。谁也别想赖账。'},
 'COLD/l':{
  flag:['opening_switch_video',true],voice:'林见月',shot:'lin',
  text:'看。你跑着找盘那段，我都拍下来了。'},
 'COLD/g':{
  flag:['opening_authorization_checked',true],voice:'顾晚棠',shot:'gu',
  text:'邮件我查过了。有人没打招呼就换了伴奏。'},
 'COLD/self':{
  flag:['opening_method','audio_handoff'],voice:'阿衡',shot:'crew',
  text:'盘是你翻出来的，歌是我切的。别把锅混一块儿。'},
 'OP_FORK/backup':{
  flag:['proof_version_log',true],voice:'阿衡',shot:'console',
  text:'两份文件都在。谁要赖账，让他自己来看。'},
 'OP_FORK/confront':{
  flag:['cheng_questioned_early',true],voice:'程放',shot:'console',
  text:'好啊，当着群里那么多人问我。明早来办公室。'},
 'OP_FORK/quiet':{
  flag:['source_personal_record',true],voice:'许照 · 心声',shot:'console',
  text:'今晚算躲过去了。可文件是谁删的，我还不知道。'},
 'OP_TALK_t/flirt':{
  flag:['opening_style_t','flirt'],voice:'唐映雪',shot:'singerBond',
  text:'你这人……刚挨完骂，还有心思逗我笑。'},
 'OP_TALK_t/slow':{
  flag:['opening_style_t','slow'],voice:'唐映雪',shot:'singerBond',
  text:'那就坐一会儿。水在那边，我给你留的。'},
 'OP_TALK_t/work':{
  flag:['named_in_credits',true],voice:'唐映雪',shot:'singerBond',
  text:'下场缺人的话我叫你。你别又熬通宵。'},
 'OP_TALK_s/flirt':{
  flag:['contact_s','private'],voice:'沈清辞',shot:'shen',
  text:'号码给你。别每回都只发工作截图，行吗？'},
 'OP_TALK_s/slow':{
  flag:['opening_style_s','slow'],voice:'沈清辞',shot:'shen',
  text:'先存号码。你手还在抖呢，话可以明天再说。'},
 'OP_TALK_s/work':{
  flag:['contact_s','work'],voice:'沈清辞',shot:'shen',
  text:'我拉你进工作群。下回别一个人扛事。'},
 'OP_TALK_l/flirt':{
  flag:['private_photo','two_people_only'],voice:'林见月',shot:'lin',
  text:'好，只发你。下次拍我记得喊一声啊！'},
 'OP_TALK_l/slow':{
  flag:['private_photo','not_taken'],voice:'林见月',shot:'lin',
  text:'行，我收相机。你别老躲得像我拿了枪。'},
 'OP_TALK_l/work':{
  flag:['project_shot','consented'],voice:'林见月',shot:'lin',
  text:'知道啦，工作照归工作照。你先别红耳朵。'},
 'OP_TALK_g/flirt':{
  flag:['contact_g','private'],voice:'顾晚棠',shot:'gu',
  text:'这个号没工作群。你要真约我，就发这里。'},
 'OP_TALK_g/slow':{
  flag:['opening_style_g','slow'],voice:'顾晚棠',shot:'gu',
  text:'我不赶时间。你要想说，哪天都能说。'},
 'OP_TALK_g/work':{
  flag:['contact_g','work'],voice:'顾晚棠',shot:'gu',
  text:'我把工作名片发你。下次别只会说“麻烦您”。'}
});
let v10={v:V10_VERSION,pending:null};
function v10Read(raw){
 const out={v:V10_VERSION,pending:null},p=raw?.pending;
 if(raw?.v!==V10_VERSION||!p||!Object.hasOwn(V10_AFTER,p.key))return out;
 if(!Number.isInteger(p.revision)||p.revision<1||typeof p.target!=='string'||p.target.length>80)return out;
 out.pending={key:p.key,revision:p.revision,target:p.target};return out;
}
const v10BeforeSnapshot=snapshot,v10BeforeRead=readPayload,v10BeforeInstall=install,v10BeforeReset=reset;
snapshot=function(){const x=v10BeforeSnapshot();x.ui.causalityV10={v:V10_VERSION,pending:v10.pending?{...v10.pending}:null};return x;};
readPayload=function(raw){const x=v10BeforeRead(raw);x.causalityV10=v10Read(raw?.ui?.causalityV10);return x;};
install=function(x){v10BeforeInstall(x);v10=x.causalityV10||v10Read(null);};
reset=function(){const old=state;v10BeforeReset();if(old!==state&&state.history.length===0)v10=v10Read(null);};

/* Replace the introductory non-choices with one real action. Clicking to rise
 * keeps the VN rhythm; it no longer pretends that a hand gesture is a branch. */
ioActions.wake=[['next','站起来']];
ioNext.wake='badge';
ioActions.final=[
 ['rescue','先救她，原版马上送过去'],
 ['investigate','先留错版证据，让她再撑一下'],
 ['canon','我不碰设备，让专业的人来']
];
const v10BeforeLine=ioLine;
ioLine=function(){
 switch(io.step){
 case 'spotlight':return {voice:'唐映雪',portrait:'t',mood:'stage',text:'喂，伴奏错了！别切麦，我还能接上！'};
 case 'wake':return {voice:'阿衡 · 场务',portrait:null,mood:'wake',text:'许照！醒醒！台上等着换伴奏呢！'};
 case 'badge':return {voice:'许照 · 心声',portrait:null,mood:'badge',text:'许照？……坏了，我成了小说里七天后被开除的那个。'};
 case 'crisis':return {voice:'沈清辞 · 对讲机',portrait:null,mood:'stage',text:'许照，去箱子里找原版！阿衡先别切音乐，等我。'};
 case 'hunt':return {voice:'许照 · 心声',portrait:null,mood:'search',text:io.seen.includes('usb')?'盘有了。要是现在送过去，程放准找我麻烦。':'琴都快撑不住了。原版盘到底塞哪儿了？'};
 case 'find':return {voice:'许照 · 心声',portrait:null,mood:'search',text:io.lastFind==='usb'?'找着了！蓝胶带，没错，就是这只盘。':io.lastFind==='sheet'?'上面写着我负责，谁导出的音乐怎么是空的？':'怎么少了一段前奏？昨晚排练不是这版啊。'};
 case 'pressure':return {voice:'程放 · 主管',portrait:null,mood:'block',text:'临时工的名字最好写。你先签了，别让大家等。'};
 case 'bond':return {voice:'唐映雪',portrait:'t',mood:'bond',text:'侧幕那边，听得到吗？我还能撑四小节！'};
 case 'final':return {voice:'许照 · 心声',portrait:null,mood:'decision',text:'盘就在手上。送过去，还是把证据先留下？'};
 default:return v10BeforeLine();
 }
};
const v10BeforeChoices=ioChoices;
ioChoices=function(step){
 if(step==='hunt'){
  const html=v10BeforeChoices(step);
  if(io.seen.includes('usb'))return html.replace('去处理舞台危机','先去侧幕');
  return html+'<button type="button" class="io-advance" data-io="move">现在去作决定 <span aria-hidden="true">›</span></button>';
 }
 if(step==='final'&&!io.seen.includes('usb'))return '<div class="io-choice-stack" role="group" aria-label="作出有代价的决定">'+
  '<button type="button" class="io-choice" data-io="canon">先别碰，我不能替人背锅 <span aria-hidden="true">↗</span></button>'+
  '<button type="button" class="io-choice" data-io="backsearch">等等，我还是回去找盘 <span aria-hidden="true">↗</span></button></div>';
 return v10BeforeChoices(step);
};
const v10BeforeAction=ioAction;
ioAction=function(action){
 if(ioActive()&&io.step==='hunt'&&action==='move'&&!io.seen.includes('usb')){
  io.step='pressure';choiceSound();save();render();arm();return;
 }
 if(ioActive()&&io.step==='final'&&action==='backsearch'){
  io.step='hunt';choiceSound();save();render();arm();return;
 }
 v10BeforeAction(action);
};

/* Decisions shown to players must answer the line they have just heard. */
const V10_TALK=Object.freeze({
 OP_TALK_t:[
  {voice:'唐映雪',shot:'singerBond',text:'许照，刚才那人是不是冲你发火了？'},
  {voice:'唐映雪',shot:'singerBond',text:'你想先歇会儿，还是还打算留在后台？'}],
 OP_TALK_s:[
  {voice:'沈清辞',shot:'shen',text:'刚才有人拿责任单来催。我让他先放桌上了。'},
  {voice:'沈清辞',shot:'shen',text:'我这里有工作号。还有……你要不要加我的私人号？'}],
 OP_TALK_l:[
  {voice:'林见月',shot:'lin',text:'给你看张照片。你钻设备箱那会儿，头发全乱了。'},
  {voice:'林见月',shot:'lin',text:'这张拍到你正脸了。你想留吗？不想我就删。'}],
 OP_TALK_g:[
  {voice:'顾晚棠',shot:'gu',text:'我把邮件核了。至少能证明你没乱改那段音乐。'},
  {voice:'顾晚棠',shot:'gu',text:'今晚也算认识了。以后你是只想找我谈工作吗？'}]
});
// Update only display labels: the ID and all saved story consequences remain canonical.
Object.assign(IF_FOLLOW.ENTRY_CLUES.labels,{
 obey:'这上面不是我做的。我不能乱签',
 refuse:'不签，谁换的音乐谁负责',
 witness:'阿衡，咱们把当时的时间记下来'
});
Object.assign(IF_FOLLOW.ENTRY_MEMORY.labels,{
 camera:'见月，你能帮我把这段拍下来吗？',
 email:'晚棠，麻烦你查下这封邮件'
});
IF_FOLLOW.COLD.text='原版盘有了。谁来帮你把歌救回来？';
Object.assign(IF_FOLLOW.COLD.labels,{
 t:'映雪，听我手势，我帮你切回去',
 s:'清辞，原版在这儿！你看着切换',
 l:'见月，你先帮我们拍个记录',
 g:'晚棠，那封授权邮件到底怎么写的？',
 self:'阿衡，盘给你。别冒险自己插'
});
Object.assign(IF_FOLLOW.OP_FORK.labels,{
 backup:'先把两份文件都拷下来',
 confront:'我现在就在群里问清楚',
 quiet:'先别闹大，我把手里的东西收好'
});
Object.assign(IF_FOLLOW.OP_TALK_t.labels,{
 flirt:'“我想留下来，至少把你的歌听完。”',
 slow:'“先让我缓一缓，再去面对他。”',
 work:'“下场演出还缺人吗？我想认真做。”'
});
Object.assign(IF_FOLLOW.OP_TALK_s.labels,{
 flirt:'“工作之外，也想认识你。”',
 slow:'“能慢慢认识吗？我还有点紧张。”',
 work:'“给我工作号就好，我先证明自己。”'
});
Object.assign(IF_FOLLOW.OP_TALK_l.labels,{
 flirt:'“只发我。下一张换我拍你。”',
 slow:'“别拍我，今天我还不想留照片。”',
 work:'“留工作记录就行，私人照片不拍。”'
});
Object.assign(IF_FOLLOW.OP_TALK_g.labels,{
 flirt:'“工作说完了，我想私下认识你。”',
 slow:'“我想认识，但能慢慢来吗？”',
 work:'“我想凭本事拿下一场工作。”'
});

const V10_FORK=Object.freeze({
 canon:[
  {voice:'许照 · 心声',shot:'stage',text:'他接上了琴，台下在鼓掌。我躲在箱子后没敢动。'},
  {voice:'程放',shot:'console',text:'你，临时场务？过来，把今晚的表签一下。'}
 ],
 rescue:[
  {voice:'唐映雪',shot:'singerBond',text:'看见了吗？我接回来了！……刚才谢谢你。'},
  {voice:'程放 · 身后',shot:'console',text:'谁让你翻箱子的？散场别走，我找你有事。'}
 ],
 investigate:[
  {voice:'沈清辞',shot:'shen',text:'盘先别插！阿衡来切。我去找人调监控。'},
  {voice:'许照 · 心声',shot:'stage',text:'她又等了一个四小节。我攥着盘，手心全是汗。'}
 ]
});
const v10BeforeStory=storyHTML;
function v10PayoffActive(){
 const p=v10.pending,h=state.history.at(-1);
 return !!p&&panel==='story'&&phase==='scene'&&!!h&&
  state.current===p.target&&state.history.length===p.revision&&
  p.key===h.from+'/'+h.id&&Object.hasOwn(V10_AFTER,p.key)&&
  state.f[V10_AFTER[p.key].flag[0]]===V10_AFTER[p.key].flag[1];
}
function v10PayoffHTML(){
 const info=V10_AFTER[v10.pending.key];
 return v9Scene(info,{kind:'after'})
  .replace('data-v9-kind="after"','data-v10-kind="payoff"')
  .replace('data-v9-next="after"','data-v10-next="payoff"');
}
storyHTML=function(){
 if(v10PayoffActive())return v10PayoffHTML();
 if(v9AfterActive())return v9Scene(V10_FORK[v9.after.fork][v9.after.index],{kind:'after'});
 if(v9TalkActive()){
  const beats=V10_TALK[state.current];
  return v9Scene(beats[v9TalkIntroActive()?0:1],{kind:'talk',choices:!v9TalkIntroActive()});
 }
 return v10BeforeStory();
};
const v10BeforeFollowPick=ioFollowPick;
ioFollowPick=function(id){
 const n=state.history.length;
 v10BeforeFollowPick(id);
 if(state.history.length===n)return;
 const h=state.history.at(-1),key=h.from+'/'+h.id,info=V10_AFTER[key];
 if(!info||state.f[info.flag[0]]!==info.flag[1])return;
 v10.pending={key,revision:state.history.length,target:state.current};
 save();render();arm();
};
// One click acknowledges a real outcome; refreshing before the click preserves it.
document.addEventListener('click',e=>{
 if(!v10PayoffActive())return;
 const target=e.target instanceof Element?e.target:null;
 if(!target?.closest('.v9-cinema[data-v10-kind="payoff"]'))return;
 e.preventDefault();e.stopImmediatePropagation();
 v10.pending=null;choiceSound();save();render();arm();
},true);
