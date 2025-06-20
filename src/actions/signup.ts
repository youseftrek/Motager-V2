"use server";

import { UserRegisterSchema } from "@/validations/user-register";
import { z } from "zod";
import axios from "axios";

export async function signup(values: z.infer<typeof UserRegisterSchema>) {
  const { firstName, lastName, email, password, phoneNumber } = values;

  const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/register", {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  });

  console.log(res);

  return { ...res.data, success: true, message: "User created successfully" };
}
