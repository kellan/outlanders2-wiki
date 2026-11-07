// PR 104: every building page lists where it starts on the map, and where objectives ask for it before it is offered.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const au=strip(h.render('buildings/author-s-stand/'));
assert.ok(au.includes('Starts on the map Already on the map, or there as a site to finish, at the start of 1 level; there it is not on the build list')&&au.includes('Where Am I?'),'Author\'s Stand starts on the map in Where Am I?');
const gh=strip(h.render('buildings/greenhouse/'));assert.ok(/Starts on the map [^]*?in 4 of them it is not on the build list/.test(gh)&&gh.includes('On Edge'),'Greenhouse');
assert.ok(strip(h.render('buildings/luthierie/')).includes('Asked for but not offered at the start'),'Luthierie asked for before offered');
assert.ok(!strip(h.render('buildings/beer-stand/')).includes('Starts on the map'),'no empty section');
console.log('PASS: Starts on the map and asked-for sections on building pages.');
