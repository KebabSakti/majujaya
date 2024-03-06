"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_wa_controller_1 = __importDefault(require("../../lib/controller/admin-wa-controller"));
const router = express_1.default.Router();
const adminWaController = new admin_wa_controller_1.default();
router.get("/qr", adminWaController.qr);
exports.default = router;
