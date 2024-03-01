import { Result } from "../config/type";
import { prisma } from "../helper/prisma";
import { BannerModel } from "./../../../../lib/model/banner-model";

export default class UserBannerRepository {
  async read(): Promise<Result<BannerModel[]>> {
    const result = await prisma.banner.findMany({
      where: { active: true },
      skip: 0,
      take: 10,
      orderBy: {
        created: "desc",
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }
}
