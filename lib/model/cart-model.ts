import {CartItemModel} from "./cart-item-model";

export interface CartModel {
  id?: string;
  userId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cartItem?: CartItemModel[];
}
