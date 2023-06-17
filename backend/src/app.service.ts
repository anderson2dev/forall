import { Injectable } from '@nestjs/common';
import { DomainUser } from './domain/entities/user.model';
import { DatabaseUserRepository } from './infrastructure/repository/user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: DatabaseUserRepository) {}
  async getHello(): Promise<DomainUser[] | NonNullable<Partial<DomainUser>>[]> {
    return this.userRepository.findAll();
  }
}
