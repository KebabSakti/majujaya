import { Request, Response } from "express";
import { BadRequest, Failure } from "../helper/failure";
import UserRepository from "../repository/user-account-repository";
import Joi from "joi";

const userRepository = new UserRepository();

export default class UserController {
  async show(req: Request, res: Response) {
    try {
      let query;

      if (req.query.hasOwnProperty("id")) {
        query = { id: req.query.id };
      }

      if (req.query.hasOwnProperty("email")) {
        query = { email: req.query.email };
      }

      if (query == null) {
        throw new BadRequest("ID atau Email user diperlukan");
      }

      const result = await userRepository.show(query);
      delete result.data?.password;

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async create(req: Request, res: Response) {
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

      const result = await userRepository.create(req.body);
      delete result.data?.password;

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await userRepository.update(req.body);
      delete result.data?.password;

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
