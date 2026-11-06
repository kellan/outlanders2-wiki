## Production-step and plant-chain pages retired; research pages noindex (2026-11-06)

First step of `docs/EDITORIAL-CLEANUP-PLAN.md`.

- **Production steps.** The 184 unnamed resources (`publicly_named: false`) are internal stages of a building's recipe. Players never see them in game, so they no longer get a reader page, an A–Z entry, a search entry or a sitemap entry, and the resources catalog loses its "Include intermediates" tab. Each old address redirects to the building that makes the step (or uses it, when nothing makes it), choosing the building available on the most levels when several qualify; gear items go to the Gear page; anything else goes to the Resources catalog. The records stay in `content/resources/` and their research pages stay.
- **Plant production chains.** The 64 chain pages for plants (half of them `field-` duplicates) held only an unordered step dump. They redirect to the plant page.
- **Research pages.** The `/verification/` pages carry `noindex, follow` and are left out of `sitemap.xml`. They were 905 of 1,857 sitemap URLs. They remain public, linked from each article, and were already out of site search and `llms.txt`.
