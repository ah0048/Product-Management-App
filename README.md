# Product Management App

The Product Management App is a full-stack application that allows users to manage products. Users can add, edit, delete, and view products. The app includes user authentication and authorization, ensuring secure access to product management features.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)

---

## Features

### Backend
- User authentication using JWT.
- Product CRUD operations (Create, Read, Update, Delete).
- Secure file uploads for product images.
- Validation for all input fields.
- MVC architecture for clean and maintainable code.

### Frontend
- Angular standalone components.
- Horizontal navigation bar with dynamic links based on authentication status.
- Product list with edit and delete functionality.
- Add product form with image upload.
- JWT-based authentication for API requests.
- User-friendly interface with responsive design.

---

## Technologies Used

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **Multer** for file uploads

### Frontend
- **Angular** (v19.1.2)
- **TypeScript**
- **Angular CLI**
- **Reactive Forms**

---

## Backend Setup

### Prerequisites
- Node.js installed (v18.20.4 or higher)
- MongoDB installed and running

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ah0048/Product-Management-App
   cd Product-Management-App/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

---

## Frontend Setup

### Prerequisites
- Angular CLI installed

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd Product-Management-App/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
   The frontend will run on `http://localhost:4200`.

---

## Project Structure

### Backend
```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── validations/
├── uploads/
├── .env
├── server.js
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── guards/
│   │   ├── pipes/
│   │   ├── services/
│   │   ├── app.component.ts
│   └── environments/
├── angular.json
├── package.json
```

---

## How to Run
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend server:
   ```bash
   cd frontend
   ng serve
   ```
3. Open your browser and navigate to `http://localhost:4200`.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and receive a JWT

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get a specific product
- **POST** `/api/products` - Add a new product (requires authentication)
- **PUT** `/api/products/:id` - Update a product (requires authentication)
- **DELETE** `/api/products/:id` - Delete a product (requires authentication)

---

## Frontend Features

### Navigation Bar
- Links to `Products`, `Login`, and `Register` pages.
- Displays a `Sign Out` button when a user is logged in.

### Products Page
- Lists all products fetched from the backend.
- Each product has `Edit` and `Delete` buttons.
- Includes an `Add Product` button at the top.

### Add/Edit Product Form
- Validates fields such as name, description, price, and image.
- Allows uploading product images.

### Authentication
- Users must log in to add, edit, or delete products.
- JWT tokens are stored in local storage for authenticated requests.

---

## License
This project is licensed under the MIT License.

