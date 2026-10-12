# r4 → r4.1 正式文本改动记录

变更性质：**严格文本修订**，63处、32个实际场景。源版本和现版本通过SHA-256锁定，结构化路径列在本包 `patch/editorial_patch_r4_to_r4_1.json`；完整源是 `data/STORY.json`。

- 原 r4 STORY SHA-256: `577db875a0a664b4cba8c301e9169f60b9aa831ee97e9fdd9f03368dcdea7bf3`
- r4.1 STORY SHA-256: `d8ebd4d349b7560b07c181b818b4793566a901e03d3127ced7612dfba4079d8e`
- 显示文本差异数: **63**
- 作者标记的不变项：scene/choice ID、说话人、选项条件、效果、路由、原著设定及存档结构。
- 校验：JSON结构保护器 PASS；当前解释器重放和 `npm run verify` PASS；具体报告见 `docs/R41_QA.md`。

## A3b（4 处）

- `/scenes/A3b/body/1/text`：T recalls concrete player-facing musical feedback without claiming a specific unchosen option.
- `/scenes/A3b/body/2/text`：S returns with progress in independent work, not pure availability.
- `/scenes/A3b/body/3/text`：L advances her own documentary independently, but avoid claiming consent or confirmed missing audio.
- `/scenes/A3b/body/4/text`：G acts beyond deals and offers a distinct shared experience.

## COLD（3 处）

- `/scenes/COLD/body/0/text`：Make the old-book clue visibly verifiable and give tactile immediacy.
- `/scenes/COLD/body/1/text`：More natural professional handoff; preserve separation of responsibility.
- `/scenes/COLD/body/2/text`：Sharpen timing and agency while preserving five first-choice routes.

## ENTRY_CLUES（5 处）

- `/scenes/ENTRY_CLUES/body/1/text`：The stage manager calls for urgent action rather than delivering exposition.
- `/scenes/ENTRY_CLUES/body/2/text`：The singer immediately and competently identifies a concrete problem.
- `/scenes/ENTRY_CLUES/body/3/text`：Lu has credible backup and consults performer, without lowering intelligence.
- `/scenes/ENTRY_CLUES/body/5/text`：Names surface through observable shouts/actions instead of narrator naming a character gallery.
- `/scenes/ENTRY_CLUES/body/6/text`：Protagonist’s recall is tentative, not instant omniscience.

## ENTRY_MEMORY（2 处）

- `/scenes/ENTRY_MEMORY/body/1/text`：Foreground a believable memory tied to the danger; clarify that known text is old-book memory.
- `/scenes/ENTRY_MEMORY/body/2/text`：Panic plus ordinary youth voice, no detached genre commentary.

## ENTRY_WAKE（4 处）

- `/scenes/ENTRY_WAKE/body/0/text`：Put physical experience before supernatural explanation; no invented chapter.
- `/scenes/ENTRY_WAKE/body/1/text`：Repeated unfamiliar name should be the protagonist’s first sensory anchor.
- `/scenes/ENTRY_WAKE/body/2/text`：Replace explanatory declaration with concrete, playable disorientation.
- `/scenes/ENTRY_WAKE/body/3/text`：Use unambiguous colloquial reaction; adopted tested pilot edit.

## OP_CHECK_g（1 处）

- `/scenes/OP_CHECK_g/blocks/1/lines/0/text`：G separates verifiable fact from supernatural claim with concise boundaries.

## OP_CHECK_l（1 处）

- `/scenes/OP_CHECK_l/blocks/1/lines/0/text`：L asserts creator identity and residual old attachment in natural phrasing.

## OP_CHECK_s（1 处）

- `/scenes/OP_CHECK_s/blocks/1/lines/0/text`：Reframes as intelligent test of foreknowledge.

## OP_CHECK_t（1 处）

- `/scenes/OP_CHECK_t/blocks/1/lines/0/text`：T uses playful but skeptical near-term question.

## OP_RIVAL（2 处）

- `/scenes/OP_RIVAL/body/1/text`：Lu works independently without assuming control over the singer.
- `/scenes/OP_RIVAL/body/2/text`：T has ambition and specific rights concern rather than generic wise response.

## OP_SECRET_g（1 处）

- `/scenes/OP_SECRET_g/body/3/text`：G takes responsibility for verification rather than demanding player certainty.

## OP_SECRET_l（1 处）

- `/scenes/OP_SECRET_l/body/3/text`：Director uses actual evidence instead of generic interrogation.

## OP_SECRET_s（1 处）

- `/scenes/OP_SECRET_s/body/3/text`：Producer balances evidence with room for personal explanation.

## OP_SECRET_t（1 处）

- `/scenes/OP_SECRET_t/body/3/text`：Concern emerges from a real operational scare, not therapist-speak.

## OP_SETTLE（2 处）

- `/scenes/OP_SETTLE/body/1/text`：Add concrete new-life dread without inventing a rent due date.
- `/scenes/OP_SETTLE/body/2/text`：Give immediate action pressure rather than an abstract conclusion.

## OP_TALK_g（3 处）

- `/scenes/OP_TALK_g/body/3/text`：G tests the newcomer’s nerve; tested pilot edit.
- `/scenes/OP_TALK_g/body/4/text`：Undercut bravado with natural self-deprecating humor grounded in scene.
- `/scenes/OP_TALK_g/body/0/text`：G acts independently and responsibly instead of purely reacting to the player.

## OP_TALK_l（2 处）

- `/scenes/OP_TALK_l/body/1/text`：Her first interest is ethical documentation and protagonist wellbeing.
- `/scenes/OP_TALK_l/body/3/text`：Explicit private-photo consent; tested pilot edit.

## OP_TALK_s（2 处）

- `/scenes/OP_TALK_s/body/2/text`：A slightly shy normal-human question rather than undermining her cognition.
- `/scenes/OP_TALK_s/body/3/text`：Producer remembers concrete behavior, warmer and less audit-like.

## OP_TALK_t（3 处）

- `/scenes/OP_TALK_t/body/2/text`：The protagonist can admit embarrassment; tested pilot edit.
- `/scenes/OP_TALK_t/body/3/text`：T teases through music; performer owns the successful performance.
- `/scenes/OP_TALK_t/body/0/text`：She acknowledges audio crew and physically moves with post-stage energy.

## g01（3 处）

- `/scenes/g01/body/3/text`：G’s polished humor tied to her profession but not endless contract-talk.
- `/scenes/g01/choices/1/reply/0/text`：Concretize awkwardness and reduce rehearsed exposition.
- `/scenes/g01/choices/1/reply/4/text`：She does not promise money/approval, preserves agency and shows grounded concern.

## g02（1 处）

- `/scenes/g02/body/3/text`：Personal responsibility from prior incident; clear why care.

## g03（2 处）

- `/scenes/g03/body/3/text`：G proactively marks this as private time.
- `/scenes/g03/body/1/text`：G intentional lightness in private choice, no endlessly investor-coded metaphors.

## g04（1 处）

- `/scenes/g04/body/6/text`：Shows playful competitiveness and voluntary stakes, not comic one-note caricature.

## l01（3 处）

- `/scenes/l01/body/3/text`：Make documentary director’s ethical conflict actionable; not an abstract artistic dilemma.
- `/scenes/l01/body/4/text`：L has a concrete independent next action and ethical priority.
- `/scenes/l01/choices/0/reply/4/text`：Personal invitation grows from doing real ethical work together.

## l02（2 处）

- `/scenes/l02/body/4/text`：L has a real ongoing obligation, not only a general inability to say no.
- `/scenes/l02/body/6/text`：Give nuance about past Lu attachment without turning her into a trophy.

## l03（1 处）

- `/scenes/l03/body/5/text`：L owns nuanced history and present decision; avoid one-sentence loyalty certificate.

## s01（3 处）

- `/scenes/s01/body/5/text`：S joking while acknowledging control habit and fatigue.
- `/scenes/s01/body/0/text`：Ground producer’s workload; foreground her small personal vulnerability.
- `/scenes/s01/choices/1/reply/1/text`：S instead of giving theme speech refers to piles of work.

## s02（1 处）

- `/scenes/s02/body/3/text`：Show personal stake and imperfect ambition instead of aphorism; stage budget risk.

## s03（1 处）

- `/scenes/s03/body/5/text`：S主动明示心意但给玩家机会回应；不再像面试问题。

## t01（3 处）

- `/scenes/t01/body/3/text`：T jokes at her own expense and echoes the visible lunchbox.
- `/scenes/t01/body/5/text`：Private/public boundaries and playful stage background.
- `/scenes/t01/body/2/text`：Make teasing clear; prior line was ambiguous.

## t02（1 处）

- `/scenes/t02/body/4/text`：Specific and justified surprise raises tension without instant blind belief.

## t03（1 处）

- `/scenes/t03/body/4/text`：T puts herself rather than her songs at stake, without assumed answer.

