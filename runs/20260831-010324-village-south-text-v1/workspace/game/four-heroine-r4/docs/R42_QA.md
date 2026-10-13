# r4.2 QA / Release gate（2026-10-13）

**新增目标**：第一步让玩家知道原著炮灰的行为与坏结局，提供原著/救场/先查三条不同因果；每屏选项通常 2–3，最多 4；改变原著应产生之后可回收的新事件。

## 已执行并通过

- `npm run verify`：PASS；官方 JSON→HTML/runtime/index 同源哈希验收。
- `npm test`：PASS，已执行普通解释器回放、真实选项见证、原著钢琴支线、USB 支线、第七天条件回收。
- 静态全量：228 场、751 个内部动作、24 主结局、15 恋爱组合、40 尾声、8 番外、6 收束；596/596 条条件正文/回应块有真实输入显示见证；未覆盖全部可能状态组合。
- `python3 tools/test-ui-r4.py`：**14 项注入离线浏览器检查 PASS**，含首选三分叉、原著纸面选择三法、救场五种跨路径具体实际方法、UI 六选项分组、无消耗切换、错误存档拒收、误触、字号/宽屏。
- `CASE=FULL_FOUR_ORDINARY_TOUCH_AND_REWIND python3 tools/test-reader-r4.py`：PASS，普通触控完成四人结局的 95 次剧情输入和历史回退；不是直接设置内部关系状态。
- `CASE=GROUP_SCENE_PHONE_SIZES_LARGE_FONT_AND_LANDSCAPE` 及 `CASE=QUOTA_FAILURE_STILL_UNLOCKS_IN_MEMORY_COLLECTION`：分别 PASS。

## 保留的真实限制

- 原生 Chromium HTTP 启动 `R4_MODE=native`：**BLOCKED**（该容器被 `ERR_BLOCKED_BY_ADMINISTRATOR` 拦截），不能当成应用错误或通过证据；该验收需在 GitHub CI 真实 HTTP 浏览器重跑。
- 本地完整阅读器组合套件在已完成 95 次触控后，执行收藏集大规模 DOM 逐项检查时超时；**不可说完整本地套件通过**。独立案例的 PASS 也不等于其他案例通过。
- 独立真人读者、目标 Android/iOS 实机、商业化、真实留存：NOT_TESTED。
- 本版初选炮灰细节是新创作扩充，不是历史原著可验证的逐字台词。

## 开发/仓库要求

- 唯一正式剧情源：`data/STORY.json`；不要直接改 `index.html/play.html/runtime.mjs/docs/FULL_STORY.md`。
- 合并前：在 PR 上真正跑当前提交的 CI；存档旧版本不得隐式迁移；保留主分支。
- 任何后续把原著改变进一步拓展至不同大结局的重大分支，需先审查行动预算、状态/关系知情与相关的真实回放测试，不能只编辑几行台词。
