import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import AdminStudent from "./pages/AdminStudent";
import AdminLogin from "./pages/AdminLogin";
// import OTPVerification from "./pages/OTPverification";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Add your routes here */}
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path= "/signup" element={<SignupForm/>} />
            <Route path= "/adminStudent" element={<AdminStudent/>} />
            <Route path= "/admin-dashboard" element={<AdminLogin/>} />
            {/* <Route path="/verify-otp" element={<OTPVerification/>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;