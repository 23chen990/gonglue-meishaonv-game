> **历史 QA 报告（r4）**：本文件保留原 r4 当时的源和验证边界。**r4.1 当前 QA 请以 `R41_QA.md` 和 PR #2 的实际 CI 结果为准**。下方“没有提交 GitHub”仅描述 r4 当时的状态，不代表 r4.1。\n\n# r4 当前QA报告

**本地源码与可试玩构建已交付；发布验收未通过。**
作者逐场自查完成，但不等于外部真人验收。所有当前证据绑定本版内容；历史通过报告没有直接沿用。

## 当前内容
- 225场、737选择、565个正文/已执行回应条件块。
- 四位成年女主、15恋爱组合、24主要结局、40尾声、8番外、6补充收束。
- 正式源：`data/STORY.json`、`EPILOGUES.json`、`BONUS.json`、`CODA.json`、`HANDBOOK.json`；HTML、runtime和完整全文同源生成。
- 原始26项＋r2新增17项全量台账见FIX_LOG；最新15项/r3额外12项见LATEST_REQUIREMENTS。
- 225场作者复查、800条编辑记录及辅助文本复查在scene-editorial-audit.json。

## 本轮重新运行，不是历史沿用
| 套件 | 当前结果 | 证据 |
|---|---:|---|
| 核心/15组合/结局/命运/关系回归 | 102项通过 | regression.json |
| 后续场景连续性复查 | 10项通过 | independent-regression.json |
| 知识来源、隐瞒与修复 | 30项通过 | information-regression.json |
| 时间、合流等边界 | 8项通过 | final-edges.json |
| r3新增来源与revision回归 | 6项通过 | r3-regressions.json |
| r3早期兴趣/产品规则 | 21项通过 | r3-product.json |
| r4穿书开场 | 8项通过 | r4-opening.json |
| r4开场后续因果/新发现错误 | 17项通过 | r4-causality.json |
| 普通输入探索 | 378轮；737/737选择、225/225场景 | exploration.json / choice-witness-prefixes.json |
| 实际显示条件覆盖 | 565/565；无缺失；114次搜索尝试 | conditional-r3.json / conditional-prefixes.json |

前八组共202项。选择覆盖与条件覆盖不是“所有状态组合穷尽”，更不是“剧情一定好玩”。
测试中发现过覆盖生成器错误、见证前缀包含末条命令等测试工具问题，失败日志保留；修正后重新运行，没有降低覆盖目标或删除合法路径。

## 浏览器实际执行
Chromium 144.0.7559.96。以下是**离线注入HTML**；需要存储的用例使用明确标注的模拟Storage。
- UI 12项通过：首次五路、合法快速输入/双击、26px拖动、篡改导入原子拒绝、损坏存档备份、旧版隔离、回应页恢复、四种尺寸/大字、不替换Storage的内存模式启动。
- 阅读器5项通过：四人95次普通界面触控走到R_glst、历史回看与回退；24主结局/8番外只读回看；40尾声实际DOM；模拟配额失败仍在本会话收藏；四尺寸大字/横屏。
- 24结局/8番外/40尾声的浏览器检查使用合法命令记录经UI导入；没有手工注入恋爱等级或终局状态，也没有冒称逐一真人通关。
- 尺寸：320×568、360×640、390×844、844×390。按钮可到达且至少44px，无横向溢出。不是四款真机。
- 关键截图位于qa/current/browser/fixture-ui和fixture-reader。

证据：`qa/current/browser/fixture-ui/ui-report.json`与`qa/current/browser/fixture-reader/reader-chromium-all-report.json`。

## 原生门禁：明确阻塞
当前真实访问 `http://127.0.0.1:8765/index.html` 返回：
`Page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR`。
证据：`qa/current/browser/native-ui/ui-report.json`。
因此原生默认URL、真实localStorage刷新/多标签/进程重启不能宣称通过。当前提供了可在可用环境重跑的原生用例和CI runner；没有把set_content或模拟存储换名成原生测试。

## GitHub与工厂
已通过连接读取并重新核实main和r3 HEAD。main仍是村口向南入口；r3分支的分片不是已安装的r4。本轮没有commit、push、PR或main修改，当前源码通过ZIP交付。
没有执行真实仓库的pnpm lint/typecheck/Actions，也没有运行工厂CLI/Agent/Zod编排。按工厂分层规则复查的结论是“可交本地试玩，发布门禁未通过”。

## 尚未验证/未交付
真实iOS/Android、真实平台容器、远端正式入口、原生持久化、正式美术/CG/声音、广告SDK、真人首局与留存。
前30秒悬念、3—5分钟回报、10—20分钟进展是设计目标。字数模型只是推演，禁止用作真人阅读时间或留存指标。

## 重新验证
包内 `npm run verify`；浏览器离线 `npm run test:browser:offline`。
原生环境先启动HTTP，再运行 `npm run test:browser`。
真实仓库接入后运行 `tools/ci-acceptance.py`，只有同一HEAD/hash的实际默认构建、原生UI/存档和普通旅程证据才可解除对应阻塞。

正式STORY SHA-256：`577db875a0a664b4cba8c301e9169f60b9aa831ee97e9fdd9f03368dcdea7bf3`。

## Mobile VN exact-head revalidation trigger (2026-10-16)

- Generated mobile-VN player source head: `6e66d66cf06dda0063722b678ffc9e36993243dc`.
- The decision-beat correction collapses the empty dialogue sheet so choices return screen area to character/scenery presentation.
- This note intentionally changes no story, engine, save schema, choice semantics, or generated runtime. It exists so the PR workflow validates the post-generation exact head rather than relying on a pre-generation source commit.
- Acceptance remains engineering-only; physical-device and human-play gates are separate.

### Compact direct-choice exact-head trigger

- Generated head: `1b14457aa6116b3141c472638152136abf022847`.
- Three direct choices are flattened out of legacy reader wrappers before fit measurement; 320x568 must keep all three visible without presentation paging.
- This line changes no runtime/story/engine and exists only to trigger exact-head PR acceptance after generated artifacts were committed.

### ADV V4.1 generated-player exact-head QA trigger

- Controlled generation produced head `8a782c63f299767133f80b286f829e745300412b` for source/CG/UI update; native browser PR regression must run again against the generated exact-head plus this documentation-only trigger commit.
- Added explicit regression for changing font from the menu while preserving opening source-row cursor, opening badge close without story advance, and correct scene CG on the canonical first decision.
- This note does not modify story, engine, image bytes, dialogue code, save format or generated player. Do not claim physical-phone playtesting or measured 30-second retention.
