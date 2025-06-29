export interface Technology {
  id: string;
  name: string;
  probability: number;
  description: string;
  category: 'biological' | 'nanotechnology' | 'quantum' | 'physics';
}

export interface DamageType {
  id: string;
  name: string;
  baseProbability: number;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface FundamentalConstant {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface SimulationResult {
  totalProbability: number;
  optimalCombination: Technology[];
  allCombinations: Array<{
    technologies: Technology[];
    probability: number;
    efficiency: number;
  }>;
  recommendations: string[];
  confidenceInterval: [number, number];
}

export interface SimulationParameters {
  damageType: DamageType;
  selectedTechnologies: Technology[];
  constants: Record<string, number>;
  iterations: number;
}