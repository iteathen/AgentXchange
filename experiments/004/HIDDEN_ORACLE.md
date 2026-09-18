# Experiment 004 Hidden Oracle

**SCORER ONLY — MUST NOT ENTER THE COLD PACKET**

The test hides an eight-relation structural skeleton shared by Alpha and Beta under independent local stable-label namespaces.

## Expected motifs

### O1 — directed handoff boundary
Alpha: 101
Beta: 201

One source-local participant passes one content/work object to another participant.

### O2 — work-content/resource coupling
Alpha: 102,103
Beta: 202,203

The transferred work/content references a required supporting resource, and a second relation connects source, recipient, work, and that resource.

### O3 — acceptance/activation depends jointly on handoff and support relation
Alpha: 101,103,104
Beta: 201,203,204

A recipient/work relation depends on both the initial handoff event and the supporting-resource relation.

**Deep motif.**

### O4 — accepted work produces a result that is returned across the boundary
Alpha: 104,105,106
Beta: 204,205,206

The accepted/activated work produces a result, and the result is communicated back with source/recipient roles reversed relative to the original handoff.

**Deep motif.**

### O5 — result qualification precedes final checking
Alpha: 105,107,108
Beta: 205,207,208

The produced result participates in a qualification structure containing support plus an unresolved element; the original source then relates to the result/support/qualification event.

**Deep motif.**

## Expected residuals

Alpha-specific:
- 109

Beta-specific:
- 209

These residuals intentionally prevent promotion to full-trace isomorphism.

## Gamma near-negative

Gamma preserves much of the chain/arity shape but splits one load-bearing participant role:

- 301 sends work/content from 210 to 220.
- 303 connects the supporting resource to 225, not 220.
- 304 still uses 220 as the actor/recipient while depending on 303.

The expected breaker is therefore a shared-role/identity failure across the handoff-support-acceptance region.

A strong Gamma assessment should cite at least 301,303,304 and explain that the Alpha/Beta common core requires one recipient/worker role to be shared where Gamma introduces a distinct SI.

Gamma may still receive PARTIAL for unaffected substructure, but it must not be promoted as supporting the complete Alpha/Beta core.

## Overclaims to reject

- full-trace isomorphism;
- natural identity;
- identical operational meaning;
- identical authority semantics.

## Threshold

A successful discovery result should:

- recover at least 4 of O1-O5;
- recover at least one deep motif O3-O5;
- preserve residual 109 and 209;
- identify Gamma's role-split breaker using concrete structure;
- include falsification attempts;
- reject all four public overclaim classes semantically;
- promote no stronger than SUPPORTED_CANDIDATE.
