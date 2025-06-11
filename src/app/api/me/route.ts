import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null, token: null });
  }

  const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = {
    user_id: res.data.data.id,
    stores: res.data.data.stores,
    email: res.data.data.email,
    image: res.data.data.image || "",
    name: res.data.data.firstName + " " + res.data.data.lastName,
  };

  return NextResponse.json({ user, token });
}
