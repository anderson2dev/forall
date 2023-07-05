import { DomainTopic } from '../../domain/entities/topic.model';
import { TopicRepository } from '../../domain/repository/topic.type';
import { ILoggerInterface } from '../../domain/loggers/logger.interface';

export class GetTopicsUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly logger: ILoggerInterface,
  ) {}

  async execute(): Promise<DomainTopic[]> {
    try {
      const topics = await this.topicRepository.findAll();
      this.logger.log('GetTopicsUseCase.execute', 'success');
      return topics;
    } catch (error) {
      this.logger.error(error, 'Error on getTopics.usecase', error.stack);
      throw error;
    }
  }
}
