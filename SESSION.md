# Portfolio 盤點到履歷證據修復 / Portfolio review to resume evidence repair

先讀 [交接 capsule](records/2026-11-07-modular-unslop-and-canonical-distillation-closure.md)（前版見 [2026-11-03 capsule](records/2026-11-03-portfolio-to-webresume-closure.md)）；本檔只補時間線與證據。紀錄不是政策。

## 2026-11-03 finalized

使用者明確要求 handoffs、commits 與簡短結束。前輪已批准 poteto-mode、本機修復與提交；未授權 push、部署或外部邀請。

1. 完成 27 個目標的 portfolio review、135 份回報與綜合排序，於 collection root 提交 `40736e57`、`60140003`。成果在 [盤點摘要](../../records/2026-10-30-portfolio-distillation/SUMMARY.md)。portfolio-distill draft 未通過推廣；原盤點的獨立 precommit docs review 因 quota 未完成，不追認為通過。
2. 使用者批准優先處理 Webresume，工作目錄改選本 repo。修復前 CLI 回傳 0 卻沒有同步，export 正對照成功。`9c9bd72` 先保存紅燈測試。
3. `079e75b` 補 CLI 入口、build 同步與深層 parity。獨立 review 發現 regression 未接 CI，`b294cab` 補上 build 前的 CI step。
4. 最新職涯來源把 DynaSafe 約 10× 限定為回憶，且 loader 由 Claude 協助修改；撤除不受支持的金額、GPU 與穩定性宣稱，並撤下 AOI/LIPS 舊數字及 TFX 保證。Human/Agent、SVG、llms 與生成產物一起更新為 `1083c2e`。
5. 曾遇 subagent credits 與 automatic approval reviewer quota 錯誤，未繞過；接續後同一 regression 通過。這不代表所有模型的 quota 均恢復。

## 結論與驗證界線

主 agent 跑過完整 regression 正負對照、production build、lint，並用 Chromium 驗證 localhost static export 與 file:// overview 的雙語、Human/Agent、390px 文案及 page errors。檢查生成 HTML、llms 與 ZIP，確認文案同步及兩個職涯／兩個精選作品保留。

獨立 agent integrated review 對文案與修復未提出其他問題，唯一 CI 缺口修正後，fresh follow-up 在 `b294cab` 回 PASS。Reviewer 未獨立完成 runtime regression，sandbox 回 EPERM；runtime pass 由主 agent 在核准的 escalation 執行。請勿稱為獨立 runtime 驗證或跨模型共識。委派指定 Luna max，實際執行模型 metadata 未驗證。

## 分類與交接

- 已批准並實作：同步、CI、限定範圍文案校正及本機提交。
- 已完成紀錄：portfolio 報告與本次交接。
- 非權威候選：portfolio-distill draft，未安裝或升格。
- 延後驗證：MetGauge/Atlas 完整證據核對、遠端 CI、公開站版本、3–5 位真人 readback。
- 發布阻礙：兩份 CV PDF 仍含舊 10×、40%、66% 宣稱；須先校正／選版，不能以網站文字修復代替。

## 2026-11-06 finalized: 以人為本模組化重構、真實職涯校準、內容去脂與指令正典提煉

使用者批准以人為本模組化重構（`plan-human-centric-modular-representations.md`）、真實職涯校準（`plan-align-real-career-pillars.md`）、內容去脂與雙語修復（`plan-content-rinse-and-diagram-consistency.md`）及指令正典提煉（`plan-lessons-distillation-and-update-walkthrough.md`）：

1. **宣告式模組化架構落地**:
   - 建立 `content/representation-manifest.json` 控管頁面區塊啟用與渲染次序。
   - 解耦 `scripts/lib/resume-markup.mjs`（-517 行），拆分為 `scripts/layout/page-orchestrator.mjs` 與 `scripts/modules/`（7 大獨立渲染器），保留完整向後相容性 Facade。
2. **職涯事實真理定錨**:
   - 首屏實證數據鐵軌（Impact Rail）修正為：`~10×` ML Training Acceleration（DynaSafe）、`-40%` AOI Cycle-Time Reduction（UTECHZONE）、`Large FOV` Stereo 3D Metrology（MetGauge & LIPS）。
   - MetGauge 去除次微秒硬體同步虛名，全面聚焦於多相機立體標定校正、原型推進至產線實測與高空大視野拼接。
   - DynaSafe 消除自貶式免責筆錄聲明，強化 DataLoader 序列化 I/O 瓶頸定位與非同步預取資料管線重構。
   - WindowPhase 依倉庫事實校準為 5 小時算力窗口排程 CLI，排除神經網絡臆測。
3. **全站與向量圖表去脂（Unslop）**:
   - 清除全站所有裝飾性 Emoji（⛔, ⚡, 🔒, 🎯, 🛡️, 📜, 🧐）與資料檔破折號（`—`）。
   - 拔除首屏巨幅抽象圖表 `svg-universal-engine.mjs` 與動漫式 RPG 對抗人設，改為客觀專業的架構審查。
   - 移除無法驗證的密碼學 Hash 字符串演示，改以客觀 `CI Invariant Gate: PASSED` 標籤呈現。
   - 修復 `svg-topology.mjs`、`svg-pipeline.mjs`、`svg-circuit-breaker.mjs` 語言參數字串重載防禦，達成 100% 繁體中文向量圖表對齊。
4. **專案級指令正典與機制化防護 (Mechanism Over Reminder)**:
   - 建立專案指令正典 `.agents/AGENTS.md`，固化職涯真理、去脂語調、SVG 契約與剛性驗證流程。
   - 新增第 9 道自動化閘門 `scripts/invariants/check-unslop-and-tone-invariants.mjs`，納入 `run-all-invariants.mjs`，蓄意負對照驗證成功。
5. **剛性單頁約束與生產建置全數通過**:
   - `python3 scripts/validate-cv-candidates.py`：英文（45,493 bytes）與繁中（680,751 bytes）候選 PDF 均嚴格剛好 1 頁 A4，數位簽章一致，無 placeholder 洩漏。
   - `node scripts/invariants/run-all-invariants.mjs`：9/9 Gates 全數 PASSED。
   - `cd app && npm run build`：Next.js 15.3.2 生產環境建置與靜態匯出（Export 3/3）成功。

下一個唯一 probe：本 repo 變更已完成本機完整驗證，保持乾淨就緒。等待使用者指示是否執行 git commit。


本 repo 在收尾前乾淨。Collection root 仍有別的工作留下的 WORKSTREAMS、convergence ticket_loop 與 CR26 紀錄修改，未暫存或提交。沒有新增偏好或知識候選。

暫存 `/tmp/webresume-browser-check.cjs` 與 `/tmp/webresume-preview-z1wxc_5k` 保留，沒有清理授權；localhost server 已停止。自動刪除的 regression fixture 由測試 finally 清除。
