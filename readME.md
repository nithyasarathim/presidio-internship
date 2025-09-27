# Presidio Internship Documentation

## Week 1 Objectives

- **Git/GitHub**: Create a repository, learn branching, pull requests (PRs), rebasing, and resolving merge conflicts.
- **Data Structures and Algorithms (DSA)**: Understand and implement **HashMap** and **Recursion** with example problems.
- **SQL**: Design a schema for a social media platform, implement queries using **joins**, **indexes**, and **transactions**.
- **Optional**: Explore system design basics (scalability, fault tolerance, caching, load balancing).
- **Deliverables**: Push all code, schemas, queries, and notes to the GitHub repository under the `/week-1` folder.

## Folder Structure

The `/week-1` folder in the repository should contain:

```
/week-1
├── DBMS/
│   ├── queries.sql        # SQL queries for the social media platform
│   └── schema.sql        # Schema for the social media platform
├── DSA/
│   ├── hashmap/
│   │   ├── LC_3.cpp      # Longest Substring Without Repeating Characters
│   │   ├── LC_49.cpp     # Group Anagrams
│   │   ├── LC_347.cpp    # Top K Frequent Elements
│   │   ├── LC_560.cpp    # Subarray Sum Equals K
│   │   └── LC_706.cpp    # Design HashMap
│   ├── recursion/
│   │   ├── LC_17.cpp     # Letter Combinations of a Phone Number
│   │   ├── LC_22.cpp     # Generate Parentheses
│   │   ├── LC_51.cpp     # N-Queens
│   │   └── LC_509.cpp    # Fibonacci Number
└── week1.md              # Notes for Week 1
```



## Week 2 Objectives

### Task 1: Express Server with MongoDB
- Set up an **Express.js server** with MongoDB connectivity.
- Implement **CRUD operations** for the **patients** collection:
  - Doctors can **create**, **update**, **delete**, and **view** patients.
- Trigger the **Email Microservice** when a new patient is added.
- Add **error handling** with meaningful responses.
- Implement **logging middleware** to log requests (method, path, timestamp)
### Task 2: Authentication & RBAC
- Implement **JWT-based authentication** for doctor login.
- Add a **session-based authentication** route (e.g., `/profile`).
- Define roles:
  - **Doctor**: Full access to patient CRUD operations.
  - **Admin**: Access to analytics and doctor management.
- Implement **role-based access control (RBAC)** to restrict routes.

### Task 3: Analytics & Advanced API Features
- Create an `/analytics` endpoint for admins, providing:
  - Total patients.
  - Patients grouped by age (`<18`, `18–40`, `40–60`, `60+`).
  - Patients per doctor.
  - Recent patients (latest N with doctor info).
- Enhance patients API with:
  - **Pagination**: `/patients?page=1&limit=5`
  - **Filtering**: `/patients?age=30`
  - **Sorting**: `/patients?sort=createdAt_desc`
  - **HATEOAS links** for navigation.
- Implement **rate limiting**: 20 requests per minute per doctor.

### Task 4: Documentation, Containerization & Deployment
- Document APIs using **Swagger (OpenAPI)** at `/api/docs`.
- Containerize both microservices using **Docker**:
  - **Hospital API**: Main Express server.
  - **Email API**: Email notification microservice.
- Run services locally with **Docker Compose**.
- *(Optional)* Set up **GitHub Actions** for CI/CD to cloud platforms.

### Deliverables
- Push all code, configurations, and documentation to the GitHub repository under the `/week-2` folder.

---

## Folder Structure

The `/week-2` folder in the repository contains:

```
/week-2
├── hospital-api/
│   ├── server.js                       # Entry point of the Hospital API
│   ├── package.json
│   ├── .env                            # Environment variables (MongoDB URI, JWT secret, etc.)
│   ├── Dockerfile                      # Dockerfile for Hospital API
│   ├── compose.yaml                    # Docker Compose for both services
│   ├── configs/
│   │   └── db.js                      # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js          # Handles registration, login, profile
│   │   ├── patientController.js       # Patient CRUD operations
│   │   └── analyticsController.js     # Analytics requests
│   ├── middlewares/
│   │   ├── authMiddleware.js          # JWT authentication & RBAC
│   │   ├── errorHandler.js            # Global error handling
│   │   ├── requestLogger.js           # Request logging
│   │   └── rateLimitMiddleware.js     # Rate limiting
│   ├── modals/
│   │   ├── doctor.js                  # Doctor schema with role
│   │   └── patient.js                 # Patient schema
│   ├── routes/
│   │   ├── authRoutes.js              # Auth routes (register, login, profile)
│   │   ├── patientRoutes.js           # Patient CRUD routes
│   │   └── analyticsRoutes.js         # Admin analytics routes
│   ├── services/
│   │   ├── authService.js             # Auth logic
│   │   ├── patientService.js          # Patient CRUD logic
│   │   ├── analyticsService.js        # Analytics computations
│   │   └── emailService.js            # Email trigger logic
│   ├── utilities/
│   │   ├── APIError.js                # Custom API error class
│   │   └── logger.js                  # Logging utility
│   └── logs/
│       └── app.log                    # Request logs
├── email-api/
│   ├── server.js                       # Entry point of the Email API
│   ├── package.json
│   ├── .env                            # Email service credentials
│   ├── Dockerfile                      # Dockerfile for Email API
│   ├── .dockerignore
│   ├── controllers/
│   │   └── mailController.js          # Email sending logic
│   ├── routes/
│   │   └── mailRoutes.js              # Email sending routes
│   ├── services/
│   │   └── mailServices.js            # Nodemailer integration
│   └── utils/
│       └── logger.js                  # Logging utility
└── week2.md                           # Notes for Week 2
```

### Folder Purpose
- **controllers/**: Handle HTTP requests and responses, invoking services.
- **routes/**: Define API endpoints and attach middleware.
- **services/**: Contain business logic and database/external integrations.
- **middlewares/**: Handle authentication, logging, rate limiting, etc.
- **modals/**: MongoDB schemas for Hospital API.
- **utilities/**: Helper functions for errors and logging.
- **configs/**: Database connection configuration (Hospital API only).
- **Dockerfile & compose.yaml**: Containerization and orchestration.

---

## Summary of Work Done
- Developed **Hospital API** with MongoDB, patient CRUD, authentication, and analytics.
- Built **Email Microservice** for patient creation notifications.
- Implemented **RBAC** and **rate limiting**
- Documented APIs with **Swagger UI** at `/api/docs`.
- Containerized services with **Docker** and **Docker Compose**.