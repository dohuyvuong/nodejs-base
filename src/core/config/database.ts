import path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

import { TypeOrmLogger } from '../logger/sql-logger';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'test',
  database: 'example',
  logging: true,
  logger: new TypeOrmLogger(),
  entities: [path.join(__dirname, '../../**/entities/**/*.entity.js')],
  subscribers: [],
  migrations: [path.join(__dirname, '../../../migrations/*.js')],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
