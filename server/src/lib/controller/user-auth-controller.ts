import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import UserRepository from "../repository/user-account-repository";
import UserAuthRepository from "../repository/user-auth-repository";
import { convertToValidPhoneNumber } from "../helper/common";

const userAuthRepository = new UserAuthRepository();
const userRepository = new UserRepository();

export default class UserAuthController {
  async login(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await userAuthRepository.login(req.body);
      delete result.data?.user?.id;
      delete result.data?.user?.password;

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      req.body.phone = convertToValidPhoneNumber(req.body.phone);
      const result = await userRepository.create(req.body);
      delete result.data?.password;

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
