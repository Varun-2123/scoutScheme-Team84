import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⚡</span>
        SchemeScout
      </Link>
      <div className="navbar-links">
        <Link to="/" className={isActive('/') ? 'nav-link active' : 'nav-link'}>Home</Link>
        <Link to="/about" className={isActive('/about') ? 'nav-link active' : 'nav-link'}>About</Link>
        <Link to="/contact" className={isActive('/contact') ? 'nav-link active' : 'nav-link'}>Contact</Link>
        {user ? (
          <>
            <Link to="/profile" className={isActive('/profile') ? 'nav-link active' : 'nav-link'}>Profile</Link>
            <Link to="/schemes" className={isActive('/schemes') ? 'nav-link active' : 'nav-link'}>My Schemes</Link>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login') ? 'nav-link active' : 'nav-link'}>Login</Link>
            <Link to="/register" className="btn-register">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;