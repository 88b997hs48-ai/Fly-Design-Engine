import { DesignState, RevisionId } from '../design/types';

export interface RevisionNode {
  revisionId: RevisionId;
  parentRevisionId?: RevisionId;
  snapshot: DesignState;
  createdAt: string;
}

export class RevisionGraph {
  private readonly revisions = new Map<RevisionId, RevisionNode>();

  private currentRevisionId: RevisionId;

  constructor(initialState: DesignState) {
    const snapshot = structuredClone(initialState);

    const initialRevision: RevisionNode = {
      revisionId: snapshot.revisionId,
      snapshot,
      createdAt: new Date().toISOString(),
    };

    this.revisions.set(snapshot.revisionId, initialRevision);
    this.currentRevisionId = snapshot.revisionId;
  }

  public getCurrentRevision(): RevisionNode {
    return this.getRevision(this.currentRevisionId);
  }

  public getRevision(revisionId: RevisionId): RevisionNode {
    const revision = this.revisions.get(revisionId);

    if (!revision) {
      throw new Error(`Revision '${revisionId}' was not found.`);
    }

    return cloneRevision(revision);
  }

  public addRevision(
    state: DesignState,
    parentRevisionId: RevisionId = this.currentRevisionId,
  ): RevisionNode {
    if (!this.revisions.has(parentRevisionId)) {
      throw new Error(
        `Parent revision '${parentRevisionId}' was not found.`,
      );
    }

    if (this.revisions.has(state.revisionId)) {
      throw new Error(
        `Revision '${state.revisionId}' already exists.`,
      );
    }

    const revision: RevisionNode = {
      revisionId: state.revisionId,
      parentRevisionId,
      snapshot: structuredClone(state),
      createdAt: new Date().toISOString(),
    };

    this.revisions.set(revision.revisionId, revision);
    this.currentRevisionId = revision.revisionId;

    return cloneRevision(revision);
  }

  public hasRevision(revisionId: RevisionId): boolean {
    return this.revisions.has(revisionId);
  }

  public getRevisionCount(): number {
    return this.revisions.size;
  }

  public getHistory(): RevisionNode[] {
    return Array.from(this.revisions.values()).map(cloneRevision);
  }
}

function cloneRevision(revision: RevisionNode): RevisionNode {
  return structuredClone(revision);
}
