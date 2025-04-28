import React from 'react';
import { Navigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }
  
  return (
    <div className="checkout-page">
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
