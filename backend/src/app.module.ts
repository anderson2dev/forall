import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    RepositoryModule,
    ExceptionsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, EnvironmentConfigService],
})
export class AppModule {}
