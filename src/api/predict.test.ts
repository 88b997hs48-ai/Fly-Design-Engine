import { describe, expect, it } from 'vitest';
import { runMechanicalPrediction } from './predict';
import { DesignState } from '../core/design/types';

function createBaseState(): DesignState {
  return {
    designId: 'design-api-test',
    revisionId: 'revision-api-test',
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

describe('runMechanicalPrediction', () => {
  it('returns an error when no design is provided', () => {
    const result = runMechanicalPrediction(
      {} as {
        design: DesignState;
      },
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('A fly design is required.');
  });

  it('returns a mechanical prediction for a valid design', () => {
    const result = runMechanicalPrediction({
      design: createBaseState(),
    });

    expect(result.success).toBe(true);
    expect(result.prediction).toBeDefined();
    expect(result.prediction?.predictions).toBeDefined();
    expect(result.prediction?.appliedRules).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
