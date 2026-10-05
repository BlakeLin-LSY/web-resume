export function resumeReadingScript(profile) {
  const data = JSON.stringify({ name: profile.identity.name, copy: profile.copy }).replace(/</g, "\\u003c");
  return `(function(){
const data=${data};
const root=document.documentElement,header=document.querySelector('.resume-header'),nav=document.getElementById('resume-navigation');
const menu=document.querySelector('[data-resume-menu]'),themeButton=document.querySelector('[data-resume-theme]');
const languageButtons=document.querySelectorAll('[data-resume-language]');
const narrow=matchMedia('(max-width: 859px)'),systemDark=matchMedia('(prefers-color-scheme: dark)');
let language='en',theme='auto',open=false;
const query=new URLSearchParams(location.search);
try {language=query.get('lang')||localStorage.getItem('resume-language')||root.lang||'en';theme=query.get('theme')||localStorage.getItem('resume-theme')||root.dataset.readingTheme||'auto';} catch {language=query.get('lang')||root.lang||'en';theme=query.get('theme')||root.dataset.readingTheme||'auto';}
if(!['en','zh-TW'].includes(language))language='en';if(!['auto','light','dark'].includes(theme))theme='auto';
function headerOffset(){root.style.setProperty('--header-offset',(header.getBoundingClientRect().height+20)+'px');}
function closeMenu(){open=false;nav.hidden=narrow.matches;menu.setAttribute('aria-expanded','false');headerOffset();}
function savePreference(key,value){try{localStorage.setItem(key,value);}catch{}}
function updateQuery(){try{const url=new URL(location.href);url.searchParams.set('lang',language);url.searchParams.set('theme',theme);history.replaceState(null,'',url);}catch{}}
function updateCaseLinks(){document.querySelectorAll('[data-resume-case], [data-resume-walkthrough], [data-resume-notes]').forEach(link=>{const url=new URL(link.href,location.href);url.searchParams.set('lang',language);url.searchParams.set('theme',theme);link.href=url.href;});}
function resolvedDark(){return theme==='dark'||(theme==='auto'&&systemDark.matches);}
function setTheme(value,persist){theme=value;root.dataset.readingTheme=theme;root.style.colorScheme=resolvedDark()?'dark':'light';themeButton.setAttribute('aria-label',data.copy[language][resolvedDark()?'themeLight':'themeDark']);updateCaseLinks();if(persist){savePreference('resume-theme',theme);updateQuery();}}
function setLanguage(value,persist){
  const sections=[...document.querySelectorAll('.resume-main > section')];
  const current=sections.filter(section=>section.getBoundingClientRect().top<=header.getBoundingClientRect().bottom+120).pop();
  const before=current&&current.getBoundingClientRect().top;
  language=value;root.lang=value;root.dataset.readingLanguage=value;
  languageButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.resumeLanguage===value)));
  menu.setAttribute('aria-label',data.copy[value].menu);document.title=data.name+' — AI Software Engineer';
  const description=document.querySelector('meta[name="description"]');if(description)description.content=data.copy[value].metadataDescription;
  const ogDescription=document.querySelector('meta[property="og:description"]');if(ogDescription)ogDescription.content=data.copy[value].metadataDescription;
  const ogLocale=document.querySelector('meta[property="og:locale"]');if(ogLocale)ogLocale.content=value==='en'?'en_US':'zh_TW';
  setTheme(theme,false);headerOffset();
  if(persist){savePreference('resume-language',value);updateQuery();if(current&&scrollY>0)scrollBy(0,current.getBoundingClientRect().top-before);}
}
root.classList.add('resume-enhanced');document.querySelectorAll('[data-js-control] button').forEach(button=>button.disabled=false);
if(location.protocol==='file:'){root.dataset.offlineReading='true';document.querySelectorAll('[data-save-actions]').forEach(element=>element.hidden=true);document.querySelectorAll('[data-resume-cv]').forEach(link=>link.removeAttribute('download'));}
languageButtons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.resumeLanguage,true)));
themeButton.addEventListener('click',()=>setTheme(resolvedDark()?'light':'dark',true));
menu.addEventListener('click',()=>{open=!open;nav.hidden=!open;menu.setAttribute('aria-expanded',String(open));headerOffset();});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open){closeMenu();menu.focus();}});
narrow.addEventListener('change',closeMenu);systemDark.addEventListener('change',()=>setTheme(theme,false));
if(typeof ResizeObserver!=='undefined')new ResizeObserver(headerOffset).observe(header);
let printDetails=[];
addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('details')].map(element=>({element,open:element.open}));printDetails.forEach(item=>item.element.open=true);});
addEventListener('afterprint',()=>{printDetails.forEach(item=>item.element.open=item.open);printDetails=[];});
setLanguage(language,false);setTheme(theme,false);closeMenu();
// A fresh deep link must land after language/header layout has been enhanced.
if(location.hash)requestAnimationFrame(()=>{const target=document.getElementById(location.hash.slice(1));if(target){if(target.tagName==='DETAILS')target.open=true;target.scrollIntoView();}});
})();`;
}
