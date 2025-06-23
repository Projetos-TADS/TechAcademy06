import { z } from "zod";

export const directorCreateFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birthDate: z.string().nonempty("Birth Date is required"),
  nationality: z.string().nonempty("Nationality is required"),
});

export type TDirectorCreateFormValues = z.infer<typeof directorCreateFormSchema>;
