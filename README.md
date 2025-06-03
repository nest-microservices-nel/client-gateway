# 🚪 Client Gateway - NestJS Microservices

This is the **Client Gateway** built with [NestJS](https://nestjs.com/).  
It serves as the main entry point and API gateway for the entire microservices architecture, handling HTTP requests and routing them to appropriate microservices via NATS messaging.

---

> ⚠️ **Important Notes:**  
> - This gateway exposes **HTTP/HTTPS endpoints** and communicates with microservices using **NATS**.
> - All business logic is handled by individual microservices; this gateway only routes requests.
> - Includes authentication and authorization middleware for protected routes.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running with Docker](#-running-with-docker)
- [API Endpoints](#-api-endpoints)
- [Microservices Communication](#-microservices-communication)
- [Authentication](#-authentication)
- [Additional Notes](#-additional-notes)
- [License](#-license)

---

## 🚀 Features

- **API Gateway** for microservices architecture
- **Products Management** - CRUD operations for products
- **Orders Management** - Complete order lifecycle management
- **User Authentication** - Registration, login, and JWT verification
- **Health Check** endpoint for monitoring
- **NATS-based** communication with microservices
- **Global Exception Handling** for microservice errors
- **Input Validation** with DTOs and class-validator
- **JWT Authentication Guard** for protected routes

---

## 🛠️ Tech Stack

| Technology | Description                                |
|------------|--------------------------------------------|
| NestJS     | Backend framework for Node.js              |
| TypeScript | Main language of the project               |
| NATS       | Message broker for microservice messaging  |
| JWT        | Authentication and authorization           |
| Class Validator | DTO validation and transformation     |
| RxJS       | Reactive programming for async operations   |

---

## 📁 Project Structure

```
src/
├── auth/                # Authentication module (login, register, verify)
│   ├── decorators/      # Custom decorators (@User, @Token)
│   ├── dto/            # Authentication DTOs
│   ├── guard/          # JWT authentication guard
│   └── interfaces/     # User interfaces
├── products/           # Products module (CRUD operations)
│   └── dto/            # Product DTOs
├── orders/             # Orders module (order management)
│   ├── dto/            # Order DTOs
│   └── enum/           # Order status enums
├── health-check/       # Health check endpoint
├── transports/         # NATS module configuration
├── common/             # Shared utilities, DTOs, and exception filters
├── config/             # Environment config and validation
└── main.ts             # Entry point of the application
```

---

## 📦 Installation

To run the gateway locally:

1. **Clone the repository**

```bash
git clone https://github.com/nest-microservices-nel/client-gateway.git
cd client-gateway
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
NATS_SERVERS=nats://nats-server:4222
```

4. **Run in development mode**

```bash
npm run start:dev
```

---

## 🔐 Environment Variables

| Variable        | Description                                     | Example                    |
|----------------|-------------------------------------------------|----------------------------|
| `PORT`         | Port where the gateway will run                 | `3000`                     |
| `NATS_SERVERS` | NATS server URLs (comma-separated for multiple) | `nats://nats-server:4222`  |

---

## 🐳 Running with Docker

### Step 1: Build the Docker image

```bash
docker build -t client-gateway .
```

### Step 2: Run the container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e NATS_SERVERS=nats://nats-server:4222 \
  client-gateway
```

### Step 3: Build production image

```bash
docker build -f dockerfile.prod --no-cache -t client-gateway-prod ./
```

---

## 🔗 API Endpoints

### Health Check
| Method | Path | Description | Authentication |
|--------|------|-------------|----------------|
| GET    | `/`  | Service health check | No |

### Authentication Routes
| Method | Path              | Description                    | Authentication |
|--------|-------------------|--------------------------------|----------------|
| POST   | `/api/auth/register` | Register a new user         | No             |
| GET    | `/api/auth/login`    | User login                  | No             |
| GET    | `/api/auth/verify`   | Verify JWT token            | Yes (Bearer)   |

### Products Routes
| Method | Path                    | Description                    | Authentication |
|--------|-------------------------|--------------------------------|----------------|
| POST   | `/api/products`         | Create a new product           | No             |
| GET    | `/api/products`         | Get paginated list of products | No             |
| GET    | `/api/products/:id`     | Get product by ID              | No             |
| PATCH  | `/api/products/:id`     | Update product by ID           | No             |
| DELETE | `/api/products/:id`     | Delete product by ID           | No             |

### Orders Routes
| Method | Path                     | Description                      | Authentication |
|--------|--------------------------|----------------------------------|----------------|
| POST   | `/api/orders`            | Create a new order               | No             |
| GET    | `/api/orders`            | Get paginated list of orders     | No             |
| GET    | `/api/orders/id/:id`     | Get order by ID (UUID)           | No             |
| PATCH  | `/api/orders/:id`        | Change order status              | No             |
| GET    | `/api/orders/:status`    | Get orders filtered by status    | No             |

**Order Status Values:**
- `PENDING`
- `DELIVERED` 
- `CANCELLED`

---

## 📡 Microservices Communication

The gateway communicates with the following microservices via NATS:

### Products Microservice
| NATS Pattern            | HTTP Route              | Description          |
|-------------------------|-------------------------|----------------------|
| `create_product`        | `POST /api/products`    | Create product       |
| `find_all_products`     | `GET /api/products`     | List products        |
| `find_one_product`      | `GET /api/products/:id` | Get product by ID    |
| `update_product`        | `PATCH /api/products/:id` | Update product     |
| `delete_product`        | `DELETE /api/products/:id` | Delete product    |

### Orders Microservice
| NATS Pattern            | HTTP Route                | Description            |
|-------------------------|---------------------------|------------------------|
| `createOrder`           | `POST /api/orders`        | Create order           |
| `findAllOrders`         | `GET /api/orders`         | List orders            |
| `findOneOrder`          | `GET /api/orders/id/:id`  | Get order by ID        |
| `changeOrderStatus`     | `PATCH /api/orders/:id`   | Change order status    |
| `findAllByStatus`       | `GET /api/orders/:status` | Filter orders by status |

### Auth Microservice
| NATS Pattern            | HTTP Route               | Description           |
|-------------------------|--------------------------|-----------------------|
| `auth.register.user`    | `POST /api/auth/register` | Register user        |
| `auth.login.user`       | `GET /api/auth/login`     | Login user           |
| `auth.verify.user`      | `GET /api/auth/verify`    | Verify JWT token     |

---

## 🔐 Authentication

The gateway includes JWT-based authentication:

---

## 📌 Additional Notes

- **Global Prefix**: All routes (except health check) are prefixed with `/api`
- **Exception Handling**: Custom RPC exception filter handles microservice errors
- **Validation**: Global validation pipes with whitelist and forbidden non-whitelisted properties
- **CORS**: Configure as needed for your frontend applications
- **Logging**: Comprehensive logging for debugging and monitoring
- **Scalability**: Stateless design allows horizontal scaling

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Author

**Nelson G.**  
[GitHub](https://github.com/nelsin-06)  
[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)
