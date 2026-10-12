> **r4.1 更新（2026-10-12）**：基于原r4正式JSON，对前期与四女主路线做63处显示文本修订。正式源码为 `data/STORY.json`，改动证据见 `docs/R41_EDITORIAL_REVIEW.md` 与 `docs/R41_QA.md`。首局离线浏览器12项通过；HTTP原生入口被环境阻止，真人/真机尚未验收。

# 攻略美少女 · r4 完整可试玩修订版

手机竖屏文字恋爱选择游戏。直接用浏览器打开根目录 `index.html` 或 `play.html`；两者内容完全相同，不需要联网或安装运行依赖。聊天附件预览、文件管理器预览可能不执行JavaScript，请用浏览器打开。

正文作者源是 `data/STORY.json`、`EPILOGUES.json`、`BONUS.json`、`CODA.json`、`HANDBOOK.json`。`CHOICE_CONTRACTS.json`是生成索引，UI_COPY和ASSET_REQUIREMENTS是说明，不是运行时正文源。本版以交接包r3正式JSON修订，使用TapTap试玩版的阅读界面基础；不是旧双女主，不是所谓“找回的v6”。

保留四位成年女主、15种恋爱组合、24个主要结局、40项命运尾声、8篇番外、6项补充收束与独身路线。24个主结局不代表24套完全独立长篇；40项尾声是条件模块。

## 开始试玩
先从苏醒开始，不看路线见证。菜单可以调字号、查看历史、回退决定、查看关系/原著手册、导入导出本版记录。保存失败会有提示和菜单状态标记；临时模式仍可继续，但离开前应导出。旧版本存档不静默迁移或删除。

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

全部43项历史问题在 `docs/FIX_LOG.md/json`；最新15项与r3补充缺口见 `docs/LATEST_REQUIREMENTS.md`；逐场记录见 `docs/SCENE_LEDGER.md`；完整条件全文见 `docs/FULL_STORY.md`；可读全文见 `docs/FULL_STORY_READABLE.txt`。

## GitHub
本轮核实了main、旧r3分支和实际入口，但**没有向远端提交、创建PR或覆盖main**。当前远端main仍是旧《村口向南》入口，旧r3分片不能当成已接入新版。源码ZIP是本轮实际交付。安全的本地隔离分支接入工具为 `tools/integrate-repository.py`，步骤见Codex说明。

## 验收状态
本轮202项回归检查、全部737个选择和565个条件显示块有当前版本见证。浏览器离线普通四人路线已走到结局；只读收藏、模拟故障与手机尺寸有独立结果。真人盲玩、真实iOS/Android、原生持久化、远端默认入口、正式美术/声音和IAA平台发布未完成。
