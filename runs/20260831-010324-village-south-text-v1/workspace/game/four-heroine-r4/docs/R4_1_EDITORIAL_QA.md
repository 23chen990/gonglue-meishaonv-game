# r4.1 Editorial and Runtime QA (2026-10-12)

## Canonical scope and provenance

- Game: four-heroine book-transmigration interactive romance (Xu Zhao, Tang Yingxue, Shen Qingci, Lin Jianyue, Gu Wantang).
- Prior local formal source: revision-r4.0, sha256 577db875a0a664b4cba8c301e9169f60b9aa831ee97e9fdd9f03368dcdea7bf3.
- Candidate r4.1 canonical data/STORY.json: sha256 d8ebd4d349b7560b07c181b818b4793566a901e03d3127ced7612dfba4079d8e.
- Edited 63 display-text locations in 32 scenes. The edits are speaker/line-ID bound and cover comprehension of waking up, first heroine contact, consent, scene causality, late-stage invitations, and distinct character voice.
- This is a textual editorial candidate. No character identity/condition/effects/scene routing/ending logic was intentionally changed.

## Tests executed on this exact candidate

| Test | Status | Evidence and scope |
| --- | --- | --- |
| Text-only structural guard | PASS | editorial_guard_report.json; original data, conditions, choices, line speaker and textHash are preserved |
| npm run verify (r4 complete local delivery) | PASS | ../editorial_verify.log; all packaged deterministic tests, graph coverage and export |
| Formal graph audit | PASS | 225 scenes, 737 choices, 24 main endings, 40 epilogues, 565 conditionally displayed blocks with command witnesses |
| Chromium offline fixture UI | PASS 12/12 | qa/current/browser/fixture-ui/ui-report.json (current story sha). Includes five opening choices, click/drag, untrusted imports, save reconstruction, viewports, memory-only boot |
| Chromium four-heroine normal touch path | PASS 1/1 | qa/current/browser/fixture-reader/reader-chromium-FULL_FOUR_ORDINARY_TOUCH_AND_REWIND-report.json. 95 ordinary touch commands to R_glst, history, rewind, skip-read check. Simulated storage, NOT native persistence |
| Browser archive and bonus readback | PASS 1/1 | qa/current/browser/fixture-reader/reader-chromium-ALL_MAIN_ENDINGS_BONUS_AND_READ_ONLY_ARCHIVES-report.json. Validated command-file imports and read-only archive behavior |
| Actual URL startup in current environment | BLOCKED | qa/current/browser/native-ui/ui-report.json; ERR_BLOCKED_BY_ADMINISTRATOR. Do not silently replace with fixture and claim native success |
| Original game repository Vite build after changing default entry | NOT_RUN | Old main root build dependencies unavailable here. Branch carries src/main.ts, index.html and archived previous entry, but must run root pnpm build/verify in GitHub/Codex checkout |
| Physical iOS/Android and true persistent storage | NOT_RUN | Still necessary |
| Four heroine attractiveness and real 30s / 3-5m / 10-20m retention | NOT_RUN | Editorial self-review is not a human blind trial |
| WeChat/Douyin/TapTap mini-game release verification | NOT_RUN | Browser HTML is not a platform submission |

## Unresolved player-facing risks (do not mark fixed)

1. The first meaningful original-plot choice follows three information/recovery screens. The delay and comprehension are plausible but unmeasured with first-time players; this could miss the 30-second hook target.
2. Character introduction is still predominantly text and CSS cards. No final heroine portraits, facial expression assets, CG, or professionally timed effects are supplied. Passing the 360px screenshot gate does not mean the reader matches commercial romance titles.
3. Scene A3b offers four invitations regardless of the player's earlier relationship depth. Though invitations have distinct professional/personal pretexts, the subjective credibility of simultaneous invitations still needs independent branch-context review.
4. The local demo uses simulated storage for the passing browser tests; do not claim save durability or cross-device migration.
5. The default GitHub workspace historically runs an older rural baseline. Prior tests that assume this legacy entry must be migrated rather than credited as r4 runtime QA.

## Editorial judgment

The revision improves specificity over the old draft: Xu Zhao reacts to concrete surroundings; Lu Jingxing has an independent piano contingency; Tang responds through performing/musical timing; Shen manages documented work and exhaustion; Lin is concerned about consent and documentary integrity; Gu independently verifies investor paperwork. No line was changed solely because a generic detector flagged it. For the next candidate prioritize a neutral fresh-reader comprehension study, heroine-liking signal, and one or two high-impact first-meeting character moments. Do not claim that an AI or the author has proven attraction.

## Handoff and promotion

- GitHub game draft PR: https://github.com/23chen990/gonglue-meishaonv-game/pull/1
- GitHub factory skill merged: https://github.com/23chen990/ai-mini-game-factory/pull/6
- Do not merge the game draft PR as release-ready. First perform repository Vite build and new default-entry natural browser test, rectify obsolete tests without cheating, then independent reviewer/player testing. Re-run tests after each future content change and rebind SHA in the reports.
