// Changelog assembled from fragments so parallel pull requests never edit the same line.
// changelog/unreleased/<pr-or-slug>.md holds one entry each (one paragraph, no leading dash);
// changelog/<YYYY-MM-DD>.md holds the entries released that day. `npm run changelog` prints the
// assembled text; `npm run changelog:release [date]` moves the unreleased fragments into a dated
// file and rewrites CHANGELOG.md (dated sections only; unreleased entries show on the site).
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export const project=fileURLToPath(new URL('../',import.meta.url));
const dirs=(root=project)=>{const dir=path.join(root,'changelog');return {dir,unreleased:path.join(dir,'unreleased')}};
const HEADER=`# Changelog

What changed on the wiki, newest first, with the page to look at. Entries live as one file per change under \`changelog/\` so pull requests never collide: add \`changelog/unreleased/<pr-number>-<slug>.md\` with one paragraph; \`npm run changelog:release\` dates a batch on merge. The game's own version history is on the [Changelog page](https://outlanders2wiki.com/changelog/) under "Game updates" (\`content/history.json\`). Reasoning and provenance stay in \`CONTENT-NOTES.md\`.
`;
export function fragments(root=project){const {unreleased}=dirs(root);if(!fs.existsSync(unreleased))return [];return fs.readdirSync(unreleased).filter(f=>f.endsWith('.md')).sort().reverse().map(f=>({file:f,text:fs.readFileSync(path.join(unreleased,f),'utf8').trim().replace(/^-\s+/,'')}))}
export function dated(root=project){const {dir}=dirs(root);if(!fs.existsSync(dir))return [];return fs.readdirSync(dir).filter(f=>/^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().reverse().map(f=>({date:f.slice(0,-3),text:fs.readFileSync(path.join(dir,f),'utf8').trim()}))}
export function assemble({includeUnreleased=true,root=project}={}){const u=fragments(root);return HEADER+(includeUnreleased&&u.length?`\n## Unreleased\n\n${u.map(x=>'- '+x.text).join('\n')}\n`:'')+dated(root).map(d=>`\n## ${d.date}\n\n${d.text}\n`).join('')}
export function validate(root=project){for(const x of fragments(root)){if(!x.text)throw new Error('Empty changelog fragment: '+x.file);if(/\n\s*\n/.test(x.text))throw new Error('Changelog fragment must be one paragraph: '+x.file);if(!/^\d+-[a-z0-9-]+\.md$|^[a-z0-9-]+\.md$/.test(x.file))throw new Error('Changelog fragment name must be <pr>-<slug>.md: '+x.file)}return true}
export function release(date=new Date().toISOString().slice(0,10),root=project){const {dir,unreleased}=dirs(root);const u=fragments(root);if(!u.length)return 0;const target=path.join(dir,date+'.md');const prev=fs.existsSync(target)?fs.readFileSync(target,'utf8').trim()+'\n':'';fs.writeFileSync(target,u.map(x=>'- '+x.text).join('\n')+'\n'+prev);for(const x of u)fs.unlinkSync(path.join(unreleased,x.file));fs.writeFileSync(path.join(root,'CHANGELOG.md'),assemble({includeUnreleased:false,root}));return u.length}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const cmd=process.argv[2]||'print';validate();if(cmd==='release'){const n=release(process.argv[3]);console.log(`Released ${n} entries into changelog/`)}else process.stdout.write(assemble())}
