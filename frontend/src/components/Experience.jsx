import { useEffect, useRef } from "react";
import "./Experience.css";

const EXPERIENCE = [
  {
    role: "Software Developer",
    org: "Muslim Interscholastic Tournament",
    location: "New York, NY",
    period: "Aug 2025 – Present",
    type: "Professional",
    bullets: [
      "Maintained and enhanced a production event management platform serving 2,000+ users by refactoring React.js and Node.js components under Agile workflows.",
      "Built a Flask analytics dashboard integrating a GraphQL API to process 1,000+ real-time engagement score records with pandas, giving 20+ schools instant visibility.",
      "Eliminated API bottlenecks during peak traffic with APScheduler-based caching, sustaining sub-second response times during live events.",
    ],
    tags: ["React", "Node.js", "Flask", "GraphQL", "pandas"],
  },
  {
    role: "Director of External Affairs",
    org: "StackHacks",
    location: "",
    period: "May 2025 – Present",
    type: "Leadership",
    bullets: [
      "Scaled external presence by building and maintaining a partnership database of 10+ student organizations.",
      "Drove 150+ participant engagements across 10+ technical workshops by owning end-to-end logistics.",
      "Designed a post-event engagement metrics framework that grew member participation by 25% semester-over-semester.",
    ],
    tags: ["Leadership", "Operations", "Community"],
  },
  {
    role: "Camp Counselor",
    org: "Queens Community House",
    location: "New York, NY",
    period: "Jul 2025 – Aug 2025",
    type: "Work",
    bullets: [
      "Mentored 25+ middle schoolers daily across team-building and STEM activities over a 6-week summer program.",
      "Planned and facilitated structured group challenges, adapting activities in real time to maintain engagement.",
    ],
    tags: ["Mentorship", "STEM", "Education"],
  },
];

export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".exp-card");
            items.forEach((el, i) => {
              el.style.animationDelay = `${i * 0.12}s`;
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
    <section id="experience" className="exp-section">
      <div className="section-divider" />
      <div className="section" ref={ref}>
        <p className="section-label">Where I've worked</p>
        <h2 className="section-heading">Experience</h2>

        <div className="exp-list">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="exp-card">
              <div className="exp-card__left">
                <span className="exp-card__type tag">{item.type}</span>
                <span className="exp-card__period">{item.period}</span>
              </div>
              <div className="exp-card__right">
                <div className="exp-card__header">
                  <div>
                    <h3 className="exp-card__role">{item.role}</h3>
                    <p className="exp-card__org">
                      {item.org}
                      {item.location && <span className="exp-card__location"> · {item.location}</span>}
                    </p>
                  </div>
                </div>

                <ul className="exp-card__bullets">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="exp-card__bullet">{b}</li>
                  ))}
                </ul>

                <div className="exp-card__tags">
                  {item.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
