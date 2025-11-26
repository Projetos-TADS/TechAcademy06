import { z } from "zod";
import { sessionSchema, userReturnSchema } from "../schemas";

type SessionCreate = z.infer<typeof sessionSchema>;
type SessionReturn = {
  token: string;
  user: z.infer<typeof userReturnSchema>;
};

export { SessionCreate, SessionReturn };
