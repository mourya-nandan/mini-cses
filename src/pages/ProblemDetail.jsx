import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import config from '../config';

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`);
  const [result, setResult] = useState(null);
  // Get theme from local storage or default to dark
  const currentTheme = document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light';

  useEffect(() => {
    fetch(`${config.API_URL}/problems/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
           setProblem({ 
               title: "Error Loading Problem", 
               description: "Could not load problem. Ensure backend is running and seeded." 
           });
        } else {
           setProblem(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch problem", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch(`${config.API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: id, code })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ status: "Error", message: "Failed to connect to server." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Problem Statement Column */}
      <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-4">
        <div className="bg-white dark:bg-cses-darker rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{problem?.title || "Problem Not Found"}</h1>
          
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-gray-600 dark:text-gray-300">
            {problem?.description}
          </div>

          {/* Example Test Cases */}
          {problem?.examples && problem.examples.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Example Test Cases</h3>
              <div className="grid gap-4">
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-black/20 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Input</span>
                        <pre className="mt-1 font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-black/20 p-2 rounded border border-gray-200 dark:border-gray-800">
                          {ex.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Output</span>
                        <pre className="mt-1 font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-black/20 p-2 rounded border border-gray-200 dark:border-gray-800">
                          {ex.output}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Area */}
        {result && (
          <div className={`rounded-xl p-6 border ${
            result.status === 'Accepted' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 
            result.status === 'Compilation Error' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
            'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              {result.status === 'Accepted' && <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
              {result.status === 'Compilation Error' && <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
              {(result.status === 'Wrong Answer' || result.status === 'Error') && <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{result.status}</h3>
            </div>
            
            {result.message && (
              <pre className="bg-black/5 dark:bg-black/30 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {result.message}
              </pre>
            )}

            {result.results && (
              <div className="space-y-2">
                {result.results.map((res, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-white/50 dark:bg-black/20">
                    <span className="font-mono">Test Case #{idx + 1}</span>
                    <span className={`font-bold ${res.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {res.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme={currentTheme}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 fill-current" />
                  Submit Solution
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
