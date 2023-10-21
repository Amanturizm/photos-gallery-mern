export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  avatar?: string | null;
  googleID?: string;
}
