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

# v4.9 剧情精修（2026-10-14）

当前产品定位为 **中性、略偏男性向的穿书逆袭＋轻恋爱**，重点让玩家在前几分钟知道「我将背锅」「我知道原著」「我可以抢先改命」，而不是女性向单纯选恋爱对象。完整四角色、228 场、751 底层动作、24 主结局仍保留。游戏进度来源是真实的选择命令，不是界面里添加的模拟数值。

- 正式剧本源：`data/STORY.json`。逐句修改审计：`patch/v49_story_punchup.json`（28 场景，158 条正文/回应、68 项选择文案、26 个场景标题）；**状态机、选项 ID、条件、效果、结局均未更改**。
- 选择有效性：751 中 674 项（89.7%）有下游数据或运行时读取；`tools/test-v49-consequences.mjs` 以真实解释器比较 17 个场景的 62 个合法选择。但该数值不是 80% 玩家觉得有意义的证据，目标玩家盲玩仍未完成。
- 存档：保留 r4.5 的存储空间名及解释器 `VERSION`，只白名单兼容 v4.5 / v4.8 的原版 storyHash，先完整 replay、保留原始 JSON 备份，才保存为当前剧情版本；不认可的存档不覆盖。
- 运行检查：`npm run verify`＋CI 的正式 HTTP 手机触屏回归＋`test-v49-save-migration.py`。当前用户本地离线单文件可试玩，但不能把 Chromium 当作真机。

---

# 最新：2026-10-14 r4.5 完整竖屏客户端与剧情候选

可直接打开 `play.html` 体验完整游戏（不需服务器）。新版候选改造在 `tools/preview-ui.js`、`tools/vn.css`、`assets/` 和 `data/STORY.json`；详情及诚实 QA 边界请先看 `docs/R45_COMPLETE_DELIVERY_AND_QA.md`。本包不是正式发布版本，不能把模拟器测试当作真人/实体手机/平台验收。

---

> **r4.3 current:** Mandatory 28-beat transmigration intro retained; 140 story copy/label edits, inline first-person recollection; read `docs/R43_STORY_EDITORIAL_AND_UX.md` for SHA and QA. This is a draft, not production release.

> **r4.2 新版（2026-10-13）**：第一个真正的决定现在是“照原著走／改变首演／先查背锅线”三选一。原著钢琴救场与第七天清退后果会在选择前出现，三条路线有不同的证据与事件，并在第 2/5/7 天回收。正式源码 `data/STORY.json`，完整记录见 `docs/R42_ORIGINAL_NOVEL_BRANCHING.md` 和 `docs/R42_QA.md`。原 r4.1 的 63 处文字修订仍保留。

# 攻略美少女 · r4 完整可试玩修订版

手机竖屏文字恋爱选择游戏。直接用浏览器打开根目录 `index.html` 或 `play.html`；两者内容完全相同，不需要联网或安装运行依赖。聊天附件预览、文件管理器预览可能不执行JavaScript，请用浏览器打开。

正文作者源是 `data/STORY.json`、`EPILOGUES.json`、`BONUS.json`、`CODA.json`、`HANDBOOK.json`。`CHOICE_CONTRACTS.json`是生成索引，UI_COPY和ASSET_REQUIREMENTS是说明，不是运行时正文源。本版以交接包r3正式JSON修订，使用TapTap试玩版的阅读界面基础；不是旧双女主，不是所谓“找回的v6”。

保留四位成年女主、15种恋爱组合、24个主要结局、40项命运尾声、8篇番外、6项补充收束与独身路线。24个主结局不代表24套完全独立长篇；40项尾声是条件模块。

## 开始试玩
先看完整穿书经过，再做真正的第一选择。故事从现实中读《今夜偏爱男主》时晕倒开始，经舞台苏醒、工作证、人物认知、主角的震惊与原著危机，到最后才出现“照原著／改变首演／先查责任”。这段是必读正文，不是可选的“世界观简介”。菜单可以调字号、查看历史、回退决定、查看关系/原著手册、导入导出本版记录。保存失败会有提示和菜单状态标记；临时模式仍可继续，但离开前应导出。旧版仅允许经过严格白名单验证的 v4.5/v4.8 命令存档续读，并先保存原始备份；其他旧记录不迁移或删除。

## 开发
```sh
npm run build
npm test
npm run export
python3 tools/verify-delivery.py
```
Node 22或兼容更高版本；正文构建与解释器测试无npm依赖。浏览器测试使用Python Playwright和可运行Chromium。本轮环境为Node 22.16.0、Python 3.13.5、Chromium 144.0.7559.96。

```sh
npm run test:browser:offline
# 下列为真正HTTP/原生存档门禁，需要先在另一个终端启动服务：
npm run serve
npm run test:browser
```

`test:browser:offline`显式注入文档和模拟存储，不可冒充真实入口或持久存档。当前原生URL访问被环境以ERR_BLOCKED_BY_ADMINISTRATOR拦截，发布门禁没有通过。

## 阅读顺序
`START_HERE.md` → `01_CANON_LOCK.json` → `docs/CODEX_HANDOFF.md` → `docs/QA_REPORT.md`。

原 r4 的全部43项历史问题在 `docs/FIX_LOG.md/json`；最新15项与r3补充缺口见 `docs/LATEST_REQUIREMENTS.md`；逐场记录见 `docs/SCENE_LEDGER.md`；完整条件全文见 `docs/FULL_STORY.md`；可读全文见 `docs/FULL_STORY_READABLE.txt`。

## GitHub
原 r4.1 已在 GitHub 草稿 PR #2 中隔离实现，当前 r4.2 预计作为该草稿 PR 的后续提交；不要误以为 main 已合并。具体远端提交 SHA、当前 CI 运行与是否完成同步，以 PR 页面核验为准。

## 验收状态
当前版本 228 场、751 个内部选项及 596 个条件块已由普通命令回放见证；16 项离线浏览器首局测试通过，四人普通触控路线 95 次输入通过。真实 HTTP CI、真人、真机和 IAA 平台验收分开记录，不能因为原 r4.1 的通过而推定本版已通过。

> **当前开场修复**：已删除“先看看完整穿书经过（可选）”，恢复完整穿书过程与人物记忆为主线，不修改正式三条行动和后续结局。旧 r4.2 记录独立保留。验收见 `docs/R42_TRANSMIGRATION_INTRO_REPAIR.md`。
