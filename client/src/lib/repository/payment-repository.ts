import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class PaymentRepository {
  async read(): Promise<Record<string, any>> {
    const queryUrl = urlParser(url.payment);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
