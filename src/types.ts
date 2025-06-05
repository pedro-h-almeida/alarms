// interface AlarmBaseRule {
//   type: RuleType;
// }
// type RuleType = "greaterThan" | "lessThan" | "range";

// interface AlarmGreaterOrLessThanRule extends AlarmBaseRule {
//   type: "greaterThan" | "lessThan";
//   threshold: Threshold;
// }

// interface Threshold {
//   alert?: number;
//   risk?: number;
// }

// interface AlarmRangeRule extends AlarmBaseRule {
//   type: "range";
//   thresholds: RangeThreshold;
// }

// interface RangeThreshold {
//   lowerAlert?: number;
//   lowerRisk?: number;
//   higherAlert?: number;
//   higherRisk?: number;
// }

// type AlarmRule = AlarmGreaterOrLessThanRule | AlarmRangeRule;

import { z } from "zod";
import {
  ThresholdSchema,
  RangeThresholdSchema,
  AlarmSimpleRuleSchema,
  AlarmRangeRuleSchema,
  AlarmRuleSchema,
} from "./LocalAssetSchemas";

export type Threshold = z.infer<typeof ThresholdSchema>;
export type RangeThreshold = z.infer<typeof RangeThresholdSchema>;
export type AlarmSimpleRule = z.infer<typeof AlarmSimpleRuleSchema>;
export type AlarmRangeRule = z.infer<typeof AlarmRangeRuleSchema>;
export type AlarmRule = z.infer<typeof AlarmRuleSchema>;
