import { useEffect, useRef, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const EMAIL = "mahin2406@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".fade-up-contact");
            items.forEach((el, i) => {
              el.style.animationDelay = `${i * 0.1}s`;
              el.style.animation = `fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s forwards`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="section-divider" />
      <div className="section contact__inner" ref={ref}>
        <div className="contact__card">
          <p className="section-label fade-up-contact">Let's connect</p>
          <h2 className="section-heading contact__heading fade-up-contact">
            Open to new<br />
            <em>opportunities.</em>
          </h2>
          <p className="contact__sub fade-up-contact">
            Whether it's a full-time role, internship, or just a conversation about 
            something interesting — I'm always happy to talk.
          </p>

          <div className="contact__actions fade-up-contact">
            <a href={`mailto:${EMAIL}`} className="btn btn--primary contact__btn">
              Send an email
            </a>
            <button onClick={handleCopy} className="contact__copy btn btn--ghost">
              {copied ? "✓ Copied!" : EMAIL}
            </button>
          </div>

          <div className="contact__links fade-up-contact">
            <a href="https://github.com/MMahmud24" target="_blank" rel="noreferrer" className="contact__link">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/mahin-mahmud24" target="_blank" rel="noreferrer" className="contact__link">
              LinkedIn ↗
            </a>
            <a href="tel:3474598484" className="contact__link">
              (347) 459-8484 ↗
            </a>
          </div>
        </div>

        {/* Education callout */}
        <div className="contact__edu fade-up-contact">
          <div className="contact__edu-inner">
            <p className="contact__edu-label">Education</p>
            <h3 className="contact__edu-school">Binghamton University</h3>
            <p className="contact__edu-degree">B.S. Computer Science</p>
            <p className="contact__edu-meta">Expected May 2028 · GPA 3.90</p>
            <p className="contact__edu-location">Vestal, NY</p>
          </div>
        </div>
      </div>
    </section>
  );
}
