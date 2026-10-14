# v4.9 起点：中性、略偏男性向的穿书逆袭（2026-10-14）

**从这里继续：** 请先读 `docs/R49_NEUTRAL_POWER_STORY_AUDIT.md`、`patch/v49_story_punchup.json`、`tools/test-v49-consequences.mjs`。历史 r4.5/v4.8 的交接说明在下文继续保留。

最新正式剧本：`data/STORY.json`，最新全量可阅读导出：`docs/FULL_STORY_READABLE.txt`。本轮保持剧情选项数量、引擎状态和正式结局不变；只重写关键情绪与信息表达。**不要误称女性向产品，不要误称 89.7% 静态引用率已通过玩家盲测。**

---

# 最新：2026-10-14 r4.5 完整竖屏客户端与剧情候选

可直接打开 `play.html` 体验完整游戏（不需服务器）。新版候选改造在 `tools/preview-ui.js`、`tools/vn.css`、`assets/` 和 `data/STORY.json`；详情及诚实 QA 边界请先看 `docs/R45_COMPLETE_DELIVERY_AND_QA.md`。本包不是正式发布版本，不能把模拟器测试当作真人/实体手机/平台验收。

---

> **r4.3 current:** First read the complete 28-beat transmigration story; only THEN choose canon/rescue/investigate. New QA and caveats: `docs/R43_STORY_EDITORIAL_AND_UX.md`. Original prior versions remain preserved.

> **r4.2**：第一选择即“照原著走／改变首演／先查责任”，且后续有原著外新事件。详情 `docs/R42_ORIGINAL_NOVEL_BRANCHING.md`。

# 先从这里开始 · r4

**先试玩 `index.html`。** 先正常读完穿书经过（现实晕倒→醒来被叫许照→辨认人物→记起原著命运），到最后一页才会出现第一次决定。这是正式新手剧情，不是可选补充。 不需要先阅读设定或审查报告。手机阅读遇到字号问题可打开右上角菜单；窗口不允许保存时会提示，离开前导出记录。

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
