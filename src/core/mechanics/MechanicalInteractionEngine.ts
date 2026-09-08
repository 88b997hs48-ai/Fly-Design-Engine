import { FlyDesign } from "../../domain/flyDesign";
import { MechanicsProfile } from "../../types";

export interface InteractionEffect {
  interaction: string;
  effects: Partial<MechanicsProfile>;
  reasons: string[];
}

export class MechanicalInteractionEngine {
  evaluate(design: FlyDesign): InteractionEffect[] {
    const interactions: InteractionEffect[] = [];

    const materials = design.materials ?? [];

    const hasLeadFreeWireBelowShank = materials.some((material) => {
      const materialName = material.name.toLowerCase();
      const materialId = material.id.toLowerCase();

      return (
        (materialName.includes("lead") &&
          materialName.includes("wire")) ||
        (materialId.includes("lead") &&
          materialId.includes("wire"))
      ) && material.placement === "weight";
    });

    const hasDeerHairHead = materials.some((material) => {
      const materialName = material.name.toLowerCase();
      const materialId = material.id.toLowerCase();

      return (
        ((materialName.includes("deer") &&
          materialName.includes("hair")) ||
          (materialId.includes("deer") &&
            materialId.includes("hair"))) &&
        material.placement === "head"
      );
    });

    if (hasLeadFreeWireBelowShank && hasDeerHairHead) {
      interactions.push({
        interaction: "Low ballast + buoyant head",
        effects: {
          stability: 2,
        },
        reasons: [
          "Weight concentrated low in the fly increases keel influence.",
          "Buoyant deer hair concentrated at the head opposes the low ballast.",
          "The separation between ballast and buoyancy increases self-righting stability.",
        ],
      });
    }

    return interactions;
  }
}
