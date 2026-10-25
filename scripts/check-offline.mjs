import fs from 'node:fs';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../preview/',import.meta.url));
const paths=JSON.parse(fs.readFileSync(new URL('../dist/pages.json',import.meta.url))).paths;
for(const p of paths){const file=root+p+'index.html',html=fs.readFileSync(file,'utf8');assert.ok(!/<script\b|show-more|data-filter=|id="sort"/.test(html),'Dynamic control on '+p);for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){if(/^(https?:|data:)/.test(m[1]))continue;assert.ok(fs.existsSync(fileURLToPath(new URL(m[1],'file://'+file))),'Missing '+m[1]+' on '+p)}}
assert.ok(fs.readFileSync(root+'verification/buildings/bakery/index.html','utf8').includes('Fuel discrepancy'));
assert.ok(fs.readFileSync(root+'campaigns/campaign-3/index.html','utf8').includes('Fjordi'));
console.log(`PASS: ${paths.length} static local pages, local links, no runtime rendering or inert catalog controls.`);
