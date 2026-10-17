# 2026-10-17 当前入口（优先于下方历史记录）

**继续开发 PR #22 分支 feat/first-night-playable-unified-20261017 的 V17 源码，不是 v4.12，也不是旧 main。** 本作已是四位成年女主的 H5 穿书恋爱剧情游戏。玩家先在现实读《今夜偏爱男主》，突然穿成北岸艺术中心第一天上班的临时场务许照，第一晚因伴奏被换而卷入误背锅危机，故事推进到第七天与第 21 天。目标是让玩家先看懂、尽早自己决定、随后真正喜欢角色，而不是一页页阅读长小说。

进入游戏：最新 CI 从本目录源文件生成的 play.html；项目默认源码入口为父目录的 src/main.ts -> runtime.mjs。**play.html 是构建产物，不要直接修改。**

源码主线：interactive-opening.js（穿书、首夜、立即自保/查证）、interactive-follow.js 和 romance-v9/v10.js（首演与选后反馈）、romance-v11.js + romance-v11-arcs.json（18 个关键场/79 底层选择）、romance-v13-scenes.json（36 场 V13 自然对话）、romance-v17.js（36 场日常恋爱事件的可选场景演出）。保留 STORY.json 与 engine.mjs、全部历史选择和效果。旧逐句完整正文对照：?qa=legacy-reader。重要演出说明：docs/ROMANCE_V17_PLAYABLE_DATES_ZH.md。

运行：npm run verify，并以当前 HEAD 的 .github/workflows/romance-first-night-unified.yml 真实 Chromium/WebKit 与项目默认入口检查作为工程门禁。上一轮 CI 的绿灯不能证明下一轮修改已通过。尚未完成真实手机、陌生玩家第一印象、36 场真正匹配场景 CG 与商用素材审批。PR 保持 Draft、不合并 main、不发布。

接手必须遵守 AGENTS.md 最上方产品契约；其余本文 v4.12、v4.9、r4.1 等段落仅作历史留档。

---

# v4.12 已落地的 56 条人物关系反馈修订（2026-10-14）

本版正式剧本修改了 **26个场景、56条真实选后反馈**，重点解决不同女主在12处隐瞒关系被撞破后的重复回应，以及6组双人关系暂缓/分别相处的模板台词。228场、751底层选择、24主结局、28段必读穿书经过与命令效果均保留。代码级回退与审计见 `patch/v412_reaction_copy.json`、`docs/R412_RELATIONSHIP_RESPONSE_QA.md`。

注意：以最新 HEAD 的 CI 和生成的试玩包为准；不要将v4.11的绿灯或试玩包当作v4.12验收。真机与无提示真人试玩尚未完成。PR保持 Draft，不合并、不发布。

---

# v4.10 当前正式试玩候选（2026-10-14）

这是在 v4.9 上继续完成的实际代码更新，而非另一个演示样机。已修复 47 条正式剧情对白和旁白（19 个场景），特别是取消约会后的地点串线，以及多人关系线里四位女主都说相同套话的问题。保留 228 场、751 个真实底层动作、24 个主结局、28 段必读穿书过程。

**工程验证：** GitHub Actions [Run #38546579070](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38546579070) 在实际提交 `ed07ad7bac0f5b5654cc1cc881aeabfbb8a96cda` 上 9 个阶段全部 PASS，覆盖真 HTTP Chromium 手机触控、竖屏阅读器、旧存档迁移、完整路线、全日程覆盖。其后若出现新提交，请以该新 HEAD 的 CI 为准，不能重复借用旧通过结果。

**中文试玩：** `play.html` 是真正可离线打开的完整剧情单文件，所有候选角色图片已内嵌。通过 CI 的当前提交会在同一 Actions Run 附送 `romance-v410-offline-h5` 试玩压缩包，解压后使用手机浏览器打开 `play.html`。仓库默认入口是用于开发验证的模块页面；无需为了试玩安装依赖。

**质量边界：** 工程 PASS 并不等于商业上架。iPhone/Android 实机、独立真人盲玩、终版美术授权确认、IAA SDK/隐私和平台合规仍未完成。PR 继续 Draft，不合并，不发布。

详细修改清单：`docs/R410_CHARACTER_VOICE_AND_CONTINUITY.md`；逐条可逆补丁：`patch/v410_scene_polish.json`。

---

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
