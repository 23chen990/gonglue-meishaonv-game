# 《村口向南》UI 布局候选 v4

这些候选只探索信息架构，统一沿用用户已选择的“现代档案馆”基础视觉语言。它们不是 human approval，也不是可直接发布的运行时 UI。

- `layout-a-system-ribbon-dual-cards.png`：宽幅系统仪表带 + 双决策卡；同屏看到两项选择的即时与延迟影响。
- `layout-b-impact-matrix.png`：决策影响矩阵；按四个系统逐格比较两个选择。
- `layout-c-choice-preview-confirm.png`：单选预演 + 确认；先点一个选择，再看当前值到结果值的完整预演。
- `layout-d-narrative-bottom-sheet.png`：叙事主屏 + 影响底部抽屉；先保留事件氛围，点选后展开系统影响并确认。

统一数据来自 `artifacts/narrative-life-prototype.json` 的 `event_01`，包括即时影响和两次选择后的延迟影响。

生成图中的所有文字、数字、票据与教材字样都只是布局占位和美术参考；正式 UI 必须使用代码渲染的真实文案与运行时状态，不得直接烘焙生成图。四张均为完整不透明全屏 UI 稿，不需要透明背景。
