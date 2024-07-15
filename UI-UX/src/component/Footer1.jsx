import React from 'react';
import '../style/footer.css'; // Import CSS file for styling

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-newsletter">
        <div className="newsletter-icon">
          <img src="assets/footericon.png" alt="Newsletter Icon" />
        </div>
        <div className="newsletter-content">
          <h2>Subscribe to newsletter</h2>
          <p>Get the latest news and interesting offers and real estate</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your e-mail address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-blue-line"></div>
    </div>
  );
};

export default Footer;
