import { DesignState } from '../design/types';
import {
  MechanicalEffect,
  MechanicalProperty,
} from '../rules/DesignRule';
import {
  MechanicalRuleEvaluator,
  AppliedRule,
} from '../rules/MechanicalRuleEvaluator';

export type MechanicalDirection =
  | 'DECREASE'
  | 'NEUTRAL'
  | 'INCREASE';

export interface MechanicalPrediction {
  property: MechanicalProperty;
  score: number;
  direction: MechanicalDirection;
  contributingRules: string[];
}

export interface MechanicalPredictionResult {
  predictions: MechanicalPrediction[];
  appliedRules: AppliedRule[];
}

export class MechanicalPredictionEngine {
  public static predict(
    state: DesignState,
  ): MechanicalPredictionResult {
    const evaluation =
      MechanicalRuleEvaluator.evaluate(state);

    const scores = new Map<MechanicalProperty, number>();

    const contributors =
      new Map<MechanicalProperty, Set<string>>();

    for (const appliedRule of evaluation.appliedRules) {
      for (const effect of appliedRule.effects) {
        this.applyEffect(
          effect,
          appliedRule.ruleId,
          scores,
          contributors,
        );
      }
    }

    const predictions: MechanicalPrediction[] =
      Array.from(scores.entries())
        .map(([property, score]) => ({
          property,
          score,
          direction: this.directionFromScore(score),
          contributingRules: Array.from(
            contributors.get(property) ?? [],
          ),
        }))
        .sort((a, b) =>
          a.property.localeCompare(b.property),
        );

    return {
      predictions,
      appliedRules: evaluation.appliedRules,
    };
  }

  private static applyEffect(
    effect: MechanicalEffect,
    ruleId: string,
    scores: Map<MechanicalProperty, number>,
    contributors: Map<MechanicalProperty, Set<string>>,
  ): void {
    const currentScore =
      scores.get(effect.property) ?? 0;

    const effectScore =
      this.scoreEffect(effect);

    scores.set(
      effect.property,
      currentScore + effectScore,
    );

    const propertyContributors =
      contributors.get(effect.property) ??
      new Set<string>();

    propertyContributors.add(ruleId);

    contributors.set(
      effect.property,
      propertyContributors,
    );
  }

  private static scoreEffect(
    effect: MechanicalEffect,
  ): number {
    const confidenceWeight = {
      LOW: 1,
      MODERATE: 2,
      HIGH: 3,
    }[effect.confidence];

    switch (effect.direction) {
      case 'INCREASE':
        return confidenceWeight;

      case 'DECREASE':
        return -confidenceWeight;

      case 'MAINTAIN':
        return 0;
    }
  }

  private static directionFromScore(
    score: number,
  ): MechanicalDirection {
    if (score > 0) {
      return 'INCREASE';
    }

    if (score < 0) {
      return 'DECREASE';
    }

    return 'NEUTRAL';
  }
}
