## Larger text and better use of wide screens (2026-10-28)

A reader on the game's Discord said the font is small on desktop, wastes space and is hard to read. That's one report, so the change is deliberately modest:
- **Text size:** small text goes up throughout `src/style.css`, 9–12px by 2px and 13–14px by 1px, so table text is now 14px and table headings 12px. The body goes from 15px to 16px. Headings are unchanged.
- **Wide screens:** on screens 1600px and wider, the content area can grow from 1330px to 1520px.
- **Tables:** cells are vertically centred, so values line up with the icon and name in each row.
- **Phone infobox:** now one column with a 100px label. At the larger size, the two-column layout let labels like "Placement" run into their values.

**Respecting the reader's text size.** The maintainer asked whether the site honours a reader's text-size setting. It didn't: every font size was in px, so browser zoom worked but the browser's default font size setting had no effect. All 164 font sizes are now in rem (px ÷ 16), so the default look is unchanged and a reader who picks larger text gets it.

The containers that hold text scale too: the sidebar width, the infobox and its label column, the navbox label column, and the numbered-step circles.

Checked with the root font at 24px (a 150% text setting) on the Resources, Bakery and home pages, at 1440px and 390px. No text overflows and nothing scrolls sideways. `scripts/checks/77-readability.mjs` stops px font sizes coming back.
