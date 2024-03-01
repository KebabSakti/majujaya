import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class UserRepository {
  async create(): Promise<void> {
    const queryUrl = urlParser(url.banner);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
