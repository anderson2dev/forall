import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { TopicRepository } from '../../domain/repository/topic.type';
import { DomainTopic } from '../../domain/entities/topic.model';
import { ILoggerInterface } from '../../domain/loggers/logger.interface';

export class GetTopicUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly logger: ILoggerInterface,
  ) {}

  async execute(id: string) {
    UUID.isValid(id);
    const topic = await this.topicRepository.findOne(id);
    if (!topic) {
      this.logger.warn('GetTopicUseCase.execute', `Topic ${id} not found`);
      throw new Error('Topic not found');
    }
    return topic as DomainTopic;
  }
}
