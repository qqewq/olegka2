import { Technology, DamageType, FundamentalConstant } from '../types';

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'telomerase',
    name: 'Telomerase Activation',
    probability: 0.20,
    description: 'Reactivates telomerase to extend cellular lifespan',
    category: 'biological'
  },
  {
    id: 'stem-cells',
    name: 'Stem Cell Regeneration',
    probability: 0.35,
    description: 'Enhances stem cell proliferation and differentiation',
    category: 'biological'
  },
  {
    id: 'entropy-reversal',
    name: 'Entropy Reversal',
    probability: 0.25,
    description: 'Reverses entropy at the microscopic level',
    category: 'physics'
  },
  {
    id: 'cancer-elimination',
    name: 'Cancer Cell Elimination',
    probability: 0.30,
    description: 'Targeted destruction of malignant cells',
    category: 'biological'
  },
  {
    id: 'nanobots',
    name: 'Tissue Repair Nanobots',
    probability: 0.40,
    description: 'Microscopic robots for cellular repair',
    category: 'nanotechnology'
  },
  {
    id: 'quantum-consciousness',
    name: 'Quantum Consciousness Transfer',
    probability: 0.45,
    description: 'Quantum teleportation of consciousness',
    category: 'quantum'
  },
  {
    id: 'space-topology',
    name: 'Space Topology Modification',
    probability: 0.15,
    description: 'Alters the topology of spacetime',
    category: 'physics'
  },
  {
    id: 'variable-light-speed',
    name: 'Variable Speed of Light',
    probability: 0.22,
    description: 'Manipulates fundamental constant c',
    category: 'physics'
  }
];

export const DAMAGE_TYPES: DamageType[] = [
  {
    id: 'cancer',
    name: 'Cancer',
    baseProbability: 0.30,
    description: 'Malignant cellular growth requiring elimination',
    severity: 'critical'
  },
  {
    id: 'neurodegeneration',
    name: 'Neurodegeneration',
    baseProbability: 0.20,
    description: 'Progressive loss of neuronal structure and function',
    severity: 'high'
  },
  {
    id: 'burns',
    name: 'Severe Burns',
    baseProbability: 0.40,
    description: 'Extensive tissue damage from thermal injury',
    severity: 'high'
  },
  {
    id: 'aging',
    name: 'Aging Process',
    baseProbability: 0.15,
    description: 'Natural cellular deterioration over time',
    severity: 'medium'
  },
  {
    id: 'genetic-disorder',
    name: 'Genetic Disorder',
    baseProbability: 0.10,
    description: 'Hereditary genetic abnormalities',
    severity: 'critical'
  },
  {
    id: 'organ-failure',
    name: 'Organ Failure',
    baseProbability: 0.25,
    description: 'Complete loss of organ function',
    severity: 'critical'
  }
];

export const FUNDAMENTAL_CONSTANTS: FundamentalConstant[] = [
  {
    id: 'telomere-length',
    name: 'Telomere Length',
    value: 80,
    min: 0,
    max: 100,
    unit: '%',
    impact: 'positive'
  },
  {
    id: 'entropy',
    name: 'Entropy Level',
    value: 0.3,
    min: 0,
    max: 1,
    unit: 'S/k',
    impact: 'negative'
  },
  {
    id: 'cellular-energy',
    name: 'Cellular Energy',
    value: 0.7,
    min: 0,
    max: 1,
    unit: 'ATP',
    impact: 'positive'
  },
  {
    id: 'immune-response',
    name: 'Immune Response',
    value: 0.6,
    min: 0,
    max: 1,
    unit: 'IR',
    impact: 'positive'
  },
  {
    id: 'dna-repair',
    name: 'DNA Repair Efficiency',
    value: 0.8,
    min: 0,
    max: 1,
    unit: 'RE',
    impact: 'positive'
  }
];