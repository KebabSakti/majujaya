"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../helper/failure");
class AdminWaController {
    async qr(req, res) {
        try {
            const data = req.app.locals.qr;
            res.json(data);
        }
        catch (error) {
            failure_1.Failure.handle(error, res);
        }
    }
}
exports.default = AdminWaController;
