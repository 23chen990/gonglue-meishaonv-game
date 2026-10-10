# 先读这里：如何把本包交给 agent

目标仓库：23chen990/gonglue-meishaonv-game。

## 这是什么

一份待源码核对的实施包，不是已完成的仓库审计或代码补丁。本次无法取得该仓库源码，也没有向 GitHub 写入。真实游戏的 80 项验收均未执行。

## 文件顺序

1. 01_AGENT_EXECUTION_SPEC.md：完整任务指令、修改顺序、剧情/选择/状态/存档/界面/发布要求。
2. 02_WRITING_EXAMPLES.md：十类原创改写对照和独立分支练习说明。不是仓库原文。
3. 03_ACCEPTANCE_MATRIX.md：80 项真实游戏待执行验收，包含操作与预期结果。
4. 04_TOOL_CONTRACT.md：独立检查工具的严格导出格式、运行命令与能力边界。
5. tools/：Python 标准库检查器及其自身单元测试。
6. examples/synthetic_scene.json：原创十节点练习，非正式游戏内容。
7. reports/：工具自测、演示检查与真实游戏 NOT_RUN 清单。不能混用。

## 直接复制给仓库 agent

请只修改 23chen990/gonglue-meishaonv-game。先阅读本包 01—04 文档，核对 remote、完整 commit 和实际源码，不采用未复核的旧结论，不把示例设定植入原作。按照规范完成全量场景映射与审稿，修复真实选择后果、剧情逻辑、节奏和台词，并补充状态、存档及界面测试。用户不招募测试玩家。不要只交建议：请修改源文件，生成逐场改写记录、各结局真实回放、80项验收结果、可复现日志与分支/补丁。不能运行的项目写 BLOCKED；本包工具自测与演示 PASS 不算游戏通过。保持现有技术栈、角色和确定事实，不删除失败测试，不强推主分支，不覆盖未提交更改。

## 已完成与未完成

已完成：规范、原创示例、待执行验收清单、独立检查器、检查器自身测试。

未完成：真实源码读取、逐章审稿、真实源文件修改、真实游戏自动化、浏览器/引擎实际游玩、GitHub 提交、上线判断。不能用交付文档的完整程度替代这些事实。

## 先自测工具

```sh
python -m unittest discover -s tools -p 'test_*.py' -v
python tools/storycheck.py examples/synthetic_scene.json --out reports/example-check.json
```

实际接入请按 04 文档写薄导出层，并证明它与真实引擎一致。不要重做引擎只为满足工具格式。