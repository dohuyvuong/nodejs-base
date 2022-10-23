import { getMessage, ResponseCodeEnum } from '../enums/response-code.enum';
import { ResponseBuilder } from '../utils/response-builder';

import { ResponsePayload } from './response-payload';

export class ApiError extends Error {
  private readonly _errorCode: ResponseCodeEnum;

  private readonly _message: string | undefined;

  constructor(errorCode: ResponseCodeEnum, message?: string) {
    super(message);

    this._errorCode = errorCode;
    this._message = message;
  }

  get errorCode(): ResponseCodeEnum {
    return this._errorCode;
  }

  get message(): string {
    return this._message || getMessage(this._errorCode);
  }

  toResponse(): ResponsePayload<unknown> {
    return new ResponseBuilder<unknown>().error().withCode(this._errorCode).withMessage(this.message).build();
  }
}
