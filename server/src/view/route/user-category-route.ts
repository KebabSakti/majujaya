import express from "express";
import UserCategoryController from "../../lib/controller/user-category-controller";

const router = express.Router();
const categoryController = new UserCategoryController();

router.get("/", categoryController.index);

export default router;
