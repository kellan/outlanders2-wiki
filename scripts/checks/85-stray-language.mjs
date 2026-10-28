// PR 85: no raw data dumps or boilerplate hedges on reader pages; open questions stay where they are specific.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const p of ['tournament/','challenges/','campaigns/campaign-1/','about/'])assert.ok(!h.render(p).includes('class="source"'),p+': no raw JSON evidence block');
const melon=strip(h.render('production-chains/field-watermelon/'));
assert.ok(!melon.includes('has not been established')&&!melon.includes('cycle time is not yet measured'),'chain pages skip the stock "not established" lines');
const bakery=strip(h.render('production-chains/bakery/'));assert.ok(bakery.includes('holds up to')&&!bakery.includes('nothing about speed'),'known capacity stays, speed caveat moves to the chains index');
assert.ok(strip(h.render('production-chains/')).includes('hasn’t been measured'),'speed caveat stated once on the index');
assert.ok(!strip(h.render('buildings/road/')).includes('which one a level uses is not known'),'variant list without the hedge');
assert.ok(!strip(h.render('buildings/foragers-hut/')).includes('not yet checked in play'),'tree regrowth note without the hedge');
const sp=strip(h.render('spoilers/'));assert.ok(!sp.includes('reported-unreleased content')&&!sp.includes('Placement here is editorial')&&sp.includes('Used only in Oona’s levels'),'plain spoiler wording');
assert.ok(strip(h.render('heroes/oona/')).includes('Spoiler warning'),'spoiler banner');
console.log('PASS: no raw evidence dumps on reader pages, chain boilerplate gone, plain spoiler wording.');
