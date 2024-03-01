"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_account_controller_1 = __importDefault(require("../../lib/controller/user-account-controller"));
const router = express_1.default.Router();
const userController = new user_account_controller_1.default();
router.get("/", userController.show);
router.put("/", userController.update);
exports.default = router;
