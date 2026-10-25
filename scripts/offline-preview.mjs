import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=fileURLToPath(new URL('../',import.meta.url));
const root=path.join(project,'dist'),preview=path.join(project,'preview');
fs.mkdirSync(preview,{recursive:true});
for(const name of ['LICENSE.txt','THIRD_PARTY_NOTICES.txt','style.css','data','wiki-artwork','gameplay-evidence']){
 const target=path.join(preview,name);if(!fs.existsSync(target))fs.symlinkSync(path.relative(preview,path.join(root,name)),target);
}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'pages.json')));
for(const route of manifest.paths){
 let html=fs.readFileSync(path.join(root,route,'index.html'),'utf8');
 html=html.replace(/href="([^"]*\/)"/g,(_,href)=>`href="${href}index.html"`);
 const folder=path.join(preview,route);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),html);
}
const output=process.argv[2]||fileURLToPath(new URL('../../outlanders2-wiki-preview.html',import.meta.url));
let home=fs.readFileSync(path.join(preview,'index.html'),'utf8');
const base=path.relative(path.dirname(output),preview).split(path.sep).join('/')+'/';
home=home.replace(/(href|src)="(?!#|https?:|data:)([^"]*)"/g,(_,attr,url)=>`${attr}="${base}${url.replace(/^\.\//,'')}"`);
fs.writeFileSync(output,home);console.log('Static file preview written: '+output);
