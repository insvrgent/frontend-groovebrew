// src/Login.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LoginPage.css';
import RouletteWheel from './RouletteWheel';
import { loginUser } from '../components/userComponent';

const LoginPage = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const handleLogin = async (email, username, password) => {
    try {
      console.log(shopId)
      const response = await loginUser(username, password);

      if (response.success) {
        localStorage.setItem("auth", response.token);
        
        //for guest
        if(response.cafeId == null) {
          //for guest that has from shop (has param)
          if(shopId) navigate('/shop/' + shopId);

          //for guest that hasnt from shop (didnt has param)
          else navigate('/');
        }
        //for clerk
        else navigate('/shop/' + response.cafeId);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error.message);
    }
  };

  return (
    <div className="login-container">
      <RouletteWheel onSign={handleLogin} />
    </div>
  );
};

export default LoginPage;
