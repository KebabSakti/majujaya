import { app } from "../config/app";
import { Failure } from "../config/failure";

export default class BannerRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    const response = await fetch(app.host + "/admin/protected/banner", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Failure(data.status, data);
    }

    return data;
  }

  async update(param: Record<string, any>): Promise<void> {
    const token = param.token;
    delete param.token;

    const response = await fetch(app.host + "/admin/protected/banner", {
      method: "PUT",
      body: JSON.stringify(param),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Failure(data.status, data);
    }
  }
}
