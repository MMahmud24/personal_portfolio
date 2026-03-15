import { useState } from "react";
import "./Navbar.css";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          Mahin Mahmud
        </a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="navbar__link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="/mahin-mahmud-resume.pdf" className="navbar__cta" target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
        </nav>

        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={open ? "bar bar--x1" : "bar"} />
          <span className={open ? "bar bar--x2" : "bar"} />
          <span className={open ? "bar bar--x3" : "bar"} />
        </button>
      </div>
    </header>
  );
}
