# Evidence status

This repository follows the shared [iteathen evidence and validation policy](https://github.com/iteathen/.github/blob/main/EVIDENCE_POLICY.md).

## Current posture

Agent X-Change is experimental specification research. Its deterministic smoke tests, objective tests, packet fixtures, and model-driven discovery work are **INTERNAL-QUALIFICATION** unless a claim record identifies an independently specified external oracle.

A fresh model, cold prompt, or different provider may supply useful execution isolation. It does not by itself make the result externally validated.

## Registered claims

| Claim | Evidence class | Status |
| --- | --- | --- |
| `AX-INT-001` — current deterministic experiment fixtures satisfy the repository's own encoded checks | **INTERNAL-QUALIFICATION** | repository-controlled |
| `AX-EXT-001` — Agent X-Change outperforms or preserves semantics better than external protocol/serialization baselines | **UNVALIDATED** | comparative external campaign not yet registered |

Machine-readable records: [`evidence/claims.json`](evidence/claims.json). Comparative evidence belongs under [`evidence/external/`](evidence/external/README.md).

## What current evidence establishes

Internal experiments can establish exact packet sizes for frozen fixtures, deterministic parse/round-trip behavior encoded by the repository, rejection behavior covered by tests, and behavior of isolated model experiments under their frozen prompts.

## What it does not establish

It does not establish general semantic superiority, lower end-to-end cost, robustness across arbitrary agent fleets, security superiority, or independent third-party reproduction.

## Path to stronger evidence

Compare frozen Agent X-Change tasks against independently specified baselines such as JSON/JSON-RPC, CBOR, MessagePack, or Protobuf where the comparison is semantically appropriate. Preserve bytes, parse/encode cost, round-trip fidelity, malformed-input rejection, multi-hop semantic drift, authority/permission preservation, and exact corpus/task definitions.

## Non-mutation rule

Evidence work may encode equivalent tasks, run protocol tests, and compare results. It must not change Agent X-Change semantics or the operational implementation under test merely to improve a comparison.
