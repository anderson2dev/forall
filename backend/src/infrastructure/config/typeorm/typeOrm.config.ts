import { DataSourceOptions, DataSource } from 'typeorm';
import { Images1688186942928 } from '../../database/migrations/1688186942928-images';
import * as dotenv from 'dotenv';
import { Profile1688305694921 } from '../../database/migrations/1688305694921-profile';
import { User1688307556570 } from '../../database/migrations/1688307556570-user';
import { Topic1688308240595 } from '../../database/migrations/1688308240595-topic';
import { Comment1688309625600 } from '../../database/migrations/1688309625600-comment';

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
  migrations: [
    Images1688186942928,
    Profile1688305694921,
    User1688307556570,
    Topic1688308240595,
    Comment1688309625600,
  ],
  applicationName: process.env.npm_package_name || 'forall_backend',
  synchronize: false,
  logging: true,
};

export default new DataSource(config);
