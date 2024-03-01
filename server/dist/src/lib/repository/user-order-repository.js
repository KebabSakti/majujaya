"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helper/common");
const failure_1 = require("../helper/failure");
const prisma_1 = require("../helper/prisma");
class UserOrderRepository {
    async read(param) {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const sortingField = ["updated"];
            const filterField = ["userId", "storeId"];
            let condition = {
                where: {},
            };
            if (param.hasOwnProperty("orderStatus")) {
                condition["where"] = {
                    ...condition.where,
                    statusOrder: param.orderStatus,
                };
            }
            if (param.hasOwnProperty("invoice")) {
                condition["where"] = {
                    ...condition.where,
                    invoice: param.invoice,
                };
            }
            if (param.hasOwnProperty("filter") || param.hasOwnProperty("value")) {
                const index = filterField.indexOf(param.filter);
                if (index < 0) {
                    throw new failure_1.BadRequest();
                }
                condition["where"] = {
                    ...condition.where,
                    [filterField[index]]: param.value,
                };
            }
            if (param.hasOwnProperty("sort") && param.hasOwnProperty("direction")) {
                const index = sortingField.indexOf(param.sort);
                if (index < 0) {
                    throw new failure_1.BadRequest();
                }
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
                const skip = (Number(param.page) - 1) * Number(param.limit);
                condition = {
                    ...condition,
                    skip: skip,
                    take: parseInt(param.limit),
                };
            }
            const records = await tx.order.count({
                ...condition,
                skip: undefined,
                take: undefined,
            });
            const query = await tx.order.findMany({
                ...condition,
                include: {
                    orderItem: true,
                    orderStatus: {
                        orderBy: {
                            created: "desc",
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
    async create(param) {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            await Promise.all(await param.stores.map(async (store) => {
                const order = await tx.order.create({
                    data: {
                        invoice: (0, common_1.invoice)(),
                        userId: param.userId,
                        userName: param.userName,
                        userPhone: param.userPhone,
                        storeId: store.storeId,
                        storeUserId: store.storeUserId,
                        storeName: store.storeName,
                        storePhone: store.storePhone,
                        paymentId: param.paymentId,
                        paymentName: param.paymentName,
                        paymentPicture: param.paymentPicture,
                        paymentFee: param.paymentFee,
                        paymentFixed: param.paymentFixed,
                        receiverName: param.receiverName,
                        receiverAddress: param.receiverAddress,
                        receiverPhone: param.receiverPhone,
                        receiverLat: param.receiverLat,
                        receiverLng: param.receiverLng,
                        adminFee: param.adminFee,
                        payTotal: store.total,
                        productQty: store.qty,
                        productTotal: store.total,
                        shippingFee: param.shippingFee,
                        statusOrder: "PENDING",
                        statusPayment: "PENDING",
                        statusShipping: "PENDING",
                        orderItem: {
                            create: store.items,
                        },
                        orderStatus: {
                            create: {
                                status: "PENDING",
                            },
                        },
                        paymentStatus: {
                            create: {
                                status: "PENDING",
                            },
                        },
                        shippingStatus: {
                            create: {
                                status: "PENDING",
                            },
                        },
                    },
                });
            }));
            const data = {
                data: null,
            };
            return data;
        });
        return result;
    }
    async update(param) {
        await prisma_1.prisma.$transaction(async (tx) => {
            await tx.order.update({
                where: {
                    id: param.id,
                },
                data: {
                    statusOrder: param.statusOrder,
                    updated: new Date(),
                },
            });
            await tx.orderStatus.create({
                data: {
                    orderId: param.id,
                    status: param.statusOrder,
                },
            });
        });
    }
}
exports.default = UserOrderRepository;
