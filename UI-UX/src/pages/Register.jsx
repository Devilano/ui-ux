import React, { useState } from "react";
import { createUserApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { SocialIcon } from 'react-social-icons';
import { useNavigate } from 'react-router-dom';
import '../style/register.css'; // Import CSS file for styling

const Register = () => {
  const navigate = useNavigate();

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [CpasswordError, setCPasswordError] = useState('');
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;
    setFnameError("");
    setLnameError("");
    setAddressError("");
    setEmailError("");
    setPasswordError("");
    setCPasswordError("");
   
    if (firstName.trim() === "") {
      setFnameError("Firstname is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLnameError("Lastname is required");
      isValid = false;
    }
    if (address.trim() === "") {
      setAddressError("Address is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setCPasswordError("Confirm Password is required");
      isValid = false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setCPasswordError("Password and Confirm password doesn't match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      password: password,
    };
    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch(err => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <img src="assets/logo.png" alt="Ghar Jagga Nepal" className="logo" />
        </div>
        <div className="signup-right">
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={changeFirstName}
            />
            {fnameError && <p className='error'>{fnameError}</p>}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={changeLastName}
            />
            {lnameError && <p className='error'>{lnameError}</p>}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={changeAddress}
            />
            {addressError && <p className='error'>{addressError}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={changeEmail}
            />
            {emailError && <p className='error'>{emailError}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
            />
            {passwordError && <p className='error'>{passwordError}</p>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
            {CpasswordError && <p className='error'>{CpasswordError}</p>}
            <button type="submit">Sign up</button>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
