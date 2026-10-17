# ADV8 第一夜完整事件 CG｜入库说明

此分支已加入可选的 ADV8 静态资源打包器。十一张新生成的完整竖屏镜头另行作为 H5 素材包交付，**本分支目前不包含这 11 张 WebP 二进制图片**；缺包时保持旧 V6 候选图回退运行，不会伪称已经完成替换。

## 安装路径
将素材包 `assets/adv8/` 目录复制到此项目（`four-heroine-r4/assets/adv8/`）。必须同时存在：
- stage.webp、crew.webp、badge.webp、console.webp
- singer.webp、singerBond.webp、usbDetail.webp、usbHeld.webp
- shen.webp、lin.webp、gu.webp

`npm run build` 检测文件齐全时，会自动以 base64 封入独立可离线打开的 `play.html`、`index.html` 与 `runtime.mjs`，并纳入 build-meta SHA。此后第一夜启动即有唐映雪舞台 CG、普通工作人员 POV、工牌、沈清辞、设备台场景调查热点与真实的蓝标 U 盘特写。原剧本引擎/正典 choices 不改。

## 质量边界
初始图尺寸为 1024×1536，适合作为移动端工程候选，不符合项目严控 1536×2400 正式 master 最低规格。**不能将这套图直接标注为最终商业授权 CG 或发布通过。**需要人物跨镜一致性、场景持续性、正式法律/版权/商用来源审核、真实 Chromium+WebKit 手机模拟截图和真机触控之后，才可在严格图像门禁中标记 approved。

## 验收
- `npm run verify` — 剧情/引擎/离线构建
- `R4_WEBKIT=1 R4_REAL_URL=http://127.0.0.1:8765/index.html python3 tools/test-interactive-opening.py` — 触屏与新图条件断言
- `npm run art:release` — 正式图强门禁；未完成新 master 时应 BLOCK，不得绕过

单文件 HTML、已转换 WebP、角色识别图集和文件哈希包含在本轮 ChatGPT 对话提供的素材压缩包中。请在 PR #22 完成二进制资源添加和真实浏览器验证后再推进审核。
