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

    const url = "http://localhost:5000/api/auth/createuser";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();

      if (json.success) {
        sessionStorage.setItem('token', json.authToken);
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
  };

  return (
    <div className="landing-container">
      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Organize Your Thoughts with <span>E-Notebook</span></h1>
            <p className="welcome-quote">
              "Where Ideas Meet Structure — Your Digital Space for Smart Notes"
            </p>
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
            <h2>Why Choose E-Notebook?</h2>
            <p>Powerful features that make your note-taking smarter and easier</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h3>Secure Authentication</h3>
              <p>
                Your account and notes are fully protected with authentication-based access.
              </p>
            </div>

            <div className="feature-card">
              <h3>Complete Note Management</h3>
              <p>
                Create, edit, delete, and organize notes easily with full CRUD operations.
              </p>
            </div>

            <div className="feature-card">
              <h3>AI-Powered Summarization</h3>
              <p>
                Get instant summaries of your notes using Gemini AI for quick insights.
              </p>
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
