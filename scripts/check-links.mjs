// Fetches every URL in content/links.json and fails on dead links. Run weekly by .github/workflows/link-check.yml.
import fs from 'node:fs';
const {entries}=JSON.parse(fs.readFileSync(new URL('../content/links.json',import.meta.url),'utf8'));
let bad=0;
for(const e of entries){
 try{const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),15000);const res=await fetch(e.url,{method:'GET',redirect:'follow',signal:ctrl.signal,headers:{'user-agent':'outlanders2-wiki link check (+https://outlanders2wiki.com)'}});clearTimeout(t);
  if(res.status>=400){bad++;console.log(`DEAD ${res.status} ${e.id} ${e.url}`)}else console.log(`ok   ${res.status} ${e.id}`)}
 catch(err){bad++;console.log(`DEAD ${err.name} ${e.id} ${e.url}`)}}
console.log(`${entries.length} links, ${bad} dead`);
if(bad)process.exit(1);
