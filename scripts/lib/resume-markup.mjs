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

const triadData = {
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
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${isEn ? "Pipeline Architecture" : "資料管線架構"}</span>
        <span class="resume-diagram-badge">${isEn ? "10× Model-Training Speed" : "10× 模型訓練速度提升"}</span>
      </div>
      <strong class="resume-diagram-title">${isEn ? "DataLoader I/O Bottleneck vs. Rebuilt Streaming Pipeline" : "資料載入 I/O 序列化阻塞 vs. 重建串流管線對照"}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 160" role="img" aria-label="DataLoader Bottleneck vs Rebuilt Pipeline">
        <defs>
          <marker id="arrow-dyna" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" class="resume-arrow-head"/>
          </marker>
          <marker id="arrow-dyna-alert" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" fill="#c25953"/>
          </marker>
        </defs>

        <!-- Lane 1: Baseline (Unoptimized) -->
        <g class="resume-node-group">
          <rect x="10" y="14" width="180" height="60" rx="8" class="resume-node-box"/>
          <rect x="18" y="20" width="80" height="16" rx="4" class="resume-node-pill"/>
          <text x="58" y="31" class="resume-pill-text" text-anchor="middle">${isEn ? "BASELINE" : "優化前基準"}</text>
          <text x="100" y="50" class="resume-node-title" text-anchor="middle">PyTorch DataLoader</text>
          <text x="100" y="65" class="resume-node-detail" text-anchor="middle">${isEn ? "Synchronous IPC Pipe" : "同步處理序間管線 (IPC)"}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="44" x2="239" y2="44" class="resume-flow-line resume-flow-alert" marker-end="url(#arrow-dyna-alert)"/>
          <text x="215" y="38" class="resume-flow-label resume-text-alert" text-anchor="middle">${isEn ? "I/O Stall" : "I/O 阻塞"}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="14" width="310" height="60" rx="8" class="resume-node-box resume-node-alert"/>
          <text x="395" y="42" class="resume-node-title resume-text-alert" text-anchor="middle">${isEn ? "GPU Idle Starvation (88% Waiting)" : "GPU 閒置飢餓 (88% 處於等待)"}</text>
          <text x="395" y="60" class="resume-node-detail" text-anchor="middle">${isEn ? "CFD Training Compute Stalled" : "CFD 訓練計算資源停滯"}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="44" x2="589" y2="44" class="resume-flow-line" marker-end="url(#arrow-dyna)"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="14" width="160" height="60" rx="8" class="resume-node-box"/>
          <text x="670" y="42" class="resume-node-title" text-anchor="middle">${isEn ? "1× Baseline" : "1× 基準吞吐"}</text>
          <text x="670" y="60" class="resume-node-detail" text-anchor="middle">${isEn ? "Unoptimized Rate" : "未優化訓練速率"}</text>
        </g>

        <!-- Lane 2: Rebuilt & Optimized -->
        <g class="resume-node-group">
          <rect x="10" y="86" width="180" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="18" y="92" width="80" height="16" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="58" y="103" class="resume-pill-text" text-anchor="middle">${isEn ? "REBUILT" : "重構管線"}</text>
          <text x="100" y="122" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Data Pipeline" : "非同步資料管線"}</text>
          <text x="100" y="137" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "PhysicsNeMo Format Loader" : "PhysicsNeMo 格式轉換載入器"}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="116" x2="239" y2="116" class="resume-flow-line" marker-end="url(#arrow-dyna)"/>
          <text x="215" y="110" class="resume-flow-label resume-stat-green" text-anchor="middle">${isEn ? "Continuous" : "持續串流"}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="86" width="310" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="395" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Continuous GPU Saturation" : "GPU 連續滿載運算"}</text>
          <text x="395" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Zero Starvation Stalls · Compute Bound" : "零飢餓阻塞 · 達計算極限"}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="116" x2="589" y2="116" class="resume-flow-line" marker-end="url(#arrow-dyna)"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="86" width="160" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="670" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "⚡ 10× Speedup" : "⚡ 10× 加速倍率"}</text>
          <text x="670" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Verified Model Training" : "實測模型訓練端到端驗證"}</text>
        </g>
      </svg>
    </div>

    <p class="resume-diagram-caption">${isEn ? "Profiled DataLoader I/O bottleneck starving GPU during CFD training. Rebuilt training data pipeline and custom format loader, achieving 10× overall model-training speed." : "分析 PyTorch DataLoader 瓶頸，追查 GPU 在 CFD 訓練期間的閒置飢餓根因。重建資料載入與格式轉換管線，實現模型訓練速度提升 10 倍。"}</p>
  </div>`;
}

function dynaSafeAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <div class="resume-ir-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="resume-ir-tab">dynasafe_pipeline_ast.json</span>
      <span class="resume-ir-badge">AST / Metric Spec</span>
    </div>
    <pre><code><span class="ir-keyword">MetricAST</span> {
  <span class="ir-prop">"id"</span>: <span class="ir-str">"dynasafe-training-throughput"</span>,
  <span class="ir-prop">"employer"</span>: <span class="ir-str">"DynaSafe Corp."</span>,
  <span class="ir-prop">"role"</span>: <span class="ir-str">"Senior AI Engineer"</span>,
  <span class="ir-prop">"metric"</span>: {
    <span class="ir-prop">"type"</span>: <span class="ir-str">"training-speed-factor"</span>,
    <span class="ir-prop">"value"</span>: <span class="ir-num">10.0</span>,
    <span class="ir-prop">"claim"</span>: <span class="ir-str">"10x model-training speed"</span>
  },
  <span class="ir-prop">"workloads"</span>: [
    <span class="ir-str">"Nvidia Morpheus network-anomaly detection with real PCAP input"</span>,
    <span class="ir-str">"PhysicsNeMo training workflow adaptation for an OpenFOAM CFD use case"</span>
  ],
  <span class="ir-prop">"root_cause_analysis"</span>: <span class="ir-str">"DataLoader bottleneck causing GPU compute starvation"</span>,
  <span class="ir-prop">"engineering_action"</span>: <span class="ir-str">"Rebuilt training data pipeline and custom loader format conversion"</span>,
  <span class="ir-prop">"boundary"</span>: <span class="ir-str">"Measures overall model-training speed"</span>
}</code></pre>
  </div>`;
}

function metGaugeVisual(e, language) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${isEn ? "System Topology" : "系統架構拓撲"}</span>
        <span class="resume-diagram-badge">${isEn ? "12 Stereo Pairs · Factory Testing" : "12 組立體相機 · 工廠上線前測試"}</span>
      </div>
      <strong class="resume-diagram-title">${isEn ? "12-Stereo-Camera Production Line Inspection Topology" : "12 組立體相機產線檢測拓撲與軟硬體整合"}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 160" role="img" aria-label="${isEn ? "12-Stereo-Camera Inspection Topology" : "12 組立體相機產線檢測拓撲"}">
        <defs>
          <marker id="arrow-refined" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" class="resume-arrow-head"/>
          </marker>
        </defs>

        <!-- Stage 1: Optical Sensors -->
        <g class="resume-node-group">
          <rect x="10" y="14" width="165" height="132" rx="8" class="resume-node-box"/>
          <rect x="18" y="22" width="85" height="18" rx="4" class="resume-node-pill"/>
          <text x="60" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "SENSOR ARRAY" : "感測陣列"}</text>
          <text x="92" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "12 Stereo Pairs" : "12 組立體相機對"}</text>
          <text x="92" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "24 Industrial Cameras" : "24 顆工業相機"}</text>
          <line x1="25" y1="92" x2="160" y2="92" class="resume-node-divider"/>
          <text x="92" y="110" class="resume-node-detail" text-anchor="middle">${isEn ? "Automated Production Line" : "自動化製造產線"}</text>
          <text x="92" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "GigE Multi-Camera Staging" : "GigE 多相機同步配置"}</text>
        </g>

        <!-- Connector 1 -->
        <g class="resume-connector">
          <line x1="175" y1="80" x2="209" y2="80" class="resume-flow-line" marker-end="url(#arrow-refined)"/>
          <text x="192" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Trigger" : "硬體觸發"}</text>
        </g>

        <!-- Stage 2: Hardware Sync -->
        <g class="resume-node-group">
          <rect x="210" y="14" width="155" height="132" rx="8" class="resume-node-box"/>
          <rect x="218" y="22" width="95" height="18" rx="4" class="resume-node-pill"/>
          <text x="265" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "HARDWARE BUS" : "硬體匯流排"}</text>
          <text x="287" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "Hardware Sync" : "硬體同步機制"}</text>
          <text x="287" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "GPIO Trigger Bus" : "GPIO 觸發匯流排"}</text>
          <line x1="225" y1="92" x2="350" y2="92" class="resume-node-divider"/>
          <text x="287" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Deterministic Frame Lock" : "精準鎖定每幀曝光"}</text>
          <text x="287" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Zero Frame Drift" : "零幀漂移與丟失"}</text>
        </g>

        <!-- Connector 2 -->
        <g class="resume-connector">
          <line x1="365" y1="80" x2="399" y2="80" class="resume-flow-line" marker-end="url(#arrow-refined)"/>
          <text x="382" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Stream" : "影像串流"}</text>
        </g>

        <!-- Stage 3: 3D Engine -->
        <g class="resume-node-group">
          <rect x="400" y="14" width="170" height="132" rx="8" class="resume-node-box"/>
          <rect x="408" y="22" width="90" height="18" rx="4" class="resume-node-pill"/>
          <text x="453" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "3D ENGINE" : "3D 量測引擎"}</text>
          <text x="485" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "3D Measurement" : "3D 空間量測"}</text>
          <text x="485" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "C++ / Python Engine" : "C++ / Python 核心引擎"}</text>
          <line x1="415" y1="92" x2="555" y2="92" class="resume-node-divider"/>
          <text x="485" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Calibration & Boundary Tests" : "標定與邊界極限測試"}</text>
          <text x="485" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Guides Hardware Tuning" : "指引光機硬體校正"}</text>
        </g>

        <!-- Connector 3 -->
        <g class="resume-connector">
          <line x1="570" y1="80" x2="604" y2="80" class="resume-flow-line" marker-end="url(#arrow-refined)"/>
          <text x="587" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Point Cloud" : "點雲輸出"}</text>
        </g>

        <!-- Stage 4: Factory Testing Pass -->
        <g class="resume-node-group">
          <rect x="605" y="14" width="145" height="132" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="613" y="22" width="90" height="18" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="658" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "FACTORY READY" : "產線就緒"}</text>
          <text x="677" y="60" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Factory Testing" : "工廠上線測試"}</text>
          <text x="677" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "Production Line Pass" : "產線驗證過關"}</text>
          <line x1="620" y1="92" x2="735" y2="92" class="resume-node-divider"/>
          <text x="677" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "MVP Prototype → Line" : "原型邁向產線整合"}</text>
          <text x="677" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Pre-Launch Tested" : "量產前完成實測"}</text>
        </g>
      </svg>
    </div>

    <p class="resume-diagram-caption">${isEn ? "Advanced C++/Python 3D-measurement prototype to factory-ready production testing on an automated line with 12 stereo-camera pairs (24 cameras). Led system design, hardware integration, and boundary testing." : "負責 12 組立體相機（24 顆相機）產線的系統架構設計、軟硬體整合與邊界測試。將 C++／Python 3D 量測原型推進至工廠上市前的產線上線測試階段。"}</p>
  </div>`;
}

function metGaugeAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <div class="resume-ir-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="resume-ir-tab">metgauge_stereo_topology.ast.json</span>
      <span class="resume-ir-badge">Topology & Invariant Spec</span>
    </div>
    <pre><code><span class="ir-keyword">StereoTopologyAST</span> {
  <span class="ir-prop">"id"</span>: <span class="ir-str">"metgauge-production-line"</span>,
  <span class="ir-prop">"employer"</span>: <span class="ir-str">"MetGauge Co., Ltd."</span>,
  <span class="ir-prop">"role"</span>: <span class="ir-str">"Software Engineer"</span>,
  <span class="ir-prop">"system"</span>: {
    <span class="ir-prop">"camera_pairs"</span>: <span class="ir-num">12</span>,
    <span class="ir-prop">"total_cameras"</span>: <span class="ir-num">24</span>,
    <span class="ir-prop">"environment"</span>: <span class="ir-str">"Automated factory production line"</span>
  },
  <span class="ir-prop">"milestone_reached"</span>: <span class="ir-str">"MVP prototype -> factory-ready production testing"</span>,
  <span class="ir-prop">"engineering_scope"</span>: [
    <span class="ir-str">"System architecture design"</span>,
    <span class="ir-str">"Hardware-software trigger integration"</span>,
    <span class="ir-str">"Boundary testing & test specification definition"</span>,
    <span class="ir-str">"Cross-functional hardware tuning"</span>
  ],
  <span class="ir-prop">"boundary"</span>: <span class="ir-str">"Stage reached: production testing before product launch"</span>
}</code></pre>
  </div>`;
}

function atlasVisual(e, language, copy) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${isEn ? "Guardrail Pipeline" : "預算閘門管線"}</span>
        <span class="resume-diagram-badge">${isEn ? "TALK Contract 1.8" : "TALK Contract 1.8 契約"}</span>
      </div>
      <strong class="resume-diagram-title">${isEn ? "Dynamic Circuit-Breaker & Autonomous Rerouting" : "TALK 契約 1.8：預算超支自動熔斷與自主重規劃"}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 170" role="img" aria-label="${isEn ? "TALK Contract 1.8 Budget Guardrail Circuit Breaker" : "TALK 契約 1.8 預算超支熔斷架構"}">
        <defs>
          <marker id="arrow-atlas" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" class="resume-arrow-head"/>
          </marker>
        </defs>

        <!-- Stage 1: Paper AST Input -->
        <g class="resume-node-group">
          <rect x="10" y="24" width="130" height="118" rx="8" class="resume-node-box"/>
          <rect x="18" y="32" width="70" height="18" rx="4" class="resume-node-pill"/>
          <text x="53" y="44" class="resume-pill-text" text-anchor="middle">${isEn ? "SOURCE AST" : "來源 AST"}</text>
          <text x="75" y="70" class="resume-node-title" text-anchor="middle">${isEn ? "Paper AST" : "論文抽象語法樹"}</text>
          <text x="75" y="88" class="resume-node-subtitle" text-anchor="middle">${isEn ? "Extracted Claims" : "萃取論點與主張"}</text>
          <line x1="22" y1="100" x2="128" y2="100" class="resume-node-divider"/>
          <text x="75" y="118" class="resume-node-detail" text-anchor="middle">${isEn ? "Target: Reading Plan" : "目標：精讀規劃"}</text>
        </g>

        <!-- Connector to Gate -->
        <line x1="140" y1="83" x2="174" y2="83" class="resume-flow-line" marker-end="url(#arrow-atlas)"/>

        <!-- Stage 2: Budget Gate -->
        <g class="resume-node-group">
          <rect x="175" y="16" width="155" height="134" rx="8" class="resume-node-box"/>
          <rect x="183" y="24" width="85" height="18" rx="4" class="resume-node-pill"/>
          <text x="225" y="36" class="resume-pill-text" text-anchor="middle">${isEn ? "GATE CHECK" : "預算閘門"}</text>
          <text x="252" y="62" class="resume-node-title" text-anchor="middle">${isEn ? "Budget Gate" : "預算配額控管"}</text>
          <text x="252" y="80" class="resume-node-subtitle" text-anchor="middle">TALK Contract 1.8</text>
          <line x1="188" y1="94" x2="318" y2="94" class="resume-node-divider"/>
          <text x="252" y="112" class="resume-node-detail" text-anchor="middle">${isEn ? "Ceiling: 5.0 TALK" : "上限：5.0 TALK"}</text>
          <text x="252" y="130" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Deterministic Audit" : "確定性預算審計"}</text>
        </g>

        <!-- Branch A (Top): Circuit Breaker Reject -->
        <path d="M 330 65 Q 355 65 375 42" class="resume-flow-line resume-flow-alert" marker-end="url(#arrow-atlas)"/>
        <g class="resume-node-group">
          <rect x="380" y="12" width="175" height="60" rx="6" class="resume-node-box resume-node-alert"/>
          <text x="467" y="32" class="resume-node-title resume-text-alert" text-anchor="middle">${isEn ? "⛔ Plan 1: Deep Survey" : "⛔ 計畫 1：深度全覽"}</text>
          <text x="467" y="48" class="resume-node-detail" text-anchor="middle">${isEn ? "Cost 6.0 > 5.0 Ceiling" : "成本 6.0 > 5.0 上限"}</text>
          <text x="467" y="62" class="resume-node-detail resume-text-alert" text-anchor="middle">${isEn ? "BLOCKED · 0 Tokens Leaked" : "熔斷攔截 · 0 Token 洩漏"}</text>
        </g>

        <!-- Branch B (Bottom): Adaptive Reroute -->
        <path d="M 330 100 Q 355 100 375 118" class="resume-flow-line" marker-end="url(#arrow-atlas)"/>
        <g class="resume-node-group">
          <rect x="380" y="88" width="175" height="66" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="467" y="108" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "⚡ Reroute: T5-Compact" : "⚡ 重規劃：T5-Compact"}</text>
          <text x="467" y="124" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Cost 4.6 < 5.0 Ceiling" : "成本 4.6 < 5.0 上限"}</text>
          <text x="467" y="140" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "APPROVED & EXECUTED" : "批准放行並執行"}</text>
        </g>

        <!-- Connector from Reroute to Output -->
        <path d="M 555 121 Q 575 121 590 85" class="resume-flow-line" marker-end="url(#arrow-atlas)"/>

        <!-- Stage 3: Verified Output -->
        <g class="resume-node-group">
          <rect x="595" y="24" width="155" height="118" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="603" y="32" width="90" height="18" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="648" y="44" class="resume-pill-text" text-anchor="middle">${isEn ? "SYNTHESIS" : "成果合成"}</text>
          <text x="672" y="70" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Bilingual Cards" : "雙語結構卡片"}</text>
          <text x="672" y="88" class="resume-node-subtitle" text-anchor="middle">${isEn ? "Zero Claims Dropped" : "零論點遺漏不變量"}</text>
          <line x1="608" y1="100" x2="738" y2="100" class="resume-node-divider"/>
          <text x="672" y="118" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Anchored Citations" : "錨定論文章節引文"}</text>
        </g>
      </svg>
    </div>

    <!-- Editorial Monograph Proof Leaf -->
    <details class="resume-reader-sample" open>
      <summary class="resume-sample-summary">
        <span class="resume-sample-pill">Monograph Proof Leaf / 雙語成果樣張</span>
        <strong class="resume-sample-title">${e(copy[language].sampleExcerptTitle)}</strong>
      </summary>
      <div class="resume-sample-body">
        <div class="resume-monograph-card">
          <div class="resume-monograph-header">
            <span class="resume-doc-id">DOC: VGGT-ARXIV-2503.11651</span>
            <div class="resume-monograph-tags">
              <span class="resume-badge-route">Route: T5-Compact</span>
              <span class="resume-badge-cost">Cost: 4.6 TALK (Pass)</span>
              <span class="resume-badge-verified">✓ 0-Drop Invariant</span>
            </div>
          </div>
          <div class="resume-monograph-content">
            <div class="resume-proof-leaf resume-leaf-en">
              <span class="resume-leaf-lang">EN (Source Verification)</span>
              <blockquote class="resume-leaf-quote">
                &ldquo;At inference time point maps derived from depth and cameras are more accurate than the direct point-map head (ETH3D: 0.677 vs 0.709 overall error). Multi-task training does not require direct head delivery.&rdquo;
              </blockquote>
              <div class="resume-leaf-anchor">[VGGT Paper Evidence: §4.3, Table 3]</div>
            </div>
            <div class="resume-proof-leaf resume-leaf-zh">
              <span class="resume-leaf-lang">正體中文（忠實對照譯本）</span>
              <blockquote class="resume-leaf-quote">
                &ldquo;推論時由深度與相機反投影得到的點圖比直接點圖頭更準（ETH3D：0.677 vs 0.709 整體誤差）。多任務訓練不要求最終一定使用每個直接輸出。&rdquo;
              </blockquote>
              <div class="resume-leaf-anchor">[VGGT 論文證據標籤：第 4.3 節、表 3]</div>
            </div>
          </div>
          <div class="resume-monograph-footer">
            <span class="resume-hash-seal">TALK Contract 1.8 Seal: SHA-256 <code>0f5e66c74dbd8762f2a90936d238fc72d9939db6396d68d49703645834eeb0d5</code></span>
            <span class="resume-sla-badge">Preserved Artifact: 387,137 bytes</span>
          </div>
        </div>
      </div>
    </details>
  </div>`;
}

function atlasAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <div class="resume-ir-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="resume-ir-tab">talk_contract_v1_8.ir</span>
      <span class="resume-ir-badge">Contract 1.8 DSL & Gate Receipt</span>
    </div>
    <pre><code><span class="ir-keyword">TALK_Contract_1_8</span> {
  <span class="ir-prop">"id"</span>: <span class="ir-str">"study-atlas-talk-contract"</span>,
  <span class="ir-prop">"budget_ceiling_talk"</span>: <span class="ir-num">5.0</span>,
  <span class="ir-prop">"initial_execution_plan"</span>: {
    <span class="ir-prop">"plan_id"</span>: <span class="ir-str">"deep_survey"</span>,
    <span class="ir-prop">"estimated_cost_talk"</span>: <span class="ir-num">6.0</span>,
    <span class="ir-prop">"gate_outcome"</span>: <span class="ir-control">"GATE_CIRCUIT_REJECT"</span>,
    <span class="ir-prop">"action"</span>: <span class="ir-str">"Blocked prior to execution; 0 tokens billed"</span>
  },
  <span class="ir-prop">"adaptive_reroute"</span>: {
    <span class="ir-prop">"plan_id"</span>: <span class="ir-str">"t5_compact"</span>,
    <span class="ir-prop">"actual_cost_talk"</span>: <span class="ir-num">4.6</span>,
    <span class="ir-prop">"gate_outcome"</span>: <span class="ir-verified">"GATE_PROCEED_PERMITTED"</span>
  },
  <span class="ir-prop">"synthesis_routes"</span>: [
    <span class="ir-str">"short_briefing"</span>,
    <span class="ir-str">"in_depth_explanation"</span>
  ],
  <span class="ir-prop">"boundary"</span>: <span class="ir-str">"6.0 -> 4.6 is calculated TALK budget, not measured human reading time or wall-clock acceleration"</span>
}</code></pre>
  </div>`;
}

function tfxVisual(e, language) {
  const isEn = language === "en";
  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${isEn ? "Dual-Track Architecture" : "雙軌保真架構"}</span>
        <span class="resume-diagram-badge">${isEn ? "Zero Data Loss Guarantee" : "零資料滅失保證"}</span>
      </div>
      <strong class="resume-diagram-title">${isEn ? "Immutable Raw Audio vs. User-Approved Speculative Cleanup" : "原始錄音唯讀保真 vs. 顯式確認語意修訂雙軌架構"}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 180" role="img" aria-label="${isEn ? "Transcribe-for-X Dual-Track Architecture" : "Transcribe-for-X 雙軌保真架構"}">
        <defs>
          <marker id="arrow-tfx" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" class="resume-arrow-head"/>
          </marker>
        </defs>

        <!-- Audio Input -->
        <g class="resume-node-group">
          <rect x="10" y="55" width="105" height="70" rx="8" class="resume-node-box"/>
          <text x="62" y="85" class="resume-node-title" text-anchor="middle">${isEn ? "Mic Input" : "麥克風輸入"}</text>
          <text x="62" y="102" class="resume-node-detail" text-anchor="middle">${isEn ? "PCM Audio Stream" : "PCM 原始音訊串流"}</text>
        </g>

        <!-- Central Isolation Barrier -->
        <line x1="125" y1="90" x2="745" y2="90" class="resume-isolation-barrier"/>
        <text x="435" y="86" class="resume-isolation-text" text-anchor="middle">${isEn ? "ZERO-LOSS ISOLATION BOUNDARY · LLM SANDBOXED FROM RAW STORAGE" : "零滅失隔離邊界 · 大型模型與底層原始儲存嚴格沙盒隔離"}</text>

        <!-- Track 1: Immutable (Top) -->
        <path d="M 115 78 Q 135 45 155 45" class="resume-flow-line" marker-end="url(#arrow-tfx)"/>
        <g class="resume-node-group">
          <rect x="160" y="14" width="245" height="62" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="282" y="36" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Track 1: Raw Audio & Whisper ASR" : "軌道 1：原始音訊與 Whisper ASR"}</text>
          <text x="282" y="52" class="resume-node-detail" text-anchor="middle">${isEn ? "Android Private Scoped Storage (Read-Only)" : "Android 專有沙盒儲存（唯讀保護）"}</text>
          <text x="282" y="66" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "🔒 Byte-for-byte immutable archive" : "🔒 逐位元完全不可變封存"}</text>
        </g>

        <line x1="405" y1="45" x2="445" y2="45" class="resume-flow-line" marker-end="url(#arrow-tfx)"/>
        <g class="resume-node-group">
          <rect x="450" y="14" width="165" height="62" rx="6" class="resume-node-box"/>
          <text x="532" y="38" class="resume-node-title" text-anchor="middle">${isEn ? "Permanent Ground Truth" : "永久真實基底 (Ground Truth)"}</text>
          <text x="532" y="56" class="resume-node-detail" text-anchor="middle">${isEn ? "Verbatim Transcript Log" : "逐字稿紀錄與校驗碼"}</text>
        </g>

        <!-- Track 2: Speculative AI Diff (Bottom) -->
        <path d="M 115 102 Q 135 135 155 135" class="resume-flow-line" marker-end="url(#arrow-tfx)"/>
        <g class="resume-node-group">
          <rect x="160" y="104" width="245" height="62" rx="6" class="resume-node-box"/>
          <text x="282" y="126" class="resume-node-title" text-anchor="middle">${isEn ? "Track 2: AI Disfluency Diff Engine" : "軌道 2：AI 口語贅詞差分引擎"}</text>
          <text x="282" y="142" class="resume-node-detail" text-anchor="middle">${isEn ? "Non-destructive candidate text overlays" : "非破壞性候選修訂文字層"}</text>
          <text x="282" y="156" class="resume-node-detail" text-anchor="middle">${isEn ? "Zero in-place file mutation" : "絕無原地複寫檔案風險"}</text>
        </g>

        <line x1="405" y1="135" x2="445" y2="135" class="resume-flow-line" marker-end="url(#arrow-tfx)"/>
        <g class="resume-node-group">
          <rect x="450" y="104" width="165" height="62" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="532" y="126" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "User Checkbox Review" : "使用者逐項核取審閱"}</text>
          <text x="532" y="142" class="resume-node-detail" text-anchor="middle">${isEn ? "Explicit granular opt-in" : "顯式細粒度勾選同意"}</text>
          <text x="532" y="156" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "⚡ Zero blind overwrites" : "⚡ 零未授權自動覆寫"}</text>
        </g>

        <!-- Final Export -->
        <path d="M 615 45 Q 640 45 645 75" class="resume-flow-line"/>
        <path d="M 615 135 Q 640 135 645 105" class="resume-flow-line"/>
        <line x1="645" y1="90" x2="665" y2="90" class="resume-flow-line" marker-end="url(#arrow-tfx)"/>
        <g class="resume-node-group">
          <rect x="670" y="55" width="80" height="70" rx="6" class="resume-node-box"/>
          <text x="710" y="85" class="resume-node-title" text-anchor="middle">${isEn ? "Clean Text" : "乾淨文稿"}</text>
          <text x="710" y="102" class="resume-node-detail" text-anchor="middle">${isEn ? "User Confirmed" : "使用者確認輸出"}</text>
        </g>
      </svg>
    </div>

    <p class="resume-diagram-caption">${isEn ? "Android prototype that saves audio in private scoped storage before running local Whisper ASR. Original transcript is immutable; AI cleanup suggestions are treated as candidate overlays requiring explicit user opt-in." : "Android 原型：先將錄音儲存於專有沙盒空間，再執行本機 Whisper 語音辨識。原始逐字稿嚴格唯讀，AI 口語清理僅作為候選差分層，需由使用者逐項勾選同意才套用。"}</p>
  </div>`;
}

function tfxAgent(e, language) {
  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <div class="resume-ir-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="resume-ir-tab">tfx_scoped_storage.ast.json</span>
      <span class="resume-ir-badge">State Machine & Boundary Spec</span>
    </div>
    <pre><code><span class="ir-keyword">StateMachineAST</span> {
  <span class="ir-prop">"id"</span>: <span class="ir-str">"transcribe-for-x-scoped-storage"</span>,
  <span class="ir-prop">"platform"</span>: <span class="ir-str">"Android prototype"</span>,
  <span class="ir-prop">"storage_sandbox"</span>: <span class="ir-str">"Android_Private_Scoped_Storage"</span>,
  <span class="ir-prop">"zero_loss_invariant"</span>: <span class="ir-str">"Original audio bytes immutable; LLM runs in sandbox"</span>,
  <span class="ir-prop">"ai_cleanup_policy"</span>: <span class="ir-control">"NON_DESTRUCTIVE_CANDIDATE_OVERLAY"</span>,
  <span class="ir-prop">"mutation_gate"</span>: <span class="ir-str">"Item-by-item user checkbox confirmation required; zero blind overwrites"</span>,
  <span class="ir-prop">"boundary"</span>: <span class="ir-str">"Device performance and mixed-language recognition quality still need real-use testing"</span>
}</code></pre>
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
    const triad = triadData[id];
    return `<article class="resume-focal-block" data-proof-id="${id}">${localize(language => {
      const isEn = language === "en";
      const visual = id === "dynasafe" ? dynaSafeVisual(e, language) : id === "metgauge" ? metGaugeVisual(e, language) : "";
      const agent = id === "dynasafe" ? dynaSafeAgent(e, language) : id === "metgauge" ? metGaugeAgent(e, language) : "";
      const kicker = `${e(item.employer)} · ${e(item.title)} · ${e(period(item.start, item.end, language))}`;
      const badge = e(metric(item, language));
      return `<div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item[language].proofTitle)}</h3>
      </div>
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
      </div>`;
    })}</article>`;
  }).join("");

  const featured = profile.entry.projectIds.map(id => {
    const item = projects.get(id), blurb = blurbs.get(id);
    const triad = triadData[id];
    return `<article class="resume-focal-block" data-project-id="${id}">${localize(language => {
      const isEn = language === "en";
      const visual = id === "study-atlas" ? atlasVisual(e, language, copy) : id === "transcribe-for-x" ? tfxVisual(e, language) : "";
      const agent = id === "study-atlas" ? atlasAgent(e, language) : id === "transcribe-for-x" ? tfxAgent(e, language) : "";
      const kicker = e(blurb[language].evidence);
      const badge = id === "study-atlas" ? (isEn ? "TALK 1.8 · 6.0 → 4.6 Calculated Budget" : "TALK 契約 1.8 · 6.0 → 4.6 計算預算") : (isEn ? "Immutable Storage · User-Approved Diff" : "原始音訊唯讀 · 顯式確認修訂");
      return `<div class="resume-block-header">
        <div class="resume-block-meta">
          <span class="resume-block-kicker">${kicker}</span>
          <span class="resume-block-badge">${badge}</span>
        </div>
        <h3 class="resume-block-title">${e(item.title)}</h3>
      </div>
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

  const modeSwitch = localize(language => `<button type="button" data-resume-mode="human" aria-pressed="true" disabled><span class="resume-mode-icon" aria-hidden="true">🧑</span> <span data-mode-label="human">${e(copy[language].modeHuman)}</span></button><button type="button" data-resume-mode="agent" aria-pressed="false" disabled><span class="resume-mode-icon" aria-hidden="true">🤖</span> <span data-mode-label="agent">${e(copy[language].modeAgent)}</span></button>`, "div", `class="resume-view-modes" role="group" aria-label="${e(copy.en.modeSwitch)}"`);

  return `<a class="resume-skip" href="#content">${localize(language => e(copy[language].skip), "span")}</a>
<header class="resume-header"><div class="resume-header-inner"><a class="resume-logo" href="#top">${e(profile.identity.shortName)}</a>
<nav id="resume-navigation" class="resume-navigation" aria-label="Main navigation / 主要導覽">${nav}</nav>
<div class="resume-reading-controls" data-js-control>${modeSwitch}<div class="resume-languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-resume-language="en" aria-pressed="true" disabled>EN</button><button type="button" data-resume-language="zh-TW" aria-pressed="false" disabled>正體</button></div><button type="button" data-resume-theme aria-label="Switch to dark theme" disabled><span aria-hidden="true">◐</span></button><button type="button" class="resume-menu" data-resume-menu aria-label="Menu" aria-expanded="false" aria-controls="resume-navigation" disabled><span aria-hidden="true">☰</span></button></div></div></header>
<main id="content" class="resume-main" tabindex="-1">
<section class="resume-hero" id="top">${localize(language => `<p class="resume-role">${e(profile.identity.role)}</p><h1>${e(profile.identity.shortName)}</h1><p class="resume-full-name">${e(profile.identity.name)}</p><p class="resume-lead">${e(copy[language].lead)}</p><p class="resume-note">${e(copy[language].context)}</p><ul class="resume-chips">${profile.professional.map(item => item.metric ? metric(item, language) : item.system ? copy[language].cameraChip.replaceAll("{cameraPairs}", String(item.system.cameraPairs)) : "").filter(Boolean).map(text => `<li>${e(text)}</li>`).join("")}</ul><div class="resume-actions">${cvAction(language)}<a class="resume-button resume-button-secondary" href="#contact">${e(copy[language].contact)}</a></div>`)}</section>
<section id="professional-proof" class="resume-section resume-proof-section">${localize(language => `<h2>${e(copy[language].proofHeading)}</h2><p class="resume-section-intro">${e(copy[language].proofIntro)}</p>`)}<div class="resume-focal-stack">${proof}</div>${localize(language => `<a class="resume-small-link" href="#experience">${e(copy[language].careerLink)} <span aria-hidden="true">↓</span></a>`)}</section>
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
