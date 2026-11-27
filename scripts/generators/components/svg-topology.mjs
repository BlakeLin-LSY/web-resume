import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Sensor/Hardware Topology SVG Generator
 * Generates modular 4-stage optical pipeline topologies aligned with Blake's real MetGauge work.
 */
export function renderTopologySvg(options = {}, language = "en") {
  if (typeof options === "string") {
    language = options;
    options = {};
  }
  const isEn = language === "en";
  const e = escapeHtml;
  const l = (val) => typeof val === "object" && val !== null ? (isEn ? val.en : (val["zh-TW"] || val.en)) : String(val);

  const kicker = l(options.kicker || (isEn ? "Optical Pipeline Topology" : "光學量測架構拓撲"));
  const badge = l(options.badge || (isEn ? "12 Stereo Pairs" : "12 組立體相機"));
  const title = l(options.title || (isEn ? "Large FOV Stereo 3D Metrology Architecture" : "高空大視野立體 3D 量測管線拓撲"));
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

        <!-- Stage 1: Optical Sensor Array -->
        <g class="resume-node-group">
          <rect x="10" y="14" width="165" height="132" rx="8" class="resume-node-box"/>
          <rect x="18" y="22" width="85" height="18" rx="4" class="resume-node-pill"/>
          <text x="60" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "SENSOR ARRAY" : "感測陣列"}</text>
          <text x="92" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "12 Stereo Pairs" : "12 組立體相機對"}</text>
          <text x="92" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "24 Industrial Cameras" : "24 顆工業相機"}</text>
          <line x1="25" y1="92" x2="160" y2="92" class="resume-node-divider"/>
          <text x="92" y="110" class="resume-node-detail" text-anchor="middle">${isEn ? "High Mounting Height" : "高安裝高度配置"}</text>
          <text x="92" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Production Line Setup" : "自動化產線配置"}</text>
        </g>

        <!-- Connector 1 -->
        <g class="resume-connector">
          <line x1="175" y1="80" x2="209" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
          <text x="192" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Calibration" : "幾何標定"}</text>
        </g>

        <!-- Stage 2: Optical Calibration (Multi-camera optimization) -->
        <g class="resume-node-group">
          <rect x="210" y="14" width="155" height="132" rx="8" class="resume-node-box"/>
          <rect x="218" y="22" width="85" height="18" rx="4" class="resume-node-pill"/>
          <text x="260" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "CALIBRATION" : "光學校正"}</text>
          <text x="287" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "Multi-Camera Calib" : "多相機立體標定"}</text>
          <text x="287" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "Intrinsic & Extrinsic" : "相機內外參數優化"}</text>
          <line x1="225" y1="92" x2="350" y2="92" class="resume-node-divider"/>
          <text x="287" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Target-Based Checks" : "以標定靶檢查"}</text>
          <text x="287" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Reduce Distortion" : "降低透視與接縫畸變"}</text>
        </g>

        <!-- Connector 2 -->
        <g class="resume-connector">
          <line x1="365" y1="80" x2="399" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
          <text x="382" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Rectify" : "極線校正"}</text>
        </g>

        <!-- Stage 3: 3D Engine & Disparity Mapping -->
        <g class="resume-node-group">
          <rect x="400" y="14" width="170" height="132" rx="8" class="resume-node-box"/>
          <rect x="408" y="22" width="90" height="18" rx="4" class="resume-node-pill"/>
          <text x="453" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "3D ENGINE" : "3D 演算法"}</text>
          <text x="485" y="60" class="resume-node-title" text-anchor="middle">${isEn ? "Stereo 3D Metrology" : "3D 空間立體量測"}</text>
          <text x="485" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "C++ / Python Core" : "C++ / Python 核心引擎"}</text>
          <line x1="415" y1="92" x2="555" y2="92" class="resume-node-divider"/>
          <text x="485" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Disparity & Depth Map" : "視差與深度圖運算"}</text>
          <text x="485" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "Algorithm Prototyping" : "演算法原型驗證"}</text>
        </g>

        <!-- Connector 3 -->
        <g class="resume-connector">
          <line x1="570" y1="80" x2="604" y2="80" class="resume-flow-line" marker-end="url(#${markerId})"/>
          <text x="587" y="72" class="resume-flow-label" text-anchor="middle">${isEn ? "Stitching" : "視野拼接"}</text>
        </g>

        <!-- Stage 4: Large FOV Stitching & Factory Testing -->
        <g class="resume-node-group">
          <rect x="605" y="14" width="145" height="132" rx="8" class="resume-node-box resume-node-highlight"/>
          <rect x="613" y="22" width="90" height="18" rx="4" class="resume-node-pill resume-pill-highlight"/>
          <text x="658" y="34" class="resume-pill-text" text-anchor="middle">${isEn ? "FACTORY READY" : "產線就緒"}</text>
          <text x="677" y="60" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Large FOV Stitching" : "大視野影像拼接"}</text>
          <text x="677" y="78" class="resume-node-subtitle" text-anchor="middle">${isEn ? "Multi-View Alignment" : "多視角對齊"}</text>
          <line x1="620" y1="92" x2="735" y2="92" class="resume-node-divider"/>
          <text x="677" y="110" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Factory-Ready Testing" : "工廠產線上線實測"}</text>
          <text x="677" y="128" class="resume-node-detail" text-anchor="middle">${isEn ? "MVP to Factory Testing" : "MVP 推進至產線測試"}</text>
        </g>
      </svg>
    </div>

    ${caption ? `<p class="resume-diagram-caption">${e(caption)}</p>` : ""}
  </div>`;
}
