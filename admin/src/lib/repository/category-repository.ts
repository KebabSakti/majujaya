import { app } from "../config/app";
import { Failure } from "../config/failure";

export default class CategoryRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    delete param.token;

    const response = await fetch(
      `${app.host}/admin/protected/category?page=${param.page}&limit=${param.limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }

    const data = await response.json();

    return data;
  }

  async create(param: Record<string, any>): Promise<void> {
    const token = param.token;
    const formData = new FormData();
    formData.append("name", param.name);
    formData.append("picture", param.picture);
    formData.append("status", param.status);
    delete param.token;

    const response = await fetch(app.host + "/admin/protected/category", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }
  }

  async update(param: Record<string, any>): Promise<void> {
    const token = param.token;
    const formData = new FormData();

    if (param.picture) {
      formData.append("picture", param.picture);
    }

    formData.append("name", param.name);
    formData.append("status", param.status);
    delete param.token;

    const response = await fetch(
      app.host + "/admin/protected/category/" + param.id,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }
  }

  async delete(param: Record<string, any>): Promise<void> {
    const token = param.token;
    delete param.token;

    const response = await fetch(
      app.host + "/admin/protected/category/" + param.id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Failure(response.status, response.statusText);
    }
  }
}
