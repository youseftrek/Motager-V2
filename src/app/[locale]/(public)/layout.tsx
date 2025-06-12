"use client";

import Navbar from "@/components/landing/Navbar";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useAuth } from "@/providers/auth-context-provider";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  console.log("user", user);
  const isAuthenticated = user !== null && user !== undefined;
  if (pathname.includes("/dashboard")) {
    return <>{children}</>;
  }
  return (
    <MaxWidthWrapper className="pt-20 lg:pt-10">
      <Navbar user={user || undefined} isAuthenticated={isAuthenticated} />
      {children}
    </MaxWidthWrapper>
  );
}
