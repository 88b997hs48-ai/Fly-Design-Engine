import type { FlyDesign } from "./types.js";
import { MATERIAL_LIBRARY } from "./materials.js";
import { calculateMechanicsProfile } from "./mechanics.js";

const exampleFly: FlyDesign = {
  id: "example-streamer-001",
  name: "Example Streamer",
  targetSpecies: [
    "Brown Trout",
    "Smallmouth Bass",
  ],
  components: [
    {
      id: "tail-1",
      materialId: "marabou",
      position: "tail",
      amount: 2,
      length: 3,
    },
    {
      id: "flash-1",
      materialId: "flashabou",
      position: "wing",
      amount: 1,
      length: 3,
    },
    {
      id: "body-1",
      materialId: "palmer-chenille",
      position: "body",
      amount: 1,
      length: 2,
    },
    {
      id: "legs-1",
      materialId: "rubber-legs",
      position: "body",
      amount: 4,
      length: 2.5,
    },
    {
      id: "head-1",
      materialId: "deer-hair",
      position: "head",
      amount: 1,
      length: 1,
    },
    {
      id: "weight-1",
      materialId: "lead-free-wire",
      position: "weight",
      amount: 2,
      length: 1.5,
      notes: "Two short strands tied beneath the hook shank as keel weight.",
    },
  ],
};

const mechanics = calculateMechanicsProfile(
  exampleFly,
  MATERIAL_LIBRARY,
);

console.log("Fly:", exampleFly.name);
console.log("Mechanics Profile:");
console.table(mechanics);
