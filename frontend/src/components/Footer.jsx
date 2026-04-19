import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">⚡ SchemeScout</Link>
        <p>Making government schemes accessible to every Indian citizen.</p>
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <h4>Pages</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/schemes">My Schemes</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} SchemeScout. Built for India 🇮🇳</p>
    </div>
  </footer>
);

export default Footer;