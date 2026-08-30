import { describe, expect, it } from 'vitest';
import { RuleEvaluator } from './RuleEvaluator';
import { DesignState } from '../design/types';

function createBaseDesign(
  components: DesignState['components'] = [],
): DesignState {
  return {
    designId: 'design-test',
    revisionId: 'rev-test',
    intent: {
      species: 'brown trout',
      forage: 'sculpin',
      goals: ['produce a convincing sculpin profile'],
    },
    architecture: 'single-hook streamer',
    desiredMechanics: {
      movement: 'HIGH',
      sinkRate: 'MODERATE',
      buoyancy: 'LOW',
      profile: 'HIGH',
      drag: 'LOW',
      waterDisplacement: 'MODERATE',
      stability: 'HIGH',
      translucency: 'MODERATE',
      flash: 'LOW',
      flexibility: 'HIGH',
      durability: 'HIGH',
    },
    predictedMechanics: {
      movement: 'HIGH',
      sinkRate: 'MODERATE',
      buoyancy: 'LOW',
      profile: 'HIGH',
      drag: 'LOW',
      waterDisplacement: 'MODERATE',
      stability: 'HIGH',
      translucency: 'MODERATE',
      flash: 'LOW',
      flexibility: 'HIGH',
      durability: 'HIGH',
    },
    components,
  };
}

describe('RuleEvaluator', () => {
  it('accepts a structurally valid design', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
      },
      {
        id: 'head-1',
        function: 'HEAD',
        position: 'FRONT',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it('rejects duplicate component IDs', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
      },
      {
        id: 'hook-1',
        function: 'HEAD',
        position: 'FRONT',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(false);
    expect(
      result.violations.some(
        (violation) => violation.ruleId === 'COMPONENT_ID_UNIQUE',
      ),
    ).toBe(true);
  });

  it('rejects dependencies that reference missing components', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
        dependencies: ['missing-component'],
      },
      {
        id: 'head-1',
        function: 'HEAD',
        position: 'FRONT',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(false);
    expect(
      result.violations.some(
        (violation) => violation.ruleId === 'DEPENDENCY_EXISTS',
      ),
    ).toBe(true);
  });

  it('rejects a design without a hook', () => {
    const design = createBaseDesign([
      {
        id: 'head-1',
        function: 'HEAD',
        position: 'FRONT',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(false);
    expect(
      result.violations.some(
        (violation) => violation.ruleId === 'HOOK_REQUIRED',
      ),
    ).toBe(true);
  });

  it('rejects a design without a head', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(false);
    expect(
      result.violations.some(
        (violation) => violation.ruleId === 'HEAD_REQUIRED',
      ),
    ).toBe(true);
  });

  it('rejects a tail without a body', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
      },
      {
        id: 'head-1',
        function: 'HEAD',
        position: 'FRONT',
      },
      {
        id: 'tail-1',
        function: 'TAIL',
        position: 'REAR',
      },
    ]);

    const result = RuleEvaluator.evaluateSnapshot(design);

    expect(result.isValid).toBe(false);
    expect(
      result.violations.some(
        (violation) => violation.ruleId === 'TAIL_BODY_RELATIONSHIP',
      ),
    ).toBe(true);
  });

  it('does not mutate the supplied design', () => {
    const design = createBaseDesign([
      {
        id: 'hook-1',
        function: 'HOOK',
        position: 'EYE',
      },
      {
        id: 'head-1',
        function: 'HEAD',
        position: 'FRONT',
      },
    ]);

    const before = structuredClone(design);

    RuleEvaluator.evaluateSnapshot(design);

    expect(design).toEqual(before);
  });
});
