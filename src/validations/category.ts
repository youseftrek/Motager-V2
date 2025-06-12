import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "requiredName" }),
  description: z.string().optional(),
});
