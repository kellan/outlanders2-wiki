## Site search (2026-10-28)

The maintainer asked for search and picked Pagefind from the libraries researched. Pagefind 1.5.2 is now a dev dependency, so run `npm ci` once before `npm run build`. Both workflows run `npm ci` first.

How it works:
- **Index:** `scripts/search.mjs` runs at the end of the build and writes `dist/pagefind/`, about 3.7 MB. Readers download only the chunks their search needs.
- **What's searchable:** canonical article and directory pages. Their `<main>` carries `data-pagefind-body`.
- **What's left out:**
  - old addresses (aliases);
  - research companion pages (each article links to its own);
  - spoiler pages;
  - 404;
  - the search page itself.
- **Kept out of excerpts:** breadcrumbs, eyebrows, the repeated infobox title, navboxes, evidence links and edit actions.
- **Result titles** come from the page title, so "Glassworks production chain" and "Glassworks" can be told apart.
- **Section filter:** each page carries one section: Buildings, Plants, Food, Resources, Production chains, Levels, Challenges, Tournament Mode, Leaders, Biomes, Mechanics, or Reference for everything else. The filter starts open on desktop and collapsed on phones.
- **Search box:** the top bar has one on every page. It submits to `/search/?q=…`, and the page runs that search straight away. It works without JavaScript up to the search page, which then points to the A–Z index.
- **Phone top bar:** to make room for the search box, the "A–Z index" and "Sources & research" links are hidden there. Both are still in the menu.

Known limits:
- Words that appear only in observation notes on research pages, such as "sudden rush", aren't found, because research pages aren't indexed.
- Some internal intermediates (CrucibleFull, ColdCrucible) rank high for their building's name, because their pages are short and mention it twice.
