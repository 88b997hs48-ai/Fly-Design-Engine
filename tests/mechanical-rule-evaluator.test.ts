import { describe, expect, it } from 'vitest';
import { MechanicalRuleEvaluator } from '../src/core/rules/MechanicalRuleEvaluator';
import { DesignState } from '../src/core/design/types';

function createBaseState(): DesignState {
  return {
    designId: 'design-1',
    revisionId: 'revision-1',
    intent: {
      species: 'brown trout',
      forage: 'baitfish',
      goals: [],
    },
    architecture: 'STREAMER',
    desiredMechanics: {
      movement: 'MODERATE',
      sinkRate: 'MODERATE',
      buoyancy: 'MODERATE',
      profile: 'MODERATE',
      drag: 'MODERATE',
      waterDisplacement: 'MODERATE',
      stability: 'MODERATE',
      translucency: 'MODERATE',
      flash: 'MODERATE',
      flexibility: 'MODERATE',
      durability: 'MODERATE',
    },
    predictedMechanics: {
      movement: 'MODERATE',
      sinkRate: 'MODERATE',
      buoyancy: 'MODERATE',
      profile: 'MODERATE',
      drag: 'MODERATE',
      waterDisplacement: 'MODERATE',
      stability: 'MODERATE',
      translucency: 'MODERATE',
      flash: 'MODERATE',
      flexibility: 'MODERATE',
      durability: 'MODERATE',
    },
    components: [
      {
        id: 'hook',
        function: 'HOOK',
        position: 'CENTER',
      },
      {
        id: 'head',
        function: 'HEAD',
        position: 'FRONT',
      },
    ],
  };
}

describe('MechanicalRuleEvaluator', () => {
  it('matches lead wire to the sink-rate rule', () => {
    const state = createBaseState();

    state.components.push({
      id: 'weight-1',
      function: 'WEIGHT',
      position: 'CENTER',
      material: {
        name: 'Lead Wire',
      },
    });

    const result = MechanicalRuleEvaluator.evaluate(state);

    expect(
      result.appliedRules.some(
        rule => rule.ruleId === 'material-lead-wire-sink-rate',
      ),
    ).toBe(true);
  });

  it('matches deer hair to both drag and buoyancy rules', () => {
    const state = createBaseState();

    state.components.push({
      id: 'head-deer-hair',
      function: 'HEAD',
      position: 'FRONT',
      material: {
        name: 'Spun Deer Hair',
      },
    });

    const result = MechanicalRuleEvaluator.evaluate(state);

    const deerHairRules = result.appliedRules.filter(
      rule => rule.componentId === 'head-deer-hair',
    );

    expect(
      deerHairRules.some(
        rule => rule.ruleId === 'material-deer-hair-drag',
      ),
    ).toBe(true);

    expect(
      deerHairRules.some(
        rule => rule.ruleId === 'material-deer-hair-buoyancy',
      ),
    ).toBe(true);
  });

  it('matches flash material regardless of capitalization', () => {
    const state = createBaseState();

    state.components.push({
      id: 'flash-1',
      function: 'FLASH',
      position: 'CENTER',
      material: {
        name: 'Krystal Flash',
      },
    });

    const result = MechanicalRuleEvaluator.evaluate(state);

    expect(
      result.appliedRules.some(
        rule => rule.ruleId === 'material-flash-flash-rating',
      ),
    ).toBe(true);
  });

  it('does not apply material rules when no material matches', () => {
    const state = createBaseState();

    state.components.push({
      id: 'body-1',
      function: 'BODY',
      position: 'CENTER',
      material: {
        name: 'Rabbit Strip',
      },
    });

    const result = MechanicalRuleEvaluator.evaluate(state);

    expect(result.appliedRules).toHaveLength(0);
  });
});
