import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderApi } from '../services/api';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    paymentMethod: 'credit_card'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.deliveryAddress) {
      toast.error('Please enter a delivery address');
      return;
    }
    
    try {
      setLoading(true);
      
      // Format order items for API
      const orderItems = cartItems.map(item => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
      
      const orderData = {
        orderItems,
        totalAmount: totalPrice,
        paymentMethod: formData.paymentMethod,
        deliveryAddress: formData.deliveryAddress
      };
      
      const response = await orderApi.createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to order confirmation with orderId
      navigate(`/order-confirmation/${response.data.order.id}`);
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="deliveryAddress">Delivery Address</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="Enter your full delivery address"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="place-order-btn"
          disabled={loading || cartItems.length === 0}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
