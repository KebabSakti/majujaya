import express from "express";
import AdminWaController from "../../lib/controller/admin-wa-controller";

const router = express.Router();
const adminWaController = new AdminWaController();

router.get("/qr", adminWaController.qr);

export default router;
