import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './ProfileSetup.css';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const ProfileSetup = () => {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    state: '',
    occupation: '',
    annualIncome: '',
    category: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/profile');

        if (res.data) {
          setForm({
            ...res.data,
            age: res.data.age || '',
            annualIncome: res.data.annualIncome || ''
          });
          setProfileExists(true);
        }
      } catch (err) {
        console.log('No existing profile');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.put('/auth/profile', {
        ...form,
        age: Number(form.age),
        annualIncome: Number(form.annualIncome)
      });

      setProfileExists(true);
      setIsEditing(false);

      navigate('/schemes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profileExists && !isEditing) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Your Profile</h1>
            <p>This is the data used to match schemes for you</p>
          </div>

          <div className="profile-summary">
            <p><strong>Age:</strong> {form.age}</p>
            <p><strong>Gender:</strong> {form.gender}</p>
            <p><strong>State:</strong> {form.state}</p>
            <p><strong>Occupation:</strong> {form.occupation}</p>
            <p><strong>Category:</strong> {form.category}</p>
            <p><strong>Income:</strong> ₹{form.annualIncome}</p>
          </div>

          <button
            className="auth-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>

          <button
            className="auth-btn secondary"
            onClick={() => navigate('/schemes')}
            style={{ marginTop: '10px' }}
          >
            View Schemes →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-badge">
            {profileExists ? 'Edit Profile' : 'Step 1 of 1'}
          </div>
          <h1>{profileExists ? 'Update Your Profile' : 'Complete Your Profile'}</h1>
          <p>We use this to find schemes you're actually eligible for.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="1"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>State</label>
            <select name="state" value={form.state} onChange={handleChange} required>
              <option value="">Select your state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Occupation</label>
              <select name="occupation" value={form.occupation} onChange={handleChange} required>
                <option value="">Select occupation</option>
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Annual Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              value={form.annualIncome}
              onChange={handleChange}
              min="0"
              required
            />
            <span className="form-hint">
              Enter approximate annual household income in rupees
            </span>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading
              ? 'Saving...'
              : profileExists
              ? 'Update Profile'
              : 'Find My Schemes →'}
          </button>

          {profileExists && (
            <button
              type="button"
              className="auth-btn secondary"
              onClick={() => setIsEditing(false)}
              style={{ marginTop: '10px' }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;