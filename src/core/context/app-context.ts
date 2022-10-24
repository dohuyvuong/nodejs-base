import { v4 as uuidV4 } from 'uuid';

import { DbConnection } from '../db-connection/db-connection';
import { Logger } from '../logger/logger';

export class AppContext {
  private _executionId: string;
  private _connection: DbConnection;
  private _logger: Logger;

  constructor() {
    this._executionId = uuidV4();
    this._connection = new DbConnection(this);
    this._logger = new Logger(this._executionId);
  }

  public get connection(): DbConnection {
    return this._connection;
  }

  public get executionId(): string {
    return this._executionId;
  }

  public get logger(): Logger {
    return this._logger;
  }
}
