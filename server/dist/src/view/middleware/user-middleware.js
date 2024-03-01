"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../../lib/helper/failure");
const user_auth_repository_1 = __importDefault(require("../../lib/repository/user-auth-repository"));
const userAuthRepository = new user_auth_repository_1.default();
async function userMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (authorization != undefined) {
            const payloads = authorization.split(" ");
            if (payloads.length == 2) {
                const token = payloads[1];
                const result = await userAuthRepository.validate(token);
                req.app.locals.userId = result.data?.user?.id;
                req.app.locals.user = result.data?.user;
                return next();
            }
        }
        throw new failure_1.Unauthorized();
    }
    catch (error) {
        failure_1.Failure.handle(error, res);
    }
}
exports.default = userMiddleware;
