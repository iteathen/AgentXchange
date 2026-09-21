import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const manifest = JSON.parse(fs.readFileSync(new URL('./baselines/json-array-v1.json', import.meta.url), 'utf8'));

function decodeFrozenAxSubset(text) {
  const relations = [];
  const edge = /\(\^(\d+)((?:\s+-?\d+)+)\)/g;
  let match;
  while ((match = edge.exec(text)) !== null) {
    const id = Number.parseInt(match[1], 10);
    const args = match[2].trim().split(/\s+/).map(value => Number.parseInt(value, 10));
    if (!Number.isSafeInteger(id) || args.some(value => !Number.isSafeInteger(value))) {
      throw new Error('non-integer frozen experiment token');
    }
    relations.push([id, ...args]);
  }
  if (relations.length === 0) throw new Error('no frozen relations decoded');
  return relations;
}

function compactAx(relations) {
  return '[' + relations.map(([id, ...args]) => '(^' + id + ' ' + args.join(' ') + ')').join('') + ']';
}

function same(a,b){ return JSON.stringify(a) === JSON.stringify(b); }

const rows=[];
for (const task of manifest.tasks) {
  const file=path.join(root,task.file);
  const checkedIn=fs.readFileSync(file,'utf8');
  const decoded=decodeFrozenAxSubset(checkedIn);
  if (!same(decoded,task.relations)) throw new Error(task.id + ': frozen Agent X-Change packet does not match baseline semantic tuples');

  const jsonText=JSON.stringify(task.relations);
  const jsonDecoded=JSON.parse(jsonText);
  if (!same(jsonDecoded,task.relations)) throw new Error(task.id + ': JSON round trip changed semantic tuples');

  const compact=compactAx(task.relations);
  const checkedInBytes=Buffer.byteLength(checkedIn,'utf8');
  const compactAxBytes=Buffer.byteLength(compact,'utf8');
  const jsonBytes=Buffer.byteLength(jsonText,'utf8');

  rows.push({
    id:task.id,
    sourceFile:task.file,
    relations:task.relations,
    checkedInAgentXBytes:checkedInBytes,
    compactEquivalentAgentXBytes:compactAxBytes,
    minifiedJsonArrayBytes:jsonBytes,
    jsonMinusCompactAgentXBytes:jsonBytes-compactAxBytes,
    semanticTupleRoundTrip:true,
    compactAgentX:compact,
    minifiedJson:jsonText
  });
}

const totals=rows.reduce((acc,row)=>{
  acc.checkedInAgentXBytes+=row.checkedInAgentXBytes;
  acc.compactEquivalentAgentXBytes+=row.compactEquivalentAgentXBytes;
  acc.minifiedJsonArrayBytes+=row.minifiedJsonArrayBytes;
  return acc;
},{checkedInAgentXBytes:0,compactEquivalentAgentXBytes:0,minifiedJsonArrayBytes:0});

const report={
  schema:'agentx-external-json-array-baseline-result-v1',
  evidenceClass:'REFERENCE-GROUNDED',
  sourceRevision:process.env.AX_SOURCE_REVISION ?? process.env.GITHUB_SHA ?? null,
  externalReference:manifest.externalReference,
  comparisonScope:manifest.fairness,
  taskCount:rows.length,
  allSemanticTupleRoundTripsPassed:rows.every(row=>row.semanticTupleRoundTrip),
  rows,
  totals:{
    ...totals,
    jsonMinusCompactAgentXBytes:totals.minifiedJsonArrayBytes-totals.compactEquivalentAgentXBytes
  },
  interpretation:'This measures only UTF-8 bytes for equivalent frozen relation tuples under the stated shared-schema comparison. It is not a general protocol or performance ranking.'
};

const output=process.argv[2] ?? 'agentx-json-array-baseline-result.json';
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({
  schema:report.schema,
  evidenceClass:report.evidenceClass,
  taskCount:report.taskCount,
  allSemanticTupleRoundTripsPassed:report.allSemanticTupleRoundTripsPassed,
  totals:report.totals,
  output
}));
