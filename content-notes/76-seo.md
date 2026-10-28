## Search engines and AI assistants (2026-10-28)

The maintainer asked what we could do to help search engines and chat agents find the wiki. Before this change:
- every page shared one meta description;
- there were no canonical links, sitemap, robots.txt, link-preview tags, structured data, llms.txt or 404 page;
- the 349 old addresses (aliases) were full copies of their pages.

`scripts/seo.mjs` now runs inside the build:
- **Descriptions:** each page gets its own, starting with the page name and "(Outlanders 2)". The text is the field-guide description, the page's header summary or its first paragraph, followed by infobox facts while there's room. About 1,200 of 1,329 pages end up with a unique one; the rest are mostly same-named records such as the Fondue variants. The home page keeps the site description.
- **Canonical URLs** use the domain in `assets/CNAME`. Old addresses keep their content but point their canonical link at the real page and are marked `noindex, follow`.
- **Link previews:** Open Graph and Twitter card tags, using the page's own icon or portrait, or the Evergreen island picture as the fallback.
- **Structured data:** JSON-LD with the website, the page, its breadcrumbs, and `about` Outlanders 2 (a VideoGame by Pomelo Games).
- **Research pages** are now titled after their article ("Bakery — research").
- **Root files:**
  - `sitemap.xml` lists the canonical pages only.
  - `robots.txt` allows all crawlers, AI assistants included, at the maintainer's request for agent visibility, and points to the sitemap.
  - `llms.txt` describes the wiki for agents: sections, the JSON downloads, and every entity page with its description.
  - `404.html` uses root-relative assets, so it works at any depth.

Still the maintainer's to do: verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap, then build links (subreddit, Steam guide, the game's Discord, the developer).
