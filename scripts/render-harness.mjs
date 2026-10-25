import fs from 'node:fs';import vm from 'node:vm';import {fileURLToPath} from 'node:url';
export const root=fileURLToPath(new URL('../dist/',import.meta.url));
export async function harness(prefix='/'){
 const elements=Object.fromEntries(['#content','#nav','#search','#menu','.skip'].map(k=>[k,{innerHTML:'',value:'',setAttribute(){},focus(){},blur(){}}]));
 const document={currentScript:{src:'https://wiki.invalid'+prefix+'app.js'},querySelector:s=>elements[s]||null,querySelectorAll:()=>[],getElementById:()=>null,body:{classList:{remove(){},toggle(){return true}}},activeElement:{tagName:'BODY'}};
 const ctx=vm.createContext({document,window:{},location:{href:'https://wiki.invalid'+prefix,pathname:prefix,hash:''},URL,console,fetch:async u=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(root+'/data/'+new URL(u).pathname.split('/').at(-1),'utf8'))}),addEventListener(){},scrollTo(){},setTimeout,clearTimeout});
 vm.runInContext(fs.readFileSync(root+'/app.js','utf8'),ctx);await vm.runInContext('start()',ctx);
 return {ctx,elements,pages:vm.runInContext('pages',ctx),lookup:vm.runInContext('routeLookup',ctx),render(path){ctx.location.pathname=prefix+path;vm.runInContext('render()',ctx);return elements['#content'].innerHTML},query(q,path=''){ctx.location.pathname=prefix+path;vm.runInContext('query='+JSON.stringify(q)+';render()',ctx);return elements['#content'].innerHTML}};
}
