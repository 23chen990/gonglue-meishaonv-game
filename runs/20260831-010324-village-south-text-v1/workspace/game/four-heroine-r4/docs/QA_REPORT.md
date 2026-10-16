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

### ADV V5 exact-head acceptance (2026-10-16)

- Source at `579fb73ce01b1947c3b20ed6de49abde0547c0ef` rebuilt successfully via the protected game client generator; final generated player HEAD `ddc467a290914260b4d2c578e6da9b0d2575d019`.
- This documentation-only commit re-triggers native HTTP Chromium/WebKit regression against the **generated game**, not a stale source-only commit.
- Verify opening 6 reading taps, one intact full-shot CG per frame, no translucent character composite, three original first-action IDs, 320px + large type, menu font cursor, save migration and end-to-end routes.
- No canonical story, engine, image, HTML or CSS bytes are changed by this QA trigger. No physical-phone or user-retention claims are made.

### ADV V5 ES-module-compatible final-generated-head verification

- The active V5 director now uses legal ES module page-signature separators. The controlled rebuild for source V5 returned SUCCESS and generated artifacts at `0f6d261acd83841946a7868b1122bcaefe387e6a`.
- This **documentation-only** change deliberately runs PR Chromium + WebKit + full story-route regression against the final generated HTML/runtime, not a source-only intermediate commit.
- Preserve actual scene CG, first 6 dialogue advances, 3 canonical choices, no in-dialog scroll, font/page anchor, old save replay, and all original engine behavior. Any failure must be resolved rather than declared green.

### ADV V6 generated-head final QA trigger — 2026-10-16

- Controlled V6 rebuild completed successfully at generated HEAD `11d21f218dc54b39b123029f9eb6201644847273` after native Node strict-signature correction.
- V6 source `tools/director-v6.js`, style `director-v6.css`, controlled pack `ADV6_ART_PACK`, and eight tagged `assets/v6-preview` images are now the actual generated player. No V5 stage renderer is invoked by the build.
- Local Chromium DOM-injected viewport tests: 320x568, 360x780, 390x844, 430x932; six opening reading turns, three touch-sized canonical decisions, correct canon/rescue/investigate routing; independent badge zoom close and menu font anchor checked. This is not a physical phone or true network acceptance.
- Exact-head native HTTP Chromium/WebKit + save migration + full routes must run after this documentation-only commit. **Art is legacy preview and not approved native 2K CG.** This is NOT release approval.


### ADV V6 latest generated player: exact-head browser QA — 2026-10-16

- Generator rebuilt successfully from `b5870356e9d4ed51d3703dd34ae0731b8fb610c6`; checked-in generated player HEAD is `0272106f97dcdbe732504984f83099e9e43bae68`.
- Director-v6 and V6-only preview asset fallbacks are active. This documentation-only change requests Chromium/WebKit, save, first-decision and full-route acceptance against the **actual checked-in V6 player**.
- Verified local Chromium four device sizes with one image per scene, six opening turns, three canonical choices, no scroll, work-badge modal, menu font anchor, and three distinct route targets. Browser used DOM injection, not a physical device.
- Image master gate still reports ten missing 1536x2560 assets. Production visual approval and blind playtesting remain BLOCKED. Never treat engineering acceptance as art acceptance.

### ADV V6.2 exact-generated-head native acceptance — 2026-10-17

- Controlled V6.2 generator succeeded, producing the checked-in player at `2884c0ee65406b991e6ef0e6a0d0e9c0698e2c4c`. This documentation-only update re-triggers native Chromium and WebKit against generated HTML/runtime.
- UX fixes: measured short subtitles instead of tall blank panels; single-CG scene behind a subtly blended lower dialogue layer; work badge inspect button moved off its printed name; save/write-conflict/export alerts are visible and clickable (previous CSS made every notice fully transparent).
- First-night performance: the onstage woman calls backstage directly, the pianist urges finding the original, and the original canon/rescue/investigate action IDs remain unmodified. No engine/DATA changes.
- Local Chromium tests passed at 320, 360, 390, 430px, including touched options, no internal dialogue scroll, preserved badge cursor, and save warning visibility in blocked-storage mode. These tests are not iPhone or human engagement measurements.
- Remaining **P0 art blocker**: 8 legacy preview WebP assets are not native high-resolution vertical CGs; strict approved-art check remains blocked. No claim of matching the prior concept art or completing 228 bespoke scenes.

### ADV V6.3 exact-generated-head acceptance (2026-10-17)

- Source commit \`273609a7171f9836edad0949c3faa4afb83c33c9\` passed the **controlled generator**; generated player HEAD \`2e6dbf4c04e386f00045b820365fbebbdd599748\` must be tested rather than the intermediate source-only commit.
- Updated single-shot visual direction: offscreen pianist is paired with an actual wide backstage view, not an unmanned piano close-up; a singer directly asks backstage for help without inventing an ear-monitor gesture in the existing picture.
- Focus-safe badge inspection, explicit image-load failure, measured preview-source pixel density and original canon/rescue/investigate choice IDs.
- New \`npm run art:preview\` reports **0 READY / 8 BLOCKED** for current in-game preview photos. Strict \`npm run art:release\` will refuse to approve the 10 missing/unapproved masters. This is expected and NOT a reason to declare CG art complete.
- Local Chromium browser simulated touch 320 / 360 / 390 / 430 px, exact 6 unique source beats, first choices, single IMG, keypad Escape focus return and missing-image state: PASS. Physical phone and adult first-30s qualitative test still NOT DONE.
- Documentation-only update exists to rerun the **final generated player** through native HTTP Chromium/WebKit and save/full-route regression. Do not merge main if the new tests fail.

### ADV V7 真实单镜头 CG｜最终生成物 HTTP 验收（2026-10-17）

- 受控构建已经提交最终生成的 `index.html` / `play.html` / `runtime.mjs`，对应提交 `fb2cbe2c698bd026bf51e5c63cc83f2a36409ea2`。本文件更新仅用于让 GitHub Chromium/WebKit 回归针对**实际生成物**运行，而不是以 source-only 旧提交宣称通过。
- 第一夜工作人员与工作牌两张原创独立 941×1672 竖屏 CG 已打包进正式 HTML，非从 3×4/12 宫格截图裁切；旧 900px 方图仍留在版本历史但不被新打包程序选用。
- 原剧情引擎、人物状态、28 条原始正典开场行、历史、保存与 `canon/rescue/investigate` 分支 ID/effects 不动。演出分页约六次推进到首个真正行动选择。
- 因舞台休息饮水照与“伴奏出错”的台词不符，本次该句暂以**舞台侧幕全景 + 话筒画外声**表现，直至完成专属女主事故 CG。不能使用错误人物动作假装已完善。
- 已本地 Chromium DOM 注入测试 320/360/390/430px 双新图 `naturalWidth=941`、首次选择同屏/≥44px、工作牌焦点、三路线、无对白滚动。禁用存储环境会真实提示存档无法持久化，截图可手动关闭警告；本地不可代替 GitHub 的原生 HTTP 浏览器验证。
- 新图虽然手机端清楚，仍未达到 1536×2560 的先前正式 CG master 规格；其它 6 张预览仍未替换，严格美术门禁**应保持阻断**，禁止作为全部 228 场或发布完成验收。

### ADV V7.1 exact-head compact save warning acceptance

- Controlled build successfully regenerated the V7 game at exact HEAD `f29fac9bebecb437b27797d7ddd55c5ccf641c86`, after source modified the initial save-blocked toast. This is a docs-only acceptance trigger: no generated player, story, or image bytes change.
- Source CG candidate 01/02: one complete 941x1672 backstage worker scene; one complete 941x1672 first-person badge scene, both embedded into actual H5. These are candidate game assets, **not approved 1536x2560 masters**. Remaining legacy art stays blocked by strict release gate.
- Offline storage-denied state remains actionable but now has a compact non-obscuring row (short warning, 44px export, dismiss). Other save-conflict and import-failure warnings remain full size.
- Local Chromium DOM-injected test verified warning y=62..118, 320/390/430 widths, first stage CG and all three decisions; a separate test also verified 320/360/390/430 reading-to-decision (6 unique beat IDs, 7 reading pages only on 320 due text pagination).
- Native HTTP Chromium/WebKit on this exact regenerated player must still pass, as must full state replay/endings. No physical-device or human-30-second-retention claims.
