"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { categorySchema } from "@/validations/category";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type CategoryFormValues = z.infer<typeof categorySchema>;

// Props for the component
interface CategoryDialogProps {
  initialData?: CategoryFormValues;
  trigger?: React.ReactNode;
  mode: "create" | "edit";
}

export default function CategoryDialog({
  initialData,
  trigger,
  mode,
}: CategoryDialogProps) {
  const t = useTranslations("CategoriesPage.dialog");
  const [open, setOpen] = useState(false);

  // Set up the form with React Hook Form and Zod resolver
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      id: "",
      name: "",
      slug: "",
    },
  });

  const handleEditCategory = (
    id: string,
    data: { name: string; slug?: string }
  ) => {
    console.log("Edit category", id, data);
    toast.success(t("toast.updateSuccess"));
  };

  const handleCreateCategory = (data: { name: string; slug?: string }) => {
    console.log(data);
    toast.success(t("toast.createSuccess"));
  };

  // Handle form submission
  const handleSubmit = (data: CategoryFormValues) => {
    if (mode === "edit") {
      handleEditCategory(initialData?.id || "1", data);
    } else {
      handleCreateCategory(data);
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            {mode === "edit" ? t("edit") : t("create")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? t("edit") : t("create")}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? t("editDescription") : t("createDescription")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("namePlaceHolder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("slug")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("slugPlaceHolder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("slugDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
