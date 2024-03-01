import express from "express";
import UserSalesController from "../../lib/controller/user-sales-controller";

const router = express.Router();
const salesController = new UserSalesController();

router.get("/", salesController.index);

export default router;
