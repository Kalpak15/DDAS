// // import React from 'react';
// // import { Formik, Form, Field } from 'formik';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';
// // import { useNavigate, Link } from 'react-router-dom';


// // const LoginForm = () => {
// //   const navigate = useNavigate();

// //   const handleLogin = async (values, { setSubmitting }) => {
// //     try {
// //       const response = await axios.post('http://localhost:5050/v1/auth/login', values);
      
// //       if (response.data.token) {
// //         localStorage.setItem('token', response.data.token);
// //         localStorage.setItem('userId', response.data.userId);
// //         toast.success('Login successful');
// //         navigate('/');
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Login failed');
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
// //           Welcome back
// //         </h2>
// //         <p className="text-center text-lg text-gray-600 mb-8">
// //           Sign in to your account to continue
// //         </p>
// //       </div>

// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-10 shadow-xl rounded-lg">
// //           <Formik
// //             initialValues={{
// //               email: '',
// //               password: '',
// //             }}
// //             onSubmit={handleLogin}
// //           >
// //             {({ isSubmitting }) => (
// //               <Form className="space-y-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Email address
// //                   </label>
// //                   <Field
// //                     name="email"
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Password
// //                   </label>
// //                   <Field
// //                     name="password"
// //                     type="password"
// //                     placeholder="••••••••"
// //                     className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 <div className="flex items-center justify-between">
// //                   <div className="text-sm">
// //                     <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
// //                       Forgot your password?
// //                     </Link>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <button
// //                     type="submit"
// //                     disabled={isSubmitting}
// //                     className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //                   >
// //                     {isSubmitting ? 'Signing in...' : 'Sign in'}
// //                   </button>
// //                 </div>

// //                 <div className="text-center mt-6">
// //                   <p className="text-sm text-gray-600">
// //                     Don't have an account?{' '}
// //                     <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
// //                       Sign up
// //                     </Link>
// //                   </p>
// //                 </div>
// //               </Form>
// //             )}
// //           </Formik>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;

// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate, Link } from 'react-router-dom';
// import { Database, Lock, Mail, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);

//   // Your exact original logic - unchanged
//   const handleLogin = async (values, { setSubmitting }) => {
//     try {
//       const response = await axios.post('http://localhost:5050/v1/auth/login', values);
      
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('userId', response.data.userId);
//         toast.success('Login successful');
//         navigate('/');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       {/* Header Section */}
//       <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
//         <div className="flex justify-center mb-6">
//           <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//             <Database className="h-8 w-8 text-white" />
//           </div>
//         </div>
//         <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-center text-lg text-gray-600 mb-2">
//           Sign in to DDAS Portal
//         </p>
//         <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
//           <Shield className="w-4 h-4" />
//           <span>Secure Data Management System</span>
//         </div>
//       </div>

//       {/* Login Form */}
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
//         <div className="bg-white/80 backdrop-blur-xl py-10 px-10 shadow-2xl rounded-2xl border border-white/20 relative overflow-hidden">
//           {/* Subtle gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
          
//           <div className="relative">
//             <Formik
//               initialValues={{
//                 email: '',
//                 password: '',
//               }}
//               onSubmit={handleLogin}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-6">
//                   {/* Email Field */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Email address
//                     </label>
//                     <div className="relative group">
//                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                       </div>
//                       <Field
//                         name="email"
//                         type="email"
//                         placeholder="Enter your email"
//                         className="block w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Password
//                     </label>
//                     <div className="relative group">
//                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//                       </div>
//                       <Field
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="••••••••"
//                         className="block w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                       >
//                         {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Forgot Password Link */}
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm">
//                       <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 flex items-center group">
//                         Forgot your password?
//                         <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div>
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl transition-all duration-300"
//                     >
//                       {isSubmitting ? (
//                         <div className="flex items-center space-x-2">
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                           <span>Signing in...</span>
//                         </div>
//                       ) : (
//                         <div className="flex items-center space-x-2">
//                           <span>Sign in</span>
//                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
//                         </div>
//                       )}
//                     </button>
//                   </div>

//                   {/* Sign Up Link */}
//                   <div className="text-center pt-4 border-t border-gray-200">
//                     <p className="text-sm text-gray-600">
//                       Don't have an account?{' '}
//                       <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
//                         Sign up
//                       </Link>
//                     </p>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100/80 backdrop-blur-sm text-green-800 rounded-full text-sm font-medium border border-green-200">
//             <Shield className="w-4 h-4 mr-2" />
//             Protected by enterprise-grade security
//           </div>
//         </div>
//       </div>

//       {/* Bottom Decoration */}
//       <div className="mt-8 text-center relative z-10">
//         <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
//           <span>© 2025 DDAS</span>
//           <span>•</span>
//           <a href="#" className="hover:text-gray-700 transition-colors duration-200">Privacy</a>
//           <span>•</span>
//           <a href="#" className="hover:text-gray-700 transition-colors duration-200">Terms</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Database, Lock, Mail, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // Your exact original logic - unchanged
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5050/v1/auth/login', values);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        toast.success('Login successful');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Database className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-lg text-gray-600 mb-2">
          Sign in to DDAS Portal
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Secure Data Management System</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-10 shadow-2xl rounded-2xl border border-white/20 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
          
          <div className="relative">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                      </div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="block w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                      </div>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 flex items-center group">
                        Forgot your password?
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Sign in</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100/80 backdrop-blur-sm text-green-800 rounded-full text-sm font-medium border border-green-200">
            <Shield className="w-4 h-4 mr-2" />
            Protected by enterprise-grade security
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-8 text-center relative z-10">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span>© 2025 DDAS</span>
          <span>•</span>
          <a href="#" className="hover:text-gray-700 transition-colors duration-200">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-700 transition-colors duration-200">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;