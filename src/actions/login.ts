"use server";

import { UserLoginSchema } from "@/validations/user-login";
import { z } from "zod";

export const login = async (values: z.infer<typeof UserLoginSchema>) => {
  console.log(values);
};
