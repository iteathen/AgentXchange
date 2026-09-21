# AgentXchange

# Agent X-Change

**A compact, ISOgraph-native formal language for structured communication between agents.**

Agent X-Change is an experimental agent communication language built **in ISOgraph**, not beside it.

Its working premise is simple:

> Agents should be able to exchange the minimum knowledge required for the current task, while preserving a direct path to whatever deeper structure, uncertainty, provenance, constraints, identity, or verification the situation actually requires.

Agent X-Change does not introduce a second foundational semantic substrate. It defines inter-agent communication as a constrained form of ISOgraph Knowledge.

~~~text
ISOgraph
└── Knowledge
    └── Agent X-Change
        ├── communication
        ├── intent
        ├── authority
        ├── tasks / commitments
        ├── uncertainty
        ├── provenance
        ├── effects
        └── other structure only when required
~~~

The current specification is intentionally early and falsifiable:

- [Agent X-Change Specification — Draft 0.1 Candidate](AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md)
- [Design Objectives — 0.1](DESIGN_OBJECTIVES_0_1.md)

Agent X-Change is **not yet a qualified standard**. The current work is specification research backed by small deterministic experiments and an upcoming cold structural-discovery test.

---

## Why Agent X-Change exists

Most agent communication today ultimately becomes one of two things:

1. natural-language text that the next agent must reinterpret; or
2. a fixed schema that becomes increasingly large as more semantics are added.

Both approaches create avoidable problems.

Natural language is flexible, but repeated handoffs can introduce interpretation drift, parameter drift, forgotten assumptions, ambiguous authority, loss of provenance, confusion between request/belief/fact/effect, and repeated context reconstruction.

Fixed schemas improve determinism, but they tend to accumulate fields for every future concern:

~~~text
confidence
provenance
permissions
evidence
deadline
task state
retry policy
capabilities
resources
...
~~~

Agent X-Change takes a different approach.

ISOgraph already provides a compact structural knowledge representation with identity, ordered incidence, scope/boundary, references, rewrites, constraints, qualification machinery, and optional deeper structural analysis.

Agent X-Change uses that existing formal universe to describe **what agents need to communicate**.

The result is intended to be:

~~~text
minimal when simple
precise when necessary
deep only on demand
~~~

---

## Core idea

A minimal exchange is conceptually no more complicated than:

\[
Communicate(A,B,K)
\]

where:

- A is the sender/source role;
- B is the recipient/destination role;
- K is ISOgraph knowledge.

The current Experiment 002 native fixture represents that idea in only:

~~~isg
[
  (^95001 100 200 300)
]
~~~

That fixture is **27 bytes** in its current human-readable form.

A fair external-format baseline is now recorded: when the same frozen relation tuple is encoded as a minified RFC 8259 JSON array using the same shared numeric relation identity, JSON is **21 bytes** versus **22 bytes** for a whitespace-minimized equivalent Agent X-Change text form. Across all four Experiment 002 fixtures, JSON is 132 bytes versus 136 bytes for compact AX text. **No raw-text byte advantage is claimed for Agent X-Change on these fixtures.** See [evidence status](EVIDENCE.md) and the [frozen external comparison](evidence/external/README.md).

The label ^95001 is experiment-only and is **not** a frozen Agent X-Change syntax or vocabulary. The point of the experiment is structural: a simple communication can stay simple.

Nothing about that minimal exchange automatically means:

~~~text
the recipient believes K
the recipient has verified K
K is true
the sender authorized an action
an external effect occurred
the recipient accepted responsibility
~~~

Those meanings appear only when the represented structure actually contains them.

---

## Agent X-Change is built with ISOgraph

The current architectural hypothesis is:

\[
\boxed{K_{AX}\subseteq Knowledge_{ISOgraph}}
\]

Agent X-Change is therefore not an opaque protocol stuffed inside another language.

It is a formal language **constructed using ISOgraph** inside a constrained region of Knowledge.

A useful conceptual model is:

\[
AX=(K_{AX},C_{AX},T_{AX},I_{AX})
\]

where:

- \(K_{AX}\) is the relevant Agent X-Change knowledge;
- \(C_{AX}\) contains Agent X-Change-specific constraints where they are actually necessary;
- \(T_{AX}\) contains relevant lawful transformations;
- \(I_{AX}\) contains invariants that follow from or are required by those constructions.

These are conceptual categories, not new ISOgraph primitives.

### One semantic universe

ISOgraph and Agent X-Change share one semantic universe.

If an existing ISOgraph semantic object already has exactly the meaning Agent X-Change needs, Agent X-Change reuses that object.

A symbol is not redefined because it appears in another module.

~~~text
same semantic identity
    -> same represented meaning
~~~

If Agent X-Change genuinely needs a new meaning, it introduces a new semantic object and defines its relationships structurally.

This avoids manufacturing differences that ISOgraph would later have to rediscover as correspondences.

---

## Semantic depth is available, not compulsory

Agent X-Change does not require every communication to carry the deepest structure ISOgraph can represent.

A simple exchange may be shallow.

A stronger claim may expose additional structure:

~~~text
knowledge
├── provenance
├── assumptions
├── unresolved dependencies
├── evidence
├── authority
├── resources
├── temporal constraints
├── policy
└── verification structure
~~~

The deeper representation is not a different semantic system. It is more structure about the same represented knowledge.

This permits **adaptive structural depth**.

A packet may be received in a compact form, then a subsystem can materialize more of the referenced structure if the next operation requires it.

Conceptually:

\[
V_0(K)\rightarrow V_1(K)\rightarrow V_2(K)
\]

The inverse is also possible: a deep structure can be projected or contracted for a recipient that only needs a smaller claim-relevant view.

The design target is therefore:

\[
\boxed{
\text{minimum necessary communication structure}
+
\text{arbitrary justified semantic depth when needed}
}
\]

---

## Semantic support is not the same as inline bytes

An object may depend on deep primitive structure without requiring every dependency to be serialized inline every time it moves.

ISOgraph already distinguishes semantic structure from transparent serialization compression.

Agent X-Change can therefore use:

- inline native structure;
- qualified references;
- immutable content-addressed artifacts;
- previously shared structures;
- other reconstructible ISOgraph mechanisms.

If a stronger claim needs deeper support and that support is unavailable, the consequence is local to that claim:

~~~text
required support unavailable
    -> dependent claim remains unresolved / incomplete / unqualified
~~~

The packet does not need to be globally invalid merely because it was intentionally shallow.

This is an important design principle: **cost follows the claim being made**.

---

## A packet can represent its own uncertainty

Agent X-Change is designed to communicate more than a scalar confidence value.

Because uncertainty can be represented structurally, a communication can express why it is uncertain:

~~~text
claim X

derived-from:
    observation A
    report B

assumes:
    P
    Q

unresolved:
    R

conflicts-with:
    claim Y

verification:
    incomplete
~~~

The receiving agent can reason about that uncertainty rather than merely trusting the sender's confidence score.

That creates an important possibility:

> The reliability of received knowledge can be recomputed relative to the receiver's own knowledge.

A recipient may already possess evidence that resolves one of the sender's unknowns, or may possess conflicting evidence that reduces confidence.

Unknowns themselves can also participate in reasoning:

~~~text
unknown U
├── blocks -> decision D
├── resolvable-by -> tool T
├── depends-on -> source S
└── impact -> high
~~~

This supports communication that can be explicit about what it **does not know**.

---

## Natural consequences before new rules

Agent X-Change follows an entropic design discipline.

When behavior already follows naturally from ISOgraph or from the structure of an Agent X-Change construction, the specification should describe that consequence rather than adding a redundant global rule.

The preferred order is:

~~~text
natural structural consequence
-> defined semantic consequence/default where needed
-> minimally scoped hard constraint where necessary
~~~

Hard rules are not forbidden.

They are used only when the semantics genuinely need them, and only over the smallest scope that requires them.

This prevents specification growth from inventing semantic structure merely because an implementation edge case was awkward.

A proposed new primitive, rule, or field should have to earn its existence.

---

# Why this architecture is attractive

## 1. Minimal exchanges remain genuinely minimal

A simple message does not pay for isomorphism search, factorization, NEI, QU, proof expansion, deep provenance, policy closure, or global capability analysis.

Those operations remain available when a claim actually needs them.

---

## 2. No semantic translation boundary

A standalone agent protocol would eventually need a bridge into ISOgraph if its structures were to participate in ISOgraph analysis.

Agent X-Change avoids that boundary:

~~~text
Agent X-Change structure
    =
ISOgraph structure
~~~

There is no second semantic representation that must later be reconstructed.

This reduces opportunities for translation loss, semantic drift, duplicated identity, mismatched constraints, and adapter bugs.

---

## 3. Shared concepts are actually shared

If ISOgraph already has the semantic object Agent X-Change needs, AX reuses it.

It does not create separate IG and AX versions of the same semantic concept merely because two modules use it.

This keeps the semantic universe smaller and improves later structural comparison.

---

## 4. Rich communication does not require schema bloat

Traditional protocols often accumulate dozens of optional fields.

Agent X-Change can instead add ordinary structural relations only when they exist.

The language does not need an ever-growing packet full of empty placeholders for every feature it might someday support.

---

## 5. Context can become structural rather than conversational

Because dependencies are explicit structure, future systems can derive the knowledge required by a task rather than repeatedly summarizing chat history.

This opens a path toward dependency-preserving context compression, targeted retrieval, model-specific context views, minimal handoffs, and incremental recomputation.

---

## 6. Handoffs can become structural cuts

A subproblem can potentially be separated from a larger structure while preserving its boundary dependencies.

That boundary can expose what the receiving agent needs, what it must return, which constraints cross the boundary, which resources or authority matter, and which unresolved obligations remain.

This is stronger than repeatedly summarizing a prior agent's text context.

---

## 7. Deeper structure can be materialized in flight

A communication need not have one fixed representation depth for its entire lifecycle.

An intermediary may determine that the next operation requires deeper evidence, primitive support, a proof, QU structure, NEI identity evidence, or an ISOgraph comparison.

It can resolve or materialize that structure, perform the required reasoning, and continue.

Another recipient may require only a contracted view.

This creates the possibility of **semantic bandwidth adaptation**.

---

## 8. Authority, request, and effect stay separate

Agent X-Change does not collapse:

~~~text
request
authorization
execution
observed effect
~~~

into one operation.

A sender can request something without proving authority. Authorization can exist without proving the external action occurred. A runtime can attempt an effect without the representation falsely claiming success.

---

## 9. Provenance can travel with the knowledge it qualifies

When provenance matters, it can remain structurally linked to the claim instead of living in a separate log that may be lost during handoff.

That supports audit, verification, causal reconstruction, accountability, selective revalidation, and failure analysis.

When provenance does not matter to the current claim, unnecessary provenance need not be materialized.

---

## 10. Structural discovery works on Agent X-Change directly

Because AX is ISOgraph-native, Agent X-Change traffic can itself become an ISOgraph research corpus.

ISOgraph may be able to discover equivalent workflows, recurring delegation structures, hidden common cores, unnecessary residual differences, repeated failure patterns, equivalent authority patterns, and better factorizations of Agent X-Change itself.

Potential feedback loop:

~~~text
Agent X-Change execution
-> ISOgraph structure
-> structural discovery
-> candidate invariant / simplification
-> independent qualification
-> possible AX improvement
~~~

No translation step is required.

---

## 11. Version and compatibility analysis can become structural

Two Agent X-Change revisions can be compared as ISOgraph structures.

ISOgraph can potentially expose invariant common structure, additions, removed distinctions, residual incompatibilities, candidate mappings, and lossless versus lossy migration regions.

This may eventually make compatibility much more precise than conventional version-number negotiation.

---

## 12. Capability negotiation can use structure

Capabilities and requirements can themselves be represented as knowledge.

A task can expose requirements; an agent or tool can expose supported structure.

Compatibility can therefore become partly a structural question rather than a purely textual recommendation problem.

---

## 13. Duplicate work can potentially be recognized

Persistent semantic identity and structural equivalence create a path toward recognizing when two agents are working on the same subproblem or when a deterministic result has already been established.

Possible uses include memoization, deduplication, replay safety, shared sub-results, and reduced repeated reasoning.

This is an architectural opportunity, not yet a qualified runtime feature.

---

## 14. Failure blast radius can become structural

If a result is later shown to be wrong, dependency structure can identify what actually depended on it.

Rather than invalidating all later work, future runtimes could revalidate only the affected region.

The same structure can also help estimate the blast radius of a proposed high-impact change.

---

## 15. The same formalism can describe what is unknown

Agent X-Change does not need to replace uncertainty with a generic UNKNOWN.

When the shape of unresolved information matters, ISOgraph QU or another qualified structure can preserve open relations, constraints, admissible possibilities, dependencies, interfaces to known structure, and scope/closure authority.

---

## 16. Formal power does not require eager computation

ISOgraph can represent deep operations without requiring every runtime to calculate them eagerly.

Agent X-Change inherits this property:

~~~text
representability != mandatory computation
derivability     != mandatory materialization
~~~

A system can remain lightweight for ordinary messages and invoke expensive structural analysis only where the result can affect the current task.

---

## 17. Future models can learn the representation

Current experiments use agents and tools that were not specifically trained on Agent X-Change.

If ISOgraph/Agent X-Change became common training material, models could learn recurring structures directly rather than repeatedly reconstructing them from instructions.

That could improve token efficiency, reconstruction accuracy, structural reasoning, recognition of common AX patterns, and selection of when deeper structure is worth materializing.

Training familiarity must never become semantic authority—the represented structure remains authoritative—but it can make the format cheaper to use.

---

# Problems and how the design contains them

The project does not assume that a relational formal language is free of costs.

The current design attempts to make costs **local, optional, or structurally bounded** rather than forcing them into every exchange.

| Potential problem | Current design response |
| --- | --- |
| **Simple messages become expensive** | Simple messages stay shallow. Expensive discovery/factorization/identity work is not automatically invoked. |
| **Protocol schema grows without bound** | Additional semantics are ordinary ISOgraph structure, not mandatory top-level packet fields. |
| **Semantic drift across agent hops** | Meaning is carried by shared semantic identities and explicit relations rather than repeated prose reinterpretation. |
| **Uncertainty gets flattened into a confidence number** | Unknowns, assumptions, evidence, conflicts, and verification state can remain structural. |
| **Request is mistaken for authorization** | They are separate represented relations. |
| **Authorization is mistaken for real-world success** | Intent, authorization, execution, report, observation, and verification can remain distinct. |
| **Deep formalism is forced onto trivial cases** | Semantic depth is demand-driven. Cost follows the claim. |
| **Deep support makes packets huge** | Load-bearing support may remain referenced/reconstructible rather than inline. |
| **A new hard rule is added for every edge case** | Prefer natural consequence, then defined behavior, then the smallest necessary scoped constraint. |
| **Agent X-Change duplicates ISOgraph primitives** | Existing ISOgraph meanings are reused directly. AX adds semantics only for genuine new distinctions. |
| **Structural analysis becomes computationally heavy** | Discovery/search is optional and claim-bounded; no simple exchange requires global structural analysis. |
| **Same symbol means different things in different modules** | Semantic identity is shared across the ISOgraph universe; module membership does not redefine meaning. |
| **Surface syntax becomes semantic authority** | Syntax/transport is downstream of semantics and remains unfrozen in Draft 0.1. |
| **External data becomes executable instruction** | Communication/data, intent, authority, and effect are distinct structural concepts. |
| **Old packets silently change meaning after a revision** | ISOgraph provides revision/profile authority and immutable qualified dependencies. |
| **Unknown information is guessed to make progress** | Unknown remains unknown unless the governing structure supports a stronger conclusion. |
| **Agent X-Change becomes tied to one model/vendor/runtime** | Semantics are ISOgraph-native and independent of a particular model or orchestration stack. |
| **ISOgraph's power leads to over-engineering** | Use only the structural depth required by each claim. |
| **Formal restrictions overconstrain future uses** | Hard constraints are introduced only where necessary and scoped only to the semantic region that needs them. |

Some problems remain fundamentally outside the representation itself:

- network failures and latency;
- cryptographic trust establishment;
- irreversible external effects;
- actual process cancellation;
- distributed scheduling and arbitration;
- implementation bugs;
- worst-case expensive structural discovery.

Agent X-Change aims to represent the distinctions needed to handle those correctly without pretending the language itself performs the external operation.

---

# Examples

The examples below are conceptual unless explicitly marked as an Experiment 002 native fixture. Draft 0.1 does not freeze final surface syntax.

## Minimal exchange

\[
Communicate(A,B,K)
\]

Meaning: A communicates knowledge K to B.

It does **not** imply that B believes K, verifies K, accepts responsibility, or performs any action.

Experiment 002 encoded that concept as:

~~~isg
[
  (^95001 100 200 300)
]
~~~

The relation label is experimental only.

## Request without authorization

Conceptually:

~~~text
request(A, B, X)
~~~

This does not imply:

~~~text
authorize(A, B, X)
effect-observed(X)
~~~

Experiment 001 and Experiment 002 both exercised this separation.

## Authorized request without observed effect

Conceptually:

~~~text
request(A, B, X)
authorize(A, B, X)
~~~

Still not equivalent to:

~~~text
effect-observed(X)
~~~

The external runtime may act, fail, time out, or return an uncertain receipt. The representation should say only what the evidence supports.

## Communication with unresolved support

Conceptually:

~~~text
communicate(A, B, K)
requires-support(K, P)
unresolved(P)
~~~

A shallow operation depending only on K may be possible.

A stronger claim requiring P remains unresolved until P is available.

The packet itself does not have to be rejected.

## Progressive structural depth

A communication may begin as:

~~~text
A -> B : K
~~~

A verifier may later require:

~~~text
K
├── provenance
├── evidence
├── assumptions
└── unresolved dependencies
~~~

An ISOgraph structural analysis may then additionally expose:

~~~text
K
├── factorization
├── common core
├── residual
└── invariant candidate
~~~

These are progressively deeper views of one semantic universe rather than translations into unrelated formats.

---

# Design objectives

Agent X-Change currently tracks **43 explicit design objectives**, spanning:

- context/compression efficiency;
- semantic fidelity;
- machine verifiability;
- model/runtime independence;
- authority and governance;
- asynchronous control;
- capability negotiation;
- uncertainty;
- provenance;
- recovery;
- cross-vendor delegation;
- tool/resource schemas;
- multimodal artifacts;
- identity/authentication;
- communicative intent;
- stable identity;
- schema evolution;
- extensibility;
- composition;
- replay safety;
- temporal semantics;
- concurrency/conflicts;
- effects/transactions/compensation;
- invariants/liveness;
- durable continuation;
- privacy/information flow;
- instruction/data separation;
- human approval/revocation;
- evidence/attestation;
- reproducibility;
- resource accounting/backpressure;
- progressive result status;
- commitment/responsibility;
- policy/lifecycle;
- memory lifecycle;
- ISOgraph continuity;
- relational transformation;
- resource linearity;
- reality/knowledge/intent separation;
- partial views;
- open-world/negative knowledge;
- branching/revision;
- rewrite control/strategy.

The complete definitions live in [DESIGN_OBJECTIVES_0_1.md](DESIGN_OBJECTIVES_0_1.md).

A central design principle is **structural multiplication**:

> Prefer one structural construction that naturally satisfies several objectives over multiple independent mechanisms that must later be synchronized.

The goal is not 43 separate subsystems. The goal is a small structure from which those capabilities naturally emerge.

---

# Experimental status

Agent X-Change is being tested incrementally before its vocabulary or surface syntax is frozen.

## Experiment 001 — basic semantic smoke test

**Result: 5 PASS / 0 FAIL**

Tested:

- minimal communication remains minimal;
- stronger claims require stronger support;
- request does not imply authorization or effect;
- unresolved knowledge does not become false;
- one semantic identity cannot silently acquire a second meaning.

See [experiments/001/SMOKE_TEST_RESULT.md](experiments/001/SMOKE_TEST_RESULT.md).

## Experiment 002 — native ISOgraph packet smoke test

**Result: 4 PASS / 0 FAIL**

Used actual small .isg fixtures and a deliberately narrow deterministic parser/decoder.

Tested:

- minimal native communication reconstructs exactly;
- request carries no implicit authority/effect;
- explicit authorization still carries no implicit effect;
- unresolved support reconstructs without a truth/falsehood commitment.

Most importantly, the experiment required **no independent Agent X-Change structural substrate**. Ordinary ISOgraph scope, stable labels, SIs, and ordered incidence were sufficient for the tested distinctions.

See [experiments/002/RESULT.md](experiments/002/RESULT.md).

## Experiment 003 — complete objective smoke sweep

**Result: 43 PASS / 0 FAIL**

Breakdown:

~~~text
32 semantic passes
9 semantic-boundary passes
2 architectural passes
0 semantic defects requiring Draft 0.1 correction
~~~

Every current objective had at least one concrete probe.

This does **not** mean all 43 objectives are production-qualified. Boundary objectives such as cryptographic authentication, real cancellation, external effects, commit arbitration, and backpressure still require actual runtime systems.

What the test established is narrower:

> No current objective immediately requires Agent X-Change to introduce a second semantic substrate outside ISOgraph Knowledge.

See [experiments/003/RESULT.md](experiments/003/RESULT.md).

## Experiment 004 — ISOgraph Discovery Protocol over Agent X-Change

**Status: frozen and ready; cold semantic run not yet executed**

Deterministic corpus preflight:

**8 PASS / 0 FAIL**

The test contains:

- Alpha and Beta: independently labeled Agent X-Change structures containing a hidden shared multi-stage exchange/work/result/qualification skeleton plus real residuals;
- Gamma: a near-isomorphic negative containing a load-bearing participant-role split.

The cold discovery agent will receive the ISOgraph core, current Discovery Protocol candidates, the AX spec, a frozen comparison view, and the three native packets.

It will **not** receive the hidden correspondence oracle or scorer.

The test asks whether ISOgraph discovery can recover the Alpha/Beta common structure, preserve their residual differences, find deep structural motifs, detect Gamma's concrete structural breaker, falsify its own findings, and reject overclaims such as full-trace isomorphism or natural identity.

Frozen AgentXchange corpus commit:

~~~text
889ada951d8010198ad40379c4c667f02c71ebae
~~~

See:

- [Experiment 004 design](experiments/004/EXPERIMENT_004_DISCOVERY_PROTOCOL_AX_FORMAT.md)
- [Frozen comparison view](experiments/004/COMPARISON_VIEW.md)
- [Freeze manifest](experiments/004/FREEZE.md)

No cold discovery result should be inferred from the preflight result.

---

# What the experiments currently support

So far the evidence supports these limited statements:

1. A very small communication structure can represent a useful exchange without automatically acquiring unrelated semantics.
2. Agent X-Change distinctions tested so far can be represented directly with ISOgraph structures.
3. Optional deeper support does not need to be materialized for claims that do not depend on it.
4. Unknown/unresolved structure can remain explicitly unresolved.
5. Agent X-Change can keep request, authority, belief/truth, and external effect conceptually separate.
6. The current architecture has a representational path to all 43 current objectives without requiring a second semantic substrate.
7. Native AX structures can be prepared directly as inputs to ISOgraph Discovery Protocol experiments.

These are early research results, not a claim that the language is production-ready.

---

# What is deliberately not frozen

Draft 0.1 does **not** freeze:

- final Agent X-Change surface syntax;
- final stable-label vocabulary;
- binary or network wire format;
- transport;
- cryptographic protocol;
- scheduler;
- database/storage architecture;
- complete performative ontology;
- complete task ontology;
- complete authority system;
- mandatory QU usage;
- mandatory NEI usage;
- mandatory isomorphism/discovery passes;
- mandatory factorization depth;
- one canonical serializer;
- one universal confidence scale.

Those decisions should be driven by evidence rather than familiarity.

---

# Project philosophy

## Structure first, transport later

Agent X-Change semantics should not depend on whether a runtime ultimately sends native ISOgraph text, compact binary, streamed deltas, shared-memory structures, content-addressed references, or another model-optimized representation.

## Claim-bounded work

Do not perform stronger reasoning than the claim requires.

~~~text
simple communication
    -> simple processing

verification claim
    -> verification burden

isomorphism claim
    -> isomorphism burden

complete-family claim
    -> completeness burden
~~~

## Preserve uncertainty

Unknown remains unknown. Do not guess merely to close a packet.

## Reuse semantics

Do not invent an AX-specific object when ISOgraph already expresses the exact required meaning.

## Add the minimum necessary constraint

When a hard rule is necessary, scope it only to the region that requires it.

## Keep implementation failures separate from semantic failures

A parser bug, transport failure, slow implementation, or model reconstruction error does not by itself prove a missing semantic primitive. Classify the failure before changing the language.

---

# Relationship to ISOgraph

Agent X-Change currently depends conceptually on [ISOgraph](https://github.com/iteathen/IsoGraph).

ISOgraph's working substrate hypothesis is:

~~~text
knowledge = scoped relational structure + lawful structural transformation
~~~

Agent X-Change uses that structural language to define inter-agent communication within Knowledge.

That relationship means Agent X-Change can benefit from ISOgraph's deeper machinery when required, including:

- common-core discovery;
- residual analysis;
- isomorphism;
- factorization;
- invariant discovery;
- Quantifiable Unknown structures;
- Natural Entropic Identity analysis;
- structural rewrites;
- qualification/provenance machinery.

None of those are automatically required for a simple Agent X-Change packet.

---

# Repository map

~~~text
AGENT_X_CHANGE_SPEC_DRAFT_0_1_CANDIDATE.md
    current first specification candidate

DESIGN_OBJECTIVES_0_1.md
    complete 43-objective design/qualification target set

experiments/001/
    basic semantic smoke tests

experiments/002/
    native ISOgraph packet smoke tests

experiments/003/
    all-objectives architectural/semantic sweep

experiments/004/
    frozen ISOgraph Discovery Protocol experiment over AX structures
~~~

---

# Current status

Agent X-Change is in **early specification research**.

Current headline evidence:

~~~text
Experiment 001:  5 / 5 PASS
Experiment 002:  4 / 4 PASS
Experiment 003: 43 / 43 PASS
Experiment 004:  8 / 8 deterministic preflight
                 cold Discovery Protocol run pending
~~~

None of these results constitute production qualification.

They do, however, provide encouraging early evidence for the central architecture:

\[
\boxed{
\text{Agent X-Change can be constructed directly in ISOgraph Knowledge,
remain extremely small for simple communication,
and expose much deeper structure only when the task actually needs it.}
}
\]

---

# License

AgentXchange is licensed under the [GNU Affero General Public License v3.0](LICENSE).

## Automated checks

The `verify` check runs on pull requests and pushes to main and release branches.
Run `node tools/verify-repository.mjs` locally to check required documents, UTF-8,
merge markers, JSON and JavaScript syntax, and relative Markdown file links.
CI also runs the smoke suites in experiments 001–003 and the experiment 004
corpus preflight. These checks validate the existing fixtures, not full protocol conformance.
