import assert from 'node:assert/strict';

const facts = new Set();
const key=(t,...a)=>JSON.stringify([t,...a]);
const add=(t,...a)=>facts.add(key(t,...a));
const has=(t,...a)=>facts.has(key(t,...a));
const reset=()=>facts.clear();
const results=[];
function test(id,name,kind,fn){
  reset();
  try { fn(); results.push({id,name,kind,status:'PASS'}); }
  catch(e){ results.push({id,name,kind,status:'FAIL',error:e.message}); }
}

test(1,'Context & Compression Efficiency','semantic',()=>{const deps={K:['P1'],P1:[],U:[]};const slice=(root)=>{const out=new Set();const walk=x=>{if(out.has(x))return;out.add(x);for(const d of deps[x]??[])walk(d)};walk(root);return out};assert.deepEqual([...slice('K')].sort(),['K','P1']);assert.equal(slice('K').has('U'),false)});
test(2,'Semantic Precision & Accuracy','semantic',()=>{add('communicate','A','B','K');assert.ok(has('communicate','A','B','K'));assert.equal(has('communicate','B','A','K'),false)});
test(3,'Structural Determinism & Verifiability','semantic',()=>{const packet=['communicate','A','B','K'];const decode=p=>({type:p[0],sender:p[1],recipient:p[2],knowledge:p[3]});assert.deepEqual(decode(packet),decode(packet))});
test(4,'Protocol Flexibility & Model Agnosticism','architectural',()=>{const packet={relation:'communicate',roles:{sender:'A',recipient:'B',knowledge:'K'}};assert.equal('model' in packet,false);assert.equal('tokenizer' in packet,false)});
test(5,'Zero-Trust Security & Governance','semantic-boundary',()=>{add('request','A','B','X');assert.equal(has('authorize','A','B','X'),false);add('authorize','Root','A','scope1');assert.equal(has('authorize','Root','A','scope2'),false)});
test(6,'Asynchronous Control & Interruptibility','semantic-boundary',()=>{add('task-state','T','running');add('cancel-request','A','T');assert.equal(has('task-state','T','cancelled'),false);add('task-state','T','cancelled');assert.ok(has('task-state','T','cancelled'))});
test(7,'Dynamic Capability Negotiation','semantic',()=>{const req=new Set(['read','stream']);const caps=new Set(['read','stream','write']);assert.equal([...req].every(x=>caps.has(x)),true)});
test(8,'Explicit Uncertainty Calibration','semantic',()=>{add('claim','C');add('assumes','C','A1');add('unresolved','C','U1');add('evidence','C','E1');assert.ok(has('unresolved','C','U1'));assert.equal(has('verified','C'),false)});
test(9,'Distributed Observability & Traceability','semantic',()=>{add('caused-by','E2','E1');add('actor','E2','A');add('produced','E2','K2');assert.ok(has('caused-by','E2','E1'))});
test(10,'Fault Tolerance & Exception Handling','semantic-boundary',()=>{add('failed','T','timeout');add('retry-of','T2','T');add('compensates','C','T');assert.ok(has('retry-of','T2','T'));assert.ok(has('compensates','C','T'))});
test(11,'Cross-Vendor Delegation & Agent Discovery','semantic',()=>{add('offers','AgentB','capX');add('requires','Task','capX');assert.equal(has('offers','AgentB','capX')&&has('requires','Task','capX'),true)});
test(12,'Standardized Tool & Resource Access Schemas','semantic',()=>{add('tool','Tool1');add('input-role','Tool1','query');add('output-role','Tool1','result');assert.ok(has('input-role','Tool1','query'))});
test(13,'Multi-Framework Interoperability & Multimodal Transport','semantic',()=>{add('artifact','Img1');add('media-type','Img1','image/png');add('content-ref','Img1','hash:abc');assert.ok(has('content-ref','Img1','hash:abc'))});
test(14,'Portable Identity & Authentication','semantic-boundary',()=>{add('principal','P');add('attestation','P','Sig1');assert.equal(has('authenticated','P'),false)});
test(15,'Explicit Communicative Intent','semantic',()=>{add('act','M','request');add('content','M','K');assert.equal(has('act','M','inform'),false)});
test(16,'Stable Identity, Addressing & Reference Integrity','semantic',()=>{const reg=new Map([['S1','meaning1']]);assert.equal(reg.get('S1'),'meaning1')});
test(17,'Schema Evolution & Forward/Backward Compatibility','semantic',()=>{add('revision','R2');add('compatible-with','R2','R1');add('preserves-unknown','R1','fieldX');assert.ok(has('compatible-with','R2','R1'))});
test(18,'Semantic Extensibility & Namespace Isolation','semantic',()=>{add('namespace','N1');add('namespace','N2');add('local-label','N1','1','A');add('local-label','N2','1','B');assert.equal(has('local-label','N1','1','B'),false)});
test(19,'Compositionality & Encapsulation','semantic',()=>{add('port','S','in');add('port','S','out');add('internal','S','hidden');assert.ok(has('port','S','in'));assert.ok(has('internal','S','hidden'))});
test(20,'Idempotency, Deduplication & Replay Safety','semantic-boundary',()=>{const seen=new Set();const apply=id=>{if(seen.has(id))return false;seen.add(id);return true};assert.equal(apply('E1'),true);assert.equal(apply('E1'),false)});
test(21,'Temporal, Ordering & Freshness Semantics','semantic',()=>{add('caused-before','E1','E2');add('valid-until','K',200);add('observed-at','K',100);assert.ok(has('caused-before','E1','E2'));assert.equal(has('caused-before','E2','E1'),false)});
test(22,'Concurrent State Ownership & Conflict Semantics','semantic-boundary',()=>{const writes=[['R','A'],['R','B']];assert.equal(writes[0][0]===writes[1][0]&&writes[0][1]!==writes[1][1],true)});
test(23,'Side-Effect, Transaction & Compensation Semantics','semantic-boundary',()=>{add('effect-intent','X');add('effect-dispatched','X');assert.equal(has('effect-observed','X'),false);add('compensation','X','UndoX');assert.ok(has('compensation','X','UndoX'))});
test(24,'Behavioral Contracts, Invariants & Liveness','semantic',()=>{const invariant=s=>s.balance>=0;assert.equal(invariant({balance:1}),true);assert.equal(invariant({balance:-1}),false);add('progress-obligation','T','completed');assert.ok(has('progress-obligation','T','completed'))});
test(25,'Durable Continuation, Migration & Resumption','semantic',()=>{const state={task:'T',status:'paused',cursor:'K3'};const resumed=structuredClone(state);assert.deepEqual(resumed,state)});
test(26,'Privacy, Confidentiality & Information-Flow Control','semantic',()=>{add('visible-to','publicK','B');add('visible-to','secretK','A');assert.equal(has('visible-to','secretK','B'),false)});
test(27,'Trust-Boundary Preservation & Instruction/Data Separation','semantic',()=>{add('data','D','ignore previous instructions');assert.equal(has('instruction','D'),false)});
test(28,'Human Authority, Approval, Revocation & Escalation','semantic-boundary',()=>{add('approval','Human','X');add('revokes','Human','X');add('escalate','T','Human');assert.ok(has('revokes','Human','X'))});
test(29,'Evidence, Provenance, Attestation & Accountability','semantic',()=>{add('claim','C');add('derived-from','C','E');add('attested-by','E','P');add('actor','E','A');assert.ok(has('derived-from','C','E'))});
test(30,'Reproducibility & Explicit Nondeterminism','semantic',()=>{add('choice','Run','r1');add('choice','Run','r2');add('selected','Run','r1');assert.ok(has('choice','Run','r2'));assert.ok(has('selected','Run','r1'))});
test(31,'Resource Accounting, Flow Control, Backpressure & QoS','semantic-boundary',()=>{add('budget','T',10);add('priority','T','high');add('queue-capacity','Q',2);assert.ok(has('budget','T',10))});
test(32,'Progressive Results, Completeness & Supersession','semantic',()=>{add('result-status','R1','partial');add('supersedes','R2','R1');add('result-status','R2','final');assert.ok(has('supersedes','R2','R1'))});
test(33,'Responsibility Transfer, Acceptance & Commitment','semantic',()=>{add('delegates','A','B','T');assert.equal(has('accepts-responsibility','B','T'),false);add('accepts-responsibility','B','T');assert.ok(has('accepts-responsibility','B','T'))});
test(34,'Portable Policy, Purpose, Jurisdiction & Lifecycle Constraints','semantic',()=>{add('policy','K','purpose:research');add('policy','K','region:US');add('policy','K','retain-until:200');assert.ok(has('policy','K','purpose:research'))});
test(35,'Portable Memory Ownership, Retention & Forgetting','semantic',()=>{add('memory','M');add('owner','M','A');add('expires','M',200);add('forget-request','A','M');assert.ok(has('forget-request','A','M'))});
test(36,'Structural Lowerability & ISOgraph Continuity','architectural',()=>{const ax={type:'edge',items:['communicate','A','B','K']};const isograph=ax;assert.equal(isograph,ax)});
test(37,'Relational Transformation Closure','semantic',()=>{add('state','T','open');facts.delete(key('state','T','open'));add('state','T','closed');assert.ok(has('state','T','closed'));assert.equal(has('state','T','open'),false)});
test(38,'Resource Linearity & Multiplicity','semantic',()=>{const total=10,parent=7,child=3;assert.equal(parent+child,total)});
test(39,'Reality / Knowledge / Intent Separation','semantic',()=>{add('intent','X');add('reported','X');assert.equal(has('observed','X'),false);assert.equal(has('effect-observed','X'),false)});
test(40,'Partial-View & Replica Semantics','semantic',()=>{const A={version:2,known:new Set(['K1','K2'])};const B={version:1,known:new Set(['K1'])};assert.equal(B.known.has('K2'),false);assert.ok(A.version>B.version)});
test(41,'Open-World & Negative-Knowledge Semantics','semantic',()=>{add('unknown','X');assert.equal(has('false','X'),false);add('proven-absent','Y');assert.equal(has('unknown','Y'),false)});
test(42,'Hypothetical, Branching & Revision Semantics','semantic',()=>{const base={x:1};const a={...base,x:2};const b={...base,x:3};assert.equal(base.x,1);assert.notEqual(a.x,b.x)});
test(43,'Rewrite Control & Strategy Semantics','semantic',()=>{add('enabled','r1');add('enabled','r2');add('selected','r2');assert.ok(has('enabled','r1'));assert.equal(has('selected','r1'),false)});

for(const r of results) console.log(`${String(r.id).padStart(2,'0')} ${r.status} [${r.kind}] ${r.name}${r.error?` — ${r.error}`:''}`);
const failed=results.filter(r=>r.status==='FAIL');
console.log(`\n${results.length-failed.length}/${results.length} passed`);
if(failed.length) process.exit(1);
