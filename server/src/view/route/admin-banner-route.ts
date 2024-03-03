import express from "express";
import AdminBannerController from "../../lib/controller/admin-banner-controller";

const router = express.Router();
const adminBannerController = new AdminBannerController();

router.get("/", adminBannerController.index);
router.put("/", adminBannerController.update);

export default router;
