import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Loader2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import config from '../config';

export default function ProblemSet() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState(''); // Immediate input value
  const [debouncedSearch, setDebouncedSearch] = useState(''); // Value that triggers API
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; // Show 8 problems per page

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when search changes
    }, 300); // Wait 300ms after last keystroke

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProblems();
  }, [page, debouncedSearch, category, difficulty]);

  const fetchProblems = () => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit,
      search: debouncedSearch,
      category,
      difficulty
    });

    fetch(`${config.API_URL}/problems?${params}`)
      .then(res => res.json())
      .then(data => {
        setProblems(data.problems);
        setTotalPages(data.pagination.pages);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch problems", err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setPage(1);
  };

  // REMOVED: Aggressive early-return loading check that caused focus loss

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CSES Problem Set</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-1">Master algorithms one problem at a time.</p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              value={search}
              onChange={handleSearch}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
            />
          </div>
          
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="introductory">Introductory</option>
            <option value="dynamic programming">Dynamic Programming</option>
            <option value="graph">Graph Algorithms</option>
          </select>

          <select 
            value={difficulty} 
            onChange={handleDifficultyChange}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none cursor-pointer"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-cses-darker rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
           <div className="p-12 flex justify-center">
             <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
           </div>
        ) : (
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prob.id}. {prob.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{prob.category.replace('_', ' ')}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium 
                ${prob.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                  prob.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                {prob.difficulty}
              </span>
            </Link>
          ))}
          {problems.length === 0 && (
             <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
                <Filter className="h-8 w-8 text-gray-300" />
                <p>No problems found matching your filters.</p>
             </div>
          )}
        </div>
        )}
        
        {/* Pagination Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
               Page {page} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
               <button 
                 onClick={() => setPage(p => Math.max(1, p - 1))}
                 disabled={page === 1}
                 className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <ChevronLeft className="h-5 w-5" />
               </button>
               <button 
                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                 disabled={page === totalPages}
                 className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <ChevronRight className="h-5 w-5" />
               </button>
            </div>
        </div>
      </div>
    </div>
  );
}
