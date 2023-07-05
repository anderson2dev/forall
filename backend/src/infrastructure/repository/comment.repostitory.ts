import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRepository } from '../../domain/repository/comment.type';
import { Comment as ServiceComment } from '../entities/comment.entity';
import { DomainComment } from '../../domain/entities/comment.model';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(ServiceComment)
    private readonly profileEntityRepository: Repository<ServiceComment>,
  ) {}

  async findAll(
    queryObj?: Omit<Partial<DomainComment>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<DomainComment[]> {
    const profiles = await this.profileEntityRepository.find({
      where: queryObj,
      select,
      take: size,
    });

    return profiles.map(this.toDomainComment);
  }

  async findOne(
    id: string,
  ): Promise<DomainComment | NonNullable<Partial<DomainComment>>> {
    const profile = await this.profileEntityRepository.findOne({
      where: { id },
    });
    return this.toDomainComment(profile);
  }

  async insert(profile: DomainComment): Promise<void> {
    await this.profileEntityRepository.insert(this.toServiceComment(profile));
  }

  async update(id: string, updateObj: Partial<DomainComment>): Promise<void> {
    await this.profileEntityRepository.update(id, updateObj);
  }

  async delete(id: string): Promise<void> {
    await this.profileEntityRepository.delete(id);
  }

  private toDomainComment(profile: ServiceComment): DomainComment {
    return { ...profile } as DomainComment;
  }

  private toServiceComment(profile: DomainComment): ServiceComment {
    return { ...profile } as ServiceComment;
  }
}
