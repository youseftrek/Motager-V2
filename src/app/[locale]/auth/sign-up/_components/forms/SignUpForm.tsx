"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterSchema } from "@/validations/user-register";
import { toast } from "sonner";
import { signup } from "@/actions/signup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import OtpDialog from "./OtpDialog";
import { useState } from "react";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "@/i18n/routing";
import { PROTECTED_ROUTES } from "@/constants";

const SignUpForm = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("SignUpPage.form");
  const form = useForm<z.infer<typeof UserRegisterSchema>>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
  });
  const [register, { data, isLoading, isError }] = useRegisterUserMutation();

  async function onSubmit(values: z.infer<typeof UserRegisterSchema>) {
    try {
      const res = await register(values);
      if (res.data) {
        router.push(PROTECTED_ROUTES.STORES);
        toast.success("User registered successfully");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t("firstName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("firstNamePlaceholder")}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>{t("lastName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("lastNamePlaceholder")}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourmail@email.com"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+20"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St, City, Country"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>{t("confirmPassword")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            loading={form.formState.isSubmitting}
            spinnerColor="text-background"
          >
            {t("submit")}
          </Button>
        </form>
      </Form>
      <OtpDialog open={open} email={form.getValues("email")} />
    </div>
  );
};

export default SignUpForm;
