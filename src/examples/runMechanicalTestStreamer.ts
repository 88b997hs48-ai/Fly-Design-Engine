import { testStreamer } from "./testStreamer";
import {
  adaptFlyDesignToMechanicalInput
} from "../core/mechanics/FlyDesignMechanicalAdapter";
import { MechanicalInteractionEngine } from "../core/mechanics/MechanicalInteractionEngine";
/**
 * Run our first real FlyDesign through the mechanical adapter.
 *
 * This is intentionally simple:
 *
 * FlyDesign
 *    ↓
 * Mechanical Adapter
 *    ↓
 * Normalized Mechanical Profile
 */


const mechanicalProfile =
  adaptFlyDesignToMechanicalInput(testStreamer);

const interactionEngine = new MechanicalInteractionEngine();
const interactionEffects = interactionEngine.evaluate(testStreamer);

const interactionStability = interactionEffects.reduce(
  (total, interaction) => total + (interaction.effects.stability ?? 0),
  0
);

const combinedStability =
  mechanicalProfile.stability + interactionStability;

console.log("========================================");
console.log("FLY DESIGN ENGINE — MECHANICAL PROFILE");
console.log("\n========================================");
console.log("FLY DESIGN ENGINE — MECHANICAL PROFILE");
console.log("========================================\n");

console.log(`Fly: ${mechanicalProfile.flyName}`);
console.log(`ID:  ${mechanicalProfile.flyId}`);

console.log("\n--- Combined Mechanical Profile ---");

console.log(
  `Movement:             ${mechanicalProfile.movement}`
);

console.log(
  `Sink tendency:        ${mechanicalProfile.sinkTendency}`
);

console.log(
  `Buoyancy:             ${mechanicalProfile.buoyancy}`
);

console.log(
  `Profile:              ${mechanicalProfile.profile}`
);

console.log(
  `Water displacement:   ${mechanicalProfile.waterDisplacement}`
);

console.log(
  `Stability:            ${mechanicalProfile.stability}`
);

console.log(
  `Flash:                ${mechanicalProfile.flash}`
);

console.log(
  `Translucency:         ${mechanicalProfile.translucency}`
);

console.log(
  `Durability:           ${mechanicalProfile.durability}`
);

console.log("\n--- Material-Level Effects ---");

for (const effect of mechanicalProfile.materialEffects) {
  console.log(`\n${effect.materialName}`);
  console.log("--------------------------------");

  console.log(`Movement:            ${effect.movement}`);
  console.log(`Sink tendency:       ${effect.sinkTendency}`);
  console.log(`Buoyancy:            ${effect.buoyancy}`);
  console.log(`Profile:             ${effect.profile}`);
  console.log(
    `Water displacement:  ${effect.waterDisplacement}`
  );
  console.log(`Stability:           ${effect.stability}`);
  console.log(`Flash:               ${effect.flash}`);
  console.log(`Translucency:        ${effect.translucency}`);
  console.log(`Durability:          ${effect.durability}`);

  if (effect.reasons.length > 0) {
    console.log("\nReasons:");

    for (const reason of effect.reasons) {
      console.log(`- ${reason}`);
    }
  }
}

console.log("\n========================================\n");
