import { calculateMechanicsProfile } from "./mechanics";
import type { FlyDesign, Material } from "./types";

const materials: Material[] = [
  {
    id: "bucktail",
    name: "Bucktail",
    category: "tail",
    properties: {
      buoyancy: 3,
      flexibility: 6,
      waterAbsorption: 2,
      translucency: 4,
      flash: 1,
      durability: 8,
      drag: 5,
    },
  },
  {
    id: "flash",
    name: "Flash",
    category: "flash",
    properties: {
      buoyancy: 1,
      flexibility: 9,
      waterAbsorption: 0,
      translucency: 8,
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
      buoyancy: 9,
      flexibility: 3,
      waterAbsorption: 3,
      translucency: 2,
      flash: 0,
      durability: 7,
      drag: 9,
    },
  },
];

const design: FlyDesign = {
  id: "test-streamer",
  name: "Test Streamer",
  targetSpecies: ["brown trout", "smallmouth bass"],
  components: [
    {
      id: "tail-1",
      materialId: "bucktail",
      position: "tail",
      amount: 0.7,
      length: 4,
    },
    {
      id: "flash-1",
      materialId: "flash",
      position: "body",
      amount: 0.3,
      length: 3.5,
    },
    {
      id: "head-1",
      materialId: "deer-hair",
      position: "head",
      amount: 0.8,
      length: 1,
    },
  ],
};

const profile = calculateMechanicsProfile(design, materials);

console.log("Fly:", design.name);
console.log("Mechanics Profile:");
console.log(JSON.stringify(profile, null, 2));
