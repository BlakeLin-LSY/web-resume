// Escape utility for SVG & HTML
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

/**
 * Universal Data Pipeline SVG Generator
 * Generates responsive, dual-lane or single-lane vector pipelines with auto-positioned nodes and connectors.
 */
export function renderPipelineSvg(options, language = "en") {
  const isEn = language === "en";
  const e = escapeHtml;
  const l = (val) => typeof val === "object" && val !== null ? (isEn ? val.en : (val["zh-TW"] || val.en)) : String(val);

  const kicker = l(options.kicker || (isEn ? "Pipeline Architecture" : "資料管線架構"));
  const badge = l(options.badge || "");
  const title = l(options.title || "");
  const caption = l(options.caption || "");
  const ariaLabel = l(options.ariaLabel || title);

  const lane1 = options.lanes?.[0];
  const lane2 = options.lanes?.[1];

  const arrowDynaId = options.arrowId || "arrow-dyna";
  const arrowAlertId = `${arrowDynaId}-alert`;

  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${e(kicker)}</span>
        ${badge ? `<span class="resume-diagram-badge">${e(badge)}</span>` : ""}
      </div>
      <strong class="resume-diagram-title">${e(title)}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 160" role="img" aria-label="${e(ariaLabel)}">
        <defs>
          <marker id="${arrowDynaId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" class="resume-arrow-head"/>
          </marker>
          <marker id="${arrowAlertId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 1 2 L 8 5 L 1 8 z" fill="#c25953"/>
          </marker>
        </defs>

        <!-- Lane 1: Baseline (Unoptimized) -->
        <g class="resume-node-group">
          <rect x="10" y="14" width="180" height="60" rx="8" class="resume-node-box"/>
          <rect x="18" y="20" width="80" height="16" rx="4" class="resume-node-pill"/>
          <text x="58" y="31" class="resume-pill-text" text-anchor="middle">${e(l(lane1?.stage1?.pill || (isEn ? "BASELINE" : "優化前基準")))}</text>
          <text x="100" y="50" class="resume-node-title" text-anchor="middle">${e(l(lane1?.stage1?.title || "PyTorch DataLoader"))}</text>
          <text x="100" y="65" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage1?.detail || (isEn ? "Synchronous IPC Pipe" : "同步處理序間管線 (IPC)")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="44" x2="239" y2="44" class="resume-flow-line resume-flow-alert" marker-end="url(#${arrowAlertId})"/>
          <text x="215" y="38" class="resume-flow-label resume-text-alert" text-anchor="middle">${e(l(lane1?.connector1?.label || (isEn ? "I/O Stall" : "I/O 阻塞")))}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="14" width="310" height="60" rx="8" class="resume-node-box resume-node-alert"/>
          <text x="395" y="42" class="resume-node-title resume-text-alert" text-anchor="middle">${e(l(lane1?.stage2?.title || (isEn ? "GPU Idle Starvation (88% Waiting)" : "GPU 閒置飢餓 (88% 處於等待)")))}</text>
          <text x="395" y="60" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage2?.detail || (isEn ? "CFD Training Compute Stalled" : "CFD 訓練計算資源停滯")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="44" x2="589" y2="44" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="14" width="160" height="60" rx="8" class="resume-node-box"/>
          <text x="670" y="42" class="resume-node-title" text-anchor="middle">${e(l(lane1?.stage3?.title || (isEn ? "1× Baseline" : "1× 基準吞吐")))}</text>
          <text x="670" y="60" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage3?.detail || (isEn ? "Unoptimized Rate" : "未優化訓練速率")))}</text>
        </g>

        <!-- Lane 2: Rebuilt & Optimized -->
        <g class="resume-node-group">
          <rect x="10" y="86" width="180" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="18" y="92" width="80" height="16" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="58" y="103" class="resume-pill-text" text-anchor="middle">${e(l(lane2?.stage1?.pill || (isEn ? "REBUILT" : "重構管線")))}</text>
          <text x="100" y="122" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage1?.title || (isEn ? "Data Pipeline" : "非同步資料管線")))}</text>
          <text x="100" y="137" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage1?.detail || (isEn ? "PhysicsNeMo Format Loader" : "PhysicsNeMo 格式轉換載入器")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="116" x2="239" y2="116" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
          <text x="215" y="110" class="resume-flow-label resume-stat-green" text-anchor="middle">${e(l(lane2?.connector1?.label || (isEn ? "Continuous" : "持續串流")))}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="86" width="310" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="395" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage2?.title || (isEn ? "Continuous GPU Saturation" : "GPU 連續滿載運算")))}</text>
          <text x="395" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage2?.detail || (isEn ? "Zero Starvation Stalls · Compute Bound" : "零飢餓阻塞 · 達計算極限")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="116" x2="589" y2="116" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="86" width="160" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="670" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage3?.title || (isEn ? "⚡ 10× Speedup" : "⚡ 10× 加速倍率")))}</text>
          <text x="670" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage3?.detail || (isEn ? "Verified Model Training" : "實測模型訓練端到端驗證")))}</text>
        </g>
      </svg>
    </div>

    ${caption ? `<p class="resume-diagram-caption">${e(caption)}</p>` : ""}
  </div>`;
}
