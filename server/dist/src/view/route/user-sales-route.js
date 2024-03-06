"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_sales_controller_1 = __importDefault(require("../../lib/controller/user-sales-controller"));
const router = express_1.default.Router();
const salesController = new user_sales_controller_1.default();
router.get("/", salesController.index);
exports.default = router;
