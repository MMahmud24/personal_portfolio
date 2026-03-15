import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-divider" />
      <div className="footer__inner">
        <p className="footer__name">Mahin Mahmud</p>
        <p className="footer__copy">
          Built with React · {new Date().getFullYear()}
        </p>
        <div className="footer__links">
          <a href="https://github.com/MMahmud24" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/mahin-mahmud24" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:mahin2406@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
