"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserProductRatingRepository {
    async read(param) {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const sortingField = ["rating"];
            let condition = { where: { productId: param.productId } };
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
                data: query,
            };
            return data;
        });
        return result;
    }
}
exports.default = UserProductRatingRepository;
