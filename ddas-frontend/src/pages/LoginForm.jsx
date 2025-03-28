import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/auth/login', values);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        toast.success('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-2">
          Welcome back
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Sign in to your account to continue
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-xl rounded-lg">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Sign up
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;