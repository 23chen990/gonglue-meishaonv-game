# ADV8｜第一夜 CG 资源验收

11 张独立场景 WebP 图片已真正提交本分支，路径为 `assets/adv8/`；不再需要人工从附件安装。每张 1024×1536、SHA256 与仓库 Blob SHA 见 `asset-manifest.json`。

`npm run verify` 自动把图片封入可离线打开的 `play.html`、`index.html` 和 `runtime.mjs`，也会更新 `build-meta.json`。CI 需要通过 Chromium + WebKit 的新图路径、画面热点、单人短对白、三条正典分支与存档兼容检查。

**美术状态：工程候选，不是上架资源。** 正式图门槛仍为 1536×2400 以上，需统一角色跨镜身份、真实 320/390/430px 视口截图、真机触摸、授权及真人试玩。

不能以 npm/CI 通过宣称剧情好玩，也不能把 1024×1536 放大冒充正式高分辨率 master；`npm run art:release` 必须在全部正式图片完成评审前继续 BLOCK。
