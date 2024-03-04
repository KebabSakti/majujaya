import { app } from "../config/app";
import { Failure } from "../config/failure";

export default class WaRepository {
  async qr(param: Record<string, any>): Promise<Record<string, any>> {
    const token = param.token;
    delete param.token;

    const response = await fetch(`${app.host}/admin/protected/wa/qr`, {
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
}
