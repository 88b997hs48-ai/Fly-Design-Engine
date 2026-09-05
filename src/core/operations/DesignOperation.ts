import { DesignState, FlyComponent } from '../design/types';

export type DesignOperation =
  | {
      type: 'ADD_COMPONENT';
      component: FlyComponent;
    }
  | {
      type: 'REMOVE_COMPONENT';
      componentId: string;
    }
  | {
      type: 'UPDATE_COMPONENT';
      componentId: string;
      updates: Partial<FlyComponent>;
    };

export function applyOperationToSnapshot(
  snapshot: DesignState,
  operation: DesignOperation,
): DesignState {
  const nextState = structuredClone(snapshot);

  switch (operation.type) {
    case 'ADD_COMPONENT': {
      nextState.components.push(structuredClone(operation.component));
      return nextState;
    }

    case 'REMOVE_COMPONENT': {
  const componentExists = nextState.components.some(
    (component) => component.id === operation.componentId,
  );

  if (!componentExists) {
    throw new Error(
      `Component '${operation.componentId}' was not found.`,
    );
  }

  nextState.components = nextState.components.filter(
    (component) => component.id !== operation.componentId,
  );

  return nextState;
}

    case 'UPDATE_COMPONENT': {
      const component = nextState.components.find(
        (candidate) => candidate.id === operation.componentId,
      );

      if (!component) {
        throw new Error(
          `Component '${operation.componentId}' was not found.`,
        );
      }

      Object.assign(component, structuredClone(operation.updates));
      return nextState;
    }
  }
}
