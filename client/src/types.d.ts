export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  displayName?: string;
  avatar?: File | null;
  googleID?: string;
}

export interface IUserForUsing extends Omit<IUser, 'avatar'> {
  avatar: string | null;
}

export type TUserRegister = Omit<IUser, '_id' | 'token' | 'role' | 'googleID'>;

export interface IRegisterResponse {
  user: IUserForUsing;
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  error: string;
  message: string;
  name: string;
  _message: string;
}

export interface IPhoto {
  _id: string;
  user: { _id: string; avatar: string; displayName: string };
  title: string;
  image: string | null;
}

export interface IPhotoRequest extends Omit<IPhoto, '_id' | 'user' | 'image'> {
  image: File | null;
}
