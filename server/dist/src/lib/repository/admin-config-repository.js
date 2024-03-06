"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class AdminConfigRepository {
    async index() {
        const result = await prisma_1.prisma.configuration.findMany({
            orderBy: {
                name: "asc",
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
    async update(param) {
        await prisma_1.prisma.configuration.update({
            where: { id: param.id },
            data: {
                value: param.value,
            },
        });
    }
}
exports.default = AdminConfigRepository;
