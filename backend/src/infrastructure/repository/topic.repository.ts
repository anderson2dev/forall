import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<DomainTopic[]> {
    return this.topicEntityRepository.find();
  }

  async update(id: string, updateObj: Partial<DomainTopic>): Promise<void> {
    await this.topicEntityRepository.update(id, updateObj);
  }

  async delete(id: string): Promise<void> {
    await this.topicEntityRepository.delete(id);
  }

  async insert(entity: DomainTopic): Promise<void> {
    await this.topicEntityRepository.insert(entity);
  }

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

  private toServiceTopic(topic: DomainTopic): Topic {
    const serviceTopic = new Topic();
    serviceTopic.id = topic.id;

    return serviceTopic;
  }
}
