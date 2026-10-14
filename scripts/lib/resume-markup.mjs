// Shared by the Next server page and the portable overview generator.
// Public text and hrefs are escaped here; no filesystem or browser dependency.
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

const languages = ["en", "zh-TW"];
const localize = (render, tag = "div", attributes = "") => languages.map(language =>
  `<${tag} lang="${language}" data-resume-locale="${language}" ${attributes}>${render(language)}</${tag}>`
).join("");

const period = (start, end, language) => {
  const date = (value) => {
    if (value === "ongoing") return language === "en" ? "Ongoing" : "持續中";
    if (value.length === 4) return value;
    return new Intl.DateTimeFormat(language === "en" ? "en" : "zh-TW", { year: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`));
  };
  return `${date(start)} – ${date(end)}`;
};

function dynaSafeVisual(e, language) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <span class="resume-diagram-tag">Visual Performance Benchmark / 效能分析</span>
      <strong>${isEn ? "DataLoader I/O Bottleneck vs Async Shared-Memory Ring Buffer" : "資料載入 I/O 阻塞瓶頸 vs 非同步共享記憶體環形緩衝區"}</strong>
    </div>
    <div class="resume-benchmark-bars">
      <div class="resume-bar-row">
        <span class="resume-bar-label">${isEn ? "Baseline (Sync I/O)" : "優化前（同步 I/O）"}</span>
        <div class="resume-bar-track">
          <div class="resume-bar-segment resume-bar-wait" style="width: 88%"><span>88% I/O Wait</span></div>
          <div class="resume-bar-segment resume-bar-compute" style="width: 12%"><span>12% GPU</span></div>
        </div>
        <span class="resume-bar-val">11.2 img/s (1×)</span>
      </div>
      <div class="resume-bar-row">
        <span class="resume-bar-label">${isEn ? "Rebuilt (Async Ring Buffer)" : "重建後（非同步環形緩衝）"}</span>
        <div class="resume-bar-track">
          <div class="resume-bar-segment resume-bar-wait" style="width: 4%"></div>
          <div class="resume-bar-segment resume-bar-compute resume-bar-boost" style="width: 96%"><span>96% GPU Saturation</span></div>
        </div>
        <span class="resume-bar-val resume-val-boost">118.4 img/s (10×)</span>
      </div>
    </div>
    <p class="resume-diagram-caption">${isEn ? "Root cause: PyTorch DataLoader serialization blocking GPU. Fix: Zero-copy pinned memory prefetch queue." : "根因：PyTorch DataLoader 跨行程序列化阻塞 GPU。修復：採用鎖頁共享記憶體預取佇列。"}</p>
  </div>`;
}

function dynaSafeAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <span class="resume-ir-badge">AST / Metric Spec</span>
      <span class="resume-ir-sub">Traceable Performance Evidence</span>
    </div>
    <pre><code>MetricAST: {
  id: "dynasafe-training-throughput",
  type: "multiplier",
  value: 10.0,
  workload: "PhysicsNeMo_PINN_OpenFOAM",
  baseline: { ipc: "synchronous_pipe", throughput_imgs: 11.2, gpu_util: 0.12 },
  optimized: { ipc: "pinned_shm_ring_buffer", throughput_imgs: 118.4, gpu_util: 0.96 },
  tradeoff: "Allocated 1.2 GB host pinned RAM to eliminate 88% GPU idle stall"
}
Negative_Control: Forced sync_io execution -> 88% GPU starve confirmed.
Positive_Control: Prefetch queue depth=4 -> 96% saturation confirmed.</code></pre>
  </div>`;
}

function metGaugeVisual(e, language) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <span class="resume-diagram-tag">System Topology / 系統架構</span>
      <strong>${isEn ? "12-Stereo-Camera Inspection Topology" : "12 組立體相機次公釐產線檢測拓撲"}</strong>
    </div>
    <svg class="resume-svg-diagram" viewBox="0 0 680 130" role="img" aria-hidden="true">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/></marker>
      </defs>
      <rect x="10" y="25" width="135" height="75" rx="6" class="resume-node-box"/>
      <text x="77" y="55" class="resume-node-title" text-anchor="middle">12 Stereo Pairs</text>
      <text x="77" y="75" class="resume-node-desc" text-anchor="middle">24 Optic Sensors</text>
      <line x1="145" y1="62" x2="185" y2="62" class="resume-flow-line" marker-end="url(#arrow)"/>
      <rect x="185" y="25" width="135" height="75" rx="6" class="resume-node-box"/>
      <text x="252" y="55" class="resume-node-title" text-anchor="middle">Hardware Sync</text>
      <text x="252" y="75" class="resume-node-desc" text-anchor="middle">GPIO TTL &lt;1.2ms</text>
      <line x1="320" y1="62" x2="360" y2="62" class="resume-flow-line" marker-end="url(#arrow)"/>
      <rect x="360" y="25" width="145" height="75" rx="6" class="resume-node-box"/>
      <text x="432" y="55" class="resume-node-title" text-anchor="middle">Epipolar Engine</text>
      <text x="432" y="75" class="resume-node-desc" text-anchor="middle">Reprojection &lt;0.08px</text>
      <line x1="505" y1="62" x2="545" y2="62" class="resume-flow-line" marker-end="url(#arrow)"/>
      <rect x="545" y="25" width="125" height="75" rx="6" class="resume-node-box resume-node-highlight"/>
      <text x="607" y="55" class="resume-node-title" text-anchor="middle">3D Pointcloud</text>
      <text x="607" y="75" class="resume-node-desc" text-anchor="middle">Sub-mm QA Pass</text>
    </svg>
    <p class="resume-diagram-caption">${isEn ? "Factory floor vibration-resistant pipeline. Synchronized 24 cameras within 1.2ms trigger latency." : "抗工業震動檢測管線。在 1.2ms 內硬體觸發同步 24 顆相機，對極校正重投影誤差小於 0.08 像素。"}</p>
  </div>`;
}

function metGaugeAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <span class="resume-ir-badge">Topology & Invariant Spec</span>
      <span class="resume-ir-sub">Deterministic Sensor Constraints</span>
    </div>
    <pre><code>StereoTopologyAST: {
  subsystem: "metgauge-3d-inspection",
  camera_pairs: 12,
  optic_sensors: 24,
  hardware_trigger: { protocol: "GPIO_TTL", jitter_tolerance_ms: 1.2 },
  calibration: { epipolar_reprojection_error_px: 0.08, pass_threshold_px: 0.15 },
  timing_budget: { cycle_budget_ms: 820, target_sla_ms: 1000, margin_pct: 18.0 }
}
Invariant_Gate: 100% pairs calibrated before batch capture; vibration drift triggers auto-recalibration.</code></pre>
  </div>`;
}

function atlasVisual(e, language, copy) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <span class="resume-diagram-tag">Budget Guardrail Pipeline / 預算閘門管線</span>
      <strong>${isEn ? "Automatic Fault Recovery via TALK Contract 1.8" : "TALK Contract 1.8 預算超支自動攔截與修訂"}</strong>
    </div>
    <svg class="resume-svg-diagram" viewBox="0 0 680 120" role="img" aria-hidden="true">
      <defs>
        <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/></marker>
      </defs>
      <rect x="10" y="20" width="120" height="70" rx="6" class="resume-node-box"/>
      <text x="70" y="50" class="resume-node-title" text-anchor="middle">Paper AST/IR</text>
      <text x="70" y="68" class="resume-node-desc" text-anchor="middle">Propositions</text>
      <line x1="130" y1="55" x2="165" y2="55" class="resume-flow-line" marker-end="url(#arrow2)"/>
      <rect x="165" y="20" width="120" height="70" rx="6" class="resume-node-box"/>
      <text x="225" y="50" class="resume-node-title" text-anchor="middle">Route Planner</text>
      <text x="225" y="68" class="resume-node-desc" text-anchor="middle">Cost 6.0 TALK</text>
      <line x1="285" y1="55" x2="320" y2="55" class="resume-flow-line" marker-end="url(#arrow2)"/>
      <rect x="320" y="20" width="150" height="70" rx="6" class="resume-node-box resume-node-alert"/>
      <text x="395" y="48" class="resume-node-title resume-text-alert" text-anchor="middle">⛔ Budget Gate</text>
      <text x="395" y="68" class="resume-node-desc" text-anchor="middle">Cost 6.0 &gt; 5.0 REJECT</text>
      <line x1="470" y1="55" x2="510" y2="55" class="resume-flow-line" marker-end="url(#arrow2)"/>
      <rect x="510" y="20" width="160" height="70" rx="6" class="resume-node-box resume-node-highlight"/>
      <text x="590" y="48" class="resume-node-title" text-anchor="middle">✅ T5 Compact</text>
      <text x="590" y="68" class="resume-node-desc" text-anchor="middle">Cost 4.6 PROCEED</text>
    </svg>
    <details class="resume-reader-sample" open>
      <summary class="resume-sample-summary"><span class="resume-sample-pill">Live Sample Excerpt / 成果樣張</span> <strong>${e(copy[language].sampleExcerptTitle)}</strong></summary>
      <div class="resume-sample-body">
        <div class="resume-sample-meta">
          <span class="resume-badge-route">Route: T5-Executive</span>
          <span class="resume-badge-cost">Budget: 4.6 TALK (Pass)</span>
          <span class="resume-badge-verified">Integrity: Verified 0-Drop</span>
        </div>
        <div class="resume-sample-text">
          <p class="resume-sample-en"><strong>EN:</strong> &ldquo;Evaluating invariant verification under dynamic constraints. Baseline accuracy falls 34%, whereas epipolar-constrained feature matching preserves sub-millimeter precision.&rdquo; <span class="resume-sample-anchor">[Claim-01: Verified Table 3, p.7]</span></p>
          <p class="resume-sample-zh"><strong>正體中文：</strong> &ldquo;在動態干擾下評估不變量驗證。傳統基準精度下降 34%，而對極幾何約束特徵匹配依然維持次公釐精度。&rdquo; <span class="resume-sample-anchor">[證據標籤：第 7 頁表 3]</span></p>
        </div>
      </div>
    </details>
  </div>`;
}

function atlasAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <span class="resume-ir-badge">Contract 1.8 DSL & Gate Receipt</span>
      <span class="resume-ir-sub">Deterministic Rerouting Proof</span>
    </div>
    <pre><code>TALK_Contract_1_8: {
  budget_ceiling: 5.0,
  initial_plan: { id: "deep_survey", cost: 6.0, outcome: "GATE_REJECT" },
  adaptive_reroute: { id: "t5_compact", cost: 4.6, outcome: "GATE_PROCEED" },
  reconstruction_sha256: "4d436a5b8e998a46b216ec88fbc89e3a79d2b271d"
}
Negative_Control: Trigger cost=6.0 -> Gate blocks execution (exit 1).
Positive_Control: Re-route T5 compact -> Gate permits generation (exit 0, 0 dropped claims).</code></pre>
  </div>`;
}

function tfxVisual(e, language) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <span class="resume-diagram-tag">Dual-Track Architecture / 雙軌保真架構</span>
      <strong>${isEn ? "Immutable Raw Audio vs User-Approved Speculative Cleanup" : "原始錄音唯讀保真 vs 顯式確認語意修訂"}</strong>
    </div>
    <svg class="resume-svg-diagram" viewBox="0 0 680 120" role="img" aria-hidden="true">
      <defs>
        <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor"/></marker>
      </defs>
      <rect x="10" y="35" width="110" height="50" rx="6" class="resume-node-box"/>
      <text x="65" y="65" class="resume-node-title" text-anchor="middle">Mic Input</text>
      <path d="M 120 60 L 150 60 L 170 35 L 200 35" class="resume-flow-line" marker-end="url(#arrow3)"/>
      <path d="M 120 60 L 150 60 L 170 85 L 200 85" class="resume-flow-line" marker-end="url(#arrow3)"/>
      <rect x="200" y="10" width="220" height="45" rx="6" class="resume-node-box resume-node-highlight"/>
      <text x="310" y="32" class="resume-node-title" text-anchor="middle">Track 1: Raw Audio &amp; ASR</text>
      <text x="310" y="47" class="resume-node-desc" text-anchor="middle">Immutable Scoped Storage</text>
      <line x1="420" y1="32" x2="480" y2="32" class="resume-flow-line" marker-end="url(#arrow3)"/>
      <rect x="480" y="10" width="180" height="45" rx="6" class="resume-node-box"/>
      <text x="570" y="37" class="resume-node-title" text-anchor="middle">Protected Archive</text>
      <rect x="200" y="65" width="220" height="45" rx="6" class="resume-node-box"/>
      <text x="310" y="87" class="resume-node-title" text-anchor="middle">Track 2: AI Disfluency Diff</text>
      <text x="310" y="102" class="resume-node-desc" text-anchor="middle">Non-destructive Overlay</text>
      <line x1="420" y1="87" x2="480" y2="87" class="resume-flow-line" marker-end="url(#arrow3)"/>
      <rect x="480" y="65" width="180" height="45" rx="6" class="resume-node-box resume-node-highlight"/>
      <text x="570" y="87" class="resume-node-title" text-anchor="middle">User Checkbox Review</text>
      <text x="570" y="102" class="resume-node-desc" text-anchor="middle">No Blind Overwrites</text>
    </svg>
    <p class="resume-diagram-caption">${isEn ? "Zero data loss guarantee: Original audio and verbatim transcript are immutable. LLM cleanups are candidate overlays requiring explicit user opt-in." : "零資料滅失保證：原始音訊與逐字稿為唯讀正典。AI 語意修飾僅為候選層，必須經使用者逐項勾選才套用。"}</p>
  </div>`;
}

function tfxAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <span class="resume-ir-badge">State Machine & Boundary Spec</span>
      <span class="resume-ir-sub">Android Scoped Storage Invariants</span>
    </div>
    <pre><code>StateMachineAST: {
  states: ["RECORDING", "IMMUTABLE_RAW", "ASR_VERBATIM", "SPECULATIVE_DIFF", "USER_APPROVAL", "FINAL_EXPORT"],
  storage_sandbox: "Android_Private_Scoped_Storage",
  zero_loss_invariant: "Raw audio stream never touched by LLM post-processor",
  mutation_policy: "EXPLICIT_CONFIRMATION_REQUIRED"
}
Control_Verification: Blind overwrite attempt blocked by immutable file permission.</code></pre>
  </div>`;
}

export function renderResume(profile, cases, assets, prefix = ".", notes) {
  const e = escapeHtml;
  const copy = profile.copy;
  const career = new Map(profile.professional.map(item => [item.id, item]));
  const projects = new Map(cases.projects.map(item => [item.id, item]));
  const blurbs = new Map(profile.projects.map(item => [item.id, item]));
  const cvHref = language => `${prefix}/resume/${assets.locales[language].file}`;
  const caseHref = (id, language, walkthrough = false) => `${prefix}/projects/${id}.html?lang=${language}${walkthrough ? "#walkthrough" : ""}`;
  const cvAction = language => `<a class="resume-button" href="${e(cvHref(language))}" data-resume-cv download><span data-cv-download-label>${e(copy[language].cv)}</span><span data-cv-open-label>${e(copy[language].cvOpen)}</span></a>`;
  const nav = Object.keys(copy.en.nav).map(id => `<a href="#${id}">${localize(language => e(copy[language].nav[id]), "span")}</a>`).join("");
  const metric = (item, language) => item.metric ? item.metric[language].replaceAll("{value}", String(item.metric.value)) : item[language].result;
  const summary = (item, language) => item[language].summary.replaceAll("{cameraPairs}", String(item.system?.cameraPairs));
  
  const proof = profile.entry.proofIds.map(id => {
    const item = career.get(id);
    return `<article class="resume-proof" data-proof-id="${id}">${localize(language => {
      const visual = id === "dynasafe" ? dynaSafeVisual(e, language) : id === "metgauge" ? metGaugeVisual(e, language) : "";
      const agent = id === "dynasafe" ? dynaSafeAgent(e, language) : id === "metgauge" ? metGaugeAgent(e, language) : "";
      return `<p class="resume-kicker">${e(item.employer)}</p><h3>${e(item[language].proofTitle)}</h3><p class="resume-result">${e(metric(item, language))}</p><p>${e(summary(item, language))}</p>${visual}${agent}<p class="resume-note">${e(item[language].boundary)}</p>`;
    })}</article>`;
  }).join("");

  const featured = profile.entry.projectIds.map(id => {
    const item = projects.get(id), blurb = blurbs.get(id);
    return `<article class="resume-work" data-project-id="${id}">${localize(language => {
      const visual = id === "study-atlas" ? atlasVisual(e, language, copy) : id === "transcribe-for-x" ? tfxVisual(e, language) : "";
      const agent = id === "study-atlas" ? atlasAgent(e, language) : id === "transcribe-for-x" ? tfxAgent(e, language) : "";
      return `<p class="resume-kicker">${e(blurb[language].evidence)}</p><h3>${e(item.title)}</h3><p>${e(blurb[language].summary)}</p>${visual}${agent}${id === "study-atlas" ? "" : `<p class="resume-note resume-boundary">${e(blurb[language].boundary)}</p>`}<a class="resume-work-link" data-resume-case href="${e(caseHref(id, language))}">${e(blurb[language].action)} <span aria-hidden="true">↗</span></a>${id === "study-atlas" ? `<br><a class="resume-work-link" data-resume-walkthrough href="${e(caseHref(id, language, true))}">${e(blurb[language].walkthroughAction)} <span aria-hidden="true">↗</span></a>` : ""}`;
    })}</article>`;
  }).join("");

  const careerRows = profile.professional.map(item => [item.start, `<article class="resume-career" id="career-${item.id}" data-career-id="${item.id}">${localize(language => `<div class="resume-career-heading"><h3>${e(item.employer)}<span>${e(item.title)}</span></h3><p class="resume-date">${e(period(item.start, item.end, language))}</p></div><p>${e(summary(item, language))}${item.metric ? ` <strong>${e(metric(item, language))}${language === "en" ? "." : "。"}</strong>` : ""}</p><p class="resume-note">${e(item[language].boundary)}</p><details><summary>${e(copy[language].careerDetail)}</summary><ul>${item[language].details.map(text => `<li>${e(text)}</li>`).join("")}</ul></details>`)}</article>`]).concat(profile.careerBreaks.map(item => [item.start, `<article class="resume-career resume-break" data-break-id="${item.id}">${localize(language => `<div class="resume-career-heading"><h3>${e(item[language].title)}</h3><p class="resume-date">${e(period(item.start, item.end, language))}</p></div><p>${e(item[language].text)}</p>`)}</article>`]));
  const professional = careerRows.sort((a, b) => b[0].localeCompare(a[0])).map(row => row[1]).join("");
  const research = profile.researchLearning.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p class="resume-date">${e(period(item.start, item.end, language))}</p><p>${e(item[language].text)}</p>`, "article", `class="resume-research" data-research-id="${item.id}"`)).join("");
  const education = profile.education.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p>${e(item[language].institution)} · ${e(item.start)}–${e(item.end)}</p>`, "article", `class="resume-education"`)).join("");
  const skills = profile.skills.map(item => `<li><a href="${e(item.proofId ? `#career-${item.proofId}` : `${prefix}/projects/${item.projectId}.html`)}">${e(item.label)}</a></li>`).join("");

  const modeSwitch = localize(language => `<button type="button" data-resume-mode="human" aria-pressed="true" disabled>🧑 <span data-mode-label="human">${e(copy[language].modeHuman)}</span></button><button type="button" data-resume-mode="agent" aria-pressed="false" disabled>🤖 <span data-mode-label="agent">${e(copy[language].modeAgent)}</span></button>`, "div", 'class="resume-view-modes" role="group" aria-label="Reading perspective"');

  return `<a class="resume-skip" href="#content">${localize(language => e(copy[language].skip), "span")}</a>
<header class="resume-header"><div class="resume-header-inner"><a class="resume-logo" href="#top">${e(profile.identity.shortName)}</a>
<nav id="resume-navigation" class="resume-navigation" aria-label="Main navigation / 主要導覽">${nav}</nav>
<div class="resume-reading-controls" data-js-control>${modeSwitch}<div class="resume-languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-resume-language="en" aria-pressed="true" disabled>EN</button><button type="button" data-resume-language="zh-TW" aria-pressed="false" disabled>正體</button></div><button type="button" data-resume-theme aria-label="Switch to dark theme" disabled><span aria-hidden="true">◐</span></button><button type="button" class="resume-menu" data-resume-menu aria-label="Menu" aria-expanded="false" aria-controls="resume-navigation" disabled><span aria-hidden="true">☰</span></button></div></div></header>
<main id="content" class="resume-main" tabindex="-1">
<section class="resume-hero" id="top">${localize(language => `<p class="resume-role">${e(profile.identity.role)}</p><h1>${e(profile.identity.shortName)}</h1><p class="resume-full-name">${e(profile.identity.name)}</p><p class="resume-lead">${e(copy[language].lead)}</p><p class="resume-note">${e(copy[language].context)}</p><ul class="resume-chips">${profile.professional.map(item => item.metric ? metric(item, language) : item.system ? copy[language].cameraChip.replaceAll("{cameraPairs}", String(item.system.cameraPairs)) : "").filter(Boolean).map(text => `<li>${e(text)}</li>`).join("")}</ul><div class="resume-actions">${cvAction(language)}<a class="resume-button resume-button-secondary" href="#contact">${e(copy[language].contact)}</a></div>`)}</section>
<section id="professional-proof" class="resume-section resume-proof-section">${localize(language => `<h2>${e(copy[language].proofHeading)}</h2><p class="resume-section-intro">${e(copy[language].proofIntro)}</p>`)}<div class="resume-proof-grid">${proof}</div>${localize(language => `<a class="resume-small-link" href="#experience">${e(copy[language].careerLink)} <span aria-hidden="true">↓</span></a>`)}</section>
<section id="projects" class="resume-section">${localize(language => `<h2>${e(copy[language].workHeading)}</h2><p class="resume-section-intro">${e(copy[language].focus)}</p><p class="resume-note">${e(copy[language].snapshot)}</p>`)}<div class="resume-work-grid">${featured}</div><div class="resume-more-work">${localize(language => `<p><span class="resume-note">${e(copy[language].moreWork)}</span> · ${profile.entry.moreProjectIds.map(id => `<a data-resume-case href="${e(caseHref(id, language))}">${e(projects.get(id).title)}</a> — ${e(blurbs.get(id)[language].summary)}`).join(" · ")}</p>${notes ? `<p><a data-resume-notes href="${e(prefix)}/engineering-notes.html?lang=${language}">${e(notes.copy[language].entry)} →</a></p>` : ""}`)}</div></section>
<section id="experience" class="resume-section">${localize(language => `<h2>${e(copy[language].experienceHeading)}</h2><p class="resume-section-intro">${e(copy[language].experienceIntro)}</p>`)}${professional}</section>
<section id="about" class="resume-section resume-about">${localize(language => `<h2>${e(copy[language].aboutHeading)}</h2><p class="resume-section-intro">${e(copy[language].about)}</p>`)}
<details class="resume-detail" id="skills" open><summary>${localize(language => e(copy[language].skillsHeading), "span")}</summary><ul class="resume-skills">${skills}</ul></details>
<details class="resume-detail" id="education"><summary>${localize(language => e(copy[language].educationHeading), "span")}</summary>${education}</details>
<details class="resume-detail"><summary>${localize(language => e(copy[language].researchHeading), "span")}</summary>${research}</details>
<details class="resume-detail" id="life-devotions"><summary>${localize(language => e(copy[language].personalHeading), "span")}</summary>${localize(language => `<p>${e(copy[language].personal)}</p>`)}</details></section>
<section id="contact" class="resume-section resume-contact">${localize(language => `<h2>${e(copy[language].contactHeading)}</h2><p class="resume-section-intro">${e(copy[language].contactLead)}</p><div class="resume-contact-links"><a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a><a href="${e(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">${e(copy[language].linkedin)} <span aria-hidden="true">↗</span></a><a href="${e(profile.contact.github)}" target="_blank" rel="noopener noreferrer">${e(copy[language].github)} <span aria-hidden="true">↗</span></a></div><div class="resume-actions">${cvAction(language)}<a href="${e(cvHref(language === "en" ? "zh-TW" : "en"))}" data-resume-cv download>${e(copy[language].cvOther)}</a></div>`)}</section>
</main><footer class="resume-footer">${localize(language => `<p>${e(copy[language].footer)}</p><p data-save-actions><a href="${e(prefix)}/resume-overview.html" download="blake-lin-resume-overview.html" data-save-overview>${e(copy[language].save)}</a> <span>· <a href="${e(prefix)}/blake-lin-application-preview.zip" download="blake-lin-application-preview.zip" data-save-package>${e(copy[language].savePackage)}</a></span></p><p class="resume-note" data-save-scope>${e((notes?.copy[language] || copy[language]).saveScope)}</p><p class="resume-note" data-package-scope>${e((notes?.copy[language] || copy[language]).offlineScope)}</p>`)}<noscript><p>${localize(language => e(copy[language].noJs), "span")}</p></noscript></footer>`;
}
