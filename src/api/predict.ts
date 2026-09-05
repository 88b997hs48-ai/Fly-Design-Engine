import { DesignState } from '../core/design/types';
import {
  MechanicalPredictionEngine,
  MechanicalPredictionResult,
} from '../core/mechanics/MechanicalPredictionEngine';

export interface PredictionRequest {
  design: DesignState;
}

export interface PredictionResponse {
  success: boolean;
  prediction?: MechanicalPredictionResult;
  error?: string;
}

export function runMechanicalPrediction(
  request: PredictionRequest,
): PredictionResponse {
  try {
    if (!request || !request.design) {
      return {
        success: false,
        error: 'A fly design is required.',
      };
    }

    const prediction = MechanicalPredictionEngine.predict(request.design);

    return {
      success: true,
      prediction,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Mechanical prediction failed.',
    };
  }
}
