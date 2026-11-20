// PR 127: the Spoilers page leads with what each unseen tournament season brings; the method note is short and at the end.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),t=h.render('spoilers/').replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.ok(t.indexOf('Tournament seasons waiting in the files')<t.indexOf('How we tell'),'seasons before the method note');
assert.match(t,/Holiday Not seen in game yet Holiday-dressed Playground, Winter Cabin, Bonfire, Tailor, Winter Pub and Fondue Bar/);
assert.match(t,/on Evergreen maps the trees turn snowy/);assert.match(t,/Imperial Not seen in game yet Imperial-styled Plank House/);assert.match(t,/Egyptian-styled Lumberjacks’ Base/);
assert.ok(t.indexOf('Holiday Not seen')<t.indexOf('Egyptian Not seen'),'Holiday first');
console.log('PASS: Spoilers page leads with what each unseen season brings.');
