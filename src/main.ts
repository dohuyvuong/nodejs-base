import 'reflect-metadata';
import { app } from './app';
import { DbConnection } from './core/db-connection/db-connection';
import { systemLogger } from './core/logger/logger';

async function bootstrap(): Promise<void> {
  await DbConnection.initialize();

  const port = process.env['PORT'] || 3002;

  app.listen(port, () => {
    systemLogger.info('Server is running on port', port);
  });
}

bootstrap().catch((error) => systemLogger.unhandledError(error));
