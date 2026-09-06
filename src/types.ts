export type EvidenceType =
  | "known_fact"
  | "design_rule"
  | "prediction"
  | "user_preference"
  | "ai_interpretation";

export interface Material {
  id: string;
  name: string;
  category:
    | "hook"
    | "thread"
    | "weight"
    | "tail"
    | "body"
    | "flash"
    | "wing"
    | "hackle"
    | "head"
    | "leg"
    | "other";

  properties: MaterialProperties;
}

export interface MaterialProperties {
  buoyancy?: number;
  flexibility?: number;
  waterAbsorption?: number;
  translucency?: number;
  flash?: number;
  durability?: number;
  drag?: number;
}

export interface FlyComponent {
  id: string;
  materialId: string;
  position:
    | "hook"
    | "tail"
    | "rear_body"
    | "body"
    | "underwing"
    | "wing"
    | "hackle"
    | "head"
    | "weight"
    | "other";

  amount?: number;
  length?: number;
  notes?: string;
}

export interface FlyDesign {
  id: string;
  name: string;
  targetSpecies?: string[];
  components: FlyComponent[];
}

export interface MechanicsProfile {
  movement: number;
  sinkRate: number;
  buoyancyProfile: number;
  profile: number;
  drag: number;
  waterDisplacement: number;
  stability: number;
  translucency: number;
  flash: number;
  flexibility: number;
  waterAbsorption: number;
  durability: number;
  hookGapClearance: number;
}

export interface Evidence<T> {
  type: EvidenceType;
  value: T;
  explanation?: string;
  confidence?: number;
}
