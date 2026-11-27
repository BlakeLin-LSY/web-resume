import { escapeHtml } from "../generators/components/svg-pipeline.mjs";

export function renderSkillsAboutModule({
  profile,
  copy,
  language,
  period,
  prefix,
  localize
}) {
  const e = escapeHtml;

  const research = profile.researchLearning.map(item =>
    localize(lang => `
      <h3>${e(item[lang].title)}</h3>
      <p class="resume-date">${e(period(item.start, item.end, lang))}</p>
      <p>${e(item[lang].text)}</p>
    `, "article", `class="resume-research" data-research-id="${item.id}"`)
  ).join("");

  const education = profile.education.map(item =>
    localize(lang => `
      <h3>${e(item[lang].title)}</h3>
      <p>${e(item[lang].institution)} · ${e(item.start)}–${e(item.end)}</p>
    `, "article", `class="resume-education"`)
  ).join("");

  const certifications = (profile.certifications ?? []).map(item =>
    localize(lang => `
      <h3><a href="${e(item.url)}">${e(item[lang].title)}</a></h3>
      <p>${e(item[lang].issuer)} · ${e(item.issued)}</p>
    `, "article", `class="resume-education resume-certification"`)
  ).join("");

  const skills = profile.skills.map(item =>
    `<li><a href="${e(item.proofId ? `#career-${item.proofId}` : `${prefix}/projects/${item.projectId}.html`)}">${e(item.label)}</a></li>`
  ).join("");

  return `<section id="about" class="resume-section resume-about">
    <div class="resume-section-header">
      <h2>${e(copy[language].aboutHeading)}</h2>
      <p class="resume-section-intro">${e(copy[language].about)}</p>
    </div>
    <details class="resume-detail" id="skills" open>
      <summary>${localize(lang => e(copy[lang].skillsHeading), "span")}</summary>
      <ul class="resume-skills">${skills}</ul>
    </details>
    <details class="resume-detail" id="education">
      <summary>${localize(lang => e(copy[lang].educationHeading), "span")}</summary>
      ${education}
      ${certifications}
    </details>
    <details class="resume-detail">
      <summary>${localize(lang => e(copy[lang].researchHeading), "span")}</summary>
      ${research}
    </details>
    <details class="resume-detail" id="life-devotions">
      <summary>${localize(lang => e(copy[lang].personalHeading), "span")}</summary>
      ${localize(lang => `<p>${e(copy[lang].personal)}</p>`)}
    </details>
  </section>`;
}
