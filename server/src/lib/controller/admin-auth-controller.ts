import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import AdminAuthRepository from "../repository/admin-auth-repository";

const adminAuthRepository = new AdminAuthRepository();

export default class AdminAuthController {
  async login(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await adminAuthRepository.login(req.body);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
