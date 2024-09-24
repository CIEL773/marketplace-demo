# Product Management System

## Techniologies: MERN stack

- Frontend(Express-based RESTful API server)

- React, Bootstrap (for UI styling), Redux (for state management)

- Backend(React-based client interface)

- Node.js (Express)

- Database: MongoDB (NoSQL database)

- Others:
  - Axios (for HTTP requests)
  - JWT (for user authentication) (todo)
  - Mongoose (for MongoDB ORM)
  - dotenv (for environment variable management)

- [UI Figma link](https://www.figma.com/design/brgvADTppPXJdYkaOR5AmW/Management-Chuwa?node-id=819-521&node-type=frame)

The system allows managing products with features such as listing products, viewing product details, and user authentication (sign-in, sign-up). It includes both backend and frontend implementations with API routes for handling data operations.

## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or remote instance)

### Clone the repository

```bash
git clone https://github.com/CIEL773/marketplace-demo.git
cd marketplace-demo
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables:
   ```env
   MONGODB_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

4. Start the backend server:
   - For production mode:
     ```bash
     npm start
     ```
   - For development mode with automatic restarts (using nodemon):
     ```bash
     npm run dev
     ```

5. Visit the following URLs to verify the server is running:
   - **Home**: [http://localhost:4000](http://localhost:4000) - should display product lists
   - **API Status**: [http://localhost:4000/api/status](http://localhost:4000/api/status) - should return `{ "message": "API is working!" }`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory (if needed for API URL configuration):
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the frontend server:
   ```bash
   npm start
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

- **Backend Environment Variables** (in `backend/.env`):
  - `MONGODB_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for signing JWT tokens (todo)
  - `PORT`: Backend server port (optional, default is `4000`)

- **Frontend Environment Variables** (in `frontend/.env`):
  - `REACT_APP_API_URL`: The base URL for API requests (default: `http://localhost:3000`)

## API Endpoints

### Users

- `POST /api/users/signup` - Create a new user
- `POST /api/users/signin` - Sign in an existing user
- `PATCH /api/users/updatePassword/:id` - Update user password
- `GET /api/users/getUser/:id` - Get user by ID
- `PATCH /api/users/updateCart/:id` - Add or update items in the cart
- `GET /api/users/getCart/:id` - Get user's cart

### Products

- `GET /api/products` - Get all products
- `POST /api/products/createProduct` - Create a new product
- `GET /api/products/getProduct/:id` - Get product by product ID
- `PUT /api/products/updateProduct/:userId` - Update a product and pass userId(for checking)
- `GET /api/products/getProductByUserId/:userId` - Get products by userId

---