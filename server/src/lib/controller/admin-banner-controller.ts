import { Request, Response } from "express";
import { BadRequest, Failure } from "../helper/failure";
import AdminBannerRepository from "../repository/admin-banner-repository";
import Joi from "joi";

const adminBannerRepository = new AdminBannerRepository();

export default class AdminBannerController {
  async index(req: Request, res: Response) {
    try {
      const result = await adminBannerRepository.index();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        picture: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const result = await adminBannerRepository.update(req.body);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
