# Mobile visual-novel reader | Design and QA contract

Baseline for this correction: PR #17 source HEAD `6488938fcedfd7fd7e2f2872f3151cd07231cf1b`. This branch changes presentation only. Canonical story text, engine choices, IDs, effects, endings and save-command history remain protected.

## Why the previous reader was rejected

The earlier contract was too close to a scrolling fiction reader: it allowed 1-3 turns on one page, grouped the 28 opening beats into seven advances, and retained expand/inner-scroll fallbacks. Those rules made the screen text-dominant and let engineering tests dictate the reading rhythm.

Those rules are removed. Old tests must migrate to the mobile-VN contract below; grouped dialogue must never be restored merely to recover a historical click count.

## Hard interaction contract

1. **One source turn at a time.** Normal play displays at most one authored speaker/turn in the dialogue sheet. Prior turns disappear instead of accumulating into a transcript.
2. **Long lines continue, never scroll.** If one person's turn cannot fit, split it at measured grapheme/sentence boundaries. Pressing “继续” shows the remaining part with the same speaker. The source row and canonical text are not rewritten.
3. **Small bottom sheet.** On normal portrait phones the whole dialogue sheet, including speaker, text, Continue and safe area, targets 25% of the viewport. Large type or very short screens may use up to one third. It must never exceed one third.
4. **No inner scrolling or reader expansion in normal play.** Do not shrink text to make a paragraph fit, clip legal text, or offer an “expand novel panel” escape hatch. Paginate instead.
5. **Choices are separate from dialogue.** Consequential actions render above the dialogue sheet. If many legal actions cannot fit, presentation-only option paging/category navigation is allowed; it must not consume a story command or hide an action.
6. **Narration should become staging where safe.** Facts that can be shown by an existing background, portrait, prop, label, action or reaction should be represented visually. Visual replacements are hash-guarded and must retain accessible source descriptions. Unconverted narration remains losslessly paginated until it receives deliberate directing.
7. **No timed auto-advance.** Reading advances only by explicit player input. Touching noninteractive stage/dialogue may advance where already supported, but must never select an option.
8. **Save compatibility follows source position.** New saves store source-row/grapheme anchors. Historical grouped-page cursors resume at the beginning of their current scene rather than guessing a new page and accidentally skipping text.
9. **History remains available outside normal play.** A menu/history surface can show prior text; the normal gameplay surface must not become a scrollable transcript.
10. **Canonical decisions remain canonical.** The 16 genuine two-stage narrative decisions stay engine-owned. UI grouping/paging must never replace them with fake front-end choices.

## Opening directing pass

The first correction includes hash-guarded visual presentation for selected opening beats and first-fork replies: phone/novel evidence, blackout, backstage wake-up, ID badge, venue placard, piano cue, character reveal, physical pain/control console, remembered USB location, standoff, handover form and obtained/evidence USB states.

This is **not** a claim that all narration has been converted to final art. It is the start of a scene-by-scene directing pass. Existing opaque RGB character art is treated as full-frame illustration rather than pretending it is a transparent cutout.

## Acceptance contract

For 320×568, 360×780, 375×812, 390×844 and 430×932 portrait layouts, plus large type and short-height cases:

- each reading page has at most one visible text block/speaker;
- the dialogue text area has no hidden vertical overflow and cannot be scrolled;
- normal portrait dialogue sheet is <= 1/4 viewport; every supported mode is <= 1/3;
- all 28 authored opening source beats are traversed in order before the first `canon/rescue/investigate` choice appears;
- long turns preserve all source characters and speaker identity across continuation pages;
- choices remain >=44px touch targets and all enabled actions stay reachable;
- viewport/font changes preserve the current source turn;
- old saves never interpret historical grouped page numbers as new single-turn indices;
- story hash, engine, choice history and endings remain unchanged.

Engineering browser acceptance is not a substitute for physical-phone or human-play acceptance. Real iOS/Android devices, independent adult blind play, final commercial art rights and platform/IAA release remain separate gates.

## Research boundary

This contract is driven by the user's explicit mobile-VN requirements and by public visual-storytelling references. Public store creatives or official directing docs do **not** prove exact competitor client ratios or overflow behavior, and must not be described as hands-on competitor-client testing.
