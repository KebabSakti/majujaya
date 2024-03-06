"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const common_1 = require("../helper/common");
const failure_1 = require("../helper/failure");
const admin_category_repository_1 = __importDefault(require("../repository/admin-category-repository"));
const adminCategoryRepository = new admin_category_repository_1.default();
class AdminCategoryController {
    async index(req, res) {
        try {
            const schema = joi_1.default.object({
                page: joi_1.default.string().required(),
                limit: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(req.query);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await adminCategoryRepository.index(req.query);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async create(req, res) {
        (0, common_1.upload)(req, res, async (uploadErr) => {
            try {
                if (uploadErr) {
                    throw new failure_1.BadRequest(uploadErr.message);
                }
                const schema = joi_1.default.object({
                    name: joi_1.default.string().required(),
                }).unknown();
                const { error } = schema.validate(req.body);
                if (error) {
                    throw new failure_1.BadRequest(error.message);
                }
                if (req.files?.length == 0) {
                    throw new failure_1.BadRequest("Gambar tidak boleh kosong");
                }
                const fileUrl = `${req.protocol}://${req.headers.host}/image/${req.files[0].filename}`;
                await adminCategoryRepository.create({
                    ...req.body,
                    picture: fileUrl,
                });
                res.end();
            }
            catch (error) {
                failure_1.Failure.handle(error, res);
            }
        });
    }
    async update(req, res) {
        (0, common_1.upload)(req, res, async (uploadErr) => {
            try {
                if (uploadErr) {
                    throw new failure_1.BadRequest(uploadErr.message);
                }
                const param = {
                    ...req.body,
                    id: req.params.id,
                };
                const schema = joi_1.default.object({
                    name: joi_1.default.string().required(),
                }).unknown();
                const { error } = schema.validate(param);
                if (error) {
                    throw new failure_1.BadRequest(error.message);
                }
                if (req.files?.length) {
                    const fileUrl = `${req.protocol}://${req.headers.host}/image/${req.files[0].filename}`;
                    param.picture = fileUrl;
                }
                await adminCategoryRepository.update(param);
                res.end();
            }
            catch (error) {
                failure_1.Failure.handle(error, res);
            }
        });
    }
    async delete(req, res) {
        try {
            const result = await adminCategoryRepository.delete({ id: req.params.id });
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = AdminCategoryController;
