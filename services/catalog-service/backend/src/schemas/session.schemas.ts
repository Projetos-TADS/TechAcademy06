import { userReturnSchema, userSchema } from "./user.schemas";
import { z } from "zod";

const sessionSchema = userSchema.pick({ email: true, password: true });

const sessionReturnSchema = z.object({
  token: z.string(),
  user: userReturnSchema,
});

export { sessionSchema, sessionReturnSchema };
