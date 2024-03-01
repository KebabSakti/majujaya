import express from "express";
import UserOrderController from "../../lib/controller/user-order-controller";

const router = express.Router();
const orderController = new UserOrderController();

router.get("/", orderController.read);
router.post("/", orderController.create);
router.put("/", orderController.update);

export default router;
