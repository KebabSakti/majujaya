"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const user_sales_repository_1 = __importDefault(require("../repository/user-sales-repository"));
const userSalesRepository = new user_sales_repository_1.default();
class UserSalesController {
    async index(req, res) {
        try {
            const schema = joi_1.default.object({
                storeId: joi_1.default.string().required(),
                startDate: joi_1.default.string().required(),
                endDate: joi_1.default.string().required(),
                page: joi_1.default.number().required(),
                limit: joi_1.default.number().required(),
            }).unknown();
            const { error } = schema.validate(req.query);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await userSalesRepository.index(req.query);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserSalesController;
