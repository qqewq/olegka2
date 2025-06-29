import React from 'react';
import { Technology, DamageType, FundamentalConstant } from '../types';
import { ChevronDown, Info } from 'lucide-react';

interface ParameterInputProps {
  damageTypes: DamageType[];
  technologies: Technology[];
  constants: FundamentalConstant[];
  selectedDamageType: DamageType | null;
  selectedTechnologies: Technology[];
  constantValues: Record<string, number>;
  onDamageTypeChange: (damageType: DamageType) => void;
  onTechnologyToggle: (technology: Technology) => void;
  onConstantChange: (constantId: string, value: number) => void;
}

export const ParameterInput: React.FC<ParameterInputProps> = ({
  damageTypes,
  technologies,
  constants,
  selectedDamageType,
  selectedTechnologies,
  constantValues,
  onDamageTypeChange,
  onTechnologyToggle,
  onConstantChange
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'biological': return 'bg-emerald-500';
      case 'nanotechnology': return 'bg-purple-500';
      case 'quantum': return 'bg-blue-500';
      case 'physics': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Damage Type Selection */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-300" />
          Damage Type & Condition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {damageTypes.map((damage) => (
            <div
              key={damage.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedDamageType?.id === damage.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
              onClick={() => onDamageTypeChange(damage)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{damage.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getSeverityColor(damage.severity)}`}>
                  {damage.severity}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{damage.description}</p>
              <div className="text-xs text-blue-300">
                Base Probability: {(damage.baseProbability * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Selection */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">
          Available Technologies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedTechnologies.some(t => t.id === tech.id)
                  ? 'border-green-400 bg-green-500/20'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
              onClick={() => onTechnologyToggle(tech)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{tech.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(tech.category)}`}>
                  {tech.category}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{tech.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300">
                  Success Rate: {(tech.probability * 100).toFixed(1)}%
                </span>
                <div className={`w-4 h-4 rounded border-2 ${
                  selectedTechnologies.some(t => t.id === tech.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/40'
                }`}>
                  {selectedTechnologies.some(t => t.id === tech.id) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fundamental Constants */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">
          Fundamental Constants
        </h3>
        <div className="space-y-6">
          {constants.map((constant) => (
            <div key={constant.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">{constant.name}</label>
                <span className="text-blue-300 text-sm">
                  {constantValues[constant.id]?.toFixed(2) || constant.value.toFixed(2)} {constant.unit}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={constant.min}
                  max={constant.max}
                  step={constant.max > 1 ? 1 : 0.01}
                  value={constantValues[constant.id] || constant.value}
                  onChange={(e) => onConstantChange(constant.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div 
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg pointer-events-none"
                  style={{ 
                    width: `${((constantValues[constant.id] || constant.value) - constant.min) / (constant.max - constant.min) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{constant.min} {constant.unit}</span>
                <span>{constant.max} {constant.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};