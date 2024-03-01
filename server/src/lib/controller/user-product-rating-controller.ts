import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import UserProductRatingRepository from "../repository/user-product-rating-repository";

const productRatingRepository = new UserProductRatingRepository();

export default class UserProductRatingController {
  async index(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        productId: Joi.string().required(),
        page: Joi.number().required(),
        limit: Joi.number().required(),
      }).unknown();

      const { error } = schema.validate(req.query);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await productRatingRepository.read(req.query);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
