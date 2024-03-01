"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const user_product_repository_1 = __importDefault(require("../repository/user-product-repository"));
const productRepository = new user_product_repository_1.default();
class UserProductController {
    async index(req, res) {
        try {
            const schema = joi_1.default.object({
                page: joi_1.default.string().required(),
                limit: joi_1.default.string().required(),
            }).unknown(true);
            const { error } = schema.validate(req.query);
            if (error) {
                throw new failure_1.BadRequest();
            }
            const result = await productRepository.read(req.query);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async show(req, res) {
        try {
            const result = await productRepository.show(req.params.id);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async create(req, res) {
        try {
            await productRepository.create(req.body);
            res.end();
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async update(req, res) {
        try {
            await productRepository.update(req.body);
            res.end();
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserProductController;
