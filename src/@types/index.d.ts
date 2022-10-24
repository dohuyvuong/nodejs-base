import { AppContext } from '../core/context/app-context';
import { Logger } from '../core/logger/logger';

declare module 'http' {
  interface IncomingMessage {
    context: AppContext;
  }
}

declare module 'typeorm' {
  interface QueryRunner {
    logger: Logger;
  }
}
