import express from "express";
import UserController from "../../lib/controller/user-account-controller";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.show);
router.put("/", userController.update);

export default router;
