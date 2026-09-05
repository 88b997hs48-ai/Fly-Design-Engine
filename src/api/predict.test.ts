import { runMechanicalPrediction } from './predict';
import { DesignState } from '../core/design/types';

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
    const design = {
      materials: [],
      components: [],
    } as unknown as DesignState;

    const result = runMechanicalPrediction({
      design,
    });

    expect(result.success).toBe(true);
    expect(result.prediction).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
