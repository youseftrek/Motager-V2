import { z } from "zod";

export const UserRegisterSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1).optional(),
    phoneNumber: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })


export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;