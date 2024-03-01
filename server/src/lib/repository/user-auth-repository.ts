import { AuthModel } from "./../../../../lib/model/auth-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Result } from "../config/type";
import { BadRequest, NotFound, Unauthorized } from "../helper/failure";
import { prisma } from "../helper/prisma";

export default class UserAuthRepository {
  async login(param: Record<string, any>): Promise<Result<AuthModel>> {
    const user = await prisma.user.findFirst({
      where: {
        active: true,
        email: param.email,
      },
      include: {
        store: true,
      },
    });

    if (user == null) {
      throw new NotFound("User tidak ditemukan");
    }

    const userValid = await bcrypt.compare(param.password, user.password!);

    if (!userValid) {
      throw new BadRequest("Password anda salah");
    }

    const token = jwt.sign(user.id, process.env.HASH_SALT as string);

    const data: any = {
      data: {
        token: token,
        user: user,
      },
    };

    return data;
  }

  async validate(token: string): Promise<Result<AuthModel>> {
    try {
      const userId = jwt.verify(
        token,
        process.env.HASH_SALT as string
      ) as string;

      const user = await prisma.user.findFirst({
        where: {
          active: true,
          id: userId,
        },
      });

      if (user == null) {
        throw new NotFound("User tidak ditemukan");
      }

      const data: any = {
        data: {
          token: token,
          user: user,
        },
      };

      return data;
    } catch (error) {
      throw new Unauthorized();
    }
  }
}
