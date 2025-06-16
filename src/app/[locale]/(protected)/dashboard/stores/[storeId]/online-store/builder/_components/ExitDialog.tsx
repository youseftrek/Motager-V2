"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useParams } from "next/navigation";

export function ExitDialog() {
  const {storeId} = useParams()
  return (
    <Dialog>
      <TooltipChildren message={"Exit"}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <LogOut className="rotate-180" />
          </Button>
        </DialogTrigger>
      </TooltipChildren>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure?</DialogTitle>
          <DialogDescription className="text-center">
            All unsaved changes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto w-fit">
          <DialogClose asChild>
            <Button variant="outline" className="min-w-[100px]">
              Stay
            </Button>
          </DialogClose>
          <Link
            href={`/dashboard/stores/${storeId}/online-store`}
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "min-w-[100px]"
            )}
          >
            Exit
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
