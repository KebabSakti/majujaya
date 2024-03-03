import fs from "node:fs";
import { prisma } from "../helper/prisma";

export default class AdminBannerRepository {
  async index(): Promise<Record<string, any>> {
    const result = await prisma.banner.findMany({
      orderBy: {
        created: "desc",
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async create(param: Record<string, any>): Promise<void> {
    await prisma.banner.create({
      data: {
        id: param.id,
        name: param.name,
        description: param.description,
        picture: param.picture,
        big: true,
      },
    });
  }

  async update(param: Record<string, any>): Promise<void> {
    await prisma.banner.update({
      where: { id: param.id },
      data: param,
    });
  }

  async delete(param: Record<string, any>): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const banner = await tx.banner.findFirst({ where: { id: param.id } });

      if (banner) {
        const filename = banner.picture.substring(
          banner.picture.lastIndexOf("/") + 1
        );

        const path = "upload/image/" + filename;

        fs.stat(path, async (err) => {
          if (!err) {
            fs.unlinkSync("upload/image/" + filename);
          }
        });

        await tx.banner.delete({
          where: { id: param.id },
        });
      }
    });
  }
}
