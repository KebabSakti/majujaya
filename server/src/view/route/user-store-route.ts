import express from "express";
import UserStoreController from "../../lib/controller/user-store-controller";

const router = express.Router();
const storeController = new UserStoreController();

router.get("/", storeController.show);
router.post("/", storeController.create);

export default router;
