"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
const user_config_repository_1 = __importDefault(require("../repository/user-config-repository"));
const configRepository = new user_config_repository_1.default();
class UserConfigController {
    async index(req, res) {
        try {
            const result = await configRepository.index();
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserConfigController;
