import { IDomainUserExceptions } from '../../../domain/errors/users.exceptions';
import { IDomainException } from '../../../domain/utils/interfaces/domainException.exception';
import {
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  BadGatewayException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserExceptionsService implements IDomainUserExceptions {
  userNotFountException(data: IDomainException): void {
    throw new NotFoundException(data);
  }

  userAlreadyExistsException(data: IDomainException): void {
    throw new ConflictException(data);
  }

  userNotAuthenticatedException(data: IDomainException): void {
    throw new UnauthorizedException(data);
  }

  userAuthenticationFailedException(data: IDomainException): void {
    throw new BadGatewayException(data);
  }

  userNotEnabledException(data: IDomainException): void {
    throw new ForbiddenException(data);
  }

  userNotAuthorizedException(data: IDomainException): void {
    throw new UnauthorizedException(data);
  }
}
