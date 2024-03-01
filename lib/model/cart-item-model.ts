import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";
import { ProductVariant } from "./product-variant";

export interface CartItemModel {
  id?: string;
  cartId?: string;
  productVariantId?: string;
  qty?: number;
  total?: number;
  created?: string;
  updated?: string;
  cart?: CartModel;
  product?: ProductModel;
  productVariant?: ProductVariant;
}
