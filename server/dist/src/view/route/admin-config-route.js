"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_config_controller_1 = __importDefault(require("../../lib/controller/admin-config-controller"));
const router = express_1.default.Router();
const adminConfigController = new admin_config_controller_1.default();
router.get("/", adminConfigController.index);
router.put("/:id", adminConfigController.update);
exports.default = router;
