import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Get the current cookies
    const cookieStore = await cookies();
    const data = await request.json();

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
      sameSite: "lax",
    });
    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
      sameSite: "lax",
    });

    // Return success to indicate the cookies are available
    return NextResponse.json({
      success: true,
      message: "Tokens refreshed successfully",
    });
  } catch (error: any) {
    console.error("Error refreshing tokens:", error);
    return NextResponse.json(
      { error: error.message || "Failed to refresh tokens" },
      { status: 500 }
    );
  }
}
