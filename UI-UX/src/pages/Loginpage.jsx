import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/Api';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Import CSS file for styling
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };

    loginUserApi(data)
  .then((res) => {
    if (res.data.success === false) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      const jsonDecode = JSON.stringify(res.data.userData);
      localStorage.setItem('user', jsonDecode);
      
      // Check if the logged-in user is an admin
      const isAdmin = res.data.userData.isAdmin;
      console.log(isAdmin)
      
      // Redirect to appropriate page based on admin status
      if (isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    }
  })
  .catch((err) => {
    toast.error('Server Error');
    console.log(err.message);
  });

  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <img src="assets/logo.png" alt="Ghar Jagga Nepal" className="logo" />
        </div>
        <div className="login-right">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account?  <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
