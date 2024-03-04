import { prisma } from "../helper/prisma";

export default class AdminConfigRepository {
  async index(): Promise<Record<string, any>> {
    const result = await prisma.configuration.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async update(param: Record<string, any>): Promise<void> {
    await prisma.configuration.update({
      where: { id: param.id },
      data: {
        value: param.value,
      },
    });
  }
}
