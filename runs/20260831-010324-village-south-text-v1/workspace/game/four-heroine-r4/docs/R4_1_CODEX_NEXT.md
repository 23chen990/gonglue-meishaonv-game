# Codex handoff: book-romance r4.1

Read ./R4_1_EDITORIAL_QA.md, ../START_HERE.md, ../docs/CODEX_HANDOFF.md, ../data/FORMAT.md and ../data/STORY.json first.

Target: 23chen990/gonglue-meishaonv-game; draft PR #1, branch feat/four-heroine-r4-1-editorial-20261012. Do not modify main or unrelated games. The current default game index and src/main.ts point to four-heroine-r4. The previous entry files are backed up under provenance/repository_prior_entry.

Work as Builder/Fixer under factory AGENTS.md gates. First run GitHub root pnpm lint/typecheck/test/build, then test actual Vite default index with fresh Chromium normal interaction (first five choices, 95-command route to finish, replay, localStorage after reload). Legacy rural tests should be recorded as obsolete and migrated/segregated; do not delete failures or claim old pass proves new default route. Keep the initial draft PR open until a distinct QA actor verifies.

Canonical source is data/STORY.json. Do not hand-edit only play.html, index.html, runtime.mjs or textHash. Use the merged factory romance-story-editor skill to check speakers, narrative causality, relationship stage, line identity, then rebuild and compare paths. The original corpus includes 225 scenes/737 choices/24 main endings/40 fate epilogues; lock original sets unless the user approves scope changes. 63 changes are documented in editorial_patch_r4_to_r4_1.json in this package.

Do not claim untested first-30-second hooks, real 3-5 minute emotional response, 10-20 minute retention, actual mobile storage, or platform compliance. Capture evidence with per-candidate hashes. Address A3b relationship credibility and sparse heroine visuals only when authorized, using independent player feedback.
