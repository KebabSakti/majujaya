import { Request, Response } from "express";
import { Failure } from "../helper/failure";

export default class AdminWaController {
  async qr(req: Request, res: Response) {
    try {
      const data = req.app.locals.qr;

      res.json(data);
    } catch (error: any) {
      Failure.handle(error, res);
    }
  }
}
