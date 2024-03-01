import { CartModel } from "../../../../lib/model/cart-model";
import { Empty, Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class CartRepository {
  async show(param: Record<string, any>): Promise<Result<CartModel | Empty>> {
    const queryUrl = urlParser(url.cart);

    const response = await fetch(queryUrl, {
      headers: {
        Authorization: `Bearer ${param.token}`,
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async update(param: Record<string, any>): Promise<CartModel> {
    const payload = { ...param };
    const queryUrl = urlParser(url.cart);
    delete payload.token;

    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${param.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async delete(param: Record<string, any>): Promise<Result<null>> {
    const payload = { ...param };
    const queryUrl = urlParser(url.cart);
    delete payload.token;

    const response = await fetch(queryUrl, {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${param.token}`,
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
