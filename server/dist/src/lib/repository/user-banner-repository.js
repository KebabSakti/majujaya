"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserBannerRepository {
    async read() {
        const result = await prisma_1.prisma.banner.findMany({
            where: { active: true },
            skip: 0,
            take: 10,
            orderBy: {
                created: "desc",
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
}
exports.default = UserBannerRepository;
