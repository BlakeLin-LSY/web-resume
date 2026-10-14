import { escapeHtml } from "./svg-pipeline.mjs";

/**
 * Universal Agent AST / IR Syntax Highlighting Generator
 * Generates structured IR code blocks for AI agents and LLM crawlers.
 */
export function renderAgentIr({ astType, filename, badge = "AST / Spec", data }) {
  const e = escapeHtml;

  // Format object properties into semantic HTML
  const formatValue = (val, indentLevel = 1) => {
    const indent = "  ".repeat(indentLevel);
    if (typeof val === "string") {
      if (val === "GATE_CIRCUIT_REJECT" || val === "NON_DESTRUCTIVE_CANDIDATE_OVERLAY") {
        return `<span class="ir-control">"${e(val)}"</span>`;
      }
      if (val === "GATE_PROCEED_PERMITTED" || val === "0f5e66c74dbd8762f2a90936d238fc72d9939db6396d68d49703645834eeb0d5") {
        return `<span class="ir-verified">"${e(val)}"</span>`;
      }
      return `<span class="ir-str">"${e(val)}"</span>`;
    }
    if (typeof val === "number") {
      return `<span class="ir-num">${Number.isInteger(val) ? val.toFixed(1) : val}</span>`;
    }
    if (typeof val === "boolean") {
      return `<span class="ir-control">${val}</span>`;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      const items = val.map(v => `${indent}  ${formatValue(v, indentLevel + 1)}`).join(",\n");
      return `[\n${items}\n${indent}]`;
    }
    if (typeof val === "object" && val !== null) {
      const entries = Object.entries(val);
      if (entries.length === 0) return "{}";
      const props = entries.map(([k, v]) => `${indent}  <span class="ir-prop">"${e(k)}"</span>: ${formatValue(v, indentLevel + 1)}`).join(",\n");
      return `{\n${props}\n${indent}}`;
    }
    return String(val);
  };

  const formattedBody = Object.entries(data)
    .map(([k, v]) => `  <span class="ir-prop">"${e(k)}"</span>: ${formatValue(v, 1)}`)
    .join(",\n");

  return `<div class="resume-agent-ir resume-agent-view">
    <div class="resume-ir-header">
      <div class="resume-ir-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="resume-ir-tab">${e(filename)}</span>
      <span class="resume-ir-badge">${e(badge)}</span>
    </div>
    <pre><code><span class="ir-keyword">${e(astType)}</span> {\n${formattedBody}\n}</code></pre>
  </div>`;
}
