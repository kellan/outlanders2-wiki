// PR 116: the developers announced the next story on 12 November 2026. PR 119: the maintainer reported it live on 19 November 2026, so its spoiler holds were lifted.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ');
const sp=JSON.parse(fs.readFileSync(new URL('../../content/spoilers.json',import.meta.url),'utf8')).entries;
assert.ok(!sp.some(e=>e.id==='Oona.000'||/^Campaign3_Level2/.test(e.id)||e.id==='Swamp'),'Oona, her levels and the Wetlands are no longer held back');
const V=JSON.parse(fs.readFileSync(new URL('../../content/reference/availability.json',import.meta.url),'utf8'));
const o=V.entries.find(e=>e.id==='Oona.000');assert.equal(o.availability_status,'official_release_notes_evidence');assert.equal(o.release_date,'2026-11-19');// PR 124: patch notes replace the maintainer report
assert.match(o.release_report,/reported Oona’s content live on 19 November 2026\. The developers announced it on 12 November 2026 as coming soon in an update called Oona’s Potion\./);
const hero=strip(h.render('heroes/oona/'));assert.ok(hero.includes('Released · official notes')&&!hero.includes('Spoiler warning'),'hero page public and marked released');
assert.ok(strip(h.render('levels/clause/')).includes('Released · official notes'),'her levels inherit the release status');
console.log('PASS: Oona announced (12 Nov) and released (19 Nov, official patch notes); holds lifted.');
