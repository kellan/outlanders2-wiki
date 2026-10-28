// Imports the Original, Redux and Bounty levels the local agent decoded from the game's Challenges download cache
// (research repo data/challenge-archive/<date>/catalog.json) as level records in content/challenges/, one per batch.
// Usage: node scripts/import-challenge-archive.mjs ../outlanders2-research/data/challenge-archive/2026-10-28/catalog.json
// References are resolved to the wiki's game objects through the packaged scenarios, then by prefab path for the few
// buildings only the downloaded levels use. Starting conditions stay marked unverified until checked in play.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const project=fileURLToPath(new URL('../',import.meta.url)),read=p=>JSON.parse(fs.readFileSync(path.join(project,p),'utf8'));
const catalogPath=process.argv[2];if(!catalogPath)throw new Error('Pass the path to catalog.json');
const catalog=JSON.parse(fs.readFileSync(catalogPath,'utf8')),collections=read('content/collections.json'),rules={buildings:collections.rules.buildings.map(f=>read('content/'+f)),resources:collections.rules.resources.map(f=>read('content/'+f))};
const known=new Map(),put=(guid,o)=>{if(guid&&o?.gameobject_id&&!known.has(guid))known.set(guid,{gameobject_id:o.gameobject_id,name:o.name,localization_key:o.localization_key||''})};
for(const f of fs.readdirSync(path.join(project,'content/scenarios')).filter(f=>f.endsWith('.json'))){const s=read('content/scenarios/'+f).scenario||{};for(const e of [...(s.buildable_entries||[]),...(s.initial_prefab_instances||[])])put(e.guid,e);for(const o of s.objectives||[]){put(o.PrefabKeyToCount,o.target);put(o.PrefabKeyForBuilding,o.building)}}
// Prefab name → building, from the asset paths (".../halloween plaza" is the Halloween variant of the Communal Plaza).
const byPrefab=new Map();for(const b of rules.buildings)for(const p of b.paths||[])byPrefab.set(p.split('/').pop().toLowerCase(),b);
const byResource=new Map();for(const r of rules.resources){byResource.set(r.name.toLowerCase(),r);byResource.set(String(r.id),r)}
function resolve(guid,name){if(known.has(guid))return known.get(guid);const b=name&&byPrefab.get(name.toLowerCase());return b?{gameobject_id:b.gameobject_id,name:b.name,localization_key:b.localization_key||''}:null}
function resource(guid,name){if(known.has(guid))return known.get(guid);const r=name&&(byResource.get(name.toLowerCase())||byResource.get(name.replace(/Pot$/,'').toLowerCase()));return r?{gameobject_id:r.id,name:r.name,localization_key:r.localization_key||''}:null}
const TYPE_BY_DAY={1:'Bounty',2:'Redux',3:'Bounty',4:'Redux',5:'Original'};
const levels=[...catalog.levels].sort((a,b)=>a.cache_folder.localeCompare(b.cache_folder));
fs.mkdirSync(path.join(project,'content/challenges'),{recursive:true});const files=[];
levels.forEach((l,i)=>{
 const weekday=new Date(l.cache_folder+'T12:00:00Z').getUTCDay(),type=l.category||TYPE_BY_DAY[weekday];
 if(l.category_inferred&&l.category_inferred!==type)throw new Error(`${l.asset_name}: type by weekday ${type} differs from ${l.category_inferred}`);
 if(l.archive_number!=null&&l.archive_number!==i+1)throw new Error(`${l.asset_name}: archive number ${l.archive_number} is not its batch order ${i+1}`);
 const objectives=l.objectives.map(o=>{const target=o.PrefabKeyToCount?resolve(o.PrefabKeyToCount,o.target_name)||resource(o.PrefabKeyToCount,o.target_name):null,building=o.PrefabKeyForBuilding?resolve(o.PrefabKeyForBuilding,o.building_name):null;const {target_name,building_name,...rest}=o;return {...rest,target:target||{gameobject_id:null,name:target_name||'',localization_key:''},building:building||{gameobject_id:null,name:building_name||'',localization_key:''}}});
 const buildable=l.buildable_entries.map(e=>({guid:e.Guid,...(resolve(e.Guid,e.name)||{gameobject_id:null,name:e.name||'',localization_key:''})}));
 const unresolved=buildable.filter(e=>!e.gameobject_id);if(unresolved.length)throw new Error(`${l.asset_name}: unresolved build entries ${unresolved.map(e=>e.name).join(', ')}`);
 const instances=l.initial_entities.all_prefabs.map(p=>{const r=resolve(p.guid,p.name);return {guid:p.guid,instance_count:p.entity_count,gameobject_id:r?.gameobject_id||null,name:r?.name||p.name||'',localization_key:r?.localization_key||''}});
 const scoring=l.scoring_objectives.map(s=>({mode:s.mode,goal:s.goal,resource:resource(s.resource_guid,s.resource_name),resource_name:s.resource_name||null}));
 const id=`${l.asset_name}-${l.cache_folder}`,record={id,name:l.title,description:'',objectives:[],source_entries:[],campaign_number:null,category:'live_challenge',
  verification_status:l.verification||'downloaded_cache_decoded; starting_state_gameplay_unverified',
  live_challenge:{type,type_source:l.category?'archive menu':'batch weekday',archive_number:i+1,archive_number_source:l.archive_number!=null?'archive menu':'batch order',batch_date:l.cache_folder,minimum_game_version:l.minimum_game_version,capture_date:catalog.capture_date,menu_evidence:l.menu_evidence||null,source:'research repo data/challenge-archive/'+catalog.capture_date+'/catalog.json'},
  scenario:{asset_name:l.asset_name,title:l.title,source_level_path:l.source_level_path,sha256:l.sha256,primary_objective_count:objectives.filter(o=>!o.IsSecondary).length,optional_objective_count:objectives.filter(o=>o.IsSecondary).length,day_limit:l.day_limit_raw,objectives,scoring,level_config:l.level_config,buildable_entries:buildable,initial_prefab_instances:instances,header_population:l.header_population,world_objectives_match_header:l.world_objectives_match_header,source_category:'downloaded live challenge'}};
 fs.writeFileSync(path.join(project,'content/challenges',id+'.json'),JSON.stringify(record,null,2)+'\n');files.push('challenges/'+id+'.json');
});
collections.world.levels=[...collections.world.levels.filter(f=>!f.startsWith('challenges/')),...files];
fs.writeFileSync(path.join(project,'content/collections.json'),JSON.stringify(collections,null,2)+'\n');
console.log(`Imported ${files.length} challenge levels from ${catalog.capture_date}.`);
