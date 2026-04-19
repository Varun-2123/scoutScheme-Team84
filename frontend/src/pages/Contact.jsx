import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have a question, suggestion, or found a missing scheme? We'd love to hear from you.</p>
      </section>
      <div className="contact-body">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We're a small team passionate about making government schemes accessible to every Indian. Your feedback helps us improve.</p>
          <div className="info-items">
            {[
              { icon: '📧', title: 'Email', desc: 'support@schemescout.in' },
              { icon: '🐛', title: 'Report a missing scheme', desc: 'Use the form and mention the scheme name and state' },
              { icon: '💡', title: 'Suggestions', desc: 'We read every message and use feedback to improve' },
            ].map((item) => (
              <div key={item.title} className="info-item">
                <span className="info-icon">{item.icon}</span>
                <div><strong>{item.title}</strong><p>{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you soon.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" placeholder="e.g. Missing scheme for Maharashtra farmers" value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows={5} placeholder="Tell us more..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="contact-btn">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;