# Shallow marshes as a bullet

The maintainer found the Shallow marshes section added in PR 122 too much for the page. It is now one bullet in "Other things that change speed": ×0.7, slower uphill, villagers route around marshes, a road over one gets back to about bare-ground speed. The detail (slope clamp 0.3–0.7, path cost 1.5 against 1.1, sand share of Oona's levels, code references) stays in `decoded-mechanics.json` `walking.sink_in_sand`, the Wetlands terrain note and research docs/RELEASE-32-257.md.

Also at the maintainer's request: the walking page header and trip table drop "not timed in play", and the Wetlands terrain note drops "stored as Sand tiles" (the internal tile type stays in the data).
