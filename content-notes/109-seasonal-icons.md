## Seasonal page icons (2026-11-08)

The maintainer sent a phone screenshot of the live Christmas page: the building icons filled the screen width.

**Cause:** `icon()` images are sized only inside tables (`td img`, 25 px), link lists (`.article-list img`) and cards. The seasonal pages put them in bare `<ul><li>`, where nothing sets their size.

**Fix:** buildings, plants and food are now two-column tables (Name, What it is).
- The link to the ordinary building survives as "Halloween look of the ordinary …".
- Unique items read "Only in … form", or "Made only at the … buildings above".
- A phone-width screenshot (iPhone 13 emulation) confirmed the icons render at 25 px.

**Checks:** check 109 asserts there is no `<li><img` on either page and that the icons sit in tables. Check 108's Two-Story House wording is updated.
