import { NextFunction, Request, Response } from "express";
import { Failure, Unauthorized } from "../../lib/helper/failure";
import AdminAuthRepository from "../../lib/repository/admin-auth-repository";

const adminAuthRepository = new AdminAuthRepository();

export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (authorization != undefined) {
      const payloads = authorization.split(" ");

      if (payloads.length == 2) {
        const token = payloads[1];
        const result = await adminAuthRepository.validate(token);
        req.app.locals.user = result.data?.user;

        return next();
      }
    }

    throw new Unauthorized();
  } catch (error: any) {
    Failure.handle(error, res);
  }
}
