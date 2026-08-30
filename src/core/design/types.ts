/**
 * Fly Design Engine
 *
 * Phase 1.2 — Authoritative Design State
 *
 * This file defines the structured representation of a fly.
 *
 * IMPORTANT:
 * DesignState is authoritative.
 * AI interpretations, explanations, and recommendations
 * must eventually operate on this structured state rather
 * than becoming the state themselves.
 */

export type DesignId = string;
export type RevisionId = string;

export type QualitativeLevel =
  | 'LOW'
  | 'MODERATE'
  | 'HIGH';

export type ComponentPosition =
  | 'EYE'
  | 'FRONT'
  | 'MID-FRONT'
  | 'CENTER'
  | 'MID-REAR'
  | 'REAR'
  | 'BEND';

export type ComponentFunction =
  | 'HOOK'
  | 'THREAD'
  | 'WEIGHT'
  | 'TAIL'
  | 'BODY'
  | 'FLASH'
  | 'WING'
  | 'HEAD'
  | 'FINISH';

export interface DesignIntent {
  species: string;
  forage: string;
  goals: string[];
}

export interface DesiredMechanics {
  movement: QualitativeLevel;
  sinkRate: QualitativeLevel;
  buoyancy: QualitativeLevel;
  profile: QualitativeLevel;
  drag: QualitativeLevel;
  waterDisplacement: QualitativeLevel;
  stability: QualitativeLevel;
  translucency: QualitativeLevel;
  flash: QualitativeLevel;
  flexibility: QualitativeLevel;
  durability: QualitativeLevel;
}

export interface MaterialAssignment {
  name: string;
  quantity?: string;
  color?: string;
  density?: QualitativeLevel;
  movement?: QualitativeLevel;
  durability?: QualitativeLevel;
  waterAbsorption?: QualitativeLevel;
}

export interface ComponentProportion {
  relativeTo: string;
  multiplier: number;
  unit: 'HOOK_SHANK' | 'HOOK_GAP' | 'COMPONENT';
}

export interface FlyComponent {
  id: string;
  function: ComponentFunction;
  material?: MaterialAssignment;
  position: ComponentPosition;
  proportion?: ComponentProportion;
  constructionMethod?: string;
  mechanicalContribution?: Partial<DesiredMechanics>;
  dependencies?: string[];
}

export interface PredictedMechanics {
  movement: QualitativeLevel;
  sinkRate: QualitativeLevel;
  buoyancy: QualitativeLevel;
  profile: QualitativeLevel;
  drag: QualitativeLevel;
  waterDisplacement: QualitativeLevel;
  stability: QualitativeLevel;
  translucency: QualitativeLevel;
  flash: QualitativeLevel;
  flexibility: QualitativeLevel;
  durability: QualitativeLevel;
}

export interface DesignState {
  designId: DesignId;
  revisionId: RevisionId;

  intent: DesignIntent;

  architecture: string;

  desiredMechanics: DesiredMechanics;

  predictedMechanics: PredictedMechanics;

  components: FlyComponent[];
}
