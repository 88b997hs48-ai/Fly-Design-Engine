import { DesignState, FlyComponent } from '../design/types';
import {
  DesignRule,
  MechanicalEffect,
  RuleCondition,
} from './DesignRule';
import { DESIGN_RULES } from './RuleCatalog';

export interface AppliedRule {
  ruleId: string;
  ruleName: string;
  componentId: string;
  effects: MechanicalEffect[];
}

export interface MechanicalRuleEvaluationResult {
  appliedRules: AppliedRule[];
}

export class MechanicalRuleEvaluator {
  public static evaluate(
    state: DesignState,
    rules: DesignRule[] = DESIGN_RULES,
  ): MechanicalRuleEvaluationResult {
    const appliedRules: AppliedRule[] = [];

    for (const component of state.components) {
      for (const rule of rules) {
        if (!this.matchesRule(component, rule.conditions)) {
          continue;
        }

        appliedRules.push({
          ruleId: rule.id,
          ruleName: rule.name,
          componentId: component.id,
          effects: structuredClone(rule.effects),
        });
      }
    }

    return {
      appliedRules,
    };
  }

  private static matchesRule(
    component: FlyComponent,
    conditions: RuleCondition[],
  ): boolean {
    return conditions.every(
      condition => this.matchesCondition(component, condition),
    );
  }

  private static matchesCondition(
    component: FlyComponent,
    condition: RuleCondition,
  ): boolean {
    if (
      condition.componentFunction &&
      component.function !== condition.componentFunction
    ) {
      return false;
    }

    if (condition.materialIncludes) {
      const materialName = component.material?.name?.toLowerCase();

      if (!materialName) {
        return false;
      }

      const matchesMaterial = condition.materialIncludes.some(
        material =>
          materialName.includes(material.toLowerCase()),
      );

      if (!matchesMaterial) {
        return false;
      }
    }

    return true;
  }
}
