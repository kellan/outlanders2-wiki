// PR 112: level maps fit phones even with a stale cached stylesheet; stylesheet and page script carry a version stamp.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness,root} from '../render-harness.mjs';
const h=await harness();
assert.match(h.render('levels/Level06A/'),/<img src="[^"]*level-maps\/Level06A\.png" width="\d+" height="\d+" style="max-width:100%;height:auto[^"]*"/,'map image sizes itself without the stylesheet');
const page=fs.readFileSync(root+'levels/storefront/index.html','utf8');
assert.match(page,/<link rel="stylesheet" href="\.\.\/\.\.\/style\.css\?v=[0-9a-z]+">/,'versioned stylesheet');
assert.match(page,/<script src="\.\.\/\.\.\/page\.js\?v=[0-9a-z]+"/,'versioned page script');
const v=page.match(/style\.css\?v=([0-9a-z]+)/)[1],home=fs.readFileSync(root+'index.html','utf8');
assert.ok(home.includes('style.css?v='+v),'same stamp on every page');
console.log('PASS: map image sizes itself; stylesheet and script are version-stamped ('+v+').');
