import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Components
import OrderConfirmation from './components/OrderConfirmation';
import ProtectedRoute from './routes/ProtectedRoute';

// Context
import { CartProvider } from './context/CartContext';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <CartProvider>
        <div className="app">
          <header className="app-header">
            <div className="logo">
              <h1><Link to="/">Eatoes</Link></h1>
            </div>
            <nav className="navigation">
              <ul>
                <li><Link to="/">Menu</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {userInfo ? (
                  <>
                    <li><Link to="/order-history">My Orders</Link></li>
                    <li>
                      <button onClick={handleLogout} className="logout-btn">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
              </ul>
            </nav>
          </header>
          
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/order-history" element={
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation/:orderId" element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Eatoes. All rights reserved.</p>
          </footer>
        </div>
        
        <ToastContainer position="bottom-right" />
      </CartProvider>
    </Router>
  );
}

export default App;
