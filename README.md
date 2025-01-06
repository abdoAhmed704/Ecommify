
# Ecommify API Documentation

Welcome to the **Ecommify API** documentation! This guide provides an overview of the API endpoints and their usage. For a detailed reference, visit the [Postman Documentation](https://documenter.getpostman.com/view/36376131/2sAYJ6BzG7#dc91cee2-91a8-4930-8741-e187e6dda37c).

---

## Table of Contents

1. [Authentication](#authentication)  
2. [Endpoints Overview](#endpoints-overview)  
   - [Authentication](#authentication)  
   - [Categories](#categories)  
   - [Brands](#brands)  
   - [Products](#products)  
   - [Users](#users)  
   - [Feedback](#feedback)  
   - [Orders](#orders)  
   - [Coupons](#coupons)  
3. [Example Requests](#example-requests)

---

## Authentication

All endpoints require authentication using a Bearer Token. Include the token in the `Authorization` header of your HTTP requests:

```http
Authorization: Bearer <token>
```

---

## Endpoints Overview

### Authentication 
- **POST** `/auth/signup/`: Sign Up 
- **POST** `/auth/login`: Login
- **POST** `/auth/fpw`: Forget the password
- **POST** `/auth/vrc`: Verfiy the code
- **POST** `/auth/rpw`: Reset the password
### Categories
- **POST** `/categories/` - Create a category  
- **PUT** `/categories/:id` - Update a category  
- **GET** `/categories/` - Retrieve all categories  
- **DELETE** `/categories/:id` - Delete a category  

### Brands
- **POST** `/brands/` - Create a brand  
- **PUT** `/brands/:id` - Update a brand  
- **GET** `/brands/` - Retrieve all brands  
- **DELETE** `/brands/:id` - Delete a brand  

### Products
- **POST** `/products/` - Create a product  
- **PUT** `/products/:id` - Update a product  
- **GET** `/products/` - Retrieve all products  
- **DELETE** `/products/:id` - Delete a product  

### Users
- **POST** `/users/` - Create a user  
- **PUT** `/users/:id` - Update a user  
- **GET** `/users/` - Retrieve all users  
- **DELETE** `/users/:id` - Delete a user  

### Feedback
- **POST** `/feedBacks/` - Add feedback  
- **GET** `/feedBacks/` - Retrieve feedback  
- **DELETE** `/feedBacks/:id` - Delete feedback  

### Orders
- **POST** `/orders/` - Create an order  
- **PUT** `/orders/:id` - Update an order  
- **GET** `/orders/` - Retrieve all orders  
- **DELETE** `/orders/:id` - Delete an order  

### Coupons
- **POST** `/coupons/` - Create a coupon  
- **GET** `/coupons/` - Retrieve all coupons  
- **PUT** `/coupons/:id` - Update a coupon  
- **DELETE** `/coupons/:id` - Delete a coupon  

---

## Example Requests

### Get All Products
```bash
curl -X GET "http://localhost:7500/api/v1/products/" \
-H "Authorization: Bearer <token>"
```
