'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {analyze,LIMIT}=require('../lib/draft-check.js');
const {build}=require('../lib/prompt-core.js');
const {serialize}=require('../lib/narration.js');
assert.equal(analyze('  ').error,'empty');
assert.equal(analyze('文'.repeat(LIMIT+1)).error,'limit');
assert.equal(analyze('🎧'.repeat(20)).chars,20);
const draft='A normal paragraph.\r\n\r\nSource: https://example.org/source\r\n\r\n| Topic | Detail |\r\n| --- | --- |\r\n| Name | Value |\r\n\r\n```js\r\nalert(1)';
const report=analyze(draft);
assert(report.issues.some(x=>x.type==='link'&&x.line===3));
assert(report.issues.some(x=>x.type==='table'));
assert(report.issues.some(x=>x.type==='unclosed'));
for(const issue of report.issues)assert.equal(draft.slice(issue.start,issue.end).includes('\r'),false);
assert.equal(analyze('This is one clear spoken paragraph.').issues.length,0);
assert(analyze('word '.repeat(121)).issues.some(x=>x.type==='long'));
assert(analyze('The formula is $x+y$.').issues.some(x=>x.type==='formula'));
const source='Literal source note: <script>not executable</script>';
for(const lang of ['zh','en']){
 const result=build({lang,genre:'history',topic:'Voyager',sources:source,length:3000,tone:'plain',level:'beginner'});
 assert(result.includes(source)&&result.includes('Voyager'));
 assert(result.includes(lang==='zh'?'不要假装已读':'Never pretend'));
}
assert.throws(()=>build({lang:'en',topic:''}));
const title='A title',body='Paragraph one.\r\n\r\nParagraph two.';
assert.equal(serialize(title,body),'A title\n\nParagraph one.\n\nParagraph two.\n');
assert.equal(serialize('',body),'Paragraph one.\n\nParagraph two.\n');
assert.throws(()=>serialize('Title','  '));
assert.throws(()=>serialize(null,body));
for(const name of ['kit.js','lib/prompt-core.js','lib/draft-check.js','lib/narration.js']){
 const text=fs.readFileSync(require('node:path').join(__dirname,'..',name),'utf8');
 assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|eval\s*\(/.test(text),name+' must stay local and storage-free');
}
console.log('PASS: text preservation, Unicode, review boundaries, source separation, bilingual prompts, and no network or storage calls.');
