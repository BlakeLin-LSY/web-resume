// Shared by the Next server page and the portable overview generator.
// Public text and hrefs are escaped here; no filesystem or browser dependency.
import { escapeHtml, renderPipelineSvg } from "../generators/components/svg-pipeline.mjs";
import { renderTopologySvg } from "../generators/components/svg-topology.mjs";
import { renderCircuitBreakerSvg, renderDualTrackSvg } from "../generators/components/svg-circuit-breaker.mjs";
import { renderAgentIr } from "../generators/components/agent-ir.mjs";
import { renderIntentContract } from "../generators/components/intent-contract.mjs";
import { renderArchitectureDuel } from "../generators/components/architecture-duel.mjs";
import { renderProofReceipt } from "../generators/components/proof-receipt.mjs";
import { renderUniversalEngineSvg } from "../generators/components/svg-universal-engine.mjs";
import {
  orchestrateResumePage,
  fallbackTriads,
  proofReceipts,
  renderPovBadges,
  renderAbRibbon,
  localize,
  period
} from "../layout/page-orchestrator.mjs";

export {
  escapeHtml,
  renderPipelineSvg,
  renderTopologySvg,
  renderCircuitBreakerSvg,
  renderDualTrackSvg,
  renderAgentIr,
  renderIntentContract,
  renderArchitectureDuel,
  renderProofReceipt,
  renderUniversalEngineSvg,
  fallbackTriads,
  proofReceipts,
  renderPovBadges,
  renderAbRibbon,
  localize,
  period
};

export function renderResume(profile, cases, assets, prefix = ".", notes, manifest) {
  return orchestrateResumePage({
    profile,
    cases,
    assets,
    prefix,
    notes,
    manifest
  });
}
