import { useEffect } from "react";
import { links, tracks, hardeningLog, labs, builds, frontEnd, skills } from "./data.js";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Ext = ({ href, children, className }) => (
  <a href={href} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="top">
        <a href="#top" className="mark" aria-label="Yevheniia Tobolovska, back to top">
          YT<span>.</span>
        </a>
        <nav aria-label="Sections">
          <a href="#log">Hardening log</a>
          <a href="#labs">Labs</a>
          <a href="#builds">Builds</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <p className="hero__meta mono load load-1">Norway · IT operations · security · front-end</p>
          <h1 className="hero__name">
            <span className="load load-2">Yevheniia</span>
            <em className="load load-3">Tobolovska</em>
          </h1>
          <p className="hero__lede load load-4">
            I keep devices and users secure, build cloud infrastructure as code, and design and
            develop web and mobile apps — from the first sketch to production.
          </p>
          <p className="hero__no load load-4" lang="nb">
            «Jeg jobber med IT-drift og sikkerhet, og utvikler apper og nettsider – fra design til drift.»
          </p>
          <div className="hero__cta load load-5">
            <a href="#log" className="btn btn--solid">Read the hardening log</a>
            <Ext href={links.github} className="btn">GitHub</Ext>
            <Ext href={links.linkedin} className="btn">LinkedIn</Ext>
          </div>

          <ol className="tracks">
            {tracks.map((t) => (
              <li key={t.no} className="track" data-reveal>
                <span className="track__no mono">{t.no}</span>
                <h2 className="track__title">{t.title}</h2>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CASE STUDY */}
        <section className="log" id="log" aria-labelledby="log-title">
          <div className="log__inner">
            <header className="log__head" data-reveal>
              <p className="kicker mono">Case study · AWS · Terraform</p>
              <h2 id="log-title" className="section-title">
                Hardening an AWS&nbsp;EKS platform, <em>one pull request at a time</em>
              </h2>
              <p className="log__intro">
                A Terraform platform with VPC, EKS, RDS, ECR, Jenkins and Argo CD. I scanned it with
                Checkov, sorted real risks from noise, and fixed them in small reviewed changes — each
                one explaining <strong>what</strong> changed and <strong>why</strong>.
              </p>
              <dl className="stats">
                <div><dt className="mono">Pull requests</dt><dd>7</dd></div>
                <div><dt className="mono">Checkov findings</dt><dd>33 → 25</dd></div>
                <div><dt className="mono">Lines of risky node script</dt><dd>−172</dd></div>
              </dl>
            </header>

            <ol className="commits">
              {hardeningLog.map((c) => (
                <li key={c.pr} className="commit" data-reveal>
                  <span className="commit__pr mono">#{c.pr}</span>
                  <div>
                    <h3 className="commit__title mono">{c.title}</h3>
                    <p>{c.why}</p>
                  </div>
                  <span className="commit__tag mono">{c.tag}</span>
                </li>
              ))}
            </ol>

            <p className="log__foot" data-reveal>
              Remaining findings are either scheduled or skipped with a written reason.{" "}
              <Ext href={links.platform}>See the repository and every PR →</Ext>
            </p>
          </div>
        </section>

        {/* LABS */}
        <section className="labs" id="labs" aria-labelledby="labs-title">
          <header className="section-head" data-reveal>
            <p className="kicker mono">Security labs · MSc coursework</p>
            <h2 id="labs-title" className="section-title">Breaking things on purpose</h2>
          </header>
          <div className="labs__grid">
            {labs.map((l, i) => (
              <article key={l.title} className="lab" data-reveal>
                <span className="lab__i mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
                <ul className="chips" aria-label="Tools">
                  {l.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <Ext href={l.repo} className="arrow">Repository</Ext>
              </article>
            ))}
          </div>
        </section>

        {/* BUILDS */}
        <section className="builds" id="builds" aria-labelledby="builds-title">
          <header className="section-head" data-reveal>
            <p className="kicker mono">Products · in development and in use</p>
            <h2 id="builds-title" className="section-title">What I build</h2>
          </header>
          <div className="builds__list">
            {builds.map((b) => (
              <article key={b.title} className="build" data-reveal>
                <p className="build__kind mono">{b.kind}</p>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <p className="build__stack mono">{b.stack}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FRONT-END */}
        <section className="fe" aria-labelledby="fe-title">
          <header className="section-head" data-reveal>
            <p className="kicker mono">Front-end projects</p>
            <h2 id="fe-title" className="section-title">Interfaces</h2>
          </header>
          <div className="fe__grid">
            {frontEnd.map((p) => (
              <article key={p.title} className="shot" data-reveal>
                <div className="shot__frame">
                  <img src={p.img} alt={`Screenshot of ${p.title}`} loading="lazy" width="1080" height="686" />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p className="shot__links">
                  <Ext href={p.repo} className="arrow">Code</Ext>
                  {p.demo && <Ext href={p.demo} className="arrow">Live demo</Ext>}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="skills" id="skills" aria-labelledby="skills-title">
          <header className="section-head" data-reveal>
            <p className="kicker mono">Toolbox</p>
            <h2 id="skills-title" className="section-title">Skills</h2>
          </header>
          <div className="skills__grid">
            {skills.map((s) => (
              <div key={s.group} className="skill" data-reveal>
                <h3 className="mono">{s.group}</h3>
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="langs" data-reveal>
            <span className="mono">Languages</span> Ukrainian · Norwegian · English · Russian
          </p>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="contact__title" data-reveal>
            Let’s <em>talk.</em>
          </h2>
          <div className="contact__links" data-reveal>
            <Ext href={links.linkedin} className="btn btn--solid">LinkedIn</Ext>
            <Ext href={links.github} className="btn">GitHub</Ext>
          </div>
        </section>
      </main>

      <footer className="foot mono">
        <span>© {new Date().getFullYear()} Yevheniia Tobolovska</span>
        <span>React · Vite · Vercel · strict security headers · no trackers, no third-party requests</span>
      </footer>
    </>
  );
}
