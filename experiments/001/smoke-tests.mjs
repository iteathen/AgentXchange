import assert from 'node:assert/strict';

function makeState() {
  return {
    facts: new Set(),
    materialized: new Set(),
    semanticRegistry: new Map(),
  };
}

function fact(...xs) { return xs.join('|'); }
function addFact(s, ...xs) { s.facts.add(fact(...xs)); }
function hasFact(s, ...xs) { return s.facts.has(fact(...xs)); }
function materialize(s, id) { s.materialized.add(id); }
function obligationsSatisfied(s, deps) { return deps.every(d => s.materialized.has(d)); }

function defineSemantic(s, id, meaning) {
  if (s.semanticRegistry.has(id) && s.semanticRegistry.get(id) !== meaning) {
    throw new Error(`semantic collision for ${id}`);
  }
  s.semanticRegistry.set(id, meaning);
}

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: 'PASS' });
  } catch (e) {
    results.push({ name, status: 'FAIL', error: e.message });
  }
}

test('T1 minimal communication stays minimal', () => {
  const s = makeState();
  addFact(s, 'communicate', 'A', 'B', 'K');

  assert.equal(hasFact(s, 'communicate', 'A', 'B', 'K'), true);
  assert.equal(hasFact(s, 'believes', 'B', 'K'), false);
  assert.equal(hasFact(s, 'verified', 'B', 'K'), false);
  assert.equal(hasFact(s, 'true', 'K'), false);
});

test('T2 claim burden follows required support', () => {
  const s = makeState();

  materialize(s, 'K');
  assert.equal(obligationsSatisfied(s, ['K']), true);
  assert.equal(obligationsSatisfied(s, ['K', 'P']), false);

  materialize(s, 'P');
  assert.equal(obligationsSatisfied(s, ['K', 'P']), true);
});

test('T3 request does not imply authority or effect', () => {
  const s = makeState();

  addFact(s, 'request', 'A', 'B', 'X');
  assert.equal(hasFact(s, 'authorize', 'A', 'B', 'X'), false);
  assert.equal(hasFact(s, 'effect-observed', 'X'), false);

  addFact(s, 'authorize', 'A', 'B', 'X');
  assert.equal(hasFact(s, 'effect-observed', 'X'), false);

  addFact(s, 'effect-observed', 'X');
  assert.equal(hasFact(s, 'effect-observed', 'X'), true);
});

test('T4 unresolved knowledge does not collapse to false', () => {
  const s = makeState();

  addFact(s, 'unresolved', 'U');
  assert.equal(hasFact(s, 'false', 'U'), false);
  assert.equal(hasFact(s, 'true', 'U'), false);
});

test('T5 shared semantic identity has one meaning', () => {
  const s = makeState();

  defineSemantic(s, 'S1', 'relation');
  defineSemantic(s, 'S1', 'relation');

  assert.equal(s.semanticRegistry.get('S1'), 'relation');
  assert.throws(() => defineSemantic(s, 'S1', 'request'), /semantic collision/);
});

for (const r of results) {
  console.log(`${r.status} ${r.name}${r.error ? ` — ${r.error}` : ''}`);
}

const failed = results.filter(r => r.status === 'FAIL');
console.log(`\n${results.length - failed.length}/${results.length} passed`);

if (failed.length) process.exit(1);
