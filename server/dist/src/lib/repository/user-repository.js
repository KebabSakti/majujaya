"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../helper/prisma");
const user_model_1 = require("../../../../lib/model/user-model");
class UserRepository {
    async show(param) {
        let condition = { where: { active: true } };
        if (param.field == user_model_1.UserShowField.ID) {
            condition["where"] = { ...condition.where, id: param.value };
        }
        if (param.field == user_model_1.UserShowField.EMAIL) {
            condition["where"] = { ...condition.where, email: param.value };
        }
        const result = await prisma_1.prisma.user.findFirst({
            ...condition,
        });
        const data = result;
        return data;
    }
    async create(data) {
        await prisma_1.prisma.user.create({
            data: data,
        });
    }
}
exports.default = UserRepository;
