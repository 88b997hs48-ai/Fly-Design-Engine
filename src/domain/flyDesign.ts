/**
 * Core domain model for a fly design.
 *
 * This file describes WHAT the fly is made of and WHERE each material
 * is used. It intentionally does not contain prediction logic.
 *
 * Prediction logic belongs in the mechanics/interpreter layer.
 */

export type FlyCategory =
  | "dry"
  | "nymph"
  | "wet"
  | "streamer"
  | "terrestrial"
  | "saltwater"
  | "other";

export type MaterialPlacement =
  | "hook"
  | "tail"
  | "rear-body"
  | "body"
  | "underbody"
  | "rib"
  | "wing"
  | "underwing"
  | "overwing"
  | "collar"
  | "hackle"
  | "legs"
  | "head"
  | "eyes"
  | "weight"
  | "other";

export type MaterialFunction =
  | "structure"
  | "movement"
  | "buoyancy"
  | "weight"
  | "flash"
  | "profile"
  | "water-displacement"
  | "stability"
  | "translucency"
  | "durability"
  | "color"
  | "other";

export interface FlyMaterial {
  /**
   * Unique identifier for this material instance.
   * Example: "tail-bucktail-1"
   */
  id: string;

  /**
   * Human-readable material name.
   * Example: "Bucktail", "Marabou", "Lead-free wire"
   */
  name: string;

  /**
   * Where the material is positioned on the fly.
   */
  placement: MaterialPlacement;

  /**
   * Mechanical/design functions this material performs.
   */
  functions: MaterialFunction[];

  /**
   * Optional quantity or descriptive amount.
   * Examples:
   * "sparse"
   * "2 strands"
   * "3 wraps"
   * "medium clump"
   */
  amount?: string;

  /**
   * Optional color.
   */
  color?: string;

  /**
   * Relative position from rear to front.
   *
   * 0 = very rear of fly
   * 1 = very front of fly
   *
   * This gives the mechanics engine a simple positional value
   * without requiring a full geometric model yet.
   */
  position?: number;

  /**
   * Optional notes that are useful to the designer but should not
   * automatically be treated as mechanical facts.
   */
  notes?: string;
}

export interface FlyHook {
  /**
   * Hook manufacturer/model if known.
   * Example: "Ahrex TP610"
   */
  model?: string;

  /**
   * Conventional hook size.
   * Example: "2", "1/0", "6"
   */
  size?: string;

  /**
   * Hook style.
   * Example: "streamer", "stinger", "jig", "wide-gap"
   */
  style?: string;

  /**
   * Approximate shank length in millimeters when known.
   */
  shankLengthMm?: number;

  /**
   * Approximate hook weight in grams when known.
   */
  weightGrams?: number;
}

export interface FlyDimensions {
  /**
   * Overall finished fly length.
   */
  lengthMm?: number;

  /**
   * Approximate maximum width.
   */
  widthMm?: number;

  /**
   * Approximate maximum height/depth.
   */
  heightMm?: number;
}

export interface FlyDesign {
  /**
   * Unique design identifier.
   */
  id: string;

  /**
   * User-facing pattern/design name.
   */
  name: string;

  /**
   * Broad fly category.
   */
  category: FlyCategory;

  /**
   * Optional intended species.
   *
   * Keeping these as strings gives us flexibility while the
   * species taxonomy is still evolving.
   */
  targetSpecies?: string[];

  /**
   * Optional fishing environment.
   *
   * Examples:
   * "river"
   * "lake"
   * "saltwater-flat"
   * "estuary"
   */
  environment?: string[];

  /**
   * Hook configuration.
   */
  hook: FlyHook;

  /**
   * Approximate finished dimensions.
   */
  dimensions?: FlyDimensions;

  /**
   * Materials used to construct the fly.
   */
  materials: FlyMaterial[];

  /**
   * Optional general design notes.
   */
  notes?: string;
}

/**
 * Small runtime helper used to keep positional values valid.
 */
export function isValidMaterialPosition(position: number): boolean {
  return position >= 0 && position <= 1;
}

/**
 * Basic validation for a fly design.
 *
 * We deliberately keep this lightweight for now.
 * More sophisticated design-rule validation can be added later.
 */
export function validateFlyDesign(design: FlyDesign): string[] {
  const errors: string[] = [];

  if (!design.id.trim()) {
    errors.push("Fly design must have an id.");
  }

  if (!design.name.trim()) {
    errors.push("Fly design must have a name.");
  }

  if (!design.materials.length) {
    errors.push("Fly design must contain at least one material.");
  }

  for (const material of design.materials) {
    if (!material.id.trim()) {
      errors.push("Every material must have an id.");
    }

    if (!material.name.trim()) {
      errors.push(`Material "${material.id}" must have a name.`);
    }

    if (
      material.position !== undefined &&
      !isValidMaterialPosition(material.position)
    ) {
      errors.push(
        `Material "${material.id}" position must be between 0 and 1.`
      );
    }
  }

  return errors;
}
