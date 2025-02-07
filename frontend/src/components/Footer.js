import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>E-Notebook &copy; 2025 | Your digital brain, unleashed</p>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
