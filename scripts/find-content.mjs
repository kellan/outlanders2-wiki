import fs from 'node:fs';import path from 'node:path';import {project} from './compile-content.mjs';
const query=process.argv.slice(2).join(' ').toLowerCase();if(!query){console.error('Usage: npm run content:find -- pumpkin');process.exit(1)}
const index=JSON.parse(fs.readFileSync(path.join(project,'content/collections.json')));
for(const groups of Object.values(index))for(const files of Object.values(groups))for(const file of files){const x=JSON.parse(fs.readFileSync(path.join(project,'content',file)));if([x.name,x.id,x.gameobject_id,x.internal_name].join(' ').toLowerCase().includes(query))console.log(`${x.name}\tcontent/${file}`)}
