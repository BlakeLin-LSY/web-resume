# 同步修復與公開文案校正

本輪範圍是本機修復、驗證與 commits。沒有 push、部署或邀請外部讀者。
保留既有版型、Human / Agent 閱讀模式、兩個職涯重點與兩個精選作品。

## 修復前證據

基準為 `12567bd`。README 的 `node scripts/lib/data-loader.mjs` 回傳 0，
但暫存副本中的文案修改沒有進入 compiled profile。
同一副本直接呼叫 `syncResumeProfileJson()` 則成功寫入。
`9c9bd72` 保存會失敗的 regression test，先於修復提交。

既有 invariants 與 typecheck 在修復前都通過，不能據此證明同步正確。

## 文案的來源與界線

- DynaSafe 採 career-ops-repo 的
  `interview-prep/professional-story-verification-cards-2026-09-29.md`
  與其連結的最新 DynaSafe story。本人定位 loader 瓶頸、指定方向並 review
  Claude 協助的修改。約 10× 為本人回憶，沒有保留 profiler trace、前後耗時
  或 matched-workload benchmark，不得包裝成已驗證的量測。
- 同份 verification card 與 `data/cv-decisions.md` 的後續決定撤回
  UTECHZONE 40% 與 LIPS 66% 的公開成果用法，直到取得原始量測證據。
- TFX 維持 Android prototype 定位。保留來源與檢視候選修改是設計意圖，
  不能據此宣稱 process termination 後零遺失、4× 修訂效率或企業採用。
- `llms.txt` 是手工維護的 Agent 入口，不會由 profile generator 更新。
  本輪一併校正其中相同的職涯與 TFX 說法。

## 發布前檢查清單

- [ ] 兩份下載 CV 完成選版與內容校正。2026-11-02 用 `pypdf` 讀出現有
  English / zh-TW PDF，仍含 10×、40%、66% 舊說法。本輪不替換原件。
- [ ] 核對未在本輪完整審查的 MetGauge 與 Atlas 敘述及 receipt 來源。
  本輪不是整站所有數值與證據的認證。
- [ ] 取得部署授權後，記錄要發布的 commit 與產物，再確認公開站實際提供
  相同版本，包括首頁、portable overview、llms.txt、作品頁與下載包。
- [ ] 依既定計畫找 3–5 位讀者，請他們說回兩個職涯案例、兩個作品及證據
  邊界。記錄原話與誤解，不以 agent 測試代替真人閱讀結果。

以上缺口未關閉前，不宣稱整站可發布或求職材料已全部對齊。
