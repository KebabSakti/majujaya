"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const user_account_repository_1 = __importDefault(require("../repository/user-account-repository"));
const user_auth_repository_1 = __importDefault(require("../repository/user-auth-repository"));
const userAuthRepository = new user_auth_repository_1.default();
const userRepository = new user_account_repository_1.default();
class UserAuthController {
    async login(req, res) {
        try {
            const schema = joi_1.default.object({
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(req.body);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await userAuthRepository.login(req.body);
            delete result.data?.user?.id;
            delete result.data?.user?.password;
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async register(req, res) {
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
}
exports.default = UserAuthController;
