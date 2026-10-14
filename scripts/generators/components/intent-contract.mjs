import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Intent Contract & Epistemic Boundary Card Generator
 * Renders strict invariants, explicit non-goals, and boundary failure modes.
 */
export function renderIntentContract(contract, language, copy) {
  if (!contract) return "";
  const e = escapeHtml;
  const isEn = language === "en";

  const heading = isEn ? "Intent Contract & Epistemic Boundary" : "意圖契約與認知邊界";
  const badge = isEn ? "Strict Invariant" : "嚴格不變量";
  const invariantTag = isEn ? "INVARIANT" : "不變量保證";
  const nonGoalsTag = isEn ? "NON-GOALS" : "顯式非目標";
  const failureTag = isEn ? "FAILURE BOUNDARY" : "失效臨界與降級";

  const invariantText = contract.strictInvariant ? contract.strictInvariant[language] : "";
  const nonGoals = (contract.nonGoals && contract.nonGoals[language]) || [];
  const failureText = contract.failureConditions ? contract.failureConditions[language] : "";

  return `<details class="resume-intent-contract-card resume-human-view" data-intent-contract>
  <summary class="resume-contract-toggle">
    <span class="resume-contract-icon" aria-hidden="true">📜</span>
    <span class="resume-contract-title">${e(heading)}</span>
    <span class="resume-contract-badge">${e(badge)}</span>
  </summary>
  <div class="resume-contract-body">
    <div class="resume-contract-row resume-contract-invariant">
      <span class="resume-contract-tag">${e(invariantTag)}</span>
      <p class="resume-contract-desc">${e(invariantText)}</p>
    </div>
    ${nonGoals.length > 0 ? `<div class="resume-contract-row resume-contract-nongoals">
      <span class="resume-contract-tag">${e(nonGoalsTag)}</span>
      <ul class="resume-contract-list">
        ${nonGoals.map(item => `<li>${e(item)}</li>`).join("")}
      </ul>
    </div>` : ""}
    ${failureText ? `<div class="resume-contract-row resume-contract-failure">
      <span class="resume-contract-tag">${e(failureTag)}</span>
      <p class="resume-contract-desc">${e(failureText)}</p>
    </div>` : ""}
  </div>
</details>`;
}
