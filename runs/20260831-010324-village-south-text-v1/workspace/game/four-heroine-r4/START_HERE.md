> **r4.1 更新（2026-10-12）**：基于原r4正式JSON，对前期与四女主路线做63处显示文本修订。正式源码为 `data/STORY.json`，改动证据见 `docs/R41_EDITORIAL_REVIEW.md` 与 `docs/R41_QA.md`。首局离线浏览器12项通过；HTTP原生入口被环境阻止，真人/真机尚未验收。

# 先从这里开始 · r4

**先试玩 `index.html`。** 不需要先阅读设定或审查报告。手机阅读遇到字号问题可打开右上角菜单；窗口不允许保存时会提示，离开前导出记录。

本版已实际修改正式JSON、解释器和手机阅读器。当前工程/普通输入验证有证据，但还不能称作上线验收通过。

## 文件作用
- `data/STORY.json`及其余四个内容JSON：唯一作者源。
- `index.html` / `play.html`：完整离线试玩，绝不是只到第一选择的演示。
- `runtime.mjs` / `repository-index.html`：由同源数据生成的仓库接入模块和HTML模板。
- `docs/FULL_STORY.md`：包含条件、选择、即时回应、效果与后继的完整审查导出。
- `docs/FULL_STORY_READABLE.txt`：不含大段效果对象的阅读导出，条件分支仍有标记。
- `docs/FIX_LOG.md`：原始26项＋r2新增17项逐项修复与证据。
- `docs/LATEST_REQUIREMENTS.md`：新开场、台词、TapTap启发及r3工程缺口逐项状态。
- `docs/QA_REPORT.md`：当前版本的通过、阻塞和未测试分层结果。
- `patch/r3-to-r4.diff`：正式内容和运行时的完整差异，不是示例台词。
- `provenance/`：历史审查、失败证据与输入来源；不能当本版通过证明。

**不要直接编辑HTML、Markdown或runtime.mjs。** 改JSON或tools中的作者源后重新构建、重新测试。不得把旧COLD作为入口；现在从ENTRY_WAKE开始。

r4.1 已接入 **开发分支** `feat/gonglue-r4-1-editorial-20261012`，对应草稿 PR #2；**main 未合并**，不要打开 main 的旧游戏来验收。新接手先读 `docs/R41_QA.md`、`docs/R41_EDITORIAL_REVIEW.md` 和 `docs/CODEX_HANDOFF.md`，再核对 HEAD。
