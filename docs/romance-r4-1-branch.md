# 攻略美少女 r4.1 | GitHub 开发分支正式入口

本次 PR 在独立分支替换原 `村口向南` 默认浏览器入口，旧代码保留在 Git 历史中；正式作者源为 `runs/20260831-010324-village-south-text-v1/workspace/game/four-heroine-r4/data/STORY.json`。

- 当前手机独立试玩：`four-heroine-r4/index.html`（离线可打开）。
- 仓库 Vite 默认入口：`src/main.ts -> four-heroine-r4/runtime.mjs`，根 `index.html` 使用新正文。
- 检查：在 `four-heroine-r4` 内运行 `npm run verify`；在仓库根运行 `pnpm verify` 与构建并重新检查默认入口。
- r4.1 编辑变更是**63 个结构化显示字段、32场**，代码逻辑/结构不变，补丁和QA见 `four-heroine-r4/docs/R41_EDITORIAL_CHANGELOG.md`、`R41_QA.md`。
- 不得拿原 r3/r4 旧截图替当前手机通过；真实HTTP受当前环境管理限制；真人、实机、正式平台未通过。
- 本次无广告SDK，不代表 TapTap/微信/抖音可以直接上架。
