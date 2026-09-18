import fs from 'node:fs';

const [,,resultPath='COLD_RESULT.json',assertPath='ASSERTIONS.json']=process.argv;
const r=JSON.parse(fs.readFileSync(resultPath,'utf8'));
const a=JSON.parse(fs.readFileSync(new URL(assertPath,import.meta.url),'utf8'));

const findings=Array.isArray(r.findings)?r.findings:[];
const overlap=(xs=[],ys=[])=>xs.filter(x=>ys.includes(x)).length;
const matched=[];

for(const [id,m] of Object.entries(a.motifs)){
  const ok=findings.some(f =>
    overlap(f.alpha_events,m.alpha)>=m.min_alpha_overlap &&
    overlap(f.beta_events,m.beta)>=m.min_beta_overlap
  );
  if(ok) matched.push(id);
}

const deep=a.deep_motifs.some(x=>matched.includes(x));
const alphaResidual=a.required_alpha_residuals.every(x=>(r.alpha_residual_events||[]).includes(x));
const betaResidual=a.required_beta_residuals.every(x=>(r.beta_residual_events||[]).includes(x));
const gammaEvents=r.gamma_assessment?.gamma_events||[];
const gammaCoverage=a.gamma_breaker_events.every(x=>gammaEvents.includes(x));
const gammaNegative=['STRUCTURAL_BREAKER','PARTIAL'].includes(r.gamma_assessment?.status);

const rejectionText=(r.rejected_overclaims||[]).join(' ').toLowerCase();
const rejected=a.required_rejected_overclaims.every(x=>rejectionText.includes(x));

const promotionOk=['SUPPORTED_CANDIDATE','INCOMPLETE','REJECTED'].includes(r.promotion);

const checks=[
  ['motifs',matched.length>=a.minimum_motifs,`${matched.length}/${Object.keys(a.motifs).length}: ${matched.join(',')}`],
  ['deep motif',deep,matched.filter(x=>a.deep_motifs.includes(x)).join(',')||'none'],
  ['alpha residual',alphaResidual,JSON.stringify(r.alpha_residual_events||[])],
  ['beta residual',betaResidual,JSON.stringify(r.beta_residual_events||[])],
  ['gamma breaker events',gammaCoverage,JSON.stringify(gammaEvents)],
  ['gamma not full-match',gammaNegative,r.gamma_assessment?.status||'missing'],
  ['overclaim rejection',rejected,rejectionText],
  ['bounded promotion',promotionOk,r.promotion||'missing']
];

for(const [name,ok,detail] of checks) console.log(`${ok?'PASS':'FAIL'} ${name} — ${detail}`);
const failed=checks.filter(x=>!x[1]);
console.log(`\n${checks.length-failed.length}/${checks.length} scorer checks passed`);
if(failed.length)process.exit(1);
