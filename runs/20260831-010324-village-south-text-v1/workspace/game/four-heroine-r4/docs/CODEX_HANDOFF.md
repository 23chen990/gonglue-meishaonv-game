> **r4.1 远端状态更新（2026-10-12）**：完整可编辑源、默认入口和专用测试已放在 `feat/gonglue-r4-1-editorial-20261012`，草稿 PR #2。`main` 尚未合并。此文下方的 r4 **本地安装/未上传步骤属于历史交接，不要在已安装 r4.1 的分支再次执行**。先查看同级 `R41_QA.md`、`R41_EDITORIAL_CHANGELOG.md` 与 PR 的当前 Actions。\n\n# Codex开发接入说明 · r4

## 0. 任务边界
这是一份已经改过正文、实际能玩的完整包，不是让你重写一遍故事的策划稿。
唯一目标仓库：`23chen990/gonglue-meishaonv-game`。
唯一游戏工作区：`runs/20260831-010324-village-south-text-v1/workspace/game`。
不要改其他小游戏或工厂共享代码，不直接覆盖main，不恢复双女主或虚构v6。

## 1. 先固定版本
读取 `01_CANON_LOCK.json`、`docs/ENGINE_CONTRACT.md`、`docs/FIX_LOG.md`、`docs/LATEST_REQUIREMENTS.md`、`docs/QA_REPORT.md`。
本版共225场、737选择、565个正文/已选回应条件块；15恋爱组合、24主结局、40尾声、8番外、6收束全部保留。
`ENTRY_WAKE→ENTRY_CLUES→ENTRY_MEMORY→COLD→OP_SETTLE` 是真实新开场。前三次是观察与恢复认知，COLD才是首个改命分支。
书名《今夜偏爱男主》、第十三章/第七天被清退、原著19:03钢琴救场有旧资料依据；首演章号未知，不能写成第六章。

## 2. 先在包内复现
```sh
npm run verify
npm run test:browser:offline
```
缺少Playwright/浏览器时先按本机测试环境安装，不要把缺依赖标成测试通过。
本地先 `npm run serve`，另一个终端 `npm run test:browser` 才是原生HTTP/localStorage测试。当前交付环境该门禁被浏览器策略阻塞；不能删除这些用例、改成set_content后宣称通过。

## 3. 远端真实状态，不要沿用旧交接猜测
本轮核实：
- main：`26b5481631aa396aac26a61de8bc9745a1599880`，实际src/main.ts仍渲染《村口向南》。
- r3独立分支：`codex/four-heroine-r3-acceptance-20261012`，HEAD `a6eb47641fe022caaa8b51282ac0354d17964afa`；有中断的delivery/r3分片。
- 另一个较旧恋爱分支HEAD：`42c779020c5818c7409ea051f099a454e81ac0a1`，不要误认为main。
- 本轮未上传r4、未创建PR。事实记录在 `provenance/GITHUB_READ_SNAPSHOT.json`。

你开始时必须重新fetch并检查HEAD、差异、用户未提交修改和Actions。提交变化时不能覆盖新用户修改，不能把现在写在这的SHA当未来永不变化。

## 4. 在隔离分支接入
解压包放在目标仓库工作树以外。先读取目标仓库AGENTS/HANDOFF和实际构建配置。
对核实过的干净本地工作树运行：
```sh
python3 /path/to/gonglue_r4/tools/integrate-repository.py   --repo /path/to/gonglue-meishaonv-game   --expected-head YOUR_JUST_VERIFIED_LOCAL_HEAD   --branch codex/book-entry-r4-20261012
```
脚本会校验origin、HEAD、干净工作树和目标目录不存在，然后仅创建本地分支。不会commit、push、创建PR或修改远端。
它将包安装到game/four-heroine-r4，备份旧main.ts与index.html，再将实际main.ts改为只导入：
```ts
import '../four-heroine-r4/runtime.mjs';
```
game/index.html使用生成的repository-index.html。不得只添加一个play.html就声称默认入口换好了。
`runtime.mjs`包含同源JSON并引用本包engine/CSS/UI；不要手改它。旧模块可以留下兼容测试，但不能留在默认旅程里。

## 5. 真实仓库验证
依仓库锁文件和packageManager准备依赖，然后执行仓库声明的lint/typecheck/test/build；现有`pnpm verify`已经串起这些检查。不要删除旧测试来掩盖失败；先区分“兼容性代码仍可被测试”与“旧游戏仍在默认入口”。
接入目录执行 `python3 tools/ci-acceptance.py`。该runner运行包内verify、仓库verify，再HTTP打开真正GAME/dist/index.html做原生UI和阅读器验证；不偷偷用standalone替代实际入口。日志在qa/ci。

必须取得同一HEAD/源码哈希的：
启动 → 认出世界 → 五条首次改命 → 日程核心循环 → 至少一条完整结局 → 回退/新局。
当前离线四人95次普通输入、全部收藏与40尾声见证可以用作回归输入，但不能代替新入口证据。
原生刷新、双标签冲突、导入、真实浏览器进程重启是独立用例。模拟配额失败必须标注为故障注入。

## 6. 内容维护约束
- 正文、条件正文、即时回应、回应条件都在JSON；不能只改示范台词或导出文档。
- 每次修改后更新文本ID/hash；运行export校验，不要跳过校验器。
- 再检查开场后续：许照只找盘/交盘，阿衡试听和切换。A4b/A6a不能变回许照按错控台。
- 蓝标伴奏≠半成品试听≠完整母带≠获准公开的事故原声。不得用evidence总分凭空给物件。
- 四位女主只因真实共同经历推进感情；兴趣、朋友、交往、排他、慢热分别处理。
- 多人分别同意；等待两次后不能软锁，合流不能抹掉已发生的两人经历。
- 角色来源账本按人按事实；晚些再说，不能提前知道。POV番外不改变本局。
- 独身可以拿到真实事业成果；陆景行有独立行动、技能与竞争。
- 读档只接受本版hash和合法命令序列；不注入ending/stage绕过普通流程。
- 回看只读；改历史必须明确回退并舍弃后续本轮命令。

## 7. PR与验收报告
只有真实仓库验证后再提交开发分支并创建Draft PR，不自动合并main。
报告写明：输入HEAD、输出HEAD、变更文件、实际入口、源码/HTML哈希、执行命令、失败与缺口。
只要原生入口/存档或自然体验门禁BLOCKED，就不能写“工厂验收全部通过”。
当前正式美术、声音、平台广告SDK、真机与成年新玩家盲玩未完成。先验证当前剧情可懂、愿意继续，再补这些，不用美术遮盖逻辑问题。
