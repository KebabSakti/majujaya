"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_auth_controller_1 = __importDefault(require("../../lib/controller/user-auth-controller"));
const router = express_1.default.Router();
const userAuthController = new user_auth_controller_1.default();
router.post("/login", userAuthController.login);
router.post("/register", userAuthController.register);
exports.default = router;
