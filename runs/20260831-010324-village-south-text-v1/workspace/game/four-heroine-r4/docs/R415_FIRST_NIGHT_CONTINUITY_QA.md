# 《攻略美少女》v4.15｜第一夜因果与对白续修

基线：v4.14 PR #13，SHA `30c8d0fce47448ddff2c3d99a86b32b4205a16012e9b50cdab9fca6738f81594`。

此轮通过 `patch/v415_first_night_plan.json` 和 `tools/apply-v415-first-night.py` 向正典 `data/STORY.json` 更新 10 个场景共 24 处已有正文／分支回复，只改 `text` 与 `textHash`。目的：恢复穿书之后对真实世界的担忧，去除先知式旁白，明确主持救场与音控职责，在群消息撤回和签字冲突中只陈述确证的事实，减少初见人物的攻略式模板口吻。

## 工程保护

- 保留 228 个场景、751 个底层行动、24 个主结局、28 段必读开场和 v4.13 的 16 处两阶段真决策。
- 不调整状态效果、行动 ID、剧情后继、speaker ID、美术和 UI 布局。
- 精确可逆补丁 `patch/v415_first_night_edits.json`；`tools/test-v49-restore.py` 还原 v4.15 → v4.14 → v4.13 → v4.12 → v4.11 → v4.10 → v4.9 → v4.8。
- 新增 `tools/test-v415-editorial.mjs`，旧历史版本回归测试与旧存档白名单也已扩展到 v4.15。

## 当前已确认结果与边界

受控构建 GitHub Actions [#38724421962](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38724421962) **SUCCESS**：实际应用了 24 处修订、`npm run verify` 全量通过、检查精确版本还原、重新生成并提交正式剧本和 H5 产物。由该工作流推送的新 HEAD 为 `50257ffbf888fad1971ce496afabd4576544b3d0`。

构建机器人推送后的第一次 PR 检查 [#38724538685](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38724538685) 返回 `action_required`（没有作业执行），不能冒称该 HEAD 的原生 HTTP Chromium 全回归已通过。应使用新提交触发 PR CI，并以新 HEAD 的运行记录验收。

仍未完成：独立成年玩家无提示盲玩、真实 iOS/Android 手机、正式美术商用授权、IAA 广告与渠道隐私合规。PR 保留 Draft，不合并、不部署。
