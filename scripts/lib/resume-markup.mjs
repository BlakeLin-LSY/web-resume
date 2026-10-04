// Shared by the Next server page and the portable overview generator.
// Public text and hrefs are escaped here; no filesystem or browser dependency.
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

const languages = ["en", "zh-TW"];
const localize = (render, tag = "div", attributes = "") => languages.map(language =>
  `<${tag} lang="${language}" data-resume-locale="${language}" ${attributes}>${render(language)}</${tag}>`
).join("");

const period = (start, end, language) => {
  const date = (value) => {
    if (value === "ongoing") return language === "en" ? "Ongoing" : "持續中";
    if (value.length === 4) return value;
    return new Intl.DateTimeFormat(language === "en" ? "en" : "zh-TW", { year: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`));
  };
  return `${date(start)} – ${date(end)}`;
};

export function renderResume(profile, cases, assets, prefix = ".") {
  const e = escapeHtml;
  const copy = profile.copy;
  const career = new Map(profile.professional.map(item => [item.id, item]));
  const projects = new Map(cases.projects.map(item => [item.id, item]));
  const blurbs = new Map(profile.projects.map(item => [item.id, item]));
  const cvHref = language => `${prefix}/resume/${assets.locales[language].file}`;
  const caseHref = (id, language, walkthrough = false) => `${prefix}/projects/${id}.html?lang=${language}${walkthrough ? "#walkthrough" : ""}`;
  const cvAction = language => `<a class="resume-button" href="${e(cvHref(language))}" download>${e(copy[language].cv)}</a>`;
  const nav = Object.keys(copy.en.nav).map(id => `<a href="#${id}">${localize(language => e(copy[language].nav[id]), "span")}</a>`).join("");
  const metric = (item, language) => item.metric ? item.metric[language].replaceAll("{value}", String(item.metric.value)) : item[language].result;
  const summary = (item, language) => item[language].summary.replaceAll("{cameraPairs}", String(item.system?.cameraPairs));
  const proof = profile.entry.proofIds.map(id => {
    const item = career.get(id);
    return `<article class="resume-proof" data-proof-id="${id}">${localize(language => `<p class="resume-kicker">${e(item.employer)}</p><h3>${e(item[language].proofTitle)}</h3><p class="resume-result">${e(metric(item, language))}</p><p>${e(summary(item, language))}</p><p class="resume-note">${e(item[language].scope)}</p><details><summary>${e(copy[language].proofDetails)}</summary><p class="resume-note">${e(item[language].boundary)}</p></details>`)}</article>`;
  }).join("");
  const featured = profile.entry.projectIds.map(id => {
    const item = projects.get(id), blurb = blurbs.get(id);
    return `<article class="resume-work" data-project-id="${id}">${localize(language => `<p class="resume-kicker">${e(blurb[language].evidence)}</p><h3>${e(item.title)}</h3><p>${e(blurb[language].summary)}</p><p class="resume-note resume-boundary">${e(blurb[language].boundary)}</p><a class="resume-work-link" data-resume-case href="${e(caseHref(id, language, id === "study-atlas"))}">${e(blurb[language].action)} <span aria-hidden="true">↗</span></a>`)}</article>`;
  }).join("");
  const professional = profile.professional.map(item => `<article class="resume-career" id="career-${item.id}" data-career-id="${item.id}">${localize(language => `<div class="resume-career-heading"><h3>${e(item.employer)}<span>${e(item.title)}</span></h3><p class="resume-date">${e(period(item.start, item.end, language))}</p></div><p>${e(summary(item, language))}${item.metric ? ` <strong>${e(metric(item, language))}${language === "en" ? "." : "。"}</strong>` : ""}</p><details><summary>${e(copy[language].careerDetail)}</summary><ul>${item[language].details.map(text => `<li>${e(text)}</li>`).join("")}</ul><p class="resume-note">${e(item[language].boundary)}</p></details>`)}</article>`).join("");
  const research = profile.researchLearning.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p class="resume-date">${e(period(item.start, item.end, language))}</p><p>${e(item[language].text)}</p>`, "article", `class="resume-research" data-research-id="${item.id}"`)).join("");
  const education = profile.education.map(item => localize(language => `<h3>${e(item[language].title)}</h3><p>${e(item[language].institution)} · ${e(item.start)}–${e(item.end)}</p>`, "article", `class="resume-education"`)).join("");
  const skills = profile.skills.map(item => `<li><a href="${e(item.proofId ? `#career-${item.proofId}` : `${prefix}/projects/${item.projectId}.html`)}">${e(item.label)}</a></li>`).join("");
  return `<a class="resume-skip" href="#content">${localize(language => e(copy[language].skip), "span")}</a>
<header class="resume-header"><div class="resume-header-inner"><a class="resume-logo" href="#top">${e(profile.identity.shortName)}</a>
<nav id="resume-navigation" class="resume-navigation" aria-label="Main navigation / 主要導覽">${nav}</nav>
<div class="resume-reading-controls" data-js-control><div class="resume-languages" role="group" aria-label="Reading language / 閱讀語言"><button type="button" data-resume-language="en" aria-pressed="true" disabled>EN</button><button type="button" data-resume-language="zh-TW" aria-pressed="false" disabled>正體</button></div><button type="button" data-resume-theme aria-label="Switch to dark theme" disabled><span aria-hidden="true">◐</span></button><button type="button" class="resume-menu" data-resume-menu aria-label="Menu" aria-expanded="false" aria-controls="resume-navigation" disabled><span aria-hidden="true">☰</span></button></div></div></header>
<main id="content" class="resume-main" tabindex="-1">
<section class="resume-hero" id="top">${localize(language => `<p class="resume-role">${e(profile.identity.role)}</p><h1>${e(profile.identity.shortName)}</h1><p class="resume-full-name">${e(profile.identity.name)}</p><p class="resume-lead">${e(copy[language].lead)}</p><p class="resume-note">${e(copy[language].context)}</p><div class="resume-actions">${cvAction(language)}<a class="resume-button resume-button-secondary" href="#contact">${e(copy[language].contact)}</a></div>`)}</section>
<section id="professional-proof" class="resume-section resume-proof-section">${localize(language => `<h2>${e(copy[language].proofHeading)}</h2><p class="resume-section-intro">${e(copy[language].proofIntro)}</p>`)}<div class="resume-proof-grid">${proof}</div>${localize(language => `<a class="resume-small-link" href="#experience">${e(copy[language].careerLink)} <span aria-hidden="true">↓</span></a>`)}</section>
<section id="projects" class="resume-section">${localize(language => `<h2>${e(copy[language].workHeading)}</h2><p class="resume-section-intro">${e(copy[language].focus)}</p><p class="resume-note">${e(copy[language].snapshot)}</p>`)}<div class="resume-work-grid">${featured}</div><div class="resume-more-work">${localize(language => `<p><span class="resume-note">${e(copy[language].moreWork)}</span> · ${profile.entry.moreProjectIds.map(id => `<a data-resume-case href="${e(caseHref(id, language))}">${e(projects.get(id).title)}</a> — ${e(blurbs.get(id)[language].summary)}`).join(" · ")}</p>`)}</div></section>
<section id="experience" class="resume-section">${localize(language => `<h2>${e(copy[language].experienceHeading)}</h2><p class="resume-section-intro">${e(copy[language].experienceIntro)}</p>`)}${professional}${localize(language => `<p class="resume-note">${e(copy[language].scopeNote)}</p>`)}</section>
<section id="about" class="resume-section resume-about">${localize(language => `<h2>${e(copy[language].aboutHeading)}</h2><p class="resume-section-intro">${e(copy[language].about)}</p>`)}
<details class="resume-detail" id="skills"><summary>${localize(language => e(copy[language].skillsHeading), "span")}</summary><ul class="resume-skills">${skills}</ul></details>
<details class="resume-detail" id="education"><summary>${localize(language => e(copy[language].educationHeading), "span")}</summary>${education}</details>
<details class="resume-detail"><summary>${localize(language => e(copy[language].researchHeading), "span")}</summary>${research}</details>
<details class="resume-detail" id="life-devotions"><summary>${localize(language => e(copy[language].personalHeading), "span")}</summary>${localize(language => `<p>${e(copy[language].personal)}</p>`)}</details></section>
<section id="contact" class="resume-section resume-contact">${localize(language => `<h2>${e(copy[language].contactHeading)}</h2><p class="resume-section-intro">${e(copy[language].contactLead)}</p><div class="resume-contact-links"><a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a><a href="${e(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">${e(copy[language].linkedin)} <span aria-hidden="true">↗</span></a></div><div class="resume-actions">${cvAction(language)}<a href="${e(cvHref(language === "en" ? "zh-TW" : "en"))}" download>${e(copy[language].cvOther)}</a></div>`)}</section>
</main><footer class="resume-footer">${localize(language => `<p>${e(copy[language].footer)}</p><p><a href="${e(prefix)}/resume-overview.html" download="blake-lin-resume-overview.html" data-save-overview>${e(copy[language].save)}</a></p><p class="resume-note">${e(copy[language].saveScope)}</p>`)}<noscript><p>${localize(language => e(copy[language].noJs), "span")}</p></noscript></footer>`;
}
