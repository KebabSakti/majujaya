import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import AdminConfigRepository from "../repository/admin-config-repository";

const adminConfigRepository = new AdminConfigRepository();

export default class AdminConfigController {
  async index(req: Request, res: Response) {
    try {
      const result = await adminConfigRepository.index();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const payload = {
        ...req.body,
        id: req.params.id,
      };

      const schema = Joi.object({
        value: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(payload);

      if (error) {
        throw new BadRequest(error.message);
      }

      await adminConfigRepository.update(payload);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
