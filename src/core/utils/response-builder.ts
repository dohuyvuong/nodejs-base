import { ValidationError } from 'class-validator';

import { ResponseCodeEnum, getMessage } from '../enums/response-code.enum';
import { ResponseTypeEnum } from '../enums/response-type.enum';
import { ResponsePayload } from '../models/response-payload';

export class ResponseBuilder<T> {
  private payload: ResponsePayload<T> = {
    type: ResponseTypeEnum.SUCCESS,
  };

  private message: string | undefined;

  private errors: ValidationError[] | undefined;

  constructor(data?: T) {
    this.payload.data = data;
  }

  success(): ResponseBuilder<T> {
    this.payload.type = ResponseTypeEnum.SUCCESS;
    return this;
  }

  error(): ResponseBuilder<T>;

  error(errors: ValidationError[]): ResponseBuilder<T>;

  error(errors?: ValidationError[]): ResponseBuilder<T> {
    this.payload.type = ResponseTypeEnum.ERROR;
    this.errors = errors;
    return this;
  }

  withCode(code: ResponseCodeEnum): ResponseBuilder<T> {
    this.payload.code = code;
    this.payload.message = getMessage(code);
    return this;
  }

  withMessage(message: string): ResponseBuilder<T> {
    this.payload.message = message;
    return this;
  }

  withData(data: T): ResponseBuilder<T> {
    this.payload.data = data;
    return this;
  }

  withMeta(meta: unknown): ResponseBuilder<T> {
    this.payload.meta = meta;
    return this;
  }

  build(): ResponsePayload<T> {
    if (this.message) {
      this.payload.message = this.message;
    }
    if (this.errors) {
      this.payload.errors = this.errors;
    }
    return this.payload;
  }
}
