import {
  DesignState,
  FlyComponent,
} from '../design/types';

export type DesignListener = (state: DesignState) => void;

export class DesignStore {
  private state: DesignState;
  private readonly listeners = new Set<DesignListener>();

  constructor(initialState: DesignState) {
    this.state = cloneState(initialState);
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

  public addComponent(component: FlyComponent): DesignState {
    const nextState = cloneState(this.state);

    nextState.components.push(cloneComponent(component));
    nextState.revisionId = createRevisionId();

    this.state = nextState;
    this.notify();

    return this.getState();
  }

  public removeComponent(componentId: string): DesignState {
    const nextState = cloneState(this.state);

    nextState.components = nextState.components.filter(
      (component) => component.id !== componentId,
    );

    nextState.revisionId = createRevisionId();

    this.state = nextState;
    this.notify();

    return this.getState();
  }

  public updateComponent(
    componentId: string,
    updates: Partial<FlyComponent>,
  ): DesignState {
    const nextState = cloneState(this.state);

    const component = nextState.components.find(
      (candidate) => candidate.id === componentId,
    );

    if (!component) {
      throw new Error(`Component '${componentId}' was not found.`);
    }

    Object.assign(component, cloneComponent(updates as FlyComponent));

    nextState.revisionId = createRevisionId();

    this.state = nextState;
    this.notify();

    return this.getState();
  }

  public replaceState(nextState: DesignState): DesignState {
    if (nextState.designId !== this.state.designId) {
      throw new Error(
        `Cannot replace design '${this.state.designId}' with design '${nextState.designId}'.`,
      );
    }

    this.state = cloneState(nextState);
    this.state.revisionId = createRevisionId();

    this.notify();

    return this.getState();
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

function cloneComponent(component: FlyComponent): FlyComponent {
  return structuredClone(component);
}
