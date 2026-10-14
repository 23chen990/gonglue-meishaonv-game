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
先看完整穿书经过，再做真正的第一选择。故事从现实中读《今夜偏爱男主》时晕倒开始，经舞台苏醒、工作证、人物认知、主角的震惊与原著危机，到最后才出现“照原著／改变首演／先查责任”。这段是必读正文，不是可选的“世界观简介”。菜单可以调字号、查看历史、回退决定、查看关系/原著手册、导入导出本版记录。保存失败会有提示和菜单状态标记；临时模式仍可继续，但离开前应导出。旧版本存档不静默迁移或删除。

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
