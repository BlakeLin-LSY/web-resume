import { escapeHtml } from "../generators/components/svg-pipeline.mjs";

export function renderHeroModule({ profile, copy, cvAction, localize, language }) {
  const e = escapeHtml;
  const isEn = language === "en";

  return `<section class="resume-hero" id="top">
    <div class="resume-hero-grid">
      <div class="resume-hero-left">
        <p class="resume-role">${e(profile.identity.role)}</p>
        <h1 class="resume-hero-title">${e(profile.identity.shortName)} <span class="resume-hero-cname">${isEn ? "林思遠" : "Blake Lin"}</span></h1>
        <p class="resume-lead">${e(copy[language].lead)}</p>
        <p class="resume-note">${e(copy[language].context)}</p>
        <div class="resume-actions">
          ${cvAction(language)}
          <a class="resume-button resume-button-secondary" href="#professional-proof">${isEn ? "Explore Work" : "查看工程實績"}</a>
        </div>
      </div>
      <div class="resume-hero-right resume-impact-rail" aria-label="${isEn ? "Selected work" : "代表成果"}">
        <div class="resume-rail-header">
          <span class="resume-rail-kicker">${isEn ? "SELECTED WORK" : "代表成果"}</span>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">GPU idle</span>
          <span class="resume-rail-title">${isEn ? "ML Training Bottleneck" : "ML 訓練瓶頸診斷"}</span>
          <p class="resume-rail-desc">${isEn ? "Traced GPU idle time to the data-format loader and directed a Claude-assisted rewrite; training time dropped (DynaSafe)." : "把 GPU 閒置追到資料格式載入器，主導 Claude 協助的改寫，訓練耗時下降 (DynaSafe)。"}</p>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">C# AOI</span>
          <span class="resume-rail-title">${isEn ? "Production-Line Inspection" : "產線光學檢測"}</span>
          <p class="resume-rail-desc">${isEn ? "Automated optical inspection algorithms for manufacturing-line quality checks (UTECHZONE)." : "製造產線品質檢查的自動光學檢測演算法 (UTECHZONE)。"}</p>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">12 pairs</span>
          <span class="resume-rail-title">${isEn ? "Stereo 3D Metrology" : "大視野立體 3D 量測"}</span>
          <p class="resume-rail-desc">${isEn ? "Team-built 12-stereo-pair 3D measurement line, advanced from MVP to factory-ready testing (MetGauge); RealSense metrology (LIPS)." : "團隊開發的 12 組立體相機 3D 量測產線，從 MVP 推進至工廠就緒測試 (MetGauge)；RealSense 量測 (LIPS)。"}</p>
        </div>
      </div>
    </div>
  </section>`;
}
