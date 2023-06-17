import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DomainUser } from './domain/entities/user.model';

// TODO: remove this later, as it will be transfered to their respective modules
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<DomainUser[] | NonNullable<Partial<DomainUser>>[]> {
    return this.appService.getHello();
  }
}
