import { Logger, QueryRunner } from 'typeorm';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: unknown[] | undefined, queryRunner?: QueryRunner | undefined): void {
    this.log('info', `${this.getSql(query, parameters)}`, queryRunner);
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[] | undefined,
    queryRunner?: QueryRunner | undefined
  ): void {
    this.log('error', `${this.getSql(query, parameters)}`, queryRunner);
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[] | undefined,
    queryRunner?: QueryRunner | undefined
  ): void {
    this.log('warn', `[SLOW ${time}] ${this.getSql(query, parameters)}`, queryRunner);
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined): void {
    this.log('info', message, queryRunner);
  }
  logMigration(message: string, queryRunner?: QueryRunner | undefined): void {
    this.log('info', message, queryRunner);
  }
  log(level: 'error' | 'warn' | 'info' | 'log', message: unknown, queryRunner?: QueryRunner | undefined): void {
    queryRunner?.logger?.log?.(level, message);
  }

  private getSql(query: string, parameters?: unknown[]): string {
    const stringifyParams = (parameters: unknown[]): string => {
      try {
        return JSON.stringify(parameters);
      } catch (error) {
        return parameters.toString();
      }
    };
    return query + (parameters && parameters.length ? ' -- PARAMETERS: ' + stringifyParams(parameters) : '');
  }
}
