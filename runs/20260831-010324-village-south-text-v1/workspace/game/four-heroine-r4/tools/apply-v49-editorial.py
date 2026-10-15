#!/usr/bin/env python3
"""Authorial, source-only punch-up: no effects/conditions/route IDs modified.
Run once on a fresh copy of the verified v4.8 STORY.json.
"""
import json,hashlib,copy
from pathlib import Path
R=Path(__file__).resolve().parent.parent
source=R/'data/STORY.json'
before_bytes=source.read_bytes();oldhash=hashlib.sha256(before_bytes).hexdigest()
assert oldhash=='fae2d536b2b2a12436d0f39cf7a40abe516cde13a87c4295662ecba181dedbf8',oldhash
D=json.loads(before_bytes); patch=[];st=D['scenes']; seen=set()

def write(scene,loc,new,choice=None,index=None):
    sc=st[scene]; item=None;path=''
    if loc=='title':
        old=sc['title'];sc['title']=new
        path=scene+'/title'
        assert old!=new
        patch.append({'scene':scene,'path':path,'before':old,'after':new,'kind':'scene_title'})
        return
    if loc=='label':
        c=next(x for x in sc['choices'] if x['id']==choice)
        old=c['label'];c['label']=new;path=scene+'/'+choice+'/label'
        patch.append({'scene':scene,'path':path,'before':old,'after':new,'kind':'choice_label'});
        assert old!=new;return
    if loc=='body': item=sc['body'][index];path=scene+'/body/'+str(index)
    if loc=='reply':
        c=next(x for x in sc['choices'] if x['id']==choice)
        item=c['reply'][index];path=scene+'/'+choice+'/reply/'+str(index)
    if loc=='block':
        i,j=index;item=sc['blocks'][i]['lines'][j];path=scene+'/blocks/'+str(i)+'/lines/'+str(j)
    if loc=='replyBlock':
        i,j=index;c=next(x for x in sc['choices'] if x['id']==choice)
        item=c['replyBlocks'][i]['lines'][j];path=scene+'/'+choice+'/replyBlocks/'+str(i)+'/lines/'+str(j)
    assert item is not None,(scene,loc,choice,index)
    assert item.get('speaker') in ('N','P','B','A','C','LU','T','S','L','G','U','X'),(scene,item)
    assert path not in seen,('duplicate edit',path)
    seen.add(path)
    old=item['text'];assert old and old!=new,(scene,path)
    item['text']=new
    if 'textHash' in item:item['textHash']=hashlib.sha256((item['speaker']+'\0'+new).encode()).hexdigest()[:16]
    patch.append({'scene':scene,'path':path,'id':item.get('id'),'speaker':item['speaker'],'before':old,'after':new,'kind':'text'})

# --- First 90 seconds: the victim's ending is an immediate hook, not a third-page abstract threat. ---
write('ENTRY_WAKE','title','第七天，我会替人背锅')
for i,new in {
0:'《今夜偏爱男主》第十三章，你最想撕掉的一页：临时场务许照因演出事故被清退。错版不是他做的，交接单上的签名却是他的。你盯着那行字，越看越火。',
1:'你正往前翻，想看他究竟哪一步被人套住，手机上的字忽然一片重影。桌沿从指尖消失，整个人向下坠去。',
3:'后背狠狠撞上金属箱角。你猛地睁眼，舞台灯刺得睁不开眼。台前几百人的说话声混着催场的倒数，仿佛下一秒就要出事。',
6:'你扶着箱盖站稳。胸前工牌晃到眼前：许照，临时场务。连照片都是陌生人的脸。那个第七天会被赶出去的炮灰，现在是你。',
7:'（等等，我刚刚还在看小说……怎么连胸前这张工牌都是真的？）',
9:'沈清辞！唐映雪的伴奏被换成什么版本了？现在就开场！',
10:'停！前奏被剪掉了！这不是我排练的歌！',
13:'（唐映雪、沈清辞、陆景行……连这场事故都一模一样。不是撞名，我真的掉进书里了。）',
15:'我记得这场！北岸艺术中心首演，19:03，错误的伴奏把唐映雪逼到台边。书里是陆景行弹琴救场，一夜出了名。',
17:'你狠狠掐了一下手心，痛得倒抽气。没有退出按钮，原著也不会替你暂停。身后就是放着事故文件的设备箱。',
19:'不用。我还能站稳。（别人靠这一场翻身，我却可能从这里开始背锅。）',
20:'原著里，许照听程放的话守在设备箱旁，眼睁睁看陆景行接过舞台。没人核对真正的错版来源，七天后，程放把责任推到他签过的交接单上。',
21:'唐映雪的歌火了，署名和版本却不由她定；沈清辞想保下来的小演出厅，最后成了巡演排练基地。她们当时还不知道，今晚就是第一道岔路。',
22:'林见月的镜头本来能留下真相，可原著让她追着陆景行的巡演跑；顾晚棠反对过那个版本，最后却被当成拍板的人。书里每个人都付了代价。',
23:'匿名电台、旁厅、现场原声、没公开的意见邮件……我知道线索在哪，但现在手里一件证据都没有。记得剧情不等于能凭空拿出东西。',
24:'而我自己的死线只有七天。原著第十三章，许照连一句完整的解释都没说出来，就被保安送出侧门。这一次，我至少不能在第一天签下那张糊涂账。',
25:'还有一条被小说一笔带过的细节：接线板下面，压着一枚贴蓝胶带的原版 U 盘。书里没人找到它。你低头——设备箱就贴在膝边。',
26:'（按原著走，我能提前看清谁想甩锅；动手找盘，我能抢在钢琴救场前改写这一幕；先查证据，也许能把第七天的陷阱提前拆了。）',
27:'台上，唐映雪等着重新进歌。陆景行的手悬在琴键上，程放朝你伸手，要你别碰箱子。第一次改命的机会，只剩几个呼吸。'
}.items():write('ENTRY_WAKE','body',new,index=i)
for cid,label in [('canon','先按原著走：看清是谁准备甩锅'),('rescue','抢先救场：找到原版，让她唱回来'),('investigate','先锁证据：找原版，也查谁换了文件')]:write('ENTRY_WAKE','label',label,choice=cid)
for cid,txt in {
'canon':'你把伸向箱盖的手收回来。陆景行坐上琴凳，原著的掌声照样响起；而你盯住程放——比起钢琴声，他手里那张等着你签的交接单更危险。',
'rescue':'你不再等任何人喊“开始”。扒开压住线卷的箱盖，指尖碰到了蓝胶带。那枚原著里没人找到的 U 盘，现在就在你手里。',
'investigate':'你没有直接喊“有人做局”。一边找到蓝标盘，一边扫过控台、相机和节目邮件：救场要快，证据得比对方撤回消息更快。'
}.items():write('ENTRY_WAKE','reply',txt,choice=cid,index=0)

# --- The canonical path is a strategic, playable choice, not simply passive cowardice. ---
write('ENTRY_CLUES','title','原著的掌声，藏着我的陷阱')
for i,new in {
0:'程放伸手按住箱盖：“临时工别乱碰，守好你的东西。”他看见你盯着控台时间，忽然把工作单翻到空白签名页。书里没有写过这个小动作。',
3:'陆景行用四小节钢琴稳住现场。唐映雪自己接完后半句，掌声盖过了侧幕的争执。你没有抢这场救援，却把程放递交接单的时间记得清清楚楚。',
4:'下一幕果然来了。程放把交接单递到你面前，最上面写着“现场版本确认”，下面却没有划清是谁负责导出、谁负责播放。',
5:'（我可以继续照原著签字，也可以从第一张纸开始改命。早知道结局的人，至少该知道哪一行不能随手签。）'
}.items():write('ENTRY_CLUES','body',new,index=i)
for cid,label in [('obey','继续照原著签：换眼前清静，留下风险'),('refuse','当面拒签：不给错版认账'),('witness','先留时间线：让证据比嘴硬更早一步')]:write('ENTRY_CLUES','label',label,choice=cid)
write('ENTRY_CLUES','reply','程放合上文件夹，露出个“这才懂事”的笑。你换来了今晚的清静，却亲眼看见自己的名字压在“版本确认”下面。第七天，这一笔会回来找你。',choice='obey',index=1)
write('ENTRY_CLUES','reply','程放脸上的笑僵了一瞬，随即把交接单往回一抽。你留下一条明确的拒签记录，也提前把自己放进了他的视线。',choice='refuse',index=2)
write('ENTRY_CLUES','reply','你把19:03的错误伴奏、陆景行介入与控台值守时间分成三行记下。它还不能证明谁有错，却是原著里从来没有出现过的第一条独立时间线。',choice='witness',index=0)

# --- Investigation and the first visible win. No omniscience or unearned technical competence. ---
write('ENTRY_MEMORY','title','抢到原版还不够，得锁住证据')
write('ENTRY_MEMORY','body','蓝标 U 盘真的压在接线板下面。你握住它，几乎想直接冲向控台，又马上停住：你没学过音控，乱切只会把救场变成另一场事故。找盘是你的本事，验盘得交给阿衡。',index=0)
write('ENTRY_MEMORY','body','林见月的镜头对着控台，顾晚棠手里正是演出审批邮件。一边是现场影像，一边是版本授权——这不是两个摆设，而是能让第七天那条假字幕站不住脚的两种证据。',index=2)
write('ENTRY_MEMORY','body','（我知道原著怎么写，但她们只认眼前能核的事。先拿出真的东西，才有资格问程放为什么急着拦。）',index=3)
write('ENTRY_MEMORY','label','先锁镜头：让见月留住切换前后',choice='camera')
write('ENTRY_MEMORY','label','先查授权：让晚棠对照真正的节目单',choice='email')
write('ENTRY_MEMORY','reply','见月先拍清蓝标与控台时间，替接下来的试听、切换留好取证位置。录制指示灯亮起时，你知道至少这一秒不会只剩口说。',choice='camera',index=2)
write('ENTRY_MEMORY','reply','顾晚棠看完审批邮件，抬头望向程放。他先移开了视线。你的调查还没结束，却已经逼出了原著里没有的第一反应。',choice='email',index=1)
write('COLD','title','原版在手，轮到我改写救场')
for i,new in {
0:'蓝标盘就在掌心，台上的倒数却不会等你。原著里，它会在箱底躺到散场；现在只差一个真正能让唐映雪接回自己歌曲的人。',
1:'先把盘拿稳，别自己插！我得亲耳试听。你去找能发切换信号的人；确认能用以后，控台由我操作。',
2:'陆景行的手停在琴键上，唐映雪正扶着耳返寻找侧幕的回应。你只有几秒决定：把舞台交给谁指挥，也决定谁会记住你的名字。'
}.items():write('COLD','body',new,index=i)
for cid,label in [('t','直接找唐映雪：由她喊回原版'),('s','找沈清辞控场：一拍切回正确版本'),('l','找林见月取证：救场和记录一起做'),('g','找顾晚棠核授权：让程放当场解释'),('self','和阿衡搭档：我找盘，他安全切')]:write('COLD','label',label,choice=cid)
write('COLD','reply','映雪自己数拍，阿衡按信号接回完整前奏。她稳稳唱上那个高音，掌声像涨潮一样盖住了侧幕里的争执。程放僵在一边，映雪却朝你招手。',choice='t',index=4)
write('COLD','reply','切换只空了一拍，观众以为这是刻意设计的停顿。清辞把手里的对讲机放低，朝你点了一下头——这次，名字不会只写给台前的人。',choice='s',index=2)
write('COLD','reply','你把盘交给阿衡试听，见月先拍下标签和他确认音轨的时间。接下来的实际切换，她要等动作发生才继续拍，绝不提前替任何人定结论。',choice='l',index=3)
write('COLD','reply','宣传预览也是这份，我以为可以直接用……',choice='g',index=3)
write('COLD','reply','阿衡在切换记录里写清：许照找到备用伴奏，阿衡执行切换。你不需要装成什么全能音控；把对的人放到对的位置，照样能改写原著。',choice='self',index=3)

# --- New plot momentum in the first session and rivalry based on results, not possessive harem. ---
write('OP_FORK','title','程放撤回的消息，我看见了')
for i,new in {
0:'你手机一震。程放在工作群丢下一句：“谁翻出的旧盘？旧版文件清掉，别多嘴。”下一秒，消息被撤回。掌声还没散，新的麻烦已经盯上你。',
1:'（原著根本没这条消息，因为原版从来没被翻出来。）你原本只想救场，现在却逼得有人提前出手。改命的第一笔收益，是被更多人记住；第一笔风险，也是。',
2:'旧版我会照流程留着。试听和切换的部分我签；你想反击就拿自己能证明的，别让我替没看见的事背书。'
}.items():write('OP_FORK','body',new,index=i)
for cid,label in [('backup','暗中留证：双版本和时间锁死'),('confront','正面反击：群里追问谁下的删档令'),('quiet','先藏锋芒：保管交接，等他露破绽')]:write('OP_FORK','label',label,choice=cid)
write('OP_FORK','reply','程放撤回得很快。可你和阿衡的两份时间记录已经存好。你第一次确定：掌握先手不是靠背台词，而是让他以后没法随便改口。',choice='backup',index=1)
write('OP_FORK','reply','群里安静了足足三秒。程放没回答你的问题，只让你明天交说明——原著里的刁难整整提前了六天。你被盯上了，也把他“急着删档”的反应留在了群里。',choice='confront',index=1)
write('OP_FORK','reply','你没有跟着吵，把阿衡签过的记录单独存好。程放暂时以为你退了；你知道代价是还没有谁肯当场确认那条删档令。',choice='quiet',index=0)
write('OP_CANON','title','台前是他，背锅单却写我的名')
write('OP_CANON','body','陆景行的钢琴救了场，唐映雪也稳住了后半首。工作人员围着他道谢，你没有硬抢这份功劳，却看见程放在旁边把“文件出错”和“现场确认”塞进同一行责任栏。',index=0)
write('OP_CANON','body','（这场掌声属于他们。我要抢的是第七天还能站在这里的资格。）你抬头再看交接单，原著里那一笔稀里糊涂的签名，现在正等你自己写。',index=2)
for cid,label in [('backstage','守住幕后：和阿衡共同清点，留第一张记录'),('question','当面追问：让程放把推托发在群里'),('silence','暂时不亮牌：记下背锅链的每一步')]:write('OP_CANON','label',label,choice=cid)
write('OP_CANON','reply','阿衡在末场清点上留下了你的真实分工。今晚你没有改变那段钢琴，却把原著里“什么都没留下”的那一步先改掉了。',choice='backstage',index=1)
write('OP_CANON','reply','程放不肯回答，群里却留下了他的推托。你没拿到直接证据，却让未来追查时多了一条可以对时的消息。',choice='question',index=1)
write('OP_RIVAL','title','原男主没停下，我也不能停')
write('OP_RIVAL','body','首演结束。你以为失去钢琴名场面的陆景行会有些难堪，他却抱着乐谱走下来，直接给制作人打了电话。原男主的机会从来不只靠这一场。',index=0)
write('OP_RIVAL','body','（原著里这份邀约三天后才出现。）你抢到一次改命机会，他就把下一个舞台提前了。想赢过这样的人，不能靠等他犯错。',index=4)
for cid,label in [('join','抢一份正式试工：跟原男主同场见真本事'),('own','另做个人小样：不靠他的名单争机会'),('free','放掉这次名额：今晚押注另一条线')]:write('OP_RIVAL','label',label,choice=cid)
write('OP_RIVAL','reply','你接下试工安排。九点的新歌试听，你不再只是等人通知的场务，而是有明确职责、能被核对成果的参加者。',choice='join',index=1)
write('OP_RIVAL','reply','可以。八点半我空五分钟。成品先给我听，不许擅自发。',choice='own',index=1)
write('OP_RIVAL','reply','陆景行没有嘲笑你。他转身继续安排录音室，你则保住今晚的自由时间。你们都没有暂停，但下一次相遇，分量会不同。',choice='free',index=1)
write('OP_SETTLE','body','阿衡把亲手核过的切换记录塞给你。纸上终于写下“许照”两个字，你盯了半天：原著里，这个名字只会出现在被清退的名单上。',index=3)

# --- Visible first-night confrontation: trade-offs have names and prices. ---
write('A1b','title','第一夜：让背锅单签不了我的名')
for i,new in {
0:'22:00，观众散尽。程放堵在出口，把交接单横到你面前：导出错版、现场切换、末场确认，全被挤进同一个“临时场务负责”。这是他准备给你的第一道套。',
1:'签完就走。许照，别拿临时工那点事耽误大家下班。',
2:'你低头看签名栏。七天后让原著许照退场的，不是突然出现的保安，而是每次有人催他“先签一下”。你把笔按在桌上，没急着写名字。',
3:'（这张纸我能签，也能拒。今晚我不必证明自己多神，只要让真正负责的人，再也不能躲在我后面。）'
}.items():write('A1b','body',new,index=i)
for cid,label in [('check','逐项拆责任：签自己做的，别人的另写'),('ask','请阿衡作证：用人证换第一层保护'),('look','先拿副本：今晚不签模糊责任')]:write('A1b','label',label,choice=cid)
write('A1b','reply','你拿到分项交接单的那一刻，程放不再催你“快签”。他不高兴也没用——这是两个人都核过的版本。你带着它，正式迈过了原著的第一道坑。',choice='check',index=1)
write('A1b','reply','阿衡看了程放一眼，还是在现场确认的范围内签了自己的名字。你换来了一个肯出面的人证，也让对方知道你不会一个人背所有锅。',choice='ask',index=1)
write('A1b','reply','你拍下有权留存的副本，拒绝在尚未核对的责任栏落笔。程放冷下脸：“行，明天再谈。”你没赢完，却没把自己送上那张纸。',choice='look',index=0)

# --- Day 2-6 escalations: fast stakes and grounded payoff, characters retain agency. ---
write('A2a','title','十七秒热搜，差点偷走她的歌')
for i,new in {
0:'第二天中午，一条十七秒预告冲上热搜小榜。视频正中是陆景行，耳朵里却全是唐映雪熬夜改了三遍的副歌。最高赞评论问：“钢琴家又出新歌了？”',
1:'明明是我写、我唱的歌，他们却问是不是陆景行的新曲。再这么发，热度越大，越没人知道它属于谁。',
2:'（原著里，她就是被“热度不能浪费”这句话催着点了确认。）歌爆了，创作者却连完整唱一遍都得看人脸色。可这次确认键还亮着，她还没按。',
3:'映雪没等你替她做决定，自己先关掉了确认弹窗。她抬头：“我不签这个版本。现在我想听一个能执行的办法，不想再听一句‘别难过’。”',
4:'我想要两样东西：观众听见歌，名字也认得我。你陪我想打法，但拍板还是我。'
}.items():write('A2a','body',new,index=i)
for cid,label in [('independent','抢回首发：独立母带，小流量换所有权'),('negotiated','借势反击：保住热度，签下姓名与时段'),('duet','反向合作：合唱可以，原作与分轨写明'),('pause','及时止损：撤预告，先守住完整版'),('unchanged','不介入谈判：由她自己面对现有团队')]:write('A2a','label',label,choice=cid)
write('A2a','reply','她从制作人手里争到一段独立试播窗口，把“唐映雪·原作原唱”写在文件第一行。流量未必赶得上原宣传，但这次名字不会凭空消失。',choice='independent',index=2)
write('A2a','reply','她把“试播时谈”四个字圈给你看：“还没答应。试播那天你别只拍掌声，帮我盯着屏幕上的姓名。”',choice='negotiated',index=2)
write('A2a','reply','我送两版编曲过去，原作的署名也标好。她试听以后自己选，别替她先答应。',choice='duet',index=2)
write('A2a','reply','她发出暂缓发布的正式请求，把原稿锁进备份盘。今天少一条热搜，也少一次被迫签字的风险。她看上去终于能喘气。',choice='pause',index=2)
write('A2a','reply','她没有把这当成你替她作的决定，而是关掉预览，直接联系项目负责人。你退出了这次争取，后面她能拿回多少，将不再靠你的参与。',choice='unchanged',index=2)
write('A2b','title','第二天，程放把矛头指向我')
write('A2b','body','第二天晚上，工作群突然弹出程放的 @：“许照，昨天那张责任单考虑得怎么样？”后面跟了个笑脸。那张笑脸，是他隔着屏幕伸来的第二支笔。',index=0)
write('A2b','body','群里短暂安静。阿衡头像亮了一下，沈清辞先发了句：“谁导出、谁试听、谁切换，三项分开写。”你看见程放一直在输入，最后没发出话来。',index=1)
write('A2b','body','阿衡随后发出值守表，标明哪个时段由谁操作、哪些项目还得复核。程放不再催你单独签字，只留下一句“明天再谈”。你没有靠吵架赢，但让那张责任单再也不能一笔带过。',index=2)
write('A2b','body','（要么公开争一口气，要么把证据递进核验流程，要么让陆景行做公开转发。都要付代价，却总比原著里只回一句“收到”强。）',index=3)
for cid,label in [('public','正面亮名字：让署名与责任都摆到台面'),('quiet','暗中稳住：把证据交核验人，不吃眼前风头'),('cooperate','借原男主的声量：他转发，我亲自说明')]:write('A2b','label',label,choice=cid)
write('A2b','reply','程放私聊你：“那就等着解释每一步。”你把这条威胁也存了。今晚没能让他闭嘴，却让所有人第一次看到，你不是一口气把责任全揽下的那个许照。',choice='public',index=2)
write('A2b','reply','记录我收到了。名单按实际分工列名，回执也会留下。你没上热搜，但往后谁想改口，得先面对这些材料。',choice='quiet',index=1)
write('A2b','reply','陆景行发来分工表：“我只能说我看见的，剩下你自己来。”你答应了。这次合作不是抱大腿，是让每份贡献都见得了光。',choice='cooperate',index=2)

write('A3a','title','第三天：一间旁厅，两套未来')
write('A3a','body','第三天傍晚，旁厅只剩一盏灯。巡演开出稳定租金，条件是让出主要时段；独立夜场若想留下，就得自己承担空场风险。沈清辞面前只剩两份难看的方案。',index=0)
write('A3a','body','亏损由谁承担，这栏我会自己签。你要帮，就说能做哪一步，别替我承诺一座剧场。',index=4)
for cid,label in [('cooperative','小规模开战：试一场能算清账的夜演'),('shared','借力竞争：巡演与独立演出共用时段'),('residency','换地图：寻找流动驻场，不死守旧厅'),('exit','止损撤出：结清预约，保住团队'),('leave','放弃这局：先保自己的时间和精力')]:write('A3a','label',label,choice=cid)
write('A3a','reply','她开始约试场，第一件事就让你负责记录实际到场人数。钥匙和预算都还没到手，但独立夜场从一句口号变成了能检验的一张表。',choice='cooperative',index=2)
write('A3a','reply','陆景行答应派团队参加一次进撤场测试。清辞当场把测试日期写下来：合作能否成，取决于那天能不能真腾出两个小时。',choice='shared',index=2)
write('A3a','reply','两家新场地的地址发到你手机上。原来的厅可能留不住，独立节目却第一次有了不靠这把钥匙的退路。',choice='residency',index=2)
write('A3a','reply','她发出交接意向，保留现有预约直到有人确认接手。旁厅未必能救，但至少不让剩下的人替这次退出吞下所有损失。',choice='exit',index=2)
write('A3a','reply','你退出协调，清辞没有把这理解成背叛，只是继续找人。代价也很清楚：巡演方案仍占优势，那个独立时段不会因你一句好话自动留下。',choice='leave',index=2)

write('A3b','body','你把屏幕上的四个邀约看了又看：这不是四张能无限领取的任务卡，而是四个人真会记得的约定。今晚只能到一处；被你放下的机会，也会往前走。',index=5)
write('A4a','title','第五天，她的报名按钮只亮到今晚')
write('A4a','body','第五天，林见月的外出项目报名只剩最后几个小时。她的短片还能补交，报名资格却不能补。另一边，陆景行的巡演跟拍合同正等她签。',index=0)
write('A4a','body','我想试着出去。报名我自己按，你帮我选的不是去哪儿，而是接下来哪件事先落地。',index=3)
for cid,label in [('fellowship','抢报名资格：今晚先占一个窗口'),('stay','留城自立：先锁四个自己的拍摄日'),('film','小场首映：先交出能被看见的样片'),('cut','把事实剪完整：逐项拿授权再公开'),('none','不介入：把精力留给自己正在打的仗')]:write('A4a','label',label,choice=cid)
write('A4a','reply','申请成功的邮件弹了出来，见月把屏幕转给你看，嘴角没压住。不是拿到录取，但至少下一次，她不会再被“没报名”三个字淘汰。',choice='fellowship',index=1)
write('A4a','reply','她拿出日历当场划掉四个跟拍空档。陆景行的邀请还在，但镜头里该先有她自己的故事。你看见她第一次主动拒绝“随叫随到”。',choice='stay',index=2)
write('A4a','reply','候选放映时段申请发出。场地方没有立刻答应，却给了明确的样片截止日——那部一直“等以后再做”的片子，终于有了不能再拖的日期。',choice='film',index=2)
write('A4a','reply','见月把需要询问的人列成清单。你没替她偷拿素材，也没有让真相被好看的剪辑盖掉。第七天能用哪一段，要由这些答复决定。',choice='cut',index=2)
write('A4a','reply','她暂时保存草稿，继续独自写申请。你省下今晚的精力，也明白这次没有替她占到任何确定名额。',choice='none',index=2)
write('A4b','title','第五夜：程放说漏嘴的后半句')
write('A4b','body','第五晚，见月把耳机塞到你手里。杂音后，程放的声音突然清楚起来：“错版文件不是许照导出的。”你一瞬间忘了呼吸——这句在原著里从来没机会被播放。',index=0)
write('A4b','body','宣传片却只留下你靠近设备箱的一秒，字幕写着“临时人员操作失误”。你终于看懂了这条宣传片的陷阱：只要剪掉时间顺序，谁站得离箱子近，锅就是谁的。',index=1)
write('A4b','body','第七天只剩两天。我不能指望一句真话自己走到台前。见月，能从头再放一遍吗？',index=2)
for cid,label in [('extract','拿核验节选：锁住那句关键原声'),('witness','走人证路线：让现场人亲口说出顺序'),('wait','暂不动录音：另找线索，承受时间风险')]:write('A4b','label',label,choice=cid)
write('A4b','reply','你听见程放那句“不是许照导出的”，胸口像被松开一只手。现在不是赢了——只是拿到了第七天能把假字幕顶回去的第一张硬牌。',choice='extract',index=2)
write('A4b','reply','离第七天只剩两天。你没冒险拿走未经确认的录音，也得接受没补到新证据的代价。见月望着你：“真要用，别到最后一天才来问。”',choice='wait',index=2)

write('A5a','title','第六天：她拒绝替所有人签字')
write('A5a','body','第六天，晚棠面前摆着一份明天就会公开的说明：好处写得含糊，坏账全留她签。她曾在邮件里反对删掉独立演出，反对意见却被缩成一行不起眼的小字。',index=0)
write('A5a','body','（原著里她签过这页，最后一个人吞下骂名。我明天也得跟程放摊牌。如果现在替晚棠空口保证，只会把她推到另一个坑里。真正能帮上的，是把她有权做的决定摆到台面。）',index=2)
for cid,label in [('independent','争决定权：有权说了算，才承担后果'),('bounded','改责任边界：合作继续，拒绝无限兜底'),('account','公开完整事实：好坏都认，只认自己那份'),('leave','带着清单离开：不签不属于她的债'),('none','先顾自身：这场责任谈判交还给她')]:write('A5a','label',label,choice=cid)
write('A5a','reply','晚棠把异议发进正式会议流程，会议还没开，但“只让我签字不给我决定权”终于变成了一项必须回答的问题。',choice='independent',index=2)
write('A5a','reply','她用红笔删掉“承担所有后续损失”那句，补上真实权限和预算。还没签字，但已经不肯再按别人准备的版本谈。',choice='bounded',index=2)
write('A5a','reply','你肯把难听的那部分也讲出来，我就愿意帮你把话说全。我们要争的是能经得起核验的事实，不是漂亮的口号。',choice='account',index=2)
write('A5a','reply','晚棠列出未结责任和要交还的权限，开始准备正式离开。她不是被一句“有骨气”推下悬崖的人——退路也是她自己算出来的。',choice='leave',index=2)
write('A5a','reply','她没有要求你留下帮忙，自己继续约能修改方案的人。你把时间留给第七天，晚棠这场仗却不会为你暂停。',choice='none',index=2)
write('A5b','title','第六天：原男主向我发战书')
write('A5b','body','下一轮名额不看谁先救场，只看谁交得出成果。许照，要并肩还是对手？',index=3)
for cid,label in [('ally','联手争名额：分工清楚，成绩都要写上'),('rival','正面单挑：同轮投稿，用作品分胜负'),('distance','保持距离：我的计划不绕着你转'),('independent','另开一局：找新的项目和合作方'),('repair','放下成见：谈一次真正的合作')]:write('A5b','label',label,choice=cid)
write('A5b','reply','合作可以。音乐我来，现场流程你来；分工写清楚，别只站旁边出主意。',choice='ally',index=1)
write('A5b','reply','行。同一轮见。你交你的，我交我的，别谁先替谁认输。',choice='rival',index=1)
write('A5b','reply','他把自己的排练计划收好。你没有拿“躲开原男主”当胜利，真正的好处是以后每一份机会，都可以按自己的时间争。',choice='distance',index=2)
write('A5b','reply','你收下另一个项目的联络方式。原著只写陆景行跑完巡演，如今你也有了一张不跟着他走的新地图。',choice='independent',index=2)
write('A5b','reply','陆景行听完你之前的误解，反而把修改过的分工表给你看。竞争没有消失，但你不用再把每一次合作都当成输。',choice='repair',index=2)

# --- Day seven payoff must be earned by real evidence. No counterfeit guaranteed victory. ---
write('A6a','title','第十三章：这次该我发声')
for i,new in {
0:'第七天，原著写好的事故视频准时上屏。你靠近设备箱的背影被截成一秒，错误伴奏和控台画面被剪在一起，底下赫然打着“临时人员操作失误”。没有时间线，只留下你这个最好推出来的名字。',
1:'四周的视线齐刷刷转向你。和书里一模一样的侧门、同一张清退单，都已经摆好。不同的是，你口袋里有没有能用的材料，取决于前六天到底做过什么。',
2:'许照，事情处理好了，你出去。别耽误下一场。',
3:'（第十三章到了。原著里的许照连一句反驳都没说完。今天我有多少资格让全场听我说话，就看前六天有没有留下真正能核验的材料。）',
4:'保安走到侧门。阿衡站在控台旁，见月握着相机却没有擅自拍人；清辞看向你，像在等你给出一句真正能核对的话。',
5:'你抬头看向那行错误字幕。现在能当场反击的，只有这七天亲眼看过、合法留下的证据。没有的东西不能靠“我看过原著”变出来。'
}.items():write('A6a','body',new,index=i)
for cid,label in [('public','当众反击：把真实时间线投回大屏'),('partner','联合反击：每个证人讲自己确认的事实'),('backstage','幕后翻盘：先撤假字幕，再做完整复核'),('exit','带着更正书离开：不再给程放打工'),('accept','认下这一局：不申辩，接受原著退场'),('rebuild','保住名誉后暂退：重新选择下一份机会')]:write('A6a','label',label,choice=cid)
# The public choice has three mutually exclusive real-evidence reply blocks.
write('A6a','replyBlock','画面先别切。请把这段得到许可的完整原声放完——谁导出错版，谁执行切换，让现场所有人自己听。',choice='public',index=(0,0))
write('A6a','replyBlock','阿衡把时间点对上，程放那句“不是许照导出的”从大屏传出。现场的议论声一层层停下，先前那条指向你的字幕终于显得站不住脚。',choice='public',index=(0,1))
write('A6a','replyBlock','程放伸手想停播放，清辞挡住控制台：“完整问答先放完。任何人都不能只剪对自己有利的一秒。”',choice='public',index=(0,2))
write('A6a','replyBlock','我没有原声，就核这张双方签过的交接单。请放大导出时间和接手时间，不用猜，也不必听我编。',choice='public',index=(1,0))
write('A6a','replyBlock','导出时间在你接手之前，责任栏也有不同签名。核验人要求先撤下错误字幕。你第一次看见有人为了你的名字，在原著那块屏幕上按下暂停。',choice='public',index=(1,1))
write('A6a','replyBlock','我没有录音，只有请阿衡亲自确认的那段。他看见的由他说，我看见的由我讲。',choice='public',index=(2,0))
write('A6a','replyBlock','阿衡把时间记录放到桌上，逐项核对。字幕被撤下，保安停在门边。你没靠一段凭空出现的视频翻身，只靠前面真的做过的那几步。',choice='public',index=(2,2))
write('A6a','reply','已参加核验的人各自说清自己看见的部分。你负责自己的时间线；清辞要求更正屏幕上的归责字幕。没有人替你编证词，程放也没法再把所有环节塞成一句话。',choice='partner',index=0)
write('A6a','reply','屏幕暂停，核验流程正式启动。你没有当众出风头，却让“临时人员操作失误”无法作为结论继续播放。对方得拿材料说话，不能只拿你的背影。',choice='backstage',index=1)
write('A6a','reply','你交回工作牌，留下正式更正申请并保存受理回执。程放再没法拿“明天不让你上班”逼你认错；复核结果还在路上。',choice='exit',index=1)
write('A6a','reply','你交回工牌，没有要求核验。原著的侧门又一次为许照打开。屏幕上的字幕未必是真相，但你把反击机会留在了门内。',choice='accept',index=0)
write('A6a','reply','你要求记录完整更正自己的分工，再暂停接新项目。不是输不起才退出，而是让下一次合作从清楚的条件开始。',choice='rebuild',index=0)

# --- The day-after win is a real new option, not an apology for having agency. ---
write('UNWRITTEN','title','第八天，有人主动问我报价')
write('UNWRITTEN','body','侧门的保安停住了。你走出北岸，手机震动：一份邀请你独立复盘现场的工作询价。原著第十三章只写许照退场，却没写过有人主动问他的报价。',index=0)
write('UNWRITTEN','body','（第八天。）原著写到我被清退就停了。今天有人主动问我的报价，我终于不只是那张签名栏里随手能擦掉的人。',index=1)
write('UNWRITTEN','body','对方要的是一份能核验的演出复盘，而不是传奇故事。接不接、公开到哪一步、先替自己争哪份未来，都得由你做下一次选择。',index=2)
for cid,label in [('offer','接下邀请：凭本事谈一次报价'),('private','保留底牌：只在授权范围内继续合作'),('self','暂不接单：先安排自己的生活')]:write('UNWRITTEN','label',label,choice=cid)
write('UNWRITTEN','reply','你报出自己的范围与交付要求，对方回了一个正式的谈价时间。这个机会没写在原著里，是你把前七天过成了能交付的履历。',choice='offer',index=1)
write('UNWRITTEN','reply','你和阿衡、见月把能保留的材料分清授权范围。没人上热搜，但以后再有人想剪走某一秒，你们知道能去哪里找真实记录。',choice='private',index=0)
write('UNWRITTEN','reply','你把工作邀约放进待回复，不用逃过清退就立刻把自己卖给下一份忙乱。今天的晚饭和下一周的安排，第一次轮到你自己排。',choice='self',index=0)
write('A6b','title','第八天：原著之外，我有下一局')
write('A6b','body','天快亮了，你在手机备忘录里找到“第七天被清退”。把那行字划掉时，指尖竟然有点发抖——这一次，是赢过那张清退单以后的余震。',index=0)
write('A6b','body','……我真的留下来了。不，不只是没被赶走。下一步，我想自己选。',index=1)
write('A6b','body','有人发来新的项目需求，也有人问你到家没有。这次你不必把工作、朋友和喜欢的人全塞进同一张责任单里；你可以选择先把哪一局打赢。',index=2)
for cid,label in [('relationships','先兑现约定：把真正想见的人约到眼前'),('world','继续改命：帮他们把未完的成果做出来'),('self','先强大自己：接下一份能署自己名字的活')]:write('A6b','label',label,choice=cid)
write('A7a','title','第二十一天：我不再是配角')
write('A7a','body','第二十一天，北岸的灯又亮起来。你可能已不在那家公司，也可能拿着新的分工重新进场；无论站在哪边，七天前那张错误字幕都不再能替你定义一生。',index=0)
write('A7a','body','工作有了真实结果，手机里却还有几条重要的私人消息。你终于明白：改掉炮灰结局只是上半场，下一页怎么写，得同时对得起自己和愿意走近你的人。',index=1)
write('A7b','title','最后一局：选我要的未来')
write('A7b','body','灯光渐暗。你把实际做成的工作、兑现过的约定，以及仍欠着的回答放在一起。这一回，没有原著标准答案，也没有能替你点头的人。',index=0)

# --- Give the four women distinguishable, voluntary hooks without framing them as trophies. ---
write('t01','title','救场后的她，先把位置留给我')
write('t01','body','后台没人时，唐映雪正偷偷藏盒饭。胡萝卜从盖边滚出来，她抬头看见你，干脆拉开旁边椅子：“后台那位，帮我挡一下，这事别让我经纪人知道。”',index=0)
write('t01','body','她把外套掀开，旁边那双没拆封的筷子已经推到你面前。台上她能接住所有人的目光，台下却连偷偷吃饭都做得有些狼狈。',index=4)
write('s01','title','冷脸制作人，偷偷给我留了五分钟')
write('s01','body','一阵风把清辞的排期单吹得到处都是。她一边处理电话一边抢纸，你按住最后一页，她朝你比了个“等等”，竟然直接跟电话那头说：“十分钟以后，我来拍板。”',index=0)
write('s01','body','五分钟。我把工作手机关了，不是来让你汇报的——我想知道首演后台认识的许照，平时是什么样。',index=5)
write('l01','title','她给我听了原著漏掉的两秒')
# Avoid giving non-recognized player a false novel disclosure; this scene is conditional on where they met, so revise to no foreknowledge knowledge:
write('l01','body','“你听。”林见月把耳机分给你一边，反复调回同一个两秒片段。有人刚说出“我其实”，声音就被关门声截断。她没有让剪辑替那个人说完后半句。',index=0)
write('g01','title','顾晚棠说，别把我当老板')
# Some routes may meet g without the blue disc being found; keep first meet route-neutral.
write('g01','body','露台风大。顾晚棠抬头看见你，把旁边的空椅子拉出来：“许照？首演那晚的临时场务，名字没记错吧？”她眼里带笑，却没用上级看临时工的口气。',index=0)

# --- Endings need earned relief, not generic narration about ordinary life. ---
write('X02','title','没有主角光环，我照样能赢一局')
write('X02','body','夜场刚散，手机跳出一条结算确认：收款人，许照；工作内容，按你实际完成的分工列得一清二楚。原著里最容易被删掉的名字，这回留在了正式记录上。',index=0)
write('X02','body','程放没有再把错误塞进你的栏目。你不需要满世界宣告胜利——那份有署名、有工时、结清的钱，就是这一局最硬的结果。',index=1)
write('X02','body','陆景行没替你定下一步。他把下一轮征集时间发给你，你合上手机看了眼夜色：第一次轮到别人来问，你肯不肯接。',index=4)
write('X02','reply','下一份工作不是天降大奖，但负责人直接写信问你能否按上次的质量交付。你报出职责和工期，再发出自己的报价。主角光环没有来，主动权倒是来了。',choice='work',index=1)
write('X03','title','四条遗憾，全部改写')
write('X03','body','手机连震四次：映雪发来新歌试播的截图，清辞传来旁厅的新安排，见月的申请页面有了进展，晚棠发来终于得到记录的方案修订页。她们各自亲手推进的事，终于没照原著那样滑向失去。',index=0)
write('X03','body','你把四条真实结果与原著后来的遗憾一一对上。没人凭空成神，也没人为你停止自己的生活；可四个本来要遗憾收场的故事，确实都被你撬开了新的路。',index=1)
write('X03','body','以前看过一本让我憋屈的书。现在，我终于知道亲手改结局是什么感觉。',index=3)

# Update the machine-readable choice registry and add versioned, auditable edits.
B=json.dumps(D,ensure_ascii=False,indent=2)+'\n';source.write_text(B,encoding='utf-8')
newhash=hashlib.sha256(B.encode()).hexdigest()
contracts=R/'data/CHOICE_CONTRACTS.json';reg=json.loads(contracts.read_text());reg['storySha256']=newhash
labels={s['id']+'/'+ch['id']:ch['label'] for s in st.values() for ch in s['choices']}
for c in reg['choices']:c['label']=labels[c['id']]
contracts.write_text(json.dumps(reg,ensure_ascii=False,indent=2)+'\n')
manifest={'version':'v4.9-neutral-power-progression','genre':'中性略偏男性向的穿书逆袭／轻恋爱','purpose':'前3分钟危机、可动手改命、对手压力、角色主动性；选择保留因果，不靠无效按钮凑数',
'baseStorySha256':oldhash,'newStorySha256':newhash,'protected':['scenes count','choice IDs','when/guards','effects','next','ending rules','28 entry beats'],
'changes':patch,'counts':{'scenesTouched':len(set(p['scene'] for p in patch)),'bodyAndReplyLines':sum(x['kind']=='text' for x in patch),'choiceLabels':sum(x['kind']=='choice_label' for x in patch),'sceneTitles':sum(x['kind']=='scene_title' for x in patch)}}
(R/'patch/v49_story_punchup.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('OLD',oldhash,'NEW',newhash,'CHANGES',manifest['counts'])
