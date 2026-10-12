# r4 全量修复与回归记录

正式源 SHA-256：`577db875a0a664b4cba8c301e9169f60b9aa831ee97e9fdd9f03368dcdea7bf3`。

原始26项和r2新增17项全部登记。机械断言、普通命令、编辑自查与真人/原生验收分开；没有把历史“通过”直接沿用。

## P0-01｜四女主与陆景行的主要命运在前段一次写定

**实际处理**：保留计划—执行—实物—收束链；重写20段结果回应为已经发生的事实，不重复播放执行过程。

**位置**：A2—A7、EXEC/RES、LU_MOVE、EPILOGUES。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-02｜四人结局的行动预算容不下充分相处

**实际处理**：保持行动预算与每人独立亲密场景；四人普通路径95次命令通关，不注入stage或统一同意。

**位置**：20次日程、H_*、c04—c11、endingRules。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-03｜多人关系连续两次‘慢一点’后永久失去再确认入口

**实际处理**：慢热两次仍有新的邀约和重新回答；重写六组生活冲突与回应，没有通过删慢热选项回避软锁。

**位置**：六组P_/Q_、groupWait、availableActions。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-04｜玩家选择朋友，后文却仍被写成正在约会

**实际处理**：朋友、拒绝、兴趣、交往和排他分别处理；初见救场不写active；后续主动邀约不等于已交往。

**位置**：c03、REL、REOPEN、SPARK、repair。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-05｜关键心动与结局回忆仍在补造经历或记错选择

**实际处理**：删除未选择的散步照片、未问的问题、未说过的话；相机/耳机/草稿/牵手分别追溯真实前驱。

**位置**：逐场225审查、R_l、R_gs、R_gl、BONUS。

证据：`qa/current/r4-causality.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-06｜关系知情账本与人物对白相互矛盾

**实际处理**：保留每人、每个事实及实际来源；将四个03来源冲突与普通公开/隐瞒路径重新回放。

**位置**：knowledge、disclose、FOUND、CROSS、DUE。

证据：`qa/current/information-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P0-07｜结局‘回看’覆盖当前游玩进度，而且跳过主结局

**实际处理**：24主结局、8番外只读回看逐项比对；当前存档字符串不变；回退选择才改变本局事实。

**位置**：readPayload、collection、history、reviewEnding。

证据：`qa/current/browser/fixture-reader/reader-chromium-all-report.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-01｜已经离职或离场，后文仍按旧身份行动

**实际处理**：离职后不再使用旧钥匙或替场地方承诺资源；晚期约见与经营权限分开。

**位置**：沈/顾后期、H_lst、RES_s/g。

证据：`qa/current/independent-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-02｜自由日程遇到写死时间，主动离开的结局又瞬间换地点

**实际处理**：主厅和第三排旁厅在同一园区；日程时钟回归；去留与下一处会面有转场。

**位置**：calendar、free events、s02、A7/X05。

证据：`qa/current/final-edges.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-03｜自救证据仍靠总分，演出却默认存在具体原声

**实际处理**：蓝标伴奏、半成品试听、完整母带、授权原声、工作记录分别管理；没有原声不能播放它自证。

**位置**：A4b/A6a、E01、recordFate。

证据：`qa/current/r3-regressions.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-04｜旧入口删掉了，后文还在等永远不会写入的状态

**实际处理**：565个条件正文/已选回应均有当前解释器普通命令展示见证；不把未点击选项的条件真值算展示。

**位置**：所有when、c03、A2b。

证据：`qa/current/conditional-r3.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-05｜同一场景组合后物件自相矛盾

**实际处理**：逐场合读条件块，消除文件夹位置矛盾；“没有文件夹”场景不再从文件夹拿出东西。

**位置**：g03及其他合成正文。

证据：`qa/current/independent-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-06｜合理吃醋被系统升级成控制欲

**实际处理**：正常不安可以表达，不自动当成控制；真正的否认/利用/爽约仍有具体冲突。

**位置**：l07、pending/breach、修复场。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-07｜女主临时提前演出，却默认玩家迟到有错

**实际处理**：提前到场/新时间/迟到分开；谁承诺、谁变更、谁未兑现有实际来源。

**位置**：t08、MEET/MIS、promise_due。

证据：`qa/current/information-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-08｜沈清辞线把‘我想帮你’记成‘我需要你帮’

**实际处理**：保留需要帮助的说话方向；后文按真实回答回忆，不反转成主角承诺救人。

**位置**：s09/s10。

证据：`qa/current/independent-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-09｜遗憾结局和修罗场只解释分类，没演出真实原因

**实际处理**：失败指向真实偏心、隐瞒或关系分歧，角色回应具体事情；保留修复与退出。

**位置**：R_group_bias、遗憾结局、reasonText。

证据：`qa/current/regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-10｜‘实际修复’主要仍由旁白替玩家做完

**实际处理**：承认、实际更正、重新协商均由玩家操作；每位女主措辞和动作不再整段同模版。

**位置**：R1/R2/RA/OPEN_CLEAR。

证据：`qa/current/information-regression.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-11｜选择‘稍后说清’，状态却当场全部披露

**实际处理**：延期说清不提前知情；顾晚棠先说“散场前会讲”，不是“你刚才说清了”。

**位置**：DUE、g07、discovery_*。

证据：`qa/current/r4-causality.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-12｜开场之后，陆景行又逐渐退成态度背景

**实际处理**：陆景行有合理钢琴备选、自己排练/组队/接洽；许照失误也有学习过程，不靠他变笨获胜。

**位置**：COLD、LU01—03、LU_MOVE1/2。

证据：`qa/current/r4-causality.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-13｜四人材料不同，但攻略答题方式太相似

**实际处理**：唐会拿音乐和紧张开玩笑，沈的体贴落在安排与自己的错误，林有镜头观察与新目标，顾直接且真有利益失误。

**位置**：44个人场、SPARK、6对共同线、H组线。

证据：`qa/current/scene-editorial-audit.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-14｜作者解释反复打断暧昧和冲突

**实际处理**：800条逐场编辑记录直接落入JSON；将许多关系说明会改成吃饭、排练、拍片、雨中同行等具体冲突。

**位置**：正式正文/选项/即时回应/尾声。

证据：`qa/current/scene-editorial-audit.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-15｜穿书主张的获知事实仍有新旧两套记录

**实际处理**：只有主角知道的书中信息不自动传给别人；E_T的普通建议不强制说“我看过原著”。

**位置**：OP_SECRET/OP_CHECK、E_T、sources。

证据：`qa/current/r4-causality.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-16｜临时游玩时，已满足条件的结局与番外不登记

**实际处理**：收藏先在内存登记；模拟配额失败后仍能打开新增结局，原存档未覆盖。真实磁盘故障待原生环境。

**位置**：save、profile。

证据：`qa/current/browser/fixture-reader/reader-chromium-all-report.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P1-17｜独身逆袭有价值观，却缺够鲜明的可见成果

**实际处理**：提供自己的工作样本、投递与实际执行；邮件选择前保持草稿，不靠旁白自动完成事业。

**位置**：SELF、E04、XU_WORK、X01—05。

证据：`qa/current/r4-causality.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P2-01｜重复字和元叙事术语仍未清理

**实际处理**：全量ID/文本hash、条件与引用校验；对白逐场自审，关键记忆修正有单独反例。自然程度仍待真人盲玩。

**位置**：225场/aux全部文本。

证据：`qa/current/static-audit.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## P2-02｜全程尾声与共同关系说明堆叠，缺少节奏分层

**实际处理**：主结局分页，尾声按需展开，番外只读；四篇POV明确未发送的草稿，不改本局知识。

**位置**：24结局、40尾声、8番外、6收束。

证据：`qa/current/browser/fixture-reader/reader-chromium-all-report.json`；`qa/current/final-regression.log`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-01｜延期谈话尚未兑现，后文却提前回忆已经谈过

**实际处理**：延期谈话仍在未来，直到真实兑现再回忆；修正顾晚棠提前感谢。

**位置**：DUE/g07。

证据：`qa/current/r4-causality.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-02｜同次合并出行后，玩家选择“离开”仍被强制继续

**实际处理**：选择离开不强制继续第二段；合流前确有转场。

**位置**：finishOuting/H_*。

证据：`qa/current/independent-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-03｜离职后私人会面仍使用旧工作钥匙/权限

**实际处理**：离职后的约会在公共空间，不再用旧钥匙与运营权限。

**位置**：s10/H_lst/RES_s。

证据：`qa/current/independent-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-04｜看完视频/片段，被回忆成自己分析过或问过问题

**实际处理**：看完、分析、提问分别按真实选项回调；工资问答不变成未问的关系问题。

**位置**：l09/l10/g03/R_l。

证据：`qa/current/r4-causality.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-05｜同一次外出，后文虚构隔天又吃饭/另打电话

**实际处理**：同次活动不虚构隔日已见；约定的那天不是自动“明天”。

**位置**：c08—c11/R_gs/CODA。

证据：`qa/current/independent-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-06｜某句话谁说、饭谁送、当时在哪，都被反方向记住

**实际处理**：逐条核对饭是谁送、帮助方向、照片由谁拍，按选择而非角色刻板模板回忆。

**位置**：t04/t05/s09/s10/g03。

证据：`qa/current/independent-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-07｜结局配置写了最低关系深度，但结算没实际读取

**实际处理**：结局真实读取最低私人深度；四人见证有独立私人段落，不仅数组配置好看。

**位置**：classifyEnding/endingRules。

证据：`qa/current/regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-08｜独身命运尾声回溯到从未作出的计划

**实际处理**：独身回忆仅引用实际计划和执行，不回忆玩家没承诺的项目。

**位置**：XU_WORK/EP_xu。

证据：`qa/current/information-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-09｜第二次及之后的共同邀约每次都说“这是第一次”

**实际处理**：共同事件第二次不重新声称初见；慢热再邀和新事件保留。

**位置**：H_* / H_*_ASK / Q_*。

证据：`qa/current/regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-10｜低亲密度结局回忆从未赴过的私人约会

**实际处理**：未赴约不出现对应晚餐、亲吻与照片；R_gl拍照由终局选择决定。

**位置**：24结局条件回调。

证据：`qa/current/r4-causality.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-11｜唐映雪/林见月的识破模板有台词，却缺实际撒谎入口

**实际处理**：真正否认已有对象后才触发识破；没有谎言的路径不会凭空抓包。

**位置**：denyRelations/FOUND_t/l/CROSS。

证据：`qa/current/information-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-12｜“兑现承诺”的回忆提前于承诺被真正履行

**实际处理**：履约回忆晚于真实活动完成，未说清时不会已经得到原谅。

**位置**：promise/DUE/MEET。

证据：`qa/current/information-regression.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-13｜新多人共同场景覆盖或误写此前真实两人共同经历

**实际处理**：新共同关系不覆盖真实双人经历；回忆保留具体邀请或参与而不夸成未完成行动。

**位置**：groupStart/groupFinish/P_/H_。

证据：`qa/current/final-edges.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-14｜旧匿名身份条件从未被当前合法路径设置

**实际处理**：旧匿名条件由当前合法来源冲突进入；全部条件展示见证重跑。

**位置**：when全量和03来源分支。

证据：`qa/current/conditional-r3.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-15｜自由中午日程和夜间场景时间表述冲突

**实际处理**：自由私人见面按实际晚间日程；独立白天工作锚点保留。

**位置**：calendar/availableActions。

证据：`qa/current/final-edges.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-16｜用户合法的快速第二次触摸被误判成双击吞掉

**实际处理**：移除误吞合法第二触的时间门槛，保留陈旧按钮/版本/滑动守卫；真实DOM双击只执行一次。

**位置**：preview-ui pointer/render/revision。

证据：`qa/current/browser/fixture-ui/ui-report.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## NEW-17｜陆景行早期有计划记录，却未在后文真正回应和行动

**实际处理**：陆景行后续实际行动与回调保留，开局救场有可执行备选，不降智。

**位置**：LU_MOVE1/2/LU01—03/COLD。

证据：`qa/current/r4-causality.json`。

真人盲玩未完成；原生入口门禁仍阻塞。

## 本轮另外发现并修复

开场把尚未认识的名字放进第一选择：补入通过现场称呼辨认摄影者、调度者、投资方核对人的过程。

原版找盘的五条方案实质相近：改成歌手接段、制作人统一切换、摄影留证、授权核对、音控交接五条流程，各自保留后文回调；顾晚棠路线引出程放的追问，而非无成本全员赞扬。

开场修改后事故录像仍把许照写成擅按控台：统一为许照交U盘、阿衡试听切换，造假预剪删去后半段。

顾晚棠在关系尚未补说时就回应补说、回忆玩家根本没问过的问题：修正g07时间与g03工资问答。

R_gs没有散步却收到散步照片，R_gl没选拍照就已经有合照，林见月回忆了另一句恐惧：逐一重写真实前驱与对应选项。

共同活动已录像却又说“没拍”、沈清辞退出后仍替场地作主：改成有条件的现场行为与公共空间。

四篇只读POV设定为未发送邀约却写成真的发出：明确保留草稿，不往本局人物知识账本写入。

职业收束重复播放执行场景：结果块改成过去发生的实际结果，保留计划/执行/来源/最终决定的独立性。

这些修订进入 `data/*.json`。逐项修改前后在 `patch/r4-editorial-changes.json`；完整差异在 `patch/r3-to-r4.diff`，225场审查在 `qa/current/scene-editorial-audit.json`。
