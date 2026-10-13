# r4 正式内容与解释器协议

版本 `revision-r4.2`；解释器 `bookside-revision-r4.2`。本文是新格式说明，旧说明仅在原始 ZIP 内保留。

## 唯一内容源

`STORY.json` 是228场正式剧情及运行参数；`EPILOGUES.json`是40项命运尾声；`BONUS.json`是8篇番外；`CODA.json`是6项补充收束。`HANDBOOK.json`为免费原著信息手册。`CHOICE_CONTRACTS.json`是自动生成的全量因果索引，不反向驱动剧情。`UI_COPY.json`仅说明运行时文案位置。

正文片段 `{id,speaker,text,textHash}`；`textHash = SHA256(speaker + "\\0" + text)[:16]`，用于检测文字身份，不是防作弊。正文、条件正文、回应各有唯一ID。`speaker=N`旁白，`P`许照，`T/S/L/G`四位女主，`LU`陆景行，`B`原著记忆。

## 条件与状态

`blocks`在进入场景时筛选；`replyBlocks`按点击前状态筛选，随后才应用效果。不能先应用效果再判断回应，更不能把条件文本全部拼出来。谓词：all、any、not、eq、ne、ge、seen、chosen、deniedPeer、hasDenial、otherActive、canDate、pairReady。未知操作报错。`chosen:[场景,选项]`用于精确回忆，不能只用看过场景代替。

状态 `f`保存事实；`stage`是实际经历的私人场景进度，不是好感百分比。`interest_*`区分倾向，`scope_*`区分 none/waiting/friend/declined/open/exclusive/ended；`commitment_*`区分 none/dating/relationship。`active_*`、`pending_*`、`latent_*`、`breach_*`等共同决定是否能邀约。慢热、朋友与结束不是同一个状态；重新邀约必须有新的明确选择。

`known`仅保存真实已披露的对象；`sources`记录观察者、事实、来源命令、具体涉及的人和承诺快照。照片、传闻、玩家的声称、当面证实不能互换。存档收藏不会给本周目角色增加知识。

## 日程与路由

20次自由日程保留。私人场景2→SPARK、4→5、6→7、8→9、10→11可以在同一次实际出行中连续演出，两段都必须点击真实选择，不能直接提升stage。明确离开结束当次出行；可用后续日程再约。日期以 `calendar` 与事件事实为准，不能在自由场景正文写死第1日。

`choose(state,data,id,expectedRevision)`只接受当前可用选项并返回新的state，不修改传入state。所有路由宏的完整实现见`tools/engine.mjs`的路由函数；请勿在接入时使用旧r1的宏白名单。包括开场、日程、日历恢复、私人关系追问、延期披露、独立共同邀约、命运收束与结局路由。

计划 `plan_*`不等于命运；执行 `exec_*`、材料 `proof_*`与晚期实际补救决定 `RES_*`的可用结算。`fateLog`保留计划、行动、收束的真实命令来源；尾声不得按总分捏造音频或授权。

## 阅读器与存档

`play.html`由构建器把上述JSON、解释器、UI、CSS内嵌，零外部网络资源。
存档键 `gonglue:revision-r4.2:canonical`；校验解释器版本及正文SHA，再从`ENTRY_WAKE`重放命令。存档含回应/分页位置和只读收藏。旧版不静默迁移；新内容不复用旧存档键。重要修订后需更新版本或哈希并提供可见提示。

只读回看使用独立回放对象；main state、history、当前分页与持久化字节不得因回看变化。重新选择则明确恢复命令前缀，后续未来事实全部舍弃。输入使用revision/render token、已脱离DOM的旧按钮拒绝和拖动保护；不设置跨页面全局时间门禁，也不以click.detail>1阻止新按钮的合法快速触控。

存档失败允许继续并导出记录，内存收藏仍登记。模拟Storage的通过不等于真实浏览器持久化验收。

## 构建与导出

`node tools/build-preview.mjs`生成预览；`python tools/export-and-audit.py`生成全剧情稿、751选项合同、逐场台账、回忆定位与条件缺口。正式修改先改JSON/解释器，然后执行构建、测试、导出并重新绑定证据。不可只改Markdown。

`runtime.mjs`与`repository-index.html`也是自动生成的正式仓库入口适配。`SPARK_*`只写入早期兴趣与选择记忆，不确认交往。全部596条件正文/回应的实际显示见证由test-conditional-r3.mjs验证。
