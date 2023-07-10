import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRepository } from '../../domain/repositories/comment.interface';
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

  async insert(profile: DomainComment): Promise<Partial<DomainComment>> {
    const result = await this.profileEntityRepository.insert(
      this.toServiceComment(profile),
    );
    return result.raw as Partial<DomainComment>;
  }

  async update(
    id: string,
    updateObj: Partial<DomainComment>,
  ): Promise<Partial<DomainComment>> {
    const result = await this.profileEntityRepository.update(id, updateObj);
    return result.raw as Partial<DomainComment>;
  }

  async delete(id: string): Promise<Partial<DomainComment>> {
    const result = await this.profileEntityRepository.delete(id);
    return result.raw as Partial<DomainComment>;
  }

  private toDomainComment(profile: ServiceComment): DomainComment {
    return { ...profile } as DomainComment;
  }

  private toServiceComment(profile: DomainComment): ServiceComment {
    return { ...profile } as ServiceComment;
  }
}
