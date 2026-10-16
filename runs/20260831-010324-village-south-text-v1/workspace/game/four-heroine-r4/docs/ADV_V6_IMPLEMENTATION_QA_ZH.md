# ADV V6｜手机可玩预览与素材真实性状态

本版 **已经接入可玩的 V6 导演层**，保留全部正典故事、三条首叉 action ID、旧存档和结局引擎；采用单张全场景 CG，不叠加透明人物。第一夜手机开场 6 段阅读后进入真实三选一；独立工作牌查看不推进剧情；源台词版本和屏幕台词分离。

## 工程证据

本地 Chromium DOM 注入式 `page.set_content` 渲染测试在 320x568、360x780、390x844、430x932 通过 6 次推进、三选项同屏和分支回放。三条选择分别进入 ENTRY_CLUES / COLD / ENTRY_MEMORY；工作牌特写关闭后仍停留在原 source-row；320 宽开启大字号切回剧情未跳页。真正的本地 HTTP / WebKit / 旧档全量验收以 GitHub PR 的 exact-head CI 为准。

## 美术状态：**尚未达到最终画质标准**

由于独立高清 CG 未能获得合格生成结果，此次播放器使用现有 V5 图片进行轻微局部锐化、再编码的 **legacy preview** 资源，不冒称 1536x2560 原生高清美术。人脸原始细节无法凭重采样凭空恢复；舞台歌手手持水瓶、钢琴画面无人弹琴等与台词不完全同步的部分已经用屏外声处理或保留为待重制镜头。正式 10 张独立 CG 在 `art/adv-v6/shot-manifest.json` 中继续标记 `planned`，所有人像、歌词、动作必须经过独立审稿，未过 `--strict` 不得视为正式发布。

## 预览构建与回归

受控构建入口：`npm run verify`（four-heroine-r4）。当前 GitHub branch: `fix/mobile-vn-single-turn-reader-20261016`；独立 HTML 为 `play.html`，默认入口 `index.html`。新 UI 源码：`tools/director-v6.js` 与 `director-v6.css`；预览修饰图：`assets/v6-preview/`；不能将这组图片拷贝成正式 master 目录。

这次验收范围不是“全部 228 场专属 CG 完成”，也不是“真人前 30 秒留存合格”。
