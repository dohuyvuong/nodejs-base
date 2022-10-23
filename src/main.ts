import 'reflect-metadata';
import { app } from './app';
import { DbConnection } from './core/db-connection/db-connection';
import { logger } from './core/logger/logger';

async function boostrap(): Promise<void> {
  await DbConnection.initialize();

  const port = process.env['PORT'] || 3002;

  app.listen(port, () => {
    logger.info('Server is running on port', port);
  });
}

boostrap().catch((error) => logger.info(error));
