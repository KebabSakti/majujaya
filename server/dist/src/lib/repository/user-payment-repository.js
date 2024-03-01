"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
class UserPaymentRepository {
    async index(param) {
        const result = await prisma_1.prisma.payment.findMany({
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
exports.default = UserPaymentRepository;
