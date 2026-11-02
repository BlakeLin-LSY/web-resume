import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Circuit-Breaker / Guardrail SVG Generator
 * Generates dynamic branching circuit-breakers and dual-track architectures.
 */
export function renderCircuitBreakerSvg(options, language = "en") {
  const isEn = language === "en";
  const e = escapeHtml;
  const l = (val) => typeof val === "object" && val !== null ? (isEn ? val.en : (val["zh-TW"] || val.en)) : String(val);

  const kicker = l(options.kicker || (isEn ? "Guardrail Pipeline" : "預算閘門管線"));
  const badge = l(options.badge || (isEn ? "TALK Contract 1.8" : "TALK Contract 1.8 契約"));
  const title = l(options.title || (isEn ? "Dynamic Circuit-Breaker & Autonomous Rerouting" : "TALK 契約 1.8：預算超支自動熔斷與自主重規劃"));
  const ariaLabel = l(options.ariaLabel || (isEn ? "TALK Contract 1.8 Budget Guardrail Circuit Breaker" : "TALK 契約 1.8 預算超支熔斷架構"));
  const markerId = options.markerId || "arrow-atlas";

  const monograph = options.monograph;

  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${e(kicker)}</span>
        <span class="resume-diagram-badge">${e(badge)}</span>
      </div>
      <strong class="resume-diagram-title">${e(title)}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 170" role="img" aria-label="${e(ariaLabel)}" style="font-family:var(--resume-font,system-ui,-apple-system,sans-serif)">
        <defs>
          <marker id="${markerId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
        <line x1="140" y1="83" x2="174" y2="83" class="resume-flow-line" marker-end="url(#${markerId})"/>

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
        <path d="M 330 65 Q 355 65 375 42" class="resume-flow-line resume-flow-alert" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="380" y="12" width="175" height="60" rx="6" class="resume-node-box resume-node-alert"/>
          <text x="467" y="32" class="resume-node-title resume-text-alert" text-anchor="middle">${isEn ? "⛔ Plan 1: Deep Survey" : "⛔ 計畫 1：深度全覽"}</text>
          <text x="467" y="48" class="resume-node-detail" text-anchor="middle">${isEn ? "Cost 6.0 > 5.0 Ceiling" : "成本 6.0 > 5.0 上限"}</text>
          <text x="467" y="62" class="resume-node-detail resume-text-alert" text-anchor="middle">${isEn ? "BLOCKED · 0 Tokens Leaked" : "熔斷攔截 · 0 Token 洩漏"}</text>
        </g>

        <!-- Branch B (Bottom): Adaptive Reroute -->
        <path d="M 330 100 Q 355 100 375 118" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="380" y="88" width="175" height="66" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="467" y="108" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "⚡ Reroute: T5-Compact" : "⚡ 重規劃：T5-Compact"}</text>
          <text x="467" y="124" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Cost 4.6 < 5.0 Ceiling" : "成本 4.6 < 5.0 上限"}</text>
          <text x="467" y="140" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "APPROVED & EXECUTED" : "批准放行並執行"}</text>
        </g>

        <!-- Connector from Reroute to Output -->
        <path d="M 555 121 Q 575 121 590 85" class="resume-flow-line" marker-end="url(#${markerId})"/>

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

    ${monograph ? `<!-- Editorial Monograph Proof Leaf -->
    <details class="resume-reader-sample" open>
      <summary class="resume-sample-summary">
        <span class="resume-sample-pill">Monograph Proof Leaf / 雙語成果樣張</span>
        <strong class="resume-sample-title">${e(l(monograph.title))}</strong>
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
              <span class="resume-leaf-lang">繁體中文（忠實對照譯本）</span>
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
    </details>` : ""}
  </div>`;
}

/**
 * Universal Dual-Track Storage/Pipeline SVG Generator (e.g. TFX)
 */
export function renderDualTrackSvg(options, language = "en") {
  const isEn = language === "en";
  const e = escapeHtml;
  const l = (val) => typeof val === "object" && val !== null ? (isEn ? val.en : (val["zh-TW"] || val.en)) : String(val);

  const kicker = l(options.kicker || (isEn ? "Dual-Track Architecture" : "雙軌保真架構"));
  const badge = l(options.badge || (isEn ? "Android Prototype" : "Android 原型"));
  const title = l(options.title || (isEn ? "Immutable Raw Audio vs. User-Approved Speculative Cleanup" : "原始錄音唯讀保真 vs. 顯式確認語意修訂雙軌架構"));
  const ariaLabel = l(options.ariaLabel || (isEn ? "Transcribe-for-X Dual-Track Architecture" : "Transcribe-for-X 雙軌保真架構"));
  const markerId = options.markerId || "arrow-tfx";
  const caption = l(options.caption || "");

  return `<div class="resume-diagram-container resume-human-view">
    <div class="resume-diagram-header">
      <div class="resume-diagram-kicker-group">
        <span class="resume-diagram-tag">${e(kicker)}</span>
        <span class="resume-diagram-badge">${e(badge)}</span>
      </div>
      <strong class="resume-diagram-title">${e(title)}</strong>
    </div>

    <div class="resume-svg-wrapper">
      <svg class="resume-svg-diagram" viewBox="0 0 760 180" role="img" aria-label="${e(ariaLabel)}" style="font-family:var(--resume-font,system-ui,-apple-system,sans-serif)">
        <defs>
          <marker id="${markerId}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
        <text x="435" y="86" class="resume-isolation-text" text-anchor="middle">${isEn ? "SOURCE AUDIO KEPT SEPARATE FROM TRANSCRIPT EDITS" : "來源音訊與逐字稿修改分開保存"}</text>

        <!-- Track 1: Immutable (Top) -->
        <path d="M 115 78 Q 135 45 155 45" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="160" y="14" width="245" height="62" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="282" y="36" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "Track 1: Source Audio" : "軌道 1：來源音訊"}</text>
          <text x="282" y="52" class="resume-node-detail" text-anchor="middle">${isEn ? "App-Private Storage" : "App 私有儲存"}</text>
          <text x="282" y="66" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Saved Before ASR" : "先儲存，再轉錄"}</text>
        </g>

        <line x1="405" y1="45" x2="445" y2="45" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="450" y="14" width="165" height="62" rx="6" class="resume-node-box"/>
          <text x="532" y="38" class="resume-node-title" text-anchor="middle">${isEn ? "Source Recording" : "來源錄音"}</text>
          <text x="532" y="56" class="resume-node-detail" text-anchor="middle">${isEn ? "Retention Goal" : "以保留來源為目標"}</text>
        </g>

        <!-- Track 2: Speculative AI Diff (Bottom) -->
        <path d="M 115 102 Q 135 135 155 135" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="160" y="104" width="245" height="62" rx="6" class="resume-node-box"/>
          <text x="282" y="126" class="resume-node-title" text-anchor="middle">${isEn ? "Track 2: Cleanup Suggestions" : "軌道 2：清理建議"}</text>
          <text x="282" y="142" class="resume-node-detail" text-anchor="middle">${isEn ? "Non-destructive candidate overlays" : "非破壞性候選修訂文字層"}</text>
          <text x="282" y="156" class="resume-node-detail" text-anchor="middle">${isEn ? "Cleanup Keeps Source Audio" : "清理不修改來源音訊"}</text>
        </g>

        <line x1="405" y1="135" x2="445" y2="135" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="450" y="104" width="165" height="62" rx="6" class="resume-node-box resume-node-highlight"/>
          <text x="532" y="126" class="resume-node-title resume-title-highlight" text-anchor="middle">${isEn ? "User Checkbox Review" : "使用者逐項核取審閱"}</text>
          <text x="532" y="142" class="resume-node-detail" text-anchor="middle">${isEn ? "Explicit granular opt-in" : "顯式細粒度勾選同意"}</text>
          <text x="532" y="156" class="resume-node-detail resume-stat-green" text-anchor="middle">${isEn ? "Accepted Edits Only" : "僅套用已接受修改"}</text>
        </g>

        <!-- Final Export -->
        <path d="M 615 45 Q 640 45 645 75" class="resume-flow-line"/>
        <path d="M 615 135 Q 640 135 645 105" class="resume-flow-line"/>
        <line x1="645" y1="90" x2="666" y2="90" class="resume-flow-line" marker-end="url(#${markerId})"/>
        <g class="resume-node-group">
          <rect x="668" y="55" width="84" height="70" rx="6" class="resume-node-box"/>
          <text x="710" y="85" class="resume-node-title" text-anchor="middle">${isEn ? "Clean Text" : "乾淨文稿"}</text>
          <text x="710" y="102" class="resume-node-detail" text-anchor="middle">${isEn ? "User Confirmed" : "使用者確認輸出"}</text>
        </g>
      </svg>
    </div>

    ${caption ? `<p class="resume-diagram-caption">${e(caption)}</p>` : ""}
  </div>`;
}
