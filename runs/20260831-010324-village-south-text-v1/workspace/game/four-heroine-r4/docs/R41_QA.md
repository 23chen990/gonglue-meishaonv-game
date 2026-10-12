# r4.1 当前 QA 与未通过项

**修订日期：2026-10-12。**

| 门禁 | 本轮状态 | 可核验证据 |
|---|---|---|
| JSON显示文本结构保全 | PASS | `../../editorial_guard_report.json` 在开发工作目录；包内 `qa/current/r41-text-guard.json` |
| `npm run verify` 构建、全套原解释器、导出、哈希验证 | PASS | `qa/current/r41-verify.log`；`qa/current/delivery-integrity.json` |
| 场景/选择/条件显示见证 | PASS_WITH_LIMITS | 225场/737选择/565条件块；回放不代表穷尽所有状态组合 |
| 离线浏览器首局/交互/尺寸/模拟存储 | PASS（12项） | `qa/current/r41-browser-offline.log` |
| 完整四人普通点击路线 | PASS（先前当前同一剧情哈希）；**本次联跑中止** | 先前 `qa/current/r41-browser-standalone-route.log` 有95次触摸PASS；本次 `qa/current/r41-browser-offline.log` 有30/95进度然后超时。不能叫本次绿灯 |
| 原生 HTTP 默认入口、真实 localStorage | BLOCKED | `qa/current/r41-native.log`；Chromium在127.0.0.1报 ERR_BLOCKED_BY_ADMINISTRATOR |
| GitHub 分支实际默认构建 | NOT_RUN（需远端 CI） | 合并前不得冒充成功 |
| iOS/Android真实设备、真人吸引力与留存 | NOT_TESTED | 未实施，未推算模拟阅读分钟数 |
| 微信/抖音/TapTap 原生平台发行和IAA | NOT_APPROVED | web-lite可玩不等于上架可用 |

## 与历史证据隔离
- `qa/current/` 中一些 r4 原始文件保持原貌供对照，部分历史截图与 r3 材料在 `provenance/`。发布时必须按文件内部 SHA 对比本版，不得把旧绿灯移作新绿灯。
- 真正接入游戏仓库后，重新执行 `npm run verify`, `pnpm verify`, `tools/ci-acceptance.py`。失败日志应保留，不能把 native 失败改标为通过。

## 新增发现与修复
- 发现曾有 `index.html` 的 `story-sha256` 元信息陈旧，即使正文JS已更新。这会误导构建对账。已重新运行构建，并给 `tools/verify-delivery.py` 增加三种HTML入口的元信息一致性断言。
- 真人情绪反馈、首局自动播放节奏、画面成熟度仍存在体验不确定性。当前没有真实立绘/配音，选择和叙述密度仍需设备与人测。
