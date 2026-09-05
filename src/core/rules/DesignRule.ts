import {
  ComponentFunction,
  DesiredMechanics,
  QualitativeLevel,
} from '../design/types';

export type EpistemicClassification =
  | 'FACT'
  | 'RULE'
  | 'PREDICTION'
  | 'USER_PREFERENCE'
  | 'AI_INTERPRETATION';

export type MechanicalProperty = keyof DesiredMechanics;

export type EffectDirection =
  | 'INCREASE'
  | 'DECREASE'
  | 'MAINTAIN';

export interface RuleCondition {
  componentFunction?: ComponentFunction;
  materialIncludes?: string[];
}

export interface MechanicalEffect {
  property: MechanicalProperty;
  direction: EffectDirection;
  confidence: QualitativeLevel;
  rationale: string;
}

export interface DesignRule {
  id: string;
  name: string;
  classification: EpistemicClassification;
  description: string;
  conditions: RuleCondition[];
  effects: MechanicalEffect[];
}
