import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
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
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
