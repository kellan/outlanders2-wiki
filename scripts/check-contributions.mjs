import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';
import {assembleContent,project} from './compile-content.mjs';import {harness} from './render-harness.mjs';
const baseline=assembleContent();assert.ok(baseline.count>=561);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'outlands-content-'));
try{
 fs.cpSync(path.join(project,'content'),path.join(temp,'content'),{recursive:true});fs.copyFileSync(path.join(project,'CONTRIBUTING.md'),path.join(temp,'CONTRIBUTING.md'));
 const manifest=JSON.parse(fs.readFileSync(path.join(temp,'content/collections.json'))),file=path.join(temp,'content',manifest.rules.buildings[0]),original=fs.readFileSync(file,'utf8'),x=JSON.parse(original);
 x.max_workers=-1;fs.writeFileSync(file,JSON.stringify(x));assert.throws(()=>assembleContent(temp),/invalid max_workers/);fs.writeFileSync(file,original);
 const level=path.join(temp,'content',manifest.world.levels[0]),oldLevel=fs.readFileSync(level,'utf8'),l=JSON.parse(oldLevel);l.scenario.primary_objective_count+=1;fs.writeFileSync(level,JSON.stringify(l));assert.throws(()=>assembleContent(temp),/primary count/);fs.writeFileSync(level,oldLevel);
 const observation=path.join(temp,'content/observations/clay-pit-late-start.json'),oldObs=fs.readFileSync(observation,'utf8'),o=JSON.parse(oldObs);o.target.id='missing';fs.writeFileSync(observation,JSON.stringify(o));assert.throws(()=>assembleContent(temp),/Unknown observation target/);fs.writeFileSync(observation,oldObs);
 const bakery=path.join(temp,'content/buildings/57395.json'),oldBakery=fs.readFileSync(bakery,'utf8'),bk=JSON.parse(oldBakery);bk.gameplay.output_capacity.count=0;fs.writeFileSync(bakery,JSON.stringify(bk));assert.throws(()=>assembleContent(temp),/output_capacity/);const bk2=JSON.parse(oldBakery);bk2.gameplay.recipe_per_cycle.evidence.kind='guess';fs.writeFileSync(bakery,JSON.stringify(bk2));assert.throws(()=>assembleContent(temp),/gameplay evidence/);fs.writeFileSync(bakery,oldBakery);
 {const links=path.join(temp,'content/links.json'),oldLinks=fs.readFileSync(links,'utf8'),L=JSON.parse(oldLinks);L.entries[0].type='blog';fs.writeFileSync(links,JSON.stringify(L));assert.throws(()=>assembleContent(temp),/Invalid link type/);const L2=JSON.parse(oldLinks);L2.entries[0].url='http://example.com';fs.writeFileSync(links,JSON.stringify(L2));assert.throws(()=>assembleContent(temp),/must be https/);fs.writeFileSync(links,oldLinks)}
 const strategy=path.join(temp,'content/strategies/Level01A.json'),oldStrategy=fs.readFileSync(strategy,'utf8'),st=JSON.parse(oldStrategy);st.build_order[0].gameobject_id=1;fs.writeFileSync(strategy,JSON.stringify(st));assert.throws(()=>assembleContent(temp),/unknown building/);fs.writeFileSync(strategy,oldStrategy);
 const hist=path.join(temp,'content/history.json'),oldHist=fs.readFileSync(hist,'utf8'),hj=JSON.parse(oldHist);hj.entries[0].id='missing';fs.writeFileSync(hist,JSON.stringify(hj));assert.throws(()=>assembleContent(temp),/Unknown history target/);fs.writeFileSync(hist,oldHist);
 const policy=path.join(temp,'content/spoilers.json'),sp=JSON.parse(fs.readFileSync(policy));sp.entries[0].id='missing';fs.writeFileSync(policy,JSON.stringify(sp));assert.throws(()=>assembleContent(temp),/Unknown spoiler target/);
}finally{fs.rmSync(temp,{recursive:true,force:true})}
const h=await harness();const guide=h.render('contribute/');assert.ok(guide.includes('content/scenarios/'));assert.ok(guide.includes('pull request'));assert.ok(guide.includes('npm run build'));
for(const p of ['', 'heroes/','levels/','biomes/','index/','campaigns/campaign-3/'])assert.ok(!/Oona|Wetlands/.test(h.render(p)),p+' leaked spoiler names');
assert.ok(h.query('Oona').includes('0 matches'));assert.ok(!h.query('Oona').includes('spoilers/heroes/oona'));assert.ok(h.render('spoilers/').includes('Oona'));assert.ok(h.render('spoilers/').includes('release unconfirmed'));
assert.ok(h.lookup['spoilers/heroes/oona/']);assert.ok(h.render('heroes/oona/').includes('Spoilers: unreleased'));assert.ok(h.render('verification/buildings/clay-pit/').includes('Contributed observations'));

// Spoiler visibility and the home teaser are independent requirements.
const spoilerNames=['Advanced Warehouse','Stroganoff','Mushroom','Concoction Shop',"Swamp Trappers"];
for(const route of ['', 'buildings/', 'food/', 'resources/', 'production-chains/', 'index/', 'resources/stick/']){
 const html=h.render(route);for(const name of spoilerNames)assert.ok(!html.includes(name),route+' leaked '+name);
}
const spoilerIndex=h.render('spoilers/');for(const name of spoilerNames)assert.ok(spoilerIndex.includes(name),'Spoiler index missing '+name);
for(const name of ['Mushroom','Stroganoff','Advanced Warehouse'])assert.ok(h.query(name).includes('0 matches'),'Search leaked '+name);
assert.ok(h.render('spoilers/food/stroganoff/').includes('Spoilers: unreleased'));
const home=h.query('');assert.ok(home.includes('Looking to look ahead?'));assert.ok(home.lastIndexOf('<h2>Spoilers</h2>')>home.indexOf('<h2>Reference</h2>'));
assert.ok(!home.includes('Advanced Warehouse'));assert.ok(!home.includes('field-orchard-base'));

console.log('PASS: contribution guide, invalid-content rejection, observation references, spoiler classification, navigation, search and old URLs.');

const clean=await harness();
for(const route of ['', 'buildings/','resources/','food/','production-chains/','index/'])assert.ok(!/Mushroom|Concoction Shop|Stroganoff|Advanced Warehouse|Brick Road|Swamp Trappers/.test(clean.render(route)),route+' leaked mushroom or Oona content');
assert.ok(clean.render('').includes('Browse Spoilers'));
assert.ok(!clean.render('').includes('Verification status'));
assert.ok(clean.render('resources/mushroom/').includes('Spoilers: unreleased'));
assert.ok(clean.render('production-chains/advanced-warehouse/').includes('Production steps'));
assert.ok(!/<details(?![^>]*\bopen\b)/.test(clean.render('verification/')));
{const navHtml=clean.elements['#nav'].innerHTML;assert.ok(navHtml.lastIndexOf('Spoilers')>navHtml.indexOf('Sources &amp; artwork'),'Spoilers is the last navigation entry')}
console.log('PASS: mushroom chain isolation, demoted spoiler navigation, expanded evidence and clean home page.');
