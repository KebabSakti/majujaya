"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_cart_controller_1 = __importDefault(require("../../lib/controller/user-cart-controller"));
const router = express_1.default.Router();
const cartController = new user_cart_controller_1.default();
router.get("/", cartController.show);
router.post("/", cartController.update);
router.delete("/", cartController.delete);
exports.default = router;
