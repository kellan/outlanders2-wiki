// PR 82: review of the challenge and level pages once all 260 rotation levels were in.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const t of ['original','redux','bounty','chill','ranked','remix']){const p=strip(h.render(`challenges/${t}/`));
 assert.ok(!p.includes('Example from the archive'),t+': no example section');
 assert.ok(!p.includes('Availability')&&!p.includes('Unknown'),t+': no availability column');
 assert.ok(p.includes('Objectives Day limit You start with'),t+': same table columns on every type page')}
const chill=strip(h.render('challenges/chill/'));
assert.ok(!chill.includes('What a Chill challenge is'),'no section that only repeats the subtitle');
assert.ok(chill.includes('Have 10 Brick House; No Basic House; Have 1 Zen Garden'),'objective summary, including a zero target');
assert.ok(strip(h.render('challenges/redux/')).includes('Make 55 Cookie; Population 22; Everyone settled'),'objective summary on a Redux');
const ch=strip(h.render('challenges/'));
assert.ok(!ch.includes('Tournament · Action')&&!ch.includes('[select value'),'no raw tournament text on the Challenges page');
assert.ok(ch.includes('20 +7 never released'),'older types count released levels');
assert.ok(strip(h.render('levels/town-of-the-year/')).startsWith(' Wiki home › Challenges › Chill › Town of the Year'),'older challenge levels sit under Challenges');
const bounty=strip(h.render('challenges/bounty/spooky-veggie-ritual/'));
assert.ok(bounty.includes('Scoring goal Most Veggie')&&!bounty.includes('Main objectives 0'),'Bounty shows its scoring goal');
const all=strip(h.render('levels/')),first=all.slice(all.indexOf('Availability')+12,all.indexOf('Availability')+40);
assert.ok(/^ A /.test(first),'All levels sorts by name, ignoring quote marks: '+first);
assert.ok(!all.includes(' main / '),'All levels lists objectives, not counts');
console.log('PASS: challenge type pages, objective summaries, Challenges page, older challenge breadcrumbs, Bounty goal, All levels sort.');
