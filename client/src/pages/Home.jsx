import React from 'react';
import Menu from '../components/Menu';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Delicious Food Delivered To Your Door</h1>
          <p>Order your favorite meals from our diverse menu and enjoy a hassle-free dining experience.</p>
        </div>
      </div>
      
      <Menu />
    </div>
  );
};

export default Home;
