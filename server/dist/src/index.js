"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("./lib/helper/socket-io");
const user_middleware_1 = __importDefault(require("./view/middleware/user-middleware"));
const user_account_route_1 = __importDefault(require("./view/route/user-account-route"));
const user_auth_route_1 = __importDefault(require("./view/route/user-auth-route"));
const user_banner_route_1 = __importDefault(require("./view/route/user-banner-route"));
const user_cart_route_1 = __importDefault(require("./view/route/user-cart-route"));
const user_category_route_1 = __importDefault(require("./view/route/user-category-route"));
const user_order_route_1 = __importDefault(require("./view/route/user-order-route"));
const user_payment_route_1 = __importDefault(require("./view/route/user-payment-route"));
const user_product_rating_route_1 = __importDefault(require("./view/route/user-product-rating-route"));
const user_product_route_1 = __importDefault(require("./view/route/user-product-route"));
const user_store_route_1 = __importDefault(require("./view/route/user-store-route"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = socket_io_1.SocketIo.init(server);
const port = 1001;
//websocket
io.use(async (_, next) => {
    next();
}).on("connection", async (socket) => {
    console.log(socket);
});
//global middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//REST API
app.use("/user/auth", user_auth_route_1.default);
app.use("/user/banner", user_banner_route_1.default);
app.use("/user/category", user_category_route_1.default);
app.use("/user/product", user_product_route_1.default);
app.use("/user/product-rating", user_product_rating_route_1.default);
app.use("/user/payment", user_payment_route_1.default);
//============================================================//
app.use("/user/protected", user_middleware_1.default);
app.use("/user/protected/account", user_account_route_1.default);
app.use("/user/protected/store", user_store_route_1.default);
app.use("/user/protected/cart", user_cart_route_1.default);
app.use("/user/protected/order", user_order_route_1.default);
app.post("/upload", (req, res) => {
    console.log(req.file);
    res.end();
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
