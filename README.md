<div align="center">
  
# 🛡️ ZeroDup
## Data Duplication Alert System
  
**Smart File Management • Duplicate Detection • Team Collaboration**
  
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
- **Secure Authentication**: Industry-standard security ensures data privacy

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

Before running DDAS, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Git** version control

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kalpak15/ZeroDup.git
   cd ddas
   ```

2. **Install dependencies**
   ```bash
   # Install all required packages
   npm run install-all
   ```

   
   **⚠️ Important:** Configure your environment variables before running the application.

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   ```

5. **Access the application**
   - Open your browser and navigate to the local development server
   - Create your account and start collaborating!

## 📁 Project Structure

```
ddas/
├── ddas-frontend/               # React frontend application
├── DDAS-Backend/                # Express.js backend application
└── README.md               # Project Documentation
```

## 🎮 How to Use DDAS

### 1. Getting Started
1. **Sign Up**: Create your account with email and password
2. **Create Team**: Set up your first team for collaboration
3. **Invite Members**: Share team invitation with collaborators

### 2. File Management
1. **Upload Files**: Team creators can upload files in supported formats
2. **Smart Detection**: System automatically checks for duplicates
3. **Cloud Viewing**: Preview files without downloading
4. **Download Safely**: Get alerts if file already accessed by teammates

### 3. Team Collaboration
1. **Real-time Chat**: Communicate with team members instantly
2. **Activity Tracking**: Monitor file access and team activities
3. **Role Management**: Understand team hierarchy and permissions

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/new-feature`)
3. **Make your changes** and test thoroughly
4. **Commit changes** (`git commit -m 'Add New feature'`)
5. **Push to branch** (`git push origin feature/new-feature`)
6. **Open Pull Request** with detailed description

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages  
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas Where We Need Help
- 🎨 UI/UX improvements
- ⚡ Performance optimizations

## 🌟 Features in Development

We're constantly working to improve DDAS. Here's what's coming:

- [ ] Support for additional file formats
- [ ] Advanced analytics and reporting
- [ ] File versioning system
- [ ] Integration with cloud storage providers
- [ ] Mobile application
- [ ] Advanced search and filtering
- [ ] Automated file organization


## 📞 Support & Community

### Getting Help

- 📚 **Documentation**: Check our [Wiki](https://github.com/Kalpak15/ZeroDup/wiki) for detailed guides
- 🐛 **Bug Reports**: [Create an issue](https://github.com/Kalpak15/ZeroDup/issues) with detailed information
- 💡 **Feature Requests**: [Request features](https://github.com/Kalpak15/ZeroDup/issues) we'd love to hear your ideas


### Contact

**Project Maintainer**
- GitHub: [@Kalpak15](https://github.com/kalpak15)
- LinkedIn: [kalpakanilkulkarni](https://www.linkedin.com/in/kalpakanilkulkarni/)
- Email: kulkarnikalpak15@gmail.com

---

<div align="center">

**⭐ If DDAS helps your team, please consider starring this repository!**

Made with ❤️ for collaborative teams everywhere

[🌟 Star](https://github.com/Kalpak15/ZeroDup) • [🐛 Report Bug](https://github.com/Kalpak15/ZeroDup/issues) • [💡 Request Feature](https://github.com/Kalpak15/ZeroDup/issues) • 

</div>



**📄 MIT License**

📄 License
This project is licensed under the MIT License - free to use, modify, and distribute.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
