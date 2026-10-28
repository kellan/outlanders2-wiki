// PR 82: review of the challenge and level pages once all 260 rotation levels were in.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const t of ['original','redux','bounty','chill','ranked','remix']){const p=strip(h.render(`challenges/${t}/`));
 assert.ok(!p.includes('Example from the archive'),t+': no example section');
 assert.ok(!p.includes('Availability')&&!p.includes('Unknown'),t+': no availability column');
 assert.ok(/Objectives (Day limit )?You start with/.test(p),t+': same table columns on every type page (a constant Day limit column is dropped since PR 83)')}
const chill=strip(h.render('challenges/chill/'));
assert.ok(!chill.includes('What a Chill challenge is'),'no section that only repeats the subtitle');
assert.ok(chill.replace(/ \./g,'.').includes('Have 10 Brick Houses. Have no Basic Houses. Have a Zen Garden.'),'objective summary in the game’s words, including a zero target');
assert.ok(strip(h.render('challenges/redux/')).replace(/ \./g,'.').includes('Bake 55 Cookies. Reach a Population of 22. Have everyone settled.'),'objective summary on a Redux');
const ch=strip(h.render('challenges/'));
assert.ok(!ch.includes('Tournament · Action')&&!ch.includes('[select value'),'no raw tournament text on the Challenges page');
assert.ok(ch.includes('20 +7 never released'),'older types count released levels');
assert.ok(strip(h.render('levels/town-of-the-year/')).startsWith(' Wiki home › Challenges › Chill › Town of the Year'),'older challenge levels sit under Challenges');
const bounty=strip(h.render('challenges/bounty/spooky-veggie-ritual/'));
assert.ok(/Scored on [^.]*Veggie[^.]* (produced|collected)/.test(bounty)&&!bounty.includes('Main objectives 0'),'Bounty shows its scoring goal');
const all=strip(h.render('levels/')),first=all.slice(all.indexOf('Availability')+12,all.indexOf('Availability')+40);
assert.ok(/^ A /.test(first),'All levels sorts by name, ignoring quote marks: '+first);
assert.ok(!all.includes(' main / '),'All levels lists objectives, not counts');
const home=h.render('');assert.ok(home.includes('<section class="current-challenge" id="home-today">')&&home.indexOf('current-challenge')<home.indexOf('home-biomes'),'Current challenge card near the top of the home page');assert.ok(!/Today: <a/.test(home),'no second today line in the Challenges box');
console.log('PASS: challenge type pages, objective summaries, Challenges page, older challenge breadcrumbs, Bounty goal, All levels sort.');
