import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Critical-Link & Invariant Engine SVG Generator
 * Illustrates the generic A in -> Blake's Core -> B out transformation model.
 * Responsive, pure-vector SVG adhering to CSS variables and token theming.
 */
export function renderUniversalEngineSvg(language = "en") {
  const e = escapeHtml;
  const isEn = language === "en";

  const kickerA = isEn ? "A IN: HIGH-ENTROPY INPUT" : "A 端：高熵真實世界輸入";
  const kickerEngine = isEn ? "ENGINE: BLAKE'S COGNITIVE CORE" : "核心引擎：關鍵環節擊穿器";
  const kickerB = isEn ? "B OUT: DETERMINISTIC OUTCOME" : "B 端：確定性高價值產出";

  const aItems = isEn ? [
    "• Microsecond Jitter & Sensor Noise (24 Cams)",
    "• GPU Starvation & DataLoader I/O Stall",
    "• Multi-Agent Combinatorial Token Explosion",
    "• Destructive In-place Text Overwriting"
  ] : [
    "• 24 顆相機微秒級時序抖動與雜訊 (MetGauge)",
    "• GPU 運算飢餓與 DataLoader I/O 阻塞 (DynaSafe)",
    "• 多 Agent 遞迴檢索之 Token 組合爆炸 (Atlas)",
    "• LLM 原地覆寫導致原始語義滅失 (TFX)"
  ];

  const engineSteps = isEn ? [
    { title: "1. Epistemic Scoping", desc: "First-Principles Physics & Boundaries" },
    { title: "2. Weakest-Link Pinpoint", desc: "Isolate Single Rate-Limiting Choke" },
    { title: "3. Invariant Gate", desc: "Deterministic Guardrails & Circuit Breakers" }
  ] : [
    { title: "1. 第一性原理分解", desc: "釐清物理與計算真實邊界條件" },
    { title: "2. 鎖定最脆弱環節", desc: "精準點穴單一限速速率瓶頸" },
    { title: "3. 建立不變量閘門", desc: "注入確定性防護與斷路熔斷機制" }
  ];

  const bItems = isEn ? [
    "✓ 10× Model Training Speedup (Measured)",
    "✓ Sub-μs Hardware Sync in Factory Testing",
    "✓ TALK 1.8 Capped Budget (6.0 → 4.6)",
    "✓ Zero Data Loss Guarantee (Immutable Ground Truth)"
  ] : [
    "✓ 10× 模型訓練速度提升（實測指標）",
    "✓ 次微秒級硬體確定性同步（工廠上線前測試）",
    "✓ TALK 1.8 預算超標熔斷收斂 (6.0 → 4.6)",
    "✓ 原始資料零滅失保證（不可變真理層）"
  ];

  return `<div class="resume-svg-wrapper">
  <svg class="resume-svg-diagram resume-universal-engine-svg" viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${e(isEn ? "Universal Critical-Link Engine A to B Transformation Architecture" : "關鍵瓶頸擊穿引擎 A 到 B 通用轉化架構圖")}">
    <defs>
      <linearGradient id="ue-grad-engine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--resume-accent)" stop-opacity="0.12" />
        <stop offset="100%" stop-color="var(--resume-tint)" stop-opacity="0.65" />
      </linearGradient>
      <linearGradient id="ue-grad-pill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--resume-accent)" />
        <stop offset="100%" stop-color="#3b7c6b" />
      </linearGradient>
      <marker id="ue-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 8 5 L 0 9 z" class="resume-arrow-head" fill="var(--resume-accent)" />
      </marker>
    </defs>

    <!-- BOX A: High Entropy Reality -->
    <g class="ue-box-a" transform="translate(15, 15)">
      <rect x="0" y="0" width="215" height="195" rx="8" class="resume-node-box" />
      <rect x="0" y="0" width="215" height="28" rx="8" class="resume-node-pill" />
      <rect x="0" y="20" width="215" height="8" class="resume-node-pill" />
      <text x="12" y="18" class="resume-pill-text" font-weight="800" letter-spacing="0.06em">${e(kickerA)}</text>
      
      <text x="12" y="52" class="resume-node-detail" font-size="9.5">${e(aItems[0])}</text>
      <text x="12" y="87" class="resume-node-detail" font-size="9.5">${e(aItems[1])}</text>
      <text x="12" y="122" class="resume-node-detail" font-size="9.5">${e(aItems[2])}</text>
      <text x="12" y="157" class="resume-node-detail" font-size="9.5">${e(aItems[3])}</text>
      
      <text x="12" y="188" class="resume-node-detail" font-size="8.5" fill="var(--resume-muted)" font-style="italic">High Entropy / Ambiguity</text>
    </g>

    <!-- CONNECTOR A -> ENGINE -->
    <path d="M 230 112 L 265 112" class="resume-flow-line" stroke="var(--resume-accent)" stroke-width="2" marker-end="url(#ue-arrow)" />

    <!-- BOX ENGINE: Blake's Cognitive Core -->
    <g class="ue-box-engine" transform="translate(270, 10)">
      <rect x="0" y="0" width="225" height="205" rx="10" fill="url(#ue-grad-engine)" stroke="var(--resume-accent)" stroke-width="1.8" />
      <rect x="0" y="0" width="225" height="30" rx="10" fill="url(#ue-grad-pill)" />
      <rect x="0" y="22" width="225" height="8" fill="url(#ue-grad-pill)" />
      <text x="14" y="20" class="resume-pill-text" fill="#fff" font-weight="800" letter-spacing="0.06em">${e(kickerEngine)}</text>
      
      <!-- Engine Step 1 -->
      <g transform="translate(10, 40)">
        <rect x="0" y="0" width="205" height="44" rx="5" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1" />
        <text x="8" y="18" class="resume-node-title" font-size="10.5" font-weight="700" fill="var(--resume-accent)">${e(engineSteps[0].title)}</text>
        <text x="8" y="34" class="resume-node-detail" font-size="8.8">${e(engineSteps[0].desc)}</text>
      </g>
      
      <!-- Engine Step 2 -->
      <g transform="translate(10, 92)">
        <rect x="0" y="0" width="205" height="44" rx="5" fill="var(--resume-panel)" stroke="var(--resume-accent)" stroke-width="1.5" />
        <text x="8" y="18" class="resume-node-title" font-size="10.5" font-weight="800" fill="var(--resume-text)">${e(engineSteps[1].title)}</text>
        <text x="8" y="34" class="resume-node-detail" font-size="8.8" font-weight="600" fill="var(--resume-accent)">${e(engineSteps[1].desc)}</text>
      </g>

      <!-- Engine Step 3 -->
      <g transform="translate(10, 144)">
        <rect x="0" y="0" width="205" height="44" rx="5" fill="var(--resume-panel)" stroke="var(--resume-border)" stroke-width="1" />
        <text x="8" y="18" class="resume-node-title" font-size="10.5" font-weight="700" fill="var(--resume-accent)">${e(engineSteps[2].title)}</text>
        <text x="8" y="34" class="resume-node-detail" font-size="8.8">${e(engineSteps[2].desc)}</text>
      </g>
    </g>

    <!-- CONNECTOR ENGINE -> B -->
    <path d="M 495 112 L 530 112" class="resume-flow-line" stroke="var(--resume-accent)" stroke-width="2" marker-end="url(#ue-arrow)" />

    <!-- BOX B: Deterministic High Value Outcome -->
    <g class="ue-box-b" transform="translate(535, 15)">
      <rect x="0" y="0" width="210" height="195" rx="8" class="resume-node-box" />
      <rect x="0" y="0" width="210" height="28" rx="8" class="resume-node-pill" />
      <rect x="0" y="20" width="210" height="8" class="resume-node-pill" />
      <text x="12" y="18" class="resume-pill-text" font-weight="800" letter-spacing="0.06em">${e(kickerB)}</text>
      
      <text x="12" y="52" class="resume-node-detail resume-stat-green" font-size="9.5" font-weight="700">${e(bItems[0])}</text>
      <text x="12" y="87" class="resume-node-detail resume-stat-green" font-size="9.5" font-weight="700">${e(bItems[1])}</text>
      <text x="12" y="122" class="resume-node-detail resume-stat-green" font-size="9.5" font-weight="700">${e(bItems[2])}</text>
      <text x="12" y="157" class="resume-node-detail resume-stat-green" font-size="9.5" font-weight="700">${e(bItems[3])}</text>

      <text x="12" y="188" class="resume-node-detail" font-size="8.5" fill="var(--resume-accent)" font-weight="700">Deterministic / Zero Loss</text>
    </g>
  </svg>
</div>`;
}
