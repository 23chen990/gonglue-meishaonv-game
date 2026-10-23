# Active project: V23 romance visual novel

Repository: gonglue-meishaonv-game. Current development remains Draft PR #22, branch feat/first-night-playable-unified-20261017. Source root is runs/20260831-010324-village-south-text-v1/workspace/game/four-heroine-r4. The main branch is an old baseline. Do not merge or deploy. Historical instructions and earlier QA are preserved exactly in docs/AGENTS_HISTORY_BEFORE_V23.md, but obsolete versions are not current acceptance.

## User's latest product requirements
This is a phone-first romance visual novel, NOT a prose reader or relationship management questionnaire. One visible speaker, short natural turns, player responses via real choices. Bottom dialogue targets 1/4 and must not exceed 1/3 of portrait viewport, no internal scrolling, no font shrinking. The player should understand who/where/what happened without predicting every outcome. NO risk subtitles, moral lectures, warnings about losing heroines, automatic correct-answer advice, or score notifications. Mistakes, refusals, lies and consequences remain playable.

Four adult heroines: Tang Yingxue (singer), Shen Qingci (producer), Lin Jianyue (photographer), Gu Wantang (licensing). Make their attraction visible in different behavior, ordinary pleasures, playful awkwardness and voluntary invitations, not four identical boundary speeches. Do not make them all fall in love unconditionally. The transmigration setting, first-day stagehand Xu Zhao, art center and day-seven framing threat remain understandable at entry.

## V23 actual scope and source
44 scenes / 144 original actions: 4 first private conversations, 4 date confirmations, 36 personal episodes. tools/romance-v23-script.txt is the human-editable source; its strict parser compiles intentional character reactions rather than taking arbitrary first/last source sentences. Existing effects/history and endings are unchanged. Necessary visible physical actions use brief cues until appropriate CG exists; do not claim these cues are new art.

Critical semantic checks: t05/closer is a kiss and the option must say so; t02 partial revelation cannot disclose the whole novel; t02/t06 knowledge depends on actual history; rescue is not successful until the COLD music switch; acquiring g07 proof has a visible, consented recording. Old presentation cursor migration uses the script hash, never deletes canonical commands. Avoid duplicate long-source-plus-short-payoff playback in the first night.

## Verification and safety
Do NOT edit STORY.json or tools/engine.mjs in this presentation pass. Story SHA-256: 84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93. Keep 228 scenes, 751 canonical choices, ending rules, consent, conditions and saved histories. Build via tools/build-preview.mjs; never hand-edit generated play.html/index.html/runtime.mjs. Both standalone and module bundles require all ROMANCE_* declarations.

qa=v22 retains previous exact-text contracts, not V23 acceptance. Current default has independent 143-action checks and 4 full blank-save-to-romance-ending touch routes. t05/ordinary is preserved but has no real-route browser fixture in this batch: do not report 144 browser branches. Run original npm verify, root pnpm verify, all historical native regression scripts and new tests. Do not lower readability or touch standards to make tests pass.

V23 local Chromium testing used offline content and explicitly simulated localStorage because HTTP navigation was blocked. GitHub Actions provides actual HTTP Chromium/WebKit evidence. Do not call simulations physical-phone or human playtests. Scene-specific high-quality licensed CG, consistent characters, real mobile devices and unassisted adult players remain release blockers. Read docs/ROMANCE_V23_CHEMISTRY_REWRITE_ZH.md before continuing.
