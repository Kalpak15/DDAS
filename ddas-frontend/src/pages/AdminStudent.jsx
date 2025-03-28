// // src/App.jsx
// import { useNavigate } from "react-router-dom"; // Optional, for navigation

// function App() {
//   const navigate = useNavigate(); // Optional, if using React Router

//   const handleAdminClick = () => {
//     // Replace with your admin login route or logic
//     console.log("Admin clicked");
//     // navigate("/admin-login"); // Uncomment if using React Router
//   };

//   const handleStudentEmployeeClick = () => {
//     // Replace with your student/employee login route or logic
//     console.log("Student/Employee clicked");
//     // navigate("/student-employee-login"); // Uncomment if using React Router
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Welcome
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           Please select your login type
//         </p>
//         <div className="flex flex-col gap-4">
//           <button
//             onClick={handleAdminClick}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Login as Admin
//           </button>
//           <button
//             onClick={handleStudentEmployeeClick}
//             className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Login as Student/Employee
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import { useNavigate } from "react-router-dom"; // Optional, for navigation
import { useEffect } from "react";

function App() {
  const navigate = useNavigate(); // Optional, if using React Router

  const handleAdminClick = () => {
    console.log("Admin clicked");
    // navigate("/admin-login"); // Uncomment if using React Router
  };

  const handleStudentEmployeeClick = () => {
    console.log("Student/Employee clicked");
    // navigate("/student-employee-login"); // Uncomment if using React Router
  };

  useEffect(() => {
    // Trigger animation on mount
    document.querySelector(".card").classList.add("animate-fade-in");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 animate-bg-gradient">
      <div className="card bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          Welcome Aboard
        </h1>
        <p className="text-center text-gray-500 mb-8 text-lg font-medium">
          Choose your portal to begin
        </p>
        <div className="flex flex-col gap-6">
          <button
            onClick={handleAdminClick}
            className="group relative w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></span>
            <span className="relative">Admin</span>
          </button>
          <button
            onClick={handleStudentEmployeeClick}
            className="group relative w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></span>
            <span className="relative">Student/Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;