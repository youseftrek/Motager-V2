import { getSession } from "@/actions/get-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { token } = await getSession();
  console.log("token", token);
  return NextResponse.json({ token });
}
