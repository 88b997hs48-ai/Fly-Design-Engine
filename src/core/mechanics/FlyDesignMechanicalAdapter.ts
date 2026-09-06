import {
  FlyDesign,
  FlyMaterial,
  MaterialFunction
} from "../../domain/flyDesign";

/**
 * Relative mechanical contribution.
 *
 * These values are deliberately normalized instead of pretending
 * that we have laboratory-grade measurements.
 *
 * The engine can later replace these with better empirical data
 * without changing the FlyDesign domain model.
 */
export type MechanicalContribution = number;

export interface MaterialMechanicalEffect {
  materialId: string;
  materialName: string;

  movement: MechanicalContribution;
  sinkTendency: MechanicalContribution;
  buoyancy: MechanicalContribution;
  profile: MechanicalContribution;
  waterDisplacement: MechanicalContribution;
  stability: MechanicalContribution;
  flash: MechanicalContribution;
  translucency: MechanicalContribution;
  durability: MechanicalContribution;

  reasons: string[];
}

export interface FlyMechanicalInput {
  flyId: string;
  flyName: string;

  movement: number;
  sinkTendency: number;
  buoyancy: number;
  profile: number;
  waterDisplacement: number;
  stability: number;
  flash: number;
  translucency: number;
  durability: number;

  materialEffects: MaterialMechanicalEffect[];
}

/**
 * Start with a mechanically neutral material.
 */
function createNeutralEffect(
  material: FlyMaterial
): MaterialMechanicalEffect {
  return {
    materialId: material.id,
    materialName: material.name,

    movement: 0,
    sinkTendency: 0,
    buoyancy: 0,
    profile: 0,
    waterDisplacement: 0,
    stability: 0,
    flash: 0,
    translucency: 0,
    durability: 0,

    reasons: []
  };
}

/**
 * Translate an explicitly declared material function into a
 * mechanical contribution.
 *
 * Important:
 * We are using the FUNCTIONS declared by the design rather than
 * silently assuming that every material always behaves the same way.
 *
 * Example:
 * Deer hair used as a head can perform differently from deer hair
 * used sparsely as a wing.
 */
function applyFunction(
  effect: MaterialMechanicalEffect,
  fn: MaterialFunction,
  material: FlyMaterial
): void {
  switch (fn) {
    case "movement":
      effect.movement += 1;
      effect.reasons.push(
        `${material.name} contributes movement.`
      );
      break;

    case "weight":
      effect.sinkTendency += 2;
      effect.reasons.push(
        `${material.name} contributes weight and increases sink tendency.`
      );
      break;

    case "buoyancy":
      effect.buoyancy += 2;
      effect.sinkTendency -= 1;
      effect.reasons.push(
        `${material.name} contributes buoyancy and resists sinking.`
      );
      break;

    case "profile":
      effect.profile += 1;
      effect.reasons.push(
        `${material.name} increases the fly's profile.`
      );
      break;

    case "water-displacement":
      effect.waterDisplacement += 2;
      effect.reasons.push(
        `${material.name} increases water displacement.`
      );
      break;

    case "stability":
      effect.stability += 2;
      effect.reasons.push(
        `${material.name} contributes orientation stability.`
      );
      break;

    case "flash":
      effect.flash += 2;
      effect.reasons.push(
        `${material.name} increases reflected flash.`
      );
      break;

    case "translucency":
      effect.translucency += 2;
      effect.reasons.push(
        `${material.name} contributes translucency.`
      );
      break;

    case "durability":
      effect.durability += 2;
      effect.reasons.push(
        `${material.name} contributes durability.`
      );
      break;

    case "structure":
      effect.stability += 1;
      effect.durability += 1;
      effect.reasons.push(
        `${material.name} contributes structural support.`
      );
      break;

    case "color":
      /**
       * Color matters visually, but by itself it does not create
       * one of the mechanical effects represented here.
       */
      effect.reasons.push(
        `${material.name} contributes color without a direct mechanical adjustment.`
      );
      break;

    case "other":
      effect.reasons.push(
        `${material.name} has an additional design function not yet mapped mechanically.`
      );
      break;
  }
}

/**
 * Apply simple placement-sensitive mechanics.
 *
 * These are design rules, not universal physical laws.
 * We keep them explicit so they can later be tested,
 * challenged, tuned, or replaced.
 */
function applyPlacementRules(
  effect: MaterialMechanicalEffect,
  material: FlyMaterial
): void {
  if (
    material.placement === "underbody" &&
    material.functions.includes("weight")
  ) {
    effect.stability += 1;
    effect.reasons.push(
      `${material.name} is weighted below the hook shank, reinforcing keel stability.`
    );
  }

  if (
    material.placement === "head" &&
    material.functions.includes("water-displacement")
  ) {
    effect.waterDisplacement += 1;
    effect.reasons.push(
      `${material.name} is concentrated at the head, reinforcing frontal water displacement.`
    );
  }

  if (
    material.placement === "tail" &&
    material.functions.includes("movement")
  ) {
    effect.movement += 1;
    effect.reasons.push(
      `${material.name} is positioned in the tail, reinforcing trailing movement.`
    );
  }
}


/**
 * Evaluate one material.
 */
export function evaluateMaterialMechanics(
  material: FlyMaterial
): MaterialMechanicalEffect {
  const effect = createNeutralEffect(material);

  for (const fn of material.functions) {
    applyFunction(effect, fn, material);
  }

applyPlacementRules(effect, material);

return effect;
}

/**
 * Convert a complete FlyDesign into normalized mechanical inputs.
 */
export function adaptFlyDesignToMechanicalInput(
  design: FlyDesign
): FlyMechanicalInput {
  const materialEffects =
    design.materials.map(evaluateMaterialMechanics);

  return materialEffects.reduce<FlyMechanicalInput>(
    (result, effect) => {
      result.movement += effect.movement;
      result.sinkTendency += effect.sinkTendency;
      result.buoyancy += effect.buoyancy;
      result.profile += effect.profile;
      result.waterDisplacement += effect.waterDisplacement;
      result.stability += effect.stability;
      result.flash += effect.flash;
      result.translucency += effect.translucency;
      result.durability += effect.durability;

      return result;
    },
    {
      flyId: design.id,
      flyName: design.name,

      movement: 0,
      sinkTendency: 0,
      buoyancy: 0,
      profile: 0,
      waterDisplacement: 0,
      stability: 0,
      flash: 0,
      translucency: 0,
      durability: 0,

      materialEffects
    }
  );
}
