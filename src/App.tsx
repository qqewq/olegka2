import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ParameterInput } from './components/ParameterInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TECHNOLOGIES, DAMAGE_TYPES, FUNDAMENTAL_CONSTANTS } from './data/constants';
import { RegenerationCalculator } from './utils/calculations';
import { Technology, DamageType, SimulationResult } from './types';
import { Play, Download, RefreshCw } from 'lucide-react';

function App() {
  const [selectedDamageType, setSelectedDamageType] = useState<DamageType | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);
  const [constantValues, setConstantValues] = useState<Record<string, number>>(
    FUNDAMENTAL_CONSTANTS.reduce((acc, constant) => {
      acc[constant.id] = constant.value;
      return acc;
    }, {} as Record<string, number>)
  );
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iterations, setIterations] = useState(100);

  const handleDamageTypeChange = useCallback((damageType: DamageType) => {
    setSelectedDamageType(damageType);
    setResults(null);
  }, []);

  const handleTechnologyToggle = useCallback((technology: Technology) => {
    setSelectedTechnologies(prev => {
      const isSelected = prev.some(tech => tech.id === technology.id);
      if (isSelected) {
        return prev.filter(tech => tech.id !== technology.id);
      } else {
        return [...prev, technology];
      }
    });
    setResults(null);
  }, []);

  const handleConstantChange = useCallback((constantId: string, value: number) => {
    setConstantValues(prev => ({
      ...prev,
      [constantId]: value
    }));
    setResults(null);
  }, []);

  const runSimulation = useCallback(async () => {
    if (!selectedDamageType || selectedTechnologies.length === 0) {
      alert('Please select a damage type and at least one technology.');
      return;
    }

    setIsLoading(true);
    setResults(null);

    // Simulate processing time for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const simulationResults = RegenerationCalculator.calculateOptimalCombination({
        damageType: selectedDamageType,
        selectedTechnologies,
        constants: constantValues,
        iterations
      });

      setResults(simulationResults);
    } catch (error) {
      console.error('Simulation error:', error);
      alert('An error occurred during simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDamageType, selectedTechnologies, constantValues, iterations]);

  const exportResults = useCallback(() => {
    if (!results) return;

    const exportData = {
      timestamp: new Date().toISOString(),
      parameters: {
        damageType: selectedDamageType?.name,
        technologies: selectedTechnologies.map(tech => tech.name),
        constants: constantValues,
        iterations
      },
      results: {
        optimalProbability: results.totalProbability,
        optimalCombination: results.optimalCombination.map(tech => tech.name),
        confidenceInterval: results.confidenceInterval,
        recommendations: results.recommendations
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `regeneration-simulation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [results, selectedDamageType, selectedTechnologies, constantValues, iterations]);

  const resetSimulation = useCallback(() => {
    setSelectedDamageType(null);
    setSelectedTechnologies([]);
    setConstantValues(
      FUNDAMENTAL_CONSTANTS.reduce((acc, constant) => {
        acc[constant.id] = constant.value;
        return acc;
      }, {} as Record<string, number>)
    );
    setResults(null);
    setIterations(100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Parameters */}
          <div className="lg:col-span-1 space-y-6">
            <ParameterInput
              damageTypes={DAMAGE_TYPES}
              technologies={TECHNOLOGIES}
              constants={FUNDAMENTAL_CONSTANTS}
              selectedDamageType={selectedDamageType}
              selectedTechnologies={selectedTechnologies}
              constantValues={constantValues}
              onDamageTypeChange={handleDamageTypeChange}
              onTechnologyToggle={handleTechnologyToggle}
              onConstantChange={handleConstantChange}
            />

            {/* Simulation Controls */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Simulation Controls</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Monte Carlo Iterations
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={iterations}
                    onChange={(e) => setIterations(parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={runSimulation}
                    disabled={!selectedDamageType || selectedTechnologies.length === 0 || isLoading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  >
                    <Play className="h-5 w-5" />
                    <span>{isLoading ? 'Running...' : 'Run Simulation'}</span>
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={exportResults}
                      disabled={!results}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>

                    <button
                      onClick={resetSimulation}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 text-center py-6 mt-12">
        <p className="text-gray-400">
          Advanced Health Regeneration Simulator • Powered by Combinatorial Algorithms & AI
        </p>
      </footer>
    </div>
  );
}

export default App;