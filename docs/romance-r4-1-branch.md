# 攻略美少女 r4.1 | GitHub 开发分支正式入口

本次 PR 在独立分支替换原 `村口向南` 默认浏览器入口，旧代码保留在 Git 历史中；正式作者源为 `runs/20260831-010324-village-south-text-v1/workspace/game/four-heroine-r4/data/STORY.json`。

- 当前手机独立试玩：`four-heroine-r4/index.html`（离线可打开）。
- 仓库 Vite 默认入口：`src/main.ts -> four-heroine-r4/runtime.mjs`，根 `index.html` 使用新正文。
- 检查：在 `four-heroine-r4` 内运行 `npm run verify`；在仓库根运行 `pnpm verify` 与构建并重新检查默认入口。
- r4.1 编辑变更是**63 个结构化显示字段、32场**，代码逻辑/结构不变，补丁和QA见 `four-heroine-r4/docs/R41_EDITORIAL_CHANGELOG.md`、`R41_QA.md`。
- 之前本地执行容器的真实 HTTP 被 ERR_BLOCKED_BY_ADMINISTRATOR 阻挡；**GitHub Actions 当前原生 HTTP + 浏览器已成功执行**，详见下方绑定的 run 与报告。不得用旧截图冒充新提交验收。
- 本次无广告SDK，不代表 TapTap/微信/抖音可以直接上架。

## GitHub r4.1 当前执行结果（2026-10-12）

- GitHub Actions（修正旧测试类型断言后）：[run #38247737542](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38247737542) **PASS**；补充 CI 触发路径后的最新执行：[run #38247780892](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38247780892) **PASS**。
- 本次非本地模拟：canonical-source / repository-verify / native-ui / native-reader 四项阶段均 **PASS**。原生 HTTP UI 报告 14/14 PASS；原生阅读器报告 5/5 PASS，含四人路线 95 次普通触控、回退重读、结局收藏与 40 个尾声。
- 原生浏览器通过仅限 GitHub Ubuntu Chromium / 响应式视口；**实体 iOS/Android、陌生玩家独立盲测、配音立绘/CG、TapTap/微信/抖音平台包、IAA 均仍 NOT_TESTED 或 NOT_APPROVED**，不可宣称上线验收。
- 失败过程不删除：较早 [run #38247300497](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38247300497) 因历史 tests/mobile-playwright.ts 类型断言阻断 pnpm verify；仅将其五处断言作 unknown 类型桥接，不在新游戏运行时提供旧 API。后续两次完整 CI 通过才关闭该工程问题。
- 证据存于 GitHub Actions 的 romance-r41-current-qa artifact，包含当前 SHA 的 qa/ci/acceptance.json、原生 HTML UI 截图和各测试日志。原始本地静态 HTML 和 ZIP 仍是可重现的候选版本；不可用旧证据替代实际设备与人测。
