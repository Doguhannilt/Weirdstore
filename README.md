### Weirdstore

Welcome to **weirdstore**, your one-stop solution for managing your store with a touch of uniqueness!

## Table of Contents

- [Introduction](#introduction)
- [Microservice - Backend](#backend)
- [Features](#features)
- [Images and Video](#images-and-video)
- [Technologies Used](#technologies-used)
- [Why Redux RTK](#why-redux-rtk)
- [Installation](#installation)
- [Dockerization](#dockerization)
- [Usage](#usage)
- [Contributing](#contributing)
- [Postman Collection](#postman-collection)
- [License](#license)
  


## Introduction

**Weirdstore** is a comprehensive and innovative store management system designed to simplify and enhance the way you run your store. Whether you are managing a small boutique or a large retail chain, weirdstore provides the tools you need to succeed.


## Backend

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

## Conclusion

This system represents a modular, scalable microservices architecture. Each service is self-contained, making it easy to maintain and deploy independently. The use of MongoDB as the database for all services ensures consistent and scalable data storage.

## IMAGES AND VIDEO
[shop.webm](https://github.com/user-attachments/assets/ab98d490-2ed2-47c0-9f6b-d9fa3467c296)

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0c31a860-5c51-4131-8a19-03c5045fd89f" alt="BG" width="300"></td>
    <td><img src="https://github.com/user-attachments/assets/da299e20-4112-4797-b569-dd76b47f7a57" alt="BG" width="300"></td>
    <td><img src="https://github.com/user-attachments/assets/9cbbbf60-02c2-439f-9dee-cc9f95a1db50" alt="BG" width="300"></td>
    <td><img src="https://github.com/user-attachments/assets/ef99a5be-40db-443f-968a-557966803ff9" alt="BG" width="300"></td>
  </tr>
</table>






## Features

- **User-friendly Interface**: An intuitive and easy-to-navigate interface.
- **Inventory Management**: Keep track of your stock with ease.
- **Sales Tracking**: Monitor your sales and performance.
- **Customer Management**: Manage customer information and interactions.
- **Customizable Settings**: Tailor the system to meet your specific needs.
- **Security**: Robust security measures to protect your data.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **Redux Toolkit (RTK)**: For state management.
- **Node.js**: For the backend server.
- **Express.js**: For handling backend routes.
- **MongoDB**: For the database.

## Why Redux RTK

Redux Toolkit (RTK) is used in **weirdstore** for the following reasons:

- **Simplified Configuration**: RTK simplifies the setup process and reduces boilerplate code.
- **Improved Performance**: RTK provides performance optimizations out of the box.
- **Enhanced Readability**: RTK improves code readability and maintainability.
- **Integrated Best Practices**: RTK includes best practices for using Redux, making it easier to write robust and scalable code.

## Postman Collection

Easily test and interact with the weirdstore API using Postman. Click the button below to fork the collection and get started:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/32076392-c2bb60b5-db1f-464b-9ee0-e386164df1e6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D32076392-c2bb60b5-db1f-464b-9ee0-e386164df1e6%26entityType%3Dcollection%26workspaceId%3D128c2550-0e68-4bdd-81e6-035db378af3f)


## Installation

Follow these steps to install **weirdstore** on your local machine:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/doguhannilt/weirdstore.git
   cd weirdstore
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the application**:
   ```sh
   npm start
   ```

## Usage

Once the application is up and running, you can access the following features:

- **Dashboard**: Get an overview of your store's performance.
- **Inventory**: Add, edit, or remove products from your inventory.
- **Sales**: Record and track sales transactions.
- **Customers**: Manage customer profiles and order history.
- **Reports**: Generate reports to analyze your business metrics.

## Contributing

We welcome contributions from the community! If you would like to contribute to **weirdstore**, please follow these steps:

1. **Fork the repository**:
   ```sh
   git fork https://github.com/doguhannilt/weirdstore.git
   ```

2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit them:
   ```sh
   git commit -m "Add new feature"
   ```

4. **Push to the branch**:
   ```sh
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**: Submit your changes for review.

# Dockerization

## Weirdstore Backend Setup

This document describes how to set up and run the <a href='https://hub.docker.com/repository/docker/doguhannilt/weirdstore-backend'>`doguhannilt/weirdstore-backend`</a> Docker container, including how to connect it to a MongoDB instance.

## Prerequisites

- Docker installed on your system.
- Docker Compose (if using Docker Compose for multi-container setups).

## Steps to Set Up and Run

1. **Clone the Repository**

   First, clone the repository containing the Docker setup:

   ```bash
   git clone https://github.com/weirdstore.git
   cd your-repository
   ```

2. **Create a Docker Network**

   Create a Docker network if it does not already exist. This network will allow your containers to communicate with each other:

   ```bash
   docker network create weirdstore
   ```

3. **Run MongoDB Container**

   Start a MongoDB container on the `weirdstore` network. This example uses the official MongoDB Docker image:

   ```bash
   docker run -d --network weirdstore --name mongo mongo:latest
   ```

4. **Run the Backend Container**

   Start the `doguhannilt/weirdstore-backend` container on the same network:

   ```bash
   docker run -d --network weirdstore --name backend -e MONGO_URI=mongodb://mongo:27017/ doguhannilt/weirdstore-backend
   ```

   Here, the `MONGO_URI` environment variable is set to point to the MongoDB container (`mongo`) on the `weirdstore` network.

5. **Verify Container Status**

   Check if both containers are running:

   ```bash
   docker ps
   ```

   You should see both `mongo` and `backend` containers listed.

6. **Access Logs**

   To view the logs of the backend container:

   ```bash
   docker logs backend
   ```

   To view the logs of the MongoDB container:

   ```bash
   docker logs mongo
   ```

## Troubleshooting

- **Cannot connect to MongoDB:** Ensure that the MongoDB container is running and accessible. Verify the `MONGO_URI` is correctly set in the backend container.
- **MongoDB container not found:** Double-check that the MongoDB container is running on the `weirdstore` network and that you used the correct container name in the `MONGO_URI`.

## Cleaning Up

To stop and remove the containers and network when you are done:

```bash
docker stop backend mongo
docker rm backend mongo
docker network rm weirdstore
```


## Acknowledgements

We would like to extend our heartfelt thanks to the following individuals for their invaluable tutorial videos that helped in the development of **weirdstore**:

- **HuXn WebDev**: For their comprehensive tutorials on modern web development.
- **Dave Gray**: For his insightful videos on JavaScript and React.
- **Lama Dev**: For providing detailed guides on frontend development and best practices.


## Admin Control

| Admin Capabilities | Description |
|--------------------|-------------|
| Create User        | Admins can create new user accounts through the navigation bar. |
| Create Product     | Admins can add new products to the inventory via the navigation bar. |
| Update Product     | Admins can update existing product details using the navigation bar. |
| Delete Product     | Admins can remove products from the inventory through the navigation bar. |

## Video

- Note: Some of features are still buggy, feel free to fix them.

[Weirdstore-1.webm](https://github.com/user-attachments/assets/8ad3937e-8005-4488-8630-568d4cb71f8c)

[Weirdstore-2.webm](https://github.com/user-attachments/assets/4d20832a-e6d2-4fdb-83eb-913b6c92c7ea)

## License

This project is licensed under the MIT License. See the [LICENSE](link-to-license-file) file for details.

Feel free to replace the placeholder links with actual URLs and customize the content further to fit your project's specifics.

### Weirdstore Project Dependencies

<details>
 <summary><strong>Backend Package Dependencies</strong></summary>

### Dependencies
- **bcryptjs**: ^2.4.3
- **concurrently**: ^8.2.2
- **cookie-parser**: ^1.4.6
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **express-async-handler**: ^1.2.0
- **express-formidable**: ^1.2.0
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.4.1
- **multer**: ^1.4.5-lts.1
- **nodemon**: ^3.1.3
</details>

<details>
  <summary><strong>Frontend Package Dependencies</strong></summary>

### Dependencies
- **@paypal/react-paypal-js**: ^8.4.0
- **@reduxjs/toolkit**: ^2.2.5
- **apexcharts**: ^3.49.1
- **axios**: ^1.7.2
- **flowbite**: ^2.3.0
- **moment**: ^2.30.1
- **react**: ^18.2.0
- **react-apexcharts**: ^1.4.1
- **react-dom**: ^18.2.0
- **react-icons**: ^5.2.1
- **react-redux**: ^9.1.2
- **react-router**: ^6.23.1
- **react-router-dom**: ^6.23.1
- **react-slick**: ^0.30.2
- **react-toastify**: ^10.0.5
- **slick-carousel**: ^1.8.1

### Dev Dependencies
- **@types/react**: ^18.2.66
- **@types/react-dom**: ^18.2.22
- **@vitejs/plugin-react**: ^4.2.1
- **autoprefixer**: ^10.4.19
- **eslint**: ^8.57.0
- **eslint-plugin-react**: ^7.34.1
- **eslint-plugin-react-hooks**: ^4.6.0
- **eslint-plugin-react-refresh**: ^0.4.6
- **postcss**: ^8.4.38
- **tailwindcss**: ^3.4.4
- **vite**: ^5.2.0
</details>

## Docker

**Note: 19 June 2024 Docker Added**

| Service  | Docker Hub Link |
|----------|-----------------|
| Frontend | [Frontend Docker](https://hub.docker.com/r/doguhannilt/weirdstore-frontend) |
| Backend  | [Backend Docker](https://hub.docker.com/r/doguhannilt/weirdstore-backend) |


