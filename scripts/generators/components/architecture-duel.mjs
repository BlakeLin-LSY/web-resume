import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Architecture Duel (Grill This Architecture) Generator
 * Renders adversarial review exchanges between challenger and first-principles defense.
 */
export function renderArchitectureDuel(duelList, language, copy) {
  if (!Array.isArray(duelList) || duelList.length === 0) return "";
  const e = escapeHtml;
  const isEn = language === "en";

  const toggleLabel = isEn ? "⚔️ Grill This Architecture" : "⚔️ 審查架構取捨（對抗答辯）";
  const countLabel = isEn ? `${duelList.length} Probes` : `${duelList.length} 項深度質疑`;
  const challengerRole = isEn ? "Staff Reviewer" : "架構審查者";
  const defenseRole = isEn ? "Blake (First-Principles)" : "Blake（第一性原理辯護）";

  const exchanges = duelList.map(item => {
    const q = item.challenger[language] || item.challenger.en;
    const a = item.defense[language] || item.defense.en;
    return `<div class="resume-duel-exchange">
      <div class="resume-duel-bubble resume-duel-challenger">
        <div class="resume-duel-role">
          <span class="resume-duel-avatar" aria-hidden="true">🧐</span>
          <span class="resume-duel-name">${e(challengerRole)}</span>
        </div>
        <p class="resume-duel-text">${e(q)}</p>
      </div>
      <div class="resume-duel-bubble resume-duel-defense">
        <div class="resume-duel-role">
          <span class="resume-duel-avatar" aria-hidden="true">🛡️</span>
          <span class="resume-duel-name">${e(defenseRole)}</span>
          <span class="resume-duel-tag">First-Principles</span>
        </div>
        <p class="resume-duel-text">${e(a)}</p>
      </div>
    </div>`;
  }).join("");

  return `<details class="resume-duel-drawer resume-human-view" data-architecture-duel>
  <summary class="resume-duel-summary">
    <span class="resume-duel-summary-content">
      <span class="resume-duel-icon" aria-hidden="true">⚔️</span>
      <span class="resume-duel-label">${e(toggleLabel)}</span>
      <span class="resume-duel-pill">${e(countLabel)}</span>
    </span>
  </summary>
  <div class="resume-duel-arena">
    ${exchanges}
  </div>
</details>`;
}
