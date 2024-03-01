"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
const user_cart_repository_1 = __importDefault(require("../repository/user-cart-repository"));
const cartRepository = new user_cart_repository_1.default();
class UserCartController {
    async show(req, res) {
        try {
            const userId = req.app.locals.userId;
            const result = await cartRepository.show({ userId: userId });
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async update(req, res) {
        try {
            const userId = req.app.locals.userId;
            const param = { ...req.body, userId: userId };
            const result = await cartRepository.update(param);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async delete(req, res) {
        try {
            const result = await cartRepository.delete(req.body);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserCartController;
