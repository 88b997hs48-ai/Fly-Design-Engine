import { DesignRule } from './DesignRule';

export const DESIGN_RULES: DesignRule[] = [
  {
    id: 'material-lead-wire-sink-rate',
    name: 'Lead wire increases sink tendency',
    classification: 'RULE',
    description:
      'Lead or lead-free weighting material generally increases the tendency of a fly to sink.',
    conditions: [
      {
        materialIncludes: [
          'lead wire',
          'lead-free wire',
          'non-toxic wire',
        ],
      },
    ],
    effects: [
      {
        property: 'sinkRate',
        direction: 'INCREASE',
        confidence: 'HIGH',
        rationale:
          'Added dense mass increases the downward force acting on the fly.',
      },
    ],
  },

  {
    id: 'material-deer-hair-drag',
    name: 'Deer hair increases drag',
    classification: 'RULE',
    description:
      'Flared or densely packed deer hair increases frontal area and water resistance.',
    conditions: [
      {
        materialIncludes: [
          'deer hair',
          'spun deer hair',
          'stacked deer hair',
        ],
      },
    ],
    effects: [
      {
        property: 'drag',
        direction: 'INCREASE',
        confidence: 'HIGH',
        rationale:
          'Expanded hair fibers increase frontal area and resistance to water flow.',
      },
    ],
  },

  {
    id: 'material-deer-hair-buoyancy',
    name: 'Deer hair increases buoyancy tendency',
    classification: 'RULE',
    description:
      'Deer hair can trap air and resist sinking, especially when packed densely.',
    conditions: [
      {
        materialIncludes: [
          'deer hair',
          'spun deer hair',
          'stacked deer hair',
        ],
      },
    ],
    effects: [
      {
        property: 'buoyancy',
        direction: 'INCREASE',
        confidence: 'MODERATE',
        rationale:
          'The hollow structure of deer hair can trap air and increase resistance to submergence.',
      },
    ],
  },

  {
    id: 'material-flash-flash-rating',
    name: 'Reflective flash increases optical flash',
    classification: 'RULE',
    description:
      'Reflective synthetic flash materials increase the amount of reflected light produced by the fly.',
    conditions: [
      {
        materialIncludes: [
          'flashabou',
          'krystal flash',
          'holographic flash',
          'flash',
        ],
      },
    ],
    effects: [
      {
        property: 'flash',
        direction: 'INCREASE',
        confidence: 'HIGH',
        rationale:
          'Reflective fibers increase specular light reflection during movement.',
      },
    ],
  },
];
