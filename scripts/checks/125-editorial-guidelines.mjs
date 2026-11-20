// PR 125: editorial rules and agent notes are written down where contributors look.
import assert from 'node:assert/strict';import fs from 'node:fs';
const r=p=>fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const plan=r('docs/EDITORIAL-CLEANUP-PLAN.md');for(const t of ['Use the game\'s names','Size a mechanic by what it changes','Only describe what can happen in play','Keep how-we-checked out of reader pages','No special cases for one entity'])assert.ok(plan.includes(t),t);
const c=r('CONTRIBUTING.md');assert.ok(c.includes('m_IsActive')&&c.includes('internal content gate'),'evidence rules');
const a=r('AGENTS.md');assert.ok(a.includes('Answer the question you were asked first')&&a.includes('Number from GitHub'),'agent notes');
console.log('PASS: editorial rules in the plan, evidence rules in CONTRIBUTING, AGENTS.md present.');
