# Experiment 004 — Cold Agent X-Change Structural Discovery

This is a cold structural discovery task.

Use only the authority and corpus files explicitly authorized by `EXPERIMENT_004_DISCOVERY_PROTOCOL_AX_FORMAT.md`.

Do not inspect hidden oracle/scoring material, prior outputs, other experiments, repository maps, chat history, or external sources.

## Task

Apply the current IsoGraph Discovery Protocols adaptively to the three native Agent X-Change structures:

- Alpha
- Beta
- Gamma

Discover the strongest defensible structural relationship among them under the frozen comparison view.

Primary goals:

1. find nontrivial common structure between Alpha and Beta;
2. preserve meaningful Alpha-only and Beta-only residual structure;
3. assess whether Gamma supports the same correspondence or contains a concrete load-bearing breaker;
4. actively attempt to falsify every promoted finding;
5. stop when further search has low marginal structural-information value.

Do not infer meaning from numeric SI or stable-label spellings.

Do not assume that similar arity alone establishes correspondence.

You may use mapped source-local relation signatures only as permitted by `COMPARISON_VIEW.md`.

Explicitly reject unsupported claims of:

- full-trace isomorphism;
- natural identity;
- identical operational meaning;
- identical authority semantics.

Return exactly one JSON object:

{
  "protocols_used": ["..."],
  "reranking_reason": "...",
  "findings": [
    {
      "alpha_events": [101],
      "beta_events": [201],
      "description": "...",
      "falsification": "..."
    }
  ],
  "common_core": ["..."],
  "alpha_residual_events": [109],
  "beta_residual_events": [209],
  "gamma_assessment": {
    "status": "CORRESPONDENCE | PARTIAL | STRUCTURAL_BREAKER | INCOMPLETE",
    "gamma_events": [301],
    "description": "...",
    "falsification": "..."
  },
  "rejected_overclaims": ["..."],
  "promotion": "SUPPORTED_CANDIDATE | INCOMPLETE | REJECTED",
  "stop_reason": "..."
}

Constraints:

- cite event SIs from the supplied packets;
- at most four Alpha events and four Beta events per finding;
- do not use local stable-label numbers as semantic evidence;
- residual membership and correspondence are orthogonal;
- preserve every load-bearing mismatch;
- a Gamma rejection must identify a concrete failed structural obligation, not merely say the packet is "different";
- promotion must be no stronger than SUPPORTED_CANDIDATE.
