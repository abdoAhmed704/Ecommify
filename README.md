# Ecommify API Documentation

Welcome to the Ecommify API documentation. For the full reference, please visit the [Postman Documentation](https://documenter.getpostman.com/view/36376131/2sAYJ6BzG7#dc91cee2-91a8-4930-8741-e187e6dda37c).

## Authentication

All endpoints require a Bearer Token:
- Header: `Authorization: Bearer <token>`

## Endpoints Overview

### Categories
- **POST** `/categories/`: Create a category
- **PUT** `/categories/:id`: Update a category
- **GET** `/categories/`: Retrieve all categories
- **DELETE** `/categories/:id`: Delete a category

### Brands
- **POST** `/brands/`: Create a brand
- **PUT** `/brands/:id`: Update a brand
- **GET** `/brands/`: Retrieve all brands
- **DELETE** `/brands/:id`: Delete a brand

### Products
- **POST** `/products/`: Create a product
- **PUT** `/products/:id`: Update a product
- **GET** `/products/`: Retrieve all products
- **DELETE** `/products/:id`: Delete a product

### Users
- **POST** `/users/`: Create a user
- **PUT** `/users/:id`: Update a user
- **GET** `/users/`: Retrieve all users
- **DELETE** `/users/:id`: Delete a user

### Feedback
- **POST** `/feedBacks/`: Add feedback
- **GET** `/feedBacks/`: Retrieve feedback
- **DELETE** `/feedBacks/:id`: Delete feedback

### Orders
- **POST** `/orders/`: Create an order
- **PUT** `/orders/:id`: Update an order
- **GET** `/orders/`: Retrieve all orders
- **DELETE** `/orders/:id`: Delete an order

### Coupons
- **POST** `/coupons/`: Create a coupon
- **GET** `/coupons/`: Retrieve all coupons
- **PUT** `/coupons/:id`: Update a coupon
- **DELETE** `/coupons/:id`: Delete a coupon

## Example Requests

### Retrieve All Products
```bash
curl -X GET "http://localhost:7500/api/v1/products/" \
-H "Authorization: Bearer <token>"

