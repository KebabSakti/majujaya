"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const admin_config_repository_1 = __importDefault(require("../repository/admin-config-repository"));
const adminConfigRepository = new admin_config_repository_1.default();
class AdminConfigController {
    async index(req, res) {
        try {
            const result = await adminConfigRepository.index();
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async update(req, res) {
        try {
            const payload = {
                ...req.body,
                id: req.params.id,
            };
            const schema = joi_1.default.object({
                value: joi_1.default.string().required(),
            }).unknown();
            const { error } = schema.validate(payload);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            await adminConfigRepository.update(payload);
            res.end();
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = AdminConfigController;
