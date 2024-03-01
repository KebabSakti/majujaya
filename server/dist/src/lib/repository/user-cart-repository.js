"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserCartRepository {
    async show(param) {
        const result = await prisma_1.prisma.cart.findFirst({
            where: { userId: param.userId },
            include: {
                cartItem: {
                    include: {
                        productVariant: {
                            include: {
                                product: {
                                    include: {
                                        store: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
    async update(param) {
        const cartItem = param.cartItem;
        const cartId = param.id;
        const userId = param.userId;
        const cartQtyTotal = cartItem.reduce((a, b) => a + Number(b.qty), 0);
        const cartTotal = cartItem.reduce((a, b) => a + Number(b.total), 0);
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const cart = await tx.cart.upsert({
                where: { userId: userId },
                update: {
                    qty: cartQtyTotal,
                    total: cartTotal,
                },
                create: {
                    id: cartId,
                    userId: userId,
                    qty: cartQtyTotal,
                    total: cartTotal,
                },
            });
            await tx.cartItem.deleteMany({
                where: {
                    cartId: {
                        contains: cartId,
                    },
                },
            });
            await Promise.all(cartItem.map(async (e) => {
                await tx.cartItem.create({
                    data: {
                        cartId: cart.id,
                        qty: e.qty,
                        total: e.total,
                        productVariantId: e.productVariantId,
                    },
                });
            }));
            const result = await tx.cart.findFirst({
                where: {
                    id: cartId,
                },
            });
            const data = {
                data: result,
            };
            return data;
        });
        return result;
    }
    async delete(param) {
        const cartId = param.id;
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            await tx.cartItem.deleteMany({
                where: {
                    cartId: {
                        contains: cartId,
                    },
                },
            });
            await tx.cart.deleteMany({
                where: {
                    id: {
                        contains: cartId,
                    },
                },
            });
            const data = {
                data: null,
            };
            return data;
        });
        return result;
    }
}
exports.default = UserCartRepository;
