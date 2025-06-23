import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().nonempty("E-mail is required").email("Invalid e-mail format"),
	password: z.string().nonempty("Password is required"),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
