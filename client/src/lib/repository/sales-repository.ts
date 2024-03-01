import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class SalesRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    delete param.token;

    const queryUrl = urlParser(url.sales, param);

    const response = await fetch(queryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
