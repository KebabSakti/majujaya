"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_product_controller_1 = __importDefault(require("../../lib/controller/user-product-controller"));
const router = express_1.default.Router();
const productController = new user_product_controller_1.default();
router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.create);
router.put("/", productController.update);
exports.default = router;
