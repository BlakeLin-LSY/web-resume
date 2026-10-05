import { createHash } from 'node:crypto';
import { escapeHtml as e } from './resume-markup.mjs';

export const previewStyles = `
.reader-preview{border-top:3px solid var(--blue)}.reader-preview>p{max-width:70ch}.reader-card{padding:18px 0;border-top:1px solid var(--border)}.reader-card h3{font-size:1.1rem;line-height:1.5;max-width:65ch}.reader-card summary{cursor:pointer;color:var(--blue);padding:8px 0;min-height:44px}.reader-card .reader-kind{font-size:.78rem;color:var(--blue);margin:0 0 8px}.reader-card .reader-takeaway{color:var(--text);max-width:70ch}.reader-provenance{margin:16px 0;font-size:.85rem;overflow-wrap:anywhere}.reader-provenance summary{cursor:pointer;padding:8px 0}.reader-card details p{max-width:70ch}.reader-card{break-inside:avoid}@media print{.reader-preview{break-inside:auto}.reader-card details::details-content,.reader-provenance::details-content{content-visibility:visible!important;height:auto!important}}
`;

export function renderReaderExcerpt(project, language) {
  const excerpt = project.readerExcerpt;
  if (!excerpt) return '';
  if (!/^[a-f0-9]{64}$/.test(excerpt.originalSha256) || excerpt.cards?.length !== 2) throw new Error('Invalid reader excerpt provenance');
  if (excerpt.paperUrl !== 'https://arxiv.org/abs/2503.11651') throw new Error('Unexpected excerpt paper source');
  const copy = excerpt[language];
  for (const key of ['heading','intro','evidenceLabel','inferenceLabel','detailLabel','provenanceLabel','provenance','paperLabel','walkthroughLabel']) {
    if (typeof copy?.[key] !== 'string' || !copy[key].trim()) throw new Error(`Missing reader excerpt copy: ${language}/${key}`);
  }
  const digest = createHash('sha256').update(JSON.stringify(excerpt.cards)).digest('hex');
  const cards = excerpt.cards.map((card, index) => {
    const text = card[language];
    for (const key of ['title','body','takeaway']) if (typeof text?.[key] !== 'string' || !text[key].trim()) throw new Error(`Missing reader card: ${language}/${key}`);
    return `<article class="reader-card" data-reader-card="${e(card.sourceCardId)}"><p class="reader-kind">${e(index === 0 ? copy.evidenceLabel : copy.inferenceLabel)}</p><h3>${e(text.title)}</h3><p class="reader-takeaway">${e(text.takeaway)}</p><details><summary>${e(copy.detailLabel)}</summary><p>${e(text.body)}</p></details></article>`;
  }).join('');
  return `<section class="section reader-preview" data-reader-excerpt><h2>${e(copy.heading)}</h2><p>${e(copy.intro)}</p>${cards}<details class="reader-provenance"><summary>${e(copy.provenanceLabel)}</summary><p>${e(copy.provenance)}</p><p>${e(excerpt.historicalDate)} · ${e(excerpt.originalFile)} · ${excerpt.originalBytes} bytes</p><p>Original SHA-256: <code>${e(excerpt.originalSha256)}</code></p><p>Excerpt cards JSON SHA-256: <code>${digest}</code></p><a href="${e(excerpt.paperUrl)}" target="_blank" rel="noopener noreferrer">${e(copy.paperLabel)}</a></details><a href="#walkthrough">${e(copy.walkthroughLabel)} ↓</a></section>`;
}

export const workflowStyles = `
.workflow-preview{border-top:3px solid var(--blue)}.workflow-preview>p{max-width:70ch}.workflow-columns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:24px}.workflow-step{padding:18px;background:var(--bg);border:1px solid var(--border);border-radius:8px;min-width:0}.workflow-step h3{font-size:.9rem;color:var(--blue)}.workflow-step blockquote{margin:0;overflow-wrap:anywhere}.workflow-choice{display:flex;align-items:center;gap:10px;min-height:44px;margin-top:18px;cursor:pointer}.workflow-choice input{width:20px;height:20px;accent-color:var(--blue)}.workflow-output{display:block;min-height:3.5em;overflow-wrap:anywhere}.workflow-note{font-size:.85rem}@media(max-width:700px){.workflow-columns{grid-template-columns:1fr}}@media print{.workflow-choice{display:none}.workflow-columns{display:block}.workflow-step{margin:8px 0;break-inside:avoid}}
`;
export function renderWorkflowPreview(project, language) {
  const preview = project.workflowPreview;
  if (!preview) return '';
  if (preview.kind !== 'illustrative') throw new Error('Workflow example must disclose illustrative status');
  const c = preview[language];
  for (const key of ['heading','caption','sourceLabel','sourceText','rawLabel','raw','removal','accept','outputLabel','expected','noJs','note']) if (typeof c?.[key] !== 'string' || !c[key].trim()) throw new Error(`Missing workflow copy ${language}/${key}`);
  if (!c.raw.startsWith(c.removal) || c.raw.slice(c.removal.length) !== c.expected) throw new Error('Illustration must remove only the specified prefix');
  return `<section class="section workflow-preview" data-workflow-preview data-removal-length="${c.removal.length}"><h2>${e(c.heading)}</h2><p>${e(c.caption)}</p><div class="workflow-columns"><div class="workflow-step"><h3>${e(c.sourceLabel)}</h3><p>${e(c.sourceText)}</p></div><div class="workflow-step"><h3>${e(c.rawLabel)}</h3><blockquote data-workflow-raw>${e(c.raw)}</blockquote></div><div class="workflow-step"><h3>${e(c.outputLabel)}</h3><output class="workflow-output" data-workflow-output aria-live="polite">${e(c.raw)}</output></div></div><label class="workflow-choice"><input type="checkbox" data-workflow-accept disabled>${e(c.accept)}</label><p class="workflow-note">${e(c.note)}</p><noscript><style>.workflow-choice{display:none}</style><p>${e(c.noJs)} ${e(c.expected)}</p></noscript></section>`;
}
export const workflowScript = `
const workflowViews = document.querySelectorAll('[data-workflow-preview]');
workflowViews.forEach(view => {
  const control = view.querySelector('[data-workflow-accept]'); control.disabled = false;
  control.addEventListener('change', () => {
    workflowViews.forEach(item => {
      const raw = item.querySelector('[data-workflow-raw]').textContent;
      item.querySelector('[data-workflow-accept]').checked = control.checked;
      item.querySelector('[data-workflow-output]').textContent = control.checked ? raw.slice(Number(item.dataset.removalLength)) : raw;
    });
  });
});
`;
