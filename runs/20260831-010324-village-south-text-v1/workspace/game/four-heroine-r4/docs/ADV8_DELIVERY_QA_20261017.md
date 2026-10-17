# 《攻略美少女》第一夜·侧幕｜ADV8 代码与 CG 交付验收记录（2026-10-17）

## 当前提交与交付
- 分支 `feat/first-night-playable-unified-20261017`，Draft PR #22。
- 11 张 1024×1536 完整场景 WebP 已真正入库，SHA 和来源记录在 `assets/adv8/asset-manifest.json`。
- 经过 `npm run verify` 自动生成并提交 `play.html` / `index.html` / `runtime.mjs`。
- 关键玩法：唐映雪舞台危机第一屏、剧务帮助、主动查看工牌、控台/交接单/接线板真实图上点击、蓝标 U 盘、正典 `canon / rescue / investigate`。
- 图像去重：同一 CG 在离线 HTML 与 runtime 各只嵌入一次，头像/V6 回退映射共享 URI。改造前离线 HTML 6,809,913B，改造后实测 3,849,128B（约减少 43.5%），`play.html` SHA256: `25e2fc919e6be4bd086e8c57b4b5c310552cdb05bb40f663ee06372da5e04b53`。

## 已验证
- 本地 Chromium 以 `set_content` + 内存 localStorage polyfill 加载完整 11 张候选 CG，在 320×568、390×844、430×932 三个 viewport，检查画面、底部对话、物品热点大小/位置、三条真实引擎分支。注意：此种本地注入不等同于 HTTP 持久化验收。
- GitHub Actions `Romance first-night interactive cinema H5` 真实 HTTP Chromium 与 WebKit **10/10** 触屏回归通过，覆盖 320×568 至 430×932、真图片、文字可见性、物品调查不得自动跳过、存档/刷新、正典选择与续接。检查 run: `39004432680`。
- 同一 run 通过剧情构建、lint、typecheck、默认入口打包、`test-adv8-single-embedding.mjs` 源哈希/唯一内嵌/尺寸检查。构建生成物已经推送回分支。
- 我们人工检查了真实 WebKit 首屏与调查、后续场景截图，没有发现在屏幕外的角色面部、内部滚动或模糊的旧舞台贴图。证据在 CI artifact `romance-first-night-unified-H5-and-browser-evidence`。

## 尚未通过/不能冒称
- 商用品质 CG 严格门槛 1536×2400+，目前仍为 1024×1536 工程候选。不能简单放大充当 master。
- 女主跨角度一致性需要正式视觉审查与逐镜人工修订；美术版权/商用授权终审未完成。
- 未做真实物理 iPhone/Android 触控、音效/演出感受与 8–12 名陌生玩家前 30 秒留存盲玩。
- `npm run art:release` 严格图像审批门禁理应继续 BLOCKED；PR 保持 Draft，不可直接合并上线。

## 后续收口次序
1. 真实设备 3 局体验：首屏视觉、舞台音效/演出真实感、调查物理点命中、分支后的情绪后果。
2. 最终 1536×2400+ CG 逐镜确认人物年龄、脸型、服装、发饰、背景连续性，并通过图像权利复核。
3. 限量玩家试玩评估首次主动点击、女主角色记忆度、第一夜出戏原因；据实再调节叙事与音画节奏。
