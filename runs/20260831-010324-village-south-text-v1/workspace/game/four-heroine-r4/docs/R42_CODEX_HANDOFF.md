# r4.2 Codex 交接｜不能回退为五选一开局

## 位置与顺序

1. 正式源 `data/STORY.json` 的 `ENTRY_WAKE` 是**第一个有后果的三选一**，但玩家必须**先读完这里的 28 段穿书故事**。禁止将这段前史缩成卡片、略过、改为可选折叠或“第一屏立刻三选”。此规则优先于 r4.2 旧文案。
2. 三条入口：`canon→ENTRY_CLUES→OP_CANON→A1b`；`rescue→COLD(t/s/self)→OP_SETTLE→OP_FORK→OP_TALK_*`；`investigate→ENTRY_MEMORY(camera/email)→COLD(l/g/self)→OP_SETTLE→OP_FORK→OP_TALK_*`。
3. 后续锚点 `A1b/A2b/A4b/A6a/UNWRITTEN/A6b/XU_WORK` 都有实际设置或引用的因果记录。
4. 解释器 `tools/engine.mjs` 的 `@afterA6` 成功时走 `UNWRITTEN`，清退时仍走失败结局，不能强行变成幸福线。
5. 阅读器 `tools/preview-ui.js` 在 `ENTRY_WAKE` 先显示分页正式正文；未读到最后一页，不能渲染或触发 `[data-choice]`。阅读位置独立存档、不消耗剧情行动，旧 r4.2 记录不覆盖。其他场景实际只显示 2–3 条选项或不超过 4 条。`choicePage` 是显示状态，无成本 UI 分组，不是剧情命令，不能制造选项乱计数或跳过记录。

## 当前 QA 执行入口

```sh
npm run verify
python3 tools/test-ui-r4.py
CASE=FULL_FOUR_ORDINARY_TOUCH_AND_REWIND python3 tools/test-reader-r4.py
CASE=GROUP_SCENE_PHONE_SIZES_LARGE_FONT_AND_LANDSCAPE python3 tools/test-reader-r4.py
CASE=QUOTA_FAILURE_STILL_UNLOCKS_IN_MEMORY_COLLECTION python3 tools/test-reader-r4.py
```

基线必须是 r4.2 版本哈希，不能复用 r4.1 旧见证声称通过。GitHub CI 用 `tools/ci-acceptance.sh`；HTTP 原生入口在此本地环境受限制。

## 未完成但可迭代

- 实体手机和真人盲玩；检查 0–30 秒是否理解玩家有原著知识、1–3 分钟是否知道差异、20 分钟是否看到回收后果。
- 与专用 `romance-story-editor` Skill 兼容。新增更复杂分支时要分别审查言行身份、证据来源、角色已知事实和结束条件。
- 一些历史长菜单依靠 UI 分组，**底层 JSON 尚未物理压缩到每场最多四个**：为避免失去历史合法路线，本轮不做风险过高的无差别删支；后续可做按人物情境拆问问题的正式新场景，但须重建所有路径见证。

## 原著严格边界

“原著许照当晚只守设备箱”的细节是本轮创作新增的正式设定，与历史 r3/v5 资料中的事实来源不同，参见 `docs/R42_ORIGINAL_NOVEL_BRANCHING.md`。

**交付门槛补充：**浏览器打开时初屏必须是现实中读小说然后晕倒，不能默认展示原著结局摘要与三个按钮；普通触控读完原著记忆后，末页仍必须是真实的 `canon/rescue/investigate` 三选。使用 `docs/R42_TRANSMIGRATION_INTRO_REPAIR.md` 与 `tools/test-ui-r4.py` 做必查。
