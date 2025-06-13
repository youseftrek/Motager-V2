export interface IUser {
  user_id: number;
  stores: any[]; // You can replace `any` with a specific store type if available
  email: string;
  image: string;
  name: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
}
export interface IRegister  {
  email: string
  password: string,
  confirmPassword: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
}