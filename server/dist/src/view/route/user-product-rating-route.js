"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_product_rating_controller_1 = __importDefault(require("../../lib/controller/user-product-rating-controller"));
const router = express_1.default.Router();
const productRatingController = new user_product_rating_controller_1.default();
router.get("/", productRatingController.index);
exports.default = router;
