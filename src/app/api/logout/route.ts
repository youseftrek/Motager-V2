import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear the access token cookie
  response.cookies.set({
    name: "access_token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  return response;
}

// For direct navigation (server-side logout)
export async function GET() {
  const cookieStore = await cookies();

  // Clear the token cookie
  cookieStore.set("access_token", "", {
    expires: new Date(0),
    path: "/",
  });

  cookieStore.set("refresh_token", "", {
    expires: new Date(0),
    path: "/",
  });

  // Redirect to home page
  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  );
}
