/* V10: consequences have to be true in the canonical engine.
 * Every visible aftermath is keyed to a real engine action and guarded by the
 * flag it actually wrote. UI micro-actions never grant story progress/affinity.
 * Canonical JSON/engine/replay logic are not rewritten by this director.
 */
const V10_VERSION=1;
const V10_AFTER=Object.freeze({
 'ENTRY_CLUES/obey':{
  flag:['canon_signed_blame',true],voice:'程放',shot:'console',
  text:'签了就好。明天有人追责，我把这张给他们看。'},
 'ENTRY_CLUES/refuse':{
  flag:['source_declined_handover',true],voice:'程放',shot:'console',
  text:'不签？行。明天你当着所有人的面解释。'},
 'ENTRY_CLUES/witness':{
  flag:['source_original_timeline',true],voice:'阿衡',shot:'console',
  text:'你记下时间，我能证明控台不是你动的。'},
 'ENTRY_MEMORY/camera':{
  flag:['source_pre_switch_timestamp',true],voice:'林见月',shot:'lin',
  text:'原版标签和时钟都拍到了。这段我不会删。'},
 'ENTRY_MEMORY/email':{
  flag:['source_programme_approval_note',true],voice:'顾晚棠',shot:'gu',
  text:'批准的版本没有删前奏。程放，是谁改的？'},
 'COLD/t':{
  flag:['opening_method','performer_cue'],voice:'唐映雪',shot:'singerBond',
  text:'我把歌唱回来了。下来以后，我要找你。'},
 'COLD/s':{
  flag:['opening_method','producer_switch'],voice:'沈清辞',shot:'shen',
  text:'找到盘的是你，切换的是阿衡。我都记下了。'},
 'COLD/l':{
  flag:['opening_switch_video',true],voice:'林见月',shot:'lin',
  text:'谁找盘、谁验盘，我拍清楚了。不会让人乱说。'},
 'COLD/g':{
  flag:['opening_authorization_checked',true],voice:'顾晚棠',shot:'gu',
  text:'授权没问题，是有人擅自换了版本。得追。'},
 'COLD/self':{
  flag:['opening_method','audio_handoff'],voice:'阿衡',shot:'crew',
  text:'你找的盘，我切的歌。记录要各写各的。'},
 'OP_FORK/backup':{
  flag:['proof_version_log',true],voice:'阿衡',shot:'console',
  text:'两版都备份了。明天谁想甩锅，拿时间说话。'},
 'OP_FORK/confront':{
  flag:['cheng_questioned_early',true],voice:'程放',shot:'console',
  text:'在群里质问我是吧？明天来写书面说明。'},
 'OP_FORK/quiet':{
  flag:['source_personal_record',true],voice:'许照 · 心声',shot:'console',
  text:'今晚躲过去了。可删档的人是谁，我还是没证据。'},
 'OP_TALK_t/flirt':{
  flag:['opening_style_t','flirt'],voice:'唐映雪',shot:'singerBond',
  text:'刚救完场还敢夸我。好吧，这句话我收下。'},
 'OP_TALK_t/slow':{
  flag:['opening_style_t','slow'],voice:'唐映雪',shot:'singerBond',
  text:'先坐一会儿。今天不用再逞强。'},
 'OP_TALK_t/work':{
  flag:['named_in_credits',true],voice:'唐映雪',shot:'singerBond',
  text:'下场我帮你问。但可别把工作当成约会。'},
 'OP_TALK_s/flirt':{
  flag:['contact_s','private'],voice:'沈清辞',shot:'shen',
  text:'这是私人号。凌晨三点可别发“在吗”。'},
 'OP_TALK_s/slow':{
  flag:['opening_style_s','slow'],voice:'沈清辞',shot:'shen',
  text:'号码先存着。等你不紧张了，我们慢慢聊。'},
 'OP_TALK_s/work':{
  flag:['contact_s','work'],voice:'沈清辞',shot:'shen',
  text:'工作群给你加上。私人号码就先不留了。'},
 'OP_TALK_l/flirt':{
  flag:['private_photo','two_people_only'],voice:'林见月',shot:'lin',
  text:'照片只发你。下回拍我，得先让我挑角度。'},
 'OP_TALK_l/slow':{
  flag:['private_photo','not_taken'],voice:'林见月',shot:'lin',
  text:'好，那张私人照片就不拍。你不用勉强。'},
 'OP_TALK_l/work':{
  flag:['project_shot','consented'],voice:'林见月',shot:'lin',
  text:'只拍工作证据。属于我们俩的照片，先没有。'},
 'OP_TALK_g/flirt':{
  flag:['contact_g','private'],voice:'顾晚棠',shot:'gu',
  text:'工作号不谈私事。这个私人号，可以给你。'},
 'OP_TALK_g/slow':{
  flag:['opening_style_g','slow'],voice:'顾晚棠',shot:'gu',
  text:'你不用急。想认识一个人，不靠抢时间。'},
 'OP_TALK_g/work':{
  flag:['contact_g','work'],voice:'顾晚棠',shot:'gu',
  text:'负责人名片给你。私人联系方式还不合适。'}
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
 ['rescue','把原版送上台 · 她会记住我'],
 ['investigate','先留证据 · 舞台还得再撑一会儿'],
 ['canon','暂不插手 · 让别人救她']
];
const v10BeforeLine=ioLine;
ioLine=function(){
 switch(io.step){
 case 'spotlight':return {voice:'唐映雪',portrait:'t',mood:'stage',text:'……伴奏被换了。别关麦，我还能唱。'};
 case 'wake':return {voice:'阿衡 · 场务',portrait:null,mood:'wake',text:'许照！起来！台上的歌手快撑不住了！'};
 case 'badge':return {voice:'许照 · 心声',portrait:null,mood:'badge',text:'许照？我穿进了刚读的小说。七天后，背锅的是我。'};
 case 'crisis':return {voice:'沈清辞 · 对讲机',portrait:null,mood:'stage',text:'我是现场负责人。原版可能在设备箱，先找，别乱动控台。'};
 case 'hunt':return {voice:'许照 · 心声',portrait:null,mood:'search',text:io.seen.includes('usb')?'原版找到了。救她会被主管盯上，怎么办？':'台上快撑不住了。我去找原版，还是先保自己？'};
 case 'find':return {voice:'许照 · 心声',portrait:null,mood:'search',text:io.lastFind==='usb'?'蓝胶带！原版盘就在这里。她还有机会。':io.lastFind==='sheet'?'签字栏让我确认现场，可谁导出的错版却没写。':'控台播的是删减版，操作员那一栏空着。'};
 case 'pressure':return {voice:'程放 · 主管',portrait:null,mood:'block',text:'不管谁放错的，你是临时工。出了事先由你签字。'};
 case 'bond':return {voice:'唐映雪',portrait:'t',mood:'bond',text:'我还撑得住。侧幕那边的人，你能帮我吗？'};
 case 'final':return {voice:'许照 · 心声',portrait:null,mood:'decision',text:'救她会惹麻烦；先顾自己，就可能错过她。'};
 default:return v10BeforeLine();
 }
};
const v10BeforeChoices=ioChoices;
ioChoices=function(step){
 if(step==='hunt'){
  const html=v10BeforeChoices(step);
  if(io.seen.includes('usb'))return html.replace('去处理舞台危机','现在决定下一步');
  return html+'<button type="button" class="io-advance" data-io="move">现在去作决定 <span aria-hidden="true">›</span></button>';
 }
 if(step==='final'&&!io.seen.includes('usb'))return '<div class="io-choice-stack" role="group" aria-label="作出有代价的决定">'+
  '<button type="button" class="io-choice" data-io="canon">先保自己 · 舞台让别人救 <span aria-hidden="true">↗</span></button>'+
  '<button type="button" class="io-choice" data-io="backsearch">回去找原版 · 争取自己救她 <span aria-hidden="true">↗</span></button></div>';
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
  {voice:'唐映雪',shot:'singerBond',text:'程放刚才在找你。今晚你为了救场，得罪他了。'},
  {voice:'唐映雪',shot:'singerBond',text:'他还在那边等着。你现在想怎么做？'}],
 OP_TALK_s:[
  {voice:'沈清辞',shot:'shen',text:'错版的事有人想压下来。我不准备替他盖章。'},
  {voice:'沈清辞',shot:'shen',text:'你要我留私人号码，还是只谈下一场工作？'}],
 OP_TALK_l:[
  {voice:'林见月',shot:'lin',text:'我拍到你拿盘那一刻。但照片里也有你的脸。'},
  {voice:'林见月',shot:'lin',text:'要我只发给你，还是干脆不拍私人照片？'}],
 OP_TALK_g:[
  {voice:'顾晚棠',shot:'gu',text:'邮件能证明版本被换过，但还不能证明是谁动的。'},
  {voice:'顾晚棠',shot:'gu',text:'你想认识我，还是更想接到下一场工作？'}]
});
// Update only display labels: the ID and all saved story consequences remain canonical.
Object.assign(IF_FOLLOW.ENTRY_CLUES.labels,{
 obey:'签字认账 · 今天脱身，之后可能背锅',
 refuse:'当面拒签 · 不背锅，但会得罪主管',
 witness:'先留时间线 · 现在没法直接翻案'
});
Object.assign(IF_FOLLOW.ENTRY_MEMORY.labels,{
 camera:'让见月拍证据 · 留住换版时间',
 email:'找晚棠核授权 · 当面追问程放'
});
IF_FOLLOW.COLD.text='原版盘有了。谁来帮你把歌救回来？';
Object.assign(IF_FOLLOW.COLD.labels,{
 t:'找唐映雪 · 她会知道是谁救了她',
 s:'找沈清辞 · 让负责人替你记下功劳',
 l:'找林见月 · 同时留下照片证据',
 g:'找顾晚棠 · 直接核查谁换了版本',
 self:'和阿衡配合 · 稳妥切换，不抢功劳'
});
Object.assign(IF_FOLLOW.OP_FORK.labels,{
 backup:'备份文件 · 明天有人甩锅时有证据',
 confront:'群里质问 · 会被主管针对',
 quiet:'暂不出声 · 今晚平安，证据可能流失'
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
  {voice:'许照 · 心声',shot:'stage',text:'我没冲上去。钢琴手陆景行救了场，掌声是他的。'},
  {voice:'程放',shot:'console',text:'你是临时场务许照吧？这张交接单，签了。'}
 ],
 rescue:[
  {voice:'唐映雪',shot:'singerBond',text:'我唱回来了。你在侧幕，我看见了。'},
  {voice:'程放 · 身后',shot:'console',text:'谁让你翻设备箱的？这事我回头跟你算。'}
 ],
 investigate:[
  {voice:'沈清辞',shot:'shen',text:'先留住证据。我能安排切换，但别把盘乱插。'},
  {voice:'许照 · 心声',shot:'stage',text:'我拿到了线索，却让她在台上多等了一段。'}
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