import { Module } from '@nestjs/common';
import { UserExceptionsService } from './userExceptions.service';

@Module({
  providers: [UserExceptionsService],
})
export class ExceptionsModule {}
