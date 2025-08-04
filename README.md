# 🧑‍💼 Employee Directory Application

A full-stack web application for managing and viewing employees using GraphQL, MongoDB, and Next.js.

---

## 🚀 Tech Stack

**Backend:**
- Node.js
- Apollo Server (v4)
- GraphQL
- MongoDB (native driver)

**Frontend:**
- Next.js (App Router)
- Apollo Client
- Tailwind CSS

---

## 📦 Features

### 🔧 Backend
- Connects to MongoDB using native driver
- GraphQL Types:
  - **Employee**: `id`, `name`, `position`, `department`, `salary`
  - **Department**: `id`, `name`, `floor`
- GraphQL Queries:
  - `getAllEmployees` – List all employees (name, position)
  - `getEmployeeDetails(id)` – View full details of a specific employee
  - `getEmployeesByDepartment(department)` – Filter employees by department
- GraphQL Mutation:
  - `addEmployee(name, position, department, salary)` – Add a new employee
- Seed script to insert initial data (at least 5 employees, 3 departments)

### 🖥️ Frontend
- Home Page:
  - List all employees (name + position)
  - Filter dropdown to select department
  - "Add New Employee" button
- Employee Detail Page:
  - Displays complete employee info
  - Back button to return to home
- Add Employee Form:
  - Form with validation
  - Submits data via GraphQL mutation
- Responsive UI using Tailwind CSS
- Loading states and error handling included

---

## 🔗 Folder Structure

