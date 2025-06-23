import { z } from "zod";

export const movieCreateFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be after 1888")
    .max(new Date().getFullYear(), "Release year can't be in the future"),
  duration: z.number().int().min(1, "Duration must be greater than 0"),
  rating: z
    .number()
    .min(0, "Rating must be 0 or more")
    .max(5.0, "Rating must be less than or equal to 5"),
  urlImage: z.string().nonempty("URL image is required"),
});

export type TMovieCreateFormValues = z.infer<typeof movieCreateFormSchema>;
