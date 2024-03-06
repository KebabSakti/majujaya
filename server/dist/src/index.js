"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("./lib/helper/socket-io");
const whatsapp_1 = require("./lib/helper/whatsapp");
const admin_middleware_1 = __importDefault(require("./view/middleware/admin-middleware"));
const user_middleware_1 = __importDefault(require("./view/middleware/user-middleware"));
const admin_auth_route_1 = __importDefault(require("./view/route/admin-auth-route"));
const admin_banner_route_1 = __importDefault(require("./view/route/admin-banner-route"));
const admin_category_route_1 = __importDefault(require("./view/route/admin-category-route"));
const admin_config_route_1 = __importDefault(require("./view/route/admin-config-route"));
const admin_wa_route_1 = __importDefault(require("./view/route/admin-wa-route"));
const user_account_route_1 = __importDefault(require("./view/route/user-account-route"));
const user_auth_route_1 = __importDefault(require("./view/route/user-auth-route"));
const user_banner_route_1 = __importDefault(require("./view/route/user-banner-route"));
const user_cart_route_1 = __importDefault(require("./view/route/user-cart-route"));
const user_category_route_1 = __importDefault(require("./view/route/user-category-route"));
const user_config_route_1 = __importDefault(require("./view/route/user-config-route"));
const user_order_route_1 = __importDefault(require("./view/route/user-order-route"));
const user_payment_route_1 = __importDefault(require("./view/route/user-payment-route"));
const user_product_rating_route_1 = __importDefault(require("./view/route/user-product-rating-route"));
const user_product_route_1 = __importDefault(require("./view/route/user-product-route"));
const user_sales_route_1 = __importDefault(require("./view/route/user-sales-route"));
const user_store_route_1 = __importDefault(require("./view/route/user-store-route"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
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
//wa init
whatsapp_1.Whatsapp.init(app);
//global middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("upload"));
//REST API
app.use("/user/auth", user_auth_route_1.default);
app.use("/user/banner", user_banner_route_1.default);
app.use("/user/category", user_category_route_1.default);
app.use("/user/product", user_product_route_1.default);
app.use("/user/product-rating", user_product_rating_route_1.default);
app.use("/user/payment", user_payment_route_1.default);
app.use("/user/config", user_config_route_1.default);
//============================================================//
app.use("/user/protected", user_middleware_1.default);
app.use("/user/protected/account", user_account_route_1.default);
app.use("/user/protected/store", user_store_route_1.default);
app.use("/user/protected/cart", user_cart_route_1.default);
app.use("/user/protected/order", user_order_route_1.default);
app.use("/user/protected/sales", user_sales_route_1.default);
//============================================================//
app.use("/admin/auth", admin_auth_route_1.default);
app.use("/admin/protected", admin_middleware_1.default);
app.use("/admin/protected/banner", admin_banner_route_1.default);
app.use("/admin/protected/category", admin_category_route_1.default);
app.use("/admin/protected/config", admin_config_route_1.default);
app.use("/admin/protected/wa", admin_wa_route_1.default);
//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));
server.listen(port);
