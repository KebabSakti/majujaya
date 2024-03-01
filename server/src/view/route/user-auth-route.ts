import express from "express";
import UserAuthController from "../../lib/controller/user-auth-controller";

const router = express.Router();
const userAuthController = new UserAuthController();

router.post("/login", userAuthController.login);
router.post("/register", userAuthController.register);

export default router;
