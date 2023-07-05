import { Module } from '@nestjs/common';
import { UserExceptionsService } from './userExceptions.service';

@Module({
  providers: [UserExceptionsService],
  exports: [UserExceptionsService],
})
export class ExceptionsModule {}
