# Agent X-Change Experiment 001 — Fast Structural Smoke Tests

**Status:** completed local smoke run; not qualification evidence  
**Spec under test:** `AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md`  
**Purpose:** catch obvious semantic overreach or contradiction cheaply before designing cold-agent qualification.

## Method

This experiment uses a deliberately tiny, non-normative executable harness. It does **not** define Agent X-Change syntax and does **not** claim to implement ISOgraph.

The harness encodes only consequences already stated by Draft 0.1 and checks whether the intended distinctions can coexist without requiring extra assumptions.

## Tests

### T1 — Minimal communication stays minimal

Given only:

```
communicate(A, B, K)
```

the harness checks that it does not imply:

```
believes(B, K)
verified(B, K)
true(K)
```

### T2 — Claim burden follows required support

With `K` materialized but deeper support `P` absent:

- a claim depending only on `K` is ready;
- a stronger claim depending on `K + P` remains unresolved;
- materializing `P` closes that structural support requirement.

This tests the Draft 0.1 idea that shallow communication is permitted while stronger claims pay for the deeper structure they require.

### T3 — Request, authorization, and effect remain distinct

Given:

```
request(A, B, X)
```

the harness checks that neither authorization nor external effect is implied.

Adding:

```
authorize(A, B, X)
```

still does not imply the effect occurred.

Only an explicit observed-effect fact establishes that state in the harness.

### T4 — Unresolved does not collapse to false

Given:

```
unresolved(U)
```

the harness verifies that neither `true(U)` nor `false(U)` is inferred.

### T5 — Shared semantic identity has one meaning

A semantic identity may be reused with the same meaning across contexts.

Attempting to assign the same semantic identity a second incompatible meaning is rejected by the smoke harness.

## Scope

These tests are intentionally narrow.

They do not test:

- final Agent X-Change syntax;
- ISOgraph parser conformance;
- isomorphism/factorization behavior;
- QU or NEI qualification;
- transport;
- cryptographic authority;
- asynchronous execution;
- cold-agent reconstruction;
- runtime performance.

Those require later experiments after the first semantic vocabulary is more concrete.
