import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import UserSalesRepository from "../repository/user-sales-repository";

const userSalesRepository = new UserSalesRepository();

export default class UserSalesController {
  async index(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        storeId: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        page: Joi.number().required(),
        limit: Joi.number().required(),
      }).unknown();

      const { error } = schema.validate(req.query);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await userSalesRepository.index(req.query);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
