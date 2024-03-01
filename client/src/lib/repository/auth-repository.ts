import { Result } from "../config/type";
import { url } from "../config/url";
import { urlParser } from "../helper/common";
import { Failure } from "../helper/failure";
import { AuthModel } from "./../../../../lib/model/auth-model";

export default class AuthRepository {
  load(): Result<AuthModel> {
    let result;
    const authString = localStorage.getItem("auth");

    if (authString) {
      result = JSON.parse(authString);
    }

    const data = {
      data: result,
    };

    return data;
  }

  async register(param: Record<string, any>): Promise<void> {
    const queryUrl = urlParser(url.register);

    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw Failure.network(response);
    }
  }

  async login(param: Record<string, any>): Promise<Result<AuthModel>> {
    const queryUrl = urlParser(url.login);

    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });

    if (!response.ok) {
      throw Failure.network(response);
    }

    const data = await response.json();
    localStorage.setItem("auth", JSON.stringify(data.data));

    return data;
  }

  logout() {
    localStorage.removeItem("auth");
  }
}
