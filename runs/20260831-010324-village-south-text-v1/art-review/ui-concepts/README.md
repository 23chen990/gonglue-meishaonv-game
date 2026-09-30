# 《村口向南》UI 视觉候选

目标游戏：`村口向南`

目标游戏工作区：`runs/20260831-010324-village-south-text-v1/workspace/game`

这些图片是美术评审预览，不是游戏运行时资产。四个方向共用同一信息架构：年份、四项状态、章节进度、事件卡与两个主选择。

- `ui-a-rural-ledger-collage.png`：乡村账本拼贴
- `ui-b-woodcut-lianhuanhua.png`：复古版画连环画
- `ui-c-modern-archive.png`：现代档案馆
- `ui-d-warm-pixel-narrative.png`：温暖像素叙事
- `ui-final-modern-archive-integrated-v2.png`：选定的现代档案馆方向首轮布局修订；后来被“核心系统仍不够显眼”的用户反馈否定，不再作为最终布局
- `ui-revision-system-impact-v3.png`：现代档案馆方向的系统驱动布局修订候选；四项系统提升为 2×2 主仪表区，并在选择卡上直接显示即时与延迟影响；尚未获得新的 human approval

生成方式：Codex 内置 ImageGen。

共同画面内容：1978 年第一章事件“煤油灯下的准考证”，顶部显示“家底 / 本事 / 身体 / 人情”，底部固定两个拇指友好的选择按钮。

用户已经选择的基础视觉方向：现代档案馆（深海军蓝、暖金细线、奶油色档案纸）。布局仍在修订：`ui-revision-system-impact-v3.png` 是针对最新反馈的推荐实现参考，但它不是新的 human approval。

约束：原创架空人物与地点；不使用真实人物、徽记、口号、品牌或第三方游戏视觉表达；正式实现时所有正文与按钮文案都应由代码渲染，而不是烘焙在图片里。
