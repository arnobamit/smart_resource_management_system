# 📚 Smart Resource Management System (SRMS)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive Node.js framework application for managing administrative users, supervisors, employees, assets, and asset requests.</p>

---

## 🚀 Project Overview

This project is a back-end solution built with the **NestJS** framework, utilizing **PostgreSQL** as the database via **TypeORM**. It implements a robust user hierarchy and authentication system, complete with **Role-Based Access Control (RBAC)** and email notifications for key events like user registration and asset requests.

### Core Features:

* **User Hierarchy:** Admin creates Supervisors, and Supervisors create Employees.
* **Authentication:** JWT-based login for Admin, Supervisor, and Employee roles.
* **Role-Based Access Control (RBAC):** Custom Guards (`AdminGuard`, `SupervisorGuard`, `EmployeeGuard`) ensure secure, role-specific access to endpoints.
* **Asset Management:** Admins create/update assets; Supervisors can be assigned assets and manage employee requests.
* **Request Workflow:** Employees submit asset requests to their Supervisor (triggering email notification). Supervisors approve/reject requests (triggering return notification email).
* **Data Persistence:** Uses PostgreSQL for data storage, managed by TypeORM.

## 💾 Database Schema (ER Diagram)

The following diagram illustrates the relationships between the core entities in the SRMS application.


---

## ⚙️ Project Setup

### Prerequisites

1.  Node.js (LTS version recommended)
2.  PostgreSQL Database instance
3.  Updated `.env` file with PostgreSQL and Email credentials.


### Configuration

Ensure your `.env` file is configured correctly for database and email services. **Database host and credentials are required for TypeORM to connect.**

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=12345
DATABASE_NAME=srms
JWT_SECRET=verysecretkey
JWT_EXPIRES_IN=3600s

# Mailer Configuration (Required for all notifications)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
