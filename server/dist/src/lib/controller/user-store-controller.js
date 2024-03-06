"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
const user_store_repository_1 = __importDefault(require("../repository/user-store-repository"));
const common_1 = require("../helper/common");
const storeRepository = new user_store_repository_1.default();
class UserStoreController {
    async show(req, res) {
        try {
            const user = req.app.locals.user;
            const result = await storeRepository.show({ userId: user.id });
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async create(req, res) {
        try {
            const user = req.app.locals.user;
            req.body.phone = (0, common_1.convertToValidPhoneNumber)(req.body.phone);
            const payload = { ...req.body, userId: user.id };
            await storeRepository.create(payload);
            res.end();
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserStoreController;
