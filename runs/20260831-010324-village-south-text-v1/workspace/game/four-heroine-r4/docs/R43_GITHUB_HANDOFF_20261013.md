# r4.3 剧情精修交接（仅文档归档，尚未上传完整代码）

**日期**：2026-10-13  
**基线**：PR #2 的 `10522e80bed61edae9f9e5d36a8498163e622f4a`；《完整穿书经过》版本，不是旧的“先三选一，完整经过可选”的版本。  
**正式 r4.2 故事 SHA-256**：`bde7c453fe8c0d12b6de16500eef82a4400b8a294a291f44fb51e62111528242`。  
**r4.3 修订目标 SHA-256**：`e9e1c14a1593a9bce06209eb0b969ed8f77dc0178dc5756bbc7e7ee7cb8231f0`。

## 本轮已完成、可在本次聊天下载的成果

完整 `r43_complete_source_final.zip` 和 `r43_full_play_final.html` 已在 ChatGPT 当前对话交付。**请不要把这个 GitHub 文档分支误认为已包含新源文件或发布包**。GitHub 连接器在此轮没有直接上传本地 20MB 源码包及 140 处结构化 JSON 的路径，因此本分支只做交接；正式源码以聊天下载包中的实际文件为准。

完成内容：

- **保留 28 段完整穿书引导为主线必读**，最后一页才显示 `canon/rescue/investigate` 三条真实行动。不得恢复“完整穿书经过（可选）”。
- 将原来单独的“原著记忆”卡片改为穿插在主角视角里的第一人称回忆，如“我记得原著里……”。主角记得书中线索不代表获得证据、物品或对方同意。
- 受控修订 **140 项正式故事显示字段（含版本号）、涉及 24 个场景**，覆盖首夜初见、四位女主的差异性回应、原著外新事件、第 2/5/7 天高潮。
- 修复不同路线串词风险：`canon` 线没有找蓝标盘，不得在共用场景里无条件写主角递过盘；没有公开名单的分支不提前声称名单已公开。
- 保护原有**228 场、751 个内部选项、24 主结局**，不改变选择 ID、guard/effect、路由及顺序。
- 版本及存档隔离到 r4.3，旧 r4.2-intro 存档保留、不静默迁移。
- `patch/r43_editorial_patch.json` 是逐 JSON 指针旧值→新值的可复现文字补丁；`tools/apply-r43-editorial.py` 必须核对源及目标 SHA；`patch/r43_runtime_and_qa.patch` 是代码、CSS、构建与 QA 统一 diff，均在聊天完整源码包内。

## 真实验证

- `npm run verify`：PASS；故事/引擎校验、构建、全文重导、增量 `test-r43-editorial.mjs`，包括 28 段、3 条开局行动、4,024 处 `textHash` 完整性。
- `python3 tools/test-ui-r4.py`：**16/16 PASS**；这是 Chromium 注入 DOM + 模拟 localStorage，不是原生 HTTP/持久化验收。
- `CASE=FULL_FOUR_ORDINARY_TOUCH_AND_REWIND python3 tools/test-reader-r4.py`：PASS；模拟正常触控完成四女主路线的 95 次输入与回退。
- 补丁重放：从最新 r4.2 原压缩包重新执行 JSON 补丁并应用代码 diff，**12 个核心源码文件逐字节一致，PASS**。
- 真人盲测、iOS/Android 实机、新 r4.3 的原生 HTTP 与原生 localStorage、IAA SDK、上架：**未验收，不能使用旧 r4.2 CI 成果冒充 r4.3**。

## Codex 安全集成顺序

1. 从本次聊天下载的 `r43_complete_source_final.zip` 提取 `gonglue_r43_complete`，核查 `docs/R43_STORY_EDITORIAL_AND_UX.md` 和 `docs/R43_QA_EXECUTION.json`。
2. 检查 PR #2 实际 HEAD 与正式 `data/STORY.json` SHA。如 HEAD 或正式故事与本交接不符，**先停止并重新对比**，不覆盖另一对话窗口的新内容。
3. 如 SHA 为 `bde7...`：可按包内 `tools/apply-r43-editorial.py`、`patch/r43_editorial_patch.json` 与 `patch/r43_runtime_and_qa.patch` 在新隔离分支复现；运行构建，不能手工改生成的 `runtime.mjs/play.html`。
4. 在新候选 HEAD 重跑 `npm run verify`、根仓库 `pnpm verify`、真实 HTTP 原生浏览器测试、四女主全线正常触控与手机版布局 QA。出示当前 HEAD 与故事 SHA，不借旧报告。
5. 保持 Draft，不合并、部署或发布。把 16 种真实 5–6 选项的分层决策重构另立任务，避免把视觉分页谎称总选项已不超过四个。

**提交界限**：这是 GitHub 交接文档，不含正式 r4.3 源码提交。
