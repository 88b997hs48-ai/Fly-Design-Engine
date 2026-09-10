import {
  FlyDesign,
  validateFlyDesign,
} from '../domain/flyDesign';
import {
  buildFlyMechanicalProfile,
  FlyMechanicalProfileResult,
} from '../core/mechanics/FlyMechanicalProfileEngine';


export interface AnalyzeFlyDesignRequest {
  design: FlyDesign;
}


export interface AnalyzeFlyDesignResponse {
  success: boolean;
  result?: FlyMechanicalProfileResult;
  error?: string;
}


export function analyzeFlyDesign(
  request: AnalyzeFlyDesignRequest,
): AnalyzeFlyDesignResponse {
  try {
    if (!request || !request.design) {
      return {
        success: false,
        error: 'A fly design is required.',
      };
    }

    const validationErrors =
      validateFlyDesign(request.design);

    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors.join(' '),
      };
    }

    return {
      success: true,
      result: buildFlyMechanicalProfile(
        request.design,
      ),
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Fly design analysis failed.',
    };
  }
}
