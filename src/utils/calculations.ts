import { Technology, DamageType, SimulationResult, SimulationParameters } from '../types';

export class RegenerationCalculator {
  static calculateCombinationProbability(
    technologies: Technology[],
    baseProbability: number,
    constants: Record<string, number>
  ): number {
    // Base probability from damage type
    let totalProb = baseProbability;
    
    // Add technology bonuses using the formula: P_total = 1 - ∏(1 - P_i)
    const techProbabilities = technologies.map(tech => tech.probability);
    if (techProbabilities.length > 0) {
      const combinedTechProb = 1 - techProbabilities.reduce((acc, p) => acc * (1 - p), 1);
      totalProb = Math.max(totalProb, combinedTechProb);
    }
    
    // Apply fundamental constants modifiers
    const telomereFactorFunc = (length: number) => Math.min(length / 100, 1);
    const entropyPenalty = (entropy: number) => Math.max(1 - (entropy * 0.5), 0.1);
    const energyBonus = (energy: number) => 1 + (energy * 0.3);
    const immuneBonus = (immune: number) => 1 + (immune * 0.2);
    const dnaRepairBonus = (repair: number) => 1 + (repair * 0.25);
    
    const telomereFactor = telomereFactorFunc(constants['telomere-length'] || 80);
    const entropyFactor = entropyPenalty(constants['entropy'] || 0.3);
    const energyFactor = energyBonus(constants['cellular-energy'] || 0.7);
    const immuneFactor = immuneBonus(constants['immune-response'] || 0.6);
    const dnaFactor = dnaRepairBonus(constants['dna-repair'] || 0.8);
    
    // Special physics bonuses
    const hasVariableC = technologies.some(tech => tech.id === 'variable-light-speed');
    const hasQuantumTech = technologies.some(tech => tech.category === 'quantum');
    const hasPhysicsTech = technologies.some(tech => tech.category === 'physics');
    
    let physicsMultiplier = 1;
    if (hasVariableC) physicsMultiplier *= 1.2;
    if (hasQuantumTech) physicsMultiplier *= 1.15;
    if (hasPhysicsTech) physicsMultiplier *= 1.1;
    
    // Final calculation
    const finalProb = totalProb * telomereFactor * entropyFactor * energyFactor * 
                     immuneFactor * dnaFactor * physicsMultiplier;
    
    return Math.min(finalProb, 0.99); // Cap at 99%
  }
  
  static generateAllCombinations(technologies: Technology[]): Technology[][] {
    const combinations: Technology[][] = [];
    const n = technologies.length;
    
    // Generate all possible combinations (2^n - 1, excluding empty set)
    for (let i = 1; i < Math.pow(2, n); i++) {
      const combination: Technology[] = [];
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          combination.push(technologies[j]);
        }
      }
      combinations.push(combination);
    }
    
    return combinations;
  }
  
  static calculateOptimalCombination(params: SimulationParameters): SimulationResult {
    const { damageType, selectedTechnologies, constants, iterations } = params;
    
    // Generate all possible combinations
    const allCombinations = this.generateAllCombinations(selectedTechnologies);
    
    // Calculate probability for each combination
    const results = allCombinations.map(combination => {
      const probability = this.calculateCombinationProbability(
        combination, 
        damageType.baseProbability, 
        constants
      );
      
      // Calculate efficiency (probability per technology used)
      const efficiency = combination.length > 0 ? probability / combination.length : 0;
      
      return {
        technologies: combination,
        probability,
        efficiency
      };
    });
    
    // Sort by probability (descending)
    results.sort((a, b) => b.probability - a.probability);
    
    // Find optimal combination (highest probability)
    const optimalCombination = results[0]?.technologies || [];
    const totalProbability = results[0]?.probability || 0;
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(results, damageType);
    
    // Calculate confidence interval (Monte Carlo simulation)
    const confidenceInterval = this.calculateConfidenceInterval(
      optimalCombination, 
      damageType.baseProbability, 
      constants, 
      iterations
    );
    
    return {
      totalProbability,
      optimalCombination,
      allCombinations: results,
      recommendations,
      confidenceInterval
    };
  }
  
  private static generateRecommendations(
    results: Array<{ technologies: Technology[]; probability: number; efficiency: number }>,
    damageType: DamageType
  ): string[] {
    const recommendations: string[] = [];
    
    const topResult = results[0];
    if (topResult) {
      recommendations.push(
        `Optimal combination achieves ${(topResult.probability * 100).toFixed(1)}% success probability`
      );
      
      const topTechs = topResult.technologies.map(t => t.name).join(', ');
      recommendations.push(`Recommended technologies: ${topTechs}`);
      
      // Analyze efficiency
      const highEfficiencyResults = results.filter(r => r.efficiency > 0.15);
      if (highEfficiencyResults.length > 0) {
        recommendations.push(
          `Consider high-efficiency alternatives for resource optimization`
        );
      }
      
      // Damage-specific recommendations
      if (damageType.severity === 'critical') {
        recommendations.push(
          'Critical damage requires immediate intervention with highest probability technologies'
        );
      }
      
      // Technology category analysis
      const categories = topResult.technologies.map(t => t.category);
      if (categories.includes('quantum')) {
        recommendations.push('Quantum technologies provide significant probability enhancement');
      }
      if (categories.includes('nanotechnology')) {
        recommendations.push('Nanotechnology integration shows promising results');
      }
    }
    
    return recommendations;
  }
  
  private static calculateConfidenceInterval(
    technologies: Technology[],
    baseProbability: number,
    constants: Record<string, number>,
    iterations: number
  ): [number, number] {
    const samples: number[] = [];
    
    // Monte Carlo simulation with noise
    for (let i = 0; i < Math.min(iterations, 1000); i++) {
      // Add random noise to simulate uncertainty
      const noisyTechnologies = technologies.map(tech => ({
        ...tech,
        probability: Math.max(0, Math.min(1, tech.probability + (Math.random() - 0.5) * 0.1))
      }));
      
      const noisyConstants = { ...constants };
      Object.keys(noisyConstants).forEach(key => {
        noisyConstants[key] += (Math.random() - 0.5) * 0.1;
      });
      
      const prob = this.calculateCombinationProbability(noisyTechnologies, baseProbability, noisyConstants);
      samples.push(prob);
    }
    
    samples.sort((a, b) => a - b);
    const lowerIndex = Math.floor(samples.length * 0.025);
    const upperIndex = Math.floor(samples.length * 0.975);
    
    return [samples[lowerIndex] || 0, samples[upperIndex] || 1];
  }
}