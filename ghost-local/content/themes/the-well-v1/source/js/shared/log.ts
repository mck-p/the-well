import Pino from "pino";
import * as Env from "./env";

const baseLog = Pino({
  level: "trace",
  serializers: Pino.stdSerializers,
});

export default baseLog.child({
  version: Env.version,
});
