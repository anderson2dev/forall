import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';
import { DomainTopic } from '../../domain/entities/topic.model';
import { TopicRepository } from '../../domain/repository/topic.type';

@Injectable()
export class DatabaseTopicRepository implements TopicRepository {
  constructor(
    @InjectRepository(Topic)
    private readonly topicEntityRepository: Repository<Topic>,
  ) {}

  async findOne(id: string): Promise<DomainTopic> {
    return this.topicEntityRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findAll(
    queryObj?: Omit<Partial<DomainTopic>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<DomainTopic[] | Partial<DomainTopic>[]> {
    const topics = await this.topicEntityRepository.find({
      where: queryObj,
      select: select as FindOptionsSelect<Topic>,
      take: size,
    });
    return topics.map(this.toDomainTopic);
  }

  async update(id: string, updateObj: Partial<DomainTopic>): Promise<void> {
    await this.topicEntityRepository.update(id, updateObj);
  }

  async delete(id: string): Promise<void> {
    await this.topicEntityRepository.delete(id);
  }

  async insert(entity: DomainTopic): Promise<void> {
    await this.topicEntityRepository.insert(this.toServiceTopic(entity));
  }
  // Todo refactor this to be like the others
  private toDomainTopic(topic: Topic): DomainTopic {
    const domainTopic: DomainTopic = new DomainTopic();
    domainTopic.id = topic.id;
    domainTopic.author = topic.author;
    domainTopic.comments = topic.comments;
    domainTopic.description = topic.description;
    domainTopic.title = topic.title;
    domainTopic.enabled = topic.enabled;
    domainTopic.upvotes = topic.upvotes;
    domainTopic.downvotes = topic.downvotes;
    return domainTopic;
  }
  // Todo refactor this to be like the others
  private toServiceTopic(topic: DomainTopic): Topic {
    const serviceTopic = new Topic();
    serviceTopic.id = topic.id;
    serviceTopic.author = topic.author;
    serviceTopic.comments = topic.comments;
    serviceTopic.description = topic.description;
    serviceTopic.title = topic.title;
    serviceTopic.upvotes = topic.upvotes;
    serviceTopic.downvotes = topic.downvotes;
    serviceTopic.createdAt = topic.createdAt;
    serviceTopic.updatedAt = topic.updatedAt;
    return serviceTopic;
  }
}
