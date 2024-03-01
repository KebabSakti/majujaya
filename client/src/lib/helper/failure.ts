import { FailureData } from "../config/type";

class Failure extends Error {
  constructor(message?: string) {
    super(message);
  }

  static handle(error: any): FailureData {
    console.error(error);

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

    const failureData = {
      code: code,
      message: message,
    };

    return failureData;
  }

  static async network(response: Response): Promise<Failure> {
    const message = await response.json();
    let error: InternalError = new InternalError(message);

    if (response.status == 401) {
      error = new Unauthorized(message);
    }

    if (response.status == 404) {
      error = new NotFound(message);
    }

    if (response.status == 400) {
      error = new BadRequest(message);
    }

    return error;
  }
}

class InternalError extends Failure {}

class Unauthorized extends Failure {}

class NotFound extends Failure {}

class BadRequest extends Failure {
  constructor(message: string) {
    super(message);
  }
}

export { BadRequest, Failure, InternalError, NotFound, Unauthorized };
