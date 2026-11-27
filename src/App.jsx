import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import contours from "./assets/contours.svg?raw";
import portrait from "./assets/portrait.webp";
import logo from "./assets/logo.svg";
import { LANGS, links, ui, tracks, hardeningLog, labs, frontEnd, skills } from "./data.js";

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

/* GitHub contribution calendar from /api/contributions (token stays on the server).
   While loading it shows an empty grid; if the API fails it falls back to the latest PRs. */
/* Card header: name and card title on the left, portrait on the right */
const CardHead = ({ id, title }) => (
  <div className="card-head">
    <div>
      <p className="card-head__name">Yevheniia Tobolovska</p>
      <h2 id={id}>{title}</h2>
    </div>
    <img className="card-head__photo" src={portrait} alt="" width="72" height="72" decoding="async" />
  </div>
);

const LOCALES = { nb: "nb-NO", uk: "uk-UA", en: "en-GB" };
const CELL = 11;

function Activity({ lang, t, latest }) {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/contributions", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setData)
      .catch((e) => { if (e.name !== "AbortError") setFailed(true); });
    return () => ctrl.abort();
  }, []);

  if (failed) {
    return (
      <aside className="hero__log" aria-labelledby="latest-title">
        <CardHead id="latest-title" title={t.latest} />
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
    );
  }

  const weeks = data?.weeks ?? Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => ["", 0, 0]));
  const fmt = new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "short", year: "numeric" });
  const width = weeks.length * CELL - 2;

  return (
    <aside className="hero__log activity" aria-labelledby="activity-title" aria-busy={!data}>
      <CardHead id="activity-title" title={t.activity} />
      <p className="activity__total">
        <span>{t.activityTotal}</span>
        <strong>{data ? data.total.toLocaleString(LOCALES[lang]) : "–"}</strong>
      </p>
      <svg
        className="activity__grid"
        viewBox={`0 0 ${width} ${7 * CELL - 2}`}
        role="img"
        aria-label={data ? `${t.activityTotal}: ${data.total}` : t.activity}
      >
        {weeks.map((w, x) =>
          w.map(([date, count, level], y) => (
            <rect key={`${x}-${y}`} x={x * CELL} y={y * CELL} width={CELL - 2} height={CELL - 2} rx="2" className={`lv${level}`}>
              {date && <title>{t.activityDay(count, fmt.format(new Date(date)))}</title>}
            </rect>
          ))
        )}
      </svg>
      <div className="activity__foot">
        <Ext href={links.github} className="hero__log-more" t={t}>{t.activityProfile}</Ext>
        <span className="activity__legend" aria-hidden="true">
          {t.activityLess}
          {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`lv${l}`} />)}
          {t.activityMore}
        </span>
      </div>
    </aside>
  );
}

/* Security labs: filter by area, count-up numbers, cursor spotlight.
   Cards stay mounted and are hidden with the hidden attribute, so the reveal observer keeps working. */
const AREAS = ["all", "net", "soc", "devsecops", "appsec"];
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function Metric({ value, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const m = /^(\d+)(.*)$/.exec(value);
    if (!el || !m || reducedMotion() || !("IntersectionObserver" in window)) return;
    const target = Number(m[1]);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / 900);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + m[2];
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return (
    <p className="metric">
      <strong ref={ref} aria-hidden="true">{value}</strong>
      <span className="sr-only">{value} </span>
      <span>{label}</span>
    </p>
  );
}

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const PAGE = 4;

function Labs({ lang, t }) {
  const [area, setArea] = useState("all");
  const [page, setPage] = useState(0);
  const sectionRef = useRef(null);
  const match = (a) => area === "all" || a === area;
  const count = (a) => (a === "all" ? labs.length : labs.filter((l) => l.area === a).length);
  const shown = labs.filter((l) => match(l.area)).length;

  // Cards in the current filter, the "next stop" card last; 4 per page.
  const order = [...labs.filter((l) => match(l.area)).map((l) => l.repo), ...(match("net") ? ["next"] : [])];
  const pages = Math.max(1, Math.ceil(order.length / PAGE));
  const onPage = (key) => {
    const i = order.indexOf(key);
    return i >= page * PAGE && i < (page + 1) * PAGE;
  };
  const pickArea = (a) => { setArea(a); setPage(0); };
  const goTo = (p) => {
    setPage(p);
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionRef.current.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section className="labs-sec" id="labs" aria-labelledby="labs-title" ref={sectionRef}>
      <div className="wrap">
        <div className="labs-head">
          <h2 id="labs-title" className="title">{t.labsTitle}</h2>
          <p className="intro">{t.labsIntro}</p>
        </div>

        <div className="lab-filter" role="group" aria-label={t.filterLabel}>
          {AREAS.map((a) => (
            <button key={a} type="button" aria-pressed={area === a} onClick={() => pickArea(a)}>
              {t.areas[a]} <span className="lab-filter__n">{count(a)}</span>
            </button>
          ))}
          <span className="sr-only" aria-live="polite">{t.showing(shown, labs.length)}</span>
        </div>

        <ul className="lab-grid">
          {labs.map((l) => (
            <li key={l.repo} className="lab-card" data-reveal hidden={!onPage(l.repo)} onPointerMove={spotlight}>
              <span className={`origin origin--${l.origin}`}>{t.origin[l.origin]}</span>
              <Metric value={l.metric.value} label={l.metric[lang]} />
              <h3>{l[lang].title}</h3>
              <p className="lab-card__text">{l[lang].text}</p>
              <ul className="chips" aria-label="Tools">
                {l.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <div className="lab-card__foot">
                <Ext href={l.repo} className="link" t={t}>{t.repo}</Ext>
                {l.evidence && (
                  <details className="evidence">
                    <summary>{t.evidence}</summary>
                    <img src={l.evidence.src} alt={l.evidence.alt[lang]} width={l.evidence.w} height={l.evidence.h} loading="lazy" decoding="async" />
                  </details>
                )}
              </div>
            </li>
          ))}
          <li className="lab-card lab-card--next" data-reveal hidden={!onPage("next")}>
            <span className="origin origin--next">{t.nextStop}</span>
            <h3>{t.nextTitle}</h3>
            <p className="lab-card__text">{t.nextText}</p>
          </li>
        </ul>

        {pages > 1 && (
          <nav className="lab-pager" aria-label={t.labsTitle}>
            <button type="button" className="lab-pager__arrow" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label={t.pagePrev}>←</button>
            {Array.from({ length: pages }, (_, p) => (
              <button key={p} type="button" className="lab-pager__dot" onClick={() => goTo(p)} aria-current={p === page ? "page" : undefined} aria-label={t.pageN(p + 1)}>
                {p + 1}
              </button>
            ))}
            <button type="button" className="lab-pager__arrow" onClick={() => goTo(page + 1)} disabled={page === pages - 1} aria-label={t.pageNext}>→</button>
          </nav>
        )}
      </div>
    </section>
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
        <a href="#top" className="mark" aria-label="Yevheniia Tobolovska"><img src={logo} alt="" width="120" height="60" /></a>
        <nav aria-label="Sections">
          <a href="#work">{t.nav.work}</a>
          <a href="#labs">{t.nav.labs}</a>
          <a href="#projects">{t.nav.builds}</a>
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

            <Activity lang={lang} t={t} latest={latest} />
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
                  <div><dt>{t.factFindings}</dt><dd>33<span aria-hidden="true">→</span>0</dd></div>
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

        <Labs lang={lang} t={t} />

        <section className="strip-sec" id="projects" aria-labelledby="fe-title">
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
          <div className="contact__map" aria-hidden="true" dangerouslySetInnerHTML={{ __html: contours }} />
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
      <Analytics />
    </>
  );
}
