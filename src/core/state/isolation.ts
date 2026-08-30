import { DesignState } from '../design/types';
import { RevisionNode } from './RevisionGraph';

export function cloneIsolated<T>(value: T): T {
  return structuredClone(value);
}

export function freezeDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  Object.freeze(value);

  for (const key of Object.keys(value)) {
    const child = (value as Record<string, unknown>)[key];

    if (child !== null && typeof child === 'object' && !Object.isFrozen(child)) {
      freezeDeep(child);
    }
  }

  return value;
}

export function cloneAndFreeze<T>(value: T): T {
  return freezeDeep(cloneIsolated(value));
}

export function cloneDesignState(state: DesignState): DesignState {
  return cloneIsolated(state);
}

export function cloneRevisionNode(node: RevisionNode): RevisionNode {
  return cloneIsolated(node);
}
