import path from 'path';

import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'test',
  database: 'example',
  logging: true,
  entities: [path.join(__dirname, '../../**/entities/**/*.entity.js')],
  subscribers: [],
  migrations: [],
};
