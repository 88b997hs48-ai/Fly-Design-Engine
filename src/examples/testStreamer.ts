import { FlyDesign } from "../domain/flyDesign";

export const testStreamer: FlyDesign = {
  id: "test-streamer-001",

  name: "Mechanical Test Streamer",

  category: "streamer",

  targetSpecies: [
    "brown trout",
    "smallmouth bass"
  ],

  environment: [
    "river",
    "lake"
  ],

  hook: {
    model: "generic streamer hook",
    size: "2",
    style: "streamer",
    shankLengthMm: 35
  },

  dimensions: {
    lengthMm: 100,
    widthMm: 18,
    heightMm: 20
  },

  materials: [
    {
      id: "keel-weight",
      name: "Lead-free wire",
      placement: "underbody",
      functions: [
        "weight",
        "stability"
      ],
      amount: "2 short strands",
      position: 0.55,
      notes:
        "Mounted underneath the hook shank to lower the center of mass."
    },

    {
      id: "tail-hackle",
      name: "Schlappen",
      placement: "tail",
      functions: [
        "movement",
        "profile"
      ],
      amount: "2 feathers",
      position: 0.1,
      notes:
        "Provides a long flexible swimming tail."
    },

    {
      id: "tail-flash",
      name: "Flash",
      placement: "tail",
      functions: [
        "flash",
        "movement"
      ],
      amount: "sparse",
      position: 0.15
    },

    {
      id: "body-chenille",
      name: "Palmer chenille",
      placement: "body",
      functions: [
        "profile",
        "flash",
        "water-displacement"
      ],
      amount: "full body",
      position: 0.5,
      notes:
        "Adds body volume while remaining relatively flexible."
    },

    {
      id: "head-deer-hair",
      name: "Deer hair",
      placement: "head",
      functions: [
        "profile",
        "water-displacement",
        "buoyancy"
      ],
      amount: "moderate",
      position: 0.9,
      notes:
        "Packed and shaped into a wedge-style head."
    }
  ],

  notes:
    "Baseline streamer used to test whether the mechanical prediction system produces sensible outputs from a real fly construction."
};
