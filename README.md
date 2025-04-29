# Eatoes Food Ordering Application

A full-stack food ordering application with MongoDB and PostgreSQL databases.

## Deployed Application

- Frontend: [https://eatoes-food-ordering.netlify.app](https://eatoes-food-ordering.netlify.app)
- Backend API: [https://eatoes-the-digital-diner.onrender.com](https://eatoes-the-digital-diner.onrender.com)

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
1. **Install Dependencies**
```
npm install
```
2. **Start Development Serve**
```
npm run dev
```
The application will be available at `http://localhost:5173`
3. **For Production Build**
```
npm run build
```
## Project Structure
Based on the technologies used, here's the typical structure of the project:
```
project-root/
├── src/                    # Source code directory
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── redux/            # Redux store, slices, and actions
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── assets/          # Static assets (images, fonts)
│   ├── styles/          # CSS styles
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── public/               # Public assets
├── dist/                # Production build output
├── .env                 # Environment variables
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```
