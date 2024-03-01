import { Request, Response } from "express";
import { Failure } from "../helper/failure";
import UserPaymentRepository from "../repository/user-payment-repository";

const paymentRepository = new UserPaymentRepository();

export default class UserPaymentController {
  async index(req: Request, res: Response) {
    try {
      const result = await paymentRepository.index(req.query);

      res.json(result);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
