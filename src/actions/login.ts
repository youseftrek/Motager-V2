"use server";

import { signIn } from "@/auth";
import { UserLoginSchema } from "@/validations/user-login";
import { z } from "zod";

export const login = async (values: z.infer<typeof UserLoginSchema>) => {
  const validatedFields = UserLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return { error: "Invalid email or password!" };
    }

    return { success: "Logged in successfully!" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Invalid email or password!" };
  }
};
