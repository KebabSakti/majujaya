"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserSalesRepository {
    async index(param) {
        const skip = (Number(param.page) - 1) * Number(param.limit);
        const queries = await prisma_1.prisma.$transaction(async (tx) => {
            const userSales = [];
            const sales = await tx.order.groupBy({
                by: ["userId"],
                _sum: {
                    payTotal: true,
                    productQty: true,
                },
                orderBy: {
                    _sum: {
                        payTotal: "desc",
                    },
                },
                where: {
                    statusOrder: "COMPLETED",
                    storeId: param.storeId,
                    created: {
                        gte: param.startDate + "T00:00:00.000Z",
                        lte: param.endDate + "T23:59:59.999Z",
                    },
                },
                skip: skip,
                take: parseInt(param.limit),
            });
            for (const sale of sales) {
                const user = await tx.user.findFirst({
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        email: true,
                        address: true,
                    },
                    where: { id: sale.userId },
                });
                if (user) {
                    userSales.push({
                        ...user,
                        productQty: Number(sale._sum.productQty),
                        payTotal: Number(sale._sum.payTotal),
                    });
                }
            }
            const totalItemSold = sales.reduce((a, b) => a + Number(b._sum.productQty), 0);
            const totalRevenue = sales.reduce((a, b) => a + Number(b._sum.payTotal), 0);
            const data = {
                paginate: {
                    page: param.page,
                    total: sales.length,
                },
                summary: {
                    totalItemSold: totalItemSold,
                    totalRevenue: totalRevenue,
                },
                data: userSales,
            };
            return data;
        });
        return queries;
    }
}
exports.default = UserSalesRepository;
