# Agent X-Change Experiment 004 — Frozen Corpus Manifest

**Frozen AgentXchange corpus commit:** `889ada951d8010198ad40379c4c667f02c71ebae`  
**Preflight disposition:** 8 PASS / 0 FAIL  
**Execution status:** ready for one cold semantic discovery run

The cold discovery packet MUST resolve AgentXchange Experiment 004 files at the frozen commit above.

Later repository edits do not alter this frozen corpus.

## Frozen AgentXchange packet files

- `AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md`
- `experiments/004/EXPERIMENT_004_DISCOVERY_PROTOCOL_AX_FORMAT.md`
- `experiments/004/COMPARISON_VIEW.md`
- `experiments/004/CORPUS_ALPHA.isg`
- `experiments/004/CORPUS_BETA.isg`
- `experiments/004/CORPUS_GAMMA.isg`
- `experiments/004/COLD_PROMPT.md`

## Hidden frozen scoring material

Also frozen at the same commit, but excluded from the cold decoder context:

- `experiments/004/HIDDEN_ORACLE.md`
- `experiments/004/ASSERTIONS.json`
- `experiments/004/score-result.mjs`

## IsoGraph authority

At execution time, the cold packet must pin exact immutable revisions of the authorized IsoGraph files listed in the experiment design. Do not silently substitute later semantic revisions.

## Preflight record

The committed corpus was parsed and checked after commit:

```text
PASS parse/count
PASS alpha unique events
PASS alpha heads
PASS beta unique events
PASS beta heads
PASS gamma unique events
PASS gamma heads
PASS label namespaces

8/8 preflight checks passed
```

No semantic discovery result has been generated or scored as part of this freeze.
