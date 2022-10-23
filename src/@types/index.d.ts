import { AppContext } from '../core/context/app-context';

declare module 'http' {
  interface IncomingMessage {
    context: AppContext;
  }
}
