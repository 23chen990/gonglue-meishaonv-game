# storycheck/1 导出协议与能力边界

## 1. 定位

storycheck.py 是确定性、有限域的离线检查器。它不抓取仓库，不读取任意项目语言，不执行 JavaScript、Ink、Ren'Py 或自定义脚本，也不执行 UI。它只验证输入 JSON 所表达的模型。PASS 不代表生产可发布，报告中的 production_release_status 始终为 NOT_ASSESSED。

运行环境：Python 3.10+，仅标准库。无第三方依赖，无网络调用，无 eval/exec。读取所指定文件，只有 --out 被指定时才写出报告。

## 2. 根对象字段

必须包含 format、source、entry、variables、endings、nodes；invariants 可省略。其他根字段拒绝，防止关键逻辑因拼写或协议不支持而被静默忽略。

format 固定为 storycheck/1。entry 为真实初始节点 ID。endings 是非空、无重复的结局 ID 数组。

source 必须包含 kind、repository、commit。kind 为 synthetic 时 commit 必须是 null，演示样例不可伪装成真实仓库。kind 为 repository_export 时 repository 非空，commit 填 40 或 64 位十六进制完整哈希。source 是调用者声明的来源，检查器不会联网证明它是真的，必须另附真实基线记录。

## 3. 变量

variables 为变量名到规格的对象，允许为空。每个变量必须有 type 和 initial。

bool：type=bool，initial 只能是 JSON true 或 false；0/1 不当作布尔。

int：type=int，必须给整数 min、max、initial，且 min ≤ initial ≤ max。浮点数、布尔伪整数不接受。add 越界直接报 DOMAIN，不会默默截断或 clamp。

enum：type=enum，必须给非空、无重复的非空字符串 values，initial 必须属于该集合。

变量使用真实有限域。未经证明不能缩小上下界、合并不同历史，或删掉影响文本、条件和关系的标记。无界数值、时间、外部网络等不能默认假设为某个常量。

## 4. 条件

支持直接 true/false；支持 {"all":[条件…]}、{"any":[条件…]}、{"not":条件}，all/any 不能为空。嵌套超过规定层数拒绝。

原子条件：{"var":"变量名","op":"eq","value":值}。op 可为 eq、ne、lt、le、gt、ge；后四种仅用于整数。比较值必须属于同类型、同声明域。未知变量、字符串表达式与未知运算符直接失败，不会假定为 false。

本模型不支持“变量与变量比较”或任意函数；适配时必须做可验证的有限展开，或明确 UNSUPPORTED。不要传入字符串代码。

## 5. 节点

每个节点必须有 id、text、choices。id 与 text 为非空字符串，节点 ID 全局唯一。choices 为数组，可在终局为空。

可选字段 requires、ending。requires 是进入节点时检查的不变量，不是自动隐藏节点的入口条件。进入时为 false 会报 NODE_REQUIREMENT。需要限制某个选择，使用该选择的 when。

有 ending 时，其值必须在根 endings 列表内，且 choices 必须为空。没有 ending 又无可选项会在可达状态中报 DEADLOCK。终局菜单、重玩和收藏按钮不放进这个剧情终局模型，它们由真实界面测试覆盖。

## 6. 选项

每个选项必须有 id、label、target。id 在本节点内唯一，label 非空，target 指向存在节点。

可选字段 when、effects、response、kind。when 省略时视为 true。response 存在时必须非空；检查器不判断文案质量，也不渲染它。kind 可为 substantive、expressive、continue，默认 substantive。

effects 为按顺序执行的数组。每项必须有 var、op、value。op=set 将变量设置为合法域值；op=add 仅适用于整数。效果在合法选择提交后、到达目标节点前执行。

它没有 onEnter、异步回调、隐式时间推进、自动成就副作用或多步骤存档事务。原引擎有这些行为时必须明确展开并验证顺序，或改用真实引擎测试。不得把字段删掉让格式通过。

## 7. 全局不变量

invariants 为数组，每项必须有唯一 id、must，可选 when。对每个被探索状态：when 成立时 must 也必须成立。不变量也在终局检查。

示例：kept=true 时必须 promised=true；某物已消耗时不能仍在玩家背包。这里的标记名称要换成原引擎真实语义，不要为了测试修改故事事实。

## 8. 搜索与证明范围

搜索键为节点 ID 加所有声明变量的精确值，不只记录访问过的节点。所有可用选择都在该状态尝试，父路径用于生成结局或错误的复现序列。

完整探索后检查未访问节点、未执行选择、未到达结局，并反向求出哪些已访问状态仍有机会抵达某个终局。没有终局出口的可达状态报 NO_TERMINAL_PATH。

可自由重复但有出口的循环不会因此被判为错误；工具没有证明玩家所有无限选择序列最终必然停止。它证明的是完整模型内的可达性与某些安全条件，不是全部活性性质。

SAME_MODELED_FUTURE 警告表示同一状态下若干 substantive 选项的目标节点与后继状态相同。即使即时回应不同也可能警告；需编辑判断是否应改为表达选择。警告不等于已证明“不好玩”。检查器也无法证明不同状态就一定有值得玩的后果。

## 9. 上限与退出码

默认 max-states=50000、max-edges=500000。超过上限时 complete=false，不对未访问内容作不可达的最终证明。

退出码 0：模型无错误且完整探索；允许存在编辑警告。

退出码 1：发现模型错误，可能同时搜索不完整；详看 complete。

退出码 2：未发现错误但搜索受限，为 INCOMPLETE。

退出码 3：读写、解析或输入异常，例如文件不存在、重复 JSON 键、非有限 JSON 常量。

不允许以“提高上限前暂时 PASS”处理；应保存真实受限报告、调整模型与覆盖策略，并说明没有证明的内容。

## 10. 与真实游戏的对接验收

用真实引擎导出可复现初态与选择。对所有已声明覆盖的一步转移比较可选 ID、目标、状态和文本变体。对每个模型结局证据路径在真实引擎重放。记录导出器版本、源码 commit、原始与模型场景对账、未支持行为及精确覆盖范围。

只有工具自身测试：不能称游戏通过。

只有演示模型通过：不能称接入完成。

只有真实导出模型通过：不能称 UI 和存档通过。

只有几个结局样本：不能称所有状态或所有路径已穷尽。

真正的状态更新、幂等、旧存档迁移、输入误触、资源加载和实际文本都要分别测试。

## 11. 本包资料地址

以下只用于查阅方法与 API 边界，不能作为仓库缺陷证据。

```text
S1 https://www.choiceofgames.com/2010/03/5-rules-for-writing-interesting-choices-in-multiple-choice-games/
S2 https://playwright.dev/docs/browsers
S2 https://playwright.dev/docs/test-projects
S3 https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
```