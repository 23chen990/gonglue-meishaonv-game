# 《攻略美少女》r4 完整条件剧情导出

本文件由 `tools/export-and-audit.py` 从正式 JSON 自动生成。正文、条件块、即时回应、回应条件、效果与后继全部包含；条件分支并非在一次游玩中同时出现。Markdown 不作为编辑源。

正式剧情 SHA-256：`30c8d0fce47448ddff2c3d99a86b32b4205a16012e9b50cdab9fca6738f81594`

## 人物与日程

```json
{
  "version": "revision-r4.3",
  "cast": {
    "t": "唐映雪",
    "s": "沈清辞",
    "l": "林见月",
    "g": "顾晚棠"
  },
  "actionBudget": 20,
  "calendar": [
    {
      "slot": 1,
      "day": 1,
      "time": "22:10"
    },
    {
      "slot": 2,
      "day": 2,
      "time": "18:00"
    },
    {
      "slot": 3,
      "day": 2,
      "time": "20:00"
    },
    {
      "slot": 4,
      "day": 3,
      "time": "18:00"
    },
    {
      "slot": 5,
      "day": 3,
      "time": "20:00"
    },
    {
      "slot": 6,
      "day": 4,
      "time": "18:00"
    },
    {
      "slot": 7,
      "day": 4,
      "time": "20:00"
    },
    {
      "slot": 8,
      "day": 5,
      "time": "18:00"
    },
    {
      "slot": 9,
      "day": 6,
      "time": "18:00"
    },
    {
      "slot": 10,
      "day": 6,
      "time": "20:00"
    },
    {
      "slot": 11,
      "day": 7,
      "time": "18:00"
    },
    {
      "slot": 12,
      "day": 8,
      "time": "19:00"
    },
    {
      "slot": 13,
      "day": 10,
      "time": "19:00"
    },
    {
      "slot": 14,
      "day": 11,
      "time": "19:00"
    },
    {
      "slot": 15,
      "day": 13,
      "time": "19:00"
    },
    {
      "slot": 16,
      "day": 14,
      "time": "19:00"
    },
    {
      "slot": 17,
      "day": 16,
      "time": "19:00"
    },
    {
      "slot": 18,
      "day": 18,
      "time": "19:00"
    },
    {
      "slot": 19,
      "day": 19,
      "time": "19:00"
    },
    {
      "slot": 20,
      "day": 20,
      "time": "19:00"
    }
  ],
  "anchors": {
    "3": "A2a",
    "5": "A3a",
    "8": "A4a",
    "9": "A5a",
    "11": "A6a",
    "20": "RES_t",
    "12": "EXEC_s",
    "14": "EXEC_l",
    "16": "EXEC_g"
  },
  "endingRules": {
    "minimumStageSingle": 3,
    "minimumStageMulti": 5,
    "groupEncounterRequiredForThreePlus": true
  }
}
```


---

## ENTRY_WAKE｜第七天，我会替人背锅

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":null,"clock":{"day":1,"time":"18:59"}}`

### 正文

**旁白**：手机停在《今夜偏爱男主》第十三章。临时场务许照被保安带出后台，通知上写着“因现场失误清退”。你往前翻了两页，才看到一张写着他名字的交接单。

`ENTRY_WAKE.intro.001`

**旁白**：你想看看究竟是谁让许照签的字，眼前的手机屏幕却忽然重了影。指尖一空，你连椅子都没来得及扶住。

`ENTRY_WAKE.intro.002`

**阿衡**：许照！喂，许照！听得见吗？

`ENTRY_WAKE.intro.003`

**旁白**：后背磕上一只冰凉的金属箱。你猛地睁眼，头顶的舞台灯晃得人发晕。对讲机里有人催场，隔着幕布传来密密的观众声。

`ENTRY_WAKE.intro.004`

**许照**：……你叫谁？

`ENTRY_WAKE.intro.005`

**阿衡**：你啊！刚刚还蹲在箱子旁边。能起来吗？马上要开唱了！

`ENTRY_WAKE.intro.006`

**旁白**：你扶着箱子站起来，胸前的工牌撞在手背上。上面写着“许照，临时场务”，照片是一张完全陌生的脸。你又看了一遍名字。

`ENTRY_WAKE.intro.007`

**许照**：（等等，我刚才明明在家里看书。这工牌怎么会挂在我身上？）

`ENTRY_WAKE.intro.008`

**旁白**：侧幕挂着“北岸艺术中心·栖光计划”的牌子。地上的胶带、箱子上的编号，还有身边忙得顾不上看你的人，都真实得让人心慌。

`ENTRY_WAKE.intro.009`

**程放**：沈清辞！唐映雪的伴奏被换成什么版本了？现在就开场！

`ENTRY_WAKE.intro.010`

**唐映雪**：停！前奏被剪掉了！这不是我排练的歌！

`ENTRY_WAKE.intro.011`

**陆景行**：别慌。我先用钢琴垫四小节，你看我的手势接。

`ENTRY_WAKE.intro.012`

**旁白**：钢琴旁的男人刚坐下，就有人喊：“陆景行，交给你了！”

`ENTRY_WAKE.intro.013`

**许照**：（唐映雪、沈清辞、陆景行……怎么一个名字都没错？还有那段被剪掉的前奏。）

`ENTRY_WAKE.intro.014`

**旁白**：你一转头，拿着相机的人正被叫作“林见月”；另一边，工作人员请“顾晚棠”核对节目邮件。那些小说里的名字接连落到耳朵里。

`ENTRY_WAKE.intro.015`

**原著记忆**：我记得这场。首演，19:03，前奏被剪掉；陆景行用钢琴替唐映雪接住了开场。书里写得很短，可眼前的人真的在等那四小节。

`ENTRY_WAKE.intro.016`

**许照**：（不可能吧……我只是在看小说。难道我真的成了那个许照？）

`ENTRY_WAKE.intro.017`

**旁白**：你用力掐了自己一把，疼得嘶了一声。不是梦。你连面前音控设备的按钮都认不全，周围的人却已经把你当成了这里的工作人员。

`ENTRY_WAKE.intro.018`

**阿衡**：你脸色怎么这么白？要不先去外面歇一下？

`ENTRY_WAKE.intro.019`

**许照**：先不用……我还能站。让我缓一下。（要是现在就走，今晚那张交接单怎么办？）

`ENTRY_WAKE.intro.020`

**原著记忆**：我记得许照在书里听程放的话，没碰过音控。可后来那张“现场版本确认”偏偏是他签的。别人做错的事，最后全算在他头上。

`ENTRY_WAKE.intro.021`

**原著记忆**：唐映雪后来连自己的歌曲版本都说不上话；沈清辞想留住的那座小演出厅，也没能留住。可现在，她们还在为眼前这一首歌发愁。

`ENTRY_WAKE.intro.022`

**原著记忆**：林见月的镜头拍过后台，顾晚棠手里有审批邮件。原著里这些东西都没救成许照。现在就算我记得，她们也不会凭一句话相信我。

`ENTRY_WAKE.intro.023`

**原著记忆**：蓝标盘、审批邮件、切换的时间……书里提到过几个线索，可我现在手里一件证据都没有。先找到一样真的，才有机会开口。

`ENTRY_WAKE.intro.024`

**原著记忆**：还有七天。第七天，那个被当成炮灰的许照会被带出剧场。眼前倒数的却不是七天，是这一首歌开始前的几秒。

`ENTRY_WAKE.intro.025`

**旁白**：你想起小说里一个不起眼的细节：贴蓝胶带的原版 U 盘，被压在接线板下面，直到散场也没人翻出来。接线板就在你脚边。

`ENTRY_WAKE.intro.026`

**许照**：（装作不知道，先看原著怎么发展；去找那枚蓝标盘，试试能不能救场；或者先记下谁动过文件。哪条路我都没把握。）

`ENTRY_WAKE.intro.027`

**旁白**：台上，唐映雪已经摘下一边耳返。陆景行抬手准备落下第一个琴音；程放却朝你挥手，不许你靠近箱子。你得现在决定——只剩几个呼吸。

`ENTRY_WAKE.intro.028`

### 选择 ENTRY_WAKE/canon

先按原著走：看清是谁准备甩锅

可选条件：`null`

立即回应：

**旁白**：你把伸向箱盖的手收回来。陆景行坐上琴凳，原著的掌声照样响起；而你盯住程放——比起钢琴声，他手里那张等着你签的交接单更危险。

`ENTRY_WAKE.r42.reply.canon.001`

写入与操作：`[{"op":"set","key":"badge_checked","value":true},{"op":"set","key":"novel_recognized","value":true},{"op":"set","key":"identity_confirmed","value":true},{"op":"set","key":"danger_day7_known","value":true},{"op":"set","key":"first","value":"canon"},{"op":"set","key":"bias","value":"self"},{"op":"set","key":"opening_route","value":"canon"},{"op":"set","key":"opening_strategy","value":"canon"},{"op":"set","key":"opening_method","value":"piano_original"},{"op":"set","key":"stage","value":"piano"},{"op":"set","key":"first_win","value":false},{"op":"set","key":"opening_changed","value":false},{"op":"set","key":"canon_kept","value":true},{"op":"set","key":"rival_opening_response","value":"piano_rescue"}]`

后继：`ENTRY_CLUES`

### 选择 ENTRY_WAKE/rescue

抢先救场：找到原版，让她唱回来

可选条件：`null`

立即回应：

**旁白**：你不再等任何人喊“开始”。扒开压住线卷的箱盖，指尖碰到了蓝胶带。那枚原著里没人找到的 U 盘，现在就在你手里。

`ENTRY_WAKE.r42.reply.rescue.001`

写入与操作：`[{"op":"set","key":"badge_checked","value":true},{"op":"set","key":"novel_recognized","value":true},{"op":"set","key":"identity_confirmed","value":true},{"op":"set","key":"blue_location_known","value":true},{"op":"set","key":"danger_day7_known","value":true},{"op":"set","key":"opening_strategy","value":"rescue"},{"op":"set","key":"canon_kept","value":false}]`

后继：`COLD`

### 选择 ENTRY_WAKE/investigate

先锁证据：找原版，也查谁换了文件

可选条件：`null`

立即回应：

**旁白**：你没有直接喊“有人做局”。一边找到蓝标盘，一边扫过控台、相机和节目邮件：救场要快，证据得比对方撤回消息更快。

`ENTRY_WAKE.r42.reply.investigate.001`

写入与操作：`[{"op":"set","key":"badge_checked","value":true},{"op":"set","key":"novel_recognized","value":true},{"op":"set","key":"identity_confirmed","value":true},{"op":"set","key":"blue_location_known","value":true},{"op":"set","key":"danger_day7_known","value":true},{"op":"set","key":"opening_strategy","value":"investigate"},{"op":"set","key":"canon_kept","value":false}]`

后继：`ENTRY_MEMORY`


---

## ENTRY_CLUES｜原著的掌声，藏着我的陷阱

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_CANON","clock":{"day":1,"time":"19:02"}}`

### 正文

**旁白**：程放伸手按住箱盖：“临时工别乱碰，守好你的东西。”他看见你盯着控台时间，忽然把工作单翻到空白签名页。书里没有写过这个小动作。

`ENTRY_CLUES.r42.body.001`

**唐映雪**：不对！这段前奏是删过的！我没法这么进！

`ENTRY_CLUES.r42.body.002`

**陆景行**：映雪，先看我。前四小节我给你垫着，你来决定怎么接。

`ENTRY_CLUES.r42.body.003`

**旁白**：陆景行用四小节钢琴稳住现场。唐映雪自己接完后半句，掌声盖过了侧幕的争执。你没有抢这场救援，却把程放递交接单的时间记得清清楚楚。

`ENTRY_CLUES.r42.body.004`

**原著记忆**：下一幕果然来了。程放把交接单递到你面前，最上面写着“现场版本确认”，下面却没有划清是谁负责导出、谁负责播放。

`ENTRY_CLUES.r42.body.005`

**许照**：（我可以继续照原著签字，也可以从第一张纸开始改命。早知道结局的人，至少该知道哪一行不能随手签。）

`ENTRY_CLUES.r42.body.006`

### 选择 ENTRY_CLUES/obey

继续照原著签：换眼前清静，留下风险

可选条件：`null`

立即回应：

**程放**：早这么省事不就完了。

`ENTRY_CLUES.r42.reply.obey.001`

**旁白**：程放合上文件夹，露出个“这才懂事”的笑。你换来了今晚的清静，却亲眼看见自己的名字压在“版本确认”下面。第七天，这一笔会回来找你。

`ENTRY_CLUES.r42.reply.obey.002`

写入与操作：`[{"op":"set","key":"canon_response","value":"obey"},{"op":"set","key":"canon_signed_blame","value":true},{"op":"set","key":"first_night_evidence","value":"none"},{"op":"set","key":"opening_work","value":"free"},{"op":"set","key":"opening_work_commitment","value":false}]`

后继：`OP_CANON`

### 选择 ENTRY_CLUES/refuse

当面拒签：不给错版认账

可选条件：`null`

立即回应：

**许照**：我可以签我做过的。但旧版是谁导出的，我没见到。

`ENTRY_CLUES.r42.reply.refuse.001`

**程放**：你第一天来就这么较真？

`ENTRY_CLUES.r42.reply.refuse.002`

**旁白**：程放脸上的笑僵了一瞬，随即把交接单往回一抽。你留下一条明确的拒签记录，也提前把自己放进了他的视线。

`ENTRY_CLUES.r42.reply.refuse.003`

写入与操作：`[{"op":"set","key":"canon_response","value":"refuse"},{"op":"set","key":"canon_signed_blame","value":false},{"op":"set","key":"source_declined_handover","value":true},{"op":"set","key":"first_night_evidence","value":"refusal"},{"op":"set","key":"opening_work","value":"free"},{"op":"set","key":"opening_work_commitment","value":false}]`

后继：`OP_CANON`

### 选择 ENTRY_CLUES/witness

先留时间线：让证据比嘴硬更早一步

可选条件：`null`

立即回应：

**旁白**：你把19:03的错误伴奏、陆景行介入与控台值守时间分成三行记下。它还不能证明谁有错，却是原著里从来没有出现过的第一条独立时间线。

`ENTRY_CLUES.r42.reply.witness.001`

**旁白**：但这是你亲眼看见的。原著里没留的时间线，第一次有了起点。

`ENTRY_CLUES.r42.reply.witness.002`

写入与操作：`[{"op":"set","key":"canon_response","value":"witness"},{"op":"set","key":"canon_signed_blame","value":false},{"op":"set","key":"source_original_timeline","value":true},{"op":"set","key":"first_night_evidence","value":"timeline"},{"op":"set","key":"opening_work","value":"free"},{"op":"set","key":"opening_work_commitment","value":false}]`

后继：`OP_CANON`


---

## ENTRY_MEMORY｜抢到原版还不够，得锁住证据

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"COLD","clock":{"day":1,"time":"19:01"}}`

### 正文

**旁白**：蓝标 U 盘真的压在接线板下面。你握住它，几乎想直接冲向控台，又马上停住：你没学过音控，乱切只会把救场变成另一场事故。找盘是你的本事，验盘得交给阿衡。

`ENTRY_MEMORY.r42.body.001`

**程放**：谁叫你翻箱子的？按我说的流程来！

`ENTRY_MEMORY.r42.body.002`

**旁白**：林见月的镜头对着控台，顾晚棠手里正是演出审批邮件。一边是现场影像，一边是版本授权——这不是两个摆设，而是能让第七天那条假字幕站不住脚的两种证据。

`ENTRY_MEMORY.r42.body.003`

**许照**：（我知道原著怎么写，但她们只认眼前能核的事。先拿出真的东西，才有资格问程放为什么急着拦。）

`ENTRY_MEMORY.r42.body.004`

### 选择 ENTRY_MEMORY/camera

先锁镜头：让见月留住切换前后

可选条件：`null`

立即回应：

**林见月**：我只拍现场交接。要让我留你的脸吗？

`ENTRY_MEMORY.r42.reply.camera.001`

**许照**：不用拍脸，先拍标签。再拍阿衡验过的时间。

`ENTRY_MEMORY.r42.reply.camera.002`

**旁白**：见月先拍清蓝标与控台时间，替接下来的试听、切换留好取证位置。录制指示灯亮起时，你知道至少这一秒不会只剩口说。

`ENTRY_MEMORY.r42.reply.camera.003`

写入与操作：`[{"op":"set","key":"opening_investigation","value":"camera"},{"op":"set","key":"source_pre_switch_timestamp","value":true}]`

后继：`COLD`

### 选择 ENTRY_MEMORY/email

先查授权：让晚棠对照真正的节目单

可选条件：`null`

立即回应：

**顾晚棠**：我批的是完整演出版。你先把盘交阿衡试听，谁改的我来核。

`ENTRY_MEMORY.r42.reply.email.001`

**旁白**：顾晚棠看完审批邮件，抬头望向程放。他先移开了视线。你的调查还没结束，却已经逼出了原著里没有的第一反应。

`ENTRY_MEMORY.r42.reply.email.002`

写入与操作：`[{"op":"set","key":"opening_investigation","value":"email"},{"op":"set","key":"source_programme_approval_note","value":true},{"op":"set","key":"cheng_questioned_early","value":true}]`

后继：`COLD`


---

## COLD｜原版在手，轮到我改写救场

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_SETTLE","beatGoal":"first_action_changes_event","clock":{"day":1,"time":"19:02"}}`

### 正文

**旁白**：蓝标盘就在掌心，台上的倒数却不会等你。原著里，它会在箱底躺到散场；现在只差一个真正能让唐映雪接回自己歌曲的人。

`COLD.r42.body.001`

**阿衡**：先把盘拿稳，别自己插！我得亲耳试听。你去找能发切换信号的人；确认能用以后，控台由我操作。

`COLD.r42.body.002`

**旁白**：陆景行的手停在琴键上，唐映雪正扶着耳返寻找侧幕的回应。你只有几秒决定：把舞台交给谁指挥，也决定谁会记住你的名字。

`COLD.r42.body.003`

### 选择 COLD/t

直接找唐映雪：由她喊回原版

可选条件：`{"all":[{"eq":["novel_recognized",true]},{"eq":["blue_location_known",true]},{"eq":["opening_strategy","rescue"]}]}`

立即回应：

**旁白**：你抽出U盘交给阿衡。他戴耳机试听，点头：“完整前奏在，能用。”

`COLD.t.r4.reply.001`

**许照**：唐映雪！原版找到了。现在切，还是下一段？

`COLD.t.r4.reply.002`

**唐映雪**：下一段。阿衡，听我数。

`COLD.t.r4.reply.003`

**旁白**：她闭了闭眼，抬手给阿衡数拍。原版进来的那一瞬，唐映雪自己接住了高音；陆景行把准备落下的手收了回去。观众先是一静，随即爆出掌声。

`COLD.t.r4.reply.004`

**旁白**：映雪自己数拍，阿衡按信号接回完整前奏。她稳稳唱上那个高音，掌声像涨潮一样盖住了侧幕里的争执。程放僵在一边，映雪却朝你招手。

`COLD.t.r4.reply.005`

**唐映雪**：找盘的那位！你叫什么？……算了，先别跑，唱完我找你！

`COLD.t.r4.reply.006`

写入与操作：`[{"op":"set","key":"first","value":"t"},{"op":"set","key":"bias","value":"t"},{"op":"set","key":"stage","value":"original"},{"op":"set","key":"first_win","value":true},{"op":"set","key":"opening_changed","value":true},{"op":"set","key":"opening_route","value":"t"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_blue_disc","value":true},{"op":"set","key":"opening_t","value":"blue_disc"},{"op":"set","key":"opening_method","value":"performer_cue"},{"op":"set","key":"blue_audio_checked","value":true},{"op":"set","key":"rival_opening_response","value":"yield_to_singer"},{"op":"set","key":"source_switch_log","value":true},{"op":"learnFact","character":"t","fact":"saw_opening_performer_cue"}]`

后继：`OP_SETTLE`

### 选择 COLD/s

找沈清辞控场：一拍切回正确版本

可选条件：`{"all":[{"eq":["novel_recognized",true]},{"eq":["blue_location_known",true]},{"eq":["opening_strategy","rescue"]}]}`

立即回应：

**旁白**：你把U盘递给阿衡，请他试听，又把情况报给沈清辞。她没有立刻信你，等阿衡确认才举起对讲机。

`COLD.s.r4.reply.001`

**沈清辞**：陆景行先待命。映雪，下一拍回原版。三、二、一。

`COLD.s.r4.reply.002`

**旁白**：切换只空了一拍，观众以为这是刻意设计的停顿。清辞把手里的对讲机放低，朝你点了一下头——这次，名字不会只写给台前的人。

`COLD.s.r4.reply.003`

**沈清辞**：许照，对吧？你找到盘，阿衡负责切换。我会分开记。

`COLD.s.r4.reply.004`

**旁白**：她把对讲机挪开，压低声音。

`COLD.s.r4.reply.005`

**沈清辞**：刚才你脸色白得吓人。喏，水在旁边。工作我会核，你先别晕在我的舞台上。

`COLD.s.r4.reply.006`

写入与操作：`[{"op":"set","key":"first","value":"s"},{"op":"set","key":"bias","value":"s"},{"op":"set","key":"stage","value":"original"},{"op":"set","key":"first_win","value":true},{"op":"set","key":"opening_changed","value":true},{"op":"set","key":"opening_route","value":"s"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_blue_disc","value":true},{"op":"set","key":"opening_s","value":"blue_disc"},{"op":"set","key":"opening_method","value":"producer_switch"},{"op":"set","key":"blue_audio_checked","value":true},{"op":"set","key":"rival_opening_response","value":"standby"},{"op":"set","key":"source_switch_log","value":true},{"op":"learnFact","character":"s","fact":"saw_opening_producer_switch"}]`

后继：`OP_SETTLE`

### 选择 COLD/l

找林见月取证：救场和记录一起做

可选条件：`{"all":[{"eq":["novel_recognized",true]},{"eq":["blue_location_known",true]},{"eq":["opening_strategy","investigate"]}]}`

立即回应：

**许照**：我找到备用盘了。能把盘上的标签和切换过程拍下来吗？别漏掉原来的错误版本。

`COLD.l.r4.reply.001`

**林见月**：可以，只留工作记录。你也会入镜，行吗？

`COLD.l.r4.reply.002`

**许照**：行。

`COLD.l.r4.reply.003`

**旁白**：你把盘交给阿衡试听，见月先拍下标签和他确认音轨的时间。接下来的实际切换，她要等动作发生才继续拍，绝不提前替任何人定结论。

`COLD.l.r4.reply.004`

**旁白**：等待时，唐映雪先清唱了一句；阿衡把原版接上。陆景行见她唱稳了，示意钢琴不必进入。

`COLD.l.r4.reply.005`

**林见月**：拍到了。你找到它，他检查后换上。以后不用各说各的。

`COLD.l.r4.reply.006`

**旁白**：等一下。你找盘的时候手一直在抖，我拍进去了。别紧张，我先给你看，愿不愿意留再说。

`COLD.l.r4.reply.007`

写入与操作：`[{"op":"set","key":"first","value":"l"},{"op":"set","key":"bias","value":"l"},{"op":"set","key":"stage","value":"original"},{"op":"set","key":"first_win","value":true},{"op":"set","key":"opening_changed","value":true},{"op":"set","key":"opening_route","value":"l"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_blue_disc","value":true},{"op":"set","key":"opening_l","value":"blue_disc"},{"op":"set","key":"opening_method","value":"record_switch"},{"op":"set","key":"blue_audio_checked","value":true},{"op":"set","key":"rival_opening_response","value":"wait_for_switch"},{"op":"set","key":"source_switch_log","value":true},{"op":"set","key":"opening_switch_video","value":true},{"op":"learnFact","character":"l","fact":"saw_opening_record_switch"}]`

后继：`OP_SETTLE`

### 选择 COLD/g

找顾晚棠核授权：让程放当场解释

可选条件：`{"all":[{"eq":["novel_recognized",true]},{"eq":["blue_location_known",true]},{"eq":["opening_strategy","investigate"]}]}`

立即回应：

**许照**：顾小姐，这个版本剪过前奏。你们真的要求这样改吗？我找到了原版，能先核一下？

`COLD.g.r4.reply.001`

**旁白**：你把U盘交给阿衡试听。顾晚棠打开项目邮件，不替任何人打包票。

`COLD.g.r4.reply.002`

**顾晚棠**：我批准的是完整演出。程放，谁让你把这个剪辑版送上台的？

`COLD.g.r4.reply.003`

**程放**：宣传预览也是这份，我以为可以直接用……

`COLD.g.r4.reply.004`

**顾晚棠**：预览不是演出。清辞，阿衡确认后，照原节目单走。

`COLD.g.r4.reply.005`

**旁白**：唐映雪重新接上原版。陆景行确认不需要钢琴，退回侧台。

`COLD.g.r4.reply.006`

**顾晚棠**：许照，对吧？你敢来问我，很好。可要真想帮自己，记住刚才你亲眼看到的，别急着替谁定罪。

`COLD.g.r4.reply.007`

写入与操作：`[{"op":"set","key":"first","value":"g"},{"op":"set","key":"bias","value":"g"},{"op":"set","key":"stage","value":"original"},{"op":"set","key":"first_win","value":true},{"op":"set","key":"opening_changed","value":true},{"op":"set","key":"opening_route","value":"g"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_blue_disc","value":true},{"op":"set","key":"opening_g","value":"blue_disc"},{"op":"set","key":"opening_method","value":"authorization_check"},{"op":"set","key":"blue_audio_checked","value":true},{"op":"set","key":"rival_opening_response","value":"yield_to_confirmation"},{"op":"set","key":"source_switch_log","value":true},{"op":"set","key":"opening_authorization_checked","value":true},{"op":"set","key":"cheng_questioned_early","value":true},{"op":"learnFact","character":"g","fact":"saw_opening_authorization_check"}]`

后继：`OP_SETTLE`

### 选择 COLD/self

和阿衡搭档：我找盘，他安全切

可选条件：`{"all":[{"eq":["novel_recognized",true]},{"eq":["blue_location_known",true]},{"any":[{"eq":["opening_strategy","rescue"]},{"eq":["opening_strategy","investigate"]}]}]}`

立即回应：

**旁白**：你拿起U盘，先看标签，再交给阿衡：“像是这份。你听一下，我不碰控台。”

`COLD.self.r4.reply.001`

**阿衡**：是完整前奏。下个小节切！

`COLD.self.r4.reply.002`

**旁白**：陆景行用钢琴垫了四小节，给核对留出时间；原版接上，他就停下，让唐映雪自己唱完。

`COLD.self.r4.reply.003`

**旁白**：阿衡在切换记录里写清：许照找到备用伴奏，阿衡执行切换。你不需要装成什么全能音控；把对的人放到对的位置，照样能改写原著。

`COLD.self.r4.reply.004`

**阿衡**：以后问起来，我认我切的那一下。找到东西的功劳，也不会少你。

`COLD.self.r4.reply.005`

**许照**：好。你只管把名字写对。刚才那几分钟，我可不想白紧张。

`COLD.self.r4.reply.006`

写入与操作：`[{"op":"set","key":"first","value":"self"},{"op":"set","key":"bias","value":"self"},{"op":"set","key":"stage","value":"original"},{"op":"set","key":"first_win","value":true},{"op":"set","key":"opening_changed","value":true},{"op":"set","key":"opening_route","value":"self"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_blue_disc","value":true},{"op":"set","key":"opening_method","value":"audio_handoff"},{"op":"set","key":"blue_audio_checked","value":true},{"op":"set","key":"rival_opening_response","value":"piano_bridge"},{"op":"set","key":"source_switch_log","value":true}]`

后继：`OP_SETTLE`


---

## OP_SETTLE｜歌声还在，你却回不去了

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_FORK","clock":{"day":1,"time":"19:04"}}`

### 正文

**旁白**：下一首歌响起时，你才发现自己站了半天都没动。手机能用这张陌生的脸解锁，屏幕里却塞满不认识的租房地址、工作群和未读消息。

`OP_SETTLE.r4.body.001`

**许照**：房租、钥匙、银行卡……我连今晚住哪儿都不知道。难不成真的回不去了？

`OP_SETTLE.r4.body.002`

**旁白**：你试着按灭屏幕，又把它点亮。除了新消息，一切都纹丝不动。对讲机里忽然有人喊“许照”，你条件反射地答了声“在”。说完才觉得后背发凉。

`OP_SETTLE.r4.body.003`

**旁白**：阿衡把亲手核过的切换记录塞给你。纸上终于写下“许照”两个字，你盯了半天：原著里，这个名字只会出现在被清退的名单上。

`OP_SETTLE.r4.body.004`

### 选择 OP_SETTLE/continue

先缓口气，去见刚才注意到你的人

可选条件：`null`

立即回应：



写入与操作：`[{"op":"set","key":"settled_identity","value":true},{"op":"set","key":"source_opening_record_copy","value":true}]`

后继：`OP_FORK`


---

## OP_TALK_t｜她先记住了你的名字

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_SECRET_t","clock":{"day":1,"time":"19:10"}}`

### 正文

**旁白**：最后一个音刚落，唐映雪就抱着水杯朝侧幕跑。她先对阿衡比了个谢，回头看你差点踩到线，伸手拽住你的袖子。

`OP_TALK_t.r4.body.001`

**唐映雪**：许照？我在台上瞥见你一直点头，跟节拍器似的。怎么现在脸白成这样？

`OP_TALK_t.r4.body.002`

**许照**：你要是再晚拉一下，我可能真得给大家表演原地摔跤。

`OP_TALK_t.r4.body.003`

**唐映雪**：那先喝水。别急着解释盘怎么来的——我等你能把这口气喘匀了再问。

`OP_TALK_t.r4.body.004`

### 选择 OP_TALK_t/flirt

“歌很好听。你刚才看过来的时候也是。”

可选条件：`null`

立即回应：

**许照**：歌没唱砸。我倒差点只顾着看你，忘了看阿衡。

`OP_TALK_t.flirt.r4.reply.001`

**唐映雪**：刚才还吓得不敢喘气，现在倒敢夸我了？这句我先收下。

`OP_TALK_t.flirt.r4.reply.002`

**旁白**：她嘴上不饶人，却把没拆封的那瓶水塞进你手里：“下次先顾好自己，再顾舞台。”

`OP_TALK_t.flirt.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_t","value":"flirt"},{"op":"set","key":"aftershow","value":"near"}]`

后继：`OP_SECRET_t`

### 选择 OP_TALK_t/slow

“我还在发抖，先让我缓缓。”

可选条件：`null`

立即回应：

**许照**：我还没缓过来。你唱完了就好。

`OP_TALK_t.slow.r4.reply.001`

**唐映雪**：那先坐。刚才谢谢你，认真说的。

`OP_TALK_t.slow.r4.reply.002`

**旁白**：她把瓶盖替你拧松一点，又迅速收回手：“别想多，是你手抖得拧不开。”

`OP_TALK_t.slow.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_t","value":"slow"},{"op":"set","key":"aftershow","value":"quiet"}]`

后继：`OP_SECRET_t`

### 选择 OP_TALK_t/work

“下次演出，我还能来帮忙吗？”

可选条件：`null`

立即回应：

**许照**：我叫许照。以后有缺人的场子，能不能叫我一声？

`OP_TALK_t.work.r4.reply.001`

**唐映雪**：可以。不过我是唱歌的，活儿得问清辞。

`OP_TALK_t.work.r4.reply.002`

**旁白**：她朝沈清辞招手：“刚才找盘的人还在！下场缺人问问他。”又小声补一句：“有空也来听歌。”

`OP_TALK_t.work.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_t","value":"work"},{"op":"set","key":"aftershow","value":"name"},{"op":"set","key":"named_in_credits","value":true}]`

后继：`OP_SECRET_t`


---

## OP_TALK_s｜她先把你当成靠谱的人

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_SECRET_s","clock":{"day":1,"time":"19:10"}}`

### 正文

**旁白**：沈清辞的对讲机响了第三次。她按住通话键，说“给我十秒”，转身把一瓶水放到你面前。

`OP_TALK_s.r4.body.001`

**沈清辞**：许照，是吧？你刚才没有碰控台，这是对的。散场留个号码，我想再确认一件事。

`OP_TALK_s.r4.body.002`

**许照**：你这十秒不是拿来安排下一项工作的？

`OP_TALK_s.r4.body.003`

**沈清辞**：本来是。可你再站两分钟，我怕得安排人送你去医院。先喝水。

`OP_TALK_s.r4.body.004`

### 选择 OP_TALK_s/flirt

“除了工作，能偶尔聊点别的吗？”

可选条件：`null`

立即回应：

**许照**：除了回报设备正常，还能发点别的吗？

`OP_TALK_s.flirt.r4.reply.001`

**沈清辞**：比如？

`OP_TALK_s.flirt.r4.reply.002`

**许照**：今天辛苦了。

`OP_TALK_s.flirt.r4.reply.003`

**旁白**：她抿住笑，把手机递近：“这个可以。凌晨三点不许发‘在吗’。”

`OP_TALK_s.flirt.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_style_s","value":"flirt"},{"op":"set","key":"aftershow","value":"near"},{"op":"set","key":"contact_s","value":"private"}]`

后继：`OP_SECRET_s`

### 选择 OP_TALK_s/slow

“先加上吧，我有点紧张。”

可选条件：`null`

立即回应：

**许照**：我有点紧张。先加上，慢慢认识？

`OP_TALK_s.slow.r4.reply.001`

**沈清辞**：可以。我叫沈清辞。别紧张，也不用一口一个沈总。

`OP_TALK_s.slow.r4.reply.002`

**旁白**：她等你扫完码，才重新戴好耳机。走出两步又折回来：“还有，水是热的，别只顾喝冰的。”

`OP_TALK_s.slow.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_s","value":"slow"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"set","key":"contact_s","value":"private"}]`

后继：`OP_SECRET_s`

### 选择 OP_TALK_s/work

“留工作号就好，我想争取下一场。”

可选条件：`null`

立即回应：

**沈清辞**：好。我把你拉进排期群，下一场需要什么会写清楚。

`OP_TALK_s.work.r4.reply.001`

**旁白**：你存下工作号码。她没有把这句话听成别的邀约。

`OP_TALK_s.work.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_style_s","value":"work"},{"op":"set","key":"aftershow","value":"name"},{"op":"set","key":"contact_s","value":"work"}]`

后继：`OP_SECRET_s`


---

## OP_TALK_l｜镜头之外，她问了你一句

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_SECRET_l","clock":{"day":1,"time":"19:10"}}`

### 正文

**旁白**：林见月举着相机后退，鞋跟快踩到散落的音频线。你拉住她的衣袖。她先护住镜头，下一秒才有点不好意思地看你。

`OP_TALK_l.r4.body.001`

**林见月**：盘、时间码和阿衡的确认，我都拍到了。只有找到盘的人一直不看镜头。你是不想留下照片吗？

`OP_TALK_l.r4.body.002`

**许照**：说真的，我刚才只想着别让事出在我手里。拍不拍反倒忘了。

`OP_TALK_l.r4.body.003`

**林见月**：那就先不拍你。……等等，你手怎么还在抖？要不要先坐一下？

`OP_TALK_l.r4.body.004`

### 选择 OP_TALK_l/flirt

“可以，只发我。下张换我拍你？”

可选条件：`null`

立即回应：

**许照**：可以，只发我。下张换我拍你？拍坏了你别嫌弃。

`OP_TALK_l.flirt.r4.reply.001`

**林见月**：那你先把我拍好。我拍别人特别严，轮到自己上镜就没底。

`OP_TALK_l.flirt.r4.reply.002`

**旁白**：她等你站稳才按快门，确认你愿意后，把照片发到你手机。

`OP_TALK_l.flirt.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_l","value":"flirt"},{"op":"set","key":"aftershow","value":"near"},{"op":"set","key":"private_photo","value":"two_people_only"}]`

后继：`OP_SECRET_l`

### 选择 OP_TALK_l/slow

“今天先别拍。我还没缓过来。”

可选条件：`null`

立即回应：

**林见月**：好，不拍。

`OP_TALK_l.slow.r4.reply.001`

**旁白**：她合上镜头盖：“那就不拍。等你想留住什么的时候，再告诉我。”

`OP_TALK_l.slow.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_style_l","value":"slow"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"set","key":"private_photo","value":"not_taken"}]`

后继：`OP_SECRET_l`

### 选择 OP_TALK_l/work

“只留工作记录吧，把实际做事的人记全。”

可选条件：`null`

立即回应：

**林见月**：好，刚才的切换记录保留。我再拍一下阿衡核对时间，你愿意一起来确认吗？

`OP_TALK_l.work.r4.reply.001`

**许照**：行。

`OP_TALK_l.work.r4.reply.002`

**旁白**：你和阿衡入镜核对了标签与时间，没有补拍私人照片。

`OP_TALK_l.work.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_l","value":"work"},{"op":"set","key":"aftershow","value":"name"},{"op":"set","key":"private_photo","value":"not_taken"},{"op":"set","key":"project_shot","value":"consented"}]`

后继：`OP_SECRET_l`


---

## OP_TALK_g｜她想弄清你是怎样的人

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_SECRET_g","clock":{"day":1,"time":"19:10"}}`

### 正文

**旁白**：顾晚棠合上电脑，拇指却还压在一条尚未发出的消息上。看见你的临时工牌，她抬眼打量你两秒，才把手机收起来。

`OP_TALK_g.r4.body.001`

**顾晚棠**：许照，对吧？刚才那个原版盘，是你找回来的？

`OP_TALK_g.r4.body.002`

**许照**：是我找到的。能不能用，是阿衡试听过才决定的。我没碰控台。

`OP_TALK_g.r4.body.003`

**顾晚棠**：这倒说得清楚。先坐，你脸色都白了。

`OP_TALK_g.r4.body.004`

**许照**：我刚才就怕说不清，最后什么都算我头上。听你这么问，我反倒踏实点。

`OP_TALK_g.r4.body.005`

### 选择 OP_TALK_g/flirt

“现在不谈工作，可以认识你吗？”

可选条件：`null`

立即回应：

**许照**：现在不说工作的话，还能加你吗？想认识一下。

`OP_TALK_g.flirt.r4.reply.001`

**顾晚棠**：才刚站稳，就开始打我的主意？

`OP_TALK_g.flirt.r4.reply.002`

**旁白**：你被她看得一噎。她这才笑出来，打开二维码：“先加着。至于你是不是真的这么有胆量，慢慢看。”

`OP_TALK_g.flirt.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_g","value":"flirt"},{"op":"set","key":"aftershow","value":"near"},{"op":"set","key":"contact_g","value":"private"}]`

后继：`OP_SECRET_g`

### 选择 OP_TALK_g/slow

“想认识，但我得先把话说顺。”

可选条件：`null`

立即回应：

**许照**：先认识一下。你问得太快，我容易说错话。

`OP_TALK_g.slow.r4.reply.001`

**顾晚棠**：刚才指出问题的时候，倒挺利落。

`OP_TALK_g.slow.r4.reply.002`

**旁白**：她把手机递过来：“顾晚棠。我的名字不用再猜了。”

`OP_TALK_g.slow.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_style_g","value":"slow"},{"op":"set","key":"aftershow","value":"quiet"},{"op":"set","key":"contact_g","value":"private"}]`

后继：`OP_SECRET_g`

### 选择 OP_TALK_g/work

“我想要一次凭本事接活的机会。”

可选条件：`null`

立即回应：

**顾晚棠**：好。我介绍负责人给你，具体能做什么，你自己谈。

`OP_TALK_g.work.r4.reply.001`

**旁白**：她递来工作名片。名片不是录用通知，但至少有人肯听你开口了。

`OP_TALK_g.work.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_style_g","value":"work"},{"op":"set","key":"aftershow","value":"name"},{"op":"set","key":"contact_g","value":"work"}]`

后继：`OP_SECRET_g`


---

## OP_TALK_self｜这回，记录里有你的名字

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_RIVAL","clock":{"day":1,"time":"19:25"}}`

### 正文

**旁白**：阿衡核对完切换记录，又问了一遍你的名字。

`OP_TALK_self.r4.body.001`

**阿衡**：许照，对吧？盘是你找到的，我没写漏。

`OP_TALK_self.r4.body.002`

**旁白**：阿衡把清点表转给你。你翻到自己的名字，旁边清清楚楚写着“找到备用盘”。这回，至少有人知道你做过什么。

`OP_TALK_self.r4.body.003`

### 选择 OP_TALK_self/credit

名字写全。我想接下一场。

可选条件：`null`

立即回应：

**阿衡**：行，我把你介绍给下一场的负责人。做什么，你们自己谈。

`OP_TALK_self.credit.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_self_goal","value":"credit"},{"op":"set","key":"named_in_credits","value":true},{"op":"set","key":"aftershow","value":"name"}]`

后继：`OP_RIVAL`

### 选择 OP_TALK_self/observe

先看看陆景行下一步做什么。

可选条件：`null`

立即回应：

**旁白**：你看向陆景行。他没有因为少了一段独奏就干等着，已经拿着手机走向制作人。

`OP_TALK_self.observe.r4.reply.001`

**许照**：这人反应也太快了……我只改对了第一步。

`OP_TALK_self.observe.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_self_goal","value":"observe"},{"op":"set","key":"aftershow","value":"quiet"}]`

后继：`OP_RIVAL`

### 选择 OP_TALK_self/curious

先把今晚过好。喜欢谁，之后再说。

可选条件：`null`

立即回应：

**旁白**：你把记录收好。映雪还在台上，清辞走向侧廊，见月收着相机。晚棠经过时看了你一眼。之后还有机会。

`OP_TALK_self.curious.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_self_goal","value":"curious"},{"op":"set","key":"aftershow","value":"quiet"}]`

后继：`OP_RIVAL`


---

## OP_SECRET_t｜她好奇你怎么找到的

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_RIVAL","clock":{"day":1,"time":"19:15"}}`

### 正文

**旁白**：唐映雪把水杯放下，指了指控台。

`OP_SECRET_t.r4.body.001`

**唐映雪**：那个备用箱压在下面，程放找半天都没找到。你怎么一下就翻出来了？

`OP_SECRET_t.r4.body.002`

**许照**：这个……

`OP_SECRET_t.r4.body.003`

**唐映雪**：不是审你。我就是怕下一回没人知道盘在哪，你又突然钻进箱子里。

`OP_SECRET_t.r4.body.004`

### 选择 OP_SECRET_t/truth

“说出来很离谱。我在一本小说里读过今晚。”

可选条件：`null`

立即回应：

**许照**：我刚才醒来前，在一本小说里读到过这场演出。书里有你，也写了备用盘的位置。

`OP_SECRET_t.truth.r4.reply.001`

**唐映雪**：……你认真的？

`OP_SECRET_t.truth.r4.reply.002`

**许照**：我知道听起来离谱。我自己也还没缓过来。

`OP_SECRET_t.truth.r4.reply.003`

**旁白**：她看了你一会儿：“那先别往下预言。我去拿瓶水，你在这儿等。”

`OP_SECRET_t.truth.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_t","value":"truth"},{"op":"learnFact","character":"t","fact":"foreknowledge_claim"},{"op":"set","key":"opening_t","value":"story"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_t/partial

“我有线索，但来路现在说不清。我不想现编。”

可选条件：`null`

立即回应：

**许照**：我有个线索，但现在没法解释清楚。我不想现编一个理由。

`OP_SECRET_t.partial.r4.reply.001`

**唐映雪**：行。你不想说就先放着。

`OP_SECRET_t.partial.r4.reply.002`

**旁白**：她看向舞台，又回头补了一句：“但下次别一声不响往箱子底下钻，吓人。”

`OP_SECRET_t.partial.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_origin_t","value":"partial"},{"op":"learnFact","character":"t","fact":"source_withheld"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_t/lie

阿衡提前告诉我的。【这是编的】

可选条件：`null`

立即回应：

**唐映雪**：那他刚才怎么急成那样？

`OP_SECRET_t.lie.r1.reply.001`

**许照**：可能忘了备用盘。

`OP_SECRET_t.lie.r1.reply.002`

**旁白**：她朝控台看了一眼。

`OP_SECRET_t.lie.r1.reply.003`

**唐映雪**：我待会儿问问他。

`OP_SECRET_t.lie.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_t","value":"lie"},{"op":"set","key":"opening_lie_t","value":true},{"op":"learnFact","character":"t","fact":"claimed_aheng_source"}]`

后继：`OP_RIVAL`


---

## OP_SECRET_s｜她只想先把事情听明白

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_RIVAL","clock":{"day":1,"time":"19:15"}}`

### 正文

**旁白**：沈清辞看了一眼你的胸牌，又指了指备用箱。

`OP_SECRET_s.r4.body.001`

**沈清辞**：第一天来，怎么连箱底有什么都知道？

`OP_SECRET_s.r4.body.002`

**许照**：我说了，你可能不信。

`OP_SECRET_s.r4.body.003`

**沈清辞**：你先说你亲眼看见了什么。没看见的部分，我会自己查。

`OP_SECRET_s.r4.body.004`

### 选择 OP_SECRET_s/truth

“我刚才读到的小说，和眼前的事一模一样。”

可选条件：`null`

立即回应：

**许照**：我刚才还在读一本小说。下一秒醒在这里，人物和事情全对上了。备用盘也是书里提过的。

`OP_SECRET_s.truth.r4.reply.001`

**沈清辞**：你现在还头晕吗？

`OP_SECRET_s.truth.r4.reply.002`

**许照**：好一点了。我知道这不像正常解释。

`OP_SECRET_s.truth.r4.reply.003`

**沈清辞**：先坐一下。盘我查过是真的，至于故事，等你状态好些再谈。

`OP_SECRET_s.truth.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_s","value":"truth"},{"op":"learnFact","character":"s","fact":"foreknowledge_claim"},{"op":"set","key":"opening_s","value":"story"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_s/partial

我知道位置，但来路现在说不清。

可选条件：`null`

立即回应：

**沈清辞**：可以晚点说。

`OP_SECRET_s.partial.r1.reply.001`

**旁白**：她把备用箱的标签重新贴好。

`OP_SECRET_s.partial.r1.reply.002`

**沈清辞**：不过工作上的事，我还会找阿衡核一遍。不是专门不信你。

`OP_SECRET_s.partial.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_origin_s","value":"partial"},{"op":"learnFact","character":"s","fact":"source_withheld"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_s/lie

阿衡提前告诉我的。【这是编的】

可选条件：`null`

立即回应：

**沈清辞**：哪次？

`OP_SECRET_s.lie.r1.reply.001`

**许照**：开场前。

`OP_SECRET_s.lie.r1.reply.002`

**旁白**：她看了眼钟，发出一条核对消息。

`OP_SECRET_s.lie.r1.reply.003`

**沈清辞**：好，我问一下他。

`OP_SECRET_s.lie.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_s","value":"lie"},{"op":"set","key":"opening_lie_s","value":true},{"op":"learnFact","character":"s","fact":"claimed_aheng_source"}]`

后继：`OP_RIVAL`


---

## OP_SECRET_l｜她注意到了你的动作

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_RIVAL","clock":{"day":1,"time":"19:15"}}`

### 正文

**旁白**：林见月回放切换记录。画面里的你没有乱翻别的箱子，拿起的就是那枚蓝标盘。

`OP_SECRET_l.r4.body.001`

**林见月**：排练的时候，你在场吗？

`OP_SECRET_l.r4.body.002`

**许照**：不在。

`OP_SECRET_l.r4.body.003`

**林见月**：那你怎么知道要掀哪个箱子？我镜头里没拍到有人提醒你。

`OP_SECRET_l.r4.body.004`

### 选择 OP_SECRET_l/truth

“没来排练。我在一本小说里读过这一幕。”

可选条件：`null`

立即回应：

**许照**：没人告诉我。我在小说里读过这一幕……然后就醒在这里了。

`OP_SECRET_l.truth.r4.reply.001`

**林见月**：所以你不是见过排练，是觉得它和书里一样？

`OP_SECRET_l.truth.r4.reply.002`

**许照**：对。名字、场地、出错的伴奏，都一样。

`OP_SECRET_l.truth.r4.reply.003`

**旁白**：她把相机放下：“我没法只听这几句就相信。但你可以慢慢说。”

`OP_SECRET_l.truth.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_l","value":"truth"},{"op":"learnFact","character":"l","fact":"foreknowledge_claim"},{"op":"set","key":"opening_l","value":"story"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_l/partial

我有来路，但还没想好怎么说。

可选条件：`null`

立即回应：

**林见月**：那先别替自己编一段以前。

`OP_SECRET_l.partial.r1.reply.001`

**旁白**：她把画面停在你伸手的那一帧。

`OP_SECRET_l.partial.r1.reply.002`

**林见月**：这一段是真的。别的等你愿意说。

`OP_SECRET_l.partial.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_origin_l","value":"partial"},{"op":"learnFact","character":"l","fact":"source_withheld"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_l/lie

阿衡提前告诉我的。【这是编的】

可选条件：`null`

立即回应：

**林见月**：他知道藏在哪，刚才还跑来问我？

`OP_SECRET_l.lie.r1.reply.001`

**许照**：也许一急忘了。

`OP_SECRET_l.lie.r1.reply.002`

**旁白**：她没继续追问，只说等阿衡收工，一起对一次时间。

`OP_SECRET_l.lie.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_origin_l","value":"lie"},{"op":"set","key":"opening_lie_l","value":true},{"op":"learnFact","character":"l","fact":"claimed_aheng_source"}]`

后继：`OP_RIVAL`


---

## OP_SECRET_g｜她想知道，你凭什么敢问

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_RIVAL","clock":{"day":1,"time":"19:15"}}`

### 正文

**旁白**：顾晚棠重新看了一遍那封邮件。

`OP_SECRET_g.r4.body.001`

**顾晚棠**：你怎么会想到先找我核实？现场出了事，多数人只顾着赶紧补上。

`OP_SECRET_g.r4.body.002`

**许照**：我有个线索。但没核实前，我也拿不准。

`OP_SECRET_g.r4.body.003`

**顾晚棠**：行，先说你能确认的部分。其他的，我来查。

`OP_SECRET_g.r4.body.004`

### 选择 OP_SECRET_g/truth

“小说里写过你的反对意见。我只是拿它当线索。”

可选条件：`null`

立即回应：

**许照**：一本小说写过这场演出，也写过你反对删歌。我知道听着像胡说。

`OP_SECRET_g.truth.r4.reply.001`

**顾晚棠**：所以你才找我核实？

`OP_SECRET_g.truth.r4.reply.002`

**许照**：对。我不敢只凭记忆就往外放。

`OP_SECRET_g.truth.r4.reply.003`

**旁白**：她收起手机：“刚才核实那一步是对的。小说的事，我暂时不下结论。”

`OP_SECRET_g.truth.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_g","value":"truth"},{"op":"learnFact","character":"g","fact":"foreknowledge_claim"},{"op":"set","key":"opening_g","value":"story"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_g/partial

“我有线索，刚才是在请你核实。”

可选条件：`null`

立即回应：

**许照**：我有个线索，但不确定准不准，所以才先问你。

`OP_SECRET_g.partial.r4.reply.001`

**顾晚棠**：嗯，至少没替我答应。

`OP_SECRET_g.partial.r4.reply.002`

**旁白**：她点了点邮件：“来路你可以晚点说。工作上，我还是只认查得到的东西。”

`OP_SECRET_g.partial.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_origin_g","value":"partial"},{"op":"learnFact","character":"g","fact":"source_withheld"}]`

后继：`OP_RIVAL`

### 选择 OP_SECRET_g/lie

阿衡提前告诉我的。【这是编的】

可选条件：`null`

立即回应：

**顾晚棠**：他没参加那场会。

`OP_SECRET_g.lie.r1.reply.001`

**许照**：可能听别人说的。

`OP_SECRET_g.lie.r1.reply.002`

**旁白**：晚棠看着你，发了条消息。

`OP_SECRET_g.lie.r1.reply.003`

**顾晚棠**：那就先问他听谁说的。

`OP_SECRET_g.lie.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_origin_g","value":"lie"},{"op":"set","key":"opening_lie_g","value":true},{"op":"learnFact","character":"g","fact":"claimed_aheng_source"}]`

后继：`OP_RIVAL`


---

## OP_RIVAL｜原男主没停下，我也不能停

类型：`opening`。元数据：`{"background":"hall","music":"none","next":"@openingCheck","clock":{"day":1,"time":"19:40"}}`

### 正文

**旁白**：首演刚散场，陆景行就抱着乐谱走下台，给制作人打了电话。你还没从那阵掌声里缓过来，他已经替唐映雪问好了下一次试音的机会。

`OP_RIVAL.r4.body.001`

**陆景行**：映雪，制作人听了现场片段，想听你的完整新歌。我先问到了二号录音室，九点有空；去不去，你自己定。

`OP_RIVAL.r4.body.002`

**唐映雪**：先听条件。别到时候又让我唱完才知道谁能发。

`OP_RIVAL.r4.body.003`

**陆景行**：当然。许照，阿衡说盘是你找到的。想一起试工吗？不熟的设备让他带你。

`OP_RIVAL.r4.body.004`

**原著记忆**：（书里这次录音邀约明明是三天后才有的。看来我改变了今晚，别人接下来的决定也会变。我不能只盯着自己记得的那几页。）

`OP_RIVAL.r4.body.005`

### 选择 OP_RIVAL/join

抢一份正式试工：跟原男主同场见真本事

可选条件：`null`

立即回应：

**陆景行**：八点五十，你和阿衡做一次现场检查。名字写你的，做不到提前说。

`OP_RIVAL.join.r1.reply.001`

**旁白**：你接下试工安排。九点的新歌试听，你不再只是等人通知的场务，而是有明确职责、能被核对成果的参加者。

`OP_RIVAL.join.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_work","value":"join"},{"op":"set","key":"opening_work_commitment","value":true}]`

后继：`@openingCheck`

### 选择 OP_RIVAL/own

另做个人小样：不靠他的名单争机会

可选条件：`null`

立即回应：

**许照**：映雪，我想用手机另录一段你的新唱法。先给你听，不往外发。

`OP_RIVAL.own.r4.reply.001`

**唐映雪**：可以。八点半我空五分钟。成品先给我听，不许擅自发。

`OP_RIVAL.own.r4.reply.002`

**陆景行**：我九点等她。录得好，可以一起拿来听。

`OP_RIVAL.own.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_work","value":"own"},{"op":"set","key":"opening_work_commitment","value":true}]`

后继：`@openingCheck`

### 选择 OP_RIVAL/free

放掉这次名额：今晚押注另一条线

可选条件：`null`

立即回应：

**陆景行**：好。之后有合适的事，我再问。

`OP_RIVAL.free.r1.reply.001`

**旁白**：陆景行没有嘲笑你。他转身继续安排录音室，你则保住今晚的自由时间。你们都没有暂停，但下一次相遇，分量会不同。

`OP_RIVAL.free.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_work","value":"free"},{"op":"set","key":"opening_work_commitment","value":false}]`

后继：`@openingCheck`


---

## OP_CHECK_t｜她没有急着相信你

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_DATE_t","clock":{"day":1,"time":"19:45"}}`

### 正文

**旁白**：19:45，映雪在侧门收拾耳机。见你走过来，她往旁边让了让。

`OP_CHECK_t.r4.body.001`

### 条件正文 · OP_CHECK_t.r1.block.001

条件：`{"eq":["opening_origin_t","lie"]}`

**唐映雪**：我刚问了阿衡。他说蓝标是你先找到的，他没告诉你。

`OP_CHECK_t.r1.block.001.001`

**旁白**：阿衡的回复还亮在屏幕上，发送时间就在两分钟前。

`OP_CHECK_t.r1.block.001.002`

### 条件正文 · OP_CHECK_t.r1.block.002

条件：`{"eq":["opening_origin_t","truth"]}`

**唐映雪**：你说书里有我？那我下一口喝热的还是凉的，你知道吗？

`OP_CHECK_t.r1.block.002.001`

**旁白**：她问得半信半疑，不像在等一个预言。

`OP_CHECK_t.r1.block.002.002`

### 条件正文 · OP_CHECK_t.r1.block.003

条件：`{"eq":["opening_origin_t","partial"]}`

**唐映雪**：不方便说就算了。你今天脸白成那样，我还以为你要晕第二次。

`OP_CHECK_t.r1.block.003.001`

### 条件正文 · OP_CHECK_t.r1.block.004

条件：`{"all":[{"all":[{"eq":["first","t"]},{"eq":["opening_style_t","flirt"]}]},{"ne":["opening_origin_t","lie"]}]}`

**唐映雪**：刚才说歌和人都要看，现在倒安静了。

`OP_CHECK_t.r1.block.004.001`

### 条件正文 · OP_CHECK_t.r1.block.005

条件：`{"all":[{"all":[{"eq":["first","t"]},{"eq":["opening_style_t","slow"]}]},{"ne":["opening_origin_t","lie"]}]}`

**唐映雪**：你说慢一点，我没催。今天只是请你听歌。

`OP_CHECK_t.r1.block.005.001`

### 选择 OP_CHECK_t/admit

是我编的。我当面向阿衡更正。

可选条件：`{"eq":["opening_origin_t","lie"]}`

立即回应：

**许照**：阿衡没告诉我，是我借了他的名字。

`OP_CHECK_t.admit.r1.reply.001`

**旁白**：你叫住还没走远的阿衡，当着她的面更正。

`OP_CHECK_t.admit.r1.reply.002`

**阿衡**：下次别这么说。东西是你找到的，本来就不用借我的名。

`OP_CHECK_t.admit.r1.reply.003`

**唐映雪**：今天那首没写完的歌，先不给你听了。普通聊天还可以。

`OP_CHECK_t.admit.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_lie_t","value":false},{"op":"set","key":"opening_resolution_t","value":"admitted"},{"op":"learnFact","character":"t","fact":"source_lie_corrected"},{"op":"set","key":"opening_access_t","value":"ordinary"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/double

他现在不肯承认。【继续推给他】

可选条件：`{"eq":["opening_origin_t","lie"]}`

立即回应：

**唐映雪**：那先别说了。我去准备九点的试听。

`OP_CHECK_t.double.r1.reply.001`

**旁白**：她取消了这次私人见面。你依然能处理自己的工作，但不能把它算成约会。

`OP_CHECK_t.double.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"doubled"},{"op":"set","key":"opening_access_t","value":"cancelled"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/withdraw

不再编了。今晚先不单独见。

可选条件：`{"eq":["opening_origin_t","lie"]}`

立即回应：

**许照**：来路我没讲清，也不该拿阿衡挡。今天先到这里。

`OP_CHECK_t.withdraw.r1.reply.001`

**唐映雪**：好。等你想清楚再说。

`OP_CHECK_t.withdraw.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_lie_t","value":false},{"op":"set","key":"opening_resolution_t","value":"withdrawn"},{"op":"learnFact","character":"t","fact":"source_lie_admitted"},{"op":"set","key":"opening_access_t","value":"cancelled"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/present

“不知道。我想听你自己说。”

可选条件：`{"eq":["opening_origin_t","truth"]}`

立即回应：

**许照**：不知道。我记得的是演出，不是你现在想喝什么。

`OP_CHECK_t.present.r4.reply.001`

**唐映雪**：那你就跟我一样，现选。

`OP_CHECK_t.present.r4.reply.002`

**旁白**：她在贩卖机上按了热水，顺手指给你旁边的饮料按钮。

`OP_CHECK_t.present.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"present"},{"op":"set","key":"opening_access_t","value":"private"},{"op":"learnFact","character":"t","fact":"foreknowledge_not_omniscience"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/predict

说清已经改变的试听安排，不装全知

可选条件：`{"eq":["opening_origin_t","truth"]}`

立即回应：

**许照**：至少有一件事变了。原来制作人三天后才联系陆景行，刚才他已经把试听约到了今晚。

`OP_CHECK_t.predict.r4.reply.001`

**唐映雪**：这个我听见了。至于以前会怎样……先不说它了，九点得唱好。

`OP_CHECK_t.predict.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"updated"},{"op":"set","key":"opening_access_t","value":"private"},{"op":"learnFact","character":"t","fact":"changed_event_observed"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/privacy

“今天先当刚认识，行吗？”

可选条件：`{"any":[{"eq":["opening_origin_t","truth"]},{"eq":["opening_origin_t","partial"]}]}`

立即回应：

**许照**：今天先当刚认识，行吗？

`OP_CHECK_t.privacy.r4.reply.001`

**唐映雪**：行。那重新问一次，许照，你吃饭没有？

`OP_CHECK_t.privacy.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"fresh"},{"op":"set","key":"opening_access_t","value":"ordinary"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/ask

主动问下次还能不能听歌

可选条件：`{"eq":["opening_origin_t","partial"]}`

立即回应：

**许照**：今天之后，还能找你听歌吗？

`OP_CHECK_t.ask.r4.reply.001`

**唐映雪**：可以啊。我又没因为你不肯说，就把你赶出观众席。

`OP_CHECK_t.ask.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"asked"},{"op":"set","key":"opening_access_t","value":"private"}]`

后继：`OP_DATE_t`

### 选择 OP_CHECK_t/space

“今天先普通聊聊，我还想缓一缓。”

可选条件：`{"eq":["opening_origin_t","partial"]}`

立即回应：

**许照**：来路我今天先不说了。普通聊几句吧。

`OP_CHECK_t.space.r4.reply.001`

**唐映雪**：好。那我先问个容易的，吃辣吗？

`OP_CHECK_t.space.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_t","value":"space"},{"op":"set","key":"opening_access_t","value":"ordinary"}]`

后继：`OP_DATE_t`


---

## OP_CHECK_s｜先把现在的事说清

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_DATE_s","clock":{"day":1,"time":"19:45"}}`

### 正文

**旁白**：19:45，清辞确认完九点的录音安排，暂时关掉对讲机。

`OP_CHECK_s.r4.body.001`

### 条件正文 · OP_CHECK_s.r1.block.001

条件：`{"eq":["opening_origin_s","lie"]}`

**沈清辞**：阿衡回了：他没告诉过你。刚才那句，是你编的？

`OP_CHECK_s.r1.block.001.001`

**旁白**：阿衡的回复还亮在屏幕上，发送时间就在两分钟前。

`OP_CHECK_s.r1.block.001.002`

### 条件正文 · OP_CHECK_s.r1.block.002

条件：`{"eq":["opening_origin_s","truth"]}`

**沈清辞**：旁厅看场是我十分钟前才改的。你那本书，总不能连我临时改主意也知道吧？

`OP_CHECK_s.r1.block.002.001`

### 条件正文 · OP_CHECK_s.r1.block.003

条件：`{"eq":["opening_origin_s","partial"]}`

**沈清辞**：来路可以晚点谈。刚才找到盘、核过音频，这两件事我确认了。

`OP_CHECK_s.r1.block.003.001`

### 条件正文 · OP_CHECK_s.r1.block.004

条件：`{"all":[{"all":[{"eq":["first","s"]},{"eq":["opening_style_s","flirt"]}]},{"ne":["opening_origin_s","lie"]}]}`

**沈清辞**：你说想聊私事，别这时候只盯工作消息。

`OP_CHECK_s.r1.block.004.001`

### 条件正文 · OP_CHECK_s.r1.block.005

条件：`{"all":[{"all":[{"eq":["first","s"]},{"eq":["opening_style_s","slow"]}]},{"ne":["opening_origin_s","lie"]}]}`

**沈清辞**：刚才说想先认识一下。现在知道我的名字了，不用一直叫沈总。

`OP_CHECK_s.r1.block.005.001`

### 选择 OP_CHECK_s/admit

是我编的。我当面向阿衡更正。

可选条件：`{"eq":["opening_origin_s","lie"]}`

立即回应：

**许照**：阿衡没告诉我，是我借了他的名字。

`OP_CHECK_s.admit.r1.reply.001`

**旁白**：你叫住还没走远的阿衡，当着她的面更正。

`OP_CHECK_s.admit.r1.reply.002`

**阿衡**：下次别这么说。东西是你找到的，本来就不用借我的名。

`OP_CHECK_s.admit.r1.reply.003`

**沈清辞**：这次看场就算了。出去走一段，把话说慢一点。

`OP_CHECK_s.admit.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_lie_s","value":false},{"op":"set","key":"opening_resolution_s","value":"admitted"},{"op":"learnFact","character":"s","fact":"source_lie_corrected"},{"op":"set","key":"opening_access_s","value":"ordinary"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/double

他现在不肯承认。【继续推给他】

可选条件：`{"eq":["opening_origin_s","lie"]}`

立即回应：

**沈清辞**：你们先把话对上，今晚不单独见了。

`OP_CHECK_s.double.r1.reply.001`

**旁白**：她取消了这次私人见面。你依然能处理自己的工作，但不能把它算成约会。

`OP_CHECK_s.double.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"doubled"},{"op":"set","key":"opening_access_s","value":"cancelled"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/withdraw

不再编了。今晚先不单独见。

可选条件：`{"eq":["opening_origin_s","lie"]}`

立即回应：

**许照**：来路我没讲清，也不该拿阿衡挡。今天先到这里。

`OP_CHECK_s.withdraw.r1.reply.001`

**沈清辞**：好。等你想清楚再说。

`OP_CHECK_s.withdraw.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_lie_s","value":false},{"op":"set","key":"opening_resolution_s","value":"withdrawn"},{"op":"learnFact","character":"s","fact":"source_lie_admitted"},{"op":"set","key":"opening_access_s","value":"cancelled"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/present

“不知道。我想听你自己说。”

可选条件：`{"eq":["opening_origin_s","truth"]}`

立即回应：

**许照**：没有。工作表上没见过的事，我更不敢瞎猜。

`OP_CHECK_s.present.r4.reply.001`

**沈清辞**：那正好，今晚看你自己的眼光。旁厅有个位置，我还没决定怎么用。

`OP_CHECK_s.present.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"present"},{"op":"set","key":"opening_access_s","value":"private"},{"op":"learnFact","character":"s","fact":"foreknowledge_not_omniscience"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/predict

说清已经改变的试听安排，不装全知

可选条件：`{"eq":["opening_origin_s","truth"]}`

立即回应：

**许照**：我记得制作人的联系在三天后，现在陆景行已经约好了。后面的事我也不能照着原来猜。

`OP_CHECK_s.predict.r4.reply.001`

**沈清辞**：那就按今晚的新排期来。你没把握的地方，提前说。

`OP_CHECK_s.predict.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"updated"},{"op":"set","key":"opening_access_s","value":"private"},{"op":"learnFact","character":"s","fact":"changed_event_observed"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/privacy

“今天先当刚认识，行吗？”

可选条件：`{"any":[{"eq":["opening_origin_s","truth"]},{"eq":["opening_origin_s","partial"]}]}`

立即回应：

**许照**：先不说那本书，按今天刚认识来。

`OP_CHECK_s.privacy.r4.reply.001`

**沈清辞**：可以。今天你帮上了忙，明天来不来还得看你自己的安排。

`OP_CHECK_s.privacy.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"fresh"},{"op":"set","key":"opening_access_s","value":"ordinary"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/ask

问能不能一起看场

可选条件：`{"eq":["opening_origin_s","partial"]}`

立即回应：

**许照**：旁厅能一起看看吗？我也想知道后面会做什么。

`OP_CHECK_s.ask.r4.reply.001`

**沈清辞**：可以。先说好，今天是顺路看场，不是带薪加班。

`OP_CHECK_s.ask.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"asked"},{"op":"set","key":"opening_access_s","value":"private"}]`

后继：`OP_DATE_s`

### 选择 OP_CHECK_s/space

“今天先普通聊聊，我还想缓一缓。”

可选条件：`{"eq":["opening_origin_s","partial"]}`

立即回应：

**许照**：今天不追问彼此。让我先缓一缓。

`OP_CHECK_s.space.r4.reply.001`

**沈清辞**：好。后街有地方坐，比在通道里站着强。

`OP_CHECK_s.space.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_s","value":"space"},{"op":"set","key":"opening_access_s","value":"ordinary"}]`

后继：`OP_DATE_s`


---

## OP_CHECK_l｜她只信拍得到的那部分

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_DATE_l","clock":{"day":1,"time":"19:45"}}`

### 正文

**旁白**：19:45，见月备份完素材，把电脑合上。你站在旁边，她没急着走。

`OP_CHECK_l.r4.body.001`

### 条件正文 · OP_CHECK_l.r1.block.001

条件：`{"eq":["opening_origin_l","lie"]}`

**林见月**：我和阿衡对过时间。他来找我时，你已经拿到了蓝标。

`OP_CHECK_l.r1.block.001.001`

**旁白**：阿衡的回复还亮在屏幕上，发送时间就在两分钟前。

`OP_CHECK_l.r1.block.001.002`

### 条件正文 · OP_CHECK_l.r1.block.002

条件：`{"eq":["opening_origin_l","truth"]}`

**林见月**：你说书里有我。那书里写我拍的片子吗？还是只写我总站在陆景行旁边？

`OP_CHECK_l.r1.block.002.001`

### 条件正文 · OP_CHECK_l.r1.block.003

条件：`{"eq":["opening_origin_l","partial"]}`

**林见月**：来路先不讲。记录里拍到的，我会如实保留。

`OP_CHECK_l.r1.block.003.001`

### 条件正文 · OP_CHECK_l.r1.block.004

条件：`{"all":[{"all":[{"eq":["first","l"]},{"eq":["opening_style_l","flirt"]}]},{"ne":["opening_origin_l","lie"]}]}`

**林见月**：照片还只在我们两个人这里。你答应的下一张，没忘吧？

`OP_CHECK_l.r1.block.004.001`

### 条件正文 · OP_CHECK_l.r1.block.005

条件：`{"all":[{"all":[{"eq":["first","l"]},{"eq":["opening_style_l","slow"]}]},{"ne":["opening_origin_l","lie"]}]}`

**林见月**：相机没开，不用为了我勉强。

`OP_CHECK_l.r1.block.005.001`

### 选择 OP_CHECK_l/admit

是我编的。我当面向阿衡更正。

可选条件：`{"eq":["opening_origin_l","lie"]}`

立即回应：

**许照**：阿衡没告诉我，是我借了他的名字。

`OP_CHECK_l.admit.r1.reply.001`

**旁白**：你叫住还没走远的阿衡，当着她的面更正。

`OP_CHECK_l.admit.r1.reply.002`

**阿衡**：下次别这么说。东西是你找到的，本来就不用借我的名。

`OP_CHECK_l.admit.r1.reply.003`

**林见月**：我的新片先不放了。要散步的话，还可以。

`OP_CHECK_l.admit.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_lie_l","value":false},{"op":"set","key":"opening_resolution_l","value":"admitted"},{"op":"learnFact","character":"l","fact":"source_lie_corrected"},{"op":"set","key":"opening_access_l","value":"ordinary"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/double

他现在不肯承认。【继续推给他】

可选条件：`{"eq":["opening_origin_l","lie"]}`

立即回应：

**林见月**：这不是剪一刀就能改的时间。我先走。

`OP_CHECK_l.double.r1.reply.001`

**旁白**：她取消了这次私人见面。你依然能处理自己的工作，但不能把它算成约会。

`OP_CHECK_l.double.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"doubled"},{"op":"set","key":"opening_access_l","value":"cancelled"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/withdraw

不再编了。今晚先不单独见。

可选条件：`{"eq":["opening_origin_l","lie"]}`

立即回应：

**许照**：来路我没讲清，也不该拿阿衡挡。今天先到这里。

`OP_CHECK_l.withdraw.r1.reply.001`

**林见月**：好。等你想清楚再说。

`OP_CHECK_l.withdraw.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_lie_l","value":false},{"op":"set","key":"opening_resolution_l","value":"withdrawn"},{"op":"learnFact","character":"l","fact":"source_lie_admitted"},{"op":"set","key":"opening_access_l","value":"cancelled"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/present

“不知道。我想听你自己说。”

可选条件：`{"eq":["opening_origin_l","truth"]}`

立即回应：

**许照**：我记得你在剪自己的片子，但书里没放出来。我确实没看过。

`OP_CHECK_l.present.r4.reply.001`

**旁白**：见月停了停，重新摸向电脑包。

`OP_CHECK_l.present.r4.reply.002`

**林见月**：那待会儿给你看三分钟。别急着评价，先看。

`OP_CHECK_l.present.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"present"},{"op":"set","key":"opening_access_l","value":"private"},{"op":"learnFact","character":"l","fact":"foreknowledge_not_omniscience"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/predict

说清已经改变的试听安排，不装全知

可选条件：`{"eq":["opening_origin_l","truth"]}`

立即回应：

**许照**：陆景行刚才说的试听，比我记得的早了三天。我也不知道后面还能对上多少。

`OP_CHECK_l.predict.r4.reply.001`

**林见月**：我先记住“你也不知道”。比拍到一半，你突然说结果早定好了，要好。

`OP_CHECK_l.predict.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"updated"},{"op":"set","key":"opening_access_l","value":"private"},{"op":"learnFact","character":"l","fact":"changed_event_observed"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/privacy

“今天先当刚认识，行吗？”

可选条件：`{"any":[{"eq":["opening_origin_l","truth"]},{"eq":["opening_origin_l","partial"]}]}`

立即回应：

**许照**：今天先当刚认识。我只说真的看见过什么。

`OP_CHECK_l.privacy.r4.reply.001`

**林见月**：好。拍片子我可以聊很多，别问完又说困。

`OP_CHECK_l.privacy.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"fresh"},{"op":"set","key":"opening_access_l","value":"ordinary"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/ask

主动问能不能看看她的片子

可选条件：`{"eq":["opening_origin_l","partial"]}`

立即回应：

**许照**：刚才你说的片子，我能看看吗？

`OP_CHECK_l.ask.r4.reply.001`

**林见月**：能。我正缺一个完全没看过的人。

`OP_CHECK_l.ask.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"asked"},{"op":"set","key":"opening_access_l","value":"private"}]`

后继：`OP_DATE_l`

### 选择 OP_CHECK_l/space

“今天先普通聊聊，我还想缓一缓。”

可选条件：`{"eq":["opening_origin_l","partial"]}`

立即回应：

**许照**：这段先不说，能安静走一会儿吗？

`OP_CHECK_l.space.r4.reply.001`

**林见月**：能。相机也下班了。

`OP_CHECK_l.space.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_l","value":"space"},{"op":"set","key":"opening_access_l","value":"ordinary"}]`

后继：`OP_DATE_l`


---

## OP_CHECK_g｜这一句，她会亲自核实

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"OP_DATE_g","clock":{"day":1,"time":"19:45"}}`

### 正文

**旁白**：19:45，晚棠收起邮件，手里还留着一条核对消息。

`OP_CHECK_g.r4.body.001`

### 条件正文 · OP_CHECK_g.r1.block.001

条件：`{"eq":["opening_origin_g","lie"]}`

**顾晚棠**：阿衡说没跟你讲过。闭门会也没有他。你还要把谁牵进来？

`OP_CHECK_g.r1.block.001.001`

**旁白**：阿衡的回复还亮在屏幕上，发送时间就在两分钟前。

`OP_CHECK_g.r1.block.001.002`

### 条件正文 · OP_CHECK_g.r1.block.002

条件：`{"eq":["opening_origin_g","truth"]}`

**顾晚棠**：书我现在不信。但那封邮件有原件，你刚才指出的删改是真的。这是两回事。

`OP_CHECK_g.r1.block.002.001`

### 条件正文 · OP_CHECK_g.r1.block.003

条件：`{"eq":["opening_origin_g","partial"]}`

**顾晚棠**：那我先自己查。对了，站半天了，你吃饭了吗？

`OP_CHECK_g.r1.block.003.001`

### 条件正文 · OP_CHECK_g.r1.block.004

条件：`{"all":[{"all":[{"eq":["first","g"]},{"eq":["opening_style_g","flirt"]}]},{"ne":["opening_origin_g","lie"]}]}`

**顾晚棠**：刚才说想认识我。总不会只准备了加好友那一句吧？

`OP_CHECK_g.r1.block.004.001`

### 条件正文 · OP_CHECK_g.r1.block.005

条件：`{"all":[{"all":[{"eq":["first","g"]},{"eq":["opening_style_g","slow"]}]},{"ne":["opening_origin_g","lie"]}]}`

**顾晚棠**：不用急着说漂亮话，先把眼前这句答完。

`OP_CHECK_g.r1.block.005.001`

### 选择 OP_CHECK_g/admit

是我编的。我当面向阿衡更正。

可选条件：`{"eq":["opening_origin_g","lie"]}`

立即回应：

**许照**：阿衡没告诉我，是我借了他的名字。

`OP_CHECK_g.admit.r1.reply.001`

**旁白**：你叫住还没走远的阿衡，当着她的面更正。

`OP_CHECK_g.admit.r1.reply.002`

**阿衡**：下次别这么说。东西是你找到的，本来就不用借我的名。

`OP_CHECK_g.admit.r1.reply.003`

**顾晚棠**：合作材料今晚不看了。吃点东西，可以只当聊天。

`OP_CHECK_g.admit.r1.reply.004`

写入与操作：`[{"op":"set","key":"opening_lie_g","value":false},{"op":"set","key":"opening_resolution_g","value":"admitted"},{"op":"learnFact","character":"g","fact":"source_lie_corrected"},{"op":"set","key":"opening_access_g","value":"ordinary"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/double

他现在不肯承认。【继续推给他】

可选条件：`{"eq":["opening_origin_g","lie"]}`

立即回应：

**顾晚棠**：两个人的说法，我都会留着。今晚到这儿。

`OP_CHECK_g.double.r1.reply.001`

**旁白**：她取消了这次私人见面。你依然能处理自己的工作，但不能把它算成约会。

`OP_CHECK_g.double.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"doubled"},{"op":"set","key":"opening_access_g","value":"cancelled"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/withdraw

不再编了。今晚先不单独见。

可选条件：`{"eq":["opening_origin_g","lie"]}`

立即回应：

**许照**：来路我没讲清，也不该拿阿衡挡。今天先到这里。

`OP_CHECK_g.withdraw.r1.reply.001`

**顾晚棠**：好。等你想清楚再说。

`OP_CHECK_g.withdraw.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_lie_g","value":false},{"op":"set","key":"opening_resolution_g","value":"withdrawn"},{"op":"learnFact","character":"g","fact":"source_lie_admitted"},{"op":"set","key":"opening_access_g","value":"cancelled"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/present

“不知道。我想听你自己说。”

可选条件：`{"eq":["opening_origin_g","truth"]}`

立即回应：

**许照**：这样就好。刚才是线索碰对了，不代表我以后都对。

`OP_CHECK_g.present.r4.reply.001`

**顾晚棠**：终于有句我能直接点头的了。

`OP_CHECK_g.present.r4.reply.002`

**旁白**：她看了眼后街亮着的面馆招牌，问你有没有空吃碗面。

`OP_CHECK_g.present.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"present"},{"op":"set","key":"opening_access_g","value":"private"},{"op":"learnFact","character":"g","fact":"foreknowledge_not_omniscience"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/predict

说清已经改变的试听安排，不装全知

可选条件：`{"eq":["opening_origin_g","truth"]}`

立即回应：

**许照**：原来制作人三天后才联系他。现在试听就在今晚，我已经不知道后面会怎么走了。

`OP_CHECK_g.predict.r4.reply.001`

**顾晚棠**：那别把所有事都押在记忆上。手里的盘和邮件，才是能拿给别人看的。

`OP_CHECK_g.predict.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"updated"},{"op":"set","key":"opening_access_g","value":"private"},{"op":"learnFact","character":"g","fact":"changed_event_observed"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/privacy

“今天先当刚认识，行吗？”

可选条件：`{"any":[{"eq":["opening_origin_g","truth"]},{"eq":["opening_origin_g","partial"]}]}`

立即回应：

**许照**：今天先当刚认识，不急着说你一定会怎样。

`OP_CHECK_g.privacy.r4.reply.001`

**顾晚棠**：这就顺耳多了。走不走？面馆快坐满了。

`OP_CHECK_g.privacy.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"fresh"},{"op":"set","key":"opening_access_g","value":"ordinary"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/ask

主动问能不能一起吃碗面

可选条件：`{"eq":["opening_origin_g","partial"]}`

立即回应：

**许照**：今晚还能一起吃点东西吗？

`OP_CHECK_g.ask.r4.reply.001`

**顾晚棠**：能。吃碗面而已，不用先交一份履历。

`OP_CHECK_g.ask.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"asked"},{"op":"set","key":"opening_access_g","value":"private"}]`

后继：`OP_DATE_g`

### 选择 OP_CHECK_g/space

“今天先普通聊聊，我还想缓一缓。”

可选条件：`{"eq":["opening_origin_g","partial"]}`

立即回应：

**许照**：今天先不聊那些不好答的问题。

`OP_CHECK_g.space.r4.reply.001`

**顾晚棠**：行。面多加一个蛋不难答吧？

`OP_CHECK_g.space.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_resolution_g","value":"space"},{"op":"set","key":"opening_access_g","value":"ordinary"}]`

后继：`OP_DATE_g`


---

## OP_DATE_t｜去录音室的十分钟

类型：`opening`。元数据：`{"background":"street","music":"none","next":"@openingWork","clock":{"day":1,"time":"20:00"}}`

### 正文



### 条件正文 · OP_DATE_t.r1.block.001

条件：`{"eq":["opening_access_t","private"]}`

**唐映雪**：八点我要从侧门去录音室。你刚才帮了大忙，路上给你听一小段新歌，行吗？

`OP_DATE_t.r1.block.001.001`

### 条件正文 · OP_DATE_t.r1.block.002

条件：`{"eq":["opening_access_t","ordinary"]}`

**唐映雪**：八点我会从侧门走。想一起走，就只聊今天。新歌先留着。

`OP_DATE_t.r1.block.002.001`

### 条件正文 · OP_DATE_t.r1.block.003

条件：`{"eq":["opening_access_t","cancelled"]}`

**旁白**：唐映雪已经取消了今晚的私人见面。你没有收到新的邀请。

`OP_DATE_t.r1.block.003.001`

### 条件正文 · OP_DATE_t.r1.block.004

条件：`{"eq":["opening_work","join"]}`

**旁白**：你的试工检查在20:50。八点这次短见面能赶上；留下聊太久，就得主动说明。

`OP_DATE_t.r1.block.004.001`

### 条件正文 · OP_DATE_t.r1.block.005

条件：`{"eq":["opening_work","own"]}`

**旁白**：你答应20:30录自己的现场版。八点这次见面得在二十分钟内收尾。

`OP_DATE_t.r1.block.005.001`

### 条件正文 · OP_DATE_t.r1.block.006

条件：`{"eq":["opening_work","free"]}`

**旁白**：你没接今晚的工作安排，这次不必盯着别人的进度表。

`OP_DATE_t.r1.block.006.001`

### 选择 OP_DATE_t/attend

“好，八点侧门见。我想听。”

可选条件：`{"ne":["opening_access_t","cancelled"]}`

立即回应：



回应条件：`{"eq":["opening_access_t","private"]}`（按点击前状态判断）

**旁白**：八点，映雪从侧门出来，递给你一边耳机。

`OP_DATE_t.attend.r1.replyBlock.001.001`

**唐映雪**：只有半分钟。我自己还没写完，先别传给别人。

`OP_DATE_t.attend.r1.replyBlock.001.002`

**旁白**：你点点头。她走得比台上慢，边听边抬手数那段总不满意的拍子。

`OP_DATE_t.attend.r1.replyBlock.001.003`

回应条件：`{"eq":["opening_access_t","ordinary"]}`（按点击前状态判断）

**旁白**：你陪映雪走过两条街。她没有拿出那首新歌，却笑你认路比问路的人还紧张。

`OP_DATE_t.attend.r1.replyBlock.002.001`

**唐映雪**：先别急着什么都补回来。今天这样就行。

`OP_DATE_t.attend.r1.replyBlock.002.002`

回应条件：`{"eq":["opening_style_t","flirt"]}`（按点击前状态判断）

**唐映雪**：刚才说要看我，怎么真走到一起，话反而少了？

`OP_DATE_t.attend.r1.replyBlock.003.001`

回应条件：`{"eq":["opening_style_t","slow"]}`（按点击前状态判断）

**唐映雪**：你这人还真慢。没事，今天我不赶你。

`OP_DATE_t.attend.r1.replyBlock.004.001`

写入与操作：`[{"op":"set","key":"opening_date_t","value":"attended"},{"op":"set","key":"opening_meeting_t","value":true}]`

后继：`@openingWork`

### 选择 OP_DATE_t/work

先把答应的工作准备好，另约时间。

可选条件：`{"all":[{"ne":["opening_access_t","cancelled"]},{"ne":["opening_work","free"]}]}`

立即回应：

**旁白**：你去做八点半前的准备，映雪回了一条语音。

`OP_DATE_t.work.r1.reply.001`

**唐映雪**：工作忙完再约。提前说了就不算放我鸽子。

`OP_DATE_t.work.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_t","value":"work"}]`

后继：`@openingWork`

### 选择 OP_DATE_t/slow

今晚先不约。下次我主动找你。

可选条件：`{"ne":["opening_access_t","cancelled"]}`

立即回应：

**唐映雪**：好。下次想听，自己来问我。

`OP_DATE_t.slow.r1.reply.001`

**旁白**：她把耳机收回包里，临走又问你是不是一直这么慢。问完，自己先笑了。

`OP_DATE_t.slow.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_t","value":"deferred"}]`

后继：`@openingWork`

### 选择 OP_DATE_t/respect

尊重取消，先完成我自己的事。

可选条件：`{"eq":["opening_access_t","cancelled"]}`

立即回应：

**旁白**：你收起对话框，没有去她约过你的地方。录音室的灯已经亮起来了。

`OP_DATE_t.respect.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_date_t","value":"cancelled"}]`

后继：`@openingWork`

### 选择 OP_DATE_t/apology

发一句更正，不要求她今晚见我。

可选条件：`{"eq":["opening_access_t","cancelled"]}`

立即回应：

**许照**：阿衡没说过，是我编的。对不起，今晚不打扰你。

`OP_DATE_t.apology.r1.reply.001`

**旁白**：你发出更正，把今晚的空白留在原处。她没有立刻回复。

`OP_DATE_t.apology.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_t","value":"cancelled"},{"op":"set","key":"opening_lie_t","value":false},{"op":"set","key":"opening_resolution_t","value":"late_admission"},{"op":"learnFact","character":"t","fact":"source_lie_corrected"}]`

后继：`@openingWork`


---

## OP_DATE_s｜旁厅有一盏灯还亮着

类型：`opening`。元数据：`{"background":"theatre","music":"none","next":"@openingWork","clock":{"day":1,"time":"20:00"}}`

### 正文



### 条件正文 · OP_DATE_s.r1.block.001

条件：`{"eq":["opening_access_s","private"]}`

**沈清辞**：八点我去北岸旁厅取东西。就在这栋楼后面，走路五分钟。你一起看看？

`OP_DATE_s.r1.block.001.001`

### 条件正文 · OP_DATE_s.r1.block.002

条件：`{"eq":["opening_access_s","ordinary"]}`

**沈清辞**：旁厅今天先不看了。八点去后街买杯热饮，可以顺路聊两句。

`OP_DATE_s.r1.block.002.001`

### 条件正文 · OP_DATE_s.r1.block.003

条件：`{"eq":["opening_access_s","cancelled"]}`

**旁白**：沈清辞已经取消了今晚的私人见面。你没有收到新的邀请。

`OP_DATE_s.r1.block.003.001`

### 条件正文 · OP_DATE_s.r1.block.004

条件：`{"eq":["opening_work","join"]}`

**旁白**：你的试工检查在20:50。八点这次短见面能赶上；留下聊太久，就得主动说明。

`OP_DATE_s.r1.block.004.001`

### 条件正文 · OP_DATE_s.r1.block.005

条件：`{"eq":["opening_work","own"]}`

**旁白**：你答应20:30录自己的现场版。八点这次见面得在二十分钟内收尾。

`OP_DATE_s.r1.block.005.001`

### 条件正文 · OP_DATE_s.r1.block.006

条件：`{"eq":["opening_work","free"]}`

**旁白**：你没接今晚的工作安排，这次不必盯着别人的进度表。

`OP_DATE_s.r1.block.006.001`

### 选择 OP_DATE_s/attend

“一起去。我也想看看。”

可选条件：`{"ne":["opening_access_s","cancelled"]}`

立即回应：



回应条件：`{"eq":["opening_access_s","private"]}`（按点击前状态判断）

**旁白**：八点，你跟清辞走到同一园区的旁厅。她开了过道灯，指指第三排。

`OP_DATE_s.attend.r1.replyBlock.001.001`

**沈清辞**：坐这儿听回声。以后想做小演出，还得再调。

`OP_DATE_s.attend.r1.replyBlock.001.002`

**许照**：那你坐哪儿？

`OP_DATE_s.attend.r1.replyBlock.001.003`

**沈清辞**：旁边。我也得听。

`OP_DATE_s.attend.r1.replyBlock.001.004`

回应条件：`{"eq":["opening_access_s","ordinary"]}`（按点击前状态判断）

**旁白**：清辞带你绕到后街，买了两杯热饮。她没谈合同，也没提钥匙。

`OP_DATE_s.attend.r1.replyBlock.002.001`

**沈清辞**：别看手机了。这几分钟，我也没回消息。

`OP_DATE_s.attend.r1.replyBlock.002.002`

回应条件：`{"eq":["opening_style_s","flirt"]}`（按点击前状态判断）

**沈清辞**：刚才想聊私事的是你。怎么坐下以后，反而只问灯值多少钱？

`OP_DATE_s.attend.r1.replyBlock.003.001`

**许照**：紧张，先从我看得见的东西问起。

`OP_DATE_s.attend.r1.replyBlock.003.002`

回应条件：`{"eq":["opening_style_s","slow"]}`（按点击前状态判断）

**沈清辞**：不知道聊什么就先听一会儿。这里不用一直说话。

`OP_DATE_s.attend.r1.replyBlock.004.001`

写入与操作：`[{"op":"set","key":"opening_date_s","value":"attended"},{"op":"set","key":"opening_meeting_s","value":true}]`

后继：`@openingWork`

### 选择 OP_DATE_s/work

先把答应的工作准备好，另约时间。

可选条件：`{"all":[{"ne":["opening_access_s","cancelled"]},{"ne":["opening_work","free"]}]}`

立即回应：

**沈清辞**：好，你先做准备。我自己去旁厅。

`OP_DATE_s.work.r4.reply.001`

**旁白**：她发来园区里的位置：“下次想看，提前问我什么时候在。”

`OP_DATE_s.work.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_s","value":"work"}]`

后继：`@openingWork`

### 选择 OP_DATE_s/slow

今晚先不约。下次我主动找你。

可选条件：`{"ne":["opening_access_s","cancelled"]}`

立即回应：

**沈清辞**：好。第三排又不会长腿跑。

`OP_DATE_s.slow.r1.reply.001`

**旁白**：她把地址发来，没有要求你现在给下一次的答案。

`OP_DATE_s.slow.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_s","value":"deferred"}]`

后继：`@openingWork`

### 选择 OP_DATE_s/respect

尊重取消，先完成我自己的事。

可选条件：`{"eq":["opening_access_s","cancelled"]}`

立即回应：

**旁白**：你收起对话框，没有去北岸旁厅。清辞今晚有自己的安排；被取消的见面，不会因为你站在门外就重新生效。

`OP_DATE_s.respect.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_date_s","value":"cancelled"}]`

后继：`@openingWork`

### 选择 OP_DATE_s/apology

发一句更正，不要求她今晚见我。

可选条件：`{"eq":["opening_access_s","cancelled"]}`

立即回应：

**许照**：阿衡没说过，是我编的。对不起，今晚不打扰你。

`OP_DATE_s.apology.r1.reply.001`

**旁白**：你发出更正，把今晚的空白留在原处。她没有立刻回复。

`OP_DATE_s.apology.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_s","value":"cancelled"},{"op":"set","key":"opening_lie_s","value":false},{"op":"set","key":"opening_resolution_s","value":"late_admission"},{"op":"learnFact","character":"s","fact":"source_lie_corrected"}]`

后继：`@openingWork`


---

## OP_DATE_l｜她缺一个没看过的观众

类型：`opening`。元数据：`{"background":"edit","music":"none","next":"@openingWork","clock":{"day":1,"time":"20:00"}}`

### 正文



### 条件正文 · OP_DATE_l.r1.block.001

条件：`{"eq":["opening_access_l","private"]}`

**林见月**：八点我在楼上的剪辑室。自己的短片剪了三分钟，正缺观众。你要不要来？

`OP_DATE_l.r1.block.001.001`

### 条件正文 · OP_DATE_l.r1.block.002

条件：`{"eq":["opening_access_l","ordinary"]}`

**林见月**：新片今天先不看。八点可以沿河走一段，不用一直找话说。

`OP_DATE_l.r1.block.002.001`

### 条件正文 · OP_DATE_l.r1.block.003

条件：`{"eq":["opening_access_l","cancelled"]}`

**旁白**：林见月已经取消了今晚的私人见面。你没有收到新的邀请。

`OP_DATE_l.r1.block.003.001`

### 条件正文 · OP_DATE_l.r1.block.004

条件：`{"eq":["opening_work","join"]}`

**旁白**：你的试工检查在20:50。八点这次短见面能赶上；留下聊太久，就得主动说明。

`OP_DATE_l.r1.block.004.001`

### 条件正文 · OP_DATE_l.r1.block.005

条件：`{"eq":["opening_work","own"]}`

**旁白**：你答应20:30录自己的现场版。八点这次见面得在二十分钟内收尾。

`OP_DATE_l.r1.block.005.001`

### 条件正文 · OP_DATE_l.r1.block.006

条件：`{"eq":["opening_work","free"]}`

**旁白**：你没接今晚的工作安排，这次不必盯着别人的进度表。

`OP_DATE_l.r1.block.006.001`

### 选择 OP_DATE_l/attend

“我来。差评也能说吗？”

可选条件：`{"ne":["opening_access_l","cancelled"]}`

立即回应：



回应条件：`{"eq":["opening_access_l","private"]}`（按点击前状态判断）

**旁白**：八点，剪辑室里亮起一段夜班公交。见月给你一边耳机，手指停在播放键上。

`OP_DATE_l.attend.r1.replyBlock.001.001`

**林见月**：开头三十秒可能有点慢。看不懂就说，别只夸好看。

`OP_DATE_l.attend.r1.replyBlock.001.002`

**旁白**：画面里有人下车又折返，替陌生人捡起滚到座位下的橘子。见月偷偷看了一眼你的反应。

`OP_DATE_l.attend.r1.replyBlock.001.003`

回应条件：`{"eq":["opening_access_l","ordinary"]}`（按点击前状态判断）

**旁白**：河边的风让耳机线绕成一团。见月把它收好，索性和你并肩走。

`OP_DATE_l.attend.r1.replyBlock.002.001`

**林见月**：不拍。今天这一段，只记得就行。

`OP_DATE_l.attend.r1.replyBlock.002.002`

回应条件：`{"eq":["opening_style_l","flirt"]}`（按点击前状态判断）

**林见月**：你说下张换你拍。今天先记账，不赖掉。

`OP_DATE_l.attend.r1.replyBlock.003.001`

回应条件：`{"eq":["opening_style_l","slow"]}`（按点击前状态判断）

**林见月**：不急着拍，也不急着答应。今天有人一起待着就很好。

`OP_DATE_l.attend.r1.replyBlock.004.001`

写入与操作：`[{"op":"set","key":"opening_date_l","value":"attended"},{"op":"set","key":"opening_meeting_l","value":true}]`

后继：`@openingWork`

### 选择 OP_DATE_l/work

先把答应的工作准备好，另约时间。

可选条件：`{"all":[{"ne":["opening_access_l","cancelled"]},{"ne":["opening_work","free"]}]}`

立即回应：

**林见月**：好，我今晚先自己剪。别边调设备边给我回消息。

`OP_DATE_l.work.r1.reply.001`

**旁白**：她发了一个小小的句号，过了几秒，又加上“忙完再聊”。

`OP_DATE_l.work.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_l","value":"work"}]`

后继：`@openingWork`

### 选择 OP_DATE_l/slow

今晚先不约。下次我主动找你。

可选条件：`{"ne":["opening_access_l","cancelled"]}`

立即回应：

**林见月**：行。下次有空再说，我还在改。

`OP_DATE_l.slow.r4.reply.001`

**旁白**：她收好耳机，抬手跟你道别，没有替你定下下一次时间。

`OP_DATE_l.slow.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_l","value":"deferred"}]`

后继：`@openingWork`

### 选择 OP_DATE_l/respect

尊重取消，先完成我自己的事。

可选条件：`{"eq":["opening_access_l","cancelled"]}`

立即回应：

**旁白**：你收起对话框，没有去楼上的剪辑室。见月继续剪自己的片子；你也回去做答应过的事，没有追着她问下一次。

`OP_DATE_l.respect.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_date_l","value":"cancelled"}]`

后继：`@openingWork`

### 选择 OP_DATE_l/apology

发一句更正，不要求她今晚见我。

可选条件：`{"eq":["opening_access_l","cancelled"]}`

立即回应：

**许照**：阿衡没说过，是我编的。对不起，今晚不打扰你。

`OP_DATE_l.apology.r1.reply.001`

**旁白**：你发出更正，把今晚的空白留在原处。她没有立刻回复。

`OP_DATE_l.apology.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_l","value":"cancelled"},{"op":"set","key":"opening_lie_l","value":false},{"op":"set","key":"opening_resolution_l","value":"late_admission"},{"op":"learnFact","character":"l","fact":"source_lie_corrected"}]`

后继：`@openingWork`


---

## OP_DATE_g｜后街吃一碗面

类型：`opening`。元数据：`{"background":"cafe","music":"none","next":"@openingWork","clock":{"day":1,"time":"20:00"}}`

### 正文



### 条件正文 · OP_DATE_g.r1.block.001

条件：`{"eq":["opening_access_g","private"]}`

**顾晚棠**：八点，后街面馆。我正好要吃饭。你有空就一起，不谈工作。

`OP_DATE_g.r1.block.001.001`

### 条件正文 · OP_DATE_g.r1.block.002

条件：`{"eq":["opening_access_g","ordinary"]}`

**顾晚棠**：八点那碗面还可以一起吃。合作材料今晚先不看了。

`OP_DATE_g.r1.block.002.001`

### 条件正文 · OP_DATE_g.r1.block.003

条件：`{"eq":["opening_access_g","cancelled"]}`

**旁白**：顾晚棠已经取消了今晚的私人见面。你没有收到新的邀请。

`OP_DATE_g.r1.block.003.001`

### 条件正文 · OP_DATE_g.r1.block.004

条件：`{"eq":["opening_work","join"]}`

**旁白**：你的试工检查在20:50。八点这次短见面能赶上；留下聊太久，就得主动说明。

`OP_DATE_g.r1.block.004.001`

### 条件正文 · OP_DATE_g.r1.block.005

条件：`{"eq":["opening_work","own"]}`

**旁白**：你答应20:30录自己的现场版。八点这次见面得在二十分钟内收尾。

`OP_DATE_g.r1.block.005.001`

### 条件正文 · OP_DATE_g.r1.block.006

条件：`{"eq":["opening_work","free"]}`

**旁白**：你没接今晚的工作安排，这次不必盯着别人的进度表。

`OP_DATE_g.r1.block.006.001`

### 选择 OP_DATE_g/attend

“一起去。吃辣你行不行？”

可选条件：`{"ne":["opening_access_g","cancelled"]}`

立即回应：



回应条件：`{"eq":["opening_access_g","private"]}`（按点击前状态判断）

**旁白**：八点，晚棠在面馆对面给你留了个位子。你一坐下，她把辣椒瓶推到中间。

`OP_DATE_g.attend.r1.replyBlock.001.001`

**顾晚棠**：先别逞强，这家的真辣。

`OP_DATE_g.attend.r1.replyBlock.001.002`

**许照**：我刚才还想靠这个赢一次。

`OP_DATE_g.attend.r1.replyBlock.001.003`

**顾晚棠**：吃饭也要赢？那你慢慢试，我不负责倒水。

`OP_DATE_g.attend.r1.replyBlock.001.004`

回应条件：`{"eq":["opening_access_g","ordinary"]}`（按点击前状态判断）

**旁白**：面馆里，晚棠把菜单递给你，没有再提合作。

`OP_DATE_g.attend.r1.replyBlock.002.001`

**顾晚棠**：今天不谈价码。你自己想吃什么，点。

`OP_DATE_g.attend.r1.replyBlock.002.002`

回应条件：`{"eq":["opening_style_g","flirt"]}`（按点击前状态判断）

**顾晚棠**：不是说先认识我吗？现在问，过时不候。

`OP_DATE_g.attend.r1.replyBlock.003.001`

回应条件：`{"eq":["opening_style_g","slow"]}`（按点击前状态判断）

**顾晚棠**：你不用演得很熟。慢慢让我认识，也行。

`OP_DATE_g.attend.r1.replyBlock.004.001`

写入与操作：`[{"op":"set","key":"opening_date_g","value":"attended"},{"op":"set","key":"opening_meeting_g","value":true}]`

后继：`@openingWork`

### 选择 OP_DATE_g/work

先把答应的工作准备好，另约时间。

可选条件：`{"all":[{"ne":["opening_access_g","cancelled"]},{"ne":["opening_work","free"]}]}`

立即回应：

**顾晚棠**：那我先吃。别饿着肚子装敬业。

`OP_DATE_g.work.r1.reply.001`

**旁白**：她没替你保留一整晚，只说有空再重新约。

`OP_DATE_g.work.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_g","value":"work"}]`

后继：`@openingWork`

### 选择 OP_DATE_g/slow

今晚先不约。下次我主动找你。

可选条件：`{"ne":["opening_access_g","cancelled"]}`

立即回应：

**许照**：今晚脑子还有点乱，怕一坐下只会发呆。下次我约你。

`OP_DATE_g.slow.r4.reply.001`

**顾晚棠**：那先吃点东西再回去。约饭也不赶这一晚上。

`OP_DATE_g.slow.r4.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_g","value":"deferred"}]`

后继：`@openingWork`

### 选择 OP_DATE_g/respect

尊重取消，先完成我自己的事。

可选条件：`{"eq":["opening_access_g","cancelled"]}`

立即回应：

**旁白**：你收起对话框，没有去后街面馆。晚棠照常吃自己的晚饭，你尊重她已经说出的决定，今晚不再追过去。

`OP_DATE_g.respect.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_date_g","value":"cancelled"}]`

后继：`@openingWork`

### 选择 OP_DATE_g/apology

发一句更正，不要求她今晚见我。

可选条件：`{"eq":["opening_access_g","cancelled"]}`

立即回应：

**许照**：阿衡没说过，是我编的。对不起，今晚不打扰你。

`OP_DATE_g.apology.r1.reply.001`

**旁白**：你发出更正，把今晚的空白留在原处。她没有立刻回复。

`OP_DATE_g.apology.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_date_g","value":"cancelled"},{"op":"set","key":"opening_lie_g","value":false},{"op":"set","key":"opening_resolution_g","value":"late_admission"},{"op":"learnFact","character":"g","fact":"source_lie_corrected"}]`

后继：`@openingWork`


---

## OP_SELF｜下一份工作，得自己问

类型：`opening`。元数据：`{"background":"backstage","music":"none","next":"@openingWork","clock":{"day":1,"time":"19:50"}}`

### 正文

**旁白**：阿衡发来下一场负责人的联系方式，备注：“今晚找回备用盘的人。”

`OP_SELF.r4.body.001`

**许照**：至少，下一份活不用等小说写到我。

`OP_SELF.r4.body.002`

### 条件正文 · OP_SELF.r1.block.001

条件：`{"eq":["opening_self_goal","credit"]}`

**阿衡**：你刚说想接下一场，我替你问了。明早自己联系，别漏掉。

`OP_SELF.r1.block.001.001`

### 条件正文 · OP_SELF.r1.block.002

条件：`{"eq":["opening_self_goal","observe"]}`

**旁白**：你注意到陆景行的试音提前了。原来那段空档，也许能拿来做你自己的事。

`OP_SELF.r1.block.002.001`

### 条件正文 · OP_SELF.r1.block.003

条件：`{"eq":["opening_self_goal","curious"]}`

**旁白**：侧廊、露台和器材箱旁都有人忙着。你不急着把某一个名字写进恋爱名单。

`OP_SELF.r1.block.003.001`

### 选择 OP_SELF/take

主动打电话，问清下一场需要什么。

可选条件：`null`

立即回应：

**旁白**：负责人要的是一段清楚的现场记录，不是漂亮的自我介绍。你答应明早发过去。

`OP_SELF.take.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_self_opportunity","value":"appointment"}]`

后继：`@openingWork`

### 选择 OP_SELF/pause

今天先不接新活，把手里这一场做好。

可选条件：`null`

立即回应：

**旁白**：你保存联系人，标上星。先把今晚走完，明天再决定。

`OP_SELF.pause.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_self_opportunity","value":"saved_contact"}]`

后继：`@openingWork`

### 选择 OP_SELF/people

忙完再认识她们，今天不急着约谁

可选条件：`null`

立即回应：

**旁白**：你保存联系方式，抬头找了找刚才的几个人。工作之外，你也想知道她们平时是什么样。

`OP_SELF.people.r4.reply.001`

写入与操作：`[{"op":"set","key":"opening_self_opportunity","value":"meet_later"}]`

后继：`@openingWork`


---

## OP_WORK_join｜你答应的20:50

类型：`opening`。元数据：`{"background":"studio","music":"none","next":"A1b","clock":{"day":1,"time":"20:50"}}`

### 正文

**旁白**：20:50，二号录音室。陆景行把待检查的返听交给阿衡，留出你的位置。

`OP_WORK_join.r1.body.001`

**陆景行**：映雪已经在里面。你现在选怎样参与，我按实际做过的记。

`OP_WORK_join.r1.body.002`

### 选择 OP_WORK_join/do

和阿衡完成检查，亲自站一次现场。

可选条件：`null`

立即回应：

**旁白**：阿衡让你戴上返听，分别听左右两边。你说右边明显更小，他重新检查接口，调好后让你再试一次。

`OP_WORK_join.do.r4.reply.001`

**许照**：这回两边一样了。

`OP_WORK_join.do.r4.reply.002`

**唐映雪**：嗯，我这里也清楚了。

`OP_WORK_join.do.r4.reply.003`

**旁白**：陆景行把名单递给你确认：阿衡调设备，许照协助试听。第一次试工，你真的做了一件能说清楚的事。

`OP_WORK_join.do.r4.reply.004`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"joined"},{"op":"set","key":"opening_work_done","value":true},{"op":"set","key":"source_work_credit","value":true}]`

后继：`A1b`

### 选择 OP_WORK_join/change

提前交接，让阿衡接手；不领这份功劳。

可选条件：`null`

立即回应：

**许照**：这次我不进录音间，工作交回阿衡。现在来得及换。

`OP_WORK_join.change.r1.reply.001`

**陆景行**：好，名单我改。下次确定了再接。

`OP_WORK_join.change.r1.reply.002`

**旁白**：检查由阿衡完成。你仍是找回蓝标的人，但没有多一份试工成果。

`OP_WORK_join.change.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"handed_over"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`

### 选择 OP_WORK_join/watch

只旁听学习，先说明我不接设备。

可选条件：`null`

立即回应：

**陆景行**：可以，坐那边。设备交给阿衡。

`OP_WORK_join.watch.r1.reply.001`

**旁白**：你坐在最后一排，记下制作人问过的三个问题。签工作单时，那一栏仍留给阿衡。

`OP_WORK_join.watch.r1.reply.002`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"observed"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`


---

## OP_WORK_own｜只有五分钟，也够留一份自己的

类型：`opening`。元数据：`{"background":"studio","music":"none","next":"A1b","clock":{"day":1,"time":"20:30"}}`

### 正文

**旁白**：20:30，空排练室。你支好手机，先试了录音音量。映雪按约赶来，正式试听还在半小时后。

`OP_WORK_own.r4.body.001`

**唐映雪**：五分钟。你想录哪段？先说好，只留现场，不直接发布。

`OP_WORK_own.r4.body.002`

### 选择 OP_WORK_own/do

录她想留下的转调，回放后交她确认。

可选条件：`null`

立即回应：

**旁白**：她先唱原版，再试一个新尾音。你按下录音，结束后和她一起回听，确认声音没有断。

`OP_WORK_own.do.r4.reply.001`

**唐映雪**：这个先留着，正好让我比一比。真用上，现场协作写你的名字。

`OP_WORK_own.do.r4.reply.002`

**旁白**：你把录音发给她，备注“今晚新尾音，未获准公开”。

`OP_WORK_own.do.r4.reply.003`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"own_demo"},{"op":"set","key":"opening_work_done","value":true},{"op":"set","key":"demo_permission","value":"private_review"},{"op":"set","key":"source_work_credit","value":true}]`

后继：`A1b`

### 选择 OP_WORK_own/change

今天设备不够好，取消，不硬交劣质版。

可选条件：`null`

立即回应：

**许照**：这套设备底噪太大。今天不录了，你先去正式试听。

`OP_WORK_own.change.r1.reply.001`

**唐映雪**：好，下次准备好再叫我。

`OP_WORK_own.change.r1.reply.002`

**旁白**：录音键始终没亮。映雪提起包，赶去另一间录音室。

`OP_WORK_own.change.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"cancelled_demo"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`

### 选择 OP_WORK_own/listen

只听她唱一次，不录音，不冒领创作。

可选条件：`null`

立即回应：

**旁白**：你关掉录音，让她把那一段唱完。

`OP_WORK_own.listen.r1.reply.001`

**唐映雪**：听到了？我还想再改。

`OP_WORK_own.listen.r1.reply.002`

**旁白**：你们聊完最后一个尾音，关灯出门。手机里没有多出一份录音。

`OP_WORK_own.listen.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"listened"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`


---

## OP_WORK_free｜你没去，他的故事也会继续

类型：`opening`。元数据：`{"background":"street","music":"none","next":"A1b","clock":{"day":1,"time":"20:30"}}`

### 正文

**旁白**：九点，正式试听照常开始。你没在那间录音室里，手机只收到项目群的通知。

`OP_WORK_free.r1.body.001`

**陆景行**：试听结束后整理新排期。今晚参与的人按实际名单记。

`OP_WORK_free.r1.body.002`

**旁白**：名单发出来了。今晚试工那一栏，没有你的名字。

`OP_WORK_free.r1.body.003`

### 选择 OP_WORK_free/plan

记住新排期，之后再抢下一次机会。

可选条件：`null`

立即回应：

**旁白**：你把“三天后”划掉，写下新的时间。原著还是线索，只是不再是不会变的答案。

`OP_WORK_free.plan.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"next_chance"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`

### 选择 OP_WORK_free/private

把今晚留给私人相处，不拿它换履历。

可选条件：`null`

立即回应：

**旁白**：你收起工作消息，没有再盯着那张名单。今晚还有别的事值得记住。

`OP_WORK_free.private.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"private_time"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`

### 选择 OP_WORK_free/rest

今天到这里，先照顾我自己。

可选条件：`null`

立即回应：

**旁白**：你买了热饭，坐在侧门等候结算。阿衡经过时敲了敲饭盒：“总算肯吃了？”

`OP_WORK_free.rest.r1.reply.001`

写入与操作：`[{"op":"set","key":"opening_work_result","value":"rested"},{"op":"set","key":"opening_work_done","value":false}]`

后继：`A1b`


---

## OP_CANON｜台前是他，背锅单却写我的名

类型：`opening`。元数据：`{"background":"backstage","music":"tense","clock":{"day":1,"time":"19:35"},"next":"A1b"}`

### 正文

**旁白**：陆景行的钢琴救了场，唐映雪也稳住了后半首。工作人员围着他道谢，你没有硬抢这份功劳，却看见程放在旁边把“文件出错”和“现场确认”塞进同一行责任栏。

`OP_CANON.r42.body.001`

**陆景行**：刚才陪上了四小节，算大家运气好。下次曲目单别等到临场才核。

`OP_CANON.r42.body.002`

**旁白**：（这场掌声属于他们。我要抢的是第七天还能站在这里的资格。）你抬头再看交接单，原著里那一笔稀里糊涂的签名，现在正等你自己写。

`OP_CANON.r42.body.003`

### 条件正文 · OP_CANON.r42.block.obey

条件：`{"eq":["canon_response","obey"]}`

**旁白**：你签的那一页已经归档。如果想改命，就要亲手把责任边界重新查清。

`OP_CANON.r42.block.obey.001`

### 条件正文 · OP_CANON.r42.block.refuse

条件：`{"eq":["canon_response","refuse"]}`

**旁白**：程放在群里说你“不配合”。你把自己写过的拒签说明保存下来，既是保护，也是麻烦。

`OP_CANON.r42.block.refuse.001`

### 条件正文 · OP_CANON.r42.block.witness

条件：`{"eq":["canon_response","witness"]}`

**旁白**：你记下了谁在现场、几点响起钢琴。不是万能证据，却能帮助下一次核验。

`OP_CANON.r42.block.witness.001`

### 选择 OP_CANON/backstage

守住幕后：和阿衡共同清点，留第一张记录

可选条件：`null`

立即回应：

**阿衡**：今晚错版不是你切的。我能替自己看见的部分作证，别的你还得再找。

`OP_CANON.r42.reply.backstage.001`

**旁白**：阿衡在末场清点上留下了你的真实分工。今晚你没有改变那段钢琴，却把原著里“什么都没留下”的那一步先改掉了。

`OP_CANON.r42.reply.backstage.002`

写入与操作：`[{"op":"set","key":"canon_after_action","value":"assist"},{"op":"set","key":"source_end_shift_list","value":true}]`

后继：`A1b`

### 选择 OP_CANON/question

当面追问：让程放把推托发在群里

可选条件：`null`

立即回应：

**程放**：出问题就先处理，谁有空跟你查版本？

`OP_CANON.r42.reply.question.001`

**旁白**：程放不肯回答，群里却留下了他的推托。你没拿到直接证据，却让未来追查时多了一条可以对时的消息。

`OP_CANON.r42.reply.question.002`

写入与操作：`[{"op":"set","key":"canon_after_action","value":"question"},{"op":"set","key":"source_cheng_message","value":true},{"op":"set","key":"cheng_questioned_early","value":true}]`

后继：`A1b`

### 选择 OP_CANON/silence

暂时不亮牌：记下背锅链的每一步

可选条件：`null`

立即回应：

**旁白**：你看着原著里该有的背影逐渐走远。剧情没有因为你知道结局就自动改写。

`OP_CANON.r42.reply.silence.001`

写入与操作：`[{"op":"set","key":"canon_after_action","value":"silence"}]`

后继：`A1b`


---

## OP_FORK｜程放撤回的消息，我看见了

类型：`opening`。元数据：`{"background":"backstage","music":"tense","clock":{"day":1,"time":"19:05"},"next":"@openingTalk"}`

### 正文

**旁白**：你手机一震。程放在工作群丢下一句：“谁翻出的旧盘？旧版文件清掉，别多嘴。”下一秒，消息被撤回。掌声还没散，新的麻烦已经盯上你。

`OP_FORK.r42.body.001`

**旁白**：原著里没有这条撤回的消息。你看了一眼身边的蓝标盘，忽然明白：有人发现事情没按原来的路走。可你没来得及截图，手机上只剩一行“消息已撤回”。

`OP_FORK.r42.body.002`

**阿衡**：旧版我会照流程留着。试听和切换的部分我签；你想反击就拿自己能证明的，别让我替没看见的事背书。

`OP_FORK.r42.body.003`

### 条件正文 · OP_FORK.r42.block.camera

条件：`{"eq":["opening_investigation","camera"]}`

**林见月**：版本标签我拍到了，能和阿衡验盘的时间对上。原片我会留着，需要核验再出示。

`OP_FORK.r42.block.camera.001`

### 条件正文 · OP_FORK.r42.block.email

条件：`{"eq":["opening_investigation","email"]}`

**顾晚棠**：我没有批准删原始文件。审批邮件还在，谁下的令，得让谁自己说明。

`OP_FORK.r42.block.email.001`

### 选择 OP_FORK/backup

暗中留证：双版本和时间锁死

可选条件：`null`

立即回应：

**阿衡**：我存两份，标上时间。只写我亲手核过的，你那一份另存。

`OP_FORK.r42.reply.backup.001`

**旁白**：程放撤回得很快。可你和阿衡的两份时间记录已经存好。你第一次确定：掌握先手不是靠背台词，而是让他以后没法随便改口。

`OP_FORK.r42.reply.backup.002`

写入与操作：`[{"op":"set","key":"new_plot_choice","value":"preserve"},{"op":"set","key":"source_dual_version_log","value":true},{"op":"set","key":"proof_version_log","value":true}]`

后继：`@openingTalk`

### 选择 OP_FORK/confront

正面反击：群里追问谁下的删档令

可选条件：`null`

立即回应：

**程放**：许照，你这么懂流程，不如明天来写说明？

`OP_FORK.r42.reply.confront.001`

**旁白**：群里安静了足足三秒。程放没回答你的问题，只让你明天交说明——原著里的刁难整整提前了六天。你被盯上了，也把他“急着删档”的反应留在了群里。

`OP_FORK.r42.reply.confront.002`

写入与操作：`[{"op":"set","key":"new_plot_choice","value":"confront"},{"op":"set","key":"source_cheng_message","value":true},{"op":"set","key":"cheng_questioned_early","value":true}]`

后继：`@openingTalk`

### 选择 OP_FORK/quiet

先藏锋芒：保管交接，等他露破绽

可选条件：`null`

立即回应：

**旁白**：你没有跟着吵，把阿衡签过的记录单独存好。程放暂时以为你退了；你知道代价是还没有谁肯当场确认那条删档令。

`OP_FORK.r42.reply.quiet.001`

写入与操作：`[{"op":"set","key":"new_plot_choice","value":"quiet"},{"op":"set","key":"source_personal_record","value":true}]`

后继：`@openingTalk`


---

## A1b｜第一夜：让背锅单签不了我的名

类型：`anchor`。元数据：`{"background":"backstage","music":"none","next":"@schedule","clock":{"day":1,"time":"22:00"}}`

### 正文

**旁白**：22:00，观众散尽。程放堵在出口，把交接单横到你面前：导出错版、现场切换、末场确认，全被挤进同一个“临时场务负责”。这是他准备给你的第一道套。

`A1b.r42.body.001`

**程放**：签完就走。许照，别拿临时工那点事耽误大家下班。

`A1b.r42.body.002`

**旁白**：你盯着签名栏，忽然想起书里许照被赶出后台的那一页。纸和笔都是真的，程放就站在对面等着。你把笔放回桌上。

`A1b.r42.body.003`

**许照**：（签了，他明天就能说是我确认过版本。不签，他又能说我不配合。先问清责任是谁的，至少别再替别人签一张糊涂账。）

`A1b.r42.body.004`

### 条件正文 · A1b.r1.block.001

条件：`{"eq":["opening_work_done",true]}`

**旁白**：阿衡发来下一场的空缺：“这次真做过了，明天你自己去谈。”

`A1b.r1.block.001.001`

### 条件正文 · A1b.r1.block.002

条件：`{"all":[{"eq":["opening_changed",true]},{"eq":["opening_work_done",false]}]}`

**旁白**：今晚找回蓝标的记录在你手里。其他没做过的工作，你让阿衡从自己那一栏划掉。

`A1b.r1.block.002.001`

### 条件正文 · A1b.r1.block.003

条件：`{"eq":["opening_date_t","attended"]}`

**唐映雪**：耳机刚才收回来了吧？我怕你走着走着给我顺回家了。还有，记得吃饭。

`A1b.r1.block.003.001`

### 条件正文 · A1b.r1.block.004

条件：`{"eq":["opening_date_t","deferred"]}`

**唐映雪**：今天没听到的歌还在。下次轮到你问时间。

`A1b.r1.block.004.001`

### 条件正文 · A1b.r1.block.005

条件：`{"eq":["opening_date_t","cancelled"]}`

**旁白**：唐映雪没有发来新消息。你把打了一半的话删掉，暂时没有再追问。

`A1b.r1.block.005.001`

### 条件正文 · A1b.r1.block.006

条件：`{"eq":["opening_date_s","attended"]}`

**沈清辞**：回主厅了吗？旁厅的灯我关好了。今天只是看场，没给你偷偷记加班。

`A1b.r1.block.006.001`

### 条件正文 · A1b.r1.block.007

条件：`{"eq":["opening_date_s","deferred"]}`

**沈清辞**：北岸地址发了。你准备好了再约，不用赶今晚。

`A1b.r1.block.007.001`

### 条件正文 · A1b.r1.block.008

条件：`{"eq":["opening_date_s","cancelled"]}`

**旁白**：沈清辞没有发来新消息。你把打了一半的话删掉，暂时没有再追问。

`A1b.r1.block.008.001`

### 条件正文 · A1b.r1.block.009

条件：`{"eq":["opening_date_l","attended"]}`

**林见月**：刚才那三分钟还会改。想起哪里看不懂，发我就行。

`A1b.r1.block.009.001`

### 条件正文 · A1b.r1.block.010

条件：`{"eq":["opening_date_l","deferred"]}`

**林见月**：今天没看成。下次你来，我再打开。

`A1b.r1.block.010.001`

### 条件正文 · A1b.r1.block.011

条件：`{"eq":["opening_date_l","cancelled"]}`

**旁白**：林见月没有发来新消息。你把打了一半的话删掉，暂时没有再追问。

`A1b.r1.block.011.001`

### 条件正文 · A1b.r1.block.012

条件：`{"eq":["opening_date_g","attended"]}`

**顾晚棠**：那碗面不能抵工资。今晚干过的活，记得自己结。

`A1b.r1.block.012.001`

### 条件正文 · A1b.r1.block.013

条件：`{"eq":["opening_date_g","deferred"]}`

**顾晚棠**：今天没吃成的那顿先欠着。下次你挑地方。

`A1b.r1.block.013.001`

### 条件正文 · A1b.r1.block.014

条件：`{"eq":["opening_date_g","cancelled"]}`

**旁白**：顾晚棠没有发来新消息。你把打了一半的话删掉，暂时没有再追问。

`A1b.r1.block.014.001`

### 条件正文 · A1b.r1.block.015

条件：`{"eq":["opening_self_opportunity","appointment"]}`

**旁白**：明早给下一场负责人发现场记录，是你刚刚亲口答应的。你设好提醒。

`A1b.r1.block.015.001`

### 条件正文 · A1b.r1.block.016

条件：`{"eq":["opening_self_opportunity","saved_contact"]}`

**旁白**：下一场的联系方式还在手机里。你没有答应开工，明天仍可自己决定。

`A1b.r1.block.016.001`

### 条件正文 · A1b.r42.block.canon_obey

条件：`{"eq":["canon_response","obey"]}`

**旁白**：你已经签过一张模糊交接单。现在不是假装没签，而是补上一份限定自己责任的说明。

`A1b.r42.block.canon_obey.001`

### 条件正文 · A1b.r42.block.canon_refuse

条件：`{"eq":["canon_response","refuse"]}`

**旁白**：程放看见你又来要求分开责任，脸色沉了下来。你的文字说明也已经留档。

`A1b.r42.block.canon_refuse.001`

### 条件正文 · A1b.r42.block.canon_witness

条件：`{"eq":["canon_response","witness"]}`

**旁白**：手机上存着原著没有的19:03现场时间线。你没有找到原版，也不能凭这几分钟证明是谁导出了错文件。

`A1b.r42.block.canon_witness.001`

### 条件正文 · A1b.r42.block.canon_extra

条件：`{"eq":["source_end_shift_list",true]}`

**旁白**：阿衡的末场清点单上有你的名字，但签的是清点，不是原版切换。

`A1b.r42.block.canon_extra.001`

### 选择 A1b/check

逐项拆责任：签自己做的，别人的另写

可选条件：`null`

立即回应：

**许照**：今晚我何时接手、实际做过什么，阿衡负责什么，都分别写清。至于错版是谁导出的，另查。

`A1b.check.r1.reply.001`

**旁白**：你拿到分项交接单的那一刻，程放不再催你“快签”。他不高兴也没用——这是两个人都核过的版本。你带着它，正式迈过了原著的第一道坑。

`A1b.check.r1.reply.002`

写入与操作：`[{"op":"set","key":"cold_style","value":"record"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_handover","value":true},{"op":"set","key":"proof_handoff","value":true}]`

后继：`@schedule`

### 选择 A1b/ask

请阿衡作证：用人证换第一层保护

可选条件：`null`

立即回应：

**阿衡**：之前的错版不是许照导出的。我确认。

`A1b.ask.r1.reply.001`

**旁白**：阿衡看了程放一眼，还是在现场确认的范围内签了自己的名字。你换来了一个肯出面的人证，也让对方知道你不会一个人背所有锅。

`A1b.ask.r1.reply.002`

写入与操作：`[{"op":"set","key":"cold_style","value":"witness"},{"op":"add","key":"evidence","value":1},{"op":"set","key":"source_aheng_witness","value":true},{"op":"set","key":"proof_witness","value":true}]`

后继：`@schedule`

### 选择 A1b/look

先拿副本：今晚不签模糊责任

可选条件：`null`

立即回应：

**旁白**：你拍下有权留存的副本，拒绝在尚未核对的责任栏落笔。程放冷下脸：“行，明天再谈。”你没赢完，却没把自己送上那张纸。

`A1b.look.r1.reply.001`

写入与操作：`[{"op":"set","key":"cold_style","value":"observe"}]`

后继：`@schedule`


---

## t01｜救场后的她，先把位置留给我

类型：`personal`。元数据：`{"background":"backstage","music":"warm","character":"t","stage":1,"minSlot":0}`

### 正文

**旁白**：后台没人时，唐映雪正偷偷藏盒饭。胡萝卜从盖边滚出来，她抬头看见你，干脆拉开旁边椅子：“后台那位，帮我挡一下，这事别让我经纪人知道。”

`t01.r4.body.001`

**唐映雪**：你什么都没看见。

`t01.r4.body.002`

**许照**：你把胡萝卜藏起来，还是打算把整盒饭都藏了？

`t01.r4.body.003`

**唐映雪**：今晚的后台餐，胡萝卜独占鳌头，我负责认输。别笑，我绝对不是挑食，是它先针对我。

`t01.r4.body.004`

**旁白**：她把外套掀开，旁边那双没拆封的筷子已经推到你面前。台上她能接住所有人的目光，台下却连偷偷吃饭都做得有些狼狈。

`t01.r4.body.005`

**唐映雪**：别给我拍成后台探店视频。你吃了没？

`t01.r4.body.006`

### 条件正文 · t01.r1.block.001

条件：`{"eq":["opening_date_t","attended"]}`

**唐映雪**：那次只顾着跟你说话，回来才发现饭又凉了。你得陪我吃两口。

`t01.r1.block.001.001`

### 条件正文 · t01.r1.block.002

条件：`{"eq":["opening_date_t","deferred"]}`

**唐映雪**：那次没走成，现在倒碰上了。先不聊约会，吃口饭总行吧？

`t01.r1.block.002.001`

### 条件正文 · t01.r1.block.003

条件：`{"eq":["opening_work_result","own_demo"]}`

**唐映雪**：你录的那版我收好了。先不发，回去再听。

`t01.r1.block.003.001`

### 条件正文 · t01.r1.block.004

条件：`{"all":[{"eq":["opening_style_t","flirt"]},{"ne":["opening_lie_t",true]},{"ne":["opening_date_t","cancelled"]}]}`

**唐映雪**：不是说歌和人都要看？现在只准看我，别看胡萝卜。

`t01.r1.block.004.001`

### 选择 t01/share

“那我也什么都没吃。能分我一口吗？”

可选条件：`null`

立即回应：

**唐映雪**：你还挺会接。

`t01.share.reply.001`

**旁白**：她在袋里翻出没拆的筷子，把饭拨到一边。只有一小块鸡肉，她看了看，夹到中线。

`t01.share.reply.002`

**唐映雪**：一人一半。不许假装自己不吃肉。

`t01.share.reply.003`

**许照**：那你别拿胡萝卜凑数。

`t01.share.reply.004`

**旁白**：她笑出一声，差点呛到。她把饭盒往中间推了推，你也终于不用端端正正地坐着。

`t01.share.reply.005`

**唐映雪**：许照，下次别空着肚子来。

`t01.share.reply.006`

写入与操作：`[{"op":"set","key":"meal_t","value":"share"}]`

后继：`完成本次私人日程`

### 选择 t01/guard

“你慢慢吃。我在门边，有人来叫你。”

可选条件：`null`

立即回应：

**唐映雪**：我没那么见不得人。

`t01.guard.reply.001`

**许照**：知道。是我站这儿碍你筷子。

`t01.guard.reply.002`

**旁白**：你侧过身，没再盯着她。过了一会儿，衣角被轻轻拉了一下。

`t01.guard.reply.003`

**唐映雪**：旁边能坐。你老站门口，像来检查消防。

`t01.guard.reply.004`

**旁白**：你坐下。她终于不再用外套挡饭盒，也没急着讲什么漂亮话。

`t01.guard.reply.005`

**唐映雪**：你不问我刚才唱得怎么样？

`t01.guard.reply.006`

**许照**：先让你吃。

`t01.guard.reply.007`

**唐映雪**：好。这个问题，留着。

`t01.guard.reply.008`

写入与操作：`[{"op":"set","key":"meal_t","value":"guard"}]`

后继：`完成本次私人日程`

### 选择 t01/song

“我想听最后那段。但等你吃完。”

可选条件：`null`

立即回应：

**唐映雪**：你会不会太敬业了，连盒饭时间都催歌？

`t01.song.reply.001`

**许照**：我不是来催的。刚才那一拍，听得人想知道后面还有没有。

`t01.song.reply.002`

**旁白**：她拿着筷子，在纸盒边敲了两下。

`t01.song.reply.003`

**唐映雪**：有。没做完。

`t01.song.reply.004`

**许照**：那等你做完。

`t01.song.reply.005`

**唐映雪**：可以先给你听一点。你别把“听过一点”吹成“我参与了创作”。

`t01.song.reply.006`

**旁白**：她伸出一根小指，没等你反应，又收回去拿水。

`t01.song.reply.007`

**唐映雪**：开玩笑的。真的要先吃饭。

`t01.song.reply.008`

写入与操作：`[{"op":"set","key":"meal_t","value":"song"}]`

后继：`完成本次私人日程`


---

## t02｜你怎么会没发表的歌

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":2,"minSlot":2,"next":"SPARK_t"}`

### 正文

**旁白**：录音室里空调呼呼响。唐映雪把第二只耳机递给你，自己先坐在控制台外面的地毯上，给你留了椅子。

`t02.r4.body.001`

**唐映雪**：歌只做完一半，不许嫌短。

`t02.r4.body.002`

**原著记忆**：这段旋律我听过！原著番外《迟来的夏天》后面应该有一个转调……可她现在还没写到那儿，我怎么就跟着哼出来了？

`t02.r4.body.003`

**旁白**：你不自觉跟着哼了两个音，比播放的进度快了半拍。映雪按下暂停。

`t02.r4.body.004`

**唐映雪**：等等，先暂停。后面那两个音我连试唱都没录，你怎么会哼出来？偷看我草稿了，还是碰巧猜对的？

`t02.r4.body.005`

### 条件正文 · t02.r1.block.001

条件：`{"eq":["knows_foreknowledge_claim_t",true]}`

**唐映雪**：你说故事已经不一样了。那这段新尾音，可得重新听。

`t02.r1.block.001.001`

### 选择 t02/honest

“知道一点旧版本，但我不该抢着接。”

可选条件：`null`

立即回应：

**许照**：我知道一点以前的版本，但不一定对。刚才跟着哼出来了，不是故意装熟。

`t02.honest.r4.reply.001`

**唐映雪**：以前的版本……算了，先听这段。我刚改的。

`t02.honest.r4.reply.002`

**旁白**：她重新点开播放。你没再抢着哼，等最后一个音停下来才说哪里好听。

`t02.honest.r4.reply.003`

**唐映雪**：这个意见有用。半首发你，别往外传，后半首做好再说。

`t02.honest.r4.reply.004`

**旁白**：她把半段试听发进聊天框，完整源工程留在自己的硬盘。

`t02.honest.r4.reply.005`

写入与操作：`[{"op":"set","key":"reciprocal_t","value":true},{"op":"set","key":"origin_t","value":"partial"},{"op":"set","key":"trust_t","value":"steady"},{"op":"set","key":"song_access_t","value":"half"}]`

后继：`SPARK_t`

### 选择 t02/fan

“我是你老歌迷，以前每场都来。”

可选条件：`null`

立即回应：

**唐映雪**：每场？

`t02.fan.reply.001`

**许照**：差不多。

`t02.fan.reply.002`

**旁白**：她没有马上笑着接受，而是把播放器往自己那边拉了拉。

`t02.fan.reply.003`

**唐映雪**：那你应该见过我用红色吉他的那场。

`t02.fan.reply.004`

**旁白**：你记得书里只写过黑色。她已经换了个话题，像没准备现在拆穿。

`t02.fan.reply.005`

**唐映雪**：今天先听到这儿吧。

`t02.fan.reply.006`

**旁白**：她送你到门口，还算客气。你刚跨出门，就有点后悔：没去过的演出，为什么非要说去过。

`t02.fan.reply.007`

写入与操作：`[{"op":"set","key":"reciprocal_t","value":false},{"op":"set","key":"origin_t","value":"fan_lie"},{"op":"set","key":"pending_t","value":true},{"op":"set","key":"trust_t","value":"guarded"}]`

后继：`SPARK_t`

### 选择 t02/ask

“我想多知道一点，但你不想说的，就先别告诉我。”

可选条件：`null`

立即回应：

**旁白**：她没想到你把耳机放了下来。

`t02.ask.reply.001`

**唐映雪**：我没说不让你听。

`t02.ask.reply.002`

**许照**：怕听着听着，又把猜到的当成你已经告诉过我。

`t02.ask.reply.003`

**旁白**：映雪沉默片刻，把线从桌脚下抽出来。你这才发现，线刚才被桌脚压住了。

`t02.ask.reply.004`

**唐映雪**：行。这次把线放松一点。

`t02.ask.reply.005`

**旁白**：她却没有把椅子拖回去。

`t02.ask.reply.006`

**唐映雪**：这个结尾，你觉得停住好，还是往上走好？只是听感，我自己会决定。

`t02.ask.reply.007`

**旁白**：你们又听了两遍。她把文件名从“废稿六”改成“明天再改”。

`t02.ask.reply.008`

**旁白**：她把完整源工程备份进硬盘：“全曲我还要改，今天不给你拷了。”

`t02.ask.reply.009`

**旁白**：映雪把刚试听的半段发到你的聊天框，只供你私下回听；完整源工程另存进她自己的硬盘。

`t02.ask.r2.file.001`

**唐映雪**：半首。不包提前剧透，想听后半首得再来。

`t02.ask.r2.file.002`

写入与操作：`[{"op":"set","key":"reciprocal_t","value":true},{"op":"set","key":"origin_t","value":"respect"},{"op":"set","key":"trust_t","value":"steady"},{"op":"set","key":"song_access_t","value":"half"}]`

后继：`SPARK_t`


---

## t03｜她给你留的第一排

类型：`personal`。元数据：`{"background":"stage","music":"warm","decisionSteps":[{"id":"date","label":"告诉映雪：想把这份喜欢认真往前推","options":["open","exclusive"],"reply":[{"speaker":"T","text":"我喜欢听你亲口说想靠近。但别把“认真”说成我必须接受哪一种关系。","id":"t03.v413.date.reply.001","textHash":"c469d5d43db96369"}],"after":[{"speaker":"N","text":"她放下拨片，等你把约会的边界说明白。","id":"t03.v413.date.after.001","textHash":"10261dd06f00e813"}]},{"id":"slow","label":"珍惜她，却暂时不把今晚叫作恋爱","options":["wait","friend","decline"],"reply":[{"speaker":"T","text":"那也别替我安排以后。我今天愿意陪你坐着听完这首。","id":"t03.v413.slow.reply.001","textHash":"4bf464d48c124b73"}],"after":[{"speaker":"N","text":"映雪把第一排的椅子扶正，留给你自己选距离。","id":"t03.v413.slow.after.001","textHash":"0abdb27e135ca165"}]}],"character":"t","stage":3,"minSlot":5}`

### 正文

**旁白**：今晚不是工作邀请。映雪发消息时特地加了一句：“别穿那件背心。”

`t03.body.001`

**旁白**：你推门进去，她坐在舞台边，鞋尖在半空晃。第一排只有一张椅子没翻起来。

`t03.body.002`

**唐映雪**：怎么还站门口，售票员？

`t03.body.003`

**旁白**：你坐下，她却没拿吉他，先从台沿跳下来。

`t03.body.004`

**唐映雪**：算了，我不猜你了。今晚没演出，也没新歌。你还愿意坐第一排，是为了什么？

`t03.body.007`

### 条件正文 · t03.variant.001

条件：`{"eq":["meal_t","share"]}`

**唐映雪**：上次我分你的那半盒饭，今天总该轮到你点菜了吧？

`t03.variant.001.001`

### 条件正文 · t03.variant.002

条件：`{"eq":["meal_t","guard"]}`

**唐映雪**：今天不用替我挡门了，坐里面。

`t03.variant.002.001`

### 条件正文 · t03.variant.003

条件：`{"eq":["meal_t","song"]}`

**唐映雪**：这回不边吃饭边唱。你点的加演，终于有正经场地了。

`t03.variant.003.001`

### 条件正文 · t03.variant.004

条件：`{"all":[{"eq":["pending_t",true]},{"chosen":["t02","fan"]}]}`

**唐映雪**：还有一句要说在前面。你上次说“每场都来”，可有一场只有三个人，我挨个说过话。许照，我不记得你。今天我能请你听歌，但不会在这件事没说清楚时答应恋爱。

`t03.variant.004.001`

### 条件正文 · t03.variant.005

条件：`{"eq":["origin_t","partial"]}`

**唐映雪**：你说知道一点旧版本。那今天别急着跟拍，我可能又改了。

`t03.variant.005.001`

### 条件正文 · t03.variant.006

条件：`{"eq":["origin_t","respect"]}`

**唐映雪**：那次你都把耳机放下了，还以为我要赶你走？我可没有。

`t03.variant.006.001`

### 条件正文 · t03.variant.007

条件：`{"eq":["song_access_t","half"]}`

**唐映雪**：传给你的那段别急着删。我昨晚又改了一点，哪天想听可以问我。

`t03.variant.007.001`

### 条件正文 · t03.variant.010

条件：`{"eq":["trust_t","steady"]}`

**旁白**：唐映雪听你说话时没有一直准备反驳。之前几次把话讲清楚，让这次见面轻松了一点。

`t03.variant.010.001`

### 条件正文 · t03.variant.011

条件：`{"eq":["trust_t","guarded"]}`

**旁白**：唐映雪仍然会停下来核对你的说法。有些疑问没有因为见面次数增加就自己消失。

`t03.variant.011.001`

### 条件正文 · t03.r2.other_issue

条件：`{"all":[{"eq":["opening_lie_t",true]},{"not":{"chosen":["t02","fan"]}}]}`

**唐映雪**：阿衡那件事还没说清。今天可以见面，但我不会当作已经没事，更不会先答应恋爱。

`t03.unresolved_source.0`

### 条件正文 · t03.r4.block.011

条件：`{"all":[{"any":[{"chosen":["SPARK_t","bold"]},{"chosen":["SPARK_t","tease"]}]},{"canDate":"t"}]}`

**唐映雪**：耳机先别还——那天说出口以后，我就没把你当普通观众了。

`t03.early_callback.0`

### 选择 t03/open

“我想认真约你。有其他约会会直说，现在不承诺只和一个人。”

可选条件：`{"canDate":"t"}`

立即回应：

**许照**：我想和你认真约会。但现在不承诺排他。

`t03.open.reply.001`

**旁白**：你把目前实际在约会的人说清；没有别人，就如实说没有。

`t03.open.reply.002`

**旁白**：她盯着鞋尖看了一会儿，抬头。

`t03.open.reply.003`

**唐映雪**：听懂了，不是你忙的时候我填空。

`t03.open.reply.004`

**许照**：不是。

`t03.open.reply.005`

**唐映雪**：我愿意先约会。以后还有谁，你得亲口说。我不想最后一个知道。

`t03.open.reply.006`

**旁白**：她笑着把下一次见面的时间问得很具体。

`t03.open.reply.007`

写入与操作：`[{"op":"set","key":"active_t","value":true},{"op":"set","key":"scope_t","value":"open"},{"op":"set","key":"pursued_t","value":true},{"op":"disclose","character":"t"},{"op":"set","key":"commitment_t","value":"dating"},{"op":"set","key":"interest_t","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 t03/exclusive

“我想只和你交往。”

可选条件：`{"canDate":"t"}`

立即回应：

**许照**：我想只和你交往。

`t03.exclusive.reply.001`

**唐映雪**：你确定？这句不能只是气氛到了。

`t03.exclusive.reply.002`

**许照**：确定。

`t03.exclusive.reply.003`

**旁白**：她吐出一口很轻的气，把刚才一直捏着的拨片放进你掌心。

`t03.exclusive.reply.004`

**唐映雪**：好。我也想。拿着，省得你明天说今晚听错了。

`t03.exclusive.reply.005`

**旁白**：她的手在你的手上停了半秒，没有马上撤开。

`t03.exclusive.reply.006`

写入与操作：`[{"op":"set","key":"active_t","value":true},{"op":"set","key":"scope_t","value":"exclusive"},{"op":"set","key":"pursued_t","value":true},{"op":"set","key":"promised_t","value":true},{"op":"set","key":"commitment_t","value":"relationship"},{"op":"set","key":"interest_t","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 t03/wait

“喜欢你，但我想慢一点。”

可选条件：`null`

立即回应：

**许照**：喜欢你。但我还没准备好开始谈。

`t03.wait.r2.reply.001`

**唐映雪**：那先听歌。想再约我的时候，别只发个表情。

`t03.wait.r2.reply.002`

**旁白**：她拨响一根弦，偷偷瞟你，随后又把目光移回琴上。

`t03.wait.r2.reply.003`

写入与操作：`[{"op":"set","key":"active_t","value":false},{"op":"set","key":"scope_t","value":"waiting"},{"op":"set","key":"pursued_t","value":true},{"op":"set","key":"commitment_t","value":"none"},{"op":"set","key":"interest_t","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 t03/friend

“先做朋友，好吗？”

可选条件：`null`

立即回应：

**许照**：能认识你，我很高兴。今天先当朋友。

`t03.friend.reply.001`

**旁白**：她的笑迟了半拍，随后点头。

`t03.friend.reply.002`

**唐映雪**：行。朋友也能坐第一排。

`t03.friend.reply.003`

**许照**：你不用勉强。

`t03.friend.reply.004`

**唐映雪**：我没勉强，只是要把脑子里那点别的东西放回去。给我一首歌的时间。

`t03.friend.reply.005`

写入与操作：`[{"op":"set","key":"active_t","value":false},{"op":"set","key":"scope_t","value":"friend"},{"op":"set","key":"pursued_t","value":false},{"op":"set","key":"commitment_t","value":"none"},{"op":"set","key":"interest_t","value":"platonic"}]`

后继：`完成本次私人日程`

### 选择 t03/decline

“今晚先不开始恋爱，以后再说。”

可选条件：`null`

立即回应：

**唐映雪**：好，那今天只唱歌。你也别站得像被罚了一样。

`.scenes.t03.choices.4.reply.0`

写入与操作：`[{"op":"set","key":"active_t","value":false},{"op":"set","key":"scope_t","value":"declined"},{"op":"set","key":"pursued_t","value":true},{"op":"set","key":"commitment_t","value":"none"},{"op":"set","key":"interest_t","value":"uncertain"}]`

后继：`完成本次私人日程`


---

## t04｜便利店没有安可

类型：`personal`。元数据：`{"background":"convenience","music":"warm","character":"t","stage":4,"minSlot":9,"next":"t05","outingFollowup":"t05"}`

### 正文

**旁白**：彩排临时结束，你们在便利店抢到了最后两个靠窗的座位。映雪盯着关东煮锅，像在挑下一张专辑的主打。

`t04.body.001`

**唐映雪**：你别拿最便宜的。我知道你工资还没结，但我也没要你请。

`t04.body.002`

**许照**：那你刚才为什么抢着站收银台？

`t04.body.003`

**唐映雪**：因为我饿。你付款太慢，会影响我进食。

`t04.body.004`

**旁白**：她把热汤推给你一半。窗外有人认出她，隔着玻璃比了个赞。

`t04.body.005`

**旁白**：她笑着回应，回头才发现你没举手机。

`t04.body.006`

**唐映雪**：不给朋友炫一下？

`t04.body.007`

### 条件正文 · t04.variant.001

条件：`{"eq":["meal_t","share"]}`

**唐映雪**：比那晚的盒饭热多了。今天我先挑，你别又把肉全推过来。

`t04.variant.001.001`

### 条件正文 · t04.variant.002

条件：`{"eq":["song_access_t","half"]}`

**唐映雪**：你手机里那半首别拿出来炫啊。歌还没写完，丢人先算我的。

`t04.r2.half_song.001`

### 条件正文 · t03.variant.008

条件：`{"eq":["met_promise","t_sit"]}`

**唐映雪**：上次说坐一会儿，你真的坐下了。这次也别刚来就站到门边。

`t03.variant.008.001`

### 条件正文 · t03.variant.009

条件：`{"eq":["met_promise","t_food"]}`

**唐映雪**：上次那份热的来得很及时。今天放心，我吃过了。

`t03.variant.009.001`

### 选择 t04/private

“今天就给我自己看。下次想拍，先问你。”

可选条件：`null`

立即回应：

**唐映雪**：你说得好像我是什么限量展品。

`t04.private.reply.001`

**许照**：展品不会抢我的萝卜。

`t04.private.reply.002`

**旁白**：她低头笑了，把萝卜夹回你碗里。

`t04.private.reply.003`

**唐映雪**：那等会儿拍一个杯子。别拍脸，我今天两边眼线不一样。

`t04.private.reply.004`

**旁白**：照片最后只拍到两只纸杯和一小段袖子。她把照片存了，叫它“没安可的一天”。

`t04.private.reply.005`

写入与操作：`[{"op":"set","key":"photo_t","value":"private"},{"op":"set","key":"photo_cups_t","value":true}]`

后继：`t05`

### 选择 t04/ask

“我想合照。愿意的话，发之前给你看。”

可选条件：`null`

立即回应：

**唐映雪**：可以。别从下面拍，我不是你手机前置的仇人。

`t04.ask.reply.001`

**旁白**：她往你这边靠了一点，自己检查一遍照片，才点下发送。

`t04.ask.reply.002`

**唐映雪**：这张能发，但别替我写一篇“她私下其实很脆弱”。

`t04.ask.reply.003`

**许照**：配文：抢萝卜的。

`t04.ask.reply.004`

**唐映雪**：……也不是完全不行。

`t04.ask.reply.005`

**旁白**：她选好那张照片，自己发了出去。有人很快点了赞。

`t04.ask.reply.006`

写入与操作：`[{"op":"set","key":"photo_t","value":"public"},{"op":"set","key":"public_photo_t","value":true},{"op":"set","key":"photo_face_t","value":true}]`

后继：`t05`

### 选择 t04/tease

“不炫人，炫歌手请的饭。我的宣传位比较贵。”

可选条件：`null`

立即回应：

**唐映雪**：多贵？

`t04.tease.reply.001`

**许照**：一串鱼丸。

`t04.tease.reply.002`

**旁白**：她把最后一颗鱼丸夹过去，又在你吃之前拦了一下。

`t04.tease.reply.003`

**唐映雪**：先说好，这是贿赂不发丑照，不是买断你。

`t04.tease.reply.004`

**旁白**：你笑着把手机收起。她用手背碰了碰你的汤杯，像碰杯，又像催你趁热。

`t04.tease.reply.005`

写入与操作：`[{"op":"set","key":"photo_t","value":"joke"}]`

后继：`t05`


---

## t05｜先说你的听感

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":5,"minSlot":9}`

### 正文

**旁白**：录音室窗外下起了雨。映雪给耳机接上延长线，终于不用挤在桌子一角。

`t05.r4.body.001`

**唐映雪**：这回总够长了。

`t05.r4.body.002`

**旁白**：她让你先听两版尾奏。你盯着进度条半天没出声，她拿笔轻敲了一下桌沿。

`t05.r4.body.003`

**唐映雪**：怎么，等我宣布标准答案？

`t05.r4.body.004`

### 条件正文 · t05.variant.001

条件：`{"ne":["active_t",true]}`

**旁白**：你们还没确认恋爱，各坐一把椅子。她把两份混音的文件名圈出来，让你直接选。

`t05.variant.001.001`

### 条件正文 · t05.variant.002

条件：`{"eq":["photo_t","private"]}`

**唐映雪**：刚才那张照片我存了，没发。今天也不一定非得拍点什么。

`t05.variant.002.001`

### 条件正文 · t05.variant.003

条件：`{"eq":["photo_t","public"]}`

**唐映雪**：刚才发照片之前你真的问了。我说哪张不好看，你也没嫌烦。

`t05.variant.003.001`

### 条件正文 · t05.variant.004

条件：`{"eq":["photo_t","joke"]}`

**唐映雪**：你的宣传位很贵，是吧？今天先认真听歌，鱼丸以后再说。

`t05.variant.004.001`

### 选择 t05/closer

“这次换我问。能靠近一点吗？”

可选条件：`{"all":[{"eq":["active_t",true]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]}]}`

立即回应：

**旁白**：她抬眼看你，没有立刻拿玩笑挡回去。

`t05.closer.reply.001`

**唐映雪**：能。你再问下去，歌都要放第二遍了。

`t05.closer.reply.002`

**旁白**：你先握住她放在线旁的手。她往你身边移了一点，点了点头。

`t05.closer.reply.003`

**旁白**：那个吻很短。你退开时，她没松手，只小声笑了一下。

`t05.closer.reply.004`

**唐映雪**：嗯……比你数拍子稳。

`t05.closer.reply.005`

写入与操作：`[{"op":"set","key":"pace_t","value":"close"},{"op":"set","key":"kissed_t","value":true},{"op":"set","key":"private_reward_t","value":true}]`

后继：`完成本次私人日程`

### 选择 t05/slow

“想。但我想慢一点，不是对你没意思。”

可选条件：`{"all":[{"eq":["active_t",true]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]}]}`

立即回应：

**唐映雪**：好，那不抢拍。

`t05.slow.r2.reply.001`

**旁白**：她把手摊开，你放上去，她笑着握住。

`t05.slow.r2.reply.002`

**唐映雪**：但歌要听完。我刚改的，不能只听前奏。

`t05.slow.r2.reply.003`

**旁白**：雨敲着玻璃，尾奏响完，你们谁也没提该松手了。

`t05.slow.r2.reply.004`

写入与操作：`[{"op":"set","key":"pace_t","value":"slow"},{"op":"set","key":"private_reward_t","value":true}]`

后继：`完成本次私人日程`

### 选择 t05/quiet

“我想再听一遍，还没听出差别。”

可选条件：`null`

立即回应：

**许照**：今天先听完。说实话，我还没听出第二版哪里不一样。

`t05.quiet.r4.reply.001`

**唐映雪**：这句倒很诚实。等会儿听这里。

`t05.quiet.r4.reply.002`

**旁白**：她把进度条拉回去。你们又听两遍，她才满意地合上电脑。

`t05.quiet.r4.reply.003`

**唐映雪**：这个版本还想再留两天，先别给别人听。

`t05.quiet.r4.reply.004`

**许照**：好。

`t05.quiet.r4.reply.005`

写入与操作：`[{"op":"set","key":"pace_t","value":"listen"},{"op":"set","key":"song_wait_promise","value":true},{"op":"set","key":"private_reward_t","value":true}]`

后继：`完成本次私人日程`

### 选择 t05/ordinary

保持朋友的距离，认真听完两版

可选条件：`{"ne":["active_t",true]}`

立即回应：

**旁白**：你们各坐一边，把那两版尾奏认真比完。你指了指第二版含糊的一句，映雪拿笔记下。

`t05.ordinary.r4.reply.001`

**唐映雪**：这个我也不满意。行，今天没白叫你来。

`t05.ordinary.r4.reply.002`

写入与操作：`[{"op":"set","key":"pace_t","value":"ordinary"},{"op":"set","key":"private_reward_t","value":true}]`

后继：`完成本次私人日程`


---

## t06｜她问的是你，不是攻略

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":6,"minSlot":11,"next":"@personalRelationshipCheck","outingFollowup":"t07"}`

### 正文

**旁白**：映雪合上歌词本，没像往常一样先放试听。

`t06.r2.body.001`

**唐映雪**：上次那段你跟得很准。这次的新词，我倒想看你还能不能接上。

`t06.r2.body.002`

**旁白**：她把空白那一行遮住，没让你提前看见后半句。

`t06.r2.body.003`

### 条件正文 · t06.variant.001

条件：`{"eq":["song_wait_promise",true]}`

**唐映雪**：你上次答应这版再留两天，没拿去给别人听。我记得。现在可以听新的一段了。

`t06.variant.001.001`

### 条件正文 · t06.r2.heard

条件：`{"eq":["knows_foreknowledge_claim_t",true]}`

**唐映雪**：你说过那本小说。可我最近做的事，书里也有吗？别再从“有一本书”重讲。

`t06.r2.heard.001`

### 条件正文 · t06.r2.unheard

条件：`{"ne":["knows_foreknowledge_claim_t",true]}`

**唐映雪**：这次说点真的。你到底从哪儿知道那些事？

`t06.r2.unheard.001`

### 选择 t06/book

“我知道的是书里的过去。你现在会怎么唱，我想亲耳听。”

可选条件：`null`

立即回应：

**许照**：我读过一本写到你的小说，但你改的这一句，里面没有。

`t06.book.r2.reply.001`

**唐映雪**：那就别猜。坐好，当第一个听见的。

`t06.book.r2.reply.002`

**旁白**：她把手挪开，露出一行歪歪扭扭的新词。

`t06.book.r2.reply.003`

**唐映雪**：这次不好听，也不许赖那本书。

`t06.book.r2.reply.004`

写入与操作：`[{"op":"set","key":"source_t","value":"book"},{"op":"learnFact","character":"t","fact":"foreknowledge_claim"},{"op":"set","key":"belief_t","value":"unproven"}]`

后继：`@personalRelationshipCheck`

### 选择 t06/partial

“知道一些，不代表我懂你。我还不能把来路说清，但没有一起经历的事，我不再冒认。”

可选条件：`null`

立即回应：

**唐映雪**：不是一个很省心的答案。

`t06.partial.reply.001`

**许照**：嗯。

`t06.partial.reply.002`

**旁白**：她没有立刻说“我相信你”，只是把你刚刚的话重复了一遍。

`t06.partial.reply.003`

**唐映雪**：不再冒认。那我记这个。

`t06.partial.reply.004`

**许照**：可以。

`t06.partial.reply.005`

**唐映雪**：还有，我也会改主意。别哪天我不想唱了，你拿“我知道的你不是这样”来堵我。

`t06.partial.reply.006`

**旁白**：你点头，把歌词本推回她面前：“先听你这次怎么唱。”

`t06.partial.reply.007`

写入与操作：`[{"op":"set","key":"source_t","value":"partial"}]`

后继：`@personalRelationshipCheck`

### 选择 t06/destiny

“也许我就是比别人更懂你。”

可选条件：`null`

立即回应：

**唐映雪**：这句不太行。

`t06.destiny.reply.001`

**旁白**：她的语气不凶，也没有笑。

`t06.destiny.reply.002`

**唐映雪**：你知道几件事，是真的。可是“更懂”得让我来说，不能你先领了。

`t06.destiny.reply.003`

**旁白**：她把歌词本抱回去。

`t06.destiny.reply.004`

**唐映雪**：今天先别讨论未来。我不想一开口，又被人告诉我该是什么样。

`t06.destiny.reply.005`

**旁白**：临走时，她没像之前那样把试听发给你。

`t06.destiny.reply.006`

写入与操作：`[{"op":"set","key":"source_t","value":"claim"},{"op":"set","key":"pending_t","value":true},{"op":"set","key":"trust_t","value":"guarded"}]`

后继：`@personalRelationshipCheck`


---

## t07｜大舞台也是真的想要

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":7,"minSlot":11}`

### 正文

**旁白**：映雪给你看一张邀请函。场馆比北岸大得多，制作团队承诺给她最好的灯。

`t07.body.001`

**唐映雪**：有个条件。第一轮唱他们挑的歌，自己的放以后。

`t07.body.002`

**许照**：你想去吗？

`t07.body.003`

**唐映雪**：想。我不是因为不想红，才写歌的。

`t07.body.004`

**唐映雪**：我怕你觉得，我只要犹豫，就是辜负自己。

`t07.body.006`

### 条件正文 · t07.variant.001

条件：`{"eq":["source_t","book"]}`

**唐映雪**：你说过好像看过另一个结局。我还是没完全信。但今晚我选什么，你得听这个版本的我。

`t07.variant.001.001`

### 条件正文 · t07.variant.002

条件：`{"eq":["source_t","partial"]}`

**唐映雪**：你不方便说的，我先不追问。可你觉得哪条路好，可以讲理由，别只说你知道。

`t07.variant.002.001`

### 条件正文 · t07.variant.003

条件：`{"eq":["source_t","claim"]}`

**唐映雪**：别再说你比我更知道我会后悔什么。给建议可以，决定让我自己做。

`t07.variant.003.001`

### 条件正文 · t07.variant.004

条件：`{"eq":["trial_t","tested"]}`

**唐映雪**：上次你陪我真试过两种唱法，所以今天我也不想只在脑子里拒绝。

`t07.variant.004.001`

### 条件正文 · t07.variant.005

条件：`{"eq":["trial_t","asked"]}`

**唐映雪**：那次你没有因为我想试另一条路就失望，我记着。

`t07.variant.005.001`

### 条件正文 · t07.variant.006

条件：`{"eq":["trial_t","different"]}`

**唐映雪**：我们上次喜欢的不是同一段，今天也可以不一样。

`t07.variant.006.001`

### 条件正文 · t07.r2.question_just_deferred

条件：`{"eq":["relation_answer_t","deferred"]}`

**唐映雪**：刚才那个问题，我记着。今天这件事先做完。

`t07.r2.question_just_deferred.001`

### 选择 t07/compare

“我们把‘以后’问成具体的时间。问完，你再选。”

可选条件：`null`

立即回应：

**唐映雪**：我刚好想找人陪我问。但不想有人替我拒绝。

`t07.compare.reply.001`

**许照**：你开口，我负责记他们有没有回答。

`t07.compare.reply.002`

**旁白**：她写下三件要问的事：几期以后唱原创、谁选曲、试排能不能退出。

`t07.compare.reply.003`

**唐映雪**：还有，如果他们答得不好，我也可能还是想去。

`t07.compare.reply.004`

**许照**：那我们再看看代价，不装作它不存在。

`t07.compare.reply.005`

**旁白**：你把试播里漏掉的名字截图发回对方，陪映雪核到更新后的第二版。

`t07.compare.r2.execution.001`

写入与操作：`[{"op":"set","key":"ambition_t","value":"terms"},{"op":"set","key":"proof_t_terms","value":true}]`

后继：`完成本次私人日程`

### 选择 t07/support

“我知道你想去。先去试，不喜欢再回来，我不拿这件事笑你。”

可选条件：`null`

立即回应：

**旁白**：她盯着你看了一会儿。

`t07.support.reply.001`

**唐映雪**：你是不是把我想得太能回头了？

`t07.support.reply.002`

**许照**：不是。就是回来时，别还得过我这关。

`t07.support.reply.003`

**旁白**：她笑了，眼睛却有一点发涩。

`t07.support.reply.004`

**唐映雪**：那你也一样。别每次都演那个知道结果的人。

`t07.support.reply.005`

**旁白**：她向节目组约了一次试排，陆景行同意试合，但先要求确认双方署名。你们试完一段，各自留下确认过的分轨，没有拿他的名字免费垫场。

`t07.support.r2.execution.001`

写入与操作：`[{"op":"set","key":"ambition_t","value":"try"},{"op":"set","key":"proof_t_duet","value":true}]`

后继：`完成本次私人日程`

### 选择 t07/refuse

“我不希望你去。我喜欢的是你唱自己的歌。”

可选条件：`null`

立即回应：

**唐映雪**：我知道。但如果我也想唱给更多人呢？

`t07.refuse.reply.001`

**旁白**：你没有立刻回答。

`t07.refuse.reply.002`

**唐映雪**：你可以不赞成。可别让我为了留住你，只能选一种梦想。

`t07.refuse.reply.003`

**旁白**：她把邀请函放进包里，没有毁掉，也没逼你马上改口。

`t07.refuse.reply.004`

**旁白**：你们的分歧留了下来。回去的路上，你们都没再提那张邀请函。

`t07.refuse.reply.005`

写入与操作：`[{"op":"set","key":"ambition_t","value":"limit"},{"op":"set","key":"value_conflict_t","value":true}]`

后继：`完成本次私人日程`


---

## t08｜迟到的人没有自动配乐

类型：`personal`。元数据：`{"background":"theatre","music":"warm","character":"t","stage":8,"minSlot":14,"next":"t09","outingFollowup":"t09"}`

### 正文

**旁白**：你照原定时间赶到，台上的歌却已经唱完。节目单角落多了“提前十二分钟”几个字。

`t08.r2.body.001`

**唐映雪**：你怎么现在才来……

`t08.r2.body.002`

**旁白**：映雪翻出自己没发成功的消息，声音忽然小了。

`t08.r2.body.003`

**唐映雪**：等等。这个转圈圈不会从下午一直转到现在吧？

`t08.r2.body.004`

**许照**：我收到的最后一条，还是原来的时间。

`t08.r2.body.005`

**旁白**：她看着给你留的座位，把那杯温水往你这边推。

`t08.r2.body.006`

### 条件正文 · t08.variant.001

条件：`{"eq":["ambition_t","terms"]}`

**唐映雪**：你上次问过那份合作的条件，我真去问了两项。没那么轻松，但总算知道在谈什么。

`t08.variant.001.001`

### 条件正文 · t08.variant.002

条件：`{"eq":["ambition_t","try"]}`

**唐映雪**：你上次说可以去试，我记得。试得一般也别装成什么都很成功，能一起听完就好。

`t08.variant.002.001`

### 条件正文 · t08.variant.003

条件：`{"eq":["ambition_t","limit"]}`

**唐映雪**：你不想让我去大舞台，那件事还得谈。不过今天没收到改时间的消息，是我的错。

`t08.variant.003.001`

### 选择 t08/own

“那今天谁也不欠谁十二分钟。你欠我一个新时间。”

可选条件：`null`

立即回应：

**唐映雪**：好，是我漏发。

`t08.own.r2.reply.001`

**旁白**：她当着你的面重发日期，直到你的手机亮起来。

`t08.own.r2.reply.002`

**唐映雪**：这回收到了？

`t08.own.r2.reply.003`

**许照**：收到了。下次想专门唱给我听，可以直说。

`t08.own.r2.reply.004`

**唐映雪**：……谁说专门了。你先别得意。

`t08.own.r2.reply.005`

写入与操作：`[{"op":"set","key":"late_t","value":"owned"}]`

后继：`t09`

### 选择 t08/repair

“错过一首挺可惜。回去那段路，还留给我吗？”

可选条件：`null`

立即回应：

**唐映雪**：留。但我今天想绕路。

`t08.repair.r2.reply.001`

**许照**：那正好，不用抢十二分钟。

`t08.repair.r2.reply.002`

**旁白**：她走到你身边，低声哼起刚才那首歌。

`t08.repair.r2.reply.003`

**唐映雪**：这是路上版。再录音就收费。

`t08.repair.r2.reply.004`

写入与操作：`[{"op":"set","key":"late_t","value":"walk"}]`

后继：`t09`

### 选择 t08/defend

“以后改时间，直接打我电话。我也会确认一遍。”

可选条件：`null`

立即回应：

**唐映雪**：行。今天是我没确认，别把锅背走。

`t08.defend.r2.reply.001`

**旁白**：她把你的号码设成了常用联系人，又假装只是在整理通讯录。

`t08.defend.r2.reply.002`

**许照**：我看见了。

`t08.defend.r2.reply.003`

**唐映雪**：看见也别播报。

`t08.defend.r2.reply.004`

写入与操作：`[{"op":"set","key":"late_t","value":"confirmed"}]`

后继：`t09`


---

## t09｜这首歌里，有那场雨

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":9,"minSlot":14}`

### 正文

**旁白**：映雪摊开新歌词，里面有便利店关门时的铃声，也有录音室那晚的雨。

`t09.r4.body.001`

**唐映雪**：别找你名字，没有。

`t09.r4.body.002`

**许照**：我还没开始找。

`t09.r4.body.003`

**唐映雪**：你那副表情已经找三遍了。

`t09.r4.body.004`

**旁白**：她把本子转向你，笑得有点不好意思。

`t09.r4.body.005`

**唐映雪**：最近这些小事，写着写着就进去了。你听听像不像。

`t09.r4.body.006`

### 条件正文 · t09.variant.001

条件：`{"eq":["late_t","owned"]}`

**唐映雪**：刚才让你白赶了，我得记着。新时间我已经确认了，你不许再盯着那个转圈圈笑。

`t09.variant.001.001`

### 条件正文 · t09.variant.002

条件：`{"eq":["late_t","walk"]}`

**唐映雪**：刚才路上唱的半首，原稿就在这里。别急，我自己也有两句没想好。

`t09.variant.002.001`

### 条件正文 · t09.r2.confirmed

条件：`{"eq":["late_t","confirmed"]}`

**唐映雪**：行，下次改时间直接打电话。你要是听见我只说了一个“喂”，先别挂，我可能在紧张。

`t09.r2.confirmed.001`

### 选择 t09/keep

“那就别告诉我哪句是我。我自己记得那天。”

可选条件：`null`

立即回应：

**旁白**：她眼睛亮了一下，又故意把本子合上。

`t09.keep.reply.001`

**唐映雪**：挺好。保留一点歌手的神秘。

`t09.keep.reply.002`

**许照**：胡萝卜那句不算神秘。

`t09.keep.reply.003`

**唐映雪**：哪有胡萝卜！

`t09.keep.reply.004`

写入与操作：`[{"op":"set","key":"song_memory_t","value":"private"}]`

后继：`完成本次私人日程`

### 选择 t09/ask

“我可以问一句吗？我想知道你当时有没有开心。”

可选条件：`null`

立即回应：

**唐映雪**：有。

`t09.ask.reply.001`

**旁白**：她回答得太快，自己也笑了。

`t09.ask.reply.002`

**唐映雪**：哪一句都先不告诉你。但这件事不用吊你胃口。

`t09.ask.reply.003`

**旁白**：你也笑了。她翻过一页，手指还压着刚才那句歌词。

`t09.ask.reply.004`

**唐映雪**：所以，别只在我需要人帮忙的时候来。没事的晚上也可以。

`t09.ask.reply.005`

写入与操作：`[{"op":"set","key":"song_memory_t","value":"happy"}]`

后继：`完成本次私人日程`

### 选择 t09/credit

“能在歌后面写个特别感谢吗？我也想有一点名字。”

可选条件：`null`

立即回应：

**唐映雪**：可以。谢谢你陪我听这些版本，其他的功劳可别往自己身上加。

`t09.credit.r2.reply.001`

**许照**：那就写“认真听过”。

`t09.credit.r2.reply.002`

**旁白**：她在纸上写下许照，又在后面添了一个小小的耳机。

`t09.credit.r2.reply.003`

**唐映雪**：加送插图。不许挑画工。

`t09.credit.r2.reply.004`

写入与操作：`[{"op":"set","key":"song_memory_t","value":"credit"}]`

后继：`完成本次私人日程`


---

## t10｜开门之前，先问一句

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":10,"minSlot":16,"next":"t11","outingFollowup":"t11"}`

### 正文

**旁白**：她的门半开着。里面不是浪漫的灯光，只有外卖袋和摊了一地的试听设备。

`t10.body.001`

**唐映雪**：来早了。我还没收完。

`t10.body.002`

**许照**：我帮忙？

`t10.body.003`

**唐映雪**：等会儿。今天不想一见你就递活。

`t10.body.004`

**旁白**：她把地上的线绕开，给你空出一处可以坐的地方。

`t10.body.005`

**唐映雪**：你以后来，是不是可以先问一句“今天想不想见我”，不要总说“需不需要帮忙”？

`t10.body.006`

**旁白**：外面的店陆续亮起招牌。她拍了拍身边空出的地方。

`t10.body.007`

### 条件正文 · t10.variant.001

条件：`{"eq":["song_memory_t","private"]}`

**唐映雪**：你上次说，不用告诉你哪句跟你有关。挺好，我还可以嘴硬几天。

`t10.variant.001.001`

### 条件正文 · t10.variant.002

条件：`{"eq":["song_memory_t","happy"]}`

**唐映雪**：你上次问我，那天开不开心。我回去想了，最开心的还真不是掌声响起来的时候。猜错也给你听，别紧张。

`t10.variant.002.001`

### 条件正文 · t10.variant.003

条件：`{"eq":["song_memory_t","credit"]}`

**唐映雪**：你上次认真要那行特别感谢，我写好了。过来检查，错别字不算惊喜。

`t10.variant.003.001`

### 选择 t10/ask

“那我现在问。今天想不想见我？”

可选条件：`null`

立即回应：

**旁白**：她撑着膝盖看你，眼神一点点软下来。

`t10.ask.reply.001`

**唐映雪**：想啊。外卖特地点了两份。

`t10.ask.reply.002`

**旁白**：她坐到旁边，把电脑挪到了一边。外卖还热，歌也可以明天再改。

`t10.ask.reply.004`

写入与操作：`[{"op":"set","key":"last_t","value":"wanted"}]`

后继：`t11`

### 选择 t10/mutual

“想。还有，我今天也有点累，能不能就待着？”

可选条件：`null`

立即回应：

**唐映雪**：早说啊。

`t10.mutual.reply.001`

**旁白**：她把你手里的袋子接过去，推来一只靠垫。

`t10.mutual.reply.002`

**唐映雪**：我又不是只收精神很好的人。

`t10.mutual.reply.003`

写入与操作：`[{"op":"set","key":"last_t","value":"ordinary"}]`

后继：`t11`

### 选择 t10/leave

“今天我想早点回去。改天好好见你。”

可选条件：`null`

立即回应：

**旁白**：她愣了一下，随后点头。

`t10.leave.reply.001`

**唐映雪**：行。别因为我开口了，就把你自己的安排都扔掉。

`t10.leave.reply.002`

**旁白**：她送你到门口，先问了下一次可能的时间，没有替你填满。

`t10.leave.reply.003`

**唐映雪**：到家发个消息。太晚了，路上小心。

`t10.leave.reply.004`

写入与操作：`[{"op":"set","key":"last_t","value":"space"}]`

后继：`@schedule`


---

## s01｜冷脸制作人，偷偷给我留了五分钟

类型：`personal`。元数据：`{"background":"corridor","music":"quiet","character":"s","stage":1,"minSlot":0}`

### 正文

**旁白**：一阵风把清辞的排期单吹得到处都是。她一边处理电话一边抢纸，你按住最后一页，她朝你比了个“等等”，竟然直接跟电话那头说：“十分钟以后，我来拍板。”

`s01.r4.body.001`

**沈清辞**：谢谢。你还没走？

`s01.r4.body.002`

**旁白**：她端起杯子，喝了个空。旁边那把椅子堆着文件，你指了指。

`s01.r4.body.003`

**许照**：挪开？不然这椅子上班比你还轻松。

`s01.r4.body.004`

**旁白**：她看了看，终于把文件抱到桌上。

`s01.r4.body.005`

**沈清辞**：五分钟。我把工作手机关了，不是来让你汇报的——我想知道首演后台认识的许照，平时是什么样。

`s01.r4.body.006`

### 条件正文 · s01.r1.block.001

条件：`{"all":[{"eq":["opening_date_s","attended"]},{"eq":["opening_access_s","private"]}]}`

**沈清辞**：那次第三排的位置，坐得还习惯吗？下次也给你留。

`s01.r1.block.001.001`

### 条件正文 · s01.r1.block.002

条件：`{"all":[{"eq":["opening_date_s","attended"]},{"eq":["opening_access_s","ordinary"]}]}`

**沈清辞**：那次那杯还是太甜。下次换你挑。

`s01.r1.block.002.001`

### 条件正文 · s01.r1.block.003

条件：`{"eq":["opening_date_s","deferred"]}`

**沈清辞**：北岸还没带你去。今天先坐这里，晚点再认真约。

`s01.r1.block.003.001`

### 条件正文 · s01.r1.block.004

条件：`{"eq":["contact_s","work"]}`

**沈清辞**：你要的排期我发工作号了。现在这几分钟，可以不谈那个。

`s01.r1.block.004.001`

### 选择 s01/honest

“我确实有工作想问。但这几分钟，先陪你坐。”

可选条件：`null`

立即回应：

**沈清辞**：不怕我休息完忘了？

`s01.honest.reply.001`

**许照**：怕。所以提前说一声，不装作没有。

`s01.honest.reply.002`

**旁白**：她把纸放到窗台，两把椅子终于都能坐人。

`s01.honest.reply.003`

**沈清辞**：好。先歇五分钟，我也把这杯水喝完。

`s01.honest.reply.004`

**旁白**：你们坐下来，远处试音一遍遍重复同一个音。她慢慢抿了一口你替她重新接的温水。

`s01.honest.reply.005`

**沈清辞**：现在问吧。不用等我变回负责人。

`s01.honest.reply.006`

写入与操作：`[{"op":"set","key":"bench_s","value":"candid"}]`

后继：`完成本次私人日程`

### 选择 s01/silent

“我不问事。你不用找话题，也不用招待我。”

可选条件：`null`

立即回应：

**旁白**：她捧着杯子愣了一下。

`s01.silent.reply.001`

**沈清辞**：你真的不问排期？刚才那叠纸，可是人人看见都想提要求。

`s01.silent.reply.002`

**许照**：今天多一个。

`s01.silent.reply.003`

**旁白**：她先听完一段试音，又把手机翻了过去。

`s01.silent.reply.005`

**沈清辞**：你可以坐近一点。这里风大，我不是让你罚站。

`s01.silent.reply.006`

写入与操作：`[{"op":"set","key":"bench_s","value":"silence"}]`

后继：`完成本次私人日程`

### 选择 s01/joke

“只坐五分钟。有人找你，我说是椅子坏了，必须压着。”

可选条件：`null`

立即回应：

**旁白**：她侧头看你，没立刻笑。

`s01.joke.reply.001`

**沈清辞**：这么容易坏，谁买的？

`s01.joke.reply.002`

**许照**：……我是不是编复杂了。

`s01.joke.reply.003`

**旁白**：这回她真的笑了一下。

`s01.joke.reply.004`

**沈清辞**：坐吧。不用造一个事故让我休息。

`s01.joke.reply.005`

**旁白**：你把那摞纸挪好，她替你扶住椅背。五分钟还没到，手机又亮起来，她看了一眼时间，没有接。

`s01.joke.reply.006`

写入与操作：`[{"op":"set","key":"bench_s","value":"joke"}]`

后继：`完成本次私人日程`


---

## s02｜第三排也听得见

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":2,"minSlot":2,"next":"SPARK_s"}`

### 正文

**旁白**：旁厅里只有三排椅子。沈清辞打开最暗的那盏舞台灯，叫你坐到最后一排，自己走到正中间。

`s02.r4.body.001`

**沈清辞**：这里不拿麦，听得清吗？

`s02.r4.body.002`

**许照**：听得清。

`s02.r4.body.003`

**沈清辞**：刚租下它那会儿，我买多了二十把折叠椅。第一场只卖出去七张票，我半夜回来数空椅子，还怕被人看见。

`s02.r4.body.004`

**旁白**：她把两份方案放到你面前：继续办独立夜场，或者改给巡演团队排练。第二种收入稳一些，但小演出就没时段了。

`s02.r4.body.005`

### 条件正文 · s02.r1.block.001

条件：`{"eq":["knows_foreknowledge_claim_s",true]}`

**沈清辞**：你记得的是别人写过的北岸。今天，先听我怎么想。

`s02.r1.block.001.001`

### 选择 s02/reason

“我先不劝你守。你最想保住的是房子，还是这里能发生的事？”

可选条件：`null`

立即回应：

**许照**：你最舍不得的是哪部分？

`s02.reason.r4.reply.001`

**沈清辞**：小演出。屋子可以换，可换了以后，那些人未必还会来。

`s02.reason.r4.reply.002`

**许照**：我陪你问问能不能留几晚？钱我真帮不上。

`s02.reason.r4.reply.003`

**沈清辞**：这样就够了。先问清楚，别替我跟人吵。

`s02.reason.r4.reply.004`

**旁白**：她发来公开时段表，让你圈出可以商量的空档。

`s02.reason.r4.reply.005`

**沈清辞**：问下来太贵，也可以说不合算。今天先别答应替我救场。

`s02.reason.r4.reply.006`

写入与操作：`[{"op":"set","key":"reciprocal_s","value":true},{"op":"set","key":"theatre_s","value":"reason"},{"op":"set","key":"trust_s","value":"steady"}]`

后继：`SPARK_s`

### 选择 s02/sit

“让我先听完一场。没坐过这里，说什么梦想都太容易。”

可选条件：`null`

立即回应：

**沈清辞**：今晚只有空台。

`s02.sit.reply.001`

**许照**：那你讲最失败的那一场。

`s02.sit.reply.002`

**旁白**：她愣了愣，接着真的坐到台沿，讲那次来了六个人，其中两个是演员的父母。

`s02.sit.reply.003`

**沈清辞**：散场之后，我一个人把椅子又排了一遍，好像排齐了就没那么丢脸。

`s02.sit.reply.004`

**许照**：后来呢？

`s02.sit.reply.005`

**沈清辞**：后来其中一个观众带了朋友来。

`s02.sit.reply.006`

**旁白**：她讲到第二次演出的观众数，自己掰着手指数了数。这回笑得没那么勉强了。

`s02.sit.reply.007`

写入与操作：`[{"op":"set","key":"reciprocal_s","value":true},{"op":"set","key":"theatre_s","value":"heard"},{"op":"set","key":"trust_s","value":"steady"}]`

后继：`SPARK_s`

### 选择 s02/promise

“我会让你保住这里。不管多少钱。”——你没有这样的资金。

可选条件：`null`

立即回应：

**旁白**：她没有被这句保证打动，反而把两张图收了起来。

`s02.promise.reply.001`

**沈清辞**：许照，你自己工资都还没到账。

`s02.promise.reply.002`

**许照**：我只是想——

`s02.promise.reply.003`

**沈清辞**：我知道你想帮。但我不能拿你的冲动去做别人的决定。

`s02.promise.reply.004`

**沈清辞**：真想帮忙，下次陪我核一下空档。钱的事，等钱真的有了再说。

`s02.promise.reply.006`

写入与操作：`[{"op":"set","key":"reciprocal_s","value":false},{"op":"set","key":"theatre_s","value":"overpromise"},{"op":"set","key":"pending_s","value":true},{"op":"set","key":"trust_s","value":"guarded"}]`

后继：`SPARK_s`


---

## s03｜没有抄送助理的邀请

类型：`personal`。元数据：`{"background":"street","music":"quiet","decisionSteps":[{"id":"date","label":"对清辞说清想认真约会的心意","options":["open","exclusive"],"reply":[{"speaker":"S","text":"公事我能签流程，感情不一样。我得知道你说的“认真”具体到哪一步。","id":"s03.v413.date.reply.001","textHash":"81e8c44a50d4d72a"}],"after":[{"speaker":"N","text":"她把工作手机反扣在桌上，认真等你说出关系范围。","id":"s03.v413.date.after.001","textHash":"334943de1fb99b99"}]},{"id":"slow","label":"先把彼此放在舒适的位置，不催她答应","options":["wait","friend","decline"],"reply":[{"speaker":"S","text":"谢谢你没有把我今天出来吃饭，当成默认同意。","id":"s03.v413.slow.reply.001","textHash":"9b2b9b293f108809"}],"after":[{"speaker":"N","text":"服务员放下两杯水，她把这一刻当作一次平等的谈话。","id":"s03.v413.slow.after.001","textHash":"f0eaebd8e0a90288"}]}],"character":"s","stage":3,"minSlot":5}`

### 正文

**旁白**：她发来地址时，没有附工作资料。你到得稍早，看到清辞在门口把工作牌摘下来，塞进包里。

`s03.body.001`

**沈清辞**：你今天有一份材料吗？

`s03.body.002`

**许照**：没有。

`s03.body.003`

**沈清辞**：好，我也不准备了。

`s03.body.004`

**旁白**：路边的小馆子不安静，菜单还粘着一点水。她把靠里的座位让给你，自己坐在外面。

`s03.body.005`

**沈清辞**：我今晚没带排期表，是因为想和你吃顿私人的饭。你呢？是这么想的吗？

`s03.body.006`

### 条件正文 · s03.variant.001

条件：`{"eq":["bench_s","silence"]}`

**沈清辞**：上次你真的一句话没催。我后来想，或许可以再坐一次。

`s03.variant.001.001`

### 条件正文 · s03.variant.002

条件：`{"eq":["bench_s","joke"]}`

**沈清辞**：今天椅子没坏，你也可以坐。

`s03.variant.002.001`

### 条件正文 · s03.variant.003

条件：`{"all":[{"eq":["pending_s",true]},{"chosen":["s02","promise"]}]}`

**沈清辞**：不过你之前答应替我承担的那些事，还没有变成能做的安排。钱都没着落，我们也才认识，我不能这样答应你。我们今天可以吃饭，关系先慢一点。

`s03.variant.003.001`

### 条件正文 · s03.variant.005

条件：`{"eq":["trust_s","steady"]}`

**旁白**：她没有再从一句保证开始考察你，而是先问你自己的安排。你说了自己的休息时间，她才拿出手机记下来。

`s03.variant.005.001`

### 条件正文 · s03.r2.other_issue

条件：`{"all":[{"eq":["opening_lie_s",true]},{"not":{"chosen":["s02","promise"]}}]}`

**沈清辞**：阿衡那件事还没说清。今天可以见面，但我不会当作已经没事，更不会先答应恋爱。

`s03.unresolved_source.0`

### 条件正文 · s03.r4.block.006

条件：`{"all":[{"any":[{"chosen":["SPARK_s","bold"]},{"chosen":["SPARK_s","tease"]}]},{"canDate":"s"}]}`

**沈清辞**：那张没发到工作群的位置，我发出去以后看了好几次。今天总算不用只看手机。

`s03.early_callback.0`

### 选择 s03/open

“我想认真约你。有其他约会会直说，现在不承诺只和一个人。”

可选条件：`{"canDate":"s"}`

立即回应：

**许照**：想认真约会。但现在不承诺排他。

`s03.open.reply.001`

**旁白**：你把目前实际在约会的人说清；没有别人，就如实说没有。

`s03.open.reply.002`

**旁白**：清辞把菜单放下，想了想。

`s03.open.reply.003`

**沈清辞**：可以先相处。有其他进展，你自己说，不要让我替大家整理消息。

`s03.open.reply.004`

**许照**：好。

`s03.open.reply.005`

**沈清辞**：那今天先吃饭。别只问我想吃什么。你点一道，我点一道。

`s03.open.reply.006`

**旁白**：她关掉工作手机，问你晚上能待到几点。

`s03.open.reply.007`

写入与操作：`[{"op":"set","key":"active_s","value":true},{"op":"set","key":"scope_s","value":"open"},{"op":"set","key":"pursued_s","value":true},{"op":"disclose","character":"s"},{"op":"set","key":"commitment_s","value":"dating"},{"op":"set","key":"interest_s","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 s03/exclusive

“我想只和你交往。”

可选条件：`{"canDate":"s"}`

立即回应：

**许照**：我想只和你交往。

`s03.exclusive.reply.001`

**沈清辞**：想清楚了再说，我会认真按这句话安排自己的生活。

`s03.exclusive.reply.002`

**许照**：想清楚了。

`s03.exclusive.reply.003`

**旁白**：她的笑很轻，没有立即握手，却把座位往你这边挪了一点。

`s03.exclusive.reply.004`

**沈清辞**：那我答应。以后忙不过来可以告诉我，不需要消失。

`s03.exclusive.reply.005`

写入与操作：`[{"op":"set","key":"active_s","value":true},{"op":"set","key":"scope_s","value":"exclusive"},{"op":"set","key":"pursued_s","value":true},{"op":"set","key":"promised_s","value":true},{"op":"set","key":"commitment_s","value":"relationship"},{"op":"set","key":"interest_s","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 s03/wait

“喜欢你，但我想慢一点。”

可选条件：`null`

立即回应：

**许照**：想见你，只是现在还没准备好谈恋爱。

`s03.wait.r2.reply.001`

**沈清辞**：好。下次想见就约，不用为了赶上谁的节奏点头。

`s03.wait.r2.reply.002`

**旁白**：她没有划掉刚才写下的店名，只在旁边加了两个小字：待定。

`s03.wait.r2.reply.003`

写入与操作：`[{"op":"set","key":"active_s","value":false},{"op":"set","key":"scope_s","value":"waiting"},{"op":"set","key":"pursued_s","value":true},{"op":"set","key":"commitment_s","value":"none"},{"op":"set","key":"interest_s","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 s03/friend

“先做朋友，好吗？”

可选条件：`null`

立即回应：

**许照**：先做朋友吧。认识你这件事，不一定要立刻变成恋爱。

`s03.friend.reply.001`

**旁白**：清辞点头。

`s03.friend.reply.002`

**沈清辞**：可以。但我可能要把刚才挑了很久餐厅的心情收拾一下。

`s03.friend.reply.003`

**旁白**：她说完自己先笑了，笑完又低头喝了口水。

`s03.friend.reply.004`

**沈清辞**：饭还是要吃。先说你不能吃什么。

`s03.friend.reply.005`

写入与操作：`[{"op":"set","key":"active_s","value":false},{"op":"set","key":"scope_s","value":"friend"},{"op":"set","key":"pursued_s","value":false},{"op":"set","key":"commitment_s","value":"none"},{"op":"set","key":"interest_s","value":"platonic"}]`

后继：`完成本次私人日程`

### 选择 s03/decline

“今晚先不开始恋爱，以后再说。”

可选条件：`null`

立即回应：

**沈清辞**：知道了。今晚照常吃饭，不替以后答应。

`.scenes.s03.choices.4.reply.0`

写入与操作：`[{"op":"set","key":"active_s","value":false},{"op":"set","key":"scope_s","value":"declined"},{"op":"set","key":"pursued_s","value":true},{"op":"set","key":"commitment_s","value":"none"},{"op":"set","key":"interest_s","value":"uncertain"}]`

后继：`完成本次私人日程`


---

## s04｜你不用猜我想吃什么

类型：`personal`。元数据：`{"background":"diner","music":"quiet","character":"s","stage":4,"minSlot":9,"next":"s05","outingFollowup":"s05"}`

### 正文

**旁白**：清辞站在两家店中间，少见地没有立刻决定。一家是评价很高的餐馆，另一家门口贴着手写的“今日热汤”。

`s04.body.001`

**许照**：你想去哪家？

`s04.body.002`

**沈清辞**：都可以。

`s04.body.003`

**旁白**：你记得她原著里爱点清淡的菜，已经准备往第一家走，却看见她又瞥了一眼热汤的牌子。

`s04.body.004`

**旁白**：她似乎发觉了你的犹豫。

`s04.body.005`

**沈清辞**：你是不是已经替我选好了？

`s04.body.006`

**旁白**：风一吹，她把围巾往上拉了拉。你刚才只顾回想书里写了什么，连这个都没注意。

`s04.body.007`

### 条件正文 · s03.variant.006

条件：`{"eq":["met_promise","s_room"]}`

**沈清辞**：你上次按时来了一趟。我记得，不是所有约定都要很大才值得算数。

`s03.variant.006.001`

### 条件正文 · s03.variant.007

条件：`{"eq":["met_promise","s_walk"]}`

**沈清辞**：上次走过的那条路今天还亮着灯。事情说完，有空可以再走一段。

`s03.variant.007.001`

### 选择 s04/ask

“差点。现在重新问，你今天想吃什么？”

可选条件：`null`

立即回应：

**沈清辞**：热的，辣一点。别告诉我明天该养生。

`s04.ask.reply.001`

**许照**：那就这家。

`s04.ask.reply.002`

**旁白**：坐下之后，她把围巾拆下来，整个人都松了一点。

`s04.ask.reply.003`

**沈清辞**：我有时候说都可以，是还没想好，不是希望有人直接替我选。

`s04.ask.reply.004`

**许照**：那我可以等你想一下。

`s04.ask.reply.005`

写入与操作：`[{"op":"set","key":"dinner_s","value":"asked"}]`

后继：`s05`

### 选择 s04/self

“我今天想喝汤。你陪我试一次？不喜欢再换。”

可选条件：`null`

立即回应：

**沈清辞**：可以。原来你也有想吃的。

`s04.self.r2.reply.001`

**许照**：我表现得很没有主见吗？

`s04.self.r2.reply.002`

**沈清辞**：你太努力猜我了。

`s04.self.r2.reply.003`

**旁白**：她翻开菜单，指着一碗最辣的问你敢不敢试。

`s04.self.r2.reply.004`

写入与操作：`[{"op":"set","key":"dinner_s","value":"shared"}]`

后继：`s05`

### 选择 s04/book

“我记得你平常吃得清淡，要去那家吗？”

可选条件：`null`

立即回应：

**许照**：我记得你平常吃得清淡，是不是那家更合适？

`s04.book.r4.reply.001`

**沈清辞**：今天想喝辣汤，冷。

`s04.book.r4.reply.002`

**许照**：哦，那听今天的。

`s04.book.r4.reply.003`

**旁白**：她率先拐进热汤店，把菜单推过来，给自己勾了“加辣”。

`s04.book.r4.reply.004`

写入与操作：`[{"op":"set","key":"dinner_s","value":"assumed"}]`

后继：`s05`


---

## s05｜灯灭以后还可以不走

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":5,"minSlot":9}`

### 正文

**旁白**：吃完饭，你们顺路回到北岸侧厅取清辞寄放的外套。她看了眼手机，把工作消息划走了。

`s05.r2.body.001`

**沈清辞**：现在没有人等我回消息。难得。

`s05.r2.body.002`

**旁白**：她拿到外套，却没马上穿，反而指了指窗边空着的两把椅子。

`s05.r2.body.003`

**沈清辞**：再待几分钟？不收场租，今天算我请。

`s05.r2.body.004`

### 条件正文 · s05.variant.001

条件：`{"ne":["active_s",true]}`

**旁白**：她把另一把椅子拉开，留着平常相处的距离。你在对面坐下，把喝完的纸杯丢进桶里。

`s05.r2.friend.001`

### 条件正文 · s05.variant.002

条件：`{"eq":["dinner_s","asked"]}`

**沈清辞**：刚才那碗辣汤合我口味。下次不用记标准答案，我可能又想吃别的。

`s05.variant.002.001`

### 条件正文 · s05.variant.003

条件：`{"eq":["dinner_s","shared"]}`

**沈清辞**：刚才你说自己想喝汤，我还挺高兴。终于不用猜谁在迁就谁了。

`s05.variant.003.001`

### 条件正文 · s05.variant.004

条件：`{"eq":["dinner_s","assumed"]}`

**沈清辞**：我今天偏要吃辣，你那份“我一向清淡”的记忆，先改一行吧。

`s05.variant.004.001`

### 条件正文 · s05.r2.new_operator

条件：`{"eq":["s_left_operator",true]}`

**旁白**：接班的值守人员替她取出外套。钥匙和灯光都由对方负责，她只是一位回来拿东西的人。

`s05.r2.new_operator.001`

### 条件正文 · s05.r2.still_operator

条件：`{"ne":["s_left_operator",true]}`

**旁白**：当班同事已经接手收尾。清辞点头道别，不再把每一盏灯都亲手检查一遍。

`s05.r2.still_operator.001`

### 选择 s05/kiss

“我想亲你，可以吗？”

可选条件：`{"all":[{"eq":["active_s",true]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]}]}`

立即回应：

**许照**：我想亲你，可以吗？

`s05.kiss.r2.reply.001`

**沈清辞**：可以。

`s05.kiss.r2.reply.002`

**旁白**：她把外套放下，笑着向你走近。你吻上去时，她握住你的袖口，没让紧张的笑漏出来。

`s05.kiss.r2.reply.003`

**沈清辞**：你耳朵也红了。

`s05.kiss.r2.reply.004`

**许照**：这里太热。

`s05.kiss.r2.reply.005`

**沈清辞**：嗯，窗户还开着呢。

`s05.kiss.r2.reply.006`

写入与操作：`[{"op":"set","key":"pace_s","value":"kiss"},{"op":"set","key":"kissed_s","value":true},{"op":"set","key":"private_reward_s","value":true}]`

后继：`完成本次私人日程`

### 选择 s05/hold

“让我抱你一下。别的慢慢来。”

可选条件：`{"all":[{"eq":["active_s",true]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]}]}`

立即回应：

**旁白**：她伸开手，等你靠近，才把额头轻轻抵在你肩上。

`s05.hold.r2.reply.001`

**沈清辞**：借我一会儿。

`s05.hold.r2.reply.002`

**许照**：不收租。

`s05.hold.r2.reply.003`

**沈清辞**：那我赖一会儿。

`s05.hold.r2.reply.004`

**旁白**：她笑着把最后两个字说得很轻，没急着松手。

`s05.hold.r2.reply.005`

写入与操作：`[{"op":"set","key":"pace_s","value":"hold"},{"op":"set","key":"private_reward_s","value":true}]`

后继：`完成本次私人日程`

### 选择 s05/walk

“我们出去走走吧。我不太会在这种时候讲话。”

可选条件：`null`

立即回应：

**沈清辞**：那就边走边不说。

`s05.walk.r2.reply.001`

**旁白**：她先推开门，走了两步又回头等你。

`s05.walk.r2.reply.002`

**沈清辞**：不过有件事要说。刚才那家，下次还去。

`s05.walk.r2.reply.003`

写入与操作：`[{"op":"set","key":"pace_s","value":"walk"},{"op":"set","key":"private_reward_s","value":true}]`

后继：`完成本次私人日程`


---

## s06｜她想听你亲口说

类型：`personal`。元数据：`{"background":"diner","music":"quiet","character":"s","stage":6,"minSlot":11,"next":"s07","outingFollowup":"s07"}`

### 正文

**沈清辞**：你看手机三次了。再看，面都坨了。

`s06.r4.body.001`

**旁白**：清辞把你的碗往里推了一点，没去看屏幕。

`s06.r4.body.002`

**沈清辞**：顺便问一句，你现在有没有在约会的人？

`s06.r4.body.003`

**旁白**：她放下筷子，等你答。

`s06.r4.body.004`

### 条件正文 · s06.variant.001

条件：`{"eq":["public_photo_t",true]}`

**沈清辞**：映雪发过合照，我看见了。合照当然不等于什么，所以我才问你。

`s06.variant.001.001`

### 条件正文 · s06.variant.002

条件：`{"eq":["pace_s","kiss"]}`

**旁白**：她的目光从你的嘴角停过一下，又认真移回来。随后她端正地坐好，仍在等答案。

`s06.variant.002.001`

### 条件正文 · s06.variant.003

条件：`{"eq":["pace_s","hold"]}`

**沈清辞**：上次能抱着坐一会儿，我挺高兴。不用因为没再做什么，就觉得少了一步。

`s06.variant.003.001`

### 条件正文 · s06.variant.004

条件：`{"eq":["pace_s","walk"]}`

**沈清辞**：上次走那段路很舒服。今天这件事说完，愿不愿意走再问。

`s06.variant.004.001`

### 选择 s06/truth

说清目前正在认识的其他人；没有，就如实说没有。

可选条件：`null`

立即回应：

**旁白**：你把现在实际的关系逐一说清，没有把朋友也算成恋人。

`s06.truth.r4.reply.001`

**沈清辞**：好，我听见了。

`s06.truth.r4.reply.002`

**许照**：你要想一下吗？

`s06.truth.r4.reply.003`

**沈清辞**：要。先让我把饭吃完，你别立刻追问我高不高兴。

`s06.truth.r4.reply.004`

**旁白**：你点头，把手机收回口袋。她这才重新拿起筷子。

`s06.truth.r4.reply.005`

写入与操作：`[{"op":"disclose","character":"s"},{"op":"set","key":"jealous_s","value":"truth"}]`

后继：`s07`

### 选择 s06/time

“先把今晚这段相处过完。散场前，我会把关系讲清。”

可选条件：`null`

立即回应：

**沈清辞**：散场前。不是下一个不知道哪天的晚上。

`s06.time.r2.reply.001`

**旁白**：你把手机收好。这一次还没有说出别人的名字，她也没有提前知道答案。

`s06.time.r2.reply.002`

写入与操作：`[{"op":"set","key":"jealous_s","value":"late_truth"},{"op":"deferDisclosure","character":"s"}]`

后继：`s07`

### 选择 s06/dismiss

“没有别人，你想太多了。”——即使存在其他关系也这样说。

可选条件：`null`

立即回应：

**旁白**：她没去抢你的手机，也没有在餐馆里逼你对质。

`s06.dismiss.reply.001`

**沈清辞**：好，这句话我听见了。

`s06.dismiss.reply.002`

**旁白**：你们继续吃饭。她只问了一个关于明天的问题，再没提手机。

`s06.dismiss.reply.003`

**旁白**：离开前，她确认了一遍：“你刚才说没有，我按这句话来理解。”

`s06.dismiss.reply.004`

写入与操作：`[{"op":"denyRelations","character":"s"},{"op":"set","key":"jealous_s","value":"denied"}]`

后继：`s07`


---

## s07｜她也会选错

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":7,"minSlot":11}`

### 正文

**旁白**：清辞带你绕到隔壁小厅，拿出她今晚帮忙做的一份宣传单。报名表上只有寥寥几个名字。

`s07.r2.body.001`

**沈清辞**：我以为熟人转发一下就够了。现在看，是我想得太美。

`s07.r2.body.002`

**旁白**：她把鼠标移到取消键，停住，抬头看你。

`s07.r2.body.003`

**沈清辞**：别笑。我刚还劝别人别怕冷场，轮到自己就怂了。

`s07.r2.body.004`

### 条件正文 · s07.variant.001

条件：`{"eq":["jealous_s","truth"]}`

**沈清辞**：刚才把约会的人说清了，我听见了。吃醋归吃醋，今晚这摊还是得收。

`s07.variant.001.001`

### 条件正文 · s07.variant.002

条件：`{"eq":["jealous_s","late_truth"]}`

**沈清辞**：你说散场前会讲清。我还记着，先把眼前这件事忙完。

`s07.variant.002.001`

### 条件正文 · s07.variant.003

条件：`{"eq":["jealous_s","denied"]}`

**沈清辞**：刚才那句没有别人，我是认真听的。等忙完，我们再聊。

`s07.variant.003.001`

### 条件正文 · s07.r2.handover_role

条件：`{"eq":["s_left_operator",true]}`

**旁白**：这是新负责人请她帮忙的一次短期活动，不归她运营。场地改动仍需对方确认。

`s07.r2.handover_role.001`

### 选择 s07/together

“先看看哪一件还能改。我帮你做，但别把我的意见当保证。”

可选条件：`null`

立即回应：

**许照**：先救还能救的。我重做一张宣传图，你联系已经报了名的人？

`s07.together.r2.reply.001`

**沈清辞**：好。别加“全城最值得期待”，我看了更怕。

`s07.together.r2.reply.002`

**旁白**：你们重新发出准确的时段和票务信息，拉上现场值守的人试了一次入场、撤场，把确认单中漏掉的半小时补好。

`s07.together.r2.reply.003`

**沈清辞**：这回没人来，也不能怪门没开。

`s07.together.r2.reply.004`

**旁白**：她说完笑了，先给第一位确认到场的听众留好座位。

`s07.together.r2.reply.005`

写入与操作：`[{"op":"set","key":"failure_s","value":"shared"},{"op":"set","key":"proof_s_slots","value":true}]`

后继：`完成本次私人日程`

### 选择 s07/comfort

“我不是来检查你有没有每次做对。先吃点东西吧。”

可选条件：`null`

立即回应：

**许照**：先吃一点。今晚不想当救世主，想陪你把这盒热的吃完。

`s07.comfort.r2.reply.001`

**沈清辞**：刚吃完又吃？

`s07.comfort.r2.reply.002`

**许照**：你那碗根本没动几口。

`s07.comfort.r2.reply.003`

**旁白**：她低头看了一眼你带回的饭盒，没有再嘴硬。

`s07.comfort.r2.reply.004`

**沈清辞**：那听我抱怨五分钟。五分钟以后，我自己打开电脑。

`s07.comfort.r2.reply.005`

写入与操作：`[{"op":"set","key":"failure_s","value":"heard"}]`

后继：`完成本次私人日程`

### 选择 s07/compare

“早听我的，可能就不会这样。”

可选条件：`null`

立即回应：

**旁白**：她的手停在鼠标上。

`s07.compare.reply.001`

**沈清辞**：可能。但我们不能一直靠这句过日子。

`s07.compare.reply.002`

**许照**：我不是这个意思。

`s07.compare.reply.003`

**沈清辞**：那你换一种说法。现在这句，只让我想下次失败别告诉你。

`s07.compare.reply.004`

**旁白**：你没再往下讲。她转回电脑前，后面的几个问题没有再拿来问你。

`s07.compare.reply.005`

写入与操作：`[{"op":"set","key":"failure_s","value":"judged"},{"op":"set","key":"value_conflict_s","value":true}]`

后继：`完成本次私人日程`


---

## s08｜她把你的安排也留了进去

类型：`personal`。元数据：`{"background":"diner","music":"quiet","character":"s","stage":8,"minSlot":14,"next":"s09","outingFollowup":"s09"}`

### 正文

**旁白**：清辞发来一份休息计划，列了几个时间和地点，末尾跟着一句“哪天有空？”

`s08.body.001`

**沈清辞**：你挑。也可以一个都不选。

`s08.body.002`

**许照**：你不怕我选得很没效率？

`s08.body.003`

**沈清辞**：我又不是来验收休息。

`s08.body.004`

**旁白**：她说完想了想，自己划掉最密的一行。

`s08.body.005`

**沈清辞**：好吧，刚才还是排太满了。

`s08.body.006`

### 条件正文 · s08.variant.001

条件：`{"eq":["failure_s","shared"]}`

**沈清辞**：上次你陪我把问题拆开，没有接过来替我全做。今天我反而敢说自己想休息。

`s08.variant.001.001`

### 条件正文 · s08.variant.002

条件：`{"eq":["failure_s","heard"]}`

**沈清辞**：上次你没忙着安慰得一切都好，我舒服很多。今天没有别的工作要你接。

`s08.variant.002.001`

### 条件正文 · s08.variant.003

条件：`{"eq":["failure_s","judged"]}`

**沈清辞**：上次那句“早听你的就好了”，我到现在还是不喜欢。今天能谈安排，不代表那句话没发生。

`s08.variant.003.001`

### 条件正文 · s08.variant.004

条件：`{"eq":["chair_s","kept"]}`

**沈清辞**：那次我真的坐下看完了。今天想做什么，我也会先问自己。

`s08.variant.004.001`

### 条件正文 · s08.variant.005

条件：`{"eq":["chair_s","checked"]}`

**沈清辞**：那次我们没找到额外座位，也没有硬挤。原来没法完美安排，也能接受。

`s08.variant.005.001`

### 条件正文 · s08.variant.006

条件：`{"eq":["chair_s","chosen"]}`

**沈清辞**：我说下一次想坐，不是随口一说。今天也给自己留好了。

`s08.variant.006.001`

### 选择 s08/choose

挑一个你真的想去的地方，不猜她最满意哪一个。

可选条件：`null`

立即回应：

**许照**：我想去河边。不是因为你喜欢，是我没去过。

`s08.choose.reply.001`

**沈清辞**：好。那今天我也不做向导。

`s08.choose.reply.002`

**旁白**：到了河边，你们走错一段路。她习惯性想拿出手机，又看了看你。

`s08.choose.reply.003`

**沈清辞**：慢慢绕回去？

`s08.choose.reply.004`

**许照**：嗯。

`s08.choose.reply.005`

写入与操作：`[{"op":"set","key":"weekend_s","value":"shared"}]`

后继：`s09`

### 选择 s08/quiet

“能不能什么都不排？一起待一会儿就行。”

可选条件：`null`

立即回应：

**沈清辞**：我可能会忍不住找点事做。

`s08.quiet.reply.001`

**许照**：可以。别顺手给我也安排一份。

`s08.quiet.reply.002`

**旁白**：她笑了，真的没带电脑。你们坐在长椅上看人来来往往，她偶尔问一个没什么用的问题，你也认真答。

`s08.quiet.reply.003`

写入与操作：`[{"op":"set","key":"weekend_s","value":"rest"}]`

后继：`s09`

### 选择 s08/lead

“这次让我安排。你想改的话，中途随时说。”

可选条件：`null`

立即回应：

**旁白**：她把那份计划关掉，像放下一件不太习惯放下的东西。

`s08.lead.reply.001`

**沈清辞**：那我先提一个要求，吃饭别太晚。

`s08.lead.reply.002`

**许照**：收到。

`s08.lead.reply.003`

**沈清辞**：也不用这么像接工作。

`s08.lead.reply.004`

写入与操作：`[{"op":"set","key":"weekend_s","value":"lead"}]`

后继：`s09`


---

## s09｜不必总是最懂事的那个

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":9,"minSlot":14}`

### 正文

**旁白**：回程路上，清辞收到一条消息：“你最稳，这件事还是你来。”她打了个“好”，又删掉。

`s09.r2.body.001`

**沈清辞**：我今天是不是休息得太像真的了，他们已经想起来找我。

`s09.r2.body.002`

**许照**：你想接吗？

`s09.r2.body.003`

**沈清辞**：不想。可我一说不，又觉得自己挺难相处。

`s09.r2.body.004`

**旁白**：她拿着手机抬头看你，等的不是一份工作方案。

`s09.r2.body.005`

### 条件正文 · s09.variant.001

条件：`{"eq":["weekend_s","shared"]}`

**沈清辞**：刚才去河边，走错路那一段倒挺好。没人催着要到哪儿。

`s09.variant.001.001`

### 条件正文 · s09.variant.002

条件：`{"eq":["weekend_s","rest"]}`

**沈清辞**：刚才真能在长椅上待着，我自己都意外。原来手机收起来也不会天塌。

`s09.variant.002.001`

### 条件正文 · s09.variant.003

条件：`{"eq":["weekend_s","lead"]}`

**沈清辞**：刚才让你带路挺省心。下次还认不认路，就另说了。

`s09.variant.003.001`

### 选择 s09/person

“今天不想接，就回今晚没空。”

可选条件：`null`

立即回应：

**许照**：那就说今晚不接。认识这么久，又不是只见过你答应别人。

`s09.person.r4.reply.001`

**旁白**：她删掉半句道歉，回复：“今晚没空，明天十点再看。”

`s09.person.r4.reply.002`

**沈清辞**：发了。居然也没那么难。

`s09.person.r4.reply.003`

**许照**：买点甜的庆祝？

`s09.person.r4.reply.004`

**沈清辞**：行。这次店你找。

`s09.person.r4.reply.005`

写入与操作：`[{"op":"set","key":"self_s","value":"person"}]`

后继：`完成本次私人日程`

### 选择 s09/need

“你可以有需要我帮忙的时候。我也想为你做点事。”

可选条件：`null`

立即回应：

**许照**：那有时也让我帮个忙。我总不能只负责蹭你的安排。

`s09.need.r2.reply.001`

**沈清辞**：行。下次看小厅，帮我坐最靠边的位子，听哪里漏声。

`s09.need.r2.reply.002`

**许照**：就这点事？

`s09.need.r2.reply.003`

**沈清辞**：就这点。可别连小忙也嫌不够威风。

`s09.need.r2.reply.004`

写入与操作：`[{"op":"set","key":"self_s","value":"mutual"}]`

后继：`完成本次私人日程`

### 选择 s09/admire

“做事利落，也不等于每件都得你来。”

可选条件：`null`

立即回应：

**许照**：你做事利落是挺厉害，可也不能每件都接。今晚先歇着，我带路。

`s09.admire.r4.reply.001`

**沈清辞**：那先提醒你，别往工作区走。

`s09.admire.r4.reply.002`

**旁白**：你刚迈出两步，她就叫住你：“反了。看来还是得看你一眼。”

`s09.admire.r4.reply.003`

写入与操作：`[{"op":"set","key":"self_s","value":"admire"}]`

后继：`完成本次私人日程`


---

## s10｜关门的人也会等人

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":10,"minSlot":16,"next":"s11","outingFollowup":"s11"}`

### 正文

**旁白**：夜色压下来，清辞在你们约好的门口等着。你把热饮递过去，她先用双手捂了一会儿。

`s10.body.001`

**沈清辞**：我以为你回去了。

`s10.body.002`

**许照**：差点。想来看看你有没有下班。

`s10.body.003`

**沈清辞**：没有你想象得那么忙。

`s10.body.004`

**旁白**：她接过杯子，没有解释自己其实比预计早结束了多久。

`s10.body.005`

**沈清辞**：有时候我说“你忙就先走”，也真的会希望你留下。可是我不想以后每句话，都让你反着猜。

`s10.body.006`

### 条件正文 · s10.variant.001

条件：`{"eq":["self_s","person"]}`

**沈清辞**：你上次说，说不想接的活可以拒绝。我试了，今晚真早出来了。

`s10.variant.001.001`

### 条件正文 · s10.variant.002

条件：`{"eq":["self_s","mutual"]}`

**沈清辞**：你上次说，也想为我做点事。今晚有一件——陪我走一段，先不帮我想办法。

`s10.variant.002.001`

### 条件正文 · s10.variant.003

条件：`{"eq":["self_s","admire"]}`

**沈清辞**：被你欣赏，我挺高兴。但做得不好那天，也希望你照样把话说清楚。

`s10.variant.003.001`

### 选择 s10/say

“那就说‘我想你留下’。我能留会答应，不能也会说明。”

可选条件：`null`

立即回应：

**许照**：那就直接说。今晚我能留。

`s10.say.r2.reply.001`

**沈清辞**：许照，我想你再留一会儿。

`s10.say.r2.reply.002`

**旁白**：她说完盯着你的杯子，等你笑着答应才抬头。

`s10.say.r2.reply.003`

**沈清辞**：这话怎么比打十通工作电话还费劲。

`s10.say.r2.reply.004`

写入与操作：`[{"op":"set","key":"last_s","value":"say"}]`

后继：`s11`

### 选择 s10/ask

“以后我会问，你也直接告诉我。”

可选条件：`null`

立即回应：

**许照**：以后我会问你还想不想待着。你也直接告诉我，好不好？

`s10.ask.r4.reply.001`

**沈清辞**：好。那今晚，我想有人一起走回去。

`s10.ask.r4.reply.002`

**旁白**：她说完看了你一眼，又把热饮捧回掌心。

`s10.ask.r4.reply.003`

写入与操作：`[{"op":"set","key":"last_s","value":"mutual"}]`

后继：`s11`

### 选择 s10/honest

“今晚不能太晚。我想见你，但答应了别的事要做完。”

可选条件：`null`

立即回应：

**旁白**：她眼里有一点失望，随后点头。

`s10.honest.reply.001`

**沈清辞**：那我们喝完这半杯。下次你能留久一点的时候，提前告诉我。

`s10.honest.reply.002`

写入与操作：`[{"op":"set","key":"last_s","value":"honest"}]`

后继：`@schedule`


---

## l01｜她给我听了原著漏掉的两秒

类型：`personal`。元数据：`{"background":"backstage","music":"travel","character":"l","stage":1,"minSlot":0}`

### 正文

**旁白**：“你听。”林见月把耳机分给你一边，反复调回同一个两秒片段。有人刚说出“我其实”，声音就被关门声截断。她没有让剪辑替那个人说完后半句。

`l01.r1.body.001`

**林见月**：耳机没坏。你听这里。

`l01.r1.body.002`

**旁白**：她递过一边耳机。脚步声里，一个陌生人说了句“我其实”，后半句被关门声盖住了。

`l01.r1.body.003`

**林见月**：我想留着，可录音里那个人还没同意公开。我连这两秒要不要放，都没决定。

`l01.r1.body.004`

**旁白**：她把“先问本人”又在备注里敲了一遍，才把屏幕转向你：两秒钟够短了，我还是怕剪错一个人的意思。你觉得要不要等？

`l01.r1.body.005`

### 条件正文 · l01.r1.block.001

条件：`{"eq":["private_photo","two_people_only"]}`

**林见月**：你收到那张了吗？我自己也留了一份。

`l01.r1.block.001.001`

### 条件正文 · l01.r1.block.002

条件：`{"eq":["private_photo","not_taken"]}`

**林见月**：相机收了。今天只用耳朵。

`l01.r1.block.002.001`

### 条件正文 · l01.r1.block.003

条件：`{"all":[{"eq":["opening_date_l","attended"]},{"eq":["opening_access_l","private"]}]}`

**林见月**：那次那段看完，你还愿意听，我挺高兴的。

`l01.r1.block.003.001`

### 条件正文 · l01.r1.block.004

条件：`{"all":[{"eq":["opening_date_l","attended"]},{"eq":["opening_access_l","ordinary"]}]}`

**林见月**：河边太吵，那次没给你听的，这里能听清。

`l01.r1.block.004.001`

### 选择 l01/listen

“先留两秒。我想知道他本来要说什么。”

可选条件：`null`

立即回应：

**林见月**：我也是。

`l01.listen.reply.001`

**旁白**：她把那个剪切点往后挪，不急着配上更好听的音乐。

`l01.listen.reply.002`

**许照**：能找到他说完的版本吗？

`l01.listen.reply.003`

**林见月**：也许能。得先问他愿不愿意。

`l01.listen.reply.004`

**林见月**：我准备先找到那个人问问。等他点头，再拉你来听行吗？

`l01.listen.reply.006`

写入与操作：`[{"op":"set","key":"clip_l","value":"listen"}]`

后继：`完成本次私人日程`

### 选择 l01/honest

“我没太听懂。你再放一遍，告诉我你在听哪里。”

可选条件：`null`

立即回应：

**旁白**：她没有露出失望，反而把进度条拖回开头。

`l01.honest.reply.001`

**林见月**：这里。不是叹气，是一句话快出来的时候。

`l01.honest.reply.002`

**旁白**：你听第二遍终于听见了一点，又不确定。她笑着把自己的判断也说轻了一些。

`l01.honest.reply.003`

**林见月**：其实我也在猜。剪进去之前，会去问。

`l01.honest.reply.004`

写入与操作：`[{"op":"set","key":"clip_l","value":"honest"}]`

后继：`完成本次私人日程`

### 选择 l01/endcard

“先别只替他留下声音。片尾写你名字的地方，给我看看。”

可选条件：`null`

立即回应：

**旁白**：她的手指停住，像差点听成一句熟练的恭维。

`l01.endcard.reply.001`

**许照**：我想知道以后在哪儿能看到你的片子。

`l01.endcard.reply.002`

**林见月**：现在还没做完。

`l01.endcard.reply.003`

**许照**：那我先记名字。

`l01.endcard.reply.004`

**旁白**：她把临时片尾给你看了一眼，名字小得几乎看不见。

`l01.endcard.reply.005`

**林见月**：……也许可以大一点。不是因为你说，是我一直没敢。

`l01.endcard.reply.006`

写入与操作：`[{"op":"set","key":"clip_l","value":"name"}]`

后继：`完成本次私人日程`


---

## l02｜这封申请，她写给自己

类型：`personal`。元数据：`{"background":"projection","music":"travel","character":"l","stage":2,"minSlot":2,"next":"SPARK_l"}`

### 正文

**旁白**：林见月把一封项目申请邮件转到你手机上，只给你看自己的那段自述。发送时间还空着。

`l02.r4.body.001`

**林见月**：帮我听听，这两句像不像套话？

`l02.r4.body.002`

**旁白**：她念到“我想独立拍摄”，又删掉了“独立”。

`l02.r4.body.003`

**许照**：为什么删？

`l02.r4.body.004`

**林见月**：我每次说要离开，总有人恰好有一份片子等我剪。昨天陆景行还问我能不能帮忙出个预告。他没逼我，是我总说“没问题”。

`l02.r4.body.005`

**许照**：也包括陆景行？

`l02.r4.body.006`

**林见月**：嗯。我以前总先答应他。但现在的问题是，谁来问我，我都说“再挤挤时间”。

`l02.r4.body.007`

### 条件正文 · l02.variant.001

条件：`{"eq":["anchor_A4",true]}`

**旁白**：第一轮截止日期已经过了。她打开的是补充材料或下一季草稿，邮件上保留着原来的日期。

`l02.variant.001.001`

### 条件正文 · l02.variant.002

条件：`{"ne":["anchor_A4",true]}`



### 条件正文 · l02.variant.006

条件：`{"eq":["clip_l","listen"]}`

**林见月**：上次你听完才问，我挺愿意继续讲。

`l02.variant.006.001`

### 条件正文 · l02.variant.007

条件：`{"eq":["clip_l","honest"]}`

**林见月**：你说没听懂的那两秒，我后来也重听了。现在没听明白，也可以直说。

`l02.variant.007.001`

### 条件正文 · l02.variant.008

条件：`{"eq":["clip_l","name"]}`

**林见月**：上次你看了片尾的名字，我有点意外。后来检查的时候，我也没有再把自己写得那么小。

`l02.variant.008.001`

### 条件正文 · l02.r1.block.006

条件：`{"eq":["knows_foreknowledge_claim_l",true]}`

**林见月**：你说书里写过我的以后。但这封申请，今天先听我自己怎么写。

`l02.r1.block.006.001`

### 选择 l02/ask

“先不管别人，你自己想去吗？”

可选条件：`null`

立即回应：

**许照**：先不管谁找你。你自己想去吗？

`l02.ask.r4.reply.001`

**旁白**：她看着屏幕，慢慢点了头。

`l02.ask.r4.reply.002`

**林见月**：想。想跟一群不认识的人，拍个不是演出的片子。

`l02.ask.r4.reply.003`

**许照**：那就把刚才这句话写上。

`l02.ask.r4.reply.004`

**旁白**：她笑了，重新敲下“独立拍摄”，把邮件读了第二遍。

`l02.ask.r4.reply.005`

写入与操作：`[{"op":"set","key":"reciprocal_l","value":true},{"op":"set","key":"mail_l","value":"own"},{"op":"set","key":"trust_l","value":"steady"}]`

后继：`SPARK_l`

### 选择 l02/miss

“我会舍不得，也想听你讲拍到了什么。”

可选条件：`null`

立即回应：

**许照**：你真出去那么久，我会舍不得。不过也想听你讲拍到了什么。

`l02.miss.r4.reply.001`

**林见月**：我以为你也要开始劝我了。

`l02.miss.r4.reply.002`

**许照**：今天先不劝。邮件不是还没写完吗？

`l02.miss.r4.reply.003`

**旁白**：她重新打开草稿，念到“我想”时没有再删。

`l02.miss.r4.reply.004`

**林见月**：那再帮我听一遍。念完我们去买点喝的。

`l02.miss.r4.reply.005`

写入与操作：`[{"op":"set","key":"reciprocal_l","value":true},{"op":"set","key":"mail_l","value":"honest_miss"},{"op":"set","key":"trust_l","value":"steady"}]`

后继：`SPARK_l`

### 选择 l02/rival

“陆景行又不会选你。走吧，别再傻等。”

可选条件：`null`

立即回应：

**旁白**：她把电脑轻轻合上。

`l02.rival.reply.001`

**林见月**：你可以不喜欢他。但我告诉你自己的事，不是请你替我贬低别人。

`l02.rival.reply.002`

**许照**：我只是觉得你值得——

`l02.rival.reply.003`

**林见月**：值得什么，让我自己想。我去不去，也不是为了证明他会不会选我。

`l02.rival.reply.004`

**旁白**：今天的聊天停在这里。她把没写完的邮件保存好，说改天再谈。

`l02.rival.reply.005`

写入与操作：`[{"op":"set","key":"reciprocal_l","value":false},{"op":"set","key":"mail_l","value":"rival"},{"op":"set","key":"pending_l","value":true},{"op":"set","key":"trust_l","value":"guarded"}]`

后继：`SPARK_l`


---

## l03｜不借旧友的名义

类型：`personal`。元数据：`{"background":"projection","music":"travel","decisionSteps":[{"id":"date","label":"认真靠近见月，也讲清与别人之间的边界","options":["open","exclusive"],"reply":[{"speaker":"L","text":"我不想再被谁的旧故事安排位置。你要说喜欢，就说自己的决定。","id":"l03.v413.date.reply.001","textHash":"7967b8dc3cf85ee1"}],"after":[{"speaker":"N","text":"见月关掉投影，只留下你们两个的声音。","id":"l03.v413.date.after.001","textHash":"c2d96fb820023f5d"}]},{"id":"slow","label":"先留出空间，别用恋爱替她证明价值","options":["wait","friend","decline"],"reply":[{"speaker":"L","text":"可以。我拍片子不用谁批准，喜欢人也不必赶截止日期。","id":"l03.v413.slow.reply.001","textHash":"b5bbd5e20551c952"}],"after":[{"speaker":"N","text":"她从背包里拿出一张没交的分镜纸，等你给出诚实的距离。","id":"l03.v413.slow.after.001","textHash":"15ddbcfc52dcb5c5"}]}],"character":"l","stage":3,"minSlot":5}`

### 正文

**旁白**：放映室只剩你们。见月把工作用的耳机收好，坐在离你一张椅子的地方。

`l03.body.001`

**林见月**：陆景行下午问我，最近怎么总提到你。

`l03.body.002`

**旁白**：你没急着问他有没有吃醋，她自己接着说了。

`l03.body.003`

**林见月**：我说，最近确实在认真认识一个人。他问我，我就照实说了。

`l03.body.004`

**旁白**：她看着你，有一点紧张，也手指一直在转那只镜头盖。

`l03.body.005`

**林见月**：我喜欢过陆景行。这事瞒着你不公平。我们没在一起过，我也不打算拿你跟他比。现在我想和你试试，这句话是我自己想说的。

`l03.body.006`

### 条件正文 · l03.variant.001

条件：`{"all":[{"eq":["pending_l",true]},{"chosen":["l02","rival"]}]}`

**林见月**：不过上次那句“别傻等”，我还没过去。今天我能和你谈，但暂时不能答应恋爱。

`l03.variant.001.001`

### 条件正文 · l03.variant.002

条件：`{"eq":["mail_l","own"]}`

**林见月**：你问我想不想去，而不是先告诉我应该去。我记得那个区别。

`l03.variant.002.001`

### 条件正文 · l03.variant.003

条件：`{"eq":["mail_l","honest_miss"]}`

**林见月**：你说舍不得，我没有当成阻拦。你后来也真的留了让我决定的空间。

`l03.variant.003.001`

### 条件正文 · l03.variant.004

条件：`{"eq":["mail_l","rival"]}`

**林见月**：上次把陆景行拉进来比较，我不喜欢。我的选择不是用来判断你们谁更值得。

`l03.variant.004.001`

### 条件正文 · l03.variant.007

条件：`{"eq":["trust_l","steady"]}`

**旁白**：见月没有再急着解释自己。你停下来，她也肯跟着安静一会儿。

`l03.variant.007.001`

### 条件正文 · l03.variant.008

条件：`{"eq":["trust_l","guarded"]}`

**旁白**：见月听到拿不准的地方，仍然会问一句：“这个你是怎么知道的？”

`l03.variant.008.001`

### 条件正文 · l03.r2.other_issue

条件：`{"all":[{"eq":["opening_lie_l",true]},{"not":{"chosen":["l02","rival"]}}]}`

**林见月**：阿衡那件事还没说清。今天可以见面，但我不会当作已经没事，更不会先答应恋爱。

`l03.unresolved_source.0`

### 条件正文 · l03.r4.block.008

条件：`{"all":[{"any":[{"chosen":["SPARK_l","bold"]},{"chosen":["SPARK_l","tease"]}]},{"canDate":"l"}]}`

**林见月**：我说想在镜头外见你，不是给新片找素材。今天也一样。

`l03.early_callback.0`

### 选择 l03/open

“我想认真约你。有其他约会会直说，现在不承诺只和一个人。”

可选条件：`{"canDate":"l"}`

立即回应：

**许照**：我想认真约你，但不能先承诺只认识你一个人。

`l03.open.reply.001`

**旁白**：你把目前实际在约会的人说清；没有别人，就如实说没有。

`l03.open.reply.002`

**旁白**：见月想了很久，没有为了维持气氛立刻点头。

`l03.open.reply.003`

**林见月**：我更习惯一次认识一个人。不过我愿意先看清这次是什么，不急着替以后下结论。

`l03.open.reply.004`

**许照**：你不舒服可以说。

`l03.open.reply.005`

**林见月**：会说。别人是谁、关系到哪里，也请你不要让我猜。

`l03.open.reply.006`

**旁白**：她把中间那张空椅子推开了一点。她把下一次见面的时间念了一遍，问你是否有空。

`l03.open.reply.007`

写入与操作：`[{"op":"set","key":"active_l","value":true},{"op":"set","key":"scope_l","value":"open"},{"op":"set","key":"pursued_l","value":true},{"op":"disclose","character":"l"},{"op":"set","key":"commitment_l","value":"dating"},{"op":"set","key":"interest_l","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 l03/exclusive

“我想只和你交往。”

可选条件：`{"canDate":"l"}`

立即回应：

**许照**：我想只和你交往，不拿你和任何人比较。

`l03.exclusive.reply.001`

**林见月**：那我也想试试。

`l03.exclusive.reply.002`

**旁白**：她说完先笑了一下，像终于把一句关于自己的决定念出来。

`l03.exclusive.reply.003`

**林见月**：以后我提起过去，不代表让你和过去比赛。你也别一直怕输。

`l03.exclusive.reply.004`

**旁白**：你们坐得更近，投影灯已经关了，谁都没有催对方离开。

`l03.exclusive.reply.005`

写入与操作：`[{"op":"set","key":"active_l","value":true},{"op":"set","key":"scope_l","value":"exclusive"},{"op":"set","key":"pursued_l","value":true},{"op":"set","key":"promised_l","value":true},{"op":"set","key":"commitment_l","value":"relationship"},{"op":"set","key":"interest_l","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 l03/wait

“喜欢你，但我想慢一点。”

可选条件：`null`

立即回应：

**许照**：有喜欢。但我想慢一点。

`l03.wait.r2.reply.001`

**林见月**：那今天到这里。等你愿意再问，我也会重新想。

`l03.wait.r2.reply.002`

**旁白**：她把另一边耳机递来，转开脸之前，轻轻笑了笑。

`l03.wait.r2.reply.003`

写入与操作：`[{"op":"set","key":"active_l","value":false},{"op":"set","key":"scope_l","value":"waiting"},{"op":"set","key":"pursued_l","value":true},{"op":"set","key":"commitment_l","value":"none"},{"op":"set","key":"interest_l","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 l03/friend

“先做朋友，好吗？”

可选条件：`null`

立即回应：

**许照**：我想先以朋友的身份认识你。

`l03.friend.reply.001`

**旁白**：她点头，把刚刚有些绷紧的肩膀放下来。

`l03.friend.reply.002`

**林见月**：可以。那我也不用每一句都想，你会不会误会。

`l03.friend.reply.003`

**旁白**：她问起你读过的一本很糟糕的小说，你们竟然因此聊了很久。

`l03.friend.reply.004`

写入与操作：`[{"op":"set","key":"active_l","value":false},{"op":"set","key":"scope_l","value":"friend"},{"op":"set","key":"pursued_l","value":false},{"op":"set","key":"commitment_l","value":"none"},{"op":"set","key":"interest_l","value":"platonic"}]`

后继：`完成本次私人日程`

### 选择 l03/decline

“今晚先不开始恋爱，以后再说。”

可选条件：`null`

立即回应：

**林见月**：好。我也再想想，不催你。

`.scenes.l03.choices.4.reply.0`

写入与操作：`[{"op":"set","key":"active_l","value":false},{"op":"set","key":"scope_l","value":"declined"},{"op":"set","key":"pursued_l","value":true},{"op":"set","key":"commitment_l","value":"none"},{"op":"set","key":"interest_l","value":"uncertain"}]`

后继：`完成本次私人日程`


---

## l04｜今天轮到你入镜

类型：`personal`。元数据：`{"background":"river","music":"travel","character":"l","stage":4,"minSlot":9,"next":"l05","outingFollowup":"l05"}`

### 正文

**旁白**：见月带了一台很小的相机，问你愿不愿意帮她录一次对焦测试。

`l04.body.001`

**许照**：要站得很正式吗？

`l04.body.002`

**林见月**：不用。你刚才低头找零钱的样子就挺好。

`l04.body.003`

**旁白**：你想起原著里的男主总有一个恰到好处的侧脸。你刚才却差点把硬币滚进下水道。

`l04.body.004`

**林见月**：看镜头会紧张？

`l04.body.005`

**旁白**：她已经把红色录制灯关掉，等你回答。

`l04.body.006`

**林见月**：不想拍也行。今天不是谁欠我素材。

`l04.body.007`

### 条件正文 · l03.variant.005

条件：`{"eq":["met_promise","l_listen"]}`

**林见月**：上次你愿意把那段听完，我挺高兴。今天不用准备一个很专业的评论。

`l03.variant.005.001`

### 条件正文 · l03.variant.006

条件：`{"eq":["met_promise","l_silence"]}`

**林见月**：上次能不说话地坐一会儿，我记得。这次想问什么也可以问。

`l03.variant.006.001`

### 选择 l04/plain

“拍普通一点吧。不要把我剪成突然很厉害的人。”

可选条件：`null`

立即回应：

**林见月**：我还没学会那个技术。

`l04.plain.reply.001`

**许照**：那正好。

`l04.plain.reply.002`

**旁白**：你们在斑马线前等了两次红灯，她只拍你把零钱装好、顺手给路人让了一下路。

`l04.plain.reply.003`

**林见月**：这些不是没用的镜头。

`l04.plain.reply.004`

**许照**：看起来没发生什么。

`l04.plain.reply.005`

**林见月**：前面全是赶路，这里留一小段停下来的画面，节奏会舒服点。

`l04.plain.reply.006`

写入与操作：`[{"op":"set","key":"camera_l","value":"ordinary"},{"op":"set","key":"photo_player_l","value":true}]`

后继：`l05`

### 选择 l04/swap

“换我拍你一次？你每次都在镜头后面。”

可选条件：`null`

立即回应：

**旁白**：她把相机交给你，先教你哪一个按钮不用碰。

`l04.swap.reply.001`

**林见月**：不要一边拍一边让我笑。

`l04.swap.reply.002`

**许照**：那你可以不笑。

`l04.swap.reply.003`

**旁白**：她反而笑了一下。你没完全对好焦，画面有点糊。

`l04.swap.reply.004`

**林见月**：留着吧。第一次很正常。

`l04.swap.reply.005`

**旁白**：后来她把这段放进私人的文件夹，没有擅自上传。你凑过去看，画面里她笑起来的时候，确实是糊的。

`l04.swap.reply.006`

写入与操作：`[{"op":"set","key":"camera_l","value":"swap"},{"op":"set","key":"photo_heroine_l","value":true}]`

后继：`l05`

### 选择 l04/no

“今天不太想被拍。能一起走走吗？”

可选条件：`null`

立即回应：

**林见月**：能。

`l04.no.reply.001`

**旁白**：她把相机收回包里，没有问是不是不信任她。

`l04.no.reply.002`

**许照**：你特地带来的。

`l04.no.reply.003`

**林见月**：带来不代表必须完成。我们又不是来交作业的。

`l04.no.reply.004`

**旁白**：你们沿河走了一段，她用手比出一个镜头，笑着说这一幕不录。你终于没再担心自己的脸有没有准备好。

`l04.no.reply.005`

写入与操作：`[{"op":"set","key":"camera_l","value":"unrecorded"}]`

后继：`l05`


---

## l05｜雨停以前

类型：`personal`。元数据：`{"background":"corridor","music":"travel","character":"l","stage":5,"minSlot":9}`

### 正文

**旁白**：雨突然大起来。见月把相机裹进外套，你们跑到艺术中心门廊下，肩头全湿了。

`l05.r4.body.001`

**林见月**：早知道刚才就该进来。你头发也在滴水。

`l05.r4.body.002`

**旁白**：她从包里翻出纸巾，抽一张递给你，自己忙着擦相机包。

`l05.r4.body.003`

**许照**：先擦你自己，包都比你干了。

`l05.r4.body.004`

**旁白**：她抬头看你，这才笑了一下。

`l05.r4.body.005`

### 条件正文 · l05.variant.001

条件：`{"ne":["active_l",true]}`

**旁白**：你们还没开始约会。你把湿外套拎到一边，给她腾出檐下不漏雨的位置。

`l05.variant.001.001`

### 选择 l05/yes

“我现在有点想亲你，可以吗？”

可选条件：`{"all":[{"eq":["active_l",true]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]}]}`

立即回应：

**许照**：现在有点想亲你。可以吗？

`l05.yes.r4.reply.001`

**旁白**：见月愣了一下，点头，把相机包放稳。

`l05.yes.r4.reply.002`

**林见月**：可以。等一下……我刚才有点紧张。

`l05.yes.r4.reply.003`

**旁白**：你没有急着靠近。她先握住你的手，又往前挪了一点。

`l05.yes.r4.reply.004`

**旁白**：那个吻很短，分开以后她还没松手。

`l05.yes.r4.reply.005`

**林见月**：现在更紧张了。你先别笑。

`l05.yes.r4.reply.006`

写入与操作：`[{"op":"set","key":"pace_l","value":"kiss"},{"op":"set","key":"kissed_l","value":true},{"op":"set","key":"private_reward_l","value":true}]`

后继：`完成本次私人日程`

### 选择 l05/slow

“先牵手吧。我也想靠近，只是有点慢。”

可选条件：`{"all":[{"eq":["active_l",true]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]}]}`

立即回应：

**旁白**：她把手放到你掌心，低头看了一眼。

`l05.slow.r2.reply.001`

**林见月**：这样也挺好。我刚才紧张得，都忘了把相机包拿稳。

`l05.slow.r2.reply.002`

**旁白**：你替她托了一下包，手没有松开。她把笑藏进了领口。

`l05.slow.r2.reply.003`

写入与操作：`[{"op":"set","key":"pace_l","value":"slow"},{"op":"set","key":"private_reward_l","value":true}]`

后继：`完成本次私人日程`

### 选择 l05/space

“先擦雨就好。我现在有一点不自在。”

可选条件：`null`

立即回应：

**林见月**：好，我停。

`l05.space.r2.reply.001`

**旁白**：她递来纸巾，自己也擦了一把雨水。

`l05.space.r2.reply.002`

**林见月**：那先比谁擦得狼狈。你赢了。

`l05.space.r2.reply.003`

**旁白**：你笑了。两个人站回干一点的位置，等雨小些。

`l05.space.r2.reply.004`

写入与操作：`[{"op":"set","key":"pace_l","value":"space"},{"op":"set","key":"private_reward_l","value":true}]`

后继：`完成本次私人日程`

### 选择 l05/ordinary

接过纸巾，和她一起等雨小些

可选条件：`{"ne":["active_l",true]}`

立即回应：

**旁白**：你接过纸巾，自己擦干头发。见月把相机收好，你们各靠着一侧墙等雨变小。

`l05.ordinary.r4.reply.001`

**林见月**：回去慢一点。这台阶湿了特别滑。

`l05.ordinary.r4.reply.002`

写入与操作：`[{"op":"set","key":"pace_l","value":"ordinary"},{"op":"set","key":"private_reward_l","value":true}]`

后继：`完成本次私人日程`


---

## l06｜旧友打来一通工作电话

类型：`personal`。元数据：`{"background":"diner","music":"travel","character":"l","stage":6,"minSlot":11,"next":"@personalRelationshipCheck","outingFollowup":"l07"}`

### 正文

**旁白**：你们正分一块酸得皱眉的甜点，陆景行打来电话。见月看了一眼，跟你说了声。

`l06.r4.body.001`

**林见月**：我接一下，他可能在问明天的工作。

`l06.r4.body.002`

**旁白**：电话里，他想请她临时剪一段预告。见月说今晚排不开，让他把要求发到项目群，再找有空的剪辑师。

`l06.r4.body.003`

**林见月**：好了。你刚才怎么不说话？

`l06.r4.body.004`

### 条件正文 · l06.variant.001

条件：`{"eq":["pace_l","kiss"]}`

**旁白**：那次亲吻让见月再看你时有一点不同，她却没有因此回避今天想问的事。

`l06.variant.001.001`

### 条件正文 · l06.variant.002

条件：`{"eq":["pace_l","slow"]}`

**林见月**：上次你说慢一点，我没有误会。今天聊这些，也不需要你装得特别熟练。

`l06.variant.002.001`

### 条件正文 · l06.variant.003

条件：`{"eq":["pace_l","space"]}`

**林见月**：我记得你那次想保留一点距离。能说出来就好，不必一直替我猜会不会失望。

`l06.variant.003.001`

### 选择 l06/jealous

“有点吃醋，刚才怕你一接电话就走。”

可选条件：`null`

立即回应：

**许照**：有点吃醋。他一打来，我就忍不住猜你会不会马上走。

`l06.jealous.r4.reply.001`

**林见月**：刚才应该先告诉你，我只接工作电话。

`l06.jealous.r4.reply.002`

**许照**：不是让你不接。我就是有点在意。

`l06.jealous.r4.reply.003`

**林见月**：嗯。可今天约好吃东西的是我们，我不会一声不响跑掉。

`l06.jealous.r4.reply.004`

**旁白**：她把手机放回包里，重新拿起勺子：“先解决这块太酸的吧。”

`l06.jealous.r4.reply.005`

写入与操作：`[{"op":"set","key":"lu_l","value":"honest"}]`

后继：`@personalRelationshipCheck`

### 选择 l06/ask

“你刚才拒绝替他做什么？我想听你怎么决定的。”

可选条件：`null`

立即回应：

**林见月**：他习惯我有空。我今天确实没空，也不想装作有。

`l06.ask.reply.001`

**许照**：因为我们已经约好了今天一起吃东西？

`l06.ask.reply.002`

**林见月**：因为我已经安排了自己的时间。我今晚不想临时加一份活。

`l06.ask.reply.003`

**旁白**：她低头改了日程，把原来替别人预留的那一行擦掉。你没有催她说更多。

`l06.ask.reply.004`

**旁白**：她把最酸的那块推到你面前。

`l06.ask.reply.005`

**林见月**：现在继续说甜点。是你选的，别偷偷换我的。

`l06.ask.reply.006`

写入与操作：`[{"op":"set","key":"lu_l","value":"own"}]`

后继：`@personalRelationshipCheck`

### 选择 l06/ban

“以后别接他的电话了。不然我怎么相信你？”

可选条件：`null`

立即回应：

**旁白**：她没有继续吃，先把手机放在桌面上。

`l06.ban.reply.001`

**林见月**：我可以说明关系，也可以调整工作联系。但不能靠你规定我和谁说话，证明我喜欢你。

`l06.ban.reply.002`

**许照**：我只是担心。

`l06.ban.reply.003`

**林见月**：我知道。可现在这样说，我也会担心。

`l06.ban.reply.004`

**旁白**：你们没在店里争下去。回去时她没再挽留，只说这件事得另找时间讲清楚。

`l06.ban.reply.005`

写入与操作：`[{"op":"set","key":"lu_l","value":"control"},{"op":"set","key":"value_conflict_l","value":true}]`

后继：`@personalRelationshipCheck`


---

## l07｜片子里为什么没有你

类型：`personal`。元数据：`{"background":"projection","music":"travel","character":"l","stage":7,"minSlot":11}`

### 正文

**旁白**：见月的新片里有路灯、末班车，还有陆景行跟工作人员讨论舞台的背影。你没有出现在这一版里。

`l07.r4.body.001`

**林见月**：这一版按拍摄那天剪的。你当时不在，所以没有你的镜头。

`l07.r4.body.002`

**许照**：哦。

`l07.r4.body.003`

**旁白**：你答得有点快，她按住暂停键。

`l07.r4.body.004`

**林见月**：想说什么？先说了再看也行。

`l07.r4.body.005`

### 条件正文 · l07.variant.001

条件：`{"eq":["lu_l","honest"]}`

**林见月**：刚才你承认吃醋，又没有替我决定该不该见谁。这样我能知道你真正不安什么。

`l07.variant.001.001`

### 条件正文 · l07.variant.002

条件：`{"eq":["lu_l","own"]}`

**林见月**：你说让我自己处理旧关系，我后来认真想了。不是把问题丢给我，是我的那一部分确实该由我说。

`l07.variant.002.001`

### 条件正文 · l07.variant.003

条件：`{"eq":["lu_l","control"]}`

**林见月**：刚才你要求我不见他，问题还在。今天也不能把同样的要求换成片子里的剪辑。

`l07.variant.003.001`

### 条件正文 · l07.variant.004

条件：`{"eq":["cut_l","bounded"]}`

**林见月**：那次连声音都没用，我不后悔。今天也不想把不同意解释成同意一点点。

`l07.variant.004.001`

### 条件正文 · l07.variant.005

条件：`{"eq":["cut_l","shared"]}`

**林见月**：那天你只整理我标过的部分，我后来才知道自己能放心到哪一步。

`l07.variant.005.001`

### 条件正文 · l07.variant.006

条件：`{"eq":["cut_l","heard"]}`

**林见月**：上次把害怕说清以后，我反而能决定。今天也想这样讲。

`l07.variant.006.001`

### 条件正文 · l07.r2.question_just_deferred

条件：`{"eq":["relation_answer_l","deferred"]}`

**林见月**：刚才那个问题，我记着。今天这件事先做完。

`l07.r2.question_just_deferred.001`

### 选择 l07/film

“那我们就按片子聊。第一个停顿，我有点没跟上。”

可选条件：`null`

立即回应：

**旁白**：她把进度条拖回去，没有因为你不谈感情而失落。

`l07.film.reply.001`

**林见月**：这里我故意留长，可能太长了。

`l07.film.reply.002`

**许照**：我不是说要删。再让我听一次。

`l07.film.reply.003`

**旁白**：你们谈了一小时，意见并不都一样。她留下两条建议，也明确没用另一条。

`l07.film.reply.004`

**旁白**：她在你没赞成的那个停顿上标了“再试”，没直接删掉。

`l07.film.reply.005`

写入与操作：`[{"op":"set","key":"film_l","value":"work"}]`

后继：`完成本次私人日程`

### 选择 l07/private

“片子不用放我。以后我们能拍一段只给彼此看的吗？”

可选条件：`null`

立即回应：

**林见月**：能。但我可能拍到你打哈欠。

`l07.private.reply.001`

**许照**：可以，我也会拍糊。

`l07.private.reply.002`

**旁白**：她把项目关掉，拿手机拍了桌上两杯快喝完的水。

`l07.private.reply.003`

**林见月**：那从这种没什么用的东西开始。

`l07.private.reply.004`

**旁白**：她把照片发给你，文件名很随意，叫“今天的水”。

`l07.private.reply.005`

写入与操作：`[{"op":"set","key":"film_l","value":"private"}]`

后继：`完成本次私人日程`

### 选择 l07/demand

“看见他在、我却不在，有点吃醋。不是让你删。”

可选条件：`null`

立即回应：

**林见月**：他在那天的画面里，是因为他那天在场。不是在排谁重要。

`l07.demand.r2.reply.001`

**旁白**：见月放下相机，盯着你看了一会儿。

`l07.demand.r2.reply.002`

**林见月**：不过你想跟我留一段自己的，可以直接问。

`l07.demand.r2.reply.003`

**许照**：现在问还来得及吗？

`l07.demand.r2.reply.004`

**林见月**：来得及。先把你那张装大方的脸收起来。

`l07.demand.r2.reply.005`

写入与操作：`[{"op":"set","key":"film_l","value":"jealous"}]`

后继：`完成本次私人日程`

### 选择 l07/control

“把他删掉，换成我。”

可选条件：`null`

立即回应：

**旁白**：见月按下暂停，没有再递来耳机。

`.scenes.l07.choices.3.reply.0`

**林见月**：你能说吃醋。不能拿我的片子换你放心。今天先不看了。

`.scenes.l07.choices.3.reply.1`

写入与操作：`[{"op":"set","key":"film_l","value":"rank"},{"op":"set","key":"value_conflict_l","value":true}]`

后继：`完成本次私人日程`


---

## l08｜两座城不是两种心意

类型：`personal`。元数据：`{"background":"projection","music":"travel","character":"l","stage":8,"minSlot":14,"next":"l09","outingFollowup":"l09"}`

### 正文

**旁白**：见月把接下来的计划写在纸上。可能是一段外出拍摄，也可能是留在海岚完成自己的项目，她都不想再只说“看大家安排”。

`l08.body.001`

**林见月**：我想先把生活说清，再谈我们能怎么见面。

`l08.body.002`

**旁白**：原著里，她经常把自己的计划擦掉，给别人的临时需要让路。这一次纸上的字没有先被她划去。

`l08.body.003`

**林见月**：你最怕什么？

`l08.body.004`

### 条件正文 · l08.variant.001

条件：`{"eq":["film_l","work"]}`

**林见月**：上次你没要求作品证明我们的关系，我松了口气。以后拍什么，仍然可以跟你聊。

`l08.variant.001.001`

### 条件正文 · l08.variant.002

条件：`{"eq":["film_l","private"]}`

**林见月**：你说私人的可以留在私人地方，我后来单独存了一个相册。不是每一张都拿去参赛。

`l08.variant.002.001`

### 条件正文 · l08.variant.003

条件：`{"eq":["film_l","rank"]}`

**林见月**：上次你想用画面里谁更多判断重要性，我不认同。这次出门也不是不想见你，我是想去拍片。

`l08.variant.003.001`

### 选择 l08/specific

“怕联系变成打卡。我们少一点规定，但每周留一段能认真说话的时间。”

可选条件：`null`

立即回应：

**林见月**：好。拍摄日会很乱，临时变动提前讲，不拿没回消息直接判别的。

`l08.specific.reply.001`

**许照**：见面也一起计划，不只让你来。

`l08.specific.reply.002`

**林见月**：这个时间我大多有空。实在拍不完，我提前发消息。

`l08.specific.reply.004`

回应条件：`{"eq":["plan_l","fellowship"]}`（按点击前状态判断）

**旁白**：你帮她补录自述，她带着原来的报名编号补交，新的收件确认亮在屏幕上。

`l08.specific.r2.registered.001`

回应条件：`{"ne":["plan_l","fellowship"]}`（按点击前状态判断）

**旁白**：原项目没有她的预报名。你们改约另一场小放映，现场试好字幕和声音，拿到样片接收确认。

`l08.specific.r2.newscreen.001`

写入与操作：`[{"op":"set","key":"distance_l","value":"practical"},{"op":"lateApplication"}]`

后继：`l09`

### 选择 l08/miss

“我会舍不得，也可能偶尔闹别扭。但不想让你留下来替我止住这点难受。”

可选条件：`null`

立即回应：

**旁白**：她低头笑了，眼睛却有一点红。

`l08.miss.reply.001`

**林见月**：那我也能说，我有时会希望你在旁边？

`l08.miss.reply.002`

**许照**：能。说了我们再想办法。

`l08.miss.reply.003`

**旁白**：她把纸折好放进包里：“那等我回来，我们再来这里走一次？”

`l08.miss.reply.004`

写入与操作：`[{"op":"set","key":"distance_l","value":"honest"}]`

后继：`l09`

### 选择 l08/stay

“我希望你留在我身边。异地我做不到。”

可选条件：`null`

立即回应：

**旁白**：见月把笔放下，安静了一会儿。

`l08.stay.r4.reply.001`

**林见月**：我知道异地很难。但拍摄计划我不想取消。

`l08.stay.r4.reply.002`

**许照**：那我们怎么办？

`l08.stay.r4.reply.003`

**林见月**：得认真想。今天先别逼着谁答应，行吗？

`l08.stay.r4.reply.004`

**旁白**：你没有再劝她改行程。这次谈话没有解决你们的分歧。

`l08.stay.r4.reply.005`

写入与操作：`[{"op":"set","key":"distance_l","value":"refuse"},{"op":"set","key":"value_conflict_l","value":true}]`

后继：`l09`


---

## l09｜今天可以拍得不好

类型：`personal`。元数据：`{"background":"projection","music":"travel","character":"l","stage":9,"minSlot":14}`

### 正文

**旁白**：她第一次把一段失败素材拿给你看。镜头抖、风声大，焦点在要紧的地方跑到了背景。

`l09.body.001`

**林见月**：我拍的时候觉得特别好，回来一看，全是问题。

`l09.body.002`

**许照**：还能补吗？

`l09.body.003`

**林见月**：有些补不了。那人已经回家了。

`l09.body.004`

**旁白**：她说完把相机放远了一点，像暂时不太想看它。

`l09.body.005`

**旁白**：你记得原著里她总能替别人救回一段漂亮的回忆。原来她自己的镜头也会失手。

`l09.body.006`

### 条件正文 · l09.variant.001

条件：`{"eq":["distance_l","practical"]}`

**林见月**：你把什么时候能联系说具体，我比听“随时都在”安心。做不到时提前说就好。

`l09.variant.001.001`

### 条件正文 · l09.variant.002

条件：`{"eq":["distance_l","honest"]}`

**林见月**：你说会想我，我听到了。这句我记着，到了那边也会找时间跟你说话。

`l09.variant.002.001`

### 条件正文 · l09.variant.003

条件：`{"eq":["distance_l","refuse"]}`

**林见月**：刚才你不希望我走，我还在认真想这个分歧。今天看片，不会自动让我们和好。

`l09.variant.003.001`

### 选择 l09/watch

“再看一遍吧。不急着找价值，也可以单纯觉得可惜。”

可选条件：`null`

立即回应：

**旁白**：你们一起看完，确实没突然发现一段天才镜头。

`l09.watch.reply.001`

**林见月**：还是很糟。

`l09.watch.reply.002`

**许照**：嗯。

`l09.watch.reply.003`

**林见月**：谢谢你没夸。我刚才最怕听到“其实这样更真实”。

`l09.watch.reply.005`

**旁白**：她把文件归进原始素材，没有删。明天她会重新带相机出门。

`l09.watch.reply.006`

写入与操作：`[{"op":"set","key":"badfilm_l","value":"honest"}]`

后继：`完成本次私人日程`

### 选择 l09/rest

“今天先收起来。出去走走，不带设备。”

可选条件：`null`

立即回应：

**林见月**：会不会逃避？

`l09.rest.reply.001`

**许照**：一晚上而已。文件也不会连夜嘲笑你。

`l09.rest.reply.002`

**旁白**：她笑了，终于关掉屏幕。

`l09.rest.reply.003`

**旁白**：路过一处很好看的光，她习惯性摸相机，摸了个空。你们停下来多看了一会儿，直到那片光从墙边慢慢移开，才继续走。

`l09.rest.reply.004`

写入与操作：`[{"op":"set","key":"badfilm_l","value":"rest"}]`

后继：`完成本次私人日程`

### 选择 l09/learn

“你愿意教我看哪里失手了吗？不想讲也没关系。”

可选条件：`null`

立即回应：

**旁白**：她点出第一处问题，说到一半自己发现下一次可以怎样做。

`l09.learn.reply.001`

**林见月**：这个我好像知道怎么补了。先别夸，还没试过。

`l09.learn.reply.002`

**许照**：来不及，已经准备谢幕了。

`l09.learn.reply.003`

**旁白**：她拿空镜头盖轻轻敲了一下桌面。她把镜头盖装好，又打开了那段素材，这次先看失焦前的一秒。

`l09.learn.reply.004`

写入与操作：`[{"op":"set","key":"badfilm_l","value":"learn"}]`

后继：`完成本次私人日程`


---

## l10｜她没有替你剪掉沉默

类型：`personal`。元数据：`{"background":"backstage","music":"travel","character":"l","stage":10,"minSlot":16,"next":"l11","outingFollowup":"l11"}`

### 正文

**旁白**：你们再次坐在器材箱旁。见月把耳机递来一边，屏幕上停着那段陌生人的录音。

`l10.r2.body.001`

**林见月**：上次那个人没说完的话，我后来问到了。

`l10.r2.body.002`

**许照**：他说什么？

`l10.r2.body.003`

**林见月**：先不告诉你。

`l10.r2.body.004`

**旁白**：她点开旁边一个名叫“许照”的文件，又飞快关掉。

`l10.r2.body.005`

**许照**：这个能看吗？

`l10.r2.body.006`

**林见月**：不是录像。是我想问你的问题。

`l10.r2.body.007`

### 条件正文 · l10.r2.listen

条件：`{"chosen":["l01","listen"]}`

**林见月**：你当时想留两秒，听听他本来要说什么。我把那两秒留下了。

`l10.r2.listen.001`

### 条件正文 · l10.r2.honest

条件：`{"chosen":["l01","honest"]}`

**林见月**：你当时没听懂，倒肯让我再放一遍。比点头说好的人好玩。

`l10.r2.honest.001`

### 条件正文 · l10.r2.endcard

条件：`{"chosen":["l01","endcard"]}`

**林见月**：你那时还想看片尾我的名字。这次不用找，我把名字放大了。

`l10.r2.endcard.001`

### 条件正文 · l10.r2.watch

条件：`{"chosen":["l09","watch"]}`

**林见月**：那晚你陪我又看一遍，没硬夸。我还没救回那段素材，但不想再藏着它了。

`l10.r2.watch.001`

### 条件正文 · l10.r2.rest

条件：`{"chosen":["l09","rest"]}`

**林见月**：那天没逼着自己改完，我后来真睡了一觉。醒来倒知道该怎么剪了。

`l10.r2.rest.001`

### 条件正文 · l10.r2.learn

条件：`{"chosen":["l09","learn"]}`

**林见月**：你让我讲哪里失手，我边讲边想到了下次怎么拍。今天那几处，我都还记着。

`l10.r2.learn.001`

### 选择 l10/fear

“我怕哪天醒来，这些事全没了。”

可选条件：`null`

立即回应：

**许照**：我有点怕哪天醒来，这些事全没了。你们也不记得我。

`l10.fear.r4.reply.001`

**旁白**：见月看了你一会儿，重新打开“许照”那个文件。

`l10.fear.r4.reply.002`

**林见月**：我可还列了一堆想问你的事。先别急着把自己从明天删掉。

`l10.fear.r4.reply.003`

**许照**：有多少？

`l10.fear.r4.reply.004`

**林见月**：不少。比如你下次为什么又想点最酸的蛋糕。

`l10.fear.r4.reply.005`

写入与操作：`[{"op":"set","key":"last_l","value":"remember"}]`

后继：`l11`

### 选择 l10/love

“我其实很喜欢现在这样。你在，我不用一直猜正确答案。”

可选条件：`null`

立即回应：

**许照**：我很喜欢现在这样。你在，我不用一直猜正确答案。

`l10.love.r2.reply.001`

**林见月**：那我也试一次。

`l10.love.r2.reply.002`

**旁白**：她抬起头，直视着你。先躲开的反而是你。

`l10.love.r2.reply.003`

**林见月**：我想多看你一会儿。这个答案，不用猜。

`l10.love.r2.reply.004`

写入与操作：`[{"op":"set","key":"last_l","value":"ordinary"}]`

后继：`l11`

### 选择 l10/private

“以前的事先不讲。今天先听录音，好吗？”

可选条件：`null`

立即回应：

**许照**：现实里的很多事，我还不太想讲。今天先听那段录音吧。

`l10.private.r4.reply.001`

**林见月**：好。那些问题也不一定今天问。

`l10.private.r4.reply.002`

**旁白**：她把自己的文件收起来，没有收走另一边耳机。

`l10.private.r4.reply.003`

**林见月**：那先听他，这次后半句终于有了。

`l10.private.r4.reply.004`

写入与操作：`[{"op":"set","key":"last_l","value":"private"}]`

后继：`l11`


---

## g01｜顾晚棠说，别把我当老板

类型：`personal`。元数据：`{"background":"terrace","music":"glass","character":"g","stage":1,"minSlot":0}`

### 正文

**旁白**：露台风大。顾晚棠抬头看见你，把旁边的空椅子拉出来：“许照？首演那晚的临时场务，名字没记错吧？”她眼里带笑，却没用上级看临时工的口气。

`g01.r1.body.001`

**顾晚棠**：许照，今晚找蓝标的人。名字没记错吧？

`g01.r1.body.002`

**旁白**：她把手机翻面扣在桌上，背靠栏杆看着你，像是决定给这段谈话留几分钟。

`g01.r1.body.003`

**顾晚棠**：今晚不谈合同。你要还是拿工作汇报开场，这张椅子我可就收回去了。先坐。

`g01.r1.body.004`

### 条件正文 · g01.r1.block.001

条件：`{"eq":["opening_origin_g","truth"]}`

**顾晚棠**：你说的那个故事，我还记着。后面不急着讲，先说眼前的。

`g01.r1.block.001.001`

### 条件正文 · g01.r1.block.002

条件：`{"eq":["opening_date_g","attended"]}`

**顾晚棠**：面没吃够？这儿只有水，别说我招待不周。

`g01.r1.block.002.001`

### 条件正文 · g01.r1.block.003

条件：`{"eq":["opening_date_g","deferred"]}`

**顾晚棠**：没去面馆，倒在这儿碰上。那先坐两分钟？

`g01.r1.block.003.001`

### 条件正文 · g01.r1.block.004

条件：`{"eq":["opening_resolution_g","doubled"]}`

**顾晚棠**：阿衡那件事还没说清。工作可以说，私人问题先别绕着问。

`g01.r1.block.004.001`

### 选择 g01/trade

“我想查清责任，免得最后全写到我头上。”

可选条件：`null`

立即回应：

**许照**：我想弄清今晚的责任，免得最后又全写到我头上。你也不想宣传稿冒用你的意见吧？

`g01.trade.r4.reply.001`

**顾晚棠**：这倒是两件能一起查的事。

`g01.trade.r4.reply.002`

**旁白**：你说清自己看见的换盘过程，她翻出一行已经可以公开的邮件。

`g01.trade.r4.reply.003`

**顾晚棠**：先从这里查。其他材料等我核完，不能整本给你。

`g01.trade.r4.reply.004`

**许照**：行，我也只说亲眼见过的。

`g01.trade.r4.reply.005`

写入与操作：`[{"op":"set","key":"first_g","value":"trade"}]`

后继：`完成本次私人日程`

### 选择 g01/person

“想聊点私事，可又有点怕你。”

可选条件：`null`

立即回应：

**许照**：想聊点工作以外的。不过你一站过来，我突然想起场务工资还没结。

`g01.person.r4.reply.001`

**顾晚棠**：我看起来像专门来扣你钱的？

`g01.person.r4.reply.002`

**许照**：像一句话就能决定结不结的。

`g01.person.r4.reply.003`

**旁白**：她被逗笑，伸手把空椅子拉出来。

`g01.person.r4.reply.004`

**顾晚棠**：先坐吧。工资我不管，但谁拖着不给，我可以帮你问一句。别当成约会优惠券。

`g01.person.r4.reply.005`

写入与操作：`[{"op":"set","key":"first_g","value":"person"}]`

后继：`完成本次私人日程`

### 选择 g01/flirt

“有点想认识你。不敢全包装成公事。”

可选条件：`null`

立即回应：

**顾晚棠**：你每次求合作，都先这么说？

`g01.flirt.reply.001`

**许照**：没有。这次才临时想的。

`g01.flirt.reply.002`

**旁白**：她的笑明显了一点，却没立刻靠近。

`g01.flirt.reply.003`

**顾晚棠**：临时想的，就别装得很熟。先坐下，说说你到底知道了哪一件。

`g01.flirt.reply.004`

**旁白**：她等你坐稳，才问你刚才为什么想来露台。

`g01.flirt.reply.005`

写入与操作：`[{"op":"set","key":"first_g","value":"flirt"}]`

后继：`完成本次私人日程`


---

## g02｜先把条件谈清楚

类型：`personal`。元数据：`{"background":"terrace","music":"glass","character":"g","stage":2,"minSlot":2,"next":"SPARK_g"}`

### 正文

**旁白**：顾晚棠递来一份准许公开的邮件，打印纸还热着。项目明明要求保留独立夜场，宣传口径却把删改算成她的意思。

`g02.r4.body.001`

**顾晚棠**：这一页能拿去核对。其他材料还没获准，不能一起传。

`g02.r4.body.002`

**旁白**：她又给你一份现场协作草案：各自说明自己做过的事，工时照实结算。

`g02.r4.body.003`

**顾晚棠**：慢慢看完再签，不急这一分钟。我能接受你谈条件，不能接受你替没做过的事背锅。

`g02.r4.body.004`

### 条件正文 · g02.r1.block.001

条件：`{"eq":["knows_foreknowledge_claim_g",true]}`

**顾晚棠**：故事里怎么写先放下。今天给你看的，才是我确实同意过的部分。

`g02.r1.block.001.001`

### 选择 g02/fair

“各自只负责知道的部分。钱照实算，不替彼此编证词。”

可选条件：`null`

立即回应：

**旁白**：她拿笔改掉一个含混的用词，把改动给你看。

`g02.fair.reply.001`

**顾晚棠**：这样可以。我愿意签。

`g02.fair.reply.002`

**许照**：我也愿意。

`g02.fair.reply.003`

**旁白**：你们把事情谈得很具体，反而不用一直防着对方。

`g02.fair.reply.004`

**顾晚棠**：谈完了，现在能换个话题？

`g02.fair.reply.005`

**许照**：什么？

`g02.fair.reply.006`

**顾晚棠**：你中午吃的什么。别又准备答一个能帮我的问题。

`g02.fair.reply.007`

写入与操作：`[{"op":"set","key":"reciprocal_g","value":true},{"op":"set","key":"deal_g","value":"fair"},{"op":"set","key":"trust_g","value":"steady"},{"op":"add","key":"evidence","value":1}]`

后继：`SPARK_g`

### 选择 g02/ambition

“我想要一份能独立署名的合作机会。不是借你的姓。”

可选条件：`null`

立即回应：

**顾晚棠**：这个要求不小。

`g02.ambition.reply.001`

**许照**：你可以只答应一次试用，不必替结果担保。

`g02.ambition.reply.002`

**旁白**：她想了想，把条件改成公开遴选的现场协作，要求与别人相同。

`g02.ambition.reply.003`

**顾晚棠**：我介绍你去报名，能不能接到活，按同一套要求来。

`g02.ambition.reply.004`

**许照**：够了。

`g02.ambition.reply.005`

**旁白**：她把笔放下，眼里第一次有了一点并非防备的兴味。她把负责人的联系方式写在纸边，让你自己约时间。

`g02.ambition.reply.006`

写入与操作：`[{"op":"set","key":"reciprocal_g","value":true},{"op":"set","key":"deal_g","value":"ambition"},{"op":"set","key":"trust_g","value":"steady"},{"op":"add","key":"evidence","value":1}]`

后继：`SPARK_g`

### 选择 g02/leverage

“你那么怕那份保留意见被埋掉，总得多给我一点好处。”

可选条件：`null`

立即回应：

**旁白**：晚棠没有提高声音，只把纸抽了回去。

`g02.leverage.reply.001`

**顾晚棠**：我给你看材料是为了查清楚，不是请你拿它威胁我。

`g02.leverage.reply.002`

**许照**：我们不是在谈交换？

`g02.leverage.reply.003`

**顾晚棠**：是。你刚才的意思，听着就是不给好处便不肯配合核实。

`g02.leverage.reply.004`

**旁白**：她收起材料：“工作我会继续查。别的话，今天先不谈了。”

`g02.leverage.reply.005`

写入与操作：`[{"op":"set","key":"reciprocal_g","value":false},{"op":"set","key":"deal_g","value":"pressure"},{"op":"set","key":"pending_g","value":true},{"op":"set","key":"trust_g","value":"guarded"}]`

后继：`SPARK_g`


---

## g03｜今天没有文件夹

类型：`personal`。元数据：`{"background":"diner","music":"glass","decisionSteps":[{"id":"date","label":"直接告诉晚棠：想认真试着交往","options":["open","exclusive"],"reply":[{"speaker":"G","text":"合作协议里能写期限，喜欢不能。我想听你自己讲清承诺到哪里。","id":"g03.v413.date.reply.001","textHash":"a565ae665868249d"}],"after":[{"speaker":"N","text":"晚棠把手机倒扣，第一次没急着找一个风险最低的答案。","id":"g03.v413.date.after.001","textHash":"b2a47bdaa76633a2"}]},{"id":"slow","label":"不凭一顿饭许下感情承诺","options":["wait","friend","decline"],"reply":[{"speaker":"G","text":"行，你愿意讲清楚就好。最怕有人吃完饭才说刚才算默认。","id":"g03.v413.slow.reply.001","textHash":"0acf3899656d930d"}],"after":[{"speaker":"N","text":"她笑了一下，拿起筷子；餐桌仍然属于你们两个人。","id":"g03.v413.slow.after.001","textHash":"ec21b224778ab660"}]}],"character":"g","stage":3,"minSlot":5}`

### 正文

**旁白**：晚棠在小餐馆门口看了两遍店名，才走进来。

`g03.r4.body.001`

**顾晚棠**：我查了三个店，最后挑了最便宜这家。要是不好吃，允许你当面投诉。

`g03.r4.body.002`

**旁白**：她没带文件夹，坐下后把工作手机静音。

`g03.r4.body.003`

**顾晚棠**：今天还想问材料？我把工作手机都关了。

`g03.r4.body.004`

**许照**：今天想问你。

`g03.r4.body.005`

**旁白**：她把菜单合上一半，等你往下说。

`g03.r4.body.006`

### 条件正文 · g03.variant.001

条件：`{"all":[{"eq":["pending_g",true]},{"chosen":["g02","leverage"]}]}`

**顾晚棠**：但上次你拿我的顾虑加价，那件事还没说完。我今天不准备答应恋爱，不管这顿饭多好吃。

`g03.variant.001.001`

### 条件正文 · g03.variant.003

条件：`{"eq":["trust_g","steady"]}`

**旁白**：晚棠没有拿工作里的交换来要求这顿饭的答案。前面的合作清楚，所以她可以把问题问得更私人。

`g03.variant.003.001`

### 条件正文 · g03.variant.006

条件：`{"eq":["first_g","trade"]}`

**顾晚棠**：第一次来找我，你先问能交换什么。今天呢？

`g03.variant.006.001`

**许照**：今天不带条件。你临时不想去，也没欠我什么。

`g03.variant.006.002`

**旁白**：晚棠把菜单推过来：“今天还准备报个数？那你慢慢挑，我不赶下一场。”

`g03.variant.006.003`

### 条件正文 · g03.variant.007

条件：`{"eq":["first_g","person"]}`

**顾晚棠**：上次我一开口，你就想起工资。今天好点了吗？

`g03.variant.007.001`

**许照**：好多了。至少我敢问你吃不吃香菜了。

`g03.variant.007.002`

**顾晚棠**：不吃。这次给你个准确答案。

`g03.variant.007.003`

### 条件正文 · g03.variant.008

条件：`{"eq":["first_g","flirt"]}`

**顾晚棠**：第一次见面你就挺敢说。我还以为你只会嘴上占便宜。

`g03.variant.008.001`

**许照**：所以今天亲自过来接受检查。

`g03.variant.008.002`

**顾晚棠**：没有检查。只是吃饭。你别把自己吓跑。

`g03.variant.008.003`

### 条件正文 · g03.r2.other_issue

条件：`{"all":[{"eq":["opening_lie_g",true]},{"not":{"chosen":["g02","leverage"]}}]}`

**顾晚棠**：阿衡那件事还没说清。今天可以见面，但我不会当作已经没事，更不会先答应恋爱。

`g03.unresolved_source.0`

### 条件正文 · g03.r4.block.007

条件：`{"all":[{"any":[{"chosen":["SPARK_g","bold"]},{"chosen":["SPARK_g","tease"]}]},{"canDate":"g"}]}`

**顾晚棠**：让你直接找我，不走助理那次，我还检查了两遍消息有没有发错人。别笑。

`g03.early_callback.0`

### 选择 g03/open

“我想认真约你。有其他约会会直说，现在不承诺只和一个人。”

可选条件：`{"canDate":"g"}`

立即回应：

**许照**：愿意。我想认真约会，但现在不承诺排他。

`g03.open.reply.001`

**旁白**：你把目前实际在约会的人说清；没有别人，就如实说没有。

`g03.open.reply.002`

**顾晚棠**：好，终于有一句没有打算让我猜。

`g03.open.reply.003`

**旁白**：她收起笑，认真问清你现有的关系。

`g03.open.reply.004`

**顾晚棠**：我愿意和你约会。现在不排他，但以后增加谁，我想亲口听你说。

`g03.open.reply.005`

**许照**：明白。

`g03.open.reply.006`

**顾晚棠**：以后相处得不舒服，我也会重新考虑。你也一样，别硬撑着答应。

`g03.open.reply.007`

**旁白**：她把菜单递过来，自己先点了一道很普通的菜。

`g03.open.reply.008`

写入与操作：`[{"op":"set","key":"active_g","value":true},{"op":"set","key":"scope_g","value":"open"},{"op":"set","key":"pursued_g","value":true},{"op":"disclose","character":"g"},{"op":"set","key":"commitment_g","value":"dating"},{"op":"set","key":"interest_g","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 g03/exclusive

“我想只和你交往。”

可选条件：`{"canDate":"g"}`

立即回应：

**许照**：我想只和你交往。

`g03.exclusive.r4.reply.001`

**旁白**：晚棠没有立刻接玩笑，低头想了一会儿。

`g03.exclusive.r4.reply.002`

**顾晚棠**：我会当真的。你想清楚了？

`g03.exclusive.r4.reply.003`

**许照**：想清楚了。

`g03.exclusive.r4.reply.004`

**旁白**：她抬起头，笑了一下。

`g03.exclusive.r4.reply.005`

**顾晚棠**：那我愿意。现在先点菜，再问我喜欢吃什么。

`g03.exclusive.r4.reply.006`

写入与操作：`[{"op":"set","key":"active_g","value":true},{"op":"set","key":"scope_g","value":"exclusive"},{"op":"set","key":"pursued_g","value":true},{"op":"set","key":"promised_g","value":true},{"op":"set","key":"commitment_g","value":"relationship"},{"op":"set","key":"interest_g","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 g03/wait

“喜欢你，但我想慢一点。”

可选条件：`null`

立即回应：

**许照**：我想继续见你，但先不答应恋爱。

`g03.wait.r2.reply.001`

**顾晚棠**：终于有人不在饭还没上时，就把下半生也点了。

`g03.wait.r2.reply.002`

**旁白**：她翻开菜单，自己笑了。

`g03.wait.r2.reply.003`

**顾晚棠**：那先陪我试这道。下次的事，下次亲口问。

`g03.wait.r2.reply.004`

写入与操作：`[{"op":"set","key":"active_g","value":false},{"op":"set","key":"scope_g","value":"waiting"},{"op":"set","key":"pursued_g","value":true},{"op":"set","key":"commitment_g","value":"none"},{"op":"set","key":"interest_g","value":"romantic"}]`

后继：`完成本次私人日程`

### 选择 g03/friend

“先做朋友，好吗？”

可选条件：`null`

立即回应：

**许照**：先做朋友。公事之外能认识你，也已经很难得。

`g03.friend.reply.001`

**顾晚棠**：这句话还挺会保留台阶。

`g03.friend.reply.002`

**许照**：不是台阶，是我现在能说的实话。

`g03.friend.reply.003`

**旁白**：她点点头，把合上的菜单重新翻开。

`g03.friend.reply.004`

**顾晚棠**：好。朋友也得告诉我，为什么选这家店。

`g03.friend.reply.005`

写入与操作：`[{"op":"set","key":"active_g","value":false},{"op":"set","key":"scope_g","value":"friend"},{"op":"set","key":"pursued_g","value":false},{"op":"set","key":"commitment_g","value":"none"},{"op":"set","key":"interest_g","value":"platonic"}]`

后继：`完成本次私人日程`

### 选择 g03/decline

“今晚先不开始恋爱，以后再说。”

可选条件：`null`

立即回应：

**顾晚棠**：行，今天不谈这个。菜还是要吃的。

`.scenes.g03.choices.4.reply.0`

写入与操作：`[{"op":"set","key":"active_g","value":false},{"op":"set","key":"scope_g","value":"declined"},{"op":"set","key":"pursued_g","value":true},{"op":"set","key":"commitment_g","value":"none"},{"op":"set","key":"interest_g","value":"uncertain"}]`

后继：`完成本次私人日程`


---

## g04｜她没赢的一局

类型：`personal`。元数据：`{"background":"arcade","music":"glass","character":"g","stage":4,"minSlot":9,"next":"g05","outingFollowup":"g05"}`

### 正文

**旁白**：街角的小店摆着一台很旧的夹娃娃机。晚棠站了五分钟，已经认真研究了三次爪子。

`g04.body.001`

**顾晚棠**：这不是概率问题，它就是夹不住。

`g04.body.002`

**许照**：也许老板设计时没准备让人每次拿到。

`g04.body.003`

**顾晚棠**：我知道。

`g04.body.004`

**旁白**：她说知道，还是又换了两枚币。原著里那个“精于算计”的女人，此刻正跟一只皱脸猫讲道理。

`g04.body.005`

**旁白**：她突然看你。

`g04.body.006`

**顾晚棠**：笑什么？再给我两次机会，夹不上来我请你吃饭。

`g04.body.007`

### 条件正文 · g03.variant.004

条件：`{"eq":["met_promise","g_spicy"]}`

**顾晚棠**：上次你选的东西确实有点辣。还好不是每件事都得选我最习惯的。

`g03.variant.004.001`

### 条件正文 · g03.variant.005

条件：`{"eq":["met_promise","g_rest"]}`

**顾晚棠**：上次你问要不要休息，我后来真的停了一会儿。没有耽误那么多事。

`g03.variant.005.001`

### 选择 g04/join

“我帮你试一次，失败了你可以笑回来。”

可选条件：`null`

立即回应：

**旁白**：你比她放得还歪，爪子在空气里认真合拢。

`g04.join.reply.001`

**旁白**：晚棠沉默一秒，终于笑出声。

`g04.join.reply.002`

**顾晚棠**：许照，你也不是每次都很会。

`g04.join.reply.003`

**许照**：这件事能别记进合作记录吗？

`g04.join.reply.004`

**顾晚棠**：已经记进私人记录了。

`g04.join.reply.005`

**旁白**：最后谁都没夹到。她买了一只很小的钥匙扣，说今天不能空手，又特地告诉你这是买的，不是赢的。

`g04.join.reply.006`

写入与操作：`[{"op":"set","key":"claw_g","value":"join"}]`

后继：`g05`

### 选择 g04/walk

“再玩两次？然后我请你吃东西。”

可选条件：`null`

立即回应：

**许照**：再玩两次？然后我请你吃点东西。

`g04.walk.r4.reply.001`

**顾晚棠**：你是不是已经看累了？

`g04.walk.r4.reply.002`

**许照**：主要是饿了。

`g04.walk.r4.reply.003`

**旁白**：她看了眼余额，又试了两次。爪子还是松了。

`g04.walk.r4.reply.004`

**顾晚棠**：行，走。再不走，你得给我带饭回来。

`g04.walk.r4.reply.005`

写入与操作：`[{"op":"set","key":"claw_g","value":"stop"}]`

后继：`g05`

### 选择 g04/ask

“你是真的喜欢那只猫，还是不想输给这台机器？”

可选条件：`null`

立即回应：

**旁白**：她盯着玻璃里的皱脸猫，过了一会儿才答。

`g04.ask.reply.001`

**顾晚棠**：开始是猫。后来是机器。

`g04.ask.reply.002`

**许照**：那猫呢？

`g04.ask.reply.003`

**顾晚棠**：现在看，长得一般。

`g04.ask.reply.004`

**旁白**：她笑着退了一步，终于承认自己改了主意。

`g04.ask.reply.005`

**顾晚棠**：换个地方吧。再待下去，你今天只能看见我跟机器吵架。

`g04.ask.reply.006`

写入与操作：`[{"op":"set","key":"claw_g","value":"ask"}]`

后继：`g05`


---

## g05｜告别以前，再问一句

类型：`personal`。元数据：`{"background":"corridor","music":"glass","character":"g","stage":5,"minSlot":9}`

### 正文

**旁白**：走到店门口，晚棠发现你外套肩上粘着一片纸，指给你看。

`g05.r4.body.001`

**顾晚棠**：先别动，右边。

`g05.r4.body.002`

**旁白**：你找了半天没找到，她笑着把纸拿掉，退回原来的位置。

`g05.r4.body.003`

**顾晚棠**：刚才那么会接话，怎么现在安静了？

`g05.r4.body.004`

### 选择 g05/ask

“那我直接问。可以吻你吗？”

可选条件：`{"all":[{"eq":["active_g",true]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]}]}`

立即回应：

**旁白**：她没有故意吊很久，只轻轻点头。

`g05.ask.reply.001`

**顾晚棠**：可以。

`g05.ask.reply.002`

**旁白**：你靠近，她也主动走完最后一点距离。亲吻很短，她退开时还握着你的手。

`g05.ask.reply.003`

**旁白**：退开时，她先看着你笑。

`g05.ask.reply.004`

**顾晚棠**：今天这句比你谈条件时顺耳。

`g05.ask.reply.005`

**许照**：以后谈条件也这么问？

`g05.ask.reply.006`

**顾晚棠**：那要分清楚。现在不要把工作带回来。

`g05.ask.reply.007`

写入与操作：`[{"op":"set","key":"pace_g","value":"kiss"},{"op":"set","key":"kissed_g","value":true},{"op":"set","key":"private_reward_g","value":true}]`

后继：`完成本次私人日程`

### 选择 g05/hand

“想牵手。别的再慢一点。”

可选条件：`{"all":[{"eq":["active_g",true]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]}]}`

立即回应：

**旁白**：晚棠把手伸出来，掌心朝上。

`g05.hand.r2.reply.001`

**顾晚棠**：这样？

`g05.hand.r2.reply.002`

**旁白**：你握住她，她的拇指在你手背上轻轻蹭了一下。

`g05.hand.r2.reply.003`

**顾晚棠**：行，先这样。看不出来，你还挺会让人惦记下一次。

`g05.hand.r2.reply.004`

写入与操作：`[{"op":"set","key":"pace_g","value":"hand"},{"op":"set","key":"private_reward_g","value":true}]`

后继：`完成本次私人日程`

### 选择 g05/space

“今天先到这里，慢一点我会自在些。”

可选条件：`null`

立即回应：

**许照**：今天先到这里吧。慢一点，我会自在些。

`g05.space.r4.reply.001`

**顾晚棠**：好。我也该回去了。

`g05.space.r4.reply.002`

**旁白**：她把包挂好，站到门边给你让出路。

`g05.space.r4.reply.003`

**顾晚棠**：下次有空再约。别又走着走着把外套挂一身纸。

`g05.space.r4.reply.004`

写入与操作：`[{"op":"set","key":"pace_g","value":"space"},{"op":"set","key":"private_reward_g","value":true}]`

后继：`完成本次私人日程`

### 选择 g05/ordinary

跟她道别，一起走到路口

可选条件：`{"ne":["active_g",true]}`

立即回应：

**旁白**：你拿好外套，问她回去往哪个方向。两人一起走到路口，分别叫了车。

`g05.ordinary.r4.reply.001`

**顾晚棠**：到家早点休息，别又顾着熬夜看手机。

`g05.ordinary.r4.reply.002`

写入与操作：`[{"op":"set","key":"pace_g","value":"ordinary"},{"op":"set","key":"private_reward_g","value":true}]`

后继：`完成本次私人日程`


---

## g06｜她把问题问明白

类型：`personal`。元数据：`{"background":"diner","music":"glass","character":"g","stage":6,"minSlot":11,"next":"g07","outingFollowup":"g07"}`

### 正文

**旁白**：手机亮起来，你瞥一眼又扣回桌面。晚棠停下翻菜单的手。

`g06.r4.body.001`

**顾晚棠**：有消息就看。我倒有一件事想先问。

`g06.r4.body.002`

**许照**：什么？

`g06.r4.body.003`

**顾晚棠**：你现在有没有在约会的人？我不想只靠猜。

`g06.r4.body.004`

### 条件正文 · g06.variant.001

条件：`{"eq":["public_photo_t",true]}`

**顾晚棠**：映雪发过一张便利店合照。照片只能证明你们见面，所以我来问你，不问她替你作证。

`g06.variant.001.001`

### 条件正文 · g06.variant.003

条件：`{"eq":["scope_g","exclusive"]}`

**顾晚棠**：还有，你对我说过只和我交往。所以这次不只是我想多了解一点。

`g06.variant.003.001`

### 条件正文 · g06.variant.004

条件：`{"eq":["pace_g","kiss"]}`

**旁白**：晚棠看你时多停了一秒。随后把视线移回你的眼睛，等你回答。

`g06.variant.004.001`

### 条件正文 · g06.variant.005

条件：`{"eq":["pace_g","hand"]}`

**顾晚棠**：上次牵手我挺高兴。高兴归高兴，今天该问的我还是要问。

`g06.variant.005.001`

### 条件正文 · g06.variant.006

条件：`{"eq":["pace_g","space"]}`

**顾晚棠**：你那次直接说想慢点，比一边后退一边保证什么都可以好。今天也一样，别哄我。

`g06.variant.006.001`

### 选择 g06/clear

如实说明目前的关系与承诺，不替其他人宣布感情。

可选条件：`null`

立即回应：

**旁白**：你按实际情况，把正在约会的人和承诺过的范围讲清楚，没有把尚未答应的人算进去。

`g06.clear.r4.reply.001`

**顾晚棠**：好。比我猜有用。

`g06.clear.r4.reply.002`

**许照**：你现在怎么想？

`g06.clear.r4.reply.003`

**顾晚棠**：让我想一会儿。今天不用逼着我当场答应以后都没问题。

`g06.clear.r4.reply.004`

**旁白**：你点头。她把菜单摊到桌上，先给自己倒了一杯水。

`g06.clear.r4.reply.005`

写入与操作：`[{"op":"disclose","character":"g"},{"op":"set","key":"discovery_g","value":"truth"}]`

后继：`g07`

### 选择 g06/wait

“先把今晚这段相处过完。散场前，我会把关系讲清。”

可选条件：`null`

立即回应：

**顾晚棠**：散场前。不是下一个不知道哪天的晚上。

`g06.wait.r2.reply.001`

**旁白**：你把手机收好。这一次还没有说出别人的名字，她也没有提前知道答案。

`g06.wait.r2.reply.002`

写入与操作：`[{"op":"set","key":"discovery_g","value":"late"},{"op":"deferDisclosure","character":"g"}]`

后继：`g07`

### 选择 g06/deny

“就是工作，没什么特别。”——有其他约会时仍然否认。

可选条件：`null`

立即回应：

**旁白**：晚棠点了一下头，没继续追问。

`g06.deny.reply.001`

**顾晚棠**：好。这个说法我记住了。

`g06.deny.reply.002`

**旁白**：她把手机收走，没有当场拿出第二张证据。

`g06.deny.reply.003`

**旁白**：她没有继续追问。你低头看着那条未读消息，指尖在桌下蜷了一下。

`g06.deny.reply.004`

写入与操作：`[{"op":"denyRelations","character":"g"},{"op":"set","key":"discovery_g","value":"denied"}]`

后继：`g07`


---

## g07｜这一次，确实是她做错了

类型：`personal`。元数据：`{"background":"terrace","music":"glass","character":"g","stage":7,"minSlot":11}`

### 正文

**旁白**：晚棠主动提起另一件事：她曾压缩一支新人团队的演出时长，把预算挪给了更有名的团队。

`g07.r4.body.001`

**顾晚棠**：那次真是我决定的。不是谁冒我的名。

`g07.r4.body.002`

**许照**：后来呢？

`g07.r4.body.003`

**顾晚棠**：新人那边准备的东西用不上了，骂我也正常。我后来补了一场，但他们不太愿意见我。

`g07.r4.body.004`

**旁白**：她停下来，问你怎么想。

`g07.r4.body.005`

### 条件正文 · g07.variant.001

条件：`{"eq":["discovery_g","truth"]}`

**顾晚棠**：你刚才说清了，我就不用拿一张照片猜你整晚在哪。今天我也把自己的部分说清。

`g07.variant.001.001`

### 条件正文 · g07.variant.002

条件：`{"eq":["discovery_g","late"]}`

**顾晚棠**：你说散场前会讲清关系，我还记着。先说我这件事，等会儿再轮到你。

`g07.variant.002.001`

### 条件正文 · g07.variant.003

条件：`{"eq":["discovery_g","denied"]}`

**顾晚棠**：刚才你说没有，我会记得。如果之后事实不是那样，别再怪我为什么要核对。

`g07.variant.003.001`

### 条件正文 · g07.variant.004

条件：`{"eq":["loss_g","rest"]}`

**顾晚棠**：上次你没催我立刻翻盘，我舒服很多。今天也不用假装我什么都能处理。

`g07.variant.004.001`

### 条件正文 · g07.variant.005

条件：`{"eq":["loss_g","review"]}`

**顾晚棠**：你说不懂完整情况，就不替我骂人。我记住了。今天也只谈真的做过的部分。

`g07.variant.005.001`

### 条件正文 · g07.variant.006

条件：`{"eq":["loss_g","ordinary"]}`

**顾晚棠**：上次吃完东西，我回去就睡了。第二天事情没变糟，我倒是清醒一点。

`g07.variant.006.001`

### 选择 g07/separate

“那次做得不对。但我愿意听你接着说。”

可选条件：`null`

立即回应：

**许照**：那次做得不对。不过你愿意说，我就继续听。

`g07.separate.r4.reply.001`

**顾晚棠**：没准备安慰我两句？

`g07.separate.r4.reply.002`

**许照**：不知道他们到底损失多少，不能乱安慰。

`g07.separate.r4.reply.003`

**旁白**：她把准备补偿的方案讲出来，说还要先问那支团队愿不愿意接受。

`g07.separate.r4.reply.004`

**顾晚棠**：我自己去谈。谈不下来，也得认。

`g07.separate.r4.reply.005`

写入与操作：`[{"op":"set","key":"fault_g","value":"clear"}]`

后继：`完成本次私人日程`

### 选择 g07/ask

“后来你怎么处理？我想看现在的决定，不只听解释。”

可选条件：`null`

立即回应：

**顾晚棠**：给过一次额外时段。但不该把那个写成恩惠。

`g07.ask.reply.001`

**旁白**：她说到这里，自己把宣传稿里“扶持”两字圈了出来。

`g07.ask.reply.002`

**许照**：他们也可以不接受你。

`g07.ask.reply.003`

**顾晚棠**：我知道。

`g07.ask.reply.004`

**旁白**：她把改稿发回去，请对方删掉“扶持新人”那一段。

`g07.ask.reply.005`

**旁白**：你陪她向材料当事人逐个询问，收齐能公开的许可后，她录下了完整说明。

`g07.ask.r2.execution.001`

写入与操作：`[{"op":"set","key":"fault_g","value":"repair"},{"op":"set","key":"proof_g_account","value":true}]`

后继：`完成本次私人日程`

### 选择 g07/excuse

“做生意都这样。那些人只是没你能干。”

可选条件：`null`

立即回应：

**旁白**：她没有因为被维护而开心。

`g07.excuse.reply.001`

**顾晚棠**：别这么替我说话。

`g07.excuse.reply.002`

**许照**：我是在帮你。

`g07.excuse.reply.003`

**顾晚棠**：你这样帮，会让我下次更容易觉得别人受点委屈也没什么。

`g07.excuse.reply.004`

**旁白**：她把话题停住。晚棠把杯子放下，没有再跟你聊那份补偿方案。

`g07.excuse.reply.005`

写入与操作：`[{"op":"set","key":"fault_g","value":"excuse"},{"op":"set","key":"value_conflict_g","value":true}]`

后继：`完成本次私人日程`


---

## g08｜这顿饭不报销

类型：`personal`。元数据：`{"background":"diner","music":"glass","character":"g","stage":8,"minSlot":14,"next":"g09","outingFollowup":"g09"}`

### 正文

**旁白**：晚棠带你去一家她很熟悉的小店。老板没叫顾总，只问她今天还是不是少放葱。

`g08.body.001`

**顾晚棠**：别意外。我也不是只在有包间的地方吃饭。

`g08.body.002`

**旁白**：她把桌边的一只旧木凳拖给你，坐下来才发现一条腿有点晃。

`g08.body.003`

**顾晚棠**：这个这么多年还没修。

`g08.body.004`

**旁白**：她说着，熟练地把纸巾垫到下面。木凳终于稳了，她得意地拍了一下椅背。

`g08.body.005`

**顾晚棠**：你今天可以问点没用的。公事问题，吃完再讲。

`g08.body.006`

### 条件正文 · g08.variant.001

条件：`{"eq":["fault_g","clear"]}`

**顾晚棠**：你上次没有把没做过的事塞给我，也没把做过的抹掉。今天这顿饭，我不用先准备一份答辩。

`g08.variant.001.001`

### 条件正文 · g08.variant.002

条件：`{"eq":["fault_g","repair"]}`

**顾晚棠**：上次你问还来不来得及补救，比说反正已经发生了有用。

`g08.variant.002.001`

### 条件正文 · g08.variant.003

条件：`{"eq":["fault_g","excuse"]}`

**顾晚棠**：上次你替我把责任全推走，我不喜欢。偏心可以，别偏到连我说过什么都不认。

`g08.variant.003.001`

### 选择 g08/child

“你以前经常来？那时也这么会嫌弃凳子吗？”

可选条件：`null`

立即回应：

**顾晚棠**：以前嫌弃得更大声。老板就让我自己垫。

`g08.child.reply.001`

**旁白**：她讲起第一次用零花钱请朋友吃饭，点多了又舍不得退，最后两个人撑着走回去。

`g08.child.reply.002`

**许照**：后来那个朋友呢？

`g08.child.reply.003`

**顾晚棠**：还联系。还常说我点菜没数。上次明明是她想两道都吃。

`g08.child.reply.004`

写入与操作：`[{"op":"set","key":"dinner_g","value":"old"}]`

后继：`g09`

### 选择 g08/self

“那我也讲一件没用的。我以前真的觉得所有大人都很有把握。”

可选条件：`null`

立即回应：

**顾晚棠**：现在呢？

`g08.self.reply.001`

**许照**：发现大家只是比较会在别人面前不打开搜索框。

`g08.self.reply.002`

**旁白**：她差点被水呛到，把杯子放下，笑了很久。

`g08.self.reply.003`

**顾晚棠**：这句不能写进会议纪要。

`g08.self.reply.004`

**许照**：只记在这顿不报销的饭里。

`g08.self.reply.005`

写入与操作：`[{"op":"set","key":"dinner_g","value":"self"}]`

后继：`g09`

### 选择 g08/silent

“今天没什么想问的，就想和你把饭吃完。”

可选条件：`null`

立即回应：

**旁白**：她歪头看了你一会儿。

`g08.silent.reply.001`

**顾晚棠**：你这样，我倒有点不知道怎么招待。

`g08.silent.reply.002`

**许照**：你也吃。

`g08.silent.reply.003`

**旁白**：于是她认真吃完，没有一边回邮件。汤快凉时，她主动问你下一次有没有空。

`g08.silent.reply.004`

写入与操作：`[{"op":"set","key":"dinner_g","value":"quiet"}]`

后继：`g09`


---

## g09｜如果她不再有那张名片

类型：`personal`。元数据：`{"background":"terrace","music":"glass","character":"g","stage":9,"minSlot":14}`

### 正文

**旁白**：晚棠把一张旧名片折了一下，没有扔。她看着上面的职位，忽然抬头。

`g09.r2.body.001`

**顾晚棠**：先说好，我不是来考你的。可今天真的有点想问。

`g09.r2.body.002`

**顾晚棠**：要是不能再替你开那些门，你还觉得跟我吃饭有意思吗？

`g09.r2.body.003`

**旁白**：她把手机扣在桌上，不给这个问题附一份工作条件。

`g09.r2.body.004`

### 条件正文 · g09.variant.001

条件：`{"eq":["dinner_g","old"]}`

**顾晚棠**：刚才说起我请朋友吃撑那回，你笑那么大声。今天还要不要甜品？

`g09.variant.001.001`

### 条件正文 · g09.variant.002

条件：`{"eq":["dinner_g","self"]}`

**顾晚棠**：你刚才说，大人只是不当面开搜索框。我差点搜“怎么请人吃饭不像谈生意”。

`g09.variant.002.001`

### 条件正文 · g09.variant.003

条件：`{"eq":["dinner_g","quiet"]}`

**顾晚棠**：刚才只吃饭也没冷场。下次你不用特地备话题，我也少备两个。

`g09.variant.003.001`

### 条件正文 · g09.r2.left

条件：`{"eq":["g_left_job",true]}`

**顾晚棠**：门卡已经交了。今天不是假设，我现在真得跟你走普通出口。

`g09.r2.left.001`

### 条件正文 · g09.r2.working

条件：`{"ne":["g_left_job",true]}`

**顾晚棠**：现在还在做，但我不想每次找你，都得先带一条好消息。

`g09.r2.working.001`

### 选择 g09/ordinary

“门会少一点，那我们挑不用门禁的地方见。”

可选条件：`null`

立即回应：

**旁白**：她低头笑了一下。

`g09.ordinary.reply.001`

**顾晚棠**：听着不错。至少不用刷卡才能见你。

`g09.ordinary.reply.002`

**许照**：先从那张歪凳子开始。

`g09.ordinary.reply.003`

**旁白**：她把名片收进包，伸手推了一下你面前的杯子。

`g09.ordinary.reply.004`

**顾晚棠**：好。这次我自己慢慢算，你不用替我选。

`g09.ordinary.reply.005`

写入与操作：`[{"op":"set","key":"future_g","value":"ordinary"}]`

后继：`完成本次私人日程`

### 选择 g09/true

“你确实帮过我。但今天来见你，不是来要下一次帮助。”

可选条件：`null`

立即回应：

**顾晚棠**：然后呢？

`g09.true.reply.001`

**许照**：以后少了那些，我会自己再想工作怎么做。不会每次来找你都带一道工作题。

`g09.true.reply.002`

**旁白**：她看着你，表情终于没有一开始那么锋利。

`g09.true.reply.003`

**顾晚棠**：行。这句我愿意相信。

`g09.true.reply.004`

写入与操作：`[{"op":"set","key":"future_g","value":"honest"}]`

后继：`完成本次私人日程`

### 选择 g09/fear

“我会担心我们的生活变难。可我不想装作不在乎。”

可选条件：`null`

立即回应：

**旁白**：她点头，像终于不用单方面把现实全讲出来。

`g09.fear.reply.001`

**顾晚棠**：我也担心。不用谁先演不怕。

`g09.fear.reply.002`

**旁白**：你们谈了几件真的会改变的小事：去哪儿吃饭、谁先找新的机会、见面不一定还那么方便。

`g09.fear.reply.003`

写入与操作：`[{"op":"set","key":"future_g","value":"real"}]`

后继：`完成本次私人日程`


---

## g10｜她终于没有替你准备问题

类型：`personal`。元数据：`{"background":"diner","music":"glass","character":"g","stage":10,"minSlot":16,"next":"g11","outingFollowup":"g11"}`

### 正文

**旁白**：晚棠先到了。桌上没有文件，也没有预先点好的整套餐。她把菜单递给你，难得说了一句“我还没想好”。

`g10.body.001`

**顾晚棠**：你是不是觉得我每次叫你来，都准备好了下一句？

`g10.body.002`

**许照**：有时候。

`g10.body.003`

**顾晚棠**：今天没有。

`g10.body.004`

**旁白**：她看向窗外，停了很久才回过头。

`g10.body.005`

**顾晚棠**：其实就是想见。这样叫人出来，有点不习惯。

`g10.body.006`

### 条件正文 · g10.variant.001

条件：`{"eq":["future_g","ordinary"]}`

**顾晚棠**：你说挑不用门禁的地方见。这里够普通吧？连椅子都没统一。

`g10.variant.001.001`

### 条件正文 · g10.variant.002

条件：`{"eq":["future_g","honest"]}`

**顾晚棠**：你没把我帮过你的事抹掉，也没拿它解释全部。今晚不谈那些，我就是想见你。

`g10.variant.002.001`

### 条件正文 · g10.variant.003

条件：`{"eq":["future_g","real"]}`

**顾晚棠**：你肯承认自己也怕，我就不用永远是最后一个还在装轻松的人。

`g10.variant.003.001`

### 选择 g10/answer

“那我也直接说。我挺高兴你叫我来。”

可选条件：`null`

立即回应：

**旁白**：她笑了，不急着接一个更厉害的玩笑。

`g10.answer.reply.001`

**顾晚棠**：好，今天开场算过了。

`g10.answer.reply.002`

**许照**：又在算？

`g10.answer.reply.003`

**顾晚棠**：最后一次。

`g10.answer.reply.004`

**旁白**：她把菜单翻回来，先问你想吃什么。你点了一道她没试过的菜。她看了两眼图片，说今天愿意赌一次。

`g10.answer.reply.005`

写入与操作：`[{"op":"set","key":"last_g","value":"wanted"}]`

后继：`g11`

### 选择 g10/tease

“我也没准备好台词。两个人空手来，刚好。”

可选条件：`null`

立即回应：

**顾晚棠**：那就不用互相防着谁先出牌。

`g10.tease.reply.001`

**旁白**：她自己意识到又说成了牌局，笑着摆了摆手。

`g10.tease.reply.002`

**顾晚棠**：不说这个。今天先随便聊。

`g10.tease.reply.003`

**旁白**：你们聊到一道小时候讨厌的菜，居然争了十分钟。她最后没争赢，也没有不高兴。

`g10.tease.reply.004`

写入与操作：`[{"op":"set","key":"last_g","value":"ordinary"}]`

后继：`g11`

### 选择 g10/slow

“那今天允许冷场吧。我想和你慢慢待着。”

可选条件：`null`

立即回应：

**旁白**：她把手从杯子上松开。

`g10.slow.reply.001`

**顾晚棠**：行。冷场不扣分。

`g10.slow.reply.002`

**旁白**：后来是她先开始说一件很小的烦心事，没有条件，只是想让你知道。

`g10.slow.reply.004`

写入与操作：`[{"op":"set","key":"last_g","value":"quiet"}]`

后继：`g11`


---

## A2a｜十七秒热搜，差点偷走她的歌

类型：`common`。元数据：`{"background":"recording","music":"pulse","decisionSteps":[{"id":"credit","label":"先站到她身边，把歌的署名争回来","options":["independent","negotiated"],"reply":[{"speaker":"T","text":"你先问我想不想争回来，而不是替我按确认。这一点，我记住了。","id":"A2a.v413.credit.reply.001","textHash":"3c7b50ded102aae8"}],"after":[{"speaker":"N","text":"她把发布方案拉到你面前，手指停在两种署名条件上。","id":"A2a.v413.credit.after.001","textHash":"7be56a1309c89d97"}]},{"id":"space","label":"先保留合作与退路，不替她定去留","options":["duet","pause","unchanged"],"reply":[{"speaker":"T","text":"如果还要合作，我必须听清楚边界。要停，我也想自己决定。","id":"A2a.v413.space.reply.001","textHash":"7c467607fbf074b7"}],"after":[{"speaker":"N","text":"屏幕上的预告还没播完，下一步是怎样处置它，而不是一句空泛的支持。","id":"A2a.v413.space.after.001","textHash":"58e8c5b6200931a5"}]}],"next":"A2b","clock":{"day":2,"time":"21:00"}}`

### 正文

**旁白**：第二天中午，一条十七秒预告冲上热搜小榜。视频正中是陆景行，耳朵里却全是唐映雪熬夜改了三遍的副歌。最高赞评论问：“钢琴家又出新歌了？”

`A2a.r4.body.001`

**唐映雪**：明明是我写、我唱的歌，他们却问是不是陆景行的新曲。再这么发，热度越大，越没人知道它属于谁。

`A2a.r4.body.002`

**原著记忆**：（原著里，她就是被“热度不能浪费”这句话催着点了确认。）歌爆了，创作者却连完整唱一遍都得看人脸色。可这次确认键还亮着，她还没按。

`A2a.r4.body.003`

**旁白**：映雪没等你替她做决定，自己先关掉了确认弹窗。她抬头：“我不签这个版本。现在我想听一个能执行的办法，不想再听一句‘别难过’。”

`A2a.r4.body.004`

**唐映雪**：我想要两样东西：观众听见歌，名字也认得我。你陪我想打法，但拍板还是我。

`A2a.r4.body.005`

### 条件正文 · A2a.variant.001

条件：`{"ne":["song_access_t","half"]}`

**唐映雪**：完整歌我还没给你听过，今天没法直接准备另发。可以先谈署名、合唱，或者先缓一缓。

`A2a.no_demo.0`

### 选择 A2a/independent

抢回首发：独立母带，小流量换所有权

可选条件：`{"eq":["song_access_t","half"]}`

立即回应：

**许照**：先准备你的完整版本。开头就写你的名字。

`A2a.independent.r2.reply.001`

**唐映雪**：行。正式上传之前，还得把母带和授权核一遍。

`A2a.independent.r2.reply.002`

**旁白**：她从制作人手里争到一段独立试播窗口，把“唐映雪·原作原唱”写在文件第一行。流量未必赶得上原宣传，但这次名字不会凭空消失。

`A2a.independent.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_t","value":"independent"},{"op":"set","key":"opportunity_t","value":true}]`

后继：`A2b`

### 选择 A2a/negotiated

借势反击：保住热度，签下姓名与时段

可选条件：`null`

立即回应：

**许照**：声量可以借，名字不能借出去。先把署名和独唱时段谈到手。

`A2a.negotiated.r2.reply.001`

**唐映雪**：那我今天不点确认。到试播那天，你陪我盯一次屏幕？

`A2a.negotiated.r2.reply.002`

**旁白**：她把“试播时谈”四个字圈给你看：“还没答应。试播那天你别只拍掌声，帮我盯着屏幕上的姓名。”

`A2a.negotiated.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_t","value":"negotiated"},{"op":"set","key":"opportunity_t","value":true}]`

后继：`A2b`

### 选择 A2a/duet

反向合作：合唱可以，原作与分轨写明

可选条件：`null`

立即回应：

**许照**：重新录合唱。让人听见谁写了歌、谁改了编曲。

`A2a.duet.r2.reply.001`

**唐映雪**：我先听他的改法。好听才录，不为了圆场。

`A2a.duet.r2.reply.002`

**陆景行**：我送两版编曲过去，原作的署名也标好。她试听以后自己选，别替她先答应。

`A2a.duet.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_t","value":"chosen_duet"},{"op":"set","key":"opportunity_t","value":true}]`

后继：`A2b`

### 选择 A2a/pause

及时止损：撤预告，先守住完整版

可选条件：`null`

立即回应：

**许照**：先不发。把撤下预告这件事办实，再决定下一步。

`A2a.pause.r2.reply.001`

**唐映雪**：我想喘口气，不是从此不唱。

`A2a.pause.r2.reply.002`

**旁白**：她发出暂缓发布的正式请求，把原稿锁进备份盘。今天少一条热搜，也少一次被迫签字的风险。她看上去终于能喘气。

`A2a.pause.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_t","value":"intentional_pause"},{"op":"set","key":"opportunity_t","value":true}]`

后继：`A2b`

### 选择 A2a/unchanged

不介入谈判：由她自己面对现有团队

可选条件：`null`

立即回应：

**许照**：这一次我先不参加谈判。你需要什么，直接告诉我。

`A2a.unchanged.r2.reply.001`

**唐映雪**：好。我自己试试。后面能腾出时间的话，再来试听。

`A2a.unchanged.r2.reply.002`

**旁白**：她没有把这当成你替她作的决定，而是关掉预览，直接联系项目负责人。你退出了这次争取，后面她能拿回多少，将不再靠你的参与。

`A2a.unchanged.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_t","value":"restricted"},{"op":"set","key":"opportunity_t","value":true}]`

后继：`A2b`


---

## A2b｜第二天，程放把矛头指向我

类型：`common`。元数据：`{"background":"control","music":"pulse","next":"@schedule"}`

### 正文

**旁白**：第二天晚上，工作群突然弹出程放的 @：“许照，昨天那张责任单考虑得怎么样？”后面跟了个笑脸。那张笑脸，是他隔着屏幕伸来的第二支笔。

`A2b.r42.body.001`

**旁白**：群里短暂安静。阿衡头像亮了一下，沈清辞先发了句：“谁导出、谁试听、谁切换，三项分开写。”你看见程放一直在输入，最后没发出话来。

`A2b.r42.body.002`

**旁白**：阿衡随后发出值守表，标明哪个时段由谁操作、哪些项目还得复核。程放不再催你单独签字，只留下一句“明天再谈”。你没有靠吵架赢，但让那张责任单再也不能一笔带过。

`A2b.r42.body.003`

**许照**：（要么公开争一口气，要么把证据递进核验流程，要么让陆景行做公开转发。都要付代价，却总比原著里只回一句“收到”强。）

`A2b.r42.body.004`

### 条件正文 · A2b.variant.001

条件：`{"eq":["stage","original"]}`

**唐映雪**：首演最后还是回到了完整版本。找盘、试听、接歌的那几步，别只写一句“顺利结束”。

`A2b.variant.001.001`

### 条件正文 · A2b.r1.block.004

条件：`{"eq":["opening_work_result","joined"]}`

**陆景行**：首演后那次返听，是你配合阿衡试听的。这次的准备我也发你，做不来的设备别硬接。

`A2b.r1.block.004.001`

### 条件正文 · A2b.r1.block.005

条件：`{"eq":["opening_work_result","own_demo"]}`

**唐映雪**：你和我录的五分钟小样还没发。今天谈公开版本，可以把它作为一个备选。

`A2b.r1.block.005.001`

### 条件正文 · A2b.r1.block.006

条件：`{"eq":["opening_work_result","cancelled_demo"]}`

**唐映雪**：那晚没录成就没录成。今天不要为了抢时间，拿别的文件顶成我们的。

`A2b.r1.block.006.001`

### 条件正文 · A2b.r1.block.007

条件：`{"eq":["opening_work","free"]}`

**陆景行**：那晚你没来，试听记录我补给你。想接下一次，重新说。

`A2b.r1.block.007.001`

### 条件正文 · A2b.r4.block.006

条件：`{"eq":["opening_method","performer_cue"]}`

**唐映雪**：你当时问我在哪一段接，我记得。那句转调我自己唱完了，预告也别给剪掉。

`A2b.r4.block.006.001`

### 条件正文 · A2b.r4.block.007

条件：`{"eq":["opening_method","producer_switch"]}`

**沈清辞**：首演那次指令我发的，记录我也签过。需要核对名单，来找我。

`A2b.r4.block.007.001`

### 条件正文 · A2b.r4.block.008

条件：`{"eq":["opening_method","record_switch"]}`

**林见月**：你叫我拍的标签和切换画面还在，时间也能对上。别把工作记录删了，后面说不准要用。

`A2b.r4.block.008.001`

### 条件正文 · A2b.r4.block.009

条件：`{"eq":["opening_method","authorization_check"]}`

**旁白**：程放又单独发来一条：“你首演直接找顾晚棠问邮件，后面也准备这样？”你把消息留了下来。

`A2b.r4.block.009.001`

### 条件正文 · A2b.r4.block.010

条件：`{"eq":["opening_method","audio_handoff"]}`

**阿衡**：首演你没硬碰控台，这点我挺放心。以后想学试听可以问，真不会的地方别装。

`A2b.r4.block.010.001`

### 条件正文 · A2b.r42.block.canon

条件：`{"eq":["canon_kept",true]}`

**旁白**：首演照原著，钢琴救场属于陆景行。你没有找到U盘，阿衡也没有执行过你安排的换盘。此后的证据要从自己真正做过的事开始。

`A2b.r42.block.canon.001`

### 条件正文 · A2b.r42.block.fork_preserve

条件：`{"eq":["new_plot_choice","preserve"]}`

**旁白**：原著没有的“双版本”记录已经保存。程放知道旧版还在，之后想只拿一帧画面说事就没那么容易。

`A2b.r42.block.fork_preserve.001`

### 条件正文 · A2b.r42.block.fork_confront

条件：`{"eq":["new_plot_choice","confront"]}`

**旁白**：你提前质问过程，程放开始防着你。原著的第七天危机，也可能提前换一种样子找上门。

`A2b.r42.block.fork_confront.001`

### 条件正文 · A2b.r42.block.fork_quiet

条件：`{"eq":["new_plot_choice","quiet"]}`

**旁白**：这条新出现的群消息没被拿去争论。你保存了自己的交接，但谁下的令还没有核对。

`A2b.r42.block.fork_quiet.001`

### 选择 A2b/public

正面亮名字：让署名与责任都摆到台面

可选条件：`null`

立即回应：

**许照**：唐映雪的作品署她的名。台前是谁救场、控台是谁值守，名单照真正做过的写。

`A2b.public.r4.reply.001`

**旁白**：陆景行把补全的名单转发出去，钢琴和音控的分工都没有删。

`A2b.public.r4.reply.002`

**旁白**：程放私聊你：“那就等着解释每一步。”你把这条威胁也存了。今晚没能让他闭嘴，却让所有人第一次看到，你不是一口气把责任全揽下的那个许照。

`A2b.public.r4.reply.003`

写入与操作：`[{"op":"set","key":"visibility_xu","value":"noticed"},{"op":"set","key":"lu_relation","value":"ally"}]`

后继：`@schedule`

### 选择 A2b/quiet

暗中稳住：把证据交核验人，不吃眼前风头

可选条件：`null`

立即回应：

**旁白**：你把自己有权留的记录发给核验人，说明暂时不接受采访。

`A2b.quiet.r4.reply.001`

**沈清辞**：记录我收到了。名单按实际分工列名，回执也会留下。你没上热搜，但往后谁想改口，得先面对这些材料。

`A2b.quiet.r4.reply.002`

**旁白**：你保存了回执，没有转发那条宣传消息。

`A2b.quiet.r4.reply.003`

写入与操作：`[{"op":"set","key":"visibility_xu","value":"quiet"}]`

后继：`@schedule`

### 选择 A2b/cooperate

借原男主的声量：他转发，我亲自说明

可选条件：`null`

立即回应：

**许照**：名单转发时，能把台前救场和音控的分工分别写清吗？

`A2b.cooperate.r4.reply.001`

**陆景行**：能。主持问起你做了什么，你自己讲。

`A2b.cooperate.r4.reply.002`

**旁白**：陆景行发来分工表：“我只能说我看见的，剩下你自己来。”你答应了。这次合作不是抱大腿，是让每份贡献都见得了光。

`A2b.cooperate.r4.reply.003`

写入与操作：`[{"op":"set","key":"visibility_xu","value":"partner"},{"op":"set","key":"lu_relation","value":"partner"}]`

后继：`@schedule`


---

## A3a｜第三天：一间旁厅，两套未来

类型：`common`。元数据：`{"background":"theatre","music":"quiet","decisionSteps":[{"id":"fight","label":"陪她试着把独立舞台留下来","options":["cooperative","shared","residency"],"reply":[{"speaker":"S","text":"我愿意试，但别为了哄我说一定能成。你帮我算清第一场就好。","id":"A3a.v413.fight.reply.001","textHash":"45825b4cae5e0120"}],"after":[{"speaker":"N","text":"她重新打开成本表，在场租、时段和备选空间之间画了三条线。","id":"A3a.v413.fight.after.001","textHash":"4f8afecb01cb3d6c"}]},{"id":"release","label":"尊重她退出的权利，不用情怀绑住她","options":["exit","leave"],"reply":[{"speaker":"S","text":"你没劝我死守，反倒让我敢承认自己也会累。","id":"A3a.v413.release.reply.001","textHash":"749b85d2203984d6"}],"after":[{"speaker":"N","text":"桌上的交接清单还空着；走得体面和什么都不管，是两回事。","id":"A3a.v413.release.after.001","textHash":"155e83acca76dae4"}]}],"next":"A3b","clock":{"day":3,"time":"21:00"}}`

### 正文

**旁白**：第三天傍晚，旁厅只剩一盏灯。巡演开出稳定租金，条件是让出主要时段；独立夜场若想留下，就得自己承担空场风险。沈清辞面前只剩两份难看的方案。

`A3a.r4.body.001`

**沈清辞**：我舍不得这里。可我也不能让别人为了我那点舍不得，连工资都拿不稳。

`A3a.r4.body.002`

**顾晚棠**：我可以谈时段，也能给出预算上限。但别人还没批准的钱，我今天不能写进承诺。

`A3a.r4.body.003`

**旁白**：陆景行把排练表铺在旁边，真的需要空出来的晚上。他没有催，只是等清辞把话说完。

`A3a.r4.body.004`

**沈清辞**：亏损由谁承担，这栏我会自己签。你要帮，就说能做哪一步，别替我承诺一座剧场。

`A3a.r4.body.005`

### 选择 A3a/cooperative

小规模开战：试一场能算清账的夜演

可选条件：`null`

立即回应：

**许照**：先办一场成本压得住的小演出，看看票钱能不能补上场租。

`A3a.cooperative.r2.reply.001`

**沈清辞**：别先拉一群人表态。试运行那天，你愿意来点一次人数就够。

`A3a.cooperative.r2.reply.002`

**旁白**：她开始约试场，第一件事就让你负责记录实际到场人数。钥匙和预算都还没到手，但独立夜场从一句口号变成了能检验的一张表。

`A3a.cooperative.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_s","value":"cooperative"},{"op":"set","key":"opportunity_s","value":true}]`

后继：`A3b`

### 选择 A3a/shared

借力竞争：巡演与独立演出共用时段

可选条件：`null`

立即回应：

**许照**：先试一次巡演撤场，再试小剧场进场。纸上空出两小时没用。

`A3a.shared.r2.reply.001`

**沈清辞**：这句实际。我约他们做交接演练。

`A3a.shared.r2.reply.002`

**旁白**：陆景行答应派团队参加一次进撤场测试。清辞当场把测试日期写下来：合作能否成，取决于那天能不能真腾出两个小时。

`A3a.shared.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_s","value":"shared_use"},{"op":"set","key":"opportunity_s","value":true}]`

后继：`A3b`

### 选择 A3a/residency

换地图：寻找流动驻场，不死守旧厅

可选条件：`null`

立即回应：

**许照**：看看别的空间。这里留不住，也别让节目全停了。

`A3a.residency.r2.reply.001`

**沈清辞**：我知道两个小地方。先去试灯，不能只看照片。

`A3a.residency.r2.reply.002`

**旁白**：两家新场地的地址发到你手机上。原来的厅可能留不住，独立节目却第一次有了不靠这把钥匙的退路。

`A3a.residency.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_s","value":"residency"},{"op":"set","key":"opportunity_s","value":true}]`

后继：`A3b`

### 选择 A3a/exit

止损撤出：结清预约，保住团队

可选条件：`null`

立即回应：

**许照**：先准备交接。真想停下，也得把现有预约交接清楚。

`A3a.exit.r2.reply.001`

**沈清辞**：我会把停下来的账算明白。交钥匙前，我还会再想一次。

`A3a.exit.r2.reply.002`

**旁白**：她发出交接意向，保留现有预约直到有人确认接手。旁厅未必能救，但至少不让剩下的人替这次退出吞下所有损失。

`A3a.exit.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_s","value":"chosen_exit"},{"op":"set","key":"opportunity_s","value":true}]`

后继：`A3b`

### 选择 A3a/leave

放弃这局：先保自己的时间和精力

可选条件：`null`

立即回应：

**许照**：这次我顾不上协调。你需要我交接的工作，我会写清。

`A3a.leave.r2.reply.001`

**沈清辞**：好。我再找其他办法。

`A3a.leave.r2.reply.002`

**旁白**：你退出协调，清辞没有把这理解成背叛，只是继续找人。代价也很清楚：巡演方案仍占优势，那个独立时段不会因你一句好话自动留下。

`A3a.leave.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_s","value":"displaced"},{"op":"set","key":"opportunity_s","value":true}]`

后继：`A3b`


---

## A3b｜第4日晚，你先答应谁

类型：`common`。元数据：`{"background":"corridor","music":"warm","decisionSteps":[{"id":"creative","label":"先回应音乐和影像，不拿邀请当许诺","options":["t","l"],"reply":[{"speaker":"P","text":"我想认真听一个人的作品，今晚的时间得说准。","id":"A3b.v413.creative.reply.001","textHash":"f1bc2bdc4b1cf392"}],"after":[{"speaker":"N","text":"两条私信停在屏幕上：一条是新尾奏，一条是没剪完的短片。","id":"A3b.v413.creative.after.001","textHash":"08e9dc183d7015ea"}]},{"id":"practical","label":"先看现场与现实安排，不随口答应","options":["s","g","none"],"reply":[{"speaker":"P","text":"我不想一句“都行”让所有人白等。先把能去的说清楚。","id":"A3b.v413.practical.reply.001","textHash":"def1df97bca85c6d"}],"after":[{"speaker":"N","text":"清辞的试灯、晚棠的夜宵和留空档，都是需要你负责的真实安排。","id":"A3b.v413.practical.after.001","textHash":"6411eccc1d5a3bb0"}]}],"next":"LU_MOVE1"}`

### 正文

**旁白**：第4日晚，项目群里一口气冒出几条公开邀约：映雪要试新尾奏、清辞的旁厅试灯、见月开放一小段剪辑试听，晚棠还问有没有人想去后街吃面。熟悉的人和还没来得及认识的人，都有自己的安排。

`A3b.r4.body.001`

**唐映雪**：我把尾奏又试了两遍。今晚在排练室放给想听的人听——你要不要来？

`A3b.r4.body.002`

**沈清辞**：旁厅今晚试灯，结束后我会留十分钟听反馈。有空的话来坐坐，别专挑好听的话说。

`A3b.r4.body.003`

**林见月**：我今天拍到一段奇怪的声音，打算在剪辑室试着补完。你想来听的话，提前告诉我。

`A3b.r4.body.004`

**顾晚棠**：后街那家面馆我订了两个座。你要是想来，回我一声。不谈合同，说到做到。

`A3b.r4.body.005`

**旁白**：你把屏幕上的四个邀约看了又看：这不是四张能无限领取的任务卡，而是四个人真会记得的约定。今晚只能到一处；被你放下的机会，也会往前走。

`A3b.r4.body.006`

### 选择 A3b/t

明确答应唐映雪：第4日晚，给你留时间。

可选条件：`null`

立即回应：

**许照**：第4日晚，我来。几点方便？

`A3b.t.r4.reply.001`

**唐映雪**：八点。你别一进门就找活，先坐下听。

`A3b.t.r4.reply.002`

**旁白**：你把时间存进日程。

`A3b.t.r4.reply.003`

写入与操作：`[{"op":"set","key":"promise_target","value":"t"},{"op":"set","key":"promise_due","value":7}]`

后继：`LU_MOVE1`

### 选择 A3b/s

明确答应沈清辞：第4日晚，给你留时间。

可选条件：`null`

立即回应：

**许照**：第4日晚八点，我能到旁厅。

`A3b.s.r4.reply.001`

**沈清辞**：好。我把位置留好。有变动提前发我。

`A3b.s.r4.reply.002`

**旁白**：你确认了地点，没有再同意别的邀请。

`A3b.s.r4.reply.003`

写入与操作：`[{"op":"set","key":"promise_target","value":"s"},{"op":"set","key":"promise_due","value":7}]`

后继：`LU_MOVE1`

### 选择 A3b/l

明确答应林见月：第4日晚，给你留时间。

可选条件：`null`

立即回应：

**许照**：第4日晚八点，我来听。

`A3b.l.r4.reply.001`

**林见月**：好。这次声音清楚，不用猜那两秒了。

`A3b.l.r4.reply.002`

**旁白**：你设好提醒，回了一句“到时见”。

`A3b.l.r4.reply.003`

写入与操作：`[{"op":"set","key":"promise_target","value":"l"},{"op":"set","key":"promise_due","value":7}]`

后继：`LU_MOVE1`

### 选择 A3b/g

明确答应顾晚棠：第4日晚，给你留时间。

可选条件：`null`

立即回应：

**许照**：第4日晚有空，八点一起吃饭？

`A3b.g.r4.reply.001`

**顾晚棠**：行。你挑店，别挑到最后又让我做主。

`A3b.g.r4.reply.002`

**旁白**：你把约定记下来，顺手打开了地图。

`A3b.g.r4.reply.003`

写入与操作：`[{"op":"set","key":"promise_target","value":"g"},{"op":"set","key":"promise_due","value":7}]`

后继：`LU_MOVE1`

### 选择 A3b/none

今天不许诺，排定以后再主动约

可选条件：`null`

立即回应：

**旁白**：你逐一回复还没排定，今天先不答应。她们各自继续安排，没有替你一直空着那个晚上。

`A3b.none.r4.reply.001`

写入与操作：`[{"op":"set","key":"promise_target","value":"none"},{"op":"set","key":"promise_due","value":7}]`

后继：`LU_MOVE1`


---

## A4a｜第五天，她的报名按钮只亮到今晚

类型：`common`。元数据：`{"background":"projection","music":"travel","decisionSteps":[{"id":"create","label":"陪她争取属于自己的镜头和发表机会","options":["fellowship","stay","film"],"reply":[{"speaker":"L","text":"你不是说“我给你拍”，而是问我想把镜头放在哪儿。那我愿意试。","id":"A4a.v413.create.reply.001","textHash":"20ea3bd565bbedbf"}],"after":[{"speaker":"N","text":"申请页倒计时还在，她把自己写的分镜移到最上方。","id":"A4a.v413.create.after.001","textHash":"8b875b5df904128a"}]},{"id":"guard","label":"先尊重许可和边界，不替她做决定","options":["cut","none"],"reply":[{"speaker":"L","text":"谢谢。素材是人的故事，不是我想用就能用，也不是你想帮就能帮。","id":"A4a.v413.guard.reply.001","textHash":"dcbb96858e384ab3"}],"after":[{"speaker":"N","text":"她关掉未经确认的文件夹，剩下的是你真正愿意承担的那一部分。","id":"A4a.v413.guard.after.001","textHash":"e89b9276d4422128"}]}],"next":"A4b","clock":{"day":5,"time":"20:00"}}`

### 正文

**旁白**：第五天，林见月的外出项目报名只剩最后几个小时。她的短片还能补交，报名资格却不能补。另一边，陆景行的巡演跟拍合同正等她签。

`A4a.r4.body.001`

**林见月**：材料明明都在这儿，我写到自己名字就突然觉得不够格。

`A4a.r4.body.002`

**旁白**：电脑另一边弹着陆景行的巡演跟拍邀约。那份工作熟悉、稳定，也最容易把她想拍的片子往后推。

`A4a.r4.body.003`

**林见月**：我想试着出去。报名我自己按，你帮我选的不是去哪儿，而是接下来哪件事先落地。

`A4a.r4.body.004`

### 选择 A4a/fellowship

抢报名资格：今晚先占一个窗口

可选条件：`null`

立即回应：

**许照**：先报名。补交作品的窗口还有，别等万事俱备才占位置。

`A4a.fellowship.r2.reply.001`

**旁白**：申请成功的邮件弹了出来，见月把屏幕转给你看，嘴角没压住。不是拿到录取，但至少下一次，她不会再被“没报名”三个字淘汰。

`A4a.fellowship.r2.reply.002`

**林见月**：下一封邮件，可不能只有“我很想去”。

`A4a.fellowship.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_l","value":"fellowship"},{"op":"set","key":"opportunity_l","value":true}]`

后继：`A4b`

### 选择 A4a/stay

留城自立：先锁四个自己的拍摄日

可选条件：`null`

立即回应：

**许照**：先留出自己的拍摄日。别让“留下”又变成随叫随到。

`A4a.stay.r2.reply.001`

**林见月**：那就先定四个镜头。拍完，再说整个项目。

`A4a.stay.r2.reply.002`

**旁白**：她拿出日历当场划掉四个跟拍空档。陆景行的邀请还在，但镜头里该先有她自己的故事。你看见她第一次主动拒绝“随叫随到”。

`A4a.stay.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_l","value":"chosen_stay"},{"op":"set","key":"opportunity_l","value":true}]`

后继：`A4b`

### 选择 A4a/film

小场首映：先交出能被看见的样片

可选条件：`null`

立即回应：

**许照**：约一个小放映的候选时段，先交一段样片给他们看看。

`A4a.film.r2.reply.001`

**林见月**：你还挺会给人挖坑。

`A4a.film.r2.reply.002`

**旁白**：候选放映时段申请发出。场地方没有立刻答应，却给了明确的样片截止日——那部一直“等以后再做”的片子，终于有了不能再拖的日期。

`A4a.film.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_l","value":"release_film"},{"op":"set","key":"opportunity_l","value":true}]`

后继：`A4b`

### 选择 A4a/cut

把事实剪完整：逐项拿授权再公开

可选条件：`null`

立即回应：

**许照**：先做一段能公开的节选。该问谁的，逐个问清楚。

`A4a.cut.r2.reply.001`

**林见月**：我来列名单。别把所有素材都算成我的。

`A4a.cut.r2.reply.002`

**旁白**：见月把需要询问的人列成清单。你没替她偷拿素材，也没有让真相被好看的剪辑盖掉。第七天能用哪一段，要由这些答复决定。

`A4a.cut.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_l","value":"authorized_cut"},{"op":"set","key":"opportunity_l","value":true}]`

后继：`A4b`

### 选择 A4a/none

不介入：把精力留给自己正在打的仗

可选条件：`null`

立即回应：

**许照**：这次我先去忙自己的事。你决定好再告诉我。

`A4a.none.r2.reply.001`

**林见月**：好。我今晚先把报名窗口留着。能补多少，还得看后面。

`A4a.none.r2.reply.002`

**旁白**：她暂时保存草稿，继续独自写申请。你省下今晚的精力，也明白这次没有替她占到任何确定名额。

`A4a.none.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_l","value":"silenced"},{"op":"set","key":"opportunity_l","value":true}]`

后继：`A4b`


---

## A4b｜第五夜：程放说漏嘴的后半句

类型：`common`。元数据：`{"background":"projection","music":"pulse","next":"@schedule"}`

### 正文

**旁白**：第五晚，见月把耳机塞到你手里。杂音后，程放的声音突然清楚起来：“错版文件不是许照导出的。”你一瞬间忘了呼吸——这句在原著里从来没机会被播放。

`A4b.r42.body.001`

**旁白**：宣传片却只留下你靠近设备箱的一秒，字幕写着“临时人员操作失误”。你终于看懂了这条宣传片的陷阱：只要剪掉时间顺序，谁站得离箱子近，锅就是谁的。

`A4b.r42.body.002`

**许照**：第七天只剩两天。我不能指望一句真话自己走到台前。见月，能从头再放一遍吗？

`A4b.r42.body.003`

**林见月**：我再放一遍。里面有别人的私话，不能整段发出去。但事实也不能只剩字幕那八个字。先把能核验的问答标出来。

`A4b.r42.body.004`

### 条件正文 · A4b.r42.block.canon

条件：`{"eq":["canon_kept",true]}`

**旁白**：你那晚没有递盘，画面里只有你站在设备箱边和程放的模糊手势。宣传稿仍准备把操作失误写在你身上。

`A4b.r42.block.canon.001`

### 条件正文 · A4b.r42.block.changed

条件：`{"eq":["opening_changed",true]}`

**旁白**：预剪片只保留你把蓝标U盘递到控台的一秒，剪掉了阿衡试听和切换的部分，看起来像全程都是你在操作。

`A4b.r42.block.changed.001`

### 条件正文 · A4b.r42.block.forkproof

条件：`{"eq":["proof_version_log",true]}`

**旁白**：你首演当晚保留的双版本核对时间，可以和见月的原声比对；两份材料能相互校验，但仍要确认可公开范围。

`A4b.r42.block.forkproof.001`

### 条件正文 · A4b.r42.block.canonpaper

条件：`{"eq":["canon_signed_blame",true]}`

**旁白**：你想起自己曾签过那张模糊交接单。见月没替你抹掉它：材料里必须同时说清当时签了什么。

`A4b.r42.block.canonpaper.001`

### 选择 A4b/extract

拿核验节选：锁住那句关键原声

可选条件：`null`

立即回应：

**旁白**：见月截出关于文件和切换的完整问答。你们找相关当事人核对，确认没有把谁的话截成反意。

`A4b.extract.r4.reply.001`

**林见月**：这段能用于责任复核。项目原件我保留，你拿节选和时间标记。

`A4b.extract.r4.reply.002`

**旁白**：你听见程放那句“不是许照导出的”，胸口像被松开一只手。现在不是赢了——只是拿到了第七天能把假字幕顶回去的第一张硬牌。

`A4b.extract.r4.reply.003`

写入与操作：`[{"op":"add","key":"evidence","value":1},{"op":"set","key":"raw_record","value":"authorized"},{"op":"set","key":"proof_audio","value":true}]`

后继：`@schedule`

### 选择 A4b/witness

走人证路线：让现场人亲口说出顺序

可选条件：`null`

立即回应：

**阿衡**：开演前错版就已经在系统里了。谁导出的我不知道；后来谁值守控台、谁帮着补救，我只能确认亲眼见过的。

`A4b.witness.r4.reply.001`

**旁白**：阿衡把自己实际值守的时段写进记录，你只确认自己接手的时间和亲手做过的事。两人各留一份。

`A4b.witness.r4.reply.002`

写入与操作：`[{"op":"add","key":"evidence","value":1},{"op":"set","key":"raw_record","value":"witness"},{"op":"set","key":"proof_witness","value":true}]`

后继：`@schedule`

### 选择 A4b/wait

暂不动录音：另找线索，承受时间风险

可选条件：`null`

立即回应：

**旁白**：见月把这段资料保留，你没有拿到一个可直接使用的副本。

`A4b.wait.reply.001`

**林见月**：可以。但第7日不一定还来得及重新找所有人。

`A4b.wait.reply.002`

**旁白**：离第七天只剩两天。你没冒险拿走未经确认的录音，也得接受没补到新证据的代价。见月望着你：“真要用，别到最后一天才来问。”

`A4b.wait.reply.004`

写入与操作：`[{"op":"set","key":"raw_record","value":"unused"}]`

后继：`@schedule`


---

## A5a｜第六天：她拒绝替所有人签字

类型：`common`。元数据：`{"background":"office","music":"glass","decisionSteps":[{"id":"defend","label":"陪晚棠把责任和决定权一并争回来","options":["independent","bounded","account"],"reply":[{"speaker":"G","text":"我不是求你给我开脱。我想让每一笔钱和每一次签字，都回到该负责的人名下。","id":"A5a.v413.defend.reply.001","textHash":"7023bf229253b9c8"}],"after":[{"speaker":"N","text":"她摊开邮件与预算记录，准备面对一场不会轻松的核对。","id":"A5a.v413.defend.after.001","textHash":"50a3ad670c5e592d"}]},{"id":"freedom","label":"承认她有权离开，也有权不用你救场","options":["leave","none"],"reply":[{"speaker":"G","text":"你没说“忍一忍就过去”。这句话反而让我敢想离开以后怎么办。","id":"A5a.v413.freedom.reply.001","textHash":"826d7343a66a8391"}],"after":[{"speaker":"N","text":"人可以退出错误的局，退出之前要不要交接，是两种不同的承担。","id":"A5a.v413.freedom.after.001","textHash":"1602ecec12866a88"}]}],"next":"A5b","clock":{"day":6,"time":"19:00"}}`

### 正文

**旁白**：第六天，晚棠面前摆着一份明天就会公开的说明：好处写得含糊，坏账全留她签。她曾在邮件里反对删掉独立演出，反对意见却被缩成一行不起眼的小字。

`A5a.r4.body.001`

**顾晚棠**：让我站出来解释，倒不肯把我当时反对的那句话放出来。算盘打得挺响。

`A5a.r4.body.002`

**原著记忆**：（原著里她签过这页，最后一个人吞下骂名。我明天也得跟程放摊牌。如果现在替晚棠空口保证，只会把她推到另一个坑里。真正能帮上的，是把她有权做的决定摆到台面。）

`A5a.r4.body.003`

**顾晚棠**：我答应过的我认。没让我决定的，也别想塞进我的签名里。这一页我先不签，等责任写清楚再谈。

`A5a.r4.body.004`

**旁白**：她没急着翻页，指尖把纸角折了一下又慢慢抚平。你听见笔帽轻轻磕在桌边，忽然意识到这不是她每天都能轻松说出的“不”。

`A5a.r4.body.005`

### 选择 A5a/independent

争决定权：有权说了算，才承担后果

可选条件：`null`

立即回应：

**许照**：先找出你确实做过决定的部分。要你签，就给你相应的话语权。

`A5a.independent.r2.reply.001`

**顾晚棠**：那得有人肯为这一版开会。我来约，你帮我核一处被换掉的文字。

`A5a.independent.r2.reply.002`

**旁白**：晚棠把异议发进正式会议流程，会议还没开，但“只让我签字不给我决定权”终于变成了一项必须回答的问题。

`A5a.independent.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_g","value":"independent"},{"op":"set","key":"opportunity_g","value":true}]`

后继：`A5b`

### 选择 A5a/bounded

改责任边界：合作继续，拒绝无限兜底

可选条件：`null`

立即回应：

**许照**：合作可以继续。把无限兜底那句删掉，再谈你承担的部分。

`A5a.bounded.r2.reply.001`

**顾晚棠**：你终于不是来劝我掀桌的。那我们改这一页。

`A5a.bounded.r2.reply.002`

**旁白**：她用红笔删掉“承担所有后续损失”那句，补上真实权限和预算。还没签字，但已经不肯再按别人准备的版本谈。

`A5a.bounded.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_g","value":"bounded_partner"},{"op":"set","key":"opportunity_g","value":true}]`

后继：`A5b`

### 选择 A5a/account

公开完整事实：好坏都认，只认自己那份

可选条件：`null`

立即回应：

**许照**：把你压过的预算和没参与的决定分开说。先拿到可公开的材料。

`A5a.account.r2.reply.001`

**顾晚棠**：不好听的那部分也会留下。你确定还想帮我？

`A5a.account.r2.reply.002`

**许照**：你肯把难听的那部分也讲出来，我就愿意帮你把话说全。我们要争的是能经得起核验的事实，不是漂亮的口号。

`A5a.account.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_g","value":"public_account"},{"op":"set","key":"opportunity_g","value":true}]`

后继：`A5b`

### 选择 A5a/leave

带着清单离开：不签不属于她的债

可选条件：`null`

立即回应：

**许照**：先做离职交接。真要走，也别让别人替你写离开的理由。

`A5a.leave.r2.reply.001`

**顾晚棠**：好。我先查未完的责任，正式交接那天再交门卡。

`A5a.leave.r2.reply.002`

**旁白**：晚棠列出未结责任和要交还的权限，开始准备正式离开。她不是被一句“有骨气”推下悬崖的人——退路也是她自己算出来的。

`A5a.leave.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_g","value":"leave_family"},{"op":"set","key":"opportunity_g","value":true}]`

后继：`A5b`

### 选择 A5a/none

先顾自身：这场责任谈判交还给她

可选条件：`null`

立即回应：

**许照**：现在我得先保住自己的名字。这场讨论我不参加。

`A5a.none.r2.reply.001`

**顾晚棠**：我知道。那我自己再争一次。

`A5a.none.r2.reply.002`

**旁白**：她没有要求你留下帮忙，自己继续约能修改方案的人。你把时间留给第七天，晚棠这场仗却不会为你暂停。

`A5a.none.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_g","value":"scapegoated"},{"op":"set","key":"opportunity_g","value":true}]`

后继：`A5b`


---

## A5b｜第六天：原男主向我发战书

类型：`common`。元数据：`{"background":"stage","music":"pulse","decisionSteps":[{"id":"face","label":"和陆景行把合作、竞争、误解摆到台面","options":["ally","rival","repair"],"reply":[{"speaker":"LU","text":"行，那就拿方案说话。合作我不会送你分，竞争也不会少你那一份。","id":"A5b.v413.face.reply.001","textHash":"e6f823d081ef3064"}],"after":[{"speaker":"N","text":"他把谱夹放到一旁，等你选择是并肩做事，还是用作品分高下。","id":"A5b.v413.face.after.001","textHash":"896b5c3225470b69"}]},{"id":"leave","label":"不再围着原男主转，走自己的路","options":["distance","independent"],"reply":[{"speaker":"LU","text":"你想另走一条路，我听懂了。别到最后又把这件事算在别人头上。","id":"A5b.v413.leave.reply.001","textHash":"2f8bfe03292497dd"}],"after":[{"speaker":"N","text":"舞台依旧亮着，可下一张工作证不必由陆景行递给你。","id":"A5b.v413.leave.after.001","textHash":"fa85ebe96567f430"}]}],"next":"@schedule"}`

### 正文

**旁白**：陆景行试完一段琴，没有急着收谱。他在台边叫住你，灯架把两个人的影子拉得很长。

`A5b.r4.body.001`

**陆景行**：那场首演以后，我们俩都绕不开这些新麻烦。许照，你跟原来那个闷不吭声的人，似乎不太一样。

`A5b.r4.body.002`

**许照**：我也不知道自己能撑几天。可总不能等别人把最后一页替我写完。

`A5b.r4.body.003`

**陆景行**：下一轮名额不看谁先救场，只看谁交得出成果。许照，要并肩还是对手？

`A5b.r4.body.004`

**旁白**：陆景行没有走开等你的回答。他抬手又弹了一遍自己没弹顺的地方，像在提醒你：不管你怎么选，他都有自己的日子要继续。

`A5b.r4.body.005`

### 条件正文 · A5b.variant.001

条件：`{"eq":["lu_relation","partner"]}`

**陆景行**：你之前说按分工合作，我同意。今天不把那件事顺手写成我一个人的成绩。

`A5b.variant.001.001`

### 条件正文 · A5b.variant.002

条件：`{"eq":["lu_scene","work"]}`

**陆景行**：上次对过的现场步骤，今天也能用。有你负责的部分，我会具体说明。

`A5b.variant.002.001`

### 条件正文 · A5b.variant.003

条件：`{"eq":["lu_scene","compete"]}`

**陆景行**：上次你说想竞争，挺好。这次各拿自己做过的事说话。

`A5b.variant.003.001`

### 条件正文 · A5b.variant.004

条件：`{"eq":["lu_scene","ask"]}`

**陆景行**：你上次问我怎么判断机会，我后来也想了。不是每次都猜得准，今天也一样。

`A5b.variant.004.001`

### 条件正文 · A5b.variant.005

条件：`{"eq":["visibility_xu","noticed"]}`

**陆景行**：主持已经记住你名字了。之后怎么做，还是看具体的事。

`A5b.variant.005.001`

### 条件正文 · A5b.variant.006

条件：`{"eq":["visibility_xu","quiet"]}`

**陆景行**：上次你留在后面，我看见了。今天想怎么参与，可以直接说。

`A5b.variant.006.001`

### 条件正文 · A5b.variant.007

条件：`{"eq":["visibility_xu","partner"]}`

**陆景行**：你愿意把参与者的工作分清，我记着。今天继续这样谈。

`A5b.variant.007.001`

### 条件正文 · A5b.variant.008

条件：`{"eq":["visibility_xu","watched"]}`

**旁白**：程放特意盯了你一眼。之前的强硬口气让他防备，但不是实物证据。

`A5b.variant.008.001`

### 选择 A5b/ally

联手争名额：分工清楚，成绩都要写上

可选条件：`null`

立即回应：

**许照**：我接下来想分工合作。

`A5b.ally.r2.reply.001`

**陆景行**：合作可以。音乐我来，现场流程你来；分工写清楚，别只站旁边出主意。

`A5b.ally.r2.reply.002`

**旁白**：他仍把已经确认的试听时段发进工作群，继续安排自己的下一步。

`A5b.ally.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_lu","value":"ally"},{"op":"set","key":"opportunity_lu","value":true}]`

后继：`@schedule`

### 选择 A5b/rival

正面单挑：同轮投稿，用作品分胜负

可选条件：`null`

立即回应：

**许照**：我接下来想分别交作品。

`A5b.rival.r2.reply.001`

**陆景行**：行。同一轮见。你交你的，我交我的，别谁先替谁认输。

`A5b.rival.r2.reply.002`

**旁白**：他仍把已经确认的试听时段发进工作群，继续安排自己的下一步。

`A5b.rival.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_lu","value":"rival"},{"op":"set","key":"opportunity_lu","value":true}]`

后继：`@schedule`

### 选择 A5b/distance

保持距离：我的计划不绕着你转

可选条件：`null`

立即回应：

**许照**：我接下来想保持必要联系。

`A5b.distance.r2.reply.001`

**陆景行**：收到。要核对现场就联系，别的我自己安排。

`A5b.distance.r2.reply.002`

**旁白**：他把自己的排练计划收好。你没有拿“躲开原男主”当胜利，真正的好处是以后每一份机会，都可以按自己的时间争。

`A5b.distance.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_lu","value":"distant"},{"op":"set","key":"opportunity_lu","value":true}]`

后继：`@schedule`

### 选择 A5b/independent

另开一局：找新的项目和合作方

可选条件：`null`

立即回应：

**许照**：我接下来想各自找新项目。

`A5b.independent.r2.reply.001`

**陆景行**：正好，我在问另一个场地。各自有新消息再说。

`A5b.independent.r2.reply.002`

**旁白**：你收下另一个项目的联络方式。原著只写陆景行跑完巡演，如今你也有了一张不跟着他走的新地图。

`A5b.independent.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_lu","value":"independent"},{"op":"set","key":"opportunity_lu","value":true}]`

后继：`@schedule`

### 选择 A5b/repair

放下成见：谈一次真正的合作

可选条件：`null`

立即回应：

**许照**：我接下来想把先前的误会讲开。

`A5b.repair.r2.reply.001`

**陆景行**：那下次别预先替我下结论。你想问什么，直接问。

`A5b.repair.r2.reply.002`

**旁白**：陆景行听完你之前的误解，反而把修改过的分工表给你看。竞争没有消失，但你不用再把每一次合作都当成输。

`A5b.repair.r2.reply.003`

写入与操作：`[{"op":"set","key":"plan_lu","value":"reconciled"},{"op":"set","key":"opportunity_lu","value":true}]`

后继：`@schedule`


---

## A6a｜第十三章：这次该我发声

类型：`common`。元数据：`{"background":"stage","music":"pulse","decisionSteps":[{"id":"prove","label":"拿前六天真正得到的证据，要求纠正归责","options":["public","partner","backstage"],"reply":[{"speaker":"P","text":"别急着让我签。时间线和原始材料在这里，谁负责哪一段，我们一项一项核。","id":"A6a.v413.prove.reply.001","textHash":"410864d1c41e859e"}],"after":[{"speaker":"N","text":"有人看向控台，有人看向大屏；你必须决定让证据先出现在哪里。","id":"A6a.v413.prove.after.001","textHash":"0ea576e3c9f9aa87"}]},{"id":"leave","label":"不再任由程放安排，承担自己的去留决定","options":["exit","accept","rebuild"],"reply":[{"speaker":"C","text":"想走可以，但别以为离开就能把这张单子变成没发生过。","id":"A6a.v413.leave.reply.001","textHash":"e49e19e4029d849b"}],"after":[{"speaker":"N","text":"侧门还开着。认下指控、拿更正书退出和暂停重建，需要完全不同的凭据。","id":"A6a.v413.leave.after.001","textHash":"dedf7e17eabe1700"}]}],"next":"@afterA6","clock":{"day":7,"time":"20:00"}}`

### 正文

**旁白**：第七天，原著写好的事故视频准时上屏。你靠近设备箱的背影被截成一秒，错误伴奏和控台画面被剪在一起，底下赫然打着“临时人员操作失误”。没有时间线，只留下你这个最好推出来的名字。

`A6a.r42.body.001`

**旁白**：四周的视线齐刷刷转向你。和书里一模一样的侧门、同一张清退单，都已经摆好。不同的是，你口袋里有没有能用的材料，取决于前六天到底做过什么。

`A6a.r42.body.002`

**程放**：许照，事情处理好了，你出去。别耽误下一场。

`A6a.r42.body.003`

**原著记忆**：（第十三章到了。原著里的许照连一句反驳都没说完。今天我有多少资格让全场听我说话，就看前六天有没有留下真正能核验的材料。）

`A6a.r42.body.004`

**旁白**：保安走到侧门。阿衡站在控台旁，见月握着相机却没有擅自拍人；清辞看向你，像在等你给出一句真正能核对的话。

`A6a.r42.body.005`

**旁白**：你抬头看向那行错误字幕。现在能当场反击的，只有这七天亲眼看过、合法留下的证据。没有的东西不能靠“我看过原著”变出来。

`A6a.r42.body.006`

### 条件正文 · A6a.variant.001

条件：`{"eq":["raw_record","authorized"]}`

**林见月**：你要的那段核验节选在这里，完整问答都保留了。私人聊天没有放进去。

`A6a.variant.001.001`

### 条件正文 · A6a.variant.002

条件：`{"eq":["raw_record","witness"]}`

**林见月**：你选择不公开私人影像，我记着。该我亲见的部分，我会自己说明。

`A6a.variant.002.001`

### 条件正文 · A6a.variant.003

条件：`{"eq":["raw_record","unused"]}`

**旁白**：你那次没有请求原声或见证。记忆仍能提醒你，不能自动变成眼前已经取得的材料。

`A6a.variant.003.001`

### 条件正文 · A6a.variant.004

条件：`{"eq":["cheng_style","boundary"]}`

**程放**：你从一开始就不肯多认。行，那今天把每一步都讲清。

`A6a.variant.004.001`

### 条件正文 · A6a.variant.005

条件：`{"eq":["cheng_style","record"]}`

**旁白**：你上次要求把说明留在记录里，现在不用再假装双方什么都没说过。

`A6a.variant.005.001`

### 条件正文 · A6a.variant.006

条件：`{"eq":["cheng_style","bluff"]}`

**旁白**：程放特地盯着你。他记得你之前夸大的口气，今天不会只听一句“我知道”就退开。

`A6a.variant.006.001`

### 条件正文 · A6a.variant.007

条件：`{"eq":["cold_style","record"]}`

**旁白**：首演散场后留下的整张交接单，现在仍然在。你自己的那一栏和前一天的导出时间分得很清楚。

`A6a.variant.007.001`

### 条件正文 · A6a.variant.008

条件：`{"eq":["cold_style","witness"]}`

**阿衡**：首演散场时我确认过，错版不是他导出的。这部分我作证。

`A6a.variant.008.001`

### 条件正文 · A6a.variant.009

条件：`{"eq":["cold_style","observe"]}`

**旁白**：首演散场时，你没有签那份模糊的归责。今天能出示哪些材料，还得看后来亲手准备过什么。

`A6a.variant.009.001`

### 条件正文 · A6a.variant.010

条件：`{"eq":["evidence_style","bounded"]}`

**旁白**：你翻出独自整理过的现场记录。哪句话是谁说的、哪份文件先到，都没有挤进同一行模糊的总结。

`A6a.variant.010.001`

### 条件正文 · A6a.variant.011

条件：`{"eq":["evidence_style","witness"]}`

**旁白**：你想起和现场工作人员一起核对过的那一段。不是所有人都看见了全部经过，但各自负责的部分可以说清。

`A6a.variant.011.001`

### 条件正文 · A6a.variant.012

条件：`{"eq":["evidence_style","memory"]}`

**旁白**：那次你提前离开了核对现场。眼下能说多少，还得看后来真正留下了什么。

`A6a.variant.012.001`

### 条件正文 · A6a.r42.block.canon

条件：`{"eq":["canon_kept",true]}`

**旁白**：那晚陆景行确实弹琴救了场，许照却没有操作错版。可当晚你是否签收了模糊责任，会决定此刻有多少要解释。

`A6a.r42.block.canon.001`

### 条件正文 · A6a.r42.block.changed

条件：`{"eq":["opening_changed",true]}`

**旁白**：首演你找到蓝标盘并交给阿衡；现在宣传片只剩递盘那一秒，音控的核对步骤被剪掉了。

`A6a.r42.block.changed.001`

### 条件正文 · A6a.r42.block.firstsign

条件：`{"eq":["canon_signed_blame",true]}`

**旁白**：程放把你签的旧交接单拍到屏幕上。你不能否认签名，只能靠后来真实查到的记录解释责任范围。

`A6a.r42.block.firstsign.001`

### 条件正文 · A6a.r42.block.forkpreserve

条件：`{"eq":["proof_version_log",true]}`

**旁白**：阿衡举起首夜的双版本核对清单。它不是原著里的道具，却能把这次剪辑缺掉的时间补回来。

`A6a.r42.block.forkpreserve.001`

### 条件正文 · A6a.r42.block.forkconfront

条件：`{"eq":["new_plot_choice","confront"]}`

**旁白**：程放提醒你：“你当晚不是很会问吗？”他早就盯上你的做法，你不能只靠一句“我知道书里怎样”让他退开。

`A6a.r42.block.forkconfront.001`

### 选择 A6a/public

当众反击：把真实时间线投回大屏

可选条件：`{"any":[{"eq":["proof_handoff",true]},{"eq":["proof_witness",true]},{"eq":["proof_audio",true]}]}`

立即回应：



回应条件：`{"eq":["proof_audio",true]}`（按点击前状态判断）

**许照**：画面先别切。请把这段得到许可的完整原声放完——谁导出错版，谁执行切换，让现场所有人自己听。

`A6a.public.r2.audio.001`

**旁白**：阿衡把时间点对上，程放那句“不是许照导出的”从大屏传出。现场的议论声一层层停下，先前那条指向你的字幕终于显得站不住脚。

`A6a.public.r2.audio.002`

**旁白**：程放伸手想停播放，清辞挡住控制台：“完整问答先放完。任何人都不能只剪对自己有利的一秒。”

`A6a.public.r2.audio.003`

回应条件：`{"all":[{"ne":["proof_audio",true]},{"eq":["proof_handoff",true]}]}`（按点击前状态判断）

**许照**：我没有原声，就核这张双方签过的交接单。请放大导出时间和接手时间，不用猜，也不必听我编。

`A6a.public.r2.record.001`

**旁白**：导出时间在你接手之前，责任栏也有不同签名。核验人要求先撤下错误字幕。你第一次看见有人为了你的名字，在原著那块屏幕上按下暂停。

`A6a.public.r2.record.002`

回应条件：`{"all":[{"ne":["proof_audio",true]},{"ne":["proof_handoff",true]},{"eq":["proof_witness",true]}]}`（按点击前状态判断）

**许照**：我没有录音，只有请阿衡亲自确认的那段。他看见的由他说，我看见的由我讲。

`A6a.public.r2.witness.001`

**阿衡**：错版开演前就在系统里。许照接手时版本已经不对；后面控台由我值守。别把不同环节剪成一件事。

`A6a.public.r2.witness.002`

**旁白**：阿衡把时间记录放到桌上，逐项核对。字幕被撤下，保安停在门边。你没靠一段凭空出现的视频翻身，只靠前面真的做过的那几步。

`A6a.public.r2.witness.003`

写入与操作：`[{"op":"set","key":"final_xu","value":"independent"},{"op":"set","key":"saved","value":true}]`

后继：`@afterA6`

### 选择 A6a/partner

联合反击：每个证人讲自己确认的事实

可选条件：`{"any":[{"eq":["proof_handoff",true]},{"eq":["proof_witness",true]},{"eq":["proof_audio",true]}]}`

立即回应：

**旁白**：已参加核验的人各自说清自己看见的部分。你负责自己的时间线；清辞要求更正屏幕上的归责字幕。没有人替你编证词，程放也没法再把所有环节塞成一句话。

`A6a.partner.r2.reply.001`

**陆景行**：这部分已核对。先更正字幕，再谈各自的工作。

`A6a.partner.r2.reply.002`

写入与操作：`[{"op":"set","key":"final_xu","value":"partner"},{"op":"set","key":"saved","value":true}]`

后继：`@afterA6`

### 选择 A6a/backstage

幕后翻盘：先撤假字幕，再做完整复核

可选条件：`{"any":[{"eq":["proof_handoff",true]},{"eq":["proof_witness",true]},{"eq":["proof_audio",true]}]}`

立即回应：

**旁白**：你把有权留存的材料与接手时间交到核验人手里，说明尚待补齐的部分，不用猜测充当结论。

`A6a.backstage.reply.001`

**旁白**：屏幕暂停，核验流程正式启动。你没有当众出风头，却让“临时人员操作失误”无法作为结论继续播放。对方得拿材料说话，不能只拿你的背影。

`A6a.backstage.reply.002`

**沈清辞**：后面的事按事实处理，不拿谁肯不肯出头作判断。

`A6a.backstage.reply.003`

**旁白**：你仍然可以选择做幕后，但不再等于可以被随手剪掉。

`A6a.backstage.reply.004`

写入与操作：`[{"op":"set","key":"final_xu","value":"backstage"},{"op":"set","key":"saved","value":true}]`

后继：`@afterA6`

### 选择 A6a/exit

带着更正书离开：不再给程放打工

可选条件：`{"any":[{"eq":["proof_handoff",true]},{"eq":["proof_witness",true]},{"eq":["proof_audio",true]}]}`

立即回应：

**许照**：我负责的可以确认。没做过的，我不认。更正结果请按约给我。

`A6a.exit.reply.001`

**旁白**：你交回工作牌，留下正式更正申请并保存受理回执。程放再没法拿“明天不让你上班”逼你认错；复核结果还在路上。

`A6a.exit.reply.002`

**旁白**：走出门时你没有突然成为赢家，也没有像原著里那样，不知道自己为什么被赶出来。

`A6a.exit.reply.003`

**旁白**：后面的人生和已经建立的私人关系，仍然可以继续。

`A6a.exit.reply.004`

写入与操作：`[{"op":"set","key":"final_xu","value":"outside"},{"op":"set","key":"saved","value":true}]`

后继：`@afterA6`

### 选择 A6a/accept

认下这一局：不申辩，接受原著退场

可选条件：`null`

立即回应：

**旁白**：你交回工牌，没有要求核验。原著的侧门又一次为许照打开。屏幕上的字幕未必是真相，但你把反击机会留在了门内。

`A6a.accept.r4.reply.001`

**旁白**：手机接连亮了几次，有人问你怎么先走了。你坐在楼外，过了好一会儿才把消息点开。

`A6a.accept.r4.reply.002`

**旁白**：原著的这一页没有改掉。但这次，你记得自己在哪里沉默了。

`A6a.accept.r4.reply.003`

写入与操作：`[{"op":"set","key":"final_xu","value":"expelled"},{"op":"set","key":"saved","value":false},{"op":"set","key":"early_end","value":true}]`

后继：`@afterA6`

### 选择 A6a/rebuild

保住名誉后暂退：重新选择下一份机会

可选条件：`{"any":[{"eq":["proof_handoff",true]},{"eq":["proof_witness",true]},{"eq":["proof_audio",true]}]}`

立即回应：

**旁白**：你要求记录完整更正自己的分工，再暂停接新项目。不是输不起才退出，而是让下一次合作从清楚的条件开始。

`A6a.rebuild.reply.001`

**许照**：新的合作，我想等一等。不是今天拿到一句夸奖，就什么都接。

`A6a.rebuild.reply.002`

**沈清辞**：可以。先把这一件事做完。

`A6a.rebuild.reply.003`

**旁白**：记录得到更正，你保住了自己的名字，也没有马上签下一份新的安排。

`A6a.rebuild.reply.004`

写入与操作：`[{"op":"set","key":"saved","value":true},{"op":"set","key":"final_xu","value":"rebuilding"}]`

后继：`@afterA6`


---

## A6b｜第八天：原著之外，我有下一局

类型：`common`。元数据：`{"background":"river","music":"quiet","next":"EXEC_t"}`

### 正文

**旁白**：天快亮了，你在手机备忘录里找到“第七天被清退”。把那行字划掉时，指尖竟然有点发抖——这一次，是赢过那张清退单以后的余震。

`A6b.r42.body.001`

**许照**：……我真的留下来了。不，不只是没被赶走。下一步，我想自己选。

`A6b.r42.body.002`

**旁白**：有人发来新的项目需求，也有人问你到家没有。这次你不必把工作、朋友和喜欢的人全塞进同一张责任单里；你可以选择先把哪一局打赢。

`A6b.r42.body.003`

**旁白**：第八天不再只是“活下来以后怎么办”。你已经在这儿认识了人，答应过事，也有想自己做的东西。书只写到你退场，却没替你过完余下的日子。

`A6b.r42.body.004`

### 条件正文 · A6b.r42.block.uoffer

条件：`{"eq":["unwritten_future","public_method"]}`

**旁白**：新的事故复盘邀约还在。你答应的是讲清事实，不是替任何团队保证永远不出错。

`A6b.r42.block.uoffer.001`

### 条件正文 · A6b.r42.block.uprivate

条件：`{"eq":["unwritten_future","private_protection"]}`

**旁白**：你保留了私人合作与归档记录，没有把每份证据都送上公共屏幕。

`A6b.r42.block.uprivate.001`

### 条件正文 · A6b.r42.block.uself

条件：`{"eq":["unwritten_future","self_direction"]}`

**旁白**：你拒绝了新邀约，生活第一次空出一个可以只属于自己的晚上。

`A6b.r42.block.uself.001`

### 选择 A6b/relationships

先兑现约定：把真正想见的人约到眼前

可选条件：`null`

立即回应：

**旁白**：你把工作消息先放一边，回给想继续见的人，认真问下一次的时间。

`A6b.relationships.r4.reply.001`

写入与操作：`[{"op":"set","key":"post_intent","value":"relationships"}]`

后继：`EXEC_t`

### 选择 A6b/world

继续改命：帮他们把未完的成果做出来

可选条件：`null`

立即回应：

**旁白**：你翻出还没做完的几件事：新歌、旁厅、片子和那页方案。有些你答应帮忙，还没真的做完。

`A6b.world.r4.reply.001`

写入与操作：`[{"op":"set","key":"post_intent","value":"world"}]`

后继：`EXEC_t`

### 选择 A6b/self

先强大自己：接下一份能署自己名字的活

可选条件：`null`

立即回应：

**旁白**：你先给自己买了份热饭，打开那份还没整理完的工作记录。接下来想接什么活，该自己挑了。

`A6b.self.r4.reply.001`

写入与操作：`[{"op":"set","key":"post_intent","value":"self"}]`

后继：`EXEC_t`


---

## A7a｜第二十一天：我不再是配角

类型：`common`。元数据：`{"background":"stage","music":"finale","decisionSteps":[{"id":"honest","label":"主动把重要关系说清，不再借沉默糊弄","options":["together","private","work"],"reply":[{"speaker":"P","text":"这一次，我不想再让别人靠猜，才知道自己在我心里是什么位置。","id":"A7a.v413.honest.reply.001","textHash":"3f789d08e1b1a894"}],"after":[{"speaker":"N","text":"公开给所有人看，和让真正相关的人知情，是两件不同的事。","id":"A7a.v413.honest.after.001","textHash":"b7c4525dd0220c95"}]},{"id":"boundary","label":"先收住承诺，允许关系各自拥有结局","options":["separate","none"],"reply":[{"speaker":"P","text":"不是每一次靠近都一定要走到结婚那一页，但结束也不能让人凭空猜。","id":"A7a.v413.boundary.reply.001","textHash":"bbecb1914584b95e"}],"after":[{"speaker":"N","text":"你看着那些未读消息，知道回一句话也可能改变别人往后的安排。","id":"A7a.v413.boundary.after.001","textHash":"97f151849fab6701"}]}],"next":"A7b","clock":{"day":21,"time":"19:00"}}`

### 正文

**旁白**：第二十一天，北岸的灯又亮起来。你可能已不在那家公司，也可能拿着新的分工重新进场；无论站在哪边，七天前那张错误字幕都不再能替你定义一生。

`A7a.r2.body.001`

**旁白**：工作有了真实结果，手机里却还有几条重要的私人消息。你终于明白：改掉炮灰结局只是上半场，下一页怎么写，得同时对得起自己和愿意走近你的人。

`A7a.r2.body.002`

### 条件正文 · A7a.variant.001

条件：`{"eq":["final_l","fellowship"]}`

**旁白**：见月的项目回信在昨天到了：进入下一轮沟通。还不是所有出行手续都已确定，但她终于可以讨论实际的拍摄计划。

`A7a.variant.001.001`

### 条件正文 · A7a.variant.002

条件：`{"eq":["final_l","release_film"]}`

**旁白**：见月完成了可提交的短片版本，今晚以后会按计划投送。她没有把尚未收到的入选通知当成已经发生。

`A7a.variant.002.001`

### 条件正文 · A7a.r2.outside

条件：`{"eq":["final_xu","outside"]}`

**旁白**：你已经不在公司任职。这次只在街对面的公共咖啡店处理私人邀请，没有刷旧门卡进后台。

`A7a.r2.outside.001`

### 条件正文 · A7a.r2.inside

条件：`{"ne":["final_xu","outside"]}`

**旁白**：你以已经确认的身份来到活动公共区，工作人员核对了名单，给你指向公共区。

`A7a.r2.inside.001`

### 选择 A7a/together

邀请目前正在交往的人一起见面，把关系范围放在明处。

可选条件：`null`

立即回应：

**旁白**：你没有用临时群聊冒充所有人已经同意。见面前，你把真实范围说清，给每个人回答的机会。

`A7a.together.reply.001`

**旁白**：已经充分相处的人会带着自己的判断来，未解决的矛盾也会一起出现。今晚不能再靠一句“你想多了”把所有问题退回手机里。

`A7a.together.reply.002`

写入与操作：`[{"op":"set","key":"closing_mode","value":"together"},{"op":"discloseAll"},{"op":"set","key":"final_visibility","value":"open"}]`

后继：`A7b`

### 选择 A7a/private

逐一私下确认，不公开给观众；涉及的恋人必须知道实际范围。

可选条件：`null`

立即回应：

**旁白**：观众不需要知道每一段私人关系，当事人却需要。你分别讲清，分别听答复，没有让任何人替另一人点头。

`A7a.private.reply.001`

**旁白**：公众看见的仍然是一场演出。你们知道自己在确认怎样的生活。

`A7a.private.reply.002`

写入与操作：`[{"op":"set","key":"closing_mode","value":"private"},{"op":"discloseAll"},{"op":"set","key":"final_visibility","value":"private"}]`

后继：`A7b`

### 选择 A7a/separate

维持各自的对话，不主动说明彼此；接受关系仍可能未闭合。

可选条件：`null`

立即回应：

**旁白**：你分别回复消息，没有把这些对话连在一起。各自的安排仍留在不同的聊天框里。

`A7a.separate.reply.001`

**旁白**：有些话对方已经知道，有些你仍然没说。新消息又亮起一条，你停了一会儿才回。

`A7a.separate.reply.002`

写入与操作：`[{"op":"set","key":"closing_mode","value":"separate"},{"op":"set","key":"final_visibility","value":"unresolved"}]`

后继：`A7b`

### 选择 A7a/work

今晚只公开工作成果，私下仍如实说清已有的关系。

可选条件：`null`

立即回应：

**旁白**：你们把工作与私人消息分开。节目单没有替谁官宣，工作人员也没被用作感情的见证人。

`A7a.work.reply.001`

**旁白**：该在私下听到的事实，没有因为保持低调而被省掉。

`A7a.work.reply.002`

写入与操作：`[{"op":"set","key":"closing_mode","value":"work"},{"op":"discloseAll"},{"op":"set","key":"final_visibility","value":"work"}]`

后继：`A7b`

### 选择 A7a/none

不安排公开或共同见面，结束自己不准备继续的恋爱承诺。

可选条件：`null`

立即回应：

**旁白**：你提前说清不继续的决定，不让人来到现场才发现自己的位置已经被取消。

`A7a.none.reply.001`

**旁白**：有人失望，有人接受，有人暂时不想回消息。结束也是选择，不是抹掉曾经发生过的一切。

`A7a.none.reply.002`

写入与操作：`[{"op":"set","key":"closing_mode","value":"end"},{"op":"endAll"},{"op":"set","key":"final_visibility","value":"closed"}]`

后继：`A7b`


---

## A7b｜最后一局：选我要的未来

类型：`common`。元数据：`{"background":"river","music":"finale","next":"@ending"}`

### 正文

**旁白**：灯光渐暗。你把实际做成的工作、兑现过的约定，以及仍欠着的回答放在一起。这一回，没有原著标准答案，也没有能替你点头的人。

`A7b.r2.body.001`

### 条件正文 · A7b.variant.001

条件：`{"eq":["resume","real"]}`

**旁白**：你按真实做过的工作发出了简历。一封新的询问要求谈具体职责，不是凭谁的名字直接通过。

`A7b.variant.001.001`

### 条件正文 · A7b.variant.002

条件：`{"eq":["resume","recommend"]}`

**旁白**：你请过熟悉实际工作的人作推荐。对方只介绍自己确认的部分，剩下的仍要由你自己说明。

`A7b.variant.002.001`

### 条件正文 · A7b.variant.003

条件：`{"eq":["resume","inflated"]}`

**旁白**：新询问要求你补交独立负责的案例。简历上夸大的那一部分不会因为今晚热闹就变成真的，这封信仍等着你作出真实回复。

`A7b.variant.003.001`

### 条件正文 · A7b.variant.004

条件：`{"eq":["self_plan","focus"]}`

**旁白**：你早些时候说过想把注意力收回来。现在想起这句话，仍可以问自己有没有做到。

`A7b.variant.004.001`

### 条件正文 · A7b.variant.005

条件：`{"eq":["self_plan","all"]}`

**旁白**：你曾经决定尽量照顾每个人的愿望。今天做成了多少，只能按实际经历回看，不能让一句想做替代结果。

`A7b.variant.005.001`

### 条件正文 · A7b.variant.006

条件：`{"eq":["self_plan","ordinary"]}`

**旁白**：你给自己留过普通生活的空间。最后的决定也不必全是证明自己比原男主更厉害。

`A7b.variant.006.001`

### 条件正文 · A7b.variant.007

条件：`{"eq":["lu_later","ask_her"]}`

**陆景行**：你上次说该问见月本人，我问了。她怎样回答，就是她的决定。

`A7b.variant.007.001`

### 条件正文 · A7b.variant.008

条件：`{"eq":["lu_later","honest"]}`

**陆景行**：你上次承认自己的立场，比替她安排一段好话清楚。今天也别省掉她自己的声音。

`A7b.variant.008.001`

### 条件正文 · A7b.variant.009

条件：`{"eq":["lu_later","claim"]}`

**陆景行**：你上次说自己更懂她，我不认同。以后少拿我们谁认识得多，替她的选择排顺序。

`A7b.variant.009.001`

### 条件正文 · A7b.variant.010

条件：`{"eq":["lu_final","shared"]}`

**旁白**：你在最后的排练里要求分别说明参与者的工作，新的致谢按真实分工念了名字。

`A7b.variant.010.001`

### 条件正文 · A7b.variant.011

条件：`{"eq":["lu_final","own"]}`

**旁白**：你选择自己说清负责的部分。今晚没有人替你把这句话念完。

`A7b.variant.011.001`

### 条件正文 · A7b.variant.012

条件：`{"eq":["lu_final","back"]}`

**旁白**：你最后留在控台。台前是谁不影响你知道自己做完了哪一件事。

`A7b.variant.012.001`

### 条件正文 · A7b.variant.013

条件：`{"eq":["post_intent","relationships"]}`

**旁白**：自救之后，你决定把时间留给相处。后来赴过的约，和还没兑现的打算，现在分得很清楚。

`A7b.variant.013.001`

### 条件正文 · A7b.variant.014

条件：`{"eq":["post_intent","world"]}`

**旁白**：你想继续改掉她们原来的遗憾。今天看到的结果里，有成功，也可能有没来得及的部分。

`A7b.variant.014.001`

### 条件正文 · A7b.variant.015

条件：`{"eq":["post_intent","self"]}`

**旁白**：你曾经说过先把自己的生活安顿好。现在你仍然可以照这个打算继续，不必临时改口。

`A7b.variant.015.001`

### 选择 A7b/honor

继续你们已经认真建立的关系，听取每个人对当前范围的最终回答。

可选条件：`null`

立即回应：

**旁白**：你把自己的意愿说清，停下来听。愿意的人说愿意，仍有问题的人不被合唱盖住。

`A7b.honor.reply.001`

**旁白**：你没有急着接话，让每个人把自己的意思说完。

`A7b.honor.reply.002`

写入与操作：`[{"op":"set","key":"closing_answer","value":"honor"}]`

后继：`@ending`

### 选择 A7b/pause

承认自己还没准备好继续，把不确定说出来，而不是临时许诺。

可选条件：`null`

立即回应：

**旁白**：你没有把她们的回答改写成拒绝，也没有要求谁一直等到你想清楚。

`A7b.pause.reply.001`

**旁白**：她们没有立刻回答。你把手机放好，没有再补一个做不到的保证。

`A7b.pause.reply.002`

写入与操作：`[{"op":"set","key":"closing_answer","value":"pause"},{"op":"endAll"}]`

后继：`@ending`

### 选择 A7b/future

先完成自己的下一步。已有约定能继续就认真继续，不把改命变成只为恋爱。

可选条件：`null`

立即回应：

**旁白**：你有自己的工作、愿望和害怕失去的东西。把它们讲出来，不代表别人不重要。

`A7b.future.reply.001`

**旁白**：你们按已经说清的安排继续，没有谁需要通过放弃整个人生证明心意。做不到的地方，也在今天说清。

`A7b.future.reply.002`

写入与操作：`[{"op":"set","key":"closing_answer","value":"future"}]`

后继：`@ending`


---

## P_st｜五分钟已经过了三次

类型：`pair`。元数据：`{"background":"theatre","music":"warm","next":"Q_st","members":["s","t"],"minSlot":9}`

### 正文

**旁白**：排练又拖了半小时。清辞把包背到肩上，看了一眼你们原本订餐的位置。

`P_st.r4.body.001`

**唐映雪**：最后一遍！这次真的只要五分钟。

`P_st.r4.body.002`

**沈清辞**：映雪，上一次已经用了三个五分钟。

`P_st.r4.body.003`

**许照**：我知道……我那份饭可能已经凉透了。

`P_st.r4.body.004`

**唐映雪**：那你先陪她去吃。我就是怕这段明天又找不到感觉。

`P_st.r4.body.005`

**沈清辞**：我不是非要你现在停。许照，你答应的是陪我吃饭，不是让我在这儿等你有空。

`P_st.r4.body.006`

**旁白**：映雪慢慢放下话筒。再让她们自己商量，只会把你改约的问题推给她们。

`P_st.r4.body.007`

### 条件正文 · P_st.variant.001

条件：`{"ge":["pair_attempts_st",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_st.variant.001.001`

### 条件正文 · P_st.variant.002

条件：`{"eq":["pair_st","waiting"]}`

**沈清辞**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_st.variant.002.001`

### 条件正文 · P_st.variant.003

条件：`{"eq":["pair_st","separate"]}`

**唐映雪**：上次我们各自回去想了。今天要变，也得重新说。

`P_st.variant.003.001`

### 条件正文 · P_st.variant.004

条件：`{"eq":["pair_st","pending"]}`

**沈清辞**：上次那件事还没过去。先说清楚，再谈下一步。

`P_st.variant.004.001`

### 选择 P_st/fixed

按原约去吃饭；给映雪另约试听时间。

可选条件：`null`

立即回应：

**许照**：我先陪清辞去吃饭。映雪，下一次试听我单独留时间，不夹在饭点中间。

`P_st.fixed.r4.reply.001`

**唐映雪**：好。可下次你不准听到一半又看表。

`P_st.fixed.r4.reply.002`

**许照**：成交。我先把时间发你。

`P_st.fixed.r4.reply.003`

**旁白**：清辞看着你发完消息，才把外套递过来。

`P_st.fixed.r4.reply.004`

**沈清辞**：走吧。现在去，老板应该还没把我们的座位收了。

`P_st.fixed.r4.reply.005`

写入与操作：`[{"op":"set","key":"bridge_st","value":"fixed"}]`

后继：`Q_st`

### 选择 P_st/choice

问清辞是否愿意改吃夜宵，不愿意就按原约。

可选条件：`null`

立即回应：

**许照**：清辞，你愿不愿意改吃夜宵？不愿意我们现在就走。

`P_st.choice.r4.reply.001`

**沈清辞**：我想想……可以。但下次别先答应了，再问我能不能改。

`P_st.choice.r4.reply.002`

**许照**：这次是我的问题。

`P_st.choice.r4.reply.003`

**唐映雪**：那就再一首。你们坐着听，我保证。

`P_st.choice.r4.reply.004`

**旁白**：清辞重新放下包，映雪这回没有在唱完后再喊一次重来。

`P_st.choice.r4.reply.005`

写入与操作：`[{"op":"set","key":"bridge_st","value":"asked"}]`

后继：`Q_st`

### 选择 P_st/assume

“清辞，你最懂事，再等一下吧。”

可选条件：`null`

立即回应：

**旁白**：清辞把刚放下的包又拿起来。

`P_st.assume.reply.001`

**沈清辞**：懂事不是不需要安排。你别拿夸我，替我同意。

`P_st.assume.reply.002`

**唐映雪**：我没要求她让。你别把我放到那个位置上。

`P_st.assume.reply.003`

**旁白**：清辞往门口走，映雪关了话筒。你叫住她们，才发现一句“别生气”根本说不出口。

`P_st.assume.reply.004`

写入与操作：`[{"op":"set","key":"bridge_st","value":"unfair"}]`

后继：`Q_st`


---

## Q_st｜五分钟已经过了三次·临走前

类型：`pair_followup`。元数据：`{"background":"theatre","music":"warm","next":"@schedule","members":["s","t"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_st.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_st.r4.body.002`

### 条件正文 · Q_st.variant.001

条件：`{"eq":["bridge_st","fixed"]}`

**旁白**：映雪已经把下一次试听时间发来。清辞也把原先的晚饭约定重新确认，没有谁只得到一句以后再说。

`Q_st.variant.001.001`

### 选择 Q_st/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"st"}`

立即回应：

**旁白**：你把目前所有正在约会的人说清，没把没答应的算成恋人，也没把已经答应的藏起来。

`Q_st.together.reply.001`

**沈清辞**：我愿意继续，也愿意和映雪把共同相处慢慢做好。更多的人要再问，不是这一次替以后全部答应。

`Q_st.together.reply.002`

**唐映雪**：我也愿意。这句不是她替我说的。

`Q_st.together.reply.003`

**旁白**：你们又找了家夜宵摊。映雪嫌你点得太素，清辞却把其中一盘推到自己面前。

`Q_st.together.reply.004`

**沈清辞**：这盘给我。你们想吃辣的自己点。

`Q_st.together.reply.005`

**旁白**：你重新拿起菜单。这回问完每个人想吃什么，才下单。

`Q_st.together.reply.006`

写入与操作：`[{"op":"pairConsent","members":["s","t"]}]`

后继：`@schedule`

### 选择 Q_st/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_st.slow.r4.reply.001`

**沈清辞**：我把这周的私人时间按原来安排。什么时候想清楚，再拿具体计划来问我。

`Q_st.slow.r4.reply.002`

**唐映雪**：那下次找我听歌，先说清是普通见面，还是想谈我们三个人的事。

`Q_st.slow.r4.reply.003`

**旁白**：你没有把今晚直接写进下一次约会。映雪收好耳机，清辞先回去处理自己的日程。

`Q_st.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_st","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_st/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_st.separate.r4.reply.001`

**沈清辞**：先分别约可以。时间别临时互相挤占，约好哪天就认真留给那个人。

`Q_st.separate.r4.reply.002`

**唐映雪**：我不抢别人的时间。来听我的歌就好好听，别一边陪我一边替别人排期。

`Q_st.separate.r4.reply.003`

**旁白**：你分别确认了下次见面的方式，没有顺手替她们订好一场三人约会。

`Q_st.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_st","value":"separate"}]`

后继：`@schedule`

### 选择 Q_st/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_s",true]},{"eq":["value_conflict_s",true]},{"eq":["latent_s",true]},{"eq":["breach_s",true]}]},{"any":[{"eq":["pending_t",true]},{"eq":["value_conflict_t",true]},{"eq":["latent_t",true]},{"eq":["breach_t",true]}]}]}`

立即回应：

**许照**：在请你们答应之前，我有件没说完整的事。

`Q_st.reveal.reply.001`

**旁白**：你把自己的隐瞒与当前交往范围讲清，没有让她们从对方的反应里猜。

`Q_st.reveal.reply.002`

**唐映雪**：那今天先别当成庆祝。

`Q_st.reveal.reply.003`

**沈清辞**：是。接下来的事要分别说，不是你讲完，我们就必须一起点头。

`Q_st.reveal.reply.004`

**旁白**：你们把共同安排暂时放下。已经说出口的事实留下了，修复要在之后的实际相处中完成。

`Q_st.reveal.reply.005`

写入与操作：`[{"op":"confessKnown","character":"s"},{"op":"confessKnown","character":"t"},{"op":"set","key":"pair_st","value":"pending"}]`

后继：`@schedule`


---

## P_lt｜这个镜头先别放

类型：`pair`。元数据：`{"background":"projection","music":"warm","next":"Q_lt","members":["l","t"],"minSlot":9}`

### 正文

**旁白**：见月播放一段后台素材。映雪听见自己的笑声，伸手按了暂停。

`P_lt.r4.body.001`

**唐映雪**：等一下。我当时不知道你在拍。

`P_lt.r4.body.002`

**林见月**：所以我先拿来给你看。没发出去。

`P_lt.r4.body.003`

**唐映雪**：我知道。可我不想又被剪成“失意女歌手终于被人安慰”。

`P_lt.r4.body.004`

**林见月**：我想拍的是你唱完以后很高兴，不是你有多可怜。

`P_lt.r4.body.005`

**旁白**：映雪没接话，见月也没再按播放。画面边缘还有你的半张脸——那天你也在。

`P_lt.r4.body.006`

**许照**：那我们先看你不愿意留下的部分，好不好？

`P_lt.r4.body.007`

### 条件正文 · P_lt.variant.001

条件：`{"ge":["pair_attempts_lt",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_lt.variant.001.001`

### 条件正文 · P_lt.variant.002

条件：`{"eq":["pair_lt","waiting"]}`

**林见月**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_lt.variant.002.001`

### 条件正文 · P_lt.variant.003

条件：`{"eq":["pair_lt","separate"]}`

**唐映雪**：上次我们各自回去想了。今天要变，也得重新说。

`P_lt.variant.003.001`

### 条件正文 · P_lt.variant.004

条件：`{"eq":["pair_lt","pending"]}`

**林见月**：上次那件事还没过去。先说清楚，再谈下一步。

`P_lt.variant.004.001`

### 选择 P_lt/private

请她们一起确认私人版和公开版。

可选条件：`null`

立即回应：

**许照**：我也想留这段。但映雪不想放出去的，就别放。私人版能留哪些，你们一起定？

`P_lt.private.r4.reply.001`

**旁白**：见月把文件拖回开头。映雪看完，指出了两个镜头。

`P_lt.private.r4.reply.002`

**唐映雪**：这两个删掉。笑声可以留，只给我们自己听。

`P_lt.private.r4.reply.003`

**林见月**：好。公开版我改完再发你，不直接上传。

`P_lt.private.r4.reply.004`

**旁白**：她们重新坐到一起。你负责暂停，再也不敢偷偷夸“这段直接发吧”。

`P_lt.private.r4.reply.005`

写入与操作：`[{"op":"set","key":"bridge_lt","value":"private"}]`

后继：`Q_lt`

### 选择 P_lt/retake

先不留这一段，重新拍大家都愿意拍的画面。

可选条件：`null`

立即回应：

**林见月**：重拍会少一点偶然。

`P_lt.retake.reply.001`

**唐映雪**：我知道。但至少这次我知道镜头开着。

`P_lt.retake.reply.002`

**旁白**：你们决定先记录三个人走到门口的一小段。映雪走得太快，你差点出画，见月笑着停机。

`P_lt.retake.reply.003`

**林见月**：好吧，偶然也还在。

`P_lt.retake.reply.004`

**旁白**：你从画面边缘重新探头进去，映雪笑着拽了你一下。见月说，这次可以留。

`P_lt.retake.reply.005`

写入与操作：`[{"op":"set","key":"bridge_lt","value":"retake"}]`

后继：`Q_lt`

### 选择 P_lt/ignore

“多好看，发了吧。你们别想那么多。”

可选条件：`null`

立即回应：

**旁白**：映雪把暂停键按得更实，见月也把电脑合上。

`P_lt.ignore.reply.001`

**唐映雪**：我说的不是好不好看。

`P_lt.ignore.reply.002`

**林见月**：我问的也不是你觉得应不应该。

`P_lt.ignore.reply.003`

**旁白**：映雪不再看屏幕，见月收好了电脑。这个提议没有得到任何一个人的同意。

`P_lt.ignore.reply.004`

写入与操作：`[{"op":"set","key":"bridge_lt","value":"unfair"}]`

后继：`Q_lt`


---

## Q_lt｜这个镜头先别放·临走前

类型：`pair_followup`。元数据：`{"background":"projection","music":"warm","next":"@schedule","members":["l","t"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_lt.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_lt.r4.body.002`

### 条件正文 · Q_lt.variant.001

条件：`{"eq":["bridge_lt","unfair"]}`

**旁白**：刚才擅自要求公开的提议还没有处理。喜欢这段画面，不会替代两人的同意。

`Q_lt.variant.001.001`

### 选择 Q_lt/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"lt"}`

立即回应：

**旁白**：你把真正的关系说清，没有拿任何人的私人聊天来证明另一段感情。

`Q_lt.together.reply.001`

**林见月**：我想继续，也愿意和映雪认真相处。但镜头外的时间，不总要变成作品。

`Q_lt.together.reply.002`

**唐映雪**：我同意。还有，我不想每次一起出现都被叫成修罗场。

`Q_lt.together.reply.003`

**旁白**：映雪打开新歌的小样，不戴耳机，音量开得很低。见月先问能不能留下旁边那声笑，她点头后才开始录。

`Q_lt.together.reply.004`

**旁白**：你坐在中间，听着她们重新放那段录音。

`Q_lt.together.reply.005`

写入与操作：`[{"op":"pairConsent","members":["l","t"]}]`

后继：`@schedule`

### 选择 Q_lt/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_lt.slow.r4.reply.001`

**林见月**：这段先留白。我不急着把今晚剪成一个大家都点头的结尾。

`Q_lt.slow.r4.reply.002`

**唐映雪**：别拿我今晚没有生气当作赞成。想谈，就约个不赶场的时间。

`Q_lt.slow.r4.reply.003`

**旁白**：见月关掉相机，映雪把新歌小样收回耳机里。今晚没有人替对方作决定。

`Q_lt.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_lt","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_lt/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_lt.separate.r4.reply.001`

**林见月**：我想留给自己完整的一晚。分别见面的话，也不用谁替谁留下影像。

`Q_lt.separate.r4.reply.002`

**唐映雪**：行。但别把我们下次碰面包装成你精心安排的惊喜，先问清楚。

`Q_lt.separate.r4.reply.003`

**旁白**：她们把私人影像和下一次邀约分开谈，你没有用一次同桌换来两份默认同意。

`Q_lt.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_lt","value":"separate"}]`

后继：`@schedule`

### 选择 Q_lt/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_l",true]},{"eq":["value_conflict_l",true]},{"eq":["latent_l",true]},{"eq":["breach_l",true]}]},{"any":[{"eq":["pending_t",true]},{"eq":["value_conflict_t",true]},{"eq":["latent_t",true]},{"eq":["breach_t",true]}]}]}`

立即回应：

**旁白**：你停住了原本准备好的邀请，先把没说清的部分告诉她们。

`Q_lt.reveal.reply.001`

**林见月**：谢谢你现在说。但现在说，不等于过去那句就没发生。

`Q_lt.reveal.reply.002`

**唐映雪**：我需要想想。今天不继续定关系了。

`Q_lt.reveal.reply.003`

**旁白**：见月收起相机，映雪没有拿玩笑替这件事圆过去。你们各自知道需要再谈什么，仍然可以决定以后是否见面。

`Q_lt.reveal.reply.004`

写入与操作：`[{"op":"confessKnown","character":"l"},{"op":"confessKnown","character":"t"},{"op":"set","key":"pair_lt","value":"pending"}]`

后继：`@schedule`


---

## P_gt｜今天只是来看你唱歌

类型：`pair`。元数据：`{"background":"recording","music":"warm","next":"Q_gt","members":["g","t"],"minSlot":9}`

### 正文

**旁白**：晚棠拎来一提水，放在映雪试唱的小舞台旁。

`P_gt.r4.body.001`

**唐映雪**：谢谢。这次……要拍到牌子吗？

`P_gt.r4.body.002`

**顾晚棠**：不用，我路过便利店买的。

`P_gt.r4.body.003`

**旁白**：她把准备递过去的那瓶水放在桌上。

`P_gt.r4.body.004`

**顾晚棠**：我今天就是来看你唱歌。你这么一问，我都不知道该不该递了。

`P_gt.r4.body.005`

**唐映雪**：抱歉。我以前真遇过这种事，一杯水都得补一条宣传。

`P_gt.r4.body.006`

**许照**：那今天先把话说开，别渴着吵。

`P_gt.r4.body.007`

### 条件正文 · P_gt.variant.001

条件：`{"ge":["pair_attempts_gt",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_gt.variant.001.001`

### 条件正文 · P_gt.variant.002

条件：`{"eq":["pair_gt","waiting"]}`

**顾晚棠**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_gt.variant.002.001`

### 条件正文 · P_gt.variant.003

条件：`{"eq":["pair_gt","separate"]}`

**唐映雪**：上次我们各自回去想了。今天要变，也得重新说。

`P_gt.variant.003.001`

### 条件正文 · P_gt.variant.004

条件：`{"eq":["pair_gt","pending"]}`

**顾晚棠**：上次那件事还没过去。先说清楚，再谈下一步。

`P_gt.variant.004.001`

### 选择 P_gt/separate

今晚不谈合作，工作另约。

可选条件：`null`

立即回应：

**许照**：那说好了，今晚不聊项目。我点歌也按朋友价——免费？

`P_gt.separate.r4.reply.001`

**唐映雪**：想得美。

`P_gt.separate.r4.reply.002`

**旁白**：映雪自己拿起那瓶水，朝晚棠晃了晃。

`P_gt.separate.r4.reply.003`

**唐映雪**：谢谢。我刚才问得太冲了。

`P_gt.separate.r4.reply.004`

**顾晚棠**：我也没准备好被查赞助。现在两清，唱吧。

`P_gt.separate.r4.reply.005`

写入与操作：`[{"op":"set","key":"bridge_gt","value":"separate"}]`

后继：`Q_gt`

### 选择 P_gt/pay

夜宵各付各的，这瓶水就好好道谢。

可选条件：`null`

立即回应：

**许照**：水我先替自己谢谢了。夜宵咱们各付各的，谁也别抢单？

`P_gt.pay.r4.reply.001`

**顾晚棠**：行。不然我真要怀疑你们连一瓶水都不肯喝。

`P_gt.pay.r4.reply.002`

**旁白**：映雪把手机递过来，给你看她想吃的小摊。

`P_gt.pay.r4.reply.003`

**唐映雪**：我点这份。晚棠，你吃辣吗？

`P_gt.pay.r4.reply.004`

**顾晚棠**：一点。你这个看起来不像“一点”。

`P_gt.pay.r4.reply.005`

**旁白**：她们为辣度讨论了半天，终于不再围着那瓶水猜来猜去。

`P_gt.pay.r4.reply.006`

写入与操作：`[{"op":"set","key":"bridge_gt","value":"shared"}]`

后继：`Q_gt`

### 选择 P_gt/buy

“晚棠能帮你很多，映雪，你就对她好一点。”

可选条件：`null`

立即回应：

**旁白**：映雪把水放回去，晚棠比她更早开口。

`P_gt.buy.reply.001`

**顾晚棠**：别拿我的能力替我买她的态度。

`P_gt.buy.reply.002`

**唐映雪**：我也不想因为有人能帮忙，就必须喜欢一种相处。

`P_gt.buy.reply.003`

**旁白**：你想解释自己只是随口一说，可她们都没有接过那瓶水。

`P_gt.buy.reply.004`

写入与操作：`[{"op":"set","key":"bridge_gt","value":"unfair"}]`

后继：`Q_gt`


---

## Q_gt｜今天只是来看你唱歌·临走前

类型：`pair_followup`。元数据：`{"background":"recording","music":"warm","next":"@schedule","members":["g","t"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_gt.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_gt.r4.body.002`

### 条件正文 · Q_gt.variant.001

条件：`{"eq":["bridge_gt","unfair"]}`

**旁白**：刚才用晚棠的资源交换映雪态度的提议，使共同关系暂时无法确认。

`Q_gt.variant.001.001`

### 选择 Q_gt/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"gt"}`

立即回应：

**旁白**：你讲清当前所有关系，也讲清自己能给出的安排。没拿资源许诺替代陪伴。

`Q_gt.together.reply.001`

**唐映雪**：我愿意。但我约你的时候，不要把我的时间报给别人排期。

`Q_gt.together.reply.002`

**顾晚棠**：我也愿意。我不买优先权，也不接受谁替我默认退后。

`Q_gt.together.reply.003`

**旁白**：散场后，晚棠想去试一家小摊，映雪终于不再问是不是为了拍宣传。她把自己的围巾往晚棠那边推了一点，说外面冷。

`Q_gt.together.reply.004`

**旁白**：你走在旁边，拿着那提还没喝完的水。走出几步，她们一起回头问你：拎得动吗？

`Q_gt.together.reply.005`

写入与操作：`[{"op":"pairConsent","members":["g","t"]}]`

后继：`@schedule`

### 选择 Q_gt/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_gt.slow.r4.reply.001`

**顾晚棠**：暂时不定可以。该取消的邀约先取消，别让谁空等一晚。

`Q_gt.slow.r4.reply.002`

**唐映雪**：那我明天照常排练。见我之前先问我，不用托她传话。

`Q_gt.slow.r4.reply.003`

**旁白**：晚棠把没有确认的时间留空，映雪回去准备排练；你没有把今晚算成承诺。

`Q_gt.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gt","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_gt/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_gt.separate.r4.reply.001`

**顾晚棠**：分别相处没问题。工作便利和私人邀约不要混着排。

`Q_gt.separate.r4.reply.002`

**唐映雪**：那就各自见。唱歌是唱歌，谁出资是谁出资，别拿这些替我们谈感情。

`Q_gt.separate.r4.reply.003`

**旁白**：你把邀约分开确认，晚棠保留自己的决定，映雪也不用谁替她传话。

`Q_gt.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gt","value":"separate"}]`

后继：`@schedule`

### 选择 Q_gt/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_g",true]},{"eq":["value_conflict_g",true]},{"eq":["latent_g",true]},{"eq":["breach_g",true]}]},{"any":[{"eq":["pending_t",true]},{"eq":["value_conflict_t",true]},{"eq":["latent_t",true]},{"eq":["breach_t",true]}]}]}`

立即回应：

**许照**：我想先补一件事实。以前不是像我说的那样。

`Q_gt.reveal.reply.001`

**旁白**：晚棠把杯子放下，映雪也停住了手里的动作。

`Q_gt.reveal.reply.002`

**顾晚棠**：先把事情说全，别急着解释你都是为了谁。

`Q_gt.reveal.reply.003`

**唐映雪**：我会听。但今天不用把我的答案也写好了。

`Q_gt.reveal.reply.004`

**旁白**：你没有靠一个突然坦白换来两份同意。共同安排暂停，已经发生的相处也没有被删除。

`Q_gt.reveal.reply.005`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"confessKnown","character":"t"},{"op":"set","key":"pair_gt","value":"pending"}]`

后继：`@schedule`


---

## P_ls｜片尾不是卡住了

类型：`pair`。元数据：`{"background":"projection","music":"warm","next":"Q_ls","members":["l","s"],"minSlot":9}`

### 正文

**旁白**：片尾黑了八秒。清辞伸手去看播放器，见月轻轻把电脑转了回来。

`P_ls.r4.body.001`

**林见月**：没坏。这里就是八秒。

`P_ls.r4.body.002`

**沈清辞**：现场的观众不知道。他们可能会喊工作人员。

`P_ls.r4.body.003`

**林见月**：前面那个老人刚讲完妻子的事，我不想立刻切字幕。

`P_ls.r4.body.004`

**许照**：我刚才也以为卡了。但现在知道原因，再看感觉不一样。

`P_ls.r4.body.005`

**旁白**：见月不愿随便剪掉，清辞也不愿让观众一边担心机器、一边错过片尾。

`P_ls.r4.body.006`

### 条件正文 · P_ls.variant.001

条件：`{"ge":["pair_attempts_ls",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_ls.variant.001.001`

### 条件正文 · P_ls.variant.002

条件：`{"eq":["pair_ls","waiting"]}`

**林见月**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_ls.variant.002.001`

### 条件正文 · P_ls.variant.003

条件：`{"eq":["pair_ls","separate"]}`

**沈清辞**：上次我们各自回去想了。今天要变，也得重新说。

`P_ls.variant.003.001`

### 条件正文 · P_ls.variant.004

条件：`{"eq":["pair_ls","pending"]}`

**林见月**：上次那件事还没过去。先说清楚，再谈下一步。

`P_ls.variant.004.001`

### 选择 P_ls/both

保留八秒，放映前简短说明。

可选条件：`null`

立即回应：

**许照**：别剪。片前提醒一句“片尾请稍等”，流程表也留好八秒，行吗？

`P_ls.both.r4.reply.001`

**沈清辞**：可以。工作人员知道，就不会急着上台开灯。

`P_ls.both.r4.reply.002`

**林见月**：我来写那一句，不剧透结尾。

`P_ls.both.r4.reply.003`

**旁白**：两个人重新检查了一遍。到黑屏时，清辞这次没有伸手去碰播放器。

`P_ls.both.r4.reply.004`

写入与操作：`[{"op":"set","key":"bridge_ls","value":"context"}]`

后继：`Q_ls`

### 选择 P_ls/test

各看一遍两个版本，再说感受。

可选条件：`null`

立即回应：

**旁白**：你们把两个版本都看完，没有边看边争。

`P_ls.test.r4.reply.001`

**许照**：短版更利落。长版到第五秒的时候，我会再想一次老人说的话。

`P_ls.test.r4.reply.002`

**沈清辞**：我担心的是现场以为出了故障，不是非要剪掉它。

`P_ls.test.r4.reply.003`

**林见月**：那我加个片前提示，工作人员也提前说一声。

`P_ls.test.r4.reply.004`

**旁白**：清辞点头。见月在文件名后加上日期，免得下次拿错版本。

`P_ls.test.r4.reply.005`

写入与操作：`[{"op":"set","key":"bridge_ls","value":"test"}]`

后继：`Q_ls`

### 选择 P_ls/rank

直接站队：“这件事听清辞的，她更懂整体。”

可选条件：`null`

立即回应：

**旁白**：清辞先摇头。

`P_ls.rank.reply.001`

**沈清辞**：我懂的是制作，不是所有事都该由我定。

`P_ls.rank.reply.002`

**林见月**：你可以不喜欢那段，但别拿一个人的可靠把另一个人的话压掉。

`P_ls.rank.reply.003`

**旁白**：见月收起片子。清辞看着你，等你重新回答，而不是替她宣布胜出。

`P_ls.rank.reply.004`

写入与操作：`[{"op":"set","key":"bridge_ls","value":"unfair"}]`

后继：`Q_ls`


---

## Q_ls｜片尾不是卡住了·临走前

类型：`pair_followup`。元数据：`{"background":"projection","music":"warm","next":"@schedule","members":["l","s"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_ls.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_ls.r4.body.002`

### 条件正文 · Q_ls.variant.001

条件：`{"eq":["bridge_ls","unfair"]}`

**旁白**：一方的判断刚才被另一方的“更可靠”压过，共同关系尚未得到两份自愿认可。

`Q_ls.variant.001.001`

### 选择 Q_ls/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"ls"}`

立即回应：

**旁白**：你把关系说清，也把自己的时间与需要摆出来，不只等她们相互让步。

`Q_ls.together.reply.001`

**林见月**：我愿意继续。想说不舒服的时候，我会说，不先替你找理由。

`Q_ls.together.reply.002`

**沈清辞**：我也愿意。但你该自己讲的，别交给见月猜。

`Q_ls.together.reply.003`

**旁白**：出门后，清辞想喝热汤，见月想先绕河边走。你们把两件事都安排进今晚，没有急着找一个谁都不喜欢的中点。

`Q_ls.together.reply.004`

**旁白**：走到河边，见月先伸手，清辞也把另一边留给你。没有一段沉默需要被谁立刻填满。

`Q_ls.together.reply.005`

写入与操作：`[{"op":"pairConsent","members":["l","s"]}]`

后继：`@schedule`

### 选择 Q_ls/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_ls.slow.r4.reply.001`

**林见月**：先别给今晚加字幕。我还得想想自己愿不愿意进入这样的安排。

`Q_ls.slow.r4.reply.002`

**沈清辞**：先不增加承诺。我和见月都需要知道，下一次的私人约定究竟是什么。

`Q_ls.slow.r4.reply.003`

**旁白**：见月把相机留在包里，清辞看了一眼日程。你们让没有答案的部分先空着。

`Q_ls.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_ls","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_ls/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_ls.separate.r4.reply.001`

**林见月**：我先按自己的拍摄计划走。你想见我，就单独来问时间。

`Q_ls.separate.r4.reply.002`

**沈清辞**：各自确认就好，不把今晚这次同桌算作之后都能一起约。

`Q_ls.separate.r4.reply.003`

**旁白**：你分别问了两人的空档，没把她们的私人行程合成一张替她们排好的表。

`Q_ls.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_ls","value":"separate"}]`

后继：`@schedule`

### 选择 Q_ls/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_l",true]},{"eq":["value_conflict_l",true]},{"eq":["latent_l",true]},{"eq":["breach_l",true]}]},{"any":[{"eq":["pending_s",true]},{"eq":["value_conflict_s",true]},{"eq":["latent_s",true]},{"eq":["breach_s",true]}]}]}`

立即回应：

**旁白**：你把真实范围和此前不一致的话一起说出来，没有让两个擅长体谅的人替你省略后果。

`Q_ls.reveal.reply.001`

**沈清辞**：我听懂了。现在先不确认共同关系。

`Q_ls.reveal.reply.002`

**林见月**：我也需要时间。之后再见面，是为了把事说清，不是保证答应。

`Q_ls.reveal.reply.003`

**旁白**：你们约定有准备再分别谈，没有用一顿饭把所有问题压过去。

`Q_ls.reveal.reply.004`

写入与操作：`[{"op":"confessKnown","character":"l"},{"op":"confessKnown","character":"s"},{"op":"set","key":"pair_ls","value":"pending"}]`

后继：`@schedule`


---

## P_gs｜先把这顿饭吃完

类型：`pair`。元数据：`{"background":"theatre","music":"warm","next":"Q_gs","members":["g","s"],"minSlot":9}`

### 正文

**旁白**：菜已经上齐，清辞和晚棠还在争下一场演出的预算。

`P_gs.r4.body.001`

**顾晚棠**：这项真不能再加。不然少掉的那笔钱从哪儿出？

`P_gs.r4.body.002`

**沈清辞**：我可以明天给你改表。我们不是说好今晚只吃饭吗？

`P_gs.r4.body.003`

**许照**：是我说的。然后也是我顺口问了进度。

`P_gs.r4.body.004`

**旁白**：两个人一起看你。你默默把刚夹起的菜放回碗里。

`P_gs.r4.body.005`

**顾晚棠**：那就别装成只有我们两个停不下来。

`P_gs.r4.body.006`

### 条件正文 · P_gs.variant.001

条件：`{"ge":["pair_attempts_gs",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_gs.variant.001.001`

### 条件正文 · P_gs.variant.002

条件：`{"eq":["pair_gs","waiting"]}`

**顾晚棠**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_gs.variant.002.001`

### 条件正文 · P_gs.variant.003

条件：`{"eq":["pair_gs","separate"]}`

**沈清辞**：上次我们各自回去想了。今天要变，也得重新说。

`P_gs.variant.003.001`

### 条件正文 · P_gs.variant.004

条件：`{"eq":["pair_gs","pending"]}`

**顾晚棠**：上次那件事还没过去。先说清楚，再谈下一步。

`P_gs.variant.004.001`

### 选择 P_gs/offwork

把文件收起来，今晚先吃饭。

可选条件：`null`

立即回应：

**许照**：是我先提的，我收回。工作明天另约。今晚你们先尝尝这个，凉了真不好吃。

`P_gs.offwork.r4.reply.001`

**旁白**：清辞合上文件，晚棠把手机倒扣在桌上。

`P_gs.offwork.r4.reply.002`

**顾晚棠**：先说好，我刚才不高兴不是因为菜凉了。

`P_gs.offwork.r4.reply.003`

**许照**：知道。我下次不拿吃饭时间偷偷开会了。

`P_gs.offwork.r4.reply.004`

**沈清辞**：那现在可以开饭了吗？

`P_gs.offwork.r4.reply.005`

**旁白**：你赶紧把筷子递过去。

`P_gs.offwork.r4.reply.006`

写入与操作：`[{"op":"set","key":"bridge_gs","value":"offwork"}]`

后继：`Q_gs`

### 选择 P_gs/direct

问她们今晚想怎么过，自己也说实话。

可选条件：`null`

立即回应：

**沈清辞**：我想安安稳稳吃完，不到一半又接着改方案。

`P_gs.direct.r4.reply.001`

**顾晚棠**：我想看看菜单，不是一直被问还能加多少预算。

`P_gs.direct.r4.reply.002`

**许照**：我想约你们出来，但有点怕冷场，就拿工作凑话题了。

`P_gs.direct.r4.reply.003`

**旁白**：晚棠忍不住笑了一下。

`P_gs.direct.r4.reply.004`

**顾晚棠**：许照，你看看这桌人，冷得下来吗？

`P_gs.direct.r4.reply.005`

**旁白**：清辞把菜单塞给你。这次你老老实实问她们想吃什么。

`P_gs.direct.r4.reply.006`

写入与操作：`[{"op":"set","key":"bridge_gs","value":"direct"}]`

后继：`Q_gs`

### 选择 P_gs/money

“晚棠出得更多，这次就听她的吧。”

可选条件：`null`

立即回应：

**旁白**：晚棠没有接受这份看似有利的支持。

`P_gs.money.reply.001`

**顾晚棠**：你把我放到这儿，以后清辞怎么安心坐在我旁边？

`P_gs.money.reply.002`

**沈清辞**：我们谈的不是谁买下这一顿。

`P_gs.money.reply.003`

**旁白**：清辞把桌上的预算表推远了。晚棠也没有再动筷子，等你把刚才那句话收回。

`P_gs.money.reply.004`

写入与操作：`[{"op":"set","key":"bridge_gs","value":"unfair"}]`

后继：`Q_gs`


---

## Q_gs｜先把这顿饭吃完·临走前

类型：`pair_followup`。元数据：`{"background":"theatre","music":"warm","next":"@schedule","members":["g","s"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_gs.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_gs.r4.body.002`

### 条件正文 · Q_gs.variant.001

条件：`{"eq":["bridge_gs","unfair"]}`

**旁白**：刚才的金钱排序仍是实质问题。不能用一句“我都喜欢”直接跳过。

`Q_gs.variant.001.001`

### 选择 Q_gs/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"gs"}`

立即回应：

**旁白**：你讲清现有的关系和承诺，没有把两个人的能力当作这段安排能自动运行的理由。

`Q_gs.together.reply.001`

**沈清辞**：我愿意继续。想见我的时候，直接来约，不必拿工作当借口。

`Q_gs.together.reply.002`

**顾晚棠**：我也愿意。还有，不要怕我俩有不同意见就假装没听见。

`Q_gs.together.reply.003`

**旁白**：你们又坐了一会儿，吃到一半，你把一盘菜误放到自己面前，两个人几乎同时伸筷子。她们看了看彼此，先笑了。

`Q_gs.together.reply.004`

**旁白**：你赶紧把盘子推回中间。晚棠笑你护食，清辞说这次她可作证。

`Q_gs.together.reply.005`

写入与操作：`[{"op":"pairConsent","members":["g","s"]}]`

后继：`@schedule`

### 选择 Q_gs/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_gs.slow.r4.reply.001`

**顾晚棠**：没确认就不算同意。这一点等你想清楚，重新开口问。

`Q_gs.slow.r4.reply.002`

**沈清辞**：不急。但见面要分开约，别把合作会顺手算成私人晚餐。

`Q_gs.slow.r4.reply.003`

**旁白**：晚棠没有把自己的时间签出去，清辞也把工作安排和约会分开记录。

`Q_gs.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gs","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_gs/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_gs.separate.r4.reply.001`

**顾晚棠**：可以。我们不需要靠资源和日程来交换彼此在你心里的位置。

`Q_gs.separate.r4.reply.002`

**沈清辞**：同意。私人约定单独确认，工作上的事还是照原来的分工办。

`Q_gs.separate.r4.reply.003`

**旁白**：你把工作讨论留在明天，今晚则只分别约定真正属于私人相处的时间。

`Q_gs.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gs","value":"separate"}]`

后继：`@schedule`

### 选择 Q_gs/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_g",true]},{"eq":["value_conflict_g",true]},{"eq":["latent_g",true]},{"eq":["breach_g",true]}]},{"any":[{"eq":["pending_s",true]},{"eq":["value_conflict_s",true]},{"eq":["latent_s",true]},{"eq":["breach_s",true]}]}]}`

立即回应：

**许照**：今天先不谈怎么继续。我有之前没说实话的部分。

`Q_gs.reveal.reply.001`

**顾晚棠**：好。不要只说最容易被原谅的那一半。

`Q_gs.reveal.reply.002`

**旁白**：清辞等你说完，才把自己的回答放下来。

`Q_gs.reveal.reply.003`

**沈清辞**：我今天不答应新的关系范围。修复也不是我们两个人合起来替你做。

`Q_gs.reveal.reply.004`

**旁白**：共同安排暂停。你保留了继续面对的机会，没有得到自动续期的同意。

`Q_gs.reveal.reply.005`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"confessKnown","character":"s"},{"op":"set","key":"pair_gs","value":"pending"}]`

后继：`@schedule`


---

## P_gl｜这份说明能写到哪里

类型：`pair`。元数据：`{"background":"projection","music":"warm","next":"Q_gl","members":["g","l"],"minSlot":9}`

### 正文

**旁白**：见月把一份争议说明放在电脑上。晚棠指住其中一行姓名。

`P_gl.r4.body.001`

**顾晚棠**：我的决定留着。这位工作人员的名字删掉。

`P_gl.r4.body.002`

**林见月**：删掉以后，这句话像是你一个人说的。

`P_gl.r4.body.003`

**顾晚棠**：我可以补清楚有谁参加讨论，但他没做最后决定。被转出去，别人不会细看。

`P_gl.r4.body.004`

**许照**：那责任别删，私人的姓名另处理。我们试着改一版？

`P_gl.r4.body.005`

**旁白**：见月还担心内容失真，晚棠也不愿拿旁人的生活替自己挡住质疑。

`P_gl.r4.body.006`

### 条件正文 · P_gl.variant.001

条件：`{"ge":["pair_attempts_gl",1]}`

**旁白**：这是你们重新约出的一个晚上。上次没谈妥的事，还没有被当成已经答应。

`P_gl.variant.001.001`

### 条件正文 · P_gl.variant.002

条件：`{"eq":["pair_gl","waiting"]}`

**顾晚棠**：上次说想缓缓。今天呢？想再聊，还是只一起坐坐？

`P_gl.variant.002.001`

### 条件正文 · P_gl.variant.003

条件：`{"eq":["pair_gl","separate"]}`

**林见月**：上次我们各自回去想了。今天要变，也得重新说。

`P_gl.variant.003.001`

### 条件正文 · P_gl.variant.004

条件：`{"eq":["pair_gl","pending"]}`

**顾晚棠**：上次那件事还没过去。先说清楚，再谈下一步。

`P_gl.variant.004.001`

### 选择 P_gl/bounded

责任写清楚，隐去无关的私人姓名。

可选条件：`null`

立即回应：

**旁白**：你们把那句话拆成两句。谁参加过讨论、谁作了决定，都留在说明里，姓名只保留必要的部分。

`P_gl.bounded.r4.reply.001`

**林见月**：这条是你批准的，不能删。

`P_gl.bounded.r4.reply.002`

**顾晚棠**：不删。我会自己确认。

`P_gl.bounded.r4.reply.003`

**旁白**：晚棠读完新版本，点了头。见月没有急着上传，先发给相关当事人核对。

`P_gl.bounded.r4.reply.004`

写入与操作：`[{"op":"set","key":"bridge_gl","value":"bounded"}]`

后继：`Q_gl`

### 选择 P_gl/witness

先请当事人核对，暂不赶着公开。

可选条件：`null`

立即回应：

**林见月**：这样可能赶不上今天的说明。

`P_gl.witness.r4.reply.001`

**顾晚棠**：那就晚一点。我不想让一个不相干的人替我上热搜。

`P_gl.witness.r4.reply.002`

**许照**：我来联系能到场的人，只核对事，不追问私生活。

`P_gl.witness.r4.reply.003`

**旁白**：见月保存了草稿。你们约好核对的时间，文件这晚没有发出去。

`P_gl.witness.r4.reply.004`

写入与操作：`[{"op":"set","key":"bridge_gl","value":"witness"}]`

后继：`Q_gl`

### 选择 P_gl/dump

“都放出去。真相越完整，越没人能反驳。”

可选条件：`null`

立即回应：

**旁白**：见月先停下。

`P_gl.dump.reply.001`

**林见月**：原始材料里还有别人的私事，不能一起发。

`P_gl.dump.reply.002`

**顾晚棠**：我愿意回应我的决定。但其他人的名字，你问过他们吗？

`P_gl.dump.reply.003`

**旁白**：你们没能继续改稿。文件被存回私人文件夹，公开按钮没有被点下。

`P_gl.dump.reply.004`

写入与操作：`[{"op":"set","key":"bridge_gl","value":"unfair"}]`

后继：`Q_gl`


---

## Q_gl｜这份说明能写到哪里·临走前

类型：`pair_followup`。元数据：`{"background":"projection","music":"warm","next":"@schedule","members":["g","l"]}`

### 正文

**旁白**：临走前，你叫住她们。刚才一起待得怎么样，和以后要不要一起相处，是两回事。

`Q_gl.r4.body.001`

**许照**：我想再认真问一次，你们各自怎么想？

`Q_gl.r4.body.002`

### 选择 Q_gl/together

讲清现有关系，分别问她们是否愿意继续。

可选条件：`{"pairReady":"gl"}`

立即回应：

**旁白**：你向两个人讲清实际关系，不用任何私密材料来证明谁更在意。

`Q_gl.together.reply.001`

**林见月**：我愿意继续。不想说的地方，我会告诉你，不假装都没关系。

`Q_gl.together.reply.002`

**顾晚棠**：我也愿意。你不用每次都替我防御，但别替我交出秘密。

`Q_gl.together.reply.003`

**旁白**：走出放映室，见月没举起相机。晚棠刚想整理表情，发现根本没有镜头，自己先笑了。

`Q_gl.together.reply.004`

**旁白**：你问要不要合照。她们都说今天算了，于是你收起手机，陪她们往路口走。

`Q_gl.together.reply.005`

写入与操作：`[{"op":"pairConsent","members":["g","l"]}]`

后继：`@schedule`

### 选择 Q_gl/slow

我还没想好，今天先不确认。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排。不能现在答应了，再让你们一直等。

`Q_gl.slow.r4.reply.001`

**顾晚棠**：先不用回答。别用我今晚还坐在这里，推断以后什么都这样安排。

`Q_gl.slow.r4.reply.002`

**林见月**：那这段先不定稿。我需要时间想明白，自己真正想怎么相处。

`Q_gl.slow.r4.reply.003`

**旁白**：晚棠收好手机，见月没有急着记录今晚的结论，你也没有追问。

`Q_gl.slow.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gl","value":"waiting"}]`

后继：`@schedule`

### 选择 Q_gl/separate

暂时各自相处，不建立共同安排。

可选条件：`null`

立即回应：

**许照**：我想先分别和你们相处，不急着变成一起约会。你们也再想想。

`Q_gl.separate.r4.reply.001`

**顾晚棠**：这样更清楚。你和见月的约定，不应该默认写进我的时间表。

`Q_gl.separate.r4.reply.002`

**林见月**：我也想分别相处。镜头外的时间先还给每个人自己。

`Q_gl.separate.r4.reply.003`

**旁白**：你们各自说清时间和界限，没有把一次偶遇变成今后每次都必须同场。

`Q_gl.separate.r4.reply.004`

写入与操作：`[{"op":"set","key":"pair_gl","value":"separate"}]`

后继：`@schedule`

### 选择 Q_gl/reveal

先说清尚未解决的矛盾，今天不求答应。

可选条件：`{"any":[{"any":[{"eq":["pending_g",true]},{"eq":["value_conflict_g",true]},{"eq":["latent_g",true]},{"eq":["breach_g",true]}]},{"any":[{"eq":["pending_l",true]},{"eq":["value_conflict_l",true]},{"eq":["latent_l",true]},{"eq":["breach_l",true]}]}]}`

立即回应：

**旁白**：你把相互矛盾的说辞与实际关系都讲出来。见月没有打开录音，晚棠也没有急着用一句话判定所有事情。

`Q_gl.reveal.reply.001`

**林见月**：先到这里。我需要知道以后怎样才能不再靠猜。

`Q_gl.reveal.reply.002`

**顾晚棠**：我也是。今天不作新的关系保证。

`Q_gl.reveal.reply.003`

**旁白**：你们把事实留下，把答案留给之后各自真正愿意的时候。

`Q_gl.reveal.reply.004`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"confessKnown","character":"l"},{"op":"set","key":"pair_gl","value":"pending"}]`

后继：`@schedule`


---

## E01｜原著没有替你存档

类型：`side`。元数据：`{"background":"control","music":"pulse","next":"@schedule","minSlot":0,"requires":[]}`

### 正文

**旁白**：阿衡正在备份首演工程，看见你来，拉开旁边的空椅子。

`E01.r4.body.001`

**阿衡**：来听返听？还是找那天的记录？

`E01.r4.body.002`

**许照**：记录。我要留清楚：当晚放了哪个版本、现场由谁补救、控台操作是谁签过字。

`E01.r4.body.003`

**阿衡**：行。不过只能给你相关那一段。其他人的音轨不能带走。

`E01.r4.body.004`

**旁白**：屏幕上有文件导入时间，旁边还放着首演工作单。你那点小说记忆，总算能和眼前的记录对一对。

`E01.r4.body.005`

### 选择 E01/facts

留下自己相关部分的核验副本。

可选条件：`null`

立即回应：

**许照**：能留一份只跟我负责的部分有关的确认吗？

`E01.facts.r4.reply.001`

**阿衡**：可以。我把范围标出来，你别再往外转其他素材。

`E01.facts.r4.reply.002`

**旁白**：阿衡导出允许留存的记录，在自己的切换步骤旁签了名。你把副本和来源一起保存。

`E01.facts.r4.reply.003`

**许照**：谢谢。以后问起，我也不用干着急了。

`E01.facts.r4.reply.004`

写入与操作：`[{"op":"add","key":"evidence","value":2},{"op":"set","key":"evidence_style","value":"bounded"},{"op":"set","key":"proof_handoff","value":true}]`

后继：`@schedule`

### 选择 E01/together

原件由阿衡保存，需要时请他核验。

可选条件：`null`

立即回应：

**阿衡**：原件在我这儿。我把备份编号给你，查的时候叫我。

`E01.together.r4.reply.001`

**旁白**：你记下编号和联系方式，没有拷走工程里的其他音轨。

`E01.together.r4.reply.002`

**许照**：你看见的事，照实说就行。

`E01.together.r4.reply.003`

**阿衡**：本来就是。没看见的我也编不出来。

`E01.together.r4.reply.004`

写入与操作：`[{"op":"add","key":"evidence","value":2},{"op":"set","key":"evidence_style","value":"witness"},{"op":"set","key":"proof_witness","value":true}]`

后继：`@schedule`

### 选择 E01/leave

先不留，觉得凭记忆应该能讲清。

可选条件：`null`

立即回应：

**阿衡**：你确定？过几天文件会归档，找起来慢。

`E01.leave.reply.001`

**旁白**：你点头，离开了控台。原著告诉你事情的原因，却不会自动变成别人能核对的记录。

`E01.leave.reply.002`

写入与操作：`[{"op":"set","key":"evidence_style","value":"memory"}]`

后继：`@schedule`


---

## E02｜没人拍下来的那份工作

类型：`side`。元数据：`{"background":"stage","music":"quiet","next":"@schedule","minSlot":3,"requires":[]}`

### 正文

**旁白**：你和一个新来的临时工收椅子。他抬着椅背，朝台上的陆景行看了一眼。

`E02.r4.body.001`

**现场**：是不是认识他，才有下一场的活？

`E02.r4.body.002`

**许照**：先看路，你这把快撞到我了。

`E02.r4.body.003`

**旁白**：你们把椅子放稳。门口正好有工作人员来问，下一场谁能做现场核对。

`E02.r4.body.004`

**旁白**：你松了松酸痛的胳膊，准备回答。

`E02.r4.body.005`

### 选择 E02/own

清楚说出自己能做的部分，争取正式记录与报酬。

可选条件：`null`

立即回应：

**许照**：我能做流程核对和现场联络。调音得找阿衡，我现在还不能独立做。

`E02.own.r4.reply.001`

**现场**：可以。把做过的项目和能来的时间发我，按场结算。

`E02.own.r4.reply.002`

**旁白**：你马上记下联系方式，连报酬和交付时间一起问清了。

`E02.own.r4.reply.003`

写入与操作：`[{"op":"set","key":"career_extra","value":"own"}]`

后继：`@schedule`

### 选择 E02/share

介绍合适的同事，自己保留真实做过的部分，不抢也不隐身。

可选条件：`null`

立即回应：

**旁白**：你把会搬运、会调音的同事分别介绍了一遍，也指明了自己负责的现场核对。

`E02.share.r4.reply.001`

**现场**：那这部分写你？

`E02.share.r4.reply.002`

**许照**：对，别把我也给介绍没了。

`E02.share.r4.reply.003`

**旁白**：旁边的临时工笑起来，主动帮你又抬了一把椅子。

`E02.share.r4.reply.004`

写入与操作：`[{"op":"set","key":"career_extra","value":"team"}]`

后继：`@schedule`

### 选择 E02/rest

今晚先不接新工作，承认自己已经累了。

可选条件：`null`

立即回应：

**旁白**：你说明无法接下一场，结清已经做完的部分。

`E02.rest.reply.001`

**旁白**：街边的小店还开着。你点了碗热面，终于没在吃到一半时站起来接电话。

`E02.rest.reply.002`

**旁白**：下一次工作仍然要找，但今天的精力不是无限的。

`E02.rest.reply.003`

写入与操作：`[{"op":"set","key":"career_extra","value":"rest"}]`

后继：`@schedule`


---

## E03｜不为揭穿而出现

类型：`side`。元数据：`{"background":"corridor","music":"pulse","next":"@schedule","minSlot":5,"requires":[]}`

### 正文

**旁白**：程放在走廊叫住你，没有再喊“那个临时的”。

`E03.r4.body.001`

**程放**：许照。你怎么知道要提前留那些记录？

`E03.r4.body.002`

**许照**：怕记错。

`E03.r4.body.003`

**程放**：少来。到底谁教你的？

`E03.r4.body.004`

**旁白**：这里没有别人在场。你摸了摸手机，没有把自己手里的东西全亮给他看。

`E03.r4.body.005`

### 选择 E03/boundary

我没做过的事，不会认。

可选条件：`null`

立即回应：

**许照**：没谁教。我做过的会认，没做过的不会。

`E03.boundary.r4.reply.001`

**程放**：话别说太满。

`E03.boundary.r4.reply.002`

**许照**：那就说具体的。你今天想让我确认哪一项？

`E03.boundary.r4.reply.003`

**旁白**：程放没接，只说改天找你。你没有追着放狠话，也没把手里的材料交出去。

`E03.boundary.r4.reply.004`

写入与操作：`[{"op":"set","key":"cheng_style","value":"boundary"}]`

后继：`@schedule`

### 选择 E03/public

请他把要确认的事发进工作群。

可选条件：`null`

立即回应：

**许照**：要我确认的内容，你发工作群吧。相关的人都在，免得转述出错。

`E03.public.r4.reply.001`

**旁白**：程放看了一眼手机，说了句“回头发”，转身走了。

`E03.public.r4.reply.002`

**旁白**：你在工作记录里写下这次交流的时间，没有把一段走廊争执当成已经拿到的新证据。

`E03.public.r4.reply.003`

写入与操作：`[{"op":"set","key":"cheng_style","value":"record"},{"op":"add","key":"evidence","value":1}]`

后继：`@schedule`

### 选择 E03/bluff

“有人比你更早知道整件事，你自己想吧。”

可选条件：`null`

立即回应：

**旁白**：他脸色确实变了，却没有因此给你任何材料。

`E03.bluff.reply.001`

**程放**：那让他来找我。

`E03.bluff.reply.002`

**旁白**：你赢到一瞬间的气势，也让他开始更加留意你和谁来往。虚张声势不是立刻失败，但也不等于增加了真实筹码。

`E03.bluff.reply.003`

写入与操作：`[{"op":"set","key":"cheng_style","value":"bluff"},{"op":"set","key":"visibility_xu","value":"watched"}]`

后继：`@schedule`


---

## E04｜给未来留一张普通的简历

类型：`side`。元数据：`{"background":"office","music":"quiet","next":"@schedule","minSlot":11,"requires":[]}`

### 正文

**旁白**：你翻开许照原来的履历：几场临时工，几张工牌照片，没有一段长期工作。

`E04.r4.body.001`

**许照**：行吧，也没附送个隐藏身份。

`E04.r4.body.002`

**旁白**：招聘邮件要求说明首演分工。你在草稿里写下“参与栖光计划”，停了一会儿。

`E04.r4.body.003`

**旁白**：后面该写具体做过的事，还是写那些更容易让人回复的名字？邮件还没发。

`E04.r4.body.004`

### 选择 E04/real

写真实分工与可核对的工作。

可选条件：`null`

立即回应：

**旁白**：你把实际承担的现场工作、接手时间与能核对的成果分别写清，删掉了“核心制作”。

`E04.real.r4.reply.001`

**许照**：普通就普通吧，至少每一行我都答得出来。

`E04.real.r4.reply.002`

**旁白**：邮件发送成功。你把相关的工作记录放在一起，等对方需要时再提供。

`E04.real.r4.reply.003`

写入与操作：`[{"op":"set","key":"resume","value":"real"}]`

后继：`@schedule`

### 选择 E04/recommend

请实际合作过的人提供工作推荐。

可选条件：`null`

立即回应：

**旁白**：你给协作者发消息，说明想申请的工作，问对方是否愿意确认亲眼见过的那部分。

`E04.recommend.r4.reply.001`

**旁白**：收到的评价很短，只列了你做过的几件事。你先道谢，再征得同意，把它附进邮件。

`E04.recommend.r4.reply.002`

**旁白**：没有人替你保证你从没做过的工作。

`E04.recommend.r4.reply.003`

写入与操作：`[{"op":"set","key":"resume","value":"recommend"}]`

后继：`@schedule`

### 选择 E04/inflate

夸大自己在项目里的角色。

可选条件：`null`

立即回应：

**旁白**：你写了“核心统筹”，又把几位主创的名字放在显眼处。

`E04.inflate.r4.reply.001`

**旁白**：回复来得很快，却追问了三个问题：你决定过什么、独立交付过什么、谁能证明？

`E04.inflate.r4.reply.002`

**许照**：……这可比没回复更难回。

`E04.inflate.r4.reply.003`

**旁白**：你重新点开自己刚发出去的那封邮件。

`E04.inflate.r4.reply.004`

写入与操作：`[{"op":"set","key":"resume","value":"inflated"}]`

后继：`@schedule`


---

## E05｜不把所有人的结局都攥在手里

类型：`side`。元数据：`{"background":"river","music":"quiet","next":"@schedule","minSlot":11,"requires":[]}`

### 正文

**旁白**：你把原著笔记摊开。谁走红、谁离开、谁和谁在一起，都挤在一页上。

`E05.r4.body.001`

**旁白**：旁边是你现在的日程：回电话、整理工作单、陪人试听，还有一顿一直没吃上的饭。

`E05.r4.body.002`

**许照**：书里一句话就过去，我怎么一天到晚在赶路？

`E05.r4.body.003`

**旁白**：接下来的时间有限。你拿起笔，想先留给谁，也想留一点给自己。

`E05.r4.body.004`

### 选择 E05/focus

多陪已经选择的人，不包办所有人的未来。

可选条件：`null`

立即回应：

**旁白**：你给想见的人留出完整时段，把来不及参加的活动划掉。

`E05.focus.r4.reply.001`

**许照**：这两场真的跑不完，早点说，总比让人等强。

`E05.focus.r4.reply.002`

**旁白**：你发出改约消息，再核对一次还答应过什么。

`E05.focus.r4.reply.003`

写入与操作：`[{"op":"set","key":"self_plan","value":"focus"}]`

后继：`@schedule`

### 选择 E05/all

继续帮助不同的人，也提前说清自己的时间。

可选条件：`null`

立即回应：

**旁白**：你把想做的事逐条排开，只留下能真正赶到的几项。

`E05.all.r4.reply.001`

**旁白**：有人回复“谢谢”，也有人说不必过来。你照着回复继续改，没有把帮忙写成一场约会。

`E05.all.r4.reply.002`

写入与操作：`[{"op":"set","key":"self_plan","value":"all"}]`

后继：`@schedule`

### 选择 E05/ordinary

今天给自己留点时间。

可选条件：`null`

立即回应：

**旁白**：你合上笔记，去街边吃饭。

`E05.ordinary.r4.reply.001`

**现场**：加饭吗？

`E05.ordinary.r4.reply.002`

**许照**：加。

`E05.ordinary.r4.reply.003`

**旁白**：终于有一道不用考虑原著后果的问题。你把碗往前推了推。

`E05.ordinary.r4.reply.004`

写入与操作：`[{"op":"set","key":"self_plan","value":"ordinary"}]`

后继：`@schedule`


---

## LU01｜他也会弹错

类型：`side`。元数据：`{"background":"stage","music":"pulse","next":"@schedule","minSlot":2,"requires":[]}`

### 正文

**旁白**：陆景行练到第三遍，左手还是错了一个音。他停下来，把那两小节慢慢拆开。

`LU01.r4.body.001`

**陆景行**：看什么，没见过人弹错？

`LU01.r4.body.002`

**许照**：见过。没见过你弹错。

`LU01.r4.body.003`

**陆景行**：那你今天见了四回，别到处宣传。

`LU01.r4.body.004`

**旁白**：你笑出声。他重新数拍，额前的头发已经被汗压下去一点。

`LU01.r4.body.005`

**旁白**：书里只写观众如何惊艳，没有写他把八个音来回练这么久。

`LU01.r4.body.006`

### 选择 LU01/work

问他怎么练这一段，承认自己不会，不假装先知等于会弹琴。

可选条件：`null`

立即回应：

**陆景行**：慢到不会错，再一点点提速。知道下一句是什么，手也未必跟得上。

`LU01.work.r4.reply.001`

**许照**：懂了，我属于脑子听过、手完全没来过。

`LU01.work.r4.reply.002`

**旁白**：他笑了，指给你听哪个音容易抢。你帮他确认返听音量，他又练了一遍。

`LU01.work.r4.reply.003`

写入与操作：`[{"op":"set","key":"lu_scene","value":"work"}]`

后继：`@schedule`

### 选择 LU01/compete

“我不一定能弹过你。但现场有别的事，我想做得更好。”

可选条件：`null`

立即回应：

**许照**：琴我暂时是弹不过你了。不过现场流程，我想做得比现在更好。

`LU01.compete.r4.reply.001`

**陆景行**：那挺好。我可不想每次坐下来，还得猜音响准备好了没有。

`LU01.compete.r4.reply.002`

**旁白**：你翻开流程单，请阿衡确认切换步骤。陆景行继续练那两小节。

`LU01.compete.r4.reply.003`

写入与操作：`[{"op":"set","key":"lu_scene","value":"compete"}]`

后继：`@schedule`

### 选择 LU01/ask

问他，是否意识到有人为了他的计划放下了自己的事。

可选条件：`null`

立即回应：

**旁白**：陆景行停了一会儿，没有马上替自己辩解。

`LU01.ask.reply.001`

**陆景行**：可能有。也可能我一直把他们愿意帮忙，当成没别的想要。

`LU01.ask.reply.002`

**许照**：你可以问，不用由我替她们回答。

`LU01.ask.reply.003`

**旁白**：他点点头。你没有当场揭露任何人的秘密，却给了一种不把所有人看作配角的方向。

`LU01.ask.reply.004`

写入与操作：`[{"op":"set","key":"lu_scene","value":"ask"}]`

后继：`@schedule`


---

## LU02｜她的安排，让她自己说

类型：`side`。元数据：`{"background":"corridor","music":"pulse","next":"@schedule","minSlot":11,"requires":[]}`

### 正文

**旁白**：陆景行收起手机，问你见月最近在忙什么。

`LU02.r4.body.001`

**陆景行**：她说有自己的片子要剪。我问了时间，她让我有工作先发项目群。

`LU02.r4.body.002`

**许照**：那就发群里。

`LU02.r4.body.003`

**陆景行**：我知道。以前她总先问我需要什么，有点不习惯。

`LU02.r4.body.004`

**旁白**：他说完自己也停了一下。你知道她在原著里喜欢过他很久，但眼前两个人并不是已经确认关系的恋人。

`LU02.r4.body.005`

### 选择 LU02/own

她有自己的片子，具体安排你问她。

可选条件：`null`

立即回应：

**许照**：她在做自己的片子。什么时候有空，你直接问她。

`LU02.own.r4.reply.001`

**陆景行**：好。我先把需求写清楚。

`LU02.own.r4.reply.002`

**旁白**：他低头编辑消息，没有再问你要她的私人安排。

`LU02.own.r4.reply.003`

写入与操作：`[{"op":"set","key":"lu_later","value":"ask_her"}]`

后继：`@schedule`

### 选择 LU02/honest

我也想多认识她，但她的想法由她自己说。

可选条件：`null`

立即回应：

**许照**：我也想多认识她。不过她怎么想，我不能替她答。

`LU02.honest.r4.reply.001`

**陆景行**：听出来了，你也有私心。

`LU02.honest.r4.reply.002`

**许照**：有。这个我不装。

`LU02.honest.r4.reply.003`

**旁白**：他看了你一眼，把手机放回口袋。

`LU02.honest.r4.reply.004`

**陆景行**：那就都别替她作主。

`LU02.honest.r4.reply.005`

写入与操作：`[{"op":"set","key":"lu_later","value":"honest"}]`

后继：`@schedule`

### 选择 LU02/claim

“你错过她了。现在别再来影响她。”

可选条件：`null`

立即回应：

**陆景行**：你是替她说，还是替自己说？

`LU02.claim.reply.001`

**旁白**：这句话让你停了一下。

`LU02.claim.reply.002`

**陆景行**：如果是她的决定，我会听她说。你不用拿我当她一直不走的唯一原因。

`LU02.claim.reply.003`

**旁白**：你没有因此得到一场爽快胜利，只让一个本可以说明白的问题变得更硬。

`LU02.claim.reply.004`

写入与操作：`[{"op":"set","key":"lu_later","value":"claim"}]`

后继：`@schedule`


---

## LU03｜最后一遍合练

类型：`side`。元数据：`{"background":"stage","music":"finale","next":"@schedule","minSlot":17,"requires":[]}`

### 正文

**旁白**：一场试演前，陆景行要做最后一遍合练。阿衡检查返听，工作人员正在核对进场顺序。

`LU03.r4.body.001`

**陆景行**：许照，今天谁先给信号？

`LU03.r4.body.002`

**旁白**：你低头看流程单。这一场没有出现在你记得的小说里，只能按大家真实排好的顺序来。

`LU03.r4.body.003`

**许照**：等一下，我确认完再答。

`LU03.r4.body.004`

### 选择 LU03/roles

按这场实际在场的人分工。

可选条件：`null`

立即回应：

**旁白**：你叫来负责表演、音控和现场的工作人员，逐项确认各自的信号，没有把没参加这场的人写进分工。

`LU03.roles.r4.reply.001`

**许照**：阿衡确认就绪，我再举手，你看到以后开始。

`LU03.roles.r4.reply.002`

**陆景行**：明白。别抢拍，我今天不负责猜。

`LU03.roles.r4.reply.003`

**旁白**：合练顺利开始，你在完成的步骤旁打了勾。

`LU03.roles.r4.reply.004`

写入与操作：`[{"op":"set","key":"lu_final","value":"shared"}]`

后继：`@schedule`

### 选择 LU03/self

负责现场信号，请阿衡复核。

可选条件：`null`

立即回应：

**旁白**：你把进场顺序念了一遍，阿衡复核音控部分，陆景行按约好的信号进入。

`LU03.self.r4.reply.001`

**旁白**：第一遍你举手早了半拍。他停下来等你重来，没有替你糊弄过去。

`LU03.self.r4.reply.002`

**许照**：再来一次。这次我等确认。

`LU03.self.r4.reply.003`

**旁白**：第二遍接上了。你终于敢在表格上写“完成”。

`LU03.self.r4.reply.004`

写入与操作：`[{"op":"set","key":"lu_final","value":"own"}]`

后继：`@schedule`

### 选择 LU03/back

交接清楚，让本场工作人员接着做。

可选条件：`null`

立即回应：

**旁白**：你把确认过的流程交给接班的人，等他复述一遍才退到工作人员区域。

`LU03.back.r4.reply.001`

**旁白**：陆景行看见你已经坐好，朝你点头，开始下一遍合练。

`LU03.back.r4.reply.002`

**旁白**：这回你不用边听边跑，能完整听清那几个变化。

`LU03.back.r4.reply.003`

写入与操作：`[{"op":"set","key":"lu_final","value":"back"}]`

后继：`@schedule`


---

## SELF01｜一本没有下一页提示的书

类型：`side`。元数据：`{"background":"bookstore","music":"quiet","next":"@schedule","minSlot":11,"requires":[]}`

### 正文

**旁白**：书店里没有《今夜偏爱男主》。你换了两个书架，最后还是坐到窗边。

`SELF01.r4.body.001`

**许照**：万一找到了，是不是就能翻到回去的办法？

`SELF01.r4.body.002`

**旁白**：你知道这个想法不太靠谱，还是忍不住再看了眼搜索结果。

`SELF01.r4.body.003`

**旁白**：手机里有几条工作消息。你按灭屏幕，决定在这里待一会儿，不急着把每条记忆都检查一遍。

`SELF01.r4.body.004`

### 选择 SELF01/read

随便找本书读一会儿。

可选条件：`null`

立即回应：

**旁白**：你拿了本小说，看了两页，没忍住笑了一声。

`SELF01.read.r4.reply.001`

**许照**：这男的怎么比我还会说错话。

`SELF01.read.r4.reply.002`

**旁白**：你又翻了一页。这次不急着去找目录和结局。

`SELF01.read.r4.reply.003`

写入与操作：`[{"op":"set","key":"rest_style","value":"read"}]`

后继：`@schedule`

### 选择 SELF01/message

给正在认识的人发条普通消息。

可选条件：`null`

立即回应：

**旁白**：你挑了一个最近聊过天的人，问今天忙不忙。

`SELF01.message.r4.reply.001`

**旁白**：消息发出去，暂时没人回复。你没有接着追问，把手机放在桌上继续看书。

`SELF01.message.r4.reply.002`

写入与操作：`[{"op":"set","key":"rest_style","value":"message"}]`

后继：`@schedule`

### 选择 SELF01/alone

先不聊天，给自己留一会儿安静。

可选条件：`null`

立即回应：

**旁白**：你给等回复的人说明晚些联系，把手机收好。

`SELF01.alone.r4.reply.001`

**旁白**：窗外有人骑车经过。你发了会儿呆，想起穿来以前那间屋子，又慢慢把呼吸放平。

`SELF01.alone.r4.reply.002`

写入与操作：`[{"op":"set","key":"rest_style","value":"alone"}]`

后继：`@schedule`


---

## SELF02｜你想把名字写在哪里

类型：`side`。元数据：`{"background":"river","music":"finale","next":"@schedule","minSlot":17,"requires":[]}`

### 正文

**旁白**：新邮件不是群发的。对方在开头写着“许照你好”，问你有没有兴趣聊下一次合作。

`SELF02.r4.body.001`

**旁白**：你看了好一会儿，给它标上星，又把自己的日程打开。

`SELF02.r4.body.002`

**许照**：总算不是喊我去顶个班了。

`SELF02.r4.body.003`

**旁白**：下一步想做什么？这一次，不是先想该怎么逃过第十三章。

`SELF02.r4.body.004`

### 条件正文 · SELF02.variant.001

条件：`{"eq":["rest_style","read"]}`

**旁白**：你想起上次在书店读过的那几页。不是每本书都得先知道结局，才能决定要不要读。

`SELF02.variant.001.001`

### 条件正文 · SELF02.variant.002

条件：`{"eq":["rest_style","message"]}`

**旁白**：上次主动回过的一条朋友消息，后来又接着聊了几句。你翻了翻聊天记录，看到中间还聊过哪家便当比较好吃。

`SELF02.variant.002.001`

### 条件正文 · SELF02.variant.003

条件：`{"eq":["rest_style","alone"]}`

**旁白**：上次给自己留出的独处没有浪费。现在你更能分清自己想做什么，而不是只想着不落下别人。

`SELF02.variant.003.001`

### 选择 SELF02/create

想做一个规模不大的自己的项目。

可选条件：`null`

立即回应：

**旁白**：你写下一个想法：做一份临时工作人员也能看懂的现场流程模板。

`SELF02.create.r4.reply.001`

**旁白**：先从自己做过的那几场整理，不会的部分去请教。纸上很快列出第一批需要补的东西。

`SELF02.create.r4.reply.002`

写入与操作：`[{"op":"set","key":"life_plan","value":"create"}]`

后继：`@schedule`

### 选择 SELF02/steady

想稳定工作，也有时间见在意的人。

可选条件：`null`

立即回应：

**旁白**：你划掉一个要求随叫随到的岗位，留下能提前确认工时的几项。

`SELF02.steady.r4.reply.001`

**许照**：钱少一点，也得有时间吃顿完整的饭吧。

`SELF02.steady.r4.reply.002`

**旁白**：你把可用时间写清楚，准备回复那封邮件。

`SELF02.steady.r4.reply.003`

写入与操作：`[{"op":"set","key":"life_plan","value":"steady"}]`

后继：`@schedule`

### 选择 SELF02/explore

还没想好，先接触不同的工作。

可选条件：`null`

立即回应：

**旁白**：你把自己会做和想学的东西分成两栏。

`SELF02.explore.r4.reply.001`

**旁白**：新的邀约暂时只谈一次合作，不急着把后面几个月都答应出去。

`SELF02.explore.r4.reply.002`

写入与操作：`[{"op":"set","key":"life_plan","value":"explore"}]`

后继：`@schedule`


---

## MIS_t｜答应过的时间，已经到了

类型：`promise`。元数据：`{"background":"corridor","music":"pulse","next":"@promiseReturn","character":"t"}`

### 正文

**旁白**：你正准备选择下一处去向，手机亮起。今天是第4日，之前约好的晚间见面就在这个时段。

`MIS_t.r4.body.001`

**唐映雪**：今晚还来吗？吉他我都放下了。你不会又想起别的事吧？

`MIS_t.r4.body.002`

### 选择 MIS_t/honor

按原来的约定赴约。

可选条件：`null`

立即回应：

**唐映雪**：来吧。还没到约定时间，不用一路跑。

`MIS_t.honor.r4.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"kept"},{"op":"set","key":"promise_owner","value":"t"}]`

后继：`@promiseReturn`

### 选择 MIS_t/notify

说明去不了，接受她不再等。

可选条件：`null`

立即回应：

**唐映雪**：知道了。那我今天不等。想再约就重新问，别默认这一段随时能补。

`MIS_t.notify.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"changed"},{"op":"set","key":"promise_owner","value":"t"}]`

后继：`@promiseReturn`

### 选择 MIS_t/lie

谎称加班，去另一处。

可选条件：`null`

立即回应：

**唐映雪**：工作忙就先忙。我把试听放到明天。

`MIS_t.lie.reply.001`

**旁白**：你没有纠正这个理由，收起手机，继续去原本打算去的地方。

`MIS_t.lie.reply.002`

写入与操作：`[{"op":"set","key":"promise_status","value":"lied"},{"op":"set","key":"promise_owner","value":"t"},{"op":"latentLie","character":"t","kind":"alibi"}]`

后继：`@promiseReturn`


---

## MIS_s｜答应过的时间，已经到了

类型：`promise`。元数据：`{"background":"corridor","music":"pulse","next":"@promiseReturn","character":"s"}`

### 正文

**旁白**：你正准备选择下一处去向，手机亮起。今天是第4日，之前约好的晚间见面就在这个时段。

`MIS_s.r4.body.001`

**沈清辞**：我已经到北岸了。你大概什么时候过来？

`MIS_s.r4.body.002`

### 选择 MIS_s/honor

按原来的约定赴约。

可选条件：`null`

立即回应：

**沈清辞**：好，到门口告诉我，我来开门。

`MIS_s.honor.r4.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"kept"},{"op":"set","key":"promise_owner","value":"s"}]`

后继：`@promiseReturn`

### 选择 MIS_s/notify

说明去不了，接受她不再等。

可选条件：`null`

立即回应：

**沈清辞**：可以改。但我已经到了，今天这段不能假装没有发生。下次重新约。

`MIS_s.notify.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"changed"},{"op":"set","key":"promise_owner","value":"s"}]`

后继：`@promiseReturn`

### 选择 MIS_s/lie

谎称加班，去另一处。

可选条件：`null`

立即回应：

**沈清辞**：明白。忙完不用特地赶，我会自己安排今晚。

`MIS_s.lie.reply.001`

**旁白**：你没有纠正这个理由，收起手机，继续去原本打算去的地方。

`MIS_s.lie.reply.002`

写入与操作：`[{"op":"set","key":"promise_status","value":"lied"},{"op":"set","key":"promise_owner","value":"s"},{"op":"latentLie","character":"s","kind":"alibi"}]`

后继：`@promiseReturn`


---

## MIS_l｜答应过的时间，已经到了

类型：`promise`。元数据：`{"background":"corridor","music":"pulse","next":"@promiseReturn","character":"l"}`

### 正文

**旁白**：你正准备选择下一处去向，手机亮起。今天是第4日，之前约好的晚间见面就在这个时段。

`MIS_l.r4.body.001`

**林见月**：我把今天想给你听的那段找好了。你出发了吗？

`MIS_l.r4.body.002`

### 选择 MIS_l/honor

按原来的约定赴约。

可选条件：`null`

立即回应：

**林见月**：好。我先倒水，到了从头放。

`MIS_l.honor.r4.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"kept"},{"op":"set","key":"promise_owner","value":"l"}]`

后继：`@promiseReturn`

### 选择 MIS_l/notify

说明去不了，接受她不再等。

可选条件：`null`

立即回应：

**林见月**：谢谢你说清。我今天也要调整一下，不保证下一次还能是同样的时段。

`MIS_l.notify.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"changed"},{"op":"set","key":"promise_owner","value":"l"}]`

后继：`@promiseReturn`

### 选择 MIS_l/lie

谎称加班，去另一处。

可选条件：`null`

立即回应：

**林见月**：那先把工作做完。我不着急听你在很累的时候答。

`MIS_l.lie.reply.001`

**旁白**：你没有纠正这个理由，收起手机，继续去原本打算去的地方。

`MIS_l.lie.reply.002`

写入与操作：`[{"op":"set","key":"promise_status","value":"lied"},{"op":"set","key":"promise_owner","value":"l"},{"op":"latentLie","character":"l","kind":"alibi"}]`

后继：`@promiseReturn`


---

## MIS_g｜答应过的时间，已经到了

类型：`promise`。元数据：`{"background":"corridor","music":"pulse","next":"@promiseReturn","character":"g"}`

### 正文

**旁白**：你正准备选择下一处去向，手机亮起。今天是第4日，之前约好的晚间见面就在这个时段。

`MIS_g.r4.body.001`

**顾晚棠**：还有十分钟。你能按时来吗？我好决定要不要先点菜。

`MIS_g.r4.body.002`

### 选择 MIS_g/honor

按原来的约定赴约。

可选条件：`null`

立即回应：

**顾晚棠**：那我等你一起点。别光顾着回消息，先看路。

`MIS_g.honor.r4.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"kept"},{"op":"set","key":"promise_owner","value":"g"}]`

后继：`@promiseReturn`

### 选择 MIS_g/notify

说明去不了，接受她不再等。

可选条件：`null`

立即回应：

**顾晚棠**：收到。可以改，不代表我没损失这段时间。下次先确定，再把话说满。

`MIS_g.notify.reply.001`

写入与操作：`[{"op":"set","key":"promise_status","value":"changed"},{"op":"set","key":"promise_owner","value":"g"}]`

后继：`@promiseReturn`

### 选择 MIS_g/lie

谎称加班，去另一处。

可选条件：`null`

立即回应：

**顾晚棠**：那工作优先。之后有空再约。

`MIS_g.lie.reply.001`

**旁白**：你没有纠正这个理由，收起手机，继续去原本打算去的地方。

`MIS_g.lie.reply.002`

写入与操作：`[{"op":"set","key":"promise_status","value":"lied"},{"op":"set","key":"promise_owner","value":"g"},{"op":"latentLie","character":"g","kind":"alibi"}]`

后继：`@promiseReturn`


---

## MEET_t｜没有新歌的十分钟

类型：`appointment`。元数据：`{"background":"backstage","music":"quiet","next":"@schedule","character":"t"}`

### 正文

**旁白**：映雪坐在台边，吉他还在包里。看见你，她用鞋尖碰了碰旁边的空地。

`MEET_t.r4.body.001`

**唐映雪**：来啦。先说好，今天没有新歌。

`MEET_t.r4.body.002`

**许照**：那我现在退票还来得及吗？

`MEET_t.r4.body.003`

**唐映雪**：你付过钱吗？

`MEET_t.r4.body.004`

**旁白**：你笑着坐下。她把水杯挪开，给你腾了个更宽的位置。

`MEET_t.r4.body.005`

### 选择 MEET_t/sit

坐一会儿，聊点闲事。

可选条件：`null`

立即回应：

**旁白**：映雪说门口的猫又睡到音箱上，工作人员调试前还得先请它下来。

`MEET_t.sit.r4.reply.001`

**许照**：至少它没走错入口。我刚才绕到货梯了。

`MEET_t.sit.r4.reply.002`

**唐映雪**：难怪风尘仆仆。我还以为你特地跑来的。

`MEET_t.sit.r4.reply.003`

**旁白**：你没忍住笑，她也跟着笑起来。

`MEET_t.sit.r4.reply.004`

写入与操作：`[{"op":"set","key":"met_promise","value":"t_sit"}]`

后继：`@schedule`

### 选择 MEET_t/ask

问她今天最烦什么。

可选条件：`null`

立即回应：

**唐映雪**：最烦的？大家老问我“经历了什么才唱成这样”。

`MEET_t.ask.r4.reply.001`

**许照**：那今天呢？

`MEET_t.ask.r4.reply.002`

**唐映雪**：今天是饿了，想吃面。

`MEET_t.ask.r4.reply.003`

**许照**：这个经历我有。走不走？

`MEET_t.ask.r4.reply.004`

**旁白**：她立刻把吉他包提起来，跟你去买了两份热面。

`MEET_t.ask.r4.reply.005`

写入与操作：`[{"op":"set","key":"met_promise","value":"t_food"}]`

后继：`@schedule`


---

## MEET_s｜没有流程本的一小段

类型：`appointment`。元数据：`{"background":"theatre","music":"quiet","next":"@schedule","character":"s"}`

### 正文

**旁白**：你到了北岸旁厅。清辞合上手机，朝第三排示意。

`MEET_s.r4.body.001`

**沈清辞**：今天没带流程本，不会又叫你来干活。

`MEET_s.r4.body.002`

**许照**：那我放心坐了？

`MEET_s.r4.body.003`

**沈清辞**：坐吧。刚才差点又想去门口看看，你来得正好。

`MEET_s.r4.body.004`

**旁白**：舞台还没开灯，旁厅安静下来。

`MEET_s.r4.body.005`

### 选择 MEET_s/sit

坐到第三排，听她讲这间旁厅。

可选条件：`null`

立即回应：

**沈清辞**：我喜欢坐这里。能看清表情，也不至于让台上的人紧张。

`MEET_s.sit.r4.reply.001`

**许照**：你连喜欢的位置都有理由。

`MEET_s.sit.r4.reply.002`

**沈清辞**：因为以前问我要座位的人太多。现在才想起来，我自己也能挑。

`MEET_s.sit.r4.reply.003`

**旁白**：你陪她坐了一会儿，没再问还有什么要做。

`MEET_s.sit.r4.reply.004`

写入与操作：`[{"op":"set","key":"met_promise","value":"s_room"}]`

后继：`@schedule`

### 选择 MEET_s/walk

一起绕一圈，讲讲自己走错路的事。

可选条件：`null`

立即回应：

**旁白**：你跟清辞绕了一圈，承认自己第一次来差点把储物间当出口。

`MEET_s.walk.r4.reply.001`

**沈清辞**：这两个门确实像。我也开错过。

`MEET_s.walk.r4.reply.002`

**许照**：你居然也会？

`MEET_s.walk.r4.reply.003`

**沈清辞**：会。只是一般没有观众。

`MEET_s.walk.r4.reply.004`

**旁白**：她带你从正确的门出去，笑了一路。

`MEET_s.walk.r4.reply.005`

写入与操作：`[{"op":"set","key":"met_promise","value":"s_walk"}]`

后继：`@schedule`


---

## MEET_l｜这一段不是任务

类型：`appointment`。元数据：`{"background":"projection","music":"quiet","next":"@schedule","character":"l"}`

### 正文

**旁白**：见月把一个环境声文件放在电脑上，朝你招手。

`MEET_l.r4.body.001`

**林见月**：这次不是请你看粗剪。只是想让你听一段声音。

`MEET_l.r4.body.002`

**许照**：还用交观后感吗？

`MEET_l.r4.body.003`

**林见月**：不用。听不出也可以直接说。

`MEET_l.r4.body.004`

**旁白**：你在她旁边坐下。她把音量调得很低，像怕吓走里面的安静。

`MEET_l.r4.body.005`

### 选择 MEET_l/listen

认真听完，再告诉她自己听见了什么。

可选条件：`null`

立即回应：

**许照**：前面像一扇很重的门，最后却关得很轻。

`MEET_l.listen.r4.reply.001`

**林见月**：是我关的。那天走廊有人睡着，我怕把人吵醒。

`MEET_l.listen.r4.reply.002`

**许照**：怪不得最后只有一点响。

`MEET_l.listen.r4.reply.003`

**旁白**：她把进度条拖回去，想让你再听听那点声音。

`MEET_l.listen.r4.reply.004`

写入与操作：`[{"op":"set","key":"met_promise","value":"l_listen"}]`

后继：`@schedule`

### 选择 MEET_l/silence

不急着评价，问她为什么想给你听。

可选条件：`null`

立即回应：

**林见月**：因为现在很安静，我想和你一起听。

`MEET_l.silence.r2.reply.001`

**旁白**：她没有急着解释每一声是什么。你们把那段环境声又放了一遍。

`MEET_l.silence.r2.reply.002`

写入与操作：`[{"op":"set","key":"met_promise","value":"l_silence"}]`

后继：`@schedule`


---

## MEET_g｜没用到的菜单

类型：`appointment`。元数据：`{"background":"diner","music":"quiet","next":"@schedule","character":"g"}`

### 正文

**旁白**：晚棠看了一眼时间，把菜单推给你。

`MEET_g.r4.body.001`

**顾晚棠**：刚好。我已经开始饿了。

`MEET_g.r4.body.002`

**许照**：怎么，这次不先聊工作？

`MEET_g.r4.body.003`

**顾晚棠**：先吃饭。谁先提合同，谁负责把话题改回来。

`MEET_g.r4.body.004`

**旁白**：你赶紧把手机放进兜里，认真翻菜单。

`MEET_g.r4.body.005`

### 选择 MEET_g/choose

认真挑自己想吃的，不猜她喜欢别人怎样表现。

可选条件：`null`

立即回应：

**顾晚棠**：这个很辣。你自己选的，别逞强。

`MEET_g.choose.r4.reply.001`

**许照**：应该还……行。

`MEET_g.choose.r4.reply.002`

**旁白**：第一口就呛得你去找水。晚棠忍了两秒，还是笑出来，把自己的水壶推近。

`MEET_g.choose.r4.reply.003`

**顾晚棠**：你这句“行”，以后我要打折听。

`MEET_g.choose.r4.reply.004`

写入与操作：`[{"op":"set","key":"met_promise","value":"g_spicy"}]`

后继：`@schedule`

### 选择 MEET_g/ask

问她愿不愿意这次让我点菜。

可选条件：`null`

立即回应：

**许照**：今天我点？有不吃的先告诉我。

`MEET_g.ask.r4.reply.001`

**顾晚棠**：可以。别点太甜的。难吃的话我会直说。

`MEET_g.ask.r4.reply.002`

**旁白**：你勾完菜，还是忍不住抬眼求确认。她忍着笑，把笔拿走，替你划掉重复点的一道。

`MEET_g.ask.r4.reply.003`

写入与操作：`[{"op":"set","key":"met_promise","value":"g_rest"}]`

后继：`@schedule`


---

## R1_t｜先把那句话说清楚

类型：`repair`。元数据：`{"background":"recording","music":"quiet","next":"@schedule","character":"t","repairStage":1}`

### 正文

**旁白**：你在试听前叫住映雪。她没有把耳机递过来。

`R1_t.r4.body.001`

**唐映雪**：今天先别夸歌。上次那件事，你打算怎么说？

`R1_t.r4.body.002`

**许照**：我想先把经过讲清楚。

`R1_t.r4.body.003`

**唐映雪**：那你说，我听。

`R1_t.r4.body.004`

### 条件正文 · R1_t.variant.001

条件：`{"eq":["repair_evaded_t",true]}`

**旁白**：你们上次谈到这里，是你先用别的话岔开的。

`R1_t.variant.001.001`

**唐映雪**：上次没有说完。这次还要先聊别的吗？

`R1_t.variant.001.002`

### 选择 R1_t/own

讲清经过和真实关系，不催她原谅。

可选条件：`null`

立即回应：

**许照**：我把当时说过什么、后来做了什么，重新讲一遍。

`R1_t.own.r4.reply.001`

**旁白**：你讲完，映雪沉默了一会儿，没有接着递耳机。

`R1_t.own.r4.reply.002`

**唐映雪**：我听见了。但我现在还在生气。

`R1_t.own.r4.reply.003`

**许照**：我知道，不是我说完就该好了。

`R1_t.own.r4.reply.004`

**唐映雪**：那先这样。下一次答应的事，别再让我等一句解释。

`R1_t.own.r4.reply.005`

写入与操作：`[{"op":"beginRepair","character":"t"},{"op":"disclose","character":"t"}]`

后继：`@schedule`

### 选择 R1_t/end

说清不再继续约会的打算。

可选条件：`null`

立即回应：

**唐映雪**：好。那就到这里。

`R1_t.end.r4.reply.001`

**旁白**：她低头收好耳机，过了一会儿才抬头和你道别。

`R1_t.end.r4.reply.002`

写入与操作：`[{"op":"endRelationship","character":"t","reason":"conflict"}]`

后继：`@schedule`

### 选择 R1_t/evade

只解释动机，仍不回答做错的部分。

可选条件：`null`

立即回应：

**旁白**：你绕了一圈，仍没说到问题。映雪把耳机收了起来。

`R1_t.evade.reply.001`

**唐映雪**：今天先这样吧。我不想一直负责猜你哪句是真的。

`R1_t.evade.reply.002`

写入与操作：`[{"op":"set","key":"repair_evaded_t","value":true}]`

后继：`@schedule`


---

## R1_s｜先把那句话说清楚

类型：`repair`。元数据：`{"background":"theatre","music":"quiet","next":"@schedule","character":"s","repairStage":1}`

### 正文

**旁白**：清辞听说你想谈，给你留了一个座位。桌上的工作文件被她收到一旁。

`R1_s.r4.body.001`

**沈清辞**：我们先说那件还没解决的事。

`R1_s.r4.body.002`

**许照**：好。

`R1_s.r4.body.003`

**沈清辞**：说具体经过。不用先保证以后什么都听我的。

`R1_s.r4.body.004`

### 条件正文 · R1_s.variant.001

条件：`{"eq":["repair_evaded_s",true]}`

**旁白**：你们上次谈到这里，是你先用别的话岔开的。

`R1_s.variant.001.001`

**沈清辞**：上次没有说完。这次还要先聊别的吗？

`R1_s.variant.001.002`

### 选择 R1_s/own

讲清经过和真实关系，不催她原谅。

可选条件：`null`

立即回应：

**旁白**：你按先后把经过讲完，也说清目前还答应过哪些人。

`R1_s.own.r4.reply.001`

**沈清辞**：这次我听明白了。之后怎么做，比今天说得好不好听重要。

`R1_s.own.r4.reply.002`

**许照**：好。需要更正的，我自己去说。

`R1_s.own.r4.reply.003`

**旁白**：清辞点头，把留给你的那份时间用完，才重新拿出工作文件。

`R1_s.own.r4.reply.004`

写入与操作：`[{"op":"beginRepair","character":"s"},{"op":"disclose","character":"s"}]`

后继：`@schedule`

### 选择 R1_s/end

说清不再继续约会的打算。

可选条件：`null`

立即回应：

**沈清辞**：知道了。那之后工作联系归工作，不再按约会安排。

`R1_s.end.r4.reply.001`

**旁白**：她在日程里改了备注，手指停了一会儿，才把手机收好。

`R1_s.end.r4.reply.002`

写入与操作：`[{"op":"endRelationship","character":"s","reason":"conflict"}]`

后继：`@schedule`

### 选择 R1_s/evade

只解释动机，仍不回答做错的部分。

可选条件：`null`

立即回应：

**沈清辞**：你说了很多为什么，还是没告诉我你承认哪一句。

`R1_s.evade.reply.001`

**旁白**：她没有继续帮你整理答案。今天的时间用完，问题仍然留着。

`R1_s.evade.reply.002`

写入与操作：`[{"op":"set","key":"repair_evaded_s","value":true}]`

后继：`@schedule`


---

## R1_l｜先把那句话说清楚

类型：`repair`。元数据：`{"background":"projection","music":"quiet","next":"@schedule","character":"l","repairStage":1}`

### 正文

**旁白**：见月合上电脑，把面前的位置留给你。

`R1_l.r4.body.001`

**林见月**：这回我想听你自己说，不想猜。

`R1_l.r4.body.002`

**许照**：可能会说得有点乱。

`R1_l.r4.body.003`

**林见月**：乱一点没关系。别再跳过最要紧的那句。

`R1_l.r4.body.004`

### 条件正文 · R1_l.variant.001

条件：`{"eq":["repair_evaded_l",true]}`

**旁白**：你们上次谈到这里，是你先用别的话岔开的。

`R1_l.variant.001.001`

**林见月**：上次没有说完。这次还要先聊别的吗？

`R1_l.variant.001.002`

### 选择 R1_l/own

讲清经过和真实关系，不催她原谅。

可选条件：`null`

立即回应：

**旁白**：你把前后不一致的地方说出来。见月听完，没有立刻接“没关系”。

`R1_l.own.r4.reply.001`

**林见月**：我得想想。至少这回不是我一直追着问。

`R1_l.own.r4.reply.002`

**许照**：该更正的，我会去更正。不是让你替我解释。

`R1_l.own.r4.reply.003`

**旁白**：她答应之后可以再谈，但今天没有继续原来的约会。

`R1_l.own.r4.reply.004`

写入与操作：`[{"op":"beginRepair","character":"l"},{"op":"disclose","character":"l"}]`

后继：`@schedule`

### 选择 R1_l/end

说清不再继续约会的打算。

可选条件：`null`

立即回应：

**林见月**：好。谢谢你这次直接说。

`R1_l.end.r4.reply.001`

**旁白**：她取消了下一次私人见面的提醒，没有要求你把以前的聊天也全部删掉。

`R1_l.end.r4.reply.002`

写入与操作：`[{"op":"endRelationship","character":"l","reason":"conflict"}]`

后继：`@schedule`

### 选择 R1_l/evade

只解释动机，仍不回答做错的部分。

可选条件：`null`

立即回应：

**旁白**：你想用新的漂亮话绕开旧话，见月却摇头。

`R1_l.evade.reply.001`

**林见月**：先别换一种说法。那件事还没有回答。

`R1_l.evade.reply.002`

**旁白**：你们今天没有走到新的关系，沉默也不会替你完成解释。

`R1_l.evade.reply.003`

写入与操作：`[{"op":"set","key":"repair_evaded_l","value":true}]`

后继：`@schedule`


---

## R1_g｜先把那句话说清楚

类型：`repair`。元数据：`{"background":"terrace","music":"quiet","next":"@schedule","character":"g","repairStage":1}`

### 正文

**旁白**：晚棠没拿文件，桌上只有两杯水。

`R1_g.r4.body.001`

**顾晚棠**：你说想谈。现在可以说了。

`R1_g.r4.body.002`

**许照**：你不先问？

`R1_g.r4.body.003`

**顾晚棠**：我问过。今天想听你主动把事情讲全。

`R1_g.r4.body.004`

### 条件正文 · R1_g.variant.001

条件：`{"eq":["repair_evaded_g",true]}`

**旁白**：你们上次谈到这里，是你先用别的话岔开的。

`R1_g.variant.001.001`

**顾晚棠**：上次没有说完。这次还要先聊别的吗？

`R1_g.variant.001.002`

### 选择 R1_g/own

讲清经过和真实关系，不催她原谅。

可选条件：`null`

立即回应：

**旁白**：你把具体经过讲完，没拿“怕你生气”替自己省略责任。

`R1_g.own.r4.reply.001`

**顾晚棠**：我确实会生气。可你瞒着，我就不会了吗？

`R1_g.own.r4.reply.002`

**许照**：不会。这是我做错了。

`R1_g.own.r4.reply.003`

**旁白**：她把那杯水推过来一点。

`R1_g.own.r4.reply.004`

**顾晚棠**：先把该更正的事做了。别只在我面前说得明白。

`R1_g.own.r4.reply.005`

写入与操作：`[{"op":"beginRepair","character":"g"},{"op":"disclose","character":"g"}]`

后继：`@schedule`

### 选择 R1_g/end

说清不再继续约会的打算。

可选条件：`null`

立即回应：

**顾晚棠**：明白。那下次别再用那种让我误会的说法约我。

`R1_g.end.r4.reply.001`

**旁白**：她划掉一项私人安排，杯子里的水一直没动。

`R1_g.end.r4.reply.002`

写入与操作：`[{"op":"endRelationship","character":"g","reason":"conflict"}]`

后继：`@schedule`

### 选择 R1_g/evade

只解释动机，仍不回答做错的部分。

可选条件：`null`

立即回应：

**顾晚棠**：这个故事解释了你为什么想这么做，没解释你准备怎样面对已经做了。

`R1_g.evade.reply.001`

**旁白**：她没有继续追问，也没有继续往前。今天的沉默不是默认原谅。

`R1_g.evade.reply.002`

写入与操作：`[{"op":"set","key":"repair_evaded_g","value":true}]`

后继：`@schedule`


---

## R2_t｜用一件真正做过的事回答

类型：`repair`。元数据：`{"background":"recording","music":"quiet","next":"@schedule","character":"t","repairStage":2,"editorNotes":["之前尚未约会的，仍要完成真实赴约；已经约会过的，可以从清楚的新范围继续。共同恋爱仍需要相关人物分别相处与确认。"]}`

### 正文

**旁白**：映雪听完更正，重新把耳机放回桌面。

`R2_t.r4.body.001`

**唐映雪**：这次我确认了。我们再说以后吧。

`R2_t.r4.body.002`

### 选择 R2_t/open

说清现有关系，询问能否继续约会。

可选条件：`{"eq":["repair_action_t",true]}`

立即回应：

**旁白**：你把现在还在约会的人和已有承诺说清楚。

`R2_t.open.r4.reply.001`

**唐映雪**：我愿意再试着约会。有别的关系要说实话，别让我后来才知道。

`R2_t.open.r4.reply.002`

**许照**：好，不拿你今天答应当以后的默认。

`R2_t.open.r4.reply.003`

**旁白**：她把下一次有空的时间发给你，最后又补了一句：这次别迟到。

`R2_t.open.r4.reply.004`

写入与操作：`[{"op":"finishRepair","character":"t","scope":"open"}]`

后继：`@schedule`

### 选择 R2_t/exclusive

先结束其他恋爱，只与她继续。

可选条件：`{"eq":["repair_action_t",true]}`

立即回应：

**许照**：这一次，我只想和你继续。

`R2_t.exclusive.r2.reply.001`

**唐映雪**：好。这句我会认真记住。

`R2_t.exclusive.r2.reply.002`

回应条件：`{"otherActive":"t"}`（按点击前状态判断）

**旁白**：在重新答应以前，你先向每一位实际约会的其他人说清结束，不用失联代替告别。

`R2_t.exclusive.r2.others.001`

写入与操作：`[{"op":"finishRepair","character":"t","scope":"exclusive"}]`

后继：`@schedule`

### 选择 R2_t/friend

修复之后，仍选择做朋友。

可选条件：`{"eq":["repair_action_t",true]}`

立即回应：

**许照**：我想清楚了。我们留在朋友的位置，不继续恋爱。

`R2_t.friend.r4.reply.001`

**唐映雪**：好。我知道了。

`R2_t.friend.r4.reply.002`

**旁白**：你们把下一次见面是否保留、以什么方式联系，也一并说清了。

`R2_t.friend.r4.reply.003`

写入与操作：`[{"op":"finishRepair","character":"t","scope":"friend"}]`

后继：`@schedule`


---

## R2_s｜用一件真正做过的事回答

类型：`repair`。元数据：`{"background":"theatre","music":"quiet","next":"@schedule","character":"s","repairStage":2,"editorNotes":["之前尚未约会的，仍要完成真实赴约；已经约会过的，可以从清楚的新范围继续。共同恋爱仍需要相关人物分别相处与确认。"]}`

### 正文

**旁白**：清辞逐项确认你刚才做的更正，合上记录。

`R2_s.r4.body.001`

**沈清辞**：好，现在事情说清了。你想怎么继续？

`R2_s.r4.body.002`

### 选择 R2_s/open

说清现有关系，询问能否继续约会。

可选条件：`{"eq":["repair_action_s",true]}`

立即回应：

**旁白**：你把现在还在约会的人和已有承诺说清楚。

`R2_s.open.r4.reply.001`

**沈清辞**：可以继续约会。但时间和现有关系要讲清楚，有变化再谈。

`R2_s.open.r4.reply.002`

**许照**：我会提前说。

`R2_s.open.r4.reply.003`

**旁白**：她把一个空闲时段给你看，等你确认能来，才记下。

`R2_s.open.r4.reply.004`

写入与操作：`[{"op":"finishRepair","character":"s","scope":"open"}]`

后继：`@schedule`

### 选择 R2_s/exclusive

先结束其他恋爱，只与她继续。

可选条件：`{"eq":["repair_action_s",true]}`

立即回应：

**许照**：这一次，我只想和你继续。

`R2_s.exclusive.r2.reply.001`

**沈清辞**：好。这句我会认真记住。

`R2_s.exclusive.r2.reply.002`

回应条件：`{"otherActive":"s"}`（按点击前状态判断）

**旁白**：在重新答应以前，你先向每一位实际约会的其他人说清结束，不用失联代替告别。

`R2_s.exclusive.r2.others.001`

写入与操作：`[{"op":"finishRepair","character":"s","scope":"exclusive"}]`

后继：`@schedule`

### 选择 R2_s/friend

修复之后，仍选择做朋友。

可选条件：`{"eq":["repair_action_s",true]}`

立即回应：

**许照**：我想清楚了。我们留在朋友的位置，不继续恋爱。

`R2_s.friend.r4.reply.001`

**沈清辞**：好。我知道了。

`R2_s.friend.r4.reply.002`

**旁白**：你们把下一次见面是否保留、以什么方式联系，也一并说清了。

`R2_s.friend.r4.reply.003`

写入与操作：`[{"op":"finishRepair","character":"s","scope":"friend"}]`

后继：`@schedule`


---

## R2_l｜用一件真正做过的事回答

类型：`repair`。元数据：`{"background":"projection","music":"quiet","next":"@schedule","character":"l","repairStage":2,"editorNotes":["之前尚未约会的，仍要完成真实赴约；已经约会过的，可以从清楚的新范围继续。共同恋爱仍需要相关人物分别相处与确认。"]}`

### 正文

**旁白**：见月听完，也确认了涉及她的部分。

`R2_l.r4.body.001`

**林见月**：我想过了。现在可以再谈我们。

`R2_l.r4.body.002`

### 选择 R2_l/open

说清现有关系，询问能否继续约会。

可选条件：`{"eq":["repair_action_l",true]}`

立即回应：

**旁白**：你把现在还在约会的人和已有承诺说清楚。

`R2_l.open.r4.reply.001`

**林见月**：我也想再试试。我需要知道自己答应的是什么，不是以后才补出来的版本。

`R2_l.open.r4.reply.002`

**许照**：现在的情况我都说清楚。有变化我再来问你。

`R2_l.open.r4.reply.003`

**旁白**：她点头，重新问起你下一次有空的晚上。

`R2_l.open.r4.reply.004`

写入与操作：`[{"op":"finishRepair","character":"l","scope":"open"}]`

后继：`@schedule`

### 选择 R2_l/exclusive

先结束其他恋爱，只与她继续。

可选条件：`{"eq":["repair_action_l",true]}`

立即回应：

**许照**：这一次，我只想和你继续。

`R2_l.exclusive.r2.reply.001`

**林见月**：好。这句我会认真记住。

`R2_l.exclusive.r2.reply.002`

回应条件：`{"otherActive":"l"}`（按点击前状态判断）

**旁白**：在重新答应以前，你先向每一位实际约会的其他人说清结束，不用失联代替告别。

`R2_l.exclusive.r2.others.001`

写入与操作：`[{"op":"finishRepair","character":"l","scope":"exclusive"}]`

后继：`@schedule`

### 选择 R2_l/friend

修复之后，仍选择做朋友。

可选条件：`{"eq":["repair_action_l",true]}`

立即回应：

**许照**：我想清楚了。我们留在朋友的位置，不继续恋爱。

`R2_l.friend.r4.reply.001`

**林见月**：好。我知道了。

`R2_l.friend.r4.reply.002`

**旁白**：你们把下一次见面是否保留、以什么方式联系，也一并说清了。

`R2_l.friend.r4.reply.003`

写入与操作：`[{"op":"finishRepair","character":"l","scope":"friend"}]`

后继：`@schedule`


---

## R2_g｜用一件真正做过的事回答

类型：`repair`。元数据：`{"background":"terrace","music":"quiet","next":"@schedule","character":"g","repairStage":2,"editorNotes":["之前尚未约会的，仍要完成真实赴约；已经约会过的，可以从清楚的新范围继续。共同恋爱仍需要相关人物分别相处与确认。"]}`

### 正文

**旁白**：晚棠核对完你刚做的事，终于端起那杯水。

`R2_g.r4.body.001`

**顾晚棠**：这回不是只说会做。好，再谈下一步。

`R2_g.r4.body.002`

### 选择 R2_g/open

说清现有关系，询问能否继续约会。

可选条件：`{"eq":["repair_action_g",true]}`

立即回应：

**旁白**：你把现在还在约会的人和已有承诺说清楚。

`R2_g.open.r4.reply.001`

**顾晚棠**：我愿意继续。但别把今天的答应当成你以后怎么安排都可以。

`R2_g.open.r4.reply.002`

**许照**：知道，有变化重新说。

`R2_g.open.r4.reply.003`

**旁白**：她拿出手机，和你重新约了一次见面。

`R2_g.open.r4.reply.004`

写入与操作：`[{"op":"finishRepair","character":"g","scope":"open"}]`

后继：`@schedule`

### 选择 R2_g/exclusive

先结束其他恋爱，只与她继续。

可选条件：`{"eq":["repair_action_g",true]}`

立即回应：

**许照**：这一次，我只想和你继续。

`R2_g.exclusive.r2.reply.001`

**顾晚棠**：好。这句我会认真记住。

`R2_g.exclusive.r2.reply.002`

回应条件：`{"otherActive":"g"}`（按点击前状态判断）

**旁白**：在重新答应以前，你先向每一位实际约会的其他人说清结束，不用失联代替告别。

`R2_g.exclusive.r2.others.001`

写入与操作：`[{"op":"finishRepair","character":"g","scope":"exclusive"}]`

后继：`@schedule`

### 选择 R2_g/friend

修复之后，仍选择做朋友。

可选条件：`{"eq":["repair_action_g",true]}`

立即回应：

**许照**：我想清楚了。我们留在朋友的位置，不继续恋爱。

`R2_g.friend.r4.reply.001`

**顾晚棠**：好。我知道了。

`R2_g.friend.r4.reply.002`

**旁白**：你们把下一次见面是否保留、以什么方式联系，也一并说清了。

`R2_g.friend.r4.reply.003`

写入与操作：`[{"op":"finishRepair","character":"g","scope":"friend"}]`

后继：`@schedule`


---

## REST｜把这一段时间留给自己

类型：`rest`。元数据：`{"background":"river","music":"quiet","next":"@schedule","repeatable":true}`

### 正文

**旁白**：你看了眼日程，把这一段留空。今晚不再接新的安排。

`REST.r4.body.001`

**旁白**：已经答应别人的约定还在提醒里，休息不会自动替你取消。

`REST.r4.body.002`

### 选择 REST/prepare

整理已有材料与下一次安排。

可选条件：`null`

立即回应：

**旁白**：你把文件按来源归好，给下一次约定设了提醒。没有得到新的证据，但明天不用再从聊天记录里乱翻。

`REST.prepare.r4.reply.001`

写入与操作：`[{"op":"set","key":"last_rest","value":"prepare"}]`

后继：`@schedule`

### 选择 REST/sleep

吃点东西，好好休息。

可选条件：`null`

立即回应：

**旁白**：你把明天的闹钟设好，吃完热饭，关掉不必要的提醒。躺下时，肩膀终于不再绷着。

`REST.sleep.r4.reply.001`

写入与操作：`[{"op":"set","key":"last_rest","value":"sleep"}]`

后继：`@schedule`


---

## R_t｜第一排不再是观众

类型：`ending`。元数据：`{"background":"stage","music":"finale","next":"@end","endingFamily":"R_t","members":["t"]}`

### 正文

**旁白**：夜场散了，映雪还坐在台沿，给你留着旁边的位置。

`R_t.r2.body.001`

**唐映雪**：有个事，想再说一遍。

`R_t.r2.body.002`

**旁白**：她把拨片攥在掌心，这回没拿玩笑开场。

`R_t.r2.body.003`

**唐映雪**：我想正式和你交往。不是缺个固定观众，是没事的时候也想见你。

`R_t.r2.body.004`

**许照**：这么直接？

`R_t.r2.body.005`

**唐映雪**：想了半天，再绕我就说不出来了。

`R_t.r2.body.006`

**旁白**：她笑着把手伸到你面前，先看了一眼你的表情，再等你回答。

`R_t.r2.body.007`

### 条件正文 · R_t.variant.001

条件：`{"eq":["meal_t","share"]}`

**唐映雪**：上次冷饭分你一半，今晚该你请一份热的了。

`R_t.variant.001.001`

**旁白**：她把手里的外套搭好，学了一下你当时盯着那块鸡肉的表情。

`R_t.variant.001.002`

### 条件正文 · R_t.variant.002

条件：`{"eq":["meal_t","guard"]}`

**唐映雪**：那次你替我挡着门，让我把饭吃完，我记着呢。今天一起吃，不用守门。

`R_t.variant.002.001`

### 条件正文 · R_t.variant.003

条件：`{"eq":["meal_t","song"]}`

**唐映雪**：那晚你连盒饭时间都想听歌，今天先把饭吃好。歌我又不会唱完就跑。

`R_t.r2.meal_song.001`

### 条件正文 · R_t.variant.004

条件：`{"eq":["pace_t","slow"]}`

**旁白**：她记得你说过想慢一点，所以手只停在中间，没有替你做决定。

`R_t.variant.004.001`

### 条件正文 · R_t.variant.005

条件：`{"eq":["last_t","wanted"]}`

**唐映雪**：你上次问我想不想见你。我现在再答一次，想。

`R_t.variant.005.001`

### 条件正文 · R_t.variant.006

条件：`{"eq":["last_t","ordinary"]}`

**唐映雪**：你上次说自己也累，想就那么待着。今晚也可以，我不催你表现。

`R_t.variant.006.001`

### 条件正文 · R_t.variant.007

条件：`{"eq":["last_t","space"]}`

**唐映雪**：那次你说想早点回去，我听见了。今天能留多久，也照实告诉我。

`R_t.variant.007.001`

### 条件正文 · R_t.variant.008

条件：`{"eq":["last_question_t","asked"]}`

**唐映雪**：你最后问我想把歌唱给谁，那次我终于没忙着猜你最想听哪一种答案。

`R_t.variant.008.001`

### 条件正文 · R_t.variant.009

条件：`{"eq":["last_question_t","present"]}`

**唐映雪**：你肯说现在听见什么，比保证它以后会红更有用。

`R_t.variant.009.001`

### 条件正文 · R_t.variant.010

条件：`{"eq":["last_question_t","listened"]}`

**唐映雪**：那晚我卡了好几次，你也没有急着替我接上。下次还可以这样。

`R_t.variant.010.001`

### 选择 R_t/close

答应交往，握住她的手，问她愿不愿意亲一下。

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_t.close.r2.accept.001`

**旁白**：你先握住她的手，问完才靠近。映雪点头，向你挪了半步。

`R_t.close.reply.001`

**旁白**：吻很轻，她却没像平时那样用一句玩笑逃开。退开以后，两个人都笑了，映雪先红了耳朵，还非说是屋里太热。

`R_t.close.reply.002`

**唐映雪**：男朋友，下次也可以什么事都没有就来。

`R_t.close.reply.003`

**旁白**：你们把灯关好，一起从侧门出去。原著在这里该写一场盛大的谢幕，你们却先去找还没打烊的面馆。

`R_t.close.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"t_close"},{"op":"set","key":"kissed_t","value":true},{"op":"set","key":"commitment_t","value":"relationship"},{"op":"set","key":"final_accept_t","value":true}]`

后继：`@end`

### 选择 R_t/slow

答应交往，坐到她旁边：“我想留下。但今晚就这样，行吗？”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_t.slow.r2.accept.001`

**唐映雪**：行。别总以为不亲一下，这一晚就不算数。

`R_t.slow.reply.001`

**旁白**：她把肩膀轻轻靠过来，等你点头才放松。你们坐着听空厅里细小的声音，过了一会儿，她才问你今天累不累。

`R_t.slow.reply.002`

**唐映雪**：我明天可能还是会紧张，也可能突然想躲人。

`R_t.slow.reply.003`

**许照**：那你可以说。

`R_t.slow.reply.004`

**旁白**：那张第一排的椅子被翻起来时，你们已经并肩走到了门口。

`R_t.slow.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"t_slow"},{"op":"set","key":"commitment_t","value":"relationship"},{"op":"set","key":"final_accept_t","value":true}]`

后继：`@end`

### 选择 R_t/ordinary

答应交往，“走吧，先吃饭。我今天也饿了。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_t.ordinary.r2.accept.001`

**唐映雪**：这句比夸我唱得好还有用。

`R_t.ordinary.reply.001`

**旁白**：她拿起外套，临走又回头检查了一遍门。走到门口，她的肚子还很不争气地响了一声。

`R_t.ordinary.reply.002`

**旁白**：街边面馆快关门，老板让你们快一点。映雪替你拿筷子，又马上问你要不要辣。

`R_t.ordinary.reply.003`

**唐映雪**：以后我再藏饭盒，你就直接叫我一起吃。别拍成感人的幕后故事。

`R_t.ordinary.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"t_ordinary"},{"op":"set","key":"commitment_t","value":"relationship"},{"op":"set","key":"final_accept_t","value":true}]`

后继：`@end`


---

## R_s｜不在日程里的晚上

类型：`ending`。元数据：`{"background":"river","music":"finale","next":"@end","endingFamily":"R_s","members":["s"]}`

### 正文

**旁白**：清辞和现场值守的人道别，从门口朝你走来。手机已经收进包里。

`R_s.r2.body.001`

**沈清辞**：等久了？不用把久说成不久，我今天确实晚了一点。

`R_s.r2.body.002`

**旁白**：她在你身边站定，指了指不通往工作区的那条小街。

`R_s.r2.body.003`

**沈清辞**：我想跟你继续，按恋人的方式。不需要你以后每次来都很可靠。

`R_s.r2.body.004`

**许照**：不可靠也行？

`R_s.r2.body.005`

**沈清辞**：偶尔迷路行，骗我不行。

`R_s.r2.body.006`

**旁白**：她说完先笑了，伸出手，等你决定要不要接。

`R_s.r2.body.007`

### 条件正文 · R_s.variant.001

条件：`{"eq":["theatre_s","heard"]}`

**沈清辞**：那场只来了六个人的演出，我以后还是会想起来。但现在想起它，不只剩丢脸。

`R_s.variant.001.001`

### 条件正文 · R_s.variant.002

条件：`{"eq":["bench_s","joke"]}`

**沈清辞**：今天椅子都好好的，不用编故障。

`R_s.variant.002.001`

### 条件正文 · R_s.variant.003

条件：`{"eq":["repaired_s",true]}`

**旁白**：你们没有忘记修复过的那件事。愿意继续，是她看过后来的行动再给的回答，今天可以继续，并不等于以后不用再认真相处。

`R_s.variant.003.001`

### 条件正文 · R_s.variant.004

条件：`{"eq":["last_s","say"]}`

**沈清辞**：你上次让我自己把想说的说完。今天也想说，见到你我挺高兴。

`R_s.variant.004.001`

### 条件正文 · R_s.variant.005

条件：`{"eq":["last_s","mutual"]}`

**沈清辞**：你上次说会多问一句，也要我直说。那我今天直说：想见你。

`R_s.variant.005.001`

### 条件正文 · R_s.variant.006

条件：`{"eq":["last_s","honest"]}`

**沈清辞**：上次你明明想见我，还是说了不能待太晚。今天也不用为哄我乱答应。

`R_s.variant.006.001`

### 条件正文 · R_s.variant.007

条件：`{"eq":["door_s","leave"]}`

**沈清辞**：那天早点走，甜品店还开着。今天还走不走那边？

`R_s.variant.007.001`

### 条件正文 · R_s.variant.008

条件：`{"eq":["door_s","mutual"]}`

**沈清辞**：我们都说累的那一次，我挺喜欢。以后不必轮流当那个永远有力气的人。

`R_s.variant.008.001`

### 条件正文 · R_s.variant.009

条件：`{"eq":["door_s","wait"]}`

**沈清辞**：你真的等我自己决定，我记得。今天也可以慢慢来。

`R_s.variant.009.001`

### 选择 R_s/hand

答应交往，伸出手，等她自己放过来。

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_s.hand.r2.accept.001`

**旁白**：清辞把手完整地放进你的掌心。不是擦肩时的一下试探，也不是工作时催你快走的牵拉。

`R_s.hand.reply.001`

**沈清辞**：男朋友，我有时候会想见你，但不一定能说得很好。

`R_s.hand.reply.002`

**许照**：你说，我会听。听不懂就再问。

`R_s.hand.reply.003`

**旁白**：她点头，过了一会儿，主动停下来轻轻抱住你。你回应之后，她才在你脸侧亲了一下。

`R_s.hand.reply.004`

**沈清辞**：今天这句说得还行？

`R_s.hand.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"s_hand"},{"op":"set","key":"commitment_s","value":"relationship"},{"op":"set","key":"final_accept_s","value":true},{"op":"set","key":"kissed_cheek_s","value":true}]`

后继：`@end`

### 选择 R_s/slow

答应交往，“我想和你慢慢走。不必今晚就把以后都说好。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_s.slow.r2.accept.001`

**沈清辞**：好。我也不想又写一份计划。

`R_s.slow.reply.001`

**旁白**：你们沿小街走了很久，谈的都是不太重要的事。她承认有一家店其实一直没吃懂，你说自己有一次认错了演员，还硬聊了半天。

`R_s.slow.reply.002`

**旁白**：到分别的路口，她先问了下一次能不能见。你认真看过自己的安排，再给了一个做得到的时间。

`R_s.slow.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"s_slow"},{"op":"set","key":"commitment_s","value":"relationship"},{"op":"set","key":"final_accept_s","value":true}]`

后继：`@end`

### 选择 R_s/dinner

答应交往，“这顿我想请。但下次你也可以挑地方。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_s.dinner.r2.accept.001`

**沈清辞**：可以。别为了请我，就找一个你吃完要心疼一周的地方。

`R_s.dinner.reply.001`

**旁白**：你们去了小馆子。她没替你点菜，先问你今天想吃什么，你也没有凭记得的习惯替她决定。

`R_s.dinner.reply.002`

**旁白**：饭吃得很慢，中途没有复盘工作。她把手机收进包，偶尔拿出来看一眼时间，又放回去。

`R_s.dinner.reply.003`

**沈清辞**：我不是没有空。我以前只是总把自己的空算得不重要。

`R_s.dinner.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"s_dinner"},{"op":"set","key":"commitment_s","value":"relationship"},{"op":"set","key":"final_accept_s","value":true}]`

后继：`@end`


---

## R_l｜这次，听她自己的答案

类型：`ending`。元数据：`{"background":"projection","music":"finale","next":"@end","endingFamily":"R_l","members":["l"]}`

### 正文

**旁白**：见月把项目文件归档，屏幕暗下来，她却没急着走。

`R_l.r2.body.001`

**林见月**：有句话，这次不留到片尾。

`R_l.r2.body.002`

**旁白**：她转向你，指尖在耳机线上绕了一圈，又松开。

`R_l.r2.body.003`

**林见月**：我想和你正式交往。以后拍到很糟的东西、很好看的东西，都想先讲给你听。

`R_l.r2.body.004`

**许照**：很糟的也有我的份？

`R_l.r2.body.005`

**林见月**：有。还不能只回一个“哈哈”。

`R_l.r2.body.006`

**旁白**：她认真起来，把下一阶段真实的安排给你看。

`R_l.r2.body.007`

**林见月**：会有麻烦。可我想试，你呢？

`R_l.r2.body.008`

### 条件正文 · R_l.variant.001

条件：`{"eq":["final_l","fellowship"]}`

**旁白**：她已进入外出项目的下一轮沟通，计划的拍摄地点不在海岚。手续还在商量，你们已经开始认真谈可能的远行。

`R_l.variant.001.001`

### 条件正文 · R_l.variant.002

条件：`{"ne":["final_l","fellowship"]}`

**旁白**：她眼前的主要安排仍在海岚。你们谈过工作，也谈过留下并不意味着从此不用再问她自己的想法。

`R_l.variant.002.001`

### 条件正文 · R_l.variant.003

条件：`{"eq":["camera_l","swap"]}`

**林见月**：你拍糊的那段，我还留着。不是拿来嘲笑你，是我也难得站在镜头前面。

`R_l.variant.003.001`

### 条件正文 · R_l.variant.004

条件：`{"eq":["last_l","remember"]}`

**林见月**：你说过怕哪天醒来，这些都不见了。今天我先约你，也是想让你安心一点。

`R_l.variant.004.001`

### 条件正文 · R_l.variant.005

条件：`{"eq":["last_l","ordinary"]}`

**林见月**：你说喜欢不用猜答案的相处。那我今天也不让你猜。

`R_l.variant.005.001`

### 条件正文 · R_l.variant.006

条件：`{"eq":["last_l","private"]}`

**林见月**：你还没准备好讲的秘密，可以以后再讲。今天我先说我自己的。

`R_l.variant.006.001`

### 条件正文 · R_l.variant.007

条件：`{"eq":["newwish_l","change"]}`

**林见月**：你说可以改主意。今天这一句愿意，可是我改来改去以后留下的。

`R_l.variant.007.001`

### 条件正文 · R_l.variant.008

条件：`{"eq":["newwish_l","honest"]}`

**林见月**：你能承认怀念，又肯听新的，我很高兴。

`R_l.variant.008.001`

### 条件正文 · R_l.variant.009

条件：`{"eq":["newwish_l","ask"]}`

**林见月**：你最后没有猜我的计划，而是问我。我想继续被你这样认识。

`R_l.variant.009.001`

### 选择 R_l/kiss

答应交往，再问能不能吻她。

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_l.kiss.r2.accept.001`

**旁白**：见月笑着点头。你靠近时，她没有低头躲开，先看着你，再把距离走完。

`R_l.kiss.reply.001`

**旁白**：吻很轻，结束以后，她反而更认真地看了你一会儿。

`R_l.kiss.reply.002`

**林见月**：这段不需要剪。

`R_l.kiss.reply.003`

**许照**：失误也留着？

`R_l.kiss.reply.004`

**林见月**：嗯。我们自己知道就好。

`R_l.kiss.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"l_kiss"},{"op":"set","key":"kissed_l","value":true},{"op":"set","key":"commitment_l","value":"relationship"},{"op":"set","key":"final_accept_l","value":true}]`

后继：`@end`

### 选择 R_l/plan

答应交往，“我愿意。我们先约一个真的能见面的日期。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_l.plan.r2.accept.001`

**旁白**：你们一起看过时间，不让某个人一直承担来回的路。你们来回核对了两次，才找出都不用赶场的那一晚。

`R_l.plan.reply.001`

**林见月**：这样我安心一点。

`R_l.plan.reply.002`

**许照**：以后变了，就再说。

`R_l.plan.reply.003`

**旁白**：离开时她主动牵住你的手，力度很轻，却没有把这一次也说成顺路。

`R_l.plan.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"l_plan"},{"op":"set","key":"commitment_l","value":"relationship"},{"op":"set","key":"final_accept_l","value":true}]`

后继：`@end`

### 选择 R_l/quiet

答应交往，“我愿意。今天先坐一会儿，不急着解释给任何人听。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_l.quiet.r2.accept.001`

**林见月**：好。

`R_l.quiet.reply.001`

**旁白**：她靠近一点，在碰到你之前停了停，等你点头。然后安静地把肩膀挨过来。

`R_l.quiet.reply.002`

**林见月**：我以前总怕话说到一半，就没人愿意继续听。

`R_l.quiet.reply.004`

**许照**：今天可以慢。

`R_l.quiet.reply.005`

**旁白**：她笑了。你们把这段没有被剪短的安静留了下来。

`R_l.quiet.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"l_quiet"},{"op":"set","key":"commitment_l","value":"relationship"},{"op":"set","key":"final_accept_l","value":true}]`

后继：`@end`


---

## R_g｜不带条件的邀约

类型：`ending`。元数据：`{"background":"terrace","music":"finale","next":"@end","endingFamily":"R_g","members":["g"]}`

### 正文

**旁白**：晚棠比约定早到，桌上只有两杯水。她看见你，反而先紧张地转了一下杯子。

`R_g.r2.body.001`

**顾晚棠**：我想再确认一次。不是下一场合作，是我们。

`R_g.r2.body.002`

**旁白**：她把还想拿来缓和气氛的玩笑咽了回去。

`R_g.r2.body.003`

**顾晚棠**：我喜欢你。想正式交往，没带来好消息的时候，也想叫你出来。

`R_g.r2.body.004`

**许照**：今天也没有？

`R_g.r2.body.005`

**顾晚棠**：有。刚才那句还不算？

`R_g.r2.body.006`

**旁白**：她笑了，指尖轻轻碰一下你的袖口，随后停住，等你回答。

`R_g.r2.body.007`

### 条件正文 · R_g.variant.001

条件：`{"eq":["deal_g","ambition"]}`

**顾晚棠**：你的工作机会照约处理。不要因为我们交往，就觉得自己不该再要合理的报酬。

`R_g.variant.001.001`

### 条件正文 · R_g.variant.002

条件：`{"eq":["claw_g","join"]}`

**顾晚棠**：那台夹娃娃机以后还去不去？这次我想再看你失手一次。

`R_g.variant.002.001`

### 条件正文 · R_g.variant.003

条件：`{"eq":["repaired_g",true]}`

**旁白**：你们谈过一次难听的真话，也做过一次具体的修复。她今天的肯定来自后来发生的事，不是那段问题从未存在。

`R_g.variant.003.001`

### 条件正文 · R_g.variant.004

条件：`{"eq":["last_g","wanted"]}`

**顾晚棠**：上次我说想见，你说挺高兴。这句我拿来壮胆了，今天又约你一次。

`R_g.variant.004.001`

### 条件正文 · R_g.variant.005

条件：`{"eq":["last_g","ordinary"]}`

**顾晚棠**：上次你说两个人都没带台词。今天我还是没准备，你别笑场。

`R_g.variant.005.001`

### 条件正文 · R_g.variant.006

条件：`{"eq":["last_g","quiet"]}`

**顾晚棠**：上次安静坐着也没出什么问题。今天不用一直准备讨我喜欢的话。

`R_g.variant.006.001`

### 条件正文 · R_g.variant.007

条件：`{"eq":["nothing_g","person"]}`

**顾晚棠**：上次没有好消息，你也来。我会记住，但不拿它替你作所有以后的保证。

`R_g.variant.007.001`

### 条件正文 · R_g.variant.008

条件：`{"eq":["nothing_g","mutual"]}`

**顾晚棠**：那个谁都不太好的晚上，过得居然不错。今天也不用端着。

`R_g.variant.008.001`

### 条件正文 · R_g.variant.009

条件：`{"eq":["nothing_g","quiet"]}`

**顾晚棠**：上次我不怎么说话，你没逼着问更多。那一下让我想让你留下。

`R_g.variant.009.001`

### 选择 R_g/close

答应交往，“想。还有一件事——可以吻你吗？”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_g.close.r2.accept.001`

**旁白**：晚棠笑了一下，很轻地说可以。你走近，她没有把允许改成下一道试探。

`R_g.close.reply.001`

**旁白**：亲吻结束后，她手指还停在你袖口，像暂时不想把这一小段距离放回去。

`R_g.close.reply.002`

**顾晚棠**：你知道我现在想说什么吗？

`R_g.close.reply.003`

**许照**：不知道。你说。

`R_g.close.reply.004`

**旁白**：她听到这个答案，反而更高兴。

`R_g.close.reply.005`

**顾晚棠**：挺好。总算有一句，不用你提前知道。

`R_g.close.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"g_close"},{"op":"set","key":"kissed_g","value":true},{"op":"set","key":"commitment_g","value":"relationship"},{"op":"set","key":"final_accept_g","value":true}]`

后继：`@end`

### 选择 R_g/ordinary

答应交往，去她挑的小店吃饭，不把今晚排成一场大事。

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_g.ordinary.r2.accept.001`

回应条件：`{"seen":"g08"}`（按点击前状态判断）

**旁白**：晚棠把那把会晃的凳子换给自己。

`R_g.ordinary.r2.return.001`

**顾晚棠**：上次嫌它，这次还敢来？

`R_g.ordinary.r2.return.002`

**许照**：饭比凳子争气。

`R_g.ordinary.r2.return.003`

**顾晚棠**：这评价我替老板收下。

`R_g.ordinary.r2.return.004`

回应条件：`{"not":{"seen":"g08"}}`（按点击前状态判断）

**旁白**：晚棠带你拐进一家小店。她刚坐下，凳子就晃了一下。

`R_g.ordinary.r2.first.001`

**顾晚棠**：先别笑。

`R_g.ordinary.r2.first.002`

**许照**：我还没笑。

`R_g.ordinary.r2.first.003`

**顾晚棠**：你脸上已经开始了。

`R_g.ordinary.r2.first.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"g_ordinary"},{"op":"set","key":"commitment_g","value":"relationship"},{"op":"set","key":"final_accept_g","value":true}]`

后继：`@end`

### 选择 R_g/slow

答应交往，“想。但今晚先牵手就好，我想慢慢来。”

可选条件：`null`

立即回应：

**许照**：我愿意。

`R_g.slow.r2.accept.001`

**旁白**：她把手伸过来，没有拿你的慢热开玩笑逼你证明。

`R_g.slow.reply.001`

**顾晚棠**：可以。你不需要像对手一样，猜我下一步会不会觉得你不够。

`R_g.slow.reply.002`

**旁白**：你握住她。她指尖有一点凉，走出门后慢慢暖起来。

`R_g.slow.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"g_slow"},{"op":"set","key":"commitment_g","value":"relationship"},{"op":"set","key":"final_accept_g","value":true}]`

后继：`@end`


---

## G_t｜那首歌还在

类型：`ending`。元数据：`{"background":"stage","music":"finale","next":"@end","endingFamily":"G_t","members":[],"reasonCharacter":"t"}`

### 正文

**旁白**：最后一晚，你和唐映雪没有约下一次恋爱。

`G_t.r2.body.001`

**唐映雪**：下次想听歌，来就好。想说别的，提前告诉我。

`G_t.r2.body.002`

### 选择 G_t/thanks

谢谢她愿意继续唱，也接受这次不再往前的关系。

可选条件：`null`

立即回应：

**许照**：谢谢你认真答过我。

`G_t.thanks.r2.reply.001`

**唐映雪**：嗯。回去小心。

`G_t.thanks.r2.reply.002`

**旁白**：你们在门口道别，没有把告别说成下一次一定。

`G_t.thanks.r2.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_accept"}]`

后继：`@end`

### 选择 G_t/distance

暂时不再联系，先把自己的心情收拾好。

可选条件：`null`

立即回应：

**许照**：我先少联系一阵。不是要你等我。

`G_t.distance.r2.reply.001`

**唐映雪**：好，照顾好自己。

`G_t.distance.r2.reply.002`

**旁白**：你把手机收好，朝自己的车站走去。

`G_t.distance.r2.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_distance"}]`

后继：`@end`

### 选择 G_t/honest

承认自己还遗憾，但不拿遗憾要求她改答案。

可选条件：`null`

立即回应：

**许照**：还是会舍不得。今天说出来，不是让你换答案。

`G_t.honest.r2.reply.001`

**唐映雪**：听见了。我也需要一点时间。

`G_t.honest.r2.reply.002`

**旁白**：她没有赶着安慰你。你们安静站了一会儿，才各自转身。

`G_t.honest.r2.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_honest"}]`

后继：`@end`


---

## G_s｜空着的那个晚上

类型：`ending`。元数据：`{"background":"river","music":"finale","next":"@end","endingFamily":"G_s","members":[],"reasonCharacter":"s"}`

### 正文

**旁白**：最后一晚，你和沈清辞没有约下一次恋爱。

`G_s.r2.body.001`

**沈清辞**：我会把自己的日程排下去。你也别一直停在今晚。

`G_s.r2.body.002`

### 选择 G_s/respect

接受她明确说出的结束，不把工作当重新接近的借口。

可选条件：`null`

立即回应：

**许照**：我知道了。以后工作归工作，不会让你每次都猜我另有什么意思。

`G_s.respect.reply.001`

**旁白**：她点头，肩膀慢慢放松一点。

`G_s.respect.reply.002`

**旁白**：你把该联系的工作事项单独记下。至于其他的话，今晚先不说了。

`G_s.respect.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_respect"}]`

后继：`@end`

### 选择 G_s/regret

承认自己曾把她的体谅当成理所当然。

可选条件：`null`

立即回应：

**许照**：有些时候，我以为你能处理，就没认真想你想不想处理。这个我记住。

`G_s.regret.reply.001`

**沈清辞**：希望以后对谁都别这样。不用只为了把我追回来记。

`G_s.regret.reply.002`

**旁白**：她没有因你说对一句话就撤销决定。你没再追问还有没有机会，和她道了别。

`G_s.regret.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_learn"}]`

后继：`@end`

### 选择 G_s/pause

说明自己暂时需要减少联系，避免假装已经轻松。

可选条件：`null`

立即回应：

**许照**：我想暂时只保留必要联系。不是故意让你难受，是我还没那么会平静。

`G_s.pause.reply.001`

**沈清辞**：可以。你不必现在就表现得很好。

`G_s.pause.reply.002`

**旁白**：你们把具体需要交接的事说清，别的先放下。她没有催你快一点释怀，你也没有让她继续负责陪你释怀。

`G_s.pause.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_distance"}]`

后继：`@end`


---

## G_l｜没有一起带走的片段

类型：`ending`。元数据：`{"background":"projection","music":"finale","next":"@end","endingFamily":"G_l","members":[],"reasonCharacter":"l"}`

### 正文

**旁白**：最后一晚，你和林见月没有约下一次恋爱。

`G_l.r2.body.001`

**林见月**：有些话我还记着。今天先说到这里。

`G_l.r2.body.002`

### 选择 G_l/wish

祝她按自己的想法往前，不把祝福附上等待自己的条件。

可选条件：`null`

立即回应：

**许照**：祝你的片子拍得顺利。不好也没关系，别因为怕失败又不去。

`G_l.wish.reply.001`

**林见月**：嗯。你也是。

`G_l.wish.reply.002`

**旁白**：你没有问回来以后有没有机会，也没有用“我一直等”替她加一份她没答应的负担。

`G_l.wish.reply.003`

**旁白**：这一段没有继续，有些改变却不会因此被撤销。

`G_l.wish.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_wish"}]`

后继：`@end`

### 选择 G_l/truth

“我希望你留下过。现在知道，那不是你必须给我的答案。”

可选条件：`null`

立即回应：

**旁白**：她听完，轻轻点头。

`G_l.truth.reply.001`

**林见月**：想让我留下，并不丢脸。只是不能用它决定我的生活。

`G_l.truth.reply.002`

**旁白**：你们没有把彼此的愿望判成错，只承认这次没有找到能一起过的方法。世界没有因为这一点恢复成原著，也没有自动变成你最想要的样子。

`G_l.truth.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_truth"}]`

后继：`@end`

### 选择 G_l/memory

问她愿不愿意保留一段普通的共同记忆，不用它暗示复合。

可选条件：`null`

立即回应：

**林见月**：可以。留一段声音吧，不用拍人。

`G_l.memory.reply.001`

**旁白**：你们听着窗外的车流，各自安静了一会儿。文件名只是日期，没有“永远”或者“再见之后”。

`G_l.memory.reply.002`

**旁白**：回去后，你把它放进一个不每天打开的文件夹。偶尔整理文件时，你还会看到那个日期。

`G_l.memory.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_memory"}]`

后继：`@end`


---

## G_g｜这次只谈合作

类型：`ending`。元数据：`{"background":"terrace","music":"finale","next":"@end","endingFamily":"G_g","members":[],"reasonCharacter":"g"}`

### 正文

**旁白**：最后一晚，你和顾晚棠没有约下一次恋爱。

`G_g.r2.body.001`

**顾晚棠**：我没有忘记你。只是我们现在，不是恋人。

`G_g.r2.body.002`

### 选择 G_g/clear

把公事与私人分别说清，接受不再以暧昧联系。

可选条件：`null`

立即回应：

**许照**：好。我不会拿下一次合作试探你的私人答案。

`G_g.clear.reply.001`

**旁白**：晚棠点头，没有为你的理解付出一个额外的拥抱。

`G_g.clear.reply.002`

**旁白**：你们各自收好东西，谁也没有把离开演成胜利。那段互相试探的日子过去了，留下的经验需要由你自己带走。

`G_g.clear.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gg_clear"}]`

后继：`@end`

### 选择 G_g/own

承认自己曾把知道她的秘密，错当成比别人更懂她。

可选条件：`null`

立即回应：

**顾晚棠**：知道一个人的弱处，和能跟她生活，不是一回事。

`G_g.own.reply.001`

**许照**：现在明白一点了。

`G_g.own.reply.002`

**顾晚棠**：那就留着。以后别再拿一句“我懂你”，就替别人决定。

`G_g.own.reply.003`

**旁白**：她说完站起身，没有等你给一个保证。你留在原处，等了几秒，才把自己的东西收好。

`G_g.own.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gg_learn"}]`

后继：`@end`

### 选择 G_g/thanks

谢谢她这次把答案直接说清楚。

可选条件：`null`

立即回应：

**许照**：谢谢你认真答过我。

`G_g.thanks.r2.reply.001`

**顾晚棠**：嗯。回去小心。

`G_g.thanks.r2.reply.002`

**旁白**：你们在门口道别，没有把告别说成下一次一定。

`G_g.thanks.r2.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gg_thanks"}]`

后继：`@end`


---

## R_st｜散场以后，两盏灯

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"R_st","members":["s","t"]}`

### 正文

**旁白**：清辞订了街角的小馆子。映雪一坐下，就拍了拍自己鼓起来的外套口袋。

`R_st.r4.body.001`

**沈清辞**：你带歌词了？

`R_st.r4.body.002`

**唐映雪**：带了，但不拿出来。你不也刚看完工作群？

`R_st.r4.body.003`

**旁白**：清辞把手机调成静音，把菜单递过去。

`R_st.r4.body.004`

**唐映雪**：许照，你今天怎么这么安静？

`R_st.r4.body.005`

**许照**：有点紧张。第一次见你们，我还在想怎么别被赶出去。

`R_st.r4.body.006`

**沈清辞**：那今天换个问题。想吃什么？

`R_st.r4.body.007`

**唐映雪**：别又说都行。

`R_st.r4.body.008`

**旁白**：你点了一道自己喜欢的菜。映雪想加辣，清辞给自己另点了一份汤，没有谁勉强跟着另一人吃。

`R_st.r4.body.009`

**许照**：我想继续和你们交往。不是说今晚一起吃了饭，就不用再问以后。

`R_st.r4.body.010`

**唐映雪**：知道。我也想继续，但我吃醋的时候会直接说。

`R_st.r4.body.011`

**沈清辞**：我也愿意。你有安排变了就早点说，不用到最后一刻再哄我们。

`R_st.r4.body.012`

**旁白**：映雪碰了碰你的手背。清辞把水壶挪到你够得着的位置。

`R_st.r4.body.013`

**唐映雪**：好了，认真的说完了。饭后去哪？

`R_st.r4.body.014`

### 条件正文 · R_st.variant.001

条件：`{"eq":["bridge_st","fixed"]}`

**沈清辞**：这次我照自己说的时间来，没有又替所有人多留一段。这样的安排，我舒服一点。

`R_st.variant.001.001`

### 条件正文 · R_st.variant.002

条件：`{"eq":["bridge_st","asked"]}`

**唐映雪**：那次加排练以前，你先问了清辞愿不愿意。说清楚以后，我也不用猜她是不是生气。

`R_st.variant.002.001`

### 选择 R_st/walk

“去河边走走。谁冷了，我们就早点回。”

可选条件：`null`

立即回应：

**旁白**：映雪先把围巾绕好，清辞替自己扣上外套。出门以后，映雪把手伸过来，你握住。清辞走在另一边，碰了碰你空着的手。

`R_st.walk.reply.001`

**沈清辞**：这边还空着吗？

`R_st.walk.reply.002`

**许照**：留着呢。

`R_st.walk.reply.003`

**旁白**：她笑了一下，与你十指相扣。走到窄路时，三个人松开手，前后让过一辆自行车，过了桥再重新并肩。

`R_st.walk.reply.004`

**唐映雪**：拍张照吧。不发工作群。

`R_st.walk.reply.005`

**旁白**：清辞接过手机，自己定了倒计时。你没有再站到镜头外，映雪也没有催任何人摆出规定的表情。

`R_st.walk.reply.006`

**旁白**：照片里，你们正因为倒计时突然变短而笑。灯光不漂亮，三个人却都想留下它。

`R_st.walk.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"st_walk"}]`

后继：`@end`

### 选择 R_st/stay

“再坐一会儿。我想分别听你们说说，最近最想做什么。”

可选条件：`null`

立即回应：

**唐映雪**：我想有一晚不听试音，去听别人唱。

`R_st.stay.reply.001`

**沈清辞**：我想在家吃顿饭。不是开着电脑的那种。

`R_st.stay.reply.002`

**许照**：那就分别约。今天先把这顿吃完。

`R_st.stay.reply.003`

**旁白**：映雪把新拆的筷子递给清辞，两个人第一次都没有急着把愿望变成项目。你们聊一场不太好看的电影、一家开得太早的面包店，又为要不要最后一份甜品争了半分钟。

`R_st.stay.reply.004`

**旁白**：清辞还是尝了一口映雪点的甜东西，皱眉以后，把剩下的盘子推回去。映雪笑着接了。

`R_st.stay.reply.005`

**旁白**：你记得原著里两盏灯，总在等陆景行走进来。这个晚上，它们照着三个人分吃一份不太成功的甜品，谁也没有等别人来结束故事。

`R_st.stay.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"st_stay"}]`

后继：`@end`

### 选择 R_st/slow

“我很高兴。也有点紧张，今天不安排更亲密的事，好吗？”

可选条件：`null`

立即回应：

**唐映雪**：好啊。谁说出来约会就得完成任务。

`R_st.slow.reply.001`

**沈清辞**：你早一点说，反而省得我们猜。

`R_st.slow.reply.002`

**旁白**：映雪收回手时没有冷下脸，她只是把最后一块好吃的菜夹到了你盘里。清辞问你要不要再添水，语气也没变。

`R_st.slow.reply.003`

**旁白**：回去的车到了，映雪先抱了抱清辞，两个人交换一个下周再聊的眼神。轮到你，她张开手，等你点头才抱过来。清辞轻轻拍了拍你的肩。

`R_st.slow.reply.004`

**沈清辞**：到家说一声。不是交作业，是我们会记挂。

`R_st.slow.reply.005`

**旁白**：那晚的群聊只多了三条平安消息。你仍把它翻开看了很久。

`R_st.slow.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"st_slow"}]`

后继：`@end`


---

## R_lt｜她唱，你留下回声

类型：`ending`。元数据：`{"background":"projection","music":"finale","next":"@end","endingFamily":"R_lt","members":["l","t"]}`

### 正文

**旁白**：见月放完今晚的小片段，映雪转头看你。

`R_lt.r4.body.001`

**唐映雪**：你看完一直笑。哪段那么好笑？

`R_lt.r4.body.002`

**许照**：不好意思说，我怕你不让看了。

`R_lt.r4.body.003`

**林见月**：那肯定要说。

`R_lt.r4.body.004`

**旁白**：被两个人一起盯着，你只好承认自己也在画面边上，表情比想象中傻。

`R_lt.r4.body.005`

**唐映雪**：这就对了，不能只让我们丢脸。

`R_lt.r4.body.006`

**旁白**：见月关掉投影，把三只杯子摆好。映雪伸手去拿饼干，才发现半包都受潮了。

`R_lt.r4.body.007`

**唐映雪**：今晚的招待水平，好像不配这么认真。

`R_lt.r4.body.008`

**林见月**：认真和饼干没关系。

`R_lt.r4.body.009`

**旁白**：她转向你。

`R_lt.r4.body.010`

**林见月**：我愿意继续。知道映雪也在，不是以后才补告诉我的。

`R_lt.r4.body.011`

**唐映雪**：我也是。想单独见你的时候，我会说。你别装听不懂。

`R_lt.r4.body.012`

**许照**：好。我想和你们继续，也想多过几个不用救场的晚上。

`R_lt.r4.body.013`

**旁白**：映雪把那包饼干举起来。

`R_lt.r4.body.014`

**唐映雪**：那先救一下这个？

`R_lt.r4.body.015`

### 条件正文 · R_lt.variant.001

条件：`{"eq":["bridge_lt","private"]}`

**林见月**：那段私人影像留在我们自己这里。今天想记录什么，也还是先问。

`R_lt.variant.001.001`

### 条件正文 · R_lt.variant.002

条件：`{"eq":["bridge_lt","retake"]}`

**唐映雪**：后来重拍的那一小段，我看着挺开心。这次想拍，也先说一声。

`R_lt.variant.002.001`

### 选择 R_lt/close

“关机以后，我能坐到你们中间吗？”

可选条件：`null`

立即回应：

**林见月**：可以。

`R_lt.close.reply.001`

**唐映雪**：别把饼干坐碎就行。

`R_lt.close.reply.002`

**旁白**：你坐过去，见月先把包装拿开。映雪把头轻轻靠到你肩上，你偏头看她，她抬眼笑了一下。见月伸手握住你的另一只手，掌心还带着杯子的温度。

`R_lt.close.reply.003`

**旁白**：你没有同时索要两个吻。映雪靠近，先问“这样行吗”，得到你的回应后亲了一下你的嘴角。见月红了耳朵，却没被旁人的主动推着走，她只是握得更稳。

`R_lt.close.reply.004`

**林见月**：我今天这样就好。

`R_lt.close.reply.005`

**许照**：好。

`R_lt.close.reply.006`

**旁白**：没有镜头替这一幕作证。它也不需要被拍下来，才算发生。

`R_lt.close.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lt_close"}]`

后继：`@end`

### 选择 R_lt/outside

“出去买点热的吧。我们不要再研究这包饼干了。”

可选条件：`null`

立即回应：

**唐映雪**：终于有个靠谱的决定。

`R_lt.outside.reply.001`

**旁白**：你们沿着街找还开着的店。见月走到路口时抬头看了一眼灯，映雪问她是不是又在想构图。

`R_lt.outside.reply.002`

**林见月**：有一点。不过没带相机。

`R_lt.outside.reply.003`

**唐映雪**：那就看吧。我也会听别人家的歌。

`R_lt.outside.reply.004`

**旁白**：你们在便利店门口分了三份热食。见月把自己的辣酱让给映雪，映雪把一块没沾酱的留下来问你要不要。

`R_lt.outside.reply.005`

**旁白**：原著里，你早知道她们会留下些什么作品。现在你还知道，三个人真的走累了，会在一间明亮的小店前安静吃饭。

`R_lt.outside.reply.006`

**旁白**：这一次，没有人只是另一人的素材。

`R_lt.outside.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lt_outside"}]`

后继：`@end`

### 选择 R_lt/slow

“我想再聊一会儿。今天不用把距离拉得那么快。”

可选条件：`null`

立即回应：

**林见月**：那就坐这儿。

`R_lt.slow.reply.001`

**旁白**：她把另两张椅子拉开一点，映雪没有起哄。你们重新聊起刚才的小片段，各说看见的细节，答案并不一样。

`R_lt.slow.reply.002`

**唐映雪**：我以为你会说，一看就懂。

`R_lt.slow.reply.003`

**许照**：这次不装了。

`R_lt.slow.reply.004`

**旁白**：见月笑着把最后一盏台灯调亮。三个不同的答案，没有被剪成同一种意见。

`R_lt.slow.reply.005`

**旁白**：临走时，映雪问下一次要不要去看一场演出，见月说要先查自己的时间。你们没有当场把以后订满，只认真约好了明天回一条消息。

`R_lt.slow.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lt_slow"}]`

后继：`@end`


---

## R_gt｜没有报价的加演

类型：`ending`。元数据：`{"background":"recording","music":"finale","next":"@end","endingFamily":"R_gt","members":["g","t"]}`

### 正文

**旁白**：映雪租了间小排练房，把耳塞分别递给你和晚棠。

`R_gt.r4.body.001`

**唐映雪**：租金付好了。没有贵宾席，也不用谁给赞助。

`R_gt.r4.body.002`

**顾晚棠**：很好。那我坐这儿？

`R_gt.r4.body.003`

**唐映雪**：坐。椅背有点松，别太相信它。

`R_gt.r4.body.004`

**旁白**：晚棠刚靠下去又坐直，你和映雪都没忍住笑。

`R_gt.r4.body.005`

**旁白**：映雪弹了一小段，某个高音没上去，又自己重来一次。

`R_gt.r4.body.006`

**顾晚棠**：第二次我更喜欢。

`R_gt.r4.body.007`

**唐映雪**：你别因为我终于唱准就夸。

`R_gt.r4.body.008`

**顾晚棠**：是后半句好听。前面那个音，我确实听出你用力了。

`R_gt.r4.body.009`

**旁白**：映雪把吉他放下，没再追着要一句完美评价。

`R_gt.r4.body.010`

**唐映雪**：行。那我也不绕了。我想和许照继续，知道晚棠也在。

`R_gt.r4.body.011`

**顾晚棠**：我也愿意。这不是合作条件，今天点头的就是我自己。

`R_gt.r4.body.012`

**许照**：我想继续。有要我说的事，我不会丢一句“你们商量”就跑。

`R_gt.r4.body.013`

**唐映雪**：记住了。现在我想听你唱。

`R_gt.r4.body.014`

**旁白**：晚棠抬了抬眉，已经坐好等着看。

`R_gt.r4.body.015`

### 条件正文 · R_gt.variant.001

条件：`{"eq":["bridge_gt","separate"]}`

**顾晚棠**：今晚不谈项目。放心，我没把合作方案夹在菜单里。

`R_gt.variant.001.001`

### 条件正文 · R_gt.variant.002

条件：`{"eq":["bridge_gt","shared"]}`

**唐映雪**：说好各自付以后，吃饭舒服多了。想吃什么也能直接点。

`R_gt.variant.002.001`

### 选择 R_gt/sing

“这次轮到我唱一段。先说好，不许笑得太大声。”

可选条件：`null`

立即回应：

**唐映雪**：这个要求很难保证。

`R_gt.sing.reply.001`

**旁白**：映雪把最简单的和弦弹给你。你进错了半拍，晚棠抬手挡住嘴，还是笑出了声。

`R_gt.sing.reply.002`

**顾晚棠**：我已经尽量了。

`R_gt.sing.reply.003`

**旁白**：你索性跟着她们笑。歌没唱完整，录音也没开。映雪把谱架往旁边推，晚棠把耳塞留在掌心，没有急着起身。

`R_gt.sing.reply.004`

**旁白**：以前你想着怎样比陆景行更出色，才能得到这些目光。这个晚上，你唱得很一般，她们却都愿意听完。

`R_gt.sing.reply.005`

**旁白**：临走时，映雪挽住你一边手臂，晚棠抬眉问另一边是不是也有人预留。你朝她伸手，她笑着握住。

`R_gt.sing.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_sing"}]`

后继：`@end`

### 选择 R_gt/close

“我想抱抱你们。可以分别问吗？”

可选条件：`null`

立即回应：

**顾晚棠**：可以。问过以后记得等答案。

`R_gt.close.reply.001`

**唐映雪**：我这边是可以。

`R_gt.close.reply.002`

**旁白**：你先抱住映雪。她原本想开玩笑，靠过来之后却只轻轻说了一句“今晚挺好”。晚棠等她松开，才向你张开手。

`R_gt.close.reply.003`

**顾晚棠**：到我了。

`R_gt.close.reply.004`

**旁白**：她的拥抱比平时的玩笑安静。你们没有在三个人之间比赛谁更大胆，也没有因为一个人先靠近，就要求另一个立刻跟上。

`R_gt.close.reply.005`

**旁白**：排练房的计时灯亮起来，你们一起收拾东西。晚棠拎谱架，映雪拎吉他，你去还钥匙。一个普通的收尾，被三个人做得有点舍不得结束。

`R_gt.close.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_close"}]`

后继：`@end`

### 选择 R_gt/food

“先去吃饭。今天就做三个有点饿的人。”

可选条件：`null`

立即回应：

**顾晚棠**：这倒不难。

`R_gt.food.reply.001`

**唐映雪**：也别点个沙拉就说吃饱。

`R_gt.food.reply.002`

**旁白**：晚棠挑了一家普通的小店，没有替所有人包一张桌。映雪先问有没有热汤，你去拿三双筷子。

`R_gt.food.reply.003`

**旁白**：菜单传到你手里时，两个人都停下来等你。不是考验，也不是她们故意把难题丢过来。你可以说自己想吃什么，不用永远表现成最懂别人的人。

`R_gt.food.reply.004`

**旁白**：走出店时，晚棠回头看了映雪一眼。她们约好下次有话直接说，不把你当成必须翻译所有语气的中间人。

`R_gt.food.reply.005`

**旁白**：你们分别回家，手机上很快多了三句并不整齐的晚安。

`R_gt.food.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gt_food"}]`

后继：`@end`


---

## R_ls｜留给我们的一段空白

类型：`ending`。元数据：`{"background":"theatre","music":"finale","next":"@end","endingFamily":"R_ls","members":["l","s"]}`

### 正文

**旁白**：你们在提前订好的小房间放下晚饭。见月把相机收进包，清辞挂好外套。

`R_ls.r4.body.001`

**沈清辞**：今晚不拍？

`R_ls.r4.body.002`

**林见月**：不拍。要是又从头到尾盯着镜头，我白来了。

`R_ls.r4.body.003`

**旁白**：你问她们坐哪里。清辞刚说出“都”，自己就停住了。

`R_ls.r4.body.004`

**沈清辞**：靠窗。我想靠窗。

`R_ls.r4.body.005`

**林见月**：那我坐旁边，别对着投影幕了。

`R_ls.r4.body.006`

**旁白**：你搬桌子时拖出一声响，三个人一起皱眉，又一起笑了。

`R_ls.r4.body.007`

**林见月**：其实今天，我有点期待。

`R_ls.r4.body.008`

**沈清辞**：我也是。

`R_ls.r4.body.009`

**旁白**：见月看向你。

`R_ls.r4.body.010`

**林见月**：我愿意继续，知道清辞也在。我也会有想单独见你的时候。

`R_ls.r4.body.011`

**沈清辞**：我愿意。以后有不想答应的事，我会直接说。

`R_ls.r4.body.012`

**许照**：好，我也是。今天就想陪你们把这顿饭吃完。

`R_ls.r4.body.013`

**旁白**：清辞拆了三双筷子，见月先把你拿反的那双调回来。

`R_ls.r4.body.014`

**林见月**：那开始吧。都快凉了。

`R_ls.r4.body.015`

### 条件正文 · R_ls.variant.001

条件：`{"eq":["bridge_ls","context"]}`

**林见月**：上次片尾那八秒，我们提前说清楚了。清辞这回应该不会再以为机器卡了。

`R_ls.variant.001.001`

### 条件正文 · R_ls.variant.002

条件：`{"eq":["bridge_ls","test"]}`

**沈清辞**：两种剪法我们真的都看过，最后也说清楚了。不是谁声音大就听谁的。

`R_ls.variant.002.001`

### 选择 R_ls/ask

“今晚每个人都说一件自己想要的事，不替别人答。”

可选条件：`null`

立即回应：

**林见月**：我想下次去看海，不带拍摄任务。

`R_ls.ask.reply.001`

**沈清辞**：我想有一天不替任何人选餐厅。你们带我去就行。

`R_ls.ask.reply.002`

**许照**：我想有时候什么都做不好，也还能来见你们。

`R_ls.ask.reply.003`

**旁白**：清辞把筷子放下，认真看了你一眼。见月则把热水往你这边推了一点。

`R_ls.ask.reply.004`

**林见月**：今天也没要求你做得特别好。

`R_ls.ask.reply.005`

**旁白**：你们没有把三个愿望拼成一个必须同时完成的项目。它们各自留了下来，等以后真的有空的时候，一件件去做。

`R_ls.ask.reply.006`

**旁白**：见月在离开前主动抱了你一下，清辞替你理了理被抱皱的衣领。两个人都笑着说，下次见。

`R_ls.ask.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"ls_ask"}]`

后继：`@end`

### 选择 R_ls/close

“我能牵着你们坐一会儿吗？”

可选条件：`null`

立即回应：

**沈清辞**：可以。

`R_ls.close.reply.001`

**林见月**：我的手有点凉。

`R_ls.close.reply.002`

**旁白**：你伸出两只手，她们各自握过来。见月慢慢把肩膀靠近，清辞没有抢着让自己坐得最稳妥，只轻轻向你偏了一点。

`R_ls.close.reply.003`

**旁白**：没有音乐，没有谁专门制造的停电。窗外的车经过时，三个人一同抬头，然后又安静下来。

`R_ls.close.reply.004`

**沈清辞**：我以前不太会这样浪费时间。

`R_ls.close.reply.005`

**林见月**：今天不叫浪费吧。

`R_ls.close.reply.006`

**许照**：不叫。

`R_ls.close.reply.007`

**旁白**：那张小桌上还放着没收完的饭盒。又坐了好一会儿，你们才起身一起收拾。

`R_ls.close.reply.008`

写入与操作：`[{"op":"set","key":"ending_tone","value":"ls_close"}]`

后继：`@end`

### 选择 R_ls/quiet

“不必一直说话。我们把这顿饭慢慢吃完。”

可选条件：`null`

立即回应：

**旁白**：见月松了口气。清辞问她要不要热一热汤，得到“不用”以后就不再坚持。你说自己还想再添一点饭，也没有为了显得体贴先把碗推给别人。

`R_ls.quiet.reply.001`

**旁白**：三个人渐渐发现，不需要把每个停顿都解释成冷场。筷子碰到碗沿、窗帘被风吹动，这些声音也能让一个晚上过下去。

`R_ls.quiet.reply.002`

**林见月**：我今天挺开心。

`R_ls.quiet.reply.003`

**沈清辞**：我也是。

`R_ls.quiet.reply.004`

**旁白**：她们说得平常，你反而记得很清楚。原著喜欢写盛大的选择，没写过这样一顿饭。你们现在有了。

`R_ls.quiet.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"ls_quiet"}]`

后继：`@end`


---

## R_gs｜这把钥匙，不谈归属

类型：`ending`。元数据：`{"background":"river","music":"finale","next":"@end","endingFamily":"R_gs","members":["g","s"]}`

### 正文

**旁白**：晚棠把自己的车钥匙放在桌上，清辞以为她还有事要赶，问是不是只留半个小时。

`R_gs.body.001`

**顾晚棠**：车我明天取。今天不按会面时长收费。

`R_gs.body.002`

**沈清辞**：我只是问你赶不赶时间。

`R_gs.body.003`

**顾晚棠**：不赶。

`R_gs.body.004`

**旁白**：晚棠把后面准备好的玩笑收了回去。清辞也合上日程，先认真挑起晚饭。

`R_gs.body.005`

**旁白**：餐厅是你们分别给出预算后选的。不是为了证明谁付得起，也不要求有钱的人故意装作和所有人一样。

`R_gs.body.006`

**沈清辞**：我今天想自己点菜。可能有一道你不喜欢。

`R_gs.body.007`

**顾晚棠**：点吧，我又不是必须全吃。

`R_gs.body.008`

**旁白**：清辞真的点了。晚棠也没有为了显得配合，说自己什么都喜欢。菜单最后传到你手里，三个人才各自确定一件很小的事。

`R_gs.body.009`

**旁白**：你想起原著里，她们总是隔着一张大桌子见面。一个要守住场地，一个代表条款，两个人的名字仿佛只能写在不同的位置。

`R_gs.body.010`

**顾晚棠**：别看我们像随时准备重新签一份合同。

`R_gs.body.011`

**许照**：我在想，第一次见你们的时候，没想到会有今天。

`R_gs.body.012`

**沈清辞**：我也没想到。所以后来那些话，不是早就准备好的。

`R_gs.body.013`

**旁白**：她放下杯子。

`R_gs.body.014`

**沈清辞**：我愿意继续和你交往，也愿意认真面对晚棠在这段关系里。不是谁资助谁、谁照顾谁。

`R_gs.body.015`

**顾晚棠**：我愿意。我知道这不等于把每一件事都变成共同决定。清辞的工作，我不会因为今天坐在这里就多一票。

`R_gs.body.016`

**旁白**：晚棠说完，转头看你。

`R_gs.body.017`

**顾晚棠**：你也别哪天跟我借一句话，拿去压她的意见。

`R_gs.body.018`

**许照**：不借。我自己的话自己说。

`R_gs.body.019`

**旁白**：清辞端起水杯。晚棠轻轻碰了一下她的杯沿，差点碰偏，自己先笑了。

`R_gs.body.020`

### 条件正文 · R_gs.variant.001

条件：`{"eq":["bridge_gs","offwork"]}`

**沈清辞**：工作资料没带来。今晚说的话，也不顺便写进合作安排。

`R_gs.variant.001.001`

### 条件正文 · R_gs.variant.002

条件：`{"eq":["bridge_gs","direct"]}`

**顾晚棠**：现在我会先问，这是谈工作，还是你自己的意见。两件事分开，才听得懂。

`R_gs.variant.002.001`

### 选择 R_gs/walk

“吃完去散步吧，沿着有灯的路走，不讨论项目。”

可选条件：`null`

立即回应：

**旁白**：晚棠问清辞鞋子走远会不会累，清辞回答可以走一会儿。没有人替另一人提前决定能不能吃苦。

`R_gs.walk.reply.001`

**旁白**：到河边时，你朝她们伸手。清辞先握住，晚棠看了一眼，笑着把另一只手放进来。

`R_gs.walk.reply.002`

**顾晚棠**：现在是不是有点像所有人都在看？

`R_gs.walk.reply.003`

**沈清辞**：其实那边的人在看狗。

`R_gs.walk.reply.004`

**旁白**：晚棠回头，果然看见一只挣着绳子的小狗。三个人一起笑起来，手还没松。

`R_gs.walk.reply.005`

**旁白**：你们慢慢走回去，到了岔路才分别告别。恋爱不是把所有人的去向捆在一起；她们都知道，想再见时可以认真开口。

`R_gs.walk.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_walk"}]`

后继：`@end`

### 选择 R_gs/table

“下次来我这里吃。我先学一道真的能吃的。”

可选条件：`null`

立即回应：

**顾晚棠**：别拿下次当豪言。你会什么？

`R_gs.table.reply.001`

**许照**：现在只会最简单的。可以先从不糊开始。

`R_gs.table.reply.002`

**沈清辞**：那我带菜，不带工作。

`R_gs.table.reply.003`

**顾晚棠**：我带甜品。不会暗中叫一整桌外卖。

`R_gs.table.reply.004`

**旁白**：三个人把一个不太宏大的约定说具体。没有人为它制定半年计划，也没有谁需要为了关系成立，放弃自己的判断。

`R_gs.table.reply.005`

**旁白**：清辞临走时抱了抱你，晚棠在旁边等，不替她缩短。轮到晚棠，她碰了碰你的嘴角，笑着问这是不是也需要提前预约。

`R_gs.table.reply.006`

**旁白**：你点头说不用，她靠近轻轻亲了一下。

`R_gs.table.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_table"}]`

后继：`@end`

### 选择 R_gs/slow

“今晚先这样。我想走得稳一点，不用比谁更快靠近。”

可选条件：`null`

立即回应：

**沈清辞**：好。

`R_gs.slow.reply.001`

**顾晚棠**：这句话早点说也没什么丢人的。

`R_gs.slow.reply.002`

**旁白**：晚棠把手收回桌边，还是继续听你讲。清辞没有把你的紧张当作临时反悔，她只是确认下一次见面要不要再约。

`R_gs.slow.reply.003`

**许照**：要。我想。

`R_gs.slow.reply.004`

**旁白**：你们留下日期，又给彼此改动的余地。最后谁都没有替这段关系下一个过于漂亮的定义。

`R_gs.slow.reply.005`

**旁白**：分开后，你收到两条不一样的消息。清辞问你是不是坐上车了，晚棠发来一家下次想试的小店。你分别回了，不必用同一句话应付两个人。

`R_gs.slow.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gs_slow"}]`

后继：`@end`


---

## R_gl｜镜头之外的第三个人

类型：`ending`。元数据：`{"background":"projection","music":"finale","next":"@end","endingFamily":"R_gl","members":["g","l"]}`

### 正文

**旁白**：见月把相机包放到脚边，晚棠挪开椅子，给她留出位置。

`R_gl.r4.body.001`

**顾晚棠**：今晚还拍吗？

`R_gl.r4.body.002`

**林见月**：还没决定。我想先坐一会儿。

`R_gl.r4.body.003`

**旁白**：你把茶递过去。见月摸了摸包，终于没把相机拿出来。

`R_gl.r4.body.004`

**许照**：以前我总觉得，今天不留下点什么，以后就记不清。

`R_gl.r4.body.005`

**顾晚棠**：你记得我们刚才在楼下争哪家店好吃就行。

`R_gl.r4.body.006`

**林见月**：他刚才投了两次不同的票。

`R_gl.r4.body.007`

**旁白**：你立刻解释那是各有优点，换来两个人一起看过来的眼神。

`R_gl.r4.body.008`

**许照**：好吧，我承认。我不敢选。

`R_gl.r4.body.009`

**旁白**：晚棠先笑了，见月也笑，终于不再等你说一句漂亮话。

`R_gl.r4.body.010`

**林见月**：但这件事我要自己选。我愿意和你继续，知道晚棠也在。

`R_gl.r4.body.011`

**顾晚棠**：我也是。以后想拍合照就问，想单独见我也直接说。

`R_gl.r4.body.012`

**许照**：好。那今晚先问一个现在的。

`R_gl.r4.body.013`

### 条件正文 · R_gl.variant.001

条件：`{"eq":["bridge_gl","bounded"]}`

**林见月**：该公开的部分有清楚的范围，私人画面不顺手拿来填空。

`R_gl.variant.001.001`

### 条件正文 · R_gl.variant.002

条件：`{"eq":["bridge_gl","witness"]}`

**顾晚棠**：那次我们先约当事人核对，没有赶着发私人材料。今天想公开什么，也先说清楚。

`R_gl.variant.002.001`

### 选择 R_gl/picture

拍一张只留给在场人的合照。

可选条件：`null`

立即回应：

**许照**：能拍一张吗？只留在我们这里。

`R_gl.picture.r4.reply.001`

**林见月**：可以。拍完大家都看一遍。

`R_gl.picture.r4.reply.002`

**顾晚棠**：我也可以。不好看要重来，别敷衍我。

`R_gl.picture.r4.reply.003`

**旁白**：见月拿出相机架好，回到你身边。倒计时响起，你们都太认真，第一张像证件照。

`R_gl.picture.r4.reply.004`

**顾晚棠**：这张不行。

`R_gl.picture.r4.reply.005`

**旁白**：第二张刚拍到一半，见月突然笑了。你跟着转头，晚棠也没绷住。

`R_gl.picture.r4.reply.006`

**林见月**：这张呢？

`R_gl.picture.r4.reply.007`

**顾晚棠**：……这张留着。

`R_gl.picture.r4.reply.008`

**旁白**：确认过保存范围，你们把照片收进私人相册。

`R_gl.picture.r4.reply.009`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_picture"}]`

后继：`@end`

### 选择 R_gl/close

问能不能分别抱一下。

可选条件：`null`

立即回应：

**林见月**：好。

`R_gl.close.reply.001`

**旁白**：见月先靠过来，抱得很安静。晚棠等她松开后，伸手拽了拽你的袖口。

`R_gl.close.reply.002`

**顾晚棠**：我也在等。别让我替自己喊下一位。

`R_gl.close.reply.003`

**旁白**：你笑着问她现在可不可以，她点头。拥抱里没有交易条件，也没有谁在计算另一人的时间。

`R_gl.close.reply.004`

**旁白**：见月把热水重新添好，晚棠接过杯子，说了一句很轻的谢谢。你们又坐了一会儿，什么都没拍。

`R_gl.close.reply.005`

**旁白**：又坐了一会儿，见月说茶凉了。晚棠笑她只顾聊天，你起身去添热水。

`R_gl.close.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_close"}]`

后继：`@end`

### 选择 R_gl/outside

先去屋檐下透透气，不拍照。

可选条件：`null`

立即回应：

**旁白**：见月把相机留在屋里，晚棠只拿自己的外套。三个人站在屋檐下，雨后空气有一点潮。

`R_gl.outside.reply.001`

**顾晚棠**：原来不说话也不用有人急着圆场。

`R_gl.outside.reply.002`

**林见月**：嗯。我刚才就想出来站一下。

`R_gl.outside.reply.003`

**许照**：怎么不说？

`R_gl.outside.reply.004`

**林见月**：现在说了。

`R_gl.outside.reply.005`

**旁白**：她笑起来，晚棠跟着笑。你们靠得很近，却没有谁被要求证明自己更主动。见月先牵住你的手，晚棠碰了碰另一边，等你转头以后才握住。

`R_gl.outside.reply.006`

**旁白**：回去时，她们分别说下次见。没有一句话必须同时替另一个人作答。

`R_gl.outside.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gl_outside"}]`

后继：`@end`


---

## R_lst｜片尾没有删掉谁

类型：`ending`。元数据：`{"background":"theatre","music":"finale","next":"@end","endingFamily":"R_lst","members":["l","s","t"]}`

### 正文

**旁白**：今晚的小桌旁摆了四把不同的椅子。见月拿出一张白纸，请大家给这次聚会取个名字。

`R_lst.r4.body.001`

**唐映雪**：先问，不拍吧？

`R_lst.r4.body.002`

**林见月**：不拍。就是想记下来。

`R_lst.r4.body.003`

**沈清辞**：那我这次能不能只投票，不负责想名字？

`R_lst.r4.body.004`

**旁白**：映雪把手机里想好的三个名字给你们看。清辞看到第三个，没忍住笑。

`R_lst.r4.body.005`

**沈清辞**：这个太像装修纪录片了。

`R_lst.r4.body.006`

**许照**：要不先写名字？我现在也想不出比她更好的。

`R_lst.r4.body.007`

**林见月**：可以。但也写你自己的。

`R_lst.r4.body.008`

**旁白**：你在纸上写了四个名字。映雪凑过来看，嫌自己的那两个字写得不够好。

`R_lst.r4.body.009`

**唐映雪**：算了，一看就是你写的，留着吧。

`R_lst.r4.body.010`

**沈清辞**：今天的安排，我还是想自己说一遍。我愿意继续，知道映雪和见月都在。

`R_lst.r4.body.011`

**唐映雪**：我也愿意。以后吃醋会说，不拿“没事”让你猜。

`R_lst.r4.body.012`

**林见月**：我愿意。也会有想单独见你的时候。

`R_lst.r4.body.013`

**许照**：我想和你们继续。

`R_lst.r4.body.014`

**旁白**：映雪把纸折起来，折歪了一点，又伸手压平。

`R_lst.r4.body.015`

**唐映雪**：好了，现在可以不谈怎么约会，真的约会了吗？

`R_lst.r4.body.016`

**林见月**：可以。先把头上这盏灯调暗，太像开会了。

`R_lst.r4.body.017`

### 条件正文 · R_lst.variant.001

条件：`{"eq":["bridge_st","fixed"]}`

**沈清辞**：这次我照自己说的时间来，没有又替所有人多留一段。这样的安排，我舒服一点。

`R_lst.variant.001.001`

### 条件正文 · R_lst.variant.002

条件：`{"eq":["bridge_st","asked"]}`

**唐映雪**：那次加排练以前，你先问了清辞愿不愿意。说清楚以后，我也不用猜她是不是生气。

`R_lst.variant.002.001`

### 条件正文 · R_lst.variant.003

条件：`{"eq":["bridge_lt","private"]}`

**林见月**：那段私人影像留在我们自己这里。今天想记录什么，也还是先问。

`R_lst.variant.003.001`

### 条件正文 · R_lst.variant.004

条件：`{"eq":["bridge_lt","retake"]}`

**唐映雪**：后来重拍的那一小段，我看着挺开心。这次想拍，也先说一声。

`R_lst.variant.004.001`

### 条件正文 · R_lst.variant.005

条件：`{"eq":["bridge_ls","context"]}`

**林见月**：上次片尾那八秒，我们提前说清楚了。清辞这回应该不会再以为机器卡了。

`R_lst.variant.005.001`

### 条件正文 · R_lst.variant.006

条件：`{"eq":["bridge_ls","test"]}`

**沈清辞**：两种剪法我们真的都看过，最后也说清楚了。不是谁声音大就听谁的。

`R_lst.variant.006.001`

### 条件正文 · R_lst.r2.bias_l

条件：`{"eq":["group_bias_lst","l"]}`

**林见月**：上次你特地过来陪我，我记得。今天想坐哪儿？

`R_lst.r2.bias_l.001`

### 条件正文 · R_lst.r2.bias_s

条件：`{"eq":["group_bias_lst","s"]}`

**沈清辞**：上次先站到我旁边，今天倒不好意思了？坐吧。

`R_lst.r2.bias_s.001`

### 条件正文 · R_lst.r2.bias_t

条件：`{"eq":["group_bias_lst","t"]}`

**唐映雪**：那天你先朝我走过来，我可没忘。今天也别只顾着发呆。

`R_lst.r2.bias_t.001`

### 选择 R_lst/nightwalk

“出去走走。我想和你们分别聊，也想一起待着。”

可选条件：`null`

立即回应：

**旁白**：四个人走得不总是一排。映雪拉着见月讨论一首旧歌，你和清辞落后半步，聊她今天终于吃到了晚饭。过了路口，位置自然换了。

`R_lst.nightwalk.reply.001`

**旁白**：你没有把和一个人多说两句变成给其他人的冷落，也没有要求她们为了公平每人走同样的距离。见月回头叫你看路边的花，映雪不小心说错花名，清辞纠正完又承认自己也不太确定。

`R_lst.nightwalk.reply.002`

**旁白**：原著没有写过这样的一群人，走到街口还要查花叫什么。

`R_lst.nightwalk.reply.003`

**旁白**：回去前，你分别问能不能抱一下。她们按自己的方式回应：映雪很快靠过来，清辞抱得稳，见月停了一秒才点头。没有哪一种比较少。

`R_lst.nightwalk.reply.004`

**旁白**：那张写着名字的纸被拍下来，发在只属于你们的聊天里。

`R_lst.nightwalk.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lst_walk"}]`

后继：`@end`

### 选择 R_lst/movie

“看一部谁都不用点评的电影，难看也允许中途关。”

可选条件：`null`

立即回应：

**唐映雪**：那我选。

`R_lst.movie.reply.001`

**沈清辞**：别光看片名就选。

`R_lst.movie.reply.002`

**林见月**：看两分钟吧，实在不行再换。

`R_lst.movie.reply.003`

**旁白**：最后你们真的打开了。十分钟后映雪第一个承认选错了，清辞笑着说没关系，见月已经在找另一部。

`R_lst.movie.reply.004`

**旁白**：映雪说不好看就是不好看，先关再说。屏幕换成一部旧喜剧，清辞把背靠在椅子上，映雪抱住靠垫，见月不再想着哪里该剪快一点。

`R_lst.movie.reply.005`

**旁白**：有人笑慢了一拍，其他人就一起再笑一次。你不必一直证明自己有能力改变命运，也能被留在一个普通的晚上里。

`R_lst.movie.reply.006`

**旁白**：散场前，四个人给那张空白纸添了几个字：今天不做片尾。

`R_lst.movie.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lst_movie"}]`

后继：`@end`

### 选择 R_lst/pace

“我有点累了。想送你们回去，下一次再慢慢约。”

可选条件：`null`

立即回应：

**林见月**：好。累了就说，不用因为难得见齐，硬把自己撑着。

`R_lst.pace.reply.001`

**唐映雪**：那你也别一个人把所有人送遍。

`R_lst.pace.reply.002`

**沈清辞**：路线我知道。各自回去，到家报个平安。

`R_lst.pace.reply.003`

**旁白**：清辞说完，又问了一遍大家愿不愿意按这个安排。映雪说可以，见月也点头，你终于不用一边困得睁不开眼，一边扮演永远精力充沛的人。

`R_lst.pace.reply.004`

**旁白**：临别的拥抱很短，晚安却各不相同。映雪发来一个跑调的哼唱，清辞提醒你回去早点睡，见月把那张纸拍得很清楚。

`R_lst.pace.reply.005`

**旁白**：你把三条消息分别回完，才安心放下手机。

`R_lst.pace.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"lst_pace"}]`

后继：`@end`


---

## R_gst｜今夜不谈合作

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"R_gst","members":["g","s","t"]}`

### 正文

**旁白**：晚棠进门时，映雪正拿着一只杯子给清辞看。

`R_gst.r4.body.001`

**唐映雪**：这不是裂了吗？

`R_gst.r4.body.002`

**沈清辞**：掉了点釉，没裂。

`R_gst.r4.body.003`

**顾晚棠**：给我看看。

`R_gst.r4.body.004`

**旁白**：晚棠研究了半天，说自己也看不出来。你默默换了一只，三个人才停止争论。

`R_gst.r4.body.005`

**旁白**：你们订了小包厢，预算事先说好，谁都没带要谈的项目。

`R_gst.r4.body.006`

**顾晚棠**：今天终于没人对我说“正好有件事”。

`R_gst.r4.body.007`

**唐映雪**：正好有件事。

`R_gst.r4.body.008`

**旁白**：晚棠抬眉。

`R_gst.r4.body.009`

**唐映雪**：最后那块蛋糕，你要不要？

`R_gst.r4.body.010`

**顾晚棠**：要。别以为我会客气三轮。

`R_gst.r4.body.011`

**沈清辞**：我也想吃。

`R_gst.r4.body.012`

**旁白**：你赶紧叫服务员再加一份。晚棠护住盘子，映雪笑得把叉子都放下了。

`R_gst.r4.body.013`

**许照**：我想以后还和你们这样见面。当然，有些晚上也分别约。

`R_gst.r4.body.014`

**沈清辞**：我愿意，大家现在知道的安排我也听清了。

`R_gst.r4.body.015`

**唐映雪**：我也是。但我不高兴的时候，你得认真听。

`R_gst.r4.body.016`

**顾晚棠**：我也愿意。别看我会处理工作，就默认我什么情绪都能自己处理。

`R_gst.r4.body.017`

**许照**：好。有我需要说的，我也会直接说。

`R_gst.r4.body.018`

**旁白**：新蛋糕送到，清辞先挑了自己喜欢的那一块。这次没有人再客气。

`R_gst.r4.body.019`

### 条件正文 · R_gst.variant.001

条件：`{"eq":["bridge_st","fixed"]}`

**沈清辞**：这次我照自己说的时间来，没有又替所有人多留一段。这样的安排，我舒服一点。

`R_gst.variant.001.001`

### 条件正文 · R_gst.variant.002

条件：`{"eq":["bridge_st","asked"]}`

**唐映雪**：那次加排练以前，你先问了清辞愿不愿意。说清楚以后，我也不用猜她是不是生气。

`R_gst.variant.002.001`

### 条件正文 · R_gst.variant.003

条件：`{"eq":["bridge_gt","separate"]}`

**顾晚棠**：今晚不谈项目。放心，我没把合作方案夹在菜单里。

`R_gst.variant.003.001`

### 条件正文 · R_gst.variant.004

条件：`{"eq":["bridge_gt","shared"]}`

**唐映雪**：说好各自付以后，吃饭舒服多了。想吃什么也能直接点。

`R_gst.variant.004.001`

### 条件正文 · R_gst.variant.005

条件：`{"eq":["bridge_gs","offwork"]}`

**沈清辞**：工作资料没带来。今晚说的话，也不顺便写进合作安排。

`R_gst.variant.005.001`

### 条件正文 · R_gst.variant.006

条件：`{"eq":["bridge_gs","direct"]}`

**顾晚棠**：现在我会先问，这是谈工作，还是你自己的意见。两件事分开，才听得懂。

`R_gst.variant.006.001`

### 条件正文 · R_gst.r2.bias_g

条件：`{"eq":["group_bias_gst","g"]}`

**顾晚棠**：那次偏心我收到了。今天不用端平水杯，先把水喝了。

`R_gst.r2.bias_g.001`

### 条件正文 · R_gst.r2.bias_s

条件：`{"eq":["group_bias_gst","s"]}`

**沈清辞**：上次先站到我旁边，今天倒不好意思了？坐吧。

`R_gst.r2.bias_s.001`

### 条件正文 · R_gst.r2.bias_t

条件：`{"eq":["group_bias_gst","t"]}`

**唐映雪**：那天你先朝我走过来，我可没忘。今天也别只顾着发呆。

`R_gst.r2.bias_t.001`

### 选择 R_gst/music

“找一首谁都听过的歌吧。不表演，随便唱。”

可选条件：`null`

立即回应：

**旁白**：映雪选了首老歌。晚棠说只记得副歌，清辞连副歌也唱错了半句。你跟上去以后，四个人终于在同一句同时跑偏。

`R_gst.music.reply.001`

**唐映雪**：算了，我的专业水平今晚先请假。

`R_gst.music.reply.002`

**旁白**：她笑着把音量调低。晚棠靠着椅背，没有再装作什么都会；清辞看你一眼，把手伸到桌下，等你握住。映雪靠近你的另一边，晚棠也伸过手来碰了碰你。

`R_gst.music.reply.003`

**旁白**：亲近不总是整齐的画面，有人要换个姿势，有人杯子差点碰倒。你们笑着挪开桌上的东西，继续听那首谁都唱不好的歌。

`R_gst.music.reply.004`

**旁白**：这一次，没有人需要把谁捧成舞台中心，才能留住这个晚上。

`R_gst.music.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gst_music"}]`

后继：`@end`

### 选择 R_gst/walk

“吃完去看夜景。轮到我带路，不过走错了别笑太久。”

可选条件：`null`

立即回应：

**顾晚棠**：太久怎么计算？

`R_gst.walk.reply.001`

**唐映雪**：看你错得多离谱。

`R_gst.walk.reply.002`

**旁白**：你们真的绕了一点路。清辞没有立刻接管导航，先问你要不要帮忙；你说要，她才拿出手机。

`R_gst.walk.reply.003`

**旁白**：桥上风大，映雪先把围巾拉高。晚棠指着远处一栋楼，说原来从这里看也没有多大。清辞在栏杆旁停了一会儿，让自己什么都不做。

`R_gst.walk.reply.004`

**旁白**：你分别问她们愿不愿意靠近一些，她们各自回应，没有一个答案由另一个人的动作代替。

`R_gst.walk.reply.005`

**旁白**：最后留下的是一张被风吹乱头发的合照。三个人都没有要求修成平时最好看的样子，你也没再找该站到后面的理由。

`R_gst.walk.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gst_walk"}]`

后继：`@end`

### 选择 R_gst/quiet

“今天就坐到打烊。我想分别听听你们，不急着做别的。”

可选条件：`null`

立即回应：

**旁白**：映雪说起第一次唱错词，晚棠说起第一次谈判前在洗手间里背稿，清辞承认自己曾把活动日期写错一天。你讲了一个同样不漂亮的失误，没人借机教训谁。

`R_gst.quiet.reply.001`

**旁白**：这些事有的已经在原著里出现过，有的没有。你没拿“我知道”抢走她们讲完的机会。

`R_gst.quiet.reply.002`

**顾晚棠**：认识一个人，好像比查资料慢很多。

`R_gst.quiet.reply.003`

**唐映雪**：还经常查错。

`R_gst.quiet.reply.004`

**沈清辞**：所以才要问本人。

`R_gst.quiet.reply.005`

**旁白**：你点头。店员来提醒打烊，你们才发现时间已经过去。分别告别时，她们各自亲近你，没有谁必须配合一场面向观众的表演。

`R_gst.quiet.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gst_quiet"}]`

后继：`@end`


---

## R_glt｜名字可以一起留下

类型：`ending`。元数据：`{"background":"terrace","music":"finale","next":"@end","endingFamily":"R_glt","members":["g","l","t"]}`

### 正文

**旁白**：映雪想给今晚拍一张合照，晚棠先摆摆手。

`R_glt.r4.body.001`

**顾晚棠**：等一下。我头发还在外套里。

`R_glt.r4.body.002`

**唐映雪**：又不发出去。

`R_glt.r4.body.003`

**顾晚棠**：不发也得让我挑一张睁眼的。

`R_glt.r4.body.004`

**旁白**：见月把手机架在桌边，先问清楚只存给在场的人看，大家都同意了。

`R_glt.r4.body.005`

**许照**：我坐哪里？

`R_glt.r4.body.006`

**林见月**：过来，别每次都想站到后面。

`R_glt.r4.body.007`

**旁白**：第一张你还在躲桌脚，第二张映雪闭了眼。晚棠坚持拍第三张，总算都看清了。

`R_glt.r4.body.008`

**旁白**：见月把照片发进私人聊天，没有公开上传。映雪保存以后，还盯着看了两秒。

`R_glt.r4.body.009`

**唐映雪**：我只是挺开心的，想留一张。

`R_glt.r4.body.010`

**林见月**：我也开心。我愿意继续和你交往，知道映雪和晚棠都在。

`R_glt.r4.body.011`

**顾晚棠**：我也愿意。有新安排就再说，今天不会替所有以后都答应。

`R_glt.r4.body.012`

**唐映雪**：我也是。许照，听见没有？

`R_glt.r4.body.013`

**许照**：听见了。我也想继续。

`R_glt.r4.body.014`

**旁白**：映雪满意地去夹最后一块滑溜溜的食物，失败两次。晚棠把勺子递过来。

`R_glt.r4.body.015`

**顾晚棠**：换这个，别跟筷子较劲。

`R_glt.r4.body.016`

**唐映雪**：你怎么什么场合都能这么冷静。

`R_glt.r4.body.017`

**旁白**：晚棠指了指照片里自己抓着桌边的手：也没有。

`R_glt.r4.body.018`

### 条件正文 · R_glt.variant.001

条件：`{"eq":["bridge_lt","private"]}`

**林见月**：那段私人影像留在我们自己这里。今天想记录什么，也还是先问。

`R_glt.variant.001.001`

### 条件正文 · R_glt.variant.002

条件：`{"eq":["bridge_lt","retake"]}`

**唐映雪**：后来重拍的那一小段，我看着挺开心。这次想拍，也先说一声。

`R_glt.variant.002.001`

### 条件正文 · R_glt.variant.003

条件：`{"eq":["bridge_gt","separate"]}`

**顾晚棠**：今晚不谈项目。放心，我没把合作方案夹在菜单里。

`R_glt.variant.003.001`

### 条件正文 · R_glt.variant.004

条件：`{"eq":["bridge_gt","shared"]}`

**唐映雪**：说好各自付以后，吃饭舒服多了。想吃什么也能直接点。

`R_glt.variant.004.001`

### 条件正文 · R_glt.variant.005

条件：`{"eq":["bridge_gl","bounded"]}`

**林见月**：该公开的部分有清楚的范围，私人画面不顺手拿来填空。

`R_glt.variant.005.001`

### 条件正文 · R_glt.variant.006

条件：`{"eq":["bridge_gl","witness"]}`

**顾晚棠**：那次我们先约当事人核对，没有赶着发私人材料。今天想公开什么，也先说清楚。

`R_glt.variant.006.001`

### 条件正文 · R_glt.r2.bias_g

条件：`{"eq":["group_bias_glt","g"]}`

**顾晚棠**：那次偏心我收到了。今天不用端平水杯，先把水喝了。

`R_glt.r2.bias_g.001`

### 条件正文 · R_glt.r2.bias_l

条件：`{"eq":["group_bias_glt","l"]}`

**林见月**：上次你特地过来陪我，我记得。今天想坐哪儿？

`R_glt.r2.bias_l.001`

### 条件正文 · R_glt.r2.bias_t

条件：`{"eq":["group_bias_glt","t"]}`

**唐映雪**：那天你先朝我走过来，我可没忘。今天也别只顾着发呆。

`R_glt.r2.bias_t.001`

### 选择 R_glt/photo

“重拍一张吧。不是为了发出去，是我也想留。”

可选条件：`null`

立即回应：

**旁白**：见月把手机架好，自己坐回你身边。映雪问要不要靠近一点，晚棠先检查桌边有没有把谁挡住。

`R_glt.photo.reply.001`

**旁白**：你没有安排谁该站在哪里，只伸出手，等她们各自决定。映雪挽住你的手臂，见月肩膀靠过来，晚棠把手轻轻放在你伸出的掌心里。

`R_glt.photo.reply.002`

**旁白**：倒计时到了，映雪忽然说了一个很旧的笑话。四个人都没忍住，拍出来的表情仍然不够端正。

`R_glt.photo.reply.003`

**顾晚棠**：这张可以。至少眼睛是笑着闭上的。

`R_glt.photo.reply.004`

**旁白**：照片没有替你们保证永远幸福，但它留下了一个每个人都愿意进入的当下。

`R_glt.photo.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glt_photo"}]`

后继：`@end`

### 选择 R_glt/night

“手机先收好。我们去外面，看看没有镜头的夜色。”

可选条件：`null`

立即回应：

**旁白**：见月第一个把机器留在包里。映雪沿着路慢慢哼歌，晚棠偶尔接上一句，调子错了也不改。

`R_glt.night.reply.001`

**旁白**：你们走到人少的地方，分别说起下一次想怎么见面。见月仍有自己的出行，映雪仍有排练，晚棠也不可能突然没有工作。约会并不取消这些。

`R_glt.night.reply.002`

**林见月**：时间对不上就另约，不要靠谁总是退一步。

`R_glt.night.reply.003`

**旁白**：另外两个人都点头。你说自己也会把做不到的事说出来。

`R_glt.night.reply.004`

**旁白**：离开前，三个人按自己的节奏靠近你。一个吻、一个拥抱、一只多握了一会儿的手，没有被排成高低顺序。

`R_glt.night.reply.005`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glt_night"}]`

后继：`@end`

### 选择 R_glt/rest

“我想让今天轻一点。不需要再证明什么，吃完就慢慢回去。”

可选条件：`null`

立即回应：

**唐映雪**：赞成。我真的有点困了。

`R_glt.rest.reply.001`

**顾晚棠**：那你刚才还想出去逛。

`R_glt.rest.reply.002`

**唐映雪**：想是一回事，眼睛睁不睁得开是另一回事。

`R_glt.rest.reply.003`

**旁白**：见月忍着笑替她叫车，又先问她愿不愿意与自己顺路。晚棠把自己的路线说明白，你也选了回去的方式，没有一个人默认成为所有人的司机。

`R_glt.rest.reply.004`

**旁白**：告别并不比热闹少一份心动。映雪抱你时小声说下次还见，见月认真看了你一眼，晚棠捏了捏你的指尖。

`R_glt.rest.reply.005`

**旁白**：夜深以后，私人聊天里依次亮起三条平安消息。你回复时没有复制同一句话。

`R_glt.rest.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glt_rest"}]`

后继：`@end`


---

## R_gls｜不必有人先退场

类型：`ending`。元数据：`{"background":"theatre","music":"finale","next":"@end","endingFamily":"R_gls","members":["g","l","s"]}`

### 正文

**旁白**：清辞早到，刚把杯子摆好，见月就拉开旁边的椅子。

`R_gls.r4.body.001`

**林见月**：坐下，水我来。

`R_gls.r4.body.002`

**顾晚棠**：等等。你们俩换班呢？

`R_gls.r4.body.003`

**旁白**：晚棠放下点心，先给自己留了一块。

`R_gls.r4.body.004`

**顾晚棠**：今天这块我想吃。谁也别跟我客气。

`R_gls.r4.body.005`

**林见月**：我也想吃那块。

`R_gls.r4.body.006`

**旁白**：清辞坐下，问你能不能再拿个盘子。你们最后还是把它分开了，另外又拆了一盒。

`R_gls.r4.body.007`

**许照**：早知道直接买两份。

`R_gls.r4.body.008`

**顾晚棠**：不用早知道。现在也来得及。

`R_gls.r4.body.009`

**旁白**：见月笑起来，清辞跟着笑，屋里一下轻松了。

`R_gls.r4.body.010`

**沈清辞**：我愿意和许照继续。见月和晚棠都在，这点我知道，也认真想过。

`R_gls.r4.body.011`

**林见月**：我也愿意。以后想单独见面，我会直接问。

`R_gls.r4.body.012`

**顾晚棠**：我愿意。不过今晚那块点心我还想要，这句也是真的。

`R_gls.r4.body.013`

**许照**：知道。下次我记得买够。

`R_gls.r4.body.014`

**旁白**：清辞把属于你的那一份推过来。

`R_gls.r4.body.015`

**沈清辞**：也记得留你自己的。别又忘了。

`R_gls.r4.body.016`

**旁白**：窗外开始下雨。四个人都没有急着起身，想先把这杯茶喝完。

`R_gls.r4.body.017`

### 条件正文 · R_gls.variant.001

条件：`{"eq":["bridge_ls","context"]}`

**林见月**：上次片尾那八秒，我们提前说清楚了。清辞这回应该不会再以为机器卡了。

`R_gls.variant.001.001`

### 条件正文 · R_gls.variant.002

条件：`{"eq":["bridge_ls","test"]}`

**沈清辞**：两种剪法我们真的都看过，最后也说清楚了。不是谁声音大就听谁的。

`R_gls.variant.002.001`

### 条件正文 · R_gls.variant.003

条件：`{"eq":["bridge_gs","offwork"]}`

**沈清辞**：工作资料没带来。今晚说的话，也不顺便写进合作安排。

`R_gls.variant.003.001`

### 条件正文 · R_gls.variant.004

条件：`{"eq":["bridge_gs","direct"]}`

**顾晚棠**：现在我会先问，这是谈工作，还是你自己的意见。两件事分开，才听得懂。

`R_gls.variant.004.001`

### 条件正文 · R_gls.variant.005

条件：`{"eq":["bridge_gl","bounded"]}`

**林见月**：该公开的部分有清楚的范围，私人画面不顺手拿来填空。

`R_gls.variant.005.001`

### 条件正文 · R_gls.variant.006

条件：`{"eq":["bridge_gl","witness"]}`

**顾晚棠**：那次我们先约当事人核对，没有赶着发私人材料。今天想公开什么，也先说清楚。

`R_gls.variant.006.001`

### 条件正文 · R_gls.r2.bias_g

条件：`{"eq":["group_bias_gls","g"]}`

**顾晚棠**：那次偏心我收到了。今天不用端平水杯，先把水喝了。

`R_gls.r2.bias_g.001`

### 条件正文 · R_gls.r2.bias_l

条件：`{"eq":["group_bias_gls","l"]}`

**林见月**：上次你特地过来陪我，我记得。今天想坐哪儿？

`R_gls.r2.bias_l.001`

### 条件正文 · R_gls.r2.bias_s

条件：`{"eq":["group_bias_gls","s"]}`

**沈清辞**：上次先站到我旁边，今天倒不好意思了？坐吧。

`R_gls.r2.bias_s.001`

### 选择 R_gls/wants

“下一次，让每个人单独决定一个想去的地方。轮到我时，也不做标准答案。”

可选条件：`null`

立即回应：

**林见月**：我想去海边。不能只有拍摄的时候才去。

`R_gls.wants.reply.001`

**沈清辞**：我想在家看一部电影，看到一半困了也不硬撑。

`R_gls.wants.reply.002`

**顾晚棠**：我想去那种做得很慢的小餐馆。别人别一直催我赶时间。

`R_gls.wants.reply.003`

**许照**：我想去逛书店。没有要找的东西，也可以待着。

`R_gls.wants.reply.004`

**旁白**：四个地方没有被塞进同一晚。你们把它们分别记下，谁的时间变了，再商量。

`R_gls.wants.reply.005`

**旁白**：清辞慢慢伸手，你握住。见月靠在椅背上，笑着说这份计划终于不像工作。晚棠端起杯子，轻轻碰了碰你们的杯沿。

`R_gls.wants.reply.006`

**旁白**：你把日期留空，等大家看过自己的安排，再逐次约。

`R_gls.wants.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gls_wants"}]`

后继：`@end`

### 选择 R_gls/close

“现在可以靠近一点吗？每个人按自己舒服的来。”

可选条件：`null`

立即回应：

**沈清辞**：可以。

`R_gls.close.reply.001`

**林见月**：我想坐这边。

`R_gls.close.reply.002`

**顾晚棠**：那我坐另一边。别把茶碰翻。

`R_gls.close.reply.003`

**旁白**：见月挪过来，清辞把热杯子放远。晚棠看着三个人折腾椅子的样子，终于忍不住笑，说这大概是最不适合写成浪漫台词的一刻。

`R_gls.close.reply.004`

**旁白**：等位置坐好，反而安静了。你分别伸手，她们各自回应。有人靠在肩上，有人只是牵着你，没有谁要赶上另一人的速度。

`R_gls.close.reply.005`

**旁白**：一阵雨过去，你们仍坐在那里。窗子上映出不那么整齐的四个影子，每个人都有自己的姿势。

`R_gls.close.reply.006`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gls_close"}]`

后继：`@end`

### 选择 R_gls/easy

“先吃饭吧。我今天想少一点承诺，多一点正常聊天。”

可选条件：`null`

立即回应：

**顾晚棠**：这倒像终于肯下班的人。

`R_gls.easy.reply.001`

**旁白**：清辞聊起一件很小的烦心事，没有要求你立刻解决。见月说自己最近看不进去某本书，晚棠承认那本书她也没看完。

`R_gls.easy.reply.002`

**旁白**：你们聊到一半，发现晚棠留在包里的另一盒点心才是她最喜欢的。她被看穿，先举手认输。

`R_gls.easy.reply.003`

**林见月**：你可以直接说想留给自己。

`R_gls.easy.reply.004`

**顾晚棠**：我正在学。进度慢一点。

`R_gls.easy.reply.005`

**旁白**：大家笑着放过她。晚棠把另一盒也拿出来，嘴上却说下次一定记得分开买。

`R_gls.easy.reply.006`

**旁白**：离开时，她们分别告诉你下次什么时候有空。没有谁替其他两人打包回答。

`R_gls.easy.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"gls_easy"}]`

后继：`@end`


---

## R_glst｜这一页，我们自己写

类型：`ending`。元数据：`{"background":"theatre","music":"finale","next":"@end","endingFamily":"R_glst","members":["g","l","s","t"]}`

### 正文

**旁白**：北岸夜场的灯一盏盏熄灭，最后留下的是侧厅那张小桌。

`R_glst.body.001`

**旁白**：映雪搬来两把不同颜色的椅子，见月问还少几把。清辞刚要去拿，晚棠已经从隔壁拖出一把，又卡在门槛上。

`R_glst.body.002`

**顾晚棠**：许照，搭把手。它比看起来重。

`R_glst.body.003`

**唐映雪**：你也有搬不动的时候啊。

`R_glst.body.004`

**顾晚棠**：有。比如现在。你笑完了就来拿杯子。

`R_glst.body.005`

**旁白**：见月笑着收起相机，坐到了你旁边。清辞把最后一盏灯调暗一点，没有再拿起手机。

`R_glst.body.006`

**旁白**：五个人坐齐，桌子显得太小。你的膝盖碰到桌腿，映雪赶紧扶住快倒的饮料。

`R_glst.body.007`

**唐映雪**：这张桌子以后得换。

`R_glst.body.008`

**沈清辞**：先别订以后。今天总算都坐下了。

`R_glst.body.009`

**旁白**：你看着她们，一时没说出话。原著的封面、读过的章节、那些让你翻回去看过的句子，忽然离得很远。

`R_glst.body.010`

**林见月**：在想什么？

`R_glst.body.011`

**许照**：后来认出你们的时候，我以为书里把你们全写清楚了。

`R_glst.body.012`

**顾晚棠**：后来呢？

`R_glst.body.013`

**许照**：后来发现，我连你们今天想坐哪边都猜不准。

`R_glst.body.014`

**旁白**：晚棠低头笑了。映雪用肩膀碰了碰你，像在说这次总算猜对了一件事。

`R_glst.body.015`

**旁白**：你们已经分别答过，也在共同相处时听见过彼此的答案。今晚没有谁是到了才知道另外三个人也在。

`R_glst.body.016`

**许照**：我不是想开庆功会。不管这个项目最后算不算赢，我都想和你们继续。

`R_glst.body.017`

**沈清辞**：我知道。我的答案也还是愿意。

`R_glst.body.018`

**唐映雪**：我也是。不过我会吃醋，你别以为我每次都这么好说话。

`R_glst.body.019`

**林见月**：吃醋可以说。我不太会抢话，你们也给我留一点开口的空。

`R_glst.body.020`

**顾晚棠**：留。也给我留一点不必句句都漂亮的空。

`R_glst.body.021`

**唐映雪**：你这句就挺漂亮的。

`R_glst.body.022`

**顾晚棠**：……那我下句争取说笨一点。

`R_glst.body.023`

**旁白**：你笑出声，桌边的人也跟着笑了。清辞的手落在你手背上，停了一会儿才收回；见月把你够不到的杯子递过来。

`R_glst.body.024`

**旁白**：映雪往你这边挪了挪，压低声音。

`R_glst.body.025`

**唐映雪**：所以以后，我发“出来”，不是又缺人搬设备。

`R_glst.body.026`

**沈清辞**：那你最好写清几点，别让他猜。

`R_glst.body.027`

**顾晚棠**：她约会你也要排时间？

`R_glst.body.028`

**沈清辞**：我提醒他别失约。对你也一样。

`R_glst.body.029`

**林见月**：那我写清楚。哪次想拍片，哪次只是想见你。

`R_glst.body.030`

### 条件正文 · R_glst.variant.001

条件：`{"eq":["bridge_st","fixed"]}`

**沈清辞**：这次我照自己说的时间来，没有又替所有人多留一段。这样的安排，我舒服一点。

`R_glst.variant.001.001`

### 条件正文 · R_glst.variant.002

条件：`{"eq":["bridge_st","asked"]}`

**唐映雪**：那次加排练以前，你先问了清辞愿不愿意。说清楚以后，我也不用猜她是不是生气。

`R_glst.variant.002.001`

### 条件正文 · R_glst.variant.003

条件：`{"eq":["bridge_lt","private"]}`

**林见月**：那段私人影像留在我们自己这里。今天想记录什么，也还是先问。

`R_glst.variant.003.001`

### 条件正文 · R_glst.variant.004

条件：`{"eq":["bridge_lt","retake"]}`

**唐映雪**：后来重拍的那一小段，我看着挺开心。这次想拍，也先说一声。

`R_glst.variant.004.001`

### 条件正文 · R_glst.variant.005

条件：`{"eq":["bridge_gt","separate"]}`

**顾晚棠**：今晚不谈项目。放心，我没把合作方案夹在菜单里。

`R_glst.variant.005.001`

### 条件正文 · R_glst.variant.006

条件：`{"eq":["bridge_gt","shared"]}`

**唐映雪**：说好各自付以后，吃饭舒服多了。想吃什么也能直接点。

`R_glst.variant.006.001`

### 条件正文 · R_glst.variant.007

条件：`{"eq":["bridge_ls","context"]}`

**林见月**：上次片尾那八秒，我们提前说清楚了。清辞这回应该不会再以为机器卡了。

`R_glst.variant.007.001`

### 条件正文 · R_glst.variant.008

条件：`{"eq":["bridge_ls","test"]}`

**沈清辞**：两种剪法我们真的都看过，最后也说清楚了。不是谁声音大就听谁的。

`R_glst.variant.008.001`

### 条件正文 · R_glst.variant.009

条件：`{"eq":["bridge_gs","offwork"]}`

**沈清辞**：工作资料没带来。今晚说的话，也不顺便写进合作安排。

`R_glst.variant.009.001`

### 条件正文 · R_glst.variant.010

条件：`{"eq":["bridge_gs","direct"]}`

**顾晚棠**：现在我会先问，这是谈工作，还是你自己的意见。两件事分开，才听得懂。

`R_glst.variant.010.001`

### 条件正文 · R_glst.variant.011

条件：`{"eq":["bridge_gl","bounded"]}`

**林见月**：该公开的部分有清楚的范围，私人画面不顺手拿来填空。

`R_glst.variant.011.001`

### 条件正文 · R_glst.variant.012

条件：`{"eq":["bridge_gl","witness"]}`

**顾晚棠**：那次我们先约当事人核对，没有赶着发私人材料。今天想公开什么，也先说清楚。

`R_glst.variant.012.001`

### 条件正文 · R_glst.r2.rain

条件：`{"eq":["group_seen_glst",true]}`

**唐映雪**：这回没下雨，也不许借两把伞就把问题混过去。

`R_glst.r2.rain.001`

**顾晚棠**：我记得某个人光顾着回话，鞋都淋湿了。

`R_glst.r2.rain.002`

**林见月**：因为你们一直站在门口笑。

`R_glst.r2.rain.003`

**沈清辞**：好，今晚先坐下。让他把鞋保住。

`R_glst.r2.rain.004`

### 条件正文 · R_glst.r2.bias_g

条件：`{"eq":["group_bias_glst","g"]}`

**顾晚棠**：那次偏心我收到了。今天不用端平水杯，先把水喝了。

`R_glst.r2.bias_g.001`

### 条件正文 · R_glst.r2.bias_l

条件：`{"eq":["group_bias_glst","l"]}`

**林见月**：上次你特地过来陪我，我记得。今天想坐哪儿？

`R_glst.r2.bias_l.001`

### 条件正文 · R_glst.r2.bias_s

条件：`{"eq":["group_bias_glst","s"]}`

**沈清辞**：上次先站到我旁边，今天倒不好意思了？坐吧。

`R_glst.r2.bias_s.001`

### 条件正文 · R_glst.r2.bias_t

条件：`{"eq":["group_bias_glst","t"]}`

**唐映雪**：那天你先朝我走过来，我可没忘。今天也别只顾着发呆。

`R_glst.r2.bias_t.001`

### 选择 R_glst/ordinary

我有点饿了。先吃饭，不开庆功会。

可选条件：`null`

立即回应：

**唐映雪**：终于。你们刚才再认真一点，蛋糕就要热了。

`R_glst.ordinary.reply.001`

**顾晚棠**：本来就是常温蛋糕。

`R_glst.ordinary.reply.002`

**唐映雪**：你不能让我显得没耐心。

`R_glst.ordinary.reply.003`

**旁白**：清辞笑着把餐盘递过去，见月问大家想喝什么。映雪抢走你手边的杯子，又把温的那杯换给你。

`R_glst.ordinary.reply.004`

**旁白**：说起刚认识的事，你记错了时间。映雪立刻纠正，清辞说她记得也是那个时候。你投降，晚棠却在旁边提醒：也可能是她们两人都记错了。

`R_glst.ordinary.reply.005`

**旁白**：快结束时，映雪提议合照。见月架好手机，自己跑回来，晚棠腾了位置，清辞拉住差点被椅脚绊到的你。

`R_glst.ordinary.reply.006`

**旁白**：快门响时，大家还没站好。那张照片最后没有删。

`R_glst.ordinary.reply.007`

**旁白**：你把照片保存下来。门口的工作人员催了一声，你们才想起还没把最后两只杯子收走。

`R_glst.ordinary.reply.008`

**旁白**：出门时，手机接连亮起。有人发照片，有人问下周哪天有空。许照的故事，终于不是一句退场。

`R_glst.ordinary.reply.009`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glst_ordinary"}]`

后继：`@end`

### 选择 R_glst/personal

绕到她们身边，把刚才没敢说的话分别说出来。

可选条件：`null`

立即回应：

**旁白**：你先看向映雪，告诉她自己仍然想听她现在想唱的歌，不要求每一首都唱给你。她点头，轻轻碰了碰你的手指。

`R_glst.personal.reply.001`

**旁白**：你问清辞下次想不想自己选一个与工作无关的地方，她说想，已经想到了一处。你没有抢着猜。

`R_glst.personal.reply.002`

**旁白**：你问见月接下来想怎样拍、怎样见面。她抬眼笑了，说这次要先把你写进私人日历，不是通告单。

`R_glst.personal.reply.003`

**旁白**：轮到晚棠，你说以后想要什么会直接问，不让她从每句玩笑里猜条件。她停了一下，把手放到桌面，等你握。

`R_glst.personal.reply.004`

**顾晚棠**：这句我会记得。

`R_glst.personal.reply.005`

**旁白**：映雪先抱住你，下巴轻轻磕在你肩上。清辞笑她太急，自己松手时却也慢了一点。见月在你耳边说下次见；晚棠最后走近，用额头轻轻碰了碰你。

`R_glst.personal.reply.006`

**旁白**：晚棠退开时，耳饰碰到了你的衣领。你替她拨出来，她没有躲，只低声说了句，小心一点。身后的映雪催你们快来，夜风从开着的门里吹进来。

`R_glst.personal.reply.007`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glst_personal"}]`

后继：`@end`

### 选择 R_glst/gentle

“我很开心，也有点承受不过来。今天就安静坐着，行吗？”

可选条件：`null`

立即回应：

**林见月**：行。

`R_glst.gentle.reply.001`

**沈清辞**：不必把开心也表现得很熟练。

`R_glst.gentle.reply.002`

**旁白**：映雪挪了挪椅子，给你留一点能放松坐下的空间。晚棠问要不要水，等你回答才倒。没有人把这句话当成你临时想逃。

`R_glst.gentle.reply.003`

**旁白**：五个人坐了一会儿。窗外有人搬最后一箱器材，脚步声从门口经过，又渐渐远了。你不再是那个必须随时站起来证明自己有用的人。

`R_glst.gentle.reply.004`

**唐映雪**：下次紧张也可以说。别又装成来检查设备。

`R_glst.gentle.reply.005`

**旁白**：你笑着应了。见月把最后一块点心掰开，清辞终于靠到椅背上，晚棠摘下戴了一整晚的耳饰，说耳朵有点疼。

`R_glst.gentle.reply.006`

**旁白**：映雪打了个哈欠，试图藏住，还是被你看见。她瞪了你一眼，随即自己先笑了。你终于可以跟着笑，不必急着说一句聪明话。

`R_glst.gentle.reply.007`

**旁白**：直到该各自回家的时候，你们才站起来。下一次见面，仍然可以认真商量。

`R_glst.gentle.reply.008`

写入与操作：`[{"op":"set","key":"ending_tone","value":"glst_gentle"}]`

后继：`@end`


---

## X01｜原著的第十三章

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"X01","members":[],"editorNotes":["这一轮故事在第七日提前结束。你的去留已经有了结果；四位女主的第二十一日尚未发生，不会被系统编成已经圆满的尾声。"]}`

### 正文

**旁白**：程放把临时工作证放在桌上。

`X01.r4.body.001`

**程放**：后续联系外包结算。今天不用进场了。

`X01.r4.body.002`

**旁白**：你记得第十三章写过这个结果，可记得结局没有替你在刚才开口，也没有自动替你留下能用的证据。

`X01.r4.body.003`

**旁白**：工作人员推着箱子经过，说了声“借过”。你侧身让开，才发现已经不用再问它该送去哪里。

`X01.r4.body.004`

**旁白**：工作群还在，外包结算的联系方式也还在。要更正哪一条记录、下一份工作怎么找，都不会因为今天被请离就自动解决。

`X01.r4.body.005`

**旁白**：你走到艺术中心门外，回头看了一眼。首演那晚救过一次场，原来还不足以替自己走完后面的路。

`X01.r4.body.006`

**原著记忆**：我记得原著第十三章只写到“许照被请离”。谁也没写过他的后半生。

`X01.r4.body.007`

**许照**：可我还在这儿。书没写的，我总得自己活下去。

`X01.r4.body.008`

**旁白**：街对面的车到了。你握着手机，仍然能决定接下来先做哪件事。

`X01.r4.body.009`

### 条件正文 · X01.variant.001

条件：`{"ge":["evidence",2]}`

**旁白**：你并非毫无准备。包里仍有已经核验的记录。刚才选择不在现场争取，并不会让它们消失；也不代表更正与下一份工作会自动来到。

`X01.variant.001.001`

### 选择 X01/record

把经历写下来，先确认下一份工作和可用的求助。

可选条件：`null`

立即回应：

**旁白**：你没有再靠记忆替自己证明。能保存的材料、谁在现场、哪些话确实说过，你一条条记下，无法确认的地方留空。

`X01.record.reply.001`

**旁白**：下一份工作未必轻松，也未必有人愿意先听你说完。至少你这次知道，提前看过小说，不等于现实会替你把所有行动做完。

`X01.record.reply.002`

**旁白**：车窗里映出你的工作证。你把它放进口袋，没有把自己也留在第十三章。

`X01.record.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x01_record"}]`

后继：`@end`

### 选择 X01/reply

给还在联系你的人回一条真实消息，不编成一切都好。

可选条件：`null`

立即回应：

**许照**：今天不太好。我先回去，等缓过来再说。

`X01.reply.reply.001`

**旁白**：你发出消息，没有紧接着补一个轻松表情。回复不是立刻到的，有人还在忙，有人问需不需要陪你一会儿。

`X01.reply.reply.002`

**旁白**：你认真想过，再回答。没有把一次关心解释成恋爱，也没有因为失败就觉得所有认识都白费。

`X01.reply.reply.003`

**旁白**：这条路线失去了机会，不等于你连一句真话都不能留下。

`X01.reply.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x01_reply"}]`

后继：`@end`

### 选择 X01/stop

先把手机放下，走一段路。

可选条件：`null`

立即回应：

**旁白**：你让那辆车开走了。街上的人不知道这里刚发生什么，便利店仍在卖热食，路口仍有晚归的人等灯。

`X01.stop.reply.001`

**旁白**：你买了一份能吃饱的东西，坐到屋檐下。今晚不必立刻写一个逆袭宣言，也不必把后悔讲成很漂亮的领悟。

`X01.stop.reply.002`

**旁白**：吃完以后，你把空盒丢掉，重新站起来。原著在这里停止写你，日子却不会。

`X01.stop.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x01_stop"}]`

后继：`@end`


---

## X02｜没有主角光环，我照样能赢一局

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"X02","members":[]}`

### 正文

**旁白**：夜场刚散，手机跳出一条结算确认：收款人，许照；工作内容，按你实际完成的分工列得一清二楚。原著里最容易被删掉的名字，这回留在了正式记录上。

`X02.r2.body.001`

**旁白**：程放没有再把错误塞进你的栏目。你不需要满世界宣告胜利——那份有署名、有工时、结清的钱，就是这一局最硬的结果。

`X02.r2.body.002`

**陆景行**：下次有同档期的活，你还接吗？

`X02.r2.body.003`

**许照**：先看是谁的条件好。

`X02.r2.body.004`

**旁白**：陆景行没替你定下一步。他把下一轮征集时间发给你，你合上手机看了眼夜色：第一次轮到别人来问，你肯不肯接。

`X02.r2.body.005`

### 条件正文 · X02.r2.work_original

条件：`{"eq":["xu_result","original"]}`

**旁白**：你自己录制、整理的声音演示包已经发出，文件封面写着许照。回信询问能不能按这份样片再做一版，你把交付日期重新核对了一遍。

`X02.r2.work_original.001`

### 条件正文 · X02.r2.work_portfolio

条件：`{"eq":["xu_result","portfolio"]}`

**旁白**：你做过的交接样表和现场样片放在同一个作品夹。下一份询价明确要这套做法，不是要一个随叫随到、出了错就换掉的人。

`X02.r2.work_portfolio.001`

### 条件正文 · X02.r2.work_steady

条件：`{"eq":["xu_result","steady"]}`

**旁白**：那份由你确认的现场值班安排已经排上。报酬、班次和负责范围都写在一起，你存下了确认。

`X02.r2.work_steady.001`

### 条件正文 · X02.r2.work_rest

条件：`{"eq":["xu_result","rest"]}`

**旁白**：你没有接下新活。旧项目的结算确认和更正记录都存好了，接下来先休息，再决定下一份工作。

`X02.r2.work_rest.001`

### 选择 X02/work

先把下一份工作做好，不急着把它写成传奇。

可选条件：`null`

立即回应：

**旁白**：你回信问清工作的时间、报酬和职责，能做的接下来，不懂的就直接问。

`X02.work.reply.001`

**旁白**：下一份工作不是天降大奖，但负责人直接写信问你能否按上次的质量交付。你报出职责和工期，再发出自己的报价。主角光环没有来，主动权倒是来了。

`X02.work.reply.002`

**旁白**：第二天的闹钟响起时，你按掉，又坐起来。故事没有替你省掉这一步，但它终于由你自己继续。

`X02.work.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x02_work"}]`

后继：`@end`

### 选择 X02/friends

把想继续认识的人约出来，明确是朋友。

可选条件：`null`

立即回应：

**旁白**：你没有群发一套暧昧的告别。想听歌，就问哪天有公开排练；想看一部片子，就约一个双方都方便的时间。

`X02.friends.reply.001`

**旁白**：有人答应，有人这周没空。你没有把迟来的回复翻译成考验，也没有把朋友当成随时可以改名的恋人。

`X02.friends.reply.002`

**旁白**：后来一张新的合照里，你站得很自然。没有情侣称呼，笑也并不因此少一点。

`X02.friends.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x02_friends"}]`

后继：`@end`

### 选择 X02/self

给自己留一个没有攻略目标的晚上。

可选条件：`null`

立即回应：

**旁白**：你去了一家普通书店，没有急着寻找书里提过的每一个名字。翻到一个不认识的故事时，你读了几页，又合上。

`X02.self.reply.001`

**旁白**：知道结局固然让人安心，可不知道，也终于不必意味着下一秒就会被清退。

`X02.self.reply.002`

**旁白**：你坐到窗边，认真吃完一份晚饭。手机安静了一阵，你也没有把安静当成失败。

`X02.self.reply.003`

**旁白**：这一页没有人宣布爱你，却仍是你亲手过完的一页。

`X02.self.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x02_self"}]`

后继：`@end`


---

## X03｜四条遗憾，全部改写

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"X03","members":[]}`

### 正文

**旁白**：手机连震四次：映雪发来新歌试播的截图，清辞传来旁厅的新安排，见月的申请页面有了进展，晚棠发来终于得到记录的方案修订页。她们各自亲手推进的事，终于没照原著那样滑向失去。

`X03.r2.body.001`

**旁白**：你把四条真实结果与原著后来的遗憾一一对上。没人凭空成神，也没人为你停止自己的生活；可四个本来要遗憾收场的故事，确实都被你撬开了新的路。

`X03.r2.body.002`

**陆景行**：你在笑什么？

`X03.r2.body.003`

**许照**：以前看过一本让我憋屈的书。现在，我终于知道亲手改结局是什么感觉。

`X03.r2.body.004`

**陆景行**：那不错。下次有空说给我听。

`X03.r2.body.005`

**旁白**：他拎着自己的设备先走了。你逐一回完朋友的消息，把自己的结算单也存进去。

`X03.r2.body.006`

### 条件正文 · X03.r2.work_original

条件：`{"eq":["xu_result","original"]}`

**旁白**：你亲自整理过的原声演示包已经发出，文件封面写着许照。回信询问能不能按这份样片再做一版，你把交付日期重新核对了一遍。

`X03.r2.work_original.001`

### 条件正文 · X03.r2.work_portfolio

条件：`{"eq":["xu_result","portfolio"]}`

**旁白**：你做过的交接样表和现场样片放在同一个作品夹。下一份询价明确要这套做法，不是要一个随叫随到、出了错就换掉的人。

`X03.r2.work_portfolio.001`

### 条件正文 · X03.r2.work_steady

条件：`{"eq":["xu_result","steady"]}`

**旁白**：那份由你确认的现场值班安排已经排上。报酬、班次和负责范围都写在一起，你存下了确认。

`X03.r2.work_steady.001`

### 条件正文 · X03.r2.work_rest

条件：`{"eq":["xu_result","rest"]}`

**旁白**：你没有接下新活。旧项目的结算确认和更正记录都存好了，接下来先休息，再决定下一份工作。

`X03.r2.work_rest.001`

### 选择 X03/gather

提议以后有空聚一次，不把所有人的日程绑在一起。

可选条件：`null`

立即回应：

**旁白**：你发出邀请，说明只是朋友聚会。映雪先回一个可以，清辞需要查日期，见月还不确定那天在哪，晚棠说不要选得像项目复盘。

`X03.gather.reply.001`

**旁白**：消息一条条来，你没有因为不能立刻凑齐就催促。大家有各自的生活，正是这个结局里重要的部分。

`X03.gather.reply.002`

**旁白**：后来那次聚会比你想的晚了一些。有人迟到，有人先走，没有任何人因此失去在故事里的位置。

`X03.gather.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x03_gather"}]`

后继：`@end`

### 选择 X03/write

把原著与现实的差别记下来，只给自己看。

可选条件：`null`

立即回应：

**旁白**：你在笔记上写下七件事情，旁边各留一行：当时自己做了什么，别人又作出了什么决定。

`X03.write.reply.001`

**旁白**：你没有把所有功劳都写在许照下面。那些不受你控制的回答，恰好证明这不是一本只会顺着你的新小说。

`X03.write.reply.002`

**旁白**：最后一行，你写自己的去向，没有附上谁会爱你的保证。

`X03.write.reply.003`

**旁白**：合上笔记时，你已经不再只记得原著给过的结局。

`X03.write.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x03_write"}]`

后继：`@end`

### 选择 X03/leave

先过好自己的下一周，让她们各自往前走。

可选条件：`null`

立即回应：

**旁白**：你给四个人都回了消息，然后把手机收起。有人还在输入，你不必一直等到最后一个气泡消失。

`X03.leave.reply.001`

**旁白**：你去坐自己的车，想明天的工作，想冰箱里还有没有能吃的东西。生活没有因为这一轮改写很漂亮，就省掉普通的问题。

`X03.leave.reply.002`

**旁白**：可那些问题不再只是倒霉配角受苦的注脚。你会自己解决，也会在需要的时候开口。

`X03.leave.reply.003`

**旁白**：车子离开北岸，海岚的夜色向后退去。你没有等旁白替这件事宣布意义。

`X03.leave.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x03_leave"}]`

后继：`@end`


---

## X04｜没有合上的对话框

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"X04","members":[],"editorNotes":["本轮在这里结束。往后要不要花时间修复，怎样接受别人的决定，是你尚未做出的事情。","系统没有替你追加一次全员揭穿，没有把未被发现的事写成所有人都接受。你此刻得到的是一个悬而未决的结尾。"],"renderReasons":true}`

### 正文

**旁白**：最后一辆器材车开走了，你还站在路灯下回消息。

`X04.r2.body.001`

**旁白**：工作已经有了结果，感情却没有顺着一起落定。手机里几段不同的对话，还停在不同的地方。

`X04.r2.body.002`

### 选择 X04/repair

记下该面对的问题，准备逐一说明；不把“准备”当成已经被原谅。

可选条件：`null`

立即回应：

**旁白**：你不再发新的保证，先把最需要当面讲清的那件事写进备忘。

`X04.repair.r2.reply.001`

**旁白**：今天尚未解决的事，没有因为记下计划就算修好了。你把手机收起，决定下一次从这件事开始。

`X04.repair.r2.reply.002`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x04_repair"}]`

后继：`@end`

### 选择 X04/pause

不再往前推进，让每个已有安排得到明确回复。

可选条件：`null`

立即回应：

**旁白**：你发出明确的暂停消息，不让已经排好的约会继续悬着。

`X04.pause.r2.reply.001`

**旁白**：有人很快回了，有人没有。今晚你没有追着要一个更好听的答案。

`X04.pause.r2.reply.002`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x04_pause"}]`

后继：`@end`

### 选择 X04/continue

暂时维持现在的安排，不在今晚说开。

可选条件：`null`

立即回应：

**旁白**：你仍按各自的对话回消息。屏幕一灭，下一条又亮起。

`X04.continue.r2.reply.001`

**旁白**：那些还没说清的事，和暂时留住的联系，一起被带到了明天。

`X04.continue.r2.reply.002`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x04_continue"}]`

后继：`@end`


---

## X05｜这次我自己下场

类型：`ending`。元数据：`{"background":"street","music":"finale","next":"@end","endingFamily":"X05","members":[]}`

### 正文

**旁白**：第二十一日，隔着街看北岸的灯亮起来，你坐在咖啡店靠窗的位置。

`X05.r2.body.001`

**旁白**：离开项目时交回的工作牌没有再领。今晚来这里，是来处理自己的安排，不是重新报到。

`X05.r2.body.002`

**旁白**：手机里还留着你那次实际完成的更正。谁再提起旧说法，你不用等哪位女主替自己开口。

`X05.r2.body.003`

**旁白**：你把杯底最后一口喝完。今晚没有谁替你排下一件事。

`X05.r2.body.004`

### 条件正文 · X05.r2.work_original

条件：`{"eq":["xu_result","original"]}`

**旁白**：你自己录制、整理的声音演示包已经发出，文件封面写着许照。回信询问能不能按这份样片再做一版，你把交付日期重新核对了一遍。

`X05.r2.work_original.001`

### 条件正文 · X05.r2.work_portfolio

条件：`{"eq":["xu_result","portfolio"]}`

**旁白**：你做过的交接样表和现场样片放在同一个作品夹。下一份询价明确要这套做法，不是要一个随叫随到、出了错就换掉的人。

`X05.r2.work_portfolio.001`

### 条件正文 · X05.r2.work_steady

条件：`{"eq":["xu_result","steady"]}`

**旁白**：那份由你确认的现场值班安排已经排上。报酬、班次和负责范围都写在一起，你存下了确认。

`X05.r2.work_steady.001`

### 条件正文 · X05.r2.work_rest

条件：`{"eq":["xu_result","rest"]}`

**旁白**：你没有接下新活。旧项目的结算确认和更正记录都存好了，接下来先休息，再决定下一份工作。

`X05.r2.work_rest.001`

### 选择 X05/ordinary

接下一份合适的工作，认真问清条件。

可选条件：`null`

立即回应：

**旁白**：你问了时间、报酬和职责，也问了一件自己以前不好意思问的事：哪些内容不在这份工作里。

`X05.ordinary.reply.001`

**旁白**：对方给了回复，你有能接受和不能接受的地方。谈得不算痛快，却比照着一句“我必须抓住机会”点头更像生活。

`X05.ordinary.reply.002`

**旁白**：你没有成为另一个陆景行。你有了自己愿意接住的一天。

`X05.ordinary.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x05_ordinary"}]`

后继：`@end`

### 选择 X05/visit

以后仍可以去看她们的作品，但不以项目身份回去。

可选条件：`null`

立即回应：

**旁白**：你保存了公开的排练与展映信息。能去时买一张票，想见朋友就提前问，没人有空也可以自己坐一会儿。

`X05.visit.reply.001`

**旁白**：北岸对你不再是一扇只能赢着进去、输着出来的门。那里有你认识的人，也只是海岚许多地方里的一个。

`X05.visit.reply.002`

**旁白**：你走向自己的车站，没有急着把这份平常改写成盛大的胜利。

`X05.visit.reply.003`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x05_visit"}]`

后继：`@end`

### 选择 X05/new

给自己安排一件原著没提过的小事。

可选条件：`null`

立即回应：

**旁白**：你报名了一堂以前一直没空去的课。第一节没有女主角突然坐到旁边，也没有隐藏身份来认领你。

`X05.new.reply.001`

**旁白**：老师让每个人介绍自己，你说了许照，然后说最近正在学着把日子重新安排好。

`X05.new.reply.002`

**旁白**：没有人知道这句话里另一层意思。有人朝你笑了笑，让出旁边的位置。

`X05.new.reply.003`

**旁白**：你坐下。这一段故事没有预告，却终于不必先害怕。

`X05.new.reply.004`

写入与操作：`[{"op":"set","key":"ending_tone","value":"x05_new"}]`

后继：`@end`


---

## E_T｜映雪｜一场不该由别人点的歌

类型：`side`。元数据：`{"background":"recording","music":"pulse","next":"@schedule","minSlot":4,"requires":["t02"]}`

### 正文

**旁白**：你到录音室时，映雪刚挂掉电话。她把一段公开试听给你听。

`E_T.r4.body.001`

**唐映雪**：有人想请我唱这个。歌不坏，就是跟我不太像。

`E_T.r4.body.002`

**许照**：但确实挺上头。

`E_T.r4.body.003`

**唐映雪**：对。我自己也哼了一路。

`E_T.r4.body.004`

**旁白**：她有点不好意思地把耳机线绕在手指上。

`E_T.r4.body.005`

**唐映雪**：我怕一答应，以后就全是这种歌。可现在直接拒绝，我又有点舍不得。你说呢？

`E_T.r4.body.006`

### 选择 E_T/compare

“唱两种都试试。别先拿是不是会红，替你判断喜不喜欢。”

可选条件：`null`

立即回应：

**旁白**：她先用惯常的唱法唱，又改成自己的语气。第二次有几处没贴上伴奏，反而让她发现可以怎样改。

`E_T.compare.reply.001`

**唐映雪**：这个地方也许能谈。

`E_T.compare.reply.002`

**许照**：那先问。不行再说。

`E_T.compare.reply.003`

**旁白**：她起身回电话，没让你代接。谈完没有立刻宣布胜利，只告诉你对方愿意再听一版。

`E_T.compare.reply.004`

**唐映雪**：第二种还真能唱。刚才光想怎么拒绝，我都没试。

`E_T.compare.reply.005`

写入与操作：`[{"op":"set","key":"trial_t","value":"tested"}]`

后继：`@schedule`

### 选择 E_T/self

先听她真正想唱什么，不急着给答案。

可选条件：`null`

立即回应：

**许照**：等一下，我差点直接劝你拒绝了。你自己其实想不想唱？

`E_T.self.r4.reply.001`

**唐映雪**：想。但我不想唱完这一首，以后就只能唱这种。

`E_T.self.r4.reply.002`

**许照**：那能不能先只谈这一首？

`E_T.self.r4.reply.003`

**唐映雪**：我问问。大不了条件谈不拢，再拒绝。

`E_T.self.r4.reply.004`

**旁白**：她拿起手机，先把那句最想说的话写在草稿里。

`E_T.self.r4.reply.005`

写入与操作：`[{"op":"set","key":"trial_t","value":"asked"}]`

后继：`@schedule`

### 选择 E_T/taste

“我说我喜欢哪一种，但不把它当成你必须做的决定。”

可选条件：`null`

立即回应：

**旁白**：你说出自己听见的区别。映雪认真听，最后摇头，说她反而喜欢另一段。

`E_T.taste.reply.001`

**唐映雪**：这句你大概觉得太直了，我今天就想直一点。

`E_T.taste.reply.002`

**许照**：那留着。

`E_T.taste.reply.003`

**唐映雪**：你不生气？

`E_T.taste.reply.004`

**许照**：歌是你的。下次我照样能说自己的看法。

`E_T.taste.reply.005`

**旁白**：她把喜欢的那一段又放了一遍，非让你听听结尾。你听完，还是坚持自己的意见，她也没生气。

`E_T.taste.reply.006`

写入与操作：`[{"op":"set","key":"trial_t","value":"different"}]`

后继：`@schedule`


---

## E_S｜清辞｜门口那个没卖出去的位置

类型：`side`。元数据：`{"background":"theatre","music":"pulse","next":"@schedule","minSlot":4,"requires":["s02"]}`

### 正文

**旁白**：演出已经满座，一位没订到票的观众还在门口等。清辞看了看自己的折叠椅。

`E_S.r4.body.001`

**沈清辞**：要不把我这张给他？我站着也能看。

`E_S.r4.body.002`

**现场**：可是你不是一直想看这一场吗？

`E_S.r4.body.003`

**旁白**：她没立刻回答。台上正在试灯，开场铃快响了。

`E_S.r4.body.004`

**旁白**：你顺着她的目光看过去。她确实很想留下来看。

`E_S.r4.body.005`

### 选择 E_S/ask

问她今晚到底想不想坐下来看。

可选条件：`null`

立即回应：

**许照**：你是真愿意让，还是怕拒绝别人？

`E_S.ask.r4.reply.001`

**旁白**：清辞看看台上，犹豫了一会儿。

`E_S.ask.r4.reply.002`

**沈清辞**：我其实想完整看完。

`E_S.ask.r4.reply.003`

**许照**：那你坐。门口我和工作人员去解释。

`E_S.ask.r4.reply.004`

**旁白**：你们帮观众登记下一场。清辞在开场前坐下，朝你轻轻挥了挥手。你回到工作人员的位置，没有挤占通道。

`E_S.ask.r4.reply.005`

写入与操作：`[{"op":"set","key":"chair_s","value":"kept"}]`

后继：`@schedule`

### 选择 E_S/alternative

一起检查能否加座，没有位置就不硬加。

可选条件：`null`

立即回应：

**旁白**：你们检查布置，没有找到不影响通行的位置。

`E_S.alternative.r4.reply.001`

**沈清辞**：那只能下一场。我去解释，不临时硬塞了。

`E_S.alternative.r4.reply.002`

**旁白**：清辞回来时，灯已经暗下去。她在自己那张椅子坐好，把手机调成静音。

`E_S.alternative.r4.reply.003`

写入与操作：`[{"op":"set","key":"chair_s","value":"checked"}]`

后继：`@schedule`

### 选择 E_S/respect

尊重她这次让座，也约好下一场给自己留座。

可选条件：`null`

立即回应：

**沈清辞**：这次我愿意让。但下一场，我想早点坐进去。

`E_S.respect.r4.reply.001`

**许照**：那现在就记下，别到时候又全排成工作。

`E_S.respect.r4.reply.002`

**旁白**：她拿出手机，把下一场标成私人时间。你没继续劝，只陪她去允许站立的工作人员区域看演出。

`E_S.respect.r4.reply.003`

写入与操作：`[{"op":"set","key":"chair_s","value":"chosen"}]`

后继：`@schedule`


---

## E_L｜见月｜一段她不想拍的告别

类型：`side`。元数据：`{"background":"projection","music":"pulse","next":"@schedule","minSlot":4,"requires":["l02"]}`

### 正文

**旁白**：见月接了一份告别短片，委托人想多留些哭泣的镜头。但其中一位被拍者明确说不愿入镜。

`E_L.r4.body.001`

**林见月**：我已经关掉那台机器了。

`E_L.r4.body.002`

**许照**：那现在卡在哪里？

`E_L.r4.body.003`

**林见月**：片子今晚要交。少了这段，后面的画面接不上。

`E_L.r4.body.004`

**旁白**：她把能用的素材标出来，指给你看。

`E_L.r4.body.005`

**林见月**：得重剪，也得跟对方解释。我不想拍完再赌人家会不会生气。

`E_L.r4.body.006`

### 选择 E_L/sound

“问问能不能只留下她同意公开的话。不愿意就完全不留。”

可选条件：`null`

立即回应：

**旁白**：见月去问，得到的答案是连声音也不想留。她回来告诉你，没有把拒绝包装成已经配合一半。

`E_L.sound.reply.001`

**林见月**：那就不用。拿环境声把转场接起来。

`E_L.sound.reply.002`

**旁白**：你帮她找已经得到许可的空镜。成片没有最激烈的那段哭声，却仍能看出有人在认真告别。

`E_L.sound.reply.003`

**旁白**：委托人不太满意，她把原因说明，没有拿你作挡箭牌。

`E_L.sound.reply.004`

写入与操作：`[{"op":"set","key":"cut_l","value":"bounded"}]`

后继：`@schedule`

### 选择 E_L/work

“我帮你做授权过的整理，你去解释自己的决定。”

可选条件：`null`

立即回应：

**旁白**：你按她标出的范围整理，没有替她删掉自己觉得不好看的东西。见月去谈了十几分钟，回来时看起来有点累。

`E_L.work.reply.001`

**林见月**：能交。以后可能不会再找我。

`E_L.work.reply.002`

**许照**：你现在后悔吗？

`E_L.work.reply.003`

**林见月**：有点怕，但不后悔。

`E_L.work.reply.004`

**旁白**：你们继续把剩下的片子做完。导出还要一会儿。你去倒水，她继续检查最后一遍字幕。

`E_L.work.reply.005`

写入与操作：`[{"op":"set","key":"cut_l","value":"shared"}]`

后继：`@schedule`

### 选择 E_L/hear

“你最怕失去哪一部分？先把那个说清，再看怎么做。”

可选条件：`null`

立即回应：

**林见月**：怕别人觉得我难合作。也怕我自己看着成片，会知道有个人从头到尾都没愿意。

`E_L.hear.reply.001`

**旁白**：她犹豫了一会儿，把那段不愿入镜的素材从时间线上移除。你陪她做完一个更克制的版本，等她自己决定怎样交。

`E_L.hear.reply.002`

**旁白**：最后她还是发出成片与说明，手离开鼠标以后长长呼了一口气。

`E_L.hear.reply.003`

**林见月**：行了。至少今晚不用装没听见。

`E_L.hear.reply.004`

写入与操作：`[{"op":"set","key":"cut_l","value":"heard"}]`

后继：`@schedule`


---

## E_G｜晚棠｜一张退回来的名片

类型：`side`。元数据：`{"background":"street","music":"pulse","next":"@schedule","minSlot":4,"requires":["g02"]}`

### 正文

**旁白**：晚棠从会面室出来，把名片塞回盒里，又抽出来重新放了一遍。

`E_G.r4.body.001`

**顾晚棠**：没谈成。想问就直接问，别一脸怕刺激我的样子。

`E_G.r4.body.002`

**许照**：那……为什么？

`E_G.r4.body.003`

**顾晚棠**：条件不合适。人家也有别的选择。

`E_G.r4.body.004`

**旁白**：她把名片的边角对齐，又对齐了一次。

`E_G.r4.body.005`

**许照**：你再摆，它也不会多长出一笔预算。

`E_G.r4.body.006`

**旁白**：她终于停手，瞥了你一眼。

`E_G.r4.body.007`

**顾晚棠**：有道理。陪我走到路口？

`E_G.r4.body.008`

### 选择 E_G/plain

“走吧。你可以不高兴，不必现在就想一个翻盘。”

可选条件：`null`

立即回应：

**顾晚棠**：听起来像放过自己。

`E_G.plain.reply.001`

**许照**：先放过今晚。

`E_G.plain.reply.002`

**旁白**：她笑了一下，把名片盒扣上。走到路口时，她真的抱怨了几句，又自己承认对方没有欠她这次机会。

`E_G.plain.reply.003`

**旁白**：你只陪她走着。她抱怨到一半，自己又补了一句：其实对方也没做错。

`E_G.plain.reply.004`

**顾晚棠**：好，今天先这样。明天我再决定接不接着谈。

`E_G.plain.reply.005`

写入与操作：`[{"op":"set","key":"loss_g","value":"rest"}]`

后继：`@schedule`

### 选择 E_G/review

“你想复盘就说，我能听；别的我不装懂。”

可选条件：`null`

立即回应：

**旁白**：晚棠说到一处，问你是不是也觉得对方没有诚意。你诚实说自己没看过完整条件，不能判断。

`E_G.review.reply.001`

**旁白**：她停了一下，把那句话收回去。

`E_G.review.reply.002`

**顾晚棠**：对。我又想找一句好听的结论了。

`E_G.review.reply.003`

**旁白**：你们接着聊，谈到她自己也可以调整的地方。聊到路口，她把需要再确认的两项记在手机里。

`E_G.review.reply.004`

写入与操作：`[{"op":"set","key":"loss_g","value":"review"}]`

后继：`@schedule`

### 选择 E_G/ordinary

“路口有家店。去吃点东西？先不谈输赢。”

可选条件：`null`

立即回应：

**顾晚棠**：你这是试着转移话题？

`E_G.ordinary.reply.001`

**许照**：是，也真的有点饿。

`E_G.ordinary.reply.002`

**旁白**：她跟你去看菜单，认真比较了两种并不贵的东西，最后选了其中一种。吃到一半才发现忘了取餐具，你去拿，她留在座位上帮你看包。

`E_G.ordinary.reply.003`

**顾晚棠**：普通晚上也挺费步骤。

`E_G.ordinary.reply.004`

**许照**：是啊。

`E_G.ordinary.reply.005`

**旁白**：她笑了，终于不再把手边每样东西都摆得整整齐齐。

`E_G.ordinary.reply.006`

写入与操作：`[{"op":"set","key":"loss_g","value":"ordinary"}]`

后继：`@schedule`


---

## t11｜把“我知道”换成一个问题

类型：`personal`。元数据：`{"background":"recording","music":"warm","character":"t","stage":11,"minSlot":16}`

### 正文

**旁白**：映雪从外卖袋旁抽出一张揉皱的歌词纸，拍了拍桌子。

`t11.r2.body.001`

**唐映雪**：先别走。有半句卡了一天了，你听听。

`t11.r2.body.002`

**旁白**：前两拍像原著后面的一首歌，第三拍却完全不同。她故意停住，看你。

`t11.r2.body.003`

**唐映雪**：接不上了吧？这半句是刚写的。

`t11.r2.body.004`

**旁白**：她把纸转向你，露出删改了三遍的那一行。

`t11.r2.body.005`

**唐映雪**：不许只说好听。真说不出来，就陪我再唱一遍。

`t11.r2.body.006`

### 选择 t11/ask

“你想让这句唱给谁听？先别管它以后会不会红。”

可选条件：`null`

立即回应：

**许照**：你想唱给谁听？先不问以后会不会红。

`t11.ask.r2.reply.001`

**唐映雪**：一个最近不太敢开口的人。别急着对号入座。

`t11.ask.r2.reply.002`

**旁白**：她唱完，你最喜欢的停顿恰好是她想删的。两个人各哼一遍，谁也没说服谁。

`t11.ask.r2.reply.003`

**唐映雪**：都留着。明天醒来再吵。

`t11.ask.r2.reply.004`

写入与操作：`[{"op":"set","key":"last_question_t","value":"asked"}]`

后继：`完成本次私人日程`

### 选择 t11/taste

“我记得类似的东西，但今天只说我现在听到的。”

可选条件：`null`

立即回应：

**许照**：我记得一点相似的，但今天这段更像在等人回答。

`t11.taste.r2.reply.001`

**旁白**：她低头把“等”圈起来，又摇摇头，在旁边写了一个新的字。

`t11.taste.r2.reply.002`

**唐映雪**：不全听你的。不过这个我用了。

`t11.taste.r2.reply.003`

**旁白**：她把笔帽弹向你，没弹准，落进了空纸杯里。两个人一齐笑出声。

`t11.taste.r2.reply.004`

写入与操作：`[{"op":"set","key":"last_question_t","value":"present"}]`

后继：`完成本次私人日程`

### 选择 t11/listen

“我今晚想先听，不急着给结论。你唱完再问也行。”

可选条件：`null`

立即回应：

**许照**：先唱完。我想听，今天不急着当评委。

`t11.listen.r2.reply.001`

**旁白**：她唱到一半又卡住，皱着鼻子从上一句重新来。你没接原著里的那一句。

`t11.listen.r2.reply.002`

**唐映雪**：无聊了？

`t11.listen.r2.reply.003`

**许照**：没有。等你。

`t11.listen.r2.reply.004`

**旁白**：她低下头，把那半句慢慢唱完，最后一个音轻得只有你听见。

`t11.listen.r2.reply.005`

写入与操作：`[{"op":"set","key":"last_question_t","value":"listened"}]`

后继：`完成本次私人日程`


---

## s11｜她也会把门关早一点

类型：`personal`。元数据：`{"background":"theatre","music":"quiet","character":"s","stage":11,"minSlot":16}`

### 正文

**旁白**：你们还站在门口。清辞喝完最后一口热饮，收到值守人员发来的“已收好”。

`s11.r2.body.001`

**沈清辞**：那我现在就能走了。

`s11.r2.body.002`

**旁白**：她想解释两句交接，解释到一半自己笑了。

`s11.r2.body.003`

**沈清辞**：算了，今天不是工作汇报。你走不走？

`s11.r2.body.004`

### 条件正文 · s11.r2.exit

条件：`{"eq":["s_left_operator",true]}`

**旁白**：她只是受邀回来看看，锁门由接班的人负责。旧钥匙已经不在她包里。

`s11.r2.exit.001`

### 条件正文 · s11.r2.in

条件：`{"ne":["s_left_operator",true]}`

**旁白**：她把当晚收尾交给已经确认接手的同事，没有擅自停掉别人的预约。

`s11.r2.in.001`

### 选择 s11/leave

“那就关吧。我和你走一段。”

可选条件：`null`

立即回应：

**许照**：走。我发现一家还没关的甜品店。

`s11.leave.r2.reply.001`

**旁白**：她跟现场负责人道别，出门后先你一步转了弯。

`s11.leave.r2.reply.002`

**沈清辞**：那个我知道。今天我带路。

`s11.leave.r2.reply.003`

写入与操作：`[{"op":"set","key":"door_s","value":"leave"}]`

后继：`完成本次私人日程`

### 选择 s11/self

“我也想早点结束今天。不是只有你需要休息。”

可选条件：`null`

立即回应：

**许照**：我也早想结束今天了。不是只有你会累。

`s11.self.r2.reply.001`

**沈清辞**：那你还装。

`s11.self.r2.reply.002`

**旁白**：她把步子放慢，跟你并排走。两个人都没有再找一句工作话题。

`s11.self.r2.reply.003`

写入与操作：`[{"op":"set","key":"door_s","value":"mutual"}]`

后继：`完成本次私人日程`

### 选择 s11/wait

等她确认交接，再一起走

可选条件：`null`

立即回应：

**许照**：你把那条消息回完，我就在这儿。

`s11.wait.r4.reply.001`

**旁白**：她给负责人回完，快步跟上来。

`s11.wait.r4.reply.002`

**沈清辞**：好了。再来消息也等明天。

`s11.wait.r4.reply.003`

写入与操作：`[{"op":"set","key":"door_s","value":"wait"}]`

后继：`完成本次私人日程`


---

## l11｜她又想去了一个新地方

类型：`personal`。元数据：`{"background":"projection","music":"quiet","character":"l","stage":11,"minSlot":16}`

### 正文

**旁白**：见月从包里抽出旧笔记，摊到你面前。里面夹着一张没用过的行程单。

`l11.r2.body.001`

**许照**：这个地方，现在还想去？

`l11.r2.body.002`

**林见月**：想。不过以前想拍风景，现在想拍凌晨在那里开门的人。

`l11.r2.body.003`

**旁白**：她用笔添上一个新标题，写完又侧过头看你。

`l11.r2.body.004`

**林见月**：你会不会觉得，我又改主意了？

`l11.r2.body.005`

### 选择 l11/change

“改啊。先给我讲你现在想拍什么。”

可选条件：`null`

立即回应：

**许照**：改啊。比起按原计划勉强去，我更想听你现在想拍什么。

`l11.change.r4.reply.001`

**林见月**：那先看这一条。

`l11.change.r4.reply.002`

**旁白**：她翻开最纠结的一页，三条路线挤在一起。你看见其中一条旁边画了小星星。

`l11.change.r4.reply.003`

**许照**：你已经挑好了吧？

`l11.change.r4.reply.004`

**林见月**：有一点。就一点。

`l11.change.r4.reply.005`

写入与操作：`[{"op":"set","key":"newwish_l","value":"change"}]`

后继：`完成本次私人日程`

### 选择 l11/miss

“我会怀念原来的想法，但想先听现在的。”

可选条件：`null`

立即回应：

**许照**：原来那个我也挺想看。不过先讲新的，我听着。

`l11.miss.r2.reply.001`

**旁白**：她点头，没有把旧行程扔掉，而是在旁边写上“以后”。

`l11.miss.r2.reply.002`

**林见月**：那就都留着。不用今晚把一辈子的片子拍完。

`l11.miss.r2.reply.003`

写入与操作：`[{"op":"set","key":"newwish_l","value":"honest"}]`

后继：`完成本次私人日程`

### 选择 l11/ask

“你现在最在意的是什么？我暂时不猜了。”

可选条件：`null`

立即回应：

**许照**：现在最想拍什么？这次我不猜。

`l11.ask.r2.reply.001`

**林见月**：开门的人。不在台上，也不负责漂亮。可少了他，故事根本开始不了。

`l11.ask.r2.reply.002`

**许照**：听着有点熟。

`l11.ask.r2.reply.003`

**旁白**：她看了你一眼，把笔记合上。

`l11.ask.r2.reply.004`

**林见月**：只是题材。你先别跑去写主演简介。

`l11.ask.r2.reply.005`

写入与操作：`[{"op":"set","key":"newwish_l","value":"ask"}]`

后继：`完成本次私人日程`


---

## g11｜没带来任何好消息

类型：`personal`。元数据：`{"background":"terrace","music":"glass","character":"g","stage":11,"minSlot":16}`

### 正文

**旁白**：饭吃到一半，晚棠把手机扣过去，终于讲起今天那件烦心事。

`g11.body.001`

**顾晚棠**：先说好，不是什么好消息。工作没多赚，一下午还白跑了一趟。

`g11.body.002`

**旁白**：她拨了一下盘子边的葱，没看你。这个开场显然比谈工作难。

`g11.body.003`

**旁白**：你把快空的水壶放回桌边，等她抬头。

`g11.body.004`

**顾晚棠**：别那样看我。想说就说。

`g11.body.005`

### 选择 g11/person

“我今天又不是来听进展汇报。想见你，就来了。”

可选条件：`null`

立即回应：

**顾晚棠**：这句有点好听。

`g11.person.reply.001`

**许照**：也是真的。

`g11.person.reply.002`

**旁白**：她看了你一会儿，把那盘不太喜欢的菜推过来，坦白自己点错了。

`g11.person.reply.003`

**顾晚棠**：别嫌弃，帮我消灭一点。我请下一道。

`g11.person.reply.004`

**旁白**：你们重新点了一份热汤，她也终于肯细说那趟白跑的路。

`g11.person.reply.005`

写入与操作：`[{"op":"set","key":"nothing_g","value":"person"}]`

后继：`完成本次私人日程`

### 选择 g11/mutual

“我今天也一般。不如都不装，过个普通晚上。”

可选条件：`null`

立即回应：

**旁白**：晚棠先笑了，说你怎么连这件事也要找队友。你承认一个人硬撑挺累。

`g11.mutual.reply.001`

**顾晚棠**：行。那我也不负责让你今晚开心。

`g11.mutual.reply.002`

**许照**：不用负责。一起待着就好。

`g11.mutual.reply.003`

**旁白**：你们聊了些没有结论的小事，谁说烦，另一个就听一会儿，直到服务员来收空盘子，你们才发现已经聊了很久。

`g11.mutual.reply.004`

写入与操作：`[{"op":"set","key":"nothing_g","value":"mutual"}]`

后继：`完成本次私人日程`

### 选择 g11/quiet

“那今天少说一点。你想我陪着，还是先一个人静静？”

可选条件：`null`

立即回应：

**旁白**：她没有马上回答。你真的等了一会儿，她才拉开旁边的椅子。

`g11.quiet.reply.001`

**顾晚棠**：先坐。太累的时候我可能不太会招呼你。

`g11.quiet.reply.002`

**许照**：我会自己倒水。

`g11.quiet.reply.003`

**旁白**：她笑了，靠在椅背上。她安静坐了一会儿，终于又开口，说那趟白跑的路上遇到了一只很凶的小狗。

`g11.quiet.reply.004`

写入与操作：`[{"op":"set","key":"nothing_g","value":"quiet"}]`

后继：`完成本次私人日程`


---

## REOPEN_t｜今天，再认真约你一次

类型：`reopen`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"t"}`

### 正文

**旁白**：映雪接受了你重新见面谈谈的邀请，但没有把这当成已经答应交往。

`REOPEN_t.r4.body.001`

**唐映雪**：看到你消息了。今天又来约我，是想约会，还是想一起听歌？

`REOPEN_t.r4.body.002`

### 选择 REOPEN_t/open

愿意认真约会；其他关系也会如实说。

可选条件：`{"canDate":"t"}`

立即回应：

**许照**：我想认真约会。但我还没有准备好只与一个人交往，这点得先说清。

`REOPEN_t.open.r1.reply.001`

**唐映雪**：有别人，就当面告诉我。新增安排，我们再谈。

`REOPEN_t.open.r1.reply.002`

**唐映雪**：那说好。下次别只在台下偷看，我会去找你。

`REOPEN_t.open.r1.reply.003`

写入与操作：`[{"op":"set","key":"active_t","value":true},{"op":"set","key":"scope_t","value":"open"},{"op":"set","key":"pursued_t","value":true},{"op":"set","key":"healthy_reopen_t","value":true},{"op":"disclose","character":"t"},{"op":"cooldownReopen","character":"t"},{"op":"set","key":"commitment_t","value":"dating"}]`

后继：`@schedule`

### 选择 REOPEN_t/exclusive

我准备好了，想只和你交往。

可选条件：`{"canDate":"t"}`

立即回应：

**唐映雪**：这句话我会当真。

`REOPEN_t.exclusive.r1.reply.001`

**旁白**：她看着你，等你确认了一次，才把下次见面的时间写下。

`REOPEN_t.exclusive.r1.reply.002`

写入与操作：`[{"op":"set","key":"active_t","value":true},{"op":"set","key":"scope_t","value":"exclusive"},{"op":"set","key":"pursued_t","value":true},{"op":"set","key":"healthy_reopen_t","value":true},{"op":"set","key":"promised_t","value":true},{"op":"cooldownReopen","character":"t"},{"op":"set","key":"commitment_t","value":"relationship"}]`

后继：`@schedule`

### 选择 REOPEN_t/wait

我仍想慢一点，这次先不定关系。

可选条件：`null`

立即回应：

**唐映雪**：可以。歌单先不替你挑，今天把这首听完，别急着给我们写结尾。

`REOPEN_t.wait.r1.reply.001`

写入与操作：`[{"op":"cooldownReopen","character":"t"}]`

后继：`@schedule`

### 选择 REOPEN_t/friend

我想清楚了，以朋友相处。

可选条件：`null`

立即回应：

**许照**：我认真想过了，还是想以朋友相处。

`REOPEN_t.friend.r4.reply.001`

**唐映雪**：知道了，那就按朋友来。

`REOPEN_t.friend.r4.reply.002`

**旁白**：你们重新说清了这次见面的意思，没有沿用原来的暧昧邀请。

`REOPEN_t.friend.r4.reply.003`

写入与操作：`[{"op":"set","key":"scope_t","value":"friend"},{"op":"set","key":"active_t","value":false},{"op":"set","key":"pursued_t","value":false},{"op":"cooldownReopen","character":"t"}]`

后继：`@schedule`


---

## OPEN_CLEAR_t｜把借来的名字还回去

类型：`source_repair`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"t"}`

### 正文

**旁白**：你约阿衡和唐映雪一起在收工后说两分钟。

`OPEN_CLEAR_t.r1.body.001`

**阿衡**：蓝标是你自己找到的。我没提前给你消息。

`OPEN_CLEAR_t.r1.body.002`

**唐映雪**：我听你当面说。

`OPEN_CLEAR_t.r1.body.003`

### 选择 OPEN_CLEAR_t/correct

是我编的。阿衡没有说过，我更正。

可选条件：`null`

立即回应：

**许照**：消息来源是我编的。以后不借阿衡的名字。

`OPEN_CLEAR_t.correct.r1.reply.001`

**阿衡**：行，这件事对清了。

`OPEN_CLEAR_t.correct.r1.reply.002`

**唐映雪**：我生气的是你把别人拉进来，不是你没把全部秘密都告诉我。下次直接说不想讲。

`OPEN_CLEAR_t.correct.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_lie_t","value":false},{"op":"set","key":"opening_resolution_t","value":"corrected_later"},{"op":"learnFact","character":"t","fact":"source_lie_corrected"}]`

后继：`@schedule`

### 选择 OPEN_CLEAR_t/leave

现在还说不好，先不要求她信我。

可选条件：`null`

立即回应：

**唐映雪**：那等你愿意讲清这一句，再来。

`OPEN_CLEAR_t.leave.r1.reply.001`

**旁白**：这次没有把问题解决。阿衡先回去工作，你们也没有继续谈新的私人邀约。

`OPEN_CLEAR_t.leave.r1.reply.002`

写入与操作：`[]`

后继：`@schedule`


---

## REOPEN_s｜今天，再认真约你一次

类型：`reopen`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"s"}`

### 正文

**旁白**：清辞接受了你重新见面谈谈的邀请，但没有把这当成已经答应交往。

`REOPEN_s.r4.body.001`

**沈清辞**：这次我有时间。你想按什么方式见面，先告诉我。

`REOPEN_s.r4.body.002`

### 选择 REOPEN_s/open

愿意认真约会；其他关系也会如实说。

可选条件：`{"canDate":"s"}`

立即回应：

**许照**：我想认真约会。但我还没有准备好只与一个人交往，这点得先说清。

`REOPEN_s.open.r1.reply.001`

**沈清辞**：有别人，就当面告诉我。新增安排，我们再谈。

`REOPEN_s.open.r1.reply.002`

**沈清辞**：好。下次时间我们一起定，不是我单方面通知。

`REOPEN_s.open.r1.reply.003`

写入与操作：`[{"op":"set","key":"active_s","value":true},{"op":"set","key":"scope_s","value":"open"},{"op":"set","key":"pursued_s","value":true},{"op":"set","key":"healthy_reopen_s","value":true},{"op":"disclose","character":"s"},{"op":"cooldownReopen","character":"s"},{"op":"set","key":"commitment_s","value":"dating"}]`

后继：`@schedule`

### 选择 REOPEN_s/exclusive

我准备好了，想只和你交往。

可选条件：`{"canDate":"s"}`

立即回应：

**沈清辞**：这句话我会当真。

`REOPEN_s.exclusive.r1.reply.001`

**旁白**：她看着你，等你确认了一次，才把下次见面的时间写下。

`REOPEN_s.exclusive.r1.reply.002`

写入与操作：`[{"op":"set","key":"active_s","value":true},{"op":"set","key":"scope_s","value":"exclusive"},{"op":"set","key":"pursued_s","value":true},{"op":"set","key":"healthy_reopen_s","value":true},{"op":"set","key":"promised_s","value":true},{"op":"cooldownReopen","character":"s"},{"op":"set","key":"commitment_s","value":"relationship"}]`

后继：`@schedule`

### 选择 REOPEN_s/wait

我仍想慢一点，这次先不定关系。

可选条件：`null`

立即回应：

**沈清辞**：慢一点也行。今天先把这杯茶喝完；下次是不是约会，我们重新说清楚。

`REOPEN_s.wait.r1.reply.001`

写入与操作：`[{"op":"cooldownReopen","character":"s"}]`

后继：`@schedule`

### 选择 REOPEN_s/friend

我想清楚了，以朋友相处。

可选条件：`null`

立即回应：

**许照**：我认真想过了，还是想以朋友相处。

`REOPEN_s.friend.r4.reply.001`

**沈清辞**：知道了，那就按朋友来。

`REOPEN_s.friend.r4.reply.002`

**旁白**：你们重新说清了这次见面的意思，没有沿用原来的暧昧邀请。

`REOPEN_s.friend.r4.reply.003`

写入与操作：`[{"op":"set","key":"scope_s","value":"friend"},{"op":"set","key":"active_s","value":false},{"op":"set","key":"pursued_s","value":false},{"op":"cooldownReopen","character":"s"}]`

后继：`@schedule`


---

## OPEN_CLEAR_s｜把借来的名字还回去

类型：`source_repair`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"s"}`

### 正文

**旁白**：你约阿衡和沈清辞一起在收工后说两分钟。

`OPEN_CLEAR_s.r1.body.001`

**阿衡**：蓝标是你自己找到的。我没提前给你消息。

`OPEN_CLEAR_s.r1.body.002`

**沈清辞**：我听你当面说。

`OPEN_CLEAR_s.r1.body.003`

### 选择 OPEN_CLEAR_s/correct

是我编的。阿衡没有说过，我更正。

可选条件：`null`

立即回应：

**许照**：消息来源是我编的。以后不借阿衡的名字。

`OPEN_CLEAR_s.correct.r1.reply.001`

**阿衡**：行，这件事对清了。

`OPEN_CLEAR_s.correct.r1.reply.002`

**沈清辞**：这句话，现在和阿衡说的一致了。之后我还是看你做什么。

`OPEN_CLEAR_s.correct.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_lie_s","value":false},{"op":"set","key":"opening_resolution_s","value":"corrected_later"},{"op":"learnFact","character":"s","fact":"source_lie_corrected"}]`

后继：`@schedule`

### 选择 OPEN_CLEAR_s/leave

现在还说不好，先不要求她信我。

可选条件：`null`

立即回应：

**沈清辞**：那等你愿意讲清这一句，再来。

`OPEN_CLEAR_s.leave.r1.reply.001`

**旁白**：这次没有把问题解决。阿衡先回去工作，你们也没有继续谈新的私人邀约。

`OPEN_CLEAR_s.leave.r1.reply.002`

写入与操作：`[]`

后继：`@schedule`


---

## REOPEN_l｜今天，再认真约你一次

类型：`reopen`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"l"}`

### 正文

**旁白**：见月接受了你重新见面谈谈的邀请，但没有把这当成已经答应交往。

`REOPEN_l.r4.body.001`

**林见月**：我收到邀约了。这次想得比上次清楚一点了吗？

`REOPEN_l.r4.body.002`

### 选择 REOPEN_l/open

愿意认真约会；其他关系也会如实说。

可选条件：`{"canDate":"l"}`

立即回应：

**许照**：我想认真约会。但我还没有准备好只与一个人交往，这点得先说清。

`REOPEN_l.open.r1.reply.001`

**林见月**：有别人，就当面告诉我。新增安排，我们再谈。

`REOPEN_l.open.r1.reply.002`

**林见月**：那我把日期写上。你名字想写左边还是右边？

`REOPEN_l.open.r1.reply.003`

写入与操作：`[{"op":"set","key":"active_l","value":true},{"op":"set","key":"scope_l","value":"open"},{"op":"set","key":"pursued_l","value":true},{"op":"set","key":"healthy_reopen_l","value":true},{"op":"disclose","character":"l"},{"op":"cooldownReopen","character":"l"},{"op":"set","key":"commitment_l","value":"dating"}]`

后继：`@schedule`

### 选择 REOPEN_l/exclusive

我准备好了，想只和你交往。

可选条件：`{"canDate":"l"}`

立即回应：

**林见月**：这句话我会当真。

`REOPEN_l.exclusive.r1.reply.001`

**旁白**：她看着你，等你确认了一次，才把下次见面的时间写下。

`REOPEN_l.exclusive.r1.reply.002`

写入与操作：`[{"op":"set","key":"active_l","value":true},{"op":"set","key":"scope_l","value":"exclusive"},{"op":"set","key":"pursued_l","value":true},{"op":"set","key":"healthy_reopen_l","value":true},{"op":"set","key":"promised_l","value":true},{"op":"cooldownReopen","character":"l"},{"op":"set","key":"commitment_l","value":"relationship"}]`

后继：`@schedule`

### 选择 REOPEN_l/wait

我仍想慢一点，这次先不定关系。

可选条件：`null`

立即回应：

**林见月**：好。这段先留在草稿里。下次真想见我，直接说，不用猜我有没有空。

`REOPEN_l.wait.r1.reply.001`

写入与操作：`[{"op":"cooldownReopen","character":"l"}]`

后继：`@schedule`

### 选择 REOPEN_l/friend

我想清楚了，以朋友相处。

可选条件：`null`

立即回应：

**许照**：我认真想过了，还是想以朋友相处。

`REOPEN_l.friend.r4.reply.001`

**林见月**：知道了，那就按朋友来。

`REOPEN_l.friend.r4.reply.002`

**旁白**：你们重新说清了这次见面的意思，没有沿用原来的暧昧邀请。

`REOPEN_l.friend.r4.reply.003`

写入与操作：`[{"op":"set","key":"scope_l","value":"friend"},{"op":"set","key":"active_l","value":false},{"op":"set","key":"pursued_l","value":false},{"op":"cooldownReopen","character":"l"}]`

后继：`@schedule`


---

## OPEN_CLEAR_l｜把借来的名字还回去

类型：`source_repair`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"l"}`

### 正文

**旁白**：你约阿衡和林见月一起在收工后说两分钟。

`OPEN_CLEAR_l.r1.body.001`

**阿衡**：蓝标是你自己找到的。我没提前给你消息。

`OPEN_CLEAR_l.r1.body.002`

**林见月**：我听你当面说。

`OPEN_CLEAR_l.r1.body.003`

### 选择 OPEN_CLEAR_l/correct

是我编的。阿衡没有说过，我更正。

可选条件：`null`

立即回应：

**许照**：消息来源是我编的。以后不借阿衡的名字。

`OPEN_CLEAR_l.correct.r1.reply.001`

**阿衡**：行，这件事对清了。

`OPEN_CLEAR_l.correct.r1.reply.002`

**林见月**：以后不想解释，就说暂时不想解释。别给镜头外的人编一句台词。

`OPEN_CLEAR_l.correct.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_lie_l","value":false},{"op":"set","key":"opening_resolution_l","value":"corrected_later"},{"op":"learnFact","character":"l","fact":"source_lie_corrected"}]`

后继：`@schedule`

### 选择 OPEN_CLEAR_l/leave

现在还说不好，先不要求她信我。

可选条件：`null`

立即回应：

**林见月**：那等你愿意讲清这一句，再来。

`OPEN_CLEAR_l.leave.r1.reply.001`

**旁白**：这次没有把问题解决。阿衡先回去工作，你们也没有继续谈新的私人邀约。

`OPEN_CLEAR_l.leave.r1.reply.002`

写入与操作：`[]`

后继：`@schedule`


---

## REOPEN_g｜今天，再认真约你一次

类型：`reopen`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"g"}`

### 正文

**旁白**：晚棠接受了你重新见面谈谈的邀请，但没有把这当成已经答应交往。

`REOPEN_g.r4.body.001`

**顾晚棠**：行，我来了。别让我猜，你今天想约朋友，还是想约会？

`REOPEN_g.r4.body.002`

### 选择 REOPEN_g/open

愿意认真约会；其他关系也会如实说。

可选条件：`{"canDate":"g"}`

立即回应：

**许照**：我想认真约会。但我还没有准备好只与一个人交往，这点得先说清。

`REOPEN_g.open.r1.reply.001`

**顾晚棠**：有别人，就当面告诉我。新增安排，我们再谈。

`REOPEN_g.open.r1.reply.002`

**顾晚棠**：好。今天不是试用期，你也不用假装什么都知道。

`REOPEN_g.open.r1.reply.003`

写入与操作：`[{"op":"set","key":"active_g","value":true},{"op":"set","key":"scope_g","value":"open"},{"op":"set","key":"pursued_g","value":true},{"op":"set","key":"healthy_reopen_g","value":true},{"op":"disclose","character":"g"},{"op":"cooldownReopen","character":"g"},{"op":"set","key":"commitment_g","value":"dating"}]`

后继：`@schedule`

### 选择 REOPEN_g/exclusive

我准备好了，想只和你交往。

可选条件：`{"canDate":"g"}`

立即回应：

**顾晚棠**：这句话我会当真。

`REOPEN_g.exclusive.r1.reply.001`

**旁白**：她看着你，等你确认了一次，才把下次见面的时间写下。

`REOPEN_g.exclusive.r1.reply.002`

写入与操作：`[{"op":"set","key":"active_g","value":true},{"op":"set","key":"scope_g","value":"exclusive"},{"op":"set","key":"pursued_g","value":true},{"op":"set","key":"healthy_reopen_g","value":true},{"op":"set","key":"promised_g","value":true},{"op":"cooldownReopen","character":"g"},{"op":"set","key":"commitment_g","value":"relationship"}]`

后继：`@schedule`

### 选择 REOPEN_g/wait

我仍想慢一点，这次先不定关系。

可选条件：`null`

立即回应：

**顾晚棠**：可以。今晚就认真吃顿饭，下一步谁都别替谁默认。

`REOPEN_g.wait.r1.reply.001`

写入与操作：`[{"op":"cooldownReopen","character":"g"}]`

后继：`@schedule`

### 选择 REOPEN_g/friend

我想清楚了，以朋友相处。

可选条件：`null`

立即回应：

**许照**：我认真想过了，还是想以朋友相处。

`REOPEN_g.friend.r4.reply.001`

**顾晚棠**：知道了，那就按朋友来。

`REOPEN_g.friend.r4.reply.002`

**旁白**：你们重新说清了这次见面的意思，没有沿用原来的暧昧邀请。

`REOPEN_g.friend.r4.reply.003`

写入与操作：`[{"op":"set","key":"scope_g","value":"friend"},{"op":"set","key":"active_g","value":false},{"op":"set","key":"pursued_g","value":false},{"op":"cooldownReopen","character":"g"}]`

后继：`@schedule`


---

## OPEN_CLEAR_g｜把借来的名字还回去

类型：`source_repair`。元数据：`{"background":"backstage","music":"none","next":"@schedule","character":"g"}`

### 正文

**旁白**：你约阿衡和顾晚棠一起在收工后说两分钟。

`OPEN_CLEAR_g.r1.body.001`

**阿衡**：蓝标是你自己找到的。我没提前给你消息。

`OPEN_CLEAR_g.r1.body.002`

**顾晚棠**：我听你当面说。

`OPEN_CLEAR_g.r1.body.003`

### 选择 OPEN_CLEAR_g/correct

是我编的。阿衡没有说过，我更正。

可选条件：`null`

立即回应：

**许照**：消息来源是我编的。以后不借阿衡的名字。

`OPEN_CLEAR_g.correct.r1.reply.001`

**阿衡**：行，这件事对清了。

`OPEN_CLEAR_g.correct.r1.reply.002`

**顾晚棠**：你可以保留来路，别替别人开口。今晚那次见面已经取消，下一次重新约。

`OPEN_CLEAR_g.correct.r1.reply.003`

写入与操作：`[{"op":"set","key":"opening_lie_g","value":false},{"op":"set","key":"opening_resolution_g","value":"corrected_later"},{"op":"learnFact","character":"g","fact":"source_lie_corrected"}]`

后继：`@schedule`

### 选择 OPEN_CLEAR_g/leave

现在还说不好，先不要求她信我。

可选条件：`null`

立即回应：

**顾晚棠**：那等你愿意讲清这一句，再来。

`OPEN_CLEAR_g.leave.r1.reply.001`

**旁白**：这次没有把问题解决。阿衡先回去工作，你们也没有继续谈新的私人邀约。

`OPEN_CLEAR_g.leave.r1.reply.002`

写入与操作：`[]`

后继：`@schedule`


---

## LU_MOVE1｜他订了下一次录音棚

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@schedule"}`

### 正文

**旁白**：陆景行把下一次录音棚的确认单发进群，还找另一位编曲准备了备用方案。

`LU_MOVE1.r4.body.001`

**陆景行**：首演不能每次靠临场补救。下一版得提前排练和核对。

`LU_MOVE1.r4.body.002`

**旁白**：他的排练表排到了深夜。你抢先救过一次场，却没让他的工作停下来。

`LU_MOVE1.r4.body.003`

**陆景行**：要合作就把时间说准。各做各的也行，别到最后一刻才发现撞棚。

`LU_MOVE1.r4.body.004`

### 选择 LU_MOVE1/share

报上自己的空档，参加共同试播

可选条件：`null`

立即回应：

**旁白**：你把能来协助的时段发进群，说明可以帮忙整理版本和记录。陆景行确认分工，映雪另挑了能到的半小时。

`LU_MOVE1.share.r4.reply.001`

**陆景行**：好。会和不会的先说清，进棚再教来不及。

`LU_MOVE1.share.r4.reply.002`

写入与操作：`[{"op":"set","key":"lu_slot","value":"shared"},{"op":"set","key":"rival_move1","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE1/own

不挤他的档期，去借午后的空棚，留自己的版本。

可选条件：`null`

立即回应：

**旁白**：你给场务打电话，借到了设备简单的午后时段。你记下取设备的时间，答应录完按时归还。

`LU_MOVE1.own.r2.reply.001`

**陆景行**：行。下次各自拿作品来。

`LU_MOVE1.own.r2.reply.002`

写入与操作：`[{"op":"set","key":"lu_slot","value":"own"},{"op":"set","key":"rival_move1","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE1/skip

这次不抢棚。先看他的新版本，不临时许诺。

可选条件：`null`

立即回应：

**旁白**：陆景行照常带团队进棚。傍晚，他发来新版本的第一段，不等你点头才继续。

`LU_MOVE1.skip.r2.reply.001`

写入与操作：`[{"op":"set","key":"lu_slot","value":"none"},{"op":"set","key":"rival_move1","value":true}]`

后继：`@schedule`


---

## EXEC_t｜把十七秒，做成她能发的一首

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"XU_WORK","clock":{"day":7,"time":"21:30"}}`

### 正文

**旁白**：试播日到了。宣发还在等确认，映雪带着原稿和备份硬盘来到控台边。

`EXEC_t.r2.body.001`

**唐映雪**：今天真做一件。别让我回去又只多一条“加油”。

`EXEC_t.r2.body.002`

### 条件正文 · EXEC_t.r2.plan_independent

条件：`{"eq":["plan_t","independent"]}`

**唐映雪**：上次说先发自己的版本，我回去把硬盘翻出来了。今天别只听好听的，杂音也给我挑。

`EXEC_t.r2.plan_independent.001`

### 条件正文 · EXEC_t.r2.plan_negotiated

条件：`{"eq":["plan_t","negotiated"]}`

**唐映雪**：我把名字圈了三遍。他们要还能漏，今天你就看我怎么念。

`EXEC_t.r2.plan_negotiated.001`

### 条件正文 · EXEC_t.r2.plan_duet

条件：`{"eq":["plan_t","chosen_duet"]}`

**唐映雪**：景行送了两个调过来。我挑了更难唱的那个——好听，没办法。

`EXEC_t.r2.plan_duet.001`

### 条件正文 · EXEC_t.r2.plan_pause

条件：`{"eq":["plan_t","intentional_pause"]}`

**唐映雪**：我提过暂缓，还没等到正式撤下。今天盯着他们处理完，我才能睡踏实。

`EXEC_t.r2.plan_pause.001`

### 条件正文 · EXEC_t.r2.plan_unchanged

条件：`{"eq":["plan_t","restricted"]}`

**唐映雪**：那版我自己谈了一轮，没全谈下来。你今天来，还来得及再试。

`EXEC_t.r2.plan_unchanged.001`

### 选择 EXEC_t/master

陪她导出独立母带，核对原作与个人发布许可。

可选条件：`{"any":[{"eq":["plan_t","independent"]},{"eq":["t_has_master",true]},{"eq":["lu_slot","own"]}]}`

立即回应：

**旁白**：阿衡负责录音和导出，你逐段对照试听记录。映雪重唱尾句，确认作品和发布许可后，完整母带终于导出。

`EXEC_t.master.r4.reply.001`

**唐映雪**：这份能从头唱到尾了。你再听最后一句，我想确认没爆音。

`EXEC_t.master.r4.reply.002`

写入与操作：`[{"op":"set","key":"exec_t","value":"master"},{"op":"set","key":"career_t","value":"independent"},{"op":"set","key":"proof_t_master","value":true},{"op":"set","key":"t_has_master","value":true}]`

后继：`XU_WORK`

### 选择 EXEC_t/terms

盯住试播屏幕，要求当场补上原作名和独唱时段。

可选条件：`null`

立即回应：

**旁白**：屏幕第一次仍漏了名字。你叫停试播，映雪亲自念出要改的那一行。第二遍，署名和时段都在。

`EXEC_t.terms.r2.reply.001`

**唐映雪**：现在，我才敢转发。

`EXEC_t.terms.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_t","value":"terms"},{"op":"set","key":"career_t","value":"negotiated"},{"op":"set","key":"proof_t_terms","value":true}]`

后继：`XU_WORK`

### 选择 EXEC_t/duet

一起完成新合唱，分轨保存各自真正做过的部分。

可选条件：`{"any":[{"eq":["plan_t","chosen_duet"]},{"eq":["lu_slot","shared"]}]}`

立即回应：

**旁白**：陆景行建议降半音，映雪试过后还是选了原调。阿衡负责录制，你记下两个人确认的段落，再按分工保存文件。

`EXEC_t.duet.r4.reply.001`

**唐映雪**：就这版。和声是他改的，主旋律还是我的，别写混了。

`EXEC_t.duet.r4.reply.002`

写入与操作：`[{"op":"set","key":"exec_t","value":"duet"},{"op":"set","key":"career_t","value":"chosen_duet"},{"op":"set","key":"proof_t_duet","value":true}]`

后继：`XU_WORK`

### 选择 EXEC_t/hold

陪她撤下待发队列，保存草稿，暂时不公开。

可选条件：`null`

立即回应：

**旁白**：你们等到管理员真的撤掉预告，才关电脑。映雪把备份盘装好，反而轻松地哼起跑调的旋律。

`EXEC_t.hold.r2.reply.001`

**唐映雪**：今天不发。唱着玩总行吧。

`EXEC_t.hold.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_t","value":"hold"},{"op":"set","key":"career_t","value":"intentional_pause"},{"op":"set","key":"proof_t_hold","value":true}]`

后继：`XU_WORK`

### 选择 EXEC_t/none

不参加这次试播，提前说明自己另有安排。

可选条件：`null`

立即回应：

**旁白**：映雪独自去了一趟。她带回更短的版本和没改全的署名，告诉你正式发布前还会再争。

`EXEC_t.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_t","value":"none"},{"op":"set","key":"career_t","value":"restricted"},{"op":"set","key":"proof_t_restricted","value":true}]`

后继：`XU_WORK`


---

## EXEC_s｜三排椅子，先坐进人

类型：`common`。元数据：`{"background":"diner","music":"warm","decisionSteps":[{"id":"trial","label":"陪清辞拿现场结果说话，不靠纸上热情","options":["trial","slots","venue"],"reply":[{"speaker":"S","text":"我能扛难听的反馈，就怕我们连一次实际试场都不做。","id":"EXEC_s.v413.trial.reply.001","textHash":"1f0f9325c1a948c1"}],"after":[{"speaker":"N","text":"三排椅子还没有摆好，场地、撤场和卖票都得落成一次行动。","id":"EXEC_s.v413.trial.after.001","textHash":"4368b01cd5034346"}]},{"id":"handover","label":"不再继续试场，至少把责任交清","options":["handover","none"],"reply":[{"speaker":"S","text":"你不做也行，告诉我边界。只要别留一句“我以为你会来”。","id":"EXEC_s.v413.handover.reply.001","textHash":"936ae07921db774b"}],"after":[{"speaker":"N","text":"交接和缺席不是同一件事；她已经把待签收的材料准备好。","id":"EXEC_s.v413.handover.after.001","textHash":"59b02fbc8b1e67ea"}]}],"next":"LU_MOVE2","clock":{"day":9,"time":"10:00"}}`

### 正文

**旁白**：清辞没有再给你发方案，而是发来一张现场照片：三排椅子只搬好了一排。

`EXEC_s.r2.body.001`

**沈清辞**：纸上都能开。今天试一次，才知道哪里真会卡住。

`EXEC_s.r2.body.002`

### 条件正文 · EXEC_s.r2.plan_cooperative

条件：`{"eq":["plan_s","cooperative"]}`

**沈清辞**：三个人说愿意来帮忙。我没把他们算成免费劳动力，今天先看看能不能真的排开。

`EXEC_s.r2.plan_cooperative.001`

### 条件正文 · EXEC_s.r2.plan_shared

条件：`{"eq":["plan_s","shared_use"]}`

**沈清辞**：白天排练、晚上演出，纸上挺美。今晚看看换场要搬几趟椅子。

`EXEC_s.r2.plan_shared.001`

### 条件正文 · EXEC_s.r2.plan_residency

条件：`{"eq":["plan_s","residency"]}`

**沈清辞**：先看备选的小场地。灯、音箱、能开多久，都得现场试过。

`EXEC_s.r2.plan_residency.001`

### 条件正文 · EXEC_s.r2.plan_exit

条件：`{"eq":["plan_s","chosen_exit"]}`

**沈清辞**：我列了交接单，写到最后一行反而松了口气。今天先把钥匙交明白。

`EXEC_s.r2.plan_exit.001`

### 条件正文 · EXEC_s.r2.plan_leave

条件：`{"eq":["plan_s","displaced"]}`

**沈清辞**：那晚我自己撑了一场，累得连椅子都没收完。今天不想再逞强了。

`EXEC_s.r2.plan_leave.001`

### 选择 EXEC_s/trial

到场跑一次小演出：卖票、清点成本、自己搬完最后一排。

可选条件：`{"any":[{"eq":["plan_s","cooperative"]},{"eq":["career_extra","own"]},{"eq":["career_extra","team"]}]}`

立即回应：

**旁白**：你搬错了一次出口方向，清辞笑着让你重来。最后十七位观众坐下，成本表第一次填进了实际数字。

`EXEC_s.trial.r2.reply.001`

**沈清辞**：没赚多少。但这次不是靠我说它能成。

`EXEC_s.trial.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_s","value":"trial"},{"op":"set","key":"career_s","value":"cooperative"},{"op":"set","key":"proof_s_trial","value":true}]`

后继：`LU_MOVE2`

### 选择 EXEC_s/slots

跟巡演团队实际做撤场和进场计时。

可选条件：`null`

立即回应：

**旁白**：原定二十分钟的撤场用了四十分钟。你把秒表放上桌，清辞据此多争到半小时。

`EXEC_s.slots.r2.reply.001`

**沈清辞**：这个时段现在真能用。

`EXEC_s.slots.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_s","value":"slots"},{"op":"set","key":"career_s","value":"shared_use"},{"op":"set","key":"proof_s_slots","value":true}]`

后继：`LU_MOVE2`

### 选择 EXEC_s/venue

陪她去备选空间试灯，确认新址能排自己的节目。

可选条件：`{"any":[{"eq":["plan_s","residency"]},{"eq":["lu_slot","own"]}]}`

立即回应：

**旁白**：第一家连音箱都接不上。第二家很小，灯却真亮了。清辞站在光里，忍不住试了半句台词。

`EXEC_s.venue.r2.reply.001`

**沈清辞**：笑什么？我也不是只会排别人上台。

`EXEC_s.venue.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_s","value":"venue"},{"op":"set","key":"career_s","value":"residency"},{"op":"set","key":"proof_s_venue","value":true}]`

后继：`LU_MOVE2`

### 选择 EXEC_s/handover

按她的决定做交接，把钥匙真正交给新负责人。

可选条件：`null`

立即回应：

**旁白**：你逐项对完预约，新负责人签了接收单。清辞把钥匙递出去，手留在半空一秒，随后收回来。

`EXEC_s.handover.r2.reply.001`

**沈清辞**：以后来这儿，我也得先问一声了。

`EXEC_s.handover.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_s","value":"handover"},{"op":"set","key":"career_s","value":"chosen_exit"},{"op":"set","key":"proof_s_handover","value":true},{"op":"set","key":"s_left_operator","value":true}]`

后继：`LU_MOVE2`

### 选择 EXEC_s/none

这次不参与试运行，只交清自己负责的材料。

可选条件：`null`

立即回应：

**旁白**：清辞没有凑齐试场人手，原址方案继续向巡演倾斜。她把待办划掉一项，又另记下一个电话。

`EXEC_s.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_s","value":"none"},{"op":"set","key":"career_s","value":"displaced"},{"op":"set","key":"proof_s_displaced","value":true}]`

后继：`LU_MOVE2`


---

## EXEC_l｜这次，拍她自己的片尾

类型：`common`。元数据：`{"background":"diner","music":"warm","decisionSteps":[{"id":"shoot","label":"让见月先动手拍自己的作品，不再无休止代剪","options":["application","own","screen"],"reply":[{"speaker":"L","text":"好，我来掌镜。你可以帮忙，但最后按下发送键的人必须是我。","id":"EXEC_l.v413.shoot.reply.001","textHash":"efed2c8eba427667"}],"after":[{"speaker":"N","text":"她拆开云台，从申请补拍、留城拍摄到小型放映，挑真正能做的一项。","id":"EXEC_l.v413.shoot.after.001","textHash":"2700f6cac0160561"}]},{"id":"rights","label":"先确认许可与自己的精力，再决定参与多少","options":["permissions","none"],"reply":[{"speaker":"L","text":"我不想拿别人的拒绝当不存在，也不想假装自己永远有精力帮忙。","id":"EXEC_l.v413.rights.reply.001","textHash":"26071763c816d4d6"}],"after":[{"speaker":"N","text":"她把授权清单摊出来，哪一项能拍、哪一项要停，都写在纸上。","id":"EXEC_l.v413.rights.after.001","textHash":"47597af5fd3613de"}]}],"next":"@schedule","clock":{"day":12,"time":"14:00"}}`

### 正文

**旁白**：见月把几份拍摄清单摊开。巡演临时又要加一支短片，她的补交期限也近了。

`EXEC_l.r2.body.001`

**林见月**：我知道自己手快。但这一次，不想先把别人的全做完。你陪我动哪一份？

`EXEC_l.r2.body.002`

### 条件正文 · EXEC_l.r2.plan_fellowship

条件：`{"eq":["plan_l","fellowship"]}`

**林见月**：自述录到第七遍了。你替我按开始，别替我说话。

`EXEC_l.r2.plan_fellowship.001`

### 条件正文 · EXEC_l.r2.plan_stay

条件：`{"eq":["plan_l","chosen_stay"]}`

**林见月**：想留下是真的，不想再把时间全填给别人也是真的。今天我先拍自己的。

`EXEC_l.r2.plan_stay.001`

### 条件正文 · EXEC_l.r2.plan_film

条件：`{"eq":["plan_l","release_film"]}`

**林见月**：片尾还是我的名字。这次想让人真的看见，不只在硬盘里看见。

`EXEC_l.r2.plan_film.001`

### 条件正文 · EXEC_l.r2.plan_cut

条件：`{"eq":["plan_l","authorized_cut"]}`

**林见月**：他们要的短版，我画好了能动的地方。你帮我看剪完还像不像我的片子。

`EXEC_l.r2.plan_cut.001`

### 条件正文 · EXEC_l.r2.plan_none

条件：`{"eq":["plan_l","silenced"]}`

**林见月**：那天没争下来，我把原片留着了。今天打开它，不代表又要给别人加班。

`EXEC_l.r2.plan_none.001`

### 选择 EXEC_l/application

帮她补拍申请样片；镜头和发送键都交给她。

可选条件：`{"eq":["plan_l","fellowship"]}`

立即回应：

**旁白**：你举着反光板站了半小时，她重拍了自述的最后一句。回到室内，她用预报名编号补交样片，收件确认出现在原来的申请页里。

`EXEC_l.application.r2.reply.001`

**林见月**：这串数字先别删。等回复的时候，我可能会装作不紧张。

`EXEC_l.application.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_l","value":"application"},{"op":"set","key":"career_l","value":"fellowship"},{"op":"set","key":"proof_l_application","value":true}]`

后继：`@schedule`

### 选择 EXEC_l/own

跑完她在海岚的四个镜头，拒绝临时插入的代剪。

可选条件：`null`

立即回应：

**旁白**：你们赶在天色变暗前拍到最后一班车。见月在请求加活的消息下回了“今天不接”，给自己的片子建了新工程。

`EXEC_l.own.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_l","value":"own"},{"op":"set","key":"career_l","value":"chosen_stay"},{"op":"set","key":"proof_l_own","value":true}]`

后继：`@schedule`

### 选择 EXEC_l/screen

做出一份可放映样片，现场试字幕与声音。

可选条件：`{"any":[{"eq":["plan_l","release_film"]},{"eq":["lu_slot","own"]}]}`

立即回应：

**旁白**：第一遍字幕偏出画面。你提醒，她改完再播。小放映负责人的回复终于不是“再看看”，而是“收到这一版”。

`EXEC_l.screen.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_l","value":"screen"},{"op":"set","key":"career_l","value":"release_film"},{"op":"set","key":"proof_l_screen","value":true}]`

后继：`@schedule`

### 选择 EXEC_l/permissions

联系实际出镜者，逐项确认可以公开的声音与画面。

可选条件：`null`

立即回应：

**旁白**：有人同意，有人只愿意留声音。见月按回复剪出节选，没把拒绝的部分偷偷塞回去。

`EXEC_l.permissions.r2.reply.001`

**林见月**：少了两个镜头。片子反而是我敢放出去的了。

`EXEC_l.permissions.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_l","value":"permissions"},{"op":"set","key":"career_l","value":"authorized_cut"},{"op":"set","key":"proof_l_permissions","value":true}]`

后继：`@schedule`

### 选择 EXEC_l/none

先做自己的事，不答应无法到场的拍摄。

可选条件：`null`

立即回应：

**旁白**：见月被追加的剪辑拖住，没有交出样片。她给你发来一个空白工程截图：“还不想删。以后我再试。”

`EXEC_l.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_l","value":"none"},{"op":"set","key":"career_l","value":"silenced"},{"op":"set","key":"proof_l_silenced","value":true}]`

后继：`@schedule`


---

## EXEC_g｜这一页，不再只留她签名

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@schedule","clock":{"day":15,"time":"15:30"}}`

### 正文

**旁白**：晚棠约到正式复核会。她把争议页递给你，自己留着那份写有真实批注的原件。

`EXEC_g.r2.body.001`

**顾晚棠**：今天会得罪人，也可能白跑。现在还来得及选你肯做的那部分。

`EXEC_g.r2.body.002`

### 条件正文 · EXEC_g.r2.plan_independent

条件：`{"eq":["plan_g","independent"]}`

**顾晚棠**：我把自己的提案带来了。能不能过不知道，但今天不替别人背着名字出场。

`EXEC_g.r2.plan_independent.001`

### 条件正文 · EXEC_g.r2.plan_bounded

条件：`{"eq":["plan_g","bounded_partner"]}`

**顾晚棠**：这页能签，那页不行。我自己画的线，今天自己守。

`EXEC_g.r2.plan_bounded.001`

### 条件正文 · EXEC_g.r2.plan_account

条件：`{"eq":["plan_g","public_account"]}`

**顾晚棠**：公开说明的稿子我读过了。不好听的也留着，省得说到一半又装没事。

`EXEC_g.r2.plan_account.001`

### 条件正文 · EXEC_g.r2.plan_leave

条件：`{"eq":["plan_g","leave_family"]}`

**顾晚棠**：门卡就在包里。今天把交接做完，之后再来就得先预约了。

`EXEC_g.r2.plan_leave.001`

### 条件正文 · EXEC_g.r2.plan_none

条件：`{"eq":["plan_g","scapegoated"]}`

**顾晚棠**：那天我一个人进去，出来时气得没吃饭。今天至少记得先垫两口了。

`EXEC_g.r2.plan_none.001`

### 选择 EXEC_g/vote

核对被换掉的文字，在会上支持她争取相应表决权。

可选条件：`{"any":[{"eq":["plan_g","independent"]},{"chosen":["g02","fair"]}]}`

立即回应：

**旁白**：你指出两个版本的差别，晚棠要求把发言记进会议纪要。她失去了一位支持者，但另两位同意她参与下一轮表决。

`EXEC_g.vote.r2.reply.001`

**顾晚棠**：不是全赢。够我自己再投一票。

`EXEC_g.vote.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_g","value":"vote"},{"op":"set","key":"career_g","value":"independent"},{"op":"set","key":"proof_g_vote","value":true}]`

后继：`@schedule`

### 选择 EXEC_g/bounded

把责任范围逐条对上实际权限，提交修订页。

可选条件：`null`

立即回应：

**旁白**：你们删掉“所有后续损失”那句，又补回她实际决定过的预算。对方接收了修订稿。

`EXEC_g.bounded.r2.reply.001`

**顾晚棠**：这回难听的话有一部分确实归我。剩下的，不接。

`EXEC_g.bounded.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_g","value":"bounded"},{"op":"set","key":"career_g","value":"bounded_partner"},{"op":"set","key":"proof_g_bounded","value":true}]`

后继：`@schedule`

### 选择 EXEC_g/account

先取得材料公开许可，再陪她录一份完整说明。

可选条件：`{"any":[{"eq":["plan_g","public_account"]},{"seen":"E03"}]}`

立即回应：

**旁白**：许可邮件到了，你才打开录制。晚棠先承认自己压过预算，又说清没参与的决定，中途删掉一句漂亮却躲事的话。

`EXEC_g.account.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_g","value":"account"},{"op":"set","key":"career_g","value":"public_account"},{"op":"set","key":"proof_g_account","value":true}]`

后继：`@schedule`

### 选择 EXEC_g/leave

陪她核完交接，真正交回门卡，不再以旧岗位行动。

可选条件：`null`

立即回应：

**旁白**：接收单盖好章。晚棠交回门卡，从普通出口出来，指着街对面问你吃不吃面。

`EXEC_g.leave.r2.reply.001`

**顾晚棠**：没有专用电梯了。会饿，倒是跟以前一样。

`EXEC_g.leave.r2.reply.002`

写入与操作：`[{"op":"set","key":"exec_g","value":"leave"},{"op":"set","key":"career_g","value":"leave_family"},{"op":"set","key":"proof_g_leave","value":true},{"op":"set","key":"g_left_job","value":true}]`

后继：`@schedule`

### 选择 EXEC_g/none

不出席复核，清楚回复自己能提供的有限事实。

可选条件：`null`

立即回应：

**旁白**：附页没得到足够支持。晚棠被要求对外解释整个方案，回来时把那份原件收进包：“这件事还没说完。”

`EXEC_g.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_g","value":"none"},{"op":"set","key":"career_g","value":"scapegoated"},{"op":"set","key":"proof_g_scapegoated","value":true}]`

后继：`@schedule`


---

## LU_MOVE2｜他的试听过了，但还得重录

类型：`common`。元数据：`{"background":"diner","music":"warm","decisionSteps":[{"id":"compete","label":"这回用真实作品回应合作与竞争","options":["ally","rival","reconciled"],"reply":[{"speaker":"LU","text":"上次我们谁也没听完谁的话。这一轮，至少把方案和署名都摊开。","id":"LU_MOVE2.v413.compete.reply.001","textHash":"2940640dc9aedb49"}],"after":[{"speaker":"N","text":"试听结果还热着，报名表上有合作方，也留了独立提交的一栏。","id":"LU_MOVE2.v413.compete.after.001","textHash":"32928cb5f6436a79"}]},{"id":"independence","label":"完成自己的交接，然后把方向盘拿回来","options":["distant","independent"],"reply":[{"speaker":"LU","text":"我不替你报名，也不替你解释离开。我们各自把答应的事情做完。","id":"LU_MOVE2.v413.independence.reply.001","textHash":"da1ece0ea1b7c697"}],"after":[{"speaker":"N","text":"他收起那份谱，你面前仍有两条不需要他批准的路。","id":"LU_MOVE2.v413.independence.after.001","textHash":"e7707beb302642a7"}]}],"next":"@schedule","clock":{"day":9,"time":"17:00"}}`

### 正文

**旁白**：陆景行发来新的试听结果：备用编曲拿到巡演试用，但有八小节得重录。

`LU_MOVE2.r4.body.001`

**陆景行**：不是一次过。明天继续，我把要改的圈出来了。

`LU_MOVE2.r4.body.002`

**旁白**：项目方同时发出下一轮现场协作征集，个人和团队都能报名。这次你也收到了正式通知。

`LU_MOVE2.r4.body.003`

### 条件正文 · LU_MOVE2.r2.earlier_request_ally

条件：`{"eq":["plan_lu","ally"]}`

**陆景行**：你上回说想分工。我把能交给你的剪辑段另存了，别白空出这个位置。

`LU_MOVE2.r2.earlier_request_ally.001`

**旁白**：附件是一个可以实际接手的工程副本；原工程仍在他手里。

`LU_MOVE2.r2.earlier_request_ally.002`

### 条件正文 · LU_MOVE2.r2.earlier_request_rival

条件：`{"eq":["plan_lu","rival"]}`

**陆景行**：说好各交各的，我已经交了一版。你还交不交？

`LU_MOVE2.r2.earlier_request_rival.001`

**旁白**：他发来公开征集的截止时间，没有把自己的未公开分轨搭上。

`LU_MOVE2.r2.earlier_request_rival.002`

### 条件正文 · LU_MOVE2.r2.earlier_request_distant

条件：`{"eq":["plan_lu","distant"]}`

**陆景行**：记得你说只保留必要联系。这份是结算清单，不是叫你来救场。

`LU_MOVE2.r2.earlier_request_distant.001`

### 条件正文 · LU_MOVE2.r2.earlier_request_independent

条件：`{"eq":["plan_lu","independent"]}`

**陆景行**：你说各自找新项目。我问过新场地了，你那边有动静吗？

`LU_MOVE2.r2.earlier_request_independent.001`

### 条件正文 · LU_MOVE2.r2.earlier_request_reconciled

条件：`{"eq":["plan_lu","reconciled"]}`

**陆景行**：上次你说想重新认识我。那先听这版，有错的地方也算我的。

`LU_MOVE2.r2.earlier_request_reconciled.001`

### 选择 LU_MOVE2/ally

去合练，现场分清各自负责的版本。

可选条件：`null`

立即回应：

**旁白**：你按确认过的步骤整理版本、标好时间点，陆景行负责重录钢琴。送出的材料里，音乐和现场协作分开署名。

`LU_MOVE2.ally.r4.reply.001`

**陆景行**：这份我确认了，你再看一下自己的那栏。

`LU_MOVE2.ally.r4.reply.002`

**旁白**：你核对完，才一起发出去。

`LU_MOVE2.ally.r4.reply.003`

写入与操作：`[{"op":"set","key":"exec_lu","value":"ally"},{"op":"set","key":"proof_lu_ally","value":true},{"op":"set","key":"rival_move2","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE2/rival

独立提交现场流程方案，参加同一轮征集

可选条件：`null`

立即回应：

**旁白**：你整理出自己的现场流程方案，附上获准使用的工作记录，独立提交。陆景行交的是团队方案，没有替你补写任何一栏。

`LU_MOVE2.rival.r4.reply.001`

**陆景行**：都交了？那等结果。下一轮我也不会让。

`LU_MOVE2.rival.r4.reply.002`

写入与操作：`[{"op":"set","key":"exec_lu","value":"rival"},{"op":"set","key":"proof_lu_rival","value":true},{"op":"set","key":"rival_move2","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE2/distant

只结清这次工作，不再参与他的后续排练。

可选条件：`null`

立即回应：

**旁白**：你把交接完成的时间写进群里。陆景行另找搭档，礼貌道谢，没有把你离开解释成认输。

`LU_MOVE2.distant.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_lu","value":"distant"},{"op":"set","key":"proof_lu_distant","value":true},{"op":"set","key":"rival_move2","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE2/independent

找新的合作对象，先发出自己的项目提案。

可选条件：`null`

立即回应：

**旁白**：你把原先只在备忘录里的提案整理成一页，发给另一个项目。陆景行仍在他的棚里试音，没人被暂停。

`LU_MOVE2.independent.r2.reply.001`

写入与操作：`[{"op":"set","key":"exec_lu","value":"independent"},{"op":"set","key":"proof_lu_independent","value":true},{"op":"set","key":"rival_move2","value":true},{"op":"set","key":"xu_pitch_sent","value":true}]`

后继：`@schedule`

### 选择 LU_MOVE2/reconciled

把竞争时没说清的话当面讲完，再试一次合作。

可选条件：`null`

立即回应：

**许照**：我之前总想着抢在你前面，有时没听完你想做什么。

`LU_MOVE2.reconciled.r4.reply.001`

**陆景行**：我也不喜欢每次都慢一步。不过气归气，该录的还得录。

`LU_MOVE2.reconciled.r4.reply.002`

**旁白**：你们对完分工，由他重录卡住的八小节，你负责版本和时间记录。这次没再争是谁先想到的。

`LU_MOVE2.reconciled.r4.reply.003`

写入与操作：`[{"op":"set","key":"exec_lu","value":"reconciled"},{"op":"set","key":"proof_lu_reconciled","value":true},{"op":"set","key":"rival_move2","value":true}]`

后继：`@schedule`


---

## XU_WORK｜留下来以后，你想做什么

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@schedule","clock":{"day":8,"time":"18:00"}}`

### 正文

**旁白**：责任更正书送到了，工作费也按核过的工时结清。制作人发来下一轮征集表，问你要不要报名。

`XU_WORK.r4.body.001`

**旁白**：证明自己没做错以后，总得拿出一件真的会做的事。你打开空白的作品说明。

`XU_WORK.r4.body.002`

### 条件正文 · XU_WORK.r42.block.uoffer

条件：`{"eq":["unwritten_future","public_method"]}`

**旁白**：那份事故流程说明已经有人邀请你单独制作；你能不能接，还是得看实际时间和许可。

`XU_WORK.r42.block.uoffer.001`

### 条件正文 · XU_WORK.r42.block.uprivate

条件：`{"eq":["unwritten_future","private_protection"]}`

**旁白**：阿衡提醒你，私人存证的信任不能直接变成公开作品。你把可发布版本和内部记录分开。

`XU_WORK.r42.block.uprivate.001`

### 条件正文 · XU_WORK.r42.block.uself

条件：`{"eq":["unwritten_future","self_direction"]}`

**旁白**：你先前没有答应新项目。今天选择工作方向，不需要假装自己已经签了合同。

`XU_WORK.r42.block.uself.001`

### 选择 XU_WORK/original

把首夜技术小样另制成演示包，不用歌手的未公开原声。

可选条件：`{"eq":["opening_work_result","own_demo"]}`

立即回应：

**旁白**：你照首夜试过的方法重做一个演示，用自己录的节拍替换未公开的人声，分别写清素材与技术署名。

`XU_WORK.original.r2.reply.001`

**旁白**：演示包《书外第一夜》上传成功。回信问你能不能照这个方法再做一版，你把交付日期核对了一遍。

`XU_WORK.original.r2.reply.002`

写入与操作：`[{"op":"set","key":"xu_result","value":"original"},{"op":"set","key":"xu_work_title","value":"《书外第一夜》"},{"op":"resolveWork"}]`

后继：`@schedule`

### 选择 XU_WORK/portfolio

把已核对的现场改版做成自己的技术作品集，说明贡献。

可选条件：`null`

立即回应：

**旁白**：你照实际核验的时间线做了一份交接样表，再现场补录操作演示。三页材料只写自己做过的部分，没有把别人的歌署成自己的。

`XU_WORK.portfolio.r2.reply.001`

**旁白**：技术负责人看完，回复了一次试做邀请。你把样表、样片和回复存进自己的作品夹。

`XU_WORK.portfolio.r2.reply.002`

写入与操作：`[{"op":"set","key":"xu_result","value":"portfolio"},{"op":"set","key":"xu_work_title","value":"北岸现场改版作品集"},{"op":"resolveWork"}]`

后继：`@schedule`

### 选择 XU_WORK/steady

签下一次职责清楚的幕后工作，不抢台前名额。

可选条件：`null`

立即回应：

**旁白**：你确认了工作范围和报酬，再回信答应。负责人把分工和工时一起回给你，等你确认。

`XU_WORK.steady.r2.reply.001`

写入与操作：`[{"op":"set","key":"xu_result","value":"steady"},{"op":"resolveWork"}]`

后继：`@schedule`

### 选择 XU_WORK/rest

先不接新活，把结清的收入和空出的时间留给自己。

可选条件：`null`

立即回应：

**旁白**：你关掉报名页，保存更正书和结算记录。今天不再回新的邀约，先把饭吃完。

`XU_WORK.rest.r2.reply.001`

写入与操作：`[{"op":"set","key":"xu_result","value":"rest"},{"op":"resolveWork"}]`

后继：`@schedule`


---

## RES_t｜映雪：今天发哪一版

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"RES_s","clock":{"day":21,"time":"10:00"}}`

### 正文

**旁白**：发布页停在确认前。映雪把真正录过、谈过、撤过的版本排在屏幕上，等你最后看一遍。

`RES_t.current_result.0`

### 条件正文 · RES_t.r2.plan_independent

条件：`{"eq":["plan_t","independent"]}`

**唐映雪**：最早想先发自己的版本。今天看看手里真准备好了哪些。

`RES_t.r2.plan_independent.001`

### 条件正文 · RES_t.r2.plan_negotiated

条件：`{"eq":["plan_t","negotiated"]}`

**唐映雪**：最早想谈清署名再合作。名字我还圈着呢。

`RES_t.r2.plan_negotiated.001`

### 条件正文 · RES_t.r2.plan_duet

条件：`{"eq":["plan_t","chosen_duet"]}`

**唐映雪**：最早说试合唱。录没录好，现在有文件能听，不用再凭想象。

`RES_t.r2.plan_duet.001`

### 条件正文 · RES_t.r2.plan_pause

条件：`{"eq":["plan_t","intentional_pause"]}`

**唐映雪**：最早想缓一缓。现在再确认一次，不是被谁催着发。

`RES_t.r2.plan_pause.001`

### 条件正文 · RES_t.r2.plan_unchanged

条件：`{"eq":["plan_t","restricted"]}`

**唐映雪**：一开始我自己谈，没全谈下来。后来补成了什么，今天就按什么来。

`RES_t.r2.plan_unchanged.001`

### 条件正文 · RES_t.r2.did_master

条件：`{"eq":["proof_t_master",true]}`

**唐映雪**：完整母带已经导出，署名和发布许可都核过了。这份今天能用。

`RES_t.r2.did_master.001`

### 条件正文 · RES_t.r2.did_terms

条件：`{"eq":["proof_t_terms",true]}`

**唐映雪**：改好的试播版留着，原作名和独唱时段都补上了。

`RES_t.r2.did_terms.001`

### 条件正文 · RES_t.r2.did_duet

条件：`{"eq":["proof_t_duet",true]}`

**唐映雪**：新合唱已经录好，双方确认过各自参与的部分。

`RES_t.r2.did_duet.001`

### 条件正文 · RES_t.r2.did_hold

条件：`{"eq":["proof_t_hold",true]}`

**唐映雪**：预告已经撤下，备份在我自己的盘里。暂缓这件事办完了。

`RES_t.r2.did_hold.001`

### 条件正文 · RES_t.r2.did_none

条件：`{"eq":["proof_t_restricted",true]}`

**唐映雪**：没改好的版本也在这里。它还是删得太短，名字也没补全。

`RES_t.r2.did_none.001`

### 选择 RES_t/master

正式提交她自己的版本。

可选条件：`{"eq":["proof_t_master",true]}`

立即回应：

**旁白**：唐映雪自己点下发布。第一条评论没有问陆景行是谁，而是问她下一首什么时候发。

`RES_t.master.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_t","value":"independent"},{"op":"set","key":"t_goal","value":true},{"op":"recordFate","character":"t","outcome":"independent","proof":"proof_t_master"}]`

后继：`RES_s`

### 选择 RES_t/terms

按核过的署名与时段确认合作发布。

可选条件：`{"eq":["proof_t_terms",true]}`

立即回应：

**旁白**：短片亮起时，原作名和独唱时段都在。唐映雪把链接发给你：“这回敢看了。”

`RES_t.terms.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_t","value":"negotiated"},{"op":"set","key":"t_goal","value":true},{"op":"recordFate","character":"t","outcome":"negotiated","proof":"proof_t_terms"}]`

后继：`RES_s`

### 选择 RES_t/duet

提交两人重新录过的合唱版。

可选条件：`{"eq":["proof_t_duet",true]}`

立即回应：

**旁白**：新录的合唱响起，屏幕分开列出两人的创作。她朝控台抬了抬下巴，像说：就这版。

`RES_t.duet.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_t","value":"chosen_duet"},{"op":"set","key":"t_goal","value":true},{"op":"recordFate","character":"t","outcome":"chosen_duet","proof":"proof_t_duet"}]`

后继：`RES_s`

### 选择 RES_t/hold

确认这次不公开，把备份留给她。

可选条件：`{"eq":["proof_t_hold",true]}`

立即回应：

**旁白**：宣发页没有出现她的歌。她背起包从侧门出来：“走，今天不用等安可。”

`RES_t.hold.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_t","value":"intentional_pause"},{"op":"set","key":"t_goal","value":true},{"op":"recordFate","character":"t","outcome":"intentional_pause","proof":"proof_t_hold"}]`

后继：`RES_s`

### 选择 RES_t/none

如实确认这次仍受限的结果，不把恋爱当补偿。

可选条件：`{"all":[{"eq":["proof_t_restricted",true]},{"not":{"any":[{"eq":["proof_t_master",true]},{"eq":["proof_t_terms",true]},{"eq":["proof_t_duet",true]},{"eq":["proof_t_hold",true]}]}}]}`

立即回应：

**旁白**：短片仍没有给她足够的空间。她没有装开心，把未被采纳的修改稿存进了自己的文件夹。

`RES_t.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_t","value":"restricted"},{"op":"set","key":"t_goal","value":false},{"op":"recordFate","character":"t","outcome":"restricted","proof":"proof_t_restricted"}]`

后继：`RES_s`


---

## RES_s｜清辞：下一场怎么开

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"RES_l","clock":{"day":21,"time":"11:00"}}`

### 正文

**旁白**：清辞把手头的确认单排好。关于场地、排期和交接，做过哪些，现在各有记录。

`RES_s.r4.body.001`

**沈清辞**：这次先按落实的来。后面还想改，再另外谈。

`RES_s.r4.body.002`

### 条件正文 · RES_s.r2.plan_cooperative

条件：`{"eq":["plan_s","cooperative"]}`

**沈清辞**：最早想试小规模共营。成本有没有算清，现在可以查账了。

`RES_s.r2.plan_cooperative.001`

### 条件正文 · RES_s.r2.plan_shared

条件：`{"eq":["plan_s","shared_use"]}`

**沈清辞**：最早想和巡演共用。今天不能只看纸上的空档，得看试过的结果。

`RES_s.r2.plan_shared.001`

### 条件正文 · RES_s.r2.plan_residency

条件：`{"eq":["plan_s","residency"]}`

**沈清辞**：最早想换地方做驻场。有没有真能用的场地，今天定下来。

`RES_s.r2.plan_residency.001`

### 条件正文 · RES_s.r2.plan_exit

条件：`{"eq":["plan_s","chosen_exit"]}`

**沈清辞**：最早提过交接。现在把已经做完的事确认一下。

`RES_s.r2.plan_exit.001`

### 条件正文 · RES_s.r2.plan_leave

条件：`{"eq":["plan_s","displaced"]}`

**沈清辞**：一开始我自己撑，没留住时段。后来能补上什么，就确认什么。

`RES_s.r2.plan_leave.001`

### 条件正文 · RES_s.r2.did_trial

条件：`{"eq":["proof_s_trial",true]}`

**沈清辞**：试场那天的票数和成本都入账了，小规模共营有实际数字可算。

`RES_s.r2.did_trial.001`

### 条件正文 · RES_s.r2.did_slots

条件：`{"eq":["proof_s_slots",true]}`

**沈清辞**：换场已经试过，缺的半小时补进了确认单，不只是口头答应。

`RES_s.r2.did_slots.001`

### 条件正文 · RES_s.r2.did_venue

条件：`{"eq":["proof_s_venue",true]}`

**沈清辞**：备选场地的灯和设备试过了，可以排自己的节目。

`RES_s.r2.did_venue.001`

### 条件正文 · RES_s.r2.did_handover

条件：`{"eq":["proof_s_handover",true]}`

**沈清辞**：预约已交接，钥匙也交给新负责人了。现在我不是运营者。

`RES_s.r2.did_handover.001`

### 条件正文 · RES_s.r2.did_none

条件：`{"eq":["proof_s_displaced",true]}`

**沈清辞**：那次没凑够人，原址仍倾向巡演。这个结果还没被改掉。

`RES_s.r2.did_none.001`

### 选择 RES_s/trial

按试运行的实际成本，确认下一场小规模共营。

可选条件：`{"all":[{"eq":["proof_s_trial",true]},{"ne":["s_left_operator",true]}]}`

立即回应：

**旁白**：下一场小演出的报名表由几位共营者一起接手。清辞终于不用一个人垫完所有东西。

`RES_s.trial.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_s","value":"cooperative"},{"op":"set","key":"s_goal","value":true},{"op":"recordFate","character":"s","outcome":"cooperative","proof":"proof_s_trial"}]`

后继：`RES_l`

### 选择 RES_s/slots

用实测过的交接安排确认共用时段。

可选条件：`{"all":[{"eq":["proof_s_slots",true]},{"ne":["s_left_operator",true]}]}`

立即回应：

**旁白**：巡演撤完场，独立夜场按实测时段进场。清辞核对完排期，给参演者发出了进场时间。

`RES_s.slots.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_s","value":"shared_use"},{"op":"set","key":"s_goal","value":true},{"op":"recordFate","character":"s","outcome":"shared_use","proof":"proof_s_slots"}]`

后继：`RES_l`

### 选择 RES_s/venue

确认已经试过灯的新场地，转去流动驻场。

可选条件：`{"all":[{"eq":["proof_s_venue",true]},{"ne":["s_left_operator",true]}]}`

立即回应：

**旁白**：新场地亮灯。清辞站在窄一点的走道里，向第一批观众递节目单，没有再等原址点头。

`RES_s.venue.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_s","value":"residency"},{"op":"set","key":"s_goal","value":true},{"op":"recordFate","character":"s","outcome":"residency","proof":"proof_s_venue"}]`

后继：`RES_l`

### 选择 RES_s/handover

完成交接收束，保留她主动离开的决定。

可选条件：`{"eq":["proof_s_handover",true]}`

立即回应：

**旁白**：交接记录封存。清辞以观众身份收到邀请，回了“有空会来”，没有再被默认排进值班表。

`RES_s.handover.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_s","value":"chosen_exit"},{"op":"set","key":"s_goal","value":true},{"op":"recordFate","character":"s","outcome":"chosen_exit","proof":"proof_s_handover"}]`

后继：`RES_l`

### 选择 RES_s/none

确认原址没有保住，协助整理后续联络。

可选条件：`{"all":[{"eq":["proof_s_displaced",true]},{"not":{"any":[{"eq":["proof_s_trial",true]},{"eq":["proof_s_slots",true]},{"eq":["proof_s_venue",true]},{"eq":["proof_s_handover",true]}]}}]}`

立即回应：

**旁白**：新招牌换好，原来的独立时段没有留下。清辞把旧节目单收好，这次未完成的愿望仍然是真的。

`RES_s.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_s","value":"displaced"},{"op":"set","key":"s_goal","value":false},{"op":"recordFate","character":"s","outcome":"displaced","proof":"proof_s_displaced"}]`

后继：`RES_l`


---

## RES_l｜见月：把完成的那份交出去

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"RES_g","clock":{"day":21,"time":"13:00"}}`

### 正文

**旁白**：见月打开已经剪过的片子和实际收到的回信。她把鼠标移到发送键旁，这次由她决定把哪份交出去。

`RES_l.current_result.0`

### 条件正文 · RES_l.r2.plan_fellowship

条件：`{"eq":["plan_l","fellowship"]}`

**林见月**：最早报的是外出项目。现在看申请页，不靠我说“快好了”。

`RES_l.r2.plan_fellowship.001`

### 条件正文 · RES_l.r2.plan_stay

条件：`{"eq":["plan_l","chosen_stay"]}`

**林见月**：最早说要留下拍自己的。今天看看，究竟拍出来多少。

`RES_l.r2.plan_stay.001`

### 条件正文 · RES_l.r2.plan_film

条件：`{"eq":["plan_l","release_film"]}`

**林见月**：最早想办小放映。样片和对方回信都在这儿。

`RES_l.r2.plan_film.001`

### 条件正文 · RES_l.r2.plan_cut

条件：`{"eq":["plan_l","authorized_cut"]}`

**林见月**：最早想先出节选。最后用哪些镜头，要照当事人的回复来。

`RES_l.r2.plan_cut.001`

### 条件正文 · RES_l.r2.plan_none

条件：`{"eq":["plan_l","silenced"]}`

**林见月**：一开始没完成。后面补做过什么，我都放在同一处了。

`RES_l.r2.plan_none.001`

### 条件正文 · RES_l.r2.did_application

条件：`{"eq":["proof_l_application",true]}`

**林见月**：自述和样片已经补交，原报名编号下有收件确认。

`RES_l.r2.did_application.001`

### 条件正文 · RES_l.r2.did_own

条件：`{"eq":["proof_l_own",true]}`

**林见月**：那四个镜头已经拍完，自己的工程不是空的了。

`RES_l.r2.did_own.001`

### 条件正文 · RES_l.r2.did_screen

条件：`{"eq":["proof_l_screen",true]}`

**林见月**：字幕、声音都试过，放映方收到了测试版。

`RES_l.r2.did_screen.001`

### 条件正文 · RES_l.r2.did_permissions

条件：`{"eq":["proof_l_permissions",true]}`

**林见月**：愿意出镜的回复都记下了，不同意的部分没有用。

`RES_l.r2.did_permissions.001`

### 条件正文 · RES_l.r2.did_none

条件：`{"eq":["proof_l_silenced",true]}`

**林见月**：这次没交出样片。工程还在，不能当成已完成。

`RES_l.r2.did_none.001`

### 选择 RES_l/application

由她发送补交确认，继续推进外出申请。

可选条件：`{"eq":["proof_l_application",true]}`

立即回应：

**旁白**：申请系统确认收到补交，她进入下一轮沟通。见月把回执发给你，紧接着又问：“下一份，拍什么？”

`RES_l.application.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_l","value":"fellowship"},{"op":"set","key":"l_goal","value":true},{"op":"recordFate","character":"l","outcome":"fellowship","proof":"proof_l_application"}]`

后继：`RES_g`

### 选择 RES_l/own

确认本地自制片的拍摄日，不再替巡演填满。

可选条件：`{"eq":["proof_l_own",true]}`

立即回应：

**旁白**：四个镜头变成自己的工程开头。她划掉巡演的临时加活，拍摄表上第一次先排自己的名字。

`RES_l.own.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_l","value":"chosen_stay"},{"op":"set","key":"l_goal","value":true},{"op":"recordFate","character":"l","outcome":"chosen_stay","proof":"proof_l_own"}]`

后继：`RES_g`

### 选择 RES_l/screen

向放映方提交已经试过字幕声音的版本。

可选条件：`{"eq":["proof_l_screen",true]}`

立即回应：

**旁白**：放映方接收了完整测试版。片尾“林见月”几个字亮起时，她没有再提前按掉屏幕。

`RES_l.screen.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_l","value":"release_film"},{"op":"set","key":"l_goal","value":true},{"op":"recordFate","character":"l","outcome":"release_film","proof":"proof_l_screen"}]`

后继：`RES_g`

### 选择 RES_l/permissions

只发布当事人确认过的节选。

可选条件：`{"eq":["proof_l_permissions",true]}`

立即回应：

**旁白**：只含许可素材的节选上线。她把未获同意的镜头留在离线工程里，没有拿公开机会交换别人的私事。

`RES_l.permissions.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_l","value":"authorized_cut"},{"op":"set","key":"l_goal","value":true},{"op":"recordFate","character":"l","outcome":"authorized_cut","proof":"proof_l_permissions"}]`

后继：`RES_g`

### 选择 RES_l/none

承认这次没有完成交付，保留未完成工程。

可选条件：`{"all":[{"eq":["proof_l_silenced",true]},{"not":{"any":[{"eq":["proof_l_application",true]},{"eq":["proof_l_own",true]},{"eq":["proof_l_screen",true]},{"eq":["proof_l_permissions",true]}]}}]}`

立即回应：

**旁白**：这次没有收到提交成功的回执。她合上电脑，没说“反正也不重要”，而是把下一次截止日期记了下来。

`RES_l.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_l","value":"silenced"},{"op":"set","key":"l_goal","value":false},{"op":"recordFate","character":"l","outcome":"silenced","proof":"proof_l_silenced"}]`

后继：`RES_g`


---

## RES_g｜晚棠：按最后的回件确认

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"RES_lu","clock":{"day":21,"time":"15:00"}}`

### 正文

**旁白**：晚棠把复核会的回件翻给你看，待签的位置做了标记。

`RES_g.r4.body.001`

**顾晚棠**：看看有没有漏掉我们确认的那几行。没拿到的，今天不算已经赢了。

`RES_g.r4.body.002`

### 条件正文 · RES_g.r2.plan_independent

条件：`{"eq":["plan_g","independent"]}`

**顾晚棠**：最早要争表决资格。有没有拿到，按回来的纪要说。

`RES_g.r2.plan_independent.001`

### 条件正文 · RES_g.r2.plan_bounded

条件：`{"eq":["plan_g","bounded_partner"]}`

**顾晚棠**：最早谈的是改清责任范围。今天看正式回件，不看我写过的草案。

`RES_g.r2.plan_bounded.001`

### 条件正文 · RES_g.r2.plan_account

条件：`{"eq":["plan_g","public_account"]}`

**顾晚棠**：最早想公开说明。先看材料许可和录制成片都齐不齐。

`RES_g.r2.plan_account.001`

### 条件正文 · RES_g.r2.plan_leave

条件：`{"eq":["plan_g","leave_family"]}`

**顾晚棠**：最早准备离开。已交接的和没交接的，现在逐项确认。

`RES_g.r2.plan_leave.001`

### 条件正文 · RES_g.r2.plan_none

条件：`{"eq":["plan_g","scapegoated"]}`

**顾晚棠**：一开始没争下来。后来有没有改变，不能光凭一口气。

`RES_g.r2.plan_none.001`

### 条件正文 · RES_g.r2.did_vote

条件：`{"eq":["proof_g_vote",true]}`

**顾晚棠**：纪要已经回了，下一轮表决有我的席位。不是所有人支持，但资格拿到了。

`RES_g.r2.did_vote.001`

### 条件正文 · RES_g.r2.did_bounded

条件：`{"eq":["proof_g_bounded",true]}`

**顾晚棠**：修订页已被接收。删掉了无限责任，也补回了我实际作过的决定。

`RES_g.r2.did_bounded.001`

### 条件正文 · RES_g.r2.did_account

条件：`{"eq":["proof_g_account",true]}`

**顾晚棠**：材料许可齐了，完整说明也录好了。自己的责任没有删。

`RES_g.r2.did_account.001`

### 条件正文 · RES_g.r2.did_leave

条件：`{"eq":["proof_g_leave",true]}`

**顾晚棠**：门卡已交回，交接有回执。以后不能再以旧岗位办事。

`RES_g.r2.did_leave.001`

### 条件正文 · RES_g.r2.did_none

条件：`{"eq":["proof_g_scapegoated",true]}`

**顾晚棠**：附页还是没被听全，对外解释的责任仍压在我这里。

`RES_g.r2.did_none.001`

### 选择 RES_g/vote

确认她争取到的独立表决资格。

可选条件：`{"all":[{"eq":["proof_g_vote",true]},{"ne":["g_left_job",true]}]}`

立即回应：

**旁白**：下一轮会议上有了晚棠的表决席。她先否决了一处自己也会受益的模糊条款，没有再只负责签坏消息。

`RES_g.vote.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_g","value":"independent"},{"op":"set","key":"g_goal","value":true},{"op":"recordFate","character":"g","outcome":"independent","proof":"proof_g_vote"}]`

后继：`RES_lu`

### 选择 RES_g/bounded

采用双方接收过的有限责任版本。

可选条件：`{"all":[{"eq":["proof_g_bounded",true]},{"ne":["g_left_job",true]}]}`

立即回应：

**旁白**：修订页进入正式版本，她只承担自己能决定的部分。晚棠把对方的确认收好，接下来仍会继续交锋。

`RES_g.bounded.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_g","value":"bounded_partner"},{"op":"set","key":"g_goal","value":true},{"op":"recordFate","character":"g","outcome":"bounded_partner","proof":"proof_g_bounded"}]`

后继：`RES_lu`

### 选择 RES_g/account

发布已获许可、包含自身责任的完整说明。

可选条件：`{"eq":["proof_g_account",true]}`

立即回应：

**旁白**：完整说明发布。有人仍不喜欢她，但“恶女”两个字再盖不住具体哪一笔是谁决定的。

`RES_g.account.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_g","value":"public_account"},{"op":"set","key":"g_goal","value":true},{"op":"recordFate","character":"g","outcome":"public_account","proof":"proof_g_account"}]`

后继：`RES_lu`

### 选择 RES_g/leave

确认门卡已交回，后续以个人身份联系。

可选条件：`{"eq":["proof_g_leave",true]}`

立即回应：

**旁白**：门卡停用，她收到的下一封邮件称呼是“顾晚棠”，没有职位前缀。她自己回信，也自己挑下一顿饭。

`RES_g.leave.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_g","value":"leave_family"},{"op":"set","key":"g_goal","value":true},{"op":"recordFate","character":"g","outcome":"leave_family","proof":"proof_g_leave"}]`

后继：`RES_lu`

### 选择 RES_g/none

记录这次没被听全的事实，不伪称争议已消失。

可选条件：`{"all":[{"eq":["proof_g_scapegoated",true]},{"not":{"any":[{"eq":["proof_g_vote",true]},{"eq":["proof_g_bounded",true]},{"eq":["proof_g_account",true]},{"eq":["proof_g_leave",true]}]}}]}`

立即回应：

**旁白**：争议仍集中在她身上。晚棠把原件带走，说以后还要继续查。今天没有更正，就是没有。

`RES_g.none.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_g","value":"scapegoated"},{"op":"set","key":"g_goal","value":false},{"op":"recordFate","character":"g","outcome":"scapegoated","proof":"proof_g_scapegoated"}]`

后继：`RES_lu`


---

## RES_lu｜他交出了自己的结果

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"A7a","clock":{"day":21,"time":"17:00"}}`

### 正文

**旁白**：陆景行发来最终分工，也确认接下了巡演试用。重录的八小节过了，后面还有整轮排练。

`RES_lu.r4.body.001`

**陆景行**：我这边定了。你那份，我们也按做过的确认一下。

`RES_lu.r4.body.002`

### 选择 RES_lu/ally

按实际做过的分工确认下一步。

可选条件：`{"eq":["proof_lu_ally",true]}`

立即回应：

**陆景行**：下次别只带点子来。留一段你真想做的。

`RES_lu.ally.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_lu","value":"ally"},{"op":"recordFate","character":"lu","outcome":"ally","proof":"proof_lu_ally"}]`

后继：`A7a`

### 选择 RES_lu/rival

按实际做过的竞争确认下一步。

可选条件：`{"eq":["proof_lu_rival",true]}`

立即回应：

**陆景行**：这回还没分出高下。下一轮，我还是会先交。

`RES_lu.rival.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_lu","value":"rival"},{"op":"recordFate","character":"lu","outcome":"rival","proof":"proof_lu_rival"}]`

后继：`A7a`

### 选择 RES_lu/distant

按实际做过的交接确认下一步。

可选条件：`{"eq":["proof_lu_distant",true]}`

立即回应：

**陆景行**：收到。以后有明确的工作，再联系。

`RES_lu.distant.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_lu","value":"distant"},{"op":"recordFate","character":"lu","outcome":"distant","proof":"proof_lu_distant"}]`

后继：`A7a`

### 选择 RES_lu/independent

按实际做过的新提案确认下一步。

可选条件：`{"eq":["proof_lu_independent",true]}`

立即回应：

**陆景行**：祝你的新项目有回信。我这边也继续。

`RES_lu.independent.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_lu","value":"independent"},{"op":"recordFate","character":"lu","outcome":"independent","proof":"proof_lu_independent"}]`

后继：`A7a`

### 选择 RES_lu/reconciled

按实际做过的重新合练确认下一步。

可选条件：`{"eq":["proof_lu_reconciled",true]}`

立即回应：

**陆景行**：这次说开了。下次意见不一样，直接在谱上圈。

`RES_lu.reconciled.r2.reply.001`

写入与操作：`[{"op":"set","key":"final_lu","value":"reconciled"},{"op":"recordFate","character":"lu","outcome":"reconciled","proof":"proof_lu_reconciled"}]`

后继：`A7a`


---

## H_gls｜最后一段字幕，谁来念

类型：`group`。元数据：`{"background":"diner","music":"warm","next":"H_gls_TALK","members":["g","l","s"],"minSlot":11,"requires":[]}`

### 正文

**旁白**：小放映测试到一半，字幕突然错了位。见月暂停，晚棠把“今晚不加班”那杯水往清辞手边推。

`H_gls.r2.body.001`

**林见月**：重导要十分钟。你们谁愿意先念？

`H_gls.r2.body.002`

**沈清辞**：我来。别把我这次破音剪进花絮。

`H_gls.r2.body.003`

**顾晚棠**：那我已经开始期待花絮了。

`H_gls.r2.body.004`

**旁白**：三个人都笑了。你搬来第四把椅子，抬头发现她们都在等你坐下。

`H_gls.r2.body.005`

### 选择 H_gls/favor_g

坐到晚棠身边，把水杯递给她。

可选条件：`null`

立即回应：

**旁白**：你坐到晚棠旁边，把她落在另一端的水递过来。

`H_gls.favor_g.r4.reply.001`

**顾晚棠**：记性不错。不过你得先听清辞念完。

`H_gls.favor_g.r4.reply.002`

**沈清辞**：很好，还没开始，我就被安排了观众。

`H_gls.favor_g.r4.reply.003`

**林见月**：我给你们打字幕。错字算我的。

`H_gls.favor_g.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_gls","value":"g"},{"op":"groupStart","members":["g","l","s"]}]`

后继：`H_gls_TALK`

### 选择 H_gls/favor_l

坐到见月身边，陪她看字幕。

可选条件：`null`

立即回应：

**旁白**：你搬把椅子坐在见月旁边，帮她盯住字幕错位的地方。

`H_gls.favor_l.r4.reply.001`

**林见月**：这次看屏幕，不是看我。

`H_gls.favor_l.r4.reply.002`

**许照**：刚才也在看屏幕。

`H_gls.favor_l.r4.reply.003`

**顾晚棠**：嗯，屏幕正好长得像见月。

`H_gls.favor_l.r4.reply.004`

**旁白**：见月低头笑了，故意把电脑往你面前挪近一点。

`H_gls.favor_l.r4.reply.005`

写入与操作：`[{"op":"set","key":"group_bias_gls","value":"l"},{"op":"groupStart","members":["g","l","s"]}]`

后继：`H_gls_TALK`

### 选择 H_gls/favor_s

站到清辞旁边，替她翻下一页。

可选条件：`null`

立即回应：

**许照**：你念，我翻。错了也不能把我剪掉。

`H_gls.favor_s.r4.reply.001`

**沈清辞**：先别急着揽责任，看清页码。

`H_gls.favor_s.r4.reply.002`

**旁白**：她念到一半还是笑了场。见月暂停，晚棠率先鼓掌，说这一版也很好。

`H_gls.favor_s.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_gls","value":"s"},{"op":"groupStart","members":["g","l","s"]}]`

后继：`H_gls_TALK`

### 选择 H_gls/all

先把椅子排好，大家一起看完。

可选条件：`null`

立即回应：

**旁白**：你把四把椅子摆成一排，坐在中间，准备帮忙翻页。

`H_gls.all.r4.reply.001`

**顾晚棠**：你这个位置倒是一点不亏。

`H_gls.all.r4.reply.002`

**许照**：主要是方便看字幕。

`H_gls.all.r4.reply.003`

**旁白**：见月没有拆穿，清辞已经开始念。你们总算把这一小段看完。

`H_gls.all.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_gls","value":"all"},{"op":"groupStart","members":["g","l","s"]}]`

后继：`H_gls_TALK`


---

## H_gls_TALK｜有些话，由你先开口

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"H_gls_ASK_g"}`

### 正文

**旁白**：休息时，大家一起坐下，玩笑慢慢停了。你想认真问一问，以后是否还愿意这样一起相处。

`H_gls_TALK.r4.body.001`

**许照**：今天很开心。但有些事，还是要我自己说清楚。

`H_gls_TALK.r4.body.002`

### 选择 H_gls_TALK/tell

讲清现有关系，再分别问她们。

可选条件：`null`

立即回应：

**旁白**：你把名字说全，包括每段关系是约会还是排他承诺，没有把尚未答应的人说成恋人。

`H_gls_TALK.tell.r2.reply.001`

写入与操作：`[{"op":"discloseAll"}]`

后继：`H_gls_ASK_g`

### 选择 H_gls_TALK/wait

今天只一起相处，暂不扩大共同关系。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排之后，今天先不请大家答应新的关系。

`H_gls_TALK.wait.r4.reply.001`

**旁白**：你们确认这次只是一起相处。原有的私人约定保留，之后可以另约时间再谈。

`H_gls_TALK.wait.r4.reply.002`

写入与操作：`[{"op":"groupWait","members":["g","l","s"]}]`

后继：`@schedule`


---

## H_gls_ASK_g｜顾晚棠没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_gls_ASK_l","members":["g","l","s"]}`

### 正文

**旁白**：晚棠转向你，认真听完最后的问题。

`H_gls_ASK_g.r4.body.001`

**顾晚棠**：好，现在问我。你不用猜我会给哪种回答。

`H_gls_ASK_g.r4.body.002`

### 选择 H_gls_ASK_g/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_g",true]},{"eq":["scope_g","open"]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]},{"ne":["latent_g",true]},{"ne":["breach_g",true]},{"eq":["reciprocal_g",true]}]}`

立即回应：

**顾晚棠**：可以。我知道具体有哪些人，也愿意试。哪天我不舒服会说，今天这句答应也是真的。

`H_gls_ASK_g.ask.r2.reply.001`

**旁白**：晚棠愿意试，也保留以后重新考虑的权利。你听见的是她自己的决定，不是另外两人的赞同。

`H_gls_ASK_g.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"g","answer":"yes"}]`

后继：`H_gls_ASK_l`

### 选择 H_gls_ASK_g/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**顾晚棠**：这件事我先不签字。不是反对谁，是我还没决定能不能这样过。

`H_gls_ASK_g.wait.r4.reply.001`

**旁白**：晚棠没再重复。你把她尚未答应的范围留空，不拿别人的点头抵她的签名。

`H_gls_ASK_g.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"g","answer":"wait"}]`

后继：`H_gls_ASK_l`


---

## H_gls_ASK_l｜林见月没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_gls_ASK_s","members":["g","l","s"]}`

### 正文

**旁白**：见月转向你，认真听完最后的问题。

`H_gls_ASK_l.r4.body.001`

**林见月**：我想了一下。我的想法，我自己说。

`H_gls_ASK_l.r4.body.002`

### 选择 H_gls_ASK_l/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_l",true]},{"eq":["scope_l","open"]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]},{"ne":["latent_l",true]},{"ne":["breach_l",true]},{"eq":["reciprocal_l",true]}]}`

立即回应：

**林见月**：愿意。我知道现在有哪些人，也想试着一起相处。但我也会想单独见你，到时候直接说。

`H_gls_ASK_l.ask.r4.reply.001`

**旁白**：你认真答应，等她说完，没有让另一个人替她补答案。

`H_gls_ASK_l.ask.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"l","answer":"yes"}]`

后继：`H_gls_ASK_s`

### 选择 H_gls_ASK_l/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**林见月**：这段先留白吧。我没决定要不要加入，不用别人帮我补一句“她也同意”。

`H_gls_ASK_l.wait.r4.reply.001`

**旁白**：见月把尚未决定的部分留给自己，你没有把它剪进“大家都同意”的版本。

`H_gls_ASK_l.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"l","answer":"wait"}]`

后继：`H_gls_ASK_s`


---

## H_gls_ASK_s｜沈清辞没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"@schedule","members":["g","l","s"]}`

### 正文

**旁白**：清辞转向你，认真听完最后的问题。

`H_gls_ASK_s.r4.body.001`

**沈清辞**：我听清了。接下来是我的意思。

`H_gls_ASK_s.r4.body.002`

### 选择 H_gls_ASK_s/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_s",true]},{"eq":["scope_s","open"]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]},{"ne":["latent_s",true]},{"ne":["breach_s",true]},{"eq":["reciprocal_s",true]}]}`

立即回应：

**沈清辞**：我愿意。也要留只有你和我见面的晚上。那晚由我来约，不用你替我排满。

`H_gls_ASK_s.ask.r2.reply.001`

**旁白**：清辞要的不是一句笼统的“大家都好”，而是连两人单独见面的时间也说清。

`H_gls_ASK_s.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"s","answer":"yes"},{"op":"groupFinish","members":["g","l","s"]}]`

后继：`@schedule`

### 选择 H_gls_ASK_s/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**沈清辞**：今晚先到这儿。大家一起坐过，不代表我已经把之后的日程交给你排。

`H_gls_ASK_s.wait.r4.reply.001`

**旁白**：清辞没有回避问题，也没有给出承诺。你尊重她说的“另约”。

`H_gls_ASK_s.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s"],"character":"s","answer":"wait"},{"op":"groupFinish","members":["g","l","s"]}]`

后继：`@schedule`


---

## H_glt｜不许剪掉这次跑调

类型：`group`。元数据：`{"background":"diner","music":"warm","next":"H_glt_TALK","members":["g","l","t"],"minSlot":11,"requires":[]}`

### 正文

**旁白**：映雪想留一段只给在场人看的清唱，见月架好相机，晚棠负责关掉一屋子提示音。

`H_glt.r2.body.001`

**唐映雪**：她们一个管镜头，一个管手机。你不会是来管我的吧？

`H_glt.r2.body.002`

**顾晚棠**：我管的是谁又抢走最后一块点心。

`H_glt.r2.body.003`

**林见月**：先别动。我想拍她刚才那个表情——拍吗？

`H_glt.r2.body.004`

**唐映雪**：拍。跑调可以留，丑照得给我看。

`H_glt.r2.body.005`

**旁白**：她指着你面前最后一块点心，问你到底给谁。

`H_glt.r2.body.006`

### 选择 H_glt/favor_g

把最后一块点心递给晚棠。

可选条件：`null`

立即回应：

**旁白**：你把点心递过去。晚棠抬了下眉，把它掰开，留给你一小半。

`H_glt.favor_g.r4.reply.001`

**顾晚棠**：赏你跑腿费。

`H_glt.favor_g.r4.reply.002`

**唐映雪**：太小了吧，那半块明明是碎屑。

`H_glt.favor_g.r4.reply.003`

**林见月**：别争，我录下了，待会儿回看谁那块大。

`H_glt.favor_g.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_glt","value":"g"},{"op":"groupStart","members":["g","l","t"]}]`

后继：`H_glt_TALK`

### 选择 H_glt/favor_l

把点心递给见月，让她先休息。

可选条件：`null`

立即回应：

**许照**：先吃点，镜头等会儿再拍。

`H_glt.favor_l.r4.reply.001`

**林见月**：那你帮我拿一下相机。

`H_glt.favor_l.r4.reply.002`

**旁白**：她把机器关掉，接过点心。映雪探头看你僵硬的拿法。

`H_glt.favor_l.r4.reply.003`

**唐映雪**：别怕，不是抱小孩。

`H_glt.favor_l.r4.reply.004`

**顾晚棠**：看起来比他第一次找工作还紧张。

`H_glt.favor_l.r4.reply.005`

写入与操作：`[{"op":"set","key":"group_bias_glt","value":"l"},{"op":"groupStart","members":["g","l","t"]}]`

后继：`H_glt_TALK`

### 选择 H_glt/favor_t

把点心给映雪，请她唱完再吃。

可选条件：`null`

立即回应：

**唐映雪**：终于想起今天谁唱歌了？

`H_glt.favor_t.r4.reply.001`

**许照**：吃完再唱，还是唱完再吃？

`H_glt.favor_t.r4.reply.002`

**唐映雪**：唱完。你给我留好。

`H_glt.favor_t.r4.reply.003`

**旁白**：见月重新开机，晚棠朝你手里的点心看了一眼。你认真用盒子盖好，映雪看见了，唱到开头时还在笑。

`H_glt.favor_t.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_glt","value":"t"},{"op":"groupStart","members":["g","l","t"]}]`

后继：`H_glt_TALK`

### 选择 H_glt/all

再买一盒，不让最后一块成为难题。

可选条件：`null`

立即回应：

**许照**：我去再买一盒。不是偏心，是我自己也馋。

`H_glt.all.r4.reply.001`

**顾晚棠**：终于承认了。

`H_glt.all.r4.reply.002`

**旁白**：你回来时，大家已经坐好。映雪等你放下袋子才开唱，见月重新问过拍摄范围，按下录制。

`H_glt.all.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_glt","value":"all"},{"op":"groupStart","members":["g","l","t"]}]`

后继：`H_glt_TALK`


---

## H_glt_TALK｜有些话，由你先开口

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"H_glt_ASK_g"}`

### 正文

**旁白**：休息时，大家一起坐下，玩笑慢慢停了。你想认真问一问，以后是否还愿意这样一起相处。

`H_glt_TALK.r4.body.001`

**许照**：今天很开心。但有些事，还是要我自己说清楚。

`H_glt_TALK.r4.body.002`

### 选择 H_glt_TALK/tell

讲清现有关系，再分别问她们。

可选条件：`null`

立即回应：

**旁白**：你把名字说全，包括每段关系是约会还是排他承诺，没有把尚未答应的人说成恋人。

`H_glt_TALK.tell.r2.reply.001`

写入与操作：`[{"op":"discloseAll"}]`

后继：`H_glt_ASK_g`

### 选择 H_glt_TALK/wait

今天只一起相处，暂不扩大共同关系。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排之后，今天先不请大家答应新的关系。

`H_glt_TALK.wait.r4.reply.001`

**旁白**：你们确认这次只是一起相处。原有的私人约定保留，之后可以另约时间再谈。

`H_glt_TALK.wait.r4.reply.002`

写入与操作：`[{"op":"groupWait","members":["g","l","t"]}]`

后继：`@schedule`


---

## H_glt_ASK_g｜顾晚棠没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_glt_ASK_l","members":["g","l","t"]}`

### 正文

**旁白**：晚棠转向你，认真听完最后的问题。

`H_glt_ASK_g.r4.body.001`

**顾晚棠**：好，现在问我。你不用猜我会给哪种回答。

`H_glt_ASK_g.r4.body.002`

### 选择 H_glt_ASK_g/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_g",true]},{"eq":["scope_g","open"]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]},{"ne":["latent_g",true]},{"ne":["breach_g",true]},{"eq":["reciprocal_g",true]}]}`

立即回应：

**顾晚棠**：可以。我知道具体有哪些人，也愿意试。哪天我不舒服会说，今天这句答应也是真的。

`H_glt_ASK_g.ask.r2.reply.001`

**旁白**：晚棠答应之前先讲清边界。你没有把她的谨慎当成扫兴。

`H_glt_ASK_g.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"g","answer":"yes"}]`

后继：`H_glt_ASK_l`

### 选择 H_glt_ASK_g/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**顾晚棠**：你把问题讲明白了，但我现在不确认。下次谈具体安排，别临时加条款。

`H_glt_ASK_g.wait.r4.reply.001`

**旁白**：晚棠说完就停了。你知道这并非要价，而是一条必须由她自己确认的边界。

`H_glt_ASK_g.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"g","answer":"wait"}]`

后继：`H_glt_ASK_l`


---

## H_glt_ASK_l｜林见月没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_glt_ASK_t","members":["g","l","t"]}`

### 正文

**旁白**：见月转向你，认真听完最后的问题。

`H_glt_ASK_l.r4.body.001`

**林见月**：我想了一下。我的想法，我自己说。

`H_glt_ASK_l.r4.body.002`

### 选择 H_glt_ASK_l/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_l",true]},{"eq":["scope_l","open"]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]},{"ne":["latent_l",true]},{"ne":["breach_l",true]},{"eq":["reciprocal_l",true]}]}`

立即回应：

**林见月**：愿意。我知道现在有哪些人，也想试着一起相处。但我也会想单独见你，到时候直接说。

`H_glt_ASK_l.ask.r4.reply.001`

**旁白**：你认真答应，等她说完，没有让另一个人替她补答案。

`H_glt_ASK_l.ask.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"l","answer":"yes"}]`

后继：`H_glt_ASK_t`

### 选择 H_glt_ASK_l/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**林见月**：我现在没有答案。别把我今晚的笑剪成以后都会出现的镜头。

`H_glt_ASK_l.wait.r4.reply.001`

**旁白**：见月没有把刚才的笑收回，也没有因此多答应什么。你尊重两件事可以同时成立。

`H_glt_ASK_l.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"l","answer":"wait"}]`

后继：`H_glt_ASK_t`


---

## H_glt_ASK_t｜唐映雪没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"@schedule","members":["g","l","t"]}`

### 正文

**旁白**：映雪转向你，认真听完最后的问题。

`H_glt_ASK_t.r4.body.001`

**唐映雪**：轮到我啦。先别替我紧张。

`H_glt_ASK_t.r4.body.002`

### 选择 H_glt_ASK_t/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_t",true]},{"eq":["scope_t","open"]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]},{"ne":["latent_t",true]},{"ne":["breach_t",true]},{"eq":["reciprocal_t",true]}]}`

立即回应：

**唐映雪**：可以。我会吃醋，也会自己说，不让你靠猜。今晚我想跟你们再走一段。

`H_glt_ASK_t.ask.r2.reply.001`

**旁白**：映雪把可能吃醋的事说在了前面。你应下的是好好沟通，不是让她以后不许介意。

`H_glt_ASK_t.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"t","answer":"yes"},{"op":"groupFinish","members":["g","l","t"]}]`

后继：`@schedule`

### 选择 H_glt_ASK_t/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**唐映雪**：我还没想好要怎么跟大家相处。先不算答应，等你真有安排了再来问我。

`H_glt_ASK_t.wait.r4.reply.001`

**旁白**：映雪把话说完，仍然留下来听大家聊天。你没把她留在这里当作点头。

`H_glt_ASK_t.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","t"],"character":"t","answer":"wait"},{"op":"groupFinish","members":["g","l","t"]}]`

后继：`@schedule`


---

## H_gst｜她今天真的没排第二套方案

类型：`group`。元数据：`{"background":"diner","music":"warm","next":"H_gst_TALK","members":["g","s","t"],"minSlot":11,"requires":[]}`

### 正文

**旁白**：清辞提议去吃夜宵，到了店门口才发现今天休息。映雪笑得弯腰，晚棠拿出手机。

`H_gst.r2.body.001`

**沈清辞**：不许说你们早知道。今天就是想不查攻略出一次门。

`H_gst.r2.body.002`

**顾晚棠**：那我也不查。前面两条街，随便选？

`H_gst.r2.body.003`

**唐映雪**：输的人请饮料。许照，你站哪边？

`H_gst.r2.body.004`

**旁白**：没人真生气。可你刚朝其中一个人迈半步，另外两个人都看过来了。

`H_gst.r2.body.005`

### 选择 H_gst/favor_g

和晚棠一起选右边那条街。

可选条件：`null`

立即回应：

**旁白**：你站到晚棠身边，指了指右边。

`H_gst.favor_g.r4.reply.001`

**顾晚棠**：行，输了别说是我带坏的。

`H_gst.favor_g.r4.reply.002`

**唐映雪**：我记住了。你们两个一起请。

`H_gst.favor_g.r4.reply.003`

**旁白**：最后真找到了开门的小店。清辞看了看招牌，说这次就不研究点评了。

`H_gst.favor_g.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_gst","value":"g"},{"op":"groupStart","members":["g","s","t"]}]`

后继：`H_gst_TALK`

### 选择 H_gst/favor_s

陪清辞再往前找一家。

可选条件：`null`

立即回应：

**许照**：我跟清辞。第一次没备选，就算找到第三家也陪你。

`H_gst.favor_s.r4.reply.001`

**沈清辞**：倒也不用把今天说得这么惨。

`H_gst.favor_s.r4.reply.002`

**旁白**：映雪笑着催你们带路，晚棠收起手机。前面第二家还亮着灯，你们总算坐了进去。

`H_gst.favor_s.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_gst","value":"s"},{"op":"groupStart","members":["g","s","t"]}]`

后继：`H_gst_TALK`

### 选择 H_gst/favor_t

让映雪带路，跟她去找吃的。

可选条件：`null`

立即回应：

**唐映雪**：站我这边啊？那跟紧，我认得前面那家。

`H_gst.favor_t.r4.reply.001`

**沈清辞**：不是说不查攻略？

`H_gst.favor_t.r4.reply.002`

**唐映雪**：我又没查，我是吃过。

`H_gst.favor_t.r4.reply.003`

**旁白**：你们跟着她找到一间小店。晚棠看着菜单，说这份“作弊”她接受。

`H_gst.favor_t.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_gst","value":"t"},{"op":"groupStart","members":["g","s","t"]}]`

后继：`H_gst_TALK`

### 选择 H_gst/all

提议一起走，遇到开门的小店就吃。

可选条件：`null`

立即回应：

**许照**：别分两路了。前面第一家开着的店，我请饮料。

`H_gst.all.r4.reply.001`

**顾晚棠**：这句话我们都听见了。

`H_gst.all.r4.reply.002`

**旁白**：四个人一起往前走，总算找到还在营业的小店。你刚坐下，映雪就把饮料单推过来。

`H_gst.all.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_gst","value":"all"},{"op":"groupStart","members":["g","s","t"]}]`

后继：`H_gst_TALK`


---

## H_gst_TALK｜有些话，由你先开口

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"H_gst_ASK_g"}`

### 正文

**旁白**：小店里，大家终于坐下，玩笑慢慢停了。你想认真问一问，以后是否还愿意这样一起相处。

`H_gst_TALK.r4.body.001`

**许照**：今天很开心。但有些事，还是要我自己说清楚。

`H_gst_TALK.r4.body.002`

### 选择 H_gst_TALK/tell

讲清现有关系，再分别问她们。

可选条件：`null`

立即回应：

**旁白**：你把名字说全，包括每段关系是约会还是排他承诺，没有把尚未答应的人说成恋人。

`H_gst_TALK.tell.r2.reply.001`

写入与操作：`[{"op":"discloseAll"}]`

后继：`H_gst_ASK_g`

### 选择 H_gst_TALK/wait

今天只一起相处，暂不扩大共同关系。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排之后，今天先不请大家答应新的关系。

`H_gst_TALK.wait.r4.reply.001`

**旁白**：你们确认这次只是一起相处。原有的私人约定保留，之后可以另约时间再谈。

`H_gst_TALK.wait.r4.reply.002`

写入与操作：`[{"op":"groupWait","members":["g","s","t"]}]`

后继：`@schedule`


---

## H_gst_ASK_g｜顾晚棠没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_gst_ASK_s","members":["g","s","t"]}`

### 正文

**旁白**：晚棠转向你，认真听完最后的问题。

`H_gst_ASK_g.r4.body.001`

**顾晚棠**：好，现在问我。你不用猜我会给哪种回答。

`H_gst_ASK_g.r4.body.002`

### 选择 H_gst_ASK_g/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_g",true]},{"eq":["scope_g","open"]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]},{"ne":["latent_g",true]},{"ne":["breach_g",true]},{"eq":["reciprocal_g",true]}]}`

立即回应：

**顾晚棠**：可以。我知道具体有哪些人，也愿意试。哪天我不舒服会说，今天这句答应也是真的。

`H_gst_ASK_g.ask.r2.reply.001`

**旁白**：晚棠把“愿意”和“以后可以改变主意”同时说出来；你没有替她删掉后半句。

`H_gst_ASK_g.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"g","answer":"yes"}]`

后继：`H_gst_ASK_s`

### 选择 H_gst_ASK_g/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**顾晚棠**：先别替我做这个决定。想再聊，我们单独把边界和时间说清。

`H_gst_ASK_g.wait.r4.reply.001`

**旁白**：这一次没有所谓“默认通过”。她没有点头，你就不替她填上同意。

`H_gst_ASK_g.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"g","answer":"wait"}]`

后继：`H_gst_ASK_s`


---

## H_gst_ASK_s｜沈清辞没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_gst_ASK_t","members":["g","s","t"]}`

### 正文

**旁白**：清辞转向你，认真听完最后的问题。

`H_gst_ASK_s.r4.body.001`

**沈清辞**：我听清了。接下来是我的意思。

`H_gst_ASK_s.r4.body.002`

### 选择 H_gst_ASK_s/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_s",true]},{"eq":["scope_s","open"]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]},{"ne":["latent_s",true]},{"ne":["breach_s",true]},{"eq":["reciprocal_s",true]}]}`

立即回应：

**沈清辞**：我愿意。也要留只有你和我见面的晚上。那晚由我来约，不用你替我排满。

`H_gst_ASK_s.ask.r2.reply.001`

**旁白**：清辞亲自说出她的安排条件。你没有替她把“单独见面”改成“有空再说”。

`H_gst_ASK_s.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"s","answer":"yes"}]`

后继：`H_gst_ASK_t`

### 选择 H_gst_ASK_s/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**沈清辞**：这不是我会在临场签下的安排。想再谈，先给我一个明确的时间。

`H_gst_ASK_s.wait.r4.reply.001`

**旁白**：清辞把话说得很清楚：没有确认，就是没有安排。你不把今天算成承诺。

`H_gst_ASK_s.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"s","answer":"wait"}]`

后继：`H_gst_ASK_t`


---

## H_gst_ASK_t｜唐映雪没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"@schedule","members":["g","s","t"]}`

### 正文

**旁白**：映雪转向你，认真听完最后的问题。

`H_gst_ASK_t.r4.body.001`

**唐映雪**：轮到我啦。先别替我紧张。

`H_gst_ASK_t.r4.body.002`

### 选择 H_gst_ASK_t/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_t",true]},{"eq":["scope_t","open"]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]},{"ne":["latent_t",true]},{"ne":["breach_t",true]},{"eq":["reciprocal_t",true]}]}`

立即回应：

**唐映雪**：可以。我会吃醋，也会自己说，不让你靠猜。今晚我想跟你们再走一段。

`H_gst_ASK_t.ask.r2.reply.001`

**旁白**：她把“我会吃醋”说得坦荡，你没拿今天的答应要求她以后事事大度。

`H_gst_ASK_t.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"t","answer":"yes"},{"op":"groupFinish","members":["g","s","t"]}]`

后继：`@schedule`

### 选择 H_gst_ASK_t/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**唐映雪**：别急着给今晚写大结局，我还没答应。想谈以后怎么见面，找个不赶场的时间。

`H_gst_ASK_t.wait.r4.reply.001`

**旁白**：映雪先笑了一下，却没有改口。她要认真谈，你就不能用气氛替她回答。

`H_gst_ASK_t.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","s","t"],"character":"t","answer":"wait"},{"op":"groupFinish","members":["g","s","t"]}]`

后继：`@schedule`


---

## H_lst｜镜头之外，多留一个位置

类型：`group`。元数据：`{"background":"diner","music":"warm","next":"H_lst_TALK","members":["l","s","t"],"minSlot":11,"requires":[]}`

### 正文

**旁白**：见月想试一个固定镜头：三个人分别走进画面，最后由你关灯。

`H_lst.r2.body.001`

**唐映雪**：听起来我像临时演员。有没有片酬？

`H_lst.r2.body.002`

**沈清辞**：我来念开场，能不能加一句台词？

`H_lst.r2.body.003`

**林见月**：能。别一起抢，录音会炸。

`H_lst.r2.body.004`

**旁白**：第一遍三个人同时开口，谁也没忍住。见月先按掉录制，笑得比镜头里更明显。

`H_lst.r2.body.005`

**林见月**：重来。你这次想站谁旁边？

`H_lst.r2.body.006`

### 选择 H_lst/favor_l

站到见月身边，让她也进画面。

可选条件：`null`

立即回应：

**旁白**：你拉了把空椅子放在见月旁边，请她设置好固定机位，也坐进来。

`H_lst.favor_l.r4.reply.001`

**林见月**：那谁看机器？

`H_lst.favor_l.r4.reply.002`

**许照**：定好以后别管，拍坏了重来。

`H_lst.favor_l.r4.reply.003`

**旁白**：清辞帮着看了一遍构图，映雪数起拍子。见月终于站进画面，不用一直躲在相机后。

`H_lst.favor_l.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_lst","value":"l"},{"op":"groupStart","members":["l","s","t"]}]`

后继：`H_lst_TALK`

### 选择 H_lst/favor_s

站到清辞身边，一起念那句台词。

可选条件：`null`

立即回应：

**许照**：咱们一起念？错了就一起丢脸。

`H_lst.favor_s.r4.reply.001`

**沈清辞**：你先记住，轮到我说的时候别又抢拍。

`H_lst.favor_s.r4.reply.002`

**旁白**：映雪在旁边做了个拉拉链的动作，见月按下录制。这次总算把一句话完整说了出来。

`H_lst.favor_s.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_lst","value":"s"},{"op":"groupStart","members":["l","s","t"]}]`

后继：`H_lst_TALK`

### 选择 H_lst/favor_t

站到映雪身边，请她带自己数拍。

可选条件：`null`

立即回应：

**唐映雪**：跟我数，一、二——不是现在！

`H_lst.favor_t.r4.reply.001`

**旁白**：你又早进了一拍。清辞笑得把台词都忘了，见月只好再次停机。

`H_lst.favor_t.r4.reply.002`

**许照**：我觉得这段也挺有生活感。

`H_lst.favor_t.r4.reply.003`

**林见月**：有。但我们还是再来一遍。

`H_lst.favor_t.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_lst","value":"t"},{"op":"groupStart","members":["l","s","t"]}]`

后继：`H_lst_TALK`

### 选择 H_lst/all

换成一起进画面，不抢先后。

可选条件：`null`

立即回应：

**旁白**：你提议四个人一起进画面，顺序留给下一遍。

`H_lst.all.r4.reply.001`

**林见月**：行。最后一个顺手关灯。

`H_lst.all.r4.reply.002`

**旁白**：你们挤在门口，谁都不肯当最后一个。映雪最后把你推到后面，承诺替你留个好看的侧脸。

`H_lst.all.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_lst","value":"all"},{"op":"groupStart","members":["l","s","t"]}]`

后继：`H_lst_TALK`


---

## H_lst_TALK｜有些话，由你先开口

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"H_lst_ASK_l"}`

### 正文

**旁白**：休息时，大家一起坐下，玩笑慢慢停了。你想认真问一问，以后是否还愿意这样一起相处。

`H_lst_TALK.r4.body.001`

**许照**：今天很开心。但有些事，还是要我自己说清楚。

`H_lst_TALK.r4.body.002`

### 选择 H_lst_TALK/tell

讲清现有关系，再分别问她们。

可选条件：`null`

立即回应：

**旁白**：你把名字说全，包括每段关系是约会还是排他承诺，没有把尚未答应的人说成恋人。

`H_lst_TALK.tell.r2.reply.001`

写入与操作：`[{"op":"discloseAll"}]`

后继：`H_lst_ASK_l`

### 选择 H_lst_TALK/wait

今天只一起相处，暂不扩大共同关系。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排之后，今天先不请大家答应新的关系。

`H_lst_TALK.wait.r4.reply.001`

**旁白**：你们确认这次只是一起相处。原有的私人约定保留，之后可以另约时间再谈。

`H_lst_TALK.wait.r4.reply.002`

写入与操作：`[{"op":"groupWait","members":["l","s","t"]}]`

后继：`@schedule`


---

## H_lst_ASK_l｜林见月没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_lst_ASK_s","members":["l","s","t"]}`

### 正文

**旁白**：见月转向你，认真听完最后的问题。

`H_lst_ASK_l.r4.body.001`

**林见月**：我想了一下。我的想法，我自己说。

`H_lst_ASK_l.r4.body.002`

### 选择 H_lst_ASK_l/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_l",true]},{"eq":["scope_l","open"]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]},{"ne":["latent_l",true]},{"ne":["breach_l",true]},{"eq":["reciprocal_l",true]}]}`

立即回应：

**林见月**：愿意。我知道现在有哪些人，也想试着一起相处。但我也会想单独见你，到时候直接说。

`H_lst_ASK_l.ask.r4.reply.001`

**旁白**：你认真答应，等她说完，没有让另一个人替她补答案。

`H_lst_ASK_l.ask.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"l","answer":"yes"}]`

后继：`H_lst_ASK_s`

### 选择 H_lst_ASK_l/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**林见月**：今天的画面我记着，结论先不写。等我想好，会亲口告诉你。

`H_lst_ASK_l.wait.r4.reply.001`

**旁白**：她说的是“暂时不知道”，不是等着你猜出“愿意”。你没有替她加字幕。

`H_lst_ASK_l.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"l","answer":"wait"}]`

后继：`H_lst_ASK_s`


---

## H_lst_ASK_s｜沈清辞没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_lst_ASK_t","members":["l","s","t"]}`

### 正文

**旁白**：清辞转向你，认真听完最后的问题。

`H_lst_ASK_s.r4.body.001`

**沈清辞**：我听清了。接下来是我的意思。

`H_lst_ASK_s.r4.body.002`

### 选择 H_lst_ASK_s/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_s",true]},{"eq":["scope_s","open"]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]},{"ne":["latent_s",true]},{"ne":["breach_s",true]},{"eq":["reciprocal_s",true]}]}`

立即回应：

**沈清辞**：我愿意。也要留只有你和我见面的晚上。那晚由我来约，不用你替我排满。

`H_lst_ASK_s.ask.r2.reply.001`

**旁白**：她认真确认愿意继续，也明确保留只和你相处的晚上。你把两句都听进去了。

`H_lst_ASK_s.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"s","answer":"yes"}]`

后继：`H_lst_ASK_t`

### 选择 H_lst_ASK_s/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**沈清辞**：我愿意听，但还没决定。之后请单独跟我谈，不要用今天的聚会代替答案。

`H_lst_ASK_s.wait.r4.reply.001`

**旁白**：清辞还在听其他人说话，却没有替自己先排下下一次见面。你也没有催。

`H_lst_ASK_s.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"s","answer":"wait"}]`

后继：`H_lst_ASK_t`


---

## H_lst_ASK_t｜唐映雪没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"@schedule","members":["l","s","t"]}`

### 正文

**旁白**：映雪转向你，认真听完最后的问题。

`H_lst_ASK_t.r4.body.001`

**唐映雪**：轮到我啦。先别替我紧张。

`H_lst_ASK_t.r4.body.002`

### 选择 H_lst_ASK_t/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_t",true]},{"eq":["scope_t","open"]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]},{"ne":["latent_t",true]},{"ne":["breach_t",true]},{"eq":["reciprocal_t",true]}]}`

立即回应：

**唐映雪**：可以。我会吃醋，也会自己说，不让你靠猜。今晚我想跟你们再走一段。

`H_lst_ASK_t.ask.r2.reply.001`

**旁白**：映雪愿意试，也说清以后不舒服会直接讲。你没有把这当成一句漂亮台词。

`H_lst_ASK_t.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"t","answer":"yes"},{"op":"groupFinish","members":["l","s","t"]}]`

后继：`@schedule`

### 选择 H_lst_ASK_t/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**唐映雪**：我可以留下来听完，可留下不等于点头。下次我们单独把这件事说透。

`H_lst_ASK_t.wait.r4.reply.001`

**旁白**：她不愿让今晚的热闹变成一个仓促承诺。你让她保留这句话。

`H_lst_ASK_t.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["l","s","t"],"character":"t","answer":"wait"},{"op":"groupFinish","members":["l","s","t"]}]`

后继：`@schedule`


---

## H_glst｜一把伞不够，四个人都看着你

类型：`group`。元数据：`{"background":"diner","music":"warm","decisionSteps":[{"id":"together","label":"先照顾一起淋雨的人，不把谁当候补","options":["all"],"reply":[{"speaker":"S","text":"先等会儿吧。四个人都在，没必要把谁留在雨里。","id":"H_glst.v413.together.reply.001","textHash":"574f24bb76aaeb61"}],"after":[{"speaker":"N","text":"屋檐下的灯亮起来，四个人都有地方站，雨声暂时盖过了尴尬。","id":"H_glst.v413.together.after.001","textHash":"1afd16d2d03e6573"}]},{"id":"closer","label":"想先陪其中一个人，必须自己说出选择","options":["favor_g","favor_l","favor_s","favor_t"],"reply":[{"speaker":"G","text":"那就别躲着说。你先送谁，我们四个人都能听见。","id":"H_glst.v413.closer.reply.001","textHash":"609c0763cae57aee"}],"after":[{"speaker":"N","text":"同一把伞只能先容下两个人。她们都在看你会怎样照顾剩下的人。","id":"H_glst.v413.closer.after.001","textHash":"945872db2136abff"}]}],"next":"H_glst_TALK","members":["g","l","s","t"],"minSlot":11,"requires":[]}`

### 正文

**旁白**：你们忙完各自的安排，一起走到夜宵街。雨突然落下来，便利店只剩两把大伞。

`H_glst.r2.body.001`

**唐映雪**：你这么会猜，猜猜这雨什么时候停？

`H_glst.r2.body.002`

**许照**：这个真不会。要不先救一下我快湿透的鞋？

`H_glst.r2.body.003`

**沈清辞**：很好，终于轮到普通难题了。两把伞，五个人。

`H_glst.r2.body.004`

**顾晚棠**：我买伞。不等于我先选座位，别又替我算账。

`H_glst.r2.body.005`

**林见月**：先站进屋檐。你们再吵一会儿，最湿的是许照。

`H_glst.r2.body.006`

**旁白**：映雪把手里热饮塞给你。清辞给你擦掉额角的雨，晚棠看见了，故意慢了一拍才递来伞。

`H_glst.r2.body.007`

**顾晚棠**：行。现在到你了。你最想先陪谁走这一段？

`H_glst.r2.body.008`

### 选择 H_glst/favor_g

先陪晚棠撑伞走到小店。

可选条件：`null`

立即回应：

**旁白**：你替晚棠撑起伞。她抬头看了一眼，往里站近一点。

`H_glst.favor_g.r4.reply.001`

**顾晚棠**：别光照顾我，你肩膀已经在外面了。

`H_glst.favor_g.r4.reply.002`

**唐映雪**：我们听见啦。两个人别偷偷走太快。

`H_glst.favor_g.r4.reply.003`

**旁白**：雨不大，另一把伞下的三个人慢慢跟上，一起到了有遮檐的小店。

`H_glst.favor_g.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_glst","value":"g"},{"op":"groupStart","members":["g","l","s","t"]}]`

后继：`H_glst_TALK`

### 选择 H_glst/favor_l

先和见月走在同一把伞下。

可选条件：`null`

立即回应：

**旁白**：见月接过一侧伞柄，跟你一起往前走。

`H_glst.favor_l.r4.reply.001`

**林见月**：别急，地上滑。我今天没带相机，不用怕拍到你摔跤。

`H_glst.favor_l.r4.reply.002`

**许照**：听着完全没被安慰到。

`H_glst.favor_l.r4.reply.003`

**旁白**：她笑起来。身后三个人用另一把大伞跟上，你们在小店门口重新会合。

`H_glst.favor_l.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_glst","value":"l"},{"op":"groupStart","members":["g","l","s","t"]}]`

后继：`H_glst_TALK`

### 选择 H_glst/favor_s

先陪清辞撑伞，走慢一点。

可选条件：`null`

立即回应：

**旁白**：清辞往你这边靠了靠，提醒你前面有积水。

`H_glst.favor_s.r4.reply.001`

**许照**：今天还要你提醒我看路。

`H_glst.favor_s.r4.reply.002`

**沈清辞**：不然呢，总不能看着你踩进去。

`H_glst.favor_s.r4.reply.003`

**顾晚棠**：许照，别把我们的路也走没了。

`H_glst.favor_s.r4.reply.004`

**旁白**：你赶紧挪开一点，和大家一起到了前面的小店。

`H_glst.favor_s.r4.reply.005`

写入与操作：`[{"op":"set","key":"group_bias_glst","value":"s"},{"op":"groupStart","members":["g","l","s","t"]}]`

后继：`H_glst_TALK`

### 选择 H_glst/favor_t

先陪映雪撑伞，替她拿好热饮。

可选条件：`null`

立即回应：

**唐映雪**：那走吧。热饮拿稳，我可不想到了只剩半杯。

`H_glst.favor_t.r4.reply.001`

**旁白**：你小心护着杯口，她把伞向你这边倾了一点。

`H_glst.favor_t.r4.reply.002`

**沈清辞**：前面那家有檐，先到那里。

`H_glst.favor_t.r4.reply.003`

**旁白**：另一把伞下的三个人跟上来，你们在店门口一同收伞。

`H_glst.favor_t.r4.reply.004`

写入与操作：`[{"op":"set","key":"group_bias_glst","value":"t"},{"op":"groupStart","members":["g","l","s","t"]}]`

后继：`H_glst_TALK`

### 选择 H_glst/all

先在屋檐等雨小些，再一起走。

可选条件：`null`

立即回应：

**许照**：先别挤了。等两分钟？我去问店员能不能借个袋子装热饮。

`H_glst.all.r4.reply.001`

**旁白**：你们在屋檐下待了一会儿。雨小下来以后，两把伞勉强够用，一行人慢慢走到前面的小店。

`H_glst.all.r4.reply.002`

**唐映雪**：行，这回谁也没抢跑。

`H_glst.all.r4.reply.003`

写入与操作：`[{"op":"set","key":"group_bias_glst","value":"all"},{"op":"groupStart","members":["g","l","s","t"]}]`

后继：`H_glst_TALK`


---

## H_glst_TALK｜有些话，由你先开口

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"H_glst_ASK_g"}`

### 正文

**旁白**：小店里，大家终于坐下，玩笑慢慢停了。你想认真问一问，以后是否还愿意这样一起相处。

`H_glst_TALK.r4.body.001`

**许照**：今天很开心。但有些事，还是要我自己说清楚。

`H_glst_TALK.r4.body.002`

### 选择 H_glst_TALK/tell

讲清现有关系，再分别问她们。

可选条件：`null`

立即回应：

**旁白**：你把名字说全，包括每段关系是约会还是排他承诺，没有把尚未答应的人说成恋人。

`H_glst_TALK.tell.r2.reply.001`

写入与操作：`[{"op":"discloseAll"}]`

后继：`H_glst_ASK_g`

### 选择 H_glst_TALK/wait

今天只一起相处，暂不扩大共同关系。

可选条件：`null`

立即回应：

**许照**：我还没想好怎么安排之后，今天先不请大家答应新的关系。

`H_glst_TALK.wait.r4.reply.001`

**旁白**：你们确认这次只是一起相处。原有的私人约定保留，之后可以另约时间再谈。

`H_glst_TALK.wait.r4.reply.002`

写入与操作：`[{"op":"groupWait","members":["g","l","s","t"]}]`

后继：`@schedule`


---

## H_glst_ASK_g｜顾晚棠没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_glst_ASK_l","members":["g","l","s","t"]}`

### 正文

**旁白**：晚棠转向你，认真听完最后的问题。

`H_glst_ASK_g.r4.body.001`

**顾晚棠**：好，现在问我。你不用猜我会给哪种回答。

`H_glst_ASK_g.r4.body.002`

### 选择 H_glst_ASK_g/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_g",true]},{"eq":["scope_g","open"]},{"ne":["pending_g",true]},{"ne":["value_conflict_g",true]},{"ne":["latent_g",true]},{"ne":["breach_g",true]},{"eq":["reciprocal_g",true]}]}`

立即回应：

**顾晚棠**：可以。我知道具体有哪些人，也愿意试。哪天我不舒服会说，今天这句答应也是真的。

`H_glst_ASK_g.ask.r2.reply.001`

**旁白**：面对所有人，晚棠仍只代表自己。你没有把她的回答写成四个人的统一承诺。

`H_glst_ASK_g.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"g","answer":"yes"}]`

后继：`H_glst_ASK_l`

### 选择 H_glst_ASK_g/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**顾晚棠**：四个人都在场，也不能把四份意见合成一个答案。我这份先留空。

`H_glst_ASK_g.wait.r4.reply.001`

**旁白**：在所有人面前，晚棠仍有权保留自己的答案。她那一栏今晚空着。

`H_glst_ASK_g.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"g","answer":"wait"}]`

后继：`H_glst_ASK_l`


---

## H_glst_ASK_l｜林见月没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_glst_ASK_s","members":["g","l","s","t"]}`

### 正文

**旁白**：见月转向你，认真听完最后的问题。

`H_glst_ASK_l.r4.body.001`

**林见月**：我想了一下。我的想法，我自己说。

`H_glst_ASK_l.r4.body.002`

### 选择 H_glst_ASK_l/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_l",true]},{"eq":["scope_l","open"]},{"ne":["pending_l",true]},{"ne":["value_conflict_l",true]},{"ne":["latent_l",true]},{"ne":["breach_l",true]},{"eq":["reciprocal_l",true]}]}`

立即回应：

**林见月**：愿意。我知道现在有哪些人，也想试着一起相处。但我也会想单独见你，到时候直接说。

`H_glst_ASK_l.ask.r4.reply.001`

**旁白**：你认真答应，等她说完，没有让另一个人替她补答案。

`H_glst_ASK_l.ask.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"l","answer":"yes"}]`

后继：`H_glst_ASK_s`

### 选择 H_glst_ASK_l/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**林见月**：四个人都在，我更需要一点自己的空间。今天先不确认，别替我拍板。

`H_glst_ASK_l.wait.r4.reply.001`

**旁白**：见月往后坐了坐。今晚有四份意见，而她这一份仍需要时间。

`H_glst_ASK_l.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"l","answer":"wait"}]`

后继：`H_glst_ASK_s`


---

## H_glst_ASK_s｜沈清辞没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"H_glst_ASK_t","members":["g","l","s","t"]}`

### 正文

**旁白**：清辞转向你，认真听完最后的问题。

`H_glst_ASK_s.r4.body.001`

**沈清辞**：我听清了。接下来是我的意思。

`H_glst_ASK_s.r4.body.002`

### 选择 H_glst_ASK_s/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_s",true]},{"eq":["scope_s","open"]},{"ne":["pending_s",true]},{"ne":["value_conflict_s",true]},{"ne":["latent_s",true]},{"ne":["breach_s",true]},{"eq":["reciprocal_s",true]}]}`

立即回应：

**沈清辞**：我愿意。也要留只有你和我见面的晚上。那晚由我来约，不用你替我排满。

`H_glst_ASK_s.ask.r2.reply.001`

**旁白**：在四个人面前，清辞仍然为自己的时间作主。你没有把她的回答变成别人的日程。

`H_glst_ASK_s.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"s","answer":"yes"}]`

后继：`H_glst_ASK_t`

### 选择 H_glst_ASK_s/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**沈清辞**：今天人多，越要把话分开说。我先不确认，等有了具体安排再谈。

`H_glst_ASK_s.wait.r4.reply.001`

**旁白**：这不是一次全员表决。清辞仍保留自己的判断，你把这点记清了。

`H_glst_ASK_s.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"s","answer":"wait"}]`

后继：`H_glst_ASK_t`


---

## H_glst_ASK_t｜唐映雪没有让别人替她回答

类型：`group_followup`。元数据：`{"background":"diner","music":"warm","next":"@schedule","members":["g","l","s","t"]}`

### 正文

**旁白**：映雪转向你，认真听完最后的问题。

`H_glst_ASK_t.r4.body.001`

**唐映雪**：轮到我啦。先别替我紧张。

`H_glst_ASK_t.r4.body.002`

### 选择 H_glst_ASK_t/ask

知道这些以后，你愿意这样继续吗？

可选条件：`{"all":[{"eq":["active_t",true]},{"eq":["scope_t","open"]},{"ne":["pending_t",true]},{"ne":["value_conflict_t",true]},{"ne":["latent_t",true]},{"ne":["breach_t",true]},{"eq":["reciprocal_t",true]}]}`

立即回应：

**唐映雪**：可以。我会吃醋，也会自己说，不让你靠猜。今晚我想跟你们再走一段。

`H_glst_ASK_t.ask.r2.reply.001`

**旁白**：在大家面前，映雪仍保有自己的情绪和退路。她说的是愿意尝试，而非永远不会变。

`H_glst_ASK_t.ask.r2.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"t","answer":"yes"},{"op":"groupFinish","members":["g","l","s","t"]}]`

后继：`@schedule`

### 选择 H_glst_ASK_t/wait

这次先不确认她参与的共同安排。

可选条件：`null`

立即回应：

**唐映雪**：四个人都在，我更不想随口答应。先缓缓，等你把每个人的时间安排想清楚。

`H_glst_ASK_t.wait.r4.reply.001`

**旁白**：映雪把视线转向其余几个人，谁也没催她。你承认“先缓缓”就是她目前的答案。

`H_glst_ASK_t.wait.r4.reply.002`

写入与操作：`[{"op":"groupVote","members":["g","l","s","t"],"character":"t","answer":"wait"},{"op":"groupFinish","members":["g","l","s","t"]}]`

后继：`@schedule`


---

## DUE_s｜答应要说的话，现在到时间了

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@calendarResume"}`

### 正文

**旁白**：散场时，她在出口叫住你。你刚才说过，会在离开前把关系讲清楚。

`DUE_s.r4.body.001`

**沈清辞**：现在可以说了吗？我在听。

`DUE_s.r4.body.002`

### 选择 DUE_s/truth

现在把真实关系讲清。

可选条件：`null`

立即回应：

**旁白**：你把真正开始的约会和已有承诺逐一说清，不把普通朋友算成恋人。

`DUE_s.truth.r4.reply.001`

**沈清辞**：我听明白了。我需要想一想，不用现在催我答应。

`DUE_s.truth.r4.reply.002`

写入与操作：`[{"op":"disclose","character":"s"},{"op":"set","key":"deferred_s","value":false},{"op":"set","key":"disclosure_kept_s","value":true}]`

后继：`@calendarResume`

### 选择 DUE_s/delay

承认还说不清，不编新的否认。

可选条件：`null`

立即回应：

**沈清辞**：那今天就先这样。我不会当你已经说清。

`DUE_s.delay.r2.reply.001`

**旁白**：她先走了。这次未兑现的说明留下具体问题，下一次得从这里接。

`DUE_s.delay.r2.reply.002`

写入与操作：`[{"op":"set","key":"deferred_s","value":false},{"op":"set","key":"pending_s","value":true},{"op":"set","key":"disclosure_missed_s","value":true}]`

后继：`@calendarResume`

### 选择 DUE_s/deny

仍然回答：没有其他关系。

可选条件：`null`

立即回应：

**沈清辞**：好，我记住你说的是没有。

`DUE_s.deny.r2.reply.001`

**旁白**：你没有再解释。她照着你给出的答案离开，你站在门口看了会儿手机。

`DUE_s.deny.r2.reply.002`

写入与操作：`[{"op":"denyRelations","character":"s"},{"op":"set","key":"deferred_s","value":false}]`

后继：`@calendarResume`


---

## DUE_g｜答应要说的话，现在到时间了

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@calendarResume"}`

### 正文

**旁白**：散场时，她在出口叫住你。你刚才说过，会在离开前把关系讲清楚。

`DUE_g.r4.body.001`

**顾晚棠**：先等等。你说散场前讲，现在呢？

`DUE_g.r4.body.002`

### 选择 DUE_g/truth

现在把真实关系讲清。

可选条件：`null`

立即回应：

**旁白**：你把真正开始的约会和已有承诺逐一说清，不把普通朋友算成恋人。

`DUE_g.truth.r4.reply.001`

**顾晚棠**：好，至少现在话说全了。让我自己想一下。

`DUE_g.truth.r4.reply.002`

写入与操作：`[{"op":"disclose","character":"g"},{"op":"set","key":"deferred_g","value":false},{"op":"set","key":"disclosure_kept_g","value":true}]`

后继：`@calendarResume`

### 选择 DUE_g/delay

承认还说不清，不编新的否认。

可选条件：`null`

立即回应：

**顾晚棠**：那今天就先这样。我不会当你已经说清。

`DUE_g.delay.r2.reply.001`

**旁白**：她先走了。这次未兑现的说明留下具体问题，下一次得从这里接。

`DUE_g.delay.r2.reply.002`

写入与操作：`[{"op":"set","key":"deferred_g","value":false},{"op":"set","key":"pending_g","value":true},{"op":"set","key":"disclosure_missed_g","value":true}]`

后继：`@calendarResume`

### 选择 DUE_g/deny

仍然回答：没有其他关系。

可选条件：`null`

立即回应：

**顾晚棠**：好，我记住你说的是没有。

`DUE_g.deny.r2.reply.001`

**旁白**：你没有再解释。她照着你给出的答案离开，你站在门口看了会儿手机。

`DUE_g.deny.r2.reply.002`

写入与操作：`[{"op":"denyRelations","character":"g"},{"op":"set","key":"deferred_g","value":false}]`

后继：`@calendarResume`


---

## FOUND_t｜她核对的是你亲口说过的话

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@afterDiscovery"}`

### 正文

**旁白**：听见你刚刚说出的关系和时间，她停住了动作。你们之前谈过这件事，当时你明确说过没有。

`FOUND_t.r4.body.001`

**唐映雪**：等会儿。你刚说的这个时间，那时你们已经在约会了。你之前为什么跟我说没有？

`FOUND_t.r4.body.002`

### 选择 FOUND_t/admit

承认当时确实隐瞒了。

可选条件：`null`

立即回应：

**唐映雪**：好，至少现在肯说实话了。今天我不想再继续约会。

`FOUND_t.admit.r4.reply.001`

写入与操作：`[{"op":"ackDiscovery","character":"t"}]`

后继：`@afterDiscovery`

### 选择 FOUND_t/evade

说没必要纠结，不承认隐瞒。

可选条件：`null`

立即回应：

**唐映雪**：不是我揪着过去，是你现在还不肯认。今天别继续了。

`FOUND_t.evade.r4.reply.001`

写入与操作：`[{"op":"set","key":"value_conflict_t","value":true},{"op":"set","key":"repair_evaded_t","value":true}]`

后继：`@afterDiscovery`

### 选择 FOUND_t/end

说清不再继续，把事实留下，不靠失联结束。

可选条件：`null`

立即回应：

**唐映雪**：知道了。这段先到这里。

`FOUND_t.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"t","reason":"conflict"}]`

后继：`@afterDiscovery`


---

## FOUND_s｜她核对的是你亲口说过的话

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@afterDiscovery"}`

### 正文

**旁白**：听见你刚刚说出的关系和时间，她停住了动作。你们之前谈过这件事，当时你明确说过没有。

`FOUND_s.r4.body.001`

**沈清辞**：我确认一下时间。你刚才说的关系，在我问你以前就开始了？那当时的回答为什么是没有？

`FOUND_s.r4.body.002`

### 选择 FOUND_s/admit

承认当时确实隐瞒了。

可选条件：`null`

立即回应：

**沈清辞**：我听到了。今天先到这里，之后再谈怎么处理。

`FOUND_s.admit.r4.reply.001`

写入与操作：`[{"op":"ackDiscovery","character":"s"}]`

后继：`@afterDiscovery`

### 选择 FOUND_s/evade

说没必要纠结，不承认隐瞒。

可选条件：`null`

立即回应：

**沈清辞**：我问的是一个具体问题。你不回答，那我们先停下。

`FOUND_s.evade.r4.reply.001`

写入与操作：`[{"op":"set","key":"value_conflict_s","value":true},{"op":"set","key":"repair_evaded_s","value":true}]`

后继：`@afterDiscovery`

### 选择 FOUND_s/end

说清不再继续，把事实留下，不靠失联结束。

可选条件：`null`

立即回应：

**沈清辞**：知道了。这段先到这里。

`FOUND_s.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"s","reason":"conflict"}]`

后继：`@afterDiscovery`


---

## FOUND_l｜她核对的是你亲口说过的话

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@afterDiscovery"}`

### 正文

**旁白**：听见你刚刚说出的关系和时间，她停住了动作。你们之前谈过这件事，当时你明确说过没有。

`FOUND_l.r4.body.001`

**林见月**：我记得你之前说没有别人。可按你刚讲的时间，不是后来才开始的，对吗？

`FOUND_l.r4.body.002`

### 选择 FOUND_l/admit

承认当时确实隐瞒了。

可选条件：`null`

立即回应：

**林见月**：让我缓一缓。我不想刚听见这些，就继续装没事。

`FOUND_l.admit.r4.reply.001`

写入与操作：`[{"op":"ackDiscovery","character":"l"}]`

后继：`@afterDiscovery`

### 选择 FOUND_l/evade

说没必要纠结，不承认隐瞒。

可选条件：`null`

立即回应：

**林见月**：我不是在考你的记性。你这样说，我更不知道哪句可信。

`FOUND_l.evade.r4.reply.001`

写入与操作：`[{"op":"set","key":"value_conflict_l","value":true},{"op":"set","key":"repair_evaded_l","value":true}]`

后继：`@afterDiscovery`

### 选择 FOUND_l/end

说清不再继续，把事实留下，不靠失联结束。

可选条件：`null`

立即回应：

**林见月**：知道了。这段先到这里。

`FOUND_l.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"l","reason":"conflict"}]`

后继：`@afterDiscovery`


---

## FOUND_g｜她核对的是你亲口说过的话

类型：`common`。元数据：`{"background":"diner","music":"warm","next":"@afterDiscovery"}`

### 正文

**旁白**：听见你刚刚说出的关系和时间，她停住了动作。你们之前谈过这件事，当时你明确说过没有。

`FOUND_g.r4.body.001`

**顾晚棠**：时间对不上。你当时告诉我没有别人，现在又说那时就在约会。哪一句是真的？

`FOUND_g.r4.body.002`

### 选择 FOUND_g/admit

承认当时确实隐瞒了。

可选条件：`null`

立即回应：

**顾晚棠**：明白。先别点下一次约会了，我们还有别的事要谈。

`FOUND_g.admit.r4.reply.001`

写入与操作：`[{"op":"ackDiscovery","character":"g"}]`

后继：`@afterDiscovery`

### 选择 FOUND_g/evade

说没必要纠结，不承认隐瞒。

可选条件：`null`

立即回应：

**顾晚棠**：你可以不回答。我也可以先不继续这段关系。

`FOUND_g.evade.r4.reply.001`

写入与操作：`[{"op":"set","key":"value_conflict_g","value":true},{"op":"set","key":"repair_evaded_g","value":true}]`

后继：`@afterDiscovery`

### 选择 FOUND_g/end

说清不再继续，把事实留下，不靠失联结束。

可选条件：`null`

立即回应：

**顾晚棠**：知道了。这段先到这里。

`FOUND_g.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"g","reason":"conflict"}]`

后继：`@afterDiscovery`


---

## RA_t｜这次，先把答应的事做出来

类型：`repair_action`。元数据：`{"background":"diner","music":"warm","next":"R2_t","character":"t"}`

### 正文

**旁白**：你按约见到映雪，先说明自己今天准备更正的事。

`RA_t.r4.body.001`

**唐映雪**：那先做。别一边说一边问我还生不生气。

`RA_t.r4.body.002`

### 条件正文 · RA_t.r2.relations

条件：`{"hasDenial":"t"}`

**唐映雪**：你先说过没有别人。这次请你自己把那句更正给实际被牵涉的人，不用发他们的聊天给我看。

`RA_t.r2.relations.001`

### 条件正文 · RA_t.r2.source

条件：`{"eq":["opening_lie_t",true]}`

**唐映雪**：你借过阿衡的名字。先当着我的面向他说明，不要再让我替你查。

`RA_t.r2.source.001`

### 条件正文 · RA_t.r2.value

条件：`{"eq":["value_conflict_t",true]}`

**唐映雪**：把让我介意的那句话当面收回。你可以说自己难受，别再把它变成我要照办的要求。

`RA_t.r2.value.001`

### 选择 RA_t/act

当面完成相关更正。

可选条件：`null`

立即回应：

**旁白**：你按已经确认的问题逐项更正，请她听完再核对。

`RA_t.act.r4.reply.001`

回应条件：`{"hasDenial":"t"}`（按点击前状态判断）

**旁白**：你先向她明确更正否认，再分别通知被自己承诺牵涉的人，说明真实范围。没有拿一条群发当任何人的同意。

`RA_t.act.r2.denial.001`

回应条件：`{"eq":["opening_lie_t",true]}`（按点击前状态判断）

**旁白**：你当面联系阿衡，承认消息不是他给的。阿衡确认收到更正，她在一旁听完。

`RA_t.act.r2.source.001`

回应条件：`{"eq":["value_conflict_t",true]}`（按点击前状态判断）

**旁白**：你把那次越界要求按原话说出来，明确撤回，不再拿继续来往当交换。她重新说了自己的决定，你当面答应按这个决定办。

`RA_t.act.r2.value.001`

回应条件：`{"all":[{"not":{"hasDenial":"t"}},{"ne":["opening_lie_t",true]},{"ne":["value_conflict_t",true]}]}`（按点击前状态判断）

**旁白**：你当面把此前没说全的实际关系逐项讲清，确认没有把别人未答应的安排也算进去。

`RA_t.act.r2.other.001`

写入与操作：`[{"op":"performRepair","character":"t"}]`

后继：`R2_t`

### 选择 RA_t/delay

承认今天还没有完成。

可选条件：`null`

立即回应：

**唐映雪**：还没做就别先唱结果。更正完成了再告诉我，我会看你真正做了什么。

`RA_t.delay.r2.reply.001`

写入与操作：`[{"op":"set","key":"repair_action_t","value":false},{"op":"set","key":"repair_delayed_t","value":true}]`

后继：`@schedule`

### 选择 RA_t/end

说清不再继续，结束私人安排。

可选条件：`null`

立即回应：

**旁白**：你明确结束安排，不让对方继续替一句“下次”留时间。

`RA_t.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"t","reason":"conflict"},{"op":"set","key":"repair_started_t","value":false}]`

后继：`@schedule`


---

## RA_s｜这次，先把答应的事做出来

类型：`repair_action`。元数据：`{"background":"diner","music":"warm","next":"R2_s","character":"s"}`

### 正文

**旁白**：你按约见到清辞，先说明自己今天准备更正的事。

`RA_s.r4.body.001`

**沈清辞**：好，先把事情处理完。之后再谈下一次。

`RA_s.r4.body.002`

### 条件正文 · RA_s.r2.relations

条件：`{"hasDenial":"s"}`

**沈清辞**：你先说过没有别人。这次请你自己把那句更正给实际被牵涉的人，不用发他们的聊天给我看。

`RA_s.r2.relations.001`

### 条件正文 · RA_s.r2.source

条件：`{"eq":["opening_lie_s",true]}`

**沈清辞**：你借过阿衡的名字。先当着我的面向他说明，不要再让我替你查。

`RA_s.r2.source.001`

### 条件正文 · RA_s.r2.value

条件：`{"eq":["value_conflict_s",true]}`

**沈清辞**：把让我介意的那句话当面收回。你可以说自己难受，别再把它变成我要照办的要求。

`RA_s.r2.value.001`

### 条件正文 · RA_s.r2.promise

条件：`{"eq":["disclosure_missed_s",true]}`

**沈清辞**：你说散场前说清，最后没说。这次先讲完，再约下一顿饭。

`RA_s.r2.promise.001`

### 选择 RA_s/act

当面完成相关更正。

可选条件：`null`

立即回应：

**旁白**：你按已经确认的问题逐项更正，请她听完再核对。

`RA_s.act.r4.reply.001`

回应条件：`{"hasDenial":"s"}`（按点击前状态判断）

**旁白**：你先向她明确更正否认，再分别通知被自己承诺牵涉的人，说明真实范围。没有拿一条群发当任何人的同意。

`RA_s.act.r2.denial.001`

回应条件：`{"eq":["opening_lie_s",true]}`（按点击前状态判断）

**旁白**：你当面联系阿衡，承认消息不是他给的。阿衡确认收到更正，她在一旁听完。

`RA_s.act.r2.source.001`

回应条件：`{"eq":["value_conflict_s",true]}`（按点击前状态判断）

**旁白**：你把那次越界要求按原话说出来，明确撤回，不再拿继续来往当交换。她重新说了自己的决定，你当面答应按这个决定办。

`RA_s.act.r2.value.001`

回应条件：`{"all":[{"not":{"hasDenial":"s"}},{"ne":["opening_lie_s",true]},{"ne":["value_conflict_s",true]}]}`（按点击前状态判断）

**旁白**：你当面把此前没说全的实际关系逐项讲清，确认没有把别人未答应的安排也算进去。

`RA_s.act.r2.other.001`

写入与操作：`[{"op":"performRepair","character":"s"}]`

后继：`R2_s`

### 选择 RA_s/delay

承认今天还没有完成。

可选条件：`null`

立即回应：

**沈清辞**：那就先记作还没完成。以后拿实际更正来谈，不必替我安排什么时候原谅。

`RA_s.delay.r2.reply.001`

写入与操作：`[{"op":"set","key":"repair_action_s","value":false},{"op":"set","key":"repair_delayed_s","value":true}]`

后继：`@schedule`

### 选择 RA_s/end

说清不再继续，结束私人安排。

可选条件：`null`

立即回应：

**旁白**：你明确结束安排，不让对方继续替一句“下次”留时间。

`RA_s.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"s","reason":"conflict"},{"op":"set","key":"repair_started_s","value":false}]`

后继：`@schedule`


---

## RA_l｜这次，先把答应的事做出来

类型：`repair_action`。元数据：`{"background":"diner","music":"warm","next":"R2_l","character":"l"}`

### 正文

**旁白**：你按约见到见月，先说明自己今天准备更正的事。

`RA_l.r4.body.001`

**林见月**：我会听着。不用急着把结果说得好一点。

`RA_l.r4.body.002`

### 条件正文 · RA_l.r2.relations

条件：`{"hasDenial":"l"}`

**林见月**：你先说过没有别人。这次请你自己把那句更正给实际被牵涉的人，不用发他们的聊天给我看。

`RA_l.r2.relations.001`

### 条件正文 · RA_l.r2.source

条件：`{"eq":["opening_lie_l",true]}`

**林见月**：你借过阿衡的名字。先当着我的面向他说明，不要再让我替你查。

`RA_l.r2.source.001`

### 条件正文 · RA_l.r2.value

条件：`{"eq":["value_conflict_l",true]}`

**林见月**：把让我介意的那句话当面收回。你可以说自己难受，别再把它变成我要照办的要求。

`RA_l.r2.value.001`

### 选择 RA_l/act

当面完成相关更正。

可选条件：`null`

立即回应：

**旁白**：你按已经确认的问题逐项更正，请她听完再核对。

`RA_l.act.r4.reply.001`

回应条件：`{"hasDenial":"l"}`（按点击前状态判断）

**旁白**：你先向她明确更正否认，再分别通知被自己承诺牵涉的人，说明真实范围。没有拿一条群发当任何人的同意。

`RA_l.act.r2.denial.001`

回应条件：`{"eq":["opening_lie_l",true]}`（按点击前状态判断）

**旁白**：你当面联系阿衡，承认消息不是他给的。阿衡确认收到更正，她在一旁听完。

`RA_l.act.r2.source.001`

回应条件：`{"eq":["value_conflict_l",true]}`（按点击前状态判断）

**旁白**：你把那次越界要求按原话说出来，明确撤回，不再拿继续来往当交换。她重新说了自己的决定，你当面答应按这个决定办。

`RA_l.act.r2.value.001`

回应条件：`{"all":[{"not":{"hasDenial":"l"}},{"ne":["opening_lie_l",true]},{"ne":["value_conflict_l",true]}]}`（按点击前状态判断）

**旁白**：你当面把此前没说全的实际关系逐项讲清，确认没有把别人未答应的安排也算进去。

`RA_l.act.r2.other.001`

写入与操作：`[{"op":"performRepair","character":"l"}]`

后继：`R2_l`

### 选择 RA_l/delay

承认今天还没有完成。

可选条件：`null`

立即回应：

**林见月**：先不用约下一次。等你把该向谁解释的都解释清楚，我再决定要不要听。

`RA_l.delay.r2.reply.001`

写入与操作：`[{"op":"set","key":"repair_action_l","value":false},{"op":"set","key":"repair_delayed_l","value":true}]`

后继：`@schedule`

### 选择 RA_l/end

说清不再继续，结束私人安排。

可选条件：`null`

立即回应：

**旁白**：你明确结束安排，不让对方继续替一句“下次”留时间。

`RA_l.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"l","reason":"conflict"},{"op":"set","key":"repair_started_l","value":false}]`

后继：`@schedule`


---

## RA_g｜这次，先把答应的事做出来

类型：`repair_action`。元数据：`{"background":"diner","music":"warm","next":"R2_g","character":"g"}`

### 正文

**旁白**：你按约见到晚棠，先说明自己今天准备更正的事。

`RA_g.r4.body.001`

**顾晚棠**：来吧。今天先不谈“下次一定”。

`RA_g.r4.body.002`

### 条件正文 · RA_g.r2.relations

条件：`{"hasDenial":"g"}`

**顾晚棠**：你先说过没有别人。这次请你自己把那句更正给实际被牵涉的人，不用发他们的聊天给我看。

`RA_g.r2.relations.001`

### 条件正文 · RA_g.r2.source

条件：`{"eq":["opening_lie_g",true]}`

**顾晚棠**：你借过阿衡的名字。先当着我的面向他说明，不要再让我替你查。

`RA_g.r2.source.001`

### 条件正文 · RA_g.r2.value

条件：`{"eq":["value_conflict_g",true]}`

**顾晚棠**：把让我介意的那句话当面收回。你可以说自己难受，别再把它变成我要照办的要求。

`RA_g.r2.value.001`

### 条件正文 · RA_g.r2.promise

条件：`{"eq":["disclosure_missed_g",true]}`

**顾晚棠**：你说散场前说清，最后没说。这次先讲完，再约下一顿饭。

`RA_g.r2.promise.001`

### 选择 RA_g/act

当面完成相关更正。

可选条件：`null`

立即回应：

**旁白**：你按已经确认的问题逐项更正，请她听完再核对。

`RA_g.act.r4.reply.001`

回应条件：`{"hasDenial":"g"}`（按点击前状态判断）

**旁白**：你先向她明确更正否认，再分别通知被自己承诺牵涉的人，说明真实范围。没有拿一条群发当任何人的同意。

`RA_g.act.r2.denial.001`

回应条件：`{"eq":["opening_lie_g",true]}`（按点击前状态判断）

**旁白**：你当面联系阿衡，承认消息不是他给的。阿衡确认收到更正，她在一旁听完。

`RA_g.act.r2.source.001`

回应条件：`{"eq":["value_conflict_g",true]}`（按点击前状态判断）

**旁白**：你把那次越界要求按原话说出来，明确撤回，不再拿继续来往当交换。她重新说了自己的决定，你当面答应按这个决定办。

`RA_g.act.r2.value.001`

回应条件：`{"all":[{"not":{"hasDenial":"g"}},{"ne":["opening_lie_g",true]},{"ne":["value_conflict_g",true]}]}`（按点击前状态判断）

**旁白**：你当面把此前没说全的实际关系逐项讲清，确认没有把别人未答应的安排也算进去。

`RA_g.act.r2.other.001`

写入与操作：`[{"op":"performRepair","character":"g"}]`

后继：`R2_g`

### 选择 RA_g/delay

承认今天还没有完成。

可选条件：`null`

立即回应：

**顾晚棠**：没完成就是没完成，我明白。做完之前，我们不恢复私人约定。

`RA_g.delay.r2.reply.001`

写入与操作：`[{"op":"set","key":"repair_action_g","value":false},{"op":"set","key":"repair_delayed_g","value":true}]`

后继：`@schedule`

### 选择 RA_g/end

说清不再继续，结束私人安排。

可选条件：`null`

立即回应：

**旁白**：你明确结束安排，不让对方继续替一句“下次”留时间。

`RA_g.end.r2.reply.001`

写入与操作：`[{"op":"endRelationship","character":"g","reason":"conflict"},{"op":"set","key":"repair_started_g","value":false}]`

后继：`@schedule`


---

## CROSS_t_s｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"t","peer":"s","minSlot":11,"when":{"all":[{"eq":["active_t",true]},{"eq":["active_s",true]},{"deniedPeer":["t","s"]}]},"onEnter":[{"op":"revealFromPeer","character":"t","peer":"s"}],"actionLabel":"和沈清辞去夜宵街"}`

### 正文

**旁白**：你和清辞走到夜宵街，遇见拿着晚饭的映雪。

`CROSS_t_s.r4.body.001`

**沈清辞**：晚上好。我和许照约好一起吃饭，今天是私人约会。

`CROSS_t_s.r4.body.002`

**旁白**：映雪看了看她，又转向你。

`CROSS_t_s.r4.body.003`

**唐映雪**：等等。你之前跟我说没别人。那时候，你们就已经在约会了？

`CROSS_t_s.r4.body.004`

### 选择 CROSS_t_s/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_t_s.admit.r4.reply.001`

**唐映雪**：好，至少现在肯说实话了。今天我不想再继续约会。

`CROSS_t_s.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"}]`

后继：`@schedule`

### 选择 CROSS_t_s/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**沈清辞**：我们明明确认过在约会。我不能接受你在别人面前改口。

`CROSS_t_s.evade.r4.reply.001`

**旁白**：映雪还在等你的回答，清辞也站住了。你没有把场面圆过去。

`CROSS_t_s.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_s","value":true},{"op":"set","key":"value_conflict_s","value":true},{"op":"set","key":"repair_evaded_t","value":true}]`

后继：`@schedule`

### 选择 CROSS_t_s/end

承认隐瞒，并明确结束与唐映雪的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_t_s.end.r2.reply.001`

**唐映雪**：好，今晚不谈以后。我留给你的期待自己收回，别再把没删消息当成我还在等。

`CROSS_t_s.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"},{"op":"endRelationship","character":"t","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_t_l｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"t","peer":"l","minSlot":11,"when":{"all":[{"eq":["active_t",true]},{"eq":["active_l",true]},{"deniedPeer":["t","l"]}]},"onEnter":[{"op":"revealFromPeer","character":"t","peer":"l"}],"actionLabel":"和林见月去夜宵街"}`

### 正文

**旁白**：你和见月走到夜宵街，遇见拿着晚饭的映雪。

`CROSS_t_l.r4.body.001`

**林见月**：好巧。我跟许照出来约会，刚走到这边。

`CROSS_t_l.r4.body.002`

**旁白**：映雪看了看她，又转向你。

`CROSS_t_l.r4.body.003`

**唐映雪**：等等。你之前跟我说没别人。那时候，你们就已经在约会了？

`CROSS_t_l.r4.body.004`

### 选择 CROSS_t_l/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_t_l.admit.r4.reply.001`

**唐映雪**：好，至少现在肯说实话了。今天我不想再继续约会。

`CROSS_t_l.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"}]`

后继：`@schedule`

### 选择 CROSS_t_l/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**林见月**：你可以不想继续，但不能说我答应的不是约会。

`CROSS_t_l.evade.r4.reply.001`

**旁白**：映雪还在等你的回答，见月也站住了。你没有把场面圆过去。

`CROSS_t_l.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_l","value":true},{"op":"set","key":"value_conflict_l","value":true},{"op":"set","key":"repair_evaded_t","value":true}]`

后继：`@schedule`

### 选择 CROSS_t_l/end

承认隐瞒，并明确结束与唐映雪的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_t_l.end.r2.reply.001`

**唐映雪**：知道了。见月不用替你解释，我也不会继续等一句说不清的下次。

`CROSS_t_l.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"},{"op":"endRelationship","character":"t","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_t_g｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"t","peer":"g","minSlot":11,"when":{"all":[{"eq":["active_t",true]},{"eq":["active_g",true]},{"deniedPeer":["t","g"]}]},"onEnter":[{"op":"revealFromPeer","character":"t","peer":"g"}],"actionLabel":"和顾晚棠去夜宵街"}`

### 正文

**旁白**：你和晚棠走到夜宵街，遇见拿着晚饭的映雪。

`CROSS_t_g.r4.body.001`

**顾晚棠**：没想到在这儿碰见。今晚我约了许照，没在谈工作。

`CROSS_t_g.r4.body.002`

**旁白**：映雪看了看她，又转向你。

`CROSS_t_g.r4.body.003`

**唐映雪**：等等。你之前跟我说没别人。那时候，你们就已经在约会了？

`CROSS_t_g.r4.body.004`

### 选择 CROSS_t_g/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_t_g.admit.r4.reply.001`

**唐映雪**：好，至少现在肯说实话了。今天我不想再继续约会。

`CROSS_t_g.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"}]`

后继：`@schedule`

### 选择 CROSS_t_g/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**顾晚棠**：刚才还在约下一次，现在就变普通来往了？这句我不认。

`CROSS_t_g.evade.r4.reply.001`

**旁白**：映雪还在等你的回答，晚棠也站住了。你没有把场面圆过去。

`CROSS_t_g.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_g","value":true},{"op":"set","key":"value_conflict_g","value":true},{"op":"set","key":"repair_evaded_t","value":true}]`

后继：`@schedule`

### 选择 CROSS_t_g/end

承认隐瞒，并明确结束与唐映雪的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_t_g.end.r2.reply.001`

**唐映雪**：听明白了。这段到此为止，别以后再拿听歌的借口来试探我有没有空。

`CROSS_t_g.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"t"},{"op":"endRelationship","character":"t","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_s_t｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"s","peer":"t","minSlot":11,"when":{"all":[{"eq":["active_s",true]},{"eq":["active_t",true]},{"deniedPeer":["s","t"]}]},"onEnter":[{"op":"revealFromPeer","character":"s","peer":"t"}],"actionLabel":"和唐映雪去夜宵街"}`

### 正文

**旁白**：你和映雪走到夜宵街，遇见拿着晚饭的清辞。

`CROSS_s_t.r4.body.001`

**唐映雪**：你也来买吃的？我跟许照出来约会，正好走到这儿。

`CROSS_s_t.r4.body.002`

**旁白**：清辞看了看她，又转向你。

`CROSS_s_t.r4.body.003`

**沈清辞**：许照，我想确认一个时间。在我问你的那天，这段约会已经开始了吗？

`CROSS_s_t.r4.body.004`

### 选择 CROSS_s_t/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_s_t.admit.r4.reply.001`

**沈清辞**：我听到了。今天先到这里，之后再谈怎么处理。

`CROSS_s_t.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"}]`

后继：`@schedule`

### 选择 CROSS_s_t/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**唐映雪**：你那天说的是约会。现在见到她，就改叫普通朋友了？

`CROSS_s_t.evade.r4.reply.001`

**旁白**：清辞还在等你的回答，映雪也站住了。你没有把场面圆过去。

`CROSS_s_t.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_t","value":true},{"op":"set","key":"value_conflict_t","value":true},{"op":"set","key":"repair_evaded_s","value":true}]`

后继：`@schedule`

### 选择 CROSS_s_t/end

承认隐瞒，并明确结束与沈清辞的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_s_t.end.r2.reply.001`

**沈清辞**：私人日程我会从今天起撤下。工作上如果还要对接，就按工作流程来。

`CROSS_s_t.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"},{"op":"endRelationship","character":"s","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_s_l｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"s","peer":"l","minSlot":11,"when":{"all":[{"eq":["active_s",true]},{"eq":["active_l",true]},{"deniedPeer":["s","l"]}]},"onEnter":[{"op":"revealFromPeer","character":"s","peer":"l"}],"actionLabel":"和林见月去夜宵街"}`

### 正文

**旁白**：你和见月走到夜宵街，遇见拿着晚饭的清辞。

`CROSS_s_l.r4.body.001`

**林见月**：好巧。我跟许照出来约会，刚走到这边。

`CROSS_s_l.r4.body.002`

**旁白**：清辞看了看她，又转向你。

`CROSS_s_l.r4.body.003`

**沈清辞**：许照，我想确认一个时间。在我问你的那天，这段约会已经开始了吗？

`CROSS_s_l.r4.body.004`

### 选择 CROSS_s_l/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_s_l.admit.r4.reply.001`

**沈清辞**：我听到了。今天先到这里，之后再谈怎么处理。

`CROSS_s_l.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"}]`

后继：`@schedule`

### 选择 CROSS_s_l/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**林见月**：你可以不想继续，但不能说我答应的不是约会。

`CROSS_s_l.evade.r4.reply.001`

**旁白**：清辞还在等你的回答，见月也站住了。你没有把场面圆过去。

`CROSS_s_l.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_l","value":true},{"op":"set","key":"value_conflict_l","value":true},{"op":"set","key":"repair_evaded_s","value":true}]`

后继：`@schedule`

### 选择 CROSS_s_l/end

承认隐瞒，并明确结束与沈清辞的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_s_l.end.r2.reply.001`

**沈清辞**：今天就到这里。见月不需要替你回答，我也不会再留一个空档等你。

`CROSS_s_l.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"},{"op":"endRelationship","character":"s","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_s_g｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"s","peer":"g","minSlot":11,"when":{"all":[{"eq":["active_s",true]},{"eq":["active_g",true]},{"deniedPeer":["s","g"]}]},"onEnter":[{"op":"revealFromPeer","character":"s","peer":"g"}],"actionLabel":"和顾晚棠去夜宵街"}`

### 正文

**旁白**：你和晚棠走到夜宵街，遇见拿着晚饭的清辞。

`CROSS_s_g.r4.body.001`

**顾晚棠**：没想到在这儿碰见。今晚我约了许照，没在谈工作。

`CROSS_s_g.r4.body.002`

**旁白**：清辞看了看她，又转向你。

`CROSS_s_g.r4.body.003`

**沈清辞**：许照，我想确认一个时间。在我问你的那天，这段约会已经开始了吗？

`CROSS_s_g.r4.body.004`

### 选择 CROSS_s_g/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_s_g.admit.r4.reply.001`

**沈清辞**：我听到了。今天先到这里，之后再谈怎么处理。

`CROSS_s_g.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"}]`

后继：`@schedule`

### 选择 CROSS_s_g/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**顾晚棠**：刚才还在约下一次，现在就变普通来往了？这句我不认。

`CROSS_s_g.evade.r4.reply.001`

**旁白**：清辞还在等你的回答，晚棠也站住了。你没有把场面圆过去。

`CROSS_s_g.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_g","value":true},{"op":"set","key":"value_conflict_g","value":true},{"op":"set","key":"repair_evaded_s","value":true}]`

后继：`@schedule`

### 选择 CROSS_s_g/end

承认隐瞒，并明确结束与沈清辞的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_s_g.end.r2.reply.001`

**沈清辞**：我听清楚了。晚棠的选择由她说，我这份私人约定就到今天为止。

`CROSS_s_g.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"s"},{"op":"endRelationship","character":"s","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_l_t｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"l","peer":"t","minSlot":11,"when":{"all":[{"eq":["active_l",true]},{"eq":["active_t",true]},{"deniedPeer":["l","t"]}]},"onEnter":[{"op":"revealFromPeer","character":"l","peer":"t"}],"actionLabel":"和唐映雪去夜宵街"}`

### 正文

**旁白**：你和映雪走到夜宵街，遇见拿着晚饭的见月。

`CROSS_l_t.r4.body.001`

**唐映雪**：你也来买吃的？我跟许照出来约会，正好走到这儿。

`CROSS_l_t.r4.body.002`

**旁白**：见月看了看她，又转向你。

`CROSS_l_t.r4.body.003`

**林见月**：你之前说没有别人。我想听你自己说，她说的这段，是在那之前就开始的吗？

`CROSS_l_t.r4.body.004`

### 选择 CROSS_l_t/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_l_t.admit.r4.reply.001`

**林见月**：让我缓一缓。我不想刚听见这些，就继续装没事。

`CROSS_l_t.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"}]`

后继：`@schedule`

### 选择 CROSS_l_t/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**唐映雪**：你那天说的是约会。现在见到她，就改叫普通朋友了？

`CROSS_l_t.evade.r4.reply.001`

**旁白**：见月还在等你的回答，映雪也站住了。你没有把场面圆过去。

`CROSS_l_t.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_t","value":true},{"op":"set","key":"value_conflict_t","value":true},{"op":"set","key":"repair_evaded_l","value":true}]`

后继：`@schedule`

### 选择 CROSS_l_t/end

承认隐瞒，并明确结束与林见月的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_l_t.end.r2.reply.001`

**林见月**：好。这不是谁赢了谁输了的结尾，也不用你再替我解释。

`CROSS_l_t.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"},{"op":"endRelationship","character":"l","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_l_s｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"l","peer":"s","minSlot":11,"when":{"all":[{"eq":["active_l",true]},{"eq":["active_s",true]},{"deniedPeer":["l","s"]}]},"onEnter":[{"op":"revealFromPeer","character":"l","peer":"s"}],"actionLabel":"和沈清辞去夜宵街"}`

### 正文

**旁白**：你和清辞走到夜宵街，遇见拿着晚饭的见月。

`CROSS_l_s.r4.body.001`

**沈清辞**：晚上好。我和许照约好一起吃饭，今天是私人约会。

`CROSS_l_s.r4.body.002`

**旁白**：见月看了看她，又转向你。

`CROSS_l_s.r4.body.003`

**林见月**：你之前说没有别人。我想听你自己说，她说的这段，是在那之前就开始的吗？

`CROSS_l_s.r4.body.004`

### 选择 CROSS_l_s/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_l_s.admit.r4.reply.001`

**林见月**：让我缓一缓。我不想刚听见这些，就继续装没事。

`CROSS_l_s.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"}]`

后继：`@schedule`

### 选择 CROSS_l_s/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**沈清辞**：我们明明确认过在约会。我不能接受你在别人面前改口。

`CROSS_l_s.evade.r4.reply.001`

**旁白**：见月还在等你的回答，清辞也站住了。你没有把场面圆过去。

`CROSS_l_s.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_s","value":true},{"op":"set","key":"value_conflict_s","value":true},{"op":"set","key":"repair_evaded_l","value":true}]`

后继：`@schedule`

### 选择 CROSS_l_s/end

承认隐瞒，并明确结束与林见月的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_l_s.end.r2.reply.001`

**林见月**：我会把自己的时间留给自己，不用你替我配一段“以后还有可能”。

`CROSS_l_s.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"},{"op":"endRelationship","character":"l","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_l_g｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"l","peer":"g","minSlot":11,"when":{"all":[{"eq":["active_l",true]},{"eq":["active_g",true]},{"deniedPeer":["l","g"]}]},"onEnter":[{"op":"revealFromPeer","character":"l","peer":"g"}],"actionLabel":"和顾晚棠去夜宵街"}`

### 正文

**旁白**：你和晚棠走到夜宵街，遇见拿着晚饭的见月。

`CROSS_l_g.r4.body.001`

**顾晚棠**：没想到在这儿碰见。今晚我约了许照，没在谈工作。

`CROSS_l_g.r4.body.002`

**旁白**：见月看了看她，又转向你。

`CROSS_l_g.r4.body.003`

**林见月**：你之前说没有别人。我想听你自己说，她说的这段，是在那之前就开始的吗？

`CROSS_l_g.r4.body.004`

### 选择 CROSS_l_g/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_l_g.admit.r4.reply.001`

**林见月**：让我缓一缓。我不想刚听见这些，就继续装没事。

`CROSS_l_g.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"}]`

后继：`@schedule`

### 选择 CROSS_l_g/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**顾晚棠**：刚才还在约下一次，现在就变普通来往了？这句我不认。

`CROSS_l_g.evade.r4.reply.001`

**旁白**：见月还在等你的回答，晚棠也站住了。你没有把场面圆过去。

`CROSS_l_g.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_g","value":true},{"op":"set","key":"value_conflict_g","value":true},{"op":"set","key":"repair_evaded_l","value":true}]`

后继：`@schedule`

### 选择 CROSS_l_g/end

承认隐瞒，并明确结束与林见月的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_l_g.end.r2.reply.001`

**林见月**：我知道了。有没有人拍到这一幕不重要，我已经当面听清楚了。

`CROSS_l_g.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"l"},{"op":"endRelationship","character":"l","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_g_t｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"g","peer":"t","minSlot":11,"when":{"all":[{"eq":["active_g",true]},{"eq":["active_t",true]},{"deniedPeer":["g","t"]}]},"onEnter":[{"op":"revealFromPeer","character":"g","peer":"t"}],"actionLabel":"和唐映雪去夜宵街"}`

### 正文

**旁白**：你和映雪走到夜宵街，遇见拿着晚饭的晚棠。

`CROSS_g_t.r4.body.001`

**唐映雪**：你也来买吃的？我跟许照出来约会，正好走到这儿。

`CROSS_g_t.r4.body.002`

**旁白**：晚棠看了看她，又转向你。

`CROSS_g_t.r4.body.003`

**顾晚棠**：许照，我问过你有没有别人，你说没有。她说的这段，当时已经开始了吗？

`CROSS_g_t.r4.body.004`

### 选择 CROSS_g_t/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_g_t.admit.r4.reply.001`

**顾晚棠**：明白。先别点下一次约会了，我们还有别的事要谈。

`CROSS_g_t.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"}]`

后继：`@schedule`

### 选择 CROSS_g_t/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**唐映雪**：你那天说的是约会。现在见到她，就改叫普通朋友了？

`CROSS_g_t.evade.r4.reply.001`

**旁白**：晚棠还在等你的回答，映雪也站住了。你没有把场面圆过去。

`CROSS_g_t.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_t","value":true},{"op":"set","key":"value_conflict_t","value":true},{"op":"set","key":"repair_evaded_g","value":true}]`

后继：`@schedule`

### 选择 CROSS_g_t/end

承认隐瞒，并明确结束与顾晚棠的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_g_t.end.r2.reply.001`

**顾晚棠**：私人关系到此为止。工作上的事照实处理，别用工作消息续上今晚的话。

`CROSS_g_t.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"endRelationship","character":"g","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_g_s｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"g","peer":"s","minSlot":11,"when":{"all":[{"eq":["active_g",true]},{"eq":["active_s",true]},{"deniedPeer":["g","s"]}]},"onEnter":[{"op":"revealFromPeer","character":"g","peer":"s"}],"actionLabel":"和沈清辞去夜宵街"}`

### 正文

**旁白**：你和清辞走到夜宵街，遇见拿着晚饭的晚棠。

`CROSS_g_s.r4.body.001`

**沈清辞**：晚上好。我和许照约好一起吃饭，今天是私人约会。

`CROSS_g_s.r4.body.002`

**旁白**：晚棠看了看她，又转向你。

`CROSS_g_s.r4.body.003`

**顾晚棠**：许照，我问过你有没有别人，你说没有。她说的这段，当时已经开始了吗？

`CROSS_g_s.r4.body.004`

### 选择 CROSS_g_s/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_g_s.admit.r4.reply.001`

**顾晚棠**：明白。先别点下一次约会了，我们还有别的事要谈。

`CROSS_g_s.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"}]`

后继：`@schedule`

### 选择 CROSS_g_s/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**沈清辞**：我们明明确认过在约会。我不能接受你在别人面前改口。

`CROSS_g_s.evade.r4.reply.001`

**旁白**：晚棠还在等你的回答，清辞也站住了。你没有把场面圆过去。

`CROSS_g_s.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_s","value":true},{"op":"set","key":"value_conflict_s","value":true},{"op":"set","key":"repair_evaded_g","value":true}]`

后继：`@schedule`

### 选择 CROSS_g_s/end

承认隐瞒，并明确结束与顾晚棠的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_g_s.end.r2.reply.001`

**顾晚棠**：我接受这个结果。和清辞的事请你自己处理，别再让别人替你分配责任。

`CROSS_g_s.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"endRelationship","character":"g","reason":"conflict"}]`

后继：`@schedule`


---

## CROSS_g_l｜在街口，她问起那个时间

类型：`encounter`。元数据：`{"background":"diner","music":"warm","next":"@schedule","observer":"g","peer":"l","minSlot":11,"when":{"all":[{"eq":["active_g",true]},{"eq":["active_l",true]},{"deniedPeer":["g","l"]}]},"onEnter":[{"op":"revealFromPeer","character":"g","peer":"l"}],"actionLabel":"和林见月去夜宵街"}`

### 正文

**旁白**：你和见月走到夜宵街，遇见拿着晚饭的晚棠。

`CROSS_g_l.r4.body.001`

**林见月**：好巧。我跟许照出来约会，刚走到这边。

`CROSS_g_l.r4.body.002`

**旁白**：晚棠看了看她，又转向你。

`CROSS_g_l.r4.body.003`

**顾晚棠**：许照，我问过你有没有别人，你说没有。她说的这段，当时已经开始了吗？

`CROSS_g_l.r4.body.004`

### 选择 CROSS_g_l/admit

承认那时已经约会，自己撒了谎。

可选条件：`null`

立即回应：

**许照**：是。在那之前就开始了，我当时没说实话。

`CROSS_g_l.admit.r4.reply.001`

**顾晚棠**：明白。先别点下一次约会了，我们还有别的事要谈。

`CROSS_g_l.admit.r4.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"}]`

后继：`@schedule`

### 选择 CROSS_g_l/evade

改口说只是普通来往，试图带过。

可选条件：`null`

立即回应：

**林见月**：你可以不想继续，但不能说我答应的不是约会。

`CROSS_g_l.evade.r4.reply.001`

**旁白**：晚棠还在等你的回答，见月也站住了。你没有把场面圆过去。

`CROSS_g_l.evade.r4.reply.002`

写入与操作：`[{"op":"set","key":"pending_l","value":true},{"op":"set","key":"value_conflict_l","value":true},{"op":"set","key":"repair_evaded_g","value":true}]`

后继：`@schedule`

### 选择 CROSS_g_l/end

承认隐瞒，并明确结束与顾晚棠的恋爱安排。

可选条件：`null`

立即回应：

**许照**：那次确实隐瞒了。现在也说清，我们不再继续这段。

`CROSS_g_l.end.r2.reply.001`

**顾晚棠**：这段不继续了。见月不用替我作证，你刚才亲口说的已经够清楚。

`CROSS_g_l.end.r2.reply.002`

写入与操作：`[{"op":"confessKnown","character":"g"},{"op":"endRelationship","character":"g","reason":"conflict"}]`

后继：`@schedule`


---

## REL_t｜她也有一个问题

类型：`relationship_question`。元数据：`{"background":"diner","music":"warm","next":"t07","character":"t"}`

### 正文

**旁白**：试听停下来，你的手机又亮了。映雪没去看屏幕，拿歌词本轻轻敲了一下桌沿。

`REL_t.r2.body.001`

**唐映雪**：这么忙？我先问清，除了我，你还在和谁约会？

`REL_t.r2.body.002`

**唐映雪**：别给我背一段“你们都很特别”。报名字就行。

`REL_t.r2.body.003`

### 选择 REL_t/tell

把现在仍在约会的人说清，不把普通朋友也算进去。

可选条件：`null`

立即回应：

**许照**：有。我把现在的情况告诉你。

`REL_t.tell.r2.reply.001`

**旁白**：你逐一说出仍在约会的人，没有编造她们之间的默契。

`REL_t.tell.r2.reply.002`

**唐映雪**：听见了。我会吃醋，不代表我现在就要替你选。

`REL_t.tell.r2.reply.003`

**唐映雪**：不过这段试听先归我。手机放旁边，三分钟。

`REL_t.tell.r2.reply.004`

写入与操作：`[{"op":"disclose","character":"t"},{"op":"set","key":"relation_answer_t","value":"told"}]`

后继：`t07`

### 选择 REL_t/deny

隐瞒其他约会，回答“没有，就你”。

可选条件：`null`

立即回应：

**许照**：没有，就你。

`REL_t.deny.r2.reply.001`

**唐映雪**：知道了。那我按你说的记。

`REL_t.deny.r2.reply.002`

**旁白**：她暂时没有证据反驳。你知道这句话不是真的。

`REL_t.deny.r2.reply.003`

写入与操作：`[{"op":"denyRelations","character":"t"},{"op":"set","key":"relation_answer_t","value":"denied"}]`

后继：`t07`

### 选择 REL_t/later

“我想整理清楚再说，今天先不请你作任何新的承诺。”

可选条件：`null`

立即回应：

**唐映雪**：那先听到这里。别把我还没答应的，也算进去。

`REL_t.later.r2.reply.001`

**旁白**：她没有继续追问。共同关系仍需要之后真正讲清、分别确认。

`REL_t.later.r2.reply.002`

写入与操作：`[{"op":"set","key":"relation_answer_t","value":"deferred"}]`

后继：`t07`


---

## REL_l｜她也有一个问题

类型：`relationship_question`。元数据：`{"background":"diner","music":"warm","next":"l07","character":"l"}`

### 正文

**旁白**：聊完陆景行的来电，见月忽然把勺子停在半空。

`REL_l.r2.body.001`

**林见月**：刚才一直在说我的事。我也想问问，你现在还有别的约会吗？

`REL_l.r2.body.002`

**林见月**：不是问通讯录有多少人。问和我们一样，会认真约下次见面的。

`REL_l.r2.body.003`

### 选择 REL_l/tell

把现在仍在约会的人说清，不把普通朋友也算进去。

可选条件：`null`

立即回应：

**许照**：有。我把现在的情况告诉你。

`REL_l.tell.r2.reply.001`

**旁白**：你逐一说出仍在约会的人，没有编造她们之间的默契。

`REL_l.tell.r2.reply.002`

**林见月**：好，我知道了。那下次碰见她们，就不必靠我自己猜了。

`REL_l.tell.r2.reply.003`

**旁白**：她又挖了一勺甜点，这回把甜一点的那边留给你。

`REL_l.tell.r2.reply.004`

写入与操作：`[{"op":"disclose","character":"l"},{"op":"set","key":"relation_answer_l","value":"told"}]`

后继：`l07`

### 选择 REL_l/deny

隐瞒其他约会，回答“没有，就你”。

可选条件：`null`

立即回应：

**许照**：没有，就你。

`REL_l.deny.r2.reply.001`

**林见月**：知道了。那我按你说的记。

`REL_l.deny.r2.reply.002`

**旁白**：她暂时没有证据反驳。你知道这句话不是真的。

`REL_l.deny.r2.reply.003`

写入与操作：`[{"op":"denyRelations","character":"l"},{"op":"set","key":"relation_answer_l","value":"denied"}]`

后继：`l07`

### 选择 REL_l/later

“我想整理清楚再说，今天先不请你作任何新的承诺。”

可选条件：`null`

立即回应：

**林见月**：那先听到这里。别把我还没答应的，也算进去。

`REL_l.later.r2.reply.001`

**旁白**：她没有继续追问。共同关系仍需要之后真正讲清、分别确认。

`REL_l.later.r2.reply.002`

写入与操作：`[{"op":"set","key":"relation_answer_l","value":"deferred"}]`

后继：`l07`


---

## SPARK_t｜耳机先别还

类型：`early_interest`。元数据：`{"character":"t","next":"@schedule"}`

### 正文



### 条件正文 · SPARK_t.r4.block.001

条件：`{"canDate":"t"}`

**旁白**：耳机线刚绕好，映雪又扯回一点。

`SPARK_t.invite.0`

**唐映雪**：耳机先别还。下次来，别先问有没有新歌。先问我在不在。

`SPARK_t.invite.1`

**许照**：这两件事不一样？

`SPARK_t.invite.2`

**唐映雪**：不一样。歌谁都能听。

`SPARK_t.invite.3`

### 条件正文 · SPARK_t.r4.block.002

条件：`{"not":{"canDate":"t"}}`

**旁白**：你们把东西收好。刚才那件没说清的事，还隔在中间。

`SPARK_t.unresolved.0`

**唐映雪**：今天先到这里。想重新说的时候，直接找我，别假装什么都没发生。

`SPARK_t.unresolved.1`

### 选择 SPARK_t/bold

“那我直接说：下次是来见你的。”

可选条件：`{"canDate":"t"}`

立即回应：

**唐映雪**：好。我会认真挑衣服，你最好也是。

`SPARK_t.bold.0`

**旁白**：她想把耳机塞回盒里，放反了两次，干脆推给你。

`SPARK_t.bold.1`

写入与操作：`[{"op":"set","key":"early_spark_t","value":"bold"},{"op":"set","key":"interest_t","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_t/tease

“这算歌手主动招揽固定观众？”

可选条件：`{"canDate":"t"}`

立即回应：

**唐映雪**：别人可没听过我说这个。别装听不懂。

`SPARK_t.tease.0`

**旁白**：她用指尖碰了碰那半只耳机，没收回刚才的话。

`SPARK_t.tease.1`

写入与操作：`[{"op":"set","key":"early_spark_t","value":"tease"},{"op":"set","key":"interest_t","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_t/slow

“想再见你，但我可能慢半拍。”

可选条件：`null`

立即回应：



回应条件：`{"canDate":"t"}`（按点击前状态判断）

**唐映雪**：行。我数拍子很准，不会假装你已经答应。

`SPARK_t.slow_clear.0`

回应条件：`{"not":{"canDate":"t"}}`（按点击前状态判断）

**许照**：知道了。我会把没说清的事说清，不拿下一次见面糊弄过去。

`SPARK_t.slow_unresolved.0`

写入与操作：`[{"op":"set","key":"early_spark_t","value":"slow"}]`

后继：`@schedule`

### 选择 SPARK_t/friend

“我来听歌，也想先好好做朋友。”

可选条件：`{"canDate":"t"}`

立即回应：

**唐映雪**：收到。那就先不挑约会的衣服了。

`SPARK_t.friend.0`

**旁白**：她笑了一下，把下一次试听时间照常发来。

`SPARK_t.friend.1`

写入与操作：`[{"op":"set","key":"early_spark_t","value":"friend"},{"op":"set","key":"interest_t","value":"platonic"}]`

后继：`@schedule`


---

## SPARK_s｜她把工作群关掉了

类型：`early_interest`。元数据：`{"character":"s","next":"@schedule"}`

### 正文



### 条件正文 · SPARK_s.r4.block.001

条件：`{"canDate":"s"}`

**旁白**：清辞发来一家小店的位置，抬眼看你。

`SPARK_s.invite.0`

**沈清辞**：这个没发工作群。下次我们两个去，行吗？

`SPARK_s.invite.1`

**许照**：还要顺便检查消防通道？

`SPARK_s.invite.2`

**沈清辞**：不用。只检查你会不会迟到。

`SPARK_s.invite.3`

### 条件正文 · SPARK_s.r4.block.002

条件：`{"not":{"canDate":"s"}}`

**旁白**：你们把东西收好。刚才那件没说清的事，还隔在中间。

`SPARK_s.unresolved.0`

**沈清辞**：今天先到这里。想重新说的时候，直接找我，别假装什么都没发生。

`SPARK_s.unresolved.1`

### 选择 SPARK_s/bold

“行。我来订桌，不让你再当组织者。”

可选条件：`{"canDate":"s"}`

立即回应：

**沈清辞**：那我只挑想穿的衣服。

`SPARK_s.bold.0`

**旁白**：她真的把工作群静音了，手机翻扣在掌心。

`SPARK_s.bold.1`

写入与操作：`[{"op":"set","key":"early_spark_s","value":"bold"},{"op":"set","key":"interest_s","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_s/tease

“这么私人的邀请，我得表现好一点。”

可选条件：`{"canDate":"s"}`

立即回应：

**沈清辞**：表现得想来就行。你再写一份方案，我就取消。

`SPARK_s.tease.0`

写入与操作：`[{"op":"set","key":"early_spark_s","value":"tease"},{"op":"set","key":"interest_s","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_s/slow

“想去，只是先不急着给我们定关系。”

可选条件：`null`

立即回应：



回应条件：`{"canDate":"s"}`（按点击前状态判断）

**沈清辞**：可以。只是约你吃饭，又不是让你当场填婚宴人数。

`SPARK_s.slow_clear.0`

回应条件：`{"not":{"canDate":"s"}}`（按点击前状态判断）

**许照**：知道了。我会把没说清的事说清，不拿下一次见面糊弄过去。

`SPARK_s.slow_unresolved.0`

写入与操作：`[{"op":"set","key":"early_spark_s","value":"slow"}]`

后继：`@schedule`

### 选择 SPARK_s/friend

“好，先按朋友的饭局来。”

可选条件：`{"canDate":"s"}`

立即回应：

**沈清辞**：知道了。那我不猜你今天这句还有没有别的意思。

`SPARK_s.friend.0`

写入与操作：`[{"op":"set","key":"early_spark_s","value":"friend"},{"op":"set","key":"interest_s","value":"platonic"}]`

后继：`@schedule`


---

## SPARK_l｜镜头外也想见你

类型：`early_interest`。元数据：`{"character":"l","next":"@schedule"}`

### 正文



### 条件正文 · SPARK_l.r4.block.001

条件：`{"canDate":"l"}`

**旁白**：见月关掉录音，手指却没离开暂停键。

`SPARK_l.invite.0`

**林见月**：下次能不能不带相机，也不聊申请？

`SPARK_l.invite.1`

**许照**：那聊什么？

`SPARK_l.invite.2`

**林见月**：不知道。所以才想试试跟你待着。

`SPARK_l.invite.3`

### 条件正文 · SPARK_l.r4.block.002

条件：`{"not":{"canDate":"l"}}`

**旁白**：你们把东西收好。刚才那件没说清的事，还隔在中间。

`SPARK_l.unresolved.0`

**林见月**：今天先到这里。想重新说的时候，直接找我，别假装什么都没发生。

`SPARK_l.unresolved.1`

### 选择 SPARK_l/bold

“那我下次只带自己，专门来见你。”

可选条件：`{"canDate":"l"}`

立即回应：

**林见月**：别说得这么轻松。我会期待的。

`SPARK_l.bold.0`

**旁白**：她抿了抿嘴，还是没把那点笑藏好。

`SPARK_l.bold.1`

写入与操作：`[{"op":"set","key":"early_spark_l","value":"bold"},{"op":"set","key":"interest_l","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_l/tease

“你这是给我一个没有台词的角色？”

可选条件：`{"canDate":"l"}`

立即回应：

**林见月**：嗯。不许找替身。

`SPARK_l.tease.0`

**旁白**：说完，她先被自己逗笑了。

`SPARK_l.tease.1`

写入与操作：`[{"op":"set","key":"early_spark_l","value":"tease"},{"op":"set","key":"interest_l","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_l/slow

“我也想见你。不过让我慢一点，好吗？”

可选条件：`null`

立即回应：



回应条件：`{"canDate":"l"}`（按点击前状态判断）

**林见月**：好。我们都不用演已经很熟的样子。

`SPARK_l.slow_clear.0`

回应条件：`{"not":{"canDate":"l"}}`（按点击前状态判断）

**许照**：知道了。我会把没说清的事说清，不拿下一次见面糊弄过去。

`SPARK_l.slow_unresolved.0`

写入与操作：`[{"op":"set","key":"early_spark_l","value":"slow"}]`

后继：`@schedule`

### 选择 SPARK_l/friend

“好，先做不用交作业的朋友。”

可选条件：`{"canDate":"l"}`

立即回应：

**林见月**：朋友也行。那我就不偷偷猜你是不是在约我了。

`SPARK_l.friend.0`

写入与操作：`[{"op":"set","key":"early_spark_l","value":"friend"},{"op":"set","key":"interest_l","value":"platonic"}]`

后继：`@schedule`


---

## SPARK_g｜这条消息不走助理

类型：`early_interest`。元数据：`{"character":"g","next":"@schedule"}`

### 正文



### 条件正文 · SPARK_g.r4.block.001

条件：`{"canDate":"g"}`

**旁白**：晚棠把工作文件收进包，重新点开你们的聊天。

`SPARK_g.invite.0`

**顾晚棠**：下次吃饭，直接找我。助理不知道我讨厌哪家甜品。

`SPARK_g.invite.1`

**许照**：那我就知道？

`SPARK_g.invite.2`

**顾晚棠**：现在给你一个知道的机会。

`SPARK_g.invite.3`

### 条件正文 · SPARK_g.r4.block.002

条件：`{"not":{"canDate":"g"}}`

**旁白**：你们把东西收好。刚才那件没说清的事，还隔在中间。

`SPARK_g.unresolved.0`

**顾晚棠**：今天先到这里。想重新说的时候，直接找我，别假装什么都没发生。

`SPARK_g.unresolved.1`

### 选择 SPARK_g/bold

“好。不是约顾总，是约顾晚棠。”

可选条件：`{"canDate":"g"}`

立即回应：

**顾晚棠**：这句加分。

`SPARK_g.bold.0`

**旁白**：她刚笑完，又拿起手机，给你发来两个她有空的晚上。

`SPARK_g.bold.1`

写入与操作：`[{"op":"set","key":"early_spark_g","value":"bold"},{"op":"set","key":"interest_g","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_g/tease

“私人号码有什么特别待遇？”

可选条件：`{"canDate":"g"}`

立即回应：

**顾晚棠**：少叫两声顾总，我就少故意让你猜两次。

`SPARK_g.tease.0`

写入与操作：`[{"op":"set","key":"early_spark_g","value":"tease"},{"op":"set","key":"interest_g","value":"romantic"}]`

后继：`@schedule`

### 选择 SPARK_g/slow

“想见你。只是私人这部分，我想慢慢来。”

可选条件：`null`

立即回应：



回应条件：`{"canDate":"g"}`（按点击前状态判断）

**顾晚棠**：行。都没上菜，不急着把整桌点完。

`SPARK_g.slow_clear.0`

回应条件：`{"not":{"canDate":"g"}}`（按点击前状态判断）

**许照**：知道了。我会把没说清的事说清，不拿下一次见面糊弄过去。

`SPARK_g.slow_unresolved.0`

写入与操作：`[{"op":"set","key":"early_spark_g","value":"slow"}]`

后继：`@schedule`

### 选择 SPARK_g/friend

“可以，先约成朋友的饭。”

可选条件：`{"canDate":"g"}`

立即回应：

**顾晚棠**：收到。朋友价是不打折，各付各的，免得你又猜。

`SPARK_g.friend.0`

写入与操作：`[{"op":"set","key":"early_spark_g","value":"friend"},{"op":"set","key":"interest_g","value":"platonic"}]`

后继：`@schedule`


---

## UNWRITTEN｜第八天，有人主动问我报价

类型：`common`。元数据：`{"background":"street","music":"hopeful","clock":{"day":7,"time":"20:25"},"next":"A6b"}`

### 正文

**旁白**：侧门的保安停住了。你走出北岸，手机震动：一份邀请你独立复盘现场的工作询价。原著第十三章只写许照退场，却没写过有人主动问他的报价。

`UNWRITTEN.r42.body.001`

**许照**：（第八天。）原著写到我被清退就停了。今天有人主动问我的报价，我终于不只是那张签名栏里随手能擦掉的人。

`UNWRITTEN.r42.body.002`

**旁白**：对方要的是一份能核验的演出复盘，而不是传奇故事。接不接、公开到哪一步、先替自己争哪份未来，都得由你做下一次选择。

`UNWRITTEN.r42.body.003`

### 条件正文 · UNWRITTEN.r42.block.original

条件：`{"eq":["canon_kept",true]}`

**旁白**：首演没改，结局却开始偏离。第七天，你没有完全走成书里的退场。

`UNWRITTEN.r42.block.original.001`

### 条件正文 · UNWRITTEN.r42.block.changed

条件：`{"eq":["opening_changed",true]}`

**旁白**：从首演的U盘开始，你已经撞开一串原著没有的事件；今晚，只是另一处转弯。

`UNWRITTEN.r42.block.changed.001`

### 条件正文 · UNWRITTEN.r42.block.proof

条件：`{"eq":["proof_version_log",true]}`

**旁白**：阿衡愿意在核验范围内附上首夜双版本时间线；公开需要他的确认。

`UNWRITTEN.r42.block.proof.001`

### 选择 UNWRITTEN/offer

接下邀请：凭本事谈一次报价

可选条件：`null`

立即回应：

**许照**：我只写我亲历和能核对的部分，没确认的先空着。

`UNWRITTEN.r42.reply.offer.001`

**旁白**：你报出自己的范围与交付要求，对方回了一个正式的谈价时间。这个机会没写在原著里，是你把前七天过成了能交付的履历。

`UNWRITTEN.r42.reply.offer.002`

写入与操作：`[{"op":"set","key":"unwritten_future","value":"public_method"},{"op":"set","key":"unwritten_invite_accepted","value":true}]`

后继：`A6b`

### 选择 UNWRITTEN/private

保留底牌：只在授权范围内继续合作

可选条件：`null`

立即回应：

**旁白**：你和阿衡、见月把能保留的材料分清授权范围。没人上热搜，但以后再有人想剪走某一秒，你们知道能去哪里找真实记录。

`UNWRITTEN.r42.reply.private.001`

写入与操作：`[{"op":"set","key":"unwritten_future","value":"private_protection"},{"op":"set","key":"unwritten_invite_accepted","value":false}]`

后继：`A6b`

### 选择 UNWRITTEN/self

暂不接单：先安排自己的生活

可选条件：`null`

立即回应：

**旁白**：你把工作邀约放进待回复，不用逃过清退就立刻把自己卖给下一份忙乱。今天的晚饭和下一周的安排，第一次轮到你自己排。

`UNWRITTEN.r42.reply.self.001`

写入与操作：`[{"op":"set","key":"unwritten_future","value":"self_direction"},{"op":"set","key":"unwritten_invite_accepted","value":false}]`

后继：`A6b`


# 40项命运尾声

## EP_t_independent｜自己的歌

条件与解锁：`{"axis":"t","value":"independent","when":{"eq":["final_t","independent"]},"scope":"day21_complete_only"}`

**旁白**：映雪请阿衡把确认过的演出版重新导出，封面只放自己的名字。小场地试唱那晚，返听又闹了一次脾气。她笑着打了两拍，自己把歌唱下去。原著删掉的那首歌，这次在她的曲目单上。

`EP_t_independent.r2.001`

## EP_t_negotiated｜谈过条件的舞台

条件与解锁：`{"axis":"t","value":"negotiated","when":{"eq":["final_t","negotiated"]},"scope":"day21_complete_only"}`

**旁白**：修改后的条款和曲目单放在一起。彩排有人要挪走她的独唱段，她直接翻到已确认的那一页。最后她照原样唱完，走下台才朝你举了举那张纸：“这回真有用。”

`EP_t_negotiated.r2.001`

## EP_t_chosen_duet｜她选的合唱

条件与解锁：`{"axis":"t","value":"chosen_duet","when":{"eq":["final_t","chosen_duet"]},"scope":"day21_complete_only"}`

**旁白**：双人版本进入正式排练。陆景行试着加了一句和声，映雪听完摇头，又自己示范一遍。最终曲目单分别写了两人的名字；那段没有让出去的独唱，被她留到了最后。

`EP_t_chosen_duet.r2.001`

## EP_t_intentional_pause｜先不登台

条件与解锁：`{"axis":"t","value":"intentional_pause","when":{"eq":["final_t","intentional_pause"]},"scope":"day21_complete_only"}`

**旁白**：暂停安排确认后，映雪关掉了这一轮演出的闹钟。她有一晚还是习惯性醒来，伸手抓手机，又放下。隔天她把新写的两行谱留在桌上，没有急着发给任何人审批。

`EP_t_intentional_pause.r2.001`

## EP_t_restricted｜还没唱完

条件与解锁：`{"axis":"t","value":"restricted","when":{"eq":["final_t","restricted"]},"scope":"day21_complete_only"}`

**旁白**：你们没有拿到能改变节目安排的有效版本。演出仍按旧单进行，她想唱的歌没被排进去。收工时她把曲谱卷起来，骂了一句“烦死了”，但没有扔掉。

`EP_t_restricted.r2.001`

## EP_s_cooperative｜三排座位

条件与解锁：`{"axis":"s","value":"cooperative","when":{"eq":["final_s","cooperative"]},"scope":"day21_complete_only"}`

**旁白**：你们实际试过的小场地安排通过了。第一场开门，清辞把三排椅子排好，发现最后一把晃腿，自己垫了张旧票。灯暗下来以后，她终于坐着看完一整段节目。

`EP_s_cooperative.r2.001`

## EP_s_shared_use｜留出的夜场

条件与解锁：`{"axis":"s","value":"shared_use","when":{"eq":["final_s","shared_use"]},"scope":"day21_complete_only"}`

**旁白**：试过的共享时段写进日程。白天的队伍刚走，清辞和搭档就推进三排椅子；时间不宽裕，节目却真的开了门。她把可用的几晚圈起来，开始约下一场。

`EP_s_shared_use.r2.001`

## EP_s_residency｜换一扇门

条件与解锁：`{"axis":"s","value":"residency","when":{"eq":["final_s","residency"]},"scope":"day21_complete_only"}`

**旁白**：勘过的新空间确定下来。清辞第一次搬灯架过去，嫌门窄，折腾半天才进得去。旧门牌没跟来，她准备的节目却跟来了。试灯那晚，她拍了一张亮起来的空场。

`EP_s_residency.r2.001`

## EP_s_chosen_exit｜把钥匙交还

条件与解锁：`{"axis":"s","value":"chosen_exit","when":{"eq":["final_s","chosen_exit"]},"scope":"day21_complete_only"}`

**旁白**：交接清单上的最后一项被接收人勾掉。清辞把旧钥匙交回去，第二天醒来，手机没有催她去开门。她愣了一会儿，才给自己买了一张只需要坐在观众席的票。

`EP_s_chosen_exit.r2.001`

## EP_s_displaced｜还没轮到她

条件与解锁：`{"axis":"s","value":"displaced","when":{"eq":["final_s","displaced"]},"scope":"day21_complete_only"}`

**旁白**：新的巡演占用了原本想留给小剧场的时段。这一轮没做出能落地的替代安排，三排旧椅子被收进库房。清辞自己去数了一遍，没有把失望说成“也挺好”。

`EP_s_displaced.r2.001`

## EP_l_fellowship｜寄出去的申请

条件与解锁：`{"axis":"l","value":"fellowship","when":{"eq":["final_l","fellowship"]},"scope":"day21_complete_only"}`

**旁白**：补齐的申请材料得到受理，见月把回执打印出来，夹进器材包。后来项目通知她进入下一轮，她先检查日期，再重新算预算。她把下一轮要补的东西圈出来，准备接着做。

`EP_l_fellowship.r2.001`

## EP_l_chosen_stay｜她决定留下

条件与解锁：`{"axis":"l","value":"chosen_stay","when":{"eq":["final_l","chosen_stay"]},"scope":"day21_complete_only"}`

**旁白**：见月按确认过的本地计划开始拍摄。她带着清单走了几个不怎么上镜的地方，有一天等了一下午，只得到十秒能用的声音。回去看片尾，她把自己的名字认真放上去。

`EP_l_chosen_stay.r2.001`

## EP_l_release_film｜片尾写上她

条件与解锁：`{"axis":"l","value":"release_film","when":{"eq":["final_l","release_film"]},"scope":"day21_complete_only"}`

**旁白**：你们实际准备过的独立样片发出了展映申请。见月没有天天刷新邮箱，她继续剪另一个版本。收到收件确认那天，她只发了两个字：“到了。”随后又补了一张打错字的截图。

`EP_l_release_film.r2.001`

## EP_l_authorized_cut｜保留与删去

条件与解锁：`{"axis":"l","value":"authorized_cut","when":{"eq":["final_l","authorized_cut"]},"scope":"day21_complete_only"}`

**旁白**：重新核对的授权页和成片一起归档。有一段很好看的私人镜头没有留下，空出来的几秒换成了现场声。见月看完两遍，说这一版短了，但不用再躲着片中人放映。

`EP_l_authorized_cut.r2.001`

## EP_l_silenced｜没寄出的那一版

条件与解锁：`{"axis":"l","value":"silenced","when":{"eq":["final_l","silenced"]},"scope":"day21_complete_only"}`

**旁白**：独立材料没有真正发出，也没有完成替代作品。见月的文件仍放在原项目目录里。她点开过草稿，改了一个字又关上；这次没有收到新回执。她的名字还没出现在独立展映的名单上。

`EP_l_silenced.r2.001`

## EP_g_independent｜自己签下的决定

条件与解锁：`{"axis":"g","value":"independent","when":{"eq":["final_g","independent"]},"scope":"day21_complete_only"}`

**旁白**：她准备并提交的独立方案进入新一轮执行。第一次会议，晚棠发现别人真会反对她，脸色不好看，还是把修改意见记下了。散会后她拍来一页改得很乱的安排：“现在连烂摊子都是我自己的。”

`EP_g_independent.r2.001`

## EP_g_bounded_partner｜把条件讲在前面

条件与解锁：`{"axis":"g","value":"bounded_partner","when":{"eq":["final_g","bounded_partner"]},"scope":"day21_complete_only"}`

**旁白**：确认后的权限表发到了相关人手里。再有人把一句“顾小姐的意思”放进会议纪要，晚棠直接划掉，写清是谁作的决定。她继续留在合作里，也继续为自己真正签过的部分负责。

`EP_g_bounded_partner.r2.001`

## EP_g_public_account｜她把话说完

条件与解锁：`{"axis":"g","value":"public_account","when":{"eq":["final_g","public_account"]},"scope":"day21_complete_only"}`

**旁白**：实际核对过的说明公开了。评论没有整齐地站到她这边，但那几笔责任终于分开写清。晚棠读完反对意见，关掉屏幕去吃饭；第二天再回来，把该答的那一条补上。

`EP_g_public_account.r2.001`

## EP_g_leave_family｜不再借那张名片

条件与解锁：`{"axis":"g","value":"leave_family","when":{"eq":["final_g","leave_family"]},"scope":"day21_complete_only"}`

**旁白**：离开的交接做完，她把旧名片从包里取出来。第一次按新身份约见，对方没有立刻给她时间。晚棠盯了回复几秒，重新挑了两个日期，自己发过去。

`EP_g_leave_family.r2.001`

## EP_g_scapegoated｜还没被听完

条件与解锁：`{"axis":"g","value":"scapegoated","when":{"eq":["final_g","scapegoated"]},"scope":"day21_complete_only"}`

**旁白**：这一轮没把她的参与范围讲清，公开说法仍把过多责任留给了她。晚棠保存着手头材料，有人不肯听完就挂了电话。她很生气，还是重新整理了材料，准备下一次再说明。

`EP_g_scapegoated.r2.001`

## EP_xu_independent｜用自己的名字回信

条件与解锁：`{"axis":"xu","value":"independent","when":{"eq":["final_xu","independent"]},"scope":"day21_complete_only"}`

**旁白**：许照收到的下一份询价直接写给许照。你把做过的样例附上，重新报了价，对方问能否调整交付范围。你谈完才笑出来：原著里负责背锅的名字，现在在报价单上。

`EP_xu_independent.r2.001`

## EP_xu_partner｜能谈分工的人

条件与解锁：`{"axis":"xu","value":"partner","when":{"eq":["final_xu","partner"]},"scope":"day21_complete_only"}`

**旁白**：新的合作安排把你单列出来，现场负责人把现场核对的分工写在你名下。陆景行也得先问你能不能排出那一段时间。你们还会争顺序，但没人能再把你的部分叫成“顺手帮忙”。

`EP_xu_partner.r2.001`

## EP_xu_backstage｜幕后也可以是选择

条件与解锁：`{"axis":"xu","value":"backstage","when":{"eq":["final_xu","backstage"]},"scope":"day21_complete_only"}`

**旁白**：你把确认过的值班安排存好，下一场照自己的检查表开工。新来的临时工问设备进场走哪条通道，你带他看了一遍。做过什么、谁确认过，都写进当天的记录。

`EP_xu_backstage.r2.001`

## EP_xu_rebuilding｜慢一点重新开始

条件与解锁：`{"axis":"xu","value":"rebuilding","when":{"eq":["final_xu","rebuilding"]},"scope":"day21_complete_only"}`

**旁白**：你没有立刻接新项目。结算与更正都留好了，缺的技能列了三项，先练其中一项。当天做出来的样例不漂亮，你重做了一遍，保存时没有再把作者名留空。

`EP_xu_rebuilding.r2.001`

## EP_xu_outside｜离开之后仍有路

条件与解锁：`{"axis":"xu","value":"outside","when":{"eq":["final_xu","outside"]},"scope":"day21_complete_only"}`

**旁白**：旧工作牌已交回，结算已确认。你把下一份工作的时间重新谈了一次，回信不用再抄送栖光。晚上经过北岸，你没有进去签到，只给相识的人留了一句有空再见。

`EP_xu_outside.r2.001`

## EP_lu_ally｜他也会需要搭档

条件与解锁：`{"axis":"lu","value":"ally","when":{"eq":["final_lu","ally"]},"scope":"day21_complete_only"}`

**旁白**：你们实际试过的合作继续往前。陆景行发新安排时，把你负责的一段直接列出来。有人越过你问他，他把消息转回：“这一段找许照，我不替他答。”

`EP_lu_ally.r2.001`

## EP_lu_rival｜各自把事做好

条件与解锁：`{"axis":"lu","value":"rival","when":{"eq":["final_lu","rival"]},"scope":"day21_complete_only"}`

**旁白**：同一份邀约，你们各交了自己的版本。陆景行没有故意让步，你也没拿原著当获胜通知。后来的彩排，他听完你的改法，沉默几秒，只说下次他要再试一版。

`EP_lu_rival.r2.001`

## EP_lu_distant｜知道彼此，保持距离

条件与解锁：`{"axis":"lu","value":"distant","when":{"eq":["final_lu","distant"]},"scope":"day21_complete_only"}`

**旁白**：必要的资料已经各自交清。后来公开场合碰见，你们点头，谈完需要对接的部分就各走各的。再碰见时也会打招呼，只是没有另约私人聚会。

`EP_lu_distant.r2.001`

## EP_lu_independent｜故事不只围着他转

条件与解锁：`{"axis":"lu","value":"independent","when":{"eq":["final_lu","independent"]},"scope":"day21_complete_only"}`

**旁白**：那份分开署名的安排开始执行。有人想把整场都介绍成陆景行的个人故事，他自己照着新单把其他参与者念出来。你们都还在场，却不再只有一个人的名字能留下。

`EP_lu_independent.r2.001`

## EP_lu_reconciled｜说清之后还能合作

条件与解锁：`{"axis":"lu","value":"reconciled","when":{"eq":["final_lu","reconciled"]},"scope":"day21_complete_only"}`

**旁白**：那次不舒服的来回已经当面说开。陆景行把新的合作安排发给你，没有加一句“就当以前没发生”。你改了一处再回过去，他认真答了；这次从具体事情继续。

`EP_lu_reconciled.r2.001`

## EP_visibility_open｜当事人知道的公开

条件与解锁：`{"axis":"visibility","value":"open","when":{"eq":["final_visibility","open"]},"scope":"day21_complete_only"}`

**旁白**：最后一次说明在相关当事人都在的场合完成。你把真实名字说全，没有把谁没答应的部分补成答应。散场时，每个人都按自己亲口给出的答案安排下一次。

`EP_visibility_open.r2.001`

## EP_visibility_private｜不对观众宣布

条件与解锁：`{"axis":"visibility","value":"private","when":{"eq":["final_visibility","private"]},"scope":"day21_complete_only"}`

**旁白**：你在私下把已有关系分别说清，没有把这些对话放进宣传材料。外面的人仍不知道所有细节；真正需要作决定的人，听到的是你亲口说出的范围。

`EP_visibility_private.r2.001`

## EP_visibility_unresolved｜分别亮起的对话框

条件与解锁：`{"axis":"visibility","value":"unresolved","when":{"eq":["final_visibility","unresolved"]},"scope":"day21_complete_only"}`

**旁白**：你没有完成最后的集中说明。有些话已经亲口讲过，有些仍没讲。你来回看着那几段聊天，知道有些地方还得自己当面解释。

`EP_visibility_unresolved.r2.001`

## EP_visibility_work｜作品留在台上

条件与解锁：`{"axis":"visibility","value":"work","when":{"eq":["final_visibility","work"]},"scope":"day21_complete_only"}`

**旁白**：公开展示的是工作成果。私人关系的说明在台下完成，没有混进宣传口径。下一次见谁、怎么见，仍按各自实际答过的话继续。

`EP_visibility_work.r2.001`

## EP_visibility_closed｜先把承诺收好

条件与解锁：`{"axis":"visibility","value":"closed","when":{"eq":["final_visibility","closed"]},"scope":"day21_complete_only"}`

**旁白**：你明确结束了不准备继续的恋爱安排，没有把删除聊天当作告别。手机里仍留着过去的对话，今晚不再靠一句“下次一定”让谁空出时间。

`EP_visibility_closed.r2.001`

## EP_bias_t｜起初，你把起拍交给她

条件与解锁：`{"axis":"bias","value":"t","when":{"eq":["bias","t"]},"scope":"day21_complete_only"}`

**旁白**：首演那晚，你让阿衡先试听蓝标U盘，再请映雪按完整版本的转调起唱。陆景行停下了准备救场的手，台上响起的是她自己的歌。她下台后主动叫住你，说要当面道谢。那时你还没想到，自己会在这里认识她多久。

`EP_bias_t.r4.001`

## EP_bias_s｜起初，你先找她确认切换

条件与解锁：`{"axis":"bias","value":"s","when":{"eq":["bias","s"]},"scope":"day21_complete_only"}`

**旁白**：首演那晚，你把核验后的情况报给清辞，请她统一给现场信号。她听完，没有让你一个临时场务冒险乱按控台，而是带着阿衡完成了切换。原著里的钢琴救场没有照常开始；她也第一次认真记住了许照这个名字。

`EP_bias_s.r4.001`

## EP_bias_l｜起初，你请她留下现场记录

条件与解锁：`{"axis":"bias","value":"l","when":{"eq":["bias","l"]},"scope":"day21_complete_only"}`

**旁白**：首演那晚，你请见月保留工作镜头的时间，再让阿衡核验蓝标里的原版。多花的那一点时间里，映雪先清唱了几句，陆景行仍在一旁准备接上。你们留下的记录只说明这次切换发生过，还不是足以结束第七日争议的全部证据。

`EP_bias_l.r4.001`

## EP_bias_g｜起初，你当面追问原版授权

条件与解锁：`{"axis":"bias","value":"g","when":{"eq":["bias","g"]},"scope":"day21_complete_only"}`

**旁白**：首演那晚，你先请晚棠核对节目授权。完整版本原本就在批准范围里，程放却把预览文件和正式文件混在了一起。她在现场把这件事问清，让阿衡切回原版。程放记住了你，也让你以后争取记录时多了一层阻力。

`EP_bias_g.r4.001`

## EP_bias_self｜起初，你先保住自己的名字

条件与解锁：`{"axis":"bias","value":"self","when":{"eq":["bias","self"]},"scope":"day21_complete_only"}`

**旁白**：首演那晚，你找到蓝标U盘，却没有逞强去操作控台。阿衡负责试听切换，陆景行弹了四小节衔接，映雪随后唱完。工作单留下了你真正做过的那部分。它没替你解决所有麻烦，却让许照不再只有等着被安排的份。

`EP_bias_self.r4.001`


# 8篇番外

## B_T_POV｜映雪视角｜按下发送以前

条件与解锁：`{"requires":{"kind":"reciprocal","character":"t"},"background":"recording","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"parallel_unsent_invitation"}`

**旁白**：唐映雪把试听文件拖进对话框，盯着发送键。

`B_T_POV.r2.001`

**唐映雪**：只说谢谢就拉黑……算了，不能真拉。

`B_T_POV.r2.002`

**旁白**：她删掉这句，换成：“帮我听一耳朵。”

`B_T_POV.r2.003`

**旁白**：又删掉。太像找临时工了。

`B_T_POV.r2.004`

**旁白**：她重新写下：“这版有个地方，我猜你会喜欢。”文件还在草稿里，没有点发送。

`B_T_POV.r2.005`

**旁白**：她把手机扣住，拿起吉他。拨了两个音，又翻过来看自己的草稿。

`B_T_POV.r2.006`

**唐映雪**：要是他忙呢？……那就先问什么时候有空。

`B_T_POV.r2.007`

**旁白**：她把吉他放下，在草稿末尾补上“有空再听”。读完，又把这四个字删掉。

`B_T_POV.r2.008`

**旁白**：想了一会儿，她决定下一次当面问。那份草稿暂时没有发出去。

`B_T_POV.r2.009`

## B_S_POV｜清辞视角｜一个没填用途的晚上

条件与解锁：`{"requires":{"kind":"reciprocal","character":"s"},"background":"theatre","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"parallel_unsent_invitation"}`

**旁白**：沈清辞点开私人日历，给自己留了一个空白晚上。

`B_S_POV.r2.001`

**旁白**：她先写“讨论后续”，看了几秒，整行删掉。

`B_S_POV.r2.002`

**沈清辞**：又不是开会。

`B_S_POV.r2.003`

**旁白**：她在便签上抄了一家想去的店，查到周末不营业，难得对着手机叹气。

`B_S_POV.r2.004`

**旁白**：给许照的邀请写到一半，她忽然想起自己还不知道他爱不爱吃辣。

`B_S_POV.r2.005`

**旁白**：她删掉那一长段时间地点，在草稿里换成：“你敢吃多辣？”

`B_S_POV.r2.006`

**旁白**：随后又补了一句：“不是工作问题。”写完，还是觉得有点太刻意。

`B_S_POV.r2.007`

**旁白**：她读着还没发出的两行字，忍不住笑了。先把想去的店存下来，下次见到许照再问吧。

`B_S_POV.r2.008`

## B_L_POV｜见月视角｜不急着剪掉的三秒

条件与解锁：`{"requires":{"kind":"reciprocal","character":"l"},"background":"projection","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"parallel_unsent_invitation"}`

**旁白**：林见月导完一个片段，给文件起名：普通周五。

`B_L_POV.r2.001`

**旁白**：窗外有人喊同伴回去。她关掉录制灯，忽然想知道许照现在在哪。

`B_L_POV.r2.002`

**旁白**：“路过的话，要不要……”她打了一半，停住。

`B_L_POV.r2.003`

**林见月**：他也不一定路过。

`B_L_POV.r2.004`

**旁白**：她把前半句删掉，改成：“想见你。哪天有空？”

`B_L_POV.r2.005`

**旁白**：太直了。她盯了一会儿，又不舍得删。

`B_L_POV.r2.006`

**旁白**：最后她把这句话存进草稿，没有发送。她想留到下一次见面，亲口说。

`B_L_POV.r2.007`

**旁白**：手机被她扣在器材包上。没过一会儿，她自己又翻了回来，怕刚才那句没存好。

`B_L_POV.r2.008`

**林见月**：这回没拍。紧张算我自己的。

`B_L_POV.r2.009`

## B_G_POV｜晚棠视角｜没有发出的漂亮回复

条件与解锁：`{"requires":{"kind":"reciprocal","character":"g"},"background":"terrace","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"parallel_unsent_invitation"}`

**旁白**：顾晚棠取下耳饰，给许照打了一句：“今天表现尚可。”

`B_G_POV.r2.001`

**旁白**：她自己先皱眉。

`B_G_POV.r2.002`

**顾晚棠**：谁给你打分了。

`B_G_POV.r2.003`

**旁白**：整句删掉。

`B_G_POV.r2.004`

**旁白**：她重新输入：“今天见到你，我挺高兴。”

`B_G_POV.r2.005`

**旁白**：太直。她在后面加了个玩笑，读完，又把玩笑删了。

`B_G_POV.r2.006`

**旁白**：她没把消息发出去，先去热牛奶。微波炉响了，她又拿起手机，把那句草稿读了一遍。

`B_G_POV.r2.007`

**顾晚棠**：没出息。

`B_G_POV.r2.008`

**旁白**：她说的是自己，嘴角却没有压下去。下次约见面的时候，就用这句开头吧。牛奶已经有点凉了。

`B_G_POV.r2.009`

## B_T_DATE｜映雪后日谈｜没有设备故障

条件与解锁：`{"requires":{"kind":"ending","id":"R_t"},"background":"recording","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"post_ending_new_scene"}`

**旁白**：这次约在排练室，映雪把多余的耳机递给你。

`B_T_DATE.r2.001`

**唐映雪**：先说好，今天设备没坏。

`B_T_DATE.r2.002`

**许照**：我今天也不是来修的。

`B_T_DATE.r2.003`

**旁白**：她笑了，让出地毯上一小块地方。你坐下，她却没有急着放歌。

`B_T_DATE.r2.004`

**唐映雪**：想靠一下，可以吗？

`B_T_DATE.r2.005`

**许照**：来吧。

`B_T_DATE.r2.006`

**旁白**：她靠在你肩上，指尖绕着一小截耳机线。

`B_T_DATE.r2.007`

**唐映雪**：其实歌还没写完。想见你先说的。

`B_T_DATE.r2.008`

**许照**：听出来了。

`B_T_DATE.r2.009`

**唐映雪**：那你刚才还装。

`B_T_DATE.r2.010`

**旁白**：她抬头问能不能亲你。你说可以，先放稳手边的热水。

`B_T_DATE.r2.011`

**旁白**：那个吻很轻。退开时她耳朵红了，第一句话却是说水要凉。

`B_T_DATE.r2.012`

**许照**：这个借口不好用。

`B_T_DATE.r2.013`

**唐映雪**：那也不许拆。

`B_T_DATE.r2.014`

## B_S_DATE｜清辞后日谈｜菜谱没有备用方案

条件与解锁：`{"requires":{"kind":"ending","id":"R_s"},"background":"home","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"post_ending_new_scene"}`

**旁白**：清辞来你这里吃晚饭，进门就闻到焦味。

`B_S_DATE.r2.001`

**沈清辞**：今天是烹饪，还是消防演习？

`B_S_DATE.r2.002`

**许照**：本来是前一个。

`B_S_DATE.r2.003`

**旁白**：她笑着挽起袖子。你请她洗菜，自己重新处理那只锅。

`B_S_DATE.r2.004`

**旁白**：饭终于上桌，她尝了一口，很认真地给出两个字。

`B_S_DATE.r2.005`

**沈清辞**：盐多。

`B_S_DATE.r2.006`

**许照**：这么不给面子？

`B_S_DATE.r2.007`

**沈清辞**：下次还想来，总不能每次都喝三杯水。

`B_S_DATE.r2.008`

**旁白**：你们笑了一阵。收碗时，她停在厨房门口，朝你张开手。

`B_S_DATE.r2.009`

**沈清辞**：想抱一下。你先把碗放下。

`B_S_DATE.r2.010`

**旁白**：你放稳碗，走过去。她抱住你，额头抵在你肩上。

`B_S_DATE.r2.011`

**沈清辞**：下次我做饭。你只负责把盐藏起来。

`B_S_DATE.r2.012`

## B_L_DATE｜见月后日谈｜今天别替我构图

条件与解锁：`{"requires":{"kind":"ending","id":"R_l"},"background":"river","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"post_ending_new_scene"}`

**旁白**：见月约你看海，到了才发现风大得连帽子都戴不住。

`B_L_DATE.r2.001`

**林见月**：跟我想的有点不一样。

`B_L_DATE.r2.002`

**许照**：照片里是不是没有砂子进鞋这一步？

`B_L_DATE.r2.003`

**旁白**：她弯腰倒砂，自己先笑了。

`B_L_DATE.r2.004`

**旁白**：你们找到背风的地方。她带了相机，却没拿出来。

`B_L_DATE.r2.005`

**林见月**：今天先看你，不构图。

`B_L_DATE.r2.006`

**许照**：那能靠近一点吗？

`B_L_DATE.r2.007`

**旁白**：她点头，伸手拉住你的衣袖。你坐近，先问能不能亲她。

`B_L_DATE.r2.008`

**林见月**：可以。我也想。

`B_L_DATE.r2.009`

**旁白**：吻结束时，她没急着躲，只看着你笑。

`B_L_DATE.r2.010`

**林见月**：风还是挺大。

`B_L_DATE.r2.011`

**许照**：我们可以换个地方浪漫。

`B_L_DATE.r2.012`

**旁白**：她认真想了一下，选了路边能关窗的小面馆。那天的合照，背景是一碗热面。

`B_L_DATE.r2.013`

## B_G_DATE｜晚棠后日谈｜不用猜的邀请

条件与解锁：`{"requires":{"kind":"ending","id":"R_g"},"background":"street","diegeticKnowledgeTransfer":false,"unlock":"normal_play_permanent; optional_ad_early_access_only_after_story_prerequisite","timeline":"post_ending_new_scene"}`

**旁白**：晚棠约你吃甜品，自己晚了十分钟。

`B_G_DATE.r2.001`

**顾晚棠**：堵车。不是考验你。

`B_G_DATE.r2.002`

**许照**：我也没往那儿想。

`B_G_DATE.r2.003`

**顾晚棠**：很好，是我先心虚。

`B_G_DATE.r2.004`

**旁白**：她坐下就挖了一大勺。你看着，她把碟子往中间推了一点。

`B_G_DATE.r2.005`

**顾晚棠**：别等我主动分完，喜欢就自己拿。

`B_G_DATE.r2.006`

**旁白**：出门时，她问能不能抱你一会儿。你点头，她才靠过来。

`B_G_DATE.r2.007`

**顾晚棠**：今天有件事没办成。先不问，让我赖一下。

`B_G_DATE.r2.008`

**旁白**：你抱着她，没有急着把沉默填满。

`B_G_DATE.r2.009`

**旁白**：过了一会儿，她抬起头，笑得有点不稳。

`B_G_DATE.r2.010`

**顾晚棠**：我还想亲你。可以吗？

`B_G_DATE.r2.011`

**许照**：可以。

`B_G_DATE.r2.012`

**旁白**：吻后她先整理了一下你的领口，转身走了两步，又折回来。

`B_G_DATE.r2.013`

**顾晚棠**：伞忘店里了。别笑，跟我回去。

`B_G_DATE.r2.014`


# 6项补充收束

## CO_LIFE_create｜补充收束

条件与解锁：`{"when":{"eq":["life_plan","create"]}}`

**旁白**：你给自己的创作留过时间。热闹过去，那份东西还在桌上，等着你接着写。

`CO_LIFE_create.r2.001`

## CO_LIFE_steady｜补充收束

条件与解锁：`{"when":{"eq":["life_plan","steady"]}}`

**旁白**：你把明天的闹钟调好。工作、吃饭、休息，这次都在自己确认过的日程里。

`CO_LIFE_steady.r2.001`

## CO_LIFE_explore｜补充收束

条件与解锁：`{"when":{"eq":["life_plan","explore"]}}`

**旁白**：你打开一张没在原著里出现过的活动海报，认真看起报名时间。

`CO_LIFE_explore.r2.001`

## CODA_closing_honor｜兑现

条件与解锁：`{"when":{"eq":["closing_answer","honor"]}}`

**旁白**：你保留了已经答应的下一次安排。等到约好的那天，要记得真的出门。

`CODA_closing_honor.r2.001`

## CODA_closing_future｜还要问

条件与解锁：`{"when":{"eq":["closing_answer","future"]}}`

**旁白**：你把想问的事留在便签第一行，下一次当面问。

`CODA_closing_future.r2.001`

## CODA_closing_pause｜先停一停

条件与解锁：`{"when":{"eq":["closing_answer","pause"]}}`

**旁白**：暂停已经说出口。今晚不再追加一句“下次一定”。

`CODA_closing_pause.r2.001`


# 运行时原因模板及日程文案

```json
{
  "uiText": {
    "sourceRepair": "与{name}更正阿衡的事",
    "reopen": "再认真约{name}一次",
    "repairFirst": "和{name}说清那件事",
    "repairAct": "为{name}实际做完答应的事",
    "rest": "留给自己：休息或准备下一次行动",
    "schedule": "第{day}日 {time} · 这一段想留给谁？",
    "scheduleHelp": "赴一个约，或给自己留一点时间。看记录不占日程。",
    "active": "正在约会：{names}。想怎么继续，见面再说。",
    "noActive": "尚未确认恋爱。想见谁，仍由你约。",
    "actionCost": "用一次相处机会",
    "finished": "这一轮的主要结局已收好。下面的命运后续可以逐项打开，不会替你重选。"
  },
  "reasonText": {
    "quote": "你当时选择的是：“{choice}”",
    "hidden": "{name}尚未发现你那次关于其他对象的否认不实。眼下的平静，不是一份知情的共同约定。",
    "unaccepted": "与{name}的更正行动已经做过，但继续哪种关系尚未重新答应。",
    "unperformed": "你已经向{name}承认问题，约好的实际更正却还没完成。",
    "conflict": "{name}提出的那件事还没说清，后来见面没有抹掉这个分歧。",
    "exclusive": "你答应了只与{name}交往，后来却保留了其他约会；这份承诺还没有重新谈过。",
    "falseSource": "{name}仍未听到你更正借阿衡名义说出的消息来源。",
    "waiting": "你和{name}停在“想慢一点”。后来没有作出新的邀约决定，今天仍保留这个答案。",
    "friend": "你和{name}明确选择做朋友。之后的见面没有被另算成恋爱。",
    "ended": "你已经向{name}明确结束这段关系，之后没有重新确认开始。",
    "notAsked": "你还没有向{name}完成一次明确的恋爱邀约。彼此好感没有自动替你问出口。",
    "noPrivate": "你与{name}答应过约会，但还没走到一次完整的私人相处。这次不把刚说出口的关系写成已经很熟悉。",
    "pair": "{names}之间尚未把共同关系谈定。分别答应过你，并不等于已经答应彼此加入。",
    "group": "这次多人关系还缺一次大家真正相处、分别答应的共同邀约。",
    "unknown": "{name}尚未由你亲口得知现在全部的约会对象，不能替她写成已经接受。",
    "breakups": "你已经分别与{names}结束过恋爱安排。今晚没有重新把这几段接起来。",
    "repairQuote": "这次要更正的是那条真实记录：“{choice}”",
    "declined": "你向{name}明确说过暂时不开始。后来没有新的邀约决定，今晚仍按那次回答结束。"
  }
}
```


# 免费原著手册

```json
{
  "title": "你读过的原著",
  "book": "今夜偏爱男主",
  "city": "海岚",
  "protagonist": "许照，23岁，栖光计划临时场务。你头晕醒来，靠工作证、现场人名和首演细节，认出自己穿进读过的《今夜偏爱男主》。原著第十三章发生在第七日，你会被归责并清退。小说记忆需要现场核实，不等于现在已有证据或专业技能。",
  "originalHero": "陆景行，28岁，音乐人。原著中他在首演19:03以钢琴救场，得到后续合作机会。他会练习、联络团队、争取自己的项目，也会根据改变后的现场调整行动。开局他与林见月尚未交往。",
  "characters": [
    {
      "id": "t",
      "name": "唐映雪",
      "age": 24,
      "public": "独立歌手；嘴快、爱开玩笑，真正被夸到时会慢半拍。",
      "memory": "她说不紧张时会弹右腕的黑发圈；演出后藏起冷饭盒，不想被当成可怜的天才。",
      "wish": "唱自己的作品，也愿意选择适合自己的商业合作。",
      "secret": "她就是匿名账号“晚班电台”。账号归属只在原著番外揭过，公开试听的音乐细节则人人都能听。",
      "originalFate": "后来爆红，但《迟来的夏天》从节目单上消失。",
      "limits": "知道作品不等于持有母带；她的点头也不自动授权公开私人照片。"
    },
    {
      "id": "s",
      "name": "沈清辞",
      "age": 27,
      "public": "制作人与策展人；直接、有判断，容易先替别人把事情处理完。",
      "memory": "她想保留北岸艺术中心同园区旁厅里三排椅子的小演出空间。主厅与旁厅不是两处遥远场地。原著后来写她收起钥匙，说有新项目也不错。",
      "wish": "让独立演出持续办下去，也给自己留真实的私人时间。",
      "secret": "她已经想过离开原安排，另找空间。你知道这个想法，但没有读她私人设备的权限。",
      "originalFate": "北岸成为陆景行巡演的排练基地，她的计划被推迟。",
      "limits": "不讨厌你有野心，讨厌把野心藏成毫无所求；不能用感情要求她替你处理全部问题。"
    },
    {
      "id": "l",
      "name": "林见月",
      "age": 25,
      "public": "纪录片编辑；温和、会听完，但对记录和自己的选择有原则。",
      "memory": "她填好的外出拍摄申请停在草稿里；原著总让她替旧友解释，没有寄出。",
      "wish": "拍一部属于自己的作品，去留由现在的她决定。",
      "secret": "原著后来写到她保留过完整现场原声。现在是否真实录到、保存了哪段，必须在剧情中核实；使用范围还需要相关当事人授权。",
      "originalFate": "与旧友陆景行成为官配，自己的出发被延后。不是开局已有恋人。",
      "limits": "她的作品不是恋爱的排名表；不接受替她决定必须去或必须留。"
    },
    {
      "id": "g",
      "name": "顾晚棠",
      "age": 26,
      "public": "投资方代表；有攻击性，会算条件，也会认真看你有没有说实话。",
      "memory": "原著最后才让你看见她写过的保留意见。有些错属于她，有些不是她作出的决定。",
      "wish": "把实际权限与责任说清，决定留在体系、独立合作或离开。",
      "secret": "一份未公开的保留意见能反驳程放对她立场的简化；你知道存在，不等于已经有文件。",
      "originalFate": "成为项目强硬安排的公开面孔，被撤下后仍背了过多的责任。",
      "limits": "利益可以明谈，亲密不能拿来交换；不想每一次见面都必须带来好消息。"
    }
  ],
  "timeline": [
    {
      "day": 1,
      "original": "错版伴奏中断；陆景行钢琴救场。",
      "knownAdvantage": "蓝标U盘里有终排完整版本。你可以找到它，请阿衡试听，由在场负责人确认切换；不能把记忆当成授权，更不代表此时已经拿到未来归责争议的全部证据。"
    },
    {
      "day": 3,
      "original": "匿名音乐片段按商业样带发出，署名被改。",
      "knownAdvantage": "先确认来源与授权，她仍有暂停、修改或合作的选择。"
    },
    {
      "day": 4,
      "original": "北岸转为巡演基地。",
      "knownAdvantage": "共享使用、异地驻留与合作经营不是同一条路。"
    },
    {
      "day": 5,
      "original": "见月没寄申请，部分现场素材被删。",
      "knownAdvantage": "不要替她点发送。支持她完成自己决定的路径。"
    },
    {
      "day": 6,
      "original": "晚棠的保留意见被省略。",
      "knownAdvantage": "让实际发言与责任各归其位，不把她全部洗白。"
    },
    {
      "day": 7,
      "original": "许照被清退；原著不再写他。",
      "knownAdvantage": "事前记录、授权原声或现场见证可用于自救。恋爱不是证据。"
    },
    {
      "day": 21,
      "original": "夜场围绕原男主完成。",
      "knownAdvantage": "被你改变的前因会产生新后果。这一晚没有万能的“全选”按钮。"
    }
  ],
  "rules": [
    "阅读、看手册、慢慢想不消耗故事时间；选一次实际行动才推进一个机会。",
    "原著是旧因果。改变前因后，具体时间地点可能变动；重要变化要在行动前出现可见提示。",
    "知道秘密不等于对方告诉过你；没有取得的文件、影像或母带不会自动进背包。",
    "约定是否排他、对方知道哪些关系，都与心动不同。可能被发现，但必须有真实的信息来源。",
    "读档是玩家操作，不是角色轮回；回退会恢复当时的事件、物品、关系和人物知识。"
  ],
  "canonNote": "原著首演章节序号没有在原始设定中定稿；本版不编造章号。第十三章指第七日许照被清退的章节。",
  "version": "revision-r4.0"
}
```
