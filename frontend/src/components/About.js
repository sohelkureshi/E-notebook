import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About eNotebook</h1>
        <p className="tagline">Your Digital Notebook for Smarter Thinking</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Welcome to eNotebook</h2>
          <p>
            eNotebook is a modern, cloud-based note management app that helps you write, organize, and manage your ideas securely. 
            It’s built using React.js, Express.js, and MongoDB to give you a smooth and reliable experience.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a simple and secure way to manage your notes. 
            With eNotebook, you can focus on your ideas while we take care of storage, access, and organization.
          </p>
        </section>

        <section className="about-section features">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Authentication for Security</strong> – Protect your notes with secure login and user verification.</li>
            <li><strong>CRUD Operations on Notes</strong> – Create, read, update, and delete your notes easily.</li>
            <li><strong>Summarize Notes</strong> – Use integrated Gemini AI to get quick summaries of your notes on demand.</li>
            <li><strong>Aesthetic Web App</strong> – Enjoy a clean, responsive, and user-friendly interface built for productivity.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose eNotebook?</h2>
          <div className="why-choose">
            <div className="reason">
              <h3>Security</h3>
              <p>Your data is protected with authentication and secure storage.</p>
            </div>
            <div className="reason">
              <h3>Reliability</h3>
              <p>Built on a strong tech stack for consistent performance.</p>
            </div>
            <div className="reason">
              <h3>Ease of Use</h3>
              <p>Simple design that makes note-taking fast and enjoyable.</p>
            </div>
          </div>
        </section>

        <section className="about-section cta">
          <h2>Get Started</h2>
          <p>Join eNotebook today and make note-taking simple, secure, and intelligent.</p>
          <a href="/signup" className="cta-button">Sign Up Now</a>
        </section>
      </div>
    </div>
  );
}

export default About;
