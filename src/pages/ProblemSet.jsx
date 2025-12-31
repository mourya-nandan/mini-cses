import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

const DUMMY_PROBLEMS = [
  { id: 1, title: 'Weird Algorithm', difficulty: 'Easy', solved: true, category: 'Introductory' },
  { id: 2, title: 'Missing Number', difficulty: 'Easy', solved: true, category: 'Introductory' },
  { id: 3, title: 'Repetitions', difficulty: 'Easy', solved: false, category: 'Introductory' },
  { id: 4, title: 'Increasing Array', difficulty: 'Medium', solved: false, category: 'Introductory' },
  { id: 5, title: 'Permutations', difficulty: 'Medium', solved: false, category: 'Introductory' },
  { id: 6, title: 'Number Spiral', difficulty: 'Hard', solved: false, category: 'Introductory' },
];

export default function ProblemSet() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CSES Problem Set</h1>
        <div className="flex gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Solved: 2/300</span>
        </div>
      </div>

      <div className="bg-white dark:bg-cses-darker rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
          {DUMMY_PROBLEMS.map((prob) => (
            <Link 
              key={prob.id} 
              to={`/problems/${prob.id}`}
              className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {prob.solved ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{prob.category}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                prob.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {prob.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
