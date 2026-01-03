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
  ArrowRight,
  Trophy,
  Target
} from 'lucide-react';
import config from '../config';

const ProblemStats = ({ solved, total }) => {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-500" />
          Progress
        </h3>
        <Trophy className="h-4 w-4 text-amber-500" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {solved}
          </div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 pb-1">
            of {total} solved
          </div>
        </div>
        
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
          <span className="text-slate-400">{percentage}% COMPLETE</span>
          <span className="text-blue-500 dark:text-blue-400">{total - solved} REMAINING</span>
        </div>
      </div>
    </div>
  );
};

export default function ProblemSet() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedCount, setSolvedCount] = useState(0); // Mocked for now
  
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

  useEffect(() => {
    fetchProblems();
  }, [page, debouncedSearch, category, difficulty]);

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
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Tharka Problem Set
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 mt-4">
            Curated algorithmic challenges for competitive programming mastery.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">
            <ProblemStats solved={solvedCount} total={totalProblemsCount} />
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24 p-4">
              <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
                Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={(e) => handleCategoryClick(e, cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 group ${
                      category === cat.id 
                        ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <cat.icon className={`h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110 ${cat.color}`} />
                    <span>{cat.name}</span>
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
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-sm border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-blue-200 dark:focus:border-blue-800 focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400 dark:text-white transition-all"
                    />
                 </div>
                 <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1"></div>
                 <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="bg-transparent dark:bg-slate-900 text-sm font-medium text-slate-600 dark:text-slate-300 border-0 focus:ring-0 cursor-pointer pr-8"
                  >
                    <option value="" className="dark:bg-slate-900">Difficulty</option>
                    <option value="easy" className="dark:bg-slate-900">Easy</option>
                    <option value="medium" className="dark:bg-slate-900">Medium</option>
                    <option value="hard" className="dark:bg-slate-900">Hard</option>
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
                              <span className="text-lg font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {problem.title}
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
