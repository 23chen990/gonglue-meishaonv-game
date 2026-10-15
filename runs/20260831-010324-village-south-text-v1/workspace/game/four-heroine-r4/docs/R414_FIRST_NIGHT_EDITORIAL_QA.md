# 《攻略美少女》v4.14｜第一夜自然对白精修与严格验收

工作分支：`feat/romance-v414-first-night-editorial-20261015`，基于 v4.13 PR #11；对应独立 Draft PR #13。禁止合并 main、上线、开放广告。

## 这轮真实编辑范围

仅允许修改已存在的 `data/STORY.json` 正文 `body[].text` 及对应 `textHash`。完整编辑输入见 `patch/v414_first_night_plan.json`，应用后审计清单见 `patch/v414_first_night_edits.json`。31 处、8 场景；保护 228 场、751 个原有底层动作、24 主结局、28 条必读穿书开场，以及 v4.13 的 16 处两阶段剧情决策。

核心体验问题：开场过早用作者视角解释全部穿书命运，现实反应和第一次动手因果不够自然；林见月对白出现舞台旁白式第三人称动作；顾晚棠某些进入方式里无条件假设曾被玩家质问。改稿让认人、认书、发现线索和作决定遵循玩家当下感受，而不是不断重复抽象大道理；改正角色真实听闻范围。

## 验证办法与边界

- `python3 tools/apply-v414-first-night.py --check`：检查当前故事与逐字变更表，精确恢复 v4.13 基线 SHA。
- `python3 tools/test-v49-restore.py`：恢复链 v4.14 → v4.13 → v4.12 → v4.11 → v4.10 → v4.9 → v4.8；不降低历史测试要求。
- `node tools/test-v414-editorial.mjs`：检查 31 行 speaker、稳定 ID、哈希、228/751/24/28 结构与已知视角问题。
- `npm run verify`：正式源、阶段决策、历史/存档、所有原 QA、离线 HTML、完整文本导出与 SHA。
- 真实 HTTP Chromium、多路线点击、存档升级及仓库根入口必须以**提交后的 GitHub Actions 当前 HEAD**通过为准；此前的 v4.13 绿灯不等于 v4.14 通过。
- iPhone/Android 实体手机、独立成年玩家无提示试玩、素材最终商用授权、IAA / 平台上架 **NOT_TESTED**，不得宣传已经验收。

**注意**：本文可随申请进展追记具备实际证据的验收结果；文档本身不是测试通过证明。
