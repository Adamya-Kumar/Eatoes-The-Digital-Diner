import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getMyOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your orders');
        setLoading(false);
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div>{error}</div>;

  // Format status for display
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-history">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className={`order-status status-${order.status}`}>
                  {formatStatus(order.status)}
                </div>
              </div>
              
              <div className="order-summary">
                <p className="order-items-count">
                  Items: {order.items ? order.items.length : 0}
                </p>
                <p className="order-total">
                  Total: ${parseFloat(order.totalAmount).toFixed(2)}
                </p>
              </div>
              
              <div className="order-actions">
                <Link to={`/order-confirmation/${order.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
