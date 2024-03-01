"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.NotFound = exports.InternalError = exports.Failure = exports.BadRequest = void 0;
class Failure extends Error {
    constructor(message) {
        super(message);
    }
    static handle(error, res) {
        console.log(error);
        let code = 500;
        let message = "Terjadi kesalahan, mohon coba beberapa saat lagi";
        if (error instanceof Unauthorized) {
            code = 401;
            message = "Akses ke resource ini tidak di izinkan";
        }
        else if (error instanceof NotFound) {
            code = 404;
            message = "Data yang anda tuju tidak ditemukan";
        }
        else if (error instanceof BadRequest) {
            code = 400;
            message = error.message;
        }
        res.status(code).json(message);
    }
}
exports.Failure = Failure;
class InternalError extends Failure {
}
exports.InternalError = InternalError;
class Unauthorized extends Failure {
}
exports.Unauthorized = Unauthorized;
class NotFound extends Failure {
}
exports.NotFound = NotFound;
class BadRequest extends Failure {
    constructor(message) {
        super(message ?? "Cek kembali input yang anda berikan");
    }
}
exports.BadRequest = BadRequest;
