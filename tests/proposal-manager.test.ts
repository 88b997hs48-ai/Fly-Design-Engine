import { describe, expect, it } from 'vitest';
import { ProposalManager } from '../src/core/proposals/ProposalManager';
import { DesignStore } from '../src/core/state/DesignStore';
import { DesignState } from '../src/core/design/types';
describe('ProposalManager', () => {
  it('creates and retrieves a pending proposal', () => {
    const manager = new ProposalManager();

    const proposal = manager.createProposal(
      'AI',
      'Add a body component.',
      [
        {
          type: 'ADD_COMPONENT',
          component: {
            id: 'body-proposal',
            function: 'BODY',
            position: 'CENTER',
          },
        },
      ],
    );

    expect(proposal.status).toBe('PENDING');
    expect(proposal.source).toBe('AI');
    expect(manager.getProposalCount()).toBe(1);

    const retrieved = manager.getProposal(proposal.id);

    expect(retrieved).toEqual(proposal);
  });

  it('protects stored proposals from external mutation', () => {
    const manager = new ProposalManager();

    const proposal = manager.createProposal(
      'AI',
      'Add a body component.',
      [
        {
          type: 'ADD_COMPONENT',
          component: {
            id: 'body-proposal',
            function: 'BODY',
            position: 'CENTER',
          },
        },
      ],
    );

    proposal.explanation = 'tampered';

    const stored = manager.getProposal(proposal.id);

    expect(stored?.explanation).toBe('Add a body component.');
  });

  it('rejects a pending proposal', () => {
    const manager = new ProposalManager();

    const proposal = manager.createProposal(
      'AI',
      'Add a body component.',
      [
        {
          type: 'ADD_COMPONENT',
          component: {
            id: 'body-proposal',
            function: 'BODY',
            position: 'CENTER',
          },
        },
      ],
    );

    const rejected = manager.rejectProposal(proposal.id);

    expect(rejected.status).toBe('REJECTED');
    expect(manager.getProposal(proposal.id)?.status).toBe('REJECTED');
  });

  it('does not allow a rejected proposal to be rejected again', () => {
    const manager = new ProposalManager();

    const proposal = manager.createProposal(
      'AI',
      'Add a body component.',
      [
        {
          type: 'ADD_COMPONENT',
          component: {
            id: 'body-proposal',
            function: 'BODY',
            position: 'CENTER',
          },
        },
      ],
    );

    manager.rejectProposal(proposal.id);

    expect(() =>
      manager.rejectProposal(proposal.id),
    ).toThrow(`Proposal '${proposal.id}' is already rejected.`);
  });
});

it('accepts a proposal and applies its operation to the design store', () => {
  const manager = new ProposalManager();

  const initialState: DesignState = {
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
      buoyancy: 'LOW',
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
      buoyancy: 'LOW',
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

  const store = new DesignStore(initialState);

  const beforeRevisionCount =
    store.getRevisionGraph().getRevisionCount();

  const proposal = manager.createProposal(
    'AI',
    'Add a body component.',
    [
      {
        type: 'ADD_COMPONENT',
        component: {
          id: 'body-accepted',
          function: 'BODY',
          position: 'CENTER',
        },
      },
    ],
  );

  const accepted = manager.acceptProposal(
    proposal.id,
    store,
  );

  expect(accepted.status).toBe('ACCEPTED');
  expect(
    store.getState().components.some(
      component => component.id === 'body-accepted',
    ),
  ).toBe(true);

  expect(
    store.getRevisionGraph().getRevisionCount(),
  ).toBe(beforeRevisionCount + 1);
});

it('does not mutate the design when an invalid proposal fails', () => {
  const manager = new ProposalManager();

  const initialState: DesignState = {
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
      buoyancy: 'LOW',
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
      buoyancy: 'LOW',
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

  const store = new DesignStore(initialState);
  const beforeState = store.getState();
  const beforeRevisionCount =
    store.getRevisionGraph().getRevisionCount();

  const proposal = manager.createProposal(
    'AI',
    'Remove the required hook.',
    [
      {
        type: 'REMOVE_COMPONENT',
        componentId: 'hook',
      },
    ],
  );

  expect(() =>
    manager.acceptProposal(proposal.id, store),
  ).toThrow();

  expect(store.getState()).toEqual(beforeState);

  expect(
    store.getRevisionGraph().getRevisionCount(),
  ).toBe(beforeRevisionCount);

  expect(
    manager.getProposal(proposal.id)?.status,
  ).toBe('PENDING');
it('does not allow an accepted proposal to be accepted again', () => {
  const manager = new ProposalManager();

  const initialState: DesignState = {
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
      buoyancy: 'LOW',
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
      buoyancy: 'LOW',
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

  const store = new DesignStore(initialState);

  const proposal = manager.createProposal(
    'AI',
    'Add a body component.',
    [
      {
        type: 'ADD_COMPONENT',
        component: {
          id: 'body-once',
          function: 'BODY',
          position: 'CENTER',
        },
      },
    ],
  );

  manager.acceptProposal(proposal.id, store);

  expect(() =>
    manager.acceptProposal(proposal.id, store),
  ).toThrow(`Proposal '${proposal.id}' is already accepted.`);
});
});
