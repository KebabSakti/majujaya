import express from "express";
import UserProductRatingController from "../../lib/controller/user-product-rating-controller";

const router = express.Router();
const productRatingController = new UserProductRatingController();

router.get("/", productRatingController.index);

export default router;
