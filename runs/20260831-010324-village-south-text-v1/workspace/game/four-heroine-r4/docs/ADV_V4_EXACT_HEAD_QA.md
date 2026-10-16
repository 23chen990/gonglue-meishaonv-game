# ADV V4 exact-head QA handoff

This is a documentation-only CI synchronization marker. The preceding generated-player commit is 988035234b59f9d0afeb5b311f46cdd4a63fb6cc.

Acceptance boundary:
- The canonical STORY.json and engine remain protected; image assets are tracked and bundled by tools/build-preview.mjs.
- The first decision follows 10 reading beats. The choice screen has a loaded scene CG, **not** a heroine-card picker.
- The source and generated entry points must be checked together at one exact branch head.
- Re-run Chromium/WebKit/native route tests, save migration, 320px large font, direct 3-way choice and full game routes.
- This document adds no runtime behavior or generated files, and deliberately does not trigger the controlled image bundle regeneration.
- Physical phones, human first-30-second interest, final CG rights and all 228 individualized cuts remain out of scope of automated CI.
