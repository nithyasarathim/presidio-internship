# Hospital Management API

A lightweight Node.js project with two independent microservices:
- **Hospital API**: Handles doctor, patient, and analytics management.
- **Email API**: Sends email notifications for new patient registrations.

---

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local MongoDB (for Hospital API)
- Email service (e.g., Gmail, SendGrid) (for Email API)
- Docker (optional)

---

## Setup Instructions

### Hospital API Setup

1. **Clone the Repository**
   ```bash
   git clone <repo-url>
   cd hospital-api
   ```

2. **Configure Environment Variables**
   Create `hospital-api/.env`:
   ```properties
   MONGO_URL=<your-mongodb-connection-string>
   EMAIL_SERVICE_URL=http://localhost:5001/mail/send
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

3. **Install Dependencies**
   ```bash
   cd hospital-api
   npm install
   ```

4. **Run the Hospital API**
   - Using Node.js:
     ```bash
     node server.js
     ```
   - Using Docker:
     ```bash
     docker compose up --build
     ```

5. **Access the API**
   - Endpoint: `http://localhost:5000`
   - Swagger Docs: `http://localhost:5000/api/docs`

---

### Email API Setup

1. **Navigate to Email API Directory**
   ```bash
   cd email-api
   ```

2. **Configure Environment Variables**
   Create `email-api/.env`:
   ```properties
   MAIL_USER=<your-email-user>
   MAIL_PASS=<your-email-password>
   MAIL_HOST=<your-email-host>
   MAIL_PORT=<your-email-port>
   PORT=5001
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Email API**
   - Using Node.js:
     ```bash
     node server.js
     ```
   - Using Docker:
     ```bash
     docker compose up --build
     ```

5. **Access the API**
   - Endpoint: `http://localhost:5001`

---

## Testing the APIs
Use Swagger UI (`http://localhost:5000/api/docs`) or Postman. Key endpoints:
- `POST /api/auth/login`: Authenticate as doctor/admin
- `GET /api/patients`: Retrieve all patients
- `POST /api/patients`: Create a patient (triggers email via Email API)
- `GET /api/analytics`: Admin-only analytics

---

## Notes
- Ensure `.env` files are correctly configured for both services.
- Verify MongoDB connectivity for Hospital API and email service for Email API.
- Check ports `5000` (Hospital API) and `5001` (Email API) are free.
- Both services must be running for email notifications to work.