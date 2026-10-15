# 《攻略美少女》v4.17 电影式阅读器｜受控源代码整合与验收

## 来源与不可破坏的边界

- 剧情／引擎基线：v4.17 Draft PR #16，精确提交 `eed5ee0e826335981606d75c4112a989c3660718`。正典 STORY SHA-256：`84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93`。
- 界面来源：已独立验收的 v4.12 UI Draft PR #12，提交 `af599a663f4fdc7ebe1103410fdc2efa758a2640`；其生成 HTML 不可直接覆盖 v4.17。
- 本分支：`feat/romance-v417-cinematic-integrated-20261015`。只移植 `tools/preview-ui.js` 的阅读布局/分页/舞台点击事件、`tools/vn.css`、WebKit/Chromium 测试及 CI 门禁。不改 `data/STORY.json`、`tools/engine.mjs`、原选择 ID / effects / guards / end / clock。
- **主动保留 v4.13～v4.17 演化结果**：两个阶段的真实意图选项、`expandLegacyDecisionLog` 对历史行动记录的精确补全、旧存档备份/恢复、版本白名单、尾声与收藏的兼容性。这些均不可被 PR #12 较旧的 `preview-ui.js` 覆盖。

## 新增验收门禁

1. 旧 `npm run verify` 全部保留，校验正典 228 个场景、751 个原始动作、24 个主要结局、28 段必读穿书开局，以及 16 个真正的两阶段决策。
2. 受控构建只更新从同一 STORY 生成的 `index.html`、`play.html`、`runtime.mjs`、`repository-index.html`、`build-meta.json` 及默认游戏入口；源码/产物 SHA 必须一致。严禁复制 PR #12 的过时打包产物。
3. `tools/ci-acceptance.py` 强制对最终提交的生成产物运行 `git diff --exit-code`，防止 CI 偷偷重打包并掩盖提交过时。
4. `tools/test-vn-cinematic.py` 用真实 HTTP 浏览器验证 320～430px 小屏、必读开场分页、首个决定可读性、舞台触控、布局伸缩、大字号与 WebKit 的触控推进。
5. `tools/test-v417-cinematic-intents.py` 用真实 Chromium，在实际可达状态下逐一点击 16 组意图选项 → 第一阶段真实反馈 → 原有合法后续动作 → 重载存档，另验证 v4.12 存档无意图命令时的自动转换及原文备份。
6. 浏览器、完整路线、真实存档和默认 Vite 入口的最终工程验收必须来自 **当前 PR HEAD** 的成功 GitHub Actions。受控构建绿灯不能替代此门禁。

## 继续禁止

- 不合并 `main`、不部署、不开放广告，直到用户明确认可候选版本。
- 不把浏览器模拟认作真实 iOS Safari/Android Chrome 操作，也不把路线覆盖率当成人类满意度或剧情质量评分。
- 实体手机、多读屏适配、独立成年玩家无提示盲测、素材商用授权及 IAA/隐私平台发布仍需独立执行。
