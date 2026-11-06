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
      <div class="resume-hero-right resume-impact-rail" aria-label="${isEn ? "Verified Impact Metrics" : "核心量化指標"}">
        <div class="resume-rail-header">
          <span class="resume-rail-kicker">${isEn ? "VERIFIED IMPACT" : "工程量化實績"}</span>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">~10×</span>
          <span class="resume-rail-title">${isEn ? "ML Training Acceleration" : "ML 訓練管線加速"}</span>
          <p class="resume-rail-desc">${isEn ? "Dataloader I/O profiling and asynchronous prefetching to unblock GPU compute without hardware expansion (DynaSafe)." : "分析 DataLoader I/O 瓶頸並導入非同步預取，在既有硬體上釋放 GPU 算力 (DynaSafe)。"}</p>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">-40%</span>
          <span class="resume-rail-title">${isEn ? "AOI Cycle-Time Reduction" : "產線 AOI 檢測週期縮短"}</span>
          <p class="resume-rail-desc">${isEn ? "Production-line automated optical inspection algorithm redesign and workflow optimization (UTECHZONE)." : "重構產線自動光學檢測（AOI）演算法與工作流程，單件檢測耗時降低 40% (UTECHZONE)。"}</p>
        </div>
        <div class="resume-rail-card">
          <span class="resume-rail-num">Large FOV</span>
          <span class="resume-rail-title">${isEn ? "Stereo 3D Metrology" : "大視野立體 3D 量測"}</span>
          <p class="resume-rail-desc">${isEn ? "Multi-camera stereo calibration, high-height image stitching, and production-line metrology prototyping (MetGauge / LIPS)." : "多相機立體校正、高空大視野影像拼接與產線量測原型研發 (MetGauge / LIPS)。"}</p>
        </div>
      </div>
    </div>
  </section>`;
}
