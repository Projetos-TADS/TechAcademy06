import { z } from "zod";

export const actorCreateFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birthDate: z.string().nonempty("Birth Date is required"),
  nationality: z.string().nonempty("Nationality is required"),
});

export type TActorCreateFormValues = z.infer<typeof actorCreateFormSchema>;
