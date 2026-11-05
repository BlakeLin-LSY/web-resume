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
      <svg class="resume-svg-diagram" viewBox="0 0 760 160" role="img" aria-label="${e(ariaLabel)}" style="font-family:var(--resume-font,system-ui,-apple-system,sans-serif)">
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
          <text x="58" y="31" class="resume-pill-text" text-anchor="middle">${e(l(lane1?.stage1?.pill || (isEn ? "DIAGNOSIS" : "瓶頸診斷")))}</text>
          <text x="100" y="50" class="resume-node-title" text-anchor="middle">${e(l(lane1?.stage1?.title || "PhysicsNeMo Demo"))}</text>
          <text x="100" y="65" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage1?.detail || (isEn ? "Data-format Loader" : "資料格式載入器")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="44" x2="239" y2="44" class="resume-flow-line resume-flow-alert" marker-end="url(#${arrowAlertId})"/>
          <text x="215" y="38" class="resume-flow-label resume-text-alert" text-anchor="middle">${e(l(lane1?.connector1?.label || (isEn ? "Inspect" : "調查")))}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="14" width="310" height="60" rx="8" class="resume-node-box resume-node-alert"/>
          <text x="395" y="42" class="resume-node-title resume-text-alert" text-anchor="middle">${e(l(lane1?.stage2?.title || (isEn ? "Loader Bottleneck Identified" : "定位資料載入瓶頸")))}</text>
          <text x="395" y="60" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage2?.detail || (isEn ? "Optimization Direction Specified" : "指定最佳化方向")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="44" x2="589" y2="44" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="14" width="160" height="60" rx="8" class="resume-node-box"/>
          <text x="670" y="42" class="resume-node-title" text-anchor="middle">${e(l(lane1?.stage3?.title || (isEn ? "I/O Blocking Baseline" : "I/O 阻塞基準")))}</text>
          <text x="670" y="60" class="resume-node-detail" text-anchor="middle">${e(l(lane1?.stage3?.detail || (isEn ? "GPU Starvation (~10% Ut.)" : "GPU 等待資料（飢餓）")))}</text>
        </g>

        <!-- Lane 2: Rebuilt & Optimized -->
        <g class="resume-node-group">
          <rect x="10" y="86" width="180" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="18" y="92" width="80" height="16" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="58" y="103" class="resume-pill-text" text-anchor="middle">${e(l(lane2?.stage1?.pill || (isEn ? "REFACTOR" : "管線重構")))}</text>
          <text x="100" y="122" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage1?.title || (isEn ? "Loader Pipeline" : "載入器管線")))}</text>
          <text x="100" y="137" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage1?.detail || (isEn ? "AI-Assisted Pipelining" : "AI 輔助管線重構")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="190" y1="116" x2="239" y2="116" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
          <text x="215" y="110" class="resume-flow-label resume-stat-green" text-anchor="middle">${e(l(lane2?.connector1?.label || (isEn ? "Review" : "審查")))}</text>
        </g>

        <g class="resume-node-group">
          <rect x="240" y="86" width="310" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="395" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage2?.title || (isEn ? "Async Prefetch & Cache" : "非同步預取與快取")))}</text>
          <text x="395" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage2?.detail || (isEn ? "Decoupled I/O & Training" : "解耦 I/O 與訓練迴圈")))}</text>
        </g>

        <g class="resume-connector">
          <line x1="550" y1="116" x2="589" y2="116" class="resume-flow-line" marker-end="url(#${arrowDynaId})"/>
        </g>

        <g class="resume-node-group">
          <rect x="590" y="86" width="160" height="60" rx="8" class="resume-node-box resume-node-highlight"/>
          <text x="670" y="114" class="resume-node-title resume-title-highlight" text-anchor="middle">${e(l(lane2?.stage3?.title || (isEn ? "Throughput Accelerated" : "吞吐量大幅提升")))}</text>
          <text x="670" y="132" class="resume-node-detail resume-stat-green" text-anchor="middle">${e(l(lane2?.stage3?.detail || (isEn ? "~10x Training Speedup" : "約 10 倍訓練加速")))}</text>
        </g>
      </svg>
    </div>

    ${caption ? `<p class="resume-diagram-caption">${e(caption)}</p>` : ""}
  </div>`;
}
