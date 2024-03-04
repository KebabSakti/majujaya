require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import { SocketIo } from "./lib/helper/socket-io";
import adminMiddleware from "./view/middleware/admin-middleware";
import userMiddleware from "./view/middleware/user-middleware";
import adminAuthRoute from "./view/route/admin-auth-route";
import adminBannerRoute from "./view/route/admin-banner-route";
import adminCategoryRoute from "./view/route/admin-category-route";
import userAccountRoute from "./view/route/user-account-route";
import userAuthRoute from "./view/route/user-auth-route";
import userBannerRoute from "./view/route/user-banner-route";
import userCartRoute from "./view/route/user-cart-route";
import userCategoryRoute from "./view/route/user-category-route";
import userOrderRoute from "./view/route/user-order-route";
import userPaymentRoute from "./view/route/user-payment-route";
import userProductRatingRoute from "./view/route/user-product-rating-route";
import userProductRoute from "./view/route/user-product-route";
import userSalesRoute from "./view/route/user-sales-route";
import userStoreRoute from "./view/route/user-store-route";

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

app.post("/", async (req, res) => {
  res.json();
});

// app.get("/user/debug", async (req, res) => {
//   const userId = "cbb2ac04-6996-4f0d-919f-eddeff39a467";

//   await prisma.$transaction(async (tx) => {
//     // await tx.payment.create({
//     //   data: {
//     //     code: "COD",
//     //     name: "COD - Cash On Delivery",
//     //     description: "Bayar di tujuan setelah barang kamu terima",
//     //     picture:
//     //       "https://res.cloudinary.com/vjtechsolution/image/upload/v1707823397/cod.png",
//     //     fee: 0,
//     //     active: true,
//     //   },
//     // });
//     // await Promise.all(
//     //   [...Array(10)].map(async (_) => {
//     //     await tx.banner.create({
//     //       data: {
//     //         name: faker.commerce.productName(),
//     //         picture: faker.image.urlLoremFlickr({ category: "food" }),
//     //         active: true,
//     //         big: true,
//     //       },
//     //     });
//     //   })
//     // );
//     // store
//     // const store = await tx.store.create({
//     //   data: {
//     //     userId: userId,
//     //     name: faker.company.name(),
//     //     description: faker.lorem.lines({ min: 1, max: 3 }),
//     //     address: faker.location.streetAddress(),
//     //     phone: faker.phone.number(),
//     //     lat: `${faker.location.latitude()}`,
//     //     lng: `${faker.location.longitude()}`,
//     //   },
//     // });
//     // await Promise.all(
//     //   [...Array(10)].map(async (_) => {
//     //     //category
//     //     const category = await tx.category.create({
//     //       data: {
//     //         name: faker.commerce.department(),
//     //         picture: faker.image.urlLoremFlickr({ category: "food" }),
//     //         active: true,
//     //       },
//     //     });
//     //     await Promise.all(
//     //       [...Array(10)].map(async (_) => {
//     //         const productId = randomUUID();
//     //         // const randomCategory = await prisma.category.findMany({
//     //         //   take: 1,
//     //         //   skip: Math.floor(Math.random() * 20),
//     //         // });
//     //         //product
//     //         const product = await tx.product.create({
//     //           data: {
//     //             id: productId,
//     //             storeId: store.id,
//     //             categoryId: category.id,
//     //             priority: faker.number.int({ min: 0, max: 3 }),
//     //             name: faker.commerce.productName(),
//     //             description: faker.lorem.lines(1),
//     //             picture: faker.image.urlLoremFlickr({ category: "food" }),
//     //             sell: faker.number.int({ max: 999 }),
//     //             view: faker.number.int({ max: 999 }),
//     //             rating: faker.number.float({ max: 5 }),
//     //             price: faker.commerce.price({
//     //               min: 1000,
//     //               max: 1000000,
//     //               dec: 0,
//     //             }),
//     //           },
//     //         });
//     //         await Promise.all(
//     //           [...Array(5)].map(async (_) => {
//     //             await tx.productGalery.create({
//     //               data: {
//     //                 productId: productId,
//     //                 picture: faker.image.urlLoremFlickr({ category: "food" }),
//     //               },
//     //             });
//     //           })
//     //         );
//     //         await Promise.all(
//     //           [...Array(10)].map(async (_) => {
//     //             await tx.productVariant.create({
//     //               data: {
//     //                 productId: productId,
//     //                 name: faker.commerce.productName(),
//     //                 stok: faker.number.int({ max: 100 }),
//     //                 price: faker.commerce.price({
//     //                   min: 1000,
//     //                   max: 1000000,
//     //                   dec: 0,
//     //                 }),
//     //                 wholesalePrice: faker.commerce.price({
//     //                   min: 1000,
//     //                   max: 1000000,
//     //                   dec: 0,
//     //                 }),
//     //                 wholesaleMin: faker.number.int({ min: 3, max: 10 }),
//     //                 unit: faker.science.unit.name,
//     //                 weight: faker.number.int({ min: 1000, max: 5000 }),
//     //               },
//     //             });
//     //           })
//     //         );
//     //         await Promise.all(
//     //           [...Array(20)].map(async (_) => {
//     //             await tx.productRating.create({
//     //               data: {
//     //                 userId: userId,
//     //                 productId: productId,
//     //                 productName: faker.commerce.productName(),
//     //                 rating: faker.number.float({ max: 5 }),
//     //                 comment: faker.lorem.lines(2),
//     //               },
//     //             });
//     //           })
//     //         );
//     //       })
//     //     );
//     //   })
//     // );
//   });

//   res.end();
// });

// app.post("/user/debug", async (req, res) => {
//   // const fs = require("fs");
//   // const filename = "dummy.txt";
//   // const data = fs.readFileSync(filename, "utf8");
//   // const images = data.split("\n");
//   // const storeId = "aaef7dc5-41f2-44cf-8748-06e28ab6f3f0";
//   // const userId = "cbb2ac04-6996-4f0d-919f-eddeff39a467";

//   // await prisma.$transaction(async (tx) => {
//   //   const datas = await tx.category.findMany();

//   //   for (const e of datas) {
//   //     await Promise.all(
//   //       [...Array(10)].map(async (_) => {
//   //         const productId = randomUUID();
//   //         const index = Math.floor(Math.random() * images.length);

//   //         //product
//   //         await tx.product.create({
//   //           data: {
//   //             id: productId,
//   //             storeId: storeId,
//   //             categoryId: e.id,
//   //             priority: faker.number.int({ min: 0, max: 3 }),
//   //             name: faker.commerce.productName(),
//   //             description: faker.lorem.lines(1),
//   //             picture: images[index],
//   //             sell: faker.number.int({ max: 999 }),
//   //             view: faker.number.int({ max: 999 }),
//   //             rating: faker.number.float({ max: 5 }),
//   //             price: faker.commerce.price({
//   //               min: 1000,
//   //               max: 1000000,
//   //               dec: 0,
//   //             }),
//   //           },
//   //         });

//   //         await Promise.all(
//   //           [...Array(5)].map(async (_) => {
//   //             await tx.productGalery.create({
//   //               data: {
//   //                 productId: productId,
//   //                 picture: images[index],
//   //               },
//   //             });
//   //           })
//   //         );

//   //         await Promise.all(
//   //           [...Array(10)].map(async (_) => {
//   //             await tx.productVariant.create({
//   //               data: {
//   //                 productId: productId,
//   //                 name: faker.commerce.productName(),
//   //                 stok: faker.number.int({ max: 100 }),
//   //                 price: faker.commerce.price({
//   //                   min: 1000,
//   //                   max: 1000000,
//   //                   dec: 0,
//   //                 }),
//   //                 wholesalePrice: faker.commerce.price({
//   //                   min: 1000,
//   //                   max: 1000000,
//   //                   dec: 0,
//   //                 }),
//   //                 wholesaleMin: faker.number.int({ min: 3, max: 10 }),
//   //                 unit: faker.science.unit.name,
//   //                 weight: faker.number.int({ min: 1000, max: 5000 }),
//   //               },
//   //             });
//   //           })
//   //         );

//   //         await Promise.all(
//   //           [...Array(20)].map(async (_) => {
//   //             await tx.productRating.create({
//   //               data: {
//   //                 userId: userId,
//   //                 productId: productId,
//   //                 productName: faker.commerce.productName(),
//   //                 rating: faker.number.float({ max: 5 }),
//   //                 comment: faker.lorem.lines(2),
//   //               },
//   //             });
//   //           })
//   //         );
//   //       })
//   //     );
//   //   }
//   // });

//   const hashedPassword = await bcrypt.hash("12345678", 10);

//   await prisma.user.update({
//     where: {
//       email: "admin@majujayashop.com",
//     },
//     data: {
//       password: hashedPassword,
//     },
//   });

//   res.end();
// });

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);
