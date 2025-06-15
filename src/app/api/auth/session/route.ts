import { getSession } from "@/actions/getSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { token } = await getSession();
  console.log("token", token);
  return NextResponse.json({ token });
}
