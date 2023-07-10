import { IDomainException } from '../utils/interfaces/domainException.exception';

export interface IDomainUserExceptions {
  userNotFoundException(data: IDomainException): void;
  userAlreadyExistsException(data: IDomainException): void;
  userNotAuthenticatedException(data: IDomainException): void;
  userAuthenticationFailedException(data: IDomainException): void;
  userNotEnabledException(data: IDomainException): void;
  userNotAuthorizedException(data: IDomainException): void;
}
