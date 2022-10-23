import { v4 as uuidV4 } from 'uuid';

import { DbContext } from './db-context';

export class AppContext extends DbContext {
  private _id: string;
  private _startTimestamp: number;

  constructor() {
    super();
    this._id = uuidV4();
    this._startTimestamp = Date.now();
  }

  public getId(): string {
    return this._id;
  }

  public getStartTimestamp(): number {
    return this._startTimestamp;
  }
}
