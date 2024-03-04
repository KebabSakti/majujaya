import { CategoryModel } from "../../../../lib/model/category-model";
import { Result } from "../config/type";
import { prisma } from "../helper/prisma";

export default class UserCategoryRepository {
  async read(): Promise<Result<CategoryModel[]>> {
    const result = await prisma.category.findMany({
      where: { active: true, deleted: null },
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
