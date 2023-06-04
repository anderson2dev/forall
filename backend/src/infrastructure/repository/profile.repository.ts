import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileRepository } from '../../domain/repository/profile.type';
import { Profile as ServiceProfile } from '../entities/profile.entity';
import { DomainProfile } from '../../domain/entities/profile.model';

@Injectable()
export class DatabaseProfileRepository implements ProfileRepository {
  constructor(
    @InjectRepository(ServiceProfile)
    private readonly profileEntityRepository: Repository<ServiceProfile>,
  ) {}

  async findAll(
    queryObj?: Omit<Partial<DomainProfile>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<NonNullable<Partial<DomainProfile>>[]> {
    const profiles = await this.profileEntityRepository.find({
      where: queryObj,
      select,
      take: size,
    });

    return profiles.map(this.toDomainProfile);
  }

  async findOne(
    id: string,
  ): Promise<DomainProfile | NonNullable<Partial<DomainProfile>>> {
    const profile = await this.profileEntityRepository.findOne({
      where: { id },
    });
    return this.toDomainProfile(profile);
  }

  async insert(profile: DomainProfile): Promise<void> {
    await this.profileEntityRepository.insert(this.toServiceProfile(profile));
  }

  async update(id: string, updateObj: Partial<DomainProfile>): Promise<void> {
    await this.profileEntityRepository.update(id, updateObj);
  }

  async delete(id: string): Promise<void> {
    await this.profileEntityRepository.delete(id);
  }

  private toDomainProfile(
    profile: ServiceProfile,
  ): DomainProfile | NonNullable<Partial<DomainProfile>> {
    return { ...profile };
  }

  private toServiceProfile(
    profile: DomainProfile,
  ): ServiceProfile | NonNullable<Partial<ServiceProfile>> {
    return { ...profile };
  }
}
