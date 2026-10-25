## 25 October update

All three unresolved batch-08 localization entries now match their packaged map files without the `08` prefix. All 133 catalog scenarios have decoded data. Verification and source details are in dedicated research pages. Crop names omit Field, and plant pages do not show construction inputs. Sandbox crop availability remains under review; use scenario planting lists.

## Scenario extraction update — 24 October 2026

Scenario binary decoding now supplies exact objectives, day limits, build/plant lists, need flags and starting prefab inventories for 133 catalog maps. All 438 objective records across the complete extracted dataset match their world copies. See `dist/data/scenarios.json`. Three localization-only entries remain unresolved: Single08_C_Desert, Single08_L_CaveCove, Single08_R_VillageWinter. Preserve gameplay observations; older pending notes about objective decoding are superseded by this update. Runtime unlocks, missing legacy need defaults, yields and production timing remain open.

# Content notes

All displayed gameplay claims still need live verification. Do not remove the gameplay status merely because a decoder roundtrip passes.

Normalized rules and world catalogs are checked into dist/data. The world catalog preserves duplicate localization entries; the UI groups objectives by identifier and displays alternate text versions rather than treating them all as simultaneous objectives.

Building and resource directories combine same-name definitions for easier browsing; detail pages expose their other variants and retain stable numeric source routes.

Production step listings follow source ID order. They are not a verified execution schedule. A derived balance is not a throughput estimate.

To add gameplay evidence, preserve game version, scenario, biome, leader, staffing, resource amounts and observed outcome. Update only the claim actually tested, and keep its original decoded source.

Availability now has independent evidence in dist/data/availability.json. Oona remains included, flagged as user-reported unreleased; related update-28 data has public-release-unconfirmed status. Missing status defaults to unknown, never to released. Biome sandbox assignments are in dist/data/biomes.json and are distinct from campaign or challenge overrides.

The `/index/` route is an alphabetical back-of-book index of every canonical page. Aliases are excluded from that index but are included in route validation.
