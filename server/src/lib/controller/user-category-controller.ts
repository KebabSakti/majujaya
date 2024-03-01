import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserCategoryRepository from "../repository/user-category-repository";

const categoryRepository = new UserCategoryRepository();

export default class UserCategoryController {
  async index(req: Request, res: Response) {
    try {
      const result = await categoryRepository.read();

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
