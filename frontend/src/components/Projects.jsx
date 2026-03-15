import { useEffect, useRef } from "react";
import "./Projects.css";

const PROJECTS = [
  {
    title: "Brain Invaders",
    subtitle: "Hackathon · Best First-Time Hack @ HackRPI",
    year: "2025",
    description:
      "A cognitive training game that tracks 5+ behavioral metrics per session — reaction time, error rate, decision latency — via Flask APIs with adaptive difficulty and real-time feedback loops. Reduced impulsive inputs by 20% across test players.",
    tags: ["Flask", "Chart.js", "JavaScript", "Python"],
    highlight: true,
    award: "🏆 Best First-Time Hack",
    links: [],
  },
  {
    title: "TLC Taxi Fare Predictor",
    subtitle: "Machine Learning · NYC Open Data",
    year: "Aug – Nov 2025",
    description:
      "End-to-end Python ML pipeline ingesting 700,000+ records from 3 external APIs. Trained a Gradient Boosting model on 6 hand-engineered features achieving R² of 0.92 on holdout data — outperforming a linear baseline by 18%.",
    tags: ["Python", "Scikit-learn", "pandas", "Gradient Boosting"],
    highlight: false,
    award: null,
    links: [],
  },
  {
    title: "Notes University",
    subtitle: "Full-Stack · Note Sharing Platform",
    year: "Feb – Apr 2025",
    description:
      "A note-sharing platform supporting students across 50+ universities. Built with a responsive React front-end backed by a scalable Node.js / MongoDB stack, JWT authentication, bcrypt hashing, and 10+ RESTful API endpoints.",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS", "JWT"],
    highlight: false,
    award: null,
    links: [],
  },
];

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".proj-card");
            cards.forEach((el, i) => {
              el.style.animationDelay = `${i * 0.1}s`;
              el.classList.add("fade-up");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="proj-section">
      <div className="section-divider" />
      <div className="section" ref={ref}>
        <p className="section-label">Things I've built</p>
        <h2 className="section-heading">Projects</h2>

        <div className="proj-grid">
          {PROJECTS.map((p, idx) => (
            <article key={idx} className={`proj-card ${p.highlight ? "proj-card--featured" : ""}`}>
              {p.award && (
                <div className="proj-card__award">{p.award}</div>
              )}

              <div className="proj-card__top">
                <div>
                  <span className="proj-card__year">{p.year}</span>
                  <h3 className="proj-card__title">{p.title}</h3>
                  <p className="proj-card__subtitle">{p.subtitle}</p>
                </div>
                {/* Uncomment and add links when ready:
                <div className="proj-card__links">
                  <a href={p.links.github} target="_blank" rel="noreferrer" className="proj-link">
                    GitHub ↗
                  </a>
                </div>
                */}
              </div>

              <p className="proj-card__desc">{p.description}</p>

              <div className="proj-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
