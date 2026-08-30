import { describe, expect, it } from 'vitest';
import {
  applyOperationToSnapshot,
  DesignOperation,
} from './DesignOperation';
import { DesignState } from '../design/types';

function createDesign(): DesignState {
  return {
    designId: 'design-test',
    revisionId: 'rev-test',
    intent: {
      species: 'brown trout',
      forage: 'sculpin',
      goals: ['test operation handling'],
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
    components: [
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
    ],
  };
}

describe('DesignOperation', () => {
  it('adds a component without mutating the original snapshot', () => {
    const design = createDesign();

    const operation: DesignOperation = {
      type: 'ADD_COMPONENT',
      component: {
        id: 'body-1',
        function: 'BODY',
        position: 'CENTER',
      },
    };

    const result = applyOperationToSnapshot(design, operation);

    expect(result.components).toHaveLength(3);
    expect(result.components.some((c) => c.id === 'body-1')).toBe(true);
    expect(design.components).toHaveLength(2);
  });

  it('removes a component without mutating the original snapshot', () => {
    const design = createDesign();

    const operation: DesignOperation = {
      type: 'REMOVE_COMPONENT',
      componentId: 'head-1',
    };

    const result = applyOperationToSnapshot(design, operation);

    expect(result.components).toHaveLength(1);
    expect(result.components.some((c) => c.id === 'head-1')).toBe(false);
    expect(design.components).toHaveLength(2);
  });

  it('updates a component without mutating the original snapshot', () => {
    const design = createDesign();

    const operation: DesignOperation = {
      type: 'UPDATE_COMPONENT',
      componentId: 'head-1',
      updates: {
        position: 'MID-FRONT',
      },
    };

    const result = applyOperationToSnapshot(design, operation);

    expect(
      result.components.find((c) => c.id === 'head-1')?.position,
    ).toBe('MID-FRONT');

    expect(
      design.components.find((c) => c.id === 'head-1')?.position,
    ).toBe('FRONT');
  });

  it('throws when updating a component that does not exist', () => {
    const design = createDesign();

    const operation: DesignOperation = {
      type: 'UPDATE_COMPONENT',
      componentId: 'missing',
      updates: {
        position: 'CENTER',
      },
    };

    expect(() => applyOperationToSnapshot(design, operation)).toThrow(
      "Component 'missing' was not found.",
    );
  });

  it('does not change the revision ID while producing a candidate snapshot', () => {
    const design = createDesign();

    const result = applyOperationToSnapshot(design, {
      type: 'ADD_COMPONENT',
      component: {
        id: 'body-1',
        function: 'BODY',
        position: 'CENTER',
      },
    });

    expect(result.revisionId).toBe('rev-test');
  });
});
