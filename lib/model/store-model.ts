import {UserModel} from "./user-model";

export class StoreModel {
  id?: string;
  userId?: string;
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  lat?: string;
  lng?: string;
  active?: boolean;
  created?: string;
  updated?: string;
  user?: UserModel;
}
