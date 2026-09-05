import { DesignOperation } from '../operations/DesignOperation';

export type ProposalSource =
  | 'AI'
  | 'RULE_ENGINE'
  | 'USER'
  | 'SYSTEM';

export type ProposalStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED';

export interface DesignProposal {
  id: string;
  source: ProposalSource;
  explanation: string;
  operations: DesignOperation[];
  status: ProposalStatus;
  createdAt: string;
}
