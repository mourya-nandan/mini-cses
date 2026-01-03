import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  Loader2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  PlayCircle,
  ListOrdered,
  Share2,
  BarChart2,
  Trees,
  Calculator,
  Type,
  Hexagon,
  Rocket,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import config from '../config';

export default function ProblemSet() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState(''); 
  const [debouncedSearch, setDebouncedSearch] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [difficulty, setDifficulty] = useState('');
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProblemsCount, setTotalProblemsCount] = useState(0); 
  const limit = 10; 

  // Categories Definition
  const categories = [
    { id: "introductory", name: "Introductory Problems", icon: PlayCircle, color: "text-blue-500" },
    { id: "sorting", name: "Sorting and Searching", icon: ListOrdered, color: "text-emerald-500" },
    { id: "dynamic programming", name: "Dynamic Programming", icon: Share2, color: "text-purple-500" },
    { id: "graph", name: "Graph Algorithms", icon: Share2, color: "text-rose-500" },
    { id: "range", name: "Range Queries", icon: BarChart2, color: "text-amber-500" },
    { id: "tree", name: "Tree Algorithms", icon: Trees, color: "text-indigo-500" },
    { id: "math", name: "Mathematics", icon: Calculator, color: "text-pink-500" },
    { id: "string", name: "String Algorithms", icon: Type, color: "text-cyan-500" },
    { id: "geometry", name: "Geometry", icon: Hexagon, color: "text-orange-500" },
    { id: "advanced", name: "Advanced Techniques", icon: Rocket, color: "text-slate-500" }
  ];

  const currentCategory = categories.find(c => c.id === category) || { name: "All Problems", description: "Browse the complete collection of algorithmic challenges." };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 300); 

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
        setTotalProblemsCount(data.pagination.total);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch problems", err);
        setLoading(false);
      });
  };

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    setCategory(catId === category ? '' : catId); 
    setPage(1);
  };

  const getDifficultyBadge = (diff) => {
    const classes = {
      easy: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
      medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
      hard: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800'
    };
    return classes[diff?.toLowerCase()] || classes.easy;
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Problem Set</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
            Curated algorithmic challenges for competitive programming mastery.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24 p-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={(e) => handleCategoryClick(e, cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      category === cat.id 
                        ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <cat.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${category === cat.id ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-500'}`} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </nav>

              {/* Resources Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                 <a href="#" className="flex items-center gap-3 px-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                   <BookOpen className="h-4 w-4" />
                   <span>Documentation & Guide</span>
                 </a>
              </div>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            
            {/* Toolbar */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-3 w-full sm:w-auto px-2">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {currentCategory.name === "All Problems" ? "All Problems" : currentCategory.name}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {totalProblemsCount}
                  </span>
               </div>

               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="relative flex-1 sm:w-64 group">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-sm border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400 dark:text-white transition-all"
                    />
                 </div>
                 <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1"></div>
                 <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 border-0 focus:ring-0 cursor-pointer pr-8"
                  >
                    <option value="">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
               </div>
            </div>
            
            {/* Problems List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left whitespace-nowrap">
                  <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-semibold">
                    <tr>
                      <th scope="col" className="px-6 py-4 w-20 text-center">ID</th>
                      <th scope="col" className="px-6 py-4">Title</th>
                      <th scope="col" className="px-6 py-4 w-32">Difficulty</th>
                      <th scope="col" className="px-6 py-4 w-48 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                       <tr>
                         <td colSpan="4" className="px-6 py-12 text-center">
                           <div className="flex flex-col items-center justify-center gap-2">
                             <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
                             <span className="text-slate-500">Loading problems...</span>
                           </div>
                         </td>
                       </tr>
                    ) : problems.length > 0 ? (
                      problems.map((problem) => (
                        <tr 
                          key={problem.id} 
                          className="group hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/problems/${problem.id}`)}
                        >
                          <td className="px-6 py-4 text-center font-mono text-base text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                            {problem.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-base font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {problem.title}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-500 capitalize mt-1">
                                {problem.category?.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyBadge(problem.difficulty)}`}>
                              {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                <Circle className="h-5 w-5 mr-2 stroke-2" />
                                <span className="text-sm font-medium">Not Started</span>
                             </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                           No problems found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}