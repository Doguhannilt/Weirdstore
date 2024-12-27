# Microservices Architecture

This project consists of several independent microservices that are designed to work together as part of a distributed system. Each service is responsible for a specific domain of the application and communicates through APIs. The services use MongoDB for data storage and are designed to scale and operate independently.

## Services Overview

### 1. **Category Service**

- **Purpose:** Handles all operations related to categories.
- **Functionality:**
  - Manage category data (create, read, update, delete).
  - Provides endpoints for retrieving and managing categories.
- **Database:** MongoDB
- **Endpoints:**
  - `POST /` - Create Category
  - `GET /` - Get All Categories
  - `GET /categories` - List Categories
  - `GET /:id` - Get Category By Id
  - `PUT /:categoryId` - Update Category
  - `DELETE /:categoryId` - Delete Category By ID

### 2. **Order Service**

- **Purpose:** Manages customer orders and order processing.
- **Functionality:**
  - Handles order creation, retrieval, and updates.
  - Calculates total prices, tracks order status, and generates invoices.
  - Manages the relationship between products and orders.
- **Database:** MongoDB
- **Endpoints:**
  - `POST /` - Create An Order
  - `GET /` - Get All Orders
  - `GET /mine` - Get User Orders (Authenticated User)
  - `GET /total-orders` - Count Total Orders
  - `GET /total-sales` - Calculate Total Sales
  - `GET /total-sales-by-date` - Calculate Total Sales By Date
  - `GET /:id` - Find Order By Id
  - `PUT /:id/pay` - Mark Order As Paid
  - `PUT /:id/deliver` - Mark Order As Delivered

### 3. **Product Service**

- **Purpose:** Manages product data, including adding, updating, and fetching products.
- **Functionality:**
  - Add new products with details such as name, price, description, and image.
  - Retrieve, update, and delete product data.
  - Manages stock and inventory.
- **Database:** MongoDB
- **Endpoints:**
  - `POST /` - Add Product
  - `GET /` - Fetch Products
  - `GET /allproduct` - Fetch All Products
  - `GET /:id` - Fetch Product By Id
  - `PUT /:id` - Update Product Details
  - `DELETE /:id` - Remove Product
  - `GET /top` - Fetch Top Products
  - `POST /:id/reviews` - Add Product Review
  - `GET /new` - Fetch New Products
  - `POST /filtered-products` - Filter Products

### 4. **Upload Service**

- **Purpose:** Handles file uploads, such as product images and other media files.
- **Functionality:**
  - Provides endpoints for uploading files to the server.
  - Supports storing images and other files for use across the other services (e.g., product images in the product service).
- **Database:** MongoDB
- **Endpoints:**
  - `POST /` - Upload An Image

### 5. **User Service**

- **Purpose:** Manages user authentication and user data.
- **Functionality:**
  - Handles user registration, login, and profile management.
  - Provides JWT-based authentication for secure access to other services.
  - Manages user roles and permissions.
- **Database:** MongoDB
- **Endpoints:**
  - `POST /` - Create User
  - `GET /` - Get All Users
  - `POST /auth` - Login 
  - `POST /logout` - Logout
  - `GET /profile` - Get Specific Profile
  - `PUT /profile` - Update Current User Profile
  - `DELETE /:id` - Delete User By Id
  - `GET /:id` - Get User By Id
  - `PUT /:id` - Update User By Id

## Architecture

- **Microservices:** All services are developed and deployed independently, ensuring scalability and flexibility.
- **Database:** MongoDB is used as the database for all services, ensuring data consistency and scalability.
- **Communication:** Services communicate with each other using RESTful APIs. Each service is independent and can operate on its own, but they can integrate with one another as needed.
- **Authentication:** JWT is used for secure communication between services, ensuring that only authorized users can access protected endpoints.
- **Logging:** Each service includes logging functionality to track requests and errors. This helps with debugging and monitoring.

## ENV

For each service, create a .env file in the root of the service directory with the following contents:

```
MONGO_URI=
JWT_SECRET=
LOGGER_PATH=
PORT=
```

## Setup Instructions

1. **Install dependencies for each service:**
   Navigate to each service directory and run:
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env` files for each service with the necessary configurations (e.g., MongoDB connection, JWT secret, etc.).

3. **Run the services:**
   Each service can be run independently. Use `npm run dev` to launch each service:
   ```bash
   npm start
   ```

4. **Test the services:**
   You can use tools like Postman to interact with the APIs of each service.

## Conclusion

This system represents a modular, scalable microservices architecture. Each service is self-contained, making it easy to maintain and deploy independently. The use of MongoDB as the database for all services ensures consistent and scalable data storage.

