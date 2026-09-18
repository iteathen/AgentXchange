import fs from 'node:fs';
import assert from 'node:assert/strict';

const files=['CORPUS_ALPHA.isg','CORPUS_BETA.isg','CORPUS_GAMMA.isg'];

function tokenize(src){
  const out=[]; const re=/\s+|([\[\]\(\)])|(\^\d+)|(-?\d+)/gy; let i=0;
  while(i<src.length){
    re.lastIndex=i; const m=re.exec(src);
    if(!m||m.index!==i) throw new Error(`unexpected token at ${i}`);
    i=re.lastIndex; if(/^\s+$/.test(m[0])) continue; out.push(m[0]);
  }
  return out;
}

function parse(src){
  const t=tokenize(src); let i=0;
  function term(){
    const x=t[i++];
    if(x==='['){const items=[]; while(t[i]!==']'){if(i>=t.length)throw new Error('unclosed scope');items.push(term())}i++;return{type:'scope',items}}
    if(x==='('){const items=[]; while(t[i]!==')'){if(i>=t.length)throw new Error('unclosed edge');items.push(term())}i++;return{type:'edge',items}}
    if(/^\^\d+$/.test(x))return{type:'label',value:Number(x.slice(1))};
    if(/^-?\d+$/.test(x))return{type:'si',value:Number(x)};
    throw new Error(`bad term ${x}`);
  }
  const roots=[];while(i<t.length)roots.push(term());return roots;
}

function edges(ast){
  const out=[];
  const walk=n=>{
    if(n.type==='edge'){out.push(n);for(const x of n.items)walk(x)}
    if(n.type==='scope')for(const x of n.items)walk(x)
  };
  for(const n of ast)walk(n); return out;
}

const parsed={};
for(const f of files){
  const src=fs.readFileSync(new URL(f,import.meta.url),'utf8');
  parsed[f]=edges(parse(src));
}

assert.equal(parsed['CORPUS_ALPHA.isg'].length,9);
assert.equal(parsed['CORPUS_BETA.isg'].length,9);
assert.equal(parsed['CORPUS_GAMMA.isg'].length,8);

function eventIds(es){return es.map(e=>e.items[1]?.value)}
for(const [f,es] of Object.entries(parsed)){
  const ids=eventIds(es);
  assert.equal(new Set(ids).size,ids.length,`${f} duplicate event SI`);
  for(const e of es){
    assert.equal(e.items[0]?.type,'label',`${f} relation head`);
    assert.equal(e.items[1]?.type,'si',`${f} event id`);
  }
}

const ranges={
  'CORPUS_ALPHA.isg':[96100,96200],
  'CORPUS_BETA.isg':[96200,96300],
  'CORPUS_GAMMA.isg':[96300,96400]
};
for(const [f,es] of Object.entries(parsed)){
  const [lo,hi]=ranges[f];
  for(const e of es){const l=e.items[0].value;assert.ok(l>lo&&l<hi,`${f} label namespace`)}
}

console.log('PASS parse all three native packets');
console.log('PASS expected relation counts 9 / 9 / 8');
console.log('PASS event SIs unique per source');
console.log('PASS source-local relation label namespaces separated');
console.log('4/4 preflight checks passed');
