import { describe, expect, it } from 'vitest';
import { MechanicalInteractionEngine } from '../src/core/mechanics/MechanicalInteractionEngine';
import { testStreamer } from '../src/examples/testStreamer';


describe('MechanicalInteractionEngine', () => {
  it('recognizes low underbody ballast paired with a buoyant deer-hair head', () => {
    const engine = new MechanicalInteractionEngine();

    const interactions = engine.evaluate(testStreamer);

    expect(interactions).toHaveLength(1);
    expect(interactions[0].interaction).toBe(
      'Low ballast + buoyant head',
    );
    expect(interactions[0].effects.stability).toBe(2);
    expect(interactions[0].reasons).toHaveLength(3);
  });


  it('does not apply the interaction when underbody ballast is absent', () => {
    const engine = new MechanicalInteractionEngine();

    const designWithoutBallast = {
      ...testStreamer,
      materials: testStreamer.materials.filter(
        material => material.id !== 'keel-weight',
      ),
    };

    const interactions = engine.evaluate(designWithoutBallast);

    expect(interactions).toHaveLength(0);
  });
});
