"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
const user_payment_repository_1 = __importDefault(require("../repository/user-payment-repository"));
const paymentRepository = new user_payment_repository_1.default();
class UserPaymentController {
    async index(req, res) {
        try {
            const result = await paymentRepository.index(req.query);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserPaymentController;
