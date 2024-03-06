"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_banner_controller_1 = __importDefault(require("../../lib/controller/admin-banner-controller"));
const router = express_1.default.Router();
const adminBannerController = new admin_banner_controller_1.default();
router.get("/", adminBannerController.index);
router.post("/", adminBannerController.create);
router.put("/:id", adminBannerController.update);
router.delete("/:id", adminBannerController.delete);
exports.default = router;
