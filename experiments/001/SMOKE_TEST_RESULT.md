# Agent X-Change Experiment 001 — Smoke Test Result

**Disposition:** 5 PASS / 0 FAIL  
**Evidence class:** local deterministic smoke evidence only; not qualification  
**Spec:** `AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md`

## Execution note

The committed `smoke-tests.mjs` harness was executed directly under Node after the initial fixture setup and reproduced the recorded result exactly.

## Result

```text
PASS T1 minimal communication stays minimal
PASS T2 claim burden follows required support
PASS T3 request does not imply authority or effect
PASS T4 unresolved knowledge does not collapse to false
PASS T5 shared semantic identity has one meaning

5/5 passed
```

## Immediate findings

### 1. The minimal-exchange idea survives the first sanity check

Representing only sender, recipient, and communicated knowledge does not require the harness to infer belief, truth, verification, authorization, or execution.

### 2. Optional semantic depth behaves as intended

The T2 fixture demonstrates the desired claim-relative behavior:

```
shallow support sufficient for shallow claim
!=
shallow support sufficient for stronger claim
```

The packet does not need to be rejected merely because deeper support is absent. The stronger obligation remains unresolved until the support is available.

### 3. Request / authority / effect separation is coherent

The draft can represent a request without pretending the request is authorized, and can represent authorization without pretending an external effect occurred.

### 4. Unknown-state preservation is coherent

The draft's `unresolved != false` distinction survived the executable sanity test without requiring an extra global rule.

### 5. Shared semantic identity remains reusable

The same semantic identity can be reused with the same meaning. A second incompatible meaning is detectable as a semantic collision.

## What this does not establish

The run does not qualify Agent X-Change.

It does not demonstrate that fresh external agents can reconstruct a native ISOgraph Agent X-Change packet, nor that the eventual surface form is compact or efficient. It also does not exercise ISOgraph discovery, QU, NEI, deep factorization, external transport, or runtime execution.

## Follow-up

The suggested native-packet smoke pass was completed as Experiment 002 under `experiments/002/`.
