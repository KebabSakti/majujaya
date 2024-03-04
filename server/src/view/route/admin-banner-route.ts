import express from "express";
import AdminBannerController from "../../lib/controller/admin-banner-controller";

const router = express.Router();
const adminBannerController = new AdminBannerController();

router.get("/", adminBannerController.index);
router.post("/", adminBannerController.create);
router.put("/:id", adminBannerController.update);
router.delete("/:id", adminBannerController.delete);

export default router;
