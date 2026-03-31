import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../global/SocialIcons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo mono">
          <span className="footer-bracket">[</span>MM<span className="footer-bracket">]</span>
        </span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Mahin Mahmud — Built with React + Vite
        </span>
        <div className="footer-links">
          <a href="https://github.com/MMahmud24" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={14} /></a>
          <a href="https://linkedin.com/in/mahin-mahmud24" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={14} /></a>
          <a href="mailto:mahin2406@gmail.com" aria-label="Email"><Mail size={14} /></a>
        </div>
      </div>
      <div className="footer-hint">
        Press <kbd>`</kbd> to open terminal
      </div>
    </footer>
  )
}
