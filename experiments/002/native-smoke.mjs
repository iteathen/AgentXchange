import fs from 'node:fs';
import assert from 'node:assert/strict';

function tokenize(src) {
  const out=[];
  const re=/\s+|([\[\]\(\)])|(\^\d+)|(#-?\d+(?:\/\d+)?)|(-?\d+)/gy;
  let i=0;
  while (i<src.length) {
    re.lastIndex=i;
    const m=re.exec(src);
    if (!m || m.index!==i) throw new Error(`unexpected token at ${i}: ${JSON.stringify(src.slice(i,i+20))}`);
    i=re.lastIndex;
    if (/^\s+$/.test(m[0])) continue;
    out.push(m[0]);
  }
  return out;
}

function parse(src) {
  const t=tokenize(src); let i=0;
  function term() {
    const x=t[i++];
    if (x==='[') { const items=[]; while(t[i]!==']') { if(i>=t.length) throw new Error('unclosed scope'); items.push(term()); } i++; return {type:'scope',items}; }
    if (x==='(') { const items=[]; while(t[i]!==')') { if(i>=t.length) throw new Error('unclosed edge'); items.push(term()); } i++; return {type:'edge',items}; }
    if (/^\^\d+$/.test(x)) return {type:'label',value:x};
    if (/^#/.test(x)) return {type:'literal',value:x};
    if (/^-?\d+$/.test(x)) return {type:'si',value:Number(x)};
    throw new Error(`bad term ${x}`);
  }
  const roots=[]; while(i<t.length) roots.push(term()); return roots;
}

const vocab={
  '^95001':{name:'communicate',arity:4},
  '^95002':{name:'request',arity:4},
  '^95003':{name:'authorize',arity:4},
  '^95004':{name:'effect-observed',arity:2},
  '^95005':{name:'unresolved',arity:2},
  '^95006':{name:'requires-support',arity:3},
};

function decode(ast) {
  const rel=[];
  function walk(n) {
    if(n.type==='edge') {
      const h=n.items[0];
      if(h?.type==='label' && vocab[h.value]) {
        const def=vocab[h.value];
        assert.equal(n.items.length, def.arity, `${h.value} arity`);
        rel.push({type:def.name,args:n.items.slice(1).map(x=>x.value)});
      }
      for(const x of n.items) walk(x);
    } else if(n.type==='scope') for(const x of n.items) walk(x);
  }
  for(const n of ast) walk(n);
  return rel;
}

function has(rs,type,...args){return rs.some(r=>r.type===type && JSON.stringify(r.args)===JSON.stringify(args));}
function load(name){const src=fs.readFileSync(new URL(name, import.meta.url),'utf8'); return decode(parse(src));}

const tests=[];
function test(name,fn){try{fn();tests.push([name,'PASS']);}catch(e){tests.push([name,'FAIL',e.message]);}}

test('P1 minimal communicate reconstructs exactly',()=>{
  const r=load('./PACKET_01_MINIMAL.isg');
  assert.equal(r.length,1);
  assert.ok(has(r,'communicate',100,200,300));
  assert.equal(r.some(x=>['request','authorize','effect-observed','unresolved'].includes(x.type)),false);
});

test('P2 request carries no implicit authority/effect',()=>{
  const r=load('./PACKET_02_REQUEST.isg');
  assert.ok(has(r,'request',100,200,400));
  assert.equal(r.some(x=>x.type==='authorize'),false);
  assert.equal(r.some(x=>x.type==='effect-observed'),false);
});

test('P3 explicit authorization still carries no implicit effect',()=>{
  const r=load('./PACKET_03_AUTHORIZED_REQUEST.isg');
  assert.ok(has(r,'request',100,200,400));
  assert.ok(has(r,'authorize',100,200,400));
  assert.equal(r.some(x=>x.type==='effect-observed'),false);
});

test('P4 unresolved support reconstructs without false/truth commitment',()=>{
  const r=load('./PACKET_04_UNRESOLVED_SUPPORT.isg');
  assert.ok(has(r,'communicate',100,200,500));
  assert.ok(has(r,'requires-support',500,501));
  assert.ok(has(r,'unresolved',501));
  assert.equal(r.some(x=>x.type==='false' || x.type==='true'),false);
});

for (const [n,s,e] of tests) console.log(`${s} ${n}${e?` — ${e}`:''}`);
const fail=tests.filter(x=>x[1]==='FAIL');
console.log(`\n${tests.length-fail.length}/${tests.length} passed`);
if(fail.length) process.exit(1);
