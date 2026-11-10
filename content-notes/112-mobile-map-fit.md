## Level maps on phones (2026-11-10)

The maintainer reported that the new level map wasn't scaling well on mobile.

**Cause**
- In a fresh build at iPhone 13 width (390 px), the map scales correctly (350 px wide) because `.level-map img{max-width:100%}` is in `style.css`.
- But `style.css` and `page.js` were linked without a version, so a phone can keep a cached copy from before the deploy. Without the new rule, the 692 px image shows at full size on a 390 px screen.

**Fix**
- The map `<img>` carries an inline `style="max-width:100%;height:auto"`, so it fits whatever stylesheet is loaded. With the stylesheet blocked entirely, it renders 310 px wide in its column.
- `scripts/build.mjs` stamps the stylesheet and page script links with a short content hash (`style.css?v=…`, `page.js?v=…`), so every deploy that changes them is fetched fresh.
- Check 76's 404-page assertion now accepts the stamp.

Check 112 covers this.
