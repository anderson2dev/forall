import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UsecasesProxyModule } from '../../use-case-proxy/use-case-proxy.module';
import { UseCaseProxy } from '../../use-case-proxy/useCase.proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../commons/exceptions/exceptions.service';
import { TokenPayload } from '../../../domain/entities/auth.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionsService: ExceptionsService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    if (!username || !password) {
      this.logger.warn(
        'LocalStrategy',
        `Username or password is missing, BadRequestException`,
      );
      this.exceptionsService.InvalidCredentialsException({
        message: 'Username or password is missing',
        code_error: 400,
      });
    }
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForLocalStrategy(username, password);
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid username or password`);
      this.exceptionsService.InvalidCredentialsException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}
