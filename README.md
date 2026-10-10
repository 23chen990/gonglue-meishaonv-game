# 攻略美少女

带后宫向的原创多女主恋爱文字游戏。第一章《欠你一个周末》：离开这座城之前，你只有一个周末赴两个人的约；重开之后，她们各自记得与你相处过的片段，也开始主动邀请你。

**当前默认入口已接入恋爱版，候选仍受 QA 环境阻塞。** 六次决定、五个结局、各自的第二周目记忆、历史重玩和独立存档已实现。2026-10-09 的实际源码回放覆盖 208 条合法首周目路径；正常浏览器操作、手机可读性及平台实测尚未通过。美术与界面重新设计仍按用户要求暂停。

原 run 保持 `20260831-010324-village-south-text-v1`，游戏代码保持独立目录，不包含其他游戏的 workspace。此前《重开后，她们都记得我》是已被正式名称替代的工作名。

开始阅读：

- [交接状态与下一阶段边界](HANDOFF.md)
- [第一章具体剧情](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-bible.md)
- [六次选择、五种收尾、两周目分支图](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-graph.json)
- [当前恋爱版入口](runs/20260831-010324-village-south-text-v1/workspace/game/src/main.ts)
- [当前状态与独立存档](runs/20260831-010324-village-south-text-v1/workspace/game/src/romance-engine.ts)
- [完整替换稿与逐场改写](docs/release-audit/2026-10-08/full-replacement-script.md)
- [当前验收与复现说明](docs/release-audit/2026-10-08/DELIVERY.md)
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

`pnpm dev` 打开当前恋爱版。`pnpm verify` 执行现有 lint、类型、游戏/剧情测试、构建及故事结构验证。结构验证覆盖 208 条路径、五个结局和 14 个逐角色记忆，真实引擎/浏览器 QA 必须另外执行：

```sh
node --import tsx tools/qa-romance.ts
node --import tsx tools/qa-romance-browser.ts
python3 tools/storycheck.py docs/release-audit/2026-10-08/repository-story.json --out docs/release-audit/2026-10-08/storycheck-report.json
```

本次沙箱的 pnpm 拟重建依赖目录，已改用相同已安装版本的直接 Node 命令完成检查，未清除依赖或安装新版本。干净离线安装缺少 yaml 压缩包，当前仍为 BLOCKED；详见验收 J04 与日志。

`pnpm test:legacy-mobile` 是历史旧版测试，使用状态注入；它和保留的旧版 11 条单元测试只用于兼容性，均不算恋爱版产品通过。旧代码不在默认入口上。新恋爱版仍必须通过正常点击阅读的默认旅程和感知验收。

微信、抖音、TapTap 小游戏是目标平台，目前没有经验证的恋爱版平台包。浏览器构建只用于开发与 QA。

## 归档范围

收录本 run 的全部可执行源码、测试、构建配置、剧情校验代码、已暂停的测试草稿、原创规划与结构化研究报告。`src/` 是这些历史生成/校验工具所需的工厂依赖闭包，未在游戏默认运行时加载。

运行产物、依赖缓存、私人聊天截图、原始第三方研究下载与未处理美术不在公开源码中。美术探索仍是本地待处理源，未交付为透明成品。历史报告保留原日期和工作区路径；不能用旧版报告证明新题材已经实现。

项目没有添加第三方游戏代码、角色、素材、界面或数值；研究资料的复用决定与固定版本许可证据见 [恋爱版开源研究](runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/romance-open-source-research.json)。
