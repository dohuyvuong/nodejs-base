import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';

import { systemLogger } from '../logger/logger';
import { ValidationRequestError } from '../models/validation-request.error';

function getMessage(errors: ValidationError[]): string {
  const error = errors[0];
  if (!error) return 'Unknown error';

  if (!error.children || !error.children.length) {
    if (!error.constraints) {
      return 'Unknown error';
    }

    return Object.values(error.constraints)[0];
  }

  return getMessage(error.children);
}

export async function transformAndValidate<T extends object>(
  cls: new () => T,
  plain: unknown | unknown[],
  validatorOptions: ValidatorOptions = {}
): Promise<T> {
  try {
    const transformed = plainToClass(cls, plain);

    if (Array.isArray(transformed)) {
      throw new ValidationRequestError([], 'Only accept object');
    }

    const errors = await validate(transformed, Object.assign({ whitelist: true }, validatorOptions));

    if (errors.length) {
      systemLogger.info(errors);
      throw new ValidationRequestError(errors, getMessage(errors));
    }

    return transformed;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationRequestError([error]);
    }

    throw error;
  }
}
