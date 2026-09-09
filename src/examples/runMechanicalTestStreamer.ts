import { testStreamer } from './testStreamer';
import {
  buildFlyMechanicalProfile,
} from '../core/mechanics/FlyMechanicalProfileEngine';


const result =
  buildFlyMechanicalProfile(testStreamer);

const {
  profile,
  interactions,
} = result;


console.log('========================================');
console.log('FLY DESIGN ENGINE — MECHANICAL PROFILE');
console.log('========================================\n');

console.log(`Fly: ${profile.flyName}`);
console.log(`ID:  ${profile.flyId}`);

console.log('\n--- Combined Mechanical Profile ---');

console.log(`Movement:             ${profile.movement}`);
console.log(`Sink tendency:        ${profile.sinkTendency}`);
console.log(`Buoyancy:             ${profile.buoyancy}`);
console.log(`Profile:              ${profile.profile}`);
console.log(
  `Water displacement:   ${profile.waterDisplacement}`,
);
console.log(`Stability:            ${profile.stability}`);
console.log(`Flash:                ${profile.flash}`);
console.log(`Translucency:         ${profile.translucency}`);
console.log(`Durability:           ${profile.durability}`);


console.log('\n--- Material-Level Effects ---');

for (const effect of profile.materialEffects) {
  console.log(`\n${effect.materialName}`);
  console.log('--------------------------------');

  console.log(`Movement:            ${effect.movement}`);
  console.log(
    `Sink tendency:       ${effect.sinkTendency}`,
  );
  console.log(`Buoyancy:            ${effect.buoyancy}`);
  console.log(`Profile:             ${effect.profile}`);
  console.log(
    `Water displacement:  ${effect.waterDisplacement}`,
  );
  console.log(`Stability:           ${effect.stability}`);
  console.log(`Flash:               ${effect.flash}`);
  console.log(
    `Translucency:        ${effect.translucency}`,
  );
  console.log(`Durability:          ${effect.durability}`);

  if (effect.reasons.length > 0) {
    console.log('\nReasons:');

    for (const reason of effect.reasons) {
      console.log(`- ${reason}`);
    }
  }
}


console.log('\n--- Mechanical Interactions ---');

if (interactions.length === 0) {
  console.log('No material interactions detected.');
}

for (const interaction of interactions) {
  console.log(`\n${interaction.interaction}`);
  console.log('--------------------------------');

  for (const reason of interaction.reasons) {
    console.log(`- ${reason}`);
  }
}


console.log('\n========================================\n');
