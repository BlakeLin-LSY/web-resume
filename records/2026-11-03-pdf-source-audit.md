# 雙語 PDF 職涯來源核對與最小替換方案

兩份下載 PDF 仍是 2026-10-07 選定的舊版本。檔案、manifest、候選稿、本機 build 輸出與離線 ZIP 一致，但內容尚未反映後續職涯澄清。可直接校正 DynaSafe 歸因、移除未有量測支持的成果數字，並收斂 MetGauge 的個人主導用語。MetGauge 的相機與 stereo pair 計數方式另需本人確認，不能自行把 12 解讀為 24 顆相機。

本輪只交付核對紀錄與方案。未更改 PDF、網站來源或輸出，未寫入 career repo，未 commit、push、部署或外聯。未重做 portfolio 盤點，未委派 agent 或呼叫模型 provider。

## 核對基準與證據層級

- 工作目錄固定為 `/home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume`。
- 產品 HEAD 實讀為 `3dbbb9935637e7a62d177e191d5948fdc4969c03`，開始時工作樹乾淨。
- career repo HEAD 實讀為 `6268534d2a9f4c24aecb57411151b21ea7ceffc9`，工作樹原本已有修改及未追蹤檔。本輪依目前磁碟內容核對，沒有假設所有來源都在該 commit 裡。
- verification cards、DynaSafe 等 story files 與 article-digest 是 career repo 未追蹤內容，story-bank 已修改；其內容不能只用 career HEAD 重建。每份受引用來源的實際 bytes、SHA-256、mtime 與 Git 狀態保存在 [snapshot.json](../review/pdf-audit-2026-11-03/snapshot.json)。時間使用 Asia/Taipei。
- 證據層級是「本機二進位身分／文字抽取／來源語意核對」。職涯來源中的本人回憶沒有因這次核對而升格成獨立 benchmark；本輪也沒有驗證公開網站、執行新 PDF 產生流程或完成新 PDF 視覺驗收。

| 語言 | 實際 bytes | 頁數 | SHA-256 | manifest |
|---|---:|---:|---|---|
| English | 44,420 | 1 | `c0b5955e7467721b5d09b4942e0ef4354e782455baea6d2fb0de1888df76a137` | 相符 |
| zh-TW | 550,969 | 1 | `8d0cfb30adeaac71b1aa2075319e8f43914ac80459162be968fe22323f10656f` | 相符 |

兩檔位於 `app/public/resume/`，檔名由 `content/resume-assets.json` 取得。兩個 `review/cv-candidates/*.pdf` 與兩個 `app/out/resume/*.pdf` 均逐 bytes 等同對應公開資產，沒有在這些入口找到另一份較新、已選定的 PDF。PDF metadata 的建立時間分別為 2026-10-06 18:11:58／18:12:02 UTC；manifest 的 edition 日期與 owner 選定日期是不同事件。

## 來源索引

以下 S 編號供差異表追溯。路徑均為本輪讀到的實際磁碟位置；hash 與 mtime 見 snapshot。

| 編號 | 來源錨點 | 用途 |
|---|---|---|
| S1 | [verification cards](/home/blake_u2204/projects/career-ops-repo/interview-prep/professional-story-verification-cards-2026-09-29.md:4)；關鍵行 4、11–17、25、Camera-role supporting story | 後續 metric 規則、DynaSafe 分工與 MetGauge 邊界 |
| S2 | [cv-decisions.md](/home/blake_u2204/projects/career-ops-repo/data/cv-decisions.md:48)，48–54；舊批准在 32–34 | 2026-10-18 明確取代 UTECHZONE／LIPS 舊數字使用規則 |
| S3 | [DynaSafe story](/home/blake_u2204/projects/career-ops-repo/interview-prep/technical-story-library-2026-09-30/01-dynasafe-training-pipeline.md:109)，11–21、83、99、109 起 | 本人口述、loader 範圍、Claude 實作、量測與品質缺口 |
| S4 | [AGENT-CONTEXT.md](/home/blake_u2204/projects/career-ops-repo/data/career-status/AGENT-CONTEXT.md:269)，255、261、269 | 2026-10-15 本人確認基線、定義及分工紀錄缺口 |
| S5 | [config/profile.yml](/home/blake_u2204/projects/career-ops-repo/config/profile.yml:75)，75–87 | 四個職涯案例目前可用 framing |
| S6 | [UTECHZONE story](/home/blake_u2204/projects/career-ops-repo/interview-prep/technical-story-library-2026-09-30/02-utechzone-aoi.md:11)，11–26 | 不用舊百分比；保留 C# AOI、帶新人與跨團隊工作 |
| S7 | [LIPS story](/home/blake_u2204/projects/career-ops-repo/interview-prep/technical-story-library-2026-09-30/03-lips-stereo-metrology.md:11)，11–26 | 不用舊百分比；保留量測、校正與演算法工作 |
| S8 | [MetGauge story](/home/blake_u2204/projects/career-ops-repo/interview-prep/technical-story-library-2026-09-30/04-metgauge-multicamera-integration.md:11)，11–26、40 | 團隊貢獻；個人分工無紀錄；相機／pair 計數未確認 |
| S9 | [cv.md](/home/blake_u2204/projects/career-ops-repo/cv.md:7)，Professional Summary、Work Experience、Education、STAR Story Bank | 經歷日期、職稱、舊數字與保留的其他事實 |
| S10 | [GROUND-TRUTH.md](/home/blake_u2204/projects/career-ops-repo/data/career-status/GROUND-TRUTH.md:23)，Experience | 3+ 年是專業 software／algorithm 經驗；AI/ML 學習不是 production 年資 |
| S11 | [story-bank.md](/home/blake_u2204/projects/career-ops-repo/interview-prep/story-bank.md:169)，169–189、311–314；[article-digest.md](/home/blake_u2204/projects/career-ops-repo/article-digest.md:47)，47–75 | MetGauge 邊界與 Atlas 一次歷史流程證據 |
| S12 | [Atlas story](/home/blake_u2204/projects/career-ops-repo/interview-prep/technical-story-library-2026-09-30/05-study-atlas-research-delivery.md:13)，13–24；本 repo `content/data/projects/study-atlas.json`、`transcribe-for-x.json` | 個人專案成熟度與可支持範圍 |

S3、S6–S8 已含本人澄清，不用通用技術教材補寫歷史實作。S11 的原始 live-run 路徑屬 Atlas 深入驗證，本輪僅採讀到的日期化來源敘述，不把它當成本輪獨立重跑結果。

## 差異表與雙語建議

兩份 PDF 都只有第 1 頁。下表引句做 NFKC 正規化、合併抽取換行與多餘空白，例如 `proﬁling` 成為 `profiling`、`⼯` 成為 `工`；未改語意。未正規化的原始字元與頁碼保存在 [English raw](../review/pdf-audit-2026-11-03/en.txt) 與 [zh-TW raw](../review/pdf-audit-2026-11-03/zh-TW.txt)。

| 項目／頁碼 | PDF 原句 | 來源錨點 | 判定 | English 建議 | zh-TW 建議 |
|---|---|---|---|---|---|
| D1 數字；兩語 p.1 DynaSafe | EN: “making model training 10× faster.” ZH:「將模型訓練速度提升 10 倍。」 | S1:11、17、24–26；S3:19、83、99 | 可直接校正。只有本人回憶的整體 training-time 改善，沒有可追溯前後耗時、matched workload 或品質比較。PDF 現在把幅度直接寫成果。與 D2 合併改一句即可。 | Omit the numerical result. If an observation is needed: “The owner recalls an overall training-time improvement; no comparable benchmark record is preserved.” | 省略數字。若要保留觀察：「本人回憶整體訓練時間有所改善，未保存可核對的 benchmark 紀錄。」 |
| D2 實作歸因；兩語 p.1 DynaSafe | EN: “Rebuilt the training-data pipeline after profiling a dataloader bottleneck” ZH:「分析資料載入瓶頸並重建訓練資料流程」 | S1:17、25；S3:83、99、109 起；S5:77–78 | 可直接校正。本人定位、指定方向及 review；Claude agent 修改 demo 的 data-format loader。既有句子也把 loader 修改擴大為整條 training-data pipeline 重建。 | “Diagnosed a PhysicsNeMo demo data-format loader bottleneck, specified the optimization direction, and reviewed the code change made by a Claude agent.” | 「定位 PhysicsNeMo 訓練範例的資料格式載入瓶頸、指定最佳化方向，並審查 Claude agent 完成的程式修改。」 |
| D3 UTECHZONE 成果；兩語 p.1 | EN: “Developed C# optical-inspection algorithms that reduced AOI cycle time by 40%.” ZH:「開發 C# 自動光學檢測演算法，將產線 AOI 檢測週期縮短 40%。」 | S2:48–54；S4:261、269；S6:11–26 | 可直接校正，且須保留來源矛盾。舊 `cv.md` 與 05/30 ledger 仍有 40%，10/18 決定已明確撤回候選人材料用法。不能補成 throughput、節省工時或品質不變。 | “Developed C# automated optical-inspection algorithms for manufacturing-line inspection and quality checks.” | 「開發 C# 自動光學檢測演算法，支援製造產線檢測與品質檢查。」 |
| D4 LIPS 成果與因果；兩語 p.1 | EN: “Improved real-time 3D measurement accuracy by 66% through algorithm redesign and calibration of Intel RealSense D415/D435 stereo-camera systems.” ZH:「改良量測演算法並校正 Intel RealSense D415／D435 立體攝影機，將即時 3D 量測精度提升 66%。」 | S2:48–54；S4:261、269；S7:11–26 | 可直接校正，且須保留來源矛盾。沒有 raw before/after 或 accuracy 定義，不能改寫成 error reduction，也不能保留已量測改善的因果句。 | “Worked on real-time stereo-camera 3D-metrology algorithms, including algorithm redesign and Intel RealSense D415/D435 camera calibration.” | 「參與即時立體攝影機 3D 量測演算法工作，包含演算法重新設計與 Intel RealSense D415／D435 相機校正。」 |
| D5 MetGauge 歸因；兩語 p.1 | EN: “Took a C++/Python 3D-measurement prototype to factory-ready production testing” / “Led system design, hardware integration and boundary testing; used test results to guide hardware tuning.” ZH:「將 C++／Python 3D 量測原型推進到工廠上線前測試」／「負責系統設計、軟硬體整合與邊界測試，依測試結果協助跨部門硬體調校。」 | S1 Camera-role；S5:79–81；S8:11–25；S11:173–189 | 可直接收斂為團隊貢獻。兩語都把 project scope 寫成本人主導；EN “Led” 尤其強。factory-ready testing 階段有來源，正式上市、持續量產或全部工作本人完成沒有來源。精確個人拆分已確認無紀錄，不重問。 | “Contributed to a C++/Python multi-camera 3D-measurement project; the team advanced its MVP to factory-ready production testing.” Second bullet: “Project scope included system design, hardware integration, boundary testing, and analysis to support hardware tuning.” | 「參與 C++／Python 多相機 3D 量測專案，團隊將 MVP 推進至工廠上線前測試。」第二點：「專案範圍包含系統設計、硬體整合、邊界測試，以及支援硬體調校的分析工作。」 |
| D6 MetGauge 數量單位；兩語 p.1 | EN: “on a line with 12 stereo-camera pairs.” ZH:「整合 12 組立體攝影機。」 | S8:19、26、40；S9 中英文 MetGauge；本 repo `content/data/career/metgauge.json` 的 `cameraPairs: 12` | 來源未解決，需本人確認相機／stereo pair 定義。現有 career story 明確標為未知，網站卻將單位固定為 pairs。不能判定一定是 12 或 24 顆。最小安全版使用 D5 的 multi-camera，暫不帶數量。 | “multi-camera 3D-measurement project” | 「多相機 3D 量測專案」 |
| D7 摘要年資；兩語 p.1 opening | EN: “Software engineer with 3+ years of experience in ML training, computer vision and hardware integration.” ZH:「軟體工程師，具 3 年以上 ML 訓練、電腦視覺與軟硬體整合經驗。」 | S9 Professional Summary；S10 Experience | 可依來源澄清，不判定已證明造假。集合式列舉容易讀成有 3+ 年 professional ML training。來源確認的是累計 software／algorithm 專業年資。摘要的 Android app 也可與本文 prototype 定位一致。 | “Software and algorithm engineer with 3+ years of professional experience in computer vision and hardware-software integration. Additional work includes model-training workflows, a personal bilingual research reader, and an Android recording-to-text prototype.” | 「具 3 年以上專業經驗的軟體與演算法工程師，涵蓋電腦視覺與軟硬體整合。另有模型訓練流程經驗，近期個人作品包括雙語研究閱讀工具與錄音轉文字的 Android 原型。」 |
| D8 UTECHZONE 中英成果範圍；兩語 p.1 第二點 | EN: “Mentored two engineers and worked with a cross-functional team of 10+ on system integration.” ZH:「指導兩位工程師，與 10 人以上跨部門團隊完成系統整合。」 | S9 UTECHZONE bullet；S6:21、25 | 可直接對齊。來源是共同達到 integration milestones；ZH 的「完成系統整合」較 EN “worked … on” 強，不能推定整套系統全數驗收完成。2 與 10+ 有 CV 記錄，沒有本輪獨立重測。 | “Mentored two engineers and collaborated with a cross-functional team of 10+ on integration milestones.” | 「指導兩位工程師，並與 10 人以上跨部門團隊共同推進整合里程碑。」 |

D1 與 D2 是同一個 PDF bullet 的兩種問題，不是兩項獨立業績。D5 與 D6 可用同一對多相機／團隊貢獻 bullets 一起處理。

## 其他內容的逐項結論

| 受檢查內容，均為兩語 p.1 | 來源與比對結果 | 處置與證據限制 |
|---|---|---|
| DynaSafe 第二點：Morpheus、真實 PCAP、PhysicsNeMo／OpenFOAM CFD | S9 DynaSafe bullets、S3 次故事與兩語對得上。英文 “Adapted”、中文「調整／應用」沒有宣稱資安或 CFD 品質驗證完成。 | 可保留；不新增 inference 加速、detection precision、完整 CFD correctness 或最終部署成功。 |
| 四份受僱經歷的公司、職稱及年月 | DynaSafe 2026-01～04、MetGauge 2023-09～2024-08、UTECHZONE 2021-06～2022-03、LIPS 2019-07～2020-04，與 S9 對得上。 | 可保留。LIPS Algorithm Development 是角色名稱的同義呈現，未擴充職責。 |
| Study Atlas 全段 | EN “English and Traditional Chinese cards / short and in-depth reading routes / reject an over-budget reading plan”；ZH「中英雙語卡片／簡短與深入兩種閱讀路線／交付前退回修訂」語意相符。本 repo local source 支持閱讀形式；S11、S12 支持一次歷史流程中的預算 gate。 | 可保留為個人專案描述。不是目前所有請求的可靠性認證，不是人類閱讀速度、外部採用或內容正確性。本人／agent 程式逐項分工在 S12:23 尚未完成確認；“Built” 不在此升格為每行程式親自撰寫。 |
| Transcribe-for-X 全段 | EN “Android prototype … saves audio before … local speech recognition … accept or reject each removal”；ZH「Android 原型／先保存錄音／本機辨識／逐項接受或拒絕刪除」語意相符。本 repo local source 支持 prototype、音訊／修改建議分開保存。 | 保留 prototype 與功能描述。career 主檔沒有對此提供獨立驗收；本輪沒有到 TFX repo 驗證。不能推成實體錄音完整、程序終止後零遺失或 process-restart recovery 已驗收。 |
| 技能兩行 | Python、C++、C#、ML pipelines、Computer vision、Profiling、校正、硬體整合、Test design，兩語相符，與受僱經歷及 S9 的技術範圍相容。 | 可保留。泛稱 Profiling 不等於知道 NVIDIA 工具名稱、保留 profiler trace 或完成 benchmark。沒有新增 Go／PyTorch。 |
| 學位、研究助理、課程與空檔 | NCU 物理 M.S. 2016～2018／B.S. 2012～2016、RA 2018-09～2019-01、Google Grow with Google 2022-04～2023-08、gap 2020-04～2021-05，兩語與 S9 對得上。 | 可保留。課程並未寫成學位或受僱職位；未收錄其他經歷／最新 coursework 是編輯選取，不能只因 CV 有而強制補入一頁版。 |
| 姓名、email、GitHub、網站連結與兩語職稱 | 每份 PDF 都抽出三個正確 URI annotations：mailto、GitHub、Web Resume。姓名職稱與 shared identity 一致。 | 保留本地已選定的聯絡揭露範圍。career 申請包的電話、地址、LinkedIn 規則不自動擴張為公開網站 CV 必須新增的個資；改揭露範圍需本人另行決定。 |

## 三種判定的邊界

**可直接依來源校正**：D1–D5、D7、D8。依現有澄清即可提出安全版，不必重新確認已記錄的缺口。D6 可先省略數量，不因此阻擋其他校正。

**來源矛盾，原樣保留在稽核中**：S2 的 2026-05-30 條目與 S9 仍有舊數字；S2 的 2026-10-18 條目明確取代 UTECHZONE／LIPS 使用方式，S1／S3 的 2026-10-08 澄清否定 DynaSafe 的量測與作者歸因。這不是多份文件獨立證明相同業績。`cv.md` 被保留為歷史來源，不是把所有舊句子繼續放入新公開材料的授權。網站 shared MetGauge source 仍有 “Led”、`cameraPairs: 12` 等較強說法，不能用它回頭裁掉 S8 的未知。

**需要本人確認或新原件，才可恢復較強主張**：D6 的相機／pair 數量定義；若要恢復 DynaSafe 數字，須有前後時間及比較條件，若要恢復 UTECHZONE／LIPS 百分比，須有原始量測與指標定義。精確 loader API／實作、MetGauge 個人分工與驗收細節也不能由本輪補寫。已確認「目前無紀錄」的問題不重問；等待新原件即可。這些缺口不妨礙使用上表的保守文案。

## 既有來源與產生流程

```text
content/data/                    職涯日期、數字與網站雙語內容
    |
    v
scripts/lib/data-loader.mjs
    |
    v
content/resume-profile.json      compiled shared profile
    + content/cv-candidate.json  PDF 專用 summary、bullets、projects、skills
    + content/design-tokens.json
    |
    v
scripts/build-cv-candidates.mjs  既有 HTML -> Chromium A4 PDF
    |
    v
review/cv-candidates/            兩語 HTML、PDF、provenance.json
    |
    | 兩語內容、版面及來源審閱通過後才選版
    v
app/public/resume/ + content/resume-assets.json
    |
    +--> 首頁 renderer / portable overview 的既有下載路徑
    +--> build-application-package.py -> application-preview.zip
    +--> Next build -> app/out/
```

以上是既有流程，無需新建履歷產生器。PDF 並非直接複製現今 career repo 的原件；本地 README 記錄 owner 於 2026-10-07 選定第二版，且本輪實際 hash 證實公開資產與該候選 PDF 相同。`review/cv-candidates/README.md:13` 尚有「原公開 CV 仍是 career byte-identical copies」的過期句，與同檔開頭、結尾及磁碟不符，後續應一起校正文檔。

目前不能原封不動重建：

1. `content/cv-candidate.json` 兩語 UTECHZONE／LIPS 各有 `{value}`。目前 shared profile 這兩項已無 metric，generator 第 30 行會在 substitution 遇到 `undefined` 時拋出 `Unknown CV fact value`。本輪只做 substitution 來源追蹤，沒有啟動會寫檔的 generator。
2. 舊 provenance 記錄的 profile 為 17,522 bytes、`ab4ee7758790cabe81c05aca7a0f66984c5505c27db9f2c93b7f43403c3fef9d`；目前為 52,297 bytes、`082769a4ecf5000b84f691a188d2d420cf6052850815883eb86c320a65891aaf`。其他三份 input hash 仍相符。完整 candidate validator 已實跑並以 `AssertionError: content/resume-profile.json` 退出 1。
3. `scripts/validate-cv-candidates.py:24–25` 仍從所有 shared metric 加入裸數字必含條件，不適合要求 PDF 省略 DynaSafe 10× 的新選取。以既有函式做隔離實驗，移除 DynaSafe 的 `10× faster.` 後仍被接受，因 UTECHZONE 的團隊 `10+` 滿足裸字串 `10`。刪掉 email 則正確拒絕。這證明該檢查不驗 metric 語意；完整 validator 目前仍因 provenance 失敗，不能混稱全套通過。

## 最小替換方案，尚未執行

審閱問題是要保留現狀、只校正四個優先問題，或一次收斂本輪所有已查到的 PDF 問題。

| 選項 | 機制與取捨 |
|---|---|
| A 暫不替換 | 有效選項。保留目前檔案，這份報告作為已知缺口；舊主張持續存在，不能宣稱下載版已對齊。 |
| B 只改四個優先問題 | 改 DynaSafe、UTECHZONE、LIPS 的 PDF-specific bullets，沿用 generator 重建。範圍較小，但仍留下已知 MetGauge 歸因／數量與摘要歧義，不建議作為完整校正版。 |
| C 全部採安全文案 ⭐ | 在同一份 CV-specific JSON 改 D1–D8，MetGauge 先用 multi-camera，保留版型、兩語、兩個作品及既有路徑。多校正數句，但能解除本輪已知 PDF 問題，無須補數字或重造工具。先留在 review 供審閱；若不合意，可只撤回這批本地修改，原 PDF 在接受前保持不動。 |

建議 C，授權仍停在本輪盤點與方案，未據此進入替換。

| 後續檔案 | 最小必要影響 |
|---|---|
| `content/cv-candidate.json` | 改雙語 summary、四份職涯 bullets；移除 DynaSafe／UTECHZONE／LIPS `{value}`；MetGauge 先移除 `{cameraPairs}`，不改 shared 數字猜測。選定新 edition 名稱並保留歷史。 |
| `scripts/validate-cv-candidates.py` | 改掉 shared metric 裸數字必含條件，根據 PDF 實際選取驗內容。於 DynaSafe 職涯段確認 diagnosis／Claude 分工；拒絕該段裸稱 10×、AOI 40%、LIPS 66% 及未替換 placeholder。保持姓名、email、公司、日期、頁數、hash 與移除 email 反例。不得以全頁裸數字禁止 10，否則會錯殺合法 team 10+。仍需人工判讀雙語語意。 |
| `review/cv-candidates/blake-lin-cv-candidate-{en,zh-tw}.{html,pdf}` 與 `provenance.json` | 用既有 generator 重新產生。驗新 input/output hashes；PDF metadata 含時間，不能要求與舊檔 byte-identical。先審閱兩語 PDF，兩份都通過才 promote。 |
| `app/public/resume/blake-lin-cv-{en,zh-tw}.pdf` | 選版獲准後才更新，沿用 URL 與檔名。 |
| `content/resume-assets.json` | 依新實際檔更新 sourceVersion、bytes、sha256、pageCount，不手填舊 hash。 |
| `app/public/blake-lin-application-preview.zip` | 經既有 build 重產，兩個 PDF entries 與 ZIP manifest 都必須等同新 public 檔。 |
| `review/cv-candidates/README.md` | 校正上述過期複製說法，補新選版／receipt 與既有 rebuild 步驟。 |
| `app/public/resume-overview.html`、既有 build 生成的其他 HTML／CSS 與 `app/out/` | 不手改。既有 `npm run build` 會觸及生成端；檢視實際 diff，僅接受本次必要衍生變更，不藉機改版。`app/out/` 是 build 輸出，不視為另一個可手編來源。 |

PDF-specific 修正不要求改 shared `content/data/career/metgauge.json` 或 `content/resume-profile.json` 的手工內容。後者由 data-loader 產生。shared MetGauge 仍有較強網站用語與相機單位，是本輪看見的相關來源風險；要連網站一起校正，須另行界定範圍，不能以本輪 PDF 方案默認授權。無需改 `scripts/build-cv-candidates.mjs`、版型或外部 career repo。

## 已執行的核對與正對照

- `pypdf` 對兩份 PDF 各抽取 1 頁，共 2 頁，保留 raw 與 NFKC 兩種文字。每份 11 個正對照都命中，包括姓名、email、四家公司、兩個作品，以及 10×／10 倍、40%、66%。不是以找不到關鍵字推論沒有差異。raw 字元數及每個控制結果在 snapshot。
- 將抽取文字的 email 移除後，存在檢查辨識為缺失；既有 `inspect_text` 函式也拒絕缺 email。這只證明文字／欄位檢查有執行，不證明職涯事實是真的。
- 用實際 `app/app/page.tsx` 採用的 `renderResume` 函式產生字串，抽出 6 個 `data-resume-cv` anchor，均指向 `/web-resume/resume/` 的兩個 manifest filenames。portable overview 另抽出 6 個相對 PDF anchors，兩個 package anchors 指向既有 ZIP。
- ZIP CRC 通過，兩個 PDF entries 的 bytes/hash 與 public、ZIP manifest 相符；`app/out` 的兩個 PDF 也相符。因此是內容過期，並非本機入口各自提供不同選版。
- 既有 `validate-resume-assets.mjs` 實跑通過兩語。起初 shell 的 `node` 不在 PATH，以已安裝的 `/home/blake_u2204/.nvm/versions/node/v22.17.0/bin/node` 重跑成功，沒有安裝套件。candidate validator 的失敗與隔離函式實驗已分開記錄。
- 未啟動 public URL 的 HTTP 下載或完整瀏覽器點擊流程；本輪結論限於本機 renderer、檔案與 archive 的追溯，不是正式部署驗收。

## 後續驗證命令與失敗訊號

下列既有檢查以實際存在的絕對路徑為準。核對與產生分開，產生／build 命令本輪均未執行。不要加 `python -O`，否則既有 Python assertions 會被停用。

1. 重新確認工作樹及受檢版本。`git status` 有輸出不是失敗，也可能是別人的正常修改；HEAD 與 snapshot 不同或出現未審閱變更時，先重新核對，不重設工作樹。

```bash
git -C /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume rev-parse HEAD
git -C /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume status --short
```

2. 確認 public PDF 封籤。失敗訊號為 non-zero exit、`CV asset drift`、signature 錯誤，或應有的兩行 `Verified CV` 未同時出現。只通過此項不等於文案正確。

```bash
/home/blake_u2204/.nvm/versions/node/v22.17.0/bin/node /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/scripts/validate-resume-assets.mjs
```

3. 在候選來源及 validator 校正、generator 重建後驗候選。失敗訊號為 non-zero exit、任何 AssertionError／ValueError，或輸出不是兩語各一頁的 candidates，`factsPresent`／`missingContactRejected` 有 false。本輪預期目前舊版仍先因 provenance 退出 1。

```bash
python3 /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/scripts/validate-cv-candidates.py
```

4. 來源一致性與型別檢查。兩個命令各自以 non-zero exit 為失敗；invariants 要有實際檢查輸出，不能只看 shell 沒報錯。這些檢查不取代職涯來源審閱。

```bash
PATH=/home/blake_u2204/.nvm/versions/node/v22.17.0/bin:$PATH npm --prefix /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/app run test:invariants
PATH=/home/blake_u2204/.nvm/versions/node/v22.17.0/bin:$PATH npm --prefix /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/app run typecheck
```

5. 以下是後續獲授權後的本機產生命令，會寫入候選／網站輸出，不屬本輪唯讀驗證。從指定工作目錄執行。Playwright 1.61.0 module 已成功 require；其預設 Chromium 1228 不存在，另有實際存在的 Chromium 1243 可顯式指定。尚未驗證此組合能 launch／render，失敗時保留原 public PDF，不臨時改裝新 generator。

```bash
PLAYWRIGHT_MODULE=/home/blake_u2204/.npm/_npx/e41f203b7505f1fb/node_modules/playwright CHROMIUM_PATH=/home/blake_u2204/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome /home/blake_u2204/.nvm/versions/node/v22.17.0/bin/node /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/scripts/build-cv-candidates.mjs
```

失敗訊號為 non-zero exit、browser launch error、`Unknown CV fact`、非一頁錯誤，或 receipt 缺任一語言。generator 成功後重新執行第 3 項，再逐頁查看 PDF 字形、裁切、行距、三個連結與本文語意；文字抽取不能替代目視。

選版獲准、複製兩份 PDF 並更新 manifest 後，才執行既有本機 build：

```bash
PATH=/home/blake_u2204/.nvm/versions/node/v22.17.0/bin:$PATH npm --prefix /home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume/app run build
```

失敗訊號為 non-zero exit、invariant 拒絕、`Canonical CV mismatch` 或 Next build error。成功仍要重做本輪的 pypdf 逐頁抽字、兩語來源表、ZIP entries／manifest hash 比較與實際本機下載，不能只用舊 snapshot 封籤驗新的 PDF。公開站驗收與發布授權另行處理。

6. public PDF 與離線包的一致性可用以下唯讀命令重查。本輪已執行通過，測得兩份各一頁。失敗訊號為 non-zero exit、AssertionError／讀檔錯誤，或缺少兩行 `public/ZIP verified`。它驗封籤、頁數及必要欄位，仍不認證業績真實性。

```bash
python3 - <<'PY'
from pathlib import Path
import hashlib, json, re, unicodedata, zipfile
from pypdf import PdfReader
root = Path('/home/blake_u2204/projects/trivial-ideas/webresume-showcase/web-resume')
assets = json.loads((root / 'content/resume-assets.json').read_text())
assert sorted(assets['locales']) == ['en', 'zh-TW']
with zipfile.ZipFile(root / 'app/public/blake-lin-application-preview.zip') as archive:
    assert archive.testzip() is None
    manifest = json.loads(archive.read('manifest.json'))
    for locale, asset in assets['locales'].items():
        name = 'resume/' + asset['file']
        path = root / 'app/public' / name
        raw = path.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        assert raw.startswith(b'%PDF-')
        assert len(raw) == asset['bytes'] and digest == asset['sha256'], locale
        reader = PdfReader(path)
        assert len(reader.pages) == asset['pageCount'] == 1, locale
        text = reader.pages[0].extract_text()
        normalized = re.sub(r'\s+', '', unicodedata.normalize('NFKC', text))
        for required in ['ssu.yuan.lin@gmail.com', 'DynaSafe', 'UTECHZONE', 'LIPS', 'MetGauge']:
            assert required in normalized, (locale, required)
        assert archive.read(name) == raw, locale
        entry = next(e for e in manifest['files'] if e['file'] == name)
        assert entry['bytes'] == len(raw) and entry['sha256'] == digest, locale
        print(locale, 'public/ZIP verified', len(reader.pages), len(raw), digest)
PY
```

## 交付狀態

- 已完成：兩份 PDF 的 binary 身分、完整逐頁抽字、來源與雙語語意核對、既有流程及最小替換方案。證據為本報告與 `review/pdf-audit-2026-11-03/`。
- 進行中：無，本輪已停止於盤點與方案。
- 下一步：若日後授權替換，先按選項 C 編修 CV 專用來源及 validator，再產候選供審閱，不直接蓋 public 檔。
- 風險／未決：相機計數定義與量測原件不足；career 工作樹非乾淨；舊 provenance 過期；browser launch／新 PDF 版面未驗；shared MetGauge 網站內容仍較強。

兩語下載檔已查清來源與差異；現階段交付的是可審閱的校正方案，PDF 與發布狀態維持原樣。
