import { z } from "zod";

// Reutiliza os schemas de thresholds
const ThresholdSchema = z
  .object({
    alert: z.number().optional(),
    risk: z.number().optional(),
  })
  .refine((data) => data.alert !== undefined || data.risk !== undefined, {
    message: "Pelo menos um dos thresholds (alert ou risk) deve ser definido.",
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
        "Pelo menos um threshold inferior (alert ou risk) e um superior (alert ou risk) devem ser definidos.",
    }
  );

// Regras simples (equals, greaterThan, lessThan)
const DistributedSimpleRule = z.object({
  assetId: z.string(),
  pointId: z.string(),
  ruleType: z.enum(["greaterThan", "lessThan", "equals"]),
  thresholds: ThresholdSchema,
});

// Regra de range
const DistributedRangeRule = z.object({
  assetId: z.string(),
  pointId: z.string(),
  ruleType: z.literal("range"),
  thresholds: RangeThresholdSchema,
});

// Operadores lógicos (AND / OR)
const LogicOperatorSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    operator: z.enum(["AND", "OR"]),
    operands: z.array(DistributedRuleSchema),
  })
);

// União discriminada das regras simples/range e lógica
const DistributedRuleSchema: z.ZodType<any> = z.lazy(() =>
  z.union([DistributedSimpleRule, DistributedRangeRule, LogicOperatorSchema])
);

// Regra completa para um ativo
const DistributedAlarmRuleConfig = z.object({
  PK: z.string(), // Ex: "ASSET_ID#5030"
  companyId: z.number(),
  facilityId: z.number(),
  rules: z
    .array(
      z.object({
        desc: z.string().optional(),
        operator: z.enum(["AND", "OR"]),
        operands: z.array(DistributedRuleSchema).min(2),
      })
    )
    .min(1),
  createdAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export {
  DistributedAlarmRuleConfig,
  DistributedRuleSchema,
  DistributedSimpleRule,
  DistributedRangeRule,
  ThresholdSchema,
  RangeThresholdSchema,
};
