import { DomainTopic } from '../../domain/entities/topic.model';
import { DomainUser } from '../../domain/entities/user.model';
import { TopicRepository } from '../../domain/repositories/topic.interface';
import { UserRepository } from '../../domain/repositories/user.interface';
import { CreateTopicDTO } from '../../infrastructure/controllers/topics/topics.dto';
import { ExceptionsService } from '../../infrastructure/commons/exceptions/exceptions.service';
import { LoggerService } from '../../infrastructure/logger/logger.service';

export class CreateTopicUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: LoggerService,
  ) {}
  async execute(generatedTopic: CreateTopicDTO) {
    const topic = new DomainTopic();
    topic.title = generatedTopic.title;
    topic.description = generatedTopic.description;
    const foundAuthor = await this.userRepository.findOne(
      generatedTopic.author,
    );
    if (!foundAuthor) {
      return this.exceptionService.NotFoundException({
        message: 'User not found',
        code_error: 404,
      });
    }
    topic.author = foundAuthor as DomainUser;
    topic.comments = [];
    topic.createdAt = new Date();
    topic.updatedAt = new Date();
    topic.upvotes = 0;
    topic.downvotes = 0;
    topic.enabled = true;
    this.logger.log('CreateTopicUseCase.execute', 'topic created successfully');
    return await this.topicRepository.insert(topic);
  }
}
