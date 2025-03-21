import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import { connection } from "next/server";

const FONT_EN = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
});

async function UTSSR() {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />;
}

export const metadata = {
  title: "Shop",
  description: "User shop created with Motager",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${FONT_EN.className} antialiased`}
        suppressHydrationWarning
      >
        <Suspense>
          <UTSSR />
        </Suspense>
        <NextTopLoader
          color="#22c55e"
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          shadow="0 0 10px #22c55e,0 0 5px #22c55e"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
