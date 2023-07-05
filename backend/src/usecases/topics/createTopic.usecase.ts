import { DomainTopic } from '../../domain/entities/topic.model';
import { TopicRepository } from '../../domain/repository/topic.type';
import { UserRepository } from '../../domain/repository/user.type';
import { CreateTopicDTO } from '../../infrastructure/controllers/topics/createTopic.dto';

export class CreateTopicUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(generatedTopic: CreateTopicDTO) {
    const topic = new DomainTopic();
    topic.title = generatedTopic.title;
    topic.description = generatedTopic.description;
    const author = await this.userRepository.findOne(generatedTopic.author);
    topic.comments = [];
    topic.createdAt = new Date();
    topic.updatedAt = new Date();
    topic.upvotes = 0;
    topic.downvotes = 0;
    topic.enabled = true;
    return await this.topicRepository.insert(topic);
  }
}
