import { describe, expect, it } from 'vitest';
import { MechanicalPredictionEngine } from '../src/core/mechanics/MechanicalPredictionEngine';
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

describe('MechanicalPredictionEngine', () => {
  it('predicts increased sink rate from lead wire', () => {
    const state = createBaseState();

    state.components.push({
      id: 'weight-1',
      function: 'WEIGHT',
      position: 'CENTER',
      material: {
        name: 'Lead Wire',
      },
    });

    const result = MechanicalPredictionEngine.predict(state);

    const sinkRate = result.predictions.find(
      prediction => prediction.property === 'sinkRate',
    );

    expect(sinkRate?.direction).toBe('INCREASE');
    expect(sinkRate?.score).toBe(3);
    expect(sinkRate?.contributingRules).toContain(
      'material-lead-wire-sink-rate',
    );
  });

  it('predicts drag and buoyancy increases from deer hair', () => {
    const state = createBaseState();

    state.components.push({
      id: 'deer-hair-head',
      function: 'HEAD',
      position: 'FRONT',
      material: {
        name: 'Spun Deer Hair',
      },
    });

    const result = MechanicalPredictionEngine.predict(state);

    const drag = result.predictions.find(
      prediction => prediction.property === 'drag',
    );

    const buoyancy = result.predictions.find(
      prediction => prediction.property === 'buoyancy',
    );

    expect(drag?.direction).toBe('INCREASE');
    expect(drag?.score).toBe(3);

    expect(buoyancy?.direction).toBe('INCREASE');
    expect(buoyancy?.score).toBe(2);
  });

  it('combines multiple contributions to the same property', () => {
    const state = createBaseState();

    state.components.push(
      {
        id: 'deer-hair-1',
        function: 'HEAD',
        position: 'FRONT',
        material: {
          name: 'Deer Hair',
        },
      },
      {
        id: 'deer-hair-2',
        function: 'BODY',
        position: 'CENTER',
        material: {
          name: 'Stacked Deer Hair',
        },
      },
    );

    const result = MechanicalPredictionEngine.predict(state);

    const drag = result.predictions.find(
      prediction => prediction.property === 'drag',
    );

    expect(drag?.direction).toBe('INCREASE');
    expect(drag?.score).toBe(6);
  });

  it('returns no predictions when no mechanical rules apply', () => {
    const state = createBaseState();

    const result = MechanicalPredictionEngine.predict(state);

    expect(result.predictions).toHaveLength(0);
    expect(result.appliedRules).toHaveLength(0);
  });
});
