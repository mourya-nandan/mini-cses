import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProblemDetail() {
  const { id } = useParams();

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Problem Statement Column */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-4">
        <div className="bg-white dark:bg-cses-darker rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Weird Algorithm</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              Consider an algorithm that takes as input a positive integer n. If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one. The algorithm repeats this, until n is one. For example, the sequence for n=3 is as follows:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg my-4 font-mono text-sm">
              {'3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1'}
            </pre>
            <p className="text-gray-600 dark:text-gray-300">
              Your task is to simulate the execution of the algorithm for a given value of n.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">Input</h3>
            <p className="text-gray-600 dark:text-gray-300">The only input line contains an integer n.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">Output</h3>
            <p className="text-gray-600 dark:text-gray-300">Print a line that contains all values of n during the algorithm.</p>
          </div>
        </div>
      </div>

      {/* Editor/Submit Column */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white dark:bg-cses-darker rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
            <span className="font-mono text-sm font-bold text-gray-600 dark:text-gray-300">main.cpp</span>
            <button className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
              C++ 17
            </button>
          </div>
          <textarea 
            className="flex-1 w-full bg-gray-50 dark:bg-[#1e1e1e] p-4 font-mono text-sm resize-none focus:outline-none text-gray-800 dark:text-gray-200"
            placeholder="// Write your code here..."
            spellCheck="false"
          ></textarea>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
