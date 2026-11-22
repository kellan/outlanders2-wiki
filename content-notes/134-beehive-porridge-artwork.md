# Beehive and Barley Porridge artwork

Corrects the two white-only glyphs using the installed macOS build 32 (257), extracted 22 November 2026. The same glyphs are shared by Honey and Porridge Cookhouse, so their references are corrected too.

The old fallback fill was computed from incomplete line-only exports. The replacement uses the actual background and line sprites, preserving each complete source rectangle and their common alignment, tinted with UIInfo's white background and dark line colours. No pixels were drawn by hand. The two old IDs are removed from the synthetic-fill manifest so it cannot override the replacements. New filenames avoid stale browser caches.

Matched by localization key, not cross-build numeric ID: Building.Beehive -> ContentBehaviour 324221, IconDefinition 313109 (HoneyPotIcon), background sprite 10179, lines 10708. Resource.BarleyPorridge -> ContentBehaviour 357393, IconDefinition 313096, background 10207, lines 10162. Baseline wiki IDs are retained for page identity.

Reproduction and source definitions: private research repo tools/export_corrected_food_artwork.py and data/artwork-fixes-2026-11-22/. The installed game was read only. Both transparent glyphs were visually inspected. This change does not alter recipes or gameplay claims.
