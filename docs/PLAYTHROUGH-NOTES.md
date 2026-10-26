## 25 October update

All three unresolved batch-08 localization entries now match their packaged map files without the `08` prefix. All 133 catalog scenarios have decoded data. Verification and source details are in dedicated research pages. Crop names omit Field, and plant pages do not show construction inputs. Sandbox crop availability remains under review; use scenario planting lists.

## Scenario extraction update — 24 October 2026

Scenario binary decoding now supplies exact objectives, day limits, build/plant lists, need flags and starting prefab inventories for 133 catalog maps. All 438 objective records across the complete extracted dataset match their world copies. See `dist/data/scenarios.json`. Three localization-only entries remain unresolved: Single08_C_Desert, Single08_L_CaveCove, Single08_R_VillageWinter. Preserve gameplay observations; older pending notes about objective decoding are superseded by this update. Runtime unlocks, missing legacy need defaults, yields and production timing remain open.

# Pending gameplay observations

Menu inspection and an initial visit to a saved campaign level began on 2026-10-24. No controlled production-cycle test or fresh level completion has been performed. Verification flags remain pending unless a specific observation below supports the claim.

## Observed 2026-10-24

Installed application: version 30, build 254 (installation inventory). Evidence screenshots are in `../../gameplay-evidence/`.

- Campaign introduction: stories contain three levels focused on the same leader or town. It says finishing the first three stories in Campaign 1 allows entry into any campaign. This is observed UI wording, not a tested unlock sequence.
- Campaign 1 story order: Pablo's Quest, Miranda's Chance, Edgar's Growth, Maddy's Road, Pablo's Exit, Jaqweshia's Empire, Felix's Blackout. Evidence: `campaign-1.png`.
- Pablo's Quest levels: The End of the World (1/3), Middle Ground (2/3), A New Start (3/3). Evidence: `pablos-quest.png`. The same leader can have multiple stories, so the wiki should retain Campaign → Story → Level hierarchy and cross-link leaders.
- Challenge archive exposes six Type filters: Original, Redux, Bounty, Chill, Ranked, Remix. Evidence: `challenge-archive.png`. The Challenges introduction only describes three; do not use it as an exhaustive taxonomy.
- Introduction describes Redux as familiar levels with a twist; Bounty as producing or stocking as much of a resource as possible within a time limit; Original as handcrafted campaign-like levels. Evidence: `challenges-menu.png`. Detailed distinctions for Chill, Ranked, Remix remain unverified.
- Chill archive displays dates: Town of the Year 3/26/2025, Sugar Cove 3/12/2025, Dandelion Springs 2/26/2025, Beach Please! 2/12/2025, Picun's Secret 1/29/2025, Town Improvement 1/15/2025. These are displayed archive dates, not independently established first-release dates. Evidence: `chill-archive.png`.
- Town of the Year (Chill): reach population 100 and satisfy Happiness; optional objective have everyone settled; limit 80 days. Evidence: `town-of-the-year-objectives.png`. This establishes that a Chill example has a time limit; do not describe all Chill challenges as untimed.
- The End of the World: have a Foragers' Hut, have a Lumberjacks' Base, stock 6 Logs; optional recycle the Canoe. Evidence: `end-of-world-objectives.png`. Continued the user's already-completed save and inspected camera tutorial controls; completion checkmarks predated this session and are not our playthrough results.

Computer control initially failed with `noWindowsAvailable`; reconnecting eventually restored pointer clicks. Keyboard camera controls were observed: WASD pan, E/Q rotate, T/G zoom.

## First pass

- Inspect the challenge menu and identify the six user-reported challenge types. Record exact names, win conditions, time limits and scoring. Do not infer the taxonomy from localization key prefixes.
- Compare Evergreen (user-reported default) with Drylands hydration, Tropiclands Cooling, and Winterlands Heat. Record game terminology and actual penalties.
- Check Winterlands crop fields in context, especially greenhouse requirements. Sandbox assignment does not prove outdoor viability.
- Verify Oona/menu availability and installed version. Keep user-reported unreleased status until direct evidence updates it.
- Observe complete bakery, sawmill and windmill cycles with controlled staffing and storage.

Each observation needs game version, scenario, biome, leader, starting conditions, elapsed game time, outcome and screenshot evidence. Update the tested claim rather than removing all verification flags for an article.

## Follow-up observations, 2026-10-24

Pointer control resumed after the user foregrounded the game. Campaign 3 shows only Fjordi's Birthday, with Seventeen → Twenty-four → Thirty. Oona's Potion is absent. Campaign 2 has a seventh story, Pablo's Lost. Evidence: campaign-3.png and fjordis-birthday.png.

Inspected briefings for all six challenge categories; exact objectives and displayed limits are in dist/data/world.json under ui_observations and ../../gameplay-observations.json. No limit displayed is not proof that no limit exists. Leaderboard-duration text on archived challenges is historical wording, not evidence of a currently active leaderboard.

Continued the already-completed Counterspell save at Day 25, population 8, and paused it for field-guide inspection. Completion predates this session. No structures placed or staffing changed. Greenhouse guide confirms Winterland farming and Potato, Beet and Cabbage fields. Bakery, Windmill, Sawmill and Greenhouse cost/worker displays match extracted costs and staffing.

**Bakery discrepancy:** UI shows 1 Flour + 1 Stick → 8 Bread, while decoded balance gives 5 Flour + 4 Sticks → 40 Bread. Keep both, flag fuel consumption, and measure several complete cycles before resolving. Windmill UI shows 1 Wheat → 1 Flour; Sawmill UI shows 1 Log → 1 Plank. These are UI checks, not measured production outcomes.

Controlled cycle timing, biome penalties, scenario-specific build permissions and complete story-to-level menu verification remain pending.
