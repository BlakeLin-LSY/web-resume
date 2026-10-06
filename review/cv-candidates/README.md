# 兩語 CV 候選稿 — 2026-10-05

用途：讓目前通用 AI Software Engineer 網站與 PDF 使用同一近期敘事。這裡是候選稿，尚未替換 `app/public/resume/` 的 career 原件，沒有變更外部 career repo。

- [English PDF](blake-lin-cv-candidate-en.pdf)／[HTML](blake-lin-cv-candidate-en.html)
- [正體中文 PDF](blake-lin-cv-candidate-zh-tw.pdf)／[HTML](blake-lin-cv-candidate-zh-tw.html)
- [Provenance](provenance.json)：shared source／generator hashes 與本次 PDF hashes。PDF metadata 含生成時間，重建不保證 byte-identical；應核對內容、版面與新的 receipt。

## 編輯取捨

從 shared resume-profile 取姓名、Email、職稱、四份職業日期與數字、學歷、研究職務。CV-specific JSON 維護自然語言摘要、成果 bullets 與選取；指標與攝影機數量以 shared profile 的數字代入，project IDs 必須與通用首頁一致。Atlas／TFX 取代原 PDF 的 Fleet／ATK，因本版採研究閱讀與使用者控制的近期主線；不是否定其他作品。Skills 改為兩行、移到經歷之後。研究職務保留角色／日期，省略長描述；讀書會與興趣仍可在網站第二層查看。

沿用 HTML → Chromium PDF 的既有工具方式，不導入 Pandoc／TeX 或新的服務。第二版兩語本文10.5pt，各A4一頁；首次英文超出一頁時，縮短研究段落與章節留白，未縮小本文。Generator 會在替換好檔前拒絕非一頁PDF。原公開CV仍是career byte-identical copies；候選稿是本工作區衍生物。

## 重建

從 website repo 執行（替換為本機已安裝路徑；不需要 live model）：

```bash
PLAYWRIGHT_MODULE=<path-to>/node_modules/playwright CHROMIUM_PATH=<path-to>/chrome node scripts/build-cv-candidates.mjs
```

依賴：現有 Node／Playwright／Chromium，以及 Python pypdf。來源是 `content/resume-profile.json`、`content/cv-candidate.json`、`content/design-tokens.json`；不要只改HTML或PDF。

## 選定之後

Owner 選定候選版後，將 cv-candidate 的 status 改為 selected，重建並確認移除待審頁尾、兩語仍一頁。再複製至既有 public CV filenames，更新 resume-assets 的來源描述、bytes、hash，重建完整包並驗證 native下載／離線PDF。該替換另做 atomic commit，保留候選版 commit 及原下載版歷史。沒有選版時保留此候選稿；不把沉默視為同意。

## 第二版：依 owner 的「AI smell」回饋修訂

刪除 traceable／inspectable／inference boundaries 等抽象自我描述，改寫成做了什麼、解決哪個問題、產出什麼。職業經歷用簡短動詞 bullets；專案直接描述閱讀卡片與逐項刪改。移除 CV 中反覆的驗證說明，Android prototype 與工廠上線前測試的成熟度仍保留；完整來源／量測限制在網站與本工作區 review。Owner 尚未選定第二版，因此 public 下載版仍不替換。
