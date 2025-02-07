import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About eNotebook</h1>
        <p className="tagline">Your Digital Brain, Unleashed</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Welcome to eNotebook</h2>
          <p>eNotebook is your ultimate cloud-based note management solution. Powered by React.js, Express.js, and MongoDB, we offer a seamless and secure note-taking experience for all your needs.</p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>To provide a secure, efficient, and user-friendly platform that empowers you to capture, organize, and access your thoughts and ideas from anywhere, at any time.</p>
        </section>

        <section className="about-section features">
          <h2>Key Features</h2>
          <ul>
            <li><span className="feature-icon">🔒</span> <strong>Secure Cloud Storage</strong></li>
            <li><span className="feature-icon">🔄</span> <strong>Real-Time Syncing</strong></li>
            <li><span className="feature-icon">🎨</span> <strong>Intuitive Interface</strong></li>
            <li><span className="feature-icon">🔍</span> <strong>Advanced Search</strong></li>
            <li><span className="feature-icon">📂</span> <strong>Smart Organization</strong></li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose eNotebook?</h2>
          <div className="why-choose">
            <div className="reason">
              <span className="reason-icon">🛡️</span>
              <h3>Security First</h3>
              <p>Advanced encryption and secure authentication to protect your data.</p>
            </div>
            <div className="reason">
              <span className="reason-icon">⚡</span>
              <h3>Reliability</h3>
              <p>Built on a robust tech stack for uncompromised performance.</p>
            </div>
            <div className="reason">
              <span className="reason-icon">🚀</span>
              <h3>Ease of Use</h3>
              <p>Intuitive design for students, professionals, and note enthusiasts alike.</p>
            </div>
          </div>
        </section>

        <section className="about-section cta">
          <h2>Ready to Get Started?</h2>
          <p>Join the eNotebook community and revolutionize your note-taking experience.</p>
          <a href="/signup" className="cta-button">Sign Up Now</a>
        </section>
      </div>
    </div>
  );
}

export default About;
