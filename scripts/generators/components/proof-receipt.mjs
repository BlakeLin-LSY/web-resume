import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Proof Receipt & Cryptographic Seal Widget
 * Renders verified seals, invariant assertions, and live gate triggers.
 */
export function renderProofReceipt({ id, sealHash, invariantRule, verificationScope }, language) {
  const e = escapeHtml;
  const isEn = language === "en";

  const sealLabel = isEn ? "Cryptographic Seal (SHA-256)" : "密碼學數位封籤 (SHA-256)";
  const statusLabel = isEn ? "INVARIANT VERIFIED" : "不變量驗證通過";
  const scopeLabel = isEn ? "Verification Scope" : "驗證範疇";

  return `<div class="resume-proof-receipt resume-human-view" data-proof-receipt="${e(id)}">
    <div class="resume-receipt-header">
      <div class="resume-receipt-title-wrap">
        <span class="resume-receipt-icon" aria-hidden="true">🔒</span>
        <span class="resume-receipt-title">${e(sealLabel)}</span>
      </div>
      <span class="resume-receipt-status">
        <span class="resume-receipt-dot" aria-hidden="true"></span>
        ${e(statusLabel)}
      </span>
    </div>
    <div class="resume-receipt-body">
      <div class="resume-receipt-row">
        <span class="resume-receipt-key">HASH:</span>
        <code class="resume-receipt-hash">${e(sealHash)}</code>
      </div>
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
