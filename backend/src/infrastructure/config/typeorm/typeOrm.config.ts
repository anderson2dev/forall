import { DataSourceOptions, DataSource } from 'typeorm';
import { Images1688186942928 } from '../../database/migrations/1688186942928-images';
import * as dotenv from 'dotenv';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    __dirname + '/../infrastructure/database/entities/*.entity{.ts,.js}',
  ],
  migrations: [Images1688186942928],
  applicationName: process.env.npm_package_name || 'forall_backend',
  synchronize: false,
  logging: true,
};

export default new DataSource(config);
// Path: backend/src/infrastructure/database/entities/image.entity.ts
