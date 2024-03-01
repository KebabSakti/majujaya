import express from "express";
import UserBannerController from "../../lib/controller/user-banner-controller";

const router = express.Router();
const bannerController = new UserBannerController();

router.get("/", bannerController.index);

export default router;
