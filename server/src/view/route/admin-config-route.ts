import express from "express";
import AdminConfigController from "../../lib/controller/admin-config-controller";

const router = express.Router();
const adminConfigController = new AdminConfigController();

router.get("/", adminConfigController.index);
router.put("/:id", adminConfigController.update);

export default router;
