# DDAS - Data Download Duplication Alert System

<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/ddas/main/assets/ddas-logo.svg" alt="DDAS Logo" width="120" height="120">
  
  **Smart File Management • Duplicate Detection • Team Collaboration**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-green.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)
</div>

## 🚀 Overview

**DDAS (Data Download Duplication Alert System)** is a cutting-edge full-stack web application designed to revolutionize file sharing in collaborative environments. Built for universities, organizations, and teams, DDAS eliminates redundant file downloads through intelligent duplication detection, real-time alerts, and seamless cloud-based file viewing.

### ✨ Why DDAS?

In today's collaborative digital workspace, teams often waste valuable storage and bandwidth by downloading the same files multiple times. DDAS solves this problem by providing smart duplicate detection, team management, and efficient file sharing capabilities.

## 🎯 Key Features

### 🔍 Advanced Duplication Detection
- **Intelligent Analysis**: Detects duplicates by analyzing both file names and content
- **Multiple Scenarios**: Handles complex cases including:
  - Same name, different content
  - Different names, same content  
  - Exact duplicates
- **Multi-Format Support**: Works with txt, Excel, PDF, Word, PNG, JPG files

### 👥 Team Management & Collaboration
- **Team Creation**: Users can create and manage teams
- **Role-Based Access**: Team creators have upload privileges, all members can download
- **Integrated Chat**: Real-time communication within teams
- **Secure Collaboration**: JWT-based authentication ensures data privacy

### ⚡ Real-Time Features
- **Smart Alerts**: Instant notifications when attempting to download already-accessed files
- **Cloud Viewing**: View files directly in the browser without downloading
- **Live Updates**: Real-time synchronization across team members

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern UI built with React
- **Cross-Platform**: Works seamlessly across different devices and browsers

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React | Dynamic and responsive user interface |
| **Backend** | Express.js | RESTful API for server-side logic |
| **Database** | MongoDB | Scalable storage for users, teams, and files |
| **Authentication** | JWT | Secure user access and session management |
| **Supported Files** | txt, Excel, PDF, Word, PNG, JPG | Comprehensive file format support |

## 🚀 Getting Started

### Prerequisites

Before running DDAS, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ddas.git
   cd ddas
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ddas
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory, in new terminal)
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
ddas/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Helper functions
│   │   └── App.js          # Main application component
│   └── package.json
│
├── backend/                 # Express.js backend application
│   ├── routes/             # API route definitions
│   ├── models/             # MongoDB data models
│   ├── middleware/         # Custom middleware functions
│   ├── controllers/        # Request handling logic
│   ├── utils/              # Backend utilities
│   └── server.js           # Main server file
│
└── README.md
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Team Management
- `POST /api/teams/create` - Create new team
- `GET /api/teams/` - Get user's teams
- `POST /api/teams/join` - Join existing team
- `GET /api/teams/:id/members` - Get team members

### File Operations
- `POST /api/files/upload` - Upload file to team
- `GET /api/files/:id/download` - Download file
- `GET /api/files/:id/view` - Cloud view file
- `GET /api/files/duplicates` - Check for duplicates

### Chat System
- `GET /api/chat/:teamId` - Get team chat history  
- `POST /api/chat/:teamId` - Send message to team

## 🎮 Usage Guide

### 1. Getting Started
1. **Sign Up**: Create your account with email and password
2. **Create Team**: Set up your first team for collaboration
3. **Invite Members**: Share team code with collaborators

### 2. File Management
1. **Upload Files**: Team creators can upload files in supported formats
2. **Smart Detection**: System automatically checks for duplicates
3. **Cloud Viewing**: Preview files without downloading
4. **Download Safely**: Get alerts if file already accessed by teammates

### 3. Team Collaboration
1. **Real-time Chat**: Communicate with team members instantly
2. **Activity Tracking**: Monitor file access and team activities
3. **Role Management**: Understand team hierarchy and permissions

## 🔧 Configuration

### Database Configuration
```javascript
// MongoDB connection settings
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
};
```

### JWT Configuration
```javascript
// JWT settings
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
  algorithm: 'HS256'
};
```

## 🧪 Testing

Run the test suite to ensure everything works correctly:

```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test

# Run all tests
npm run test:all
```

## 🚀 Deployment

### Production Build

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Deploy to your preferred platform**
   - **Frontend**: Netlify, Vercel, or AWS S3
   - **Backend**: Heroku, Railway, or AWS EC2
   - **Database**: MongoDB Atlas

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages  
- Add tests for new features
- Update documentation as needed

## 🐛 Known Issues & Limitations

- Currently supports limited file types (txt, Excel, PDF, Word, PNG, JPG)
- Cloud viewing may have limitations with very large files
- Real-time features require stable internet connection

## 🔮 Future Enhancements

- [ ] Support for additional file formats (video, audio, etc.)
- [ ] Advanced analytics and reporting
- [ ] File versioning system
- [ ] Integration with cloud storage providers
- [ ] Mobile application
- [ ] Advanced search and filtering
- [ ] Automated file organization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js community for the robust backend solution
- MongoDB for scalable database solutions
- All contributors and testers who helped improve DDAS

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create new issue** with detailed description
3. **Contact support** at support@ddas.com

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for collaborative teams everywhere

[🌟 Star](https://github.com/yourusername/ddas) • [🐛 Report Bug](https://github.com/yourusername/ddas/issues) • [💡 Request Feature](https://github.com/yourusername/ddas/issues)

</div>
