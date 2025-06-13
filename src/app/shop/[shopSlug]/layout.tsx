import type { Metadata } from "next";
import { getStore } from "@/actions/getTheme";
import { DeviceViewProvider } from "@/providers/device-view-context";
import { Outfit } from "next/font/google";
import { ReduxStoreProvider } from "@/providers/redux-store-provider";
import ShopHeader from "./components/ShopHeader";

// Configure Outfit font
const FONT_EN = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
  variable: "--font-outfit",
});

// Generate metadata for the shop
export async function generateMetadata({
  params,
}: {
  params: Promise<{ shopSlug: string }>;
}): Promise<Metadata> {
  try {
    // Fix: await params to avoid the error
    const shopSlug = (await params).shopSlug.toString();
    const response = await getStore(shopSlug);
    const storeTheme = response.data.theme;

    return {
      title: `${storeTheme.selectedTheme.name} Store`,
      description:
        storeTheme.selectedTheme.description || "Welcome to our online store",
      keywords: ["store", "shop", "ecommerce", storeTheme.selectedTheme.name],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Online Store",
      description: "Welcome to our online store",
    };
  }
}

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ shopSlug: string }>;
}) {
  // Fetch theme colors for the store
  let themeColors = null;
  try {
    const response = await getStore((await params).shopSlug);
    themeColors = response.data.theme.themeSettings?.colors;
  } catch (error) {
    console.error("Error fetching theme colors:", error);
  }

  return (
    <div
      className={`${FONT_EN.className} ${FONT_EN.variable} `}
      suppressHydrationWarning
    >
      <ReduxStoreProvider>
        <DeviceViewProvider isPreviewMode={false}>
          {/* Shop Header - will be shown on all store sub-routes */}
          <ShopHeader themeColors={themeColors} />
          {children}
        </DeviceViewProvider>
      </ReduxStoreProvider>
    </div>
  );
}
