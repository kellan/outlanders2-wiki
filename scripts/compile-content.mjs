import fs from 'node:fs';
import * as changelogModule from './changelog.mjs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {madeFrom} from './derive-recipes.mjs';
export const project=fileURLToPath(new URL('../',import.meta.url));
const read=p=>JSON.parse(fs.readFileSync(path.join(project,p),'utf8'));
export function assembleContent(base=project){
 const read=p=>JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
 const manifest=read('content/collections.json'),result={};let count=0;
 for(const file of fs.readdirSync(path.join(base,'content/reference')).filter(f=>f.endsWith('.json')))result[file.slice(0,-5)]=read('content/reference/'+file);
 // Game-composited icon tiles (research tools/export_frames.py, issue 56): used when the local agent has committed them.
 {const tiles=path.join(base,'assets/wiki-artwork/tiles.json');if(result.artwork&&fs.existsSync(tiles)){const t=JSON.parse(fs.readFileSync(tiles,'utf8'));for(const group of ['gameobjects','resources','concerns'])for(const e of Object.values(t[group]||{}))for(const k of ['tile','glyph'])if(e[k]&&!fs.existsSync(path.join(base,'assets/wiki-artwork',e[k])))throw new Error('tiles.json names a missing file: '+e[k]);result.artwork.tiles=t}}
 for(const [dataset,groups]of Object.entries(manifest))for(const [group,files]of Object.entries(groups)){
  const ids=new Set();result[dataset][group]=files.map(file=>{
   assert.ok(/^[a-z]+\/[A-Za-z0-9_.-]+\.json$/.test(file),'Invalid record path '+file);
   const record=read('content/'+file),id=String(group==='buildings'?record.gameobject_id:record.id);
   assert.ok(id&&id!=='undefined','Missing ID in '+file);assert.equal(path.basename(file,'.json'),id,'Filename and stable ID differ: '+file);assert.ok(!ids.has(id),'Duplicate ID '+id);ids.add(id);
   assert.equal(typeof record.name,'string',file+' needs a display name');assert.ok(record.name.trim(),file+' needs a nonempty name');
   if(group==='buildings')for(const key of ['max_workers','sleep_spots'])assert.ok(record[key]===null||Number.isInteger(record[key])&&record[key]>=0,file+': invalid '+key);
   if(group==='buildings'&&record.gameplay){const g=record.gameplay,evidence=(e,what)=>{assert.ok(['player-report','field-guide','gameplay-test','decoded-data','official-source'].includes(e?.kind),file+': invalid gameplay evidence kind in '+what);for(const v of [e.game_version,e.date,e.reference])assert.ok(typeof v==='string'&&v.trim(),file+': missing gameplay evidence in '+what)},status=(s,what)=>assert.ok(['open','confirmed','disputed'].includes(s),file+': invalid gameplay status in '+what);
    for(const key of Object.keys(g))assert.ok(['recipe_per_cycle','output_capacity'].includes(key),file+': unknown gameplay key '+key);
    if(g.recipe_per_cycle){const r=g.recipe_per_cycle;for(const side of ['inputs','outputs']){assert.ok(Array.isArray(r[side])&&r[side].length,file+': recipe_per_cycle needs '+side);for(const x of r[side])assert.ok(Number.isFinite(x.count)&&x.count>0&&x.resource_id&&typeof x.name==='string',file+': invalid recipe_per_cycle entry')}evidence(r.evidence,'recipe_per_cycle');status(r.status,'recipe_per_cycle')}
    if(g.output_capacity){const c=g.output_capacity;assert.ok(Number.isInteger(c.count)&&c.count>0&&c.resource_id&&typeof c.name==='string',file+': invalid output_capacity');evidence(c.evidence,'output_capacity');status(c.status,'output_capacity')}}
   if(group==='levels'&&record.scenario){const s=record.scenario;assert.equal(s.primary_objective_count,s.objectives.filter(x=>!x.IsSecondary).length,file+': primary count');assert.equal(s.optional_objective_count,s.objectives.filter(x=>x.IsSecondary).length,file+': optional count');for(const o of s.objectives)assert.ok(Number.isFinite(o.NeededAmount),file+': invalid objective amount');for(const cfg of s.level_config)for(const [k,v]of Object.entries(cfg))if(k.startsWith('IsConcern'))assert.equal(typeof v,'boolean',file+': need must be true/false or omitted');}
   count++;return record;
  });
 }
 const bIds=new Set(result.rules.buildings.map(x=>x.gameobject_id)),fIds=new Set(result.rules.formulas.map(x=>x.id)),rIds=new Set(result.rules.resources.map(x=>x.id));
 for(const b of result.rules.buildings)if(b.gameplay){for(const x of [...(b.gameplay.recipe_per_cycle?.inputs||[]),...(b.gameplay.recipe_per_cycle?.outputs||[]),...(b.gameplay.output_capacity?[b.gameplay.output_capacity]:[])])assert.ok(rIds.has(x.resource_id),'Unknown gameplay resource '+x.resource_id+' in building '+b.gameobject_id)}
 for(const b of result.rules.buildings)for(const id of b.formula_ids)assert.ok(fIds.has(id),'Unknown formula '+id);
 {const derived=madeFrom(result.rules.buildings,result.rules.formulas,result.rules.resources);for(const r of result.rules.resources){const want=derived.get(r.id)||null;assert.equal(JSON.stringify(r.made_from||null),JSON.stringify(want),'Stored made_from for resource '+r.id+' ('+r.name+') differs from the building recipes; run npm run content:derive')}}
 for(const l of result.world.levels)for(const item of l.scenario?.buildable_entries||[])assert.ok(item.gameobject_id,'Unresolved buildable entry in '+l.id);
 const seasonIds=new Set((result.world.challenges?.source_entries||[]).filter(x=>/^FastMode\.[A-Za-z]+\.Name\.WithArticle$/.test(x.key)).map(x=>x.key.split('.')[1]));
 result.world.contributions=fs.readdirSync(path.join(base,'content/observations')).filter(f=>f.endsWith('.json')).sort().map(file=>{
  const o=read('content/observations/'+file);assert.equal(file,o.id+'.json');assert.ok(['open','confirmed','disputed'].includes(o.status),'Invalid status '+file);assert.ok(['player-report','field-guide','gameplay-test','decoded-data','official-source'].includes(o.evidence?.kind),'Invalid evidence kind '+file);
  for(const value of [o.claim,o.evidence?.game_version,o.evidence?.date,o.evidence?.reference])assert.ok(typeof value==='string'&&value.trim(),'Missing evidence in '+file);
  if(o.target.type==='tournament'){assert.ok(seasonIds.has(o.target.id),'Unknown observation target '+file);return o}
  const group=o.target.type==='buildings'?result.rules.buildings:o.target.type==='resources'?result.rules.resources:result.world[o.target.type==='heroes'?'leaders':o.target.type];assert.ok(Array.isArray(group)&&group.some(x=>String(x.gameobject_id??x.id)===String(o.target.id)),'Unknown observation target '+file);return o;
 });
 result.world.strategies=fs.existsSync(path.join(base,'content/strategies'))?fs.readdirSync(path.join(base,'content/strategies')).filter(f=>f.endsWith('.json')).sort().map(file=>{
  const s=read('content/strategies/'+file);assert.equal(file,s.id+'.json','Strategy filename must match its level id: '+file);assert.ok(result.world.levels.some(l=>l.id===s.id),'Unknown strategy level '+file);
  assert.ok(['draft','reviewed'].includes(s.status),'Invalid strategy status '+file);for(const v of [s.summary,s.game_version,s.date,s.contributor])assert.ok(typeof v==='string'&&v.trim(),'Missing strategy field in '+file);
  assert.ok(Array.isArray(s.build_order),'build_order must be a list in '+file);for(const step of s.build_order){assert.ok(bIds.has(step.gameobject_id),file+': unknown building '+step.gameobject_id+' in build_order');assert.ok(typeof step.note==='string','Build-order note must be a string in '+file)}
  assert.ok(!s.pitfalls||Array.isArray(s.pitfalls)&&s.pitfalls.every(x=>typeof x==='string'&&x.trim()),'pitfalls must be a list of strings in '+file);return s;
 }):[];
 result.world.links=fs.existsSync(path.join(base,'content/links.json'))?(()=>{const L=read('content/links.json');assert.ok(Array.isArray(L.entries),'links.json needs an entries list');const ids=new Set(),types=['guide','walkthrough','video','community','official','tool'];
  for(const e of L.entries){assert.ok(typeof e.id==='string'&&/^[a-z0-9-]+$/.test(e.id)&&!ids.has(e.id),'Link id must be unique kebab-case: '+JSON.stringify(e.id));ids.add(e.id);assert.ok(/^https:\/\//.test(e.url),'Link url must be https: '+e.id);assert.ok(types.includes(e.type),'Invalid link type in '+e.id);
   for(const k of ['title','site','language','date_checked','note'])assert.ok(typeof e[k]==='string'&&e[k].trim(),'Missing link field '+k+' in '+e.id);assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(e.date_checked),'date_checked must be YYYY-MM-DD in '+e.id);assert.ok(['listed','needs-check'].includes(e.status),'Invalid link status in '+e.id);assert.ok(['outlanders-2','outlanders-1','both'].includes(e.game),'Link game must be outlanders-2, outlanders-1 or both in '+e.id);
   assert.ok(!e.covers||Array.isArray(e.covers)&&e.covers.every(x=>typeof x==='string'),'covers must be a list of strings in '+e.id);if(e.levels){assert.ok(Array.isArray(e.levels),'levels must be a list in '+e.id);for(const id of e.levels)assert.ok(result.world.levels.some(l=>l.id===id||l.name===id),e.id+': unknown level '+id)}}
  return L.entries})():[];
 result.world.history=fs.existsSync(path.join(base,'content/history.json'))?read('content/history.json'):{baseline:null,entries:[]};
 {const h=result.world.history;assert.ok(Array.isArray(h.entries),'history.json needs an entries list');const lists={buildings:result.rules.buildings,resources:result.rules.resources,levels:result.world.levels,heroes:result.world.leaders,biomes:result.world.biomes};
  for(const e of h.entries){const list=lists[e.type];assert.ok(list,'Invalid history type '+e.type);assert.ok(list.some(x=>String(x.gameobject_id??x.id)===String(e.id)),'Unknown history target '+e.type+'/'+e.id);for(const v of [e.game_version,e.date,e.change])assert.ok(typeof v==='string'&&v.trim(),'Missing history field for '+e.type+'/'+e.id);assert.ok(['player-report','field-guide','gameplay-test','decoded-data','official-source'].includes(e.evidence?.kind),'Invalid history evidence for '+e.type+'/'+e.id);assert.ok(typeof e.evidence.reference==='string'&&e.evidence.reference.trim(),'Missing history evidence reference for '+e.type+'/'+e.id)}}
 result.world.spoiler_policy=read('content/spoilers.json');
 for(const e of result.world.spoiler_policy.entries){if(e.type==='tournament'){assert.ok(seasonIds.has(e.id),'Unknown tournament season '+e.id)}else{const list=['buildings','chains'].includes(e.type)?result.rules.buildings:e.type==='resources'?result.rules.resources:result.world[e.type==='heroes'?'leaders':e.type];assert.ok(list?.some(x=>String(x.gameobject_id||x.id)===String(e.id)),'Unknown spoiler target '+e.id)}assert.ok(['reported-unreleased','confirmed-unreleased','related-release-unconfirmed'].includes(e.status),'Invalid spoiler status '+e.id);assert.ok(e.reason&&e.as_of,'Missing spoiler evidence '+e.id);}
 result.world.contribution_guide=fs.readFileSync(path.join(base,'CONTRIBUTING.md'),'utf8');
 result.world.changelog=(()=>{try{const ch=changelogModule;ch.validate();return ch.assemble()}catch(e){if(e.code==='ERR_MODULE_NOT_FOUND')return '';throw e}})();
 return {datasets:result,count};
}
export function compileContent(){const {datasets,count}=assembleContent();fs.mkdirSync(path.join(project,'dist/data'),{recursive:true});for(const [name,data]of Object.entries(datasets))fs.writeFileSync(path.join(project,'dist/data',name+'.json'),JSON.stringify(data,null,2)+'\n');for(const file of ['app.js','style.css','page.js'])fs.copyFileSync(path.join(project,'src',file),path.join(project,'dist',file));console.log(`Validated and assembled ${count} content records.`);}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){if(process.argv.includes('--check')){const {count}=assembleContent();console.log(`PASS: ${count} records, stable IDs, objective counts, need types, formulas and observation references.`);}else compileContent();}
