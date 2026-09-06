import {
  MechanicalDirection,
  MechanicalPrediction,
  MechanicalPredictionResult,
} from './MechanicalPredictionEngine';

export type MechanicalStrength =
  | 'NONE'
  | 'LOW'
  | 'MODERATE'
  | 'HIGH';

export interface InterpretedMechanicalPrediction
  extends MechanicalPrediction {
  magnitude: number;
  strength: MechanicalStrength;
  explanation: string;
}

export interface MechanicalInterpretationResult {
  predictions: InterpretedMechanicalPrediction[];
  appliedRuleCount: number;
}

/**
 * Converts the raw output of MechanicalPredictionEngine
 * into information that can be presented to a user.
 *
 * The prediction engine remains responsible for mechanics.
 * This class is responsible only for interpretation.
 */
export class MechanicalPredictionInterpreter {
  public static interpret(
    result: MechanicalPredictionResult,
  ): MechanicalInterpretationResult {
    return {
      predictions: result.predictions.map((prediction) =>
        this.interpretPrediction(prediction),
      ),
      appliedRuleCount: result.appliedRules.length,
    };
  }

  private static interpretPrediction(
    prediction: MechanicalPrediction,
  ): InterpretedMechanicalPrediction {
    const magnitude = Math.abs(prediction.score);
    const strength = this.strengthFromMagnitude(magnitude);

    return {
      ...prediction,
      magnitude,
      strength,
      explanation: this.buildExplanation(
        prediction.direction,
        strength,
        prediction.contributingRules.length,
      ),
    };
  }

  private static strengthFromMagnitude(
    magnitude: number,
  ): MechanicalStrength {
    if (magnitude === 0) {
      return 'NONE';
    }

    if (magnitude <= 2) {
      return 'LOW';
    }

    if (magnitude <= 4) {
      return 'MODERATE';
    }

    return 'HIGH';
  }

  private static buildExplanation(
    direction: MechanicalDirection,
    strength: MechanicalStrength,
    contributingRuleCount: number,
  ): string {
    if (direction === 'NEUTRAL' || strength === 'NONE') {
      return 'No net mechanical change is currently predicted.';
    }

    const directionText =
      direction === 'INCREASE'
        ? 'increase'
        : 'decrease';

    const strengthText = strength.toLowerCase();

    const ruleText =
      contributingRuleCount === 1
        ? '1 contributing design rule'
        : `${contributingRuleCount} contributing design rules`;

    return (
      `A ${strengthText} ${directionText} is predicted ` +
      `from ${ruleText}.`
    );
  }
}
