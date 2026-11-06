import { escapeHtml } from "../generators/components/svg-pipeline.mjs";

export function renderInvariantsAnchorModule({ language }) {
  const e = escapeHtml;
  const isEn = language === "en";

  const kicker = isEn ? "SYSTEM INVARIANTS" : "系統工程不變量";
  const title = isEn ? "Core Engineering Invariants" : "核心工程不變量";
  const desc = isEn
    ? "Design constraints enforced across optical metrology, deep-learning data pipelines, and multi-agent reasoning systems."
    : "應用於光學工業量測、深度學習資料管線與多 Agent 系統的工程設計約束。";

  const invariants = [
    {
      id: "immutability",
      num: "01",
      name: isEn ? "Ground Truth Immutability" : "原始資料嚴格不可變",
      rule: isEn
        ? "Raw input bytes, including sensor frames, recorded audio, and citation origins, are never overwritten. Inferences exist solely as reviewable candidate overlays."
        : "感測器原始影格、錄音音訊與引證出處不進行破壞性覆寫。所有推論結果與修訂內容僅作為可審查的差分層呈現。"
    },
    {
      id: "streamline-first",
      num: "02",
      name: isEn ? "Optimize Dataflow Before Hardware Scaling" : "先優化資料管線，再考慮硬體擴充",
      rule: isEn
        ? "When host serialization I/O starves GPU compute, adding GPUs only increases idle time. Profile and optimize the critical data path first."
        : "當主機端資料反序列化 I/O 阻塞 GPU 計算時，增購 GPU 只會增加閒置時間。先以 Profiler 定位瓶頸並優化關鍵資料流，在既有硬體上釋放吞吐量。"
    },
    {
      id: "geometric-calibration",
      num: "03",
      name: isEn ? "Optical Calibration Over Heuristic Stitching" : "幾何光學校正優於啟發式拼接",
      rule: isEn
        ? "High-height multi-camera metrology requires exact intrinsic and extrinsic calibration with global bundle adjustment to eliminate perspective distortion and seam artifacts across large fields of view."
        : "架高大視野多相機檢測需依賴精確的相機內外參數校正與全域幾何優化，消除大視野重疊區域的透視變形與拼接接縫。"
    },
    {
      id: "algorithm-workflow",
      num: "04",
      name: isEn ? "Algorithm Redesign and Workflow Optimization Over Brute Force" : "演算法與工作流程優化優於暴力運算",
      rule: isEn
        ? "Profiling dataflow and algorithm bottlenecks across AOI inspection workflows and deep-learning loaders delivers measurable cycle-time reductions and throughput gains on existing hardware."
        : "深入分析產線 AOI 檢測流程與深度學習載入器的資料流瓶頸，在既有硬體上縮短單件耗時並提升訓練吞吐量。"
    }
  ];

  const cards = invariants.map(inv => `
    <div class="resume-invariant-card" data-invariant="${e(inv.id)}">
      <div class="resume-invariant-top">
        <span class="resume-invariant-num">${e(inv.num)}</span>
        <h4 class="resume-invariant-name">${e(inv.name)}</h4>
      </div>
      <p class="resume-invariant-rule">${e(inv.rule)}</p>
    </div>
  `).join("");

  return `<section class="resume-invariants-section" id="invariants">
    <div class="resume-invariants-header">
      <span class="resume-invariants-kicker">${e(kicker)}</span>
      <h3 class="resume-invariants-title">${e(title)}</h3>
      <p class="resume-invariants-intro">${e(desc)}</p>
    </div>
    <div class="resume-invariants-grid">
      ${cards}
    </div>
  </section>`;
}
