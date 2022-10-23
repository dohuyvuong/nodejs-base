import { ValidationError } from 'class-validator';

import { ResponseCodeEnum } from '../enums/response-code.enum';
import { ResponseBuilder } from '../utils/response-builder';

import { ApiError } from './api.error';
import { ResponsePayload } from './response-payload';

export class ValidationRequestError extends ApiError {
  private readonly _errors: ValidationError[];

  constructor(errors: ValidationError[]);

  constructor(errors: ValidationError[], message: string);

  constructor(errors: ValidationError[], message?: string) {
    super(ResponseCodeEnum.BAD_REQUEST, message);
    this._errors = errors;
  }

  toResponse(): ResponsePayload<void> {
    return new ResponseBuilder<void>().error(this._errors).withMessage(this.message).build();
  }
}
