import {
  DesignState,
  FlyComponent,
  ComponentFunction,
} from '../design/types';

export interface RuleViolation {
  ruleId: string;
  message: string;
  field?: string;
}

export interface RuleEvaluationResult {
  isValid: boolean;
  violations: RuleViolation[];
}

export class RuleEvaluator {
  public static evaluateSnapshot(
    snapshot: DesignState,
  ): RuleEvaluationResult {
    const violations: RuleViolation[] = [];

    this.requireCoreState(snapshot, violations);
    this.validateComponentIds(snapshot, violations);
    this.validateComponentDependencies(snapshot, violations);
    this.validateFunctionalArchitecture(snapshot, violations);

    return {
      isValid: violations.length === 0,
      violations,
    };
  }

  private static requireCoreState(
    snapshot: DesignState,
    violations: RuleViolation[],
  ): void {
    if (!snapshot.designId) {
      violations.push({
        ruleId: 'DESIGN_ID_REQUIRED',
        message: 'A design must have a designId.',
        field: 'designId',
      });
    }

    if (!snapshot.revisionId) {
      violations.push({
        ruleId: 'REVISION_ID_REQUIRED',
        message: 'A design must have a revisionId.',
        field: 'revisionId',
      });
    }

    if (!snapshot.intent) {
      violations.push({
        ruleId: 'DESIGN_INTENT_REQUIRED',
        message: 'A design must have design intent.',
        field: 'intent',
      });
    }

    if (!Array.isArray(snapshot.components)) {
      violations.push({
        ruleId: 'COMPONENTS_REQUIRED',
        message: 'A design must contain a components collection.',
        field: 'components',
      });
    }
  }

  private static validateComponentIds(
    snapshot: DesignState,
    violations: RuleViolation[],
  ): void {
    const seenIds = new Set<string>();

    for (const component of snapshot.components) {
      if (!component.id) {
        violations.push({
          ruleId: 'COMPONENT_ID_REQUIRED',
          message: 'Every fly component must have a unique id.',
          field: 'components',
        });
        continue;
      }

      if (seenIds.has(component.id)) {
        violations.push({
          ruleId: 'COMPONENT_ID_UNIQUE',
          message: `Component id '${component.id}' is duplicated.`,
          field: `components.${component.id}`,
        });
      }

      seenIds.add(component.id);
    }
  }

  private static validateComponentDependencies(
    snapshot: DesignState,
    violations: RuleViolation[],
  ): void {
    const componentIds = new Set(
      snapshot.components.map((component) => component.id),
    );

    for (const component of snapshot.components) {
      for (const dependency of component.dependencies ?? []) {
        if (!componentIds.has(dependency)) {
          violations.push({
            ruleId: 'DEPENDENCY_EXISTS',
            message: `Component '${component.id}' depends on missing component '${dependency}'.`,
            field: `components.${component.id}.dependencies`,
          });
        }
      }
    }
  }

  private static validateFunctionalArchitecture(
    snapshot: DesignState,
    violations: RuleViolation[],
  ): void {
    const functions = new Set<ComponentFunction>(
      snapshot.components.map((component) => component.function),
    );

    if (!functions.has('HOOK')) {
      violations.push({
        ruleId: 'HOOK_REQUIRED',
        message: 'A fly design must contain a hook component.',
        field: 'components',
      });
    }

    if (!functions.has('HEAD')) {
      violations.push({
        ruleId: 'HEAD_REQUIRED',
        message: 'A fly design must contain a head component.',
        field: 'components',
      });
    }

    if (functions.has('TAIL') && !functions.has('BODY')) {
      violations.push({
        ruleId: 'TAIL_BODY_RELATIONSHIP',
        message:
          'A design with a tail should normally define a body component.',
        field: 'components',
      });
    }
  }
}
