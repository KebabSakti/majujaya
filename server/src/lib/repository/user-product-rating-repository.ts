import { ProductRating } from "@prisma/client";
import { Result } from "../config/type";
import { prisma } from "../helper/prisma";

export default class UserProductRatingRepository {
  async read(param: Record<string, any>): Promise<Result<ProductRating>> {
    const result = await prisma.$transaction(async (tx) => {
      const sortingField = ["rating"];
      let condition: any = { where: { productId: param.productId } };

      if (param.hasOwnProperty("sort") && param.hasOwnProperty("direction")) {
        const index = sortingField.indexOf(param.sort);

        if (index >= 0) {
          condition = {
            ...condition,
            orderBy: {
              [sortingField[index]]: param.direction,
            },
          };
        }
      }

      if (param.hasOwnProperty("page") && param.hasOwnProperty("limit")) {
        const skip = param.page == 1 ? 0 : param.page * param.limit;

        condition = {
          ...condition,
          skip: skip,
          take: parseInt(param.limit),
        };
      }

      const records = await tx.productRating.count({
        ...condition,
        skip: undefined,
        take: undefined,
      });

      const query = await tx.productRating.findMany({
        ...condition,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const data = {
        paginate: {
          page: param.page,
          total: records,
        },
        data: query as any,
      };

      return data;
    });

    return result;
  }
}
