import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getTypeOrmModuleOptions = async (
  config: EnvironmentConfigService,
): Promise<TypeOrmModuleOptions> =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    database: config.getDatabaseName(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    synchronize: config.getDatabaseSync(),
    schema: config.getDatabaseSchema(),
    entities: [join(__dirname, '../../entities/*.{ts|js}')],
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
