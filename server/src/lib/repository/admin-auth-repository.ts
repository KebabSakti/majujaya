import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequest, NotFound, Unauthorized } from "../helper/failure";
import { prisma } from "../helper/prisma";

export default class AdminAuthRepository {
  async login(param: Record<string, any>): Promise<Record<string, any>> {
    const user = await prisma.admin.findFirst({
      where: {
        username: param.username,
      },
    });

    if (user == null) {
      throw new BadRequest("User tidak ditemukan");
    }

    const userValid = await bcrypt.compare(param.password, user.password!);

    if (!userValid) {
      throw new BadRequest("Password anda salah");
    }

    const token = jwt.sign(user.id, process.env.HASH_SALT as string);

    const data: any = {
      data: {
        token: token,
      },
    };

    return data;
  }

  async validate(token: string): Promise<Record<string, any>> {
    try {
      const userId = jwt.verify(
        token,
        process.env.HASH_SALT as string
      ) as string;

      const user = await prisma.admin.findFirst({
        where: {
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
