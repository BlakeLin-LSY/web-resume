import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Critical-Link & Invariant Engine SVG Generator
 * Represents the fundamental engineering model:
 * [Problem & Scope] -> [First-Principles Critical-Link Piercing] -> [Deterministic Yields]
 * Perfectly bounded 880x360 layout with zero text overflow, ample internal padding,
 * and high-contrast metrology HUD aesthetic.
 */
export function renderUniversalEngineSvg(language = "en") {
  const e = escapeHtml;
  const isEn = language === "en";

  const kickerA = isEn ? "A(IN): PROBLEM & SCOPE" : "A(IN): 問題定義與邊界";
  const kickerEngine = isEn ? "X: CRITICAL-LINK ENGINE" : "X: 關鍵弱鏈擊穿核心";
  const kickerB = isEn ? "B(OUT): VALUE DELIVERY" : "B(OUT): 確定性價值交付";

  const inputs = isEn ? [
    { title: "Sensor Clocks & Jitter", sub: "24 Cams Async · Metrology Drift" },
    { title: "Compute Starvation & Stall", sub: "DataLoader I/O Serialization" },
    { title: "Epistemic Drift & Bloom", sub: "Recursive Context Expansion" },
    { title: "In-Place Destructive Writes", sub: "Unchecked Mutations · Audio TFX" }
  ] : [
    { title: "感測器時序競爭與微秒抖動", sub: "24 顆相機非同步觸發 · MetGauge" },
    { title: "算力飢餓與反序列化阻塞", sub: "I/O 延遲拖垮 GPU · DynaSafe" },
    { title: "認知邊界迷航與上下文膨脹", sub: "多 Agent 遞迴發散 · Study-Atlas" },
    { title: "黑箱模型破壞性原地覆寫", sub: "語音切片無狀態審計 · TFX 管線" }
  ];

  const coreStages = isEn ? [
    {
      num: "01",
      name: "First-Principles Framing",
      line1: "Isolate true boundary conditions",
      line2: "& fundamental system constraints."
    },
    {
      num: "02",
      name: "Pierce Critical Weak Link",
      line1: "Break rate-limiting bottlenecks via",
      line2: "lockless ring buffers & zero-copy IPC."
    },
    {
      num: "03",
      name: "Enforce Invariant Gates",
      line1: "Enforce formal circuit-breakers,",
      line2: "type-safe contracts & SHA seals."
    }
  ] : [
    {
      num: "01",
      name: "第一性問題定義與邊界剖析",
      line1: "剝離表象雜訊與假性需求，精準界定",
      line2: "物理邊界條件、自由度與底層約束。"
    },
    {
      num: "02",
      name: "手術刀式擊穿最弱限速環節",
      line1: "鎖定唯一系統限速阻抗，以無鎖",
      line2: "環形佇列、零拷貝 IPC 與對抗破局。"
    },
    {
      num: "03",
      name: "錨定確定性守恆不變量閘門",
      line1: "注入自動斷路熔斷器、型別安全意圖",
      line2: "合約與 SHA-256 密碼學防偽封籤。"
    }
  ];

  const yields = isEn ? [
    { title: "Sub-μs Hardware Sync", metric: "Zero-Drop Metrology Pass" },
    { title: "Training Data-Path Optimization", metric: "~10x Training Acceleration" },
    { title: "Budget & Drift Convergence", metric: "100% Intent Fidelity · Capped" },
    { title: "Source Audio Dual-Storage", metric: "Immutable Audio & Non-Destructive Flow" }
  ] : [
    { title: "次微秒級確定性同步", metric: "工廠 0 掉幀 · 物理量測過關" },
    { title: "訓練資料載入管線優化", metric: "約 10 倍訓練加速 · 消除 GPU 飢餓" },
    { title: "認知邊界收斂與防漂移", metric: "100% 意圖保真 · TALK 成本鎖定" },
    { title: "來源音訊雙層儲存架構", metric: "原始音訊防篡改 · 無損清理檢驗" }
  ];

  return `<div class="resume-svg-wrapper">
  <svg class="resume-svg-diagram resume-universal-engine-svg" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(isEn ? "First-Principles Problem-Solving Engine A to B Architecture" : "第一性工程求解引擎 A 到 B 架構圖")}" style="font-family:var(--resume-font,system-ui,-apple-system,sans-serif)">
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
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4fac74" />
      </marker>
    </defs>

    <!-- COLUMN A: Problem & Scope Inputs (width 242) -->
    <g class="ue-group-inputs" transform="translate(14, 14)">
      <!-- Column Header -->
      <rect x="0" y="0" width="242" height="26" rx="5" fill="var(--resume-tint)" stroke="var(--resume-border)" stroke-width="1" />
      <circle cx="12" cy="13" r="4" fill="#d2655b" />
      <text x="24" y="17" font-size="9.5" font-weight="800" fill="var(--resume-text)" letter-spacing="0.04em">${e(kickerA)}</text>

      ${inputs.map((item, idx) => {
        const y = 36 + idx * 72;
        return `
        <!-- Input Capsule ${idx + 1} -->
        <g class="ue-input-card" transform="translate(0, ${y})">
          <rect x="0" y="0" width="242" height="62" rx="8" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1.2" />
          <rect x="0" y="0" width="3.5" height="62" rx="1.5" fill="#d2655b" />
          <text x="14" y="24" font-size="11.5" font-weight="700" fill="var(--resume-text)">${e(item.title)}</text>
          <text x="14" y="44" font-size="9.5" font-weight="500" fill="var(--resume-muted)">${e(item.sub)}</text>
          <circle cx="230" cy="31" r="3" fill="#d2655b" />
        </g>`;
      }).join("")}
    </g>

    <!-- CONVERGENCE FLOW LINES (A -> Engine, 256 -> 292) -->
    <g class="ue-converge-wires" fill="none">
      <path d="M 256 81 C 275 81, 280 110, 292 110" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 256 153 C 275 153, 280 140, 292 140" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 256 225 C 275 225, 280 205, 292 205" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
      <path d="M 256 297 C 275 297, 280 235, 292 235" stroke="url(#ue-wire-in)" stroke-width="1.8" marker-end="url(#ue-arrow-in)" />
    </g>

    <!-- COLUMN CENTER: Blake's Critical-Link Engine (The Focal Chamber, width 284) -->
    <g class="ue-group-engine" transform="translate(298, 14)">
      <!-- Chamber Frame -->
      <rect x="0" y="0" width="284" height="332" rx="14" fill="url(#ue-engine-bg)" stroke="var(--resume-accent)" stroke-width="2" />
      <rect x="0" y="0" width="284" height="332" rx="14" fill="url(#ue-core-glow)" pointer-events="none" />
      
      <!-- Chamber Header Pill -->
      <rect x="12" y="10" width="260" height="26" rx="6" fill="var(--resume-accent)" />
      <text x="142" y="27" font-size="9.5" font-weight="800" fill="var(--resume-action-text)" letter-spacing="0.05em" text-anchor="middle">⚡ ${e(kickerEngine)}</text>

      ${coreStages.map((stage, idx) => {
        const y = 44 + idx * 82;
        const isMiddle = idx === 1;
        return `
        <!-- Core Stage ${idx + 1} -->
        <g class="ue-stage-box" transform="translate(12, ${y})">
          <rect x="0" y="0" width="260" height="74" rx="8" fill="var(--resume-panel)" stroke="${isMiddle ? "var(--resume-accent)" : "var(--resume-border)"}" stroke-width="${isMiddle ? "2" : "1.2"}" />
          ${isMiddle ? `<rect x="0" y="0" width="4" height="74" fill="var(--resume-accent)" rx="2" />` : ""}
          <text x="14" y="22" font-size="11.5" font-weight="800" fill="${isMiddle ? "var(--resume-accent)" : "var(--resume-text)"}">
            <tspan fill="var(--resume-muted)" font-size="10" font-family="monospace">${e(stage.num)} · </tspan>${e(stage.name)}
          </text>
          <text x="14" y="42" font-size="9.5" font-weight="500" fill="var(--resume-text)" opacity="0.9">${e(stage.line1)}</text>
          <text x="14" y="58" font-size="9.5" font-weight="500" fill="var(--resume-muted)">${e(stage.line2)}</text>
        </g>
        ${idx < 2 ? `<line x1="142" y1="${y + 74}" x2="142" y2="${y + 82}" stroke="var(--resume-accent)" stroke-width="2" stroke-dasharray="2 2" />` : ""}
        `;
      }).join("")}

      <!-- Chamber Status Indicator -->
      <g transform="translate(14, 298)">
        <circle cx="6" cy="6" r="3" fill="#4fac74" />
        <text x="16" y="10" font-size="8.8" font-weight="700" fill="var(--resume-muted)" font-family="monospace">${isEn ? "FIRST-PRINCIPLES CONVERGENCE LOCKED" : "第一性原理收斂不變量鎖定"}</text>
      </g>
    </g>

    <!-- DIVERGENCE FLOW LINES (Engine -> B, 582 -> 618) -->
    <g class="ue-diverge-wires" fill="none">
      <path d="M 582 110 C 596 110, 604 81, 618 81" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 582 140 C 596 140, 604 153, 618 153" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 582 205 C 596 205, 604 225, 618 225" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
      <path d="M 582 235 C 596 235, 604 297, 618 297" stroke="url(#ue-wire-out)" stroke-width="1.8" marker-end="url(#ue-arrow-out)" />
    </g>

    <!-- COLUMN B: Value Delivery (width 242) -->
    <g class="ue-group-yields" transform="translate(624, 14)">
      <!-- Column Header -->
      <rect x="0" y="0" width="242" height="26" rx="5" fill="var(--resume-tint)" stroke="var(--resume-border)" stroke-width="1" />
      <circle cx="12" cy="13" r="4" fill="#4fac74" />
      <text x="24" y="17" font-size="9.5" font-weight="800" fill="var(--resume-text)" letter-spacing="0.04em">${e(kickerB)}</text>

      ${yields.map((item, idx) => {
        const y = 36 + idx * 72;
        return `
        <!-- Yield Capsule ${idx + 1} -->
        <g class="ue-yield-card" transform="translate(0, ${y})">
          <rect x="0" y="0" width="242" height="62" rx="8" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1.2" />
          <rect x="0" y="0" width="3.5" height="62" rx="1.5" fill="#4fac74" />
          <text x="14" y="24" font-size="11.5" font-weight="700" fill="var(--resume-text)">
            <tspan fill="#4fac74" font-weight="800">✓ </tspan>${e(item.title)}
          </text>
          <text x="14" y="44" font-size="9.5" font-weight="700" fill="var(--resume-accent)">${e(item.metric)}</text>
        </g>`;
      }).join("")}
    </g>
  </svg>
</div>`;
}
