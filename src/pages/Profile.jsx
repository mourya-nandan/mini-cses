import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Trophy, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-[#111] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#1e1e1e] shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          
          {/* Header / Cover */}
          <div className="bg-blue-600 dark:bg-blue-900/50 h-32 w-full"></div>
          
          <div className="px-6 pb-6 relative">
            {/* Avatar & Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6 gap-4">
               <div className="h-24 w-24 rounded-full bg-white dark:bg-[#262626] p-1 shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-500 border border-gray-100 dark:border-gray-700">
                  {user.username.charAt(0).toUpperCase()}
               </div>
               <div className="flex-1 text-center sm:text-left mb-2">
                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                   {user.username}
                   {user.role === 'admin' && <Shield className="h-5 w-5 text-red-500" />}
                 </h1>
                 <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-1">
                   <Mail className="h-3 w-3" /> {user.email}
                 </p>
               </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="bg-gray-50 dark:bg-[#262626] p-4 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.solvedCount || 0}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Problems Solved</div>
                  </div>
               </div>

               <div className="bg-gray-50 dark:bg-[#262626] p-4 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">{user.role}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Account Role</div>
                  </div>
               </div>

               <div className="bg-gray-50 dark:bg-[#262626] p-4 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Active</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Account Status</div>
                  </div>
               </div>
            </div>

            {/* Recent Activity (Placeholder) */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="bg-gray-50 dark:bg-[#262626] rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-400">
                 No recent activity to show.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;