import path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

import { TypeOrmLogger } from '../logger/sql-logger';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USER'] || 'dev',
  password: process.env['DB_PASSWORD'] || 'test',
  database: process.env['DB_DATABASE'] || 'example',
  logging: true,
  logger: new TypeOrmLogger(),
  entities: [path.join(__dirname, '../../**/entities/**/*.entity.{js,ts}')],
  subscribers: [],
  migrations: [path.join(__dirname, '../../**/migrations/*.{js,ts}')],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
