import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeormModule,
    LoggerModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
