import { describe, expect, it } from 'vitest';
import {
  buildFlyMechanicalProfile,
} from '../src/core/mechanics/FlyMechanicalProfileEngine';
import {
  adaptFlyDesignToMechanicalInput,
} from '../src/core/mechanics/FlyDesignMechanicalAdapter';
import { testStreamer } from '../src/examples/testStreamer';


describe('FlyMechanicalProfileEngine', () => {
  it('combines material and interaction stability', () => {
    const baseProfile =
      adaptFlyDesignToMechanicalInput(testStreamer);

    const result =
      buildFlyMechanicalProfile(testStreamer);

    expect(result.profile.stability).toBe(
      baseProfile.stability + 2,
    );

    expect(result.interactions).toHaveLength(1);

    expect(result.interactions[0].interaction).toBe(
      'Low ballast + buoyant head',
    );
  });


  it('preserves interaction reasons for traceability', () => {
    const result =
      buildFlyMechanicalProfile(testStreamer);

    expect(result.reasons).toContain(
      'Weight concentrated low in the fly increases keel influence.',
    );

    expect(result.reasons).toContain(
      'Buoyant deer hair concentrated at the head opposes the low ballast.',
    );

    expect(result.reasons).toContain(
      'The separation between ballast and buoyancy increases self-righting stability.',
    );
  });
});
