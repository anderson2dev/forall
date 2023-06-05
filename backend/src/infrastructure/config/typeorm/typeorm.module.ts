import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    database: config.getDatabaseName(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    synchronize: config.getDatabaseSync(),
    schema: config.getDatabaseSchema(),
    entities: [__dirname.concat('./../../entities/*.{ts|js}')],
    ssl: {
      rejectUnauthorized: false,
    },
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
      imports: [EnvironmentConfigService],
    }),
  ],
})
export class TypeormModule {}
