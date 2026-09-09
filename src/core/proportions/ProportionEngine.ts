import {
  FlyDesign,
  FlyMaterial,
  MaterialPlacement
} from "../../domain/flyDesign";

export type FlyZone =
  | "TAIL"
  | "REAR"
  | "CENTER"
  | "FRONT"
  | "HEAD";

export interface ComponentLayout {
  materialId: string;
  materialName: string;
  placement: MaterialPlacement;
  zone: FlyZone;
  anchor: number;
  start: number;
  end: number;
  span: number;
  estimatedLengthMm?: number;
  hookShankRatio?: number;
  source: "EXPLICIT" | "DERIVED";
  reasons: string[];
}

export interface ProportionAnalysis {
  flyId: string;
  flyName: string;
  flyLengthMm?: number;
  hookShankLengthMm?: number;
  overallHookShankRatio?: number;
  components: ComponentLayout[];
  warnings: string[];
}

interface DefaultRange {
  start: number;
  end: number;
}

const DEFAULT_RANGES: Record<MaterialPlacement, DefaultRange> = {
  hook: { start: 0.25, end: 0.85 },
  tail: { start: 0, end: 0.25 },
  "rear-body": { start: 0.2, end: 0.45 },
  body: { start: 0.25, end: 0.78 },
  underbody: { start: 0.35, end: 0.72 },
  rib: { start: 0.28, end: 0.78 },
  wing: { start: 0.18, end: 0.82 },
  underwing: { start: 0.18, end: 0.8 },
  overwing: { start: 0.2, end: 0.84 },
  collar: { start: 0.72, end: 0.86 },
  hackle: { start: 0.65, end: 0.84 },
  legs: { start: 0.58, end: 0.82 },
  head: { start: 0.82, end: 1 },
  eyes: { start: 0.88, end: 0.96 },
  weight: { start: 0.38, end: 0.72 },
  other: { start: 0.4, end: 0.6 }
};

function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function zoneFromAnchor(anchor: number): FlyZone {
  if (anchor < 0.2) return "TAIL";
  if (anchor < 0.4) return "REAR";
  if (anchor < 0.65) return "CENTER";
  if (anchor < 0.85) return "FRONT";
  return "HEAD";
}

function deriveRange(material: FlyMaterial): DefaultRange {
  const defaultRange = DEFAULT_RANGES[material.placement];

  if (material.position === undefined) {
    return defaultRange;
  }

  const halfSpan =
    (defaultRange.end - defaultRange.start) / 2;

  return {
    start: clamp(material.position - halfSpan),
    end: clamp(material.position + halfSpan)
  };
}

function layoutMaterial(
  design: FlyDesign,
  material: FlyMaterial
): ComponentLayout {
  const range =
    material.positionRange ?? deriveRange(material);

  const start = round(range.start);
  const end = round(range.end);

  const anchor = round(
    material.position ?? (start + end) / 2
  );

  const span = round(end - start);

  const flyLengthMm = design.dimensions?.lengthMm;
  const hookShankLengthMm =
    design.hook.shankLengthMm;

  const estimatedLengthMm =
    flyLengthMm === undefined
      ? undefined
      : round(span * flyLengthMm, 1);

  const hookShankRatio =
    estimatedLengthMm === undefined ||
    !hookShankLengthMm
      ? undefined
      : round(
          estimatedLengthMm / hookShankLengthMm
        );

  const source =
    material.positionRange
      ? "EXPLICIT"
      : "DERIVED";

  const reasons = [
    source ==="EXPLICIT"
      ? `${material.name} uses its explicitly assigned position range.`
      : `${material.name} uses the standard ${material.placement} footprint centered on its anchor.`,

    `${material.name} occupies the ${zoneFromAnchor(
      anchor
    ).toLowerCase()} zone.`
  ];

  return {
    materialId: material.id,
    materialName: material.name,
    placement: material.placement,
    zone: zoneFromAnchor(anchor),
    anchor,
    start,
    end,
    span,
    estimatedLengthMm,
    hookShankRatio,
    source,
    reasons
  };
}

export class ProportionEngine {
  public static analyze(
    design: FlyDesign
  ): ProportionAnalysis {
    const flyLengthMm =
      design.dimensions?.lengthMm;

    const hookShankLengthMm =
      design.hook.shankLengthMm;

    const warnings: string[] = [];

    if (flyLengthMm === undefined) {
      warnings.push(
        "Overall fly length is missing; component lengths cannot be estimated in millimeters."
      );
    }

    if (hookShankLengthMm === undefined) {
      warnings.push(
        "Hook shank length is missing; hook-shank proportions cannot be calculated."
      );
    }

    return {
      flyId: design.id,
      flyName: design.name,
      flyLengthMm,
      hookShankLengthMm,

      overallHookShankRatio:
        flyLengthMm !== undefined &&
        hookShankLengthMm
          ? round(
              flyLengthMm / hookShankLengthMm
            )
          : undefined,

      components: design.materials.map(
        material =>
          layoutMaterial(design, material)
      ),

      warnings
    };
  }
}
