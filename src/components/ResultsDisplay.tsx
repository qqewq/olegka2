import React from 'react';
import { SimulationResult } from '../types';
import { TrendingUp, Award, Target, AlertCircle, CheckCircle } from 'lucide-react';

interface ResultsDisplayProps {
  results: SimulationResult | null;
  isLoading: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="text-white text-lg">Running advanced simulation...</span>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Select parameters and run simulation to see results</p>
      </div>
    );
  }

  const probabilityPercentage = (results.totalProbability * 100).toFixed(1);
  const confidenceLower = (results.confidenceInterval[0] * 100).toFixed(1);
  const confidenceUpper = (results.confidenceInterval[1] * 100).toFixed(1);

  const getProbabilityColor = (prob: number) => {
    if (prob >= 0.8) return 'text-green-400';
    if (prob >= 0.6) return 'text-yellow-400';
    if (prob >= 0.4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProbabilityBg = (prob: number) => {
    if (prob >= 0.8) return 'bg-green-500/20 border-green-500/30';
    if (prob >= 0.6) return 'bg-yellow-500/20 border-yellow-500/30';
    if (prob >= 0.4) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Main Results */}
      <div className={`rounded-xl p-6 border-2 ${getProbabilityBg(results.totalProbability)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-400" />
            Optimal Regeneration Probability
          </h3>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-400 text-sm">Simulation Complete</span>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className={`text-6xl font-bold ${getProbabilityColor(results.totalProbability)} mb-2`}>
            {probabilityPercentage}%
          </div>
          <div className="text-gray-300 text-lg mb-4">
            Success Probability
          </div>
          <div className="text-sm text-gray-400">
            95% Confidence Interval: {confidenceLower}% - {confidenceUpper}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-4 mb-6">
          <div 
            className="h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${results.totalProbability * 100}%` }}
          ></div>
        </div>

        {/* Optimal Technologies */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
            Optimal Technology Combination
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.optimalCombination.map((tech) => (
              <div key={tech.id} className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{tech.name}</span>
                  <span className="text-blue-300 text-sm">
                    {(tech.probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-amber-400" />
          AI-Generated Recommendations
        </h4>
        <div className="space-y-3">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-300">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Combinations */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">
          Top Alternative Combinations
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {results.allCombinations.slice(1, 6).map((combination, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Option {index + 2}</span>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${getProbabilityColor(combination.probability)}`}>
                    {(combination.probability * 100).toFixed(1)}%
                  </span>
                  <span className="text-gray-400 text-sm">
                    Efficiency: {combination.efficiency.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {combination.technologies.map(tech => tech.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};