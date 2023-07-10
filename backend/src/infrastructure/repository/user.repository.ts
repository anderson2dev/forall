import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DomainUser } from '../../domain/entities/user.model';
import { UserRepository } from '../../domain/repositories/user.interface';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<DomainUser> {
    return this.userEntityRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<Partial<DomainUser>> {
    const result = await this.userEntityRepository.delete(id);
    return result.raw as Partial<DomainUser>;
  }

  async insert(entity: DomainUser): Promise<Partial<DomainUser>> {
    const result = await this.userEntityRepository.insert(this.toUser(entity));
    return result.raw as Partial<DomainUser>;
  }

  async update(
    id: string,
    updateObj: Partial<DomainUser>,
  ): Promise<Partial<DomainUser>> {
    const result = await this.userEntityRepository.update(id, updateObj);
    return result.raw as Partial<DomainUser>;
  }

  async findAll(
    queryObj?: Omit<Partial<DomainUser>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<DomainUser[]> {
    const users = await this.userEntityRepository.find({
      where: queryObj,
      select,
      take: size,
    });
    return users?.map(this.toDomainUser) ?? [];
  }

  public getUserByLogin(login: string): Promise<DomainUser> {
    return this.userEntityRepository.findOne({ where: { login } });
  }

  public updateRefreshToken(login: string, hashRefreshToken: string) {
    this.userEntityRepository.update(login, { hashRefreshToken });
  }

  public updateLastLogin(login: string) {
    this.userEntityRepository.update(login, { lastLogin: new Date() });
  }

  private toDomainUser(user: User): DomainUser {
    return { ...user } as DomainUser;
  }

  private toUser(user: User): User {
    return { ...user } as User;
  }
}
