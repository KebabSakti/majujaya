import { Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";
import { ProductModel } from "./../../../../lib/model/product-model";

export default class ProductRepository {
  async read(param: Record<string, any>): Promise<Result<ProductModel[]>> {
    const queryUrl = urlParser(url.product, param);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async show(id: string): Promise<Result<ProductModel>> {
    const queryUrl = urlParser(`${url.product}/${id}`);
    const response = await fetch(queryUrl);

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();

    return data;
  }

  async create(param: Record<string, any>): Promise<void> {
    const files = [];
    const formData = new FormData();
    const uploadUrl = `https://api.cloudinary.com/v1_1/dnyzkgi84/upload`;

    for (const item of param.files) {
      formData.append("upload_preset", "ml_default");
      formData.append("tags", item.tag);
      formData.append("file", item.file);

      const result = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      if (data) {
        files.push({ tag: data.tags[0], link: data.secure_url });
      }
    }

    const payload = { ...param, files: files };
    const queryUrl = urlParser(url.product);

    const response = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }
  }

  async update(param: Record<string, any>): Promise<void> {
    const queryUrl = urlParser(url.product);

    const response = await fetch(queryUrl, {
      method: "PUT",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Failure.network(response);
    }
  }
}
