"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIo = void 0;
const socket_io_1 = require("socket.io");
class SocketIo {
    static init(server) {
        const io = new socket_io_1.Server(server);
        return io;
    }
}
exports.SocketIo = SocketIo;
