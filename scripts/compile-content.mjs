import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
export const project=fileURLToPath(new URL('../',import.meta.url));
const read=p=>JSON.parse(fs.readFileSync(path.join(project,p),'utf8'));
export function assembleContent(base=project){
 const read=p=>JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
 const manifest=read('content/collections.json'),result={};let count=0;
 for(const file of fs.readdirSync(path.join(base,'content/reference')).filter(f=>f.endsWith('.json')))result[file.slice(0,-5)]=read('content/reference/'+file);
 for(const [dataset,groups]of Object.entries(manifest))for(const [group,files]of Object.entries(groups)){
  const ids=new Set();result[dataset][group]=files.map(file=>{
   assert.ok(/^[a-z]+\/[A-Za-z0-9_.-]+\.json$/.test(file),'Invalid record path '+file);
   const record=read('content/'+file),id=String(group==='buildings'?record.gameobject_id:record.id);
   assert.ok(id&&id!=='undefined','Missing ID in '+file);assert.equal(path.basename(file,'.json'),id,'Filename and stable ID differ: '+file);assert.ok(!ids.has(id),'Duplicate ID '+id);ids.add(id);
   assert.equal(typeof record.name,'string',file+' needs a display name');assert.ok(record.name.trim(),file+' needs a nonempty name');
   if(group==='buildings')for(const key of ['max_workers','sleep_spots'])assert.ok(record[key]===null||Number.isInteger(record[key])&&record[key]>=0,file+': invalid '+key);
   if(group==='levels'&&record.scenario){const s=record.scenario;assert.equal(s.primary_objective_count,s.objectives.filter(x=>!x.IsSecondary).length,file+': primary count');assert.equal(s.optional_objective_count,s.objectives.filter(x=>x.IsSecondary).length,file+': optional count');for(const o of s.objectives)assert.ok(Number.isFinite(o.NeededAmount),file+': invalid objective amount');for(const cfg of s.level_config)for(const [k,v]of Object.entries(cfg))if(k.startsWith('IsConcern'))assert.equal(typeof v,'boolean',file+': need must be true/false or omitted');}
   count++;return record;
  });
 }
 const bIds=new Set(result.rules.buildings.map(x=>x.gameobject_id)),fIds=new Set(result.rules.formulas.map(x=>x.id));
 for(const b of result.rules.buildings)for(const id of b.formula_ids)assert.ok(fIds.has(id),'Unknown formula '+id);
 for(const l of result.world.levels)for(const item of l.scenario?.buildable_entries||[])assert.ok(item.gameobject_id,'Unresolved buildable entry in '+l.id);
 result.world.contributions=fs.readdirSync(path.join(base,'content/observations')).filter(f=>f.endsWith('.json')).sort().map(file=>{
  const o=read('content/observations/'+file);assert.equal(file,o.id+'.json');assert.ok(['open','confirmed','disputed'].includes(o.status),'Invalid status '+file);assert.ok(['player-report','field-guide','gameplay-test','decoded-data','official-source'].includes(o.evidence?.kind),'Invalid evidence kind '+file);
  for(const value of [o.claim,o.evidence?.game_version,o.evidence?.date,o.evidence?.reference])assert.ok(typeof value==='string'&&value.trim(),'Missing evidence in '+file);
  const group=o.target.type==='buildings'?result.rules.buildings:o.target.type==='resources'?result.rules.resources:result.world[o.target.type==='heroes'?'leaders':o.target.type];assert.ok(Array.isArray(group)&&group.some(x=>String(x.gameobject_id??x.id)===String(o.target.id)),'Unknown observation target '+file);return o;
 });
 result.world.spoiler_policy=read('content/spoilers.json');
 for(const e of result.world.spoiler_policy.entries){const list=['buildings','resources'].includes(e.type)?result.rules[e.type]:result.world[e.type==='heroes'?'leaders':e.type];assert.ok(list?.some(x=>String(x.gameobject_id??x.id)===String(e.id)),'Unknown spoiler target '+e.id);assert.ok(['reported-unreleased','confirmed-unreleased','related-release-unconfirmed'].includes(e.status),'Invalid spoiler status '+e.id);assert.ok(e.reason&&e.as_of,'Missing spoiler evidence '+e.id);}
 result.world.contribution_guide=fs.readFileSync(path.join(base,'CONTRIBUTING.md'),'utf8');
 return {datasets:result,count};
}
export function compileContent(){const {datasets,count}=assembleContent();for(const [name,data]of Object.entries(datasets))fs.writeFileSync(path.join(project,'dist/data',name+'.json'),JSON.stringify(data,null,2)+'\n');for(const file of ['app.js','style.css'])fs.copyFileSync(path.join(project,'src',file),path.join(project,'dist',file));console.log(`Validated and assembled ${count} content records.`);}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){if(process.argv.includes('--check')){const {count}=assembleContent();console.log(`PASS: ${count} records, stable IDs, objective counts, need types, formulas and observation references.`);}else compileContent();}
