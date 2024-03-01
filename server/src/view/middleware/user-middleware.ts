import { NextFunction, Request, Response } from "express";
import { Failure, Unauthorized } from "../../lib/helper/failure";
import UserAuthRepository from "../../lib/repository/user-auth-repository";

const userAuthRepository = new UserAuthRepository();

export default async function userMiddleware(
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
        const result = await userAuthRepository.validate(token);
        req.app.locals.userId = result.data?.user?.id;
        req.app.locals.user = result.data?.user;

        return next();
      }
    }

    throw new Unauthorized();
  } catch (error: any) {
    Failure.handle(error, res);
  }
}
