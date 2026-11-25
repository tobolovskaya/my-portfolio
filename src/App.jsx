import { useEffect } from "react";
import contours from "./assets/contours.svg?raw";
import ridge from "./assets/ridge.svg?raw";
import { links, tracks, hardeningLog, labs, builds, frontEnd, skills } from "./data.js";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
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
  }, []);
}

const Ext = ({ href, children, className = "" }) => (
  <a href={href} className={className} target="_blank" rel="noopener noreferrer">
    {children}
    <svg className="ext" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const latest = hardeningLog.slice(-3).reverse();

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="top">
        <a href="#top" className="mark">Yevheniia Tobolovska</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#labs">Labs</a>
          <a href="#builds">Builds</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        {/* Hero: the sea field with a topographic map */}
        <section className="hero" id="top">
          <div className="hero__map" aria-hidden="true" dangerouslySetInnerHTML={{ __html: contours }} />
          <div className="wrap hero__grid">
            <div className="hero__text">
              <h1>
                IT operations, security <span>and the apps on top.</span>
              </h1>
              <p className="hero__lede">
                I keep devices and users secure, build cloud infrastructure as code, and design and
                develop web and mobile apps. Based in Norway.
              </p>
              <p className="hero__no" lang="nb">
                Jeg jobber med IT-drift og sikkerhet, og utvikler apper og nettsider – fra design til drift.
              </p>
              <div className="hero__cta">
                <a href="#work" className="btn btn--snow">See the work</a>
                <Ext href={links.github} className="btn btn--line">GitHub</Ext>
                <Ext href={links.linkedin} className="btn btn--line">LinkedIn</Ext>
              </div>
            </div>

            <aside className="hero__log" aria-labelledby="latest-title">
              <h2 id="latest-title">Latest merged</h2>
              <ol>
                {latest.map((c) => (
                  <li key={c.pr}>
                    <span className="pr">#{c.pr}</span>
                    <code>{c.title}</code>
                  </li>
                ))}
              </ol>
              <a href="#work" className="hero__log-more">All {hardeningLog.length} pull requests</a>
            </aside>
          </div>

          <ul className="wrap tracks">
            {tracks.map((t) => (
              <li key={t.title}>
                <h2>{t.title}</h2>
                <p>{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Case study: polar night */}
        <section className="night" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="night__head" data-reveal>
              <h2 id="work-title">Hardening an AWS&nbsp;EKS platform, one pull request at a time</h2>
              <p>
                A Terraform platform with VPC, EKS, RDS, ECR, Jenkins and Argo CD. I scanned it with
                Checkov, separated real risks from noise, and fixed them in small reviewed changes,
                each one explaining what changed and why.
              </p>
            </div>

            <div className="night__body">
              <dl className="facts" data-reveal>
                <div><dt>Checkov findings</dt><dd>33<span aria-hidden="true">→</span>25</dd></div>
                <div><dt>Pull requests</dt><dd>{hardeningLog.length}</dd></div>
                <div><dt>Risky node script removed</dt><dd>172 lines</dd></div>
              </dl>

              <ol className="commits">
                {hardeningLog.map((c) => (
                  <li key={c.pr} data-reveal>
                    <span className="pr">#{c.pr}</span>
                    <div>
                      <code>{c.title}</code>
                      <p>{c.why}</p>
                    </div>
                    <span className="tag">{c.tag}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="night__foot" data-reveal>
              Remaining findings are scheduled or skipped with a written reason.{" "}
              <Ext href={links.platform} className="link">Repository and every PR</Ext>
            </p>
          </div>
        </section>

        {/* Labs: a marked trail (DNT red T waypoints) */}
        <section className="trail-sec" id="labs" aria-labelledby="labs-title">
          <div className="wrap trail-grid">
            <div className="trail-intro">
              <h2 id="labs-title" className="title" data-reveal>Security labs</h2>
              <p className="intro" data-reveal>
                Coursework from my MSc in Computer Science. Five routes through systems built to break, marked
                with the red T from Norwegian hiking trails.
              </p>
            </div>
            <ol className="trail">
              {labs.map((l) => (
                <li key={l.title} className="waypoint" data-reveal>
                  <svg className="t-mark" viewBox="0 0 40 40" aria-hidden="true">
                    <path d="M7 9.5c8.5-1.6 17.6-1.4 26.4.2l-.6 7.1c-3.1-.5-5.6-.7-8.1-.8l.6 17.4-8.3.3-.4-17.6c-2.6.1-5.3.3-8.2.8z" />
                  </svg>
                  <div>
                    <h3>{l.title}</h3>
                    <p>{l.text}</p>
                    <p className="waypoint__tools">{l.tools.join(" / ")}</p>
                    <Ext href={l.repo} className="link">Repository</Ext>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Builds: Swiss typographic index on lichen */}
        <section className="lichen" id="builds" aria-labelledby="builds-title">
          <div className="wrap">
            <h2 id="builds-title" className="title" data-reveal>What I build</h2>
            <ul className="index">
              {builds.map((b) => (
                <li key={b.title} className="index__row" data-reveal>
                  <h3>{b.title}</h3>
                  <p className="index__text">{b.text}</p>
                  <p className="index__meta"><span>{b.kind}</span><span>{b.stack}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Interfaces: filmstrip */}
        <section className="strip-sec" aria-labelledby="fe-title">
          <div className="wrap strip-head">
            <h2 id="fe-title" className="title" data-reveal>Interfaces</h2>
            <p className="intro">Front-end projects. Scroll sideways.</p>
          </div>
          <div className="strip" tabIndex={0} role="region" aria-label="Front-end projects, scrollable">
            {frontEnd.map((p) => (
              <figure key={p.title} className="frame">
                <img src={p.img} alt={`Screenshot of ${p.title}`} loading="lazy" width="680" height="415" />
                <figcaption>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <p className="frame__links">
                    <Ext href={p.repo} className="link">Code</Ext>
                    {p.demo && <Ext href={p.demo} className="link">Live demo</Ext>}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Toolbox: run-in type */}
        <section className="tools-sec" id="skills" aria-labelledby="skills-title">
          <div className="wrap">
            <h2 id="skills-title" className="title" data-reveal>Toolbox</h2>
            <div className="runin" data-reveal>
              {skills.map((s) => (
                <p key={s.group}>
                  <strong>{s.group}</strong> {s.items.join(", ")}.
                </p>
              ))}
              <p><strong>Languages</strong> Ukrainian, Norwegian, English, Russian.</p>
            </div>
          </div>
        </section>

        {/* Contact: heather */}
        <section className="heather" id="contact" aria-labelledby="contact-title">
          <div className="ridge" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ridge }} />
          <div className="wrap contact">
            <h2 id="contact-title">Let’s talk</h2>
            <p>Questions about IT operations, security or front-end? Send me a message.</p>
            <div className="hero__cta">
              <Ext href={links.linkedin} className="btn btn--snow">LinkedIn</Ext>
              <Ext href={links.github} className="btn btn--line">GitHub</Ext>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__row">
          <span>© {new Date().getFullYear()} Yevheniia Tobolovska</span>
          <span>React and Vite on Vercel. Strict security headers, no trackers, no third-party requests.</span>
        </div>
      </footer>
    </>
  );
}
