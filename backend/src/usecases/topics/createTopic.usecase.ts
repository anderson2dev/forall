import { DomainTopic } from '../../domain/entities/topic.model';
import { DomainUser } from '../../domain/entities/user.model';
import { TopicRepository } from '../../domain/repository/topic.type';
import { UserRepository } from '../../domain/repository/user.type';
import { CreateTopicDTO } from '../../infrastructure/controllers/topics/topics.dto';
import { UserExceptionsService } from '../../infrastructure/commons/exceptions/userExceptions.service';
import { LoggerService } from '../../infrastructure/logger/logger.service';

export class CreateTopicUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
    private readonly userExceptionService: UserExceptionsService,
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
      return this.userExceptionService.userNotFountException({
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
