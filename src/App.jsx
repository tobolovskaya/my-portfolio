import { useEffect, useRef, useState } from "react";
import contours from "./assets/contours.svg?raw";
import ridge from "./assets/ridge.svg?raw";
import { LANGS, links, ui, tracks, hardeningLog, labs, builds, frontEnd, skills } from "./data.js";

const STORAGE_KEY = "lang";
const SR_DIFF = {
  nb: { add: "lagt til: ", del: "fjernet: " },
  uk: { add: "додано: ", del: "видалено: " },
  en: { add: "added: ", del: "removed: " },
};

function readLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.some((l) => l.code === fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.some((l) => l.code === saved)) return saved;
  } catch {
    /* storage can be unavailable; fall back to Norwegian */
  }
  return "nb";
}

function useReveal(dep) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll("[data-reveal]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function Ext({ href, children, className = "", t, tabIndex }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>
      {children}
      <svg className="ext" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
      <span className="sr-only"> {t.newTab}</span>
    </a>
  );
}

function LangSwitch({ lang, setLang, t }) {
  return (
    <div className="lang" role="group" aria-label={t.langLabel}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

/* Pick a pull request, see the actual diff. Tabs follow the WAI-ARIA pattern. */
function DiffViewer({ lang, t }) {
  const [active, setActive] = useState(2);
  const tabs = useRef([]);
  const c = hardeningLog[active];
  const sr = SR_DIFF[lang];

  const onKey = (e) => {
    const last = hardeningLog.length - 1;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div className="viewer">
      <div className="viewer__tabs" role="tablist" aria-label={t.changes} onKeyDown={onKey}>
        {hardeningLog.map((h, i) => (
          <button
            key={h.pr}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`tab-${h.pr}`}
            aria-selected={i === active}
            aria-controls="diff-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="viewer__tab"
          >
            <span className="pr">#{h.pr}</span>
            <span className="viewer__tabtitle">{h.title.replace(/^[a-z]+(\([^)]*\))?:\s*/, "")}</span>
          </button>
        ))}
      </div>

      <div className="viewer__panel" role="tabpanel" id="diff-panel" aria-labelledby={`tab-${c.pr}`} tabIndex={0}>
        <div className="viewer__bar">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <code className="viewer__file">{c.file}</code>
        </div>
        <p className="viewer__commit"><code>{c.title}</code></p>
        <pre className="diff" key={c.pr}>
          {c.diff.map(([kind, text], i) => (
            <span key={i} className={`diff__line diff__line--${kind === "+" ? "add" : kind === "-" ? "del" : "ctx"}`}>
              <span className="diff__sign" aria-hidden="true">{kind}</span>
              {kind === "+" && <span className="sr-only">{sr.add}</span>}
              {kind === "-" && <span className="sr-only">{sr.del}</span>}
              {text}
            </span>
          ))}
        </pre>
        <div className="viewer__why">
          <p><strong>{t.why}:</strong> {c.why[lang]}</p>
          <span className="tag">{c.tag}</span>
        </div>
      </div>
    </div>
  );
}

/* Auto-scrolling filmstrip. Pauses on hover and focus, and has a visible pause button. */
function Filmstrip({ lang, t }) {
  const [paused, setPaused] = useState(false);
  const item = (p, hidden) => (
    <figure key={p.title + (hidden ? "-copy" : "")} className="frame" aria-hidden={hidden || undefined}>
      <img src={p.img} alt={hidden ? "" : t.screenshot(p.title)} loading="lazy" width="680" height="415" />
      <figcaption>
        <h3>{p.title}</h3>
        <p>{p[lang]}</p>
        <p className="frame__links">
          <Ext href={p.repo} className="link" t={t} tabIndex={hidden ? -1 : undefined}>{t.code}</Ext>
          {p.demo && <Ext href={p.demo} className="link" t={t} tabIndex={hidden ? -1 : undefined}>{t.demo}</Ext>}
        </p>
      </figcaption>
    </figure>
  );
  return (
    <div className={`marquee${paused ? " is-paused" : ""}`}>
      <div className="wrap marquee__controls">
        <button type="button" className="marquee__toggle" onClick={() => setPaused((v) => !v)} aria-pressed={paused}>
          {paused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3.5v9M10.5 3.5v9" /></svg>
          )}
          {paused ? t.play : t.pause}
        </button>
      </div>
      <div className="marquee__viewport">
        <div className="marquee__track">
          {frontEnd.map((p) => item(p, false))}
          {frontEnd.map((p) => item(p, true))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLangState] = useState(readLang);
  const t = ui[lang];
  useReveal(lang);

  const setLang = (code) => {
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
  }, [lang, t]);

  const latest = hardeningLog.slice(-3).reverse();

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>

      <header className="top">
        <a href="#top" className="mark">Yevheniia Tobolovska</a>
        <nav aria-label="Sections">
          <a href="#work">{t.nav.work}</a>
          <a href="#labs">{t.nav.labs}</a>
          <a href="#builds">{t.nav.builds}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <LangSwitch lang={lang} setLang={setLang} t={t} />
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero__map" aria-hidden="true" dangerouslySetInnerHTML={{ __html: contours }} />
          <div className="wrap hero__grid">
            <div className="hero__text">
              <h1>
                {t.heroA} <span>{t.heroB}</span>
              </h1>
              <p className="hero__lede">{t.lede}</p>
              <div className="hero__cta">
                <a href="#work" className="btn btn--snow">{t.seeWork}</a>
                <Ext href={links.github} className="btn btn--line" t={t}>GitHub</Ext>
                <Ext href={links.linkedin} className="btn btn--line" t={t}>LinkedIn</Ext>
              </div>
            </div>

            <aside className="hero__log" aria-labelledby="latest-title">
              <h2 id="latest-title">{t.latest}</h2>
              <ol>
                {latest.map((c) => (
                  <li key={c.pr}>
                    <span className="pr">#{c.pr}</span>
                    <code>{c.title}</code>
                  </li>
                ))}
              </ol>
              <a href="#work" className="hero__log-more">{t.allPrs(hardeningLog.length)}</a>
            </aside>
          </div>

          <ul className="wrap tracks">
            {tracks[lang].map((tr) => (
              <li key={tr.title}>
                <h2>{tr.title}</h2>
                <p>{tr.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="night" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="night__head">
              <h2 id="work-title">{t.caseTitle}</h2>
              <div>
                <p>{t.caseIntro}</p>
                <dl className="facts">
                  <div><dt>{t.factFindings}</dt><dd>33<span aria-hidden="true">→</span>25</dd></div>
                  <div><dt>{t.factPrs}</dt><dd>{hardeningLog.length}</dd></div>
                  <div><dt>{t.factScript}</dt><dd>−172</dd></div>
                </dl>
              </div>
            </div>

            <DiffViewer lang={lang} t={t} />

            <p className="night__foot">
              {t.caseFoot} <Ext href={links.platform} className="link" t={t}>{t.caseLink}</Ext>
            </p>
          </div>
        </section>

        <section className="trail-sec" id="labs" aria-labelledby="labs-title">
          <div className="wrap trail-grid">
            <div className="trail-intro">
              <h2 id="labs-title" className="title">{t.labsTitle}</h2>
              <p className="intro">{t.labsIntro}</p>
            </div>
            <ol className="trail">
              {labs.map((l) => (
                <li key={l.repo} className="waypoint" data-reveal>
                  <svg className="t-mark" viewBox="0 0 40 40" aria-hidden="true">
                    <path d="M7 9.5c8.5-1.6 17.6-1.4 26.4.2l-.6 7.1c-3.1-.5-5.6-.7-8.1-.8l.6 17.4-8.3.3-.4-17.6c-2.6.1-5.3.3-8.2.8z" />
                  </svg>
                  <div>
                    <h3>{l[lang].title}</h3>
                    <p>{l[lang].text}</p>
                    <p className="waypoint__tools">{l.tools.join(" / ")}</p>
                    <Ext href={l.repo} className="link" t={t}>{t.repo}</Ext>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lichen" id="builds" aria-labelledby="builds-title">
          <div className="wrap">
            <h2 id="builds-title" className="title">{t.buildsTitle}</h2>
            <ul className="index">
              {builds.map((b) => (
                <li key={b.en.title} className="index__row" data-reveal>
                  <h3>{b[lang].title}</h3>
                  <p className="index__text">{b[lang].text}</p>
                  <p className="index__meta"><span>{b[lang].kind}</span><span>{b.stack}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="strip-sec" aria-labelledby="fe-title">
          <div className="wrap strip-head">
            <h2 id="fe-title" className="title">{t.feTitle}</h2>
            <p className="intro">{t.feIntro}</p>
          </div>
          <Filmstrip lang={lang} t={t} />
        </section>

        <section className="tools-sec" id="skills" aria-labelledby="skills-title">
          <div className="wrap">
            <h2 id="skills-title" className="title">{t.toolsTitle}</h2>
            <div className="runin">
              {skills[lang].map((s) => (
                <p key={s.group}>
                  <strong>{s.group}</strong> {s.items.join(", ")}.
                </p>
              ))}
              <p><strong>{t.languages}</strong> {t.languageList}</p>
            </div>
          </div>
        </section>

        <section className="heather" id="contact" aria-labelledby="contact-title">
          <div className="ridge" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ridge }} />
          <div className="wrap contact">
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="hero__cta">
              <Ext href={links.linkedin} className="btn btn--snow" t={t}>LinkedIn</Ext>
              <Ext href={links.github} className="btn btn--line" t={t}>GitHub</Ext>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__row">
          <span>© {new Date().getFullYear()} Yevheniia Tobolovska</span>
          <span>{t.foot}</span>
        </div>
      </footer>
    </>
  );
}
