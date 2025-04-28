import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderApi } from '../services/api';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
        console.error(err);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <div>Loading order details...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  // Format date
  const orderDate = new Date(order.createdAt).toLocaleString();
  
  // Get items from order
  const orderItems = order.orderItems || [];

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <h2>Order Confirmed!</h2>
        <p className="order-number">Order #{order.id}</p>
        <p className="order-date">Placed on: {orderDate}</p>
      </div>

      <div className="order-status">
        <h3>Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</h3>
        <p>Your order is being prepared and will be delivered to:</p>
        <p className="delivery-address">{order.deliveryAddress}</p>
      </div>

      <div className="order-details">
        <h3>Order Details</h3>
        <div className="order-items-list">
          {orderItems.map((item) => (
            <div key={item.id} className="order-item">
              <span className="item-name">{item.name} × {item.quantity}</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="order-total">
          <span>Total:</span>
          <span>${parseFloat(order.totalAmount).toFixed(2)}</span>
        </div>
      </div>

      <div className="payment-info">
        <h3>Payment Information</h3>
        <p>Payment Method: {order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
      </div>

      <div className="confirmation-actions">
        <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        <Link to="/order-history" className="view-orders-btn">View All Orders</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
