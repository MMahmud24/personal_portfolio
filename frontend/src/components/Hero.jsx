import { useEffect, useRef } from "react";
import "./Hero.css";

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/MMahmud24", icon: "→" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mahin-mahmud24", icon: "→" },
  { label: "Email", href: "mailto:mahin2406@gmail.com", icon: "→" },
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll(".fade-up");
    items?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1 + 0.1}s`;
    });
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Subtle grid background */}
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        {/* Left: text */}
        <div className="hero__text">
          <p className="hero__eyebrow fade-up">
            <span className="hero__dot" /> Available for opportunities
          </p>

          <h1 className="hero__name fade-up">
            Mahin<br />
            <em>Mahmud</em>
          </h1>

          <p className="hero__role fade-up">
            Software Engineer · CS @ Binghamton University
          </p>

          <p className="hero__bio fade-up">
            I build full-stack web applications and data-driven tools — 
            from production event platforms to machine learning pipelines. 
            Focused on clean code, measurable impact, and shipping things that work.
          </p>

          <div className="hero__actions fade-up">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="#contact" className="btn btn--ghost">Get in Touch</a>
          </div>

          <ul className="hero__socials fade-up">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hero__social-link">
                  {s.label} <span className="hero__social-arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: headshot */}
        <div className="hero__photo-wrap fade-up">
          <div className="hero__photo-frame">
              <img src="/headshot.jpg" alt="Mahin Mahmud" className="hero__photo-img" />
            <div className="hero__photo-placeholder">
              <div className="hero__photo-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28" cy="20" r="10" fill="#c8c7c0"/>
                  <path d="M8 48c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="#c8c7c0" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <p className="hero__photo-hint">Add <code>headshot.jpg</code> to <code>/public</code></p>
            </div>
          </div>

          {/* Floating stat chips */}
        </div>
      </div>

      {/* Scroll nudge */}
      <div className="hero__scroll fade-up">
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
