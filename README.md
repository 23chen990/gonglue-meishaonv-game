# 攻略美少女

带后宫向的原创多女主恋爱文字游戏。第一章《欠你一个周末》：离开这座城之前，你只有一个周末赴两个人的约；重开之后，她们各自记得与你相处过的片段，也开始主动邀请你。

**当前交付是剧情与源码基线。** 恋爱版正式名称已确定，剧情已写出并完成分支检查与 Luna 独立复核。浏览器项目当前仍运行旧版《村口向南》；恋爱剧情、角色立绘、新界面和存档隔离尚未接入。用户最新要求是先完成具体剧情，美术和实现暂停。

原 run 保持 `20260831-010324-village-south-text-v1`，游戏代码保持独立目录，不包含其他游戏的 workspace。此前《重开后，她们都记得我》是已被正式名称替代的工作名。

开始阅读：

- [交接状态与下一阶段边界](HANDOFF.md)
- [第一章具体剧情](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-bible.md)
- [六次选择、四种收尾、两周目分支图](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-graph.json)
- [旧版实际入口](runs/20260831-010324-village-south-text-v1/workspace/game/src/main.ts)
- [旧版状态与存档](runs/20260831-010324-village-south-text-v1/workspace/game/src/game.ts)
- [给 ChatGPT 聊天模式的提示词](CHATGPT_NEXT_STEP_PROMPT.md)
- [本次源码校验记录](verification/source-verification.json)
- [源码与原始文件哈希映射](PUBLICATION_SOURCE_MAP.json)

## 本地验证

使用 Node.js 22+ 与 pnpm 11.19.0。在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
```

`pnpm dev` 打开旧版基线，不是已经做好的恋爱版。`pnpm verify` 检查 lint、类型、旧版 11 条测试、剧情 18 条测试、旧版构建及 128 个剧情选择组合。四种顶层收尾与 12 个逐角色记忆回应可达，这只是写作合同的验证。

`pnpm test:legacy-mobile` 是历史旧版测试，使用状态注入验证布局和存档；不能当作新恋爱版的自然玩家体验证明。新恋爱版后续必须通过正常点击阅读的默认旅程和感知验收。

微信、抖音、TapTap 小游戏是目标平台，目前没有经验证的恋爱版平台包。浏览器构建只用于开发与 QA。

## 归档范围

收录本 run 的全部可执行源码、测试、构建配置、剧情校验代码、已暂停的测试草稿、原创规划与结构化研究报告。`src/` 是这些历史生成/校验工具所需的工厂依赖闭包，未在游戏默认运行时加载。

运行产物、依赖缓存、私人聊天截图、原始第三方研究下载与未处理美术不在公开源码中。美术探索仍是本地待处理源，未交付为透明成品。历史报告保留原日期和工作区路径；不能用旧版报告证明新题材已经实现。

项目没有添加第三方游戏代码、角色、素材、界面或数值；研究资料的复用决定与固定版本许可证据见 [恋爱版开源研究](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/romance-open-source-research.json)。
