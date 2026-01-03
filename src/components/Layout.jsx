import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../hooks/useTheme';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Check if we are on a problem detail page or problem set page
  const isProblemDetailPage = location.pathname.startsWith('/problems/') && location.pathname.split('/').length === 3;
  const isProblemSetPage = location.pathname === '/problems' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cses-dark text-gray-900 dark:text-cses-text transition-colors duration-300 font-sans">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={`${
        isProblemDetailPage 
          ? 'w-full px-2 py-2 h-[calc(100vh-4rem)] overflow-hidden' 
          : isProblemSetPage
            ? 'w-full px-4 sm:px-6 lg:px-8 py-8' // Full width for ProblemSet
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
      }`}>
        <Outlet />
      </main>
    </div>
  );
}
