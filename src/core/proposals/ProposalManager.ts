import { DesignProposal, ProposalSource } from './DesignProposal';
import {
  DesignOperation,
  applyOperationToSnapshot,
} from '../operations/DesignOperation';
import { DesignStore } from '../state/DesignStore';

export class ProposalManager {
  private readonly proposals = new Map<string, DesignProposal>();

  public createProposal(
    source: ProposalSource,
    explanation: string,
    operations: DesignOperation[],
  ): DesignProposal {
    const proposal: DesignProposal = {
      id: createProposalId(),
      source,
      explanation,
      operations: structuredClone(operations),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.proposals.set(proposal.id, structuredClone(proposal));

    return structuredClone(proposal);
  }

  public getProposal(id: string): DesignProposal | undefined {
    const proposal = this.proposals.get(id);

    return proposal ? structuredClone(proposal) : undefined;
  }

  public getProposalCount(): number {
    return this.proposals.size;
  }

  public rejectProposal(id: string): DesignProposal {
    const proposal = this.proposals.get(id);

    if (!proposal) {
      throw new Error(`Proposal '${id}' was not found.`);
    }

    if (proposal.status !== 'PENDING') {
      throw new Error(
        `Proposal '${id}' is already ${proposal.status.toLowerCase()}.`,
      );
    }

    proposal.status = 'REJECTED';

    return structuredClone(proposal)
      public acceptProposal(
    id: string,
    store: DesignStore,
  ): DesignProposal {
    const proposal = this.proposals.get(id);

    if (!proposal) {
      throw new Error(`Proposal '${id}' was not found.`);
    }

    if (proposal.status !== 'PENDING') {
      throw new Error(
        `Proposal '${id}' is already ${proposal.status.toLowerCase()}.`,
      );
    }

    let candidateState = store.getState();

    for (const operation of proposal.operations) {
      candidateState = applyOperationToSnapshot(
        candidateState,
        operation,
      );
    }

    store.replaceState(candidateState);

    proposal.status = 'ACCEPTED';

    return structuredClone(proposal);
  }
      ;
  }
}

function createProposalId(): string {
  return `proposal-${crypto.randomUUID()}`;
}
