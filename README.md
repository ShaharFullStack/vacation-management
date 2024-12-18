# 🌴 Vacation Management Project

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)


# Vacation Management

This is a vacation management system that provides functionalities to manage vacations for users. It includes features for user authentication, vacation liking, reporting, and more.

## Project Structure

The project is divided into three main parts:
- **Frontend**: A React-based application for the user interface.
- **Backend**: A Node.js server with TypeScript providing the API and business logic.
- **Database**: Includes SQL scripts for database initialization.

## Technologies Used

- **Frontend**: React, TypeScript, Redux
- **Backend**: Node.js, TypeScript, Express
- **Database**: MySQL
- **Containerization**: Docker

## Features

- User authentication and role-based access control.
- Vacation management: Add, edit, delete, and view vacations.
- Like vacations and view reports.
- Responsive and user-friendly interface.

## Installation

### Run with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/ShaharFullStack/vacation-management.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vacation-management
   ```

3. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

### Run Manually

1. Clone the repository:
   ```bash
   git clone https://github.com/ShaharFullStack/vacation-management.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vacation-management
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

4. Set up the database using the SQL scripts in the `Database` folder.

5. Start the development servers:
   - Backend:
     ```bash
     cd Backend
     npm run start
     ```
   - Frontend:
     ```bash
     cd Frontend
     npm start
     ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Developed by Shahar Maoz.
