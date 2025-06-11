"use client";

import { useAuth } from "@/providers/auth-context-provider";
import { Button } from "./ui/button";

export function UserProfile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="p-4">Loading user data...</div>;
  }

  if (!user) {
    return <div className="p-4">Not logged in</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>
      <Button variant="destructive" className="mt-4" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
