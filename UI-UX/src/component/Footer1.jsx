import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/footer.css'; // Import CSS file for styling

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      toast.success('Subscribed successfully');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <div className="footer-container">
      <ToastContainer />
      <div className="footer-newsletter">
        <div className="newsletter-icon">
          <img src="assets/footericon.png" alt="Newsletter Icon" />
        </div>
        <div className="newsletter-content">
          <h2>Subscribe to newsletter</h2>
          <p>Get the latest news and interesting offers and real estate</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input type="email" name="email" placeholder="Your e-mail address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-blue-line"></div>
    </div>
  );
};

export default Footer;
