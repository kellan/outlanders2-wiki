// Derives the stored `made_from` field on resource records from the building recipes.
// Run `npm run content:derive` after a building recipe or gameplay block changes; `npm run validate` fails when stored and derived values differ.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export const project=fileURLToPath(new URL('../',import.meta.url));
const round=n=>Math.round(n*10000)/10000;
const RATIO_STATUS='per-unit ratio derived from the decoded production steps; not measured in play';
const CYCLE_STATUS='per-unit ratio derived from the recorded per-cycle recipe';
const GRAPH_STATUS='ratio read from the stored step graph (alternatives, fuel and returned containers folded in); not measured in play';
// Reads a building's step graph back to public inputs when no single clean recipe exists (issue 47). Mirrors recipeGraph() in src/app.js.
export function graphRecipes(b,F,R){
 const fs=(b.formula_ids||[]).map(i=>F[i]).filter(Boolean);if(!fs.length)return [];
 const producers=new Map();for(const f of fs)for(const o of f.outputs){if(!producers.has(o.resource_id))producers.set(o.resource_id,[]);producers.get(o.resource_id).push(f)}
 const consumed=new Set(fs.flatMap(f=>f.inputs.map(x=>x.resource_id)));const seen=new Set();const finals=[];for(const f of fs)for(const o of f.outputs){const r=R[o.resource_id];if(r&&r.publicly_named&&!consumed.has(r.id)&&!seen.has(r.id)){seen.add(r.id);finals.push(r)}}
 const expand=(rid,amount,depth)=>{const r=R[rid];const prods=producers.get(rid)||[];if(depth>12)return {leaves:[],bad:true};
  if(!prods.length){if(r?.publicly_named)return {leaves:[{kind:'input',r,amount}]};return {leaves:[{kind:'container',r,amount}]}}
  const branches=prods.map(f=>{const c=f.outputs.find(o=>o.resource_id===rid)?.count||1;const runs=amount/c;const leaves=[];let bad=false;if(!f.inputs.length){if(f.resource_source_category_ids?.length)leaves.push({kind:'source',r,amount,cat:f.resource_source_category_ids[0]});else leaves.push({kind:'free',r,amount})}for(const x of f.inputs){const sub=expand(x.resource_id,runs*x.count,depth+1);leaves.push(...sub.leaves);bad=bad||sub.bad}return {leaves,bad}});
  if(branches.length===1)return branches[0];const key=br=>JSON.stringify(br.leaves.map(l=>[l.kind,l.r?.name,Math.round(l.amount*1000)]).sort());if(new Set(branches.map(key)).size===1)return branches[0];
  const simple=branches.every(br=>br.leaves.length===1&&br.leaves[0].kind==='input')&&new Set(branches.map(br=>Math.round(br.leaves[0].amount*1000))).size===1;if(simple)return {leaves:[{kind:'any',options:branches.map(br=>br.leaves[0].r),amount:branches[0].leaves[0].amount}]};
  return {leaves:[],bad:true}};
 const merge=leaves=>{const out=[];for(const l of leaves){const k=l.kind+':'+(l.r?l.r.id:l.options.map(o=>o.id).join('|'));const hit=out.find(o=>o.key===k);if(hit)hit.amount+=l.amount;else out.push({key:k,...l})}return out};
 const done=new Set(),entries=[];
 for(const r of finals){if(done.has(r.id))continue;const prods=producers.get(r.id),f0=prods[0];const co=prods.length===1?f0.outputs.map(o=>R[o.resource_id]).filter(x=>x&&x.publicly_named&&finals.some(z=>z.id===x.id)):[r];for(const x of co)done.add(x.id);
  const c=f0.outputs.find(o=>o.resource_id===r.id)?.count||1;const ex=expand(r.id,c,0);if(ex.bad)continue;const leaves=merge(ex.leaves);
  const raw=l=>l.amount/c,per=l=>round(raw(l));const used=leaves.filter(l=>l.kind==='input'||l.kind==='any'||l.kind==='source');const per_unit=used.map(l=>l.kind==='any'?{choice:l.options.map(o=>({resource_id:o.id,name:o.name})),count:per(l)}:{resource_id:l.r.id,name:l.r.name,count:per(l),...(l.kind==='source'?{from_map:true}:{})});
  let k=c;for(let m=1;m<=60;m++){if(used.every(l=>Math.abs(raw(l)*m-Math.round(raw(l)*m))<1e-6)){k=m;break}}
  const scale=(x,i)=>({...x,count:Math.round(raw(used[i])*k*1000)/1000});
  const natural={inputs:used.map((l,i)=>({...per_unit[i],count:round(raw(l)*c)})),outputs:co.map(x=>({resource_id:x.id,name:x.name,count:f0.outputs.find(o=>o.resource_id===x.id)?.count||1}))};
  for(const prod of co){entries.push({product_id:prod.id,entry:{building_id:b.gameobject_id,building_name:b.name,per_unit,batch:natural,smallest_whole_batch:{inputs:per_unit.map(scale),outputs:co.map(x=>({resource_id:x.id,name:x.name,count:round((f0.outputs.find(o=>o.resource_id===x.id)?.count||1)*k/c)}))},reused:leaves.filter(l=>l.kind==='container'&&!/full$/i.test(l.r?.name||'')).map(l=>({resource_id:l.r.id,name:l.r.name,count:per(l)})),brought_back:leaves.filter(l=>l.kind==='container'&&/full$/i.test(l.r?.name||'')).map(l=>({resource_id:l.r.id,name:l.r.name,count:per(l)})),self_made:leaves.some(l=>l.kind==='free'),co_products:co.filter(x=>x.id!==prod.id).map(x=>({resource_id:x.id,name:x.name,count:round((f0.outputs.find(o=>o.resource_id===x.id)?.count||1)/c)})),formula_ids:fs.map(f=>f.id).sort((a,b)=>a-b),status:GRAPH_STATUS,graph:true}})}}
 return entries;
}
export function madeFrom(buildings,formulas=[],resources=[]){
 const out=new Map();const F=Object.fromEntries(formulas.map(f=>[f.id,f])),R=Object.fromEntries(resources.map(r=>[r.id,r]));
 for(const b of buildings){
  const cycle=b.gameplay?.recipe_per_cycle||null,recipes=(b.derived_recipes||[]).filter(r=>!r.caveats.length&&!r.outputs.some(o=>r.inputs.some(i=>i.resource_id===o.resource_id||i.name===o.name)));
  for(const r of recipes)for(const o of r.outputs){
   const useCycle=cycle&&cycle.outputs.some(x=>x.resource_id===o.resource_id),base=useCycle?cycle:r,qty=(useCycle?cycle.outputs:r.outputs).find(x=>x.resource_id===o.resource_id).count;
   const entry={building_id:b.gameobject_id,building_name:b.name,per_unit:base.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:round(x.count/qty)})),smallest_whole_batch:{inputs:r.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),outputs:r.outputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count}))},formula_ids:r.formula_ids,status:useCycle?CYCLE_STATUS:RATIO_STATUS};
   if(useCycle)entry.per_cycle={inputs:cycle.inputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),outputs:cycle.outputs.map(x=>({resource_id:x.resource_id,name:x.name,count:x.count})),status:cycle.status,evidence:cycle.evidence};
   if(!out.has(o.resource_id))out.set(o.resource_id,[]);out.get(o.resource_id).push(entry);
  }
  if(!recipes.length&&!b.is_plant&&formulas.length){for(const {product_id,entry} of graphRecipes(b,F,R)){if(!out.has(product_id))out.set(product_id,[]);out.get(product_id).push(entry)}}
 }
 for(const list of out.values())list.sort((a,b)=>a.building_id-b.building_id);
 return out;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const read=p=>JSON.parse(fs.readFileSync(path.join(project,p),'utf8')),manifest=read('content/collections.json');
 const buildings=manifest.rules.buildings.map(f=>read('content/'+f)),resources=manifest.rules.resources.map(f=>read('content/'+f)),formulas=read('content/reference/rules.json').formulas,derived=madeFrom(buildings,formulas,resources);let changed=0;
 for(const file of manifest.rules.resources){const p=path.join(project,'content',file),r=JSON.parse(fs.readFileSync(p,'utf8')),next=derived.get(r.id)||null,before=JSON.stringify(r.made_from||null);
  if(next)r.made_from=next;else delete r.made_from;
  if(JSON.stringify(r.made_from||null)!==before){fs.writeFileSync(p,JSON.stringify(r,null,2)+'\n');changed++}}
 console.log(`Derived made_from for ${derived.size} resources; ${changed} files changed.`);
}
