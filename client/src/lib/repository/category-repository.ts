import { Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";
import { CategoryModel } from "./../../../../lib/model/category-model";

export default class CategoryRepository {
  async read(): Promise<Result<CategoryModel[]>> {
    const queryUrl = urlParser(url.category);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }
}
