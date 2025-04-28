# 🍽️ Eatoes | Modern Food Ordering Platform

> Transform your dining experience with Eatoes - A lightning-fast, secure, and intuitive food ordering platform that brings your favorite meals to your doorstep.

## 🚀 Overview

Eatoes is a full-stack food ordering platform that combines the power of modern web technologies with a seamless user experience. Built with a robust dual-database architecture, it offers real-time menu updates, secure ordering, and reliable delivery tracking all in one elegant solution.

### ✨ Key Features
- 🔍 Smart menu search and filtering
- 💳 Secure payment processing
- 🚚 Real-time order tracking
- 👤 Personalized user profiles
- 📱 Responsive design for all devices
- 🔐 Enterprise-grade security

Built with MongoDB and PostgreSQL for optimal performance and data integrity, Eatoes sets a new standard for modern food ordering applications.

## Preview

add video link here

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (for menu items)
- PostgreSQL (for users and orders)
- Mongoose
- Sequelize

### Frontend
- React
- React Router
- Context API for state management
- Axios for API requests

## Local Setup Instructions

### Backend Setup

1. Clone the repository
   bash git clone [repository-url] cd [repository-name]

2. Install dependencies
   bash npm install

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   POSTGRES_URL=your_postgres_connection_string 
   JWT_SECRET=your_jwt_secret

4. Database Setup
- MongoDB: Make sure MongoDB is installed and running locally
- PostgreSQL:
    - Install PostgreSQL
    - Create a new database
    - Run the migrations: `npx sequelize-cli db:migrate`

5. Start the server
   bash npm run dev

## Database Design Choices

### MongoDB (Menu Items)
- Chosen for menu items due to its flexible schema that can accommodate varying food item attributes
- Better for handling unstructured data like food descriptions, images, and customizable options
- Excellent for read-heavy operations which is ideal for menu browsing

### PostgreSQL (Users & Orders)
- Selected for user data and orders due to its ACID compliance
- Better for handling relations between users, orders, and transactions
- Provides robust data integrity which is crucial for payment and order processing
- Supports complex queries needed for order history and analytics

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Menu Items (MongoDB)
- GET `/api/menu` - Get all menu items
- GET `/api/menu/:id` - Get specific menu item
- POST `/api/menu` - Add new menu item (Admin)
- PUT `/api/menu/:id` - Update menu item (Admin)
- DELETE `/api/menu/:id` - Delete menu item (Admin)

### Orders (PostgreSQL)
- GET `/api/orders` - Get user's orders
- POST `/api/orders` - Create new order
- GET `/api/orders/:id` - Get specific order details
- PUT `/api/orders/:id` - Update order status (Admin)

### Users (PostgreSQL)
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

## Live Demo

Frontend Application: [Netlify Link](your-netlify-link)

## Assumptions and Challenges

### Assumptions
1. Users need to be authenticated to place orders
2. Admin users have additional privileges for menu management
3. Each order can contain multiple menu items
4. Prices are stored in cents/smallest currency unit

### Challenges Faced
1. **Dual Database Integration**: Implementing and maintaining consistency across MongoDB and PostgreSQL
2. **Order Processing**: Ensuring atomic transactions when updating order status
3. **Authentication**: Implementing secure JWT-based authentication system
4. **Database Relations**: Managing relationships between users and orders in PostgreSQL while fetching menu items from MongoDB

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request