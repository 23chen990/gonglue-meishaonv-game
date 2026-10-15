> **2026-10-15 / v4.13:** 新候选分支 `feat/romance-v413-true-decisions-20261015` 已实现 16 个真实两阶段剧情决策，详见 `four-heroine-r4/docs/R413_TRUE_DECISIONS_AND_QA.md` 和 `play.html`。之前的 PR #9 v4.12 保留为回退基线。尚未进行实体手机与真人盲玩。

> **当前代码状态（2026-10-15）：本文件是 2026-10-01 早期双女主阶段的历史交接，不是当前运行状态。** 正在开发的完整游戏为 [PR #9](https://github.com/23chen990/gonglue-meishaonv-game/pull/9) 的 **v4.12 四女主穿书逆袭 + 恋爱 H5**，分支 `fix/romance-v46-reader-and-save-20261014`；仍为 Draft，尚未合并 `main`。当前开发入口在 `runs/20260831-010324-village-south-text-v1/workspace/game/src/main.ts`（引用 `four-heroine-r4/runtime.mjs`）；正式剧本在 `four-heroine-r4/data/STORY.json`，单文件试玩为 `four-heroine-r4/play.html`。请先读 `four-heroine-r4/START_HERE.md` 和 `four-heroine-r4/docs/R412_RELATIONSHIP_RESPONSE_QA.md`，并核对**当前 HEAD** 的 Actions；下文关于旧乡土入口、暂停美术/实现和只完成双女主剧情的描述仅用于历史追溯，不能再当成当前事实。严格两段剧情选择 [Issue #3](https://github.com/23chen990/gonglue-meishaonv-game/issues/3) 仍未完成。真实手机、真人盲玩和发布验收仍未完成。

---

# 攻略美少女：开发交接

正式名称：**攻略美少女**。定位：有恋爱向、后宫向的多女主恋爱文字游戏；用人物魅力、暧昧、约会、被主动选择和个人/共同恋爱结局形成情感回报。重开记忆服务这些关系。

目标 run：`20260831-010324-village-south-text-v1`。原工作区：`/Users/kker/Documents/ChatGPT/妖怪夜市/runs/20260831-010324-village-south-text-v1/workspace`；本仓库对应 `runs/20260831-010324-village-south-text-v1/workspace/game`。

## 本次已完成

第一章《欠你一个周末》具备主角与两位成年女主的关系前史、开场、三日六次关键选择、知夏线/闻溪线/共同恋爱线/开放收尾、统一回卷规则、逐角色的第二周目回应与主动邀约。两人各有独立目标，共同线是明确的恋爱起点。

Luna 独立复核后，已经补齐实际结局约束的恋爱记忆、四种开放原因、第二周目事件和 q3 未选角色的回访。18 条 authoring 测试枚举 128 个组合并检查四种收尾、12 个独立记忆回应。复核见同一 planning 目录的 `luna-story-review.json`、`story-review-resolutions.json` 和 `luna-story-retest.json`。

## 实际代码状态

默认入口依然是 `workspace/game/index.html → src/main.ts → src/game.ts + src/chapter-data.ts`，界面来自 `src/style.css`，广告模拟来自 `src/ad-service.ts`。这是旧版乡土叙事项目的现有基线。

`planning/2026-10-01-life-redesign/story-validation.ts` 是编写校验器，没有接入上述入口。`implementation/romance-v1/romance.test.ts.draft` 是早期暂停的测试草稿：其中“先满足条件才能发共同邀请”等旧断言已被新剧情否定，不应直接拷贝为新验收标准。

本轮没有修改原工作区的 14 个源文件/旧构建文件；源码映射与本次验证记录可核对。没有恋爱运行时、恋爱存档、角色立绘成品、新 UI、真人阅读测试、自然旅程/感知 QA 或平台包。

## 最新用户指令

1. 先把具体剧情想好；停止新增美术和游戏实现。本次完成写作校验，不自动恢复绘制或开发。
2. 恋爱版就叫《攻略美少女》，后续不要重新讨论更名。
3. 产品是有恋爱向、后宫向的恋爱文字游戏；保持个人恋爱和共同恋爱，不改成纯悬疑、道德题或普通三人友谊。
4. 新建这款游戏的公开仓库，上传完整源码，并交给 ChatGPT 聊天模式规划下一阶段，再由其他 agent 继续。

## 下一阶段需要规划的工作

先核查具体剧情是否足够让读者喜欢两位女主，以及共同恋爱与重开回报是否自然。可以安排小规模盲读；机器可达性不能证明人物有吸引力。决定首个可玩片段和下一次需要人审的节点，再输出可交给 BuilderAgent 的明确任务。

若用户随后批准实现，先按当前剧情重写已暂停的测试草稿，接入真正的恋爱默认入口。保持独立且有版本的恋爱存档，旧乡土档只读保留，不静默清除或转换；未经新研究审批，不引入 Ink/竞品运行时代码。

Builder 与 QA 的交接必须列出实际默认入口，分别验证启动 → 核心阅读/选择 → 收尾 → 重开。用自然输入覆盖四种收尾、双方独立意愿、两人的第二周目记忆、等待/兑现分支、开放原因、刷新恢复、旧档隔离、跳过已读和手机竖屏/横屏可读性。固定状态或 debug 注入只算工程证据。

核心旅程、状态或存档缺陷走正式 QA → FixerAgent → QA 复测。原记录中的 Builder thread 为 `01a0f35c-cda0-7dc2-9296-40e8e0dd8c5c`，修复计数为 0；本轮没有进入或完成 formal FIX，不改这些历史计数。

微信、抖音、TapTap 适配分别提供隔离的配置、测试、QA 与构建产物；未通过真机与平台验证前，不称作可发布包。
