import { describe, expect, it } from 'vitest';
import {
  buildFlyMechanicalProfile,
  FLY_DESIGN_ENGINE_VERSION,
  FlyDesign,
} from '../src';


describe('public API', () => {
  it('exports the combined mechanical profile engine', () => {
    const design: FlyDesign = {
      id: 'public-api-test',
      name: 'Public API Test Streamer',
      category: 'streamer',
      hook: {
        size: '2',
        style: 'streamer',
      },
      materials: [
        {
          id: 'keel-weight',
          name: 'Lead-free wire',
          placement: 'underbody',
          functions: ['weight', 'stability'],
        },
        {
          id: 'head-deer-hair',
          name: 'Deer hair',
          placement: 'head',
          functions: [
            'buoyancy',
            'profile',
            'water-displacement',
          ],
        },
      ],
    };

    const result =
      buildFlyMechanicalProfile(design);

    expect(FLY_DESIGN_ENGINE_VERSION).toBe('0.1.0');

    expect(result.interactions[0].interaction).toBe(
      'Low ballast + buoyant head',
    );

    expect(result.profile.stability).toBeGreaterThan(0);
    expect(result.reasons).toHaveLength(3);
  });
});
