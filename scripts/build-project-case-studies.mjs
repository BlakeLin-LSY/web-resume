import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(await readFile(resolve(root, "content/project-case-studies.json"), "utf8"));
if (source.schemaVersion !== 1 || !Array.isArray(source.projects)) throw new Error("Unsupported case-study content");

// A project page lives directly under projects/ at either the root or a Next basePath.
// Relative back-links retain that current basePath in development and on GitHub Pages.
const projectsHref = "../#projects";

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const styles = `
:root{color-scheme:light dark;--bg:#f8fafc;--panel:#fff;--text:#0f172a;--muted:#475569;--border:#dbe3ee;--blue:#2563eb;--tint:#eff6ff}
@media(prefers-color-scheme:dark){:root{--bg:#020817;--panel:#0d1627;--text:#f1f5f9;--muted:#b2bfd0;--border:#263449;--blue:#60a5fa;--tint:#122440}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.75 system-ui,-apple-system,"Segoe UI",sans-serif}a{color:var(--blue);text-underline-offset:.2em}button{font:inherit}a:focus-visible,button:focus-visible{outline:3px solid var(--blue);outline-offset:4px}header,main,footer{width:min(1050px,100% - 40px);margin:auto}header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:28px 0;border-bottom:1px solid var(--border)}.back{text-decoration:none;font-weight:600}.languages{display:flex;gap:6px}.languages button{border:1px solid var(--border);background:var(--panel);color:var(--text);padding:7px 12px;border-radius:8px;cursor:pointer}.languages button[aria-pressed=true]{border-color:var(--blue);background:var(--tint);color:var(--blue)}.skip{position:absolute;top:-100px;left:20px;padding:10px;background:var(--panel);z-index:1}.skip:focus{top:10px}.hero{padding:50px 0 30px;max-width:780px}.eyebrow{color:var(--blue);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(2.4rem,6vw,4rem);line-height:1.15;letter-spacing:-.04em;margin:12px 0}h2{font-size:1.5rem;line-height:1.35;margin:0 0 18px}h3{font-size:1.05rem;margin:0 0 12px}.subtitle{font-size:1.3rem;font-weight:600;margin:0 0 16px}.lead{color:var(--muted);font-size:1.05rem}.tags{display:flex;gap:8px;flex-wrap:wrap;padding:0;list-style:none;margin:24px 0 0}.tags li{border:1px solid var(--border);border-radius:999px;padding:4px 12px;font-size:13px;color:var(--blue);background:var(--tint)}.section{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:30px;margin:0 0 22px}.section p{color:var(--muted);margin:12px 0}.flow{display:flex;flex-wrap:wrap;gap:10px;list-style:none;padding:0;margin:24px 0 0}.flow li{flex:1;min-width:120px;border-left:3px solid var(--blue);border-radius:6px;background:var(--tint);padding:12px;font-size:14px;line-height:1.5}.flow span{display:block;font-size:11px;font-weight:700;color:var(--blue);margin-bottom:5px}.example{padding:18px;border-left:3px solid var(--blue);background:var(--tint);border-radius:6px;margin-top:22px}.example p{margin:6px 0 0}.source-list{list-style:none;padding:0;margin:0}.source-list li{padding:14px 0;border-top:1px solid var(--border)}code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.82rem;overflow-wrap:anywhere}.source-role{display:block;color:var(--muted);font-size:13px}.notice{color:var(--muted);font-size:14px}.language-view+.language-view{border-top:1px solid var(--border);margin-top:40px}.js .language-view[hidden]{display:none}footer{border-top:1px solid var(--border);margin-top:32px;padding:24px 0 40px;color:var(--muted);font-size:13px}@media(max-width:600px){header{align-items:flex-start;flex-direction:column}.hero{padding-top:34px}.section{padding:22px}.flow{flex-direction:column}}
`;

const renderSection = (section) => {
  if (typeof section.heading !== "string" || !Array.isArray(section.paragraphs)) throw new Error("Invalid section");
  return `<section class="section"><h2>${escape(section.heading)}</h2>
${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("\n")}
${section.flow ? `<ol class="flow">${section.flow.map((step, index) => `<li><span>0${index + 1}</span>${escape(step)}</li>`).join("")}</ol>` : ""}
${section.example ? `<aside class="example"><h3>${escape(section.example.label)}</h3><p>${escape(section.example.text)}</p></aside>` : ""}
</section>`;
};

const renderLanguage = (project, language) => {
  const content = project[language];
  if (!content || content.sections.length !== 3) throw new Error(`Three sections required for ${project.id}/${language}`);
  return `<article class="language-view" lang="${language}" data-language="${language}">
<div class="hero"><p class="eyebrow">${language === "en" ? "Personal project · Engineering case study" : "個人工程專案 · 專案介紹"}</p>
<h1>${escape(project.title)}</h1><p class="subtitle">${escape(content.subtitle)}</p><p class="lead">${escape(content.lead)}</p>
<ul class="tags">${project.card.tags.map((tag) => `<li>${escape(tag)}</li>`).join("")}</ul></div>
${content.sections.map(renderSection).join("\n")}
</article>`;
};

const walkthroughStyles = `
.walkthrough{scroll-margin-top:24px;overflow-wrap:anywhere}.walkthrough-language+.walkthrough-language{border-top:1px solid var(--border);padding-top:28px;margin-top:28px}.walkthrough h2{margin-bottom:12px}.walkthrough-intro{max-width:780px}.walkthrough-boundary{padding:14px 18px;border-left:3px solid var(--blue);border-radius:6px;background:var(--tint);font-size:14px}.walkthrough-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:24px 0 18px}.walkthrough-steps button{display:flex;align-items:flex-start;gap:8px;text-align:left;line-height:1.4;font-size:13px;border:1px solid var(--border);border-radius:8px;padding:12px 10px;background:var(--bg);color:var(--text)}.walkthrough-steps button:enabled,.walkthrough-navigation button:enabled{cursor:pointer}.walkthrough-steps button[aria-pressed=true]{border-color:var(--blue);background:var(--tint);color:var(--blue)}.walkthrough-step-number{font-size:11px;font-weight:700;color:var(--blue)}.walkthrough-position{font-size:13px;color:var(--blue)!important;min-height:1.75em}.walkthrough-panel{border-top:1px solid var(--border);padding:22px 0 6px}.walkthrough-panel h3{font-size:1.15rem;line-height:1.4}.walkthrough-evidence{display:inline-block;margin:0 0 10px!important;font-size:12px;line-height:1.5;color:var(--blue)!important;border:1px solid var(--border);border-radius:6px;padding:5px 9px;background:var(--tint)}.walkthrough-budget{padding:18px;border:1px solid var(--border);border-radius:10px;background:var(--bg);margin:20px 0}.walkthrough-budget-value{display:flex;align-items:baseline;flex-wrap:wrap;gap:10px}.walkthrough-budget-value strong{font-size:1.7rem;line-height:1.3;font-variant-numeric:tabular-nums}.walkthrough-budget-value span{font-size:13px;color:var(--muted)}.walkthrough-budget-status{font-size:12px!important;font-weight:700;color:var(--blue)!important;border:1px solid var(--border);border-radius:6px;padding:3px 9px;background:var(--tint)}.walkthrough-budget p{font-size:14px;margin-bottom:0}.walkthrough-artifact{border:1px solid var(--border);border-radius:8px;margin:14px 0;padding:14px 16px}.walkthrough-artifact summary{cursor:pointer;font-weight:600;line-height:1.5}.walkthrough-artifact .walkthrough-evidence{margin-top:14px!important}.walkthrough-artifact p{font-size:14px}.walkthrough-artifact pre{max-width:100%;margin:14px 0 0;padding:14px;background:var(--bg);border:1px solid var(--border);border-radius:6px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.55}.walkthrough-navigation{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--border);padding-top:18px;margin-top:18px}.walkthrough-navigation button{border:1px solid var(--border);border-radius:8px;padding:8px 16px;background:var(--panel);color:var(--text)}.walkthrough-navigation button:disabled{opacity:.45}.js .walkthrough-panel[hidden],.js .walkthrough-language[hidden]{display:none}summary:focus-visible{outline:3px solid var(--blue);outline-offset:4px}@media(max-width:700px){.walkthrough-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.walkthrough-steps button:last-child{grid-column:1/-1}.walkthrough-artifact{padding:12px}.walkthrough-artifact pre{padding:10px}.walkthrough-navigation button{padding:8px 12px}}
`;

const walkthroughStepIds = ["source", "initial", "rejection", "revision", "artifact"];
const requireWalkthroughText = (value, name) => {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Non-empty walkthrough text required: ${name}`);
};

const validateWalkthrough = (project) => {
  const walkthrough = project.walkthrough;
  if (!walkthrough) return;
  if (walkthrough.schemaVersion !== 1) throw new Error(`Unsupported walkthrough schema: ${project.id}`);
  requireWalkthroughText(walkthrough.historicalDate, `${project.id}/historicalDate`);
  requireWalkthroughText(walkthrough.contractVersion, `${project.id}/contractVersion`);
  for (const language of ["en", "zh-TW"]) {
    const content = walkthrough[language];
    if (!content || !Array.isArray(content.steps) || content.steps.length !== walkthroughStepIds.length) throw new Error(`Five walkthrough steps required: ${project.id}/${language}`);
    for (const field of ["eyebrow", "title", "intro", "boundary", "previous", "next", "positionLabel", "minutesLabel"]) requireWalkthroughText(content[field], `${project.id}/${language}/${field}`);
    content.steps.forEach((step, index) => {
      const path = `${project.id}/${language}/${walkthroughStepIds[index]}`;
      if (!step || step.id !== walkthroughStepIds[index]) throw new Error(`Invalid walkthrough step order: ${path}`);
      for (const field of ["label", "heading", "evidence"]) requireWalkthroughText(step[field], `${path}/${field}`);
      if (!Array.isArray(step.paragraphs) || !step.paragraphs.length) throw new Error(`Walkthrough paragraphs required: ${path}`);
      step.paragraphs.forEach((paragraph, paragraphIndex) => requireWalkthroughText(paragraph, `${path}/paragraphs/${paragraphIndex}`));
      if (["rejection", "revision"].includes(step.id) && !step.budget) throw new Error(`Historical budget required: ${path}`);
      if (step.budget) {
        if (!Number.isFinite(step.budget.minutes) || step.budget.minutes < 0 || !Number.isFinite(step.budget.limit) || step.budget.limit <= 0) throw new Error(`Invalid historical budget: ${path}`);
        requireWalkthroughText(step.budget.status, `${path}/budget/status`);
        requireWalkthroughText(step.budget.caption, `${path}/budget/caption`);
      }
      if (step.id === "artifact" && (!Array.isArray(step.artifacts) || step.artifacts.length !== 3)) throw new Error(`Three inspectable artifacts required: ${path}`);
      if (step.artifacts) {
        if (!Array.isArray(step.artifacts)) throw new Error(`Invalid walkthrough artifacts: ${path}`);
        step.artifacts.forEach((artifact, artifactIndex) => {
          for (const field of ["label", "evidence", "description", "content"]) requireWalkthroughText(artifact[field], `${path}/artifacts/${artifactIndex}/${field}`);
        });
      }
    });
  }
};

const renderWalkthrough = (project) => {
  if (!project.walkthrough) return "";
  validateWalkthrough(project);
  const languages = ["en", "zh-TW"].map((language) => {
    const content = project.walkthrough[language];
    const prefix = `walkthrough-${language}`;
    return `<div class="walkthrough-language" lang="${language}" data-language="${language}" data-walkthrough-language>
<p class="eyebrow">${escape(content.eyebrow)}</p><h2 id="${prefix}-title">${escape(content.title)}</h2>
<p class="walkthrough-intro">${escape(content.intro)}</p><p class="walkthrough-boundary">${escape(content.boundary)}</p>
<div class="walkthrough-steps" role="group" aria-labelledby="${prefix}-title">${content.steps.map((step, index) => `<button type="button" data-walkthrough-select="${index}" aria-pressed="${index === 0}" aria-controls="${prefix}-${step.id}" disabled><span class="walkthrough-step-number">0${index + 1}</span><span>${escape(step.label)}</span></button>`).join("")}</div>
<p class="walkthrough-position" data-walkthrough-position data-position-label="${escape(content.positionLabel)}" aria-live="polite" aria-atomic="true">${escape(content.positionLabel)} 1 / ${content.steps.length} · ${escape(content.steps[0].heading)}</p>
${content.steps.map((step, index) => `<section class="walkthrough-panel" id="${prefix}-${step.id}" data-walkthrough-panel="${index}" aria-labelledby="${prefix}-${step.id}-heading">
<h3 id="${prefix}-${step.id}-heading">${escape(step.heading)}</h3><p class="walkthrough-evidence">${escape(step.evidence)}</p>
${step.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("\n")}
${step.budget ? `<aside class="walkthrough-budget"><div class="walkthrough-budget-value"><strong>${step.budget.minutes.toFixed(1)} / ${step.budget.limit.toFixed(1)}</strong><span>${escape(content.minutesLabel)}</span><span class="walkthrough-budget-status">${escape(step.budget.status)}</span></div><p>${escape(step.budget.caption)}</p></aside>` : ""}
${step.artifacts ? step.artifacts.map((artifact) => `<details class="walkthrough-artifact"><summary>${escape(artifact.label)}</summary><p class="walkthrough-evidence">${escape(artifact.evidence)}</p><p>${escape(artifact.description)}</p><pre><code>${escape(artifact.content)}</code></pre></details>`).join("\n") : ""}
</section>`).join("\n")}
<div class="walkthrough-navigation"><button type="button" data-walkthrough-previous disabled>${escape(content.previous)}</button><button type="button" data-walkthrough-next disabled>${escape(content.next)}</button></div>
</div>`;
  }).join("\n");
  return `\n<section id="walkthrough" class="section walkthrough" data-walkthrough>${languages}</section>`;
};

const walkthroughScript = `
const walkthrough = document.querySelector('[data-walkthrough]');
if (walkthrough) {
  const walkthroughViews = walkthrough.querySelectorAll('[data-walkthrough-language]');
  const stepCount = walkthroughViews[0].querySelectorAll('[data-walkthrough-panel]').length;
  let selectedStep = 0;
  function selectWalkthroughStep(index) {
    selectedStep = Math.max(0, Math.min(stepCount - 1, index));
    walkthroughViews.forEach(view => {
      const panels = view.querySelectorAll('[data-walkthrough-panel]');
      panels.forEach(panel => { panel.hidden = Number(panel.dataset.walkthroughPanel) !== selectedStep; });
      view.querySelectorAll('[data-walkthrough-select]').forEach(button => {
        button.disabled = false;
        button.setAttribute('aria-pressed', String(Number(button.dataset.walkthroughSelect) === selectedStep));
      });
      view.querySelector('[data-walkthrough-previous]').disabled = selectedStep === 0;
      view.querySelector('[data-walkthrough-next]').disabled = selectedStep === stepCount - 1;
      const position = view.querySelector('[data-walkthrough-position]');
      position.textContent = position.dataset.positionLabel + ' ' + (selectedStep + 1) + ' / ' + stepCount + ' · ' + panels[selectedStep].querySelector('h3').textContent;
    });
  }
  walkthroughViews.forEach(view => {
    view.querySelectorAll('[data-walkthrough-select]').forEach(button => button.addEventListener('click', () => selectWalkthroughStep(Number(button.dataset.walkthroughSelect))));
    view.querySelector('[data-walkthrough-previous]').addEventListener('click', () => selectWalkthroughStep(selectedStep - 1));
    view.querySelector('[data-walkthrough-next]').addEventListener('click', () => selectWalkthroughStep(selectedStep + 1));
  });
  selectWalkthroughStep(0);
}
`;

const script = `
const controls = document.querySelectorAll('[data-select-language]');
const views = document.querySelectorAll('[data-language]');
function selectLanguage(language) {
  views.forEach(view => { view.hidden = view.dataset.language !== language; });
  controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.selectLanguage === language)));
  document.documentElement.lang = language;
}
document.documentElement.classList.add('js');
controls.forEach(button => { button.disabled = false; button.addEventListener('click', () => selectLanguage(button.dataset.selectLanguage)); });
selectLanguage('en');
`;

const pages = source.projects.map((project) => {
  if (!/^[a-z0-9-]+$/.test(project.id)) throw new Error("Invalid project id");
  const sources = project.sources.map((item) => `<li><code>${escape(item.file)}:${escape(item.line)}</code><span class="source-role">${escape(item.role)}</span></li>`).join("\n");
  return {
    id: project.id,
    html: `<!doctype html>
<!-- Generated from content/project-case-studies.json. Edit the content source or generator. -->
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark">
<title>${escape(project.title)} — Engineering introduction</title><meta name="description" content="${escape(project.card.summary)}"><style>${styles}${project.walkthrough ? walkthroughStyles : ""}</style></head>
<body><a class="skip" href="#content">Skip to content / 跳至內容</a>
<header><a class="back" href="${projectsHref}">← Projects / 返回專案</a><a href="${escape(project.id)}.html" download="${escape(project.id)}.html">Download HTML / 下載 HTML</a><div class="languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-select-language="en" aria-pressed="true" disabled>English</button><button type="button" data-select-language="zh-TW" aria-pressed="false" disabled>正體中文</button></div></header>
<main id="content">${renderLanguage(project, "en")}\n${renderLanguage(project, "zh-TW")}${renderWalkthrough(project)}
<details class="section"><summary><strong>Implementation references / 實作參考</strong></summary><p class="notice">Repository: ${escape(project.id)} · Source review: ${escape(source.inspectedOn)} / 原始碼巡查日期</p><ul class="source-list">${sources}</ul></details></main>
<footer>Personal project / 個人專案 · Offline introduction / 可離線保存的介紹 · <a href="${projectsHref}">Back to projects / 返回專案</a><noscript><p>JavaScript is off; both language versions are shown. / JavaScript 關閉時，同時顯示兩種語言。</p></noscript></footer>
<script>${script}${project.walkthrough ? walkthroughScript : ""}</script></body></html>\n`,
  };
});

const output = resolve(root, "app/public/projects");
await mkdir(output, { recursive: true });
for (const page of pages) {
  const destination = resolve(output, `${page.id}.html`);
  const staging = `${destination}.tmp`;
  await writeFile(staging, page.html, "utf8");
  await rename(staging, destination);
  console.log(`Generated projects/${page.id}.html (${Buffer.byteLength(page.html)} bytes)`);
}
