import { Request, Response } from "express";
import Joi from "joi";
import { BadRequest, Failure } from "../helper/failure";
import UserProductRepository from "../repository/user-product-repository";

const productRepository = new UserProductRepository();

export default class UserProductController {
  async index(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        page: Joi.string().required(),
        limit: Joi.string().required(),
      }).unknown(true);

      const { error } = schema.validate(req.query);

      if (error) {
        throw new BadRequest();
      }

      const result = await productRepository.read(req.query);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const result = await productRepository.show(req.params.id);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async create(req: Request, res: Response) {
    try {
      await productRepository.create(req.body);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      await productRepository.update(req.body);

      res.end();
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
