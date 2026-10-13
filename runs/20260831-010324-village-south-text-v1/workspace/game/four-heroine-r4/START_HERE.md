> **r4.2**：第一选择即“照原著走／改变首演／先查责任”，且后续有原著外新事件。详情 `docs/R42_ORIGINAL_NOVEL_BRANCHING.md`。

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

r4.1 已建立游戏仓库草稿 PR #2；r4.2 应在该分支继续开发，勿直接覆盖 main。接手开发先读 `docs/R42_CODEX_HANDOFF.md`。
