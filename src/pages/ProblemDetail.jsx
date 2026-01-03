import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Database, 
  ChevronLeft, 
  ChevronRight, 
  List, 
  Settings, 
  Maximize2, 
  Code2, 
  FileText, 
  MessageSquare, 
  History,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import config from '../config';

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcase');

  // Resizable layout state
  const [leftWidth, setLeftWidth] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Initial code template
  const defaultCode = `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`;

  useEffect(() => {
    // Reset state on ID change
    setProblem(null);
    setLoading(true);
    setResult(null);
    setCode(defaultCode);

    fetch(`${config.API_URL}/problems/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
           setProblem({ 
               title: "Error Loading Problem", 
               description: "Could not load problem.",
               notFound: true
           });
        } else {
           setProblem(data);
           // Could set specific language template here if available
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
    setConsoleOpen(true); // Open console to show result
    setActiveConsoleTab('result');

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

  // Dragging logic
  const startResizing = useCallback(() => setIsDragging(true), []);
  const stopResizing = useCallback(() => setIsDragging(false), []);
  const resize = useCallback((e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
    }
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const getDifficultyColor = (diff) => {
    if (!diff) return 'text-gray-500';
    switch(diff.toLowerCase()) {
        case 'easy': return 'text-emerald-500';
        case 'medium': return 'text-amber-500';
        case 'hard': return 'text-rose-500';
        default: return 'text-gray-500';
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-gray-400"><Loader2 className="animate-spin h-8 w-8" /></div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-gray-300 font-sans overflow-hidden">
      
      {/* Top Bar (LeetCode Style) */}
      <div className="h-10 bg-[#262626] border-b border-[#333] flex items-center justify-between px-4 flex-shrink-0">
         <div className="flex items-center gap-4">
            <Link to="/problems" className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm font-medium">
               <List className="h-4 w-4" />
               Problem List
            </Link>
            <div className="h-4 w-px bg-[#444]"></div>
            <div className="flex items-center gap-1">
               <button className="p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white transition-colors">
                  <ChevronLeft className="h-4 w-4" />
               </button>
               <button className="p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4" />
               </button>
            </div>
         </div>

         <div className="flex items-center gap-2">
            <button 
                onClick={() => { setConsoleOpen(true); setActiveConsoleTab('testcase'); }}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#333] hover:bg-[#444] text-gray-300 rounded text-sm font-medium transition-colors"
            >
                <Play className="h-3 w-3" /> Run
            </button>
            <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Code2 className="h-3 w-3" />}
                Submit
            </button>
         </div>
      </div>

      {/* Main Workspace */}
      <div ref={containerRef} className={`flex-1 flex overflow-hidden ${isDragging ? 'select-none cursor-col-resize' : ''}`}>
        
        {/* LEFT PANEL */}
        <div style={{ width: `${leftWidth}%` }} className="flex flex-col min-w-[300px] bg-[#262626] m-1 rounded-lg border border-[#333] overflow-hidden">
           
           {/* Left Tabs */}
           <div className="flex items-center bg-[#333] h-10 border-b border-[#333]">
              <button 
                onClick={() => setActiveTab('description')}
                className={`h-full px-4 flex items-center gap-2 text-xs font-medium border-t-2 ${activeTab === 'description' ? 'border-white bg-[#262626] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              >
                 <FileText className="h-3.5 w-3.5" /> Description
              </button>
              <button 
                onClick={() => setActiveTab('submissions')}
                className={`h-full px-4 flex items-center gap-2 text-xs font-medium border-t-2 ${activeTab === 'submissions' ? 'border-white bg-[#262626] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              >
                 <History className="h-3.5 w-3.5" /> Submissions
              </button>
           </div>

           {/* Left Content */}
           <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {activeTab === 'description' && (
                  <div className="space-y-6 font-serif">
                      {/* Codeforces Header Style */}
                      <div className="text-center border-b border-[#333] pb-6">
                          <h1 className="text-2xl font-bold text-white mb-4 tracking-wide">{problem?.title}</h1>
                          <div className="flex flex-col gap-1 text-sm text-gray-300">
                              <div><span className="font-bold">time limit per test:</span> {problem?.timeLimit ? problem.timeLimit / 1000 : 1} second</div>
                              <div><span className="font-bold">memory limit per test:</span> {problem?.memoryLimit || 256} megabytes</div>
                          </div>
                         
                      </div>

                      {/* Problem Statement */}
                      <div className="prose prose-invert max-w-none text-base text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                          {problem?.description}
                      </div>

                      {/* Input Specification */}
                      <div className="space-y-2">
                          <h3 className="text-base font-bold text-white uppercase tracking-wide">Input</h3>
                          <div className="text-sm text-gray-300 font-sans leading-relaxed">
                              {problem?.inputFormat || "The input consists of multiple lines as described in the problem statement."}
                          </div>
                      </div>

                      {/* Output Specification */}
                      <div className="space-y-2">
                          <h3 className="text-base font-bold text-white uppercase tracking-wide">Output</h3>
                          <div className="text-sm text-gray-300 font-sans leading-relaxed">
                              {problem?.outputFormat || "Print the solution."}
                          </div>
                      </div>

                      {/* Examples */}
                      <div className="space-y-4">
                          <h3 className="text-base font-bold text-white uppercase tracking-wide">Examples</h3>
                          {problem?.examples?.map((ex, idx) => (
                              <div key={idx} className="border border-[#444] rounded-sm overflow-hidden">
                                  <div className="flex border-b border-[#444] bg-[#333]">
                                      <div className="flex-1 p-1 px-3 text-xs font-bold text-white">input</div>
                                      <div className="flex-1 p-1 px-3 text-xs font-bold text-white border-l border-[#444]">output</div>
                                  </div>
                                  <div className="flex bg-[#262626]">
                                      <div className="flex-1 p-2 font-mono text-sm text-white whitespace-pre-wrap border-r border-[#444]">
                                          {ex.input}
                                      </div>
                                      <div className="flex-1 p-2 font-mono text-sm text-white whitespace-pre-wrap">
                                          {ex.output}
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>

                      {/* Note */}
                      {problem?.constraints && (
                          <div className="space-y-2 pt-4">
                             <h3 className="text-base font-bold text-white uppercase tracking-wide">Note</h3>
                             <div className="text-sm text-gray-300 font-sans">
                                {problem.constraints}
                             </div>
                          </div>
                      )}
                  </div>
              )}
              {activeTab === 'submissions' && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <History className="h-12 w-12 mb-2 opacity-20" />
                      <p className="text-sm">No submissions yet</p>
                  </div>
              )}
           </div>
        </div>

        {/* DRAG HANDLE */}
        <div 
            className="w-1.5 hover:bg-blue-600/50 cursor-col-resize flex items-center justify-center transition-colors group z-10 -mx-0.5"
            onMouseDown={startResizing}
        >
             <div className="h-8 w-1 bg-[#444] rounded-full group-hover:bg-blue-500 transition-colors" />
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col min-w-[300px] m-1 rounded-lg overflow-hidden gap-1">
            
            {/* Editor Container */}
            <div className={`flex-1 flex flex-col bg-[#262626] border border-[#333] rounded-lg overflow-hidden ${consoleOpen ? 'h-1/2' : 'h-full'}`}>
                {/* Editor Header */}
                <div className="h-10 bg-[#333] border-b border-[#333] flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-bold text-gray-300">C++</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
                        <Maximize2 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
                    </div>
                </div>
                {/* Monaco Editor */}
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        defaultLanguage="cpp"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 10 },
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        }}
                    />
                </div>
            </div>

            {/* Console / Testcase Panel */}
            {consoleOpen && (
                <div className="h-1/2 bg-[#262626] border border-[#333] rounded-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
                    {/* Console Header */}
                    <div className="h-9 bg-[#333] border-b border-[#333] flex items-center justify-between px-2">
                         <div className="flex items-center">
                             <button 
                                onClick={() => setActiveConsoleTab('testcase')}
                                className={`px-3 h-full text-xs font-bold flex items-center gap-2 ${activeConsoleTab === 'testcase' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                             >
                                <CheckCircle className="h-3.5 w-3.5" /> Testcase
                             </button>
                             <button 
                                onClick={() => setActiveConsoleTab('result')}
                                className={`px-3 h-full text-xs font-bold flex items-center gap-2 ${activeConsoleTab === 'result' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                             >
                                <Play className="h-3.5 w-3.5" /> Test Result
                             </button>
                         </div>
                         <button onClick={() => setConsoleOpen(false)} className="p-1 hover:bg-[#444] rounded text-gray-400">
                             <ChevronDown className="h-4 w-4" />
                         </button>
                    </div>

                    {/* Console Content */}
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                        {activeConsoleTab === 'testcase' && (
                             <div className="space-y-4">
                                {problem?.examples?.map((ex, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <span className="text-xs font-bold text-gray-400">Case {idx + 1}</span>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500 w-12">Input:</span>
                                                <div className="flex-1 bg-[#333] p-2 rounded text-xs font-mono text-gray-300">{ex.input}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {!problem?.examples && <p className="text-sm text-gray-500">No test cases available.</p>}
                             </div>
                        )}

                        {activeConsoleTab === 'result' && (
                            <div className="h-full">
                                {!result && !submitting && (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                                        <p>Run your code to see results</p>
                                    </div>
                                )}
                                {submitting && (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                        <span className="text-xs">Running Code...</span>
                                    </div>
                                )}
                                {result && (
                                    <div className="space-y-4">
                                        <div className={`text-lg font-bold ${
                                            result.status === 'Accepted' ? 'text-green-500' : 
                                            result.status === 'Compilation Error' ? 'text-yellow-500' : 'text-red-500'
                                        }`}>
                                            {result.status}
                                        </div>

                                        {result.message && (
                                            <div className="bg-[#333] p-3 rounded text-red-400 font-mono text-xs whitespace-pre-wrap border-l-4 border-red-500">
                                                {result.message}
                                            </div>
                                        )}

                                        {result.results && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {result.results.map((res, i) => (
                                                    <div key={i} className={`p-3 rounded border ${res.passed ? 'border-green-900 bg-green-900/20' : 'border-red-900 bg-red-900/20'}`}>
                                                        <div className="text-xs font-bold text-gray-400 mb-1">Case {i + 1}</div>
                                                        <div className={`text-sm font-bold ${res.passed ? 'text-green-500' : 'text-red-500'}`}>
                                                            {res.passed ? 'Passed' : 'Wrong Answer'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Console Toggle (If closed) */}
            {!consoleOpen && (
                <div className="h-9 bg-[#262626] border border-[#333] rounded-lg flex items-center justify-between px-4 cursor-pointer hover:bg-[#333] transition-colors" onClick={() => setConsoleOpen(true)}>
                    <span className="text-xs font-bold text-gray-400">Console</span>
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                </div>
            )}

        </div>
      </div>
    </div>
  );
}
