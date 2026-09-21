# Evidence status

This repository follows the shared [iteathen evidence and validation policy](https://github.com/iteathen/.github/blob/main/EVIDENCE_POLICY.md).

## Current posture

Agent X-Change is experimental specification research. Its deterministic smoke tests, objective tests, packet fixtures, and model-driven discovery work are **INTERNAL-QUALIFICATION** unless a claim record identifies an independently specified external oracle.

A fresh model, cold prompt, or different provider may supply useful execution isolation. It does not by itself make the result externally validated.

## Registered claims

| Claim | Evidence class | Status |
| --- | --- | --- |
| `AX-INT-001` — current deterministic experiment fixtures satisfy the repository's own encoded checks | **INTERNAL-QUALIFICATION** | repository-controlled |
| `AX-JSON-001` — on the four frozen Experiment 002 relation-tuple tasks, RFC 8259 JSON arrays preserve the same tuples and use 1 fewer UTF-8 byte per compact packet | **REFERENCE-GROUNDED** | 4/4 round trips; JSON 132 B vs compact AX 136 B total |
| `AX-EXT-001` — Agent X-Change has general superiority over external protocol/serialization baselines | **UNVALIDATED** | broader comparative claim remains open |

Machine-readable records: [`evidence/claims.json`](evidence/claims.json). Comparative evidence belongs under [`evidence/external/`](evidence/external/README.md).

## What current evidence establishes

Internal experiments can establish exact packet sizes for frozen fixtures, deterministic parse/round-trip behavior encoded by the repository, rejection behavior covered by tests, and behavior of isolated model experiments under their frozen prompts.

A first external-format baseline is now registered for the four frozen Experiment 002 relation tuples. Under an intentionally favorable-to-JSON shared schema using the same numeric relation IDs and ordered arguments, all four JSON round trips preserved the tuples exactly and minified JSON was 1 byte smaller than the compact equivalent AX text form in every case.

## What it does not establish

The JSON baseline specifically shows that the current tiny text fixtures do **not** establish a raw-byte advantage over a fair minified JSON-array representation. It still does not establish general semantic superiority, lower end-to-end cost, robustness across arbitrary agent fleets, security superiority, or independent third-party reproduction.

## Path to stronger evidence

Compare frozen Agent X-Change tasks against independently specified baselines such as JSON/JSON-RPC, CBOR, MessagePack, or Protobuf where the comparison is semantically appropriate. Preserve bytes, parse/encode cost, round-trip fidelity, malformed-input rejection, multi-hop semantic drift, authority/permission preservation, and exact corpus/task definitions.

## Non-mutation rule

Evidence work may encode equivalent tasks, run protocol tests, and compare results. It must not change Agent X-Change semantics or the operational implementation under test merely to improve a comparison.
