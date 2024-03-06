"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_category_controller_1 = __importDefault(require("../../lib/controller/admin-category-controller"));
const router = express_1.default.Router();
const adminCategoryController = new admin_category_controller_1.default();
router.get("/", adminCategoryController.index);
router.post("/", adminCategoryController.create);
router.put("/:id", adminCategoryController.update);
router.delete("/:id", adminCategoryController.delete);
exports.default = router;
