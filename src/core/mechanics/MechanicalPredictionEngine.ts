import { DesignState } from '../design/types';
import {
  MechanicalEffect,
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
  mechanic: string;
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

    const scores = new Map<string, number>();
    const contributors = new Map<string, Set<string>>();

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

    const predictions: MechanicalPrediction[] = Array.from(
      scores.entries(),
    )
      .map(([mechanic, score]) => ({
        mechanic,
        score,
        direction: this.directionFromScore(score),
        contributingRules: Array.from(
          contributors.get(mechanic) ?? [],
        ),
      }))
      .sort((a, b) =>
        a.mechanic.localeCompare(b.mechanic),
      );

    return {
      predictions,
      appliedRules: evaluation.appliedRules,
    };
  }

  private static applyEffect(
    effect: MechanicalEffect,
    ruleId: string,
    scores: Map<string, number>,
    contributors: Map<string, Set<string>>,
  ): void {
    const currentScore =
      scores.get(effect.mechanic) ?? 0;

    scores.set(
      effect.mechanic,
      currentScore + effect.magnitude,
    );

    const mechanicContributors =
      contributors.get(effect.mechanic) ??
      new Set<string>();

    mechanicContributors.add(ruleId);

    contributors.set(
      effect.mechanic,
      mechanicContributors,
    );
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
