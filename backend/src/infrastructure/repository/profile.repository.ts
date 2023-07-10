import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileRepository } from '../../domain/repositories/profile.interface';
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
  ): Promise<DomainProfile[]> {
    const profiles = await this.profileEntityRepository.find({
      where: queryObj,
      select,
      take: size,
    });

    return profiles.map(this.toDomainProfile);
  }

  async findOne(id: string): Promise<DomainProfile> {
    const profile = await this.profileEntityRepository.findOne({
      where: { id },
    });
    return this.toDomainProfile(profile);
  }

  async insert(profile: DomainProfile): Promise<Partial<DomainProfile>> {
    const result = await this.profileEntityRepository.insert(
      this.toServiceProfile(profile),
    );
    return result.raw as Partial<DomainProfile>;
  }

  async update(
    id: string,
    updateObj: Partial<DomainProfile>,
  ): Promise<Partial<DomainProfile>> {
    const result = await this.profileEntityRepository.update(id, updateObj);
    return result.raw as Partial<DomainProfile>;
  }

  async delete(id: string): Promise<Partial<DomainProfile>> {
    const result = await this.profileEntityRepository.delete(id);
    return result.raw as Partial<DomainProfile>;
  }

  private toDomainProfile(profile: ServiceProfile): DomainProfile {
    return { ...profile } as DomainProfile;
  }

  private toServiceProfile(profile: DomainProfile): ServiceProfile {
    return { ...profile } as ServiceProfile;
  }
}
