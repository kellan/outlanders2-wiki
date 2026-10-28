## Larger text and better use of wide screens (2026-10-28)

A reader on the game's Discord said the font is small on desktop, wastes space and is hard to read. That's one report, so the change is deliberately modest:
- **Text size:** small text goes up throughout `src/style.css`, 9–12px by 2px and 13–14px by 1px, so table text is now 14px and table headings 12px. The body goes from 15px to 16px. Headings are unchanged.
- **Wide screens:** on screens 1600px and wider, the content area can grow from 1330px to 1520px.
- **Tables:** cells are vertically centred, so values line up with the icon and name in each row.
- **Phone infobox:** now one column with a 100px label. At the larger size, the two-column layout let labels like "Placement" run into their values.
