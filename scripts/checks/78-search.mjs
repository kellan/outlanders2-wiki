// PR 78: site search with Pagefind. Which pages are indexed, what is left out of results, the
// section filter, the /search/ page and the top-bar search box.
import assert from 'node:assert/strict';import fs from 'node:fs';import {root} from '../render-harness.mjs';
const page=p=>fs.readFileSync(root+p+'index.html','utf8');
assert.ok(fs.existsSync(root+'pagefind/pagefind.js')&&fs.existsSync(root+'pagefind/pagefind-ui.js'),'the build writes the Pagefind index and UI');
const search=page('search/');
assert.ok(search.includes('noindex')&&search.includes('new PagefindUI(')&&search.includes("bundlePath:'../pagefind/'")&&search.includes('triggerSearch(q)'),'search page loads Pagefind and runs ?q= searches');
assert.ok(!search.includes('data-pagefind-body'),'the search page is not itself a result');
const bakery=page('buildings/bakery/');
assert.ok(bakery.includes('<main id="content" tabindex="-1" data-pagefind-body>'),'article pages are indexed');
assert.ok(bakery.includes('data-pagefind-filter="section:Buildings"')&&bakery.includes('data-pagefind-meta="title">Bakery</span>'),'section filter and result title');
assert.ok(bakery.includes('<div class="crumbs" data-pagefind-ignore>')&&bakery.includes('<p class="eyebrow" data-pagefind-ignore>'),'breadcrumbs and eyebrows stay out of excerpts');
assert.match(page('production-chains/glassworks/'),/data-pagefind-meta="title">Glassworks production chain<\/span>/,'same-named pages get distinct result titles');
assert.match(page('resources/glass-pane/'),/section:Resources/);assert.match(page('levels/'),/data-pagefind-body/,'directory pages are indexed');
for(const p of ['building/bakery/','verification/buildings/bakery/'])assert.ok(!page(p).includes('data-pagefind-body'),`${p} is not indexed`);
assert.ok(!fs.readFileSync(root+'404.html','utf8').includes('data-pagefind-body'),'404 is not indexed');
for(const p of JSON.parse(fs.readFileSync(root+'pages.json')).canonical_pages.filter(p=>p.spoiler))assert.ok(!page(p.path).includes('data-pagefind-body'),`spoiler page ${p.path} is not indexed`);
assert.match(bakery,/<form class="top-search" action="\.\.\/\.\.\/search\/" method="get" role="search"><input type="search" name="q"/,'top-bar search box points at the search page');
console.log('PASS: Pagefind index, search page, indexed and excluded pages, section filter, result titles, top-bar search.');
