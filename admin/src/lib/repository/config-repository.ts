import { app } from "../config/app";
import { Failure } from "../config/failure";

export default class ConfigRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    delete param.token;

    const response = await fetch(`${app.host}/admin/protected/config`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }

    const data = await response.json();

    return data;
  }

  async update(param: Record<string, any>): Promise<void> {
    const token = param.token;
    delete param.token;

    const response = await fetch(
      `${app.host}/admin/protected/config/${param.id}`,
      {
        method: "PUT",
        body: JSON.stringify(param),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }
  }
}
