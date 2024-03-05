import express from "express";
import UserConfigController from "../../lib/controller/user-config-controller";

const router = express.Router();
const userConfigController = new UserConfigController();

router.get("/", userConfigController.index);

export default router;
