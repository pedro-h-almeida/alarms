import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { AlarmRuleSchema } from "./LocalAssetSchemas";
import { DistributedAlarmRuleConfig } from "./CustomAlarmsSchema";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

app.post(
  "/alarms",
  {
    schema: {
      body: DistributedAlarmRuleConfig,
    },
  },
  (request, response) => {
    console.log("Ola");
    response.status(200).send();
  }
);

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
