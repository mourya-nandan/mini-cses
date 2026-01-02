import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for Phase 4.2 (Auth)
    alert(`Login attempted for: ${email}\n(Backend Auth not connected yet as per instructions)`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-cses-darker p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account to continue practicing
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <ArrowRight className="h-4 w-4 text-blue-300 group-hover:text-blue-200" />
            </span>
            Sign in
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Don't have an account? </span>
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
