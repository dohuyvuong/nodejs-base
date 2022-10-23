import signale from 'signale';

import { MASK_FIELDS } from '../utils/constants';

signale.config({
  displayTimestamp: true,
  displayDate: true,
});

class Logger {
  private static MASK_REGEX = new RegExp(MASK_FIELDS.map((field) => `(?<${field}>"${field}":".*?")`).join('|'), 'gm');

  private buildMaskReplacer() {
    return (...args: unknown[]): string => {
      const namedGroups = args.pop() as object;
      const [key] = Object.entries(namedGroups).find(([_key, value]) => value !== undefined) as [string, unknown];
      return `"${key}":"[MASKED]"`;
    };
  }

  private tranformArgs(...args: unknown[]): string[] {
    return args.map((arg) => {
      if (arg instanceof Error) {
        return `${arg}:${arg.name}:${arg.stack}`;
      }

      if (typeof arg === 'string') {
        const needToMask = Logger.MASK_REGEX.test(arg);
        if (!needToMask) {
          return arg;
        }

        return arg.replace(Logger.MASK_REGEX, this.buildMaskReplacer());
      }

      if (typeof arg === 'object') {
        const str = JSON.stringify(arg);
        const needToMask = Logger.MASK_REGEX.test(str);
        if (!needToMask) {
          return str;
        }

        return str.replace(Logger.MASK_REGEX, this.buildMaskReplacer());
      }

      return JSON.stringify(arg);
    });
  }

  /**
   * Use when logging information of request, response, result, step,...
   * Use normalError if logging error instead of
   */
  info(message: unknown, ...optionalArgs: unknown[]): void {
    signale.info(...this.tranformArgs(message, ...optionalArgs));
  }

  /**
   * Use then logging steps of process
   * Use normalError if logging error instead of
   */
  debug(message: unknown, ...optionalArgs: unknown[]): void {
    signale.debug(...this.tranformArgs(message, ...optionalArgs));
  }

  /**
   * Use when logging warning.
   */
  warn(message: string, ...optionalArgs: unknown[]): void;

  /**
   * Use when logging warning.
   */
  warn(...optionalArgs: unknown[]): void;

  warn(message?: unknown, ...optionalArgs: unknown[]): void {
    if (typeof message === 'string') {
      message = `WARNING: ${message}`;
    } else {
      optionalArgs.unshift(message);
      message = 'WARNING:';
    }
    signale.warn(...this.tranformArgs(message, ...optionalArgs));
  }

  /**
   * Use when logging normal errors.
   * Use unhandledError if the error is unhandled instead of.
   */
  normalError(message: string, ...optionalArgs: unknown[]): void;

  /**
   * Use when logging normal errors.
   * Use unhandledError if the error is unhandled instead of.
   */
  normalError(...optionalArgs: unknown[]): void;

  normalError(message?: unknown, ...optionalArgs: unknown[]): void {
    if (typeof message === 'string') {
      message = `NORMAL ERROR: ${message}`;
    } else {
      optionalArgs.unshift(message);
      message = 'NORMAL ERROR:';
    }
    signale.error(...this.tranformArgs(message, ...optionalArgs));
  }

  /**
   * Only use when logging unhanled errors.
   * Use normalError if the error is normal instead of.
   */
  unhandledError(message: string, ...optionalArgs: unknown[]): void;

  /**
   * Only use when logging unhanled errors.
   * Use normalError if the error is normal instead of.
   */
  unhandledError(...optionalArgs: unknown[]): void;

  unhandledError(message?: string, ...optionalArgs: unknown[]): void {
    if (typeof message === 'string') {
      message = `UNHANDLED ERROR: ${message}`;
    } else {
      optionalArgs.unshift(message);
      message = 'UNHANDLED ERROR:';
    }
    signale.error(...this.tranformArgs(message, ...optionalArgs));
  }
}

export const logger = new Logger();
