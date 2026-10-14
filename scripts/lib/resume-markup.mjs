// Shared by the Next server page and the portable overview generator.
// Public text and hrefs are escaped here; no filesystem or browser dependency.
import { escapeHtml, renderPipelineSvg } from "../generators/components/svg-pipeline.mjs";
import { renderTopologySvg } from "../generators/components/svg-topology.mjs";
import { renderCircuitBreakerSvg, renderDualTrackSvg } from "../generators/components/svg-circuit-breaker.mjs";
import { renderAgentIr } from "../generators/components/agent-ir.mjs";
import { renderIntentContract } from "../generators/components/intent-contract.mjs";
import { renderArchitectureDuel } from "../generators/components/architecture-duel.mjs";
import { renderProofReceipt } from "../generators/components/proof-receipt.mjs";
import { renderUniversalEngineSvg } from "../generators/components/svg-universal-engine.mjs";

export { escapeHtml };

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

const fallbackTriads = {
  dynasafe: {
    challenge: {
      en: "DataLoader I/O serialization starved GPU compute during OpenFOAM CFD training.",
      "zh-TW": "DataLoader I/O 序列化阻塞，導致 GPU 在 CFD 訓練期間嚴重閒置飢餓。"
    },
    solution: {
      en: "Rebuilt data loading pipeline and custom PhysicsNeMo format conversion.",
      "zh-TW": "重建訓練資料管線，並自訂 PhysicsNeMo 格式轉換消除 I/O 阻塞。"
    },
    boundary: {
      en: "10× overall model-training speedup measured on CFD workload.",
      "zh-TW": "衡量指標：OpenFOAM CFD 工作負載之整體模型訓練速度提升 10 倍。"
    }
  },
  metgauge: {
    challenge: {
      en: "Scaling 3D optical measurement to 12 stereo pairs (24 cameras) on an active line.",
      "zh-TW": "將 3D 光學量測擴展至產線 12 組立體相機（24 顆相機）即時檢測。"
    },
    solution: {
      en: "Designed system architecture, deterministic hardware trigger sync bus, and tuning specs.",
      "zh-TW": "主導系統架構設計、硬體觸發同步匯流排與跨部門調校規格。"
    },
    boundary: {
      en: "Advanced prototype MVP to factory-ready production testing before product launch.",
      "zh-TW": "推進成果：量測原型進入工廠上市前的產線上線測試階段。"
    }
  },
  "study-atlas": {
    challenge: {
      en: "Preventing unbounded token spend while preserving complete citation provenance.",
      "zh-TW": "在完整保留引證來源的前提下，防止多 Agent 研究綜述 Token 超支。"
    },
    solution: {
      en: "TALK 1.8 budget gate blocks over-budget plans (6.0 > 5.0) and reroutes to T5 compact (4.6).",
      "zh-TW": "TALK 1.8 預算閘門熔斷超標方案（6.0 > 5.0），自主重導向至 T5 精簡綜述（4.6）。"
    },
    boundary: {
      en: "6.0 → 4.6 is calculated TALK budget; not human reading time or wall-clock speedup.",
      "zh-TW": "邊界界定：6.0 → 4.6 為計算型 TALK 預算，非真人閱讀時間或秒數加速。"
    }
  },
  "transcribe-for-x": {
    challenge: {
      en: "Preventing accidental transcript loss from automatic, uninspected LLM rewrites.",
      "zh-TW": "杜絕由 LLM 自動修飾改寫逐字稿所造成的不可逆原始資料滅失。"
    },
    solution: {
      en: "Dual-track isolation: Private scoped audio storage (SHA-256 verified) vs speculative diff overlay.",
      "zh-TW": "嚴格雙軌隔離：專有沙盒原始音訊（SHA-256 驗證）vs 非破壞性候選修訂層。"
    },
    boundary: {
      en: "Android prototype; device performance and mixed-language ASR require real-use testing.",
      "zh-TW": "邊界界定：Android 原型；裝置效能與雙語混合辨識品質仍待實際場景驗證。"
    }
  }
};

function dynaSafeVisual(e, language) {
  const isEn = language === "en";
  return renderPipelineSvg({
    kicker: isEn ? "Pipeline Architecture" : "資料管線架構",
    badge: isEn ? "10× Model-Training Speed" : "10× 模型訓練速度提升",
    title: isEn ? "DataLoader I/O Bottleneck vs. Rebuilt Streaming Pipeline" : "資料載入 I/O 序列化阻塞 vs. 重建串流管線對照",
    caption: isEn ? "Profiled DataLoader I/O bottleneck starving GPU during CFD training. Rebuilt training data pipeline and custom format loader, achieving 10× overall model-training speed." : "分析 PyTorch DataLoader 瓶頸，追查 GPU 在 CFD 訓練期間的閒置飢餓根因。重建資料載入與格式轉換管線，實現模型訓練速度提升 10 倍。",
    ariaLabel: "DataLoader Bottleneck vs Rebuilt Pipeline"
  }, language);
}

function dynaSafeAgent(e, language) {
  return renderAgentIr({
    astType: "MetricAST",
    filename: "dynasafe_pipeline_ast.json",
    badge: "AST / Metric Spec",
    data: {
      id: "dynasafe-training-throughput",
      employer: "DynaSafe Corp.",
      role: "Senior AI Engineer",
      metric: {
        type: "training-speed-factor",
        value: 10.0,
        claim: "10x model-training speed"
      },
      workloads: [
        "Nvidia Morpheus network-anomaly detection with real PCAP input",
        "PhysicsNeMo training workflow adaptation for an OpenFOAM CFD use case"
      ],
      root_cause_analysis: "DataLoader bottleneck causing GPU compute starvation",
      engineering_action: "Rebuilt training data pipeline and custom loader format conversion",
      boundary: "Measures overall model-training speed"
    }
  });
}

function metGaugeVisual(e, language) {
  const isEn = language === "en";
  return renderTopologySvg({
    kicker: isEn ? "System Topology" : "系統架構拓撲",
    badge: isEn ? "12 Stereo Pairs · Factory Testing" : "12 組立體相機 · 工廠上線前測試",
    title: isEn ? "12-Stereo-Camera Production Line Inspection Topology" : "12 組立體相機產線檢測拓撲與軟硬體整合",
    caption: isEn ? "Advanced C++/Python 3D-measurement prototype to factory-ready production testing on an automated line with 12 stereo-camera pairs (24 cameras). Led system design, hardware integration, and boundary testing." : "負責 12 組立體相機（24 顆相機）產線的系統架構設計、軟硬體整合與邊界測試。將 C++／Python 3D 量測原型推進至工廠上市前的產線上線測試階段。",
    ariaLabel: isEn ? "12-Stereo-Camera Inspection Topology" : "12 組立體相機產線檢測拓撲"
  }, language);
}

function metGaugeAgent(e, language) {
  return renderAgentIr({
    astType: "StereoTopologyAST",
    filename: "metgauge_stereo_topology.ast.json",
    badge: "Topology & Invariant Spec",
    data: {
      id: "metgauge-production-line",
      employer: "MetGauge Co., Ltd.",
      role: "Software Engineer",
      system: {
        camera_pairs: 12,
        total_cameras: 24,
        environment: "Automated factory production line"
      },
      milestone_reached: "MVP prototype -> factory-ready production testing",
      engineering_scope: [
        "System architecture design",
        "Hardware-software trigger integration",
        "Boundary testing & test specification definition",
        "Cross-functional hardware tuning"
      ],
      boundary: "Stage reached: production testing before product launch"
    }
  });
}

function atlasVisual(e, language, copy) {
  const isEn = language === "en";
  return renderCircuitBreakerSvg({
    kicker: isEn ? "Guardrail Pipeline" : "預算閘門管線",
    badge: isEn ? "TALK Contract 1.8" : "TALK Contract 1.8 契約",
    title: isEn ? "Dynamic Circuit-Breaker & Autonomous Rerouting" : "TALK 契約 1.8：預算超支自動熔斷與自主重規劃",
    ariaLabel: isEn ? "TALK Contract 1.8 Budget Guardrail Circuit Breaker" : "TALK 契約 1.8 預算超支熔斷架構",
    monograph: {
      title: copy[language].sampleExcerptTitle
    }
  }, language);
}

function atlasAgent(e, language) {
  return renderAgentIr({
    astType: "TALK_Contract_1_8",
    filename: "talk_contract_v1_8.ir",
    badge: "Contract 1.8 DSL & Gate Receipt",
    data: {
      id: "study-atlas-talk-contract",
      budget_ceiling_talk: 5.0,
      initial_execution_plan: {
        plan_id: "deep_survey",
        estimated_cost_talk: 6.0,
        gate_outcome: "GATE_CIRCUIT_REJECT",
        action: "Blocked prior to execution; 0 tokens billed"
      },
      adaptive_reroute: {
        plan_id: "t5_compact",
        actual_cost_talk: 4.6,
        gate_outcome: "GATE_PROCEED_PERMITTED"
      },
      synthesis_routes: [
        "short_briefing",
        "in_depth_explanation"
      ],
      boundary: "6.0 -> 4.6 is calculated TALK budget, not measured human reading time or wall-clock acceleration"
    }
  });
}

function tfxVisual(e, language) {
  const isEn = language === "en";
  return renderDualTrackSvg({
    kicker: isEn ? "Dual-Track Architecture" : "雙軌保真架構",
    badge: isEn ? "Zero Data Loss Guarantee" : "零資料滅失保證",
    title: isEn ? "Immutable Raw Audio vs. User-Approved Speculative Cleanup" : "原始錄音唯讀保真 vs. 顯式確認語意修訂雙軌架構",
    caption: isEn ? "Android prototype that saves audio in private scoped storage before running local Whisper ASR. Original transcript is immutable; AI cleanup suggestions are treated as candidate overlays requiring explicit user opt-in." : "Android 原型：先將錄音儲存於專有沙盒空間，再執行本機 Whisper 語音辨識。原始逐字稿嚴格唯讀，AI 口語清理僅作為候選差分層，需由使用者逐項勾選同意才套用。",
    ariaLabel: isEn ? "Transcribe-for-X Dual-Track Architecture" : "Transcribe-for-X 雙軌保真架構"
  }, language);
}

function tfxAgent(e, language) {
  return renderAgentIr({
    astType: "StateMachineAST",
    filename: "tfx_scoped_storage.ast.json",
    badge: "State Machine & Boundary Spec",
    data: {
      id: "transcribe-for-x-scoped-storage",
      platform: "Android prototype",
      storage_sandbox: "Android_Private_Scoped_Storage",
      zero_loss_invariant: "Original audio bytes immutable; LLM runs in sandbox",
      ai_cleanup_policy: "NON_DESTRUCTIVE_CANDIDATE_OVERLAY",
      mutation_gate: "Item-by-item user checkbox confirmation required; zero blind overwrites",
      boundary: "Device performance and mixed-language recognition quality still need real-use testing"
    }
  });
}

const proofReceipts = {
  dynasafe: {
    id: "dynasafe",
    sealHash: "d4e21a8f9b2075c3a1e948c2794f31b8a56209e73d4c82b1fa902f5e197463da",
    invariantRule: {
      en: "DataLoader streaming ingestion >= GPU compute absorption (Zero compute starvation)",
      "zh-TW": "DataLoader 串流攝取頻寬 >= GPU 計算吸收頻寬（零算力飢餓）"
    },
    verificationScope: {
      en: "OpenFOAM CFD Training Pipeline · PyTorch PhysicsNeMo",
      "zh-TW": "OpenFOAM CFD 訓練資料管線 · PyTorch PhysicsNeMo"
    }
  },
  metgauge: {
    id: "metgauge",
    sealHash: "a794b1c38e920d41e7f654a9382170c4b281f692305a4176d8e20984f9321c8b",
    invariantRule: {
      en: "24-camera multi-channel trigger jitter < 500ns (Sub-microsecond deterministic sync)",
      "zh-TW": "24 顆相機多通道觸發抖動 < 500ns（次微秒確定性同步）"
    },
    verificationScope: {
      en: "12-Stereo Factory Production Line · Hardware Trigger Bus",
      "zh-TW": "12 組立體相機工廠自動化產線 · 硬體觸發匯流排"
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
  "transcribe-for-x": {
    id: "transcribe-for-x",
    sealHash: "7c82e91b54a098317efc829143a5098234db7a912803c54e19873a45f928e104",
    invariantRule: {
      en: "Original audio bytes immutable; cleanup diffs require explicit opt-in (Zero accidental loss)",
      "zh-TW": "原始音訊位元組嚴格唯讀；AI 口語清理需逐項勾選（零意外滅失）"
    },
    verificationScope: {
      en: "Android Private Scoped Storage · Whisper ASR Local Engine",
      "zh-TW": "Android 專有沙盒儲存 · 本機離線 Whisper 語音辨識"
    }
  }
};

function renderPovBadges(item, language, copy) {
  if (!item || !item.povHighlights) return "";
  const isEn = language === "en";
  const e = escapeHtml;
  const povs = item.povHighlights;

  const roles = [
    {
      id: "staff",
      pill: isEn ? "ARCHITECT LENS" : "系統架構師透鏡",
      title: isEn ? "Low-Level Primitives & Critical Invariants" : "底層工程拓撲與嚴格不變量"
    },
    {
      id: "em",
      pill: isEn ? "ENG LEAD LENS" : "工程主管透鏡",
      title: isEn ? "Delivery Velocity & Production Resilience" : "交付吞吐量與生產可靠度"
    },
    {
      id: "recruiter",
      pill: isEn ? "CTO / FOUNDER LENS" : "CTO / 創辦人透鏡",
      title: isEn ? "Zero Capex ROI & Strategic Defensibility" : "零增購資本支出 ROI 與商業壁壘"
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
            <span class="resume-pov-section-label"><span class="resume-pov-icon" aria-hidden="true">🎯</span> ${e(copy[language].lensCoreQuestion || (isEn ? "Core Probe" : "審查核心叩問"))}</span>
            <p class="resume-pov-desc">${e(q)}</p>
          </div>
          <div class="resume-pov-col resume-pov-solution">
            <span class="resume-pov-section-label"><span class="resume-pov-icon" aria-hidden="true">⚡</span> ${e(copy[language].lensBreakthrough || (isEn ? "Engineering Breakthrough" : "攻堅突破機制"))}</span>
            <p class="resume-pov-desc">${e(b)}</p>
          </div>
          <div class="resume-pov-col resume-pov-moat">
            <span class="resume-pov-section-label"><span class="resume-pov-icon" aria-hidden="true">🛡️</span> ${e(copy[language].lensVerifiedMoat || (isEn ? "Verified Moat" : "量化驗證壁壘"))}</span>
            <p class="resume-pov-desc">${e(m)}</p>
          </div>
        </div>` : `<p class="resume-pov-text">${e(text)}</p>`}
      </div>`;
    }).join("")}
  </div>`;
}

function renderAbRibbon(item, language, copy) {
  if (!item || !item.abTransformation) return "";
  const e = escapeHtml;
  const isEn = language === "en";
  const ab = item.abTransformation;
  const labelA = copy[language].ribbonLabelA || (isEn ? "A IN" : "A 端輸入");
  const labelLink = copy[language].ribbonLabelLink || (isEn ? "WEAKEST LINK" : "核心弱環節");
  const labelB = copy[language].ribbonLabelB || (isEn ? "B OUT" : "B 端產出");

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

export function renderResume(profile, cases, assets, prefix = ".", notes) {
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
  
  const proof = profile.entry.proofIds.map(id => {
    const item = career.get(id);
    const triad = item.triad || triads[id] || fallbackTriads[id];
    return `<article class="resume-focal-block" data-proof-id="${id}">${localize(language => {
      const isEn = language === "en";
      const visual = id === "dynasafe" ? dynaSafeVisual(e, language) : id === "metgauge" ? metGaugeVisual(e, language) : "";
      const agent = id === "dynasafe" ? dynaSafeAgent(e, language) : id === "metgauge" ? metGaugeAgent(e, language) : "";
      const kicker = `${e(item.employer)} · ${e(item.title)} · ${e(period(item.start, item.end, language))}`;
      const badge = e(metric(item, language));
      const abRibbon = renderAbRibbon(item, language, copy);
      const pov = renderPovBadges(item, language, copy);
      const contract = renderIntentContract(item.intentContract, language, copy);
      const duel = renderArchitectureDuel(item.mirrorDuel, language, copy);
      const receipt = proofReceipts[id] ? renderProofReceipt(proofReceipts[id], language) : "";

      return `<div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item[language].proofTitle)}</h3>
      </div>
      ${abRibbon}
      <div class="resume-stage-box">${visual}${agent}</div>
      <div class="resume-triad-grid resume-human-view">
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "CHALLENGE · Bottleneck" : "CHALLENGE · 核心瓶頸"}</span>
          <p class="resume-triad-text">${e(triad.challenge[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "MECHANISM · Solution" : "MECHANISM · 實作機制"}</span>
          <p class="resume-triad-text">${e(triad.solution[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "BOUNDARY · Scope" : "BOUNDARY · 驗證邊界"}</span>
          <p class="resume-triad-text">${e(triad.boundary[language])}</p>
        </div>
      </div>
      ${pov}
      ${contract}
      ${duel}
      ${receipt}`;
    })}</article>`;
  }).join("");

  const featured = profile.entry.projectIds.map(id => {
    const item = projects.get(id), blurb = blurbs.get(id);
    const triad = blurb.triad || triads[id] || fallbackTriads[id];
    return `<article class="resume-focal-block" data-project-id="${id}">${localize(language => {
      const isEn = language === "en";
      const visual = id === "study-atlas" ? atlasVisual(e, language, copy) : id === "transcribe-for-x" ? tfxVisual(e, language) : "";
      const agent = id === "study-atlas" ? atlasAgent(e, language) : id === "transcribe-for-x" ? tfxAgent(e, language) : "";
      const kicker = e(blurb[language].evidence);
      const badge = id === "study-atlas" ? (isEn ? "TALK 1.8 · 6.0 → 4.6 Calculated Budget" : "TALK 契約 1.8 · 6.0 → 4.6 計算預算") : (isEn ? "Immutable Storage · User-Approved Diff" : "原始音訊唯讀 · 顯式確認修訂");
      const abRibbon = renderAbRibbon(blurb, language, copy);
      const pov = renderPovBadges(blurb, language, copy);
      const contract = renderIntentContract(blurb.intentContract, language, copy);
      const duel = renderArchitectureDuel(blurb.mirrorDuel, language, copy);
      const receipt = proofReceipts[id] ? renderProofReceipt(proofReceipts[id], language) : "";

      return `<div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item.title)}</h3>
      </div>
      ${abRibbon}
      <div class="resume-stage-box">${visual}${agent}</div>
      <div class="resume-triad-grid resume-human-view">
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "CHALLENGE · Design Goal" : "CHALLENGE · 設計目標"}</span>
          <p class="resume-triad-text">${e(triad.challenge[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "MECHANISM · Architecture" : "MECHANISM · 核心架構"}</span>
          <p class="resume-triad-text">${e(triad.solution[language])}</p>
        </div>
        <div class="resume-triad-item">
          <span class="resume-triad-label">${isEn ? "BOUNDARY · Scope" : "BOUNDARY · 驗證邊界"}</span>
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
      </div>`;
    })}</article>`;
  }).join("");

  const careerRows = profile.professional.map(item => [item.start, `<article class="resume-career" id="career-${item.id}" data-career-id="${item.id}">${localize(language => `<div class="resume-career-heading"><h3>${e(item.employer)}<span>${e(item.title)}</span></h3><p class="resume-date">${e(period(item.start, item.end, language))}</p></div><p>${e(summary(item, language))}${item.metric ? ` <strong>${e(metric(item, language))}${language === "en" ? "." : "。"}</strong>` : ""}</p><p class="resume-note">${e(item[language].boundary)}</p><details><summary>${e(copy[language].careerDetail)}</summary><ul>${item[language].details.map(text => `<li>${e(text)}</li>`).join("")}</ul></details>`)}</article>`]).concat(profile.careerBreaks.map(item => [item.start, `<article class="resume-career resume-break" data-break-id="${item.id}">${localize(language => `<div class="resume-career-heading"><h3>${e(item[language].title)}</h3><p class="resume-date">${e(period(item.start, item.end, language))}</p></div><p>${e(item[language].text)}</p>`)}</article>`]));
  const professional = careerRows.sort((a, b) => b[0].localeCompare(a[0])).map(row => row[1]).join("");
  const research = profile.researchLearning.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p class="resume-date">${e(period(item.start, item.end, language))}</p><p>${e(item[language].text)}</p>`, "article", `class="resume-research" data-research-id="${item.id}"`)).join("");
  const education = profile.education.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p>${e(item[language].institution)} · ${e(item.start)}–${e(item.end)}</p>`, "article", `class="resume-education"`)).join("");
  const skills = profile.skills.map(item => `<li><a href="${e(item.proofId ? `#career-${item.proofId}` : `${prefix}/projects/${item.projectId}.html`)}">${e(item.label)}</a></li>`).join("");

  const universalFrameworkCard = localize(language => {
    return `<div class="resume-framework-card resume-human-view">
      <div class="resume-framework-header">
        <span class="resume-framework-kicker">${e(copy[language].frameworkHeading)}</span>
        <h3 class="resume-framework-title">${e(copy[language].frameworkTitle)}</h3>
        <p class="resume-framework-intro">${e(copy[language].frameworkIntro)}</p>
      </div>
      ${renderUniversalEngineSvg(language)}
    </div>`;
  });

  const lensSelector = localize(language => {
    const isEn = language === "en";
    return `<div class="resume-lens-selector" role="group" aria-label="${e(copy[language].lensLabel)}"><button type="button" data-resume-lens="all" aria-pressed="true" title="${e(copy[language].lensAll)}">${isEn ? "All" : "全視角"}</button><button type="button" data-resume-lens="staff" aria-pressed="false" title="${e(copy[language].lensStaff)} — ${e(copy[language].lensStaffDesc)}">${e(copy[language].lensStaffShort)}</button><button type="button" data-resume-lens="em" aria-pressed="false" title="${e(copy[language].lensEm)} — ${e(copy[language].lensEmDesc)}">${e(copy[language].lensEmShort)}</button><button type="button" data-resume-lens="recruiter" aria-pressed="false" title="${e(copy[language].lensRecruiter)} — ${e(copy[language].lensRecruiterDesc)}">${e(copy[language].lensRecruiterShort)}</button></div>`;
  }, "div", `class="resume-lens-wrap"`);
  const modeSwitch = localize(language => `<button type="button" data-resume-mode="human" aria-pressed="true" disabled><span class="resume-mode-icon" aria-hidden="true">🧑</span> <span data-mode-label="human">${e(copy[language].modeHuman)}</span></button><button type="button" data-resume-mode="agent" aria-pressed="false" disabled><span class="resume-mode-icon" aria-hidden="true">🤖</span> <span data-mode-label="agent">${e(copy[language].modeAgent)}</span></button>`, "div", `class="resume-view-modes" role="group" aria-label="${e(copy.en.modeSwitch)}"`);

  return `<a class="resume-skip" href="#content">${localize(language => e(copy[language].skip), "span")}</a>
<header class="resume-header"><div class="resume-header-inner"><a class="resume-logo" href="#top">${e(profile.identity.shortName)}</a>
<nav id="resume-navigation" class="resume-navigation" aria-label="Main navigation / 主要導覽">${nav}</nav>
<div class="resume-reading-controls" data-js-control>${lensSelector}${modeSwitch}<div class="resume-languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-resume-language="en" aria-pressed="true" disabled>EN</button><button type="button" data-resume-language="zh-TW" aria-pressed="false" disabled>繁體</button></div><button type="button" data-resume-theme aria-label="Switch to dark theme" disabled><span aria-hidden="true">◐</span></button><button type="button" class="resume-menu" data-resume-menu aria-label="Menu" aria-expanded="false" aria-controls="resume-navigation" disabled><span aria-hidden="true">☰</span></button></div></div></header>
<main id="content" class="resume-main" tabindex="-1">
<section class="resume-hero" id="top">${localize(language => `<p class="resume-role">${e(profile.identity.role)}</p><h1>${e(profile.identity.shortName)}</h1><p class="resume-full-name">${e(profile.identity.name)}</p><p class="resume-lead">${e(copy[language].lead)}</p><p class="resume-note">${e(copy[language].context)}</p><ul class="resume-chips">${profile.professional.map(item => item.metric ? metric(item, language) : item.system ? copy[language].cameraChip.replaceAll("{cameraPairs}", String(item.system.cameraPairs)) : "").filter(Boolean).map(text => `<li>${e(text)}</li>`).join("")}</ul><div class="resume-actions">${cvAction(language)}<a class="resume-button resume-button-secondary" href="#contact">${e(copy[language].contact)}</a></div>`)}</section>
<section id="professional-proof" class="resume-section resume-proof-section">${localize(language => `<h2>${e(copy[language].proofHeading)}</h2><p class="resume-section-intro">${e(copy[language].proofIntro)}</p>`)}${universalFrameworkCard}<div class="resume-focal-stack">${proof}</div>${localize(language => `<a class="resume-small-link" href="#experience">${e(copy[language].careerLink)} <span aria-hidden="true">↓</span></a>`)}</section>
<section id="projects" class="resume-section">${localize(language => `<h2>${e(copy[language].workHeading)}</h2><p class="resume-section-intro">${e(copy[language].focus)}</p><p class="resume-note">${e(copy[language].snapshot)}</p>`)}<div class="resume-focal-stack">${featured}</div><div class="resume-more-work">${localize(language => `<p><span class="resume-note">${e(copy[language].moreWork)}</span> · ${profile.entry.moreProjectIds.map(id => `<a data-resume-case href="${e(caseHref(id, language))}">${e(projects.get(id).title)}</a> — ${e(blurbs.get(id)[language].summary)}`).join(" · ")}</p>${notes ? `<p><a data-resume-notes href="${e(prefix)}/engineering-notes.html?lang=${language}">${e(notes.copy[language].entry)} →</a></p>` : ""}`)}</div></section>
<section id="experience" class="resume-section">${localize(language => `<h2>${e(copy[language].experienceHeading)}</h2><p class="resume-section-intro">${e(copy[language].experienceIntro)}</p>`)}${professional}</section>
<section id="about" class="resume-section resume-about">${localize(language => `<h2>${e(copy[language].aboutHeading)}</h2><p class="resume-section-intro">${e(copy[language].about)}</p>`)}
<details class="resume-detail" id="skills" open><summary>${localize(language => e(copy[language].skillsHeading), "span")}</summary><ul class="resume-skills">${skills}</ul></details>
<details class="resume-detail" id="education"><summary>${localize(language => e(copy[language].educationHeading), "span")}</summary>${education}</details>
<details class="resume-detail"><summary>${localize(language => e(copy[language].researchHeading), "span")}</summary>${research}</details>
<details class="resume-detail" id="life-devotions"><summary>${localize(language => e(copy[language].personalHeading), "span")}</summary>${localize(language => `<p>${e(copy[language].personal)}</p>`)}</details></section>
<section id="contact" class="resume-section resume-contact">${localize(language => `<h2>${e(copy[language].contactHeading)}</h2><p class="resume-section-intro">${e(copy[language].contactLead)}</p><div class="resume-contact-links"><a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a><a href="${e(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">${e(copy[language].linkedin)} <span aria-hidden="true">↗</span></a><a href="${e(profile.contact.github)}" target="_blank" rel="noopener noreferrer">${e(copy[language].github)} <span aria-hidden="true">↗</span></a></div><div class="resume-actions">${cvAction(language)}<a href="${e(cvHref(language === "en" ? "zh-TW" : "en"))}" data-resume-cv download>${e(copy[language].cvOther)}</a></div>`)}</section>
</main><footer class="resume-footer">${localize(language => `<p>${e(copy[language].footer)}</p><p data-save-actions><a href="${e(prefix)}/resume-overview.html" download="blake-lin-resume-overview.html" data-save-overview>${e(copy[language].save)}</a> <span>· <a href="${e(prefix)}/blake-lin-application-preview.zip" download="blake-lin-application-preview.zip" data-save-package>${e(copy[language].savePackage)}</a></span></p><p class="resume-note" data-save-scope>${e((notes?.copy[language] || copy[language]).saveScope)}</p><p class="resume-note" data-package-scope>${e((notes?.copy[language] || copy[language]).offlineScope)}</p>`)}<noscript><p>${localize(language => e(copy[language].noJs), "span")}</p></noscript></footer>`;
}
