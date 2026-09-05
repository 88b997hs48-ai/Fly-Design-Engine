import { describe, expect, it } from 'vitest';
import {
  DesignStore,
  RuleValidationError,
} from '../src/core/state/DesignStore';
import { DesignState, FlyComponent } from '../src/core/design/types';
function createComponent(
  id: string,
  functionName: FlyComponent['function'],
): FlyComponent {
  return {
    id,
    function: functionName,
    position: 'CENTER',
  };
}
function createValidState(): DesignState {
  return {
    designId: 'design-test',
    revisionId: 'rev-initial',
    intent: {
      species: 'brown trout',
      forage: 'baitfish',
      goals: ['movement'],
    },
    architecture: 'single-hook streamer',
    desiredMechanics: {
      movement: 'HIGH',
      sinkRate: 'MODERATE',
      buoyancy: 'LOW',
      profile: 'MODERATE',
      drag: 'LOW',
      waterDisplacement: 'MODERATE',
      stability: 'HIGH',
      translucency: 'MODERATE',
      flash: 'MODERATE',
      flexibility: 'HIGH',
      durability: 'HIGH',
    },
    predictedMechanics: {
      movement: 'HIGH',
      sinkRate: 'MODERATE',
      buoyancy: 'LOW',
      profile: 'MODERATE',
      drag: 'LOW',
      waterDisplacement: 'MODERATE',
      stability: 'HIGH',
      translucency: 'MODERATE',
      flash: 'MODERATE',
      flexibility: 'HIGH',
      durability: 'HIGH',
    },
    components: [
      createComponent('hook', 'HOOK'),
      createComponent('head', 'HEAD'),
    ],
  };
}
describe('DesignStore — rule authority and mutation isolation', () => {
  it('accepts a valid component addition', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    const after = store.addComponent(
      createComponent('body', 'BODY'),
    );
    expect(after.components).toHaveLength(
      before.components.length + 1,
    );
    expect(
      after.components.some((component) => component.id === 'body'),
    ).toBe(true);
    expect(after.revisionId).not.toBe(before.revisionId);
  });
  it('rejects duplicate component IDs', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    expect(() =>
      store.addComponent(createComponent('hook', 'HOOK')),
    ).toThrow(RuleValidationError);
    expect(store.getState()).toEqual(before);
  });
  it('rejects a component with a missing dependency', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    const dependentComponent = {
      ...createComponent('wing', 'WING'),
      dependencies: ['missing-component'],
    };
    expect(() =>
      store.addComponent(dependentComponent),
    ).toThrow(RuleValidationError);
    expect(store.getState()).toEqual(before);
  });
  it('does not create a revision when validation fails', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    const beforeGraph = store.getRevisionGraph().getRevision(
      before.revisionId,
    );
    expect(() =>
      store.addComponent(createComponent('hook', 'HOOK')),
    ).toThrow(RuleValidationError);
    const after = store.getState();
    expect(after.revisionId).toBe(before.revisionId);
    expect(
      store.getRevisionGraph().getRevision(before.revisionId),
    ).toEqual(beforeGraph);
  });
  it('does not notify listeners when validation fails', () => {
    const store = new DesignStore(createValidState());
    let notificationCount = 0;
    store.subscribe(() => {
      notificationCount += 1;
    });
    expect(() =>
      store.addComponent(createComponent('hook', 'HOOK')),
    ).toThrow(RuleValidationError);
    expect(notificationCount).toBe(0);
  });
  it('rejects removing the hook when that would violate the architecture', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    expect(() =>
      store.removeComponent('hook'),
    ).toThrow(RuleValidationError);
    expect(store.getState()).toEqual(before);
  });
  it('rejects a tail without a body', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    expect(() =>
      store.addComponent(createComponent('tail', 'TAIL')),
    ).toThrow(RuleValidationError);
    expect(store.getState()).toEqual(before);
  });
  it('allows a valid body and tail architecture', () => {
    const store = new DesignStore(createValidState());
    store.addComponent(
      createComponent('body', 'BODY'),
    );
    const after = store.addComponent(
      createComponent('tail', 'TAIL'),
    );
    expect(
      after.components.some((component) => component.id === 'body'),
    ).toBe(true);
    expect(
      after.components.some((component) => component.id === 'tail'),
    ).toBe(true);
  });
  it('throws when updating a component that does not exist', () => {
    const store = new DesignStore(createValidState());
    const before = store.getState();
    expect(() =>
      store.updateComponent('does-not-exist', {
        position: 'REAR',
      }),
    ).toThrow();
    expect(store.getState()).toEqual(before);
  });
it('rejects removing a component that does not exist', () => {
  const store = new DesignStore(createValidState());

  const before = store.getState();

  expect(() =>
    store.removeComponent('does-not-exist'),
  ).toThrow("Component 'does-not-exist' was not found.");

  expect(store.getState()).toEqual(before);
});

it('creates exactly one new revision after a successful operation', () => {
  const store = new DesignStore(createValidState());

  const graph = store.getRevisionGraph();
  const beforeCount = graph.getRevisionCount();

  store.addComponent({
    id: 'body-1',
    function: 'BODY',
    position: 'CENTER',
  });

  expect(graph.getRevisionCount()).toBe(beforeCount + 1);
});

it('does not create a revision after a failed operation', () => {
  const store = new DesignStore(createValidState());

  const graph = store.getRevisionGraph();
  const beforeCount = graph.getRevisionCount();

  expect(() =>
    store.removeComponent('does-not-exist'),
  ).toThrow();

  expect(graph.getRevisionCount()).toBe(beforeCount);
});

it('does not allow retrieved revision history to mutate stored revisions', () => {
  const store = new DesignStore(createValidState());

  const graph = store.getRevisionGraph();
  const originalRevisionId = store.getState().revisionId;

  const revision = graph.getRevision(originalRevisionId);

  if (!revision) {
    throw new Error('Expected initial revision to exist.');
  }

  revision.snapshot.components[0].id = 'tampered-hook';

  const storedRevision = graph.getRevision(originalRevisionId);

  expect(storedRevision?.snapshot.components[0].id).toBe('hook-1');
});
  
   });
