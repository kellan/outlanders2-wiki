// Derives the stored `made_from` field on resource records from the building recipes.
// Run `npm run content:derive` after a building recipe or gameplay block changes; `npm run validate` fails when stored and derived values differ.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export const project=fileURLToPath(new URL('../',import.meta.url));
const round=n=>Math.round(n*10000)/10000;
const RATIO_STATUS='per-unit ratio derived from the decoded production steps; not measured in play';
const CYCLE_STATUS='per-unit ratio derived from the recorded per-cycle recipe';
export function madeFrom(buildings){
 const out=new Map();
 for(const b of buildings){
  const cycle=b.gameplay?.recipe_per_cycle||null,recipes=(b.derived_recipes||[]).filter(r=>!r.caveats.length&&!r.outputs.some(o=>r.inputs.some(i=>i.resource_id===o.resource_id||i.name===o.name)));
  for(const r of recipes)for(const o of r.outputs){
   const useCycle=cycle&&cycle.outputs.some(x=>x.resource_id===o.resource_id),base=useCycle?cycle:r,qty=(useCycle?cycle.outputs:r.outputs).find(x=>x.resource_id===o.resource_id).count;
   const entry={building_id:b.gameobject_id,building_name:b.name,per_unit:base.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:round(x.count/qty)})),smallest_whole_batch:{inputs:r.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),outputs:r.outputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count}))},formula_ids:r.formula_ids,status:useCycle?CYCLE_STATUS:RATIO_STATUS};
   if(useCycle)entry.per_cycle={inputs:cycle.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),outputs:cycle.outputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),status:cycle.status,evidence:cycle.evidence};
   if(!out.has(o.resource_id))out.set(o.resource_id,[]);out.get(o.resource_id).push(entry);
  }
 }
 for(const list of out.values())list.sort((a,b)=>a.building_id-b.building_id);
 return out;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const read=p=>JSON.parse(fs.readFileSync(path.join(project,p),'utf8')),manifest=read('content/collections.json');
 const buildings=manifest.rules.buildings.map(f=>read('content/'+f)),derived=madeFrom(buildings);let changed=0;
 for(const file of manifest.rules.resources){const p=path.join(project,'content',file),r=JSON.parse(fs.readFileSync(p,'utf8')),next=derived.get(r.id)||null,before=JSON.stringify(r.made_from||null);
  if(next)r.made_from=next;else delete r.made_from;
  if(JSON.stringify(r.made_from||null)!==before){fs.writeFileSync(p,JSON.stringify(r,null,2)+'\n');changed++}}
 console.log(`Derived made_from for ${derived.size} resources; ${changed} files changed.`);
}
