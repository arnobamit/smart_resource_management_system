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

### Installation

```bash
# Install dependencies
$ npm install
