'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {catalog,fields,conflicts}=require('../lib/complete-examples.js');
const {serialize}=require('../lib/narration.js');
for(const topic of Object.keys(catalog)){
  for(const language of ['zh','en']){
    const example=catalog[topic][language];
    const incoming=fields(example);
    assert.equal(incoming.draft,incoming.body);
    assert(example.title&&example.body.length>1000&&example.references.includes('https://'));
    assert(!example.body.includes('https://'));
    assert.equal(conflicts({draft:'',title:'',body:'',references:''},example).length,0);
    assert.equal(conflicts({...incoming},example).length,0);
    const current={...incoming,body:'My unsaved narration 🎧\r\nwith a source note.'};
    const before=JSON.stringify(current);
    assert.deepEqual(conflicts(current,example),['body']);
    assert.equal(JSON.stringify(current),before);
    for(const name of Object.keys(incoming)){
      assert.deepEqual(conflicts({...incoming,[name]:'unsaved '+name},example),[name]);
    }
    assert.deepEqual(conflicts({draft:'a',title:'b',body:'c',references:'d'},example),['draft','title','body','references']);
    const narration=serialize(example.title,example.body);
    assert(!narration.includes('https://'));
    assert(!narration.includes('核查日期'));
    assert(narration.endsWith('\n'));
    assert.notEqual(example.body,catalog[topic][language==='zh'?'en':'zh'].body);
  }
}
assert.throws(()=>fields(null));
const source=fs.readFileSync(path.join(__dirname,'../lib/complete-examples.js'),'utf8');
assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|eval\s*\(/.test(source));
console.log('PASS: all complete bilingual texts, source separation and every overwrite conflict; no input mutation, network or storage calls.');
