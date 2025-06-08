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
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { PROTECTED_ROUTES } from "@/constants";

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
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
      const res = await loginUser(values);
      if (res.data) {
        router.push(PROTECTED_ROUTES.STORES);
        toast.success(tToast("loginSuccess"));
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
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
