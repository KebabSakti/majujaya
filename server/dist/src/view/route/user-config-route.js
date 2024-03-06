"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_config_controller_1 = __importDefault(require("../../lib/controller/user-config-controller"));
const router = express_1.default.Router();
const userConfigController = new user_config_controller_1.default();
router.get("/", userConfigController.index);
exports.default = router;
