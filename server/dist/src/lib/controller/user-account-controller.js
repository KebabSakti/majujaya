"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
const user_account_repository_1 = __importDefault(require("../repository/user-account-repository"));
const joi_1 = __importDefault(require("joi"));
const userRepository = new user_account_repository_1.default();
class UserController {
    async show(req, res) {
        try {
            let query;
            if (req.query.hasOwnProperty("id")) {
                query = { id: req.query.id };
            }
            if (req.query.hasOwnProperty("email")) {
                query = { email: req.query.email };
            }
            if (query == null) {
                throw new failure_1.BadRequest("ID atau Email user diperlukan");
            }
            const result = await userRepository.show(query);
            delete result.data?.password;
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async create(req, res) {
        try {
            const schema = joi_1.default.object({
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
                name: joi_1.default.string().required(),
                phone: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(req.body);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await userRepository.create(req.body);
            delete result.data?.password;
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async update(req, res) {
        try {
            const schema = joi_1.default.object({
                id: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(req.body);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await userRepository.update(req.body);
            delete result.data?.password;
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserController;
