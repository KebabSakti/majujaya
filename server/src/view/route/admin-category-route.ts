import express from "express";
import AdminCategoryController from "../../lib/controller/admin-category-controller";

const router = express.Router();
const adminCategoryController = new AdminCategoryController();

router.get("/", adminCategoryController.index);
router.post("/", adminCategoryController.create);
router.put("/:id", adminCategoryController.update);
router.delete("/:id", adminCategoryController.delete);

export default router;
