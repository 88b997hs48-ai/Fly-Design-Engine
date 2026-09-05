import { describe, expect, it } from 'vitest';
import { ProposalManager } from '../src/core/proposals/ProposalManager';

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
