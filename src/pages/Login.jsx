import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, Eye, EyeOff, Github, AlertCircle, AtSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
    />
  </svg>
);

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Store error messages
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For username, prevent spaces automatically
    const cleanValue = name === 'username' ? value.replace(/\s/g, '').toLowerCase() : value;
    
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
    setError(''); 
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
    setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Validation
        if (formData.password !== formData.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        if (formData.username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }
        await signup(formData.username, formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/'); // Redirect on success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const SocialButtons = () => (
    <div className="flex space-x-4 mb-6">
      <button 
        type="button"
        className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Sign in with Google"
      >
        <GoogleIcon />
      </button>
      <button 
        type="button"
        className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Sign in with GitHub"
      >
        <Github className="h-5 w-5" />
      </button>
    </div>
  );

  const Separator = () => (
    <div className="flex items-center w-full mb-6">
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
      <span className="px-4 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">or use email</span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );

  const ErrorMessage = () => (
    error && (
      <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-2 text-red-600 dark:text-red-300 text-sm animate-shake">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{error}</span>
      </div>
    )
  );

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 transition-colors duration-300">
      
      {/* Main Card Container */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl min-h-[550px] overflow-hidden transition-all duration-500 border border-gray-100 dark:border-gray-700">
        
        {/* Sign Up Form Container */}
        <div 
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out z-20 
          ${isSignUp ? 'left-1/2 opacity-100 visible' : 'left-0 opacity-0 invisible pointer-events-none'}`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full px-10 bg-white dark:bg-gray-800 text-center py-8">
            <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Create Account</h1>
            <SocialButtons />
            <Separator />
            <ErrorMessage />
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-2.5 pl-9 pr-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  required 
                />
              </div>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-2.5 pl-9 pr-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  required 
                />
              </div>
              <div className="relative md:col-span-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-2.5 pl-9 pr-4 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  required 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-2.5 pl-9 pr-10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-2.5 pl-9 pr-10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-6 bg-blue-600 dark:bg-indigo-600 hover:bg-blue-700 dark:hover:bg-indigo-700 text-white font-bold py-2.5 px-10 rounded-full uppercase tracking-wider text-xs transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-500/30"
            >
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In Form Container */}
        <div 
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out z-20 
          ${isSignUp ? 'left-full opacity-0 invisible pointer-events-none' : 'left-0 opacity-100 visible'}`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-full px-10 bg-white dark:bg-gray-800 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Sign in</h1>
            <SocialButtons />
            <Separator />
            <ErrorMessage />
            
            <div className="w-full space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-3 pl-10 pr-4 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 transition-all"
                  required 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 dark:bg-gray-700/50 border border-transparent dark:border-gray-600 outline-none text-gray-800 dark:text-gray-200 py-3 pl-10 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 transition-all"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 dark:hover:text-indigo-400 focus:outline-none transition-colors"
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 mt-4 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors">Forgot your password?</a>

            <button 
              type="submit"
              disabled={isLoading} 
              className="mt-8 bg-blue-600 dark:bg-indigo-600 hover:bg-blue-700 dark:hover:bg-indigo-700 text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center shadow-lg shadow-blue-500/30 dark:shadow-indigo-500/20"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Overlay Container (The Sliding Part) */}
        <div 
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30
          ${isSignUp ? '-translate-x-full rounded-r-2xl' : 'rounded-l-2xl'}`}
        >
          <div 
            className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-indigo-900 dark:to-slate-900 text-white transform transition-transform duration-700 ease-in-out
            ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}
          >
            {/* Left Overlay Panel (Visible on Sign Up) */}
            <div className="absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center translate-x-0 transition-transform duration-700 ease-in-out">
              <h1 className="text-4xl font-bold mb-6">Hello, Friend!</h1>
              <p className="text-lg mb-10 font-light text-blue-100 dark:text-indigo-100">Enter your details and start your coding journey with us today</p>
              <button 
                onClick={toggleMode}
                className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white hover:text-blue-600 dark:hover:text-indigo-900 transition-all transform active:scale-95"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel (Visible on Sign In) */}
            <div className="absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center translate-x-0 transition-transform duration-700 ease-in-out">
              <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-lg mb-10 font-light text-blue-100 dark:text-indigo-100">Ready to solve more problems? Log in to pick up where you left off</p>
              <button 
                onClick={toggleMode}
                className="bg-transparent border-2 border-white/50 hover:border-white text-white font-bold py-3 px-12 rounded-full uppercase tracking-wider hover:bg-white hover:text-blue-600 dark:hover:text-indigo-900 transition-all transform active:scale-95"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;