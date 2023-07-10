import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UseCaseProxy } from '../../use-case-proxy/useCase.proxy';
import { UsecasesProxyModule } from '../../use-case-proxy/use-case-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { ExceptionsService } from '../../commons/exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStrategy(payload.username);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
