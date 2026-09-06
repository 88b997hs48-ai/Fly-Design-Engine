import { evaluateFly } from "./mechanics";
import type { FlyDesign } from "./types";

const fly: FlyDesign = {
  name: "Test Streamer",

  materials: [
    {
      materialId: "bucktail",
      role: "tail",
      amount: 0.7,
    },
    {
      materialId: "flash",
      role: "accent",
      amount: 0.3,
    },
    {
      materialId: "deer-hair",
      role: "head",
      amount: 0.8,
    },
  ],

  construction: {
    lengthInches: 4,
    hookSize: "2/0",
    weightPosition: "forward",
    profile: "baitfish",
  },
};

const result = evaluateFly(fly);

console.log("Fly:", fly.name);
console.log(JSON.stringify(result, null, 2));
