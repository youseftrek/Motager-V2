"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { UserLoginSchema } from "@/validations/user-login";
import { useRouter } from "@/i18n/routing";
import { PROTECTED_ROUTES } from "@/constants";
import axios from "axios";
import { useAuth } from "@/providers/auth-context-provider";

const LoginForm = () => {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const t = useTranslations("LoginPage.form");
  const tToast = useTranslations("toast");
  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserLoginSchema>) {
    try {
      const res = await axios.post("/api/login", values);
      if (res.data.success) {
        await refreshUser();
        router.push(PROTECTED_ROUTES.STORES);
        toast.success(tToast("loginSuccess"));
      }
    } catch (error: any) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2"></div>
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
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
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

        <Button
          loading={form.formState.isSubmitting}
          spinnerColor="text-background"
        >
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
