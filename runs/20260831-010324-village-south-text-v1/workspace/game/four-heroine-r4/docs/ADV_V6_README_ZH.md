# 《攻略美少女》ADV V6 前 30 秒制作包｜先读

本包是 **两份正式制作稿 + 机读镜头清单 + 自动图片 QA 工具 + V5 实证审计**。它不是新 H5 试玩版，也不包含已批准的 V6 高分辨率独立 CG，因此不得宣称“画面效果已做成”。

1. `01_前30秒_分镜与台词重制.md`：逐镜头的画面、对白、玩家操作、源剧情 ID 与首选后果；包含独立 CG 生成提示词。
2. `02_效果图到实机CG_生产与验收规范.md`：设计画幅、人物一致性、生成/后期、UI 接法、工程与视觉双验收、交付顺序。
3. `03_shot_manifest.json`：10 个镜头的机器可读契约，包括 7 张开场镜头与 3 张分支即时反馈镜头。全部保持 `planned`，不能虚报制作完成。
4. `04_check_adv_art.mjs`：无第三方依赖的 PNG/WebP/JPEG 真实尺寸、宽高比、素材审稿状态检查工具。
5. `05_V5_真实素材基线审计.md`：旧版为什么模糊的真实数据与算式。

### 在 GitHub 项目中使用

在 `four-heroine-r4` 根目录：

```bash
node tools/check-adv-art.mjs --baseline
node tools/check-adv-art.mjs --manifest art/adv-v6/shot-manifest.json
node tools/check-adv-art.mjs --manifest art/adv-v6/shot-manifest.json --strict
```

目前最后一条**应该失败**（未做好的图不得混过门槛）。新 CG 制作并经过真实游戏截图、授权与视觉审稿后，才能修改 `status` / `reviews` 为 `approved`，使其通过。

### 不要重复过去的失误

- 一张分镜拼图不是十张正式 CG；900px 方图不是 2K 竖屏资产。
- 源图审过不等于 H5 画面审过；必须附 320/390/430px 实际截图。
- 三个选项保持正典 `canon/rescue/investigate`，不让美术层改写故事逻辑。
- 不要为了制造“30 秒爽感”强制快进，不要为了卡画幅继续把人物贴到另一个舞台背景。
- 先过前 30 秒小样，再扩展全部 228 个场景。
