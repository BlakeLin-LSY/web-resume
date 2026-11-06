import { escapeHtml } from "../generators/components/svg-pipeline.mjs";
import { renderCircuitBreakerSvg, renderDualTrackSvg } from "../generators/components/svg-circuit-breaker.mjs";
import { renderIntentContract } from "../generators/components/intent-contract.mjs";
import { renderArchitectureDuel } from "../generators/components/architecture-duel.mjs";
import { renderProofReceipt } from "../generators/components/proof-receipt.mjs";

export function renderSystemProjectsModule({
  profile,
  projects,
  blurbs,
  triads,
  fallbackTriads,
  proofReceipts,
  copy,
  language,
  caseHref,
  renderAbRibbon,
  renderPovBadges,
  notes,
  prefix
}) {
  const e = escapeHtml;
  const isEn = language === "en";

  const featuredCards = profile.entry.projectIds.map(id => {
    const item = projects.get(id);
    const blurb = blurbs.get(id);
    const triad = blurb.triad || triads[id] || fallbackTriads[id];
    const visual = id === "study-atlas" ? renderCircuitBreakerSvg(language) : id === "transcribe-for-x" ? renderDualTrackSvg(language) : "";
    const kicker = e(blurb[language].evidence);
    const badge = id === "study-atlas"
      ? (isEn ? "TALK 1.8 · 6.0 → 4.6 Calculated Budget" : "TALK 契約 1.8 · 6.0 → 4.6 計算預算")
      : (isEn ? "Immutable Storage · User-Approved Diff" : "原始音訊唯讀 · 顯式確認修訂");
    const abRibbon = renderAbRibbon(blurb, language, copy);
    const pov = renderPovBadges(blurb, language, copy);
    const contract = renderIntentContract(blurb.intentContract, language, copy);
    const duel = renderArchitectureDuel(blurb.mirrorDuel, language, copy);
    const receipt = proofReceipts[id] ? renderProofReceipt(proofReceipts[id], language) : "";

    return `<article class="resume-focal-block" data-project-id="${id}">
      <div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item.title)}</h3>
      </div>
      ${abRibbon}
      <div class="resume-stage-box">${visual}</div>
      <div class="resume-triad-grid resume-human-view">
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "GOAL · Invariant Constraint" : "GOAL · 設計約束"}</span>
          <p class="resume-triad-text">${e(triad.challenge[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "ARCHITECTURE · Mechanism" : "ARCHITECTURE · 核心架構"}</span>
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
      <div class="resume-block-actions resume-human-view">
        <a class="resume-work-link" data-resume-case href="${e(caseHref(id, language))}">${e(blurb[language].action)} <span aria-hidden="true">↗</span></a>
        ${id === "study-atlas" ? `<a class="resume-work-link resume-work-link-secondary" data-resume-walkthrough href="${e(caseHref(id, language, true))}">${e(blurb[language].walkthroughAction)} <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>`;
  }).join("");

  const moreProjects = profile.entry.moreProjectIds.map(id =>
    `<a data-resume-case href="${e(caseHref(id, language))}">${e(projects.get(id).title)}</a> — ${e(blurbs.get(id)[language].summary)}`
  ).join(" · ");

  return `<section id="projects" class="resume-section">
    <div class="resume-section-header">
      <div class="resume-section-titles">
        <h2>${e(copy[language].workHeading)}</h2>
        <p class="resume-section-intro">${e(copy[language].focus)}</p>
        <p class="resume-note">${e(copy[language].snapshot)}</p>
      </div>
    </div>
    <div class="resume-focal-stack">${featuredCards}</div>
    <div class="resume-more-work">
      <p><span class="resume-note">${e(copy[language].moreWork)}</span> · ${moreProjects}</p>
      ${notes ? `<p><a data-resume-notes href="${e(prefix)}/engineering-notes.html?lang=${language}">${e(notes.copy[language].entry)} →</a></p>` : ""}
    </div>
  </section>`;
}
