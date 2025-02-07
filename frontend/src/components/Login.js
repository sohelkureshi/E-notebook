import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://e-notebook-fu9z.onrender.com/api/auth/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();

    if (json.success) {
      // Store token in sessionStorage so it won’t persist after closing the tab
      sessionStorage.setItem('token', json.authToken);
      // Navigate to the notes page (rendered by Home.js at route '/home')
      navigate("/home");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="notebook-preview">
          <div className="notebook-header">
            <h1>E-Notebook</h1>
            <p>Your Digital Knowledge Hub</p>
          </div>
          <div className="notebook-content">
            <div className="note">
              <h3>Key Features</h3>
              <ul>
                <li>Secure Cloud Storage</li>
                <li>Real-Time Syncing</li>
                <li>Advanced Search</li>
                <li>Mobile Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="login-card">
        <div className="brand-header">
          <span className="logo">📘</span>
          <h2>Welcome Back</h2>
        </div>
        <p className="subtext">Access your digital brain</p>
        
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
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeSlashIcon className="eye-icon" /> : 
                  <EyeIcon className="eye-icon" />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn">
            Continue
            <span className="arrow">→</span>
          </button>
        </form>

        <div className="login-footer">
          <p>New to E-Notebook? <Link to="/signup">Create account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
