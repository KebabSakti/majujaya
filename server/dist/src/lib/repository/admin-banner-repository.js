"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const prisma_1 = require("../helper/prisma");
class AdminBannerRepository {
    async index(param) {
        const skip = (param.page - 1) * param.limit;
        const result = await prisma_1.prisma.banner.findMany({
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
        await prisma_1.prisma.banner.create({
            data: {
                id: param.id,
                name: param.name,
                description: param.description,
                picture: param.picture,
                big: true,
                active: param.status == "active",
            },
        });
    }
    async update(param) {
        await prisma_1.prisma.banner.update({
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
        await prisma_1.prisma.$transaction(async (tx) => {
            const banner = await tx.banner.findFirst({ where: { id: param.id } });
            if (banner) {
                const filename = banner.picture.substring(banner.picture.lastIndexOf("/") + 1);
                const path = "upload/image/" + filename;
                node_fs_1.default.stat(path, async (err) => {
                    if (!err) {
                        node_fs_1.default.unlinkSync("upload/image/" + filename);
                    }
                });
                await tx.banner.delete({
                    where: { id: param.id },
                });
            }
        });
    }
}
exports.default = AdminBannerRepository;
