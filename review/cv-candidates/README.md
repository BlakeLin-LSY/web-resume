# 兩語 CV 候選稿 — 2026-10-05

用途：讓目前通用 AI Software Engineer 網站與 PDF 使用同一近期敘事。這裡是候選稿，尚未替換 `app/public/resume/` 的 career 原件，沒有變更外部 career repo。

- [English PDF](blake-lin-cv-candidate-en.pdf)／[HTML](blake-lin-cv-candidate-en.html)
- [正體中文 PDF](blake-lin-cv-candidate-zh-tw.pdf)／[HTML](blake-lin-cv-candidate-zh-tw.html)
- [Provenance](provenance.json)：shared source／generator hashes 與本次 PDF hashes。PDF metadata 含生成時間，重建不保證 byte-identical；應核對內容、版面與新的 receipt。

## 編輯取捨

從 shared resume-profile 取姓名、Email、職稱、四份職業日期與數字、學歷、研究職務。CV-specific JSON 只維護精簡敘事與選取，project IDs 必須與通用首頁一致。Atlas／TFX 取代原 PDF 的 Fleet／ATK，因本版採研究閱讀與使用者控制的近期主線；不是否定其他作品。Skills 改為兩行、移到經歷之後。研究職務保留角色／日期，省略長描述；讀書會與興趣仍可在網站第二層查看。

沿用 HTML → Chromium PDF 的既有工具方式，不導入 Pandoc／TeX 或新的服務。兩語本文10.3pt，各A4一頁；首次英文超出一頁時，縮短研究段落與章節留白，未縮小本文。Generator 會在替換好檔前拒絕非一頁PDF。原公開CV仍是career byte-identical copies；候選稿是本工作區衍生物。

## 重建

從 website repo 執行（替換為本機已安裝路徑；不需要 live model）：

```bash
PLAYWRIGHT_MODULE=/home/blake_u2204/.npm/_npx/e41f203b7505f1fb/node_modules/playwright CHROMIUM_PATH=/home/blake_u2204/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome /home/blake_u2204/.nvm/versions/node/v22.17.0/bin/node scripts/build-cv-candidates.mjs
```

依賴：現有 Node／Playwright／Chromium，以及 Python pypdf。來源是 `content/resume-profile.json`、`content/cv-candidate.json`、`content/design-tokens.json`；不要只改HTML或PDF。

## 選定之後

Owner 選定候選版後，將 cv-candidate 的 status 改為 selected，重建並確認移除待審頁尾、兩語仍一頁。再複製至既有 public CV filenames，更新 resume-assets 的來源描述、bytes、hash，重建完整包並驗證 native下載／離線PDF。該替換另做 atomic commit，保留候選版 commit 及原下載版歷史。沒有選版時保留此候選稿；不把沉默視為同意。
