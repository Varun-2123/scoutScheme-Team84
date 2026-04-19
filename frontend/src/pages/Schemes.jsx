import { useState, useEffect } from 'react';
import API from '../api/axios';
import './Schemes.css';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => { loadSaved(); }, []);

  const loadSaved = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/schemes/saved');
      setSchemes(data.schemes);
    } catch {
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFromGemini = async () => {
    setFetching(true);
    setError('');
    try {
      const { data } = await API.get('/schemes/fetch');
      setSchemes(data.schemes);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch schemes. Try again.');
    } finally {
      setFetching(false);
    }
  };

  const filtered = filter === 'All' ? schemes : schemes.filter((s) => s.level === filter);

  if (loading) return (
    <div className="schemes-loading">
      <div className="spinner" />
      <p>Loading your schemes...</p>
    </div>
  );

  return (
    <div className="schemes-page">
      <div className="schemes-header">
        <div>
          <h1>Your Eligible Schemes</h1>
          <p>Government schemes matched to your profile</p>
        </div>
        <button className="btn-fetch" onClick={fetchFromGemini} disabled={fetching}>
          {fetching ? <><span className="btn-spinner" /> Searching...</> : '🤖 Refresh with AI'}
        </button>
      </div>

      {error && <div className="schemes-error">{error}</div>}

      {fetching && (
        <div className="fetching-banner">
          <div className="fetching-spinner" />
          <div>
            <strong>AI is scanning schemes for you...</strong>
            <p>This may take 10–15 seconds</p>
          </div>
        </div>
      )}

      {schemes.length > 0 && (
        <div className="schemes-filters">
          {['All', 'Central', 'State'].map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f} ({f === 'All' ? schemes.length : schemes.filter(s => s.level === f).length})
            </button>
          ))}
        </div>
      )}

      {schemes.length === 0 && !fetching ? (
        <div className="schemes-empty">
          <div className="empty-icon">🔍</div>
          <h2>No schemes found yet</h2>
          <p>Click the button below to let our AI find schemes you're eligible for</p>
          <button className="btn-fetch large" onClick={fetchFromGemini} disabled={fetching}>
            🤖 Find My Schemes
          </button>
        </div>
      ) : (
        <div className="schemes-grid">
          {filtered.map((scheme, i) => <SchemeCard key={i} scheme={scheme} />)}
        </div>
      )}
    </div>
  );
};

const SchemeCard = ({ scheme }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="scheme-card">
      <div className="scheme-card-top">
        <div className="scheme-meta">
          <span className={`level-badge ${scheme.level === 'Central' ? 'central' : 'state'}`}>
            {scheme.level === 'Central' ? '🏛 Central' : '📍 State'}
          </span>
          {scheme.deadline && (
            <span className="deadline-badge">
              ⏰ Deadline: {new Date(scheme.deadline).toLocaleDateString('en-IN')}
            </span>
          )}
        </div>
        <h3 className="scheme-name">{scheme.name}</h3>
        <p className="scheme-desc">{scheme.description}</p>
      </div>

      {scheme.tags?.length > 0 && (
        <div className="scheme-tags">
          {scheme.tags.slice(0, 4).map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
      )}

      {expanded && scheme.steps?.length > 0 && (
        <div className="scheme-steps">
          <h4>How to Apply</h4>
          <ol>{scheme.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
        </div>
      )}

      <div className="scheme-actions">
        <button className="btn-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide Steps ↑' : 'View Steps ↓'}
        </button>
        {scheme.applyLink && (
          <a href={scheme.applyLink} target="_blank" rel="noreferrer" className="btn-apply">
            Apply Now →
          </a>
        )}
      </div>
    </div>
  );
};

export default Schemes;