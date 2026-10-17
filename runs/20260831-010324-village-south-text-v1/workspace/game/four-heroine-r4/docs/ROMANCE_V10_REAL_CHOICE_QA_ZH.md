# 《攻略美少女》V10：第一夜能看懂、赢得爽、输得痛｜剧情因果与 QA

## 本轮真正修的问题

V9 手机界面已经一人一句，但多个 UI 选择没有正典后果：工作人员伸手/自己站起来只改变一行字，所有玩家都先找蓝标盘，唐映雪问「在想什么」而下方按钮跳到下一场工作；进入下一段恋爱剧情还出现旧的 click 监听抢走首句对白。**这些问题不能靠 CG 画质、好感度浮层或增加旁白解决。**

## V10 结构（执行版）

| 出现时机 | 玩家明确知道的事 | 玩家做什么 | 真实得失 |
| --- | --- | --- | --- |
| 第一个舞台镜头 | 歌手唐映雪的伴奏被人换了，她还撑着 | 点击推进 | 女主能力与危机先于复杂设定出现 |
| 工作人员 & 工牌 | 我变成小说里的临时工许照；七天后可能背锅 | 点击起身、翻看工牌；不再出现假三选 | 解释玩家身份和眼下危险 |
| 现场负责人 | 原版可能在设备箱，不能私自操作音控 | 在控台、交接单、接线板上调查 | 玩家能选择边查边救还是只顾保住自己 |
| **尚未找到原版时** | 没盘无法亲自换回伴奏 | 「先保自己」或返回找盘 | **选择不救：陆景行代她垫琴，玩家失去救场功劳与第一关注** |
| **找到原版时** | 找盘是真实动作，接下来得承担后果 | 救场／留证调查／不插手 | 三条正典 route，不再强迫所有玩家翻完三个物体 |
| 保守路线的下一选择 | 主管程放要求把责任确认单签在你名下 | 签字／拒签／留时间线 | 签字写入 canon_signed_blame，后续 A4b/A6a 有事实回调；拒签/留证分别产生不同真实证据 |
| 救场路线 | 女主记住帮助她的人，但主管质疑你动设备 | 找歌手或负责人确认、后续选备份还是反击 | first_win=true，方法与记录责任不同；可能在工作群被针对 |
| 恋爱互动 | 四位女主的问题和三个回答一一对应 | 选择靠近／慢慢认识／只保持工作 | 原引擎对应 contact、photo、aftershow、work 等持久字段，后果可见 |

## 叙事风格约束

1. 首屏只说危机，不一次解释演出流程、小说设定、人物背景。
2. 容易混淆的道具均由情节明确其用途：原版盘能救场，交接单能把错误推给你，控台会留下版本切换记录。
3. 选项是一句可执行行动及其可理解的风险，不用「策略/意向/值/Flag」「canon」「source」「blue_location_known」之类术语。
4. 工作人员起身、普通继续、手部动作不伪装成能改命运的三选。
5. 爽感由可验证的行动带来：找到原版、歌手回望确认、主管动摇、记录明确；失误会让别人救了她、自己签下追责依据或错失私人联系方式。
6. 所有一人一句，手机对白区小于等于 1/3 高、不滚动；无倒计时强迫快读。
7. 不允许仅靠新 UI 给自己加好感度。展示的每个后果必须绑定到真实引擎 history+flag，刷新也能恢复。

## 真实行为与后果的证据表

| 发出的真实指令 | 必须触发的引擎事实 | 负担/奖励 |
| --- | --- | --- |
| ENTRY_WAKE/canon | first_win=false；进入 ENTRY_CLUES | 陆景行代垫琴，错过抢先被她记住的机会 |
| ENTRY_CLUES/obey | canon_signed_blame=true | 保存已签责任书；后续 A4b/A6a 明确引用 |
| ENTRY_CLUES/refuse | source_declined_handover=true | 没签字，主管公开施压 |
| ENTRY_CLUES/witness | source_original_timeline=true | 阿衡能作证，但没有直接抓到换版人 |
| ENTRY_WAKE/rescue → COLD/t | first_win=true，opening_method=performer_cue | 唐映雪接回原版、明确记住帮助者 |
| ENTRY_WAKE/investigate → ENTRY_MEMORY/camera | source_pre_switch_timestamp=true | 具体可核的切换时钟视频 |
| ENTRY_WAKE/investigate → ENTRY_MEMORY/email | source_programme_approval_note=true | 节目授权对照，主管被追问 |
| OP_FORK/confront | cheng_questioned_early=true | 有对质记录，主管翌日会叫你写说明 |
| OP_TALK_s/work | contact_s=work | 只获得工作号，不凭空变成私人邀约 |
| OP_TALK_l/slow | private_photo=not_taken | 尊重她不拍照，不获得二人合照 |

上表全部基于现有引擎的真实 state 字段（不是新写的声望/恋爱数值）；`romance-v10.js` 从引擎读取效果，只有对应命令及 flag 都匹配才渲染后果。`storyHTML` 不会修改正式剧情数据，`choose()` 仍是唯一正典选择入口。

## 验收方法

- `npm run verify`：全量纯剧情/引擎/文本/构建回归。原 `STORY.json` 保持原 SHA。
- `node tools/test-romance-v10.mjs`：证明拒签/签字/见证、救场/留证引擎状态不同；签字负面是持久真字段。
- `python tools/test-interactive-opening.py`：开场场景点击、真实热点、三个正式分支、存档、手机布局。
- `python tools/test-romance-v9.py`：四位女主的过场与实际约会选项，不得漏台词。
- `python tools/test-romance-v10.py`：坏签字、拒签、留证、救场、调查五种关键方案（Chromium + WebKit 共 10 条），检查正典 flag、可见后果、触屏、刷新恢复和单镜头。
- 在没有本机 HTTP 访问权限的隔离环境可用 `R4_LOCAL_HTML=/.../play.html` 做 `set_content` 级别弱验收；真正的 HTTP 验收必须在 CI 或可访问浏览器进行。

## 本轮不能代替的发布门槛

- 物理 iPhone/Android 手感、真实陌生玩家 8–12 人首分钟理解与失败意愿。
- 11 张 CG 仍为 1024×1536 工程候选图，不是 1536×2400 以上终审母版；商用使用权、人物跨镜一致性待复核。
- 现有全篇 228 场景尚存在其他中后期老文字结构，V10 保证首夜互动及四位女主早期关联，不代表全部章节已经按视觉小说标准完成重写。

**交付状态：** 源码改造 + 编译/测试报告与 CI 应分开判断；未完成真人/商用美术验收前 PR #22 继续 Draft。