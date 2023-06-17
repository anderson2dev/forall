import { Injectable, Logger } from '@nestjs/common';
import { ILoggerInterface } from '../../domain/loggers/logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILoggerInterface {
  warn(context: string, message: string): void {
    super.warn(`[WARN] ${message}`, context);
  }
  debug(context: string, message: string): void {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }
  log(context: string, message: string): void {
    super.debug(`[LOG] ${message}`, context);
  }
  verbose(context: string, message: string): void {
    super.debug(`[VERBOSE] ${message}`, context);
  }
  error(context: string, message: string, trace?: string): void {
    super.debug(`[ERROR] ${message}`, context, trace);
  }
}
