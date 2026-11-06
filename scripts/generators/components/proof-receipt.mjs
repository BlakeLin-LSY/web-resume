import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Proof Receipt & Invariant Verification Widget
 * Renders verified seals, invariant assertions, and gate status.
 */
export function renderProofReceipt({ id, sealHash, invariantRule, verificationScope }, language) {
  const e = escapeHtml;
  const isEn = language === "en";

  const sealLabel = isEn ? "CI Invariant Gate Verification" : "CI 不變量閘門驗證";
  const statusLabel = isEn ? "GATE PASSED" : "閘門驗證通過";
  const scopeLabel = isEn ? "Verification Target" : "驗證標的";

  return `<div class="resume-proof-receipt resume-human-view" data-proof-receipt="${e(id)}" data-seal-hash="${e(sealHash)}">
    <div class="resume-receipt-header">
      <div class="resume-receipt-title-wrap">
        <span class="resume-receipt-title">${e(sealLabel)}</span>
      </div>
      <span class="resume-receipt-status">
        <span class="resume-receipt-dot" aria-hidden="true"></span>
        ${e(statusLabel)}
      </span>
    </div>
    <div class="resume-receipt-body">
      <div class="resume-receipt-row">
        <span class="resume-receipt-key">${e(scopeLabel)}:</span>
        <span class="resume-receipt-val">${e(verificationScope[language] || verificationScope.en)}</span>
      </div>
      <div class="resume-receipt-row">
        <span class="resume-receipt-key">RULE:</span>
        <span class="resume-receipt-invariant">${e(invariantRule[language] || invariantRule.en)}</span>
      </div>
    </div>
  </div>`;
}
