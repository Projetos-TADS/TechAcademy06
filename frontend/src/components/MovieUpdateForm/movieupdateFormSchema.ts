import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const movieUpdateFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  releaseYear: z.coerce.number().int().min(1888).max(new Date().getFullYear()).optional(),
  duration: z.coerce.number().int().min(1).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  images: z
    .any()
    .optional()
    .refine((files) => {
      if (!files) return true;
      return Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE);
    }, "O tamanho máximo do arquivo é 2MB.")
    .refine((files) => {
      if (!files) return true;
      return Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }, "Apenas formatos .jpg, .jpeg e .png são suportados."),
});

export type TMovieUpdateFormValues = z.infer<typeof movieUpdateFormSchema>;
