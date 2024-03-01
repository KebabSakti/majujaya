import http from "http";
import { Server } from "socket.io";

class SocketIo {
  static init(server: http.Server) {
    const io = new Server(server);

    return io;
  }
}

export { SocketIo };
