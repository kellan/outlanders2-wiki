# Slope limit

From the maintainer's research pushes of 22 November 2026 (research 249d401, 738d560), on "There are some more pushes to research, anything helpful?".

The version 32 scene files added to the research snapshot (`snapshots/macos-32-257/scene-index.json`) decode `Level.MaxHeightMultiplier` as 0.825 in all eight terrain scenes. `Level.GetSlopeSpeedMultiplier` is 1 + clamp(height drop ÷ horizontal distance, −0.825, +0.825) (research `docs/WALKING.md`), so the multiplier runs from 0.175 uphill to 1.825 downhill on the steepest ground. Stored as `walking.slope_cap` in decoded-mechanics; the Roads and walking page reads it. The INFORMATION-NEEDED walking row drops the slope cap from its unknowns.

The same scene files confirm `LevelSwamp.TileMapMesh.SinkInTheSand = true` (only the Wetlands scene), which matches the marsh bullet; nothing changes there. The Beehive and Barley Porridge icon fix from the same pushes is the Mac agent's PR 134.
