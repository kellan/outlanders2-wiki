// Runs every check in scripts/checks/, one file per change, so parallel pull requests add files
// instead of appending to the same lines of the big check scripts. Each file asserts on import.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath,pathToFileURL} from 'node:url';
const dir=fileURLToPath(new URL('./checks/',import.meta.url));
const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.mjs')).sort():[];
for(const f of files)await import(pathToFileURL(path.join(dir,f)).href);
console.log(`PASS: ${files.length} per-change check file${files.length===1?'':'s'} in scripts/checks/.`);
