# Web Resume Project Instructions & Canonical Invariants

> **專案環境**: 本 repo 根目錄(本檔位於 `.agents/`,以下連結皆為相對路徑)
> **專案定位**: Blake (Ssu-Yuan Lin) 資深 AI 與系統演算法工程師雙語網頁履歷與高可信作品集。  
> **層級關係**: 本檔依據全域指示 `RULE[user_global]` §8 設立，只記錄本 repo 特有之架構邊界、職涯事實錨點、去脂語調規範與驗證管線。

---

## 1. 架構與模組邊界 (Architecture & Modular Boundaries)

本系統採宣告式清單驅動（Manifest-Driven）解耦架構：
- **宣告式清單 (SSOT)**: [`content/representation-manifest.json`](../content/representation-manifest.json)
  - 定義各模組的啟用狀態（`enabled`）、渲染次序（`order`）與錨點 ID。
  - 增刪或重排首頁區塊一律透過 Manifest 配置，不得於渲染器中硬編碼順序。
- **版面編排調度器**: [`scripts/layout/page-orchestrator.mjs`](../scripts/layout/page-orchestrator.mjs)
  - 負責依據 Manifest 順序動態調用對應模組，保持頂層乾淨。
- **獨立模組渲染器**: [`scripts/modules/`](../scripts/modules/)
  - `hero.mjs`（首屏與三大實證數據鐵軌 Impact Rail）
  - `invariants-anchor.mjs`（四大工程不變量定錨）
  - `flagship-proof.mjs`（旗艦職涯卡片：DynaSafe 與 MetGauge）
  - `system-projects.mjs`（系統作品卡片：Study Atlas 與 Transcribe-for-X）
  - `career-timeline.mjs`（歷史職涯時間線：UTECHZONE、LIPS 等）
  - `skills-about.mjs`（技術能力與學歷背景）
  - `contact-footer.mjs`（聯絡資訊與頁尾）
- **相容性 Facade**: [`scripts/lib/resume-markup.mjs`](../scripts/lib/resume-markup.mjs)
  - 僅保留對外匯出接口（`renderResume`, `escapeHtml` 等），對接 Next.js 與靜態生成腳本。

---

## 2. 職涯事實正典錨點 (Career Ground-Truth Invariants)

任何對履歷文案或資料檔的修改，必須嚴格遵守以下事實正典，**嚴禁 AI 隨意推論、誇大或虛構**：

### 2.1 DynaSafe
- **核心實證**: `~10×` ML 模型訓練加速。
- **真實驗證事實**: 分析 PhysicsNeMo 資料載入 I/O 瓶頸，消除 DataLoader 序列化阻塞並導入非同步預取資料管線；以真實 PCAP 封包建構 Nvidia Morpheus 網路異常偵測。
- **嚴格禁忌**:
  - **嚴禁自貶式免責聲明**：不得寫「宣稱無 AI 工具協助」、「我診斷了什麼？哪些成果有證據支持？」、「本人回憶...未保存可核對的量測時間」等被審計筆錄口吻。
  - 應以正面、客觀的系統工程邊界呈現（如 Intent Contract 與 Invariant Constraint）。

### 2.2 MetGauge
- **核心實證**: 12 組立體相機（24 顆相機）大視野高精度光學量測。
- **真實驗證事實**: 主導量測原型（MVP）推進至產線實機測試；設計多相機外參全域優化標定演算法；設計高架設高度大視野影像拼接管線與 C++/Python 3D 量測演算法。
- **嚴格禁忌**:
  - **嚴禁誇大硬體時序**：不得將「次微秒硬體觸發同步匯流排」或「500μs 網路排程抖動」寫為 Blake 的核心貢獻；Blake 的職責專注於原型開發、相機標定校正、演算法設計與大視野拼接。

### 2.3 UTECHZONE
- **核心實證**: `-40%` AOI Cycle-Time Reduction。
- **真實驗證事實**: 開發 C# 自動光學檢測演算法與優化檢測工作流，使產線單件檢測耗時縮短 40%；指導兩位工程師，與 10+ 人跨部門團隊共同推進。
- **嚴格禁忌**:
  - 不得以個人玩具專案的指標掩蓋此量產工業硬實力。

### 2.4 WindowPhase
- **核心實證**: 5 小時算力窗口排程 CLI（69.5% token 消耗降低）。
- **真實驗證事實**: 終端算力排程工具，提供明確的 `--dry-run` 預覽，降低反覆調試消耗。
- **嚴格禁忌**:
  - **嚴禁神經網絡幻覺**：絕對不得誤寫為「PyTorch 深度學習模擬與深度估算神經網絡」。

### 2.5 LIPS
- **核心實證**: 66% 3D 深度量測重複精度；Intel RealSense D415/D435 相機標定校正。

---

## 3. 去脂與專業語調守則 (Anti-Slop & Professional Dignity)

1. **零裝飾性 Emoji (Zero Emojis)**:
   - 全站 SVG 圖表、標籤、按鈕、卡片標題**嚴禁包含任何裝飾性 Emoji**（如 ⛔, ⚡, 🔒, 🎯, 🛡️, 📜, 🧐）。
2. **零破折號 (Zero Em-Dashes)**:
   - 中英雙語文案與 JSON 資料檔中**嚴禁使用 em-dash（`—` / `\u2014`）**。
   - 需連接或補充時，使用結構化標籤、冒號或全形括弧 `（）`。
3. **零動漫 RPG 對抗人設 (Zero Anime/RPG Personas)**:
   - 嚴禁在架構審查中出現角色扮演（如 `Staff Reviewer 🧐` vs `Blake 🛡️`）。
   - 一律採用客觀專業的「關鍵架構取捨與設計審查（Key Architectural Trade-offs & Review）」。
4. **零偽密碼學演示 (Zero Cryptographic Theater)**:
   - 嚴禁在使用者無法點擊驗證的介面上堆疊 64 位元 SHA-256 字符串與假綠燈動畫。
   - 以真實可重現的 **`CI Invariant Gate: PASSED`** 取代。
5. **移除 AI 浮誇空洞詞彙 (Zero AI Buzzwords)**:
   - 禁用「第一性工程求解引擎」、「手術刀式擊穿」、「反脆弱交付」等無實質意義的修飾語。

---

## 4. SVG 向量圖表開發契約 (SVG Generator Contract)

所有向量圖表生成腳本（`svg-topology.mjs`, `svg-pipeline.mjs`, `svg-circuit-breaker.mjs` 等）必須遵循：
1. **簽名重載防禦 (Overload Handling)**:
   ```javascript
   export function renderTopologySvg(options = {}, language = 'en') {
     if (typeof options === 'string') {
       language = options;
       options = {};
     }
     // ...
   }
   ```
2. **100% 雙語文字對稱**:
   - 圖表內的所有節點標籤、階段描述與 Badge 必須透過雙語字典映射，繁體中文模式下嚴禁漏翻為英文。
3. **響應式 ViewBox 與純向量容器**:
   - 必須宣告合適的 `viewBox`，外層容器透過 `.resume-svg-wrapper` 保障行動端水平滾動防溢出。

---

## 5. 剛性驗證管線與建置流程 (The Invariant Pipeline)

在任何修改宣告完成或建置前，必須**依序通過三大驗證關卡**，缺一不可：

```bash
# 1. 物理單頁 A4 PDF 剛性約束驗證 (Page Count == 1, 所有關鍵事實無遺漏)
python3 scripts/validate-cv-candidates.py

# 2. CI 全套不變量防護閘門 (Gates 1~9 全數 PASSED)
node scripts/invariants/run-all-invariants.mjs

# 3. Next.js 完整型別檢查與生產環境靜態匯出
cd app && npm run build
```

- **不可自動提交 (Git Boundary)**: 任何 git commit 必須等待 Blake 當下的明確指令。
