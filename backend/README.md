# Movie API 🎬

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

A RESTful API for movie management with JWT authentication and admin controls. This API provides endpoints for user authentication, movie catalog management, actor/director associations, and a favorites system.

## 📚 API Documentation

Interactive documentation is available via Swagger UI:  
[http://localhost:3000/v1/docs](http://localhost:3000/v1/docs)

## ✨ Features

### Authentication

- **JWT Authentication**: Protects endpoints with access tokens.
- **Login**: User authentication with email and password.

### User Management

- **User Creation**: Admins can create new users.
- **Role-Based Access Control**: Different permissions for admins and regular users.
- **Profile Updates**: Users can update their information.

### Movie Catalog

- **Full CRUD Operations**: Create, read, update, and delete movies.
- **Associations**: Relationships between movies, actors, and directors.
- **Paginated Search**: Search movies with title filtering.
- **Rating System**: Rate movies from 0 to 5 stars.

### Favorites System

- **Add/Remove Favorites**: Users can manage their favorite movies.
- **List Favorites**: Displays a user's favorite movies.

### Professionals Management

- **Full CRUD Operations**: Manage actors and directors.
- **Association History**: Track relationships between movies and professionals.

## 🛠 Built With

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Typed JavaScript
- **MySQL** - Relational database
- **Sequelize** - ORM for database management
- **JWT** - Authentication
- **Swagger** - API documentation
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **express-async-errors** - Error handling for async routes
- **jsonwebtoken** - Token generation and verification
- **uuid** - Unique identifier generation
- **cpf-cnpj-validator** - CPF/CNPJ validation

### Development Tools

- **Jest** - Testing framework
- **ts-jest** - TypeScript support for Jest
- **ts-node** - TypeScript execution environment
- **sequelize-cli** - CLI for Sequelize
- **swagger-jsdoc** - Swagger documentation generator
- **swagger-ui-express** - Swagger UI integration
- **@types** - TypeScript type definitions for various libraries
- **typescript** - TypeScript compiler

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-api.git
   cd movie-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=application_run_port
   DB_NAME=database_name
   DB_USER=database_user
   DB_PASSWORD=database_password
   DB_HOST=database_host
   DB_PORT=database_port
   SECRET_KEY=jwt_secret_key
   EXPIRES_IN=jwt_expires_in
   ```

4. Build:

   ```bash
   npm run build
   ```

5. Run migrations:

   ```bash
   npm run migrate
   ```

6. Populate database:

   ```bash
   npm run seed
   ```

7. Run the application:

   ```bash
   npm run dev
   ```

8. Clean and reset the database:

   ```bash
   npm run resetdb
   ```

The API will be available at [http://localhost:3000]v1/(http://localhost:3000)v1/ and the documentation at [http://localhost:3000/v1/docs](http://localhost:3000/v1/docs).

### Running with Docker

1. Build and start the containers:

   ```bash
   docker-compose up
   ```

2. Check the logs:

   ```bash
   docker logs mod-05-backend
   ```

3. Stop the containers:

   ```bash
   docker-compose down
   ```

The database is recreated each time the Docker container is started, ensuring a fresh instance for every session. This allows for consistent testing and development environments by resetting to a predefined state.

The API will be available at [http://localhost:3000]v1/(http://localhost:3000)v1/ and the documentation at [http://localhost:3000/v1/docs](http://localhost:3000/v1/docs).

## 📋 Endpoints Overview

### Authentication

- **POST** `/login` - User authentication

### Users

- **POST** `/users` - Create new user (Admin only)
- **GET** `/users` - List all users (Admin only)
- **GET** `/users/{userId}` - Get user details
- **PATCH** `/users/{userId}` - Update user
- **DELETE** `/users/{userId}` - Delete user

### Movies

- **GET** `/movies` - List movies (paginated)
- **POST** `/movies` - Create movie (Admin only)
- **GET** `/movies/{movieId}` - Get movie details
- **PATCH** `/movies/{movieId}` - Update movie (Admin only)
- **DELETE** `/movies/{movieId}` - Delete movie (Admin only)

### Favorites

- **POST** `/favorites/{userId}` - Add to favorites
- **GET** `/favorites/all/{userId}` - List user favorites
- **DELETE** `/favorites/{favoriteMovieId}` - Remove from favorites

### Actors/Directors

- Full CRUD operations for managing professionals

## 🔒 Authentication

The API uses JWT for authentication. To access protected endpoints:

1. Obtain a token from **POST** `/login`.
2. Include the token in request headers:

   ```bash
   Authorization: Bearer <your_token>
   ```

## 💡 Example Requests

### Login

```bash
curl -X POST http://localhost:3000/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your_password"}'
```

### Get Movies

```bash
curl -X GET http://localhost:3000/v1/movies \
  -H "Authorization: Bearer <your_token>"
```

### Add Favorite

```bash
curl -X POST http://localhost:3000/v1/favorites/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"movieId": "054e014f-6549-4284-9325-e0a8ba35c0d2"}'
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Amanda Dolci Figueiredo and Vinicius Garcia
