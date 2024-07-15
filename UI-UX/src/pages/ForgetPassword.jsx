import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { forgetPasswordApi } from '../apis/Api'; // Import the API function for forgot password
import { useNavigate } from 'react-router-dom';

import '../style/Login.css'; // Import CSS file for styling

const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API function to send forgot password request
      const response = await forgetPasswordApi(email);

      // Handle success response
      toast.success(response.data.message);
      // Optionally, you can redirect the user to a different page
      navigate('/login');
    } catch (error) {
      // Handle error response
      toast.error(error.response.data.message || 'Server Error');
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <div className="login-logo">
            <img src={"assets/logot.png"} className="logo-img" alt="logo" />
          </div>
          <h3 className="login-title">Forget Password !</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
           
            <div className="form-group">
              <button type="submit" className="btn btn-login">Send</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
