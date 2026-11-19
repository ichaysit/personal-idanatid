## Session 1 — 2026-11-19

**Strategy:** Talking-head reel (Hebrew) presenting 3 Claude video-editing skills/repos. Tight jump cuts on silences, alternating 1.0/1.1 framing to hide jumps, calm small captions at the bottom, Liquid Glass repo screenshot card top-left (~2.8s) when each repo is named, glass "תגיבו סקיל" pill on the CTA.
**Decisions:** Dropped 15–22s (turning away / paper), pauses, the first CTA take (kept the retake 64.92–70.30), and the phone-drop ending. Repo mapping: #1 mattypark/Motion-graphics-skill, #2 digitalsamba/claude-code-video-toolkit, #3 browser-use/video-use.
**Reasoning log:** Segments re-extracted frame-exact (n/60 s) after the first pass drifted A/V by ~0.14s. Caption text corrected from ASR (נערך, הוקים, בקלוד, Beat-Sync).
**Outstanding:** Verify repo #2/#3 mapping with the user.

## Session 2 — 2026-11-19

**Strategy:** Night pass after feedback: cut stutters/hesitations, readable GitHub cards, purposeful VFX + SFX.
**Decisions:** EDL split into 24 segments; every internal pause ≥0.25s trimmed to ~0.12s (Beat-Sync spelling, "לכל הקטעים", etc.). Voice cleaned locally (afftdn, EQ, de-esser, compressor) — Adobe Enhance Speech blocked by network allowlist (at.adobe.com) and needs user approval. Cards: 1960px wide glass card with slow zoom toward the repo title, 3.4s. SFX synthesized (numpy): impact on open + "wait" beat (with riser, flash, shake), ding on "נערך ע״י Claude" pill, whoosh/swish on cards, soft tick on beat cuts, pop+ding on CTA. Timeline data generated into src/reposTimeline.ts from edl.json.
**Outstanding:** Confirm repo #2/#3 mapping; optionally allow Adobe hosts for Enhance Speech; music bed (vidIQ needs 25 credits, 24 left).
