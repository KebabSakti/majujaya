"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const user_product_rating_repository_1 = __importDefault(require("../repository/user-product-rating-repository"));
const productRatingRepository = new user_product_rating_repository_1.default();
class UserProductRatingController {
    async index(req, res) {
        try {
            const schema = joi_1.default.object({
                productId: joi_1.default.string().required(),
                page: joi_1.default.number().required(),
                limit: joi_1.default.number().required(),
            }).unknown();
            const { error } = schema.validate(req.query);
            if (error) {
                throw new failure_1.BadRequest(error.message);
            }
            const result = await productRatingRepository.read(req.query);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserProductRatingController;
