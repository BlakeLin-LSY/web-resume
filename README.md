# Web Resume — Ssu-Yuan Lin (Blake)

Source for <https://blakelin-lsy.github.io/web-resume/>: 工業級、型別安全、基於 Design Tokens 與聲明式 Schema 的模組化個人工程展示平台。具備雙面呈現（🧑 人類視角純向量圖解 vs 🤖 AI Agent 語義 AST/IR 規格）、雙語對齊（English / 正體中文）、專案案例深度解析、工程筆記與完整可攜離線包。

---

## 🏛️ 模組架構導覽（Modular Architecture）

本平台採用解耦的四層模組架構，將資料、向量圖解、設計系統與品質門禁嚴格分離：

```text
web-resume/
├── content/
│   ├── data/                          # [1. 內容資料層] 模組化宣告式資料源
│   │   ├── identity.json              # 個人身份、職稱、聯絡信箱與外鏈
│   │   ├── career/                    # 經歷獨立檔（定義意圖契約、架構答辯、多視角重點）
│   │   │   ├── dynasafe.json
│   │   │   ├── metgauge.json
│   │   │   ├── utechzone.json
│   │   │   ├── lips.json
│   │   │   ├── career-breaks.json
│   │   │   ├── research-learning.json
│   │   │   ├── education.json
│   │   │   └── skills.json
│   │   ├── projects/                  # 專案獨立檔（定義架構、不變量、邊界與答辯）
│   │   │   ├── study-atlas.json
│   │   │   ├── transcribe-for-x.json
│   │   │   └── windowphase.json
│   │   └── i18n/                      # 中英雙語共用字典（1:1 鍵值對齊）
│   │       ├── en.json
│   │       └── zh-TW.json
│   ├── design-tokens/                 # [3. 設計系統] 多風格 Token 配置庫
│   │   ├── zen-slate.json             # 暖白/深石綠（資深架構師風格 · 預設基準）
│   │   ├── terminal-mono.json         # 全黑底/高對比琥珀綠（底層系統/Linux 核心）
│   │   └── clean-swiss.json           # 極簡黑白灰/國際藍（大型產品工程風格）
│   ├── project-case-studies.json      # 三大專案長篇案例研究
│   └── resume-assets.json             # CV 二進位檔案資訊與 SHA-256 數位封籤
├── scripts/
│   ├── generators/components/         # [2. 圖解與亮點渲染引擎] 參數化向量與互動組件
│   │   ├── svg-pipeline.mjs           # 通用資料管線圖（自動節點排版與連接線）
│   │   ├── svg-topology.mjs           # 通用感測器/硬體拓撲圖
│   │   ├── svg-circuit-breaker.mjs    # 通用閘門熔斷/雙軌保真/樣張卡片
│   │   ├── agent-ir.mjs               # 通用 AST/IR 語法高亮生成器
│   │   ├── intent-contract.mjs        # 意圖契約與認知邊界卡生成器
│   │   ├── architecture-duel.mjs      # ⚔️ 架構審查與對抗答辯抽屜生成器
│   │   └── proof-receipt.mjs          # 密碼學工程數位收據生成器
│   ├── invariants/                    # [4. 工程品質門禁] CI 驗證閘門
│   │   ├── check-i18n-parity.mjs      # 詞條雙向完整性與變數樣板檢查
│   │   ├── check-digital-seals.mjs    # PDF 與論文 SHA-256 數位封籤校驗
│   │   ├── check-wcag-and-viewport.mjs# WCAG AA 對比度 (>=4.5) 與行動端 320px 防溢出
│   │   ├── check-intent-contracts.mjs # 意圖契約、架構答辯與多重視角完整性檢驗
│   │   └── run-all-invariants.mjs     # 綜合門禁執行器（8 道門禁）
│   └── lib/
│       ├── data-loader.mjs            # 組合模組資料並同步 legacy profile
│       ├── theme-engine.mjs           # Token 主題編譯與切換引擎
│       ├── resume-markup.mjs          # 佈局組裝 Orchestrator（已瘦身解耦）
│       ├── resume-reading.mjs         # 前端客戶端控制器（透鏡切換、持久化）
│       └── resume-source.mjs          # Schema 契約驗證
└── app/                               # Next.js 15 App Router 與靜態匯出管線
```

---

## ⚡ 四大突破性展示亮點（The 4 Pillars）

1. **`render-for-x` 讀者視角投影切換器（Reader Lenses）**：
   - 頂部控制列支援 **🏛️ Staff Architect**（不變量、瓶頸與失敗邊界）、**🚀 Engineering Manager**（里程碑、ROI 與風險化解）、**🎯 Deep Tech Recruiter**（物理學第一性原理 + 軟硬整合 + Agent 意圖保真稀缺交集能力）三重视角隨選切換。
2. **`intentforge` 意圖契約與認知邊界卡（Intent Contract & Epistemic Boundaries）**：
   - 每個核心經歷與專案均附有嚴格定義的**不變量保證（Strict Invariant）**、**顯式非目標（Explicit Non-Goals）**與**失效臨界條件（Failure Conditions）**。
3. **`mirrorAgent` 架構對抗答辯（⚔️ Grill This Architecture / Duel Mode）**：
   - 可互動展開的架構審查抽屜，收錄針對架構選擇與極端負載失效點的第一性原理辯護。
4. **`preference` 密碼學工程收據與即時校驗（Cryptographic Proofs & Receipts）**：
   - SHA-256 hash 用來識別受檢查的檔案。Invariant suite 檢查結構與內容一致性，不會測量 10× 訓練速度，也不能證明零資料滅失。

---

## 🛠️ 開發與維護指南（Developer Guide）

### 1. 如何新增或修改工作經歷？
1. 在 `content/data/career/` 新增或修改對應的 `<company>.json`：
   - 定義基本欄位：`id`, `employer`, `title`, `start`, `end`, `sourceIds`。
   - 定義關鍵指標：`metric: { value: 10, type: "...", en: "{value}× ...", "zh-TW": "..." }`。
   - 定義三元結構：`triad: { challenge: {...}, solution: {...}, boundary: {...} }`。
2. 從 repo 根目錄執行 `node scripts/lib/data-loader.mjs`，同步產生 `content/resume-profile.json`。
3. 執行 `npm --prefix app run test:invariants`。此命令只檢查內容，不會同步或改寫 profile。
4. 執行 `node scripts/invariants/test-data-loader-cli.mjs`，檢查 CLI、import 無寫入副作用，以及 invariant suite 對巢狀 drift 的拒絕行為。

`npm --prefix app run build` 會先同步 profile，再執行 invariant suite 與後續建置。

### 2. 如何為新專案繪製架構圖？
- **無需手動計算向量坐標！** 直接呼叫 `scripts/generators/components/` 中的通用組件：
  - 資料管線：使用 `renderPipelineSvg({ lanes: [...] }, language)`。
  - 硬體拓撲：使用 `renderTopologySvg({ stages: [...] }, language)`。
  - 熔斷閘門/雙軌隔離：使用 `renderCircuitBreakerSvg(...)` 或 `renderDualTrackSvg(...)`。
  - 語義 AST/IR：使用 `renderAgentIr({ astType, filename, data })`。

### 3. 如何切換不同設計系統主題？
在專案根目錄執行 `theme-engine.mjs`：
```bash
# 切換至 Terminal Mono（底層系統/Linux 核心風格）
node scripts/lib/theme-engine.mjs --theme=terminal-mono

# 切換至 Clean Swiss（國際大型產品風格）
node scripts/lib/theme-engine.mjs --theme=clean-swiss

# 切換回 Zen Slate（暖白/深石綠預設風格）
node scripts/lib/theme-engine.mjs --theme=zen-slate
```
切換後執行 `npm --prefix app run build` 即可重新編譯整站樣式與離線包。

---

## 🚦 品質門禁與構建指令（Build & Verification）

從 repo 根目錄執行：

```bash
# 1. 同步模組化資料到 compiled profile
node scripts/lib/data-loader.mjs

# 2. 執行只讀的 CI Invariant 門禁
npm --prefix app run test:invariants

# 3. 執行 CLI 與 parity regression
node scripts/invariants/test-data-loader-cli.mjs

# 4. 完整生產建置。此命令會先同步 profile
npm --prefix app run build

# 5. 靜態分析與型別檢查
npm --prefix app run lint
npm --prefix app run typecheck
```

---

## 🚀 部署（Deployment）

推送至 `main` 分支將自動觸發 `.github/workflows/deploy.yml`，在 GitHub Actions 執行完整檢驗並將 `app/out` 部署至 GitHub Pages（路徑 `/web-resume`）。
