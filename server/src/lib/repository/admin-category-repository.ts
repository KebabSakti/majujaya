import { prisma } from "../helper/prisma";

export default class AdminCategoryRepository {
  async index(param: Record<string, any>): Promise<Record<string, any>> {
    const skip = (param.page - 1) * param.limit;

    const result = await prisma.category.findMany({
      where: {
        deleted: null,
      },
      orderBy: {
        created: "desc",
      },
      skip: skip,
      take: parseInt(param.limit),
    });

    const data = {
      data: result as any,
    };

    return data;
  }

  async create(param: Record<string, any>): Promise<void> {
    await prisma.category.create({
      data: {
        id: param.id,
        name: param.name,
        description: param.description,
        picture: param.picture,
        active: param.status == "active",
      },
    });
  }

  async update(param: Record<string, any>): Promise<void> {
    await prisma.category.update({
      where: { id: param.id },
      data: {
        name: param.name,
        description: param.description,
        picture: param.picture,
        active: param.status == "active",
      },
    });
  }

  async delete(param: Record<string, any>): Promise<void> {
    await prisma.category.update({
      where: { id: param.id },
      data: {
        deleted: new Date(),
      },
    });
  }
}
