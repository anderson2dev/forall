import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { ExceptionsModule } from './infrastructure/commons/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/use-case-proxy/use-case-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    RepositoryModule,
    ExceptionsModule,
    LoggerModule,
    UsecasesProxyModule,
    ControllersModule,
    ExceptionsModule,
  ],
  providers: [LoggerService, EnvironmentConfigService],
})
export class AppModule {}
