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
