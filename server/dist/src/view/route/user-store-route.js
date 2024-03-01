"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_store_controller_1 = __importDefault(require("../../lib/controller/user-store-controller"));
const router = express_1.default.Router();
const storeController = new user_store_controller_1.default();
router.get("/", storeController.show);
router.post("/", storeController.create);
exports.default = router;
