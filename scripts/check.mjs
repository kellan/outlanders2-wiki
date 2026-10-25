import fs from 'node:fs';import assert from 'node:assert/strict';import {harness,root} from './render-harness.mjs';
let count=0,links=0;const h=await harness();assert.ok(h.pages.length>600);
for(const [route,rec] of Object.entries(h.lookup)){
 const html=h.render(route);assert.ok(html.length>100,'Empty '+route);assert.ok(!html.includes('[object Object]'),'Object '+route);
 for(const m of html.matchAll(/href="\/(?!\/)([^"]*)"/g)){
  const p=m[1];if(p.startsWith('data/')||p.startsWith('gameplay-evidence/')){assert.ok(fs.existsSync(root+p));continue}assert.ok(h.lookup[p],`Broken article link /${p} on /${route}`);links++;
 }
 count++;
}
assert.equal(h.lookup['buildings/bakery/'].type,'buildings');assert.equal(h.lookup['food/bread/'].type,'resources');assert.equal(h.lookup['building/bakery/'],h.lookup['buildings/bakery/']);
assert.ok(h.render('food/bread/').includes('/buildings/bakery/'));assert.ok(h.render('buildings/bakery/').includes('/production-chains/bakery/'));assert.ok(h.render('index/').includes('letter-B'));assert.ok(h.render('heroes/oona/').includes('Unreleased · user report'));assert.ok(h.render('biomes/evergreen/').includes('Available plants and buildings depend on the scenario'));assert.ok(h.render('biomes/tropiclands/').includes('Cooling'));
for(const q of ['bread','Pablo','Evergreen','Morrigwyn','no-such-entry'])assert.ok(h.query(q).length>100);
const sub=await harness('/outlanders2-wiki/');assert.ok(sub.render('food/bread/').includes('href="/outlanders2-wiki/buildings/bakery/"'));
const artwork=JSON.parse(fs.readFileSync(root+'data/artwork.json'));let images=0;for(const k of ['buildings','resources','leaders','biomes'])for(const a of Object.values(artwork[k])){assert.ok(fs.existsSync(root+a.path),a.path);images++}
if(fs.existsSync(root+'pages.json'))for(const p of JSON.parse(fs.readFileSync(root+'pages.json')).paths){const html=fs.readFileSync(root+p+'index.html','utf8');assert.ok(html.includes('<main'));for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){if(/^(https?:|data:|mailto:)/.test(m[1]))continue;const target=new URL(m[1],'file://'+root+p+'index.html');const path=decodeURIComponent(target.pathname);assert.ok(fs.existsSync(path),`Missing static target ${m[1]} from ${p}`)}}
console.log(`PASS: ${count} routes; ${links} article links; ${images} artwork links; search, index, availability, biome crops and GitHub project-prefix paths.`);
