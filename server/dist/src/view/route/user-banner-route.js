"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_banner_controller_1 = __importDefault(require("../../lib/controller/user-banner-controller"));
const router = express_1.default.Router();
const bannerController = new user_banner_controller_1.default();
router.get("/", bannerController.index);
exports.default = router;
