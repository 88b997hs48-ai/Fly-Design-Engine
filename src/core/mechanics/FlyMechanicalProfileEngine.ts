import { FlyDesign } from '../../domain/flyDesign';
import {
  adaptFlyDesignToMechanicalInput,
  FlyMechanicalInput,
} from './FlyDesignMechanicalAdapter';
import {
  InteractionEffect,
  MechanicalInteractionEngine,
} from './MechanicalInteractionEngine';


export interface FlyMechanicalProfileResult {
  profile: FlyMechanicalInput;
  interactions: InteractionEffect[];
  reasons: string[];
}


export function buildFlyMechanicalProfile(
  design: FlyDesign,
): FlyMechanicalProfileResult {
  const baseProfile =
    adaptFlyDesignToMechanicalInput(design);

  const interactions =
    new MechanicalInteractionEngine().evaluate(design);

  const interactionStability = interactions.reduce(
    (total, interaction) =>
      total + (interaction.effects.stability ?? 0),
    0,
  );

  const reasons = interactions.flatMap(
    interaction => interaction.reasons,
  );

  return {
    profile: {
      ...baseProfile,
      stability:
        baseProfile.stability + interactionStability,
    },
    interactions,
    reasons,
  };
}
