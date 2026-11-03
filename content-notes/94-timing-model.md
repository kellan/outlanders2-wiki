## One timing model for estimates (2026-11-03)

The maintainer asked how to keep the base calculations reusable. They had been spread across page code and several data sections.

**Research repo (main, commit 390d5a2)**
- `data/timing-model.json`, built by `tools/build_timing_model.py`:
  - 42 constants, each with value, unit, source (class and field or method) and status (decoded, assumed or measured).
  - Checked against versions 30 (254) and 31 (255).
  - Still assumed: `handling_seconds` (1 s), `items_per_trip` (1) and `units_per_square` (2).
- `docs/TIMING-MODEL.md` holds the formulas: speed per step, round trip, unloading, refund, road cost and payback.
- `tools/timing_model.py` implements them, and `tests/test_timing_model.py` pins the worked examples shown on the wiki.

**Wiki**
- The model is copied into `decoded-mechanics.json` as `timing_model`.
- The Recycling page (worked examples, refund line), the building refund rows and the Roads and walking page (example table, road cost and payback) now read their constants with `TM(key)`. No hard-coded handling time, shift length or refund rate remains.
- Duplicates removed: `walking.road_cost` (only the office id is kept), the timing fields in `recycle_stock.unloading`, and `recycle_stock.refund.finished_multiplier`.
- Check 94 confirms that:
  - every constant has a unit, source and status;
  - no duplicate constants remain;
  - the pages show the same worked examples as the research tests.

**Updating:** when a play test confirms a value, set its status to `measured` with `measured_by` in research, rebuild, and copy the file across.
