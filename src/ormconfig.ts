import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { OptimisticLockingSubscriber } from './utils/OptimisticLockingSubscriber';

const data: any = dotenv.parse(fs.readFileSync(`.env`));

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: data.DB_USER,
  password: data.DB_PASSWORD,
  database: data.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
  logging: false,
  logger: 'simple-console',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  subscribers: [OptimisticLockingSubscriber],
  cache: {
    tableName: 'cache',
  },
};

export default new DataSource(config);
