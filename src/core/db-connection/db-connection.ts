import { QueryRunner } from 'typeorm';

import dataSource from '../config/database';
import { AppContext } from '../context/app-context';
import { systemLogger } from '../logger/logger';

export class DbConnection {
  private static _connection = dataSource;

  private _queryRunner: QueryRunner | undefined;
  private _transactionDepth = 0;
  private _rollback = false;

  public static async initialize(): Promise<void> {
    try {
      if (!this._connection.isInitialized) {
        await this._connection.initialize();
      }
      systemLogger.info('Connected to database');
    } catch (error) {
      systemLogger.unhandledError('Failed to connect to database', error);
      throw error;
    }
  }

  constructor(private _context: AppContext) {}

  public async getQueryRunner(): Promise<QueryRunner> {
    if (!this._queryRunner || !this._queryRunner.isReleased) {
      this._queryRunner = DbConnection._connection.createQueryRunner();
      this._queryRunner.logger = this._context.logger;
      await this._queryRunner.connect();
    }

    return this._queryRunner;
  }

  public async release(): Promise<void> {
    if (!this._queryRunner || this._queryRunner.isReleased) {
      return;
    }

    await this._queryRunner.release();
  }

  public async transaction<T>(scope: () => Promise<T>): Promise<T> {
    const queryRunner = await this.getQueryRunner();
    this._rollback = false;

    try {
      // Mark this transaction depth start
      this._transactionDepth++;

      // Open transaction if it is outermost transaction start
      if (this._transactionDepth === 1) {
        await queryRunner.startTransaction();
      }

      // Execute scope
      const result = await scope();

      // Commit transaction if it is outermost transaction end
      if (this._transactionDepth === 1) {
        await queryRunner.commitTransaction();
      }

      // Mark this transaction depth end
      this._transactionDepth--;

      return result;
    } catch (error) {
      this._context.logger.normalError(error);
      // Mark this transaction depth end
      this._transactionDepth--;

      if (!this._rollback) {
        try {
          await queryRunner.rollbackTransaction();
          this._rollback = true;
        } catch (error) {
          this._context.logger.normalError(error);
        }
      }

      throw error;
    }
  }
}
