import type { Material } from "./types.js";

export const MATERIAL_LIBRARY: Material[] = [
  {
    id: "marabou",
    name: "Marabou",
    category: "tail",
    properties: {
      buoyancy: 2,
      flexibility: 10,
      waterAbsorption: 7,
      translucency: 7,
      flash: 1,
      durability: 4,
      drag: 6,
    },
  },

  {
    id: "bucktail",
    name: "Bucktail",
    category: "wing",
    properties: {
      buoyancy: 4,
      flexibility: 5,
      waterAbsorption: 3,
      translucency: 4,
      flash: 1,
      durability: 8,
      drag: 5,
    },
  },

  {
    id: "flashabou",
    name: "Flashabou",
    category: "flash",
    properties: {
      buoyancy: 1,
      flexibility: 8,
      waterAbsorption: 1,
      translucency: 5,
      flash: 10,
      durability: 6,
      drag: 2,
    },
  },

  {
    id: "deer-hair",
    name: "Deer Hair",
    category: "head",
    properties: {
      buoyancy: 10,
      flexibility: 3,
      waterAbsorption: 2,
      translucency: 2,
      flash: 1,
      durability: 7,
      drag: 10,
    },
  },

  {
    id: "palmer-chenille",
    name: "Palmer Chenille",
    category: "body",
    properties: {
      buoyancy: 3,
      flexibility: 6,
      waterAbsorption: 4,
      translucency: 5,
      flash: 7,
      durability: 7,
      drag: 6,
    },
  },

  {
    id: "rubber-legs",
    name: "Rubber Legs",
    category: "leg",
    properties: {
      buoyancy: 3,
      flexibility: 9,
      waterAbsorption: 1,
      translucency: 5,
      flash: 2,
      durability: 6,
      drag: 7,
    },
  },

  {
    id: "lead-free-wire",
    name: "Lead-Free Wire",
    category: "weight",
    properties: {
      buoyancy: 0,
      flexibility: 1,
      waterAbsorption: 0,
      translucency: 0,
      flash: 2,
      durability: 10,
      drag: 1,
    },
  },

  {
    id: "schlappen",
    name: "Schlappen",
    category: "hackle",
    properties: {
      buoyancy: 3,
      flexibility: 8,
      waterAbsorption: 5,
      translucency: 6,
      flash: 1,
      durability: 5,
      drag: 7,
    },
  },

  {
    id: "synthetic-fiber",
    name: "Synthetic Fiber",
    category: "wing",
    properties: {
      buoyancy: 4,
      flexibility: 7,
      waterAbsorption: 1,
      translucency: 6,
      flash: 3,
      durability: 8,
      drag: 4,
    },
  },
];

export function getMaterialById(
  id: string,
): Material | undefined {
  return MATERIAL_LIBRARY.find(
    (material) => material.id === id,
  );
}
