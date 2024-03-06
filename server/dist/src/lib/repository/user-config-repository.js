"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserConfigRepository {
    async index() {
        const result = await prisma_1.prisma.configuration.findMany({
            skip: 0,
            take: 10,
            orderBy: {
                name: "asc",
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
}
exports.default = UserConfigRepository;
