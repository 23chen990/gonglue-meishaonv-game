# H5 交付审计（当前候选）

目标游戏：`攻略美少女`  
Run：`20260831-010324-village-south-text-v1`  
工作区：`runs/20260831-010324-village-south-text-v1/workspace/game`

## 当前结果

- 默认入口已接入恋爱版 H5 web-lite runtime，Vite 构建成功；旧《村口向南》代码仅保留为兼容文件，不在默认入口加载。
- 当前剧本有 6 次选择、5 个结局、208 条合法首周目路径、14 个角色记忆、6073 个场景 ID、104 份不同正文。
- 第 3 次 formal-fixer 只修复 q1-z：删除未展示的“你来了没”引用，保留闻溪自行处理撤展和缺席后果。回归测试先红后绿。
- 相纸回卷顺序、q4 私下声线、q6 slow 声线已在先前修复中通过当前源的本地检查。

## 机器证据

- `qa-romance-report.json`：实际引擎回放 208 条路径、5 个结局、14 个记忆；637 个状态边，2704 个独立转移，0 个差异。
- `qa-deterministic-report-attempt-3.json`：确定性 QA PASS。
- `build-report-attempt-3.json`、`build-hashes-attempt-3.json`：第 3 次构建退出 0，包含 dist 哈希。
- `scene-rewrite-records.json`、`full-replacement-script.md`、`scene-catalog.json`、`branch-map.json`：当前源的完整剧情导出。
- `acceptance-80.json`：51 项工程/源码证据 PASS，29 项 BLOCKED；PASS 不等于自然游玩或感知通过。

## 阻塞项

- `qa-romance-browser-report.json`：HTTP 预览因 `listen EPERM` 无法启动。
- `qa-romance-browser-file-report.json`：file 模式下 Chromium 被 macOS MachPort 权限阻止，WebKit Abort trap；没有自然输入或手机可读性 PASS。
- 当前源的独立 Luna 编辑复核仍需完成；旧 attempt-1/final 报告不能替代它。
- 干净离线安装缺少 `yaml-2.9.0.tgz`。
- 没有 WeChat、Douyin、TapTap 平台包和真实设备验证。
- UI/美术按用户方向暂缓；现有界面是可运行的轻量文字 H5 外壳。

因此当前是“剧本与确定性 runtime 候选完成、产品发布门仍 BLOCKED”，不能宣称已上线就绪。

本次未提交、未推送；第 3 次修复及其审计证据保留在工作树中。
