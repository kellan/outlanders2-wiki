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
 const policy=path.join(temp,'content/spoilers.json'),sp=JSON.parse(fs.readFileSync(policy));sp.entries[0].id='missing';fs.writeFileSync(policy,JSON.stringify(sp));assert.throws(()=>assembleContent(temp),/Unknown spoiler target/);
}finally{fs.rmSync(temp,{recursive:true,force:true})}
const h=await harness();const guide=h.render('contribute/');assert.ok(guide.includes('content/scenarios/'));assert.ok(guide.includes('pull request'));assert.ok(guide.includes('npm run build'));
for(const p of ['', 'heroes/','levels/','biomes/','index/','campaigns/campaign-3/'])assert.ok(!/Oona|Wetlands/.test(h.render(p)),p+' leaked spoiler names');
assert.ok(h.query('Oona').includes('0 matches'));assert.ok(!h.query('Oona').includes('spoilers/heroes/oona'));assert.ok(h.render('spoilers/').includes('Oona'));assert.ok(h.render('spoilers/').includes('release unconfirmed'));
assert.ok(h.lookup['spoilers/heroes/oona/']);assert.ok(h.render('heroes/oona/').includes('Spoilers: unreleased'));assert.ok(h.render('verification/buildings/clay-pit/').includes('Contributed observations'));
console.log('PASS: contribution guide, invalid-content rejection, observation references, spoiler classification, navigation, search and old URLs.');
