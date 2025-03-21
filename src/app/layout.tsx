"use client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout doesn't render any UI
  // It's just a placeholder to satisfy Next.js requirement
  // The actual rendering happens in the child layouts
  return children;
}
