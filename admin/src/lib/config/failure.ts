import { Empty } from "./type";

export class Failure extends Error {
  code: number;
  note: string;

  constructor(code: number, msg?: string | Empty) {
    let errMsg = msg ?? "Unknown error";

    if (code == 500 && msg == null) {
      errMsg = "Internal error";
    }

    if (code == 404 && msg == null) {
      errMsg = "Not found";
    }

    if (code == 401 && msg == null) {
      errMsg = "Unauthorized";
    }

    if (code == 400 && msg == null) {
      errMsg = "Bad request";
    }

    super(errMsg);
    this.code = code;
    this.note = errMsg;
    Object.setPrototypeOf(this, Failure.prototype);

    console.log(this);
  }
}
