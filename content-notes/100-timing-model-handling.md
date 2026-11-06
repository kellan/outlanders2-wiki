## Timing model re-copied: handling times decoded (2026-11-06)

Research PR 16 (the ported simulator) replaced the assumed handling time of 1.0 s with clip lengths decoded from each item's carry style:
- two hands: 1.32 s per pick-up or drop;
- shoulder (Logs, Glass): 3.58 s from the ground;
- sacks (Wheat, Flour, Barley): 3.58 s to pick up, 2.67 s to drop;
- one hand: 1.65 s.

It also marked one item per trip as decoded, and asked for the wiki copy to be re-exported. This PR copies research `data/timing-model.json` again.

**Logs fix (research 5b344cd):** the research Lumberjack unloading example still used the two-hand time. Logs are carried on the shoulder, so the research test and `unload_seconds` now take a handling argument, and the wiki example uses `handling_shoulder_seconds`. The Roadworks Office haul already used it in research; the wiki code had a hard-coded 2 s, which is now replaced.

**Numbers that moved**

| Example | Before | Now |
|---|---|---|
| Lumberjack, 30 Logs, 2 workers, Warehouse 5 units away | 2.2 min | 3.4 min |
| Lumberjack, Warehouse 17 units away | 6.1 min | 7.4 min |
| Lumberjack, nothing in reach | 50 s | 2.1 min |
| Full Warehouse, 216 items to another Warehouse | 26.2 min | 27 min |
| Full Warehouse, nothing in reach | 4 min | 4.8 min |
| Road example round trip on bare ground | 62 s | 63 s |
| Road example, Road in Boots | 4.8 trips a shift | 4.7 |
| Roadworks Office setup | 4.5–7.1 min | 5.5–8.2 min |
| Office payback | 3–6 days | 4–6 days |

- The Recycling page prose now says pick-up takes about 1.32 s (Logs 3.58 s), and the drop-beside time is computed rather than "under a minute".
- Checks 92, 93 and 94 were updated to the new numbers. Check 94 now expects handling and items per trip to be decoded; only `units_per_square` is still assumed.
- New check 100.
