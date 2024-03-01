"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../helper/prisma");
class UserRepository {
    async show(param) {
        let condition = { where: { active: true } };
        if (param.hasOwnProperty("id")) {
            condition["where"] = {
                ...condition.where,
                id: param.id,
            };
        }
        if (param.hasOwnProperty("email")) {
            condition["where"] = {
                ...condition.where,
                email: param.email,
            };
        }
        const result = await prisma_1.prisma.user.findFirst({
            ...condition,
        });
        const data = {
            data: result,
        };
        return data;
    }
    async create(param) {
        const hashedPassword = await bcryptjs_1.default.hash(param.password, 10);
        const result = await prisma_1.prisma.user.create({
            data: {
                password: hashedPassword,
                email: param.email,
                name: param.name,
                phone: param.phone,
                address: param.address,
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
    async update(param) {
        const result = await prisma_1.prisma.user.update({
            where: {
                id: param.id,
            },
            data: {
                email: param.email,
                name: param.name,
                phone: param.phone,
                address: param.address,
            },
        });
        const data = {
            data: result,
        };
        return data;
    }
}
exports.default = UserRepository;
