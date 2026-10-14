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

  const kickerA = isEn ? "A(IN): PROBLEM & SCOPE FRAMING" : "A(IN): 問題定義與邊界框定";
  const kickerEngine = isEn ? "X: ADAPTIVE MINDSETS & CRITICAL-LINK HACKING" : "X: 自適應心智與關鍵弱鏈擊穿";
  const kickerB = isEn ? "B(OUT): DETERMINISTIC VALUE DELIVERY" : "B(OUT): 高價值確定性交付";

  const inputs = isEn ? [
    { title: "Sensor Clocks & Jitter", sub: "24 Cams Async · Metrology Boundary" },
    { title: "Compute Starvation & I/O Stall", sub: "Deserialization Drag · DynaSafe Pipeline" },
    { title: "Epistemic Drift & Bloom", sub: "Recursive Context · Atlas Agent Mesh" },
    { title: "Destructive In-Place Mutation", sub: "Unchecked ASR Overwrites · TFX Pipeline" }
  ] : [
    { title: "感測器時序競爭與微秒抖動", sub: "24 顆相機非同步觸發 · MetGauge" },
    { title: "算力飢餓與反序列化阻塞", sub: "I/O 延遲拖垮 GPU · DynaSafe" },
    { title: "認知邊界迷航與上下文膨脹", sub: "多 Agent 遞迴發散 · Study-Atlas" },
    { title: "黑箱模型破壞性原地覆寫", sub: "語音切片無狀態審計 · Transcribe-for-X" }
  ];

  const coreStages = isEn ? [
    {
      num: "01",
      name: "First-Principles Framing",
      line1: "Strip surface noise & isolate true boundary",
      line2: "conditions, degrees of freedom & constraints."
    },
    {
      num: "02",
      name: "Pierce Critical Weak Link",
      line1: "Surgically re-architect rate-limiting bottleneck",
      line2: "via lockless ring buffers, zero-copy IPC & duels."
    },
    {
      num: "03",
      name: "Enforce Invariant Gates",
      line1: "Lock down formal circuit breakers, type-safe",
      line2: "intent contracts & cryptographic SHA-256 seals."
    }
  ] : [
    {
      num: "01",
      name: "第一性問題定義與邊界剖析",
      line1: "剝離表象雜訊與假性需求，精準界定",
      line2: "物理邊界條件、系統自由度與底層約束。"
    },
    {
      num: "02",
      name: "手術刀式擊穿最弱限速環節",
      line1: "鎖定唯一的系統限速阻抗，以無鎖",
      line2: "環形佇列、零拷貝 IPC 與對抗防線破局。"
    },
    {
      num: "03",
      name: "錨定確定性守恆不變量閘門",
      line1: "注入自動斷路熔斷器、型別安全意圖",
      line2: "合約與 SHA-256 密碼學防偽封籤。"
    }
  ];

  const yields = isEn ? [
    { title: "Sub-μs Hardware Sync", metric: "Zero-Drop Metrology Invariant Pass" },
    { title: "10× Training Throughput", metric: "Hardware Saturated · Zero Capex" },
    { title: "Budget & Drift Convergence", metric: "100% Intent Fidelity · TALK 1.8 Capped" },
    { title: "Immutable Ground Truth", metric: "Zero Data Loss · Cryptographic Seals" }
  ] : [
    { title: "次微秒級確定性同步", metric: "工廠 0 掉幀 · 物理公差量測通過" },
    { title: "10× 訓練吞吐極限釋放", metric: "同等硬體飽和，零設備增購支出" },
    { title: "認知邊界收斂與防漂移", metric: "100% 意圖保真 · TALK 1.8 成本鎖定" },
    { title: "底層真理數據零滅失保證", metric: "不可變快照與 SHA-256 數位封籤" }
  ];

  return `<div class="resume-svg-wrapper">
  <svg class="resume-svg-diagram resume-universal-engine-svg" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(isEn ? "First-Principles Problem-Solving Engine A to B Architecture" : "第一性工程求解引擎 A 到 B 架構圖")}">
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
          <text x="12" y="44" font-size="10" font-weight="500" fill="var(--resume-text)" opacity="0.9">${e(stage.line1)}</text>
          <text x="12" y="60" font-size="10" font-weight="500" fill="var(--resume-muted)">${e(stage.line2)}</text>
        </g>
        ${idx < 2 ? `<line x1="136" y1="${y + 78}" x2="136" y2="${y + 90}" stroke="var(--resume-accent)" stroke-width="2" stroke-dasharray="2 2" />` : ""}
        `;
      }).join("")}

      <!-- Chamber Status Indicator -->
      <g transform="translate(12, 308)">
        <circle cx="6" cy="6" r="3" fill="#4fac74" />
        <text x="16" y="10" font-size="9" font-weight="700" fill="var(--resume-muted)" font-family="monospace">${isEn ? "FIRST-PRINCIPLES CONVERGENCE LOCKED" : "第一性原理收斂不變量鎖定"}</text>
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
