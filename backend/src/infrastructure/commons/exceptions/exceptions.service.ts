import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from '../../../domain/errors/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  NotFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }
  InvalidCredentialsException(data?: IFormatExceptionMessage): void {
    throw new ConflictException(data);
  }
}
