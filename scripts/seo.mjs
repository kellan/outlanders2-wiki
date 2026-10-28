// Search-engine and agent metadata for the static build: per-page description, canonical URL,
// link previews and JSON-LD, plus sitemap.xml, robots.txt, llms.txt and 404.html at the site root.
// Old addresses (aliases) keep their content but point their canonical link at the real page.
import fs from 'node:fs';import path from 'node:path';

const SITE_NAME='Outlanders 2 Wiki';
const DEFAULT_IMAGE='wiki-artwork/minibiome-evergreen.png';
const GAME={'@type':'VideoGame',name:'Outlanders 2',author:{'@type':'Organization',name:'Pomelo Games'}};

const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');
const text=html=>decode(html.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').replace(/ ([.,;:!?)])/g,'$1').replace(/\( /g,'(').trim();
const attr=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function clip(s,n=158){if(s.length<=n)return s;const cut=s.slice(0,n-1);return cut.slice(0,cut.lastIndexOf(' ')>n*0.6?cut.lastIndexOf(' '):cut.length).replace(/[\s,;:.–-]+$/,'')+'…'}

export function siteUrl(project){return 'https://'+fs.readFileSync(path.join(project,'assets/CNAME'),'utf8').trim()}

// A page's own summary: the field-guide description, header lede or first prose paragraph,
// then infobox facts (type, cost, workers, what it makes or restores) while there is room.
const SKIP_FACTS=/^(Objectives|Levels|Added in|Footprint)$/;
export function describe(name,content,fallback){
 const lead=[/<p class="fg-desc">([\s\S]*?)<\/p>/,/<p class="lede">([\s\S]*?)<\/p>/,/<div class="prose">\s*<p>([\s\S]*?)<\/p>/].map(r=>content.match(r)).map(m=>m&&text(m[1])).find(t=>t&&t.length>20)||'';
 const box=content.match(/<aside class="infobox">[\s\S]*?<\/aside>/),facts=box?[...box[0].matchAll(/<dt>([\s\S]*?)<\/dt><dd>([\s\S]*?)<\/dd>/g)].map(m=>[text(m[1]),text(m[2]).replace(/ \(each\)/g,'')]).filter(([k,v])=>v&&!SKIP_FACTS.test(k)).map(([k,v])=>`${k}: ${v}.`):[];
 let body=lead?lead.replace(/([^.!?…])$/,'$1.'):'';for(const f of facts){if((body+' '+f).length>190)break;body=body?body+' '+f:f}
 if(!body)return fallback;
 return clip(body.toLowerCase().startsWith(name.toLowerCase())?body:`${name} (Outlanders 2): ${body}`);
}

function crumbs(content,site){const m=content.match(/<div class="crumbs">([\s\S]*?)<\/div>/);if(!m)return [];const out=[];for(const a of m[1].matchAll(/<a href="([^"]*)">([\s\S]*?)<\/a>/g))out.push({name:text(a[2]),url:new URL(a[1],site+'/').href});const last=m[1].split(/<\/a>/).pop();const tail=text(last.replace(/<span>›<\/span>/g,''));if(tail)out.push({name:tail});return out}

function image(content,site,canonical){const m=content.match(/<div class="detail-icon">[\s\S]*?<img[^>]+src="([^"]+)"/)||content.match(/<img class="[^"]*detail-(?:portrait|landscape)[^"]*"[^>]+src="([^"]+)"/);return new URL(m?m[1]:DEFAULT_IMAGE,m&&!m[1].startsWith('/')?canonical:site+'/').href}

export function headTags({site,route,canonicalRoute,title,content,description,isAlias}){
 const canonical=site+'/'+canonicalRoute,img=image(content,site,canonical),bc=crumbs(content,site);
 const graph=[{'@type':'WebSite','@id':site+'/#website',name:SITE_NAME,url:site+'/',inLanguage:'en',about:GAME},{'@type':route?'WebPage':'WebSite','@id':canonical+'#page',url:canonical,name:title,description,isPartOf:{'@id':site+'/#website'},about:GAME,inLanguage:'en',...(bc.length?{breadcrumb:{'@id':canonical+'#breadcrumb'}}:{})}];
 if(bc.length)graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:bc.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,...(c.url?{item:c.url}:{})}))});
 return [`<link rel="canonical" href="${attr(canonical)}">`,isAlias?'<meta name="robots" content="noindex, follow">':'',
  `<meta property="og:site_name" content="${SITE_NAME}">`,`<meta property="og:type" content="${route?'article':'website'}">`,`<meta property="og:title" content="${attr(title)}">`,`<meta property="og:description" content="${attr(description)}">`,`<meta property="og:url" content="${attr(canonical)}">`,`<meta property="og:image" content="${attr(img)}">`,
  '<meta name="twitter:card" content="summary">',`<meta name="twitter:title" content="${attr(title)}">`,`<meta name="twitter:description" content="${attr(description)}">`,
  `<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>`].filter(Boolean).join('');
}

const SECTIONS=[['','Wiki home'],['buildings','Buildings'],['plants','Plants'],['resources','Resources'],['food','Food'],['production-chains','Production chains'],['mechanics','Mechanics'],['levels','Campaigns & levels'],['challenges','Challenges'],['tournament','Tournament Mode'],['biomes','Biomes'],['heroes','Leaders'],['index','All-pages A–Z index'],['changelog','Changelog'],['about','Sources & artwork']];
const TYPE_TITLES={buildings:'Buildings',plants:'Plants',resources:'Resources',chains:'Production chains',levels:'Levels',campaigns:'Campaigns',challenges:'Challenge types',heroes:'Leaders',biomes:'Biomes'};

export function writeSiteFiles({root,site,pages,descriptions,notFoundHtml}){
 const canon=pages.filter(p=>!p.spoiler);
 fs.writeFileSync(root+'sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`<url><loc>${site}/${p.path.replace(/&/g,'&amp;')}</loc></url>`).join('\n')}\n</urlset>\n`);
 fs.writeFileSync(root+'robots.txt',`# Search engines and AI assistants are welcome to read and cite this wiki.\nUser-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
 const data=fs.readdirSync(root+'data').filter(f=>f.endsWith('.json')).sort();
 const groups=Object.entries(TYPE_TITLES).map(([t,title])=>[title,canon.filter(p=>p.type===t&&p.id&&!p.path.startsWith('verification/'))]).filter(([,ps])=>ps.length);
 const line=p=>`- [${p.name}](${site}/${p.path})${descriptions[p.path]?': '+descriptions[p.path].replace(/^.*?\(Outlanders 2\): /,''):''}`;
 fs.writeFileSync(root+'llms.txt',`# ${SITE_NAME}\n\n> An unofficial, evidence-backed reference for the city-builder Outlanders 2 by Pomelo Games: buildings, plants, resources, food, production chains, villager needs, campaigns, challenge levels, biomes and leaders. Values come from the game's own files (version 30, build 254) and are labelled when they have not been checked in play.\n\nEvery page is static HTML at a clean URL. Each article links to a "Sources & research" page with the evidence behind it, under ${site}/verification/.\n\n## Sections\n\n${SECTIONS.map(([p,n])=>`- [${n}](${site}/${p?p+'/':''})`).join('\n')}\n\n## Data downloads\n\nThe complete datasets behind the pages, as JSON:\n\n${data.map(f=>`- [${f}](${site}/data/${f})`).join('\n')}\n\n${groups.map(([title,ps])=>`## ${title}\n\n${ps.map(line).join('\n')}`).join('\n\n')}\n\n## Optional\n\n- [Spoilers](${site}/spoilers/): content in the game files that is not yet released\n- [Contribute](${site}/contribute/): how to report a correction or add a strategy\n`);
 fs.writeFileSync(root+'404.html',notFoundHtml);
 return {sitemap:pages.length,llms:groups.reduce((n,[,ps])=>n+ps.length,0)};
}
