// Site search with Pagefind: marks which pages and which parts of a page are indexed, builds the
// /search/ page, and writes the index to dist/pagefind/ after the static pages exist.
// Indexed: canonical article and directory pages. Left out: old addresses (aliases), research
// companion pages (each article links to its own), spoiler pages, 404 and the search page itself.
import * as pagefind from 'pagefind';

const SECTIONS=[[/^buildings\//,'Buildings'],[/^plants\//,'Plants'],[/^food\//,'Food'],[/^resources\//,'Resources'],[/^production-chains\//,'Production chains'],[/^(levels|campaigns)\//,'Levels'],[/^challenges\//,'Challenges'],[/^tournament\//,'Tournament Mode'],[/^heroes\//,'Leaders'],[/^biomes\//,'Biomes'],[/^(mechanics|needs|need|eating|happiness|villagers|heat-cooling-water|time|gear|houses|gathering-places|sandbox)\//,'Mechanics']];
export function sectionFor(route){return (SECTIONS.find(([re])=>re.test(route))||[,'Reference'])[1]}
export function indexable({route,canonicalRoute,type,spoiler}){return route===canonicalRoute&&type!=='evidence'&&type!=='verification'&&!spoiler&&!route.startsWith('spoilers/')}

// Keep navigation chrome out of results: breadcrumbs, eyebrows, the repeated infobox title, navboxes,
// evidence links and edit actions. Spaces between infobox labels and values keep excerpts readable,
// and the result title is the page's own title ("Glassworks production chain", not just "Glassworks").
export function markContent(content,route,title){
 const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 return content.replace(/<div class="crumbs">/g,'<div class="crumbs" data-pagefind-ignore>').replace(/<p class="eyebrow">/g,'<p class="eyebrow" data-pagefind-ignore>').replace(/<h3 class="infobox-title">/g,'<h3 class="infobox-title" data-pagefind-ignore>').replace(/<\/dt><dd>/g,'</dt> <dd>').replace(/<\/dd><\/div><div>/g,'</dd></div> <div>').replace(/<(div|nav|section) class="navbox/g,'<$1 data-pagefind-ignore class="navbox').replace(/<p class="(article-actions|article-evidence-link|verify-badge)">/g,'<p class="$1" data-pagefind-ignore>')+`<span hidden data-pagefind-filter="section:${sectionFor(route)}"></span>`+(title?`<span hidden data-pagefind-ignore data-pagefind-meta="title">${esc(title)}</span>`:'');
}

export function searchPageContent(){
 return `<div class="page-header"><p class="eyebrow">SEARCH</p><h1>Search the wiki</h1><p class="lede">Every building, plant, resource, level and mechanic page. Narrow the results by section.</p></div><div id="search" class="site-search"></div><noscript><p>Search needs JavaScript. The <a href="./index/">A–Z index</a> lists every page.</p></noscript>`;
}
export function searchPageScripts(base){
 return `<link rel="stylesheet" href="${base}pagefind/pagefind-ui.css"><script src="${base}pagefind/pagefind-ui.js"></script><script>window.addEventListener('DOMContentLoaded',function(){var ui=new PagefindUI({element:'#search',bundlePath:'${base}pagefind/',showSubResults:true,showImages:false,openFilters:matchMedia('(min-width:701px)').matches?['section']:[],resetStyles:false,translations:{placeholder:'Search buildings, food, levels, mechanics…'}});var q=new URLSearchParams(location.search).get('q');if(q)ui.triggerSearch(q)})</script>`;
}

export async function writeSearchIndex(root){
 const {index,errors}=await pagefind.createIndex({forceLanguage:'en'});if(errors?.length)throw new Error('Pagefind: '+errors.join('; '));
 const added=await index.addDirectory({path:root});if(added.errors?.length)throw new Error('Pagefind: '+added.errors.join('; '));
 const written=await index.writeFiles({outputPath:root+'pagefind'});if(written.errors?.length)throw new Error('Pagefind: '+written.errors.join('; '));
 await pagefind.close();return added.page_count;
}
