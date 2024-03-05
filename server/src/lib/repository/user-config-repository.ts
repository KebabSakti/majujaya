import { prisma } from "../helper/prisma";

export default class UserConfigRepository {
  async index(): Promise<Record<string, any>> {
    const result = await prisma.configuration.findMany({
      skip: 0,
      take: 10,
      orderBy: {
        name: "asc",
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }
}
