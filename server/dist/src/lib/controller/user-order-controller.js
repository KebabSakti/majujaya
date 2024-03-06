"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const failure_1 = require("../helper/failure");
const user_order_repository_1 = __importDefault(require("../repository/user-order-repository"));
const whatsapp_1 = require("../helper/whatsapp");
const common_1 = require("../helper/common");
const orderRepository = new user_order_repository_1.default();
class UserOrderController {
    async read(req, res) {
        try {
            const schema = joi_1.default.object({
                page: joi_1.default.string().required(),
                limit: joi_1.default.string().required(),
            }).unknown(true);
            const { error } = schema.validate(req.query);
            if (error) {
                throw new failure_1.BadRequest();
            }
            const user = req.app.locals.user;
            const param = {
                ...req.query,
                filter: req.query.filter ?? "userId",
                value: req.query.value ?? user.id,
            };
            const result = await orderRepository.read(param);
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async create(req, res) {
        try {
            const user = req.app.locals.user;
            const param = {
                ...req.body,
                userId: user.id,
                userName: user.name,
                userPhone: (0, common_1.convertToValidPhoneNumber)(user.phone),
            };
            const result = await orderRepository.create(param);
            //kirim wa ke toko
            for (const store of param.stores) {
                const storePhone = store.storePhone;
                const storeMessage = `Anda mendapatkan pesanan baru dari ${param.receiverName}, cek detailnya di sini https://majujayashop.com`;
                await whatsapp_1.Whatsapp.send(storePhone, storeMessage);
            }
            res.json(result);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
    async update(req, res) {
        try {
            await orderRepository.update(req.body);
            const order = await orderRepository.show({ id: req.body.id });
            const status = req.body.statusOrder;
            if (status === "CANCELED") {
                await whatsapp_1.Whatsapp.send(order.data.storePhone, `Pesanan dengan nomor ${order.data.invoice} di batalkan oleh pembeli`);
            }
            if (status == "ACTIVE") {
                await whatsapp_1.Whatsapp.send(order.data.userPhone, `Pesanan dengan nomor ${order.data.invoice} telah diterima oleh toko, pihak toko akan segera menghubungi anda`);
            }
            if (status == "COMPLETED") {
                await whatsapp_1.Whatsapp.send(order.data.userPhone, `Pesanan dengan nomor ${order.data.invoice} telah selesai, terimakasih telah berbelanja di https://majujayashop.com`);
            }
            res.end();
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = UserOrderController;
