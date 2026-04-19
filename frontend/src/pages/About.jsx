import './About.css';

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1>About SchemeScout</h1>
      <p>Bridging the awareness gap between Indian citizens and government welfare schemes.</p>
    </section>
    <section className="about-content">
      <div className="about-block">
        <h2>The Problem We Solve</h2>
        <p>India has hundreds of central and state government schemes — for farmers, students, women, senior citizens, and more. Yet millions of eligible citizens never apply because they simply don't know these schemes exist, or don't know they qualify.</p>
        <p>The information is scattered across dozens of government portals, in dense bureaucratic language, with no easy way to know what applies to you personally.</p>
      </div>
      <div className="about-block highlight">
        <h2>What SchemeScout Does</h2>
        <p>You fill a 2-minute profile — your age, state, occupation, income, and category. Our AI then searches through central and state government schemes and returns only the ones you're genuinely eligible for, complete with:</p>
        <ul className="about-list">
          <li>✅ Direct official application links</li>
          <li>✅ Application deadlines</li>
          <li>✅ Step-by-step guides to apply</li>
          <li>✅ Both central and state-level schemes</li>
        </ul>
      </div>
      <div className="about-grid">
        {[
          { icon: '🎯', title: 'Personalised', desc: 'Results are specific to your profile — not generic lists.' },
          { icon: '⚡', title: 'Fast', desc: '2 minutes to fill your profile, seconds to get results.' },
          { icon: '🔒', title: 'Private', desc: 'Your data is used only to match schemes. Never sold.' },
          { icon: '🆓', title: 'Free', desc: 'Completely free to use. No hidden charges.' },
        ].map((v) => (
          <div key={v.title} className="about-val">
            <span className="val-icon">{v.icon}</span>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
      <div className="about-block">
        <h2>Who Is This For?</h2>
        <p>SchemeScout is built for every Indian citizen — but especially those who may not have easy access to information:</p>
        <ul className="about-list">
          <li>🌾 Farmers looking for income support and crop insurance</li>
          <li>🎓 Students searching for scholarships</li>
          <li>👩 Women seeking welfare and entrepreneurship schemes</li>
          <li>🏠 Families wanting housing subsidies</li>
          <li>💼 Job seekers looking for skill development programs</li>
        </ul>
      </div>
    </section>
  </div>
);

export default About;