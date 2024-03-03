import { app } from "../config/app";
import { Failure } from "../config/failure";

export default class AuthRepository {
  async login(param: Record<string, any>): Promise<Record<string, any>> {
    const response = await fetch(app.host + "/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Failure(data.status, data);
    }

    return data;
  }
}
