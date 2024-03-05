import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserConfigRepository from "../repository/user-config-repository";

const configRepository = new UserConfigRepository();

export default class UserConfigController {
  async index(req: Request, res: Response) {
    try {
      const result = await configRepository.index();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
