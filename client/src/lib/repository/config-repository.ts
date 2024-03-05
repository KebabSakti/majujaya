import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class ConfigRepository {
  async index(): Promise<Record<string, any>> {
    const queryUrl = urlParser(url.config);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
