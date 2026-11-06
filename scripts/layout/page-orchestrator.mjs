import { escapeHtml } from "../generators/components/svg-pipeline.mjs";
import { renderHeroModule } from "../modules/hero.mjs";
import { renderInvariantsAnchorModule } from "../modules/invariants-anchor.mjs";
import { renderFlagshipProofModule } from "../modules/flagship-proof.mjs";
import { renderSystemProjectsModule } from "../modules/system-projects.mjs";
import { renderCareerTimelineModule } from "../modules/career-timeline.mjs";
import { renderSkillsAboutModule } from "../modules/skills-about.mjs";
import { renderContactFooterModule } from "../modules/contact-footer.mjs";

export { escapeHtml };

const languages = ["en", "zh-TW"];
export const localize = (render, tag = "div", attributes = "") => languages.map(language =>
  `<${tag} lang="${language}" data-resume-locale="${language}" ${attributes}>${render(language)}</${tag}>`
).join("");

export const period = (start, end, language) => {
  const date = (value) => {
    if (value === "ongoing") return language === "en" ? "Ongoing" : "持續中";
    if (value.length === 4) return value;
    return new Intl.DateTimeFormat(language === "en" ? "en" : "zh-TW", { year: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`));
  };
  return `${date(start)} – ${date(end)}`;
};

export const fallbackTriads = {
  dynasafe: {
    challenge: {
      en: "Diagnosed a data-format loader bottleneck in a PhysicsNeMo training demo.",
      "zh-TW": "定位 PhysicsNeMo 訓練範例中的資料格式載入瓶頸。"
    },
    solution: {
      en: "Specified pipeline optimization specs, designed asynchronous ingestion, and directed the loader refactoring.",
      "zh-TW": "確立管線最佳化規範、設計非同步資料載入架構，並主導資料載入器管線重構。"
    },
    boundary: {
      en: "Focused on data-ingestion profiling, I/O bottleneck resolution, and multi-threaded dataloader pipeline refactoring.",
      "zh-TW": "專注於資料載入效能分析、I/O 瓶頸消除與多執行緒資料載入管線重構。"
    }
  },
  metgauge: {
    challenge: {
      en: "Scaling 3D optical metrology to high mounting heights with large FOV image stitching across 12 stereo pairs.",
      "zh-TW": "將 3D 光學計量擴展至高安裝高度與大視野（FOV）影像拼接，涵蓋 12 組立體相機。"
    },
    solution: {
      en: "Engineered multi-camera stereo calibration algorithms, large FOV image stitching, and guided MVP prototyping to live production line testing.",
      "zh-TW": "主導多相機立體標定校正演算法與大視野影像拼接管線，將量測原型（MVP）推進至產線實機測試。"
    },
    boundary: {
      en: "Focused on camera calibration, stereo algorithm design, high-height FOV stitching, and factory pre-launch testing.",
      "zh-TW": "專注於相機標定校正、立體視覺演算法設計、高空大視野拼接與工廠上市前測試。"
    }
  },
  "study-atlas": {
    challenge: {
      en: "Preventing unbounded token spend while preserving complete citation provenance.",
      "zh-TW": "在完整保留引證來源的前提下，防止多 Agent 研究綜述 Token 超支。"
    },
    solution: {
      en: "Enforced pre-dispatch TALK 1.8 circuit breaker and structured claim-source attribution.",
      "zh-TW": "實施派發前 TALK 1.8 預算斷路機制，並嚴格結構化主張與出處溯源歸屬。"
    },
    boundary: {
      en: "Applied static graph-budget evaluation before multi-agent execution, verifying ETH3D synthesis outputs.",
      "zh-TW": "在多 Agent 執行前落實靜態圖預算評估，並完成 ETH3D 綜述成果驗證。"
    }
  },
  "transcribe-for-x": {
    challenge: {
      en: "Building a user-controlled on-device transcription pipeline without vendor lock-in.",
      "zh-TW": "打造使用者可自主控制的裝置端語音轉文字管線，避免受特定廠商綁定。"
    },
    solution: {
      en: "Engineered Scoped Storage isolation, immutable raw audio storage, and granular diff review.",
      "zh-TW": "實作 Scoped Storage 隔離沙盒、原始音訊唯讀保存機制與細粒度差分審閱流程。"
    },
    boundary: {
      en: "Enforced strict local data sovereignty: external AI suggestions cannot overwrite original transcripts.",
      "zh-TW": "嚴格貫徹在地資料主權：外部 AI 推論建議絕不覆寫使用者原始逐字稿。"
    }
  }
};

export const proofReceipts = {
  metgauge: {
    id: "metgauge",
    sealHash: "a794b1c38e920d41e7f654a9382170c4b281f692305a4176d8e20984f9321c8b",
    invariantRule: {
      en: "Stereo 3D measurement geometry across large FOV stitched frames mathematically consistent with physical calibration",
      "zh-TW": "大視野拼接影像之立體 3D 量測幾何與實體標定靶標維持嚴格數學一致性"
    },
    verificationScope: {
      en: "Industrial Automation Line · Multi-Camera Calibration & Large FOV Stitching",
      "zh-TW": "工業自動化產線 · 多相機標定與大視野影像拼接"
    }
  },
  "study-atlas": {
    id: "study-atlas",
    sealHash: "0f5e66c74dbd8762f2a90936d238fc72d9939db6396d68d49703645834eeb0d5",
    invariantRule: {
      en: "TALK budget <= 5.0 (Calculated budget circuit breaker triggered, 6.0 blocked, 4.6 executed)",
      "zh-TW": "TALK 預算 <= 5.0（觸發計算預算熔斷，超標 6.0 阻斷，重導向 4.6 執行）"
    },
    verificationScope: {
      en: "Multi-Agent Synthesis · VGGT Monograph Proof Leaf Seal",
      "zh-TW": "多 Agent 綜述生成 · VGGT 專論數學引證數位封籤"
    }
  },
};

export function renderPovBadges(item, language, copy) {
  if (!item || !item.povHighlights) return "";
  const isEn = language === "en";
  const e = escapeHtml;
  const povs = item.povHighlights;

  const roles = [
    {
      id: "staff",
      pill: isEn ? "ARCHITECT PERSPECTIVE" : "系統架構師視角",
      title: isEn ? "Low-Level Primitives & Critical Invariants" : "底層工程拓撲與嚴格不變量"
    },
    {
      id: "em",
      pill: isEn ? "ENG LEAD PERSPECTIVE" : "工程主管視角",
      title: isEn ? "Delivery Velocity & Production Resilience" : "交付吞吐量與生產可靠度"
    },
    {
      id: "recruiter",
      pill: isEn ? "CTO / FOUNDER PERSPECTIVE" : "CTO / 創辦人視角",
      title: isEn ? "Scope, ROI & Technical Moat" : "資本效益與技術護城河"
    }
  ];

  return `<div class="resume-pov-stack resume-human-view">
    ${roles.map(r => {
      const data = povs[r.id];
      if (!data) return "";
      const text = data[language] || data.en || "";
      const q = data.coreQuestion ? (data.coreQuestion[language] || data.coreQuestion.en) : "";
      const b = data.breakthrough ? (data.breakthrough[language] || data.breakthrough.en) : "";
      const m = data.verifiedMoat ? (data.verifiedMoat[language] || data.verifiedMoat.en) : "";

      return `<div class="resume-pov-badge resume-pov-card" data-pov="${r.id}">
        <div class="resume-pov-card-header">
          <span class="resume-pov-pill">${e(r.pill)}</span>
          <span class="resume-pov-role-title">${e(r.title)}</span>
        </div>
        ${q ? `<div class="resume-pov-grid">
          <div class="resume-pov-col resume-pov-probe">
            <span class="resume-pov-section-label">${e(copy[language].lensCoreQuestion || (isEn ? "Core Probe" : "審查核心叩問"))}</span>
            <p class="resume-pov-desc">${e(q)}</p>
          </div>
          <div class="resume-pov-col resume-pov-solution">
            <span class="resume-pov-section-label">${e(copy[language].lensBreakthrough || (isEn ? "Engineering Breakthrough" : "攻堅突破機制"))}</span>
            <p class="resume-pov-desc">${e(b)}</p>
          </div>
          <div class="resume-pov-col resume-pov-moat">
            <span class="resume-pov-section-label">${e(copy[language].lensVerifiedMoat || (isEn ? "Verified Moat" : "量化驗證壁壘"))}</span>
            <p class="resume-pov-desc">${e(m)}</p>
          </div>
        </div>` : `<p class="resume-pov-text">${e(text)}</p>`}
      </div>`;
    }).join("")}
  </div>`;
}

export function renderAbRibbon(item, language, copy) {
  if (!item || !item.abTransformation) return "";
  const e = escapeHtml;
  const isEn = language === "en";
  const ab = item.abTransformation;
  const labelA = copy[language].ribbonLabelA || (isEn ? "A: PROBLEM" : "A: 問題定義");
  const labelLink = copy[language].ribbonLabelLink || (isEn ? "X: CRITICAL LINK" : "X: 關鍵弱鏈");
  const labelB = copy[language].ribbonLabelB || (isEn ? "B: VALUE" : "B: 確定價值");

  return `<div class="resume-ab-ribbon resume-human-view">
    <div class="resume-ab-seg resume-ab-a">
      <span class="resume-ab-badge">${e(labelA)}</span>
      <span class="resume-ab-text">${e(ab.aInput[language] || ab.aInput.en)}</span>
    </div>
    <span class="resume-ab-sep" aria-hidden="true">➔</span>
    <div class="resume-ab-seg resume-ab-link">
      <span class="resume-ab-badge">${e(labelLink)}</span>
      <span class="resume-ab-text">${e(ab.weakestLink[language] || ab.weakestLink.en)}</span>
    </div>
    <span class="resume-ab-sep" aria-hidden="true">➔</span>
    <div class="resume-ab-seg resume-ab-b">
      <span class="resume-ab-badge">${e(labelB)}</span>
      <span class="resume-ab-text">${e(ab.bOutput[language] || ab.bOutput.en)}</span>
    </div>
  </div>`;
}

export function orchestrateResumePage({
  profile,
  cases,
  assets,
  prefix = ".",
  notes,
  manifest
}) {
  const e = escapeHtml;
  const copy = profile.copy;
  const career = new Map(profile.professional.map(item => [item.id, item]));
  const projects = new Map(cases.projects.map(item => [item.id, item]));
  const blurbs = new Map(profile.projects.map(item => [item.id, item]));
  const triads = profile.triads || fallbackTriads;

  const cvHref = language => `${prefix}/resume/${assets.locales[language].file}`;
  const caseHref = (id, language, walkthrough = false) => `${prefix}/projects/${id}.html?lang=${language}${walkthrough ? "#walkthrough" : ""}`;
  const cvAction = language => `<a class="resume-button" href="${e(cvHref(language))}" data-resume-cv download><span data-cv-download-label>${e(copy[language].cv)}</span><span data-cv-open-label>${e(copy[language].cvOpen)}</span></a>`;
  const nav = Object.keys(copy.en.nav).map(id => `<a href="#${id}">${localize(language => e(copy[language].nav[id]), "span")}</a>`).join("");
  const metric = (item, language) => item.metric ? item.metric[language].replaceAll("{value}", String(item.metric.value)) : item[language].result;
  const summary = (item, language) => item[language].summary.replaceAll("{cameraPairs}", String(item.system?.cameraPairs));

  // Determine active modules from manifest or default sequence
  const moduleMap = {
    hero: (lang) => renderHeroModule({ profile, copy, cvAction, localize, language: lang }),
    "invariants-anchor": (lang) => renderInvariantsAnchorModule({ language: lang }),
    "flagship-proof": (lang) => renderFlagshipProofModule({
      profile,
      career,
      triads,
      fallbackTriads,
      proofReceipts,
      copy,
      language: lang,
      metric,
      period,
      renderAbRibbon,
      renderPovBadges
    }),
    "system-projects": (lang) => renderSystemProjectsModule({
      profile,
      projects,
      blurbs,
      triads,
      fallbackTriads,
      proofReceipts,
      copy,
      language: lang,
      caseHref,
      renderAbRibbon,
      renderPovBadges,
      notes,
      prefix
    }),
    "career-timeline": (lang) => renderCareerTimelineModule({
      profile,
      copy,
      language: lang,
      metric,
      summary,
      period,
      localize
    }),
    "skills-about": (lang) => renderSkillsAboutModule({
      profile,
      copy,
      language: lang,
      period,
      prefix,
      localize
    }),
    "contact-footer": (lang) => renderContactFooterModule({
      profile,
      copy,
      language: lang,
      prefix,
      cvAction,
      cvHref,
      notes,
      localize
    })
  };

  const enabledModuleIds = manifest?.modules
    ? manifest.modules.filter(m => m.enabled !== false && m.id !== "impact-rail").sort((a, b) => (a.order || 0) - (b.order || 0)).map(m => m.id)
    : ["hero", "invariants-anchor", "flagship-proof", "system-projects", "career-timeline", "skills-about", "contact-footer"];

  const renderModuleContent = (moduleId) => {
    const fn = moduleMap[moduleId];
    if (!fn) return "";
    return localize(language => fn(language));
  };

  const renderedModules = enabledModuleIds.map(id => renderModuleContent(id)).join("\n");

  return `<a class="resume-skip" href="#content">${localize(language => e(copy[language].skip), "span")}</a>
<header class="resume-header"><div class="resume-header-inner"><a class="resume-logo" href="#top">${e(profile.identity.shortName)}</a>
<nav id="resume-navigation" class="resume-navigation" aria-label="Main navigation / 主要導覽">${nav}</nav>
<div class="resume-reading-controls" data-js-control><div class="resume-languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-resume-language="en" aria-pressed="true" disabled>EN</button><button type="button" data-resume-language="zh-TW" aria-pressed="false" disabled>繁體</button></div><button type="button" data-resume-theme aria-label="Switch to dark theme" disabled><span aria-hidden="true">◐</span></button><button type="button" class="resume-menu" data-resume-menu aria-label="Menu" aria-expanded="false" aria-controls="resume-navigation" disabled><span aria-hidden="true">☰</span></button></div></div></header>
<main id="content" class="resume-main" tabindex="-1">
${renderedModules}
</main>`;
}
