# 《攻略美少女》v4.17 P0：第一夜防剧透与因果一致性验收

- 基线：v4.16 PR #15 `097165ae46f4246c377d63b0f2c59f8675b3e000`；前序正式剧情 SHA `720ce5d30cf87515c3a090c834a359a5a1589d32f8796cc91fe1cb589c426b46`。
- 代码：`feat/romance-v417-p0-implementation-20261015`、Draft PR #16。
- 改动来源：`patch/v417_p0_scene_plan.json`，精确 17 处、10 场景；仅修改 2 个正文 + 15 个选项即时回复的文字及 `textHash`。改稿原因及原句均随条目保留。
- 工具：`tools/apply-v417-p0.py` 的 `--dry-run`、`--apply`、`--check`，防重复应用、防未知基线，生成 `patch/v417_p0_scene_edits.json` 并严格可逆回到 v4.16。
- 历史保护：`tools/test-v49-restore.py` 还原 v4.17 → v4.16 → v4.15 → v4.14 → v4.13 → v4.12 → v4.11 → v4.10 → v4.9 → v4.8。续接 v4.16 存档时备份原记录并回放。
- 正典结构：228 场景、751 原有行动、24 个主要结局、28 段必读穿书开场、16 个两阶段决策均不修改。禁改 scene/choice ID、speaker、effect、guard、clock、ending、UI。
- 受控构建：[GitHub Actions #38731830908](https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/38731830908) 为 SUCCESS，跑完 `npm run verify`、精确回退校验并提交正典源及重建产物到当前分支。生成提交以该运行的 commit step 为准。

## 验收边界

**受控构建通过 ≠ 最终 PR HEAD 浏览器验收通过。** 正式源生成后的 PR HEAD 仍应经 `.github/workflows/romance-r41.yml` 对实际 Vite 入口、HTTP Chromium、完整路线、存档迁移和移动视口进行最终验证。自动机器人提交可能得到 `action_required`（未运行），必须有真正执行且与当前 HEAD 相符的绿灯。未核实此条件不得标记工程最终验收。

实体 iOS / Android、授权美术素材、独立成年玩家盲测、IAA SDK 与隐私平台审核都未完成。不合并 `main`、不部署、不启动广告。
