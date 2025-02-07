import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const Signup = (props) => {
  const signupRef = useRef(null);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    signupRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const url = "https://e-notebook-fu9z.onrender.com/api/auth/createuser";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();

      if (json.success) {
        // Save token in sessionStorage for session-based authentication
        sessionStorage.setItem('token', json.authToken);
        // Redirect to the notes page (Home.js)
        navigate("/home");
        props.showAlert("Account created successfully", "success");
      } else {
        if (json.error) {
          props.showAlert(json.error, "danger");
        } else if (json.errors) {
          json.errors.forEach((error) => {
            props.showAlert(error.msg, "danger");
          });
        } else {
          props.showAlert("Account creation failed", "danger");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      props.showAlert("Account creation failed", "danger");
    }
  }

  return (
    <div className="landing-container">
      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Organize Your Thoughts with <span>E-Notebook</span></h1>
            <p className="welcome-quote">"Where Ideas Meet Structure - Your Digital Sanctuary for Creativity"</p>
            <a href="#signup" className="get-started-btn" onClick={handleGetStarted}>
              Get Started
              <span className="hover-effect"></span>
            </a>
          </div>
          <div className="hero-visual">
            <div className="floating-notebook">
              <div className="page">
                <span className="notebook-text">Your thoughts, anytime, anywhere.</span>
              </div>
              <div className="page"></div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2>Why E-Notebook?</h2>
            <p>Discover the perfect blend of simplicity and power</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📘</div>
              <h3>Smart Organization</h3>
              <p>Automatically categorize notes with AI-powered tagging</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Beautiful Interface</h3>
              <p>Enjoy writing with our distraction-free, elegant design</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Bank-Grade Security</h3>
              <p>Your thoughts are protected with AES-256 encryption</p>
            </div>
          </div>
        </section>

        <section className="signup-section" ref={signupRef} id="signup">
          <div className="signup-card">
            <div className="card-header">
              <h2>Start Your Journey</h2>
              <p>Create your free account in seconds</p>
            </div>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" value={credentials.name} onChange={onChange} placeholder=" " required minLength={3} />
                <label>Full Name</label>
              </div>
              <div className="form-group">
                <input type="email" name="email" value={credentials.email} onChange={onChange} placeholder=" " required />
                <label>Email Address</label>
              </div>
              <div className="form-group">
                <input type="password" name="password" value={credentials.password} onChange={onChange} placeholder=" " required minLength={5} />
                <label>Password</label>
              </div>
              <div className="form-group">
                <input type="password" name="cpassword" value={credentials.cpassword} onChange={onChange} placeholder=" " required minLength={5} />
                <label>Confirm Password</label>
              </div>

              <button type="submit" className="signup-btn">
                Create Account
                <span className="arrow">→</span>
              </button>
            </form>
            <p className="login-link">
              Already part of our community? <Link to="/login">Login here</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
