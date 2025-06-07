export interface IUser {
  user_id: number;
  stores: any[]; // You can replace `any` with a specific store type if available
  email: string;
  image: string;
  name: string;
}

export interface IAuthState {
  user: IUser | null;
  access_token: string | null;
  refresh_token: string | null;
  expires_in: number | null;
}
