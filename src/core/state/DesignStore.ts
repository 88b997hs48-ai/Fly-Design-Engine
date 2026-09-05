import {
  DesignState,
  FlyComponent,
} from '../design/types';
import {
  DesignOperation,
  applyOperationToSnapshot,
} from '../operations/DesignOperation';
import {
  RuleEvaluator,
  RuleViolation,
} from '../rules/RuleEvaluator';
import { RevisionGraph } from './RevisionGraph';

export type DesignListener = (state: DesignState) => void;

export class RuleValidationError extends Error {
  public readonly violations: RuleViolation[];

  constructor(violations: RuleViolation[]) {
    super(
      `Design operation failed rule validation: ${violations
        .map((violation) => violation.message)
        .join('; ')}`,
    );

    this.name = 'RuleValidationError';
    this.violations = structuredClone(violations);
  }
}

export class DesignStore {
  private state: DesignState;
  private readonly listeners = new Set<DesignListener>();
  private readonly revisionGraph: RevisionGraph;

  constructor(initialState: DesignState) {
    const initialSnapshot = cloneState(initialState);

    const evaluation = RuleEvaluator.evaluateSnapshot(initialSnapshot);

    if (!evaluation.isValid) {
      throw new RuleValidationError(evaluation.violations);
    }

    this.state = initialSnapshot;
    this.revisionGraph = new RevisionGraph(initialSnapshot);
  }

  public getState(): DesignState {
    return cloneState(this.state);
  }

  public subscribe(listener: DesignListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  public applyOperation(operation: DesignOperation): DesignState {
    const currentSnapshot = this.getState();

    const candidateSnapshot = applyOperationToSnapshot(currentSnapshot, operation);

    const evaluation = RuleEvaluator.evaluateSnapshot(candidateSnapshot);

    if (!evaluation.isValid) {
      throw new RuleValidationError(evaluation.violations);
    }

    const parentRevisionId = this.state.revisionId;

    candidateSnapshot.revisionId = createRevisionId();

    this.revisionGraph.addRevision(
      candidateSnapshot,
      parentRevisionId,
    );

    this.state = candidateSnapshot;

    this.notify();

    return this.getState();
  }

  public applyOperationToSnapshot(
    operation: DesignOperation,
  ): DesignState {
    return applyOperationToSnapshot(
      this.getState(),
      operation,
    );
  }

  public addComponent(component: FlyComponent): DesignState {
    return this.applyOperation({
      type: 'ADD_COMPONENT',
      component,
    });
  }

  public removeComponent(componentId: string): DesignState {
    return this.applyOperation({
      type: 'REMOVE_COMPONENT',
      componentId,
    });
  }

  public updateComponent(
    componentId: string,
    updates: Partial<FlyComponent>,
  ): DesignState {
    return this.applyOperation({
      type: 'UPDATE_COMPONENT',
      componentId,
      updates,
    });
  }

  public replaceState(nextState: DesignState): DesignState {
    if (nextState.designId !== this.state.designId) {
      throw new Error(
        `Cannot replace design '${this.state.designId}' with design '${nextState.designId}'.`,
      );
    }

    const candidateSnapshot = cloneState(nextState);

    const evaluation =
      RuleEvaluator.evaluateSnapshot(candidateSnapshot);

    if (!evaluation.isValid) {
      throw new RuleValidationError(evaluation.violations);
    }

    const parentRevisionId = this.state.revisionId;

    candidateSnapshot.revisionId = createRevisionId();

    this.revisionGraph.addRevision(
      candidateSnapshot,
      parentRevisionId,
    );

    this.state = candidateSnapshot;

    this.notify();

    return this.getState();
  }

  public getRevisionGraph(): RevisionGraph {
    return this.revisionGraph;
  }

  private notify(): void {
    const snapshot = this.getState();

    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

function createRevisionId(): string {
  return `rev-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
}

function cloneState(state: DesignState): DesignState {
  return structuredClone(state);
}
