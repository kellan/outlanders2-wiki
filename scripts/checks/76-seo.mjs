// PR 76: search-engine and agent metadata, sitemap.xml, robots.txt, llms.txt and 404.html.
import assert from 'node:assert/strict';import fs from 'node:fs';import {root} from '../render-harness.mjs';
const page=p=>fs.readFileSync(root+p+'index.html','utf8'),meta=(h,re)=>(h.match(re)||[])[1];
const bakery=page('buildings/bakery/');
assert.ok(bakery.includes('<link rel="canonical" href="https://outlanders2wiki.com/buildings/bakery/">'),'canonical URL');
assert.match(meta(bakery,/<meta name="description" content="([^"]*)"/),/^Bakery \(Outlanders 2\): Bakers use fresh dough/,'page description from the field-guide text');
assert.ok(bakery.includes('og:title" content="Bakery · Outlanders 2 Wiki"')&&bakery.includes('twitter:card'),'link-preview tags');
const ld=JSON.parse(meta(bakery,/<script type="application\/ld\+json">(.*?)<\/script>/));assert.ok(ld['@graph'].some(x=>x['@type']==='BreadcrumbList')&&ld['@graph'].some(x=>x.about?.name==='Outlanders 2'),'structured data: breadcrumbs and the game');
const alias=page('building/bakery/');assert.ok(alias.includes('<link rel="canonical" href="https://outlanders2wiki.com/buildings/bakery/">')&&alias.includes('noindex, follow'),'old addresses point at the real page');
assert.ok(!page('buildings/bakery/').includes('noindex'),'real pages are indexable');
assert.match(meta(page('verification/buildings/bakery/'),/<title>([^<]*)<\/title>/),/^Bakery — research/,'research pages name their article');
const sitemap=fs.readFileSync(root+'sitemap.xml','utf8');assert.ok(sitemap.includes('<loc>https://outlanders2wiki.com/buildings/bakery/</loc>')&&!sitemap.includes('/building/bakery/'),'sitemap lists canonical pages only');
assert.ok(fs.readFileSync(root+'robots.txt','utf8').includes('Sitemap: https://outlanders2wiki.com/sitemap.xml'),'robots.txt points at the sitemap');
const llms=fs.readFileSync(root+'llms.txt','utf8');assert.ok(llms.startsWith('# Outlanders 2 Wiki')&&llms.includes('## Data downloads')&&llms.includes('[Bakery](https://outlanders2wiki.com/buildings/bakery/)'),'llms.txt');
const nf=fs.readFileSync(root+'404.html','utf8');assert.ok(nf.includes('noindex')&&nf.includes('href="/style.css"'),'404 page with root-relative assets');
let unique=new Set(),n=0;for(const p of JSON.parse(fs.readFileSync(root+'pages.json')).canonical_pages){unique.add(meta(page(p.path),/<meta name="description" content="([^"]*)"/));n++}
assert.ok(unique.size>n*0.85,`most pages have their own description (${unique.size} of ${n})`);
console.log(`PASS: canonical URLs, ${unique.size} distinct descriptions for ${n} pages, link previews, structured data, sitemap, robots.txt, llms.txt, 404.`);
