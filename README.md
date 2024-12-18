# 🌴 Vacation Management Project

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

> Transform your vacation management experience with our modern, full-stack solution! Track bookings, analyze trends, and generate insightful reports - all in one place. 🚀

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication system
- 👥 **Role-Based Access** - Separate interfaces for admins and users
- 📊 **Dynamic Reports** - Export data in CSV and XML formats
- ❤️ **Social Features** - Like and track popular destinations
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎯 **Real-time Updates** - Instant reflection of changes

## 🏗️ Project Structure

```
Vacation-Management-Project/
├── 🔧 backend/
│   ├── src/
│   │   ├── 🎮 controllers/   # Route handlers
│   │   ├── 📝 models/        # Data schemas
│   │   ├── ⚙️ services/      # Business logic
│   │   ├── 🔒 middleware/    # Security layers
│   │   ├── 🛠️ utils/         # Helper functions
│   │   └── 🧪 tests/         # Testing suite
│   ├── 📱 app.ts            # Main application
│   └── 📦 package.json      # Dependencies
│
├── 🎨 frontend/
│   ├── src/
│   │   ├── 🧩 components/   # UI building blocks
│   │   ├── 📄 pages/        # Route pages
│   │   └── 🔧 utils/        # Helper tools
│   ├── 🎯 App.tsx          # Root component
│   └── 📦 package.json     # Dependencies
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- 📦 Node.js (Latest LTS version)
- 🗄️ MySQL Database
- 🔑 Environment configuration ready

### 🔧 Installation

#### Backend Setup
# Clone the repository
```bash
git clone https://github.com/ShaharFullStack/vacation-management.git
```
# Navigate to backend
```bash
cd Backend
```

# Install dependencies with superpowers! 🦸‍♂️
```bash
npm install
```

# Start the server
```bash
npm start
```

#### Frontend Magic ✨
# Navigate to frontend
```bash
cd Frontend
```

# Install dependencies
```bash
npm install
```

# Launch the application
```bash
npm start
```

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/register` - Join the vacation club! 🎉
- `POST /api/login` - Get your magic token! ✨

### 🏖️ Vacation Management
- `GET /api/vacations` - Discover amazing destinations
- `POST /api/vacations` - Create new vacation dreams
- `PUT /api/vacations/:id` - Update your paradise
- `DELETE /api/vacations/:id` - Retire a destination

### ❤️ Social Features
- `POST /api/vacations/:id/likes` - Show some love!
- `GET /api/likes/report` - Track the trending spots
- `GET /api/likes/report/csv` - Export for spreadsheet wizards
- `GET /api/likes/report/xml` - Data for the XML enthusiasts

## 🛠️ Tech Stack

### Backend Powerhouse
- ⚡ Node.js + Express.js - Lightning-fast server
- 📘 TypeScript - Type-safe development
- 🗄️ MySQL - Rock-solid database
- 🔐 JWT - Secure authentication

### Frontend Magic
- ⚛️ React.js - UI components
- 🎨 Modern CSS - Beautiful styling
- 📱 Responsive Design - Mobile-first approach

## 🧪 Quality Assurance

```bash
# Run the test suite
npm test

# Watch for changes
npm run test:watch
```

## 📊 Reports

Generate beautiful reports in multiple formats:
- 📑 CSV - For the spreadsheet lovers

## 🤝 Contributing

I appericiate contributions! Here's how you can help:
1. 🍴 Fork the repository
2. 🌿 Create your feature branch
3. 💫 Make your changes
4. 🚀 Submit a pull request

## 📫 Contact

Questions? Ideas? Get in touch!
- 👨‍💻 **Developer**: Shahar Maoz
- 📧 **Email**: [rakloze@gmail.com](mailto:rakloze@gmail.com)

---

<div align="center">

🌟 **Star us on GitHub if you find this useful!** 🌟

Made with ❤️ by the Vacation Management Team

</div>
