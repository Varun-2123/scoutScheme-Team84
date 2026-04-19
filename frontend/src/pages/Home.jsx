import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">🇮🇳 For Every Indian Citizen</div>
        <h1 className="hero-title">
          Find Government Schemes<br />
          <span className="hero-highlight">You Actually Qualify For</span>
        </h1>
        <p className="hero-subtitle">
          Fill a 2-minute profile. Our AI scans hundreds of central and state government
          schemes and shows only the ones you're eligible for — with direct apply links
          and step-by-step guides.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to="/schemes" className="btn-primary">View My Schemes →</Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary">Get Started Free →</Link>
              <Link to="/login" className="btn-secondary">I already have an account</Link>
            </>
          )}
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Schemes tracked</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">28</span>
            <span className="stat-label">States covered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">2 min</span>
            <span className="stat-label">To find your schemes</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Three simple steps to find what the government owes you</p>
        <div className="steps-grid">
          {[
            { num: '01', icon: '📋', title: 'Fill Your Profile', desc: 'Enter your age, state, income, category and occupation. Takes under 2 minutes.' },
            { num: '02', icon: '🤖', title: 'AI Scans Schemes', desc: 'Our AI cross-references your details against hundreds of central and state schemes.' },
            { num: '03', icon: '✅', title: 'Apply with Confidence', desc: 'Get direct apply links, deadlines and step-by-step application guides.' },
          ].map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Schemes Across All Categories</h2>
        <div className="cat-grid">
          {[
            { icon: '🎓', label: 'Education & Scholarships' },
            { icon: '🏠', label: 'Housing' },
            { icon: '🌾', label: 'Agriculture' },
            { icon: '🏥', label: 'Health Insurance' },
            { icon: '💼', label: 'Employment' },
            { icon: '👩', label: 'Women Welfare' },
            { icon: '👴', label: 'Senior Citizens' },
            { icon: '⚡', label: 'Utilities & Energy' },
          ].map((cat) => (
            <div key={cat.label} className="cat-card">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Don't Miss Schemes You're Entitled To</h2>
        <p>Millions of Indians miss out on government benefits simply because they don't know they exist. SchemeScout fixes that.</p>
        <Link to={user ? '/schemes' : '/register'} className="btn-primary">
          {user ? 'View My Schemes →' : 'Find My Schemes Now →'}
        </Link>
      </section>
    </div>
  );
};

export default Home;