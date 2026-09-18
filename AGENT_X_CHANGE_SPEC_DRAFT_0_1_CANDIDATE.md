# Agent X-Change Specification — Draft 0.1 Candidate

**Status:** first architectural candidate; unqualified  
**Language name:** Agent X-Change  
**Repository/project identifier:** AgentXchange  
**Base semantic dependency:** ISOgraph  
**Design posture:** minimal, structural, experimentally falsifiable

---

# 0. Interpretation barriers

Do not collapse these distinctions:

~~~
Agent X-Change
    != a replacement for ISOgraph

Agent X-Change
    != a foreign language embedded as an opaque payload in ISOgraph

ISOgraph Knowledge
    != one globally predefined meaning of "knowledge"

semantic representation
    != transport encoding

semantic presence
    != inline materialization

communication
    != acceptance

communication
    != belief

communication
    != truth

request
    != authorization

authorization
    != execution

intent
    != external effect

same symbol
    != different meaning in different modules

same structure
    != same Semantic Identity

unknown
    != false

missing structure
    != evidence of absence

representability
    != mandatory computation

available structural depth
    != required structural depth
~~~

These distinctions govern interpretation of the rest of this candidate.

---

# 1. Purpose

Agent X-Change is an ISOgraph-defined formal language for communicating structured knowledge between agents.

Its primary objective is:

~~~
preserve the meaning and load-bearing structure required for
one agent to communicate knowledge to another
with minimum unnecessary semantic and computational overhead
~~~

Agent X-Change is not intended to create a second foundational representation beside ISOgraph.

Instead:

~~~
ISOgraph
    -> supplies the structural language

Agent X-Change
    -> uses that language to define a constrained form of knowledge
       for inter-agent communication
~~~

A useful working statement is:

\[
\boxed{
AgentXChange \subseteq Knowledge_{ISOgraph}
}
\]

This expression means that Agent X-Change defines a class of ISOgraph knowledge structures and relations. It does not mean that Agent X-Change is an opaque foreign system stored inside a generic container.

---

# 2. Relationship to ISOgraph

Agent X-Change is constructed using ISOgraph.

It inherits ISOgraph semantics wherever those semantics already express the required distinction.

Agent X-Change introduces new semantic structure only when inter-agent communication requires a distinction that is not already represented by the applicable ISOgraph structure.

The intended dependency direction is:

~~~
ISOgraph
    -> Agent X-Change
~~~

Agent X-Change does not redefine ISOgraph primitives.

Agent X-Change does not assign new meanings to existing ISOgraph semantic identities.

If an ISOgraph semantic object already means exactly what Agent X-Change requires, Agent X-Change uses that same object.

If Agent X-Change requires a genuinely new meaning, it introduces a distinct semantic object and defines its relations using ISOgraph.

---

# 3. Shared semantic universe

ISOgraph and Agent X-Change occupy one semantic universe.

A semantic identity has one meaning wherever it appears.

If semantic object S occurs in:

~~~
ISOgraph structure
Agent X-Change knowledge
another ISOgraph-defined theory
~~~

then S retains the same semantic identity and meaning in every occurrence.

Module, scope, file, repository, transport, or application boundaries do not independently redefine the meaning of S.

Therefore:

~~~
same semantic identity
    -> same represented meaning
~~~

while:

~~~
same surface spelling
    != automatically same semantic identity
~~~

and:

~~~
different surface spelling
    != automatically different semantic meaning
~~~

Where an Agent X-Change construction specializes a more general ISOgraph construction, the specialization is represented explicitly rather than inferred from its name.

---

# 4. Agent X-Change knowledge domain

Let K denote the applicable ISOgraph Knowledge domain.

Agent X-Change defines a constrained region:

\[
K_{AX}\subseteq K
\]

whose members participate in Agent X-Change communication.

The exact meaning of Knowledge is not globally imposed by Agent X-Change.

A theory, profile, corpus, application, or author may define the knowledge being represented according to its own semantic authority using ISOgraph.

Agent X-Change is concerned with the structure by which that knowledge participates in communication between agents.

Working abstraction:

\[
AX=(K_{AX},C_{AX},T_{AX},I_{AX})
\]

where:

- \(K_{AX}\) is the relevant class of ISOgraph knowledge structures;
- \(C_{AX}\) contains Agent X-Change-specific constraints where such constraints are actually required;
- \(T_{AX}\) contains Agent X-Change-relevant structural transformations;
- \(I_{AX}\) contains Agent X-Change invariants that follow from or are explicitly required by the represented construction.

These are conceptual categories, not new ISOgraph primitives.

---

# 5. Minimal communication construction

The first candidate communication structure requires only enough structure to recover:

~~~
source / sender role
destination / recipient role
communicated knowledge
~~~

Conceptually:

\[
Communicate(A,B,K)
\]

where:

- A participates in the sender/source role;
- B participates in the recipient/destination role;
- K is communicated ISOgraph knowledge.

This notation is explanatory only. Draft 0.1 does not promote Communicate to an irreducible ISOgraph primitive or freeze surface syntax.

A qualified lower structural construction may represent the same meaning.

Additional structure is introduced only when it matters.

Examples include:

~~~
exchange identity
communicative intent
causal parent
reply relation
authority
constraint
provenance
uncertainty
assumption
evidence
deadline
resource budget
task relation
completion state
receipt
~~~

Their absence from a simple communication does not by itself make that communication invalid unless the claim or operation being represented depends on them.

---

# 6. Communication does not imply adoption

Communication changes what has been communicated or made available to a recipient.

It does not, without additional represented structure, imply that the recipient:

~~~
accepts the knowledge
believes the knowledge
knows the knowledge to be true
agrees with the sender
has verified the knowledge
has acted on the knowledge
has accepted responsibility
~~~

These stronger relations may be represented explicitly when required.

Thus:

\[
Communicated(B,K)
\]

does not by itself establish:

\[
Believes(B,K)
\]

or:

\[
Verified(B,K)
\]

or:

\[
True(K)
\]

Agent X-Change preserves whatever distinction the represented theory makes among those relations.

---

# 7. Communicative intent

Some exchanges require more information than source, recipient, and content.

A communication may participate in structures corresponding to concepts such as:

~~~
inform
query
request
propose
accept
reject
delegate
cancel
acknowledge
return-result
~~~

Draft 0.1 does not declare this list complete and does not assume that every listed term deserves primitive or dedicated syntax.

Where such distinctions are load-bearing, they are represented structurally.

Where they are not required, a generic communication need not manufacture them.

A communication lacking an explicit stronger act does not silently acquire one through natural-language inference.

---

# 8. Optional semantic depth

Agent X-Change does not require every communication to expose all structure that could possibly be represented about it.

The intended principle is:

~~~
use the minimum structural depth sufficient for the communication,
claim, or operation being made
~~~

A shallow exchange may contain only the directly required structure.

A deeper exchange may additionally expose:

~~~
provenance
dependencies
constraints
uncertainty
unknown structure
authority
resources
factorization
identity evidence
comparison witnesses
proof objects
policy
history
~~~

The existence of these deeper structures in ISOgraph does not make their calculation or materialization mandatory for every Agent X-Change operation.

---

# 9. Semantic support versus materialization

A distinction may be semantically load-bearing without being serialized inline.

Agent X-Change therefore distinguishes:

~~~
semantic support
    !=
inline materialization
~~~

Supporting structure may be available through:

~~~
inline native structure
transparent qualified references
already shared structure
immutable referenced artifacts
other ISOgraph-qualified reconstruction mechanisms
~~~

If a claim depends upon structure that is not currently available or resolvable, the consequence follows from that claim's dependency obligations.

The packet itself need not be prohibited merely for being shallow.

Instead:

~~~
required support unavailable
    -> dependent claim or operation remains unresolved,
       incomplete, unqualified, or unavailable at that depth
~~~

according to the semantics of the governing structure.

Agent X-Change does not add an independent global prohibition when ISOgraph dependency semantics already determine this result.

---

# 10. Refinement and materialization

An Agent X-Change structure may be represented at different materialization depths during its lifecycle.

Conceptually:

\[
V_0(K)\rightarrow V_1(K)\rightarrow V_2(K)
\]

may expose progressively more of one semantic structure.

Examples:

~~~
resolve a referenced dependency
materialize evidence
expose primitive support
expand a factorization
retrieve a proof object
load unresolved QU structure
expose identity-relevant NEI evidence
~~~

Such expansion does not automatically revise the original knowledge.

A distinction is maintained between:

~~~
refinement / materialization
~~~

and:

~~~
semantic revision
~~~

Refinement exposes additional compatible structure.

Revision changes, retracts, supersedes, or otherwise alters a prior semantic commitment.

Where that distinction matters, it is represented explicitly.

---

# 11. Contraction and projection

A receiver does not necessarily require every available detail.

A communication may therefore use a qualified projection or contracted representation when that representation preserves the distinctions required for the current claim or operation.

Agent X-Change does not require one globally minimal projection.

Different agents, tasks, contexts, and execution environments may require different views of the same underlying knowledge.

Conceptually:

\[
View(K,Context)
\]

may differ while preserving the required semantics.

No projection is evidence that omitted distinctions are globally irrelevant.

A distinction omitted from one view may remain load-bearing under another view or later claim.

---

# 12. Unknown and unresolved knowledge

Agent X-Change does not require unknown information to be converted into a guessed value or generic placeholder.

When unresolved structure matters, the represented knowledge may preserve:

~~~
what is known
what is unknown
relationships among unknowns
constraints on possible resolutions
dependencies
scope
provenance
coverage/completeness status
~~~

Where ISOgraph QU or another qualified structure supplies the appropriate semantics, Agent X-Change may use it directly.

Agent X-Change does not introduce a separate generic uncertainty ontology merely because communication occurs between agents.

The consequence of unresolved structure follows from the claim being made.

Examples:

~~~
unknown irrelevant to claim
    -> claim may remain qualified if its obligations close without it

unknown required by claim
    -> claim remains unresolved/incomplete until that obligation is discharged
~~~

Absence of information does not automatically establish falsity, permission, prohibition, SAME, DISTINCT, or any other stronger conclusion.

---

# 13. Epistemic qualification

A communication may include structure describing its own epistemic condition.

Examples may include relations corresponding to:

~~~
observed
reported
assumed
inferred
hypothesized
verified
disputed
unresolved
incomplete
resource-limited
~~~

These are not assumed to form one universal mandatory Agent X-Change ontology.

Profiles may define the distinctions required for their domain.

A communication can therefore carry not merely a scalar confidence value, but structural information about why a claim is uncertain or incomplete.

A receiving agent may combine the received structure with its own knowledge and obtain a different qualified epistemic result where the governing semantics permit it.

---

# 14. Provenance and evidence

Where provenance is load-bearing, Agent X-Change preserves enough structure to recover the relevant source, dependency, authority, or derivation relations.

Where provenance is not required for the communicated claim, Agent X-Change does not require unnecessary provenance structure solely because ISOgraph can represent it.

A stronger claim carries a correspondingly stronger evidentiary burden.

Examples:

~~~
"Agent A reports X"
~~~

requires less than:

~~~
"X is independently verified"
~~~

which may require less than:

~~~
"X is invariant across every admissible realization"
~~~

Agent X-Change follows the governing ISOgraph principle that evidence burden follows the claim rather than requiring the strongest possible analysis for every communication.

---

# 15. Authority

Communication, request, authorization, and execution are distinct.

A sender may communicate an action request without establishing authority for that action.

A represented authorization may itself carry:

~~~
principal
scope
resource
operation
conditions
duration
delegation relation
evidence or authentication reference
~~~

where required by the governing theory/profile.

Agent X-Change does not assume that possession of a message implies authority.

Likewise, an authorization representation does not itself perform the authorized action.

Runtime enforcement is distinct from semantic representation.

---

# 16. Tasks, delegation, and responsibility

Agent X-Change may represent work-related knowledge including:

~~~
objective
task
subtask
responsibility
dependency
delegation
acceptance
refusal
completion
result
cancellation
~~~

Draft 0.1 does not assume these are all primitives.

Where delegation is represented, the structure may preserve whatever relations are required by the applicable theory, such as:

~~~
who delegated
to whom
what knowledge/task was delegated
what authority or resources accompanied it
what obligations remained with the delegator
what result relationship is expected
~~~

The exact lower construction remains subject to factorization and qualification.

---

# 17. Capability communication and negotiation

Agent capabilities may themselves be represented as knowledge.

An agent may communicate structures describing:

~~~
supported operations
accepted structures
available tools
resource limits
supported semantic profiles
preferred representations
available transports
~~~

Compatibility may be established using ordinary ISOgraph structural relations and constraints where possible.

Agent X-Change does not require a separate capability-description substrate if ISOgraph structure already represents the required information.

Feature negotiation, fallback, or compatibility conclusions must not be inferred solely from naming similarity where structural evidence is required.

---

# 18. External effects

Agent X-Change represents knowledge about actions and effects.

It does not equate representation with occurrence in the external world.

Conceptually distinct structures may include:

~~~
desired effect
requested effect
authorized effect
attempted effect
reported effect
observed effect
verified effect
~~~

A runtime may use Agent X-Change knowledge to perform an external action.

The external action itself remains outside the semantic representation until some represented observation, receipt, authority, or other governing structure establishes what occurred.

---

# 19. Transformations

Agent X-Change may define lawful transformations among Agent X-Change knowledge structures using ordinary ISOgraph rewrite machinery.

Possible examples include:

~~~
request -> accepted request
open task -> completed task
claim -> verified claim
hypothesis -> rejected hypothesis
delegation -> returned result
active operation -> cancelled operation
partial knowledge -> refined knowledge
~~~

This list is illustrative.

Rule existence does not imply rule activation.

Representability of a transition does not imply that every runtime must execute it.

Execution policy, scheduling, transport, and external effect handling remain separable from semantic rule definition unless an Agent X-Change profile explicitly makes them part of its represented meaning.

---

# 20. Constraints and hard rules

Agent X-Change prefers semantic consequences derived from existing structure over redundant imposed constraints.

The working order is:

~~~
natural structural consequence
-> defined behavior/default where needed
-> minimally scoped explicit constraint when required
~~~

A hard constraint is introduced only where the required semantics cannot be obtained safely or deterministically from the existing construction.

When a hard constraint is necessary, its scope is limited to the semantic region that requires it.

A local ambiguity does not justify a global restriction.

An Agent X-Change constraint therefore excludes no more structure than is required to preserve the intended meaning, safety, or determinism of the affected construction.

This principle does not prohibit hard rules.

It limits them to the places and scopes where they are actually necessary.

---

# 21. Transport independence

Agent X-Change Draft 0.1 defines semantics, not a mandatory network protocol.

The same Agent X-Change structure may later admit representations such as:

~~~
native ISOgraph text
compact binary
streamed deltas
content-addressed references
shared-memory representation
database-backed structure
model-optimized serialization
~~~

provided the representation preserves the required Agent X-Change/ISOgraph semantics.

Transport optimization does not define semantic identity.

A particular encoding may become qualified for interoperability without becoming the language's foundational semantics.

---

# 22. Runtime independence

Agent X-Change does not require one:

~~~
LLM family
agent framework
scheduler
database
operating system
network protocol
tool interface
context window size
execution architecture
~~~

A runtime is conformant to a claim only to the degree that it preserves and correctly acts upon the semantics required by that claim/profile.

A simple runtime may support only shallow communication.

A richer runtime may support:

~~~
dynamic structural refinement
deep provenance retrieval
ISOgraph comparison
factorization
uncertainty analysis
structural capability matching
incremental dependency reasoning
~~~

The richer feature set does not become mandatory merely because it is representable.

---

# 23. Interoperability

Agent X-Change aims to support communication among heterogeneous agents.

Interoperability may be established through structural compatibility rather than requiring identical internal implementations.

Where two systems expose corresponding Agent X-Change structures, ISOgraph comparison may identify:

~~~
common structure
compatible roles
residual differences
missing obligations
possible bridges
~~~

A discovered correspondence does not automatically establish a qualified operational adapter.

The strength of the interoperability claim determines the evidence required.

---

# 24. Structural analysis

Because Agent X-Change is defined using ISOgraph, Agent X-Change structures remain directly available to ISOgraph analysis.

Possible analyses include:

~~~
isomorphism
common-core discovery
residual analysis
factorization
invariant discovery
alternative representation comparison
workflow comparison
failure-pattern comparison
rule comparison
~~~

No translation into a second semantic universe is required.

Agent X-Change itself, including its constructions, rules, constraints, and execution traces, may be represented and analyzed as ISOgraph structure.

---

# 25. Minimality

Agent X-Change does not treat familiarity, implementation convenience, or repeated use as evidence that a concept deserves primitive status.

Before introducing a new Agent X-Change semantic object or dedicated construction:

~~~
identify the required distinction
-> attempt faithful representation using existing ISOgraph structure
-> determine whether any load-bearing residual remains
-> introduce a new Agent X-Change object only when the distinction remains semantically necessary
~~~

This is a design discipline rather than a claim that every concept must be maximally decomposed before use.

A useful named construction may remain useful even when it expands into lower structure.

Named convenience does not automatically imply foundational primitive status.

---

# 26. Cost and semantic depth

The cost of processing an Agent X-Change structure should follow the work required by the actual claim or operation.

Conceptually:

~~~
simple communication
    -> simple processing

strong verification claim
    -> stronger verification burden

isomorphism claim
    -> comparison burden appropriate to that claim

complete-family claim
    -> completeness burden

external high-risk action
    -> authority/evidence burden required by that action
~~~

Agent X-Change does not require globally maximal analysis merely because deeper analysis is available.

Representability is not an execution obligation.

Derivability is not a materialization obligation.

---

# 27. Candidate semantic properties

Agent X-Change is intended to support, without necessarily making every property mandatory in every packet:

~~~
semantic fidelity
compact context transfer
structural verification
model/runtime independence
bounded authority representation
asynchronous communication
capability negotiation
uncertainty representation
provenance and traceability
fault/recovery knowledge
cross-agent delegation
tool/resource description
multimodal artifact reference
portable identity/authentication evidence
explicit communicative intent
stable reference integrity
schema/profile evolution
semantic extensibility
composition
idempotency/replay structure
temporal qualification
conflict representation
compensation/effect knowledge
behavioral constraints
durable continuation
privacy/information-flow structure
instruction/data distinction
human approval/revocation
evidence/attestation
reproducibility
resource/budget knowledge
progressive results
responsibility transfer
policy/lifecycle constraints
memory ownership/retention
ISOgraph-native structural analysis
resource multiplicity
reality/knowledge/intent distinction
partial distributed views
negative/unknown knowledge
branching/hypothetical states
rewrite strategy/control
~~~

These are design and qualification targets.

Their inclusion in this list does not make each one a mandatory field or primitive.

---

# 28. Non-goals of Draft 0.1

Draft 0.1 does not attempt to freeze:

~~~
final Agent X-Change surface syntax
final binary/wire format
complete performative vocabulary
complete agent ontology
complete task ontology
complete authority system
cryptographic protocol
transport protocol
scheduler
database/storage model
mandatory ISOgraph discovery algorithm
mandatory NEI usage
mandatory QU usage
mandatory factorization depth
mandatory canonical form
one universal proof system
one universal confidence scale
~~~

Future evidence may justify some of these as profiles, constructions, or implementation standards.

They are not presumed necessary merely because they may be useful.

---

# 29. Initial qualification questions

The first Agent X-Change qualification campaign should attempt to falsify at least the following claims:

1. A minimal Agent X-Change exchange can be represented faithfully using ISOgraph without introducing an independent semantic substrate.
2. Fresh agents can reconstruct sender, recipient, communicated knowledge, and any load-bearing qualification from isolated Agent X-Change structures.
3. Optional deeper structure can be omitted when irrelevant without changing the meaning of the represented shallow claim.
4. When deeper structure is required, the missing dependency is exposed as unresolved/incomplete rather than silently guessed.
5. Existing ISOgraph symbols can be reused inside Agent X-Change without semantic collision.
6. Agent X-Change-specific symbols retain one stable semantic meaning throughout the shared ISOgraph universe.
7. Unknown and uncertain information can be represented without collapsing it into generic UNKNOWN when the unresolved structure matters.
8. A simple exchange does not require expensive structural search or isomorphism analysis merely because ISOgraph supports those operations.
9. A deeper exchange can invoke ISOgraph comparison/factorization/identity/unknown machinery without crossing a translation boundary.
10. Agent X-Change constraints can remain local to the constructions that require them rather than forcing unrelated global restrictions.
11. Agent X-Change structures remain directly analyzable by ISOgraph for structural commonality, residuals, and invariants.
12. Agent X-Change can represent communication across heterogeneous agent implementations without requiring identical internal architectures.

---

# 30. Failure classification

Before changing this candidate, classify failures as one of:

~~~
ISOgraph expressibility misunderstanding
Agent X-Change semantic ambiguity
missing Agent X-Change distinction
unnecessary Agent X-Change distinction
surface/serialization defect
transport/runtime defect
qualification fixture defect
agent reconstruction defect
performance/materialization defect
non-defect / reviewer misunderstanding
~~~

Do not repair a runtime or serialization failure by introducing a new semantic primitive unless evidence establishes that the semantic representation itself is insufficient.

Do not repair a difficult case by adding a global hard rule when the problem is local.

Do not weaken a load-bearing distinction merely to make communication smaller.

---

# 31. Working architectural summary

Agent X-Change Draft 0.1 currently assumes:

~~~
ISOgraph supplies the formal structural universe.

Knowledge supplies the region in which Agent X-Change is constructed.

Agent X-Change defines the structures and relations needed for
inter-agent communication inside that region.

Existing ISOgraph meanings are reused directly.

New Agent X-Change meanings are introduced only where necessary.

Simple communication remains shallow.

Deeper structural qualification remains available on demand.

Semantic support may remain referenced rather than materialized inline.

Unknown structure remains representable as unknown structure.

Constraints follow naturally from structure where possible.

Explicit hard constraints are added only where required
and only at the scope required.

Transport, runtime, storage, cryptography, and search strategy
remain downstream implementation concerns unless explicitly
made semantic by a governing profile.

Agent X-Change structures remain ordinary ISOgraph structures
and are therefore directly available to ISOgraph structural analysis.
~~~

The resulting working definition is:

\[
\boxed{
\text{Agent X-Change is an ISOgraph-defined formal language for the
structured communication of knowledge between agents.}
}
\]

Its design target is:

\[
\boxed{
\text{minimum necessary communication structure}
+
\text{arbitrary justified semantic depth when needed}
}
\]

without introducing a second foundational semantic system.
