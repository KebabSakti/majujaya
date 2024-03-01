"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const failure_1 = require("../helper/failure");
const prisma_1 = require("../helper/prisma");
class UserAuthRepository {
    async login(param) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                active: true,
                email: param.email,
            },
            include: {
                store: true,
            },
        });
        if (user == null) {
            throw new failure_1.NotFound("User tidak ditemukan");
        }
        const userValid = await bcryptjs_1.default.compare(param.password, user.password);
        if (!userValid) {
            throw new failure_1.BadRequest("Password anda salah");
        }
        const token = jsonwebtoken_1.default.sign(user.id, process.env.HASH_SALT);
        const data = {
            data: {
                token: token,
                user: user,
            },
        };
        return data;
    }
    async validate(token) {
        try {
            const userId = jsonwebtoken_1.default.verify(token, process.env.HASH_SALT);
            const user = await prisma_1.prisma.user.findFirst({
                where: {
                    active: true,
                    id: userId,
                },
            });
            if (user == null) {
                throw new failure_1.NotFound("User tidak ditemukan");
            }
            const data = {
                data: {
                    token: token,
                    user: user,
                },
            };
            return data;
        }
        catch (error) {
            throw new failure_1.Unauthorized();
        }
    }
}
exports.default = UserAuthRepository;
