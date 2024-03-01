import { StoreModel } from "./store-model";

export enum UserShowField {
  ID = "id",
  EMAIL = "email",
}

export type UserShowParameter = {
  field: UserShowField;
  value: string;
};

export interface UserModel {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
  orderComplete?: number;
  orderCancel?: number;
  visit?: number;
  link?: string;
  guest?: boolean;
  created?: string;
  updated?: string;
  store?: StoreModel;
}
