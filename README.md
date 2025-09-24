# 📔 E-notebook - Digital Notes Management System

A comprehensive full-stack notes management application built with the MERN stack, featuring secure user authentication, real-time note operations, and a modern responsive interface.

🌐 **Live Demo**: [e-notebook-fu9z.onrender.com](https://e-notebook-fu9z.onrender.com/)

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
## ✨ Features

### 🔐 Secure Authentication System
- **User Registration** with comprehensive validation
- **Secure Login** with JWT token authentication
- **Session Management** with automatic token expiration
- **Password Encryption** using bcryptjs with salt hashing
- **Protected Routes** with automatic redirection

### 📝 Complete Notes Management
- **Create Notes** with title, description, and custom tags
- **View All Notes** in a clean, organized dashboard
- **Edit Notes** with modal-based interface
- **Delete Notes** with ownership verification
- **Real-time Updates** across the application

### 🎨 Modern User Interface
- **Responsive Design** optimized for all devices
- **Clean UI** with CSS Modules and modern styling
- **Interactive Elements** with smooth animations
- **Alert System** for real-time user feedback
- **Intuitive Navigation** with user-friendly workflow

### 🔒 Advanced Security Features
- **JWT Authentication** with 1-hour token expiration
- **User Ownership Verification** for all note operations
- **Input Validation** on both client and server sides
- **Password Strength Requirements** and confirmation
- **Session-based Security** with automatic logout

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and encryption
- **express-validator** - Input validation and sanitization

### Frontend
- **React.js** - UI library with functional components
- **React Router DOM** - Client-side routing with protected routes
- **Context API** - Global state management for notes
- **CSS Modules** - Scoped styling and modern design
- **React Icons** - Beautiful icons integration
- **Heroicons** - Additional icon library

### Development Tools
- **Nodemon** - Development server with hot reload
- **Concurrently** - Run frontend and backend simultaneously
- **dotenv** - Environment variables management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohelkureshi/E-notebook.git
   cd E-notebook
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Environment Variables Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

6. **Start the development environment**
   
   **Option 1: Run both frontend and backend together**
   ```bash
   npm run both
   ```
   
   **Option 2: Run separately**
   ```bash
   # Backend (from root directory)
   cd backend
   npm start
   
   # Frontend (from root directory, new terminal)
   npm start
   ```

7. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
E-notebook/
├── backend/                          # Backend server
│   ├── middleware/                   # Custom middleware
│   │   └── fetchuser.js             # JWT authentication middleware
│   ├── models/                      # Database schemas
│   │   ├── User.js                  # User model
│   │   └── Note.js                  # Note model
│   ├── routes/                      # API endpoints
│   │   ├── auth.js                  # Authentication routes
│   │   └── notes.js                 # Notes CRUD routes
│   ├── db.js                        # Database connection
│   └── index.js                     # Server entry point
├── frontend/                        # React application
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Signup.js            # Registration page
│   │   │   ├── Home.js              # Main dashboard
│   │   │   ├── Notes.js             # Notes container
│   │   │   ├── NoteItem.js          # Individual note card
│   │   │   ├── AddNote.js           # Add note form
│   │   │   ├── Navbar.js            # Navigation component
│   │   │   ├── Footer.js            # Footer component
│   │   │   ├── About.js             # About page
│   │   │   └── Alert.js             # Alert notifications
│   │   ├── context/notes/           # Context API
│   │   │   ├── noteContext.js       # Note context definition
│   │   │   └── NoteState.js         # Note state provider
│   │   ├── styles/                  # CSS modules and styling
│   │   ├── images/                  # Static images
│   │   ├── App.js                   # Main app component
│   │   └── index.js                 # Entry point
├── package.json                     # Root package.json
└── README.md                        # Project documentation
```

## 📡 API Endpoints

### Authentication Routes
```
POST   /api/auth/createuser    # User registration
POST   /api/auth/login         # User login
POST   /api/auth/getuser       # Get user details (protected)
```

### Notes Management Routes
```
GET    /api/notes/fetchallnotes     # Get all user notes (protected)
POST   /api/notes/addnote           # Create new note (protected)
PUT    /api/notes/updatenote/:id    # Update note (protected)
DELETE /api/notes/deletenote/:id    # Delete note (protected)
```

## 🔒 Security Implementation

### Backend Security
- **Password Hashing**: bcryptjs with salt rounds for secure storage
- **JWT Tokens**: Secure authentication with 1-hour expiration
- **Input Validation**: express-validator for comprehensive validation
- **Authorization Middleware**: User ownership verification for all operations
- **Error Handling**: Centralized error management with appropriate status codes

### Frontend Security
- **Protected Routes**: Authentication checks before accessing notes
- **Session Management**: Secure token storage in sessionStorage
- **Form Validation**: Client-side validation with real-time feedback
- **Automatic Logout**: Token expiration handling with redirection

## 🎯 Usage Guide

### Getting Started
1. **Register** a new account with name, email, and password
2. **Login** with your credentials to access the notes dashboard
3. **Create Notes** using the "Add Note" form with title, description, and tags
4. **Manage Notes** by editing or deleting existing notes
5. **Logout** securely when finished

### Note Management
- **Create**: Fill in the form and click "Add Note"
- **Edit**: Click the edit icon on any note to modify it
- **Delete**: Click the delete icon to remove a note
- **Search**: Notes are automatically organized by creation date

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

### Environment Setup for Production
- Configure production MongoDB URI
- Set secure JWT secret key
- Update CORS settings for production domain
- Set NODE_ENV to "production"

### Deployment Platforms
- **Render** (currently deployed)
- **Heroku**
- **Vercel** (frontend)
- **Railway**
- **DigitalOcean**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code structure and naming conventions
- Add appropriate comments for complex logic
- Test all new features thoroughly
- Update documentation as needed
- Ensure responsive design for all new UI components

## 📝 Development Scripts

```bash
# Root directory scripts
npm run both          # Run frontend and backend concurrently
npm start            # Run frontend only
npm install          # Install all dependencies

# Backend scripts
cd backend
npm start            # Start backend server
nodemon index.js     # Development server with hot reload

# Frontend scripts
cd frontend
npm start            # Start React development server
npm run build        # Create production build
```

## 🐛 Known Issues & Solutions

### Common Issues
- **CORS Errors**: Ensure backend URL is correctly configured in frontend
- **Token Expiration**: Tokens expire after 1 hour, requires re-login
- **Database Connection**: Check MongoDB URI and network connectivity

### Troubleshooting
- Clear browser cache and sessionStorage if facing login issues
- Ensure all environment variables are properly set
- Check console for detailed error messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sohel Kureshi**
- GitHub: [@sohelkureshi](https://github.com/sohelkureshi)
- Project Link: [https://github.com/sohelkureshi/E-notebook](https://github.com/sohelkureshi/E-notebook)

## 🙏 Acknowledgments

- React team for the excellent framework and documentation
- MongoDB for the flexible and scalable database solution
- Express.js community for the robust web framework
- JWT.io for authentication standards and implementation guides
- All open-source contributors whose packages made this project possible

## 📊 Project Statistics

- **Total Commits**: 14+ commits showing active development
- **Languages**: JavaScript (63.2%), CSS (32.1%), HTML (4.7%)
- **Development Period**: 11 months of active development
- **Production Ready**: Deployed and accessible online

---

⭐ If you found this project helpful, please consider giving it a star!

📧 For questions, suggestions, or support, feel free to open an issue or contact the maintainer.

🚀 Happy note-taking with E-notebook!
