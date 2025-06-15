"use server";
import { redirect } from "next/navigation";

export async function logOut() {
  try {
    // Use the logout API route
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Logout failed:", await response.text());
    }

    // Redirect to login page after logout attempt
    redirect("/auth/login");
  } catch (error) {
    console.error("Logout failed:", error);
    redirect("/auth/login");
  }
}
