import React from 'react';
import { ArrowRight, Trophy, Users, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Master Algorithms with <span className="text-blue-600 dark:text-blue-500">Tharka</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A modern, beautiful platform for competitive programming. Solve problems, track progress, and improve your coding skills.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/problems"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            Start Solving <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Stats/Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Code className="h-8 w-8 text-blue-500" />}
          title="300+ Problems"
          desc="Curated collection of algorithmic challenges from beginner to advanced."
        />
        <FeatureCard 
          icon={<Users className="h-8 w-8 text-green-500" />}
          title="Community"
          desc="Join thousands of developers solving and discussing solutions."
        />
        <FeatureCard 
          icon={<Trophy className="h-8 w-8 text-yellow-500" />}
          title="Leaderboards"
          desc="Compete with friends and track your global ranking."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-cses-darker border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}
