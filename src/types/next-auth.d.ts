import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    token: string;
    storesId: string[];
    name: string;
    email: string;
    image: string | null;
  }

  interface Session {
    token: string;
    user: User;
  }
}
