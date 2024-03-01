"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_category_controller_1 = __importDefault(require("../../lib/controller/user-category-controller"));
const router = express_1.default.Router();
const categoryController = new user_category_controller_1.default();
router.get("/", categoryController.index);
exports.default = router;
