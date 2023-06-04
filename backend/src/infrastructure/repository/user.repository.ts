import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as ServiceUser } from '../entities/user.entity';
import { DomainUser } from '../../domain/entities/user.model';
import { UserRepository } from '../../domain/repository/user.type';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(ServiceUser)
    private readonly userEntityRepository: Repository<ServiceUser>,
  ) {}

  async findOne(id: string): Promise<DomainUser> {
    return this.userEntityRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userEntityRepository.delete(id);
  }

  async insert(entity: DomainUser): Promise<void> {
    await this.userEntityRepository.insert(this.toServiceUser(entity));
  }

  async update(id: string, updateObj: Partial<DomainUser>): Promise<void> {
    await this.userEntityRepository.update(id, updateObj);
  }

  async findAll(
    queryObj?: Omit<Partial<DomainUser>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<DomainUser[] | NonNullable<Partial<DomainUser>>[]> {
    const users = await this.userEntityRepository.find({
      where: queryObj,
      select,
      take: size,
    });
    return users.map(this.toDomainUser);
  }

  private toDomainUser(user: ServiceUser): NonNullable<Partial<DomainUser>> {
    return { ...user } as DomainUser;
  }

  private toServiceUser(user: ServiceUser): NonNullable<Partial<ServiceUser>> {
    return { ...user } as ServiceUser;
  }
}
