import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const movieCreateFormSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatória"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "O ano deve ser após 1888")
    .max(new Date().getFullYear(), "O ano não pode ser futuro"),
  duration: z.number().int().min(1, "Duração deve ser maior que 0"),
  rating: z
    .number()
    .min(0, "Avaliação deve ser 0 ou mais")
    .max(5.0, "Avaliação deve ser 5 ou menos"),
  images: z
    .any()
    .refine((files) => files?.length > 0, "Pelo menos uma imagem é necessária.")
    .refine((files) => files?.length <= 5, "Máximo de 5 imagens permitidas.")
    .refine(
      (files) => Array.from(files || []).every((file: any) => file.size <= MAX_FILE_SIZE),
      "O tamanho máximo do arquivo é 2MB."
    )
    .refine(
      (files) =>
        Array.from(files || []).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas formatos .jpg, .jpeg e .png são suportados."
    ),
});

export type TMovieCreateFormValues = z.infer<typeof movieCreateFormSchema>;
