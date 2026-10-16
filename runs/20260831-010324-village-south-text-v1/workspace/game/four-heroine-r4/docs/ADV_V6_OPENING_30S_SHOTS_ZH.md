# 《攻略美少女》｜第一夜前 30 秒：可执行分镜、台词与交互重制稿

版本：导演交付 V6 设计稿（不是已经上线的 V6 游戏）｜2026-10-16

## 0. 本次从哪里改、哪里不改

**要解决的不是增加文字，而是让第一眼看到的人、动作和危机真正发生在同一个镜头里。** 当前 V5 打开时，戴耳机男工作人员的素材约 **909×828px**，而游戏主舞台在 390×844 设备上的实际面积约 **390×633 CSS px**。旧资源的横向画面被 `cover` 大量裁切，且在高 DPR 屏上被放大；它既不是上一版 3×4 效果图每格的原生高清 CG，也不是针对手机舞台构图制作的图片。因此，所有新镜头都应重新以竖屏舞台为构图目标输出独立的完整 CG，而不是继续裁切方图。

**必须保留：** `ENTRY_WAKE` 现有正典事件的因果；首次选择 `canon / rescue / investigate` 的 ID、进入后续场景的转移、effects、历史和旧存档；一次只显示当前说话人、一段文字，不在对白框内滚动。

**可以改变：** 前台演出顺序与剪辑、镜头和角色发言的可读版本；不影响选择条件的重复说明可以隐藏在阅读演出之外，历史应能够查看完整正典来源。不能用剪辑偷改剧情事实。

**关于时间：** 下表是首次试玩目标节奏，**不是强制自动播放的定时器**。点击速度因人而异，无法保证每个人都恰好 30 秒抵达选择；必须后续测量真人“前 30 秒是否愿意继续”。

## 1. 首 30 秒分镜总表（按玩家一次一段对白推进）

| 镜头 | 节奏目标（累计） | 游戏中的真实画面和视觉焦点 | 说话者与本次显示的完整台词 | 玩家操作 / 立即反馈 | 正典映射 |
|---|---|---|---|---|---|
| OP01 | 0–4s | **工作人员正面近景**：普通成年男性，黑色工作服、真实耳麦，微微俯身向主角（镜头）喊话；后方器材箱和灯光属于**同一张 CG** | 戴耳机的工作人员：「许照！原版伴奏盘呢？马上要开唱了！」 | 点击继续；急促脚步和舞台倒计时环境声可选 | `ENTRY_WAKE.intro.003` |
| OP02 | 4–8s | **我视角低头**：一只手确实握住挂在胸前的真实工牌；后台地面、袖口、挂绳透视连贯。工牌上“许照 / 临时场务”清晰 | 许照·心声：「许照？……可这根本不是我的名字。」 | 点工牌=放大查看，不推进；关闭回到**同一行**；继续=下一幕 | `ENTRY_WAKE.intro.007` |
| OP03 | 8–12s | **舞台危机近景**：正在表演的女孩按住耳返，朝侧幕方向看，明显发现伴奏错误 | 台上的女孩：「等等！这不是彩排用的版本！」 | 下一次点击听到音轨短暂停顿，镜头切到琴台 | `ENTRY_WAKE.intro.011` |
| OP04 | 12–15s | **钢琴侧面镜头**：一名伴奏者在同一舞台灯光里手指落键；不把钢琴贴到另一张舞台图上 | 钢琴旁的男人：「先跟我的琴！我给你撑四小节！」 | 点击时琴音接住歌声（静音用户也能凭人物动作看懂） | `ENTRY_WAKE.intro.012` |
| OP05 | 15–19s | **主角的瞬间回忆 / 危机镜头**：仍在后台的 POV，远处是舞台灯、近处是被催促的通讯台。镜头焦点不是漂浮出来的 UI 小说页面 | 许照·心声：「等等……这不就是我刚看完的小说？」 | 继续后才揭示真正代价；不要连续播放一大段世界观解释 | `ENTRY_WAKE.intro.025` |
| OP06 | 19–23s | **接线板低角度 CG**：器材箱下露出一小截蓝色标识，足以让玩家知道有线索；**没有人已经拿到 U 盘** | 许照·心声：「原版盘就在接线板下面……我记得原著提过。」 | 可短暂高亮视觉焦点，但不加入“领取道具”伪按钮 | `ENTRY_WAKE.intro.026` |
| OP07 | 23–30s（目标） | **从后台看向舞台的完整危机 CG**：舞台女孩在远景，琴台在同一空间；底部出现 3 条真正的行动选项，视觉焦点不被遮挡 | 许照·心声：「七天后，我会替这场事故背锅。现在怎么办？」 | 显示三选一（真实 `canon / rescue / investigate`）；点选后立刻转入有区别的反馈 | `ENTRY_WAKE.intro.028` → 首次选择 |

> 以上是**前台演出**台词的建议稿，非对 `data/STORY.json` 正典台词的直接覆盖授权。进入项目时必须通过文本哈希、场景 ID、分支回放证明不改原始因果。

## 2. 首次真实选择：一定是我现在要做的事

| choice ID（不能改） | 展示给玩家的文案 | 选后 1–2 次点击内必须看到的对应动作 | 不准发生的穿帮 |
|---|---|---|---|
| `canon` | **先去核对交接记录** | 主角没有碰设备，赶到后台交接处，面对签字与责任归属 | 画面突然出现“我已经拿到了原版 U 盘” |
| `rescue` | **马上去找原版伴奏** | 手探入接线板下，拿出有蓝标的原版，交给能操作音控的工作人员确认 | 主角不懂音控却直接成功操作；原版确认没有过程 |
| `investigate` | **先把换版证据保住** | 接线板特写，主角取走原版并留下可核验的记录，然后被现场的人催促 | 只显示“证据+1”系统提示，不展示发生了什么 |

UI 只有这三项、一个背景 CG 和必要的悬念情境。**禁止角色卡、答题卡、道德评分、进度题签和展开式策略说明。**

## 3. 一个镜头的交付清单（不能以“生成了一张图”结项）

每个镜头必须同时交付：

- **干净的完整 CG**（无文字、UI、边框、嵌入按钮、旁白），竖屏构图，人物与现场环境在同一画面内。
- **角色一致性参考**：普通的工作人员，不是偶像剧帅哥；服装、耳麦、发型在后续镜头保持一致。女孩的服装、耳返、舞台灯色也必须连续。
- **对应台词**：当前说话者、单段自然口语、该段显示时角色确实在画面里（心声与旁白除外）。
- **镜头焦点描述**：玩家第一眼应看哪里，谁或哪件事承载新的剧情信息。
- **手机实际游戏截图**：320×568、390×844、430×932；字体放大单独验收，不能只展示美术原图。
- **选择后的变化**：动作与反馈发生在同一故事世界，禁止机械地多显示一张提示卡。

## 4. 图像生成与后期提示词（每个镜头独立生成；不生成分镜网格作为成品）

固定美术规范：**中国都市恋爱视觉小说，电影感的半写实数字插画，统一暖琥珀舞台灯与少量紫蓝侧光，细腻但不过分磨皮；角色自然成年人、真实体态与手部结构，统一相机视角和场景物理关系；竖向 3:5 舞台画幅；无 UI、字幕、文字框、Logo、水印、拼贴边界。** 若目标作品采用更二次元的风格，应先统一重新定标，不允许同一章一半摄影一半二次元。

- **OP01 工作人员**：a single coherent portrait digital illustration of an ordinary adult Chinese male stage technician in a black t-shirt and functional black headset, bending forward and urgently addressing the viewer from less than one meter away, complete integrated backstage environment with road cases, hanging curtains, warm concert spotlights and cool violet edge light from the same space, physically consistent perspective and shadows, slightly tense eyebrows, hand pointing toward stage not obscuring face; vertical 3:5, medium close-up, camera viewpoint low from seated protagonist; **not** a celebrity portrait, collage, overlay, bokeh pasted behind actor or composite of two photographs.
- **OP02 手持工牌**：first-person POV looking down at one's own hand holding a physically real laminated temporary staff badge attached to a lanyard, sleeve and backstage floor visible with continuous perspective, worn badge has room for later professionally typeset Chinese name and role; detailed hand and badge edges, portrait 3:5, close focus on badge, stage lights naturally out of focus; **no floating ID card, no isolated white document, no invented readable Chinese text**.
- **OP03 台上女孩**：adult female stage singer abruptly stopping as she hears the wrong backing track, one hand touching in-ear monitor, eyes looking toward backstage for help, full performance stage integrated within one composition, face readable, violet and amber stage lighting, portrait 3:5, camera from side curtain; no beauty advertisement pose.
- **OP04 钢琴救场**：adult pianist seated at a grand piano actively striking keys to cover missing introduction, realistic hands and key geometry, singer far in the same stage space, tense but capable, portrait 3:5, camera from backstage side; no isolated piano overlay.
- **OP05 想起七天后**：first-person backstage view with urgent stage atmosphere and clockwork activity, no exposed novel cover or floating 'seven days' caption, a moment of recognition conveyed through composition and depth, portrait 3:5; the actual reveal is supplied by the dialogue layer.
- **OP06 U 盘线索**：first-person low-angle view beside road case and cable junction panel, **only a partial edge of a blue-taped USB drive visible underneath**, believable floor, cables, dust and hands not yet touching it, portrait 3:5, grounded physical geometry, readable focal hint without showing the item already obtained.
- **OP07 分岔场景**：full coherent view from backstage side looking toward singer waiting for a signal and pianist under stage light, enough calm negative space in the lower portion for **real HTML choice buttons**, no text or choice buttons drawn inside the image, portrait 3:5, focal stage action placed upper-middle, not behind UI.

统一负向限制（写入每次生成指令和审稿表）：no split panels, no montage, no picture-in-picture, no blurry low-resolution faces, no translucent limbs, no pasted portraits, no inconsistent lens/perspective, no impossible fingers, no text/subtitle/menu/choice-card baked into image, no watermark, no duplicated people. **这不是保证生成成功的魔法词；每张仍需人工检查与返工。**

> 工牌上“许照 / 临时场务”等必须准确的文字，建议在生成的真实空白工牌表面进行透视、光照匹配的后期排字，作为最终 CG 的一部分输出；不能让模型胡乱写字，更不能用 CSS 画一张假工牌漂浮于画面。对话框中的可访问文字始终由客户端真实 HTML 提供。

## 5. 30 秒好不好玩：只看真实盲玩，不再看我们自己算的点击数

**8–12 位没接触过剧本的目标玩家**，手机上不提示地从头玩；记录：首次操作是否看懂、30 秒内是否知道自己是谁与遇到什么麻烦、第一次有意义的选择是否想点、有没有对台上女孩产生关心，以及“你还想继续玩吗，为什么”。建议把“30 秒继续玩意愿 ≥70%”设为**设计实验的探索目标**，而非已达到的事实或确定的行业基准。分析中同时记录不能在 30 秒内到选择的比例，不要让玩家为了达标而被自动强制跳过。

**没过关就先改第一夜，不用把同一问题批量复制到 228 场。**
