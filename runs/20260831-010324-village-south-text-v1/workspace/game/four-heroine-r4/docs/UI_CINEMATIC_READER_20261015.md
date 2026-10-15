# v4.12 UI-only cinematic reader | Design and QA contract

Baseline: PR #9 source HEAD `df09a225a2d96ea371587f7f503d7d04065f8330`. This branch changes presentation only; **story, engine, choices, IDs, effects, schema and story hash are out of scope**.

## Root-cause audit (source-verified, not a fresh device run)
- Previously `paginate()` produced pages only for `ENTRY_WAKE`; most other scenes and choices entered one scrolling `.vn-scroll`.
- Previous reader permanently occupied 63% of viewport, with a separately scrolling bottom dock.
- Reader-expansion burdened normal play; portrait often only became decorative.
- `semanticGroups` are navigation only and do not resolve the 16 unfinished genuine two-stage decisions (Issue #3).
- This implementation preserves the fixed first 28 beats / 7 advances and the first `canon/rescue/investigate` fork.

## Direction selection
A — fixed full-bleed scene + variable dialogue layer (chosen): stronger portrait focus, less page-scrolling, compatible with current canonical command engine. B — long webtoon-style vertical frames (rejected): simpler but too similar to scrolling fiction and leaves cast as decoration.

## Interaction contract
1. Ordinary speech and narration: 1–3 coherent turns or ~205 characters per presented beat; short scenes do not acquire spurious gates. A long canonical text row can be presentation-sliced at sentence boundaries; engine row IDs and text are never edited.
2. Tap noninteractive scene/dialogue to advance only when the currently displayed page allows it; never tap-to-select. Existing visible Next control remains for motor accessibility and QA.
3. Inner voice: a low-contrast intimate mode; isolated short emotional pause when a B-speaker line ends in an expressive mark. No timed auto-advance.
4. Decisions: independent larger layout, choices appear only after all mandatory beats. Do not change number or identity of engine-enabled actions; overflow choice categories remain navigation only.
5. Replies: separate feedback mode, before next consequential action.
6. Large type, short viewport and safe areas: adjust dialogue proportions by mode; scroll inside a panel only when text exceeds physical height, and do not hide accessible actions.
7. History, rewind, migratable localStorage, back-ups and command replays remain untouched. `ui.page` continues to mean reading position, not a story command.
8. First fork: seven Next clicks stay stable for existing saved reading progress/tests; no early fork exposure.
9. Other routes: all 228 canonical scenes still use the same renderer and interpreter. No static-scene substitution.

## Fresh QA to require
- Playwright native HTTP on exact new HEAD: intro all three forks at 320×568 / 360×780 / 375×812 / 390×844 / 430×932, large font, short text and dialogue, long multi-page text, accidental scroll vs tap, choice guards, menu and history, reload, migration, four solo romance routes and group route.
- `npm run verify`, root `pnpm verify`, baseline existing native browser tests and QA artifact review.
- Real iOS Safari/Android Chrome manual test and independent human blind play remain NOT_RUN.
- CI generated-asset integrity: changes to UI JS/CSS require regenerating and committing the canonical play/index/runtime/build-meta/default index output. Until this has completed and fresh CI passes, **this branch is a draft, not an approved player build**.

## Safe editorial integration
Editorial PR owns `data/STORY.json`, text hashes and story artifacts. UI PR owns `tools/preview-ui.js`, `tools/vn.css`, interaction-only tests and this document.
After editorial HEAD freezes, merge/rebase UI sources onto that exact editorial HEAD, regenerate generated output only once from the final `STORY.json`, and verify SHA across entrypoints, saved-game migration, mandatory 28 beats, all three branches and CI. No merge to main or release without a separate user decision.
