import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css'; // Import CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [userData, setUserData] = useState(null); // Initialize userData state

  useEffect(() => {
    // Fetch user data from localStorage when component mounts
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      // Parse storedUserData if it exists
      setUserData(JSON.parse(storedUserData));
    }
  }, []); 

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src="assets/logo1.png" alt="Ghar Jagga" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <ul className="navbar-menu">
          <li className="navbar-item" onClick={() => handleNavigation('/home')}>Home</li>
          <li className="navbar-item" onClick={() => handleNavigation('/forsale')}>For Sell</li>
          <li className="navbar-item" onClick={() => handleNavigation('/forrent')}>For Rent</li>
          <li className="navbar-item" onClick={() => handleNavigation('/home')}>Suscribe</li>
        </ul>
      </div>
      <div className="navbar-right">
        {userData ? (
          <>
            <button className="navbar-button-sell" onClick={() => handleNavigation('/sell')}>Sell</button>
            <button className="navbar-button-shrijan" onClick={() => handleNavigation('/profile')}>{userData.firstName}</button>
          </>
        ) : (
          <button className="navbar-button-shrijan" onClick={() => handleNavigation('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
