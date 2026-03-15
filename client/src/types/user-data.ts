export type UserData = {
  id: number;
  email: string;
  username: string;
  avatar: string;
  isPro: boolean;
  token: string;
};

export type AuthData = {
  email: string;
  password: string;
};