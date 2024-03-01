import { ProductRating } from "../../../../lib/model/product-rating";
import { Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";

export default class ProductRatingRepository {
  async read(param: Record<string, any>): Promise<Result<ProductRating[]>> {
    const queryUrl = urlParser(url.productRating, param);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
