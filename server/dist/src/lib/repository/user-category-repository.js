"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserCategoryRepository {
    async read() {
        const result = await prisma_1.prisma.category.findMany({
            where: { active: true },
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
exports.default = UserCategoryRepository;
