export interface AssessmentPayload {
  age?: number;
  sex?: "F" | "M" | "NA";
  smoking_raw?: 0 | 25 | 50 | 75 | 100;
  activity_raw?: 0 | 20 | 40 | 60 | 80 | 90 | 100;
  sleep_raw?: 0 | 20 | 40 | 70 | 90 | 100;
  mepa_answers?: boolean[];
  height_cm?: number;
  weight_kg?: number;
  bp_known?: boolean;
  bp_range_score?: 0 | 25 | 50 | 75 | 100;
  bp_on_medication?: boolean;
  cholesterol_known?: boolean;
  cholesterol_range_score?: 0 | 20 | 40 | 60 | 100;
  cholesterol_on_medication?: boolean;
  diabetes_status?: "yes" | "no" | "unknown";
  glucose_range_score?: 0 | 60 | 100;
  a1c_range_score?: 0 | 10 | 20 | 30 | 40;
}
