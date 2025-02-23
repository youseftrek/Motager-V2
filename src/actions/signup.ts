"use server";

import { UserRegisterSchema } from "@/validations/user-register";
import { z } from "zod";
import axios from "axios";

export async function signup(values: z.infer<typeof UserRegisterSchema>) {
  const { firstName, lastName, email, password } = values;

  const res = await axios.post("http://localhost:8080/register", {
    firstName,
    lastName,
    email,
    password,
  });

  console.log(res);

  return { ...res.data, success: true, message: "User created successfully" };
}
