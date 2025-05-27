import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SignupForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import AdminStudent from "./pages/AdminStudent";
import AdminLogin from "./pages/AdminLogin";
import VerifyEmailPage from "./pages/VerifyEmail"
import ForgetPassword from "./pages/ForgetPassword"
import { Toaster } from 'react-hot-toast';
import TeamCreation from './pages/TeamCreation';
import JoinTeam from './pages/JoinTeam';
import TeamsSection from './pages/TeamsSection';
import Chat from './pages/Chat'
import TeamDashboard from './pages/TeamDashboard';
// import OTPVerification from "./pages/OTPverification";
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Toaster
          position="top-right"
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 4000 },
          }}
        />
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
            <Route path="/verify-email" element={<VerifyEmailPage/>} />
            <Route path="/forgot-password" element={<ForgetPassword/>} />
            <Route path="/teams/create/:userId" element={<TeamCreation/>} />
            <Route path="/teams/join" element={<JoinTeam />} />
            <Route path="/teams" element={<TeamsSection />} />
            <Route path="/teams/:teamId" element={<TeamDashboard />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;