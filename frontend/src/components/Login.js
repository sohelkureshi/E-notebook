import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      sessionStorage.setItem('token', json.authToken);
      navigate("/home");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div className="login-container">
      {/* ===== Left Side Preview ===== */}
      <div className="login-left">
        <div className="notebook-preview">
          <div className="notebook-header">
            <h1>E-Notebook</h1>
            <p>Your Smart Note Management App</p>
          </div>
          <div className="notebook-content">
            <div className="note">
              <h3>Key Features</h3>
              <ul>
                <li><strong>Authentication for Security</strong></li>
                <li><strong>CRUD Operations on Notes</strong></li>
                <li><strong>AI Summarization</strong></li>
                <li><strong>Clean and Aesthetic UI</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Right Side Login Card ===== */}
      <div className="login-card">
        <div className="brand-header">
          <h2>Welcome Back</h2>
        </div>
        <p className="subtext">Login to continue managing your notes</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="name@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Continue
            <span className="arrow">→</span>
          </button>
        </form>

        <div className="login-footer">
          <p>New to E-Notebook? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
