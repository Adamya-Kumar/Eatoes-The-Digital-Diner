import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);
  
  return (
    <div className="auth-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
