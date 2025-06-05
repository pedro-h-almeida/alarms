import { z } from "zod";

const ThresholdSchema = z
  .object({
    alert: z.number().optional(),
    risk: z.number().optional(),
  })
  .refine((data) => data.alert !== undefined || data.risk !== undefined, {
    message: "At least one of alert or risk must be defined",
  });

const RangeThresholdSchema = z
  .object({
    lowerAlert: z.number().optional(),
    lowerRisk: z.number().optional(),
    higherAlert: z.number().optional(),
    higherRisk: z.number().optional(),
  })
  .refine(
    (data) =>
      (data.lowerAlert !== undefined || data.lowerRisk !== undefined) &&
      (data.higherAlert !== undefined || data.higherRisk !== undefined),
    {
      message:
        "At least one lower (alert or risk) and one higher (alert or risk) threshold must be defined",
    }
  );

const AlarmSimpleRuleSchema = z.object({
  type: z.enum(["greaterThan", "lessThan", "equals"]),
  thresholds: ThresholdSchema,
});

const AlarmRangeRuleSchema = z.object({
  type: z.literal("range"),
  thresholds: RangeThresholdSchema,
});

const AlarmRuleSchema = z.discriminatedUnion("type", [
  AlarmSimpleRuleSchema,
  AlarmRangeRuleSchema,
]);

export {
  ThresholdSchema,
  RangeThresholdSchema,
  AlarmSimpleRuleSchema,
  AlarmRangeRuleSchema,
  AlarmRuleSchema,
};
