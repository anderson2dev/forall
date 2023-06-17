export interface ILoggerInterface {
  warn(context: string, message: string): void;
  debug(context: string, message: string): void;
  log(context: string, message: string): void;
  verbose(context: string, message: string): void;
  error(context: string, message: string, trace?: string): void;
}
