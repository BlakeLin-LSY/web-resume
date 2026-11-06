import { escapeHtml } from "../generators/components/svg-pipeline.mjs";
import { renderPipelineSvg } from "../generators/components/svg-pipeline.mjs";
import { renderTopologySvg } from "../generators/components/svg-topology.mjs";
import { renderIntentContract } from "../generators/components/intent-contract.mjs";
import { renderArchitectureDuel } from "../generators/components/architecture-duel.mjs";
import { renderProofReceipt } from "../generators/components/proof-receipt.mjs";

export function renderFlagshipProofModule({
  profile,
  career,
  triads,
  fallbackTriads,
  proofReceipts,
  copy,
  language,
  metric,
  period,
  renderAbRibbon,
  renderPovBadges
}) {
  const e = escapeHtml;
  const isEn = language === "en";

  const lensSelector = `<div class="resume-lens-selector" role="group" aria-label="${e(copy[language].lensLabel)}">
    <button type="button" data-resume-lens="all" aria-pressed="true" title="${e(copy[language].lensAll)}">${isEn ? "All" : "全視角"}</button>
    <button type="button" data-resume-lens="staff" aria-pressed="false" title="${e(copy[language].lensStaff)} — ${e(copy[language].lensStaffDesc)}">${e(copy[language].lensStaffShort)}</button>
    <button type="button" data-resume-lens="em" aria-pressed="false" title="${e(copy[language].lensEm)} — ${e(copy[language].lensEmDesc)}">${e(copy[language].lensEmShort)}</button>
    <button type="button" data-resume-lens="recruiter" aria-pressed="false" title="${e(copy[language].lensRecruiter)} — ${e(copy[language].lensRecruiterDesc)}">${e(copy[language].lensRecruiterShort)}</button>
  </div>`;

  const proofCards = profile.entry.proofIds.map(id => {
    const item = career.get(id);
    const triad = item.triad || triads[id] || fallbackTriads[id];
    const visual = id === "dynasafe" ? renderPipelineSvg(language) : id === "metgauge" ? renderTopologySvg(language) : "";
    const kicker = `${e(item.employer)} · ${e(item.title)} · ${e(period(item.start, item.end, language))}`;
    const badge = e(metric(item, language));
    const abRibbon = renderAbRibbon(item, language, copy);
    const pov = renderPovBadges(item, language, copy);
    const contract = renderIntentContract(item.intentContract, language, copy);
    const duel = renderArchitectureDuel(item.mirrorDuel, language, copy);
    const receipt = proofReceipts[id] ? renderProofReceipt(proofReceipts[id], language) : "";

    return `<article class="resume-focal-block" data-proof-id="${id}">
      <div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item[language].proofTitle)}</h3>
      </div>
      ${abRibbon}
      <div class="resume-stage-box">${visual}</div>
      <div class="resume-triad-grid resume-human-view">
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "BOTTLENECK · Root Cause" : "BOTTLENECK · 核心瓶頸"}</span>
          <p class="resume-triad-text">${e(triad.challenge[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "ARCHITECTURE · Mechanism" : "ARCHITECTURE · 實作機制"}</span>
          <p class="resume-triad-text">${e(triad.solution[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "VERIFIED BOUNDARY · Scope" : "VERIFIED BOUNDARY · 驗證邊界"}</span>
          <p class="resume-triad-text">${e(triad.boundary[language])}</p>
        </div>
      </div>
      ${pov}
      ${contract}
      ${duel}
      ${receipt}
    </article>`;
  }).join("");

  return `<section id="professional-proof" class="resume-section resume-proof-section">
    <div class="resume-section-header">
      <div class="resume-section-titles">
        <h2>${e(copy[language].proofHeading)}</h2>
        <p class="resume-section-intro">${e(copy[language].proofIntro)}</p>
      </div>
      <div class="resume-lens-wrap">${lensSelector}</div>
    </div>
    <div class="resume-focal-stack">${proofCards}</div>
    <a class="resume-small-link" href="#experience">${e(copy[language].careerLink)} <span aria-hidden="true">↓</span></a>
  </section>`;
}
