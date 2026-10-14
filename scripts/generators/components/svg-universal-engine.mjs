import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Critical-Link & Invariant Engine SVG Generator
 * Represents the fundamental engineering model:
 * [High-Entropy Inputs] -> [Blake's First-Principles Piercing Core] -> [Deterministic Outcomes]
 * Balanced 880x360 layout with legible typography, curved bus flows, and metrology HUD aesthetic.
 */
export function renderUniversalEngineSvg(language = "en") {
  const e = escapeHtml;
  const isEn = language === "en";

  const kickerA = isEn ? "HIGH-ENTROPY INPUTS" : "高熵真實世界輸入";
  const kickerEngine = isEn ? "CRITICAL-LINK & INVARIANT ENGINE" : "關鍵瓶頸擊穿與不變量核心";
  const kickerB = isEn ? "DETERMINISTIC YIELDS" : "確定性高價值產出";

  const inputs = isEn ? [
    { title: "Sensor Jitter & Noise", sub: "24 Cams · Hardware Async" },
    { title: "GPU Compute Starvation", sub: "DataLoader I/O Serialization" },
    { title: "Agent Combinatorial Drift", sub: "Unbounded Recursive Context" },
    { title: "Silent Overwrite Risk", sub: "Destructive In-Place ASR" }
  ] : [
    { title: "感測器時序抖動與雜訊", sub: "24 顆相機非同步觸發 (MetGauge)" },
    { title: "GPU 運算飢餓與 I/O 阻塞", sub: "DataLoader 序列化瓶頸 (DynaSafe)" },
    { title: "多 Agent 遞迴組合漂移", sub: "Token 預算指數級擴散 (Atlas)" },
    { title: "非可逆覆寫資料滅失", sub: "黑箱語音轉錄無審計層 (TFX)" }
  ];

  const coreStages = isEn ? [
    {
      num: "01",
      name: "First-Principles Decomposition",
      desc: "Strip away surface symptoms; isolate root physics and computation limits."
    },
    {
      num: "02",
      name: "Pierce Critical Weakest Link",
      desc: "Re-engineer the single rate-limiting bottleneck via lockless IPC & ring buffers."
    },
    {
      num: "03",
      name: "Enforce Invariant Guard Gates",
      desc: "Embed formal circuit breakers, zero-drift contracts & cryptographic seals."
    }
  ] : [
    {
      num: "01",
      name: "第一性原理邊界剖析",
      desc: "剝離表象雜訊與盲目增購，定位根本物理與計算制約。"
    },
    {
      num: "02",
      name: "穿透關鍵脆弱弱環節",
      desc: "在唯一限速瓶頸處重構拓撲，實作無鎖緩衝與同態校正。"
    },
    {
      num: "03",
      name: "錨定不變量防護閘門",
      desc: "注入確定性斷路熔斷器、型別安全契約與 SHA-256 數位封籤。"
    }
  ];

  const yields = isEn ? [
    { title: "Sub-μs Hardware Sync", metric: "Factory Testing Verified" },
    { title: "10× Training Throughput", metric: "Zero New GPU Capex" },
    { title: "TALK 1.8 Budget Capping", metric: "6.0 → 4.6 Calculated Budget" },
    { title: "Zero Data Loss Guarantee", metric: "Immutable Raw Ground Truth" }
  ] : [
    { title: "次微秒級硬體確定性同步", metric: "工廠產線上線前驗收通過" },
    { title: "10× 訓練模型吞吐提速", metric: "同等硬體下釋放，零資本支出" },
    { title: "TALK 1.8 預算超標熔斷", metric: "6.0 → 4.6 計算成本收斂" },
    { title: "原始資料零滅失保證", metric: "不可變底層真理與顯式確認" }
  ];

  return `<div class="resume-svg-wrapper">
  <svg class="resume-svg-diagram resume-universal-engine-svg" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(isEn ? "Universal Critical-Link Engine A to B Transformation Architecture" : "關鍵瓶頸擊穿引擎 A 到 B 通用轉化架構圖")}">
    <defs>
      <!-- Gradients -->
      <linearGradient id="ue-engine-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--resume-panel)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--resume-tint)" stop-opacity="0.85" />
      </linearGradient>
      <linearGradient id="ue-core-glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--resume-accent)" stop-opacity="0.2" />
        <stop offset="50%" stop-color="var(--resume-accent)" stop-opacity="0.05" />
        <stop offset="100%" stop-color="var(--resume-accent)" stop-opacity="0.2" />
      </linearGradient>
      <linearGradient id="ue-wire-in" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#d2655b" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--resume-accent)" stop-opacity="0.9" />
      </linearGradient>
      <linearGradient id="ue-wire-out" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--resume-accent)" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#4fac74" stop-opacity="0.8" />
      </linearGradient>
      <!-- Arrow Markers -->
      <marker id="ue-arrow-in" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--resume-accent)" />
      </marker>
      <marker id="ue-arrow-out" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#285c4d" />
      </marker>
    </defs>

    <!-- COLUMN A: High-Entropy Inputs -->
    <g class="ue-group-inputs" transform="translate(16, 16)">
      <!-- Column Header -->
      <rect x="0" y="0" width="220" height="26" rx="5" fill="var(--resume-tint)" stroke="var(--resume-border)" stroke-width="1" />
      <circle cx="12" cy="13" r="4" fill="#d2655b" />
      <text x="24" y="17" font-size="10.5" font-weight="800" fill="var(--resume-text)" letter-spacing="0.06em">${e(kickerA)}</text>

      ${inputs.map((item, idx) => {
        const y = 38 + idx * 72;
        return `
        <!-- Input Capsule ${idx + 1} -->
        <g class="ue-input-card" transform="translate(0, ${y})">
          <rect x="0" y="0" width="220" height="60" rx="8" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1.2" />
          <line x1="0" y1="0" x2="4" y2="0" stroke="#d2655b" stroke-width="3" stroke-linecap="round" />
          <text x="12" y="24" font-size="12" font-weight="700" fill="var(--resume-text)">${e(item.title)}</text>
          <text x="12" y="44" font-size="10" font-weight="500" fill="var(--resume-muted)">${e(item.sub)}</text>
          <circle cx="210" cy="30" r="3" fill="#d2655b" />
        </g>`;
      }).join("")}
    </g>

    <!-- CONVERGENCE FLOW LINES (A -> Engine) -->
    <g class="ue-converge-wires" fill="none">
      <path d="M 236 84 C 265 84, 275 120, 298 120" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 236 156 C 265 156, 275 145, 298 145" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 236 228 C 265 228, 275 205, 298 205" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 236 300 C 265 300, 275 240, 298 240" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
    </g>

    <!-- COLUMN CENTER: Blake's Critical-Link Engine (The Focal Chamber) -->
    <g class="ue-group-engine" transform="translate(304, 16)">
      <!-- Chamber Frame -->
      <rect x="0" y="0" width="272" height="328" rx="14" fill="url(#ue-engine-bg)" stroke="var(--resume-accent)" stroke-width="2" />
      <rect x="0" y="0" width="272" height="328" rx="14" fill="url(#ue-core-glow)" pointer-events="none" />
      
      <!-- Chamber Header Pill -->
      <rect x="12" y="12" width="248" height="28" rx="6" fill="var(--resume-accent)" />
      <text x="136" y="30" font-size="10.5" font-weight="800" fill="var(--resume-action-text)" letter-spacing="0.06em" text-anchor="middle">⚡ ${e(kickerEngine)}</text>

      ${coreStages.map((stage, idx) => {
        const y = 52 + idx * 90;
        const isMiddle = idx === 1;
        return `
        <!-- Core Stage ${idx + 1} -->
        <g class="ue-stage-box" transform="translate(12, ${y})">
          <rect x="0" y="0" width="248" height="78" rx="8" fill="var(--resume-panel)" stroke="${isMiddle ? "var(--resume-accent)" : "var(--resume-border)"}" stroke-width="${isMiddle ? "2" : "1.2"}" />
          ${isMiddle ? `<rect x="0" y="0" width="4" height="78" fill="var(--resume-accent)" rx="2" />` : ""}
          <text x="12" y="24" font-size="12.5" font-weight="800" fill="${isMiddle ? "var(--resume-accent)" : "var(--resume-text)"}">
            <tspan fill="var(--resume-muted)" font-size="10.5" font-family="monospace">${e(stage.num)} · </tspan>${e(stage.name)}
          </text>
          <text x="12" y="44" font-size="10" font-weight="500" fill="var(--resume-text)" opacity="0.9">${e(stage.desc.slice(0, isEn ? 40 : 20))}</text>
          <text x="12" y="60" font-size="10" font-weight="500" fill="var(--resume-muted)">${e(stage.desc.slice(isEn ? 40 : 20))}</text>
        </g>
        ${idx < 2 ? `<line x1="136" y1="${y + 78}" x2="136" y2="${y + 90}" stroke="var(--resume-accent)" stroke-width="2" stroke-dasharray="2 2" />` : ""}
        `;
      }).join("")}

      <!-- Chamber Status Indicator -->
      <g transform="translate(12, 308)">
        <circle cx="6" cy="6" r="3" fill="#4fac74" />
        <text x="16" y="10" font-size="9" font-weight="700" fill="var(--resume-muted)" font-family="monospace">CONVERGENCE INVARIANT LOCKED</text>
      </g>
    </g>

    <!-- DIVERGENCE FLOW LINES (Engine -> B) -->
    <g class="ue-diverge-wires" fill="none">
      <path d="M 576 120 C 600 120, 610 84, 638 84" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 576 145 C 600 145, 610 156, 638 156" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 576 205 C 600 205, 610 228, 638 228" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 576 240 C 600 240, 610 300, 638 300" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
    </g>

    <!-- COLUMN B: Deterministic High-Value Outcomes -->
    <g class="ue-group-yields" transform="translate(644, 16)">
      <!-- Column Header -->
      <rect x="0" y="0" width="220" height="26" rx="5" fill="var(--resume-tint)" stroke="var(--resume-border)" stroke-width="1" />
      <circle cx="12" cy="13" r="4" fill="#4fac74" />
      <text x="24" y="17" font-size="10.5" font-weight="800" fill="var(--resume-text)" letter-spacing="0.06em">${e(kickerB)}</text>

      ${yields.map((item, idx) => {
        const y = 38 + idx * 72;
        return `
        <!-- Yield Capsule ${idx + 1} -->
        <g class="ue-yield-card" transform="translate(0, ${y})">
          <rect x="0" y="0" width="220" height="60" rx="8" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1.2" />
          <line x1="216" y1="0" x2="220" y2="0" stroke="#4fac74" stroke-width="3" stroke-linecap="round" />
          <text x="12" y="24" font-size="12" font-weight="700" fill="var(--resume-text)">
            <tspan fill="#285c4d" font-weight="800">✓ </tspan>${e(item.title)}
          </text>
          <text x="12" y="44" font-size="10.5" font-weight="700" fill="var(--resume-accent)">${e(item.metric)}</text>
        </g>`;
      }).join("")}
    </g>
  </svg>
</div>`;
}
