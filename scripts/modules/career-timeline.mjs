import { escapeHtml } from "../generators/components/svg-pipeline.mjs";

export function renderCareerTimelineModule({
  profile,
  copy,
  language,
  metric,
  summary,
  period,
  localize
}) {
  const e = escapeHtml;

  const careerRows = profile.professional.map(item => [
    item.start,
    `<article class="resume-career" id="career-${item.id}" data-career-id="${item.id}">
      ${localize(lang => `
        <div class="resume-career-heading">
          <h3>${e(item.employer)}<span>${e(item.title)}</span></h3>
          <p class="resume-date">${e(period(item.start, item.end, lang))}</p>
        </div>
        <p>${e(summary(item, lang))}${item.metric ? ` <strong>${e(metric(item, lang))}${lang === "en" ? "." : "。"}</strong>` : ""}</p>
        <p class="resume-note">${e(item[lang].boundary)}</p>
        <details>
          <summary>${e(copy[lang].careerDetail)}</summary>
          <ul>${item[lang].details.map(text => `<li>${e(text)}</li>`).join("")}</ul>
        </details>
      `)}
    </article>`
  ]).concat(profile.careerBreaks.map(item => [
    item.start,
    `<article class="resume-career resume-break" data-break-id="${item.id}">
      ${localize(lang => `
        <div class="resume-career-heading">
          <h3>${e(item[lang].title)}</h3>
          <p class="resume-date">${e(period(item.start, item.end, lang))}</p>
        </div>
        <p>${e(item[lang].text)}</p>
      `)}
    </article>`
  ]));

  const professionalHtml = careerRows
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(row => row[1])
    .join("");

  return `<section id="experience" class="resume-section">
    <div class="resume-section-header">
      <h2>${e(copy[language].experienceHeading)}</h2>
      <p class="resume-section-intro">${e(copy[language].experienceIntro)}</p>
    </div>
    <div class="resume-timeline-stack">
      ${professionalHtml}
    </div>
  </section>`;
}
