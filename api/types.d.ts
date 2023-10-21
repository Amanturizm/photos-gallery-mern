import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  avatar?: string | null;
  googleID?: string;
}

export interface IPhoto {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  image: string | null;
}
