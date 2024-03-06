"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const admin_auth_repository_1 = __importDefault(require("../repository/admin-auth-repository"));
const adminAuthRepository = new admin_auth_repository_1.default();
class AdminAuthController {
    async login(req, res) {
        try {
            const schema = joi_1.default.object({
                username: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(req.body);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await adminAuthRepository.login(req.body);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = AdminAuthController;
