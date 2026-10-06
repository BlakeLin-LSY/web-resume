import { readFile, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadResumeSource, readingTokenCss, repoRoot } from './lib/resume-source.mjs';
import { escapeHtml as e } from './lib/resume-markup.mjs';

const { profile, tokens } = await loadResumeSource();
const input = process.argv.indexOf('--source');
const source = JSON.parse(await readFile(input < 0 ? resolve(repoRoot, 'content/engineering-notes.json') : resolve(process.argv[input + 1]), 'utf8'));
const locales = ['en', 'zh-TW'];
if (source.schemaVersion !== 1 || !source.notes?.length) throw new Error('Missing engineering notes');
const ids = new Set();
for (const note of source.notes) {
  if (!/^[a-z0-9-]+$/.test(note.id) || ids.has(note.id) || !note.sourceIds?.length) throw new Error('Invalid note identity or source');
  ids.add(note.id);
  for (const lang of locales) for (const field of ['context', 'title', 'brief', 'detail', 'question']) {
    if (typeof note[lang]?.[field] !== 'string' || !note[lang][field].trim()) throw new Error(`Missing ${note.id}/${lang}/${field}`);
  }
}
for (const lang of locales) for (const key of ['title','lead','intro','back','details','question','contact','draft','save','print','theme','skip','footer','emailHint','entry','saveScope','offlineScope']) {
  if (!source.copy[lang]?.[key]?.trim()) throw new Error(`Missing ${lang}/${key}`);
}
const localized = render => locales.map(lang => `<span data-locale="${lang}" lang="${lang}">${render(source.copy[lang], lang)}</span>`).join('');
const styles = `${readingTokenCss(tokens)}
*{box-sizing:border-box}body{margin:0;background:var(--resume-background);color:var(--resume-text);font:17px/1.8 var(--resume-font)}a{color:var(--resume-accent);text-underline-offset:.22em}button{font:inherit;color:inherit;cursor:pointer;background:var(--resume-panel);border:1px solid var(--resume-border);border-radius:6px;padding:7px 12px}button[aria-pressed=true]{background:var(--resume-tint);border-color:var(--resume-accent)}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid var(--resume-accent);outline-offset:4px}header,main,footer{width:min(760px,100% - 40px);margin:auto}header{padding:24px 0;border-bottom:1px solid var(--resume-border);display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}.controls{display:flex;flex-wrap:wrap;gap:6px}.js-only{display:none}.enhanced .js-only{display:flex}.enhanced [data-locale][hidden]{display:none}.skip{position:absolute;top:-100px}.skip:focus{top:0;background:var(--resume-panel);z-index:2}h1{font-size:clamp(2.2rem,6vw,3.4rem);line-height:1.2;letter-spacing:-.035em;margin:48px 0 18px}h2{font-size:clamp(1.4rem,4vw,1.8rem);line-height:1.4;text-wrap:balance;margin:12px 0}p{margin:12px 0}.lead{font-size:1.25rem}.muted,.context{color:var(--resume-muted)}.context{font-size:.82rem;letter-spacing:.02em}.intro{padding-bottom:28px}article{border-top:1px solid var(--resume-border);padding:30px 0 36px;scroll-margin-top:20px}article>p{max-width:65ch}details{margin:18px 0;font-size:.95rem}summary{cursor:pointer;color:var(--resume-accent);width:fit-content}details p{color:var(--resume-muted)}.conversation{background:var(--resume-tint);padding:16px 20px;border-left:3px solid var(--resume-accent);border-radius:0 6px 6px 0}.conversation p{margin:0 0 10px}.conversation small{color:var(--resume-muted);display:block}footer{border-top:1px solid var(--resume-border);padding:28px 0 48px;font-size:.9rem}.save{display:flex;gap:16px;flex-wrap:wrap;align-items:center}.status{font-size:.8rem;color:var(--resume-muted)}[lang=zh-TW] h1,[lang=zh-TW] h2{letter-spacing:0;line-height:1.5}@media(max-width:480px){body{font-size:16px}header,main,footer{width:calc(100% - 32px)}.conversation{padding:14px}h1{margin-top:30px}}
@media print{:root{--resume-background:#fff!important;--resume-text:#242824!important;--resume-muted:#5C645D!important;--resume-accent:#285C4D!important;--resume-tint:#E7EDE4!important;--resume-border:#BCC4B9!important}header,.save,.skip{display:none!important}body{font-size:11pt}main,footer{width:100%}article{break-inside:avoid;padding:16px 0}h1{margin-top:0}details::details-content{content-visibility:visible!important;height:auto!important}}
`;
const views = locales.map(lang => {
  const c = source.copy[lang];
  return `<div data-locale="${lang}" lang="${lang}"><div class="intro"><p class="context">${e(profile.identity.shortName)} · ${e(profile.identity.role)}</p><h1>${e(c.title)}</h1><p class="lead">${e(c.lead)}</p><p class="muted">${e(c.intro)}</p></div>${source.notes.map(note => {
    const n=note[lang];
    const mail=`mailto:${profile.contact.email}?subject=${encodeURIComponent(n.title)}`;
    return `<article id="${note.id}-${lang}" data-story-id="${note.id}"><p class="context">${e(n.context)}</p><h2>${e(n.title)}</h2><p>${e(n.brief)}</p><details><summary>${e(c.details)}</summary><p>${e(n.detail)}</p><p class="status">${e(c.draft)}</p></details><aside class="conversation"><small>${e(c.question)}</small><p>${e(n.question)}</p><a data-story-contact href="${e(mail)}">${e(c.contact)} →</a></aside></article>`;
  }).join('')}</div>`;
}).join('');
const script = `(function(){
const root=document.documentElement,query=new URLSearchParams(location.search),system=matchMedia('(prefers-color-scheme:dark)');
let lang=query.get('lang')||root.lang||'en',theme=query.get('theme')||root.dataset.readingTheme||'light';
try{lang=query.get('lang')||localStorage.getItem('resume-language')||lang;theme=query.get('theme')||localStorage.getItem('resume-theme')||theme;}catch{}
if(!['en','zh-TW'].includes(lang))lang='en';if(!['light','dark'].includes(theme))theme='light';
function apply(){root.lang=lang;root.dataset.readingTheme=theme;document.title=(lang==='en'?'Engineering notes':'工程筆記')+' — Blake Lin';document.querySelectorAll('[data-locale]').forEach(el=>el.hidden=el.dataset.locale!==lang);document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===lang)));document.querySelectorAll('[data-back]').forEach(el=>{const url=new URL('./resume-overview.html',location.href);if(location.protocol!=='file:')url.pathname=url.pathname.replace(/resume-overview.html$/,'');url.searchParams.set('lang',lang);url.searchParams.set('theme',theme);url.hash='projects';el.href=url.href;});try{const url=new URL(location.href);url.searchParams.set('lang',lang);url.searchParams.set('theme',theme);history.replaceState(null,'',url);}catch{}}
function store(){try{localStorage.setItem('resume-language',lang);localStorage.setItem('resume-theme',theme);}catch{}}
root.classList.add('enhanced');document.querySelectorAll('[data-language]').forEach(el=>el.onclick=()=>{lang=el.dataset.language;apply();store();});document.querySelector('[data-theme]').onclick=()=>{theme=(theme==='dark'||(theme==='auto'&&system.matches))?'light':'dark';apply();store();};
document.querySelector('[data-print]').onclick=()=>window.print();let opened=[];addEventListener('beforeprint',()=>{opened=[...document.querySelectorAll('details')].map(el=>[el,el.open]);opened.forEach(([el])=>el.open=true);});addEventListener('afterprint',()=>opened.forEach(([el,was])=>el.open=was));
document.querySelector('[data-save]').onclick=event=>{event.preventDefault();const clone=root.cloneNode(true);clone.querySelectorAll('[data-locale]').forEach(el=>el.removeAttribute('hidden'));clone.classList.remove('enhanced');clone.querySelectorAll('[data-back]').forEach(el=>el.setAttribute('href','./resume-overview.html#projects'));const blob=new Blob(['<!doctype html>\\n'+clone.outerHTML],{type:'text/html;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='engineering-notes.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};apply();
})();`;
const html=`<!doctype html>\n<!-- Generated from content/engineering-notes.json. -->\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Engineering notes — Blake Lin</title><meta name="description" content="Short engineering stories about training performance, debugging, testing and AI evaluation."><style>${styles}</style></head><body><a class="skip" href="#notes">${localized(c=>e(c.skip))}</a><header><a data-back href="./resume-overview.html#projects">← ${localized(c=>e(c.back))}</a><div class="controls js-only"><button data-language="en" aria-pressed="true">English</button><button data-language="zh-TW" aria-pressed="false">正體中文</button><button data-theme>${localized(c=>e(c.theme))}</button></div></header><main id="notes">${views}</main><footer><p>${localized(c=>e(c.footer))}</p><p><a href="mailto:${e(profile.contact.email)}">${e(profile.contact.email)}</a></p><p class="muted">${localized(c=>e(c.emailHint))}</p><div class="save"><a data-save href="./engineering-notes.html" download="engineering-notes.html">${localized(c=>e(c.save))}</a><button class="js-only" data-print>${localized(c=>e(c.print))}</button></div></footer><script>${script}</script></body></html>\n`;
const destination=resolve(repoRoot,'app/public/engineering-notes.html');
await writeFile(destination+'.tmp',html);await rename(destination+'.tmp',destination);
console.log(`Generated ${source.notes.length} bilingual engineering notes (${Buffer.byteLength(html)} bytes).`);
