"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class AdminCategoryRepository {
    async index(param) {
        const skip = (param.page - 1) * param.limit;
        const result = await prisma_1.prisma.category.findMany({
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
            data: result,
        };
        return data;
    }
    async create(param) {
        await prisma_1.prisma.category.create({
            data: {
                id: param.id,
                name: param.name,
                description: param.description,
                picture: param.picture,
                active: param.status == "active",
            },
        });
    }
    async update(param) {
        await prisma_1.prisma.category.update({
            where: { id: param.id },
            data: {
                name: param.name,
                description: param.description,
                picture: param.picture,
                active: param.status == "active",
            },
        });
    }
    async delete(param) {
        await prisma_1.prisma.category.update({
            where: { id: param.id },
            data: {
                deleted: new Date(),
            },
        });
    }
}
exports.default = AdminCategoryRepository;
