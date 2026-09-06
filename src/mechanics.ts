import type {
  FlyDesign,
  Material,
  MechanicsProfile,
} from "./types.js";

const clamp = (value: number, min = 0, max = 10): number => {
  return Math.min(max, Math.max(min, value));
};

const average = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export function calculateMechanicsProfile(
  design: FlyDesign,
  materials: Material[],
): MechanicsProfile {
  const materialsById = new Map(
    materials.map((material) => [material.id, material]),
  );

  const flyMaterials = design.components
    .map((component) => materialsById.get(component.materialId))
    .filter((material): material is Material => Boolean(material));

  const buoyancyValues = flyMaterials.map(
    (material) => material.properties.buoyancy ?? 0,
  );

  const flexibilityValues = flyMaterials.map(
    (material) => material.properties.flexibility ?? 0,
  );

  const absorptionValues = flyMaterials.map(
    (material) => material.properties.waterAbsorption ?? 0,
  );

  const translucencyValues = flyMaterials.map(
    (material) => material.properties.translucency ?? 0,
  );

  const flashValues = flyMaterials.map(
    (material) => material.properties.flash ?? 0,
  );

  const durabilityValues = flyMaterials.map(
    (material) => material.properties.durability ?? 0,
  );

  const dragValues = flyMaterials.map(
    (material) => material.properties.drag ?? 0,
  );

  const buoyancy = average(buoyancyValues);
  const flexibility = average(flexibilityValues);
  const waterAbsorption = average(absorptionValues);
  const translucency = average(translucencyValues);
  const flash = average(flashValues);
  const durability = average(durabilityValues);
  const drag = average(dragValues);

  const movement = clamp(
    flexibility * 0.7 +
      drag * 0.3,
  );

  const sinkRate = clamp(
    5 +
      waterAbsorption * 0.4 -
      buoyancy * 0.6,
  );

  const waterDisplacement = clamp(
    drag * 0.65 +
      design.components.length * 0.35,
  );

  const profile = clamp(
    design.components.length * 0.75,
  );

  const stability = clamp(
    5 +
      buoyancy * 0.15 -
      drag * 0.1,
  );

  const hookGapClearance = clamp(
    10 -
      design.components.length * 0.5,
  );

  return {
    movement,
    sinkRate,
    buoyancyProfile: clamp(buoyancy),
    profile,
    drag: clamp(drag),
    waterDisplacement,
    stability,
    translucency: clamp(translucency),
    flash: clamp(flash),
    flexibility: clamp(flexibility),
    waterAbsorption: clamp(waterAbsorption),
    durability: clamp(durability),
    hookGapClearance,
  };
}
