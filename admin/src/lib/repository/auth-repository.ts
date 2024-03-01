import { Failure } from "../config/failure";

export default class AuthRepository {
  async login(param: Record<string, any>): Promise<Record<string, any>> {
    try {
      throw new Failure(500, "");
    } catch (error) {
      if (error instanceof Failure) {
        error.message;
      }
    }

    return {};
  }
}
