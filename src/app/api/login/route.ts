import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  console.log("cookieStore: ", cookieStore);

  const data = await request.json();

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/login",
      data
    );

    if (response.status === 200) {
      cookieStore.set("access_token", response.data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: response.data.expires_in,
        path: "/",
        sameSite: "lax",
      });
      cookieStore.set("refresh_token", response.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: response.data.expires_in,
        path: "/",
        sameSite: "lax",
      });
      return NextResponse.json(
        { message: "Login successful", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid credentials", success: false },
      { status: 401 }
    );
  }
}
