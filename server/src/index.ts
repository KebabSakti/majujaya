require("dotenv").config();

import cors from "cors";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import express from "express";
import http from "http";
import { SocketIo } from "./lib/helper/socket-io";
import { Whatsapp } from "./lib/helper/whatsapp";
import adminMiddleware from "./view/middleware/admin-middleware";
import userMiddleware from "./view/middleware/user-middleware";
import adminAuthRoute from "./view/route/admin-auth-route";
import adminBannerRoute from "./view/route/admin-banner-route";
import adminCategoryRoute from "./view/route/admin-category-route";
import adminConfigRoute from "./view/route/admin-config-route";
import adminWaRoute from "./view/route/admin-wa-route";
import userAccountRoute from "./view/route/user-account-route";
import userAuthRoute from "./view/route/user-auth-route";
import userBannerRoute from "./view/route/user-banner-route";
import userCartRoute from "./view/route/user-cart-route";
import userCategoryRoute from "./view/route/user-category-route";
import userConfigRoute from "./view/route/user-config-route";
import userOrderRoute from "./view/route/user-order-route";
import userPaymentRoute from "./view/route/user-payment-route";
import userProductRatingRoute from "./view/route/user-product-rating-route";
import userProductRoute from "./view/route/user-product-route";
import userSalesRoute from "./view/route/user-sales-route";
import userStoreRoute from "./view/route/user-store-route";

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();
const server = http.createServer(app);
const io = SocketIo.init(server);
const port = 1001;

//websocket
io.use(async (_, next) => {
  next();
}).on("connection", async (socket) => {
  console.log(socket);
});

//wa init
Whatsapp.init(app);

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));

//REST API
app.use("/user/auth", userAuthRoute);
app.use("/user/banner", userBannerRoute);
app.use("/user/category", userCategoryRoute);
app.use("/user/product", userProductRoute);
app.use("/user/product-rating", userProductRatingRoute);
app.use("/user/payment", userPaymentRoute);
app.use("/user/config", userConfigRoute);
//============================================================//
app.use("/user/protected", userMiddleware);
app.use("/user/protected/account", userAccountRoute);
app.use("/user/protected/store", userStoreRoute);
app.use("/user/protected/cart", userCartRoute);
app.use("/user/protected/order", userOrderRoute);
app.use("/user/protected/sales", userSalesRoute);
//============================================================//
app.use("/admin/auth", adminAuthRoute);
app.use("/admin/protected", adminMiddleware);
app.use("/admin/protected/banner", adminBannerRoute);
app.use("/admin/protected/category", adminCategoryRoute);
app.use("/admin/protected/config", adminConfigRoute);
app.use("/admin/protected/wa", adminWaRoute);

app.get("/", async (req, res) => {
  const start = "2024-03-04T16:10:33.367Z";
  const data = dayjs(start).format();

  // const startDate = "2024-03-04";
  // const endDate = "2024-03-05";

  // const data = await prisma.order.findMany({
  //   select: {
  //     invoice: true,
  //     userName: true,
  //     statusOrder: true,
  //     created: true,
  //   },
  //   where: {
  //     statusOrder: "COMPLETED",
  //     created: {
  //       gte: startDate + "T00:00:00.000Z",
  //       lte: endDate + "T23:59:59.999Z",
  //     },
  //   },
  //   orderBy: {
  //     created: "desc",
  //   },
  // });

  res.json(data);
});

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
