// src/Login.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LoginPage.css';
import RouletteWheel from './RouletteWheel';
import { getBackendUrl } from '../EnvironmentVariables';
import checkToken from '../components/CheckToken';
import { registerUser } from '../components/userComponent';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  
  const handleRegister = async (email, username, password) => {
    try {
        const response = await registerUser(email, username, password);

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
          console.error('Register failed');
        }
    } catch (error) {
        console.error('Error occurred while logging in:', error.message);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const check = await checkToken();
      if (check.ok) {
        console.log(check.user);
        navigate('/');
      }
    };
    validateToken();
  }, []);

  return (
    <div className="login-container">
    <RouletteWheel isForRegister={true} onSign={handleRegister}>
    </RouletteWheel>
    </div>
  );
};

export default RegisterPage;
