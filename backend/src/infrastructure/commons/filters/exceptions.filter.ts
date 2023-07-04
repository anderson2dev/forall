import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { IGenericError } from '../errors/genericError.interface';

export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IGenericError)
        : { message: (exception as Error).message, error_code: null };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: IGenericError,
    status: number,
    exception: any,
  ) {
    if (status == 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} error_code=${
          message.error_code || null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} error_code=${
          message.error_code ? message.error_code : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
