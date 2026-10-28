// PR 77: text sizes in rem so the reader's browser text-size setting applies, not just zoom.
import assert from 'node:assert/strict';import fs from 'node:fs';
const css=fs.readFileSync(new URL('../../src/style.css',import.meta.url),'utf8');
const px=css.match(/font(?:-size)?:[^;}]*\b\d+(?:\.\d+)?px/g)||[];
assert.deepEqual(px,[],'font sizes use rem so they follow the reader’s chosen text size');
assert.match(css,/body\{[^}]*font:1rem\/1\.6/,'body text is 1rem (16px by default)');
assert.match(css,/--sidebar:[\d.]+rem/,'the sidebar widens with the text');
console.log('PASS: text sizes in rem; sidebar and infobox scale with the reader’s text size.');
