# Agent X-Change Experiment 004 — Discovery Protocol over Native AX Structure

**Status:** arranged; deterministic preflight pending/available; cold semantic execution not yet consumed  
**Purpose:** test whether the current IsoGraph Discovery Protocols can recover nontrivial common structure, residuals, and a near-isomorphic breaker directly from native Agent X-Change-formatted IsoGraph knowledge.

## Research question

Given independently labeled Agent X-Change structures expressed natively in IsoGraph, can a cold discovery agent recover the strongest defensible common structure without relying on shared vocabulary labels or hidden expected mappings?

The target is specifically the architectural claim:

```text
Agent X-Change structures remain ordinary IsoGraph structure
and therefore can participate directly in IsoGraph discovery.
```

## Authority

Cold semantic authority is limited to:

### IsoGraph repository
- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md`
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`

### AgentXchange repository
- `AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md`
- `experiments/004/COMPARISON_VIEW.md`
- `experiments/004/CORPUS_ALPHA.isg`
- `experiments/004/CORPUS_BETA.isg`
- `experiments/004/CORPUS_GAMMA.isg`
- `experiments/004/COLD_PROMPT.md`

## Isolation

The cold decoder MUST NOT access:

- `HIDDEN_ORACLE.md`
- `ASSERTIONS.json`
- `score-result.mjs`
- prior Experiment 004 outputs/reviews
- this experiment author's analysis/chat
- Agent X-Change design-objective scoring material
- external browsing
- prior IsoGraph Experiment 006/007/008 oracles/results

The repository is public; isolation is therefore enforced by the execution/tool boundary, not by obscurity.

## Corpus design

### Alpha
A nine-relation Agent X-Change structure containing:
- an eight-relation exchange/work/result/qualification skeleton;
- one Alpha-specific residual.

### Beta
A nine-relation independently labeled structure containing:
- the same eight-relation skeleton under different local labels and SIs;
- one Beta-specific residual.

### Gamma
An eight-relation near-match derived from the same broad shape but with one load-bearing participant role split. It is intended to test whether discovery preserves shared-identity/role structure rather than matching only arity and chain shape.

## What is deliberately hidden

The cold decoder is not told:

- which Alpha/Beta events correspond;
- how many motifs exist;
- which motifs are considered deep;
- the intended Gamma breaker;
- which events are expected residuals;
- the scoring threshold.

## Output

The decoder returns one JSON object according to `COLD_PROMPT.md`.

The result is frozen before deterministic scoring.

## Evidence classification

A successful run is evidence about Discovery Protocol behavior over Agent X-Change native structure.

It does not:
- qualify Agent X-Change Draft 0.1;
- qualify Discovery Protocols 0.1-0.4;
- prove Agent X-Change operational correctness;
- establish natural identity;
- establish universal discovery completeness.

## Resource posture

Following IsoGraph qualification resource discipline:

1. deterministic preflight first;
2. one frozen cold semantic invocation for the complete corpus;
3. deterministic scoring afterward;
4. an independent verifier only if later promotion requires it.

No external call should be spent merely to iterate on formatting.
