"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_order_controller_1 = __importDefault(require("../../lib/controller/user-order-controller"));
const router = express_1.default.Router();
const orderController = new user_order_controller_1.default();
router.get("/", orderController.read);
router.post("/", orderController.create);
router.put("/", orderController.update);
exports.default = router;
