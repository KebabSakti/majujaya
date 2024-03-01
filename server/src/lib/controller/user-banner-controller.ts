import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserBannerRepository from "../repository/user-banner-repository";

const bannerRepository = new UserBannerRepository();

export default class UserBannerController {
  async index(req: Request, res: Response) {
    try {
      const result = await bannerRepository.read();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
