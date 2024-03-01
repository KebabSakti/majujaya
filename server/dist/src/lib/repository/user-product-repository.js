"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helper/common");
const prisma_1 = require("../helper/prisma");
class UserProductRepository {
    async read(param) {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const sortingField = [
                "priority",
                "sell",
                "price",
                "view",
                "rating",
                "created",
            ];
            let condition = { where: {} };
            if (!param.hasOwnProperty("active")) {
                condition["where"] = {
                    ...condition.where,
                    active: true,
                };
            }
            if (param.hasOwnProperty("storeId")) {
                condition["where"] = {
                    ...condition.where,
                    storeId: param.storeId,
                };
            }
            if (param.hasOwnProperty("categoryId")) {
                condition["where"] = {
                    ...condition.where,
                    categoryId: param.categoryId,
                };
            }
            if (param.hasOwnProperty("name")) {
                condition["where"] = {
                    ...condition.where,
                    name: { contains: param.name },
                };
            }
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
            const records = await tx.product.count({
                ...condition,
                skip: undefined,
                take: undefined,
            });
            const query = await tx.product.findMany({
                ...condition,
            });
            const data = {
                paginate: {
                    page: param.page,
                    total: records,
                },
                data: query.map((e) => (0, common_1.toModel)(e)),
            };
            return data;
        });
        return result;
    }
    async show(id) {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const query = await tx.product.findFirst({
                where: { id: id },
                include: {
                    store: true,
                    category: true,
                    productGalery: true,
                    productVariant: true,
                },
            });
            await tx.product.update({
                where: { id: id },
                data: { view: { increment: 1 } },
            });
            const data = {
                data: query,
            };
            return data;
        });
        return result;
    }
    async create(param) {
        await prisma_1.prisma.$transaction(async (tx) => {
            const picture = param.files.find((e) => e.tag == "picture");
            const galleries = param.files.filter((e) => e.tag == "gallery");
            const product = await tx.product.create({
                data: {
                    storeId: param.storeId,
                    categoryId: param.categoryId,
                    name: param.name,
                    description: param.description,
                    picture: picture.link,
                    price: param.varian[0].price,
                },
            });
            for (const varian of param.varian) {
                await tx.productVariant.create({
                    data: {
                        productId: product.id,
                        name: varian.name,
                        price: varian.price,
                        wholesaleMin: varian.wholesaleMin,
                        wholesalePrice: varian.wholesalePrice,
                    },
                });
            }
            for (const gallery of galleries) {
                await tx.productGalery.create({
                    data: {
                        productId: product.id,
                        picture: gallery.link,
                    },
                });
            }
        });
    }
    async update(param) {
        await prisma_1.prisma.product.update({
            where: {
                id: param.id,
            },
            data: param,
        });
    }
}
exports.default = UserProductRepository;
