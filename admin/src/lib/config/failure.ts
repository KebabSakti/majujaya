export class Failure extends Error {
  protected code: number;
  protected note: string;

  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
    this.note = msg;

    Object.setPrototypeOf(this, Failure.prototype);
  }
}
