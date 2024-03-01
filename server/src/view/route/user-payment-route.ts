import express from "express";
import UserPaymentController from "../../lib/controller/user-payment-controller";

const router = express.Router();
const paymentController = new UserPaymentController();

router.get("/", paymentController.index);

export default router;
