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

  async update(param: Record<string, any>): Promise<void> {
    await prisma.banner.update({
      where: { id: param.id },
      data: param,
    });
  }
}
