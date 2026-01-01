import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import config from '../config';

export default function ProblemSet() 
{
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.API_URL}/problems`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch problems", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
     return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CSES Problem Set</h1>
        <div className="flex gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total: {problems.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-cses-darker rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
          {problems.map((prob) => (
            <Link 
              key={prob.id} 
              to={`/problems/${prob.id}`}
              className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 grouo-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prob.title}
                  </h3>
                  {/* Defaulting category for now since it's not in DB yet */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">Introductory</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Easy
              </span>
            </Link>
          ))}
          {problems.length === 0 && (
             <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No problems found in the database.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
