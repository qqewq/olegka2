import React from 'react';
import { Activity, Dna, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Dna className="h-8 w-8 text-cyan-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Regenerative Health Simulator
          </h1>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Activity className="h-8 w-8 text-emerald-300" />
          </div>
        </div>
        <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
          Advanced combinatorial algorithms for modeling radical health regeneration pathways
        </p>
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-blue-200">Quantum-Enhanced</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-300" />
            <span className="text-blue-200">Real-time Analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
};