# 《攻略美少女》V9 第一夜恋爱体验整合｜交付 QA（2026-10-17）

## 本轮交付
- 新增 `tools/romance-v9.js` / `romance-v9.css`，在玩家第一次正典选择后增加两轮可点击、可存档的差异化现场回应：`canon` 琴台支援与拒签、`rescue` 原版盘救场与唐映雪回应、`investigate` 留证与沈清辞行动
- 四位女主 `OP_TALK_t/s/l/g` 各有两个先说后选的短交流；最终选项调用原 `choose()`，不改变 `STORY.json`、`engine.mjs`，不伪造好感值
- 单人短对白、禁止阅读框滚动；短对白底板收紧到手机屏幕约 18%–26%，按钮可点区域达标；同一个 CG 的连续话语取消重新闪白/转场
- 11 张 ADV8 完整 CG 继续由构建器统一嵌入，物品点击点映射控台、交接单、接线板；原 CG 的服装、耳饰和舞台光线统一

## 已有可复核的真实自动化证据
- <https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/39007629337>：最新受控分支首夜工作流 **SUCCESS**
- `npm run verify`：构建、正典状态机回归、导出/交付校验通过；`pnpm verify`：默认入口、类型与 lint、Vite 构建通过
- ADV8 资源唯一内嵌检查通过，11 张图均实际载入；`STORY.json` SHA256 保持 `84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93`
- `qa/current/first-night-interactive-report.json`：Chromium/WebKit × 5 尺寸，**10/10 PASS**
- `qa/current/romance-v9-report.json`：Chromium/WebKit × 4 女主路线，**8/8 PASS**；含真实互动、保存/恢复、短对白、44px 触点、正典选项与剧情历史记录
- CI Artifact `romance-first-night-unified-H5-and-browser-evidence`：实际运行输出的 `play.html`、浏览器截图和两份报告；不是美术拼贴效果图

## 明确未通过发布验收
- ADV8 图片为 **1024×1536**，低于原生 1536×2400+ 主图门槛，不可把简单插值放大视为正式母版
- 尚未在真实物理 iPhone/Android 上人工完成 3 局体验，也未完成 8–12 位陌生玩家 30 秒吸引力盲测
- 图片风格/人物跨镜一致性与商用权利仍需独立终审；`npm run art:release` 继续 BLOCKED，PR 保持 Draft
- 历史 v4.17 脚本要求六页小说式开场，已被本轮同等范围的新 H5 测试替代，并明确列为 superseded，不能将旧脚本声称为 PASS；旧根工作流在本轮代码构建提交之前曾因生成文件与代码不同步失败

**结论：工程/脚本/浏览器层面的新版可玩候选已经形成；正式商业发布与用户留存判定未获授权通过。**
