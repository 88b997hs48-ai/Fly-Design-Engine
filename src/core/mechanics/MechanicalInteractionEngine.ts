import { FlyDesign, MechanicsProfile } from "../../types";

export interface InteractionEffect {
  interaction: string;
  effects: Partial<MechanicsProfile>;
  reasons: string[];
}

export class MechanicalInteractionEngine {
  evaluate(design: FlyDesign): InteractionEffect[] {
    const interactions: InteractionEffect[] = [];

    const components = design.components ?? [];

    const hasLeadFreeWireBelowShank = components.some((component) => {
      const materialName = component.material?.name?.toLowerCase() ?? "";
      const position = component.position?.toLowerCase() ?? "";

      return (
        materialName.includes("lead-free wire") &&
        (position.includes("below") ||
          position.includes("underside") ||
          position.includes("bottom"))
      );
    });

    const hasDeerHairHead = components.some((component) => {
      const materialName = component.material?.name?.toLowerCase() ?? "";
      const position = component.position?.toLowerCase() ?? "";

      return (
        materialName.includes("deer hair") &&
        (position.includes("head") || position.includes("front"))
      );
    });

    if (hasLeadFreeWireBelowShank && hasDeerHairHead) {
      interactions.push({
        interaction: "Low ballast + buoyant head",
        effects: {
          stability: 2,
        },
        reasons: [
          "Weight positioned below the hook shank lowers the fly's center of mass.",
          "Buoyant deer hair concentrated near the head places buoyancy above and forward of the ballast.",
          "The separation between ballast and buoyancy increases self-righting and keel stability.",
        ],
      });
    }

    return interactions;
  }
}
