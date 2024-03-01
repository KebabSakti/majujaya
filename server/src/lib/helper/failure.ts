import { Response } from "express";
import { Empty } from "../config/type";

class Failure extends Error {
  constructor(message?: string) {
    super(message);
  }

  static handle(error: Error, res: Response) {
    console.log(error);

    let code: number = 500;
    let message: string = "Terjadi kesalahan, mohon coba beberapa saat lagi";

    if (error instanceof Unauthorized) {
      code = 401;
      message = "Akses ke resource ini tidak di izinkan";
    } else if (error instanceof NotFound) {
      code = 404;
      message = "Data yang anda tuju tidak ditemukan";
    } else if (error instanceof BadRequest) {
      code = 400;
      message = error.message;
    }

    res.status(code).json(message);
  }
}

class InternalError extends Failure {}

class Unauthorized extends Failure {}

class NotFound extends Failure {}

class BadRequest extends Failure {
  constructor(message?: string) {
    super(message ?? "Cek kembali input yang anda berikan");
  }
}

export { BadRequest, Failure, InternalError, NotFound, Unauthorized };
