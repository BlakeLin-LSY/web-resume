import { escapeHtml } from "../generators/components/svg-pipeline.mjs";

export function renderContactFooterModule({
  profile,
  copy,
  language,
  prefix,
  cvAction,
  cvHref,
  notes,
  localize
}) {
  const e = escapeHtml;

  return `<section id="contact" class="resume-section resume-contact">
    <div class="resume-section-header">
      <h2>${e(copy[language].contactHeading)}</h2>
      <p class="resume-section-intro">${e(copy[language].contactLead)}</p>
    </div>
    <div class="resume-contact-links">
      <a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a>
      <a href="${e(profile.contact.linkedin)}" target="_blank" rel="noopener noreferrer">${e(copy[language].linkedin)} <span aria-hidden="true">↗</span></a>
      <a href="${e(profile.contact.github)}" target="_blank" rel="noopener noreferrer">${e(copy[language].github)} <span aria-hidden="true">↗</span></a>
    </div>
    <div class="resume-actions">
      ${cvAction(language)}
      <a href="${e(cvHref(language === "en" ? "zh-TW" : "en"))}" data-resume-cv download>${e(copy[language].cvOther)}</a>
    </div>
  </section>
  <footer class="resume-footer">
    <p>${e(copy[language].footer)}</p>
    <p data-save-actions>
      <a href="${e(prefix)}/resume-overview.html" download="blake-lin-resume-overview.html" data-save-overview>${e(copy[language].save)}</a>
      <span>· <a href="${e(prefix)}/blake-lin-application-preview.zip" download="blake-lin-application-preview.zip" data-save-package>${e(copy[language].savePackage)}</a></span>
    </p>
    <p class="resume-note" data-save-scope>${e((notes?.copy[language] || copy[language]).saveScope)}</p>
    <p class="resume-note" data-package-scope>${e((notes?.copy[language] || copy[language]).offlineScope)}</p>
    <noscript><p>${localize(lang => e(copy[lang].noJs), "span")}</p></noscript>
  </footer>`;
}
