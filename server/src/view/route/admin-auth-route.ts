import express from "express";
import AdminAuthController from "../../lib/controller/admin-auth-controller";

const router = express.Router();
const adminAuthController = new AdminAuthController();

router.post("/login", adminAuthController.login);

export default router;
