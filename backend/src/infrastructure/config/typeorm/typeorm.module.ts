import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { User } from '../../entities/user.entity';
import { Topic } from '../../entities/topic.entity';
import { Comment } from '../../entities/comment.entity';
import { Image } from '../../entities/image.entity';
import { Profile } from '../../entities/profile.entity';

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
    entities: [User, Topic, Comment, Profile, Image],
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
