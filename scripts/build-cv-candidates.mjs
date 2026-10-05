// Local review derivatives; never writes career sources or replaces public CVs.
import {readFile,writeFile,mkdir,rename,rm} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {loadResumeSource} from './lib/resume-source.mjs';
import {escapeHtml as e} from './lib/resume-markup.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const {profile,tokens}=await loadResumeSource();
const config=JSON.parse(await readFile(resolve(root,'content/cv-candidate.json'),'utf8'));
if(config.schemaVersion!==1||!['candidate','selected'].includes(config.status))throw Error('Invalid CV edition');
if(JSON.stringify(config.projectIds)!==JSON.stringify(profile.entry.projectIds))throw Error('Candidate project selection must match the general homepage');
const output=resolve(root,'review/cv-candidates');await mkdir(output,{recursive:true});
const require=createRequire(import.meta.url);
if(!process.env.PLAYWRIGHT_MODULE)throw Error('Set PLAYWRIGHT_MODULE to the installed Playwright module; see review/cv-candidates/README.md');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const sha=b=>createHash('sha256').update(b).digest('hex');
const inputs=[];for(const name of ['content/resume-profile.json','content/cv-candidate.json','content/design-tokens.json','scripts/build-cv-candidates.mjs']){const b=await readFile(resolve(root,name));inputs.push({file:name,bytes:b.length,sha256:sha(b)});}
const receipt={edition:config.edition,status:config.status,scope:'Workspace-local derivatives from shared homepage facts; not byte-identical career PDFs. No external source writes.',inputs,outputs:[]};
const staged=[];
try{for(const language of ['en','zh-TW']){
 const c=config[language];
 const period=(start,end)=>`${start} – ${end}`;
 const jobs=profile.professional.map(item=>{
  const metric=item.metric?item.metric[language].replaceAll('{value}',String(item.metric.value)):item[language].result;
  const summary=item[language].summary.replaceAll('{cameraPairs}',String(item.system?.cameraPairs));
  const detail=config.professionalDetailIndices[item.id].map(i=>{const text=item[language].details[i];if(!text)throw Error('Missing career detail');return text;}).join(' ');
  return `<article><div class="job-heading"><h3>${e(item.employer)} <span>· ${e(item.title)}</span></h3><time>${e(period(item.start,item.end))}</time></div><p>${e(summary)} <strong>${e(metric)}.</strong></p><p>${e(detail)}</p></article>`;
 }).join('');
 const studies=profile.education.map(x=>`<p><strong>${e(x[language].title)}</strong> · ${e(x[language].institution)} · ${e(period(x.start,x.end))}</p>`).join('');
 const research=profile.researchLearning[0];
 const html=`<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(profile.identity.name)} — ${e(c.candidateLabel)}</title><style>
 @page{size:A4;margin:12mm 14mm}*{box-sizing:border-box}body{font:10.3pt/1.32 ${tokens.fontFamily};color:#242824;background:#fff;max-width:182mm;margin:0 auto}h1{font-size:23pt;line-height:1.1;margin:0 0 5pt;letter-spacing:-.025em}h2{font-size:11pt;line-height:1.2;color:${tokens.light.accent};margin:10pt 0 6pt;padding-bottom:3pt;border-bottom:1px solid #BCC4B9}h3{font-size:10.3pt;margin:0;font-weight:700;line-height:1.3}h3 span{font-weight:400}p{margin:3pt 0}header{padding-bottom:7pt;border-bottom:2px solid ${tokens.light.accent}}.role{font-size:11pt;color:${tokens.light.accent};font-weight:600}.contact{font-size:10pt}.intro{margin-top:9pt}.context{color:#5C645D;font-size:9.3pt}.job-heading{display:flex;gap:12pt;justify-content:space-between;align-items:baseline}.job-heading h3{max-width:142mm}time{white-space:nowrap;color:#5C645D;font-size:9pt}article{margin:0 0 8pt;break-inside:avoid}.note{font-size:8.6pt;color:#5C645D}a{color:inherit;text-decoration:none}footer{margin-top:10pt;font-size:8pt;color:#5C645D}section{break-inside:auto}h2{break-after:avoid}html[lang="zh-TW"]{line-break:strict}@media screen{body{padding:24px;max-width:210mm}.job-heading{flex-wrap:wrap}time{font-size:10pt}}@media(max-width:600px){body{padding:20px}.job-heading{display:block}h1{font-size:21pt}}
 </style></head><body><header><h1>${e(profile.identity.name)}</h1><p class="role">${e(profile.identity.role)}</p><p class="contact"><a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a></p></header><p class="intro">${e(profile.copy[language].lead)}</p><p class="context">${e(profile.copy[language].context)}</p><section><h2>${e(c.experience)}</h2>${jobs}<p class="note">${e(c.metricsNote)}</p></section><section><h2>${e(c.projects)}</h2><article><h3>Study Atlas</h3><p>${e(c.atlas)}</p></article><article><h3>Transcribe-for-X</h3><p>${e(c.tfx)}</p></article></section><section><h2>${e(c.skills)}</h2>${c.skillsLines.map(x=>`<p>${e(x)}</p>`).join('')}</section><section><h2>${e(c.education)}</h2>${studies}<p>${e(research[language].title)} · ${e(period(research.start,research.end))}</p></section>${config.status==='candidate'?`<footer>${e(c.candidateLabel)} · ${e(config.edition)}</footer>`:''}</body></html>`;
 const suffix=language==='en'?'en':'zh-tw',base=`blake-lin-cv-candidate-${suffix}`;
 const stageHtml=resolve(output,base+'.staging.html'),stagePdf=resolve(output,base+'.staging.pdf');
 await writeFile(stageHtml,html);staged.push([stageHtml,resolve(output,base+'.html')],[stagePdf,resolve(output,base+'.pdf')]);
 const context=await browser.newContext({offline:true});const page=await context.newPage();let external=0;page.on('request',r=>{if(/^https?:/.test(r.url()))external++;});await page.goto(pathToFileURL(stageHtml).href);await page.emulateMedia({media:'print'});await page.pdf({path:stagePdf,format:'A4',printBackground:true,preferCSSPageSize:true});if(external)throw Error('CV requested external resources');
 await context.close();
 const pages=Number(execFileSync('python3',['-c','from pypdf import PdfReader; import sys; print(len(PdfReader(sys.argv[1]).pages))',stagePdf],{encoding:'utf8'}).trim());
 if(pages!==1)throw Error(`Candidate must remain one page: ${language} has ${pages}`);
 receipt.outputs.push({language,html:base+'.html',pdf:base+'.pdf',pdfSha256:sha(await readFile(stagePdf)),httpRequests:external});
}
// All renders must succeed before any good candidate is replaced.
for(const [from,to] of staged)await rename(from,to);
await writeFile(resolve(output,'provenance.json'),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify(receipt.outputs));
}finally{await browser.close();for(const [from] of staged)await rm(from,{force:true});}
