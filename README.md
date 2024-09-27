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

## Database Models

This project uses MongoDB as the database, with Mongoose to define and manipulate the data models. Below are the two main models in the project: User and Product.

1. User Model:

- name (String, required): The user's full name.
- email (String, required, unique): The user's email address, which must be unique.
- role (String, enum: ["user", "vendor"], default: "user"): The role of the user, which can either be user (regular user) or vendor (seller).
- password (String, required): The user's password, which should be stored in hashed form.
- address (String, optional): The user's address.
- cart (Array of Objects, default: []): The user's shopping cart. Each item in the cart contains a product ID and quantity.
- productId (ObjectId, required): A reference to the Product model, representing the product in the cart.
  quantity (Number, min: 1): The quantity of the product, with a minimum value of 1.
- productList (Array of ObjectId, default: []): A list of products created by the user (only applicable if the user is a vendor), referencing the Product model.

Example of a User document:

```json
{
  "name": "testuser",
  "email": "user@example.com",
  "role": "vendor",
  "password": "password123",
  "address": "123 Main St, Anytown, USA",
  "cart": [
    {
      "productId": "60f8f0d5b9d1b34a5d8b9d84",
      "quantity": 2
    }
  ],
  "productList": ["60f8f0d5b9d1b34a5d8b9d85"]
}
```

2. Product Model

- name (String, required): The name of the product.
- description (String, optional): A description of the product.
- category (String, optional): The category the product belongs to.
- price (Number, required): The price of the product.
- stock (Number, required, min: 0, default: 0): The stock quantity of the product, with a minimum value of 0.
- imageUrl (String, required): The URL of the product's image.
- vendor (ObjectId, ref: "user", required): A reference to the User model, representing the seller of the product.

Example of a Product document:

```json
{
  "name": "Smartphone",
  "description": "A high-end smartphone with 128GB storage",
  "category": "Electronics",
  "price": 699,
  "stock": 50,
  "imageUrl": "https://example.com/images/smartphone.jpg",
  "vendor": "60f8f0d5b9d1b34a5d8b9d84"
}
```

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

## ToDo List

1. **Frontend**

   - Media queries (responsive design)
   - Error handling
   - Image preview/upload
   - Pagination

2. **Authentication**

   - Sign-up page (auto-check)
   - Change password page
   - JWT (authentication)
   - SendGrid API (email verification)

3. **Product Management**

   - Add product button

4. **Shopping Features**

   - Search
   - Cart

5. **Payment Integration**

   - Stripe API (payment)

6. **Libraries/Tools**
   - React Moment (date formatting)
   - Formik (form handling)
