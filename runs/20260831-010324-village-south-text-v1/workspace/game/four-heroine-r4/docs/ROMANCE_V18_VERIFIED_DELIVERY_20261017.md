# 攻略美少女 V18：工程验收与视觉真实状态

## V18 已验证交付｜2026-10-17

本轮 36 场四女主日常已经实现女主本人先开口、每场两句短对白，玩家两次点击就能开始做有真实剧情后果的选择。原先有 26 场只有旁白，现由 72 条人工编写的女主口语对白取代前置大段旁白，保留原 112 个剧情选项和所有引擎后果。

- 成功 CI：https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/39037578706
- V18 Chromium/WebKit 72/72 PASS；V17 72/72；有害对照 8/8；旧 V13 文本验证 72/72；V16 第一夜 4/4；V11 主线 46/46。
- 真实手机浏览器截图自查发现，V18 初版短动作提示与章节标题叠压；已把提示移到对白框上沿，选项态收起，并用实际浏览器矩形相交检查二次验证通过。
- 独立 H5 play.html 与 index.html 同一 Git Blob：4fb821c3500611a59e25d1d5debc45228e7afd24，SHA-256：b71b10bab0ef6b0e08fce307d6c4c36b70d82109fe003dcdfad0654cd3b37de1，3,969,167 字节。
- 商用品质仍阻塞：约会剧情复用舞台人物 CG，不是真正的餐厅、便利店、雨夜和录音室等场景，只有 1024×1536 工程候选图，未过 1536×2400+ 素材门槛与商用授权审查；实体 iOS/Android、8–12 位陌生成年玩家盲玩均未完成。
- V18 是玩法与剧情演出层的工程验收通过，不是 228 场全部完成独立导演，也不是可以上架。PR #22 继续 Draft，不合并、不部署。

资料：tools/romance-v18-moments.json、tools/romance-v18.js、tools/romance-v18.css、tools/test-romance-v18.mjs、tools/test-romance-v18.py，以及 docs/ROMANCE_V18_HEROINE_FIRST_ZH.md。

---

## 交付入口

- 成功 CI 工程报告：https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/39037578706
- 成功 CI 的 H5 与截图证据：https://github.com/23chen990/gonglue-meishaonv-game/actions/runs/39037578706/artifacts/12103445383

## 视觉核验与下一阶段优先级

已逐张目视 t01、s05、l06、g06 四个场景的手机渲染；字幕互相叠压的问题已修复，不再抢夺选项。仍可观察到女主穿舞台服装在舞台照片里说餐馆、雨夜、录音室相关台词，这是缺少对应场景 CG 的真实内容缺口。后续必须制作并授权审核人物身份一致、每场有实际动作与地点的正式高清 CG，而不能单纯换颜色或将同一舞台照片反复使用。工程 CI 不证明恋爱吸引力与付费意愿。
