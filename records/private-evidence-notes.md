# 私有證據備忘與待補齊清單 (Private Evidence Backlog & Verification Debt)

> **性質**: 本檔為 Blake 的**內部私有工作備忘與追蹤清單**。  
> **嚴格隔離規範**: 本檔內容**嚴禁**編入任何對外發布的公開產物（包含 `app/public/`、PDF 履歷、網站 HTML、JSON API 或離線預覽壓縮包）。  
> **建立日期**: 2026-11-06  
> **用途**: 集中記錄先前從公開文案中移除的「不確定性」、「本人回憶」與「證據缺口」，作為日後個人補齊實體數據、日誌或測試記錄的行動指南。

---

## 1. 待補齊項目追蹤總表 (Action Checklist)

| 編號 | 經歷 / 專案 | 核心指標 / 宣稱 | 目前證據層級 | 待補齊之關鍵證據 (Evidence Debt) | 優先級 | 建議填入位置 |
|---|---|---|---|---|---|---|
| **EB-01** | **DynaSafe** | 訓練管線約 10× 提速 | 本人口述回憶 | 基準耗時 (Baseline vs Optimized)、Profiler trace、工作負載設定、Loss/收斂品質驗證 | **High** | `career-ops-repo/interview-prep/.../01-dynasafe-training-pipeline.md` |
| **EB-02** | **DynaSafe** | 資料載入器管線重構 | 架構主導＋AI協作 | 釐清主導設計架構（非同步預取、快取設計）與 Claude agent 實作 patch 的具體分工切分點 | **Medium** | 同上（面試準備與分工細節） |
| **EB-03** | **UTECHZONE** | 產線 AOI Cycle Time 縮短 40% | 歷史履歷數字 | 原始檢測單件耗時（秒數前後對照）、產線機台型號或檢測項目規格日誌 | **Medium** | `career-ops-repo/.../02-utechzone-aoi.md` |
| **EB-04** | **LIPS** | 即時 3D 量測精度提升 66% | 歷史履歷數字 | 精度誤差統計定義（如深度 RMSE、邊緣擬合誤差 mm 數）、前後量測測試報告 | **Medium** | `career-ops-repo/.../03-lips-stereo-metrology.md` |
| **EB-05** | **MetGauge** | 12 組立體相機 (24 顆相機) 產線拓撲 | 團隊專案推進至上線前測試 | 確認 12 組立體相機之物理相機總顆數（是否 1 pair = 2 相機）、團隊與個人職責分工界線 | **Low** | `career-ops-repo/.../04-metgauge-multicamera-integration.md` |
| **EB-06** | **Transcribe-for-X** | Android 雙軌保真架構 | 合成測試 Pass；實機待測 | 實體麥克風連續錄音長程串流完整性測試、低記憶體/螢幕關閉、Process 重啟復原驗收 | **Low** | `content/data/projects/transcribe-for-x.json` (或專案本體) |
| **EB-07** | **Study-Atlas** | TALK 1.8 預算閘門超標熔斷 (6.0 > 5.0) | 交付報告 (Report) 紀錄 | 初版方案超出預算之 Raw failure output 或終端機日誌（非重建模擬） | **Low** | `records/` |
| **EB-08** | **Windowphase** | 確定性視窗排程與環境變數除錯 | 歷史除錯紀錄 | 長期 systemd 服務執行與排程遙測監控日誌 (Telemetry) | **Low** | `windowphase/` 專案庫 |

---

## 2. 項目細節與補齊指引 (Itemized Evidence Details)

### EB-01: DynaSafe 訓練管線 10× 加速量測細節
- **公開版呈現**:  
  「針對資料載入瓶頸進行 I/O 重構，達成約 10 倍模型訓練提速（~10× training acceleration via dataloader I/O pipeline refactoring）。」
- **先前移除的不確定性語句**:  
  「本人回憶整體訓練時間縮短；未保存 trace、量測時間或匹配執行條件。」、「本人回憶改善 · 無 benchmark」。
- **為什麼需要補齊**:  
  在高端技術面試或深入技術職位討論中，面試官可能會追問：「10 倍是純 I/O 階段還是整體 Epoch 耗時？基準耗時是多少秒到多少秒？是否有 GPU 利用率（GPU Utilization %）的對照數據？」
- **Blake 行動指南**:  
  若能在歷史存檔、本機硬碟或雲端硬碟中找到以下任一項，請填入個人職涯筆記庫：
  1. 當時的訓練測試指令或 Profiler 截圖（如 PyTorch DataLoader num_workers, pin_memory 設定）。
  2. 前後耗時記錄（例如：每個 Batch 資料傳輸由 120ms 降至 12ms，整體 Epoch 訓練時間由 4 小時縮短至 25 分鐘）。
  3. 模型 Loss 曲線確認（證明 Loader 平行化未造成資料重複取樣或 Batch 污染）。

---

### EB-02: DynaSafe 程式實作與 AI 協作分工界線
- **公開版呈現**:  
  「定位深度學習模擬工作負載之資料載入 I/O 瓶頸，主導管線平行化重構並驗證訓練吞吐量提升約 10 倍。」
- **先前移除的不確定性語句**:  
  「定位資料載入瓶頸、指定最佳化方向，並審查 Claude 協助的修改。未保存精確實作細節。」
- **Blake 行動指南**:  
  準備好用第一人稱清晰敘述自己作為 Senior AI Engineer 的架構決策：
  1. 我如何利用 profiling 定位出是 CPU 資料解析（OpenFOAM 格式轉換）阻塞了 GPU 吞吐。
  2. 我如何規劃非同步預取（Prefetching）與多執行緒管線架構。
  3. 我如何利用 Claude 產出具體格式轉換實作 patch，並親自審查程式碼以確保型別安全與正確性。

---

### EB-03: UTECHZONE 產線 AOI 檢測 Cycle Time 縮短 40%
- **公開版呈現**:  
  「產線 AOI 單件檢測耗時（Cycle Time）縮短 40%。」
- **先前移除的不確定性語句**:  
  「比較基準與量測期間無法查證，因此不列數值成果。」
- **Blake 行動指南**:  
  若歷史筆記中有存留，記錄：
  1. 檢測耗時基準（例如：單件工件全檢耗時由 5.0 秒最佳化至 3.0 秒）。
  2. 瓶頸消除技巧（C# 記憶體指針直接操作、影像演算法多執行緒平行化、GPU 影像濾波加速）。

---

### EB-04: LIPS 3D 立體相機即時量測精度提升 66%
- **公開版呈現**:  
  「即時 3D 量測精度提升 66%。」
- **先前移除的不確定性語句**:  
  「原始量測無法查證因此不列成果。」
- **Blake 行動指南**:  
  若歷史筆記中有存留，記錄：
  1. 精度量測指標定義（例如：在 1.5 米工作距離下，深度量測誤差由 ±3.0mm 降低至 ±1.0mm）。
  2. 關鍵貢獻（立體校正棋盤格算法改進、亞像素視差匹配最佳化、溫度漂移補償）。

---

### EB-05: MetGauge 12 組立體相機 (24 顆相機) 產線拓撲
- **公開版呈現**:  
  「12 組立體相機（24 顆相機）產線檢測拓撲與軟硬體整合。」
- **先前移除的不確定性語句**:  
  「12 相機或 12 組 pair 定義未確認；個人分工無完整紀錄。」
- **Blake 行動指南**:  
  確認並記錄：
  1. 物理相機總顆數是否為 24 顆（12 stereo pairs，每組 2 顆相機）。
  2. 硬體同步匯流排（Hardware trigger bus）觸發頻率與次微秒同步機制之規格。

---

### EB-06: Transcribe-for-X Android 裝置端雙軌架構
- **公開版呈現**:  
  「Android 裝置端架構，以來源音訊不可變性與無損逐字稿清理為核心規範。」
- **先前移除的不確定性語句**:  
  「現有紀錄涵蓋部分合成儲存與檢視流程；麥克風擷取完整性與程序重啟復原尚未通過驗收。」
- **Blake 行動指南**:  
  若後續重啟該專案，依序執行：
  1. 在 Android 實機跑長程錄音測試（超過 30 分鐘，測試螢幕關閉、低記憶體 Doze 模式下的音訊連續性）。
  2. 驗證 Process Death 復原流程（在清理文字階段模擬 OS 砍程序，重啟後驗證未儲存狀態能安全復原）。

---

### EB-07: Study-Atlas TALK 1.8 預算閘門超標熔斷
- **公開版呈現**:  
  「TALK 1.8 預算閘門熔斷超標方案（6.0 > 5.0），自主重導向至 T5 精簡綜述（4.6）。」
- **先前移除的不確定性語句**:  
  「只有 dated report · 未保存初始完整路線」、「並非 raw failure log」。
- **Blake 行動指南**:  
  本項已有 9 月 13 日 delivery report 作為結構性依據，如能找到當時 CLI 觸發拒絕的 raw terminal 截圖或 log，可存入專案 records 作為永久封存依據。

---

## 3. 本檔與公開產物之隔離承諾 (Isolation Guarantee)

1. **零編譯進路**:  
   本檔位於 `records/`，全 repo 的 `scripts/`（包含 `data-loader.mjs`、`build-resume-overview.mjs`、`build-application-package.py`）只會掃描 `content/data/` 與 `content/` 指定的公開 JSON/資產，**絕對不會**讀取或輸出 `records/` 下的檔案。
2. **零打包暴露**:  
   離線預覽壓縮包 `blake-lin-application-preview.zip` 僅嚴格打包 7 個指定公開檔案（overview、工程筆記、3 個作品頁與 2 份 PDF），本檔絕不納入打包。
3. **持續保留與更新**:  
   日後 Blake 若在任何項目找到新的補充材料，可直接於本檔更新狀態與實體檔案路徑，並同步更新至 `career-ops-repo`。
