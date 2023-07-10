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
import { JwtTokenService } from './infrastructure/services/jwt/jwt.service';
import { BcryptService } from './infrastructure/services/bcrypt/bcrypt.service';
import { JwtModule } from './infrastructure/services/jwt/jwt.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';

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
    JwtModule,
    BcryptModule,
  ],
  providers: [
    LoggerService,
    EnvironmentConfigService,
    JwtTokenService,
    BcryptService,
  ],
})
export class AppModule {}
