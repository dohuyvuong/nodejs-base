import { DbConnection } from '../db-connection/db-connection';

export class DbContext {
  private _dbConnection: DbConnection;

  constructor() {
    this._dbConnection = new DbConnection();
  }

  public getDbConnection(): DbConnection {
    return this._dbConnection;
  }
}
