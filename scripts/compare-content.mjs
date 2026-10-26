// Compare two content trees (for example the current checkout and a re-extraction on a newer game build) and print candidate history entries for review. Nothing is written: pipe the output into a reviewed edit of content/history.json.
// Usage: node scripts/compare-content.mjs <old content dir> <new content dir> [--version 31] [--date 2026-11-01]
import fs from 'node:fs';import path from 'node:path';
const [oldDir,newDir]=process.argv.slice(2).filter(a=>!a.startsWith('--'));const opt=k=>{const i=process.argv.indexOf('--'+k);return i>0?process.argv[i+1]:null};
if(!oldDir||!newDir){console.error('usage: compare-content.mjs <old content dir> <new content dir> [--version N] [--date YYYY-MM-DD]');process.exit(2)}
const version=opt('version')||'unknown',date=opt('date')||new Date().toISOString().slice(0,10);
const groups={buildings:['buildings','gameobject_id'],resources:['resources','id'],scenarios:['levels','id'],leaders:['heroes','id'],biomes:['biomes','id']};
const watched={buildings:['name','description','max_workers','sleep_spots','construction','formula_ids','derived_recipes','workplace_config'],resources:['name','need_units','consume_duration_override'],scenarios:['name','description','scenario'],leaders:['name','biography','effect'],biomes:['name']};
const load=(dir,folder)=>{const p=path.join(dir,folder);if(!fs.existsSync(p))return new Map();return new Map(fs.readdirSync(p).filter(f=>f.endsWith('.json')).map(f=>[f.slice(0,-5),JSON.parse(fs.readFileSync(path.join(p,f),'utf8'))]))};
const out=[];const ev={kind:'decoded-data',reference:`Comparison of content exports, ${oldDir} versus ${newDir}`};
for(const [folder,[type]] of Object.entries(groups)){const a=load(oldDir,folder),b=load(newDir,folder);
 for(const [id,rec] of b)if(!a.has(id))out.push({type,id,game_version:version,date,change:`Added: ${rec.name||id}.`,evidence:ev});
 for(const [id,rec] of a)if(!b.has(id))out.push({type,id,game_version:version,date,change:`Removed from the game files: ${rec.name||id}.`,evidence:ev,note:'Target no longer exists; keep the old record or record the removal in docs/CONTENT-NOTES.md'});
 for(const [id,rec] of b){const old=a.get(id);if(!old)continue;const changed=watched[folder].filter(k=>JSON.stringify(old[k])!==JSON.stringify(rec[k]));if(changed.length)out.push({type,id,game_version:version,date,change:`Changed ${changed.join(', ')} for ${rec.name||id}.`,evidence:ev,before:Object.fromEntries(changed.map(k=>[k,old[k]])),after:Object.fromEntries(changed.map(k=>[k,rec[k]]))})}}
console.log(JSON.stringify(out,null,2));console.error(`${out.length} candidate entries. Review each, drop the before/after and note fields, and add the keepers to content/history.json.`);
