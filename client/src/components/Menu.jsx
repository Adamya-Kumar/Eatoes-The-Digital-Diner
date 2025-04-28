import React, { useState, useEffect } from 'react';
import { menuApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const { addToCart } = useCart();

  const categories = ['appetizer', 'main', 'dessert', 'beverage'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await menuApi.getMenuItems(activeCategory);
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu items');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMenuItems();
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="menu-container">
      <h2>Our Menu</h2>
      
      <div className="category-filter">
        <button 
          className={activeCategory === '' ? 'active' : ''} 
          onClick={() => handleCategoryChange('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="menu-items-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item-card">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <div className="menu-item-footer">
                <span className="menu-item-price">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.isAvailable}
                  className="add-to-cart-btn"
                >
                  {item.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
