import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Architecture Trade-offs & Review Generator
 * Renders professional technical review exchanges between design challenge and architecture decision.
 */
export function renderArchitectureDuel(duelList, language, copy) {
  if (!Array.isArray(duelList) || duelList.length === 0) return "";
  const e = escapeHtml;
  const isEn = language === "en";

  const toggleLabel = copy?.duelHeading || (isEn ? "Architecture Trade-offs & Review" : "架構取捨與設計審查");
  const countLabel = isEn ? `${duelList.length} Technical Decisions` : `${duelList.length} 項核心決策`;
  const challengerRole = copy?.duelChallenger || (isEn ? "Design Challenge & Context" : "設計挑戰與考量");
  const defenseRole = copy?.duelDefense || (isEn ? "Architecture Decision & Trade-off" : "架構決策與權衡");

  const exchanges = duelList.map(item => {
    const q = item.challenger[language] || item.challenger.en;
    const a = item.defense[language] || item.defense.en;
    return `<div class="resume-duel-exchange">
      <div class="resume-duel-bubble resume-duel-challenger">
        <div class="resume-duel-role">
          <span class="resume-duel-name">${e(challengerRole)}</span>
        </div>
        <p class="resume-duel-text">${e(q)}</p>
      </div>
      <div class="resume-duel-bubble resume-duel-defense">
        <div class="resume-duel-role">
          <span class="resume-duel-name">${e(defenseRole)}</span>
        </div>
        <p class="resume-duel-text">${e(a)}</p>
      </div>
    </div>`;
  }).join("");

  return `<details class="resume-duel-drawer resume-human-view" data-architecture-duel>
  <summary class="resume-duel-summary">
    <span class="resume-duel-summary-content">
      <span class="resume-duel-label">${e(toggleLabel)}</span>
      <span class="resume-duel-pill">${e(countLabel)}</span>
    </span>
  </summary>
  <div class="resume-duel-arena">
    ${exchanges}
  </div>
</details>`;
}
