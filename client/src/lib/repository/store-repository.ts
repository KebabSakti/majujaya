import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class StoreRepository {
  async show(param: Record<string, any>): Promise<Record<string, any>> {
    const queryUrl = urlParser(url.store, param);

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

  async create(param: Record<string, any>): Promise<void> {
    const token = param.token;
    const queryUrl = urlParser(url.store);
    delete param.token;

    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }
  }
}
