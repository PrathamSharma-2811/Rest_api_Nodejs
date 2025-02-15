### GitHub README.md

```markdown
# E-commerce Backend API

This is a backend API for an e-commerce platform that handles user authentication, product management, and order processing. Built with Node.js, Express, MongoDB, and JWT for secure authentication.

## Features

- User registration and login
- User details retrieval and update
- Admin-only product creation, update, and deletion
- Public product listing and detail retrieval
- Secure JWT-based authentication

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ecommerce-backend-api.git
   ```
2. Navigate to the project directory
   ```bash
   cd ecommerce-backend-api
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables
   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

## Usage

1. Start the server
   ```bash
   npm start
   ```
2. The API will be available at `http://localhost:3000`

## API Endpoints

### User Routes

- `POST /signup` - Register a new user
- `POST /login` - Login a user
- `GET /details` - Get user details (authenticated)
- `PUT /updates` - Update user details (authenticated)
- `DELETE /delete/:id` - Delete a user (admin only)

### Product Routes

- `POST /addProduct` - Create a new product (admin only)
- `GET /getAllProducts` - Get all products
- `GET /getProductById/:id` - Get a specific product by ID
- `PUT /updateProduct/:id` - Update a product by ID (admin only)
- `DELETE /deleteProduct/:id` - Delete a product by ID (admin only)


