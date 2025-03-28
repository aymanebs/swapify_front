import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { googleLogin, login } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/usersSlice';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [effect, setEffect] = useState(false);
  const token = searchParams.get('token');
  const [errors, setErrors] = useState({});


      useEffect(()=>{
        function handleGoogleLogin(){
          if(token){
            dispatch(setLogin(token));
            window.history.replaceState(null, '', window.location.pathname);
    
          }
        }
        handleGoogleLogin();
      },[token])
    
      const validateForm = () => {
        const newErrors = {};
    
        if (!email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = 'Invalid email address';
        }
    
        if (!password.trim()) {
          newErrors.password = 'Password is required';
        } else if (password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
      };



  const handleLogin = async(e) => {
    e.preventDefault();
    if(! validateForm()) return;
    setIsLoading(true);
    try{
      const formData = {email,password};
      const access_token = await login(formData);
      if(access_token){
        dispatch(setLogin(access_token));
        onClose();
        toast.success('Logged in',{theme: "colored"});
      }
    
    }
    catch(error){
      console.error('failed to login: ',error);
      toast.error('Failed to log',{theme: "colored"});
    }
    finally{
      setIsLoading(false);
    }

   
  };

  const handleGoogleLogin = async () => {

    window.location.href = 'http://localhost:3000/auth/google/login';
    // window.location.reload();
    // navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Log in to your account</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-3 mb-5 text-gray-700 transition bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink px-3 text-sm text-gray-500">or continue with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="you@example.com"
              
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-sky-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="••••••••"
              
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white transition bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-sky-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;