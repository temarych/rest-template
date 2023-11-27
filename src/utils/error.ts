export interface IHttpError {
  code   : number;
  type   : string;
  message: string;
}

export class HttpError extends Error implements IHttpError {
  public code: number;
  public type: string;

  constructor(code: number, data: Omit<IHttpError, 'code'>) {
    super(data.message);
    this.code = code;
    this.type = data.type;
  }
}
