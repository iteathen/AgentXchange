# External Agent X-Change comparison

This directory is reserved for comparisons whose baseline semantics are independently specified rather than invented to favor Agent X-Change.

## Candidate baselines

Use a baseline only when it can represent the same task semantics. Candidates include JSON/JSON-RPC, CBOR, MessagePack, Protobuf, or another published protocol/schema.

## Minimum comparison record

Preserve:

- exact task/corpus and semantic obligations;
- Agent X-Change revision and baseline implementation/version;
- serialized bytes and framing assumptions;
- encode/decode/validation cost where claimed;
- exact round-trip semantic preservation result;
- malformed/ambiguous input rejection behavior;
- multi-hop parameter/authority/provenance preservation;
- permission or privilege-escalation test outcome where applicable;
- raw artifacts and commands.

Do not award Agent X-Change credit for semantics the baseline was never asked or able to represent; instead state the comparison boundary explicitly.

## Status

No external comparative result is promoted by this scaffold itself.

## Frozen result — RFC 8259 JSON array baseline

The first fair external-format comparison uses the same numeric relation identities and ordered arguments in both encodings. JSON is represented as an outer array of relation arrays and serialized with `JSON.stringify` without added whitespace. The AX comparison form removes non-load-bearing whitespace from the same frozen Experiment 002 tuples; it is not declared a canonical IsoGraph serialization.

Result:

| Task | Checked-in AX | Compact equivalent AX | Minified JSON array | JSON − compact AX |
| --- | ---: | ---: | ---: | ---: |
| P1 | 27 B | 22 B | 21 B | **−1 B** |
| P2 | 27 B | 22 B | 21 B | **−1 B** |
| P3 | 50 B | 42 B | 41 B | **−1 B** |
| P4 | 61 B | 50 B | 49 B | **−1 B** |
| **Total** | **165 B** | **136 B** | **132 B** | **−4 B** |

All four JSON parse/stringify round trips preserved the frozen semantic relation tuples exactly.

**Disposition:** REFERENCE-GROUNDED comparative byte measurement under the frozen shared-schema comparison. The result is unfavorable to Agent X-Change on this narrow metric: the compact JSON representation is 1 byte smaller per fixture. This does not establish general JSON superiority or Agent X-Change inferiority; parser cost, schema negotiation, richer semantics, multi-hop preservation, security/governance structure, compression, and binary encodings remain separate claims.

- External standard: [RFC 8259 / STD 90](https://www.rfc-editor.org/rfc/rfc8259.html)
- Frozen summary: [`results/2026-09-20-json-array-v1.summary.json`](results/2026-09-20-json-array-v1.summary.json)
- Workflow run: `35552241112`; full artifact: `10619205450`.
