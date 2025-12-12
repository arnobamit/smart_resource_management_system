# 📚 Smart Resource Management System (SRMS)

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">A robust and scalable backend application for managing users, assets, and request workflows using the NestJS framework.</p>

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & ER Diagram](#-architecture--er-diagram)
- [Folder Structure](#-folder-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Testing](#-testing)
- [License](#-license)

---

## 🔍 Overview
The **Smart Resource Management System (SRMS)** is a backend solution built with **NestJS** and powered by **PostgreSQL** through **TypeORM**. It provides a complete user hierarchy, secure authentication, role-based authorization, and asset request workflows suitable for organizational environments.

Admins oversee supervisors, supervisors manage employees, and employees interact with the system through asset requests. All critical operations trigger automated email notifications.

---

## 🚀 Key Features

### 👤 User Hierarchy
- **Admin** creates Supervisors  
- **Supervisors** create Employees  
- **Employees** submit asset requests  

### 🔐 Authentication & Authorization
- JWT-based authentication  
- Role-Based Access Control (RBAC)  
- Custom Guards: `AdminGuard`, `SupervisorGuard`, `EmployeeGuard` (located within respective feature modules)  

### 📦 Asset Management
- Admins can create, update, and assign assets  
- Supervisors manage assets assigned to them  

### 📨 Request Workflow
- Employees submit asset requests → Supervisor gets an email  
- Supervisor approves or rejects → Employee receives notification  

### 💾 Data Persistence
- PostgreSQL database  
- Managed with TypeORM entities and relationships  

---

## 🛠 Tech Stack

- **Backend:** NestJS, TypeScript  
- **Database:** PostgreSQL  
- **ORM:** TypeORM  
- **Authentication:** JWT + RBAC  
- **Email Service:** Nodemailer  
- **Environment Handling:** dotenv  

---

## 🏗 Architecture & ER Diagram

The application uses a **Modular, Feature-Based Architecture** where core logic is grouped by domain (`admin`, `employee`, `supervisor`). Database entities are centralized within the `entities/` module.

- **Admin, Supervisor, Employee Modules** – Core user roles, hierarchy control, and business logic.  
- **Entities Module** – Shared entities (`Asset`, `RequestInfo`, etc.) with TypeORM integration.  
- **Common Module** – Cross-cutting utilities including the `MailerService`, guards, decorators, and helpers.

### 📌 ER Diagram

<p align="center">
  <img src="path/to/your/er-diagram.png" width="700" />
</p>

> The ER diagram illustrates the relationships among Admin, Supervisor, Employee, Asset, and Request tables.


---

## 📁 Folder Structure

The project structure is organized by feature modules:

```text
src/
├── admin/
│   ├── admin.controller.ts
│   ├── admin.dto.ts
│   ├── admin.entity.ts
│   ├── admin.guard.ts
│   ├── admin.module.ts
│   └── admin.service.ts
│
├── common/
│   └── mailer.service.ts // The common MailerService
│
├── employee/
│   ├── employee.controller.ts
│   ├── employee.dto.ts
│   ├── employee.entity.ts
│   ├── employee.guard.ts
│   ├── employee.module.ts
│   └── employee.service.ts
│
├── entities/
│   ├── assets.controller.ts
│   ├── entities.module.ts
│   ├── requests.controller.ts
│   ├── shared.entities.module.ts
│   └── shared.entities.ts // Contains Asset and RequestInfo entities
│
├── supervisor/
│   ├── supervisor.controller.ts
│   ├── supervisor.dto.ts
│   ├── supervisor.entity.ts
│   ├── supervisor.guard.ts
│   ├── supervisor.module.ts
│   └── supervisor.service.ts
│
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (LTS recommended)  
- PostgreSQL running locally or remotely  
- Valid email credentials for sending notifications  

### Install Dependencies
```bash
npm install
```

## 🧩 Environment Variables

Create a `.env` file in the root directory:
```text
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=12345
DATABASE_NAME=srms

JWT_SECRET=verysecretkey
JWT_EXPIRES_IN=3600s

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

---

## ▶️ Running the Project

### Development Mode
```bash
npm run start
```

### Watch Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run start:prod
```

## 🧪Testing
### Run Unit Tests
```bash
npm run test
```

### Run e2e Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## 📄 License
This project is based on the NestJS framework and is licensed under the MIT License.
