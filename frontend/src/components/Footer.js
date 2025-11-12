import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>E-Notebook &copy; 2025 | Your digital brain</p>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
