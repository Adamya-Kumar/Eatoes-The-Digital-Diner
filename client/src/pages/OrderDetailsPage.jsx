import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        if (!userInfo || !userInfo.token) {
          setError('You must be logged in to view order details');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
          config
        );

        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : 'Failed to fetch order details'
        );
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-info">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
      </div>

      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Zip Code:</strong> {order.zipCode}</p>
        <p><strong>Phone:</strong> {order.phoneNumber}</p>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> ${order.tax.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> ${order.deliveryFee.toFixed(2)}</p>
        <p className="total"><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
      </div>

      <div className="actions">
        <Link to="/order-history" className="btn btn-back">Back to Order History</Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
