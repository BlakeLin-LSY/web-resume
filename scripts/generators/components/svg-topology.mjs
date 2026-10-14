import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Sensor/Hardware Topology SVG Generator
 * Generates modular 4-stage hardware/optical pipeline topologies.
 */
export function renderTopologySvg(options, language = "en") {
  const isEn = language === "en";
  const e = escapeHtml;
  const l = (val) => typeof val === "object" && val !== null ? (isEn ? val.en : (val["zh-TW"] || val.en)) : String(val);

  const kicker = l(options.kicker || (isEn ? "System Topology" : "系統架構拓撲"));
  const badge = l(options.badge || "");
  const title = l(options.title || "");
  const caption = l(options.caption || "");
  const ariaLabel = l(options.ariaLabel || title);

  const markerId = options.markerId || "arrow-refined";

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
          <marker id="${markerId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
          <line x1="175" y1="80" x2="209" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
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
          <line x1="365" y1="80" x2="399" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
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
          <text x="485" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Calibration & Limit Tests" : "標定與邊界極限測試"}</text>
          <text x="485" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Guides Hardware Tuning" : "指引光機硬體校正"}</text>
        </g>

        <!-- Connector 3 -->
        <g class="resume-connector">
          <line x1="570" y1="80" x2="604" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
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

    ${caption ? `<p class="resume-diagram-caption">${e(caption)}</p>` : ""}
  </div>`;
}
