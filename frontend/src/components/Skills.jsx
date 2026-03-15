import { useEffect, useRef } from "react";
import "./Skills.css";

const SKILL_GROUPS = [
  {
    category: "Languages",
    items: ["Python", "C++", "JavaScript", "Java", "SQL", "GraphQL", "C", "HTML / CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express.js", "Flask", "REST APIs", "pandas", "Scikit-learn", "Matplotlib", "Chart.js", "JUnit"],
  },
  {
    category: "Databases & Cloud",
    items: ["MongoDB", "AWS", "Azure"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "VS Code", "Vim", "GNU Debugger", "Eclipse", "APScheduler", "Excel"],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".skill-group");
            items.forEach((el, i) => {
              el.style.animationDelay = `${i * 0.08}s`;
              el.classList.add("fade-up");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-divider" />
      <div className="section skills__inner" ref={ref}>
        <div className="skills__header">
          <p className="section-label">What I work with</p>
          <h2 className="section-heading">Skills</h2>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="skill-group">
              <h3 className="skill-group__title">{group.category}</h3>
              <ul className="skill-group__list">
                {group.items.map((item) => (
                  <li key={item} className="skill-pill">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
